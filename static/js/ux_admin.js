/**
 * 
 * @brief Javascript user Interface functions
 * 
 * @author Guillaume B.
 */



setTimeout(function(){ GetAllLogs(); }, 3000);


function DisplayLogs(list_logs)
{
  for(var i = 0; i<list_logs.length;i++)
  {
    list_logs[i]["timestamp"] = new Date(list_logs[i]["timestamp"]);

    $("#logs").append("\
    <div class='ui feed'>\
      <div class='event'>\
        <div class='label'><i class='pencil icon'></i>\
      </div>\
      <div class='content'>\
        <div class='summary'>\
          <a class='user'>"+list_logs[i]["by"]+"</a> added you as a friend\
          <div class='date'>\
            "+list_logs[i]["timestamp"].toLocaleString("fr-FR")+"\
          </div>\
        </div>\
        <div class='meta'>\
          <a class='warning'><i class='warning orange icon'></i><span>Info</span></a>\
        </div>\
      </div>\
    </div>")
  }
}



