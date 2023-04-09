from flask import Flask, request
from Model import Create_Dataset, Predict_Expense
from Transaction import ExcelToTransaction
import json
import pandas as pd

app = Flask(__name__)


@app.route('/create/dataset', methods=['GET'])
def create_dataset():
    return Create_Dataset()


@app.route('/predict/expense', methods=['POST'])
def predict_expense():
    parameter = json.loads(request.data)
    return Predict_Expense(parameter)


@app.route('/excel/transaction', methods=['POST'])
def excel_to_transaction():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    if file:
        df = pd.read_excel(file, engine='xlrd')
        date_pattern = "^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2}$"
        num_rows, num_cols = df.shape
        return ExcelToTransaction(df, date_pattern, num_rows)


if __name__ == '__main__':
    app.run(port=8001)
