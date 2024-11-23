from fastapi import FastAPI, HTTPException
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.vectorstores import Pinecone as PC2
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain.prompts import PromptTemplate

load_dotenv()


pinecone_key = os.getenv("PINECONE_API_KEY")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

embedding = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L12-v2')
docsearch = PC2.from_existing_index(index_name="multiagentic", embedding=embedding)
search = TavilySearchResults(max_results=2, api_key=TAVILY_API_KEY)
llm = ChatGoogleGenerativeAI(model="gemini-pro", api_key=GOOGLE_API_KEY)

prompt_template = PromptTemplate(
    template="""
    You are a financial expert with a comprehensive understanding of various debit cards, credit cards, savings accounts, and current accounts. The Context will contain detailed information about different financial products from two banks: SBI and HDFC. The data will include:

    Debit Cards:
    - Card variants
    - Annual fees and add-on card fees
    - Transaction charges (ATM withdrawals, international transactions, POS transactions, etc.)
    - Foreign exchange fees
    - Replacement charges

    Credit Cards:
    - Card variants
    - Annual and add-on fees
    - Benefits and reward programs (e.g., cashbacks, reward points)
    - Interest rates on unpaid balances
    - Charges for international transactions, ATM withdrawals, and replacement
    - Eligibility criteria, including income or credit score requirements

    Savings Accounts:
    - Account types (e.g., Basic Savings, Regular Savings)
    - Interest rates on deposits
    - Minimum balance requirements
    - Charges for various services (e.g., cheque book issuance, account closure, stop payment)
    - Transaction limits (e.g., IMPS, UPI, self-account transfers)
    - Features such as video KYC, debit card type, account access, and notifications
    - Eligibility criteria for account holders

    Current Accounts:
    - Account types (e.g., Ultima, Regular Current Accounts)
    - Monthly or quarterly average balance requirements
    - Features such as overdraft facilities, cheque books, and debit card types
    - Charges for various services (e.g., cheque issuance, cash deposit limits)
    - Transaction limits and access options (mobile banking, internet banking, ATM access)
    - Eligibility criteria for businesses or individuals opening the account

    Given this information, respond to the Question below by providing a detailed and optimized financial answer, specific to the user's query. If the question requires a comparison, provide a side-by-side analysis based on the features, fees, and benefits where applicable.

    Context: {context}
    Question: {question}

    Answer: """,
    input_variables=["context", "question"]
)


def retrieval_qa_chain(llm, question, top_k=5):
    try:
        # Search for relevant documents
        similar_documents = docsearch.similarity_search(question, top_k)
        context = "\n".join([doc.page_content for doc in similar_documents])

        # Retrieve internet-based data
        internet_data = search.invoke("HDFC" + question)
        internet_list = [data.get('content') for data in internet_data]
        internet_context = internet_list[0] if internet_list else ""
        context += "\n" + internet_context

        # Generate the prompt
        prompt_input = prompt_template.format(context=context, question=question)
        answer = llm.invoke(prompt_input)

        return answer.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")
