'use strict';
// Selecting Elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); //selecting using class is '.' using an ID is '#'
const score1El = document.getElementById('score--1'); // this have already automatically selected the ID now there is no need to use #
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
// const hidEl = document.querySelector('.hid'); // my stuff
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions
//===================================================================================
// score0El.textContent = 0; // changed the number to '0'
// score1El.textContent = 0; //
// diceEl.classList.add('hidden'); // removing the dice

// const scores = [0, 0]; // the figures under PLAYER 1 and PLAYER 2
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;
//===================================================================================

let scores, currentScore, activePlayer, playing;
const init = function () {
  // score0El.textContent = 0; // changed the number to '0'
  // score1El.textContent = 0; // removing this because theyre down there

  scores = [0, 0]; // the figures under PLAYER 1 and PLAYER 2
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden'); // removing the dice
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active'); // we adding in player 0 because it had the active class initially in begin then it was toggled now added back again
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  // this function is created for the ELSE block for number 3
  // creating this function to make the code dry
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // toggle
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  // so that after we finish playing the buttons will not work no more
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. Display dice
    diceEl.classList.remove('hidden'); // adding back the dice // now once you click btn roll the dice will appear
    diceEl.src = `dice-${dice}.png`; // the ${dice} automatically linking the images with const dice on the top .....with this we can dynamic load any of this 6 images depending on random roll dice

    // 3. Check for rolled 1; if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore = currentScore + dice; // basically dice number + 0 = currentScore and it will keep adding
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // to select it dynamically based on which player is the active player and show the  currentSCore // now current-- means selecting the 2 current-- (current--0 and current-1.. selecting both of them)   active player being 0 then make it show through the text content
      // current0El.textContent = currentScore; // this can work too but it will only work for PLAYER 1
    } else {
      // // Switch to next player
      // document.getElementById(`current--${activePlayer}`).textContent = 0; //
      // currentScore = 0; // after it switches to other player the current score becomes zero '0'
      // activePlayer = activePlayer === 0 ? 1 : 0; // if the active player is '0' we want the new active player to be 1 or else it should be '0'

      // // toggle
      // player0El.classList.toggle('player--active'); // toggle will add the class if its not there and it will remove the class if its there
      // player1El.classList.toggle('player--active');
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore; // <-- scores at position of active player will be equal that score plus the current score // basically adding the score down and the score bein held up to become the new score held up   omohhh
    // scores[1] = scores[1] + currentScore; // if it was in player 1 be that
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; // selecting the active player and setting the text content to the score'S' of the active player

    // 2. Check if the player's score is >= 100

    if (scores[activePlayer] >= 100) {
      // if so Finish the Game
      // hidEl.classList.remove('hid'); my stuff

      playing = false; // finished playing
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); // we have to remove the ('player--active) class, if it not it will interfere with player winner
    } else {
      //  Switch to next player
      switchPlayer(); //after we hold the score we need to switch to the next player
    }
  }
});

// RESETTING THE GAME

//OLD METHOD but not complete

// btnNew.addEventListener('click', function () {
//   // score0El.textContent = 0;
//   // score1El.textContent = 0;
//   // current0El.textContent = 0;
//   // current1El.textContent = 0;
//   // player0El.classList.remove('player--winner');
//   // player1El.classList.remove('player--winner');
//   // player0El.classList.add('player--active'); // we adding in player 0 because it had the active class initially in begin then it was toggled now added back again
//   // player1El.classList.remove('player--active');

// });

btnNew.addEventListener('click', init);
