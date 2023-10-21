# Minesweeper Game

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

## Learning along the way!

```
    I found this method to create a 2D array for the board by adding div elements inside a div element with the class 'board.' This allows you to create a board without having to manually add all 81 individual cells. As well as give them Ids to identify them later on.

    I went from having 81 divs to using the createElement method to create all my divs for me.
                <!-- <div class="c0r0" id="cell"></div> + 80 -->
    board = [
        [0-0, 0-1, 0-2, 0-3, 0-4, 0-5, 0-6, 0-7, 0-8],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
```

[MDN createELement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
