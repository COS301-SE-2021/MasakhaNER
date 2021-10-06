# from transformers import AutoTokenizer, AutoModelForTokenClassification
# from transformers import pipeline


# def runModel(input):
#     url = "Davlan/bert-base-multilingual-cased-masakhaner"
#     tokenizer = AutoTokenizer.from_pretrained(url)
#     model = AutoModelForTokenClassification.from_pretrained(url)
#     nlp = pipeline("ner", model=model, tokenizer=tokenizer)
#     example = "Emir of Kano turban Zhang wey don spend 18 years for Nigeria"
#     ner_results = nlp(input)
#     return ner_results

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


# output = runModel(
#     "Emir of Kano turban Zhang wey don spend 18 years for Nigeria")

# print(output)
