$(document).ready(function() {
  // --- our code goes here ---
  const textArea = document.getElementById("tweet-text");
  const charCount = document.getElementsByClassName("counter");
  /**
   * function monitors the keyboard keys as they are released to ensure there is a 
   * valid input. The function will then calculate the numbers of characters in the textarea
   * and proceed to update the value. If there is more than 140 characters, the counter
   * will be red, else it remains grey.
   */
  $(textArea).keyup(function(){
    $(charCount).text((140 - $(this).val().length));
    const numChar = $(charCount).text();
    if (numChar < 0) {
      $(charCount).css('color', 'red');
      
    } else {
      $(charCount).css('color', '#545149');
    }
  });
});