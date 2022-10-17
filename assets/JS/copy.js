//questions
// Commonly used data types DO Not Include:
//  1.strings
//  2.booleans
//  3.alerts
//  4.numbers

// A very useful tool used during development and debugging for printing content to the debuuger is:
//  1.JavaScript
//  2.terminal/bash
//  3.for loops
//  4.console.log

// String values must be enclosed within _________ when being assigned to variables.
//  1.commas
//  2.curly brackets
//  3.quotes    ****
//  4.parenthesis

// The condition in an if / else statement is enclosed with _________.
//  1.quotes
//  2.curly brackets
//  3.parenthesis ****
//  4.square brackets

// Arrays in JavaScript can be used to store _________.
//  1.numbers and strings
//  2.other strings
//  3.booleans
//  4.all the above ****

var questions = [
    {
        title: "Commonly used data types DO Not Include:",
        choices: ["1.strings", "2.booleans", "3.alerts", "4.numbers"],
        answer: "3.alerts"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debuuger is:",
        choices: ["1.JavaScript", "2.terminal/bash", "3.for loops", "4.console.log",],
        answer: "4.console.log"
    },
    {
        title: "String values must be enclosed within _________ when being assigned to variables.",
        choices: ["1.commas", "2.curly brackets", "3.quotes", "4.parenthesis"],
        answer: "3.quotes"
    },
    {
        title: "The condition in an if / else statement is enclosed with _________.",
        choices: ["1.quotes", "2.curly brackets", "3.parenthesis", "4.square brackets"],
        answer: "3.parenthesis"
    },
    {
        title: "Arrays in JavaScript can be used to store _________.",
        choices: ["1.numbers and strings", "2.other strings", "3.booleans", "4.all the above"],
        answer: "all the above"        
    }
];

var startScreen = document.getElementById("startScreen");
var results = document.getElementById("results");
var submit = document.getElementById("submit"); 
var questionsTitle = document.getElementById("question");
var answersListParent = document.getElementById("answers");
var timerDisplay = document.getElementById("timer");
var beginQuizBtn = document.getElementById("beginQuizBtn")
var questionScreen = document.getElementById("questionScreen");
questionScreen.style.display = "none";


var questionAsked = 0;
var time= 60;
var quizTimer;

let currentWindow = startScreen
let prevWindow = startScreen


function startQuiz(){
    startScreen.style.display = "none";
    questionScreen.style.display ="block";
    startQuizTimer();
    timerDisplay.textContent = time;
    startQuestions();
 }


 function startQuizTimer(){
    quizTimer = setInterval(function(){
        time--;
        timerDisplay.textContent= time;
      if(time < 0){
        time = 0;
        endQuiz();
      }               
    }, 1000)
 }

 function startQuestions() {
    var currentQuestion = questions[questionAsked].title;
    questionsTitle.textContent = currentQuestion;
    answersListParent.innerHTML = "";
    var currentQuestionAnswers = questions[questionAsked].choices;
    currentQuestionAnswers.forEach(function (answer) {
        var answerButton = document.createElement("button");
        answerButton.setAttribute("value", answer)
        answerButton.textContent = answer;
        answerButton.onclick = checkAnswerSelected

        answersListParent.appendChild(answerButton);
    })
 }

 function checkAnswerSelected() {
    var answerSelected = this.value;
    if (answerSelected === questions[questionAsked].answer) {
        alert("correct")
    } else{
     alert("wrong")
     time -=10;
     if (time <= 0){
         endQuiz();
     }
        timerDisplay.textContent = time;
    }
    questionAsked++;
    console.log(questionAsked)
    if (questionAsked === questions.length){
        endQuiz();
    }
    startQuestions();
    }

    beginQuizBtn.onclick = startQuiz;
