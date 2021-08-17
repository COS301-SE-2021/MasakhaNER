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
        app.config.from_object('config_default.Config')
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
        INPUT = {
        "feedback": "There is always a better way to do something",
        }
        response = self.main.post('/feedback',json=INPUT)
        print(response.data)

        r = json.loads(response.data)
        result1 = r['response']