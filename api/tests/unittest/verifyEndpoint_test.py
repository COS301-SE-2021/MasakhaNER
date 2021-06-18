import unittest
import requests
import json

class Test(unittest.TestCase):
    ENDPOINT_URL = "http://127.0.0.1:5000/verify"
    
    
    
    def test_endpoint(self):
        INPUT = {
        "email": "IDONOTEXIT@gmail.com",
        "code": "1234"
        }
        #tests with non existing user
        r = requests.post(self.ENDPOINT_URL,json=INPUT)
        data = json.loads(r.content)
        
        result1 = data['response']

        self.assertEqual(200, r.status_code)
        self.assertEqual(result1,'failed',msg=" if failed User is valid")

    def test_endpoint2(self):
        INPUT = {
        "email": "stopdacap301@gmail.com",
        "code": "1234"
        }
        #tests with valid user password but wrong code
        r = requests.post(self.ENDPOINT_URL,json=INPUT)
        data = json.loads(r.content)
        
        result1 = data['response']

        self.assertEqual(200, r.status_code)
        self.assertEqual(result1,'failed',msg=" if failed user and code are correct")

    def test_endpoint3(self):
        INPUT = {
        "email": "stopdacap301@gmail.com",
        "code": "1111"
        }
        #tests with valid user password and right code
        r = requests.post(self.ENDPOINT_URL,json=INPUT)
        data = json.loads(r.content)
        
        result1 = data['response']

        self.assertEqual(200, r.status_code)
        self.assertEqual(result1,'verified',msg=" if failed user doesnt not exist or code invalid")