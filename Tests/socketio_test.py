# pip3 install "python-socketio[client]"

import socketio
import time
import datetime
import json

sio = socketio.Client()


def converter(obj):

    if isinstance(obj, (datetime.datetime, datetime.date)):

        return obj.isoformat()

    raise TypeError (f"{type(obj)} not datetime")


@sio.on('my message')
def on_message(data):
    print('I received a message!')

@sio.event
def connect():
    print("I'm connected!")

@sio.event
def connect_error():
    print("The connection failed!")

@sio.event
def disconnect():
    print("I'm disconnected!")

if __name__ == "__main__":
   
  

   sio.connect('http://localhost:666')

   print('my sid is', sio.sid)


   sio.emit('UpdateRobotView', {"UID":123456789,"timestamp": json.dumps(datetime.datetime.now(), default=converter),"x": 100, "y":100,"theta":0, "distance1":20,"distance2":20,"distance3":20,"distance4":20,"distance5":20,"distance6":20})
   time.sleep(1)
   sio.emit('UpdateRobotView', {"UID":123456789,"timestamp": json.dumps(datetime.datetime.now(), default=converter),"x": 500, "y":250,"theta":0, "distance1":20,"distance2":20,"distance3":20,"distance4":20,"distance5":20,"distance6":20})
   time.sleep(1)
   sio.emit('UpdateRobotView', {"UID":123456789,"timestamp": json.dumps(datetime.datetime.now(), default=converter),"x": 1000, "y":100,"theta":0, "distance1":20,"distance2":20,"distance3":20,"distance4":20,"distance5":20,"distance6":20})
   time.sleep(1)
   sio.emit('UpdateRobotView', {"UID":123456789,"timestamp": json.dumps(datetime.datetime.now(), default=converter),"x": 1500, "y":500,"theta":0, "distance1":20,"distance2":20,"distance3":20,"distance4":20,"distance5":20,"distance6":20})
   time.sleep(1)
   sio.emit('UpdateRobotView', {"UID":123456789,"timestamp": json.dumps(datetime.datetime.now(), default=converter),"x": 1500, "y":1000,"theta":0, "distance1":20,"distance2":20,"distance3":20,"distance4":20,"distance5":20,"distance6":20})
   time.sleep(1)
   sio.emit('UpdateRobotView', {"UID":123456789,"timestamp": json.dumps(datetime.datetime.now(), default=converter),"x": 2000, "y":1000,"theta":0, "distance1":20,"distance2":20,"distance3":20,"distance4":20,"distance5":20,"distance6":20})
   time.sleep(1)
   sio.emit('UpdateRobotView', {"UID":123456789,"timestamp": json.dumps(datetime.datetime.now(), default=converter),"x": 2250, "y":1500,"theta":0, "distance1":20,"distance2":20,"distance3":20,"distance4":20,"distance5":20,"distance6":20})
   time.sleep(1)
   sio.emit('UpdateRobotView', {"UID":123456789,"timestamp": json.dumps(datetime.datetime.now(), default=converter),"x": 2250, "y":1800,"theta":0, "distance1":20,"distance2":20,"distance3":20,"distance4":20,"distance5":20,"distance6":20})
   time.sleep(1)
   sio.emit('UpdateRobotView', {"UID":123456789,"timestamp": json.dumps(datetime.datetime.now(), default=converter),"x": 2500, "y":1700,"theta":0, "distance1":20,"distance2":20,"distance3":20,"distance4":20,"distance5":20,"distance6":20})
   time.sleep(1)
   sio.emit('UpdateRobotView', {"UID":123456789,"timestamp": json.dumps(datetime.datetime.now(), default=converter),"x": 2500, "y":1000,"theta":0, "distance1":20,"distance2":20,"distance3":20,"distance4":20,"distance5":20,"distance6":20})
   time.sleep(1)
   sio.emit('UpdateRobotView', {"UID":123456789,"timestamp": json.dumps(datetime.datetime.now(), default=converter),"x": 2800, "y":500,"theta":0, "distance1":20,"distance2":20,"distance3":20,"distance4":20,"distance5":20,"distance6":20})
   time.sleep(1)
   sio.emit('UpdateRobotView', {"UID":123456789,"timestamp": json.dumps(datetime.datetime.now(), default=converter),"x": 2500, "y":500,"theta":0, "distance1":20,"distance2":20,"distance3":20,"distance4":20,"distance5":20,"distance6":20})
   time.sleep(1)
   sio.emit('UpdateRobotView', {"UID":123456789,"timestamp": json.dumps(datetime.datetime.now(), default=converter),"x": 1000, "y":600,"theta":0, "distance1":20,"distance2":20,"distance3":20,"distance4":20,"distance5":20,"distance6":20})
   time.sleep(1)
   sio.emit('UpdateRobotView', {"UID":123456789,"timestamp": json.dumps(datetime.datetime.now(), default=converter),"x": 300, "y":850,"theta":0, "distance1":20,"distance2":20,"distance3":20,"distance4":20,"distance5":20,"distance6":20})
   # Connect for 10 seconds and close connection
  

   sio.disconnect()

