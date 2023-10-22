//Declare our variables
let board = [];
const rows = 9;
const columns = 9;
const minesCount = 10;
let flag = false;
let flagCount = minesCount;
let gameOver = undefined;
let timer = null;
let seconds = 0;

//Cache HTML element
const boardEl = document.querySelector('.board');
const faceSmileEl = document.querySelector('.facesmile');
const timerEl = document.querySelector('.timer');
const lostEl = document.querySelector('.lose');
const mineCountEl = document.querySelector('.mine-count');

// Initialise the game board:
init();

function init() {
    renderBoard();
    setMine();
    updateTimer();
}

// -   Create an empty grid with cells roughly a 9x9(e.g., a 2D array)
function renderBoard() {
    for (let r = 0; r < rows; r++) {
        let rows = [];
        for (let c = 0; c < columns; c++) {
            //Creating div elements inside of the html. <div></div>
            let cell = document.createElement('div');
            //Create the id inside of the div. <div id="0-0"></div>
            cell.id = r.toString() + '-' + c.toString();
            boardEl.append(cell);

            rows.push(cell);
        }
        board.push(rows);
    }
    console.log(board);
}
// -   Place mines randomly on the grid
function setMine() {
    let minesPlaced = 0;
    while (minesPlaced < minesCount) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + '-' + c.toString();
        console.log(id);

        if (!board[r][c].isMine) {
            board[r][c].isMine = true;
            minesPlaced++;
        }
    }

    mineCountEl.innerText = minesCount;
    return;
}

// Display the current game board
// Prompt the player for their move (e.g., row and column)
// Check the selected cell:
//     If it's a mine:
//         - Reveal all mines
//         - Display "Game Over" message
//         - End the game
// - Main event listner for left clicks
boardEl.addEventListener('click', function (event) {
    if (gameOver) return;

    if (!timer) {
        timer = setInterval(function () {
            seconds++;
            updateTimer();
        }, 1000);
    }

    const clickedCell = event.target;
    // Using the .map() method with the funciton number I am able to turn my split string now into an array of numbers.
    //"0-0" -> ['0', '0'] -> [0, 0]
    //Link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
    const [row, column] = clickedCell.id.split('-').map(Number);
    const cell = board[row][column];

    if (cell.isMine) {
        gameOver = true;
        revealMines();
        faceSmileEl.innerText = '🤯';
        lostEl.innerText = 'Game Over! You hit a mine.';
        clearInterval(timer);
        timer = null;
        return;
    } else {
        // Check if the cell is already revealed
        if (!cell.isRevealed) {
            cell.isRevealed = true;

            const adjacentMines = countAdjacentMines(row, column);

            if (adjacentMines === 0) {
                // If no adjacent mines, reveal adjacent cells recursively
            } else {
                // Display the number of adjacent mines
                clickedCell.innerText = adjacentMines;
                clickedCell.style.backgroundColor = 'darkgray';
                clickedCell.classList.add(`mine-count-${adjacentMines}`);
            }
        }
    }
});
// If the game was won:
//     Display "You Win! Congratulations!"
// Else if the game was lost:
//     Display "Game Over! You hit a mine."

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c].isMine) {
                board[r][c].innerText = '💣';
                board[r][c].style.fontSize = '35px';
                board[r][c].style.backgroundColor = 'red';
            }
        }
    }
}
//     If it's not a mine:
//     - Reveal the selected cell
//         - If the cell has no adjacent mines:
//             - Reveal all adjacent cells with no mines recursively

//         - If the cell has mines adjacent, display the corresponding number of mines touching that cell.

//              N.W   N   N.E
//               \   |   /
//                \  |  /
//             W----Cell----E
//                  / | \
//                /   |  \
//             S.W    S   S.E

//         - Check for a win:
//             - If all non-mine cells are revealed, the player wins
//     If it's a flag:
//         - do nothing

function countAdjacentMines(row, col) {
    let count = 0;
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            const newRow = row + r;
            const newCol = col + c;

            if (
                newRow >= 0 &&
                newRow < rows &&
                newCol >= 0 &&
                newCol < columns
            ) {
                if (board[newRow][newCol].isMine) {
                    console.log(board[newRow][newCol]);
                    count++;
                }
            }
        }
    }
    return count;
}

//Timer for player PR
function updateTimer() {
    //Using padStart to to update the string with the extra zeros.
    //Link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
    const formatedTime = seconds.toString().padStart(3, '0');
    timerEl.innerText = formatedTime;
}
// Reset game.
const resetGame = faceSmileEl;
resetGame.addEventListener('click', function () {
    location.reload();
});
