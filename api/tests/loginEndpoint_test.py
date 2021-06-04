import unittest
import requests
import json

class Test(unittest.TestCase):
    ENDPOINT_URL = "http://127.0.0.1:5000/login"
    
    
    
    def test_endpoint(self):
        INPUT = {
        "email": "IDONOTEXIT@gmail.com",
        "password": "1234"
        }
        #tests with non existing user
        r = requests.post(self.ENDPOINT_URL,json=INPUT)
        data = json.loads(r.content)
        
        result1 = data['response']

        #print(result1)
        # print(result2)
        self.assertEqual(200, r.status_code)
        self.assertEqual(result1,'invalid',msg=" if failed User is valid")
        # self.assertEqual(result1['name'],'Kanye')
        # self.assertEqual(result2['entity'],'LOCATION')
        # self.assertEqual(result2['name'],'London')

    def test_endpoint2(self):
        INPUT = {
        "email": "stopdacap301@gmail.com",
        "password": "encrypted_password"
        }
        #tests with valid user password
        r = requests.post(self.ENDPOINT_URL,json=INPUT)
        data = json.loads(r.content)
        
        result1 = data['response']

        #print(result1)
        # print(result2)
        self.assertEqual(200, r.status_code)
        self.assertEqual(result1,'logged-in',msg=" if failed user doesnt not exist or password invalid")
        # self.assertEqual(result1['name'],'Kanye')
        # self.assertEqual(result2['entity'],'LOCATION')
        # self.assertEqual(result2['name'],'London')

#run = Test().test_endpoint2()