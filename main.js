/*DNT*/$(document).ready(function() {/*DNT*/

  $('.fa-microphone').click(function() {
    sendMessage();
  })

  $(document).keypress(function(event){
    if (event.which == '13') {
    sendMessage();
    }
  });

})/*DNT*/

/*FUNCTIONS*/

function sendMessage() {
  /*grab user text from input*/
  var newMsgText = $('#type-input').val();
  console.log(newMsgText);

  /*copy template*/
  var newMsg = $('.template .msg').clone();

  /*add class for sent msg*/
  newMsg.addClass('msg-own');

  /* the input isn't empty*/
  if (newMsg != '') {

  /*send input to the template copy*/
  newMsg.text(newMsgText);

  /*send template copy to html*/
  $('.msgs-container').append(newMsg);

  /*input reset*/
  $('#type-input').val('');

  setTimeout(function(){
    /*copy template*/
    var newMsg = $('.template .msg').clone();

    /*add class for incoming msg*/
    newMsg.addClass('msg-incoming');

    /*fill incoming message content*/
    newMsg.children('p').text('ok');

    /*send template copy to html*/
    $('.msgs-container').append(newMsg);
    
    /*delay 1s*/
  }, 1000);
}
}
