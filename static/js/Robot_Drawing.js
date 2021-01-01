/*
 * 
 * @brief Javascript Robot Drawing Class
 * 
 * A robot is composed of one movable body + 6 sensors to measure distances to other robots
 * 
 * 
 * @author Guillaume B.
 */


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

  distance = 0;

  id_layer1   = ""; 

  constructor(new_name, new_x, new_y, new_theta, new_distance, id_layer1_new)
  {
      this.name = new_name;
      this.x = new_x;
      this.y = new_y;
      this.theta = new_theta;

      this.id_layer1   = id_layer1_new; 

      this.distance = new_distance
      this.size = this.distance;
  }

  Draw()
  {
      var canvas = document.getElementById(this.id_layer1);
      if (canvas.getContext) 
      {
          var ctx = canvas.getContext('2d');
          canvas.width = 1002+38.5;
          canvas.height = 668+39.3;

          ctx.translate((this.x)+4, (this.y)+2.5);
          ctx.rotate(this.theta*Math.PI / 180);
          ctx.translate(-((this.x)+4), -((this.y)+2.5));

          // Draw direction sensors
          ctx.fillStyle = 'red';
          ctx.beginPath();
          ctx.moveTo(this.x+8, this.y);
          ctx.lineTo(this.x-8, this.y-5);
          ctx.lineTo(this.x-8, this.y+5);
          ctx.fill();

          // Draw upper limit sensor
          ctx.fillStyle = 'rgba(0,0,0,0.1)';
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.arc(this.x,this.y,150,0*Math.PI,2*Math.PI,true);
          ctx.fill();

          // Draw sensor1
          ctx.fillStyle = 'rgba(255,255,255,0.25)';
          ctx.beginPath();
          ctx.moveTo(this.x+75, this.y);
          ctx.arc(this.x+150,this.y,75,0*Math.PI,2*Math.PI,true);
          ctx.fill();

          // Draw wave inside sensor
          var gradient = ctx.createLinearGradient(0, 0, 0, this.size_flash);
          gradient.addColorStop("0", 'rgba(0,0,0,0.25)');
          gradient.addColorStop("0.5" ,'rgba(255,255,255,0.25)');
          gradient.addColorStop("1.0", 'rgba(0,0,0,0.25)');
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 3;            
          
          ctx.beginPath();
          ctx.arc(this.x,this.y,this.size_flash,0*Math.PI,2*Math.PI,true);
          ctx.stroke();

          
          
      }
  }

  Update(new_x,new_y, new_theta)
  {
      
      if(this.size_flash >=150)
      {
        this.size_flash -=this.dx;
          this.direction = -1;
      }
      else if(this.size_flash <=30)
      {
          this.size_flash +=this.dx;
          this.direction = 1;
      }
      else
      {
        this.size_flash += this.direction*this.dx;
      }

      this.x = new_x+25;
      this.y = new_y+88/2;
      this.theta = new_theta;


      /*if((this.size) >= 50) 
      {
          this.size = this.size; // keep same size
          this.size_flash += this.direction*this.dx;
      }

      if((this.size) < 50) 
      {
          this.size += this.dx; // keep same size
          this.size_flash += this.direction*this.dx;
      }

      if(this.size_flash >=this.size)
      {
          this.size_flash -=this.dx;
          this.direction = -2;
      }
      if(this.size_flash <=30)
      {
          this.size_flash +=this.dx;
          this.direction = 2;
      }*/

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

  next_x = 0;
  next_y = 0;
  next_theta = 0;

  size = 0;
  size_flash = 0;
  direction = 0;
  name = "";

  dx = 1;
  dy = 1;
  dtheta = 1;

  list_sensor = []

  id_layer1   = ""; 

  constructor(new_name, new_x, new_y, new_theta, new_size, id_layer1_new)
  {
      this.name = new_name;
      this.x = new_x;
      this.y = new_y;
      this.theta = new_theta;
      this.size = new_size;

      this.next_x = this.x;
      this.next_y = this.y;
      this.next_theta = this.theta;

      this.id_layer1   = id_layer1_new; 

    this.list_sensor.push(new Sensor("sensor1",this.x,this.y,this.theta,200,"canvas_layer4_index"));
    this.list_sensor.push(new Sensor("sensor2",this.x+50,this.y+20,this.theta,200,this.id_layer1));
    this.list_sensor.push(new Sensor("sensor3",this.x+50,this.y+40,this.theta,200,this.id_layer1));
    this.list_sensor.push(new Sensor("sensor4",this.x,this.y,this.theta-180,200,this.id_layer1));
    this.list_sensor.push(new Sensor("sensor5",this.x,this.y+20,this.theta-180,200,this.id_layer1));
    this.list_sensor.push(new Sensor("sensor6",this.x,this.y+20,this.theta-180,200,this.id_layer1));

  }


  Draw()
  {
      var canvas = document.getElementById(this.id_layer1);
      if (canvas.getContext) 
      {
          var ctx = canvas.getContext('2d');
          canvas.width = 1002+38.5;
          canvas.height = 668+39.3;
      

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
      
      var mov_x = this.x;
      var mov_y = this.y;

      if(Math.abs(this.x-this.next_x) >= 10) 
      {
          if(this.x > this.next_x)
          {
              this.x -= this.dx; 
          }
          else
          {
              this.x += this.dx;
          }

      }

      if(Math.abs(this.y-this.next_y) >= 10) 
      {
          if(this.y > this.next_y)
          {
              this.y -= this.dy; 
          }
          else
          {
              this.y += this.dy;
          }

      }

      mov_x = mov_x - this.x;
      mov_y = mov_y - this.y;
      

      if((mov_x != 0) || (mov_y != 0))
      {
          
          if(mov_x == 0)
          {
              this.theta = Math.atan(0)*180/Math.PI;
          }
          else
          {
              this.theta = Math.atan(mov_y/mov_x)*180/Math.PI;
          }
          
      }
      else if(Math.abs(this.theta-this.next_theta) >= 1.5) 
      {
          if(this.theta > this.next_theta)
          {
              this.theta-= this.dy; 
          }
          else
          {
              this.theta += this.dy;
          }

      }
           
      

  }

  Animate()
  {
      
      this.Draw();
      this.Update();
      
      this.list_sensor[0].Draw();
     // this.list_sensor[1].Draw();
      //this.list_sensor[2].Draw();
      //this.list_sensor[3].Draw();
      //this.list_sensor[4].Draw();
     // this.list_sensor[5].Draw();


      this.list_sensor[0].Update(this.x,this.y, this.theta);
      //this.list_sensor[1].Update();
      //this.list_sensor[2].Update();
      //this.list_sensor[3].Update();
      //this.list_sensor[4].Update();
     // this.list_sensor[5].Update();

      requestAnimationFrame(this.Animate.bind(this));

     
      
  }

  MoveTo(new_x,new_y,new_theta)
  {
      this.next_x = new_x;
      this.next_y = new_y;
      this.next_theta = new_theta;
  }


}




class RobotDrawingHistory
{
  x = 0;
  y = 0;
  theta = 0;

  next_x = 0;
  next_y = 0;
  next_theta = 0;

  size = 0;
  size_flash = 0;
  direction = 0;
  name = "";

  dx = 1;
  dy = 1;
  dtheta = 1;

  list_position_history = [];

  id_layer1   = ""; 
  p_width  = 38.5;
    p_height = 39.3;

  constructor(new_name, new_size, id_layer1_new)
  {
      this.name = new_name;
      this.size = new_size;

      this.next_x = this.x;
      this.next_y = this.y;
      this.next_theta = this.theta;

      this.id_layer1   = id_layer1_new; 

  }

  ConvertX(x)
    {
        return (this.p_width + x*1002/3000);
    }

    ConvertY(y)
    {
        return (this.p_height + y*668/2000);
    }

  Draw()
  {
      var canvas = document.getElementById(this.id_layer1);
      if (canvas.getContext) 
      {
          var ctx = canvas.getContext('2d');
          canvas.width = 1002+38.5;
          canvas.height = 668+39.3;
      
          var old_x = -1;
          var old_y = -1;
          var j = 0;
          var nb_points = 0;

          for (var i=(this.list_position_history.length-1);i>=0;i--)
          {
  
              ctx.beginPath();
              ctx.lineWidth = 0;
              ctx.arc(this.ConvertX(this.list_position_history[i].GetX()), this.ConvertY(this.list_position_history[i].GetY()), this.list_position_history[i].GetSize(), 0, 2*Math.PI);
              ctx.fillStyle = this.list_position_history[i].GetColor();
              ctx.globalAlpha = ((this.list_position_history.length-i)*0.75/this.list_position_history.length) + 0.25;
              ctx.fill();

              if((old_x == -1) && (old_y == -1))
              {
                  // If first element draw a start symbole
                  ctx.beginPath();
                  ctx.globalAlpha = 1;
                  ctx.strokeStyle = 'rgba(235, 128, 52, 0.6)';
                  ctx.lineWidth = 5;
                  // if there is already a former point which can be connected to the new point
                  ctx.moveTo(this.ConvertX(this.list_position_history[i].GetX()), this.ConvertY(this.list_position_history[i].GetY()))
                  ctx.lineTo(this.ConvertX(old_x), this.ConvertY(old_y));
                  ctx.stroke();
              }  
            else
            {
                ctx.beginPath();
                ctx.globalAlpha = 1;
                ctx.strokeStyle = 'rgba(235, 128, 52, 0.6)';
                ctx.lineWidth = 5;
                // if there is already a former point which can be connected to the new point
                ctx.moveTo(this.ConvertX(this.list_position_history[i].GetX()), this.ConvertY(this.list_position_history[i].GetY()))
                ctx.lineTo(this.ConvertX(old_x), this.ConvertY(old_y));
                ctx.stroke();
            }

            old_x = this.list_position_history[i].GetX();
            old_y = this.list_position_history[i].GetY();
     
        }
        ctx.stroke();
    }
  }

  AddPositionHistory(x,y)
  {
    this.list_position_history.push(new RobotItem(x,y,this.name));
  }

  EmptyPositionHistory()
  {
    this.list_position_history = [];
  }
}