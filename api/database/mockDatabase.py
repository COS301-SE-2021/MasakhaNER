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


class mockdatabase:
    """
    Constructor:
        Connects to the database.
    Parameters:
        None
    Returns:
        Boolean:Returns false if database connection fails
    """
    db_list=None
    db_id=None

    def __init__(self):
        self.db_list=[]
        self.db_id=1

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
         if self.findUserByEmail(email) == None:
            encoded_password = bytes(password, encoding='utf-8')
            encrypted_password = bcrypt.hashpw(
            encoded_password, bcrypt.gensalt())
            print(type(encrypted_password))
            encrypted_password = encrypted_password.decode('UTF-8')
            code = '1111'
            user_id=self.db_id
            self.db_id+=1

            user = [user_id,firstname,lastname,encrypted_password,email,False,code,False]
            self.db_list.append(user)
            return True
         else:
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
        user = self.findUserByEmail(email)
        if user != None:
            return user[5]
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
        user = self.findUserByEmail(email)
        if user != None:
            if bcrypt.checkpw(password.encode('UTF-8'), user[3].encode('UTF-8')):
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
        user = self.findUserByEmail(email)
        if user != None:
            if user[7]==True:
                print("password works")
                return True
            else:
                return False
        return False
    # admin functions

    def findUserByEmail(self, email):
        for x in self.db_list:
            if x[4] == email:
                return x
        return None

    def findUserById(self, id):
        for x in self.db_list:
            if x[0] == id:
                return x
        return None


    def getAllUsers(self):
        return self.db_list

    def adminAddUser(self, firstname, lastname, email, password, isadmin):
        if self.findUserByEmail(email) == None:
            encoded_password = bytes(password, encoding='utf-8')
            encrypted_password = bcrypt.hashpw(
            encoded_password, bcrypt.gensalt())
            encrypted_password = encrypted_password.decode('UTF-8')
            code = '1111'
            user_id=self.db_id
            self.db_id+=1

            user = [user_id,firstname,lastname,encrypted_password,email,isadmin,code,True]
            self.db_list.append(user)
            return True
        else:
            return False

    def adminUpdateUser(self, id, firstname, lastname, email, password, isadmin, verified):
        user = self.findUserById(id)
        if user != None:
            encoded_password = bytes(password, encoding='utf-8')
            encrypted_password = bcrypt.hashpw(
            encoded_password, bcrypt.gensalt())
            encrypted_password = encrypted_password.decode('UTF-8')
            code = '1111'
            user[1]=firstname
            user[2]=lastname
            user[3]=password
            user[4]=email
            user[5]=isadmin
            user[6]=code
            user[7]=verified
            return True
        else:
            return False

    def adminDeleteUser(self, id):
        for x in self.db_list:
            if x[0] == id:
                return True
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
