from dotenv import load_dotenv
import os
import psycopg2
from psycopg2 import errors

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
def connect_to_db():
    connection = psycopg2.connect(dbname=DB_CONFIG["database"],
                                        user=DB_CONFIG["user"],
                                        host=DB_CONFIG["host"],
                                        password=DB_CONFIG["password"])
    cursor = connection.cursor()
    return connection, cursor