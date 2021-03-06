from robotic_basics import Robot_static
import socket
import time
import asyncio
from struct import *
import threading

class Robot_Interface(Robot_static):
    def __init__(self):
        Robot_static.__init__(self,'George')
        self.com2st = lowLevelCom('10.10.0.2')
        self.t0 = threading.Thread(target=self.comLoop)
        self.endFlag = False
        
    def __str__(self):
        print('Rbot Interface')

    def startCom(self):
        self.t0.start()

    def endCom(self):
        self.endFlag = True

    def comLoop(self):
        while self.endFlag == False:
            with self.com2st :
                self.com2st.comStep()
            time.sleep(1)

    #   @def : PrepareCMD_GetInfo(id)
    #   Prepare a TCP Frame to send a GET INFO command to the STM32
    def getInfo(self):
        ref, frame_get_info = self.com2st.buildTCP_Frame(0x01,0,None)
        self.com2st.sendTCP_Frame(frame_get_info)
        return ref

    #   @def : PrepareCMD_SetLED(id, led_red,led_blue,led_green)
    #   Prepare a TCP Frame to send a SET LED command to the STM32
    #   @params :  - id: ID of the TCP frame
    #              - led_red:  1: turn on the RED LED, 0: turn off the RED LED, 2: do not modify current state of RED LED  
    #              - led_blue: 1: turn on the BLUE LED, 0: turn off the BLUE LED, 2: do not modify current state of BLUE LED   
    #              - led_green:1: turn on the GREEN LED, 0: turn off the GREEN LED, 2: do not modify current state of GREEN LED   
    def setLED(self, led_red, led_blue, led_green):
        param = (led_red << 16) + (led_blue << 8) + (led_green)
        ref, frame_set_led = self.com2st.buildTCP_Frame(0x02,1,[param])
        self.com2st.sendTCP_Frame(frame_set_led)
        return ref

    #   @def : PrepareCMD_CMD_MANUAL_CTRL(id, consigne)
    #   Prepare a TCP Frame to send a new manual position command to the STM32
    #   @params :  - id: ID of the TCP frame
    #              - consigne:  0   = STOP
    #                               1   = MOVE FORWARD
    #                               2   = MOVE BACKWARD
    #                               3   = MOVE LEFT
    #                               4   = MOVE RIGHT
    #   @return : return the TCP frame ready to be sent to the STM32
    def setManualCtrl(self, consigne):
        switch = {'z':1,'s':2,'q':3,'d':4 ,' ':0}

        if consigne in switch.values() or consigne in switch.keys():
            if type(consigne) == type('c'):
                consigne = switch[consigne]
            else :
                pass
        else :
            consigne = 0

        param = consigne
        ref, frame_consigne = self.com2st.buildTCP_Frame(0x0D,1,[param])
        self.com2st.sendTCP_Frame(frame_consigne)
        return ref

class lowLevelCom :
    def __init__(self,ip_add):
        self.ip_add = ip_add
        self.port = 7
        self.id = 0
        self.questions = list()
        self.reponses = dict()

    def __enter__(self):
        try :
            self.link = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            self.link.connect((self.ip_add, self.port)) # Ouverture du socket
        except socket.error as msg:
            print(f"Erreur de connection {msg}")

    def __exit__(self, type, value, traceback):
        self.link.close()   # fermeture du socket
    
    ##
    #   @def 
    #   @params:
    #       'id'       : id of the TCP packet
    #       'cmd'      : cmd
    #       'nb_parameters' : N parameters
    #       'params':       : [param1, param2, .... paramN]
    def buildTCP_Frame(self, command_no,nb_parameters,params):
        self.id += 1
        tcp_trame = []
        tcp_trame = pack("III%dI" % int(len(params)),self.id,command_no,nb_parameters,*params)
        return self.id, tcp_trame

    ##
    #   @def 
    #   @params:
    #       'id'            : id of the TCP packet
    #       'command_no'      : total number of bytes = id + nb_bytes + nb_parameters + param1 + param2 + ... + paramN
    #       'nb_parameters' : N parameters
    #       'params':       : [param1, param2, .... paramN]
    def decodeTCP_Frame(self,data):
        data_decoded = {'id': 0, 'cmd': 0, 'code':0,'size_answer': 0, 'answer':0}
        data_unpacked = unpack('%dI' % int(len(data)/4), data)

        if(len(data_unpacked) >= 5):
            data_decoded["id"]      = data_unpacked[0]
            data_decoded["code"]    = data_unpacked[1]
            data_decoded["cmd"]     = data_unpacked[2]
            data_decoded["size_answer"] = data_unpacked[3]
            data_decoded["answer"] = data_unpacked[4:4+len(data_unpacked)]  

        return data_decoded

    def sendTCP_Frame(self,frame):
        self.questions.append(frame)

    def exchangeTCP_Frame(self, frame):
        BUFFER_SIZE = 1024
        self.link.send(frame)
        data = self.link.recv(BUFFER_SIZE)
        answer = self.decodeTCP_Frame(data)
        return answer
    
    def comStep(self):
        while len(self.questions) > 0 :
            ts = time.time()
            ans = self.exchangeTCP_Frame(self.questions[0])
            tend = time.time()
            self.questions.pop(0)
            print("time: "+str(tend-ts) + "and:"+str(ans))      

if __name__ == '__main__':
    marioBot = Robot_Interface()
    print(f'Test sur {marioBot.getID()}')

    i = marioBot.setLED(1,1,1)
    print(f'Demande {i}')
    # i = marioBot.setLED(1,1,0)
    # i = marioBot.setLED(1,0,1)
    # i = marioBot.setLED(1,0,0)

    marioBot.startCom()

    c =''
    while True:
        c = input()

        if c != 'exit':
            print(f'Valeur de la consigne {c}')
            marioBot.setManualCtrl(c)
        else :
            marioBot.endCom()
            exit()            