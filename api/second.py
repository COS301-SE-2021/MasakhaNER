
from transformers import MT5ForConditionalGeneration, T5Tokenizer


def translate_text(input):
    model = MT5ForConditionalGeneration.from_pretrained(
        "Davlan/mt5_base_yor_eng_mt")

    tokenizer = T5Tokenizer.from_pretrained("google/mt5-base")

    # input_string = "Akọni ajìjàgbara obìnrin tó sun àtìmalé torí owó orí"
    input_string = str(input)

    inputs = tokenizer.encode(input_string, return_tensors="pt")

    generated_tokens = model.generate(inputs)

    results = tokenizer.batch_decode(
        generated_tokens, skip_special_tokens=True)

    # print(results)
    return results


# print(translate_text("Akọni ajìjàgbara obìnrin tó sun àtìmalé torí owó orí"))
