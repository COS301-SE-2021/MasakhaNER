import os
from PIL import Image
import numpy as np
import cv2
import pickle

face_cascade = cv2.CascadeClassifier("cascades/data/haarcascade_frontalface_alt2.xml")


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
                print(label, path)
                if not label in label_ids:
                    label_ids[label] = current_id
                    current_id += 1

                id_ = label_ids[label]


                #convert image to array
                pil_image = Image.open(path).convert("L")
                image_array = np.array(pil_image, "uint8")

                faces  = face_cascade.detectMultiScale(image_array, scaleFactor=1.5, minNeighbors=5)
                for(x,y,w,h) in faces:
                    print(x,y,w,h)
                    roi = image_array[y:y+h,x:x+w]
                    x_train.append(roi)
                    y_labels.append(id_)
                    roi_color = frame[y:y+h,x:x+w]
                    img_item = "my-image.png"

                    

                    cv2.imwrite(img_item, roi_gray)
                    
                    #draw rectangle
                    color = (0,255,0)
                    stroke = 2
                    width = x+w
                    height = y+h
                    cv2.rectangle(frame, (x,y), (width,height), color, stroke)

with open("labels.pickle", "wb") as f:
    pickle.dump(label_ids, f)