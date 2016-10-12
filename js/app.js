console.log("hello");

document.addEventListener('DOMContentLoaded', function() {

  $('#dialog').dialog({
  	height: 510,
  	width: 570,
  	modal: true
  });
  // console.log('window.list:', window.list);

  var randomisedList = shuffle(window.list);
  var textToType = randomisedList.join("\n");
  var wordsElem = document.getElementById('words');
  var scoreElem = document.getElementById('score');
  var score = 0;
  var keysToIgnore = ["Shift", "Alt", "Meta", "CapsLock"];
  var playAgain;
  wordsElem.textContent = textToType;
  scoreElem.textContent = score;


  var count = 45;
  var counter;
  var gameOver = false;

  function timer() {
    count--;
    console.log('timer:', count);
    $("#timer").text(count);

    if (count <= 5) {
      $("#timer").css("color", "red");
    }

    if (count === 0) {
      clearInterval(counter);
      gameOver = true;
      console.log("You're out of time!");
      myFunction();
      // location.reload();
    }
  }

  $("#dialog").dialog({
    close: function(event, ui) {
      console.log("dialog closed");
      counter = setInterval(timer, 1000);
    }
  });

// Play again?
  function myFunction() {
    // if score is low do this
    if (score === 165 || score < 165) {

      if (confirm("Oh no! you only scored " + score + " points.\nRemember, points mean prizes\nWould you like to play again?") === true) {
        playAgain = true;
        resetGame();
      } else {
        playAgain = false;
      }

    } else {
      if (confirm("Yowzer! Have you done this before?! You scored " + score + " points.\n\nYes, there's prizes in store and much much more when you play…\n\nSUPERMARKET SWEEP!\n\nWould You like to play again?") === true) {
        playAgain = true;
        resetGame();
      } else {
        playAgain = false;
      }
    }
  }

//// Reset the game
// score Done!!!
// Shuffle the array Done!!
// Change the words display Done!!!
// Dialog box appears
  function resetGame() {
    gameOver = false;
    score = 0;
    scoreElem.textContent = score;
    console.log("reset score", score);

    randomisedList = shuffle(window.list);

    console.log("List: ", randomisedList);

    textToType = randomisedList.join("\n");
    wordsElem.textContent = textToType;
    count = 45;
    counter = setInterval(timer, 1000);

  }


  // source: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  document.addEventListener('keyup', function(e) {
    // console.log("Key pressed");
      var expectedKey = textToType[0];

      if (gameOver) {
        return;
      }

      if (expectedKey === "\n") {
        expectedKey = "Enter";
      }

      console.log(e.key, textToType[0]);
      if(keysToIgnore.indexOf(e.key) !== -1 || textToType.length === 0) return;

      if(e.key === expectedKey) {
        console.log("Correct key pressed");
        textToType = textToType.slice(1);
        wordsElem.textContent = textToType;
        score += 1;
      } else {
        console.log("Incorrect key pressed");
        score -= 1;
      }
      scoreElem.textContent = score;

    });
// End
});
