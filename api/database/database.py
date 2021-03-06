import bcrypt
import random
from flask import request, json
from dotenv import load_dotenv
import psycopg2.extras
import psycopg2
from flask import Flask
from database.send_email import Email
import os
import sys
import functools
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

load_dotenv()


class User:
    """
    Constructor:
        Connects to the database.
    Parameters:
        None
    Returns:
        Boolean:Returns false if database connection fails
    """

    def __init__(self):
        try:
            self.DB_HOST = os.environ.get('DB_HOST')
            self.DB_NAME = os.environ.get('DB_NAME')
            self.DB_PASS = os.environ.get('DB_PASS')
            self.DB_USER = os.environ.get('DB_USER')
            self.conn = psycopg2.connect(
                dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
            self.cur = self.conn.cursor()
        except:
            return None

    """
    Register Function:
        Registers user by iunserting details into
        the database. Password is encrypted using bcrypt, 
        activation code is generated and sent to the user 
        via the users email.
    Parameters:
        firstname (string): User's firstname
        lastname (string): User's lastname
        email (string): User's email
        password (string): User's password
    Returns:
        Boolean:Returns true or false if user register successfully
    """

    def register(self, firstname, lastname, email, password):
        try:
            # self.conn = psycopg2.connect(
            #     dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
            # self.cur = self.conn.cursor()
            encoded_password = bytes(password, encoding='utf-8')
            encrypted_password = bcrypt.hashpw(
                encoded_password, bcrypt.gensalt())
            # print(type(encrypted_password))
            encrypted_password = encrypted_password.decode('UTF-8')
            code = str(random.randint(1000, 9999))

            sql = "INSERT INTO users (firstname,lastname,password,email,isadmin,activationcode, verified) VALUES(%s,%s,%s,%s,%s,%s,%s)"
            self.cur.execute(
                sql, (firstname, lastname, encrypted_password, email, False, code, False))
            sendemail = Email()
            message = """\
            Masakhane Activation Code

            Here is your activation code: """
            message += code
            sendemail.sendMessage(email, message)
            print("sent")
            self.conn.commit()
            # self.cur.close()
            # self.conn.close()
            return True
        except Exception as e:
            print(f"Database connection error: {e}")
            return False

    """
    Get code Function:
        Takes in the users email and queries the database
        to return the activation code.
    Parameters:
        email (string): User's email
    Returns:
        Boolean:Returns true or false if user register successfully
    """

    def get_code(self, email):
        self.conn = psycopg2.connect(
            dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
        self.cur = self.conn.cursor()
        sql = "SELECT activationcode FROM users where email=%s;"
        self.cur.execute(sql, (email,))
        var = self.cur.fetchone()
        self.conn.commit()
        # self.cur.close()
        # self.conn.close()
        if var != None:
            code = int(var[0])
            return code
        else:
            return None

    """
    Login Function:
        Takes in the users email and password and
        queries the databse to check if the
        user exists.
    Parameters:
        email (string): User's email
    Returns:
        Boolean:Returns true or false if user logged in successfully
    """

    def login(self, email, password):
        # print("running login")
        # self.conn = psycopg2.connect(
        #         dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
        # self.cur = self.conn.cursor()
        sql = "SELECT password FROM users where email=%s;"
        self.cur.execute(sql, (email,))
        db_password = self.cur.fetchone()
        self.conn.commit()
        # self.cur.close()
        # self.conn.close()
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

    def verify_user(self, email):
        # self.conn = psycopg2.connect(
        #         dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
        # self.cur = self.conn.cursor()
        sql = "Update users set verified = True where email=%s;"
        self.cur.execute(sql, (email,))
        self.conn.commit()
        # self.cur.close()
        # self.conn.close()
    # admin functions

    def findUserByEmail(self, email):
        # self.conn = psycopg2.connect(
        #         dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
        # self.cur = self.conn.cursor()
        sql = "SELECT * FROM users where email=%s;"
        self.cur.execute(sql, (email,))
        db_user = self.cur.fetchone()
        self.conn.commit()
        # self.cur.close()
        # self.conn.close()
        return db_user

    def resetPassword(self, email, newPassword):
        try:
            encoded_password = bytes(newPassword, encoding='utf-8')
            encrypted_password = bcrypt.hashpw(
                encoded_password, bcrypt.gensalt())
            encrypted_password = encrypted_password.decode('UTF-8')
            # print(encrypted_password)
            sql = "UPDATE users SET password=%s WHERE email=%s;"
            self.cur.execute(sql, (encrypted_password, email))
            self.conn.commit()
            # print("done")
            return True
        except Exception as e:
            print(f"Database connection error: {e}")
            return False

    def isAdmin(self, email):
        # self.conn = psycopg2.connect(
        #         dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
        # self.cur = self.conn.cursor()
        sql = "SELECT isadmin FROM users where email=%s;"
        self.cur.execute(sql, (email,))
        db_user = self.cur.fetchone()
        self.conn.commit()
        # self.cur.close()
        # self.conn.close()
        if db_user[0] == True:
            return True
        return False

    def getAllUsers(self):
        # self.conn = psycopg2.connect(
        #         dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
        # self.cur = self.conn.cursor()
        self.cur.execute(f"SELECT * FROM users;")
        db_user = self.cur.fetchall()
        self.conn.commit()
        # self.cur.close()
        # self.conn.close()
        return db_user

    def getUser(self, id):
        # self.conn = psycopg2.connect(
        #         dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
        # self.cur = self.conn.cursor()
        sql = "SELECT * FROM users WHERE id=%s;"
        self.cur.execute(sql, (id,))
        db_user = self.cur.fetchone()
        self.conn.commit()
        # self.cur.close()
        # self.conn.close()
        return db_user

    def getModel(self, id):
        # self.conn = psycopg2.connect(
        #         dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
        # self.cur = self.conn.cursor()
        sql = "SELECT * FROM models WHERE id=%s;"
        self.cur.execute(sql, (id,))
        db_model = self.cur.fetchone()
        self.conn.commit()
        # self.cur.close()
        # self.conn.close()
        return db_model

    def insertBob(self):
        # self.conn = psycopg2.connect(
        #         dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
        # self.cur = self.conn.cursor()
        sql = "INSERT INTO users (id,firstname,lastname,password,email,isadmin,activationcode, verified) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
        self.cur.execute(sql, (0, 'bob', 'bob', 'password',
                         'bob@bob.com', False, 000, True))
        self.conn.commit()

    def deleteLast(self):
        # self.conn = psycopg2.connect(
        #         dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
        # self.cur = self.conn.cursor()
        sql = "DELETE FROM users WHERE id in ( SELECT id FROM users ORDER BY id desc LIMIT 1)"
        #sql = "INSERT INTO users (id,firstname,lastname,password,email,isadmin,activationcode, verified) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
        self.cur.execute(sql)
        self.conn.commit()

    def deleteBob(self):
        # self.conn = psycopg2.connect(
        #         dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
        # self.cur = self.conn.cursor()
        sql = "DELETE FROM users WHERE id=0;"
        #sql = "INSERT INTO users (id,firstname,lastname,password,email,isadmin,activationcode, verified) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
        self.cur.execute(sql)
        self.conn.commit()

    def adminAddUser(self, firstname, lastname, email, password, isadmin):
        try:

            encoded_password = bytes(password, encoding='utf-8')
            encrypted_password = bcrypt.hashpw(
                encoded_password, bcrypt.gensalt())
            encrypted_password = encrypted_password.decode('UTF-8')
            sql = "INSERT INTO users (firstname,lastname,password,email,isadmin,activationcode, verified) VALUES(%s,%s,%s,%s,%s,%s,%s)"
            self.cur.execute(
                sql, (firstname, lastname, encrypted_password, email, isadmin, 000, True))
            self.conn.commit()
            sql = "SELECT id FROM users WHERE email = %s;"
            self.cur.execute(sql, (email,))
            id = self.cur.fetchone()
            return id
        except Exception as e:
            print(f"Database connection error: {e}")
            return None

    def adminUpdateUser(self, id, firstname, lastname, email, password, isadmin, verified):
        try:
            # self.conn = psycopg2.connect(
            #     dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
            # self.cur = self.conn.cursor()
            # print("running")
            # if self.findUserByEmail(email) is None:
            encoded_password = bytes(password, encoding='utf-8')
            encrypted_password = bcrypt.hashpw(
                encoded_password, bcrypt.gensalt())
            # print(type(encrypted_password))
            encrypted_password = encrypted_password.decode('UTF-8')
            sql = "Update users set firstname=%s,lastname=%s,password=%s,email=%s,isadmin=%s,verified =%s where id=%s;"
            self.cur.execute(
                sql, (firstname, lastname, encrypted_password, email, isadmin, verified, id))
            self.conn.commit()
            # self.cur.close()
            # self.conn.close()
            # print("done")
            return True
        except Exception as e:
            print(f"Database connection error: {e}")
            return False

    def adminDeleteUser(self, id):
        try:
            # self.conn = psycopg2.connect(
            #     dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
            # self.cur = self.conn.cursor()
            sql = "DELETE FROM users WHERE id =%s;"
            self.cur.execute(sql, (id,))
            self.conn.commit()
            # self.cur.close()
            # self.conn.close()
            return True
        except Exception as e:
            print(f"Database connection error: {e}")
            return False

    def update(self, email, password):
        try:
            # self.conn = psycopg2.connect(
            #     dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
            # self.cur = self.conn.cursor()
            encoded_password = bytes(password, encoding='utf-8')
            encrypted_password = bcrypt.hashpw(
                encoded_password, bcrypt.gensalt())
            # print(type(encrypted_password))
            encrypted_password = encrypted_password.decode('UTF-8')
            # print(email)
            sql = "UPDATE users SET password =%s WHERE email= %s;"
            self.cur.execute(sql, (encrypted_password, email))
            self.conn.commit()
            # self.cur.close()
            # self.conn.close()
            return True
        except Exception as e:
            #print(f"Database connection error: {e}")
            return False

    def adminAddModel(self, modelname, model):
        try:
            sql = "INSERT INTO models (modelname,model) VALUES(%s,%s)"
            self.cur.execute(sql, (modelname, model))
            self.conn.commit()
            sql = "SELECT id FROM models WHERE model = %s;"
            self.cur.execute(sql, (model,))
            id = self.cur.fetchone()
            return id
        except Exception as e:
            print(f"Database connection error: {e}")
            return None

    def getAllModels(self):
        # self.conn = psycopg2.connect(
        #         dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
        # self.cur = self.conn.cursor()
        self.cur.execute(f"SELECT * FROM models;")
        db_user = self.cur.fetchall()
        self.conn.commit()
        # self.cur.close()
        # self.conn.close()
        return db_user

    def setModels(self, name):
        # self.conn = psycopg2.connect(
        #         dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
        # print(name)
        sql = "SELECT model FROM models where id=%s"
        self.cur.execute(sql, (name,))
        db_user = self.cur.fetchone()
        self.conn.commit()

        return db_user

    def adminDeleteModel(self, id):
        try:
            # self.conn = psycopg2.connect(
            #     dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
            # self.cur = self.conn.cursor()
            sql = "DELETE FROM models WHERE id =%s;"
            self.cur.execute(sql, (id,))
            self.conn.commit()
            # self.cur.close()
            # self.conn.close()
            return True
        except Exception as e:
            print(f"Database connection error: {e}")
            return False

    def addFeedback(self, feedback):
        try:
            sql = "INSERT INTO feedback (feedback) VALUES (%s)"
            self.cur.execute(sql, (feedback,))
            self.conn.commit()
            return True
        except Exception as e:
            print(f"Database connection error: {e}")
            return False

    def adminAddFeedback(self, feedback):
        try:
            sql = "INSERT INTO feedback (feedback) VALUES (%s)"
            self.cur.execute(sql, (feedback,))
            self.conn.commit()
            return True
        except Exception as e:
            print(f"Database connection error: {e}")
            return False

    def adminDeleteFeedback(self, id):
        try:
            # self.conn = psycopg2.connect(
            #     dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
            # self.cur = self.conn.cursor()
            sql = "DELETE FROM feedback WHERE id =%s;"
            self.cur.execute(sql, (id,))
            self.conn.commit()
            # self.cur.close()
            # self.conn.close()
            return True
        except Exception as e:
            print(f"Database connection error: {e}")
            return False

    def adminGetAllFeedback(self):
        try:
            sql = "SELECT * FROM feedback"
            self.cur.execute(sql)
            feedback = self.cur.fetchall()
            self.conn.commit()
            return feedback
        except Exception as e:
            print(f"Database connection error: {e}")
            return False

    def adminGetFeedback(self, id):
        # self.conn = psycopg2.connect(
        #         dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
        # self.cur = self.conn.cursor()
        try:
            sql = "SELECT * FROM feedback WHERE id=%s;"
            self.cur.execute(sql, (id,))
            feedback = self.cur.fetchone()
            self.conn.commit()
            return feedback
        except Exception as e:
            print(f"Database connection error: {e}")
            return None

    def update_user_details(self, email, name, surname):
        try:
            sql = "UPDATE users SET firstname =%s, lastname =%s WHERE email=%s;"
            self.cur.execute(sql, (name, surname, email))
            self.conn.commit()
            #  self.cur.close()
            #  self.conn.close()
            return True
        except Exception as e:
            print(f"Database connection error: {e}")
            return False

    def input(self, inputObject):
        worked = False
        for x in inputObject:
            name = x['word']
            entity = x['entity']
            count = -1

            try:
                print('find count')
                sql = "SELECT * FROM input WHERE name = %s AND entity = %s"
                self.cur.execute(sql, (name, entity,))
                record = self.cur.fetchone()
                count = record[3]
                print(count)
                self.conn.commit()
            except Exception as e:
                print(f"Datebase connection error: {e}")
                count = -1
            if(count < 0):
                try:
                    print(count)
                    count = 1
                    sql = "INSERT INTO input (name, entity, count) VALUES(%s, %s, %s)"
                    self.cur.execute(sql, (name, entity, count,))
                    self.conn.commit()
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
                    self.cur.execute(sql, (str(count), name,))
                    self.conn.commit()
                    worked = True
                except Exception as e:
                    print(f"Database connection error: {e}")
                    worked = False
        return worked

    def get_all_input(self):
        try:
            sql = "SELECT * FROM input"
            self.cur.execute(sql)
            input = self.cur.fetchall()
            self.conn.commit()
            return input
        except Exception as e:
            print(f"Database connection error: {e}")
            return None
