import json
import requests

API_URL = "https://api-inference.huggingface.co/models/Davlan/mt5_base_yor_eng_mt"
headers = {"Authorization": f"Bearer api_pmZfPBfGkXyCCerNASGkANygNKGSiSNxAs"}


def query(payload):
    data = json.dumps(payload)
    response = requests.request("POST", API_URL, headers=headers, data=data)
    return json.loads(response.content.decode("utf-8"))


def translate_text(input):
    data = query(input)

    return data[0]['generated_text']


# print(translate_text("Akọni ajìjàgbara obìnrin tó sun àtìmalé torí owó orí"))
