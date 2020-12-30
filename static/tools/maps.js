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





