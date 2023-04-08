from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pandas as pd
import numpy as np


def Create_Dataset(n=1000):
    pocket_money = (2000, 10000)
    travel = (17, 20)
    food = (22, 30)
    entertainment = (20, 22)
    miscellaneous = (30, 35)

    pocket = np.random.randint(pocket_money[0], pocket_money[1], n)
    travel = np.random.randint(travel[0], travel[1], n)
    food = np.random.randint(food[0], food[1], n)
    entertainment = np.random.randint(entertainment[0], entertainment[1], n)
    miscellaneous = np.random.randint(miscellaneous[0], miscellaneous[1], n)

    travel = pocket * (travel/100)
    food = pocket * (food/100)
    entertainment = pocket * (entertainment/100)
    miscellaneous = pocket * (miscellaneous/100)

    predicted_percentage = (2, 7)

    expense = travel + food + entertainment + miscellaneous
    savings = pocket - expense

    predict_percentage = np.random.randint(
        predicted_percentage[0], predicted_percentage[1], n)

    predicted_travel = travel - (travel * (predict_percentage/100))
    predicted_food = food - (food * (predict_percentage/100))
    predicted_entertainment = entertainment - \
        (entertainment * (predict_percentage/100))
    predicted_miscellaneous = miscellaneous - \
        (miscellaneous * (predict_percentage/100))

    predicted_expense = predicted_travel + predicted_food + \
        predicted_entertainment + predicted_miscellaneous
    predicted_savings = pocket - predicted_expense

    df = pd.DataFrame({'pocket_money': pocket, 'travel': travel, 'food': food, 'entertainment': entertainment, 'miscellaneous': miscellaneous,
                       'expense': expense, 'savings': savings, 'predicted_travel': predicted_travel, "predicted_food": predicted_food,
                       "predicted_entertainment": predicted_entertainment, "predicted_miscellaneous": predicted_miscellaneous, "predicted_expense": predicted_expense,
                       "predicted_savings": predicted_savings})
    df.to_csv('expenses.csv', index=False)
    return "DONE"


def Predict_Expense(parameters):
    df = pd.read_csv('expense_prediction/expenses.csv')

    X = df.drop(['expense', 'savings', 'predicted_travel', "predicted_food", "predicted_entertainment",
                "predicted_miscellaneous", "predicted_expense", "predicted_savings"], axis=1)
    y = df.drop(['pocket_money', 'travel', 'food', 'entertainment',
                'miscellaneous', 'expense', 'savings'], axis=1)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42)

    model = LinearRegression()
    model.fit(X_train, y_train)

    new_data = pd.DataFrame(parameters)
    predicted_expense = model.predict(new_data)

    travel = np.mean([p[0] for p in predicted_expense])
    food = np.mean([p[1] for p in predicted_expense])
    entertainment = np.mean([p[2] for p in predicted_expense])
    miscellaneous = np.mean([p[3] for p in predicted_expense])
    expense = np.mean([p[4] for p in predicted_expense])
    savings = np.mean([p[5] for p in predicted_expense])
    return {
        'travel': travel, 'food': food, 'entertainment': entertainment, 'miscellaneous': miscellaneous,
        'expense': expense, 'savings': savings
    }
