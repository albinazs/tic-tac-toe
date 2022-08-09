const gameBoard = (() => {
    const grid = ['x', '', '', '', '', 'o', 'x', 'o', 'x'];
    //getgrid instead of grid?????
    return {grid};
})()

const displayController = (() => {
    const gridItems = document.querySelectorAll('.grid-item');
    const render = (grid) => gridItems.forEach(item => item.textContent = grid[item.dataset.index]);
    //remove gridItems?
    return {render, gridItems};
})()

const Player = (mark) => {
    const makeMove = (e) => {
        if(gameBoard.grid[e.target.dataset.index] === '') {
            gameBoard.grid.splice(e.target.dataset.index, 1, mark);
            //remove from here
            displayController.render(gameBoard.grid);
        }    
    };
    return {makeMove};
}

const player1 = Player('x');
const player2 = Player('o');

displayController.gridItems.forEach(item => item.addEventListener('click', player2.makeMove));

displayController.render(gameBoard.grid);

// grid-items add event listener for click => 0.player1 move - check if available. after player2 move
// DONE 1. gameboard array splice? based on data-attr, return array
// DONE 2. displaycontroller.render returned array
// 3. displaycontroller.message update 1.which player moves, 2.who is the winner 

// gameboard winner & gameover check: 8 cases of winning:
// 0, 3, 6 / 1, 4, 7 / 2, 5, 8
// 0, 1, 2 / 3, 4, 5 / 6, 7, 8
// 0, 4, 8 / 2, 4, 6 
// or all moves were made (array is filled)
// if array[] === &&array[] === &&array[], || ... => check contents and announce winner

//restart - clear grid, render
