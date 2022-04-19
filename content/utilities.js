// The utilities module collects all the functions that are created to do certain tasks for other functions.
// There are for example value converters etc that are used to aid the functioning of the other functions.
// The only such functions that are not found here are those related to the hint functionality. They are all in the hint module.
// This module could probably be broken down into much better and smaller modules, but there was no time for that.

import * as Calls from './api-calls.js';
import * as Display from './display.js';
import * as Hint from './hint.js';

// These first lines are essentially trackers and their modifiers.
// The modifying functions are needed as ES6 modules set any variables as constants when exported, and can therefore not be
// modified without doing it via a dedicated function. In this way, modules provide closures for applications.
export let pileArray = [];
export let scoreTracker = 0;
export let skipTracker = 0;
export function modifyPileArray(value) { pileArray = value; }
export function modifyScoreTracker(value) { scoreTracker = scoreTracker + value; }
export function modifySkipTracker(value) { skipTracker = skipTracker + value; }
export function resetPileArray() { pileArray = []; }
export function resetScoreTracker() { scoreTracker = 0; }
export function resetSkipTracker() { skipTracker = 0; }


// This function is at the core of the entire game, as it is called each time a card is to be drawn.
// It calls the API for a card, adds it to the pile array, and then displays said card on the screen.
// On the bottom there is also the gimmicky hint functionality that is explained in the hint module comments.
export async function drawAndDisplayCard() {
    let card = await Calls.drawCard();
    addToPile(card);
    displayCard();

    let smallDeck = Calls.selectDeck; // This only calls for the return value, not the entire function
    if (smallDeck == true) {
        Hint.removeFromHintArraySmall();
    } else if (smallDeck == false) {
        Hint.removeFromHintArrayBig();
    }
}

// These two functions access the pile array to return values of the last and second to last cards drawn. 
// These are then used in the main logic of the higher and lower buttons.
export function newValueGenerator() {
    let newValue = pileArray[pileArray.length - 1].cards[0].value;
    let convertedNewValue = valueConverter(newValue);
    return convertedNewValue;
}
export function oldValueGenerator() {
    let oldValue = pileArray[pileArray.length - 2].cards[0].value;
    let convertedOldValue = valueConverter(oldValue);
    return convertedOldValue;
}

// This value converter makes sure aces, jacks, queens, and kings all have their own numerical values.
// The returned value is parsed into an int to make sure the returned value is a number.
export function valueConverter(value) {
    if (value == "ACE") {
        return 1;
    } else if (value == "JACK") {
        return 11;
    } else if (value == "QUEEN") {
        return 12;
    } else if (value == "KING") {
        return 13;
    } else {
        return parseInt(value);
    }
}

// These functions are also used in the higher and lower button logic.
export function isHigher(oldValue, newValue) {
    return oldValue < newValue;
}
export function isLower(oldValue, newValue) {
    return oldValue > newValue;
}

// Checking for highscores is done by accessing the current highscore element with the id "score",
// and then comparing it to the value stored in the scoretracker.
// If there is a new highscore, the value is set into localstorage, which is then also set to be the new score.innerHTML value.
export function checkForHighScore() {
    let score = document.getElementById("score"); // This is the DOM reference

    if (scoreTracker > localStorage.getItem("Highscore") || localStorage.getItem("Highscore") === null) {
        localStorage.setItem("Highscore", `${scoreTracker}`);
    }
    score.innerHTML = localStorage.getItem("Highscore");
}


// Add to pile is simple but potent. The pile is used everywhere around the application.
export function addToPile(card) {
    pileArray.push(card);
}

// The current card is displayed by creating a new img variable and giving it a source by accessing the image attribute of the card object.
// This image is then appended to the card div in the DOM.
export function displayCard() {
    let img = document.createElement("img");
    img.src = pileArray[pileArray.length - 1].cards[0].image;
    let div = document.getElementById("card");
    document.getElementById("card").innerHTML = ""; // Empty the div before adding a new one.
    div.appendChild(img);
}

// Win and lose game functions simply alerting the player with the result if they lose or win.
// Here the skip tracker is also taken into account.
export function winGame() {
    let guesses = pileArray.length - 1 - skipTracker;
    let lastCard = newValueGenerator();
    alert(`The last card was a ${lastCard}. YOU WON THE GAME WITH ${guesses} CORRECT GUESSES!`);
    Display.afterGameScreen(); // Initiate after game screen with
}
export function loseGame() {
    let guesses = pileArray.length - 2 - skipTracker;
    let lastCard = newValueGenerator();
    alert(`The last card was a ${lastCard}. You lost but had ${guesses} correct guesses.`);
    Display.afterGameScreen(); 
}
