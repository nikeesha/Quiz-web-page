
const goToQuizButton = document.getElementById("go_to_quiz_btn");
const rulesbox = document.getElementById("rulesbox"); 
const startTimerButton = document.getElementById("start_timer_btn");
const quizbox = document.getElementById("quizbox");
const resultbox = document.getElementById("resultbox");
var submitButton = document.getElementById("submit_btn");
var showAnswers = document.getElementById("show_answers_btn");
const timeCount = document.querySelector(".timer .timersec");
const feedback = quizbox.getElementsByClassName("feedback");
const label = quizbox.getElementsByTagName("label");
const closeButton = document.getElementById("close_btn");
const closeAnswersButton = document.getElementById("closeAnswers_btn");


//go to quiz button
goToQuizButton.onclick = () => {
    rulesbox.classList.remove("hide");
}

//Start timer button 
startTimerButton.onclick = () => {
    rulesbox.classList.add("hide");
    quizbox.classList.remove("hide");
    startTimer();
	
}

showAnswers.onclick = () => {
	quizbox.classList.remove("hide");
	resultbox.classList.add("hide");
	submitButton.classList.add("hide");
	closeAnswersButton.classList.remove("hide");
}


 submitButton.onclick = () => {
	quizbox.classList.add("hide");
	resultbox.classList.remove("hide");
	showResults();
	stopTimer();
	freezeRadioBtns();
	 
 }
 
 closeButton.onclick = () => {
	 window.location.reload();
}

closeAnswersButton.onclick = () => {
	quizbox.classList.add("hide");
	resultbox.classList.remove("hide");
}

 
 function endQuiz() {
	quizbox.classList.add("hide");
	resultbox.classList.remove("hide");
	showResults();
 }
 
 function disableQuiz() {
  document.getElementsByClassName("radioBtn").disabled = true;
}

	  


var timevalue = 60;
let distanceInSeconds;
var interval = 0;
var showTime = resultbox.querySelector(".time_taken");

//Start Timer
function startTimer() {

	let countDownTime = new Date(new Date().getTime() + 60 * 1000).getTime();

    interval = setInterval(() => {

        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        distanceInSeconds = Math.round((countDownTime - now) / 1000);

        distanceInSeconds = distanceInSeconds === 0 ? 0 : distanceInSeconds; // conver -0 to 0

        // Time calculations for days, hours, minutes and seconds

        timeCount.innerHTML = distanceInSeconds;


        if (distanceInSeconds <= 0) {
            clearInterval(interval);
            endQuiz();
            
        }
		
    }, 1000);
	
}

function stopTimer() {
	clearInterval(interval);
}



function getRadioValue(radioArray) {

    for (let j = 0; j < radioArray.length; j++) {
        if (radioArray[j].checked) {
            return radioArray[j].value;
        }
    }
	return "";

}



var correctCount = 0;
var incorrectCount = 0;
var total=0;
var showMarks = resultbox.querySelector(".totalMarks");
var answerArray = [];
const correctAnswerArray = ["She’s My Kind of Girl", "1975", "Agnetha", "I'm a shoulder you can cry on", "Thank You For the Music", "angels", "Dancing Queen", "Money Money Money", "Tik Tok", "Voyage 2021"];
const background = document.getElementById("background")
const gifGreen = document.getElementById("gifGreen");
const gifYellow = document.getElementById("gifYellow");
const gifRed = document.getElementById("gifRed");





function showResults() {
	
	for (let i = 0; i < 10; i++) {
			
		answerArray = document.getElementsByClassName("answers")[i].getElementsByClassName("radioBtn");
		
		
		var userAnswer = getRadioValue(answerArray);
		console.log(userAnswer);
		
		var correctAnswer = correctAnswerArray[i];

		if (userAnswer == "correct") {
			correctCount++;
			document.getElementsByClassName("feedback")[i].innerHTML = 'Correct &checkmark;'
			document.getElementsByClassName("feedback")[i].classList.add("colorCorrect"); 
		} else {
			incorrectCount++;
			document.getElementsByClassName("feedback")[i].innerHTML = 'Incorrect &cross; &nbsp Correct Answer: ' + correctAnswer;
			document.getElementsByClassName("feedback")[i].classList.add("colorIncorrect");
		}
		
		
	}
	
	
	total = correctCount * 2 - incorrectCount;
	showMarks.innerHTML = "Your score = " + total;
	
	let timeTaken = 60 - distanceInSeconds;
	
	if (timeTaken == 60){
		showTime.innerHTML = "Time's up";
		
	}else {
		showTime.innerHTML = "Time spent = " + timeTaken + " seconds";
	}
	
	
	if (total > 13) {
		background.classList.add("colorGreen");
		gifGreen.classList.remove("hide");
		
	} else if (total > 7) {
		background.classList.add("colorYellow");
		gifYellow.classList.remove("hide");
		
	} else {
		background.classList.add("colorRed");
		gifRed.classList.remove("hide");
		
	}

	
}

buttonArray = document.getElementsByClassName("radioBtn");

function freezeRadioBtns(){
	
	for (let k = 0; k < buttonArray.length; k++){
		buttonArray[k].disabled = true;
	}
}
