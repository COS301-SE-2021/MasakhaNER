import unittest
import requests
import json
import jwt
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
        db = app.config['DATABASE']
        sql = "INSERT INTO users (id,firstname,lastname,password,email,isadmin,activationcode, verified) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
        db.cur.execute(sql,(0,'integeration', 'test','password','integreation@test.com',False,000,True))
        db.conn.commit()
        self.main = app.test_client()
        # db.drop_all()
        # db.create_all()
        
        # # Disable sending emails during unit testing
        # mail.init_app(app)
        # self.assertEqual(app.debug, False)
    
    # executed after each test
    def tearDown(self):
        db = app.config['DATABASE']
        sql = "DELETE FROM users WHERE id =%s"
        db.cur.execute(sql,(0,))
        db.conn.commit()
        self.main = None


    def test_endpoint(self):
        INPUT = {
        "email": "IDONOTEXIT@gmail.com",
        "code": "1234"
        }
        #tests with non existing user
        r = self.main.post('/verify',json=INPUT)
        data = json.loads(r.data)
        
        result1 = data['response']

        self.assertEqual(400, r.status_code)
        self.assertEqual(result1,'failed',msg=" if failed User is valid")

    def test_endpoint2(self):
        INPUT = {
        "email": "integreation@test.com",
        "code": 1234
        }
        #tests with valid user password but wrong code
        r = self.main.post('/verify',json=INPUT)
        data = json.loads(r.data)
        
        result1 = data['response']

        self.assertEqual(400, r.status_code)
        self.assertEqual(result1,'failed',msg=" if failed user and code are correct")

    def test_endpoint3(self):
        INPUT = {
        "email": "integreation@test.com",
        "code": 000
        }
        #tests with valid user password and right code
        r = self.main.post('/verify',json=INPUT)
        data = json.loads(r.data)
        
        result1 = data['response']

        self.assertEqual(200, r.status_code)
        self.assertEqual(result1,'verified',msg=" if failed user doesnt not exist or code invalid")