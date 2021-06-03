from datetime import datetime
from flask import Flask
from flask import request
#mport psycopg2

#for importing files that are in a parent dir
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

#the file to be imported
# import database
from database.database import User




app = Flask(__name__)

compareList = [
        ['michael','person'],
        ['johny','person'],
        ['erick','person'],
        ['kanye','person'],
        ['london','location'],
        ['johannesburg','location'],
        ['cape town','location'],
        ['tokyo','location'],
        ['janauary','date'],
        ['febraury','date'],
        ['today','date'],
        ['monday','date'],
        ['yesterday','date'],
    ]

@app.route('/index')
def get_current_time():
    now = datetime.now()
    return {'time': now}

def annotate(model_output):
    newlist = []
    for x in model_output:
        for y in compareList:
            if x.lower() == y[0]:
                newlist.append({"name":x, "entity": y[1]})
                break
    
    return newlist

@app.route('/input', methods=["POST"])
def model_feedback():
    model_output = str(request.json["input"]).split()

    
    
    annotatedlist = annotate(model_output)

    return {'output': annotatedlist}

@app.route('/register', methods=["POST"])
def register_user():
    db = User()
    user_firstname = str(request.json["firstname"])
    user_lastname = str(request.json["lastname"])
    user_email = str(request.json["email"])
    user_password = str(request.json["password"])

    db.register(user_firstname, user_lastname, user_email, user_password)


    return {'output':'registered'}

@app.route('/validate-user-registration', methods=["POST"])
def validate_register_user():
   
    # user_firstname = str(request.json["firstname"])
    # user_lastname = str(request.json["lastname"])
    # user_email = str(request.json["email"])
    # user_password = str(request.json["password"])
    user_code  = request.json["code"]
    
    if user_code == User().get_code(str(request.json["email"])):
        User().update_user(str(request.json["email"]))
        return {'output':'chnaged'}
    else:
        return {'output':'false'}

@app.route('/login', methods=["POST"])
def login_user():
    db = User()
    user_email = str(request.json["email"])
    user_password = str(request.json["password"])

    if db.login(user_email, user_password):
        return {'output':'logged-in'}
    else:
        return {'output':'invalid email or passowrd'}




    


if __name__ == "__main__":
    app.run(debug=True)