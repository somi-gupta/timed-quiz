var startButton = document.querySelector(".startbtn");
var timeLabel = document.querySelector("#time");
var scoreLabel = document.querySelector("#score");
var questions = document.querySelector(".quiz_ques");
var infoBox = document.querySelector(".info_box");
let choiceBox = document.createElement("ul");
var answerBlock  = document.querySelector("#showAnswer");
var questionIndex = 0;
var questionsCorrect = 0;
var timeleft = jsQuestions.length * 10;
console.log(timeleft);
var timerInterval;

//Added event listener to start button
startButton.addEventListener("click", function () {
  setTime();
});

//Function to set timer
function setTime() {
  questionIndex = 0;
  timerInterval = setInterval(function () {
    timeleft--;
    timeLabel.textContent = "Time left: " + timeleft;
    if (timeleft === 0) {
      clearInterval(timerInterval);
      score();
      timeLabel.textContent("Time is up!");
    }
  }, 1000);
  startQuiz(questionIndex);
}

//Function to render questions and answer options.
function startQuiz(questionIndex) {
    infoBox.innerHTML = "";
    startButton.setAttribute("style", "visibility: hidden");

  choiceBox.innerHTML = "";

  var questionArray = jsQuestions[questionIndex].title;
  var choicesArray = jsQuestions[questionIndex].choices;
  questions.textContent = questionArray;

  choicesArray.forEach(function (x) {
    var listChoice = document.createElement("li");
    listChoice.textContent = x;
    questions.appendChild(choiceBox);
    choiceBox.appendChild(listChoice);

    listChoice.addEventListener("click", userAnswer);

  })

}

function userAnswer(event) {
  var element = event.target;

  if (element.matches("li")) {

  if (element.textContent === jsQuestions[questionIndex].answer) {
    // alert("Correct answer");
    answerBlock.textContent = "Correct!";
  } else {
    timeleft = timeleft - 10;
    answerBlock.textContent = "Incorrect!";
  }
}

  questionIndex++;
  if (questionIndex >= jsQuestions.length) {
      console.log("jsQuestions: " ,questionIndex >= jsQuestions.length);
      console.log(questionIndex);
    score();
  } else {
    startQuiz(questionIndex);
  }
}

function score(){
    questions.innerHTML = "";
    timeLabel.innerHTML = "";
    answerBlock.innerHTML = "";

    if(timeleft >= 0){
        var userScore = timeleft;
        clearInterval(timerInterval);
        var message = "All Done!. \n Your final score is: " ;
        infoBox.textContent = message + userScore ;

        var label = document.createElement("label");
        label.htmlFor = "Enter Initials"
        var input = document.createElement("input");
        input.type = "text";
    }

}