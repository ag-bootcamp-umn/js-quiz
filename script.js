// QUESTIONS
var questions = [
  {
    text: "The state bird of Minnesota is the ______.",
    answers: ["Hawk", "Loon", "Robin", "Parrot"],
    correct: "Loon",
  },
  {
    text: "A three-sided shape is called a(n) ________.",
    answers: ["Triangle", "Square", "Octogram", "Rhombus"],
    correct: "Triangle",
  },
  {
    text: "Concord is the capital of which state?",
    answers: ["Wyoming", "Ohio", "Oklahoma", "New Hampshire"],
    correct: "New Hampshire",
  },
  {
    text: "Batman's sidekick is names _______.",
    answers: ["Hawk", "Loon", "Robin", "Parrot"],
    correct: "Robin",
  },
  {
    text: "Snow is a form of ________.",
    answers: [
      "Precipitation",
      "Incantation",
      "Excavation",
      "Main train station",
    ],
    correct: "Precipitation",
  },
  {
    text: "The longest river in the USA is the _______.",
    answers: ["Missouri", "Connecticut", "Mississippi", "Contoocook"],
    correct: "Mississippi",
  },
  {
    text: "The largest mammals on earth are ______.",
    answers: ["Elephants", "Hippos", "Bigfoot", "Whales"],
    correct: "Whales",
  },
  {
    text: "In Javascript, a data type that can be only true or false is called a(n) _______.",
    answers: ["Null", "Boolean", "Symbol", "Number"],
    correct: "Boolean",
  },
  {
    text: "Which Javascript data type shares its name with a section in an orchestra?",
    answers: ["Undefined", "Bigint", "String", "Woodwind"],
    correct: "String",
  },
];

// GET DOM ELEMENTS
var timer = document.querySelector(".timer");
var center = document.querySelector(".center");
var title = document.querySelector(".title");
var list = document.querySelector(".center-list");
var outcome = document.querySelector(".outcome");

var highScores = document.querySelector("#highscores");
var modal = document.querySelector(".modal");
var initials = document.querySelector("#initials");
var playerScore = document.querySelector("#score");
var saveButton = document.querySelector("#save-score");

var buttons = document.querySelectorAll(".button");
var mainButton = document.querySelector("#button--1");
var otherButton = document.querySelector("#button--2");

// IMPORTANT COUNTERS
var time = 60;
var q = 0;
var score = 0;

mainButton.addEventListener("click", initiate, { once: true });

function initiate() {

  highScores.classList.add('hidden');
  hideButtons();

  // START TIMER
  timer.textContent = time;
  var timeCount = setInterval(function () {
    time--;
    timer.textContent = time;
    if (time <= 0 || q >= questions.length) {
      clearInterval(timeCount);
      endGame();
    }
    console.log(time);
  }, 1000);
  // END TIMER

  displayQuestion();
  outcome.textContent = "";
}

function hideButtons() {
  buttons.forEach(function (btn) {
    if (!btn.classList.contains("hidden")) btn.classList.add("hidden");
  });
}

function displayQuestion() {
  list.innerHTML = "";

  var question = questions[q];
  console.log(question);
  title.textContent = question.text;

  for (var i = 0; i < question.answers.length; i++) {
    var li = document.createElement("li");
    li.textContent = `${question.answers[i]}`;
    list.appendChild(li);
  }

  list.addEventListener("click", verifyAnswer, { once: true });
}

function verifyAnswer(e) {
  console.log(e.target.textContent);
  var correct = e.target.textContent === questions[q].correct;
  if (correct) {
    outcome.textContent = "Correct";
    outcome.style.color = "green";
    score++;
  } else {
    outcome.textContent = "Wrong";
    outcome.style.color = "red";
    time -= 10;
  }
  q++;
  if (q < questions.length) {
    displayQuestion();
  }
}

function endGame() {
    list.removeEventListener('click', verifyAnswer);
  time = 0;
  timer.textContent = "Time's up!";
  list.innerHTML = "";
  title.textContent = "That's all, folks!";
  outcome.style.color = "green";
  outcome.textContent = `Your final score is ${score}.`;
  buttons.forEach(function (btn) {
    btn.classList.remove("hidden");
  });
  mainButton.textContent = "Play Again";
  mainButton.addEventListener(
    "click",
    function () {
      time = 60;
      q = 0;
      score = 0;
      initiate();
    },
    { once: true }
  );
  otherButton.textContent = "Add me to highscores";
}

otherButton.addEventListener('click', inputScore);

function inputScore() {
  // Show input form
  modal.classList.toggle('hidden');

  // Score: populate input field fom score variable
  playerScore.value = score;

  // Handle Click event on input button
  saveButton.addEventListener('click', saveScore, { once: true });

}

highScores.addEventListener('click', showScores);

function saveScore(e) {
  e.preventDefault();

  if (initials.value) {
    localStorage.setItem("score", playerScore.value);
    localStorage.setItem("initials", initials.value);
    showScores();
    modal.classList.toggle('hidden');
  } else {
    alert("Don't be bashful- go ahead and enter your initials!");
    saveButton.addEventListener('click', saveScore, { once: true });
  }

}

function showScores() {

  var hiScore = localStorage.getItem("score");
  var hiInits = localStorage.getItem("initials");

  title.textContent = "High Scores:";
  outcome.textContent = hiInits + ": " + hiScore;

  if (mainButton.classList.contains("hidden")) mainButton.classList.remove("hidden");

  if (!otherButton.classList.contains("hidden")) otherButton.classList.add("hidden");
  list.innerHTML = '';
}