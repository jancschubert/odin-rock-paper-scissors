const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';
const validChoices = [ROCK, PAPER, SCISSORS];


function getComputerChoice() {
    const choice = Math.floor(Math.random() * 3);
    return validChoices[choice];
}

function playRound(playerSelection, computerSelection) {
    const msgWin = `You win, ${playerSelection} beats ${computerSelection}.`;
    const msgLose = `You lose, ${playerSelection} beats ${computerSelection}.`;
    const msgTie = `You're tied, ${playerSelection} vs ${computerSelection}.`;

    if (playerSelection === computerSelection) {
        return msgTie;
    }

    if (playerSelection === ROCK && computerSelection === SCISSORS ||
        playerSelection === PAPER && computerSelection === ROCK ||
        playerSelection === SCISSORS && computerSelection === PAPER) {
        return msgWin;
    } else {
        return msgLose;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const $btnRock = document.querySelector('.rps-game .choice.rock');
    const $btnPaper = document.querySelector('.rps-game .choice.paper');
    const $btnScissors = document.querySelector('.rps-game .choice.scissors');
    const $pMsg = document.querySelector('.rps-game .message');

    $btnRock.addEventListener('click', e => {
        const msg = playRound(ROCK, getComputerChoice());
        $pMsg.textContent = msg;
    });

    $btnPaper.addEventListener('click', e => {
        const msg = playRound(PAPER, getComputerChoice());
        $pMsg.textContent = msg;
    })

    $btnScissors.addEventListener('click', e => {
        const msg = playRound(SCISSORS, getComputerChoice());
        $pMsg.textContent = msg;
    });
});
