import bcrypt
import random
from flask import request, json
from dotenv import load_dotenv
import psycopg2.extras
import psycopg2
from flask import Flask
from database.email import Email
from database.crud import add
import os
import sys
import functools
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

load_dotenv()


def register(db, firstname, lastname, email, password):
    try:
        # db.conn = psycopg2.connect(
        #     dbname=db.DB_NAME, user=db.DB_USER, password=db.DB_PASS, host=db.DB_HOST)
        # db.cur = db.conn.cursor()
        encoded_password = bytes(password, encoding='utf-8')
        encrypted_password = bcrypt.hashpw(
            encoded_password, bcrypt.gensalt())
        # print(type(encrypted_password))
        encrypted_password = encrypted_password.decode('UTF-8')
        code = str(random.randint(1000, 9999))

        sql = "INSERT INTO users (firstname,lastname,password,email,isadmin,activationcode, verified) VALUES(%s,%s,%s,%s,%s,%s,%s)"
        db.cur.execute(
            sql, (firstname, lastname, encrypted_password, email, False, code, False))
        sendemail = Email()
        message = """\
        Masakhane Activation Code

        Here is your activation code: """
        message += code
        sendemail.send_email(message, email)
        print("sent")
        db.conn.commit()
        # db.cur.close()
        # db.conn.close()
        return True
    except Exception as e:
        print(f"Database connection error: {e}")
        return False


def adminAddUser(db, firstname, lastname, email, password, isadmin):
    try:

        encoded_password = bytes(password, encoding='utf-8')
        encrypted_password = bcrypt.hashpw(
            encoded_password, bcrypt.gensalt())
        encrypted_password = encrypted_password.decode('UTF-8')
        sql = "INSERT INTO users (firstname,lastname,password,email,isadmin,activationcode, verified) VALUES(%s,%s,%s,%s,%s,%s,%s)"
        db.cur.execute(
            sql, (firstname, lastname, encrypted_password, email, isadmin, 000, True))
        db.conn.commit()
        sql = "SELECT id FROM users WHERE email = %s;"
        db.cur.execute(sql, (email,))
        id = db.cur.fetchone()
        return id
    except Exception as e:
        print(f"Database connection error: {e}")
        return None


def adminAddModel(db, modelname, model):
    try:
        sql = "INSERT INTO models (modelname,model) VALUES(%s,%s)"
        db.cur.execute(sql, (modelname, model))
        db.conn.commit()
        sql = "SELECT id FROM models WHERE model = %s;"
        db.cur.execute(sql, (model,))
        id = db.cur.fetchone()
        return id
    except Exception as e:
        print(f"Database connection error: {e}")
        return None


def addFeedback(db, feedback):
    db = db
    return add.addFeedback(db,  feedback)


def adminAddFeedback(db, feedback):
    try:
        sql = "INSERT INTO feedback (feedback) VALUES (%s)"
        db.cur.execute(sql, (feedback,))
        db.conn.commit()
        return True
    except Exception as e:
        print(f"Database connection error: {e}")
        return False


def input(db, inputObject):
    worked = False
    for x in inputObject:
        name = x['word']
        entity = x['entity']
        count = -1

        try:
            print('find count')
            sql = "SELECT * FROM input WHERE name = %s AND entity = %s"
            db.cur.execute(sql, (name, entity,))
            record = db.cur.fetchone()
            count = record[3]
            print(count)
            db.conn.commit()
        except Exception as e:
            print(f"Datebase connection error: {e}")
            count = -1
        if(count < 0):
            try:
                print(count)
                count = 1
                sql = "INSERT INTO input (name, entity, count) VALUES(%s, %s, %s)"
                db.cur.execute(sql, (name, entity, count,))
                db.conn.commit()
                worked = True
                print(count)
            except Exception as e:
                print('first')
                print(f"Database connection error: {e}")
                return False
        else:
            try:
                count = count+1
                sql = "UPDATE input  SET count = %s WHERE name = %s"
                db.cur.execute(sql, (str(count), name,))
                db.conn.commit()
                worked = True
            except Exception as e:
                print(f"Database connection error: {e}")
                worked = False
    return worked
