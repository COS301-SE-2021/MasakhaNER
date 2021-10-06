import json
import requests

API_URL = "https://api-inference.huggingface.co/models/Davlan/bert-base-multilingual-cased-masakhaner"
headers = {"Authorization": f"Bearer api_pmZfPBfGkXyCCerNASGkANygNKGSiSNxAs"}


def query(payload):
    data = json.dumps(payload)
    response = requests.request("POST", API_URL, headers=headers, data=data)
    return json.loads(response.content.decode("utf-8"))


def runModel(input):
    data = query({
        "inputs": input,
    })

    return data
