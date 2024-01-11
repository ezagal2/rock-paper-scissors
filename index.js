function playRound(playerSelection, computerSelection) {
    if (computerSelection === playerSelection) {
        return "It's a tie! Try again!";
    }
    if (
        (playerSelection === "rock" && computerSelection === "paper") ||
        (playerSelection === "paper" && computerSelection === "scissors") ||
        (playerSelection === "scissors" && computerSelection === "rock")
    ) {
        return `You lose! ${computerSelection} beats ${playerSelection}`;
    } else {
        return `You win! ${playerSelection} beats ${computerSelection}`;
    }
}

function getComputerChoice() {
    const randIndex = Math.floor(Math.random() * 3);
    const options = ["rock", "paper", "scissors"];
    return options[randIndex];
}

function game() {
    
    let keepGoing = true;
    let playerScore = 0;
    let computerScore = 0;
    let result = "";
    let finalResult = "";

    while (keepGoing){

        let computerSelection = getComputerChoice();
        let playerSelection = prompt("Rock, Paper, Scissors?").toLowerCase();
        result = playRound(playerSelection, computerSelection);

        if (result.includes("win")){
            playerScore++;           
        }
        else if(result.includes("lose")){
            computerScore++;
        }

        console.log(result);
        console.log(`You: ${playerScore}`);
        console.log(`Computer: ${computerScore}`);


        if (playerScore === 3){
            finalResult = "you win! you won 3 times";
            keepGoing = false;
        }
        if (computerScore === 3){
            finalResult = "you lose! The computer won 3 times";
            keepGoing = false;
        }

    }
    return finalResult;
}

console.log(game());
