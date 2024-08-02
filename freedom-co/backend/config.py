from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS')
    SECRET_KEY = os.getenv('SECRET_KEY')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')

class PixConfig:
    NAME = os.getenv('PIX_NAME')
    KEY = os.getenv('PIX_KEY')
    CITY = os.getenv('PIX_CITY')
    TXT_ID = os.getenv('PIX_TXT_ID')