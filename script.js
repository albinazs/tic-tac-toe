const gameBoard = (() => {
    let grid = ['', '', '', '', '', '', '', '', ''];
    const clearGrid = () => gameBoard.grid = ['', '', '', '', '', '', '', '', ''];
    return {grid, clearGrid};
})()

const displayController = (() => {
    const gridItems = document.querySelectorAll('.grid-item');
    const restart = document.querySelector('button');

    const render = (grid) => gridItems.forEach(item => item.textContent = grid[item.dataset.index]);
    
    restart.addEventListener('click', () => {
        gameBoard.clearGrid();
        displayController.render(gameBoard.grid);
    });
    return {render, gridItems};
})()

const Player = (mark) => {
    const makeMove = (e) => {
        if(typeof gameBoard.grid[e.target.dataset.index] !== 'null') {
            gameBoard.grid.splice(e.target.dataset.index, 1, mark);
            //remove from here
            displayController.render(gameBoard.grid);
        }  
    };
    const getMark = () => mark;
    return {makeMove, getMark};
}

const gameController = (() => {
    const player1 = Player('x');
    const player2 = Player('o');
    let round = 1;

    const getCurrentPlayer = () => {
        return round % 2 === 1? player1 : player2;
    };

    const playRound = (e) => {
        getCurrentPlayer().makeMove(e);
        round++;
    };

    displayController.gridItems.forEach(item => item.addEventListener('click', playRound));
    
    //const gotWinner = () => (gameBoard.grid[0] === gameBoard.grid[1] === gameBoard.grid[2]) &&
    //gameBoard.grid[0] !== '';
    //const gameOver = () => gameBoard.grid[0] === gameBoard.grid[1] === gameBoard.grid[2];
    return {playRound};
})()

// grid-items add event listener for click => displ.game => if array empty - player1.move, else if last mark was x, then o
// DONE 1. gameboard array splice? based on data-attr, return array
// DONE 2. displaycontroller.render returned array
// 3. displaycontroller.message update 1.which player moves, 2.who is the winner 

// gameboard winner & gameover check: 8 cases of winning:
// 0, 3, 6 / 1, 4, 7 / 2, 5, 8
// 0, 1, 2 / 3, 4, 5 / 6, 7, 8
// 0, 4, 8 / 2, 4, 6 
// or all moves were made (array is filled)
// if array[] === &&array[] === &&array[], || ... => check contents and announce winner

// DONE restart - clear grid, render
