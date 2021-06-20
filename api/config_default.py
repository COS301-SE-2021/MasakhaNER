from database.database import User
from database.mockDatabase import mockdatabase

class Config(object):
    DEBUG = False
    TESTING = False
    DB_NAME='REAL'
    DATABASE=User()

class TestingConfig(Config):
    DB_NAME='Mock'
    DATABASE=mockdatabase()