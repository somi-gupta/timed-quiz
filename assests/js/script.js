var startButton = document.querySelector(".startbtn");
var timeLabel = document.querySelector("#time");
var scoreLabel = document.querySelector("#score");
var questions = document.querySelector(".quiz_ques");
var quesOptions = document.querySelector("#option_list");
var infoBox = document.querySelector(".info_box");

startButton.addEventListener("click",startQuiz);

function startQuiz(){
    for (var i = 0; i<jsQuestions.length; i++){
    infoBox.setAttribute("class", "visibility: hidden");
    startButton.setAttribute("class", "visibility: hidden");
        console.log('Started'); 
        console.log(jsQuestions[i]);
        questions.textContent = jsQuestions[i];
    }
}        
// questions.setAttribute("class", inline);
