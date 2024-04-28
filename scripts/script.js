"use strict";

// Simplified elements selectors
const diceImg = {
  player: [
    document.querySelector(".player-dice .dice-1"),
    document.querySelector(".player-dice .dice-2"),
  ],
  computer: [
    document.querySelector(".computer-dice .dice-1"),
    document.querySelector(".computer-dice .dice-2"),
  ],
};

const wins = {
  player: document.querySelector(".player-wins"),
  computer: document.querySelector(".computer-wins"),
  nowinner: document.querySelector(".no-winner"),
};

const rollDiceButton = document.getElementById("roll-dice-button");
const tryAgainButton = document.getElementById("try-again-button");

let scores = {
  computerTotal: 0,
  playerTotal: 0,
  computer: [0, 0, 0],
  player: [0, 0, 0],
};

let currentRound = 0;

// Handle dice roll and scoring
function rollDice() {
  let diceResults = { player: [], computer: [] };
  for (let i = 0; i < 2; i++) {
    diceResults.player.push(Math.floor(Math.random() * 6) + 1);
    diceResults.computer.push(Math.floor(Math.random() * 6) + 1);
    diceImg.player[i].src = `images/dice${diceResults.player[i]}.svg`;
    diceImg.computer[i].src = `images/dice${diceResults.computer[i]}.svg`;
  }
  return diceResults;
}

function calculateScore(diceResults, playerType) {
  let roundScore = diceResults.reduce(
    (acc, die) => (die === 1 ? 0 : acc + die),
    0
  );
  if (roundScore !== 0 && diceResults[0] === diceResults[1]) {
    roundScore *= 2;
  }
  scores[playerType][currentRound] = roundScore;
  scores[playerType + "Total"] += roundScore;
}

function updateUI() {
  document.getElementById("computer-round-1").textContent = `House Round ${
    currentRound + 1
  }`;
  document.getElementById("player-round-1").textContent = `Player Round ${
    currentRound + 1
  }`;
  document.getElementById("computer-score-this-round").textContent =
    scores.computer[currentRound];
  document.getElementById("player-score-this-round").textContent =
    scores.player[currentRound];
  document.getElementById("computer-total-score").textContent =
    scores.computerTotal;
  document.getElementById("player-total-score").textContent =
    scores.playerTotal;
}

rollDiceButton.addEventListener("click", function () {
  if (currentRound < 3) {
    const diceResults = rollDice();
    calculateScore(diceResults.player, "player");
    calculateScore(diceResults.computer, "computer");
    updateUI();
    currentRound++;
    if (currentRound === 3) endGame();
  }
});

function endGame() {
  if (scores.playerTotal > scores.computerTotal) {
    wins.player.style.display = "block";
  } else if (scores.playerTotal < scores.computerTotal) {
    wins.computer.style.display = "block";
  } else {
    wins.nowinner.style.display = "block";
  }
  rollDiceButton.style.display = "none";
  tryAgainButton.style.display = "block";
}

tryAgainButton.addEventListener("click", function () {
  scores = {
    computerTotal: 0,
    playerTotal: 0,
    computer: [0, 0, 0],
    player: [0, 0, 0],
  };
  currentRound = 0;
  updateUI(); // Reset the UI
  wins.player.style.display = "none";
  wins.computer.style.display = "none";
  wins.nowinner.style.display = "none";
  rollDiceButton.style.display = "block";
  tryAgainButton.style.display = "none";
});
