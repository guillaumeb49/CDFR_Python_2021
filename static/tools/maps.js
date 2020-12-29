/**
 * 
 * @brief Manage the Canvas functions
 * 
 * @author Guillaume B.
 */


class RobotItem{

    x = 0;
    y = 0;
    size = 12;
    color = "#e7fc03";
    name = "";

    constructor(x_new, y_new, name_new)
    {
        this.x = x_new;
        this.y = y_new;
        this.name = name_new;
    }

    GetX(){
        return this.x;
    }

    GetY(){
        return this.y;
    }

    GetSize(){
        return this.size;
    }
    
    GetName(){
        return this.name;
    }

    GetColor(){
        return this.color;
    }


}

class CircularItem
{
    x = 0;
    y = 0;
    size = 0;
    color = 0;
    name = "";
    description = "";

    constructor(new_position_x, new_position_y, new_size, new_color, new_name, new_description)
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


    toString() {
        const ret = 'CircularItem ' + this.name + ' x: ' + this.x + ' y: ' + this.y + ' size: ' + this.color + ' size: '+this.size;
        return ret;
      }
      
}


class Sensor{

    x = 0;
    y = 0;
    theta = 0;

    size = 0;
    size_flash = 0;
    direction = 0;
    name = "";

    dx = 1;
    dy = 1;

    distances = {'sensor1':0,'sensor2':0,'sensor3':0,'sensor4':0,'sensor5':0,'sensor6':0,};

    id_layer1   = ""; 

    constructor(new_name, new_x, new_y, new_theta, new_size, new_distances, id_layer1_new)
    {
        this.name = new_name;
        this.x = new_x;
        this.y = new_y;
        this.theta = new_theta;
        this.size = new_size;

        this.id_layer1   = id_layer1_new; 

        if(new_distances['sensor1'] != null)
        {
            this.distances['sensor1'] = new_distances['sensor1'];
        }

        if(new_distances['sensor2'] != null)
        {
            this.distances['sensor2'] = new_distances['sensor2'];
        }

        if(new_distances['sensor3'] != null)
        {
            this.distances['sensor3'] = new_distances['sensor3'];
        }

        if(new_distances['sensor4'] != null)
        {
            this.distances['sensor4'] = new_distances['sensor4'];
        }


        if(new_distances['sensor5'] != null)
        {
            this.distances['sensor5'] = new_distances['sensor5'];
        }

        if(new_distances['sensor6'] != null)
        {
            this.distances['sensor6'] = new_distances['sensor6'];
        }
    }

    Draw()
    {
        var canvas = document.getElementById(this.id_layer1);
        if (canvas.getContext) 
        {
            var ctx = canvas.getContext('2d');
            canvas.width = 1002+38.5;
            canvas.height = 668+39.3;
        

            // Draw upper limit sensor
            ctx.fillStyle = 'rgba(0,0,0,0.25)';
                        
            ctx.beginPath();
            ctx.moveTo(25, 25);
            ctx.lineTo(this.size, 25);
            ctx.lineTo(25, this.size);
            ctx.fill();

            // Draw wave inside sensor
            var gradient = ctx.createLinearGradient(0, 0, 0, this.size_flash);
            gradient.addColorStop("0", 'rgba(0,0,0,0.25)');
            gradient.addColorStop("0.5" ,'rgba(255,255,255,0.25)');
            gradient.addColorStop("1.0", 'rgba(0,0,0,0.25)');
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 3;            
            
            ctx.beginPath();
            ctx.moveTo(this.size_flash, 25);
            ctx.lineTo(25, this.size_flash);
            ctx.stroke();

            
            
        }
    }

    Update()
    {

        var width = 100;
        
        // Get Distance Sensor
        var distance_sensor1 = this.distances['sensor1'];
        // Calculate step to Distance Sensor
       console.log(distance_sensor1);
        
        if((this.size) >= distance_sensor1) 
        {
            this.size = this.size; // keep same size
            this.size_flash += this.direction*this.dx;
        }

        if((this.size) < distance_sensor1) 
        {
            this.size += this.dx; // keep same size
            this.size_flash += this.direction*this.dx;
        }

        if(this.size_flash >=this.size)
        {
            this.size_flash -=this.dx;
            this.direction = -3;
        }
        if(this.size_flash <=35)
        {
            this.size_flash +=this.dx;
            this.direction = 3;
        }

    }

    Animate()
    {
        
        this.Draw();
        this.Update();
        requestAnimationFrame(this.Animate.bind(this));
    }


}


class RobotDrawing
{
    x = 0;
    y = 0;
    theta = 0;

    size = 0;
    size_flash = 0;
    direction = 0;
    name = "";

    dx = 1;
    dy = 1;

    distances = {'sensor1':0,'sensor2':0,'sensor3':0,'sensor4':0,'sensor5':0,'sensor6':0,};

    id_layer1   = ""; 

    constructor(new_name, new_x, new_y, new_theta, new_size, new_distances, id_layer1_new)
    {
        this.name = new_name;
        this.x = new_x;
        this.y = new_y;
        this.theta = new_theta;
        this.size = new_size;

        this.id_layer1   = id_layer1_new; 

        if(new_distances['sensor1'] != null)
        {
            this.distances['sensor1'] = new_distances['sensor1'];
        }

        if(new_distances['sensor2'] != null)
        {
            this.distances['sensor2'] = new_distances['sensor2'];
        }

        if(new_distances['sensor3'] != null)
        {
            this.distances['sensor3'] = new_distances['sensor3'];
        }

        if(new_distances['sensor4'] != null)
        {
            this.distances['sensor4'] = new_distances['sensor4'];
        }


        if(new_distances['sensor5'] != null)
        {
            this.distances['sensor5'] = new_distances['sensor5'];
        }

        if(new_distances['sensor6'] != null)
        {
            this.distances['sensor6'] = new_distances['sensor6'];
        }
    }


    Draw()
    {
        var canvas = document.getElementById(this.id_layer1);
        if (canvas.getContext) 
        {
            var ctx = canvas.getContext('2d');
            canvas.width = 1002+38.5;
            canvas.height = 668+39.3;
        

            // Draw upper limit sensor
            ctx.fillStyle = 'rgba(245, 171, 61, 0.87)';
                        
            ctx.beginPath();
            ctx.translate((this.x)+50/2, (this.y)+88/2);
            ctx.rotate(this.theta*Math.PI / 180);
            ctx.translate(-((this.x)+50/2), -((this.y)+88/2));

            ctx.moveTo((this.x+0), this.y+0);
            ctx.lineTo(this.x+50, this.y+0);
            
            ctx.lineTo(this.x+50, this.y+10);
            ctx.arc(this.x+50,this.y+22,12,1.5*Math.PI,0.5*Math.PI,true);
            ctx.lineTo(this.x+50, this.y+54);
            ctx.arc(this.x+50,this.y+66,12,1.5*Math.PI,0.5*Math.PI,true);
            ctx.lineTo(this.x+50, this.y+88);
            ctx.lineTo(this.x+0, this.y+88);
            ctx.lineTo(this.x+0, this.y+78);
            ctx.arc(this.x+0,this.y+66,12,0.5*Math.PI,1.5*Math.PI,true);
            ctx.lineTo(this.x+0, this.y+40);
            ctx.arc(this.x+0,this.y+22,12,0.5*Math.PI,1.5*Math.PI,true);
            ctx.lineTo(this.x+0, this.y+0);

            
            ctx.fill();
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            
           

            
          
            
        }
    }

    Update()
    {

        var width = 100;
        
        // Get Distance Sensor
        var distance_sensor1 = this.distances['sensor1'];
        // Calculate step to Distance Sensor
       console.log(distance_sensor1);
        
        if((this.size) >= distance_sensor1) 
        {
            this.size = this.size; // keep same size
            this.size_flash += this.direction*this.dx;
        }

        if((this.size) < distance_sensor1) 
        {
            this.size += this.dx; // keep same size
            this.size_flash += this.direction*this.dx;
        }

        if(this.size_flash >=this.size)
        {
            this.size_flash -=this.dx;
            this.direction = -3;
        }
        if(this.size_flash <=35)
        {
            this.size_flash +=this.dx;
            this.direction = 3;
        }

    }

    Animate()
    {
        
        this.Draw();
        this.Update();
        //requestAnimationFrame(this.Animate.bind(this));
    }



}


class Map{

    // Attributes
    p_width  = 38.5;
    p_height = 39.3;

    bouee_green_color    = '#006f3d';
    bouee_red_color      = '#bb1e10';
    robot_position_color = '#e7fc03';
    

    map_background = "";
    id_layer1   = ""; 
    id_layer2   = "";
    id_layer3   = "";
    id_layer_4  = "";

    list_circular_items = [];
    list_robot_positions = [];

    // Constructor
    constructor(map_background_new, id_layer1_new, id_layer2_new, id_layer3_new, id_layer4_new)
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

        // Define 
        var offset_x = 38.5;
        var offset_y = 39.3;

        // Get background image
        var background = new Image();
        background.src = this.map_background;

        //Draw background
        background.onload = function(){ctx.drawImage(background,offset_x,offset_y)};
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
            context.moveTo(x*this.p_width+this.p_width, this.p_width);
            context.lineTo(x*this.p_width+this.p_width, canvas.height + this.p_width);
        }
    
        // Draw horizontal lines
        for (var x = 0; x <= 17; x += 1) {
            context.moveTo(this.p_height, x*this.p_height+this.p_height);
            context.lineTo(canvas.width  + this.p_height,x*this.p_height+this.p_height);
        }
        context.strokeStyle = "black";
    
        // Draw Letters
        for(var i=0;i < 26; i++)
        {
            context.fillText(String.fromCharCode('A'.charCodeAt(0) + i), this.p_width*1.5+this.p_width*i, 30); 
        }
    
        // Draw numbers
        for(var i=0;i < 17; i++)
        {
            context.fillText(1+i, 20, this.p_height*1.5+i*this.p_height); 
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
            ctx.arc(this.ConvertX(this.list_circular_items[i].GetX()), this.ConvertY(this.list_circular_items[i].GetY()), this.list_circular_items[i].GetSize(), 0, 2*Math.PI);
            ctx.fillStyle = this.list_circular_items[i].GetColor();
            ctx.fill();

            // draw the stroke
            ctx.lineWidth = 0;
            ctx.strokeStyle = '#000000';
            ctx.stroke();

        }    

    }

    AddItem(name_item, x,y,size,description,color)
    {
        this.list_circular_items.push(new CircularItem(x, y, size, color, name_item, description));
    }

    ConvertX(x)
    {
        return (this.p_width + x*1002/3000);
    }

    ConvertY(y)
    {
        return (this.p_height + y*668/2000);
    }

    AddRobotItem(name_robot, x,y)
    {
        this.list_robot_positions.push(new RobotItem(x, y, name_robot));
    }

    DrawRobotPositions()
    {
        var canvas = document.getElementById(this.id_layer_4);
        var ctx = canvas.getContext("2d");
        
        canvas.width = 1002+this.p_width;;
        canvas.height = 668+this.p_height;

        var old_x = -1;
        var old_y = -1;

        var j = 0;


        var nb_points = 0;

        //loops through rows    
        for (var i=0;i<this.list_robot_positions.length;i++)
        {
            
            ctx.beginPath();

            ctx.arc(this.ConvertX(this.list_robot_positions[i].GetX()), this.ConvertY(this.list_robot_positions[i].GetY()), this.list_robot_positions[i].GetSize(), 0, 2*Math.PI);
            ctx.fillStyle = this.list_robot_positions[i].GetColor();
            ctx.globalAlpha = (i*0.75/this.list_robot_positions.length) + 0.25;
            ctx.fill();

            if((old_x != -1) && (old_y != -1))
            {
                // if there is already a former point which can be connected to the new point
                ctx.lineTo(this.ConvertX(old_x), this.ConvertY(old_y));
            }

            old_x = this.list_robot_positions[i].GetX();
            old_y = this.list_robot_positions[i].GetY();

        }

        for(var i=0;i<this.list_robot_positions.length;i++)
        {
            ctx.beginPath();

            if(i == 0)
            {
                ctx.moveTo(this.ConvertX(this.list_robot_positions[i].GetX()), this.ConvertY(this.list_robot_positions[i].GetY()));
            }
            else{

                ctx.moveTo(this.ConvertX(this.list_robot_positions[i-1].GetX()), this.ConvertY(this.list_robot_positions[i-1].GetY()));                
            }

            ctx.lineTo(this.ConvertX(this.list_robot_positions[i].GetX()), this.ConvertY(this.list_robot_positions[i].GetY()));
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


