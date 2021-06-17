$(document).ready(function () {
  /**
   * Lines 5 - 15, hide the tweet form then on click of the arrow will show and hide the form
   */
  $(".tweetForm").hide();
  let isShowing = false;
  $("#tweet-click").click(function () {
    if (!isShowing) {
      $(".tweetForm").show();
      isShowing = true;
    } else {
      $(".tweetForm").hide();
      isShowing = false;
    } 
  });
  /**
   * Function: calcTime
   * Paramaters: time
   * Returns: time difference between when tweet is created and current time. 
   * Ex: time created: June 16th:
   *     current date/time: june 17th:
   * returns "1 day ago"
   */
  const calcTime = (time) => {
    return moment(time).fromNow();
  };
  /**
   * Function: escape;
   * Designed for cross site scripting protection
   * @param {text input from textarea} str 
   * @returns contents inside the html. 
   */
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  /**
   * Function takes in the tweet object, parses the required data and formats it, 
   *  then returns the contents in an html format.
   * @param {takes in the tweet data} tweet 
   * @returns formatted tweet 
   */
  const createTweetElement = function (tweet) {
    let tweetContent = escape(tweet.content.text);
    let userName = escape(tweet.user.name);
    let userAvatar = escape(tweet.user.avatars);
    let userHandle = escape(tweet.user.handle);
    let timeStamp = escape(calcTime(tweet.created_at));
    return $(`
      <section id="tweet-container" class="tweet-tracker">
        <header class = "tweet-header">
          <div class = "left-header">
           <img class="mini=pic" src=${userAvatar}> 
            <h6 class = "name">${userName}</h6>
          </div>
          <h6 class = "name">${userHandle}</h6>
        </header>
        <p class = "tweet-body">
          ${tweetContent}
        </p>
        <footer class = "tweet-footer">
          <p class="time-section">
            ${timeStamp}
          </p>
          <div class="footer-icons">
            <i class = "fa fa-flag footer-i" ></i>
            <i class = "fa fa-retweet footer-i"></i>
            <i class = "fa fa-heart footer-i"></i>
          </div>
        </footer>
      </section>`
    );
  };
  /**
   * function: renderTweets
   * loops through a list of objects containing the tweets and calls createTweetElement
   *  appends the results into an html container. 
   * @param {*} tweets 
   */
  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const items of tweets) {
      const $userTweet = createTweetElement(items);
      //https://www.w3schools.com/jquery/html_prepend.asp
      $(".public-tweets").prepend($userTweet);
    }
  };
  /**
   * function: loadTweets
   * send a get request to "/tweets"
   * then calls the renderTweets function and passes in res as an argument
   */
  const loadTweets = function () {
    $.get("/tweets", function (res, req) {
      renderTweets(res);
    });
  };
  /**
   * Functions for alert messages:
   * notifies users if they have an empty tweet or if their tweet contains
   * too many characters. 
   */
  const toManyChars = function () {
    $(".error-message")
      .html("Please make your tweet lighter so it can fly")
      .slideDown()
      .delay(4000) //4 seconds
      .slideUp();
  };
  const emptyTweetAlert = function () {
    $(".error-message")
      .html("Please enter a message before submitting tweet.")
      .slideDown()
      .delay(4000) //4 seconds
      .slideUp();
  };
  /**
   * jQuery function for submissions:
   * Does basic error checking to ensure that the tweet content abides parameters.
   * Three cases to check for:
   *  1) too many characters in the tweet
   *  2) the tweet box was left empty
   *  3) it is a valid tweet
   * 
   * calls the loadTweets function at the end to ensure that the tweets are rendered in.
   */
  $(".tweetForm").submit(function (event) {
    event.preventDefault();
    const getVal = $("#tweet-text").val();
    if (getVal.length > 140) {
      toManyChars();
    } else if (!getVal) {
      emptyTweetAlert();
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(".tweetForm").serialize(),
      }).then(() => {
        $(".public-tweets").empty();
        $(".counter").text(140);
        loadTweets();
        this.reset();
      });
    }
  });
  loadTweets();
});
