
var tictactoe = {};

// The players
tictactoe.Players = {
  X: "X",
  O: "O"
};

// A Tic Tac Toe board.
tictactoe.Board = function() {
  this.N = 3;
  this.board = [['','',''],['','',''],['','','']];
  // Whose turn it is.
  this.player = tictactoe.Players.X;
};


// Whether the game is done (no more moves), or won.
tictactoe.Board.prototype.IsDone = function() {
  if (this.Winner()) {
    return true;
  }
  for (var row = 0; row < this.N; ++row) {
    for (var col = 0; col < this.N; ++col) {
      if (this.board[row][col] == '') {
        return false;
      }
    }
  }
  return true;
};


// The player wants to go at space (x, y). Return true if they could.
tictactoe.Board.prototype.PlaceMove = function(x, y) {
  if (this.board[y][x] == '') {
    this.board[y][x] = this.player;
    this.player = this.player == tictactoe.Players.X ?
        tictactoe.Players.O : tictactoe.Players.X;
    return true;
  } else {
    return false;
  }
};


// Check if the 'player' has won the game.
tictactoe.Board.prototype.HasWon = function(player) {
  //check all the items in each row
  var self = this;
  for (var rowI = 0; rowI < self.N; ++rowI) {
    var row = self.board[rowI];
    if (_.all(row, function(elem) { return elem == player; })) {
      return true;
    }
  }
  //check all the items in each column
  for (var columnIdx = 0; columnIdx < self.N; columnIdx++) {
    if (_.all(
        _.range(self.N), function(rowIdx) {
          return self.board[rowIdx][columnIdx] == player;
        })) {
      return true;
    }
  }
  //check the '/'-style diagonal
  if (_.all(
      _.range(self.N), function(idx) {
        return self.board[idx][idx] == player;
      })) {
    return true;
  }
  //check the '\'-style diagonal
  if (_.all(
      _.range(self.N), function(idx) {
        return self.board[idx][self.N - 1 - idx] == player;
      })) {
    return true;
  }
  return false;
};


// Check if there is a winner in the game and return who it is.
tictactoe.Board.prototype.Winner = function() {
  if (this.HasWon(tictactoe.Players.X)) {
    return tictactoe.Players.X;
  } else if (this.HasWon(tictactoe.Players.O)) {
    return tictactoe.Players.O;
  } else {
    return null;
  }
};


// Draws the given Tic Tac Toe board in the place.
tictactoe.DrawBoard = function(element, board) {
  // console.log(board.board);
  var status;
  if (board.IsDone()) {
    var winner = board.Winner();
    status = winner ? winner + " is the winner!  \\o/" : "It's a draw. :-(";
  } else {
    status = "It's " + board.player + "'s turn.";
  }
  element.html(
      '<div class="tic-tac-toe game">' +
        '<div class="title">Tic Tac Toe' +
        '</div>' +
        '<div class="board">' +
          '<table>' +
          _.map(board.board, function(row, rowIdx) {
            return '<tr>' + 
                _.map(row, function(cell, columnIdx) {
                  return '<td class="' + (rowIdx == 1 ? 'middle' : '') + ' ' +
                                         (columnIdx == 1 ? 'center' : '') + '" ' +
                             'id="' + rowIdx + '_' + columnIdx + '">' +
                      (cell ? cell : '&nbsp;') + '</td>';
                }).join('\n') +
                '</tr>';
          }).join('\n') +
          '</table>' +
        '</div>' +
        '<div class="status">' +
          status +
        '</div>' +
      '</div>');
  if (!board.IsDone()) {
    // wire up the logic
    tictactoe.ControlBoard(element, board);
  }
};


// place events on the board
tictactoe.ControlBoard = function(element, board) {
  $("#" + element.attr("id") + " td").click(function() {
    var cellId = $(this).attr("id");
    var posXY = cellId.split('_'),
      y = parseInt(posXY[0]),
      x = parseInt(posXY[1]);
      console.log(x + ", " + y);
    var player = board.player;
    if (board.PlaceMove(x, y)) {
      if (board.HasWon(player)) {
        console.log("Player " + player + " has won!");
      } else if (board.IsDone()) {
        console.log("It's a draw!");
      }
      tictactoe.DrawBoard(element, board);
    } else {
      console.log('already placed item');
      return;
    }
  });
}


// makes a board in the element
tictactoe.MakeBoard = function(element) {
  if (typeof element == 'string') {
    element = $('#' + element);
  }
  var board = new tictactoe.Board();
  tictactoe.DrawBoard(element, board);
  return board;
};
