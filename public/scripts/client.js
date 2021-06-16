$(document).ready(function() {
  console.log("We are ready to rock and roll");
  const calcTime = (unix) => {
    return moment(unix).fromNow();
  }
  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
const createTweetElement = function(tweet) {
  let tweetContent = tweet.content.text;
  let userName = tweet.user.name;
  return $(`
  <section class="tweet-tracker"><header class = "tweet-header">
  <div class = "left-header">
    <img class="mini=pic" src=${tweet.user.avatars}> 
    <h6 class = "name">${userName}</h6>
  </div>
    <h6 class = "name">${tweet.user.handle}</h6>
</header>
<p class = "tweet-body">
  ${tweetContent}
</p>
<footer class = "tweet-footer">
    <p class="time-section">
      ${calcTime(tweet.created_at)}
    </p>
    <div class="footer-icons">
      <i class = "fa fa-flag footer-i" ></i>
      <i class = "fa fa-retweet footer-i"></i>
      <i class = "fa fa-heart footer-i"></i>
    </div>
</footer>
</section>`);
}
const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let items of tweets) {
    let $userTweet = createTweetElement(items);
    $('.new-tweet').append($userTweet);
  }
}
const accessTweet = function () {
  $.get("/tweets", function (res, req) {
    renderTweets(res);
  })
}
$('.tweetForm').submit(function (event) {
  event.preventDefault();
  //three cases
  //1) there is content > 140 char
  //2) content < 140 char
  //2) there is not tweet
  const getVal = $('#tweet-text').val();
  if (getVal.length > 140) {
    //send error message
  } else if (!getVal){
    //send error message 
  } else {
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $('.tweetForm').serialize(),
    })
      //.then(() => {
        $('.new-tweet').empty();
        $('.counter').text(140);
        accessTweet();
      //})
      //.then(() => {
        this.reset();
      //})
  }
})

//renderTweets(data);
accessTweet();
//const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
//console.log($tweet); // to see what it looks like

});