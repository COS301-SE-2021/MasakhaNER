import unittest
import requests
import json

# #for importing files that are in a parent dir
# import os, sys
# sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

# #the file to be imported
# import main

class OutputTest(unittest.TestCase):
    ENDPOINT_URL = "http://127.0.0.1:5000/input"
    #ENDPOINT_URL = "http://127.0.0.1:5000/index"
    
    INPUT = {
        "input": "Kanye in London"
    }
    
    str = 'empyt'
    def test_endpoint(self):
        """
        GIVEN a User model
        WHEN a new User is created
        THEN check the email, hashed_password, and role fields are defined correctly
        """
        print("week")
        r = requests.post(OutputTest.ENDPOINT_URL,json=OutputTest.INPUT)
        data = json.loads(r.content)

        result1 = data['output'][0]
        result2 = data['output'][1]

        # print(result1)
        # print(result2)
        self.assertEquals(200,r.status_code)
        self.assertEquals(result1['entity'],'person')
        self.assertEquals(result1['name'],'Kanye')
        self.assertEquals(result2['entity'],'location')
        self.assertEquals(result2['name'],'London')
        

#     def work():
#         print("yes")
        
        
# play = OutputTest
# print(play.test_endpoint(play))
    def registerEndpoint(fname, lname, email, password):
        print(fname + lname + email + password)
        

