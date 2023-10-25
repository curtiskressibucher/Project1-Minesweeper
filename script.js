//Declare our variables
let board = [];
const rows = 9;
const columns = 9;
let mineCount = 0;
let flagPlaced = 0;
let gameOver = undefined;
let timer = null;
let seconds = 0;
let cellsRevealed = 0;
const beginnerMineCount = 10;
const intermediateMineCount = 20;
const advancedMineCount = 30;
let beginnerFlaggedCount = 0;
let intermediateFlaggedCount = 0;
let advancedFlaggedCount = 0;

//Cache HTML element
const boardEl = document.querySelector('.board');
const faceSmileEl = document.querySelector('.facesmile');
const timerEl = document.querySelector('.timer');
const lostEl = document.querySelector('.lose');
const mineCountEl = document.querySelector('.mine-count');
const bombEl = document.querySelector('.bomb');
const trophyEl = document.querySelector('.trophy');
const winEl = document.querySelector('.win');
const beginnerButton = document.querySelector('.beginner');
const intermediateButton = document.querySelector('.intermediate');
const advancedButton = document.querySelector('.advanced');

// Initialise the game board:
Init();

function Init() {
    const minesCount = beginnerMineCount;
    renderBoard();
    mineCount = minesCount;
    setMine(minesCount);
    updateTimer();
}
function beginnerInit() {
    const minesCount = beginnerMineCount;
    clearMines();
    setMine(minesCount);
    mineCount = minesCount;
    updateMineCount();
    updateTimer();
}
function intermediateInit() {
    const minesCount = intermediateMineCount;
    mineCount = minesCount;
    clearMines();
    setMine(minesCount);
    updateMineCount();
    updateTimer();
}
function advancedInit() {
    const minesCount = advancedMineCount;
    mineCount = minesCount;
    clearMines();
    setMine(minesCount);
    updateMineCount();
    updateTimer();
}

function clearMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            board[r][c].isMine = false;
        }
    }
}
// -   Create an empty grid with cells roughly a 9x9(e.g., a 2D array)
// Display the current game board
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
function setMine(minesCount) {
    if (minesCount >= rows * columns) {
        return;
    }
    clearMines();
    let minesPlaced = 0;
    while (minesPlaced < minesCount) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        // This code is just to see where the mines land on the board.
        // let id = r.toString() + '-' + c.toString();
        // console.log(id);

        if (!board[r][c].isMine) {
            board[r][c].isMine = true;
            minesPlaced++;
        }
    }

    mineCountEl.innerText = minesCount;
    return;
}

// Hidding the gifs.
bombEl.style.display = 'none';
trophyEl.style.display = 'none';

// Prompt the player for their move (e.g., row and column)
// Check the selected cell:
// - Main event listner for left clicks
boardEl.addEventListener('click', function (event) {
    if (gameOver) {
        return;
    }
    settimer();

    const clickedCell = event.target;
    // Using the .map() method with the funciton number I am able to turn my split string now into an array of numbers.
    //"0-0" -> ['0', '0'] -> [0, 0]
    //Link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
    const [row, column] = clickedCell.id.split('-').map(Number);
    const cell = board[row][column];
    //     If it's a mine:
    //         - Reveal all mines
    //         - Display "Game Over" message
    //         - End the game
    if (cell.isMine) {
        gameOver = true;
        revealMines();
        faceSmileEl.innerText = '🤯';
        lostEl.innerText = 'Game Over! You hit a mine.';
        clearInterval(timer);
        timer = null;
        // bombEl.style.display = 'block';
        return;
    } else {
        // Check if the cell is already revealed
        if (!cell.isRevealed) {
            cell.isRevealed = true;
            cellsRevealed++;

            const adjacentMines = countAdjacentMines(row, column);

            if (adjacentMines === 0) {
                clickedCell.style.backgroundColor = 'darkgray';
                // If no adjacent mines, reveal adjacent cells recursively
            } else {
                // Display the number of adjacent mines
                clickedCell.innerText = adjacentMines;
                clickedCell.style.backgroundColor = 'darkgray';
                clickedCell.classList.add(`mine-count-${adjacentMines}`);
            }
        }
    }
    // If the game was won:
    //     Display "You Win! Congratulations!"
    if (cellsRevealed === rows * columns - mineCount) {
        gameOver = true;
        faceSmileEl.innerText = '😎';
        trophyEl.style.display = 'block';
        winEl.innerText = 'You Win! You cleared the minefield!';
        clearInterval(timer);
        timer = null;
    }
});

boardEl.addEventListener('contextmenu', function (event) {
    event.preventDefault();

    if (gameOver) {
        return;
    }

    settimer();

    const clickedCell = event.target;
    const [row, column] = clickedCell.id.split('-').map(Number);
    const cell = board[row][column];

    if (cell.isRevealed) {
        return;
    }

    if (cell.hasFlag) {
        cell.hasFlag = false;
        clickedCell.innerText = '';
        flagPlaced--;
    } else if (mineCount - flagPlaced > 0) {
        cell.hasFlag = true;
        clickedCell.style.fontSize = '35px';
        clickedCell.innerText = '🚩';
        flagPlaced++;
    }
    updateMineCount();
    console.log(clickedCell);
});

function updateMineCount() {
    let remainingMines = mineCount - flagPlaced;
    mineCountEl.innerText = remainingMines;

    if (mineCount === beginnerMineCount) {
        beginnerFlaggedCount = remainingMines;
    } else if (mineCount === intermediateMineCount) {
        intermediateFlaggedCount = remainingMines;
    } else if (mineCount === advancedMineCount) {
        advancedFlaggedCount = remainingMines;
    }
}

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
// function floodFill(row, col) {
//     if (row < 0 || row >= rows || col < 0 || col >= columns) {
//         return;
//     }
//     const cell = board[row][col];

//     if (!cell.isRevealed) {
//         return;
//     }
//     cell.isRevealed = true;
//     cell.style.backgroundColor = 'darkgray';
//     const adjacentMines = countAdjacentMines(row, col);
//     // This part will make the flood fill recursive, so that it will check the cells in 3x3
//     if (adjacentMines === 0) {
//         for (let r = -1; r <= 1; r++) {
//             console.log(r);
//             for (let c = -1; c <= 1; c++) {
//                 const newRow = row + r;
//                 const newCol = col + c;
//                 console.log(newCol, newRow);
//                 if (
//                     newRow >= 0 &&
//                     newRow < rows &&
//                     newCol >= 0 &&
//                     newCol < columns
//                 ) {
//                     floodFill(newRow, newCol);
//                 }
//             }
//         }
//     } else {
//         cell.innerText = adjacentMines;
//         cell.style.backgroundColor = 'darkgray';
//         cell.classList.add(`mine-count-${adjacentMines}`);
//     }
// }

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
function settimer() {
    if (!timer) {
        timer = setInterval(function () {
            seconds++;
            updateTimer();
        }, 1000);
    }
}

function updateTimer() {
    //Using padStart to to update the string with the extra zeros. As seen as 000 instead of 0.
    //Link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
    const formatedTime = seconds.toString().padStart(3, '0');
    timerEl.innerText = formatedTime;
}

// Reset game.
const resetGame = faceSmileEl;
resetGame.addEventListener('click', function () {
    location.reload();
});

beginnerButton.addEventListener('click', function () {
    beginnerInit();
});
intermediateButton.addEventListener('click', function () {
    intermediateInit();
});
advancedButton.addEventListener('click', function () {
    advancedInit();
});
