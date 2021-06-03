import unittest
import requests
import json

class OutputTest(unittest.TestCase):
    ENDPOINT_URL = "http://127.0.0.1:5000/input"
    
    INPUT = {
        "input": "Kanye in London"
    }
    
    str = 'empyt'
    def test_endpoint(self):
        print("week")
        r = requests.post(OutputTest.ENDPOINT_URL,json=OutputTest.INPUT)
        data = json.loads(r.content)

        result1 = data['output'][0]
        result2 = data['output'][1]

        # print(result1)
        # print(result2)
        # self.assertTrue(200==r.status_code,True)
        # self.assertTrue(result1['entity']=='PERSON',True)
        # self.assertTrue(result1['name']=='Kanye',True)
        # self.assertTrue(result2['entity']=='LOCATION',True)
        # self.assertTrue(result2['name']=='London',True)
        self.assertEqual(200, r.status_code)
        self.assertEqual(result1['entity'],'PERSON')
        self.assertEqual(result1['name'],'Kanye')
        self.assertEqual(result2['entity'],'LOCATION')
        self.assertEqual(result2['name'],'London')

# play = OutputTest
# play.test_endpoint(play)