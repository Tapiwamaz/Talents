from  flask import Flask, request, jsonify
from flask_migrate import Migrate
import logging
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import logging 

from flask_cors import CORS
from psycopg2 import errors
import psycopg2



app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db = SQLAlchemy(app)
migrate= Migrate(app,db)

from app import DB, CategorizeData, PDFReader

if not app.debug:
    stream_handler = logging.StreamHandler()
    stream_handler.setLevel(logging.INFO)
    app.logger.addHandler(stream_handler)

app.logger.setLevel(logging.INFO)
app.logger.info("Flask app startup")
