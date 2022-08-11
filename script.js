const gameBoard = (() => {
    let grid = ['', '', '', '', '', '', '', '', ''];
    const clearGrid = () => gameBoard.grid = ['', '', '', '', '', '', '', '', ''];
    return {grid, clearGrid};
})()

const displayController = (() => {
    const gridItems = document.querySelectorAll('.grid-item');
    const restart = document.querySelector('button');
    const message = document.querySelector('.message>p');

    const render = (grid) => gridItems.forEach(item => item.textContent = grid[item.dataset.index]);

    const updateMessage = () => message.textContent = `Player ${gameController.getCurrentPlayer().getMark()}'s turn`;
    
    restart.addEventListener('click', () => {
        gameBoard.clearGrid();
        displayController.render(gameBoard.grid);
    });
    
    return {render, gridItems, updateMessage};
})()

const Player = (mark) => {
    const getMark = () => mark;
    return {getMark};
}

const gameController = (() => {
    const player1 = Player('X');
    const player2 = Player('O');
    let round = 1;

    const getCurrentPlayer = () => {
        return round % 2 === 1? player1 : player2;
    };

    const gameOver = () => {
        console.log(round);
        return round === 9;
    };

    const playRound = (e) => {
        //getCurrentPlayer().makeMove(e);
        if(gameBoard.grid[e.target.dataset.index] === '') {
            gameBoard.grid.splice(e.target.dataset.index, 1, getCurrentPlayer().getMark()); 
            round++;
            console.log(round);
        };
        displayController.render(gameBoard.grid);
        displayController.updateMessage();           
    };

    displayController.gridItems.forEach(item => item.addEventListener('click', playRound));
    
    //const gotWinner = () => (gameBoard.grid[0] === gameBoard.grid[1] === gameBoard.grid[2]) &&
    //gameBoard.grid[0] !== '';
    //const gameOver = () => gameBoard.grid[0] === gameBoard.grid[1] === gameBoard.grid[2];
    return {getCurrentPlayer};
})()

console.log(gameController.round);
gameController.round++;
gameController.round++;
gameController.round++;

// 3. displaycontroller.message update who is the winner 

// gameboard winner & gameover check: 8 cases of winning:
// 0, 3, 6 / 1, 4, 7 / 2, 5, 8
// 0, 1, 2 / 3, 4, 5 / 6, 7, 8
// 0, 4, 8 / 2, 4, 6 
// or all moves were made (array is filled / counter is 10!)
// if array[] === &&array[] === &&array[], || ... => check contents and announce winner
