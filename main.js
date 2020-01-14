// execute after initial page load
$(document).ready(function() {

  // wait 4s and post initial greeting message
  setTimeout(() => {addMessage(getReplyHtml("Hey, I'm your new chat buddy! How are you doing today?"));}, 3000);

  // handler for form submit
  $("#inputtext").on("submit", function(event) {
      // prevent page reload on form submit
      event.preventDefault();

      // post user message from textbox
      let m = $("#message").val();
      addMessage(getMessageHtml(m));

      // generate random response and post with 4s delay
      setTimeout(() => {addMessage(getReplyHtml(composeReply()))}, 4000);

      // reset textbox to empty
      $("#message").val('');
      // scroll to bottom if convo box scrollbar is present
      $(".convo").stop().animate({ scrollTop: $(".convo")[0].scrollHeight}, 5000);
  })
});

// append message to bottom of convo box
function addMessage(m) {
  $(".convo").append(m);
}

// get current time in 24:59 format
function getCurrentTime() {
  const now = new Date();
  const hrs = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
  const mins = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();

  return hrs + ':' + mins;
}

// get user message HTML code
function getMessageHtml(m) {
  const message = `<div class="sent"><div class="message">${m}</div><br><span class="time">${getCurrentTime()}</span></div>`;

  return message;
}

// get computer reply HTML code
function getReplyHtml(r) {
  const reply = `<div class="received"><div class="message">${r}</div><br><span class="time">${getCurrentTime()}</span></div>`;

  return reply;
}

// compose computer's reply by selecting and concatenating a random reaction and question
function composeReply() {
  const reactions = [
    "Sure, I'm with you on this.",
    "I don't know, but anyway.",
    "Yes, I think it's quite likely.",
    "As you say.",
    "Are you sure? Oh well, OK then.",
    "Hmmmm, interesting.",
    "Interesting. I thought you'd say that.",
    "No way, really? Anyway.",
    "I don't agree, but that's OK."];

  const questions = [
    "How's the weather in Barcelona today?",
    "Do you like me?",
    "By the way, do you think Petr will get accepted to Codeworks?",
    "What did you have for lunch today?",
    "Do you think FCB is gonna win the Champions League this year?",
    "How old are you? If it's not a secret ...",
    "Do you prefer talking to robots or humans?",
    "What would you do if all computers stopped working?",
    "Do you remember the time before the Internet?",
    "Do you think robots can have feelings?"];

  return reactions[Math.floor(Math.random() * reactions.length)] + " " + questions[Math.floor(Math.random() * questions.length)];
}

