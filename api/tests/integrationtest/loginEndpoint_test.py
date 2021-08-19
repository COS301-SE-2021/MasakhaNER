import unittest
import bcrypt
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
        encoded_password = bytes("password", encoding='utf-8')
        encrypted_password = bcrypt.hashpw(
        encoded_password, bcrypt.gensalt())
        #print(type(encrypted_password))
        encrypted_password = encrypted_password.decode('UTF-8')
        db = app.config['DATABASE']
        sql = "INSERT INTO users (id,firstname,lastname,password,email,isadmin,activationcode, verified) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
        db.cur.execute(sql,(0,'integeration', 'test',encrypted_password,'integreation@test.com',False,000,True))
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
        #print('hello')
        INPUT = {
        "email": "rtdcthgcvyug@gmail.com",
        "password": "password"
        }
        response = self.main.post('/login',json=INPUT)
        print(response.data)
        
        r = json.loads(response.data)
        #print(r)

        result1 = r['response']

        self.assertEqual(401, response.status_code)
        self.assertEqual(result1,'authetication failed!',msg=" if failed User is valid")

    def test_endpoint4(self):
        #print('hello')
        INPUT = {
        "email": "integreation@test.com",
        "password": "ffrggr"
        }
        response = self.main.post('/login',json=INPUT)
        print(response.data)
        
        r = json.loads(response.data)
        print(r)

        result1 = r['response']

        self.assertEqual(401, response.status_code)
        self.assertEqual(result1,'authetication failed!',msg=" if failed User is valid")

    def test_endpoint5(self):
        #print('hello')
        INPUT = {
        "email": "integreation@test.com",
        "password": "password"
        }
        response = self.main.post('/login',json=INPUT)
        print(response.data)
        
        r = json.loads(response.data)
        #print(r)

        token = r['token']
        data = jwt.decode(token,app.config['SECRET_KEY'],"HS256")
        user_email=data['email']
        self.assertEqual(200, response.status_code)
        self.assertEqual(user_email,'integreation@test.com',msg=" if failed User is valid")

    # def test_endpoint2(self):
    #     self.main.post('/register',json=self.INPUT)
    #     response = self.main.post('/register',json=self.INPUT)
    #     print(response.status_code)
    #     r = json.loads(response.data)
    #     print(r)

# athing = BasicTests()
# athing.setUp()
# athing.test_endpoint()