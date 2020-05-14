/*DNT*/$(document).ready(function() {/*DNT*/

/***CURRENT VERSION: YOU CAN'T SEND A MESSAGE UNTIL YOU'VE SELECTED A CONTACT***/

/*when you click on a contact, you see their chat*/

/*when you click on a contact*/
$('.chatlist-item').click(function() {
  /*use data attribute to grab the chat item you're clicking on*/
  var chatItem = $(this).data('contact');
  /*remove class active from every item in the chatlist*/
  $('.chatlist-item').removeClass('active');
  /*add class active to the item that matches the data attribute*/
  $('.chatlist-item[data-contact="' + chatItem + '"]').addClass('active');
  /*remove class active from every msgs container in the right panel*/
  $('.msgs-container').removeClass('active');
  /*add class active to the msgs container that matches the data attribute*/
  $('.msgs-container[data-contact="' + chatItem + '"]').addClass('active');
  /*grab contact name*/
  var contactName = $(this).find('.chatlist-info-name').text();
  /*put it in the profile box at the top of the right panel*/
  $('.options-profile span').text(contactName);
  /*grab contact profile pic*/
  var contactImg = $(this).find('.chatlist-pic-box img').attr('src');
  /*put it in the profile box at the top of the right panel*/
  $('.options-profile img').attr('src', contactImg);

  /*launch control every time a key is released (otherwise it will launch without considering the last character inputed)*/
  $('.searchbar input').keyup(function() {
    search();
  })

  /*send message*/

  /*on click on mic icon*/
  $('.fa-microphone').click(function() {
    sendMessage(chatItem);
  })
  /*every time I hit enter*/
  $('.typebox input').keypress(function(event){
    if (event.which == '13') {
    sendMessage(chatItem);
    }
  });
})
/*FUNCTIONS*/

/*search contacts*/

function search() {
  /*if the string is not empty (prevents check on all chats when you delete the last remaining character from the searchbar)*/
  if ($('.searchbar input') != '') {
    /*grab user input, convert to lowercase, put in a value for later use*/
    var searchFor = $('.searchbar input').val().trim().toLowerCase();
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
    });
  }
}

/*send a message with content from input, get automated reply*/

function sendMessage(contact) {
  /*grab user text from input*/
  var newMsgText = $('#type-input').val();
  /*copy template*/
  var newMsg = $('.template .msg').clone();
  /*add class for sent msg*/
  newMsg.addClass('msg-own');
  /* the input isn't empty*/
  if (newMsg != '') {
    /*send input to the template copy*/
    newMsg.text(newMsgText);
    /*send template copy to html in the msgs-container of the active contact*/
    $('.msgs-container[data-contact="' + contact + '"]').append(newMsg);
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

})/*DNT - closing document.ready*/
