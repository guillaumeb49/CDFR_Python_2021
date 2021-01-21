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

var robot1_focus = 0;
var robot2_focus = 0;

$("#robot1").on("click", function () {

 
  var test = $("#robot2").offset();
  $('#robot2').animate({
    opacity: 0.4,
    left: 400
  }, 1000, function() {
    // Animation complete.
  });

  var test = $("#robot1").offset();
  $("#robot1").animate({
    opacity: 1,
    left: "-="+(test.left-100)
  }, 1000, function() {
    // Animation complete.
  });

  $(".focus_robot").show();

});


$("#robot2").on("click", function () {

 
  var test = $("#robot1").offset();
  $('#robot1').animate({
    opacity: 0.4,
    left: 400
  }, 1000, function() {
    // Animation complete.
  });

  var test = $("#robot2").offset();
  $("#robot2").animate({
    opacity: 1,
    left: "-="+(test.left-100)
  }, 1000, function() {
    // Animation complete.
  });

  $(".focus_robot").show();

});

$(".focus_robot").hide();

