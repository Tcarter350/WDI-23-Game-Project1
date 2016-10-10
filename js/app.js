console.log("hello");

document.addEventListener('DOMContentLoaded', function() {

  console.log('window.list:', window.list);

  var randomisedList = shuffle(window.list);
  var textToType = randomisedList.join("\n");
  var wordsElem = document.getElementById('words');
  var scoreElem = document.getElementById('score');
  var score = 0;
  var keysToIgnore = ["Shift", "Alt", "Meta", "CapsLock"];

  wordsElem.textContent = textToType;
  scoreElem.textContent = score;

  var count = 5;
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
      alert("You're out of time! Game will restart when you press Ok.");
      location.reload();
    }
  }

  $("#dialog").dialog({
    close: function(event, ui) {
      console.log("dialog closed");
      counter = setInterval(timer, 1000);
    }
  });

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
        score += 10;
      } else {
        console.log("Incorrect key pressed");
        score -= 10;
      }
      scoreElem.textContent = score;


    });


});
