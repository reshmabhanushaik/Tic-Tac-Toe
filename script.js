const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
let currentPlayer = "X";
let gameEnded = false;
let winningCombination = null;

const messageElement = document.getElementById("message");
const boardCells = document.querySelectorAll("[data-cell]");
const resetButton = document.getElementById("reset-button");

function checkWin() {

    const winningCombinations = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
            winningCombination = combination;
            return true;
        }
    }

    return false;
}

function handleCellClick(event) {
    const cell = event.target;
    const row = cell.parentElement.rowIndex;
    const col = cell.cellIndex;

    if (!gameEnded && board[row][col] === "") {
        board[row][col] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            highlightWinningCells();
            messageElement.textContent = `Player ${currentPlayer} wins!`;
            gameEnded = true;
        } else if (checkDraw()) {
            messageElement.textContent = "It's a draw!";
            gameEnded = true;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            messageElement.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkDraw() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === "") {
                return false;
            }
        }
    }
    return true; 
}

function highlightWinningCells() {
    if (winningCombination) {
        for (const [row, col] of winningCombination) {
            boardCells[row * 3 + col].classList.add("winning-cell");
        }
    }
}

function resetGame() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            board[row][col] = "";
            boardCells[row * 3 + col].textContent = "";
            boardCells[row * 3 + col].classList.remove("winning-cell"); 
        }
    }
    currentPlayer = "X";
    gameEnded = false;
    winningCombination = null;
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
}

boardCells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

resetGame();
