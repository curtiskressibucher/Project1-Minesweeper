//Declare our variables
let board = [];
const rows = 9;
const columns = 9;
const minesCount = 10;
let flag = false;
let gameOver = undefined;

//Cache HTML element
const boardEl = document.querySelector('.board');
const faceSmileEl = document.querySelector('.facesmile');
const timerEl = document.querySelector('.timer');
const lostEl = document.querySelector('.lose');

// Initialise the game board:
init();

function init() {
    renderBoard();
    setMine();
}

// -   Create an empty grid with cells roughly a 9x9(e.g., a 2D array)
function renderBoard() {
    for (let r = 0; r < rows; r++) {
        let rows = [];
        for (let c = 0; c < columns; c++) {
            //Creating div elemenets inside of the html. <div></div>
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
    return;
}

// Display the current game board
// Prompt the player for their move (e.g., row and column)
// Check the selected cell:
//     If it's a mine:
//         - Reveal all mines
//         - Display "Game Over" message
//         - End the game
boardEl.addEventListener('click', function (event) {
    if (gameOver) return;

    const clickedCell = event.target;
    const [row, column] = clickedCell.id.split('-').map(Number);
    const cell = board[row][column];

    if (cell.isMine) {
        gameOver = true;
        revealMines();
        faceSmileEl.innerText = '🤯';
        lostEl.innerText = 'Game Over! You hit a mine.';
        return;
    }
});
boardEl.addEventListener('contextMenu', function (event) {
    if (gmaeOver) return;
});

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
//         - Do nothing

// If the game was won:
//     Display "You Win! Congratulations!"
// Else if the game was lost:
//     Display "Game Over! You hit a mine."

const resetGame = faceSmileEl;
resetGame.addEventListener('click', function () {
    location.reload();
});
