import unittest
import bcrypt
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
    
    def tearDown(self):
        db = app.config['DATABASE']
        sql = "DELETE FROM users WHERE id =%s"
        db.cur.execute(sql,(0,))
        db.conn.commit()
        self.main = None

    def test_endpoint(self):
        INPUT = {
        "email": "integreation@test.com",
        "password": "test"
        }

        token = jwt.encode({'email' :'integreation@test.com', 'exp' : datetime.utcnow() + timedelta(minutes=60)}, app.config['SECRET_KEY'],algorithm="HS256")
        r = self.main.post('/details/changepassword',json=INPUT,headers={'x-access-token':token})
        data = json.loads(r.data)
        #print(data)

        result = data['response']

        self.assertEqual(200, r.status_code)
        self.assertEqual(result, 'password reset')
