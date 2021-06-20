import bcrypt
from flask import request
from dotenv import load_dotenv
import psycopg2.extras
import psycopg2
from flask import Flask
from database.email import Email
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

#import os

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
            encoded_password = bytes(password, encoding='utf-8')
            encrypted_password = bcrypt.hashpw(
                encoded_password, bcrypt.gensalt())
            print(type(encrypted_password))
            encrypted_password = encrypted_password.decode('UTF-8')
            code = '1111'

            sql = "INSERT INTO users (firstname,lastname,password,email,isadmin,activationcode, verified) VALUES(%s,%s,%s,%s,%s,%s,%s)"

            self.cur.execute(sql,(firstname,lastname,encrypted_password,email,False,code,False))
            #sendemail = Email()
            # message = """\
            # Masakhane Activation Code

            # Here is your activation code: 1111 """
            #sendemail.send_email(message, email)
            self.conn.commit()
            self.cur.close()
            self.conn.close()
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
        sql = "SELECT activationcode FROM users where email=%s;"
        self.cur.execute(sql,(email,))
        var = self.cur.fetchone()
        self.conn.commit()
        if var != None:
            return var[0]
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
        sql = "SELECT password FROM users where email=%s;"
        self.cur.execute(sql,(email,))
        db_password = self.cur.fetchone()
        self.conn.commit()
        self.cur.close()
        self.conn.close()
        print(db_password)
        if db_password != None:
            if bcrypt.checkpw(password.encode('UTF-8'), db_password[0].encode('UTF-8')):
                print("password works")
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
        sql = "Update users set verified = True where email=%s;"
        self.cur.execute(sql,(email,))
        self.conn.commit()
        self.cur.close()
        self.conn.close()
    # admin functions

    def findUserByEmail(self, email):
        sql ="SELECT * FROM users where email=%s;"
        self.cur.execute(sql,(email,))
        db_user = self.cur.fetchone()
        self.conn.commit()
        self.cur.close()
        self.conn.close()
        return db_user

    def getAllUsers(self):
        self.cur.execute(f"SELECT * FROM users;")
        db_user = self.cur.fetchall()
        self.conn.commit()
        self.cur.close()
        self.conn.close()
        return db_user
    
    def getUser(self, id):
        sql = "SELECT * FROM users WHERE id=%s;"
        self.cur.execute(sql,(id,))
        db_user = self.cur.fetchone()
        self.conn.commit()
        self.cur.close()
        self.conn.close()
        return db_user

    def adminAddUser(self, firstname, lastname, email, password, isadmin):
        try:
            # encoded_password = bytes(password, encoding='utf-8')
            # encrypted_password = str(bcrypt.hashpw(
            #     encoded_password, bcrypt.gensalt()))
            # encrypted_password_2 = encrypted_password[1:]
            sql = "INSERT INTO users (firstname,lastname,password,email,isadmin,activationcode, verified) VALUES(%s,%s,%s,%s,%s,%s,%s)"
            self.cur.execute(sql,(firstname, lastname, password,email,isadmin,000,True))
            self.conn.commit()
            self.cur.close()
            self.conn.close()
            return True
        except Exception as e:
            print(f"Database connection error: {e}")
            return False
        
    def adminUpdateUser(self, id, firstname, lastname, email, password, isadmin, verified):
        try:
            # encoded_password = bytes(password, encoding='utf-8')
            # encrypted_password = str(bcrypt.hashpw(
            #     encoded_password, bcrypt.gensalt()))
            # encrypted_password_2 = encrypted_password[1:]
            sql = "Update users set firstname=%s,lastname=%s,password=%s,email=%s,isadmin=%s,verified =%s where id=%s;"
            self.cur.execute(sql,(firstname,lastname,password,email,isadmin,verified,id))
            self.conn.commit()
            self.cur.close()
            self.conn.close()
            return True
        except Exception as e:
            print(f"Database connection error: {e}")
            return False

    def adminDeleteUser(self, id):
        try:
            sql = "DELETE FROM users WHERE id =%s;"
            self.cur.execute(sql,(id,))
            self.conn.commit()
            self.cur.close()
            self.conn.close()
            return True
        except Exception as e:
            print(f"Database connection error: {e}")
            return False


# # class Test(self):

# #     def testHash(self):
#         encoded_password = bytes('1234', encoding='utf-8')
#         encrypted_password = str(bcrypt.hashpw(encoded_password, bcrypt.gensalt()))
#         print('passowrd1: ',encrypted_password)

#         encoded_password = bytes('1234', encoding='utf-8')
#         encrypted_password = str(bcrypt.hashpw(encoded_password, bcrypt.gensalt()))
#         print('passowrd2: ',encrypted_password)

# #run = Test().testHash()
