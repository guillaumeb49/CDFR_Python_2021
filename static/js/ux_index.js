/**
 * 
 * @brief Javascript user Interface functions
 * 
 * @author Guillaume B.
 */


// Initialize items at start-up
$( document ).ready(function() {
  $("#index_homologation_selected").hide();
  $("#index_strategy1_selected").hide();
  $("#index_strategy2_selected").hide();
});

// On click selection of team color
$( "#index_btn_color_yellow" ).on( "click", function() {
    $("#index_btn_color_yellow").css('background-color','rgba(242, 198, 31,1)') ;
    $("#index_btn_color_blue").css('background-color','rgba(59, 131, 192,0.25)') ;
    
  });

  $( "#index_btn_color_blue" ).on( "click", function() {
    $("#index_btn_color_yellow").css('background-color','rgba(242, 198, 31,0.25)') ;
    $("#index_btn_color_blue").css('background-color','rgba(59, 131, 192,1)') ;
  });

// On Click Selection of Strategy
$( "#index_homologation_card" ).on( "click", function() {
  $("#index_homologation_selected").show();
  $("#index_strategy1_selected").hide();
  $("#index_strategy2_selected").hide();

  $( "#index_homologation_card" ).css('box-shadow', '12px 14px 5px -3px rgba(0,0,0,0.41)');
  $( "#index_strategy1_card" ).css('box-shadow', '0px 1px 3px 0px #D4D4D5, 0px 0px 0px 1px #D4D4D5');
  $( "#index_strategy2_card" ).css('box-shadow', '0px 1px 3px 0px #D4D4D5, 0px 0px 0px 1px #D4D4D5');
});

$( "#index_strategy1_card" ).on( "click", function() {
  $("#index_homologation_selected").hide();
  $("#index_strategy1_selected").show();
  $("#index_strategy2_selected").hide();

  $( "#index_homologation_card" ).css('box-shadow', '0px 1px 3px 0px #D4D4D5, 0px 0px 0px 1px #D4D4D5');
  $( "#index_strategy1_card" ).css('box-shadow', '12px 14px 5px -3px rgba(0,0,0,0.41)');
  $( "#index_strategy2_card" ).css('box-shadow', '0px 1px 3px 0px #D4D4D5, 0px 0px 0px 1px #D4D4D5');
});

$( "#index_strategy2_card" ).on( "click", function() {
  $("#index_homologation_selected").hide();
  $("#index_strategy1_selected").hide();
  $("#index_strategy2_selected").show();

  $( "#index_homologation_card" ).css('box-shadow', '0px 1px 3px 0px #D4D4D5, 0px 0px 0px 1px #D4D4D5');
  $( "#index_strategy1_card" ).css('box-shadow', '0px 1px 3px 0px #D4D4D5, 0px 0px 0px 1px #D4D4D5');
  $( "#index_strategy2_card" ).css('box-shadow', '12px 14px 5px -3px rgba(0,0,0,0.41)');
});



// Click on Button Go to Initial Position Index
$( "#index_goToInitialPos" ).on( "click", function(){
  sendMessage("goToInit", 100,200,0.5);
});