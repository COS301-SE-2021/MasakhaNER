import unittest
import requests
import json

class Test(unittest.TestCase):
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
        print(data)
        
        result1 = data['response']
        # result2 = data['output'][1]

        # print(result1)
        # print(result2)
        self.assertEqual(200, r.status_code)
        self.assertEqual(result1,'failed',msg=result1)
        # self.assertEqual(result1['name'],'Kanye')
        # self.assertEqual(result2['entity'],'LOCATION')
        # self.assertEqual(result2['name'],'London')

run = Test().test_endpoint()