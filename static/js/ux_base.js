/**
 * 
 * @brief Javascript user Interface functions
 * 
 * @author Guillaume B.
 */

// Display the debug modal window
$("#menu_debug").on("click", function(){
  $('#modal_debug_menu').modal('show');
});

// if click on menu status check connection with Server
$("#menu_connection_status").on("click", function(){
  checkSocketUI();
});


// Check the WebSocket Connection Status and update the UI accordingly
// try to connect if the connection is closed

async function checkSocketUI(){
  var socket_status = checkSocket();
  console.log("Hello World");
  if(socket_status == "OPEN")
  {
    $("#connection_status_bubble").removeClass("red");
    $("#connection_status_bubble").addClass("green");
  }
  else if(socket_status == "CONNECTING")
  {

    $("#connection_status_bubble").removeClass("red");
    $("#connection_status_bubble").removeClass("green");
    $("#connection_status_bubble").addClass("orange");

    // Wait for 1000ms before rechecking
    await sleep(1000);
    if(socket_status == "OPEN")
    {
      // we are good to go!
      $("#connection_status_bubble").removeClass("red");
    $("#connection_status_bubble").addClass("green");
    }
    else
    {
      // very likely the server will never respond..
      $("#connection_status_bubble").removeClass("green");
      $("#connection_status_bubble").addClass("red");
    }

    $("#connection_status_bubble").removeClass("orange");

  }
  else if(socket_status == "CLOSED")
  {
    // try to open the connection
      // initialize the websockets
      //initWebSocket();

      $("#connection_status_bubble").removeClass("red");
      $("#connection_status_bubble").removeClass("green");
      $("#connection_status_bubble").addClass("orange");
      // Wait for 1000ms before rechecking
      await sleep(1000);
      $("#connection_status_bubble").removeClass("orange");
      
      if(socket_status == "OPEN")
      {
        // if the WebSocket is up
        $("#connection_status_bubble").removeClass("red");
        $("#connection_status_bubble").addClass("green");
      }
      else
      {
        // The server is down
        $("#connection_status_bubble").removeClass("green");
        $("#connection_status_bubble").addClass("red");
      }
  }
  else
  {
    $("#connection_status_bubble").removeClass("green");
    $("#connection_status_bubble").addClass("red");
  }

}