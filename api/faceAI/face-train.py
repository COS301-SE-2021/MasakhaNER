import os
from PIL import Image
import numpy as np
import cv2
import pickle

dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, "cascades/data/haarcascade_frontalface_alt2.xml")
face_cascade = cv2.CascadeClassifier(filename)
recogniser = cv2.face.LBPHFaceRecognizer_create()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
image_dir = os.path.join(BASE_DIR, "images")

current_id=0;
label_ids = {}
y_labels = []
x_train = []

for root, dirs, files in os.walk(image_dir):
    for file in files:
        if file.endswith("png") or file.endswith("jpg"):
                #get images from dir
                path = os.path.join(root, file)
                label = os.path.basename(root).replace(" ","-").lower()
                #print(label, path)
                if not label in label_ids:
                    label_ids[label] = current_id
                    current_id += 1

                id_ = label_ids[label]


                #convert image to array
                pil_image = Image.open(path).convert("L")
                size = (550,550)
                pil_image = pil_image.resize(size, Image.ANTIALIAS)
                image_array = np.array(pil_image, "uint8")

                faces  = face_cascade.detectMultiScale(image_array, scaleFactor=1.5, minNeighbors=5)
                for(x,y,w,h) in faces:
                    #print(x,y,w,h)
                    roi = image_array[y:y+h,x:x+w]
                    x_train.append(roi)
                    y_labels.append(id_)
                    
filename = os.path.join(dirname, "labels.pickle")
with open(filename, "wb") as f:
    pickle.dump(label_ids, f)

recogniser.train(x_train, np.array(y_labels))
recogniser.save("trainner.yml")