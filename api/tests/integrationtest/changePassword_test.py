import unittest
import jwt
import requests
import json
import os, sys
from datetime import datetime, timedelta
#sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
sys.path.append('api')
from main import app

TEST_DB = 'test.db'

class BasicTests(unittest.TestCase):

    main=None

    def setUp(self):

        app.config.from_object('config_default.Config')
        self.main = app.test_client()

    def tearDown(self):
        pass#

    def test_endpoint(self):
        INPUT = {
        "email": "bob@bob.com",
        "password": "password"
        }

        token = jwt.encode({'email' :'bob@bob.com', 'exp' : datetime.utcnow() + timedelta(minutes=60)}, app.config['SECRET_KEY'],algorithm="HS256")
        r = self.main.put('/users/1',json=INPUT,headers={'x-access-token':token})
        data = json.loads(r.data)
        print(data)

        result = data['response']

        self.assertEqual(401, r.status_code)
        self.assertEqual(result, 'Signature has expired')
