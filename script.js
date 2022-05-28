'use strict';

// Select Elements
const diceEl = document.querySelector('.dice');
// TWO WAY OF GET ELEMENT ID
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentscore, activePlayer, playing;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
  scores = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  playing = true;
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentscore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  // toggl() add class if its not there, and remove if its there
};

// Dice Roll
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Random Dice Roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Display Dice Image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check Switch player
    if (dice !== 1) {
      // Add Score in to current score
      currentscore += dice;
      // set Current player score dynamicaly
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
    } else {
      // Switch Player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to active player score
    //scores[1] = scores[1] + currentscore
    scores[activePlayer] += currentscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch Player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
// init call by JAVA SCRIPT
