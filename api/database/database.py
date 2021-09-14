import bcrypt
import random
from flask import request, json
from dotenv import load_dotenv
import psycopg2.extras
import psycopg2
from flask import Flask
from database.email import Email
from database.crud import add, get, delete, update
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
        db = self
        return add.register(db, firstname, lastname, email, password)

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
        db = self
        return get.get_code(db, email)

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
        db = self
        return get.login(db, email. password)
    """
    very=ify user Function:
        verifies user based on code passed in
    Parameters:
        email (string): User's email
    Returns:
        Boolean:Returns true or false if user register successfully
    """

    def verify_user(self, email):
        db = self
        return update.verify_user(db, email)
    # admin functions

    def findUserByEmail(self, email):
        db = self
        return get.findUserByEmail(db, email)

    def resetPassword(self, email, newPassword):
        db = self
        return update.resetPassword(db, email, newPassword)

    def isAdmin(self, email):
        db = self
        return get.isAdmin(db, email)

    def getAllUsers(self):
        db = self
        return get.getAllUsers(db)

    def getUser(self, id):
        db = self
        return get.getUser(db, id)

    def getModel(self, id):
        db = self
        return get.getModel(db, id)

    def adminAddUser(self, firstname, lastname, email, password, isadmin):
        db = self
        return add.adminAddUser(db, firstname, lastname, email, password, isadmin)

    def adminUpdateUser(self, id, firstname, lastname, email, password, isadmin, verified):
        db = self
        return update.adminUpdateUser(db, id, firstname, lastname, email, password, isadmin, verified)

    def adminDeleteUser(self, id):
        db = self
        return delete.adminDeleteUser(db, id)

    def update(self, email, password):
        db = self
        return update.update(db, email, password)

    def adminAddModel(self, modelname, model):
        db = self
        return add.adminAddModel(db, modelname, model)

    def getAllModels(self):
        db = self
        return get.getAllModels(db, id)

    def setModels(self, name):
        db = self
        return update.setModels(db, name)

    def adminDeleteModel(self, id):
        db = self
        return delete.adminDeleteModel(db, id)

    def addFeedback(self, feedback):
        db = self
        return add.addFeedback(db,  feedback)

    def adminAddFeedback(self, feedback):
        db = self
        return add.adminAddFeedback()

    def adminDeleteFeedback(self, id):
        db = self
        return delete.adminDeleteFeedback(db, id)

    def adminGetAllFeedback(self):
        db = self
        return get.adminGetAllFeedback(db)

    def adminGetFeedback(self, id):
        db = self
        return get.adminGetFeedback(db, id)

    def update_user_details(self, email, name, surname):
        db = self
        return update.update_user_details(db, email, name, surname)

    def input(self, inputObject):
        db = self
        return add.input(db, inputObject)

    def get_all_input(self):
        db = self
        return get.get_all_input(db, id)
