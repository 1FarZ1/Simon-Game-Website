


let gameStarted = false;
let level = 1;
let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let chosenColor;


$(".btn") .on("click", function(event) {
  if(gameStarted){
    Gaming(event);
  }
  
  
});


$(document).on("keypress", function(event) {
 
  !(gameStarted) ? StartGame() : console.log("Game Already Started");
 
});



function StartGame() {
  gameStarted=true;
  $("#level-title1").text("The Simon Game Started");
  $("#level-title2").text("Level " + level);
  Level(); 
}



function Gaming(event) {
    
    $(event.target).addClass("pressed");
    setTimeout(function() {
      $(event.target).removeClass("pressed");
    }, 100);

    
    let userChosenColor=event.target.id;
    userClickedPattern.push(userChosenColor);
    Anim(userChosenColor);
    playSound(userChosenColor);
 
      checkAnswer();
 
}


async function checkAnswer() {
  if(userClickedPattern[userClickedPattern.length-1] === gamePattern[userClickedPattern.length-1]) {
    if(userClickedPattern.length === gamePattern.length) {
    userClickedPattern = [];
    level++;
    $("#level-title2").text("Level " + level);
    await sleep(200);
    Level();
  }
}
  else {
    startOver();
  }

}




//all correct
function startOver() {
  $("#level-title1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
}






// i guess all correct
async function  Level () {
  Ai();
  for(let i=0;i<gamePattern.length;i++) {
    console.log(gamePattern[i]);
    Anim(gamePattern[i]);
    playSound(gamePattern[i]);
    await sleep(700);
  }
}


// All Correct
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// All Correct
function Anim(Color) {
  $("#" + Color).fadeIn(100).fadeOut(100).fadeIn(100);
}


// All Correct
function Ai() {
  let chosenColor=buttonColours[Math.floor(Math.random()*4)];
  gamePattern.push(chosenColor);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}