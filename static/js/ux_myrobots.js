/**
 * 
 * @brief Javascript user Interface functions
 * 
 * @author Guillaume B.
 */


$("#add_new_robot").on("click", function(){
  $('#add_new_robot_modal').modal({
    onDeny  : function(){
      return false;
    },
    onApprove:function(){
      AddRobotRegistered($("#name_new_robot").val(), $("#uid_new_robot").val());
    }
  }).modal('show');
});


$("#lookfor_registered_robot").on("click", function(){

  // Ask information on all registered robots to database
  GetAllRobotRegistered();

  $('#get_all_robot_modal').modal('show');
});

