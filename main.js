let gameSeq = []; // Sequence of colors for the game
let userSeq = []; // Sequence of colors entered by the user
let btn = ["orange", "pink", "green", "aqua"]; // Array of button colors
let started = false; // Flag to check if the game has started
let level = 0; // Current level of the game
let highestScore = 0; // Highest score achieved by the user
let h3 = document.querySelector('h3'); // Header element to display level and game messages
let score = document.querySelector('#score'); // Element to display the highest score
// Event listener for keypress to start the game
document.addEventListener('keypress', () => {
    if (!started) {
        started = true; // Set game as started
        levelUp(); // Move to the next level
    }
});
// Function to flash the game button
function gameFlash(btn) {
    btn.classList.add("flashColor"); // Add flash color class to button
    setTimeout(() => {
        btn.classList.remove("flashColor"); // Remove flash color class after 250ms
    }, 250);
}
// Function to flash the user button
function userFlash(btn) {
    btn.classList.add("userFlash"); // Add user flash class to button
    setTimeout(() => {
        btn.classList.remove("userFlash"); // Remove user flash class after 250ms
    }, 250);
}
// Function to move to the next level
function levelUp() {
    userSeq = []; // Clear user sequence
    level++; // Increment level
    if (level > highestScore) {
        highestScore = level; // Update highest score if current level is higher
        score.innerHTML = `Your highest score: ${highestScore}`; // Display highest score
    }
    h3.innerHTML = `Level: ${level}`; // Display current level
    let randomInd = Math.floor(Math.random() * 4); // Get a random index for color
    let randomColor = btn[randomInd]; // Get a random color
    let randombtn = document.querySelector(`.${randomColor}`); // Select the button with the random color
    gameSeq.push(randomColor); // Add the random color to the game sequence
    console.log(gameSeq); // Log the game sequence for debugging
    gameFlash(randombtn); // Flash the random button
}
// Function to check the user's sequence
function checkSeq(idx) {
    if (userSeq[idx] === gameSeq[idx]) { // Check if the current color matches the game sequence
        if (userSeq.length === gameSeq.length) { // Check if the user's sequence is complete
            setTimeout(levelUp, 1000); // Move to the next level after 1 second
        }
    }
    else {
        h3.innerHTML = `Game over! Your score was <b>${level - 1}</b><br>Press any key to start`; // Display game over message
        document.querySelector('body').style.backgroundColor = "red"; // Change background color to red
        setTimeout(() => {
            document.querySelector('body').style.backgroundColor = "#964B00"; // Change background color back after 500ms
        }, 500);
        resetGame(); // Reset the game
    }
}
// Function to handle button press
function btnPress() {
    let btn = this; // Get the pressed button
    userFlash(btn); // Flash the button
    let userColor = btn.getAttribute("id"); // Get the color of the button
    userSeq.push(userColor); // Add the color to the user's sequence
    checkSeq(userSeq.length - 1); // Check the user's sequence
}
// Add event listeners to all buttons
let allBtns = document.querySelectorAll('.box');
for (let btn of allBtns) {
    btn.addEventListener('click', btnPress);
}
// Function to reset the game
function resetGame() {
    started = false; // Set game as not started
    gameSeq = []; // Clear game sequence
    userSeq = []; // Clear user sequence
    level = 0; // Reset level
}
