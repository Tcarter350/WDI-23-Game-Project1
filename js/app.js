console.log("hello");

document.addEventListener('DOMContentLoaded', function() {

  console.log('window.list:', window.list);

  var randomisedList = window.list; // do the randomisation here!
  var textToType = randomisedList.join("\n");
  var wordsElem = document.getElementById('words');
  var scoreElem = document.getElementById('score');
  var score = 0;
  var keysToIgnore = ["Shift", "Alt", "Meta", "CapsLock"];

  wordsElem.textContent = textToType;
  scoreElem.textContent = score;

  document.addEventListener('keyup', function(e) {
      var expectedKey = textToType[0];

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

 //      var count = 10;
 // var counter = setInterval(timer, 1000); //1000 will  run it every 1 second
 // function timer() {
 //   count=count-1;
 //   if (count <=5) {
 //     $("#timer").css("color", "red");
 //   }
 //   if (count === 0) {
 //     clearInterval(counter);
 //     alert("You're out of time");
 //     return;
 //   }
 //   $("#timer").text(count + " Seconds");
 // }
    });


});
