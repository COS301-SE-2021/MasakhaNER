import unittest
import requests

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
        #response_json={"output": [{"entity": "person","name": "Kanye"},{"entity": "location","name": "London" }]}

        r = requests.post(OutputTest.ENDPOINT_URL,json=OutputTest.INPUT)
        #self.assertEqual(r.status_code,200)
        
        #r = requests.get(OutputTest.ENDPOINT_URL)
        # self.str  = r.content
        #print(r.json())
        #return r.content

#     def work():
#         print("yes")
        
        
# play = OutputTest
# print(play.test_endpoint(play))

