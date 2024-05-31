import cv2
import pickle
import cvzone
import numpy as np
import requests
import os
import sys

api_url = sys.argv[1] + "1/1"
# print("url",api_url)

# print(os.getcwd())

script_dir = os.path.dirname(os.path.abspath(__file__))

video_path = os.path.join(script_dir, "../footage/carPark.mp4")
pickle_path = os.path.join(script_dir, "../bounding_boxes/CarParkPos")

src = cv2.VideoCapture(video_path)

empty_prev = 0
empty_curr = 0

with open(pickle_path,'rb') as f:
    posList = pickle.load(f)

def checkParkingSpace(imgPro):
    
    total = len(posList)
    empty = 0

    for pos in posList:
        x, y = pos

        imgCrop = imgPro[y : y + height, x : x + width]
        # cv2.imshow(str(x*y),imgCrop)

        count = cv2.countNonZero(imgCrop)

        cvzone.putTextRect(frame, str(count), (x, y + height - 3), scale = 1, thickness = 2, offset = 0)
        # cvzone.putTextRect(frame, str("%.2f" % (count/totalCount)), (x, y + height - 3), scale = 1, thickness = 2, offset = 0)

        if count < 800 :
            color = (0, 255, 0)
            thickness = 5
            empty += 1
        else :
            color = (0, 0, 255)
            thickness = 2

        cv2.rectangle(frame, pos, (pos[0] + width, pos[1] + height), color, thickness)

    global empty_curr, empty_prev
    empty_curr = empty

    if empty_prev != empty_curr:
        delta = 1

        response = requests.patch(api_url, json={"empty": empty})

    else:
        delta = 0

    empty_prev = empty_curr

    cvzone.putTextRect(frame, str(empty) + "/" + str(total), (40, 40), scale = 3, thickness = 2, offset = 0)
    cvzone.putTextRect(frame, "delta = " + str(delta), (300, 40), scale = 3, thickness = 2, offset = 10)

width, height = 107, 48
while True:

    if src.get(cv2.CAP_PROP_POS_FRAMES) == src.get(cv2.CAP_PROP_FRAME_COUNT):
        src.set(cv2.CAP_PROP_POS_FRAMES, 0)

    success, frame = src.read()
    imgGray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    imgBlur = cv2.GaussianBlur(imgGray, (3,3), 1)
    imgThreshold = cv2.adaptiveThreshold(imgBlur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 25, 16)
    imgMedian = cv2.medianBlur(imgThreshold, 5)
    imgDilated = cv2.dilate(imgMedian, np.ones((3,3)))

    checkParkingSpace(imgDilated)

    cv2.imshow("image",frame)
    cv2.waitKey(1)