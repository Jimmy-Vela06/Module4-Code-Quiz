const questions = [
  {
    title: "Commonly used data types DO Not Include:",
    choices: ["1.strings", "2.booleans", "3.alerts", "4.numbers"],
    answer: "3.alerts",
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debuuger is:",
    choices: [
      "1.JavaScript",
      "2.terminal/bash",
      "3.for loops",
      "4.console.log",
    ],
    answer: "4.console.log",
  },
  {
    title:
      "String values must be enclosed within _________ when being assigned to variables.",
    choices: ["1.commas", "2.curly brackets", "3.quotes", "4.parenthesis"],
    answer: "3.quotes",
  },
  {
    title:
      "The condition in an if / else statement is enclosed with _________.",
    choices: [
      "1.quotes",
      "2.curly brackets",
      "3.parenthesis",
      "4.square brackets",
    ],
    answer: "3.parenthesis",
  },
  {
    title: "Arrays in JavaScript can be used to store _________.",
    choices: [
      "1.numbers and strings",
      "2.other strings",
      "3.booleans",
      "4.all the above",
    ],
    answer: "4.all the above",
  },
];

var startScreen = document.getElementById("startScreen");
var results = document.getElementById("results");
results.style.display = "none";
var submit = document.getElementById("submit");
var questionsTitle = document.getElementById("question");
var answersListParent = document.getElementById("answers");
var timerDisplay = document.getElementById("timer");
var beginQuizBtn = document.getElementById("beginQuizBtn");
var questionScreen = document.getElementById("questionScreen");
questionScreen.style.display = "none";
var initialsEL = document.getElementById("yourInitials");
var scoreStorage = document.querySelector(".hs-button");
scoreStorage.style.display = "none";
const backToStart = document.getElementById("startScreenBtn");

var completeScores = document.getElementById("completeScores");

var questionAsked = 0;
var time = 60;
var quizTimer;

function startQuiz() {
  startScreen.style.display = "none";
  results.style.display = "none";
  scoreStorage.style.display = "none";
  questionScreen.style.display = "block";
  startQuizTimer();
  timerDisplay.textContent = time;
  startQuestions();
}

beginQuizBtn.onclick = startQuiz;

function startQuizTimer() {
  quizTimer = setInterval(function () {
    time--;
    timerDisplay.textContent = time;
    if (time <= 0) {
      time = 0;
      timerDisplay.textContent = time;
      endQuiz();
    }
  }, 1000);
}
function startQuestions() {
  var currentQuestion = questions[questionAsked].title;
  questionsTitle.textContent = currentQuestion;
  answersListParent.innerHTML = "";
  var currentQuestionAnswers = questions[questionAsked].choices;
  currentQuestionAnswers.forEach(function (answer) {
    var answerButton = document.createElement("button");
    answerButton.setAttribute("value", answer);
    answerButton.textContent = answer;
    answerButton.onclick = checkAnswerSelected;

    answersListParent.appendChild(answerButton);
  });
}

function checkAnswerSelected() {
  var answerSelected = this.value;
  if (answerSelected === questions[questionAsked].answer) {
    alert("correct");
  } else {
    alert("wrong");
    time -= 10;
    if (time <= 0) {
      endQuiz();
    }
    timerDisplay.textContent = time;
  }
  questionAsked++;
  console.log(questionAsked);
  if (questionAsked === questions.length) {
    endQuiz();
  } else {
    startQuestions();
  }
}

let quizScore = time;

function endQuiz() {
  startScreen.style.display = "none";
  questionScreen.style.display = "none";
  scoreStorage.style.display = "block";
  results.style.display = "block";

  clearInterval(quizTimer);
}

function submitScore() {
  var initials = initialsEL.value;
  var score = timerDisplay.textContent;
  //   var finaleScore = initials + score;

  const scores = localStorage.getItem("scores");
  if (scores) {
    const scoresArr = JSON.parse(scores);
    scoresArr.push(initials + ": " + score);
    localStorage.setItem("scores", JSON.stringify(scoresArr));
  } else {
    const scoresArr = [];
    scoresArr.push(initials + ": " + score);
    console.log(scoresArr);
    localStorage.setItem("scores", JSON.stringify(scoresArr));
  }

  //   localStorage.setItem("HighScore", finaleScore);
}

const showScore = function () {
  scoreStorage.style.display = "none";

  let scoresSheet = localStorage.getItem("scores");
  scoresSheet;
  const scoresArr = JSON.parse(scoresSheet);
  const highScoreTitle = document.createElement("h6");
  highScoreTitle.innerText = "High Scores: ";
  completeScores.append(highScoreTitle);
  scoresArr.forEach((score) => {
    const newScoreDiv = document.createElement("div");
    newScoreDiv.innerText = score;
    completeScores.append(newScoreDiv);
  });
  //   completeScores.textContent = scoresSheet;
};

submit.addEventListener("click", submitScore);
scoreStorage.addEventListener("click", showScore);

// const backToStart = document.getElementById("startScreenBtn");

// backToStart.addEventListener("click", startQuiz);
