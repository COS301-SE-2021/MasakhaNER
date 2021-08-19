from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline

def runModel(input):
    url = "Davlan/distilbert-base-multilingual-cased-masakhaner"
    tokenizer = AutoTokenizer.from_pretrained(url)
    model = AutoModelForTokenClassification.from_pretrained(url)
    nlp = pipeline("ner", model=model, tokenizer=tokenizer)
    example = "Emir of Kano turban Zhang wey don spend 18 years for Nigeria"
    ner_results = nlp(input)
    return ner_results