import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

// API to ask a question
export const askQuestion = async (question: string): Promise<{ question: string; answer: string }> => {
  try {
    const data = { "question" : question };
    console.log(data);
    const response = await axios.post(`${BASE_URL}/ask-question`, data);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error("Error asking question:", error);
    throw error;
  }
};

// API to get stock symbol
export const getStockSymbol = async (companyName: string): Promise<{ company_name: string; stock_symbol: string }> => {
  try {
    const response = await axios.post(`${BASE_URL}/get-stock-symbol/`, { "company_name": companyName });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error("Error fetching stock symbol:", error);
    throw error;
  }
};

// API to analyze stock data
export const analyzeStockData = async (companyName: string): Promise<{
  company_name: string;
  stock_symbol: string;
  analysis: string;
}> => {
  try {
    const response = await axios.post(`${BASE_URL}/analyze-stock-data/`, { "company_name": companyName });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error("Error analyzing stock data:", error);
    throw error;
  }
};

// API to get past 5 weeks' data
export const getPast5WeeksData = async (companyName: string): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/getPast5Week/${companyName}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error("Error fetching past 5 weeks' data:", error);
    throw error;
  }
};

// API to get loan approval result
export const getLoanApproval = async (inputData: {
  Gender: string;
  Married: string;
  Dependents: string;
  Education: string;
  Self_Employed: string;
  ApplicantIncome: number;
  CoapplicantIncome: number;
  LoanAmount: number;
  Loan_Amount_Term: number;
  Credit_History: number;
  Property_Area: string;
}): Promise<any> => {
  try {
    console.log(inputData);
    const response = await axios.post(`${BASE_URL}/getLoanApprove`, inputData);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error("Error fetching loan approval result:", error);
    throw error;
  }
};
