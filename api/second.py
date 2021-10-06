
# from transformers import MT5ForConditionalGeneration, T5Tokenizer


# def translate_text(input):
#     model = MT5ForConditionalGeneration.from_pretrained(
#         "Davlan/mt5_base_yor_eng_mt")

#     tokenizer = T5Tokenizer.from_pretrained("google/mt5-base")

#     # input_string = "Akọni ajìjàgbara obìnrin tó sun àtìmalé torí owó orí"
#     input_string = str(input)

#     inputs = tokenizer.encode(input_string, return_tensors="pt")

#     generated_tokens = model.generate(inputs)

#     results = tokenizer.batch_decode(
#         generated_tokens, skip_special_tokens=True)

#     # print(results)
#     return results[0]


# # print(translate_text("Akọni ajìjàgbara obìnrin tó sun àtìmalé torí owó orí"))

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
