import pdb

from fastapi.responses import JSONResponse
from fastapi import FastAPI, HTTPException,status
from pydantic import BaseModel
from Bank_Advisor import retrieval_qa_chain,llm
from Stock_Analysis import retrieve_symbol,get_weekly_stock_data,get_half_of_dict,get_last_5_weeks_data
from loanApprover import predict_loan_approval
from fastapi.middleware.cors import CORSMiddleware

class QuestionRequest(BaseModel):
    question: str

class StockSymbolRequest(BaseModel):
    company_name: str

class StockAnalysisRequest(BaseModel):
    company_name: str

class LoanInput(BaseModel):
    Gender: str
    Married: str
    Dependents: str
    Education: str
    Self_Employed: str
    ApplicantIncome: int
    CoapplicantIncome: float
    LoanAmount: float
    Loan_Amount_Term: int
    Credit_History: int
    Property_Area: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ask-question")
async def ask_question(request: QuestionRequest):
    try:
        answer = retrieval_qa_chain(llm, request.question)
        return {"question": request.question, "answer": answer}
    except HTTPException as http_exc:
        raise http_exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(exc)}")

@app.post("/get-stock-symbol/")
async def get_stock_symbol(request: StockSymbolRequest):
    try:
        symbol = retrieve_symbol(request.company_name)
        return {"company_name": request.company_name, "stock_symbol": symbol}
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")


@app.post("/analyze-stock-data/")
async def analyze_stock_data(request: StockAnalysisRequest):
    try:
        symbol = retrieve_symbol(request.company_name)
        stock_data = get_weekly_stock_data(symbol)
        print(stock_data)
        if "Weekly Time Series" not in stock_data:
            raise HTTPException(
                status_code=500,
                detail=f"Error fetching data for {request.company_name}: {stock_data.get('error', 'Unknown error')}"
            )

        weekly_time_series = stock_data["Weekly Time Series"]
        latest_5_years_data = get_half_of_dict(weekly_time_series)
        prompt = f"""
        I am providing you with weekly stock data for {request.company_name} for the past 5 years, including open price, highest price, lowest price, close price, and volume. Please analyze the stock's performance year-by-year and present the findings in a structured format with the following details for each year:
        - Year: YYYY
        - Highest Price:
        - Lowest Price:
        - Average Closing Price:
        - Volume Trends: Summary of any significant volume changes.
        - Key Trends: Overview of any notable trends in price movements.

        After detailing each year, provide a summary of the overall performance trends observed across these 5 years. Conclude with a personalized suggestion, addressed to me, indicating if this stock would be a wise investment based on the analyzed data.

        Data: {latest_5_years_data}
        """
        ai_response = llm.invoke(prompt)

        return {
            "company_name": request.company_name,
            "stock_symbol": symbol,
            "analysis": ai_response.content,
        }
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.get("/getPast5Week/{name}")
def getPast5Week(name):
    symbol = retrieve_symbol(name)
    data = get_weekly_stock_data(symbol)
    data2 = get_last_5_weeks_data(data)
    return data2

@app.post("/getLoanApprove")
def getLoanApprove(input_data: LoanInput):
    result = predict_loan_approval(input_data.dict())
    return result


@app.get("/health", status_code=status.HTTP_200_OK)
async def health_check():
    return JSONResponse(
        content={"status": "Healthy", "message": "API is running smoothly!"},
        status_code=status.HTTP_200_OK,
    )