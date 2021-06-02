from flask import Flask
import psycopg2
import psycopg2.extras
from dotenv import load_dotenv
import os

load_dotenv()


DB_HOST=os.environ.get('DB_HOST')
DB_NAME=os.environ.get('DB_NAME')
DB_PASS=os.environ.get('DB_PASS')
DB_USER=os.environ.get('DB_USER')
print('test')
conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST)
cur = conn.cursor()

#cur.execute("CREATE TABLE user (id SERIAL PRIMARY KEY, name VARCHAR, lastname VARCHAR);")
#cur.execute("INSERT INTO student (name) VALUES(%s)", ("Sihle",))

# cur.execute("DELETE FROM users WHERE firstname='Khotso';")

# cur.execute("SELECT * FROM users;")

# print(cur.fetchall())

# conn.commit()

# cur.close()

# conn.close()
