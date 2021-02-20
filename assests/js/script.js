// Global variables
var startButton = document.querySelector(".startbtn");
var timeLabel = document.querySelector("#time");
var scoreLabel = document.querySelector("#score");
var questions = document.querySelector(".quiz_ques");
var infoBox = document.querySelector(".info_box");
let choiceBox = document.createElement("ul");
var answerBlock = document.querySelector("#showAnswer");
var pTags = document.querySelectorAll("p");
var inputBox = document.createElement("input");
var questionIndex = 0;
var questionsCorrect = 0;
var timeleft;
console.log(timeleft);
var timerInterval;

//Added event listener to start button
startButton.addEventListener("click", function () {
  setTime();
});

//Function to set timer
function setTime() {
  timeleft = jsQuestions.length * 10;
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
  });
}

function userAnswer(event) {
  var element = event.target;

  if (element.matches("li")) {
    if (element.textContent === jsQuestions[questionIndex].answer) {
      answerBlock.textContent = "Correct!";

    } else {
      timeleft = timeleft - 10;
      answerBlock.textContent = "Incorrect!";
    }
  }
  questionIndex++;
  if (questionIndex >= jsQuestions.length) {
    score();
  } else {
    startQuiz(questionIndex);
  }
}

function score() {
  questions.innerHTML = "";
  timeLabel.innerHTML = "";
  answerBlock.innerHTML = "";

  if (timeleft >= 0) {
    var userScore = timeleft;
    clearInterval(timerInterval);

    var heading = document.createElement("h1");
    heading.innerHTML = "All Done!.";
    infoBox.append(heading);

    var para = document.createElement("p");
    para.innerHTML = "Your score is: " + userScore;
    infoBox.append(para);

    var label = document.createElement("label");
    label.innerHTML = "Enter Initials: ";
    infoBox.append(label);

    inputBox.type = "text";
    label.append(inputBox);

    var submitInitials = document.createElement("button");
    submitInitials.innerHTML = " Submit";
    label.appendChild(submitInitials);

    submitInitials.addEventListener("click", function (event) {
      event.preventDefault();

      if (inputBox.value == "") {
        var errorMsg = document.createElement("p");
        errorMsg.innerHTML = "Please enter initials";
        label.append(errorMsg);
      } else {
        var inputInit = inputBox.value + " - " + timeleft;

        initialsArr.push(inputInit);

        localStorage.setItem("userInitials", JSON.stringify(initialsArr));
        inputBox.value = "";
        renderhighScore();
      }
    });
  }
}
var initialsArr = [];
var returnButton = document.createElement("button");
returnButton.setAttribute("id", "return-button");
var clearHighScore = document.createElement("button");
var initialList = document.createElement("ul");

function renderhighScore() {
  infoBox.innerHTML = "";
  var storedInitials = JSON.parse(localStorage.getItem("userInitials"));

  initialsArr = storedInitials;
  console.log(initialsArr);

  var highScore = document.createElement("p");
  highScore.textContent = "High Score";
  infoBox.append(highScore);

  highScore.append(initialList);

  for (var i = 0; i < initialsArr.length; i++) {
    var init = initialsArr[i];
    var listChoice = document.createElement("li");

    listChoice.textContent = init;
    listChoice.setAttribute("data-index", i);

  }
  initialList.appendChild(listChoice);

  returnButton.textContent = "Return";
    returnButton.style.marginRight = "20px";
    returnButton.style.fontSize = "20px";

    clearHighScore.textContent = "Clear HighScore";
    clearHighScore.style.fontSize = "20px";

    highScore.append(returnButton);
    highScore.append(clearHighScore);
  returnButton.addEventListener("click", function (event) {
    event.preventDefault();
    setInfo();
  });
}

function setInfo() {
  infoBox.innerHTML = "";

  var heading = document.createElement("h1");
  heading.innerHTML = "Coding Quiz Challenge";

  var para = document.createElement("p");
  para.innerHTML =
    "Try to answer the following code-related questions within the time limit." +
    "Keep in mind that incorrect answers will penalize your score time by 10 seconds.";
  infoBox.append(heading);
  infoBox.append(para);
  infoBox.append(startButton);
}

setInfo();

clearHighScore.addEventListener("click", function () {
  initialList.innerHTML = "";
});
