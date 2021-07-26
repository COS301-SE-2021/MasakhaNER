import unittest
import requests
import json
import jwt
from datetime import datetime, timedelta
#sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
import os, sys
sys.path.append('api')
from main import app

class Test(unittest.TestCase):
    main=None
    # executed prior to each test

    def setUp(self):
        # main.config['TESTING'] = True
        # main.config['WTF_CSRF_ENABLED'] = False
        # main.config['DEBUG'] = False
        # main.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
        # os.path.join(main.config['BASEDIR'], TEST_DB)
        app.config.from_object('config_default.Config')
        self.main = app.test_client()
    
    def test_endpoint(self):
        INPUT = {
        "id": 192,
        "firstname": "first",
        "lastname": "person",
        "email": "fp@gmail.com",
        "password": "password",
        "isadmin":False,
        "verified":True
        }

        token = jwt.encode({'email' :'fgch@gmail.com', 'exp' : datetime.utcnow() - timedelta(minutes=60)}, app.config['SECRET_KEY'],algorithm="HS256")
        r = self.main.put('/users/1',json=INPUT,headers={'x-access-token':token})
        data = json.loads(r.data)
        print(data)
        result = data['response']
        self.assertEqual(401, r.status_code)
        self.assertEqual(result, 'Signature has expired')


    def test_endpoint2(self):
        INPUT = {
        "id": 192,
        "firstname": "first",
        "lastname": "person",
        "email": "fp@gmail.com",
        "password": "password",
        "isadmin":False,
        "verified":True
        }

        token = jwt.encode({'email' :'secondperson@gmail.com', 'exp' : datetime.utcnow() + timedelta(minutes=60)}, app.config['SECRET_KEY'],algorithm="HS256")
        r = self.main.put('/users/1',json=INPUT,headers={'x-access-token':token})
        data = json.loads(r.data)
        print(data)
        result = data['response']
        self.assertEqual(401, r.status_code)
        self.assertEqual(result, 'user unauthirized')

    def test_endpoint3(self):
        INPUT = {
        "firstname": "third",
        "lastname": "person",
        "email": "chnaged@gmail.com",
        "password": "password",
        "isadmin":False,
        "verified":True
        }

        token = jwt.encode({'email' :'test@test.co.za', 'exp' : datetime.utcnow() + timedelta(minutes=60)}, app.config['SECRET_KEY'],algorithm="HS256")
        r = self.main.put('/users/198',json=INPUT,headers={'x-access-token':token})
        data = json.loads(r.data)
        print(data)
        result = data['response']
        self.assertEqual(200, r.status_code)
        self.assertEqual(result, 'updated')