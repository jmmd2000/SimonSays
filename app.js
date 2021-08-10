   // James Doyle
   // 19496366
   // CS230 Assignment 2 - Simon Game
   // JavaScript Code
   // 3/3/2021  
    
   //localStorage.setItem("highScore", 0);
    var ok;
    // Retrieve the users high score, if there is one
    if (localStorage.getItem("highScore") === null) {
      document.getElementById("high").innerHTML = 0; 
    }else{
      document.getElementById("high").innerHTML = localStorage.getItem("highScore"); 
    }
    
    var score = 0;
  $("#start").click(function(){
  // This disables the user from clicking the button again
  $('#start').off('click');
  $("#start").css("cursor", "default");
  // Disables inputs before game begins
    preventInput();
  // Start the game
    setTimeout(start,3000);
  });


  function start(){
    // Changes the colour of the indicator light to green
    $("#indicator").css("background-color", "green");
    // Calls the colors function
    colors();
  }

  // This is the array that stores the generated sequence
  var sequence = [];

  // This is the array that stores the user guesses
  var user = new Array(100);

  function clearArray(){
    user.splice(0, user.length);
  }

  function colors(){
    // Generates a random number between 1 and 4 inclusive to represent the colours
    var color = Math.floor(Math.random() * 4) + 1;
    
      // Add the generated number to the sequence
      sequence.push(color);
    // Start the flashing
    colorLoop();
  }
  
  var i = 0;
  function colorLoop(){
    
    var delay;
    if(sequence.length < 5){
    delay = 800;
  }else if(sequence.length >= 5 && sequence.length < 9){
    delay = 600;
  }else if(sequence.length >= 9 && sequence.length < 13){
    delay = 400;
  }else if(sequence.length >= 13){
    delay = 300;
  }
  console.log(delay);
  console.log(sequence.length);
    setTimeout(function(){
      
      // Flashes the colors that appear in the sequence
      if(sequence[i] == 1){
        greenFlash();
      }else if(sequence[i] == 2){
        redFlash();
      }else if(sequence[i] == 3){
        yellowFlash();
      }else if(sequence[i] == 4){
        blueFlash();
      }
      i++;
      if(i<sequence.length){
        colorLoop();
      }else{
        i = 0;
        // Start the guessing
        guess();
      }
    },delay)
  }

  
  function guess(){
    var position = 0;
    // Allow clicking of the colour buttons
    allowInput();

    // Starts the 5 second countdown
    ok = true;
    startTimer();

    // Updates the guess array with green and checks
    // if the arrays are the same length which means the
    // guess is complete
    $("#green-circle").click(function(){
      // Resets the countdown
      clearInterval(timer); 
      // Flash the colour
      greenFlash();
      // Update the array
      user[position] = 1;
      // Compare this answer with the correct answer
      compare();
      // Update the position
      position++;
      // Start the next 5 second timer
      startTimer();
    });

    // Same as above but for red
    $("#red-circle").click(function(){
      clearInterval(timer); 
      redFlash();
      user[position] = 2;
      compare();
      position++;
      startTimer();
    });

    // Same as above but for yellow
    $("#yellow-circle").click(function(){
      clearInterval(timer); 
      yellowFlash();
      user[position] = 3;
      compare();
      position++;
      startTimer();
    });

    // Same as above but for blue
    $("#blue-circle").click(function(){
      clearInterval(timer); 
      blueFlash();
      user[position] = 4;
      compare();
      position++;
      startTimer();
    });

    
  }
  var pos = 0;
  var counter = 0;
  function compare(){
    // If the two inputs we are comparing are the same
    if(sequence[pos] == user[pos]){
      // Increment the counter
      counter++;
      // Increment the position
      pos++;
    }else{
      // Otherwise, GAME OVER!
      lose();
    }
    // If the user got all the inputs correct
    if(counter == sequence.length){
      // Reset the position and counter
      pos = 0;
      counter = 0;
      // Stop the user from adding more inputs
      preventInput();
      // Increment the score
      score++;
      // Change the score on the screen
      document.getElementById("current").innerHTML = score;
      // See if it is a high score
      highScore(score);
      // Clear the user guess array
      clearArray();
      // Reset the timer
      ok = false;
      clearInterval(timer);
      // Start the next round
      setTimeout(colors,2000);
    }
    
  }

  // Check if the score is the highest, if it is,
  // Update the high-score counter
  function highScore(x){
    var temp = document.getElementById("high").textContent;
    if(x > 0){
      if(x > temp){
        document.getElementById("high").innerHTML = x;
        localStorage.setItem("highScore", x);
      }
    }
    
  }

  // Allows the circles to be interacted with
  function allowInput(){
    $('#green-circle').on('click');
    $("#green-circle").css("cursor", "pointer");
    $('#red-circle').on('click');
    $("#red-circle").css("cursor", "pointer");
    $('#yellow-circle').on('click');
    $("#yellow-circle").css("cursor", "pointer");
    $('#blue-circle').on('click');
    $("#blue-circle").css("cursor", "pointer");
  }

  // Prevents the circles from being interacted with
  function preventInput(){
    $('#green-circle').off('click');
    $("#green-circle").css("cursor", "default");
    $('#red-circle').off('click');
    $("#red-circle").css("cursor", "default");
    $('#yellow-circle').off('click');
    $("#yellow-circle").css("cursor", "default");
    $('#blue-circle').off('click');
    $("#blue-circle").css("cursor", "default");
  }

  // How fast the flash is
  var delay = 300;
  
  // Handles the green flash
  function greenFlash() {
    document.getElementById("green-circle").style.backgroundColor="#0FF60F";
    setTimeout(greenOff,delay);
}

  function greenOff() {
    document.getElementById("green-circle").style.backgroundColor="#066303";
}

// Handles the red flash
function redFlash() {
    document.getElementById("red-circle").style.backgroundColor="#FF0000";
    setTimeout(redOff,delay);
}

function redOff() {
    document.getElementById("red-circle").style.backgroundColor="#6E0703";
}

// Handles the yellow flash
function yellowFlash() {
  document.getElementById("yellow-circle").style.backgroundColor="#D7FF00";
    setTimeout(yellowOff,delay);
}

function yellowOff() {
    document.getElementById("yellow-circle").style.backgroundColor="#877207";
}

// Handles the blue flash
function blueFlash() {
  document.getElementById("blue-circle").style.backgroundColor="#0059FF";
    setTimeout(blueOff,delay);
}
function blueOff() {
    document.getElementById("blue-circle").style.backgroundColor="#040733";
}

// The function for the loss condition
function lose(){
    greenFlash();
    redFlash();
    yellowFlash();
    blueFlash();

    setTimeout(greenFlash, 400);
    setTimeout(redFlash, 400);
    setTimeout(yellowFlash, 400);
    setTimeout(blueFlash, 400);

    setTimeout(greenFlash, 800);
    setTimeout(redFlash, 800);
    setTimeout(yellowFlash, 800);
    setTimeout(blueFlash, 800);

    setTimeout(greenFlash, 1200);
    setTimeout(redFlash, 1200);
    setTimeout(yellowFlash, 1200);
    setTimeout(blueFlash, 1200);

    setTimeout(greenFlash, 1600);
    setTimeout(redFlash, 1600);
    setTimeout(yellowFlash, 1600);
    setTimeout(blueFlash, 1600);

    // Refreshes the page to start a new game
    setTimeout(reload,1700);
  }
  // Reloads the page
  // Instead of manually resetting each element,
  // I can just reload the page to get it back to its
  // default state as the high score is kept using localStorage
  function reload(){
    location.reload();
  }

  // The method used for this timer was taken from https://stackoverflow.com/questions/40638402/javascript-countdown-timer-with-start-stop-buttons
  var s;
  var timer;
  function startTimer(){
    if(ok == true){
      timer = setInterval(countdown,1000);
    s = 5;
    }
    
  }

  function countdown(){
    --s;
    if(s == 0){
      clearInterval(timer);
      lose();
    }
  }