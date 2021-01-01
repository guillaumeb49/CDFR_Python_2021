/**
 * 
 * @brief Javascript user Interface functions related to map.html
 * 
 * @author Guillaume B.
 */


$("#load_robots_position_btn").on("click", function(){

   // load list of registered robots
   GetAllRobotRegistered();

  $('#Load_robot_position_modal').modal({
    onDeny  : function(){
      
      $(this).modal('hide');
      // Clear selection
      $("#table_chronology>tbody tr").remove(); 
      // clear canvas
      var canvas  = document.getElementById("canvas_layer6_index")
      var context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      return false;
    },
    onApprove:function(){

      uid  = null;
      $( ".robot_selection_checkbox" ).each(function( index ) {
        if($( this ).checkbox('is checked'))
        {
          console.log("$( this+input).data('label') : "+$( this).find("input").data('label'));
          return (uid = $( this).find("input").data('label'));
        }
      });

      console.log("uid :"+uid);
      if(uid != null)
      {
        GetRobotPosition(uid,$("#number_position_robot").val());
      }
      return true;
    }
  }).modal('show');
});

$("#download_history").on("click", function(){
  var table = $('#table_chronology').toCSV(this);
});




function FormatListRobotPosition(msg)
{
   // Clear selection
   $("#table_chronology>tbody tr").remove(); 

   robot_history = new RobotDrawingHistory(msg[0]["name"], 12, "canvas_layer6_index");

  for(var i = 0;i<msg.length;i++)
  {
    msg[i]["timestamp"] = new Date(msg[i]["timestamp"]);

    $("#table_chronology>tbody").append("<tr>\
    <td data-label='Timestamp'>"+msg[i]["timestamp"]+"</td>\
    <td data-label='Robot'>"+msg[i]["uid"]+"</td>\
    <td data-label='Position'>x:"+msg[i]["x"]+" y:"+msg[i]["y"]+" theta:"+msg[i]["theta"]+"</td>\
    <td data-label='Distance'>"+msg[i]["distance1"]+","+msg[i]["distance2"]+","+msg[i]["distance3"]+","+msg[i]["distance4"]+","+msg[i]["distance5"]+","+msg[i]["distance6"]+"</td>\
    </tr>");
    robot_history.AddPositionHistory(msg[i]["x"],msg[i]["y"]);
  }
  robot_history.Draw();
}

function FormatListRegisteredRobots(msg)
{
  console.log("FormatListRegisteredRobots + "+msg.length)
  // Clear selection
  $("#map_table_registered>tbody tr").remove(); 

  
  for(var i = 0;i<msg.length;i++)
  {
    $("#map_table_registered>tbody").append("<tr>\
    <td class='collapsing'>\
          <div class='robot_selection_checkbox ui fitted slider checkbox'>\
            <input type='checkbox' data-label='"+msg[i]["uid"]+"'> <label></label>\
          </div>\
        </td>\
    <td data-label='Name'>"+msg[i]["name"]+"</td>\
    <td data-label='UID'>"+msg[i]["uid"]+"</td>\
    </tr>");
  }

  
}


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  var x = ((evt.clientX - rect.left) -g_offset_x)*3000/(1002+g_offset_x-34);
  var y = ((evt.clientY - rect.top) - g_offset_y)*2000/(668+g_offset_y-34); 
  return {x,y};
}


function MapEventManager(){
  var canvas_main = document.getElementById("canvas_layer1_index");
  var context = canvas_main.getContext('2d');
  
  canvas_main.addEventListener('mousemove', function(evt) {
      
      var mousePos = getMousePos(canvas_main, evt);
      
      $( "#x_on_map_index" ).text(Math.round(mousePos.x))
      $( "#y_on_map_index" ).text(Math.round(mousePos.y))
      
    }, false);
}

var map = new Map("../static/img/TableCDFR2020.png", "canvas_layer1_index", "canvas_layer2_index", "canvas_layer3_index", "canvas_layer4_index");
map.DrawMap();
map.DrawBoard();
map.AddItem("Item1", 670,100,10,"Test 1",'#006f3d');
map.AddItem("Item2", 1005,400,10,"Test 2",'#bb1e10');
map.AddItem("Item2", 1100,800,10,"Test 2",'#bb1e10');
map.AddItem("Item2", 1730,1200,10,"Test 2",'#bb1e10');
map.DrawItems();


MapEventManager();

var robotdrawing = new RobotDrawing("Guillaume", 200, 250, 0, 0,"canvas_layer5_index");

robotdrawing.MoveTo(ConvertX(1500),ConvertY(1000),45);
robotdrawing.Animate();







