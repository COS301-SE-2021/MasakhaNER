from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline

def runModel(input):
    tokenizer = AutoTokenizer.from_pretrained("Davlan/bert-base-multilingual-cased-masakhaner")
    model = AutoModelForTokenClassification.from_pretrained("Davlan/bert-base-multilingual-cased-masakhaner")
    nlp = pipeline("ner", model=model, tokenizer=tokenizer)
    example = "Emir of Kano turban Zhang wey don spend 18 years for Nigeria"
    ner_results = nlp(input)
    return ner_results