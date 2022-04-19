import * as Utils from './utilities.js';

// This monstrosity of a page has two straight forward functions. They both first selext all the right elements by their id
// and then set them to be either displayed or hidden on the page.
// This is how the game screens are controlled.
// The after game screen also checks for any possible new highscores whenever called.

export function displayInGameScreen() {
    let postGameMessage = document.getElementById("post-game-message");
    let startGame = document.getElementById("start-game");
    let deckChoice = document.getElementById("decks");
    let newGame = document.getElementById("new-game");
    let message = document.getElementById("message");
    let cardImage = document.getElementById("card");
    let higher = document.getElementById("higher");
    let lower = document.getElementById("lower");
    let skip = document.getElementById("skip");
    let hint = document.getElementById("hint");
    let quit = document.getElementById("quit");
    postGameMessage.style.display = "none";
    cardImage.style.display = "block";
    deckChoice.style.display = "none";
    startGame.style.display = "none";
    newGame.style.display = "none";
    message.style.display = "none";
    higher.style.display = "block";
    lower.style.display = "block"; 
    skip.style.display = "block"; 
    hint.style.display = "block"; 
    quit.style.display = "block"; 
}

export function afterGameScreen() {
    Utils.checkForHighScore();
    let postGameMessage = document.getElementById("post-game-message");
    let highscore = document.getElementById("highscore");
    let deckChoice = document.getElementById("decks");
    let newGame = document.getElementById("new-game");
    let higher = document.getElementById("higher");
    let lower = document.getElementById("lower");
    let skip = document.getElementById("skip");
    let hint = document.getElementById("hint");
    let quit = document.getElementById("quit");
    let card = document.getElementById("card");
    postGameMessage.style.display = "block";
    deckChoice.style.display = "block";
    highscore.style.display = "block";
    newGame.style.display = "block";
    higher.style.display = "none";
    lower.style.display = "none"; 
    card.style.display = "none";
    skip.style.display = "none";
    hint.style.display = "none";
    quit.style.display = "none"; 
}