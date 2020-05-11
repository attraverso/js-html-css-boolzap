/*DNT*/$(document).ready(function() {/*DNT*/

  $('.fa-microphone').click(function() {
    sendMessage();
  })

  $(document).keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
    sendMessage();
    }
  });

})/*DNT*/

/*FUNCTIONS*/

function sendMessage() {
  var newMsgText = $('#type-input').val();
  console.log(newMsgText);

  var newMsg = $('.template .msg').clone();

  newMsg.text(newMsgText);

  $('.msgs-container').append(newMsg);
};
