// Import modules
// This style allows for easy importing of modules and always knowing where the function is called from when calling
// This style is also used throughout.
import * as Calls from './api-calls.js'; 
import * as Utils from './utilities.js';
import * as Display from './display.js';
import * as Hint from './hint.js';

// This module brings together all the functionalities from the other modules when a user clicks a button

// Getting reference to HTML element and setting the onclick method to all elements
const startNewGameButton = document.getElementById("new-game");
const startButton = document.getElementById("start-game");
const higherButton = document.getElementById("higher");
const lowerButton = document.getElementById("lower");
const skipButton = document.getElementById("skip");
const hintButton = document.getElementById("hint");
const quitButton = document.getElementById("quit");
startNewGameButton.onclick = clickNewGame;
higherButton.onclick = clickHigher;
startButton.onclick = clickStart;
lowerButton.onclick = clickLower;
skipButton.onclick = clickSkip;
hintButton.onclick = clickHint;
quitButton.onclick = clickQuit;

// When the game is started, the deck in use is selected, and the card is drawn and displayed. The right content is also displayed.
async function clickStart() {
    await Calls.selectDeck();
    await Utils.drawAndDisplayCard();
    Display.displayInGameScreen();
}

// The higher and lower buttons both draw and display a card
// After this they get the new and old values of the relevant cards and compare these values to each other.
// Based on the player's guess, the game is either won or lost, and the score tracker is incremented or not.
// Here is also embedded the functionality of what happens when there are no more cards to be drawn. The player wins.
async function clickHigher() {
    await Utils.drawAndDisplayCard();
    let newValue = Utils.newValueGenerator();
    let oldValue = Utils.oldValueGenerator();
    if (Utils.isHigher(oldValue, newValue) != true) {
        Utils.loseGame();
    } else if ((Utils.isHigher(oldValue, newValue)) && (Utils.pileArray[Utils.pileArray.length - 1].remaining == 0)) {
        Utils.modifyScoreTracker(1);
        Utils.winGame();
    } else {
        Utils.modifyScoreTracker(1);
    }
}

async function clickLower() { 
    await Utils.drawAndDisplayCard();
    let newValue = Utils.newValueGenerator();
    let oldValue = Utils.oldValueGenerator();
    if (Utils.isLower(oldValue, newValue) != true) {
        Utils.loseGame();
    } else if ((Utils.isLower(oldValue, newValue)) && (Utils.pileArray[Utils.pileArray.length - 1].remaining == 0)) {
        Utils.modifyScoreTracker(1);
        Utils.winGame();
    } else {
        Utils.modifyScoreTracker(1);
    }
}

// The skip button draws and displays a new card, as well as increments the skip tracker in the utilities module.
// You can also win the game through skipping enough times.
// The catch is, that the skip tracker is taken into account in the win/lose game functions.
async function clickSkip() {
    await Utils.drawAndDisplayCard();
    Utils.modifySkipTracker(1);
    if (Utils.pileArray[Utils.pileArray.length - 1].remaining == 0) {
        Utils.winGame();
    }
}

// The hint button calls to the select deck function to ask which deck is currently in play.
// The function then calls to either probability checker in the hint module depending on which deck is chose.
async function clickHint() {
    let smallDeck = await Calls.selectDeck();
    if (smallDeck == true) {
        Hint.calculateProbabilitySmall();
    } else if (smallDeck == false) {
        Hint.calculateProbabilityBig();
    }
}

// Quitting the game simply shows how many correct guesses you had, based on the pile lenght and the skip tracker,
// and then displays the after game screen.
async function clickQuit() {
    let guesses = Utils.pileArray.length - 1 - Utils.skipTracker;
    alert(`You had ${guesses} correct guesses before quitting. Please play again soon!`);
    Display.afterGameScreen(); // Initiate after game screen with
}

// When a new game is started, all counters and trackers and piles etc are reset to their empty or default values.
// Calls are then made to the api to select the deck to play with, reset it, shuffle it, and then draw and display a new card
// Finally the in game screen is displayed.
async function clickNewGame() {
    Utils.resetPileArray(); // Empty the pile array for the new game
    Utils.resetScoreTracker(); // Reset score tracker
    Utils.resetSkipTracker(); // Reset skip tracker
    Hint.resetHintArrays();
    await Calls.selectDeck();
    await Calls.resetDeck(); // Reset and shuffle the old deck to be used in new game
    await Calls.shuffleCards();
    await Utils.drawAndDisplayCard();
    Display.displayInGameScreen();
}