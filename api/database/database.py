from api.database.email import Email
from flask import Flask
import psycopg2
import psycopg2.extras
from dotenv import load_dotenv
import os
from flask import request
import bcrypt

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
            # encoded_password = bytes(password, encoding='utf-8')
            # encrypted_password = str(bcrypt.hashpw(
            #     encoded_password, bcrypt.gensalt()))
            # encrypted_password_2 = encrypted_password[1:]
            encrypted_password_2 = "encrypted_password"
            code = '1111'
            self.cur.execute(
                f"INSERT INTO users (firstname,lastname,password,email,isadmin,activationcode, verified) VALUES('{firstname}','{lastname}','{encrypted_password_2}','{email}',{False},{code},{False})")
            sendemail = Email()
            message = """\
            Masakhane Activation Code

            Here is your activation code: 1111 """
            sendemail.send_email(message, email)
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
        self.cur.execute(
            f"SELECT activationcode FROM users where email='{email}';")
        return self.cur.fetchone()[0]


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
        # encoded_password = bytes('1234', encoding='utf-8')
        # encrypted_password = str(bcrypt.hashpw(encoded_password, bcrypt.gensalt()))
        # print('passowrd1: ',encrypted_password)
        
        # encoded_password = bytes('1234', encoding='utf-8')
        # encrypted_password = str(bcrypt.hashpw(encoded_password, bcrypt.gensalt())) 
        # print('passowrd2: ',encrypted_password)

        
        encrypted_password_2 = 'encrypted_password'
        print(encrypted_password_2)
        self.cur.execute(f"SELECT password FROM users where email='{email}';")
        db_password = self.cur.fetchone()
        self.conn.commit()
        self.cur.close()
        self.conn.close()
        print(  f"'{str(db_password[0])}'"  )
        if db_password != None and db_password[0] == encrypted_password_2:
            return True
        else:
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
        self.cur.execute(f"SELECT * FROM users where email='{email}';")
        self.cur.execute(
            f"Update users set verified = {True} where email='{email}';")
        self.conn.commit()
        self.cur.close()
        self.conn.close()


# # class Test(self):

# #     def testHash(self):
#         encoded_password = bytes('1234', encoding='utf-8')
#         encrypted_password = str(bcrypt.hashpw(encoded_password, bcrypt.gensalt()))
#         print('passowrd1: ',encrypted_password)
        
#         encoded_password = bytes('1234', encoding='utf-8')
#         encrypted_password = str(bcrypt.hashpw(encoded_password, bcrypt.gensalt())) 
#         print('passowrd2: ',encrypted_password)

# #run = Test().testHash()