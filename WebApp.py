# sudo apt-get install python3-pip
# pip3 install eventlet
# pip3 install flask
# pip3 install flask_socketio
# pip3 install numpy
# pip3 install SQLAlchemy-serializer


import eventlet
eventlet.monkey_patch()


from flask import Flask, render_template, Response, jsonify, request, abort
from flask_socketio import SocketIO, emit
from flask import current_app 
import datetime
from queue import Queue
import threading
import socket
from time import sleep
import json
import pickle
from flask import g
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import desc, or_

#Database
from flask_sqlalchemy import SQLAlchemy


#List All API
tasks = [
    {
        'taskID': 1,
        'title': u'Set new Robot status',
        'description': u'Set new Robot R status (positon, sensors, actuators) at current time t', 
        'robotid': "Name of the robot",
        'x': "Robot x-position [mm]",
        'y': "Robot y-position [mm]",
        'theta': "Robot theta-position [deg]",
        'distance 1': "Distance Sensor 1 [mm]",
        'distance 2': "Distance Sensor 2 [mm]",
        'distance 3': "Distance Sensor 3 [mm]",
        'distance 4': "Distance Sensor 4 [mm]",
        'distance 5': "Distance Sensor 5 [mm]",
        'distance 6': "Distance Sensor 6 [mm]"
    },
    {
        'taskID': 2,
        'title': u'Get list Robot status in database',
        'description': u'Get list of Robot status in database from timeX to timeY depending on optional filters F', 
        'F_robotid': "0 or 1 : robot_number or -1 if not used",
        'timeX': "start time",
        'timeY': "end time"

    }
]


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database/robot.sqlite3'
db = SQLAlchemy(app)

socketio = SocketIO(app)

def converter(obj):

    if isinstance(obj, (datetime.datetime, datetime.date)):

        return obj.isoformat()

    raise TypeError (f"{type(obj)} not datetime")


def datetime_parser(dct):
    for k, v in dct.items():
        if isinstance(v, basestring) and re.search("\ UTC", v):
            try:
                dct[k] = datetime.datetime.strptime(v, DATE_FORMAT)
            except:
                pass
    return dct

def myconverter(o):
    if isinstance(o, datetime):
        return o.__str__()


class RobotStatusDBB(db.Model, SerializerMixin):
   id = db.Column(db.Integer, primary_key=True)
   uid = db.Column(db.String(96), nullable=False)
   timestamp = db.Column(db.DateTime(),nullable=False)
   x = db.Column(db.Integer())
   y = db.Column(db.Integer())
   theta = db.Column(db.Integer())
   distance1 = db.Column(db.Integer())
   distance2 = db.Column(db.Integer())
   distance3 = db.Column(db.Integer())
   distance4 = db.Column(db.Integer())
   distance5 = db.Column(db.Integer())
   distance6 = db.Column(db.Integer())

   def __init__(self,uid_new, timestamp_new, x_new, y_new,theta_new, distance1_new,distance2_new,distance3_new,distance4_new,distance5_new,distance6_new):
      self.uid = uid_new
      self.timestamp =  timestamp_new
      self.x = x_new
      self.y = y_new
      self.theta = theta_new
      self.distance1 = distance1_new
      self.distance2 = distance2_new
      self.distance3 = distance3_new
      self.distance4 = distance4_new
      self.distance5 = distance5_new
      self.distance6 = distance6_new

   def __repr__(self):
      return '<User %r>' % self.username

class RobotRegistered(db.Model, SerializerMixin):
   id    = db.Column(db.Integer, primary_key=True)
   uid   = db.Column(db.String(96), nullable=False)
   name  = db.Column(db.String(30), nullable=False)
   timestamp_registration  = db.Column(db.DateTime(),nullable=False)
   timestamp_lastconnexion = db.Column(db.DateTime(),nullable=False)
   last_ip = db.Column(db.String(15), nullable=False)

   def __init__(self, new_uid, new_name, new_registration, new_connexion, new_ip):
      self.uid = new_uid
      self.name =  new_name
      self.timestamp_registration = new_registration
      self.timestamp_lastconnexion = new_connexion
      self.last_ip = new_ip

   def __repr__(self):
      return {c.name: getattr(getattr(self, c.name)) for c in self.__table__.columns}

   def to_dict(self):
      return ({c.name: getattr(self, c.name)for c in self.__table__.columns})

   def __str__(self):
      return json.dumps({c.name: getattr(self, c.name)for c in self.__table__.columns}, default=converter)

class Logs(db.Model, SerializerMixin):
   id    = db.Column(db.Integer, primary_key=True)
   uid   = db.Column(db.String(96), nullable=True)
   timestamp   = db.Column(db.DateTime(),nullable=False)
   event_type  = db.Column(db.String(30), nullable=False)
   category  = db.Column(db.String(30), nullable=False)
   comments  = db.Column(db.String(255), nullable=False)
   by = db.Column(db.String(30), nullable=False)

   def __init__(self, new_uid, new_timestamp, new_event_type, new_category, new_comments, new_by):
      self.uid = new_uid
      self.timestamp =  new_timestamp
      self.event_type = new_event_type
      self.category = new_category
      self.comments = new_comments
      self.by = new_by

   def __repr__(self):
      return {c.name: getattr(getattr(self, c.name)) for c in self.__table__.columns}

   def to_dict(self):
      return ({c.name: getattr(self, c.name)for c in self.__table__.columns})

   def __str__(self):
      return json.dumps({c.name: getattr(self, c.name)for c in self.__table__.columns}, default=converter)


@app.route("/")
def index():
   now = datetime.datetime.now()
   timeString = now.strftime("%Y-%m-%d %H:%M")
   templateData = {
      'title' : 'HELLO!',
      'time': timeString
      }
   return render_template('index.html', **templateData)

def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

@socketio.on('connect')
def test_connect():
   print('Client connected sid:'+str(request.sid))
   db.session.add(Logs(str(request.sid), datetime.datetime.now(),"connection", "connection","Client connected on SocketIO", request.remote_addr))
   db.session.commit()

@socketio.on('disconnect')
def test_connect():
   print('Client disconnected sid: '+str(request.sid))
   

@socketio.on('my event')
def handle_my_custom_event(msg, methods=['GET', 'POST']):
   print('received my event: ' + str(msg))
   #print('Robot myevent: '+str(robot))
   #print("distance :"+str(robot.distances))
   #msg = json.loads(msg)
   socketio.emit('my response', {"cmd":"getInfo","data":0, "current_position":0, "leds":0, "distances":0})

@socketio.on('authentification')
def authentification(msg):
   print("received authentification request"+str(msg))
   socketio.emit('authentification', {'robotname':msg['robotname']})

@socketio.on('AddRobotRegistered')
def AddRobotRegistered(data):
   if data['uid'] and data['name']:
      timestamp = datetime.datetime.now()
      robotregistered = RobotRegistered(data['uid'], data['name'], timestamp, timestamp, request.remote_addr)
      db.session.add(robotregistered)
      db.session.add(Logs(str(request.sid), datetime.datetime.now(),"robot added","info", "New Robot Added ("+str(data['uid'])+")", request.remote_addr))
      db.session.commit()  

@socketio.on('GetAllRobotRegistered')
def GetAllRobotRegistered(data):
   allrobots = RobotRegistered.query.all()
   list = []
   for item in allrobots:
      list.append(item.to_dict().copy())
      print(list)
   
   socketio.emit('AllRobotRegistered', json.dumps(list,default=converter))

@socketio.on('GetAllLogs')
def GetAllLogs(data):
   filters_type = []
   print(data)
   if data["filter_connection"]:
      filters_type.append("connection")

   if data["filter_info"]:
      filters_type.append("info")
   
   if data["filter_warning"]:
      filters_type.append("warning")

   if data["filter_critical"]:
      filters_type.append("critical")

   logs = Logs.query.filter(Logs.event_type.in_(filters_type)).order_by(desc(Logs.timestamp)).all()
   list = []
   for item in logs:
      list.append(item.to_dict().copy())
   
   socketio.emit('AllLogs', json.dumps(list,default=converter))

@socketio.on('GetRobotPosition')
def GetRobotPosition(data):
   filters_type = []
   print("GetRobotPosition"+str(data))

   robots_positions = RobotStatusDBB.query.filter_by(uid=data["uid"]).order_by(desc(RobotStatusDBB.timestamp)).limit(data["number"]).all()
   list = []
   for item in robots_positions:
      list.append(item.to_dict().copy())
   
   socketio.emit('GetRobotPosition', json.dumps(list,default=converter))


@socketio.on('UpdateRobotView')
def UpdateRobotView(msg):
   print("received UpdateRobotView request"+str(msg))
   
   # One robot sent a new position + status
   # 1. Verify the UID is known
   if {"UID", "timestamp", "x", "y", "theta", "distance1", "distance2", "distance3", "distance4", "distance5", "distance6"} <= msg.keys():
      uid = RobotRegistered.query.filter_by(uid=msg["UID"]).first()
      if uid is not None:
         # 2. If UID is known, check when was the last data received
         date_last_data = RobotStatusDBB.query.filter_by(uid=msg["UID"]).order_by(desc(RobotStatusDBB.timestamp)).first();
         if date_last_data is None:
            newtime = datetime.datetime.strptime(json.loads(msg["timestamp"], object_hook=datetime_parser), '%Y-%m-%dT%H:%M:%S.%f')
            db.session.add(RobotStatusDBB(msg['UID'], newtime, msg['x'], msg['y'],msg['theta'], msg['distance1'], msg['distance2'], msg['distance3'], msg['distance4'], msg['distance5'], msg['distance6']))
            socketio.emit('new_status_data', {"timestamp":msg['timestamp'], "UID":msg['UID'],"x": msg['x'], "y":msg['y'],"theta":msg['theta'], "distance1":msg['distance1'],"distance2":msg['distance2'],"distance3":msg['distance3'],"distance4":msg['distance4'],"distance5":msg['distance5'],"distance6":msg['distance6']})
            db.session.commit() 
         else: # 3. If data received less than 500ms ago, abort ==> Do not store / refresh ui more often than every 500ms
            newtime = datetime.datetime.strptime(json.loads(msg["timestamp"], object_hook=datetime_parser), '%Y-%m-%dT%H:%M:%S.%f')
            if int((newtime - date_last_data.timestamp).total_seconds()* 1000 ) >= 500:
               # 4. If last data received more than 500ms ago, store and forward the info to UI to update 
               db.session.add(RobotStatusDBB(msg['UID'], newtime, msg['x'], msg['y'],msg['theta'], msg['distance1'], msg['distance2'], msg['distance3'], msg['distance4'], msg['distance5'], msg['distance6']))
               socketio.emit('new_status_data', {"timestamp":msg['timestamp'], "UID":msg['UID'],"x": msg['x'], "y":msg['y'],"theta":msg['theta'], "distance1":msg['distance1'],"distance2":msg['distance2'],"distance3":msg['distance3'],"distance4":msg['distance4'],"distance5":msg['distance5'],"distance6":msg['distance6']})
               db.session.commit() 
      else:
         print("Error UID unknow")
   else:
      print("Error request UpdateRobotView. Bad data dict ")

@app.route('/map/')
def map():
   return render_template('map.html')

@app.route('/admin/')
def admin():
   return render_template('admin.html')

@app.route('/api/task', methods=['GET'])
def get_tasks():
    return jsonify({'tasks': tasks})

@app.route('/api/task', methods=['POST'])
def do_task():
   if not request.json or not 'taskID' in request.json:
        abort(400)

   #If requested, add a new robot status to the database
   if request.json['taskID'] == 1:
      timestamp = datetime.now()
      robot = RobotStatusDBB(timestamp,request.json['robotid'], request.json['x'], request.json['y'],request.json['theta'], request.json['distance1'],request.json['distance2'],request.json['distance3'],request.json['distance4'],request.json['distance5'],request.json['distance6'])
      db.session.add(robot)
      db.session.commit()
      
      task = {
        'taskID': request.json['taskID'],
        'done': True
      }
      #warn connected clients UI could be updated with new status
      socketio.emit('new_status_data', {"timestamp":json.dumps(timestamp,default = myconverter),"robotid":request.json['robotid'],"x": request.json['x'], "y":request.json['y'],"theta":request.json['theta'], "distance1":request.json['distance1'],"distance2":request.json['distance2'],"distance3":request.json['distance3'],"distance4":request.json['distance4'],"distance5":request.json['distance5'],"distance6":request.json['distance6']})
      return jsonify({'tasks': task})
   else:
      socketio.emit('new_status_data', {"robotid":request.json['robotid'],"x": request.json['x'], "y":request.json['y'],"theta":request.json['theta'], "distance1":request.json['distance1'],"distance2":request.json['distance2'],"distance3":request.json['distance3'],"distance4":request.json['distance4'],"distance5":request.json['distance5'],"distance6":request.json['distance6']})
      return jsonify({'tasks': {
        'taskID': request.json['taskID'],
        'done': False
      }})

@app.route('/tests/')
def tests():
    return render_template('tests.html')

def gen(camera):

   while True:
      frame = camera.get_frame()
      yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route("/video_feed/")
def video_feed():
	# return the response generated along with the specific media
	# type (mime type)
   if raspberry == 1:
      return Response(gen(VisionCamera()),mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/myrobots/')
def myrobots():
    return render_template('myrobots.html')


if __name__ == "__main__":
   db.create_all()
   socketio.run(app, host='0.0.0.0',port=666, debug=True)