//const { text } = require("express");

$(document).ready(function() {
  // --- our code goes here ---
  console.log("ready");
  const submitButton = document.getElementById("submitButton");
  
  const textArea = document.getElementById("tweet-text");
  const charCount = document.getElementsByClassName("counter");
  // $("#btn").on('click', () => {
  //   console.log(this); //The this keyword here refers to something else!
  // });
  $(textArea).keyup(function(){
    $(charCount).text((140 - $(this).val().length));
    const numChar = $(charCount).text();
    if (numChar < 0) {
      $(charCount).css('color', 'red');
      
    } else {
      $(charCount).css('color', '#545149');
    }
  });
  const returnText = document.getElementsByClassName("tweet");
  $(submitButton).on('click', function() {
    // document.getElementsByClassName("tweet-tracker")=($(textArea).val());
    $(returnText).html('Hello');
  });
});