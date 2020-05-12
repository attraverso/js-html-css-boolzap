/*DNT*/$(document).ready(function() {/*DNT*/

$('.fa-microphone').click(function() {
  sendMessage();
})

$(document).keypress(function(event){
  if (event.which == '13') {
  sendMessage();
  }
});

/*launch control every time a key is released (otherwise it will launch without considering the last character inputed)*/
$('.searchbar input').keyup(function() {

  /*grab user input, convert to lowercase, put in a value for later use*/
  var searchFor = $('.searchbar input').val().toLowerCase();

  /*for each contact name*/
  $('.chatlist-info-name').each(function() {

    /*grab content, convert to lowercase, save in var for later*/
    var contactName = $(this).text().toLowerCase();

    /*if what I'm searching for is included anywhere in the contacts' names*/
    if(contactName.includes(searchFor)) {
      /*show them*/
      $(this).closest('.chatlist-item').show();
      /*otherwise, hide*/
    } else {
      $(this).closest('.chatlist-item').hide();

    }

  })
})

})/*DNT*/

/*FUNCTIONS*/


/*search contacts*/


/*send a message with content from input, get automated reply*/
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

  /*delay 1s*/
  setTimeout(function(){
    /*copy template*/
    var newMsg = $('.template .msg').clone();

    /*add class for incoming msg*/
    newMsg.addClass('msg-incoming');

    /*fill incoming message content*/
    newMsg.children('p').text('ok');

    /*send template copy to html*/
    $('.msgs-container').append(newMsg);
  }, 1000);
}
}
