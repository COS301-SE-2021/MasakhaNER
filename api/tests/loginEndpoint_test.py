import unittest
import requests
import json

class Test(unittest.TestCase):
    ENDPOINT_URL = "http://127.0.0.1:5000/login"
    
    INPUT = {
        "email": "manson@gmail.com",
        "password": "1234"
    }
    
    def test_endpoint(self):
        
        #tests with non logged in user
        r = requests.post(self.ENDPOINT_URL,json=self.INPUT)
        data = json.loads(r.content)
        
        result1 = data['response']

        # print(result1)
        # print(result2)
        # self.assertEqual(200, r.status_code)
        # self.assertEqual(result1,'registered',msg=" if failed User already exists")
        # self.assertEqual(result1['name'],'Kanye')
        # self.assertEqual(result2['entity'],'LOCATION')
        # self.assertEqual(result2['name'],'London')

#run = Test().test_endpoint()