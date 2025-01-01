from dotenv import load_dotenv
import os

load_dotenv()

x = os.getenv('PASSWORD')
HOST = os.getenv('REACT_APP_HOST') 
DB = os.getenv('REACT_APP_DATABASE') 
USER = os.getenv('REACT_APP_DBUSER') 
PASSWORD = os.getenv('REACT_APP_POSTGRES_PASSWORD') 

DB_CONFIG = {
    'host': HOST,
    'database': DB,
    'user': USER,
    'password': PASSWORD
}