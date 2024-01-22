const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';
const validChoices = [ROCK, PAPER, SCISSORS];
let running = true;

function init() {
    window.addEventListener('keydown', (e) => { e.key === 't' && tests() });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'q' && running) {
            running = false;
            console.log("Game paused, press 's' to restart.");
        }
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 's' && !running) {
            running = true;
            console.log("Game resumed. Press 'q' to pause.");
        }
    });
    game();
}

function game(t) {
    if (running) {
        console.log(playRound(getPlayerChoice(), getComputerChoice()));
    }
    requestAnimationFrame(game);
}

// choose randomly from 'rock', 'paper', 'scissors'
function getComputerChoice() {
    return validChoices[Math.floor(Math.random() * 3)];
}

// prompts the user for a choice ('rock', 'paper', 'scissors')
// lowercases the result
// compares to lowercase valid values. if the value is incorrect,
// re-prompt
function getPlayerChoice(query = "Your choice? 'rock', 'paper' or 'scissors'?") {
    let choice = prompt(query)?.toLowerCase();
    if (typeof choice === 'undefined') {
        return null;
    }

    if(!validChoices.includes(choice)) {
        choice = getPlayerChoice(`You entered ${choice}, but only 'rock', 'paper' or 'scissors' are valid choices. Choose again: t`);
    }
    return choice;
}

function playRound(playerSelection, computerSelection) {

    const msgAbort = "Game aborted. Press 's' to restart";    
    if (playerSelection === null) {
        running = false;
        return msgAbort;
    }

    const msgWin = `You win, ${playerSelection} beats ${computerSelection}.`;
    const msgLose = `You lose, ${playerSelection} beats ${computerSelection}.`;
    const msgTie = `You're tied, ${playerSelection} vs ${computerSelection}, replaying the round.`;


    if (playerSelection === computerSelection) {
        console.log(msgTie);
        return playRound(getPlayerChoice(), getComputerChoice());
    }

    if (playerSelection === ROCK && computerSelection === SCISSORS ||
        playerSelection === PAPER && computerSelection === ROCK ||
        playerSelection === SCISSORS && computerSelection === PAPER) {
        return msgWin;
    } else {
        return msgLose;
    }
}

function tests() {
    console.log('running tests');

    console.log(
        'getPlayerChoice returns "rock", "paper" or "scissors" and nothing else',
        validChoices.includes(getPlayerChoice())
    );

    console.log('computer produces one valid choice', validChoices.includes(getComputerChoice()));

    function computerChoicesVary() {
        let choices = [];
        for(let i = 0; i < 100; i++) {
            choices.push(getComputerChoice());
        }

        let chosenValues = [];
        for (let c of choices) {
            if (!chosenValues.includes(c)) {
                chosenValues.push(c);
            }
        }
        
        return chosenValues.length === 3;
    }

    console.log("computer choices vary and computer makes all three choices", computerChoicesVary());

    function computerChoicesareValid() {
        let choices = [];
        for(let i = 0; i < 100; i++) {
            choices.push(getComputerChoice());
        }

        for (let c of choices) {
            if (!validChoices.includes(c)) {
                return false;
            }
        }

        return true;
    }
    console.log('all computer choices are valid after 100 times', computerChoicesareValid());

    console.log(playRound(getPlayerChoice(), getComputerChoice()));
}

window.addEventListener('load', init());