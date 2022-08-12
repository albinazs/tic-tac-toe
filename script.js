const gameBoard = (() => {
    let grid = ['', '', '', '', '', '', '', '', ''];
    const clearGrid = () => gameBoard.grid = ['', '', '', '', '', '', '', '', ''];

    return {grid, clearGrid};
})()

const displayController = (() => {
    const gridItems = document.querySelectorAll('.grid-item');
    const message = document.querySelector('.message>p');
    const restart = document.querySelector('button');
    
    const render = (grid) => gridItems.forEach(item => item.textContent = grid[item.dataset.index]);
    //add restart with corr message, and winner
    const updateMessage = () => message.textContent = `Player ${gameController.getCurrentPlayer().getMark()}'s turn`;
    
    gridItems.forEach(item => item.addEventListener('click', (e) => {
        gameController.playRound(e.target.dataset.index);
        displayController.render(gameBoard.grid);
        displayController.updateMessage(); 
    }));

    restart.addEventListener('click', () => {
        gameBoard.clearGrid();
        gameController.resetCounter();
        displayController.render(gameBoard.grid);
        displayController.updateMessage();       
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

    const playRound = (index) => {
        if(gameBoard.grid[index] !== '') return;
        else {
            gameBoard.grid.splice(index, 1, getCurrentPlayer().getMark());            
        }
        if(checkWinner(index))  {
            console.log('winner');
            return;
        } 
        if(gameOver()) {
            round = 1;
            console.log('gameover');
            return;
        } 
        round++;     
    };

    const checkWinner = (index) => {
        const winOptions = [
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winOptions
        .some(combination => combination
            .every(index => gameBoard.grid[index] === getCurrentPlayer().getMark())
        );
      
    }

    const gameOver = () => {
        return round === 9;
    };

    const resetCounter = () => round = 1;

    return {playRound, getCurrentPlayer, resetCounter};
})()


// displaycontroller.message update counter and who is the winner 

