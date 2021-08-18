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

    def setUp(self):

        app.config.from_object('config_default.Config')
        self.main = app.test_client()

    def tearDown(self):
        pass#

    def test_endpoint(self):
        INPUT = {
        "email": "rtdcthgcvyug@gmail.com",
        "password": "password"
        }

        response = self.main.post('/reset',json=INPUT)
        print(response.data)

        r = json.loads(response.data)

        result1 = r['response']