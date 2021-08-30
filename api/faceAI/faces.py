import os
import numpy as np
import cv2
import pickle

dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, "cascades/data/haarcascade_frontalface_alt2.xml")
face_cascade = cv2.CascadeClassifier(filename)

filename = os.path.join(dirname, "trainner.yml")
recogniser = cv2.face.LBPHFaceRecognizer_create()
recogniser.read(filename)

labels = {}
filename = os.path.join(dirname, "labels.pickle")
with open(filename, "rb") as f:
    flabels = pickle.load(f)
    labels = {v:k for k,v in flabels.items()}

filename = os.path.join(dirname, "kit.jpg")
cap = cv2.VideoCapture(0)
image = cv2.imread(filename)

#while(True):
#capture frams
frame = image
#print(frame,type(frame))
gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#faces  = face_cascade.detectMultiScale(gray, scaleFactor=1.5, minNeighbors=5,minSize=(60, 60),flags=cv2.CASCADE_SCALE_IMAGE)
faces = face_cascade.detectMultiScale(
    gray,
    scaleFactor=1.1,
    minNeighbors=5,
    minSize=(30, 30),
    flags = cv2.CASCADE_SCALE_IMAGE
)
print(faces)
for(x,y,w,h) in faces:
    #print(x,y,w,h)
    roi_gray = gray[y:y+h,x:x+w]
    roi_color = frame[y:y+h,x:x+w]
    

    id_, conf = recogniser.predict(roi_gray)
    print(id_)
    print(labels[id_])
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
cv2.waitKey(0)

#release capture
# cap.release()
# cv2.destroyAllWindows()