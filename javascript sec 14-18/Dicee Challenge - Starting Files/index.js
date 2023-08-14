/*
Inside index.js, create a new variable called randomNumber1 then set 
the value of this variable to a random number between 1 and 6. 
Test it out in the console to make sure it works as expected.
 */

var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;

var imgSrc1 = "./images/dice" + randomNumber1 + ".png";
var imgSrc2 = "./images/dice" + randomNumber2 + ".png";

// Change the dice images to random
// remember to get the elem!!
var diceImg1 = document.getElementsByClassName("img1")[0];
diceImg1.setAttribute("src", imgSrc1);

var diceImg2 = document.getElementsByClassName("img2")[0];
diceImg2.setAttribute("src", imgSrc2);


// change the heading
var h1 = document.querySelector(".container h1");

if (randomNumber1 > randomNumber2) {
    h1.innerHTML = "Player 1 Wins!";
} else if (randomNumber1 < randomNumber2){
    h1.innerHTML = "Player 2 Wins!";
} else {
    h1.innerHTML = "Draw!";
}

