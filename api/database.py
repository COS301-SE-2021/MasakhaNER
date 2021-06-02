from flask import Flask
import psycopg2
import psycopg2.extras
from dotenv import load_dotenv
import os
from flask import request

load_dotenv()

word='yes'

class User:
    def __init__(self):
        self.DB_HOST=os.environ.get('DB_HOST')
        self.DB_NAME=os.environ.get('DB_NAME')
        self.DB_PASS=os.environ.get('DB_PASS')
        self.DB_USER=os.environ.get('DB_USER')
        self.conn = psycopg2.connect(dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
        print('works')

    def register(self, user_json):
        self.firstname = user_json.firstname
        self.lastname = user_json.lastname
        self.password = user_json.password
        self.email = user_json.email
        self.isAdmin = user_json.isAdmin
        self.activationCode = "1000"

    str="user"


# DB_HOST=os.environ.get('DB_HOST')
# DB_NAME=os.environ.get('DB_NAME')
# DB_PASS=os.environ.get('DB_PASS')
# DB_USER=os.environ.get('DB_USER')
#  print('test')
# conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST)
# cur = conn.cursor()

#cur.execute("CREATE TABLE user (id SERIAL PRIMARY KEY, name VARCHAR, lastname VARCHAR);")
#cur.execute("INSERT INTO student (name) VALUES(%s)", ("Sihle",))

# cur.execute("DELETE FROM users WHERE firstname='Khotso';")

# cur.execute("SELECT * FROM users;")

# print(cur.fetchall())

# conn.commit()

# cur.close()

# conn.close()
