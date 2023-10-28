# Minesweeper Game

Minesweeper is a classic single-player game created by Curt Johnson in 1989 for the IBM OS/2 operating system, that was included in all Microsoft Windows operating systems in the early 1990s. The basic premise of the game is to clear the board of all the tiles without hitting a bomb. As you progress, you're able to plant flags on the grid where you think the bombs are located.

Minesweeper is a classic puzzle game that requires players to uncover safe cells on a grid while avoiding hidden mines. It has a simple yet engaging gameplay style and has had a lasting impact on computer gaming culture, particularly during the era of Windows 3.1 and subsequent Windows versions.

The basic gameplay starts with a square grid with a varying number of cells. Once clicked, it will reveal either a number indicating the number of mines adjacent to the cell or a mine, which will end the game. The numbers in those cells provide clues to the player about where the mines might be located.

# About my project.

My project is a classic Minesweeper game, but it may look different from the original due to the modern CSS effects I've applied for a more contemporary and visually appealing design.

## To start the game.

-   To start my version of Minesweeper, please click the link. [My Minesweeper](https://curtiskressibucher.github.io/Project1-Minesweeper/)
-   Once you're loaded in, start clicking on the grid to try and find all the hidden mines.
-   You can also right-click to use flags to mark where you think they might be.

#### Downloading Files

To download my files for the game and modify it yourself, follow these steps in the terminal:

1. Git clone the URL from the big green "Code" button.
2. Change directory (cd) into the folder.
3. Then, open the folder with whatever code editor you are using.

## Initial wireframe of the game.

Wireframe minesweeper

1. Title for the game.

2. Game Grid and Board:
   The top section will feature a box displaying the mine count.
   A small timer will increment upwards during gameplay.
   A smiley face icon will serve as a game status indicator, turning sad when the game is lost and changing to a cool guy wearing sunglasses emoji upon victory. The smiley face also acts as a reset game button.

3. Game Board:
   The game board itself consists of a 9x9 grid.
   It randomly generates bombs when the player clicks on boxes, gradually revealing more of the board, except for the areas containing bombs.

4. Status Messages (Above or Below the Grid):
   Display messages for the player, such as "You won!" (cool guy emoji) or "Game Over" (sad guy emoji) when the game is won or lost.
   Include a "Play Again" button for restarting the game.

5. Adding the Ability to Place Red Flags:
   Allow players to 'right click' red flags to cover mines and prevent them from exploding.

6. Timer:
   Enable players to record their best game times. This feature will allow players to track and save their fastest completion times in the game.

### Excuse the horrible drawing

![My Wireframe](./Images/Minesweper%20wireframe%20.png)

## Pseudocode.

```
Pseudocode for minesweeper:

<!-- Initialise the game board:

-   Create an empty grid with cells roughly a 9x9(e.g., a 2D array)
-   Place mines randomly on the grid
-   Initialise all cells as hidden and without flags

Repeat until the game is won or lost:
Display the current game board
Prompt the player for their move (e.g., row and column)
Check the selected cell:
    If it's a mine:
        - Reveal all mines
        - Display "Game Over" message
        - End the game
    If it's not a mine:
    - Reveal the selected cell
        - If the cell has no adjacent mines:
            * Flood fill
            - Reveal all adjacent cells with no mines recursively
        - If the cell has mines adjacent, display the corresponding number of mines touching that cell.

             N.W   N   N.E
              \   |   /
               \  |  /
            W----Cell----E
                 / | \
               /   |  \
            S.W    S   S.E

        - Check for a win:
            - If all non-mine cells are revealed, the player wins
    If it's a flag:
        - Do nothing

If the game was won:
    Display "You Win! Congratulations!"
Else if the game was lost:
    Display "Game Over! You hit a mine." -->

```

## Screenshots of progress.

### Original Minesweeper.

![Original minesweeper](./Images/Screenshot%202023-10-19%20at%201.31.26%20pm.png)

### The beginning of the logic.

![Game logic](./Images/Screenshot%202023-10-22%20at%2010.12.29%20am.png)

### The first touch of style.

![First style](./Images/Add%20some%20style%20Minesweeper%202023.png)

### Adding difficulty levels and playing game.

![Difficulty level](./Images/Screenshot%202023-10-26%20at%206.28.57%20pm.png)

## Bugs to fix

-   The difficulty levels are a little broken if you click on a difficulty level halfway through the game. Difficulty levels must be chosen before the game starts, otherwise it can cause a problem where cells that have previously been clicked, could become bombs.

-   There is a bug when it comes to the board due to a loop I created where the divs that would become the cells. When trying to modify the size of the board in terms of rows, columns, or the board size, it can cause the board to become irregular, keeping the same amount of rows but increasing the number of columns. This results in the grid being unable to maintan its usual formation. A possible solution would be to make the board size adaptable to the amount of rows and columns.

## Learning along the way!

I found this method to create a 2D array for the board by adding div elements inside a div element with the class 'board.' This allows you to create a board without having to manually add all 81 individual cells. As well as give them Ids to identify them later on.

I went from having 81 divs to using the createElement method to create all my divs for me.

<!-- <div class="c0r0" id="cell"></div> + 80 -->

board = [
[0-0, 0-1, 0-2, 0-3, 0-4, 0-5, 0-6, 0-7, 0-8],
]

Here is the code I used;

```js
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
```

-   [MDN createELement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)

When looking into right-click functionality for placing a flag, I found that the event listener method for this is called 'context menu'. However, when using this event listener, it's important to remember to add 'preventDefault' to the event. By default, a right-click can open up the context menu, and by applying 'preventDefault,' you should be able to use the right-click for your intended action on whatever element you want.

```js
boardEl.addEventListener('contextmenu', function (event) {
    event.preventDefault();

    if (gameOver) {
        return;
    }
    const clickedCell = event.target;
    console.log(clickedCell);
});
```

-   [MDN contextmenu](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event)

One small thing that I learned was padStart, which is a string method that can increase the string length by declaring the desired length. In my case, I wanted to maintain the string length for my timer at "000". To achieve this, I simply converted my seconds into a string and specified the desired length of 3.

```js
function updateTimer() {
    const formatedTime = seconds.toString().padStart(3, '0');
    timerEl.innerText = formatedTime;
}
```

-   [MDN padStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)

I learned how to add transitions to elements in CSS to create a really nice hover effect on the difficulty buttons.

```css
.level-container button {
    background-color: #333;
    color: #fff;
    border: 2px solid #555;
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    text-transform: uppercase;
    font-weight: bold;
}

.level-container button:hover {
    background-color: #555;
    color: #ffcc00;
    border-color: #777;
}
```

-   [MDN transotion](https://developer.mozilla.org/en-US/docs/Web/CSS/transition)

## Future Features

-   The ability to store the player's personal record for finishing the game.
-   Add more animations to the game.
-   Include some cool sound effects.
-   Making the project more resposnive.
-   Adding a better reset game function where it doesnt have to reload the page to restart the game.

# Flood fill

The biggest challenge in this project was flood fill. After many hours of attempting to make the code below work, there was something inherently wrong with it. The line 'if (cell.isRevealed || cell.hasFlag)' wasn't finding the right coordinates for the function to fill in the remaining areas; it was only returning the singular cell. I found that without the return, it would create an infinite loop trying to find an empty cell. The new function I wrote explicitly finds the coordinates while using the DOM. So, the key difference between them is that the first function starts the fill from the specified cell and wasn't filling outwards, whereas the second function directly floods the area in which the cell is clicked.

```js
// If it's not a mine:
// - Reveal the selected cell
//     - If the cell has no adjacent mines:
//      - Reveal all adjacent cells with no mines recursively

function floodFill(row, col) {
    if (row < 0 || row >= rows || col < 0 || col >= columns) {
        return;
    }
    const cell = board[row][col];

    if (cell.isRevealed || cell.hasFlag) {
        return;
    }
    cell.isRevealed = true;
    cell.style.backgroundColor = 'darkgray';
    const adjacentMines = countAdjacentMines(row, col);
    // This part will make the flood fill recursive, so that it will check the cells in 3x3
    if (adjacentMines === 0) {
        for (let r = -1; r <= 1; r++) {
            console.log(r);
            for (let c = -1; c <= 1; c++) {
                const newRow = row + r;
                const newCol = col + c;
                console.log(newCol, newRow);
                if (
                    newRow >= 0 &&
                    newRow < rows &&
                    newCol >= 0 &&
                    newCol < columns
                ) {
                    floodFill(newRow, newCol);
                }
            }
        }
    } else {
        cell.innerText = adjacentMines;
        cell.style.backgroundColor = 'darkgray';
        cell.classList.add(`mine-count-${adjacentMines}`);
    }
}
```

```js
function floodFill(row, column) {
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            const newRow = row + r;
            const newCol = column + c;

            if (
                newRow >= 0 &&
                newRow < rows &&
                newCol >= 0 &&
                newCol < columns &&
                !board[newRow][newCol].isRevealed
            ) {
                const cell = board[newRow][newCol];
                cell.isRevealed = true;
                cellsRevealed++;

                const adjacentMines = countAdjacentMines(newRow, newCol);

                if (adjacentMines === 0) {
                    const clickedCell = document.getElementById(
                        `${newRow}-${newCol}`
                    );
                    clickedCell.style.backgroundColor = 'darkgray';
                    floodFill(newRow, newCol);
                } else {
                    const clickedCell = document.getElementById(
                        `${newRow}-${newCol}`
                    );
                    clickedCell.innerText = adjacentMines;
                    clickedCell.style.backgroundColor = 'darkgray';
                    clickedCell.classList.add(`mine-count-${adjacentMines}`);
                }
            }
        }
    }
}
```

All in all, flood fill was very challenging for me to understand. Despite numerous attempts at Googling and studying recursion, I remain unsure whether I've implemented the correct algorithm for the game logic. This uncertainty could potentially lead to problems in the future. However, it seems to be working in my testing.

Link I used to learn and understand
[Flood Fill Algorithum](https://www.geeksforgeeks.org/flood-fill-algorithm/)
