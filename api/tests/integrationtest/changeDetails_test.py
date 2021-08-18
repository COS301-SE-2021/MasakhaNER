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


    def test_endpoint(self):

        INPUT = {
        "firstname": "first",
        "lastname": "person",
        "email": "bob@bob.com"
        }
        token = jwt.encode({'email' :'test@test.co.za', 'exp' : datetime.utcnow() + timedelta(minutes=60)}, app.config['SECRET_KEY'],algorithm="HS256")
        r = self.main.put('/users/299',json=INPUT,headers={'x-access-token':token})
        data = json.loads(r.data)
        print(data)
        result = data['response']
        self.assertEqual(200, r.status_code)
        self.assertEqual(result, 'updated')