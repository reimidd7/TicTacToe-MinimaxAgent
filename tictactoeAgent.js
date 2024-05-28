class Agent {
    constructor() {}

    minimax(board, isMaximizing) {
        // Base cases - check if the game is over or a draw
        var result = board.gameOver();
        if (result === 1) return 1; // X wins
        if (result === 2) return -1; // O wins
        if (result === 3) return 0; // Draw
    
        if (isMaximizing) {
            var bestScore = -Infinity;
            for (var i = 1; i <= 9; i++) {
                if (board.cellFree(i)) {
                    var newBoard = board.clone();
                    newBoard.move(i);
                    var score = this.minimax(newBoard, false);
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            var bestScore = Infinity;
            for (var i = 1; i <= 9; i++) {
                if (board.cellFree(i)) {
                    var newBoard = board.clone();
                    newBoard.move(i);
                    var score = this.minimax(newBoard, true);
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    selectMove(board) {
     // Define the initial best score and move
     var maxScore = -Infinity;
     var maxMove = null;

     var minScore = Infinity;
     var minMove = null;

     // Loop through each cell to evaluate the best move
     for (var i = 0; i < board.cells.length; i++) {
         var cell = i + 1;
         if (board.cellFree(cell)) {
             // Make a move on the current cell
             var newBoard = board.clone();
             newBoard.move(cell);

             // Calculate the score for the current move
             var score = this.minimax(newBoard, !board.playerOne);

             // Update the best move if the current move has a higher score
             if (score > maxScore) {
                 maxScore = score;
                 maxMove = cell;
             }
             if (score < minScore) {
                 minScore = score;
                 minMove = cell;
             }
         }
     }

     return board.playerOne ? maxMove : minMove;
}

}
