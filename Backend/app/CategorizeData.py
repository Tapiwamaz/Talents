def closeness(transaction,centroid):
    result = 0
    if 'descriptive_words' in centroid:
        for word in centroid['descriptive_words']:
            if word in transaction["details"]:
                result += 1
                
    if transaction["service_charge"] == centroid['service_charge']:
        result += 1
    else:
        result -= 0.1
        
    if transaction["credit"] == centroid['credit']:
        result += 1  
    else:
        result -= 0.1    
        
    if 'date' in centroid:
        if int(transaction["date"]) in centroid['date']:
            result += 1
        
    return result  

def closest_centroid(transaction, centroids):
    max_value = -1 
    max_index = -1 
    for index in range(len(centroids)):
        value = closeness(transaction,centroids[index])
        if max_value < value:
            max_index = index
            max_value = value
    return max_index

def categorize(cat_dict,categories,transactions,centroids):
    for transaction in transactions:
        cat_index = closest_centroid(transaction,centroids)
        category = categories[cat_index]
        cat_dict[category].append(transaction)
        
def summarize(cat_dict,categories,summative_dict):
    for cat in categories:
        arr = cat_dict[cat]
        for index in range(len(arr)):
            summative_dict[cat] += float("{0:.2f}".format(arr[index]["change"]))


def categorize_main(transactions):

    # now we must decide which parameters will be used to categorize and the 'distance' function
    # # date, month, service_charge, credit, amount, details

    categories = ['Groceries', 'Utilities', 'Investment', 'Transfers', 'Income', 'Bank Fees']

    # defice centroids as an array of objects, each element being the initial 'center' of the same indexed category
    # # e.g for Transfers we can have { descriptive_words: ['IB']...} and for Debit Orders { date: 17, descriptive_words: ['Spotify','Netflix']...}

    centroids = [
                    {'descriptive_words': ['PURCHASE', 'PNP'], 'service_charge': False,'credit': False},
                    {'descriptive_words': ['MTN','UBER','BOLT','SPOTIFY','PURCHASE'], 'service_charge': False, 'credit': False},
                    {'descriptive_words': ['VALR','VR2SL93PXM'], 'service_charge': False, 'credit': False},
                    {'descriptive_words': ['IB','PAYMENT'], 'service_charge': False, 'credit': False},
                    {'descriptive_words': ['TRANSFERS'],'date': [30,31,1,2,3,5], 'service_charge': False, 'credit': True},
                    {'descriptive_words': ['FEE','DECLINE'],'service_charge': True, 'credit': False},
                ]

    cat_dict = {
        'Groceries': [], 
        'Utilities': [], 
        'Investment': [], 
        'Transfers': [], 
        'Income': [], 
        'Bank Fees': []
        }


    categorize(cat_dict,categories,transactions,centroids)

    summative_dict = {  
        'Groceries': 0.0, 
        'Utilities': 0.0, 
        'Investment': 0.0, 
        'Transfers': 0.0, 
        'Income': 0.0, 
        'Bank Fees': 0.0
        }
    
    summarize(cat_dict,categories,summative_dict)
    return summative_dict
    

  

