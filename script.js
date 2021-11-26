"use strict";

// getElementById does not require # in parenthesis.
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
let current0El = document.getElementById("current--0");
let current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting conditions:
score0El.textContent = 0; // Set the initial scores to 0
score1El.textContent = 0;
diceEl.classList.add("hidden"); // Set the dice image as 0

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let canHold = true;

// Function to swtich player when rolled dice is 1
const switchPlayer = function () {
  // Switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  canHold = true;
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    canHold = true;
    // 3. If the dice is 1, switch to next player
    if (dice !== 1) {
      // Add dice to current score.
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      canHold = true;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    score[activePlayer] += currentScore;
    // console.log(score[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    canHold = false;
    // 2. check if player's score is  >= 100
    if (score[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// TODO: Implement a logic that hold cannot be clicked twice
// canHold = true when hold has not been clicked.
// canHold = false when hold has been clicked once.
// cannot press hold when hold has been clicked once.
// canHold is reset to true when roll dice is clicked at least once.
// canHold = true when roll dice is clicked.

// Implemenet new button logic to set the game
btnNew.addEventListener("click", function () {
  console.log("new game");
  // 1. Set active player to player 1
  activePlayer = 0;
  // 2. Set current score and total score to 0
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  // 3. Reset active player to player 1
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  // 4. Remove any winner status
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  // 5. Hide the dice image
  diceEl.classList.add("hidden");
  playing = true;
});
