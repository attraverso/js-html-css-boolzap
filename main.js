/*DNT*/$(document).ready(function() {/*DNT*/

  $('.fa-microphone').click(function() {

    var newMsgText = $('#type-input').val();
    console.log(newMsgText);

    var newMsg = $('.template .msg').clone();

    newMsg.text(newMsgText);

    $('.msgs-container').append(newMsg);
  })

})/*DNT*/
