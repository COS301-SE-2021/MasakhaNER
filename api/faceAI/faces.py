from os import name
import numpy as np
import cv2
import pickle

face_cascade = cv2.CascadeClassifier("cascades/data/haarcascade_frontalface_alt2.xml")
recogniser = cv2.face.LBPHFaceRecognizer_create()
recogniser.read("trainner.yml")

labels = {}
with open("labels.pickle", "rb") as f:
    flabels = pickle.load(f)
    labels = {v:k for k,v in flabels.items()}

#cap = cv2.VideoCapture(0)
cap = cv2.imread("api/faceAI/pte.jpg",0)
print(type(cap),cap)

while(True):
    #capture frams
    #ret,frame = cap.read()
    frame = cap
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces  = face_cascade.detectMultiScale(gray, scaleFactor=1.5, minNeighbors=5)
    for(x,y,w,h) in faces:
        #print(x,y,w,h)
        roi_gray = gray[y:y+h,x:x+w]
        roi_color = frame[y:y+h,x:x+w]
        

        id_, conf = recogniser.predict(roi_gray)
        if conf>=55:
            #print(id_)
            #print(labels[id_])
            font = cv2.FONT_HERSHEY_COMPLEX
            name = labels[id_]
            color = (255,255,255)
            stroke = 2
            cv2.putText(frame, name, (x,y), font, 1, color, stroke, cv2.LINE_AA)

        img_item = "my-image.png"
        cv2.imwrite(img_item, roi_gray)
        
        #draw rectangle
        color = (0,255,0)
        stroke = 2
        width = x+w
        height = y+h
        cv2.rectangle(frame, (x,y), (width,height), color, stroke)


    #Display frame
    cv2.imshow('frame',frame)
    if cv2.waitKey(20) & 0xFF == ord('q'):
        break

#release capture
cap.release()
cv2.destroyAllWindows()