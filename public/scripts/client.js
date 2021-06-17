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
   * FunctionL calcTime
   */
  const calcTime = (time) => {
    return moment(time).fromNow();
  };
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
  const loadTweets = function () {
    $.get("/tweets", function (res, req) {
      renderTweets(res);
    });
  };
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
  $(".tweetForm").submit(function (event) {
    event.preventDefault();
    //three cases
    //1) there is content > 140 char
    //2) content < 140 char
    //2) there is not tweet
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
