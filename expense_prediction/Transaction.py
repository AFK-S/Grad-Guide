import re

categories = {
    'food': ['grocery', 'restaurant', 'cafe', 'lunch', 'swiggy', 'zomato', 'food', 'chinese', 'dinning', 'pizza', 'burger', 'sushi', 'indian', 'fast food', 'breakfast', 'dinner', 'delivery', 'takeout', 'vegetarian', 'vegan', 'seafood', 'thai', 'mexican', 'italian', 'coffee', 'dessert', 'barbecue', 'fine dining', 'street food'],
    'entertainment': ['movie', 'netflix', 'concert', 'bookmyshow', 'music', 'theater', 'comedy', 'sports', 'gaming', 'streaming', 'binge-watch', 'documentary', 'animation', 'TV series', 'podcast', 'stand-up', 'art', 'museum', 'opera', 'ballet', 'circus', 'magic show', 'karaoke', 'board games', 'escape room', 'virtual reality'],
    'travel': ['hotel', 'train', 'flight', 'ola', 'uber', 'uts', 'idrive', 'car rental', 'bus', 'cruise', 'airbnb', 'travel agency', 'tourism', 'road trip', 'backpacking', 'camping', 'hiking', 'beach', 'mountains', 'sightseeing', 'passport', 'visa', 'foreign exchange', 'adventure sports', 'wildlife safari', 'skiing', 'snowboarding', 'paragliding', 'scuba diving', 'snorkeling', 'surfing', 'cycling', 'motorcycle tour', 'train journey']
}


def ExcelToTransaction(df, date_pattern, num_rows):
    transactions = []
    skip_rows = False
    for i in range(1, num_rows):
        row = df.iloc[i]
        if not re.match(date_pattern, str(row[0])):
            skip_rows = True
        transaction = {
            'date': row[0],
            'narration': row[1],
            'reference_number': row[2],
            'value_date': row[3],
            'withdrawal_amount': row[4],
            'deposit_amount': row[5],
            'closing_balance': row[6]
        }
        if skip_rows == False:
            transactions.append(transaction)
        skip_rows = False
    data = []
    for transaction in transactions:
        category = None
        for key, value in categories.items():
            for v in value:
                if v in transaction['narration'].lower():
                    category = key
        if not category:
            category = 'miscellaneous'
        transaction['category'] = category

        data.append({"amount": str(transaction['withdrawal_amount']) if transaction['withdrawal_amount'] else "-"+str(
            transaction['deposit_amount']), "type_of_transaction": transaction['category'], "date": transaction['date']})

    return str(data)
