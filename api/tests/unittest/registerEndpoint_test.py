import unittest
import requests
import json
import os, sys
#sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
sys.path.append('api')
from main import app

TEST_DB = 'test.db'
 
class BasicTests(unittest.TestCase):
 
    main=None
    # executed prior to each test

    def setUp(self):
        # main.config['TESTING'] = True
        # main.config['WTF_CSRF_ENABLED'] = False
        # main.config['DEBUG'] = False
        # main.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
        # os.path.join(main.config['BASEDIR'], TEST_DB)
        app.config.from_object('config_default.TestingConfig')
        self.main = app.test_client()
        # db.drop_all()
        # db.create_all()
        
        # # Disable sending emails during unit testing
        # mail.init_app(app)
        # self.assertEqual(app.debug, False)
    
    # executed after each test
    def tearDown(self):
        pass#

    def test_endpoint(self):
        #print('hello')
        INPUT = {
        "firstname": "first",
        "lastname": "person",
        "email": "fp@gmail.com",
        "password": "password"
        }
        response = self.main.post('/register',json=INPUT)
        print(response.data)
        
        r = json.loads(response.data)
        #print(r)

        result1 = r['response']

        self.assertEqual(400, response.status_code)
        self.assertEqual(result1,'failed',msg=" if failed User is valid")

    def test_endpoint2(self):
        #print('hello')
        INPUT = {
        "firstname": "man",
        "lastname": "manson",
        "email": "manson@gmail.com",
        "password": "password"
        }
        response = self.main.post('/register',json=INPUT)
        print(response.data)
        
        r = json.loads(response.data)
        #print(r)
        result1 = r['response']
        self.assertEqual(200, response.status_code)
        self.assertEqual(result1,'registered',msg=" if failed User is valid")

    # def test_endpoint2(self):
    #     self.main.post('/register',json=self.INPUT)
    #     response = self.main.post('/register',json=self.INPUT)
    #     print(response.status_code)
    #     r = json.loads(response.data)
    #     print(r)

# athing = BasicTests()
# athing.setUp()
# athing.test_endpoint()