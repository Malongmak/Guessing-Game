// Variables for the game
let lower, upper, targetNumber, totalChances, guessCount = 0, gameStarted = false;
const feedback = document.getElementById("feedback");
const lowerInput = document.getElementById("lower");
const upperInput = document.getElementById("upper");
const guessField = document.getElementById("guessField");
const startButton = document.getElementById("startGame");
const guessForm = document.querySelector(".guessForm");

// Function to start the game
startButton.onclick = function () {
    lower = parseInt(lowerInput.value);
    upper = parseInt(upperInput.value);

    if (isNaN(lower) || isNaN(upper) || lower >= upper) {
        feedback.textContent = "Please enter valid lower and upper bounds.";
        feedback.style.color = "red";
        return;
    }

    // Generate random number between lower and upper bounds
    targetNumber = Math.floor(Math.random() * (upper - lower + 1)) + lower;

    // Calculate total chances based on range size
    totalChances = Math.ceil(Math.log(upper - lower + 1) / Math.log(2));

    feedback.textContent = `You have ${totalChances} chances to guess the number!`;
    feedback.style.color = "blue";

    // Hide the starting inputs and show the guess form
    document.querySelector(".form").style.display = "none";
    guessForm.style.display = "block";

    gameStarted = true;
};

// Function for guessing the number
document.getElementById("submitguess").onclick = function () {
    if (!gameStarted) return;

    const guess = parseInt(guessField.value);

    if (isNaN(guess) || guess < lower || guess > upper) {
        feedback.textContent = `Please enter a valid guess between ${lower} and ${upper}.`;
        feedback.style.color = "red";
        return;
    }

    guessCount++;

    if (guess === targetNumber) {
        feedback.textContent = `🎉 Congratulations! You guessed it right in ${guessCount} guess${guessCount > 1 ? 'es' : ''}!`;
        feedback.style.color = "green";
        resetGame();
    } else if (guess < targetNumber) {
        feedback.textContent = "❗ Try a greater number.";
        feedback.style.color = "blue";
    } else if (guess > targetNumber) {
        feedback.textContent = "❗ Try a smaller number.";
        feedback.style.color = "blue";
    }

    if (guessCount === totalChances && guess !== targetNumber) {
        feedback.textContent = `❌ You've used all your guesses. The correct number was ${targetNumber}. Better luck next time!`;
        feedback.style.color = "red";
        resetGame();
    }
};

// Reset the game
function resetGame() {
    guessCount = 0;
    gameStarted = false;
    document.querySelector(".form").style.display = "block";
    guessForm.style.display = "none";
    lowerInput.value = '';
    upperInput.value = '';
    guessField.value = '';
}
