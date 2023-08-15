var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

// starting the game
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

// detecting click and trigger handler function (user action)
$(".btn").click(
    function() {
        var userChosenColour = $(this).attr("id"); //this.id;
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        // call checkAnswer
        checkAnswer(userClickedPattern.length - 1);
    }
);


// when game starts, for the game to go on automatically (random colors)
function nextSequence() {
    // reser userClickedPattern for the next level
    userClickedPattern = [];

    level ++;
    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);

    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currColor) {
    $("#" + currColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currColor).removeClass("pressed");
    }, 100);
}

// check user input against color list
function checkAnswer(currLevel) {
    // if user got the most recent color right
    if (userClickedPattern[currLevel] === gamePattern[currLevel]) {
      console.log("success")
      // if user finished the whole pattern
      if (userClickedPattern.length === gamePattern.length) {
        //Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function() {
            nextSequence();
        }, 1000)
      }
    } else {
    //   console.log("wrong")
        playSound("wrong");

        // game over
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart")
        
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
  }

 
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}



