// Global variables
var startButton = document.querySelector(".startbtn");
var timeLabel = document.querySelector("#time");
var scoreLabel = document.querySelector("#score");
var questions = document.querySelector(".quiz_ques");
var infoBox = document.querySelector(".info_box");
let choiceBox = document.createElement("ul");
var answerBlock = document.querySelector("#showAnswer");
var inputBox = document.createElement("input");
var questionIndex = 0;
var questionsCorrect = 0;
var timeleft;
var timerInterval;
var initialsArr = [];

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
  answerBlock.setAttribute("style", "visibility:hidden");
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

//function to set answer
function userAnswer(event) {
  var element = event.target;
  if (element.matches("li")) {
    answerBlock.setAttribute("style", "visibility:visible");
    if (element.textContent === jsQuestions[questionIndex].answer) {
      answerBlock.textContent = "Correct!";
    } else {
      timeleft = timeleft - 10;
      answerBlock.textContent = "Incorrect!";
    }
  }
  questionIndex++;
  setTimeout(function () {
    if (questionIndex >= jsQuestions.length || timeleft==0) {
      score();
    } else {
      startQuiz(questionIndex);
    }
  }, 500);
}

//function to get score and submitting initails
function score() {
  questions.innerHTML = "";
  timeLabel.innerHTML = "";
  answerBlock.setAttribute("style", "visibility:hidden");

  if (timeleft >= 0) {
    var userScore = timeleft;
    clearInterval(timerInterval);

    //Setting the heading once quiz complete
    var heading = document.createElement("h1");
    heading.innerHTML = "All Done!.";
    infoBox.append(heading);

    //Setting the score to display
    var para = document.createElement("p");
    para.innerHTML = "Your score is: " + userScore;
    infoBox.append(para);

    //Setting the field label to enter initials and an input box
    var label = document.createElement("label");
    label.innerHTML = "Enter Initials: ";
    infoBox.append(label);

    inputBox.type = "text";
    label.append(inputBox);

    //Button to submit initials
    var submitInitials = document.createElement("button");
    submitInitials.innerHTML = " Submit";
    label.appendChild(submitInitials);

    //Button event to store initials in local storage
    submitInitials.addEventListener("click", function (event) {
      event.preventDefault();

      if (inputBox.value == "") {
        var errorMsg = document.createElement("p");
        errorMsg.innerHTML = "Please enter initials";
        label.append(errorMsg);
      } else {
        var inputInit = inputBox.value + " - " + timeleft;
        //Pushing initials and score into an array
        initialsArr.push(inputInit);
        //Stringfy the array
        localStorage.setItem("userInitials", JSON.stringify(initialsArr));
        inputBox.value = "";
        renderhighScore();
      }
    });
  }
}
//Return button
var returnButton = document.createElement("button");
returnButton.setAttribute("id", "return-button");
//Clear highScore button
var clearHighScore = document.createElement("button");
var initialList = document.createElement("ul");

//function to retrieve scores
function renderhighScore() {
  infoBox.innerHTML = "";
  //Creating array object from string
  var storedInitials = JSON.parse(localStorage.getItem("userInitials"));

  initialsArr = storedInitials;

  var highScore = document.createElement("p");
  highScore.textContent = "High Score";
  infoBox.append(highScore);

  highScore.append(initialList);

  for (var i = 0; i < initialsArr.length; i++) {
    var init = initialsArr[i];
    var listChoice = document.createElement("li");

    listChoice.textContent = init;
    listChoice.setAttribute("data-index", i);
    listChoice.setAttribute("style", "list-style:none");
  }
  initialList.appendChild(listChoice);

  //Return and higscore button css
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

//Function to set instructions
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

//method call to display instructions
setInfo();

//Button event to clear the high scores
clearHighScore.addEventListener("click", function () {
  initialList.innerHTML = "";
});