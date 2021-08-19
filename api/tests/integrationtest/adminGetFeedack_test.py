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

    def setUp(self):

        app.config.from_object('config_default.Config')
        db = app.config['DATABASE']
        encoded_password = bytes("password", encoding='utf-8')
        encrypted_password = bcrypt.hashpw(
        encoded_password, bcrypt.gensalt())
        #print(type(encrypted_password))
        encrypted_password = encrypted_password.decode('UTF-8')
        sql = "INSERT INTO users (id,firstname,lastname,password,email,isadmin,activationcode, verified) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
        db.cur.execute(sql,(0,'integeration', 'test',encrypted_password,'admin@test.com',True,000,True))
        sql = "INSERT INTO feedback (id,feedback) VALUES (%s,%s)"
        db.cur.execute(sql,(0,'Test feedback'))
        db.conn.commit()
        self.main = app.test_client()

    def tearDown(self):
        db = app.config['DATABASE']
        sql = "DELETE FROM feedback WHERE id = %s;"
        db.cur.execute(sql,(0,))
        sql = "DELETE FROM users WHERE id =%s"
        db.cur.execute(sql,(0,))
        db.conn.commit()
        self.main =None


    def test_endpoint3(self):
        
        token = jwt.encode({'email' :'admin@test.com', 'exp' : datetime.utcnow() + timedelta(minutes=60)}, app.config['SECRET_KEY'],algorithm="HS256")
        r = self.main.get('/feedback/0',headers={'x-access-token':token})
        data = json.loads(r.data)
        #print(data)
        self.assertEqual(200, r.status_code)
        self.assertEqual(0, data['id'])
        self.assertEqual("Test feedback", data['feedback'])