
function handleclick() {
    alert("I got clicked!");
}

//// detecting button press ////

// use loop to apply to all bottons (selelctorAll returns a list of items)
for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {
        //console.log(this); // "this" triggers event listener
        var btnInnerHtml = this.innerHTML;
        makeSound(btnInnerHtml);
        bottonAnimation(btnInnerHtml);
    });
}

//// detecting keypress ////

document.addEventListener("keydown", function(event){
    makeSound(event.key); //event.key = which key is pressed
    bottonAnimation(event.key);
});

function makeSound(key) {
    switch(key) {
        case "w": 
            var crash = new Audio('./sounds/crash.mp3');
            crash.play();
            break;
        case "a":
            var kick = new Audio('./sounds/kick.mp3');
            kick.play();
            break;
        case "s":
            var snare = new Audio('./sounds/snare.mp3');
            snare.play();
            break;
        case "d":
            var tom1 = new Audio('./sounds/tom-1.mp3');
            tom1.play();
            break;
        case "j":
            var tom2 = new Audio('./sounds/tom-2.mp3');
            tom2.play();
            break;
        case "k":
            var tom3 = new Audio('./sounds/tom-3.mp3');
            tom3.play();
            break;

        case "l":
            var tom4 = new Audio('./sounds/tom-4.mp3');
            tom4.play();
            break;
        default: console.log(btnInnerHtml);
    }
}

// adding animation when either key is pressed or clicked
function bottonAnimation(currKey) {

    var activeBotton = document.querySelector("." + currKey);
    activeBotton.classList.add("pressed");

    setTimeout(function() {
        activeBotton.classList.remove("pressed");
    }, 100) // function, millesecond

}