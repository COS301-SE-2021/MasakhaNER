import unittest
import requests
import json

class Test(unittest.TestCase):
    ENDPOINT_URL = "http://127.0.0.1:5000/input"
    
    INPUT = {
        "input": "Kanye in London"
    }
    
    def test_endpoint(self):
        print("week")
        r = requests.post(self.ENDPOINT_URL,json=self.INPUT)
        data = json.loads(r.content)

        result1 = data['output'][0]
        result2 = data['output'][1]

        self.assertEqual(200, r.status_code)
        self.assertEqual(result1['entity'],'PERSON')
        self.assertEqual(result1['name'],'Kanye')
        self.assertEqual(result2['entity'],'LOCATION')
        self.assertEqual(result2['name'],'London')