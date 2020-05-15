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
  chatItem = $(this).data('contact');
  /*remove class active from every item in the chatlist*/
  $('.chatlist-item').removeClass('active');
  /*add class active to the item that matches the data attribute*/
  $('.chatlist-item[data-contact="' + chatItem + '"]').addClass('active');
  /*remove class active from every msgs container in the right panel*/
  $('.msgs-container').removeClass('active');
  /*add class active to the msgs container that matches the data attribute*/
  $('.msgs-container[data-contact="' + chatItem + '"]').addClass('active');
  /*grab timestamp of the last incoming message*/
  var initialLastSeen = $('.msgs-container[data-contact="' + chatItem + '"]').children().last('.msg-incoming').children('.msg-time').text();
  /*put it after 'last seen at' in chat-options*/
  $('#options-profile-time').text(initialLastSeen);

  /**MATCH CHAT PROFILE TO SELECTED CONTACT**/
  /*grab contact name*/
  var contactName = $(this).find('.chatlist-info-name').text();
  /*put it in the profile box at the top of the right panel*/
  $('.options-profile-info-name').text(contactName);
  /*grab contact profile pic*/
  var contactImg = $(this).find('.chatlist-pic-box img').attr('src');
  /*put it in the profile box at the top of the right panel*/
  $('.chat-options-container .options-profile img').attr('src', contactImg);
})

/**SEND MESSAGE**/
/*on click on mic icon*/
$('.fa-microphone').click(function() {
  sendMessage(chatItem);
  /*copy message in contacts preview*/
  contactsLastMessage();
});
/*every time I hit enter*/
$('.typebox input').keypress(function(event){
  if (event.which == '13') {
  sendMessage(chatItem);
  /*copy message in contacts preview*/
  contactsLastMessage();
  }
});

/**CHANGE MIC ICON TO SEND WHEN WRITING MESSAGE**/
/*when typebox input has focus*/
$('.typebox input').focus(function() {
  /*change icon*/
  $('.typebox-container i:last-child').removeClass('fas fa-microphone');
  $('.typebox-container i:last-child').addClass('fab fa-telegram-plane');
})
/*when typebox input loses focus*/
$('.typebox input').blur(function() {
  /*change icon*/
  $('.typebox-container i:last-child').removeClass('fab fa-telegram-plane');
  $('.typebox-container i:last-child').addClass('fas fa-microphone');
})


/**SEARCH**/
/*launch control every time a key is released (otherwise it will launch without considering the last character inputed)*/
$('.searchbar input').keyup(function() {
  search();
});

/**CLICKING ON CROSS ON SEARCHBAR EMPTIES INPUT**/
$('.chat-search-container').on('click', '.searchbar .fa-times.active', function() {
  $('.searchbar input').val('');
  /*show all contacts*/
  $('.chatlist-item').show();
});


/**DROPDOWN, MESSAGE REMOVAL/REPLACEMENT**/
/*show on click*/
$('.msgs-container').on('click', '.msg-toggle', function() {
  $(this).siblings('.msg-dropdown').toggleClass('active');
  /*hide on mouseleave*/
}).on('mouseleave', '.msg-dropdown', function() {
  $('.msg-dropdown').removeClass('active');
  /*delete message*/
}).on('click', '.msg-dd-delete', function() {
  /*completely remove message*/
  // $(this).closest('.msg').remove();
  /*replace message with reminder*/
  $(this).parents().siblings('.msg-time').remove();
  $(this).parents().siblings('.msg-content').html('<i class="fas fa-ban"></i><em> You deleted this message</em>');
});



/* * FUNCTIONS - alphabetical order * */

/*SEND AUTOMATED REPLY after user message*/
function automatedReply() {
  /*copy template*/
  var newMsg = $('.template .msg').clone();
  /*add class for incoming msg*/
  newMsg.addClass('msg-incoming');
  /*fill incoming message content with random message*/
  autoText = randomMsg();
  newMsg.children('.msg-content').text(autoText);
  /*get current time*/
  var currentTime = getTime();
  /*primt timestamp on new message*/
  newMsg.children('.msg-time').text(currentTime);
  /*update 'last seen at' in chat-options*/
  $('#options-profile-time').text(currentTime);
  /*send template copy to html*/
  $('.msgs-container.active').append(newMsg);
  /*scroll down 500px*/
  $('.msgs-area').animate({
      scrollTop: $('.msg:last-child').offset().bottom
    }, 500);
  /*copy message in contacts preview*/
  contactsLastMessage();
}

/*GRAB LAST MESSAGE FROM CHAT to update contact preview*/
function contactsLastMessage() {
  /*grab last message's content*/
  var msgContent = $('.msgs-container.active .msg:last-child .msg-content').text();
  /*send to contact preview*/
  $('.chatlist-item.active .chatlist-info-preview').text(msgContent);
  /*grab last message's timestamp*/
  var msgTime = $('.msgs-container.active .msg:last-child .msg-time').text();
  /*send to contact preview*/
  $('.chatlist-item.active .chatlist-timestamp').text(msgTime);

}

/**GET TIME for message**/
function getTime() {
  /*get current time*/
  var date = new Date();
  /*extract hours and minutes*/
  var currentHours = date.getHours();
  var currentMinutes = date.getMinutes();
  /*if < 10, add a '0' before it, then reassemble*/
  if (currentHours < 10) {
    currentHours = '0' + currentHours;
  }
  if (currentMinutes < 10) {
    currentMinutes = '0' + currentMinutes;
  }
  currentTime = currentHours + ':' + currentMinutes;
  return currentTime;
}

/*GET RANDOM NUMBER*/
function getRandomNr(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/*GET RANDOM MESSAGE FOR AUTOMATED REPLY*/
function randomMsg() {
  /*establish possible replies*/
  var choices = ['if you say so', 'oh really?', 'cool, cool', 'okay, then', 'lol', 'sure', 'uh-huh', 'oh come on', 'unbelievable', 'smh'];
  /*get random number*/
  var randomNr = getRandomNr(0,9);
  /*pick reply from array based on random number*/
  var reply = choices.slice(randomNr, (randomNr + 1)).toString();
  return reply;
}

/*SEARCH CONTACTS*/
function search() {
  /*grab user input, convert to lowercase, put in a value for later use*/
  var searchFor = $('.searchbar input').val().trim().toLowerCase();
  /*if the string is not empty (prevents check on all chats when you delete the last remaining character from the searchbar)*/
  if ($('.searchbar input') != '') {
    /*show cross for clearing input*/
    $('.searchbar .fa-times').addClass('active');
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
    /*if the searchbar input is empty, remove cross*/
  } else {
    $('.searchbar .fa-times').removeClass('active');
  }
}

/*SEND MESSAGE with content from input, get automated reply from other function*/
function sendMessage(contact) {
  /*grab user text from input*/
  var newMsgText = $('#type-input').val();
  /*copy template*/
  var newMsg = $('.template .msg').clone();
  /*add class for sent msg*/
  newMsg.addClass('msg-own');
  /*if the input isn't empty / only made of spaces*/
  if ($('.typebox input').val().trim() != '') {
    /*send input to the template copy*/
    newMsg.children('.msg-content').text(newMsgText);
    /*get current time*/
    var currentTime = getTime();
    newMsg.children('.msg-time').text(currentTime);
    /*send template copy to html in the msgs-container of the active contact*/
    $('.msgs-container.active').append(newMsg);
    /*input reset*/
    $('#type-input').val('');
    /*scroll down 500px*/
    $('.msgs-area').animate({
        scrollTop: $('.msg:last-child').offset().bottom
      }, 500);
    /*delay 1s*/
    setTimeout(automatedReply, 1000);
  }
}

})/*DNT - closing document.ready*/
