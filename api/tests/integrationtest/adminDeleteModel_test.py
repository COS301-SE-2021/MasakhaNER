import unittest
import requests
import bcrypt
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
        app.config.from_object('config_default.Config')
        db = app.config['DATABASE']
        encoded_password = bytes("password", encoding='utf-8')
        encrypted_password = bcrypt.hashpw(
        encoded_password, bcrypt.gensalt())
        #print(type(encrypted_password))
        encrypted_password = encrypted_password.decode('UTF-8')
        sql = "INSERT INTO users (id,firstname,lastname,password,email,isadmin,activationcode, verified) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
        db.cur.execute(sql,(0,'integeration', 'test',encrypted_password,'admin@test.com',True,000,True))
        sql = "INSERT INTO models (id,modelname,model) VALUES(%s,%s,%s)"
        db.cur.execute(sql,(0,'TEST MODEL', 'TESTING'))
        db.conn.commit()
        #app.config['DATABASE'].insertBob()
        self.main = app.test_client()
    
    def tearDown(self):
        db = app.config['DATABASE']
        sql = "DELETE FROM users WHERE id =%s"
        db.cur.execute(sql,(0,))
        # main.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
        # os.path.join(main.config['BASEDIR'], TEST_DB)
        #app.config['DATABASE'].deleteBob()
        self.main =None
    
    def test_endpoint(self):

        token = jwt.encode({'email' :'test@test.co.za', 'exp' : datetime.utcnow() + timedelta(minutes=60)}, app.config['SECRET_KEY'],algorithm="HS256")
        r = self.main.delete('/models/0',headers={'x-access-token':token})
        data = json.loads(r.data)
        db = app.config['DATABASE']
        sql = "SELECT * FROM models WHERE id=%s"
        db.cur.execute(sql,(0,))
        model = db.cur.fetchone()
        db.conn.commit()
        #print(data)
        result = data['response']
        self.assertEqual(model,None)
        self.assertEqual(200, r.status_code)
        self.assertEqual(result, 'deleted')