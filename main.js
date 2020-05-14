/*DNT*/$(document).ready(function() {/*DNT*/

/*when you click on a contact*/
$('.chatlist-item').click(function() {

  /**HIDE WELCOME PAGE**/
  /*hide welcome pane*/
  $('#advice').hide();
  /*show chat pane???*/
  $('.chat-container').addClass('active');

  /**SWITCH CHATS**/
  /*use data attribute to grab the chat item you're clicking on*/
  var chatItem = $(this).data('contact');
  console.log(chatItem);
  /*remove class active from every item in the chatlist*/
  $('.chatlist-item').removeClass('active');
  /*add class active to the item that matches the data attribute*/
  $('.chatlist-item[data-contact="' + chatItem + '"]').addClass('active');
  /*remove class active from every msgs container in the right panel*/
  $('.msgs-container').removeClass('active');
  /*add class active to the msgs container that matches the data attribute*/
  $('.msgs-container[data-contact="' + chatItem + '"]').addClass('active');

  /**MATCH CHAT PROFILE TO SELECTED CONTACT**/
  /*grab contact name*/
  var contactName = $(this).find('.chatlist-info-name').text();
  /*put it in the profile box at the top of the right panel*/
  $('.options-profile span').text(contactName);
  /*grab contact profile pic*/
  var contactImg = $(this).find('.chatlist-pic-box img').attr('src');
  /*put it in the profile box at the top of the right panel*/
  $('.chat-options-container .options-profile img').attr('src', contactImg);

  /**SEARCH**/
  /*launch control every time a key is released (otherwise it will launch without considering the last character inputed)*/
  $('.searchbar input').keyup(function() {
    search();
  });

  /**SHOW/HIDE MESSAGE DROPDOWN MENU ON CLICK**/
  $('.msgs-container').on('click', '.msg-toggle', function() {
    $(this).siblings('.msg-dropdown').toggleClass('active');
  });


  /**SEND MESSAGE**/
  /*on click on mic icon*/
  $('.fa-microphone').click(function() {
    sendMessage(chatItem);
  });
  /*every time I hit enter*/
  $('.typebox input').keypress(function(event){
    if (event.which == '13') {
    sendMessage(chatItem);
    }
  });
})

/*FUNCTIONS*/

/**GET TIME for message**/
function getTime() {
  var date = new Date();
  var currentTime = date.getHours() + ':' + date.getMinutes();
  return currentTime;
}

/*SEARCH CONTACTS*/
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

/*SEND MESSAGE with content from input, get automated reply*/
function sendMessage(contact) {
  /*grab user text from input*/
  var newMsgText = $('#type-input').val();
  /*copy template*/
  var newMsg = $('.template .msg').clone();
  /*add class for sent msg*/
  newMsg.addClass('msg-own');
  /*if the input isn't empty*/
  if (newMsg != '') {
    /*send input to the template copy*/
    newMsg.children('.msg-content').text(newMsgText);
    /*get current time*/
    var currentTime = getTime();
    console.log('CT variable: ' + currentTime);
    newMsg.children('.msg-time').text(currentTime);
    /*send template copy to html in the msgs-container of the active contact*/
    $('.msgs-container.active').append(newMsg);
    /*input reset*/
    $('#type-input').val('');
    /*delay 1s*/
    setTimeout(function(){
      /*copy template*/
      var newMsg = $('.template .msg').clone();
      /*add class for incoming msg*/
      newMsg.addClass('msg-incoming');
      /*fill incoming message content*/
      newMsg.children('.msg-content').text('ok');
      /*get current time*/
      var currentTime = getTime();
      console.log('CT variable: ' + currentTime);
      newMsg.children('.msg-time').text(currentTime);
      /*send template copy to html*/
      $('.msgs-container.active').append(newMsg);
    }, 1000);
  }
}

})/*DNT - closing document.ready*/
