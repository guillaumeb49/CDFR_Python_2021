/**
 * @brief Manage the WebSocket interface which exchanges data between local WebServer and Qt
 * 
 * 
 * @author Guillaume B.
 */



var socketio = null;


function debug(message) {
    var dt = new Date();
    var time = dt.getDate() +"/"+(dt.getMonth()+1)+"/"+dt.getFullYear()+" - " +dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

    $( "#debugTextArea" ).append("<p><i>"+time+"</i> → "+message+"</p>");
    
}

function sendMessage(cmd, param1,param2,param3) {
    
    var msg = {
        type: "cmd",
        cmd: cmd,
        param1: param1,
        param2: param2,
        param3: param3,
        id:   id_cmd,
        date: Date.now()
      };
    
    if ( socketio != null )
    {
        socketio.send( JSON.stringify(msg));
        id_cmd++;
    }
}

var old_x = 0;
 var old_y = 0;

function initWebSocket() {
    $( document ).ready(function() {
        socketio = io();
        socketio.on('connect', function() {
            socketio.emit('my event', {data: 'I\'m connected!'});
        });

        socketio.on('new_status_data', (data) => {
            

            if($( "#table_chronology" ).length)
            {
                $("#table_chronology>tbody").prepend("<tr>\
                <td data-label='TimeStamp'>"+data["timestamp"]+"</td>\
                <td data-label='Robot'>"+data["robotid"]+"</td>\
                <td data-label='Position'>x:"+data["x"]+" y:"+data["y"]+" theta:"+data["theta"]+"</td>\
                <td data-label='Distance'>"+data["distance 1"]+data["distance 2"]+data["distance 3"]+data["distance 4"]+data["distance 5"]+data["distance 6"]+"</td>\
              </tr>");
            }
            
            DrawRobotPosition(data["x"],data["y"],old_x,old_y)
            old_x = data["x"];
            old_y = data["y"];
            console.log(data);
          });

      });
    
}

function stopWebSocket() {
    if (socketio)
    socketio.close();
}

function checkSocket() {
    console.log("socketio "+socketio);
    if (socketio != null) {
        var stateStr;
        switch (socketio.connected) {
            case true: {
                stateStr = "OPEN";
                break;
            }
            case false: {
                stateStr = "CLOSED";
                break;
            }
            
            default: {
                stateStr = "UNKNOW";
                break;
            }
        }
        debug("WebSocket socketio.connected = " + socketio.connected + " ( " + stateStr + " )");
    } else {
        debug("WebSocket is null");
        stateStr = "NULL"
        initWebSocket();
        console.log("WebSocket is null we re-init it")
    }
    return stateStr;
}

