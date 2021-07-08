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
        app.config.from_object('config_default.TestingConfig')
        self.main = app.test_client()
        # db.drop_all()
        # db.create_all()
        
        # # Disable sending emails during unit testing
        # mail.init_app(app)
        # self.assertEqual(app.debug, False)\
    
    def tearDown(self):
        # main.config['TESTING'] = True
        # main.config['WTF_CSRF_ENABLED'] = False
        # main.config['DEBUG'] = False
        # main.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
        # os.path.join(main.config['BASEDIR'], TEST_DB)
        app.config['DATABASE'].clear()
        self.main = None
    
    def test_endpoint(self):
        INPUT={
            'input':'Kanye in Paris'
        }

        token = jwt.encode({'email' :'fp@gmail.com', 'exp' : datetime.utcnow() + timedelta(minutes=60)}, app.config['SECRET_KEY'],algorithm="HS256")
        r = self.main.post('/input',json=INPUT,headers={'x-access-token':token})
        data = json.loads(r.data)
        

        print(data)

        result1 = data['output'][0]
        result2 = data['output'][1]

        self.assertEqual(200, r.status_code)