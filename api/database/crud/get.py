import bcrypt
import random
from flask import request, json
from dotenv import load_dotenv
import psycopg2.extras
import psycopg2
from flask import Flask
from database.email import Email
import os
import sys
import functools
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

load_dotenv()


def login(db, email, password):
    # print("running login")
    # db.conn = psycopg2.connect(
    #         dbname=db.DB_NAME, user=db.DB_USER, password=db.DB_PASS, host=db.DB_HOST)
    # db.cur = db.conn.cursor()
    sql = "SELECT password FROM users where email=%s;"
    db.cur.execute(sql, (email,))
    db_password = db.cur.fetchone()
    db.conn.commit()
    # db.cur.close()
    # db.conn.close()
    # print(db_password)
    if db_password != None:
        if bcrypt.checkpw(password.encode('UTF-8'), db_password[0].encode('UTF-8')):
            #print("password works")
            return True
        else:
            return False
    return False


"""
very=ify user Function:
    verifies user based on code passed in
Parameters:
    email (string): User's email
Returns:
    Boolean:Returns true or false if user register successfully
"""


def get_code(db, email):
    db.conn = psycopg2.connect(
        dbname=db.DB_NAME, user=db.DB_USER, password=db.DB_PASS, host=db.DB_HOST)
    db.cur = db.conn.cursor()
    sql = "SELECT activationcode FROM users where email=%s;"
    db.cur.execute(sql, (email,))
    var = db.cur.fetchone()
    db.conn.commit()
    # db.cur.close()
    # db.conn.close()
    if var != None:
        code = int(var[0])
        return code
    else:
        return None


def findUserByEmail(db, email):
    # db.conn = psycopg2.connect(
    #         dbname=db.DB_NAME, user=db.DB_USER, password=db.DB_PASS, host=db.DB_HOST)
    # db.cur = db.conn.cursor()
    sql = "SELECT * FROM users where email=%s;"
    db.cur.execute(sql, (email,))
    db_user = db.cur.fetchone()
    db.conn.commit()
    # db.cur.close()
    # db.conn.close()
    return db_user


def isAdmin(db, email):
    # db.conn = psycopg2.connect(
    #         dbname=db.DB_NAME, user=db.DB_USER, password=db.DB_PASS, host=db.DB_HOST)
    # db.cur = db.conn.cursor()
    sql = "SELECT isadmin FROM users where email=%s;"
    db.cur.execute(sql, (email,))
    db_user = db.cur.fetchone()
    db.conn.commit()
    # db.cur.close()
    # db.conn.close()
    if db_user[0] == True:
        return True
    return False


def getAllUsers(db):
    # db.conn = psycopg2.connect(
    #         dbname=db.DB_NAME, user=db.DB_USER, password=db.DB_PASS, host=db.DB_HOST)
    # db.cur = db.conn.cursor()
    db.cur.execute(f"SELECT * FROM users;")
    db_user = db.cur.fetchall()
    db.conn.commit()
    # db.cur.close()
    # db.conn.close()
    return db_user


def getUser(db, id):
    # db.conn = psycopg2.connect(
    #         dbname=db.DB_NAME, user=db.DB_USER, password=db.DB_PASS, host=db.DB_HOST)
    # db.cur = db.conn.cursor()
    sql = "SELECT * FROM users WHERE id=%s;"
    db.cur.execute(sql, (id,))
    db_user = db.cur.fetchone()
    db.conn.commit()
    # db.cur.close()
    # db.conn.close()
    return db_user


def getModel(db, id):
    # db.conn = psycopg2.connect(
    #         dbname=db.DB_NAME, user=db.DB_USER, password=db.DB_PASS, host=db.DB_HOST)
    # db.cur = db.conn.cursor()
    sql = "SELECT * FROM models WHERE id=%s;"
    db.cur.execute(sql, (id,))
    db_model = db.cur.fetchone()
    db.conn.commit()
    # db.cur.close()
    # db.conn.close()
    return db_model


def getAllModels(db):
    # db.conn = psycopg2.connect(
    #         dbname=db.DB_NAME, user=db.DB_USER, password=db.DB_PASS, host=db.DB_HOST)
    # db.cur = db.conn.cursor()
    db.cur.execute(f"SELECT * FROM models;")
    db_user = db.cur.fetchall()
    db.conn.commit()
    # db.cur.close()
    # db.conn.close()
    return db_user


def adminGetAllFeedback(db):
    try:
        sql = "SELECT * FROM feedback"
        db.cur.execute(sql)
        feedback = db.cur.fetchall()
        db.conn.commit()
        return feedback
    except Exception as e:
        print(f"Database connection error: {e}")
        return False


def adminGetFeedback(db, id):
    # db.conn = psycopg2.connect(
    #         dbname=db.DB_NAME, user=db.DB_USER, password=db.DB_PASS, host=db.DB_HOST)
    # db.cur = db.conn.cursor()
    try:
        sql = "SELECT * FROM feedback WHERE id=%s;"
        db.cur.execute(sql, (id,))
        feedback = db.cur.fetchone()
        db.conn.commit()
        return feedback
    except Exception as e:
        print(f"Database connection error: {e}")
        return None


def get_all_input(db):
    try:
        sql = "SELECT * FROM input"
        db.cur.execute(sql)
        input = db.cur.fetchall()
        db.conn.commit()
        return input
    except Exception as e:
        print(f"Database connection error: {e}")
        return None
