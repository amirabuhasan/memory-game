/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
//an array to store sequence of cards


var array = ["fa fa-diamond", "fa fa-paper-plane-o",
"fa fa-anchor", "fa fa-bolt", "fa fa-cube",
"fa fa-anchor", "fa fa-leaf", "fa fa-bicycle",
"fa fa-diamond", "fa fa-bomb", "fa fa-leaf",
"fa fa-bomb", "fa fa-bolt", "fa fa-bicycle",
"fa fa-paper-plane-o", "fa fa-cube"];

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//reassigns shuffled class names to .deck list.
function shuffleCards(array){
  var target = $(".deck").find("li");

  target.each(function() {
    var index = $(this).index();
    if (index < array.length) {
      $(this).children().addClass(array[index]);
    }
  });
}

//toggles between unopened and opened card when clicked
function toggleCards(element) {
  $(element).toggleClass("open show");
};

function checkMatch(element) {
  $(element).clone().appendTo(".open-cards");
}

function ifNotMatch() {
  $(".card.open").toggleClass("open show");
  $(".open-cards").empty();
  $(".card").removeClass("wrong");
}

function ifNotMatchAnimation(){
  $(".card.open.show").addClass("wrong");
  $(".card.open.show").addClass("animated " + "shake");
}

var rightAnswers = 0;
function ifMatch() {
  $(".card.open").removeClass("show").addClass("match");
  $(".open-cards").empty();
  rightAnswers++;
  console.log( "I have been called " + rightAnswers + " times" );
  return rightAnswers;
}

function ifMatchAnimation(){
  $(".card.open").addClass("animated " + "rubberBand");
}

function gameEndAnimation(){
  $(".deck").addClass("animated " + "bounce");
  $(".deck").addClass("animated " + "rubberBand");
}

//counts number of clicks and displays it on page
function clickCounter(counter,target){
  counter++ ;
  $(target).val(counter);
  console.log (counter);
}

//checks to see if name of the two li elements match
function checkAnswer(item1,item2){

  if(item1 === item2){
    return true;
  }else{
    return false;
  };
};

//calculate star rating
function checkScore(counter){
  if (counter > 18){
    $(".fa-star#3").css("color", "black");
  }
  if (counter > 28){
    $(".fa-star#2").css("color", "black");
  }

}

//for pop up modal upon winning


//timer function by Alejandro Mesa from https://codepen.io/alemesa/pen/xgNjWL?page=10
const startButton = document.querySelector('[data-action="start"]');
const stopButton = document.querySelector('[data-action="stop"]');
const resetButton = document.querySelector('[data-action="reset"]');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
let timerTime = 0;
let interval;
let isRunning = false;

function startTimer() {

	if (!isRunning) {
		isRunning = true;
		interval = setInterval(incrementTimer, 1000);
	}
}

function stopTimer() {
	isRunning = false;
	clearInterval(interval);
}

function resetTimer() {
	stopTimer();
	timerTime = 0;
	seconds.innerText = '00'
	minutes.innerText = '00'
}

function incrementTimer() {
	timerTime = timerTime + 1;
	const numOfMinutes = Math.floor(timerTime / 60);
	const numOfSeconds = timerTime % 60;
	seconds.innerText = numOfSeconds >= 10 ? numOfSeconds : "0" + numOfSeconds;
	minutes.innerText = numOfMinutes >= 10 ? numOfMinutes : "0" + numOfMinutes;
}

//disable click





//function to start game
function playGame(){

  var modal = $(".modal");

  array = $(shuffle(array));
  $(shuffleCards(array));

  $(".deck").on("click", "li", function(){

    $(toggleCards(this));
    $(checkMatch(this));
    $(startTimer());

    var counter = $("#moveBox").val();
    var target = "#moveBox";
    $(clickCounter(counter, target));
    $(checkScore(counter));

    var checkList = $(".open-cards").find("li");

    //finds the class name of the li elements of open-cards
    var item1 = checkList.children().eq(0).attr("class");
    var item2 = checkList.children().eq(1).attr("class");

    //checks if cards match. If they do, executes ifMatch(). Else, executes ifNotMatch()
    if (checkList.length === 2){
      if (checkAnswer(item1, item2) === true){
        $(ifMatchAnimation());
        $(ifMatch());
      }else{
        $(ifNotMatchAnimation());
        $(".deck").css({ "pointer-events": "none" });
        setTimeout(function(){
          $(".card.open.show").removeClass("animated " + "shake");
          $(".deck").css({ "pointer-events": "auto" });
          $(ifNotMatch());
        }  , 1000 );
      };
    };

    //checks to see if user has matched all the cards. If they have, launches congratulations modal and appends user's star rating and number of moves to it
    if (rightAnswers === 8){
      $(".modal").addClass("is-active");
      $("ul.stars").clone().appendTo( $( ".modal span#rating" ))
      $(".modal p").append("You did it in " + counter + " moves. Your time : ");
      $(stopTimer());
      $("span.timer").clone().appendTo( $( ".modal p" ))
      $(".deck").css({ "pointer-events": "none" });
      $(gameEndAnimation());


      //$("With " + counter).appendTo($(".modal-score"));
      console.log("Congratulations!");
    };
  });
  //restarts page
  $(".restart").on("click", ".fa-repeat", function(){
    location.reload();
  });

  $(".js-close").on("click", function(){
    location.reload();
  });

}

$(playGame())



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
