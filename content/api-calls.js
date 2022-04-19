// The api-calls module has all the different functions that speak with the API used.

// The chosen deck ID is always generated at first, and is then used in the url addresses down below to make the right calls.
let chosenDeckId = "";

// Here the select deck function chooses to get the full or partial deck depending on whether the "Play with small deck"
// tickbox is checked or not. As there is only two options, a boolean can be used.
// This is admittedly not the best design but for some reason .checked did not work. I think I showed that to you too.
// The function also returns whether the tickbox is checked or not to be used elsewhere if needed.
export async function selectDeck() {
    const smallDeckCheckbox = document.querySelector("input[name=deckchoice]");
    if (smallDeckCheckbox.checked == true) {
        let deck = await getShuffledDeckPartial();
        let deckId = deck.deck_id;
        chosenDeckId = deckId;
    } 
    if (smallDeckCheckbox.checked == false) {
        let deck = await getShuffledDeckFull();
        let deckId = deck.deck_id;
        chosenDeckId = deckId;
    }
    return smallDeckCheckbox.checked;
}

// The below functions are all quite self explanatory, as they simply make a call to the api with the right url address
// and the right deck ID implemented. 
// They then return the data to be used in the future and in different places.
export async function getShuffledDeckPartial() {
    return fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH,QH,KH")
    // return fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?cards=0H")
    .then(response => response.json())
    .then(dat  => {
        return dat;
    })
    .catch(err => console.log("error", err));
}

export async function getShuffledDeckFull() {
    return fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(response => response.json())
    .then(dat  => {
        return dat;
    })
    .catch(err => console.log("error", err));
}

export async function drawCard() {
    return fetch(`https://deckofcardsapi.com/api/deck/${chosenDeckId}/draw/?count=1`)
    .then(response => response.json())
    .then(dat  => {
            return dat;
    })
    .catch(err => console.log("error", err));
}

export async function resetDeck() {
    return fetch(`https://deckofcardsapi.com/api/deck/${chosenDeckId}/return/`)
    .then(response => response.json())
    .then(dat  => {
        return dat;
    })
    .catch(err => console.log("error", err));
}

export async function shuffleCards() {
    return fetch(`https://deckofcardsapi.com/api/deck/${chosenDeckId}/shuffle/?remaining=true`)
    .then(response => response.json())
    .then(dat  => {
        return dat;
    })
    .catch(err => console.log("error", err));
}