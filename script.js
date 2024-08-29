const cells = document.querySelectorAll('[data-cell]');
const authScreen = document.getElementById('auth-screen');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const loginScreen = document.getElementById('login-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const currentPlayerText = document.getElementById('current-player');
const resultMessage = document.getElementById('result-message');

let currentPlayer = 'X';
let player1Name = '';
let player2Name = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Toggle between signup and login forms
function toggleAuthForms() {
    signupForm.classList.toggle('hidden');
    loginForm.classList.toggle('hidden');
}

// Signup Function
function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (username && password) {
        if (!localStorage.getItem(username)) {
            localStorage.setItem(username, password);
            alert('Signup successful! Please login.');
            toggleAuthForms();
        } else {
            alert('Username already exists. Please login or choose a different username.');
        }
    } else {
        alert('Please enter a valid username and password.');
    }
}

// Login Function
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username && password) {
        const storedPassword = localStorage.getItem(username);

        if (storedPassword === password) {
            alert('Login successful!');
            authScreen.classList.add('hidden');
            loginScreen.classList.remove('hidden');
        } else {
            alert('Incorrect username or password.');
        }
    } else {
        alert('Please enter a valid username and password.');
    }
}

function startGame() {
    player1Name = document.getElementById('player1').value || 'Player 1';
    player2Name = document.getElementById('player2').value || 'Player 2';
    currentPlayerText.innerText = `${player1Name}'s Turn`;
    loginScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
}

function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin()) {
        endGame(false);
    } else if (board.includes('')) {
        switchPlayer();
    } else {
        endGame(true);
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerText.innerText = `${currentPlayer === 'X' ? player1Name : player2Name}'s Turn`;
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        resultMessage.innerText = "It's a Draw!";
    } else {
        resultMessage.innerText = `${currentPlayer === 'X' ? player1Name : player2Name} Wins!`;
    }
    gameScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
}

function newGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('X', 'O');
    });
    resultScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    currentPlayerText.innerText = `${player1Name}'s Turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
