import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder

def predict_loan_approval(input_data):
    model = joblib.load("random_forest_model.pkl")
    data = input_data
    new_data = pd.DataFrame([data])

    if 'Loan_ID' in new_data.columns:
        new_data = new_data.drop(columns=['Loan_ID'])

    categorical_cols = ['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 'Property_Area']
    for col in categorical_cols:
        le = LabelEncoder()
        new_data[col] = le.fit_transform(new_data[col])

    prediction = model.predict(new_data)
    result = prediction[0]

    return {"Loan_Approval_Prediction": result}






