document.addEventListener('DOMContentLoaded', function() {
    let playerScore = 0;
    let computerScore = 0;

    const playerPoints = document.getElementById('player-score');
    const computerPoints = document.getElementById('computer-score');

    function updateScores() {
        playerPoints.textContent = playerScore;
        computerPoints.textContent = computerScore;
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        updateScores();
        const notification = document.getElementById('notification');
        notification.classList.remove('show');
        notification.classList.add('hide');
        disableButtons(false);
    }

    function showGameOver(winner) {
        disableButtons(true);

        setTimeout(() => {
            const gameOverScreen = document.getElementById('game-over-screen');
            const gameOverMessage = document.getElementById('game-over-message');
            gameOverMessage.textContent = winner === 'player' ? 'You win!' : 'Computer wins!';
            gameOverScreen.style.display = 'flex'; // Show the game over screen
        }, 500);

        
    }

    function disableButtons(disabled) {
        document.getElementById("rockBtn").disabled = disabled;
        document.getElementById("paperBtn").disabled = disabled;
        document.getElementById("scissorBtn").disabled = disabled;
    }

    function getComputerChoice() {
        const options = ["rock", "paper", "scissors"];
        const randIndex = Math.floor(Math.random() * 3);
        return options[randIndex];
    }

    function playRound(playerSelection, computerSelection) {
        if (computerSelection === playerSelection) {
            showNotification("It's a tie!");
            return "It's a tie! Try again!";
        }
        if (
            (playerSelection === "rock" && computerSelection === "paper") ||
            (playerSelection === "paper" && computerSelection === "scissors") ||
            (playerSelection === "scissors" && computerSelection === "rock")
        ) {
            showNotification("Computer scores a point!");
            computerScore++;
            updateScores();
            return `You lose! ${computerSelection} beats ${playerSelection}`;
        } else {
            showNotification("Player scores a point!");
            playerScore++;
            updateScores();
            return `You win! ${playerSelection} beats ${computerSelection}`;
        }
    }

    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.remove('hide');
        notification.classList.add('show');
        clearTimeout(notification.timeout);
        notification.timeout = setTimeout(function() {
            notification.classList.remove('show');
            notification.classList.add('hide');
        }, 3000);
    }

    function game(playerChoice) {
        if (playerScore === 5 || computerScore === 5) {
            // If the game is over, don't allow any more rounds to be played
            return;
        }

        let computerSelection = getComputerChoice();
        let result = playRound(playerChoice, computerSelection);
        console.log(result);
        console.log(`Player: ${playerScore}, Computer: ${computerScore}`);
        if (playerScore === 5){
            showGameOver('player');
        }
        else if (computerScore === 5){
            showGameOver('computer');
        }
    }

    document.getElementById("rockBtn").addEventListener("click", () => game("rock"));
    document.getElementById("paperBtn").addEventListener("click", () => game("paper"));
    document.getElementById("scissorBtn").addEventListener("click", () => game("scissors"));

    document.getElementById('restart-game').addEventListener('click', function() {
        const gameOverScreen = document.getElementById('game-over-screen');
        gameOverScreen.style.display = 'none'; // Hide the game over screen
        // Reset scores and update the display
        resetGame();
        // Add any additional reset logic here
    });
    

    // Example button interaction logic
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.classList.add('no-shake');
        });

        button.addEventListener('mouseleave', function() {
            this.classList.remove('no-shake');
        });
    });

});