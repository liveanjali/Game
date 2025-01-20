const gameBoard = document.getElementById("game-board");
const resetButton = document.getElementById("reset-button");
const statusText = document.getElementById("status");

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;

// Create the game squares dynamically
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-index', i);
        square.addEventListener('click', handleClick);
        gameBoard.appendChild(square);
    }
}

// Handle square click
function handleClick(event) {
    const squareIndex = event.target.getAttribute('data-index');
    if (board[squareIndex] === '' && !isGameOver) {
        board[squareIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin()) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            isGameOver = true;
        } else if (board.every(cell => cell !== '')) {
            statusText.textContent = "It's a draw!";
            isGameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Check if the current player has won
function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] === board[b] && board[b] === board[c] && board[a] !== '';
    });
}

// Reset the game
resetButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameOver = false;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.textContent = '';
    });
});

// Initialize the game
createBoard();
