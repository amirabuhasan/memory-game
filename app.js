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
function clickCounter(counter,target){
  counter++ ;
  $(target).val(counter);
  console.log (counter);
}


function checkAnswer(item1,item2){
  //checks to see if name of the two li elements match
  if(item1 === item2){
    return true;
  }else{
    return false;
  };
};

//caluclate star rating
function checkScore(counter){
  if (counter > 8){
    $(".fa-star#3").css("color", "black");
  }
  if (counter > 18){
    $(".fa-star#2").css("color", "black");
  }
  if (counter > 28){
    $(".fa-star#1").css("color", "black");
  }
}

//for pop up modal upon winning



//function to start game
function playGame(){
  var modal = $(".modal");
  var modalOverlay = document.querySelector("#modal-overlay");
  var closeButton = document.querySelector("#close-button");
  var openButton = document.querySelector("#open-button");


  array = $(shuffle(array));
  $(shuffleCards(array));

  $(".deck").on("click", "li", function(){
    $(toggleCards(this));
    $(checkMatch(this));

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
        $(ifMatch());
      }else{
        setTimeout(function(){
          $(ifNotMatch());
        }  , 1000 );
      };
    };

    //checks to see if user has matched all the cards. If they have, launches congratulations modal and appends user's star rating and number of moves to it
    if (rightAnswers === 1){
      $(".modal").addClass("is-active");
      $("ul.stars").clone().appendTo( $( ".modal span" ))
      $(".modal p").append("You did it in " + counter + " moves");
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
