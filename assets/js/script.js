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
var title = document.querySelector(".center > h1");
var list = document.querySelector(".center > ul");
var outcome = document.querySelector(".center > h2");
var modal = document.querySelector(".modal");
var buttons = document.querySelectorAll(".buttons > button");

// Input Fields
var initials = document.querySelector("#initials");
var playerScore = document.querySelector("#score");

// For Click Events:
var mainButton = document.querySelector(".button--1");
var otherButton = document.querySelector(".button--2");
var saveButton = document.querySelector(".save-score");
var highScores = document.querySelector(".highscores");

// IMPORTANT COUNTERS
var time = 60;
var q = 0;
var score = 0;

function initiate() {
  time = 60;
  q = 0;
  score = 0;
  highScores.classList.add('hidden');
  show(timer);
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
    hide(btn);
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
    li.classList.add('option');
    list.appendChild(li);
  }
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
  time = 0;
  timer.textContent = "";
  list.innerHTML = "";
  title.textContent = "That's all, folks!";
  outcome.style.color = "green";
  outcome.textContent = `Your final score is ${score}.`;
  buttons.forEach(function (btn) {
    btn.classList.remove("hidden");
  });
  mainButton.textContent = "Play Again";
  otherButton.textContent = "Add me to highscores";
  otherButton.id = 'add';
}



function inputScore() {
  // Show input form
  modal.classList.toggle('hidden');

  // Score: populate input field fom score variable
  playerScore.value = score;


}


function saveScore(e) {
  e.preventDefault();

  if (initials.value) {
    localStorage.setItem("score", playerScore.value);
    localStorage.setItem("initials", initials.value);
    showScores();
    modal.classList.toggle('hidden');
  } else {
    alert("Don't be bashful- go ahead and enter your initials!");
  }

}

function showScores() {

  var hiScore = localStorage.getItem("score");
  var hiInits = localStorage.getItem("initials");

  title.textContent = "High Scores:";
  outcome.textContent = hiInits + ": " + hiScore;
  hide(timer);
  buttons.forEach(function(btn) {
    show(btn);
  });
  otherButton.textContent = 'Home';
  otherButton.id = 'home';
}

function reset() {
  title.textContent = 'Test your knowledge';
  list.innerHTML = '';
  outcome.textContent = '';
  mainButton.textContent = 'Click to start';
  hide(otherButton);
  show(highScores);
}

function hide(el) {
  if(!el.classList.contains('hidden')) {
    el.classList.add('hidden');
  }
}

function show(el) {
  if(el.classList.contains('hidden')) {
    el.classList.remove('hidden');
  }
}

// ONE EVENT LISTENER TO CATCH THEM ALL...!
document.querySelector('body').addEventListener('click', function(e) {
  var t = e.target;

  if (t.matches('li')) {
    console.log("option");
    verifyAnswer(e);
  } else if (t.matches('button')) {
    console.log("button");
  }

  switch (t.id) {
    case 'start':
      console.log('start id')
      initiate();
      break;
      
    case 'add':
      console.log('add id');
      inputScore();
      break;
      
    case 'save':
      console.log('add id');
      saveScore(e);
      break;
      
    case 'home':
      console.log('add id');
      reset();
      break;
      
    case 'highscores':
      console.log('add id');
      showScores();
      break;

    default:
      break;
  }
});