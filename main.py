from flask import Flask, json, jsonify, request
from model import runModel

app = Flask(__name__)

# load in model
runModel("")


@app.route("/", methods=["GET"])
def hello_world():
    return "hello world"


@app.route("/input", methods=["POST"])
def model_feedback():
    user_input = str(request.json["input"])

    model_feedback = str(runModel(user_input))

    return {'output': model_feedback}, 200


if __name__ == "__main__":
    app.run()
