/**
 * 
 * @brief Javascript user Interface functions related to map.html
 * 
 * @author Guillaume B.
 */


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


map.AddRobotItem("Guillaume", 500,500);
map.AddRobotItem("Guillaume", 600,600);
map.AddRobotItem("Guillaume", 700,700);
map.AddRobotItem("Guillaume", 750,700);
map.AddRobotItem("Guillaume", 800,700);
map.AddRobotItem("Guillaume", 850,700);
map.AddRobotItem("Guillaume", 900,700);
map.AddRobotItem("Guillaume", 950,700);
map.AddRobotItem("Guillaume", 1000,700);
map.AddRobotItem("Guillaume", 1050,700);
map.AddRobotItem("Guillaume", 1200,700);
map.AddRobotItem("Guillaume", 1250,750);
map.AddRobotItem("Guillaume", 1400,800);
map.AddRobotItem("Guillaume", 1600,900);
map.AddRobotItem("Guillaume", 1700,1000);
map.AddRobotItem("Guillaume", 1700,1400);
map.AddRobotItem("Guillaume", 1750,1600);
map.AddRobotItem("Guillaume", 1600,1200);
map.AddRobotItem("Guillaume", 500,800);
map.AddRobotItem("Guillaume", 500,900);
map.AddRobotItem("Guillaume", 500,1000);
map.AddRobotItem("Guillaume", 500,1100);
map.AddRobotItem("Guillaume", 500,1200);
map.AddRobotItem("Guillaume", 500,1400);
map.AddRobotItem("Guillaume", 500,1600);
map.AddRobotItem("Guillaume", 500,1800);
map.AddRobotItem("Guillaume", 700,1000);
map.AddRobotItem("Guillaume", 800,1100);
map.AddRobotItem("Guillaume", 1000,1100);
map.AddRobotItem("Guillaume", 1100,1100);
map.AddRobotItem("Guillaume", 1500,1100);
map.AddRobotItem("Guillaume", 2000,1100);


MapEventManager();

var robotdrawing = new RobotDrawing("Guillaume", 200, 250, 0, 0,"canvas_layer5_index");

robotdrawing.Animate();

robotdrawing.MoveTo(500,355,180);





