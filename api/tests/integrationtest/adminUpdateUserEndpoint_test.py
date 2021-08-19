import unittest
import bcrypt
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
        app.config.from_object('config_default.Config')
        encoded_password = bytes("password", encoding='utf-8')
        encrypted_password = bcrypt.hashpw(
        encoded_password, bcrypt.gensalt())
        #print(type(encrypted_password))
        encrypted_password = encrypted_password.decode('UTF-8')
        db = app.config['DATABASE']
        sql = "INSERT INTO users (id,firstname,lastname,password,email,isadmin,activationcode, verified) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
        db.cur.execute(sql,(0,'integeration', 'test',encrypted_password,'integreation@test.com',False,000,True))
        sql = "INSERT INTO users (id,firstname,lastname,password,email,isadmin,activationcode, verified) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
        db.cur.execute(sql,(1,'integeration', 'test',encrypted_password,'admin@test.com',True,000,True))
        db.conn.commit()
        self.main = app.test_client()
        self.main = app.test_client()
    
    def tearDown(self):
        db = app.config['DATABASE']
        sql = "DELETE FROM users WHERE id =%s"
        db.cur.execute(sql,(0,))
        sql = "DELETE FROM users WHERE id =%s"
        db.cur.execute(sql,(1,))
        db.conn.commit()
        self.main = None
    
    def test_endpoint(self):
        INPUT = {
        "firstname": "first",
        "lastname": "person",
        "email": "fp@gmail.com",
        "password": "password",
        "isadmin":False,
        "verified":True
        }

        token = jwt.encode({'email' :'admin@test.com', 'exp' : datetime.utcnow() - timedelta(minutes=60)}, app.config['SECRET_KEY'],algorithm="HS256")
        r = self.main.put('/users/0',json=INPUT,headers={'x-access-token':token})
        data = json.loads(r.data)
        #print(data)
        result = data['response']
        self.assertEqual(401, r.status_code)
        self.assertEqual(result, 'Signature has expired')


    def test_endpoint2(self):
        INPUT = {
        "firstname": "first",
        "lastname": "person",
        "email": "fp@gmail.com",
        "password": "password",
        "isadmin":False,
        "verified":True
        }

        token = jwt.encode({'email' :'integreation@test.com', 'exp' : datetime.utcnow() + timedelta(minutes=60)}, app.config['SECRET_KEY'],algorithm="HS256")
        r = self.main.put('/users/0',json=INPUT,headers={'x-access-token':token})
        data = json.loads(r.data)
        #print(data)
        result = data['response']
        self.assertEqual(401, r.status_code)
        self.assertEqual(result, 'user unauthirized')

    def test_endpoint3(self):
        INPUT = {
        "firstname": "test",
        "lastname": "update",
        "email": "integrationtestemail@gmail.com",
        "password": "password",
        "isadmin":False,
        "verified":True
        }

        token = jwt.encode({'email' :'admin@test.com', 'exp' : datetime.utcnow() + timedelta(minutes=60)}, app.config['SECRET_KEY'],algorithm="HS256")
        r = self.main.put('/users/0',json=INPUT,headers={'x-access-token':token})
        data = json.loads(r.data)
        #print(data)
        result = data['response']
        self.assertEqual(200, r.status_code)
        self.assertEqual(result, 'updated')