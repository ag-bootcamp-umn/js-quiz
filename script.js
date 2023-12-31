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
var answers = document.querySelector(".answers");
var outcome = document.querySelector(".outcome");

var buttons = document.querySelectorAll(".button");
var mainButton = document.querySelector(".button--1");
var otherButton = document.querySelector(".button--2");

// IMPORTANT COUNTERS
var time = 60;
var q = 0;
var score = 0;

mainButton.addEventListener("click", initiate, { once: true });

function initiate() {
  hideButtons();
  // startTimer();
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

  displayQuestion();
  outcome.textContent = "";
}

function hideButtons() {
  buttons.forEach(function (btn) {
    if (!btn.classList.contains("hidden")) btn.classList.add("hidden");
  });
}

function displayQuestion() {
  answers.innerHTML = "";

  var question = questions[q];
  console.log(question);
  title.textContent = question.text;

  for (var i = 0; i < question.answers.length; i++) {
    var li = document.createElement("li");
    li.textContent = `${question.answers[i]}`;
    answers.appendChild(li);
  }

  answers.addEventListener("click", verifyAnswer, { once: true });
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
    answers.removeEventListener('click', verifyAnswer);
  time = 0;
  timer.textContent = "Time's up!";
  answers.innerHTML = "";
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
