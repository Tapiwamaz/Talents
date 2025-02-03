import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()

x = os.getenv('DATABASE_URL')


def connect_to_db():
    connection = psycopg2.connect(str(x))
    cursor = connection.cursor()
    return connection, cursor