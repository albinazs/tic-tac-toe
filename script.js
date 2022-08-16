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
    
    const updateMessage = () => {
        if (gameController.getIsOver() && gameController.getTie()) {
            message.textContent = `It's a tie!`;
        } else if (gameController.getIsOver()) {
            message.textContent = `Player ${gameController.getCurrentPlayer().getMark()} won!`;
        } else {
            message.textContent = `Player ${gameController.getCurrentPlayer().getMark()}'s turn`;
        }   
    };
 
    gridItems.forEach(item => item.addEventListener('click', (e) => {
        if(gameController.getIsOver()) return;
        gameController.playRound(e.target.dataset.index);
        render(gameBoard.grid);
        updateMessage(); 
    }));

    restart.addEventListener('click', () => {
        gameBoard.clearGrid();
        gameController.resetCounter();
        render(gameBoard.grid);
        updateMessage();       
    });
    
    return {};
})()

const Player = (mark) => {
    const getMark = () => mark;

    return {getMark};
}

const gameController = (() => {
    const player1 = Player('X');
    const player2 = Player('O');
    let round = 1;
    let isOver = false;
    let tie = false;

    const getCurrentPlayer = () => {
        return round % 2 === 1? player1 : player2;
    };

    const playRound = (index) => {
        if(gameBoard.grid[index] !== '') return;
        else {
            gameBoard.grid.splice(index, 1, getCurrentPlayer().getMark());            
        }
        if(checkWinner(index))  {
            isOver = true;
            return;
        } 
        if(gameOver()) {
            isOver = true;
            tie = true;
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

    const getIsOver = () => isOver;
    
    const getTie = () => tie;

    const gameOver = () => {
        return round === 9;
    };

    const resetCounter = () => {
        round = 1;
        tie = false;
        isOver = false;
    };

    return {playRound, getCurrentPlayer, resetCounter, getIsOver, getTie};
})()
