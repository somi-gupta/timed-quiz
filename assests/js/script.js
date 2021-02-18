var startButton = document.querySelector(".startbtn");
var timeLabel = document.querySelector("#time");
var scoreLabel = document.querySelector("#score");
var questions = document.querySelector(".quiz_ques");
var quesOptions = document.querySelector(".option_list");
var infoBox = document.querySelector(".info_box");
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
  infoBox.setAttribute("style", "visibility: hidden");
  startButton.setAttribute("style", "visibility: hidden");

  var questionArray = jsQuestions[questionIndex].title;
  var choices = jsQuestions[questionIndex].choices;
  questions.textContent = questionArray;
  let choiceBox = document.createElement("ul");
  questions.appendChild(choiceBox);

  choices.forEach(function (x) {
    let listChoice = document.createElement("li");
    listChoice.textContent = x;
    questions.appendChild(quesOptions);
    quesOptions.appendChild(listChoice);

    listChoice.addEventListener("click", userAnswer);
  });
}

function userAnswer(event) {
  var element = event.target;
  var ans = jsQuestions[questionIndex].answer;
  console.log(element.textContent);

  if (element.textContent == ans) {
    questionsCorrect++;
    var answerFeedback = document.createElement("div");
    answerFeedback.textContent = "Correct! The answer was: " + jsQuestions[questionIndex].answer;
    console.log("Corret answer");
  } else {
    timeleft = timeleft - 10;
  }
  questionIndex++;

  if (questionIndex >= jsQuestions.length) {
    score();
  } else {
    startQuiz(questionIndex);
  }
}

function score(){
    questions.innerHTML = "";
    timeLabel.innerHTML = "";

    var scoreContent = document.createElement("p");
    scoreContent.setAttribute("id", "scoreContent");

    if(timeleft >= 0){
        var userScore = timeleft;
        clearInterval(timerInterval);
        scoreContent.textContent = "Your final score is: " + timeLeft;
    }

}