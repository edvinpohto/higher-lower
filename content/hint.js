// The hint mechanism is achieved by first setting two simple arrays representing the two decks, and then making
// changes to these arrays depending on the users actions. This way a simulation of the deck's state can be achieved
// without using a fancy mathematical formula to calculate probabilities with many dependencies.

import * as Utils from './utilities.js'

export let HintArraySmall = [1,2,3,4,5,6,7,8,9,10,11,12,13];
export let HintArrayBig = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13];

// This reset function is called if the user presses new game.
export function resetHintArrays() {
    HintArraySmall = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    HintArrayBig = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13];
}

// This function gets the value of the last card drawn, which is then used in the other functions below
export function getValue() {
    let value = Utils.pileArray[Utils.pileArray.length - 1].cards[0].value;
    let convertedValue = Utils.valueConverter(value);
    return convertedValue;
}

// These two remove functions are called depending on which deck is in use at the time. 
// The functions are called in the drawAndDisplayCard function in the utilities module, and is one of the few
// gimmicky solutions in the code. Essentially this emulates the deck being drawn from and one of the functions is therefore
// always called when a card is drawn.
// What they do is use splice to update the array in question by removing one instance of the drawn card.
export function removeFromHintArraySmall() {
    const index = HintArraySmall.indexOf(getValue());
    if (index > -1) {
        HintArraySmall.splice(index, 1); // 2nd parameter means remove one item only
    }
}
export function removeFromHintArrayBig() {
    const index = HintArrayBig.indexOf(getValue());
    if (index > -1) {
        HintArrayBig.splice(index, 1);
    }
}

// The countCards functions calculate how many cards there are left in their respective arrays that are equal to or higher
// than the card that has just been drawn.
// This count is then returned and used in the probability calculators.
export function countCardsSmall() {
    let count = 0;
    for (let i = 0; i < HintArraySmall.length + 1; i++) {
        if (HintArraySmall[i] >= getValue()) {
            count++;
        }
    }
    return count;
}
export function countCardsBig() {
    let count = 0;
    for (let i = 0; i < HintArrayBig.length + 1; i++) {
        if (HintArrayBig[i] >= getValue()) {
            count++;
        }
    }
    return count;
}

// These probability calculators first call the right card counter to find out how many numbers the given array has left
// equal to or above the current card's value.
// The probability of a higher card being drawn is then calculated by dividing the number of cards above or equal to, divided
// by the total number of cards left. 
// The probabilities are then displayed to the user with an accuracy of one decimal point.
// These functions are the ones called when you press the hint button.
export function calculateProbabilitySmall() {
    let cardsAbove = countCardsSmall();
    let probHigher = (cardsAbove / HintArraySmall.length) * 100;
    let probLower = 100 - probHigher;
    alert(`The probability of a higher card is ${probHigher.toFixed(1)}% and the probability of a lower card is ${probLower.toFixed(1)}%`)
}
export function calculateProbabilityBig() {
    let cardsAbove = countCardsBig();
    let probHigher = (cardsAbove / HintArrayBig.length) * 100;
    let probLower = 100 - probHigher;
    alert(`The probability of a higher card is ${probHigher.toFixed(1)}% and the probability of a lower card is ${probLower.toFixed(1)}%`)
}




