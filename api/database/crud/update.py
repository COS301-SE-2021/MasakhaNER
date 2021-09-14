import bcrypt
import random
from flask import request, json
from dotenv import load_dotenv
import psycopg2.extras
import psycopg2
from flask import Flask
from database.email import Email
from database.crud import add, get, delete
import os
import sys
import functools
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

load_dotenv()


def verify_user(db, email):
    # db.conn = psycopg2.connect(
    #         dbname=db.DB_NAME, user=db.DB_USER, password=db.DB_PASS, host=db.DB_HOST)
    # db.cur = db.conn.cursor()
    sql = "Update users set verified = True where email=%s;"
    db.cur.execute(sql, (email,))
    db.conn.commit()
    # db.cur.close()
    # db.conn.close()
# admin functions


def resetPassword(db, email, newPassword):
    try:
        encoded_password = bytes(newPassword, encoding='utf-8')
        encrypted_password = bcrypt.hashpw(
            encoded_password, bcrypt.gensalt())
        encrypted_password = encrypted_password.decode('UTF-8')
        # print(encrypted_password)
        sql = "UPDATE users SET password=%s WHERE email=%s;"
        db.cur.execute(sql, (encrypted_password, email))
        db.conn.commit()
        # print("done")
        return True
    except Exception as e:
        print(f"Database connection error: {e}")
        return False


def adminUpdateUser(db, id, firstname, lastname, email, password, isadmin, verified):
    try:
        # db.conn = psycopg2.connect(
        #     dbname=db.DB_NAME, user=db.DB_USER, password=db.DB_PASS, host=db.DB_HOST)
        # db.cur = db.conn.cursor()
        # print("running")
        # if db.findUserByEmail(email) is None:
        encoded_password = bytes(password, encoding='utf-8')
        encrypted_password = bcrypt.hashpw(
            encoded_password, bcrypt.gensalt())
        # print(type(encrypted_password))
        encrypted_password = encrypted_password.decode('UTF-8')
        sql = "Update users set firstname=%s,lastname=%s,password=%s,email=%s,isadmin=%s,verified =%s where id=%s;"
        db.cur.execute(
            sql, (firstname, lastname, encrypted_password, email, isadmin, verified, id))
        db.conn.commit()
        # db.cur.close()
        # db.conn.close()
        # print("done")
        return True
    except Exception as e:
        print(f"Database connection error: {e}")
        return False


def update(db, email, password):
    try:
        # db.conn = psycopg2.connect(
        #     dbname=db.DB_NAME, user=db.DB_USER, password=db.DB_PASS, host=db.DB_HOST)
        # db.cur = db.conn.cursor()
        encoded_password = bytes(password, encoding='utf-8')
        encrypted_password = bcrypt.hashpw(
            encoded_password, bcrypt.gensalt())
        # print(type(encrypted_password))
        encrypted_password = encrypted_password.decode('UTF-8')
        # print(email)
        sql = "UPDATE users SET password =%s WHERE email= %s;"
        db.cur.execute(sql, (encrypted_password, email))
        db.conn.commit()
        # db.cur.close()
        # db.conn.close()
        return True
    except Exception as e:
        #print(f"Database connection error: {e}")
        return False


def setModels(db, name):
    # db.conn = psycopg2.connect(
    #         dbname=db.DB_NAME, user=db.DB_USER, password=db.DB_PASS, host=db.DB_HOST)
    # print(name)
    sql = "SELECT model FROM models where id=%s"
    db.cur.execute(sql, (name,))
    db_user = db.cur.fetchone()
    db.conn.commit()

    return db_user


def update_user_details(db, email, name, surname):
    try:
        sql = "UPDATE users SET firstname =%s, lastname =%s WHERE email=%s;"
        db.cur.execute(sql, (name, surname, email))
        db.conn.commit()
        #  db.cur.close()
        #  db.conn.close()
        return True
    except Exception as e:
        print(f"Database connection error: {e}")
        return False
