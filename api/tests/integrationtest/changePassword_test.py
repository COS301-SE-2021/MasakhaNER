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