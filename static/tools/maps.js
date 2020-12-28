/**
 * 
 * @brief Manage the Canvas functions
 * 
 * @author Guillaume B.
 */


class CircularItem
{
    x = 0;
    y = 0;
    size = 0;
    color = 0;
    name = "";
    description = "";

    CircularItem(new_position_x, new_position_y, new_size, new_color, new_name, new_description)
    {
        this.x = new_position_x;
        this.y = new_position_y;
        this.size = new_size;
        this.color = new_color;
        this.name = new_name;
        this.description = new_description;
    }

    GetX()
    {
        return this.x;
    }

    SetX(new_x)
    {
        this.x = new_x;
    }

    GetY()
    {
        return this.y;
    }

    SetY(new_y)
    {
        this.y = new_y;
    }

    GetSize()
    {
        return this.size;
    }

    SetSize(new_size)
    {
        this.size = new_size;
    }

    GetColor()
    {
        return this.color;
    }

    SetColor(new_color)
    {
        this.color = new_color;
    }

}


class Map{

    // Attributes
    p_width  = 38.5;
    p_height = 39.3;

    g_offset_x = p_width;
    g_offset_y = p_height;

    bouee_green_color    = '#006f3d';
    bouee_red_color      = '#bb1e10';
    robot_position_color = '#e7fc03';
    

    map_background = "";
    id_layer1   = ""; 
    id_layer2   = "";
    id_layer3   = "";
    id_layer_4  = "";

    list_circular_items = [];

    // Constructor
    Map(map_background_new, id_layer1_new, id_layer2_new, id_layer3_new, id_layer_4_new)
    {
        this.map_background = map_background_new;
        this.id_layer1   = id_layer1_new; 
        this.id_layer2   = id_layer2_new;
        this.id_layer3   = id_layer3_new;
        this.id_layer_4  = id_layer4_new;

    }

    // Draw map background
    DrawMap()
    {
        // Get drawable canvas
        var canvas = document.getElementById(this.id_layer1);
        var ctx = canvas.getContext("2d");
    
        // Define size Map
        canvas.width = 1002+this.p_width;
        canvas.height = 668+this.p_height;

        // Get background image
        var background = new Image();
        background.src = this.map_background;

        //Draw background
        background.onload = function(){ctx.drawImage(background,p_width,p_height)};
    }

    // Draw framing from 0 to 17 and A to Z
    DrawBoard()
    {
        var canvas = document.getElementById(this.id_layer2);
        var context = canvas.getContext("2d");
        
        // Define size Map
        canvas.width = 1002+this.p_width;
        canvas.height = 668+this.p_height;

        // Draw vertical lines
        for (var x = 0; x <= 26; x += 1) {
            context.moveTo(x*p_width+p_width, p_width);
            context.lineTo(x*p_width+p_width, bh + p_width);
        }
    
        // Draw horizontal lines
        for (var x = 0; x <= 17; x += 1) {
            context.moveTo(p_height, x*p_height+p_height);
            context.lineTo(bw + p_height,x*p_height+p_height);
        }
        context.strokeStyle = "black";
    
        // Draw Letters
        for(var i=0;i < 26; i++)
        {
            context.fillText(String.fromCharCode('A'.charCodeAt(0) + i), p_width*1.5+p_width*i, 30); 
        }
    
        // Draw numbers
        for(var i=0;i < 17; i++)
        {
            context.fillText(1+i, 20, p_height*1.5+i*p_height); 
        }
    
        // Draw
        context.stroke();
    }

    DrawItems()
    {

        var canvas = document.getElementById(this.id_layer3);
        var ctx = canvas.getContext("2d");

        // Define size Map
        canvas.width = 1002+this.p_width;
        canvas.height = 668+this.p_height;

        for (var i=0;i<this.list_circular_items.length;i++)
        {
            // draw the colored region
            ctx.beginPath();
            ctx.arc(ConvertX(this.list_circular_items[i].GetX()), ConvertY(this.list_circular_items[i].GetY()), this.list_circular_items[i].GetSize(), 0, 2*Math.PI);
            ctx.fillStyle = this.list_circular_items[i].GetColor();
            ctx.fill();

            // draw the stroke
            ctx.lineWidth = 0;
            ctx.strokeStyle = '#FF0000';
            ctx.stroke();
        }    
    }

    AddItem(name_item, x,y,size,description,color)
    {
        this.list_circular_items.append(new CircularItem(x, y, size, color, name_item, description));
    }


}


    // Padding
    var p_width = 38.5;
    var p_height = 39.3;


    
/**
 * Function to draw the background of the map
 */
function DrawMap(background_image)
{
    var canvas = document.getElementById("canvas_layer1_index");
    var ctx = canvas.getContext("2d");
    
    canvas.width = 1002+p_width;
    canvas.height = 668+p_height;


    var background = new Image();
    background.src = background_image;

    background.onload = function(){ctx.drawImage(background,p_width,p_height)};
}


function drawBoard(){

    // Box width
var bw = 1002+p_width;
// Box height
var bh = 668+p_height;


var canvas = document.getElementById("canvas_layer3_index");
var context = canvas.getContext("2d");
canvas.width = bw;
    canvas.height = bh;
    for (var x = 0; x <= 26; x += 1) {
        context.moveTo(x*p_width+p_width, p_width);
        context.lineTo(x*p_width+p_width, bh + p_width);
        
    }

    for (var x = 0; x <= 17; x += 1) {
        context.moveTo(p_height, x*p_height+p_height);
        context.lineTo(bw + p_height,x*p_height+p_height);
    }
    context.strokeStyle = "black";


for(var i=0;i < 26; i++)
{
    context.fillText(String.fromCharCode('A'.charCodeAt(0) + i), p_width*1.5+p_width*i, 30); 
}

for(var i=0;i < 17; i++)
{
    context.fillText(1+i, 20, p_height*1.5+i*p_height); 
}

    context.stroke();
}

var g_offset_x = p_width;
var g_offset_y = p_height;

var bouee_green_color = '#006f3d';
var bouee_red_color = '#bb1e10';
var robot_position_color = '#e7fc03';

function DrawInitialItems()
{
    var canvas = document.getElementById("canvas_layer2_index");
    var ctx = canvas.getContext("2d");
    canvas.width = 1002+p_width;;
    canvas.height = 668+p_height;
    // draw the colored region
    ctx.beginPath();
    ctx.arc(ConvertX(670), ConvertY(100), 18/2.0, 0, 2*Math.PI);
    ctx.fillStyle = bouee_red_color;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(ConvertX(1005), ConvertY(400), 18/2.0, 0, 2*Math.PI);
    ctx.fillStyle = bouee_green_color;
    ctx.fill();
        

    ctx.beginPath();
    ctx.arc(ConvertX(1100), ConvertY(800), 18/2.0, 0, 2*Math.PI);
    ctx.fillStyle = bouee_red_color;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(ConvertX(1730), ConvertY(1200), 18/2.0, 0, 2*Math.PI);
    ctx.fillStyle = bouee_red_color;
    ctx.fill();


    // draw the stroke
    ctx.lineWidth = 0;
    ctx.strokeStyle = '#FF0000';
    ctx.stroke();
}

function DrawRobotPosition(x,y)
{
    var canvas = document.getElementById("canvas_layer4_index");
    var ctx = canvas.getContext("2d");
    
    canvas.width = 1002+p_width;;
    canvas.height = 668+p_height;

    var old_x = -1;
    var old_y = -1;

    var j = 0;

    var list_points = [{x,y}];

    //gets table
    var oTable = document.getElementById('body_chronology');

    //gets rows of table
    var rowLength = oTable.rows.length;
    console.log(rowLength);    

    var nb_points = 0;
    //loops through rows    
    for (i = (rowLength-1); i >= 0 ; i--)
    {
        //gets cells of current row
        var oCells = oTable.rows.item(i).cells;
 
        //gets amount of cells of current row
        var cellLength = oCells.length;
 
        var position = oCells.item(2).innerHTML;
        
        var str = position;
        var patt = /(\d+)/g;
        var result = str.match(patt);
        console.log(result[0]+" "+result[1]+" "+result[2]);

        // draw the colored region
        ctx.beginPath();

        ctx.arc(ConvertX(result[0]), ConvertY(result[1]), 10/2.0, 0, 2*Math.PI);
        ctx.fillStyle = robot_position_color;
        ctx.fill();

        if((old_x != -1) && (old_y != -1))
        {
            // if there is already a former point which can be connected to the new point
            ctx.lineTo(ConvertX(old_x), ConvertY(old_y));
            console.log("i:"+i + "old_x: "+old_x+" old_y: "+old_y);
        }

        old_x = result[0];
        old_y = result[1];

        list_points[j] = {x:result[0], y:result[1]};

        j++;

    }

    console.log("j: "+j);

    for(k=0;k<j;k++)
    {
        ctx.beginPath();

        if(k == 0)
        {
            ctx.moveTo(ConvertX(list_points[k].x), ConvertX(list_points[k].y));
        }
        else{

            ctx.moveTo(ConvertX(list_points[k-1].x), ConvertX(list_points[k-1].y));
            
        }

        ctx.lineTo(ConvertX(list_points[k].x), ConvertY(list_points[k].y ));
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();

    }

    // draw the stroke
    ctx.lineWidth = 0;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
    ctx.closePath();
   
}

function ConvertX(x)
{
    return (g_offset_x + x*1002/3000);
}

function ConvertY(y)
{
    return (g_offset_y + y*668/2000);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    var x = ((evt.clientX - rect.left) -g_offset_x)*3000/(1002+g_offset_x-34);
    var y = ((evt.clientY - rect.top) - g_offset_y)*2000/(668+g_offset_y-34); 
    return {x,y};
  }


function MapEventManager(){
    var canvas_main = document.getElementById("canvas_layer2_index");
    var context = canvas_main.getContext('2d');
    
    canvas_main.addEventListener('mousemove', function(evt) {
        
        var mousePos = getMousePos(canvas_main, evt);
        
        $( "#x_on_map_index" ).text(Math.round(mousePos.x))
        $( "#y_on_map_index" ).text(Math.round(mousePos.y))
        
      }, false);
}


