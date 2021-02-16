var startButton = document.querySelector(".startbtn");
var timeLabel = document.querySelector("#time");
var scoreLabel = document.querySelector("#score");
var questions = document.querySelector(".quiz_ques");
var quesOptions = document.querySelector("#option_list");
var infoBox = document.querySelector("#info_box");

startButton.addEventListener("click",startQuiz);

function startQuiz(){
    for (var i = 0; i<jsQuestions.length; i++){
        console.log('Started');
        // questions.setAttribute("class", inline);
        questions.remove('hide');
    }
}