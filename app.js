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
}

var rightAnswers = 0;
function ifMatch() {
  $(".card.open").removeClass("show").addClass("match");
  $(".open-cards").empty();
  rightAnswers++;
  console.log( "I have been called " + rightAnswers + " times" );
  return rightAnswers;
}

//counts number of clicks and displays it on page
function clickCounter(){
  var counter = $("#moveBox").val();
  counter++ ;
  $("#moveBox").val(counter);
  console.log (counter);
}

//function gameWon(){


function checkAnswer(item1,item2){
  //checks to see if name of the two li elements match
  if(item1 === item2){
    return true;
  }else{
    return false;
  };
};

function startGame(){

  $(".deck").on("click", "li", function(){
    $(toggleCards(this));
    $(checkMatch(this));
    $(clickCounter());

    var checkList = $(".open-cards").find("li");

    //finds the class name of the li elements of open-cards
    var item1 = checkList.children().eq(0).attr("class");
    var item2 = checkList.children().eq(1).attr("class");

    if (checkList.length === 2){
      if (checkAnswer(item1, item2) === true){
        $(ifMatch());
      }else{
        setTimeout(function(){
          $(ifNotMatch());
        }  , 1000 );
      };
    };
    if (rightAnswers === 8){
      console.log("Congratulations!");
    };
  });
}

$(startGame())



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
