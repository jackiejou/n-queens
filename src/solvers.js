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



window.findNRooksSolution = function(n) {
  //create new board
  var solution = new Board({n: n});
  //create variable to store results (nested array)
  var result;
  //create inner function
  var recursion = function (row) {
    //if row reaches end/size of board
    if (row === n) {
      //push the rows to the result
      result = solution.rows();
      //return it
      return;
    }
    //loop through the board's columns
    for (var i = 0; i < n; i ++) {
      //add piece to the board
      solution.togglePiece(row, i);
      //if that piece does have any conflicts
      if (!solution.hasAnyRooksConflicts()) {
        //toggle that piece back out of the board
        recursion(row + 1); 
      } else {
        solution.togglePiece(row, i); 
      }
    }
  };
  //invoke the inner function
  recursion(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return result;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  //create new board
  var solution = new Board({n: n});
  //create variable to store results (nested array)
  //create inner function
  var recursion = function (row) {
    //if row reaches end/size of board
    if (row === n) {
      //push the rows to the result
      solutionCount++;
      //return it
      return;
    }
    //loop through the board's columns
    for (var i = 0; i < n; i ++) {
      //add piece to the board
      solution.togglePiece(row, i);
      //if that piece does have any conflicts
      if (!solution.hasAnyRooksConflicts()) {
        //toggle that piece back out of the board
        recursion(row + 1);
      }
      solution.togglePiece(row, i);  
    }
  };
  //invoke the inner function
  recursion(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //create new board
debugger;
  var solution = new Board({n: n});
  //create variable to store results (nested array)
  var result;
  if (n === 0 || n === 2 || n === 3) {
    return {n: n};
  }
  //create inner function
  var recursion = function (row) {
    //if row reaches end/size of board
    if (row === n) {
      //push the rows to the result
      result = solution.rows();
      //return it
      return;
    }
    //loop through the board's columns
    for (var i = 0; i < n; i ++) {
      //add piece to the board
      solution.togglePiece(row, i);
      //if that piece does have any conflicts
      if (!solution.hasAnyQueensConflicts()) {
        //toggle that piece back out of the board
        recursion(row + 1); 
      } else {
        solution.togglePiece(row, i); 
      }
      if (row === 0 && !result) {
        var temp = new Board({n: n});
        solution.set(temp.rows());
      }
    }
  };
  //invoke the inner function
  recursion(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return result;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
