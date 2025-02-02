import os
import psycopg2
from psycopg2 import errors


x = os.getenv('DATABASE_URL')



def connect_to_db():
    connection = psycopg2.connect(str(x))
    cursor = connection.cursor()
    return connection, cursor