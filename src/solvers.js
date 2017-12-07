/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.recursion = function (row, n, board, test, callback) {
  //if row reaches end/size of board
  if (row === n) {
    //push the rows to the result
    return callback();
  }
  //loop through the board's columns
  for (var i = 0; i < n; i ++) {
    //add piece to the board
    board.togglePiece(row, i);
    //if that piece does have any conflicts
    if (!board[test]()) {
      //toggle that piece back out of the board
      var result = recursion(row + 1, n, board, test, callback);
      if (result) {
        return result;
      }
    }
    board.togglePiece(row, i); 
  }
};

window.findNRooksSolution = function(n) {
  //create new board
  var board = new Board({n: n});
  //create variable to store results (nested array)
  var result = recursion(0, n, board, 'hasAnyRooksConflicts', function() {
    return board.rows().map(function(row) {
      return row.slice();
    });
  });
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(result));
  return result;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  
  //create new board
  var board = new Board({n: n});
  var solutionCount = 0;
  //invoke the inner function
  recursion(0, n, board, 'hasAnyRooksConflicts', function () {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //create new board
  var board = new Board({n: n});
  //create variable to store results (nested array)

  //invoke the inner function
  var result = recursion(0, n, board, 'hasAnyQueensConflicts', function () {
    return board.rows().map(function(row) {
      return row.slice();
    });
  });
  // if there are no solutions, return the blank board
  result = result || board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(result));
  return result;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0;
  
  recursion(0, n, board, 'hasAnyQueensConflicts', function () {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
