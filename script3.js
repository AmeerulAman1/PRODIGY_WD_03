const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const twoPlayerButton = document.getElementById('twoPlayer');
const onePlayerButton = document.getElementById('onePlayer');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let isSinglePlayer = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkForWinner();

    if (isSinglePlayer && gameActive) {
        setTimeout(() => {
            aiMove();
            checkForWinner();
        }, 500);
    }
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('filled');
}

function checkForWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusText.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `It's ${currentPlayer}'s turn`;
}

function aiMove() {
    const availableCells = board.map((cell, index) => (cell === '' ? index : null)).filter(val => val !== null);
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    const aiCell = cells[randomIndex];
    updateCell(aiCell, randomIndex);
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('filled');
    });
}

function setGameMode(singlePlayer) {
    isSinglePlayer = singlePlayer;
    resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
twoPlayerButton.addEventListener('click', () => setGameMode(false));
onePlayerButton.addEventListener('click', () => setGameMode(true));
