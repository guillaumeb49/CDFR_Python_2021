# pip3 install "python-socketio[client]"

import socketio
import time

sio = socketio.Client()

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

   sio.emit('authentification', {'robotname': 'Guillaume'})

   # Connect for 10 seconds and close connection
   time.sleep(10)

   sio.disconnect()

