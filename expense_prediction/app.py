from flask import Flask, request
from Model import Create_Dataset, Predict_Expense
import json

app = Flask(__name__)


@app.route('/create/dataset', methods=['GET'])
def create_dataset():
    return Create_Dataset()


@app.route('/predict/expense', methods=['POST'])
def predict_expense():
    parameter = json.loads(request.data)
    return Predict_Expense(parameter)


if __name__ == '__main__':
    app.run(port=8001)
