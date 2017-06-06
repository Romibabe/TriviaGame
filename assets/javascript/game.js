var questions = [{
    question: "What was the first animated film released by Walt Disney",
    choices: ["Fantasia", "Snow White and the Seven Dwarfs", "Cindrella", "Alice in Wanderland"],
    correctAnswer: 2
}, {
    question: "What time did Cindrella's godmother say the spell would break as Cindrella was going to the ball?",
    choices: ["Before the sun goes down", "Midnight", "Noon", "As soon as morning came"],
    correctAnswer: 2
}, {
    question: "How many sisters does Ariel have?",
    choices: ["Eight", "Six", "No sisters- she's an only merchild", "Seven"],
    correctAnswer: 2
}, {
    question: "Which Disney character fell down a rabbit hole?",
    choices: ["Aladdin", "Peter Pan", "Alice", "Anna"],
    correctAnswer: 3
}, {
    question: "Where does the movie Lilo and Stitch  take place?",
    choices: ["The Bahamas", "Hawaii", "California", "Puerto Rico"],
    correctAnswer: 2
}];
  
var questionCounter = 0; //Tracks question number
var selections = []; //Array containing user choices
var quiz = $('#quiz'); //Quiz div object
  
// Display first question
displayNext();
timer();
$('#done').hide();

// next button
$('#next').on('click', function () {
  choose();
  

  if (isNaN(selections[questionCounter])) {
    alert('Please make a selection!');
  } 
  else {
    questionCounter++;
    displayNext();
  }
});
  
//sets the timer
function timer(){
  t = setTimeout(timeUp, 1000 * 60);
}

function StopFunction() {
  clearTimeout(t);
}

function timeUp(){
  $('#done').show();
  $('#start').show();
  $('#next').hide(); 
  $('#quiz').hide();
  $('#time').hide();
  StopFunction();
  StopFunctionTwo(); 
}

var seconds;
var temp;

function countdown() {
  seconds = document.getElementById('countdown').innerHTML;
  seconds = parseInt(seconds, 10);

  if (seconds == 1) {
    temp = document.getElementById('countdown');
    return;
  }

  seconds--;
  temp = document.getElementById('countdown');
  temp.innerHTML = seconds;
  setTimeoutMyTimer = setTimeout(countdown, 1000);
 
}
 
countdown();

function StopFunctionTwo() {
    clearTimeout(setTimeoutMyTimer);
}
  // Resets game when the 'Start Over' button is clicked
$('#start').on('click', function () {
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
    $('#next').show();    
    $('#done').hide();
    $('#time').show();
    timer();
    document.getElementById("countdown").innerHTML = 60;
    countdown();
});
  
  
// Creates the div with the questions and  choices
function makeQuiz(index) {
  var quizDiv = $('<div>', {
    id: 'question'
  });
  
  var question = $('<p>').append(questions[index].question);
  quizDiv.append(question);
  
  var radioButtons = createRadios(index);
  quizDiv.append(radioButtons);
  return quizDiv;
};
  
  // Creates a list of the answer choices as multi choice selectors
function createRadios(index) {
  var radioList = $('<ul>');
  var input = '';// creating space where the choices will go
  for (var i = 0; i < questions[index].choices.length; i++) {
    var item = $('<li>'); //creating each list item
    input = '<input type="radio" name="answer" value=' + i + ' />';
    input += questions[index].choices[i]; //input is equal to input plus questions[index].choices.[i]
    item.append(input); //adding the list item to the space you created on line 145
    radioList.append(item); //adding it to the radio list
  }
  return radioList;
}
  
// Reads the user selection and pushes the value to an array
function choose() {
  selections[questionCounter] = +$('input[name="answer"]:checked').val();
}
  
// Displays next requested element
function displayNext() {
  quiz.fadeOut(function() {
    $('#question').remove();
    if(questionCounter < questions.length){
      var nextQuestion = makeQuiz(questionCounter);
      quiz.append(nextQuestion).show();
      if (!(isNaN(selections[questionCounter]))) {
        $('input[value='+selections[questionCounter]+']').prop('checked', true);
      }
      else if(questionCounter === 0){
        $('#next').show();
      }
    }
    else {
    var scoreElem = displayScore();
    quiz.append(scoreElem).fadeIn();
    $('#next').hide();
    $('#start').show();
    }
  });
};
  
  // Computes score and returns a paragraph element to be displayed
function displayScore() {
  clearTimeout(t);
  $('#time').hide();
  StopFunctionTwo();
  StopFunction();
  var score = $('<p>',{id: 'question'});
  var numCorrect = 0;
  for (var i = 0; i < selections.length; i++) {
    if (selections[i] === questions[i].correctAnswer) {
      numCorrect++;
    }
  }
  
  score.append('You got ' + numCorrect + ' out of ' + questions.length + ' questions right!!!');
  return score;
  
};
