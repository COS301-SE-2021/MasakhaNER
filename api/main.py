from datetime import datetime
from flask import Flask
from flask import request
from flask.json import jsonify

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

if __name__ == "__main__":
    app.run(debug=True)