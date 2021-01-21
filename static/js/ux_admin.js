/**
 * 
 * @brief Javascript user Interface functions
 * 
 * @author Guillaume B.
 */

$(document).ready(function(){
  var previous_date = new Date();
  previous_date.setDate(previous_date.getDate() - 7);

  var day = previous_date.getDate();
  var month = previous_date.getMonth() + 1;
  var year = previous_date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  var today = year + "-" + month + "-" + day; 


  $("#filter_start_date").val(today);


  var previous_date = new Date();
  previous_date.setDate(previous_date.getDate());

  var day = previous_date.getDate();
  var month = previous_date.getMonth() + 1;
  var year = previous_date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  var today = year + "-" + month + "-" + day; 

  $("#filter_end_date").val(today);

}); 




$("#apply_filters_button").on("click", function(){

  console.log("Applyfilter button pushed");
  GetAllLogs($("#filters_checkbox_connection").checkbox('is checked'),$("#filters_checkbox_info").checkbox('is checked') ,$("#filters_checkbox_warning").checkbox('is checked') ,$("#filters_checkbox_critical").checkbox('is checked'),new Date($('#filter_start_date').val()), new Date($('#filter_end_date').val()));
});


function DisplayLogs(list_logs)
{
  $("#logs>div").remove(); 
  
  for(var i = 0; i<list_logs.length;i++)
  {
    list_logs[i]["timestamp"] = new Date(list_logs[i]["timestamp"]);

    var icon = "";
    var text = "";

    if(list_logs[i]["event_type"] == "connection")
    {
      icon = "sign-in blue";
      text = "connected"
    }
    else if(list_logs[i]["event_type"] == "robot added")
    {
      icon ="plus green";
      text ="has added a new robot"
    }
    


    $("#logs").append("\
    <div class='ui feed'>\
      <div class='event'>\
        <div class='label'><i class='"+icon+" icon'></i>\
      </div>\
      <div class='content'>\
        <div class='summary'>\
          <a class='user'>"+list_logs[i]["by"]+"</a> "+text+"\
          <div class='date'>\
            "+list_logs[i]["timestamp"].toLocaleString("fr-FR")+"\
          </div>\
        </div>\
        <div class='meta'>\
          <a class='warning'><i class='warning orange icon'></i><span>"+list_logs[i]["comments"]+"</span></a>\
        </div>\
      </div>\
    </div>")
  }
}



