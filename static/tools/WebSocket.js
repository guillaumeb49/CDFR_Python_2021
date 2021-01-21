/**
 * @brief Manage the WebSocket interface which exchanges data between local WebServer
 * 
 * 
 * @author Guillaume B.
 */



var socketio = null;

/**
 * @brief Generate a debug message with timestamp
 * @param {*} message 
 */
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
                <td data-label='Robot'>"+data["UID"]+"</td>\
                <td data-label='Position'>x:"+data["x"]+" y:"+data["y"]+" theta:"+data["theta"]+"</td>\
                <td data-label='Distance'>"+data["distance1"]+data["distance2"]+data["distance3"]+data["distance4"]+data["distance5"]+data["distance6"]+"</td>\
              </tr>");
            }
            
            //DrawRobotPosition(data["x"],data["y"],old_x,old_y)
            //old_x = data["x"];
            //old_y = data["y"];
            console.log(data);
            robotdrawing.MoveTo(data["x"],data["y"],data["theta"]);
        });


        socketio.on('AllRobotRegistered', (data) => {
            var msg = JSON.parse(data)
            
            FormatListRegisteredRobots(msg);

            console.log("AllRobotRegistered "+msg[0]["uid"]);
            $("#table_registered>tbody tr").remove(); 
            for(var i = 0;i<msg.length;i++)
            {
                msg[i]["timestamp_registration"] = new Date(msg[i]["timestamp_registration"]);
                msg[i]["timestamp_lastconnexion"] = new Date(msg[i]["timestamp_lastconnexion"]);

                $("#table_registered>tbody").append("<tr>\
                <td data-label='UID'>"+msg[i]["uid"]+"</td>\
                <td data-label='Name'>"+msg[i]["name"]+"</td>\
                <td data-label='Registration'>"+msg[i]["timestamp_registration"].toLocaleString("fr-FR")+"</td>\
                <td data-label='Last Connexion'>"+msg[i]["timestamp_lastconnexion"].toLocaleString("fr-FR")+"</td>\
                <td data-label='IP'>"+msg[i]["last_ip"]+"</td>\
            </tr>");
            }
           
        });

        socketio.on('AllLogs', (data) => {
            
            var msg = JSON.parse(data)
            DisplayLogs(msg);

        });

        socketio.on('GetRobotPosition', (data) => {
            
            var msg = JSON.parse(data)
            console.log("GetRobotPosition + "+msg);
            FormatListRobotPosition(msg);

        });

        socketio.on('authentification', (data) => {
              console.log("I am inside authentification !!!!");
            if(data["robotname"])
            {
                console.log("je devrais lancer un uiALert ");
                $.suiAlert({
                    title: 'Robot Connected',
                    description: data["robotname"]+' is now connected',
                    type: 'info',
                    time: '3',
                    position: 'top-right',
                });

               
    $("#guillaume_robot_connexion_status").removeClass("check green red close").removeClass("outline");
    $("#guillaume_robot_connexion_status").addClass("check green ").removeClass("outline");
            }
              });
      });
}


function GetRobotPosition(uid,number)
{
    console.log("GetRobotPosition( "+uid+", "+number+")");
    socketio.emit('GetRobotPosition', {'uid': uid, 'number':number});
}

function AddRobotRegistered(name, uid)
{
    console.log("AddRobotRegistered( "+name+", "+uid+")");
    socketio.emit('AddRobotRegistered', {'name': name, 'uid':uid});
}

function GetAllRobotRegistered()
{
    console.log("GetAllRobotRegistered");
    socketio.emit('GetAllRobotRegistered', {});
}


function GetAllLogs(type_connection, type_info, type_warning, type_critical, start_date, end_date)
{
    console.log("GetAllLogs");
    socketio.emit('GetAllLogs', {filter_connection:type_connection ,filter_info: type_info, filter_warning: type_warning, filter_critical: type_critical,start_date, end_date});
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


