import unittest
import requests
import json
from database.database import User
from database.database import Email

class Test(unittest.TestCase):
    def test_register(self):
        db = User()
        var = db.register("name","surname","at@gmail.com","1234")
        self.assertEqual(var,True)

    def test_login(self):
        db = User()
        var = db.login("at@gmail.com","1234")
        self.assertEqual(var,True)

    def test_email(self):
        sendemail = Email()
        email = "stopdacap301@gmail.com"

        message = """\
        Masakhane Activation Code

        This right here is a unit test. Thanks """
        var = sendemail.send_email(message, email)

        self.assertEqual(var,True)