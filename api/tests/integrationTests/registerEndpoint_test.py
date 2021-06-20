from api.database.mockDatabase import mockdatabse
import unittest
import requests
import json
import main



class BaseTest(unittest.TestCase):

    def create_app(self):
        main.config.from_object('config.TestConfig')
        return main

class Test(BaseTest):
    
    
    ENDPOINT_URL = "http://127.0.0.1:5000/register"
    
    INPUT = {
        "firstname": "man",
        "lastname": "manson",
        "email": "manson@gmail.com",
        "password": "1234"
    }

    def test_endpoint(self):
        
        print("running")
        r = requests.post(self.ENDPOINT_URL,json=self.INPUT)
        data = json.loads(r.content)
        
        result1 = data['response']

        self.assertEqual(200, r.status_code)
        self.assertEqual(result1,'registered',msg=" if failed User already exists")