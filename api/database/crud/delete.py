import bcrypt
import random
from flask import request, json
from dotenv import load_dotenv
import psycopg2.extras
import psycopg2
from flask import Flask
from database.email import Email
from database.crud import add, get
import os
import sys
import functools
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

load_dotenv()


def adminDeleteUser(db, id):
    try:
        # db.conn = psycopg2.connect(
        #     dbname=db.DB_NAME, user=db.DB_USER, password=db.DB_PASS, host=db.DB_HOST)
        # db.cur = db.conn.cursor()
        sql = "DELETE FROM users WHERE id =%s;"
        db.cur.execute(sql, (id,))
        db.conn.commit()
        # db.cur.close()
        # db.conn.close()
        return True
    except Exception as e:
        print(f"Database connection error: {e}")
        return False


def adminDeleteModel(db, id):
    try:
        # db.conn = psycopg2.connect(
        #     dbname=db.DB_NAME, user=db.DB_USER, password=db.DB_PASS, host=db.DB_HOST)
        # db.cur = db.conn.cursor()
        sql = "DELETE FROM models WHERE id =%s;"
        db.cur.execute(sql, (id,))
        db.conn.commit()
        # db.cur.close()
        # db.conn.close()
        return True
    except Exception as e:
        print(f"Database connection error: {e}")
        return False


def adminDeleteFeedback(db, id):
    try:
        # db.conn = psycopg2.connect(
        #     dbname=db.DB_NAME, user=db.DB_USER, password=db.DB_PASS, host=db.DB_HOST)
        # db.cur = db.conn.cursor()
        sql = "DELETE FROM feedback WHERE id =%s;"
        db.cur.execute(sql, (id,))
        db.conn.commit()
        # db.cur.close()
        # db.conn.close()
        return True
    except Exception as e:
        print(f"Database connection error: {e}")
        return False
