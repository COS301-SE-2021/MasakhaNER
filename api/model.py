from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline

'''
@misc{adelani2021masakhaner,
      title={MasakhaNER: Named Entity Recognition for African Languages}, 
      author={David Ifeoluwa Adelani and Jade Abbott and Graham Neubig and Daniel D'souza and Julia Kreutzer and Constantine Lignos and Chester Palen-Michel and Happy Buzaaba and Shruti Rijhwani and Sebastian Ruder and Stephen Mayhew and Israel Abebe Azime and Shamsuddeen Muhammad and Chris Chinenye Emezue and Joyce Nakatumba-Nabende and Perez Ogayo and Anuoluwapo Aremu and Catherine Gitau and Derguene Mbaye and Jesujoba Alabi and Seid Muhie Yimam and Tajuddeen Gwadabe and Ignatius Ezeani and Rubungo Andre Niyongabo and Jonathan Mukiibi and Verrah Otiende and Iroro Orife and Davis David and Samba Ngom and Tosin Adewumi and Paul Rayson and Mofetoluwa Adeyemi and Gerald Muriuki and Emmanuel Anebi and Chiamaka Chukwuneke and Nkiruka Odu and Eric Peter Wairagala and Samuel Oyerinde and Clemencia Siro and Tobius Saul Bateesa and Temilola Oloyede and Yvonne Wambui and Victor Akinode and Deborah Nabagereka and Maurice Katusiime and Ayodele Awokoya and Mouhamadane MBOUP and Dibora Gebreyohannes and Henok Tilaye and Kelechi Nwaike and Degaga Wolde and Abdoulaye Faye and Blessing Sibanda and Orevaoghene Ahia and Bonaventure F. P. Dossou and Kelechi Ogueji and Thierno Ibrahima DIOP and Abdoulaye Diallo and Adewale Akinfaderin and Tendai Marengereke and Salomey Osei},
      year={2021},
      eprint={2103.11811},
      archivePrefix={arXiv},
      primaryClass={cs.CL}
}

'''


def runModel(input):
    url = "Davlan/distilbert-base-multilingual-cased-masakhaner"
    tokenizer = AutoTokenizer.from_pretrained(url)
    model = AutoModelForTokenClassification.from_pretrained(url)
    nlp = pipeline("ner", model=model, tokenizer=tokenizer)
    example = "Emir of Kano turban Zhang wey don spend 18 years for Nigeria"
    ner_results = nlp(input)
    return ner_results
