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
        "id":299
        }

        token = jwt.encode({'email' :'fgch@gmail.com', 'exp' : datetime.utcnow() - timedelta(minutes=60)}, app.config['SECRET_KEY'],algorithm="HS256")
        r = self.main.delete('/users/1',json=INPUT,headers={'x-access-token':token})
        
