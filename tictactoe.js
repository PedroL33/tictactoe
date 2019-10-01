const gameBoard = (() => {
    var board = ['', '', '', '', '', '', '', '', ''];
    var turn = 1;
    var result = null;

    var updateBoard = (index, piece) => { 
        board.splice(index, 1, piece);
    };

    const getBoard = () => board;

    const getTurn = () => turn;

    const getResult = () => result;

    const changeTurn = () => {
        if(turn == 1) {
            turn = 2;
        }else {
            turn = 1;
        }
    }
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        result = null;
    }

    const checkWin = () => {
        const winConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        winConditions.forEach(function(condition) {
            var board = gameBoard.getBoard();
            if(condition.every(x => board[x] == 'x')) {
                result = "x Wins";
                condition.forEach(function(item) {
                    document.getElementById(item).classList.add('green')
                })
            }else if(condition.every(x => board[x] == 'o')) {
                result = "o Wins";
                condition.forEach(function(item) {
                    document.getElementById(item).classList.add('green')
                })
            }else if(board.every(x => x != '')) {
                result = "Tie Game";
            }
        })
    }

    return { 
        updateBoard, 
        resetBoard, 
        getBoard,
        getTurn, 
        changeTurn, 
        checkWin, 
        getResult
    };
})();

const displayController = (() => {

    var placePiece = (element) => {
        if(gameBoard.getResult() == null && gameBoard.getBoard()[element.dataset.id] == '') {
            if(gameBoard.getTurn() == 1) {
                element.innerHTML = "x";
                gameBoard.updateBoard(element.dataset.id, "x");
            }else {
                element.innerHTML = "o";
                gameBoard.updateBoard(element.dataset.id, "o");
            }
            gameBoard.checkWin();
            gameBoard.changeTurn();
            if(gameBoard.getResult() != null) {
                document.getElementById("display").innerHTML = gameBoard.getResult();
            }
        }
    }

    var startGame = () => {
        var tiles = document.querySelectorAll('.tile');
        tiles.forEach(function(tile) {
            tile.addEventListener('click', function(e) {
                if(gameBoard.getTurn() == 1) {
                    placePiece(e.target, "x")
                }else {
                    placePiece(e.target, "o")
                }
            });
            tile.addEventListener('mouseover', function(e) {
                if(gameBoard.getTurn() == 1 && e.target.innerHTML == '' && gameBoard.getResult() == null) {
                    e.target.innerHTML = 'x'
                }else if (gameBoard.getTurn() == 2 && e.target.innerHTML == '' && gameBoard.getResult() == null) {
                    e.target.innerHTML = 'o'
                }
            })
            tile.addEventListener('mouseout', function(e) {
                if(gameBoard.getBoard()[e.target.dataset.id] == '') {
                    e.target.innerHTML = '';
                }
            }) 
        })
    } 

    var resetGame = () => {
        var tiles = document.querySelectorAll('.tile');
        tiles.forEach(function(tile) {
            tile.innerHTML = ""
            tile.classList.remove("green")
        })
        if(gameBoard.getTurn()==2) {
            gameBoard.changeTurn();
        }
        gameBoard.resetBoard();
        document.getElementById("display").innerHTML = "";
    }

    return {
        startGame,
        resetGame, 
    };
})();

