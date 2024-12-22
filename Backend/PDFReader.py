from pypdf import PdfReader

def remove_commas(number):
    out = ""
    for chr in number:
        if chr != ",":
            out += chr
    return out

def is_valid_number(number):
    try:
        float(number)
        return True
    except ValueError:
        return False   

def get_index_of_subtring(substring,text_array):
    for i in range(len(text_array)):
        if substring in text_array[i]:
            return i 
    return Null       


class Transaction:
    def __init__(self, id,details = "",balance=0,change=0,credit=True,service_charge=False,date=""):
        self.id = id
        self.details = details
        self.balance = balance
        self.change = change
        self.credit = credit
        self.service_charge = service_charge
        self.date = date

    def print_info(self):
        print("Details: ", self.details)
        print("Balance: ", self.balance)
        print("Money Change: ", self.change)
        print("Date: ", self.date, "2024")
        print("Service charge: ", self.service_charge)
        print("Credit: ", self.credit)


class Transactions:
    def __init__(self):
        self.transactions = {}
        self.number_of_transactions = 0
        self.running_balance = 0.0
        self.running_credits = 0.0
        self.running_debits = 0.0
        self.running_charges = 0.0

    def fetch_transaction(self,id):
        return self.transactions[str(id)]

    def insert_transaction(self,transaction):
        self.transactions[str(transaction.id)] = transaction
        self.number_of_transactions += 1
        if transaction.credit:
                self.running_credits += transaction.change
                self.running_balance += transaction.change
        else:
            self.running_debits += transaction.change
            self.running_balance -= transaction.change

        if transaction.service_charge:
            self.running_charges += transaction.change    

def read_transactions(file):
    # creating a pdf reader object
    reader = PdfReader(file)
    all_transactions = Transactions()

    for pagenum in range(len(reader.pages)):

        page = reader.pages[pagenum]
    
        page_text = page.extract_text()
        page_lines = page_text.split('\n')

        start_transactions = get_index_of_subtring("BALANCE",page_lines)+1

        if pagenum == len(reader.pages)-1:
            end_transactions = get_index_of_subtring("VAT Summary",page_lines)-1
        else:    
            end_transactions = len(page_lines)

        if pagenum ==0:
            all_transactions.running_balance = float(remove_commas(page_lines[start_transactions-1].split(" ")[-1]))


        for index in range(start_transactions,end_transactions):
            line = page_lines[index].split(" ")
            if len(line) < 5 or not is_valid_number(remove_commas(line[-1])) or not is_valid_number(remove_commas(line[-4][0:-1])):
                # fetch transaction 
                x = all_transactions.fetch_transaction(all_transactions.number_of_transactions-1)
                # change the details 
                x.details += page_lines[index]
                continue

            line_balance =float(remove_commas(line[-1]))
            line_date = line[-2]
            line_month = line[-3]
            line_credit_bool = True


            line_change = line[-4]
            if line_change[-1] == "-":
                line_credit_bool = False
                line_change = line_change[0:-1]

            line_change = float(remove_commas(line_change))
            num_details =  len(line) - 4
            line_details = ""
            line_service_charge = False

            for i in range(num_details):
                if i == num_details-1 and line[i] == "##":
                    line_service_charge = True
                else:
                    line_details += line[i] + " "

            temp = Transaction(all_transactions.number_of_transactions ,line_details,line_balance,line_change,line_credit_bool,line_service_charge,line_date)
            all_transactions.insert_transaction(temp) 

    return all_transactions

