let cards = [];
let sum = 0;
let cash = 20;

let isAlive = false;
let hasBlackjack = false;
let openRulesBoolean = true;

let gameBox = document.querySelector(".game-container");
let cardsBox = document.querySelector(".game-container__cards");
let sumBox = document.querySelector(".game-container__sum");
let messageBox = document.querySelector(".game-message");
let cashBox = document.querySelector(".game-container__cash");
let startGameButton = document.querySelector(".buttons-container__button--start-game");
let nextRoundButton = document.querySelector(".buttons-container__button--next-round")
let newCardButton = document.querySelector(".buttons-container__button--new-card");
let resetGameButton = document.querySelector(".buttons-container__button--reset-game");
let rulesButton = document.querySelector(".buttons-container__button--open-rules");

function randomCard() {
    let card = Math.floor(Math.random() * 13) + 1;
    if (card > 10) return 10
    else if (card === 1) return 11
    else return card
}


function startGame() {
    gameBox.classList.toggle('game-container--show');
    newCardButton.classList.toggle('buttons-container__button--show');
    resetGameButton.classList.toggle('buttons-container__button--show');
    nextRoundButton.classList.toggle('buttons-container__button--show');
    startGameButton.classList.remove('buttons-container__button--show');
    nextRound();
}

function nextRound() {
    if (!isAlive && cash != 0) {
        isAlive = true;
        hasBlackjack = false;
        let firstCard = randomCard();
        let secondCard = randomCard();
        cards = [firstCard, secondCard];
        sum = firstCard + secondCard;
        cashBox.classList.remove('game-container__cash--red');
        cashBox.classList.remove('game-container__cash--green');
        renderGame();
    }
}
function renderGame() {

    // CONTENT
    cardsBox.textContent = "Cards: ";
    cards.forEach(function (card) {
        cardsBox.textContent += `${card} `;
    });
    sumBox.textContent = `Sum: ${sum}`;
    cashBox.textContent = `Cash: $${cash}`;

    // MESSAGES
    if (sum === 0) messageBox.textContent = "Let's start the game!"
    else if (sum === 20) messageBox.textContent = `You are missing 1 point. Good luck! Draw a new card.`
    else if(sum < 21 && sum != 20) messageBox.textContent = `You are missing ${21 - sum} points. Draw a new card.`
    else if (sum === 21) {
        cash += 10;
        hasBlackjack = true;
        isAlive = false;
        messageBox.textContent = "You have 21 points! You've got a blackjack!";
        cashBox.textContent = `Cash: $${cash}`;
        cashBox.classList.toggle('game-container__cash--green');
    }

    else if (sum > 21) {
        cash -= 5
        isAlive = false
        messageBox.textContent = `You've lost! You had too many points. Try again in the next round.`
        cashBox.textContent = `Cash: $${cash}`;
        cashBox.classList.toggle('game-container__cash--red');
    }

    if (cash === 0) {
        messageBox.textContent = "You're out of the game!";
        gameBox.classList.remove('.game-container--show');
        newCardButton.classList.remove('buttons-container__button--show');
        nextRoundButton.classList.remove('buttons-container__button--show');
    }

}

function newCard() {
    if (isAlive === true && hasBlackjack === false) {
        let newcard = randomCard();
        sum += newcard;
        cards.push(newcard);
        renderGame();
    }
}

function resetGame() {
    sum = 0;
    cash = 20;
    cards = [];
    isAlive = false;
    hasBlackjack = false;

    messageBox.textContent = "Let's start the game!";

    gameBox.classList.remove('game-container--show');
    newCardButton.classList.remove('buttons-container__button--show');
    resetGameButton.classList.remove('buttons-container__button--show');
    nextRoundButton.classList.remove('buttons-container__button--show');
    startGameButton.classList.toggle('buttons-container__button--show');
    renderGame();
}

let openRules = () => {
    let rulesBox = document.querySelector(".rules-container");

    rulesBox.classList.toggle('rules-container--show');

    if (openRulesBoolean) rulesButton.textContent = 'Close rules'
    else rulesButton.textContent = 'Open rules'
    openRulesBoolean = !openRulesBoolean
}


startGameButton.addEventListener('click', startGame);
nextRoundButton.addEventListener('click', nextRound);
newCardButton.addEventListener('click', newCard);
resetGameButton.addEventListener('click', resetGame);
rulesButton.addEventListener('click', openRules);


