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

    def setUp(self):

        app.config.from_object('config_default.Config')
        self.main = app.test_client()

    def tearDown(self):
        self.main =None

    def test_endpoint(self):
        INPUT = {
        "id":3
        }

        token = jwt.encode({'email' :'fgch@gmail.com', 'exp' : datetime.utcnow() - timedelta(minutes=60)}, app.config['SECRET_KEY'],algorithm="HS256")
        r = self.main.admin_get_feedack('/users/1',json=INPUT,headers={'x-access-token':token})
        data = json.loads(r.data)
        print(data)
        result = data['response']
        self.assertEqual(401, r.status_code)
        self.assertEqual(result, 'Signature has expired')

    def test_endpoint2(self):
        INPUT = {
        "id":1
        }

        token = jwt.encode({'email' :'people@gmail.com', 'exp' : datetime.utcnow() + timedelta(minutes=60)}, app.config['SECRET_KEY'],algorithm="HS256")
        r = self.main.admin_get_feedack('/users/1',json=INPUT,headers={'x-access-token':token})
        data = json.loads(r.data)
        print(data)
        result = data['response']
        self.assertEqual(401, r.status_code)
        self.assertEqual(result, 'user unauthirized')

    def test_endpoint3(self):
        INPUT = {
        "id":1
        }
        

        token = jwt.encode({'email' :'test@test.co.za', 'exp' : datetime.utcnow() + timedelta(minutes=60)}, app.config['SECRET_KEY'],algorithm="HS256")
        r = self.main.admin_get_feedack('/users/0',json=INPUT,headers={'x-access-token':token})
        data = json.loads(r.data)
        print(data)
        result = data['response']
        self.assertEqual(200, r.status_code)
        self.assertEqual(result, 'deleted')