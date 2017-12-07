// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // get all elements at rowIndex and sum all elements and check if sum is greateer than one
      return this.get(rowIndex).reduce((sum, num) => sum + num) > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // get size of board
      // loop through each rows and call hasRowConflict
        // if any is true, return true,
      var size = this.get('n'); // get size of board
      for (var i = 0; i < size; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //create array to store column values
      let column = [];
      //get size value
      let size = this.get('n'); 
      //loop through each row to get colIndex value
      for (var i = 0; i < size; i++) {
        //push that value into array
        column.push(this.get(i)[colIndex]);
      }
      //reduce column array to get sum
      return column.reduce((sum, num) => sum + num) > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var size = this.get('n'); // get size of board
      for (var i = 0; i < size; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //create empty array to store diagonal values
      let majDiag = [];
      //set variable for size
      let size = this.get('n');
      //loop through each row
      for (var i = 0; i < size; i++) { //row number //
        //loop through each value in column number
        for (var j = 0; j < size; j++) { //column number //
          //compare column and row coordinates
          if ((j - i) === majorDiagonalColumnIndexAtFirstRow) {
          //push coordinates that match majorDiagonalColumnIndexAtFirstRow
            majDiag.push(this.get(i)[j]); //i = which row v // j = which column =>
          }
        }
      }
      //reduce to find sum of array > 1 ?
      return majDiag.reduce((sum, num) => sum + num) > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() { //-(n - 2)// colIndex - rowIndex, -2 to cancel out corners
      //get size
      let size = this.get('n');
      //loop through each diagonal
      for (var i = 2 - size; i < size - 1; i++) {
        //run hasMajorDiagonalConflictAt on each value (if)
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //create empty array to store diagonal values
      let minDiag = [];
      //set variable for size
      let size = this.get('n');
      //loop through each row
      for (var i = 0; i < size; i++) { //row number //
        //loop through each value in column number
        for (var j = 0; j < size; j++) { //column number //
          //compare column and row coordinates
          if ((i + j) === minorDiagonalColumnIndexAtFirstRow) {
          //push coordinates that match minorDiagonalColumnIndexAtFirstRow
            minDiag.push(this.get(i)[j]); //i = which row v // j = which column =>
          }
        }
      }
      //reduce to find sum of array > 1 ?
      return minDiag.reduce((sum, num) => sum + num) > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //get size
      let size = this.get('n');
      //loop through each diagonal
      for (var i = 1; i < size + 2; i++) { // end at size + 2 bc skip corner and count including size + 1
        //run hasMinorDiagonalConflictAt on each value (if)
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
