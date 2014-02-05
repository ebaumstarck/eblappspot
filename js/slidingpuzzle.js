
var slidingPuzzle = {};

// for the difficulty levels how many pieces to have in the puzzle
slidingPuzzle.Difficulty = {
  'Easy': 9,
  'Standard': 16,
  'Difficult': 25,
  'Suicide': 64
};

slidingPuzzle.difficulty = 'Standard';

// a sliding puyzzle
slidingPuzzle.Puzzle = function(element) {
  //number of slices of the picture
  this.numSlices = slidingPuzzle.Difficulty[slidingPuzzle.difficulty];
  
  //row or columns of the picture n * n 
  this.rows = Math.floor(Math.sqrt(this.numSlices)),
  this.cols = Math.floor(this.numSlices / this.rows);
  this.numSlices = this.rows * this.cols;
  // size of the slice
  this.pieceSize = 400 / this.rows;
  // the this.origin of the puzzle
  this.origin = {
    left: 60,
    // top: 143
    top: 163
  };
  // a count of whether we're this.animating a piece
  this.animating = 0;

  // draw the puzzle
  element.append(
      '<div class="sliding-puzzle game">' +
        '<div class="title">Sliding Puzzle' +
        '</div>' +
        '<div class="difficulty">' +
          _.map(_.keys(slidingPuzzle.Difficulty), function(difficulty) {
            return '' +
                '<input type="radio" id="slidding-puzzle-difficulty-' + difficulty + '" ' +
                      'name="radio" data-difficulty="' + difficulty + '" ' +
                      (slidingPuzzle.difficulty == difficulty ? 'checked="checked" ' : '') +
                      '/>' +
                '<label for="slidding-puzzle-difficulty-' + difficulty + '">' +
                  difficulty +
                '</label>';
          }).join('\n') +
        '</div>' +
        '<div class="board">' +
        '</div>' +
      '</div>');
  $(".sliding-puzzle .difficulty").buttonset();
  $(".sliding-puzzle .difficulty :radio").click(function(e) {
    var difficulty = $(this).data("difficulty");
    slidingPuzzle.difficulty = difficulty;
    slidingPuzzle.DrawPuzzle(element);
  });

  var board = $("#" + element.attr("id") + " .board");
  for(var i = 0 ; i < this.numSlices; i++){
    var topPos = Math.round(Math.floor(i / this.rows) * this.pieceSize);
    var leftPos = Math.round(Math.floor(i % this.rows) * this.pieceSize);
    var classes = "puzzle-piece";
    if (i == this.numSlices - 1) {
      classes += " puzzle-blankPiece";
    }
    board.append(
        '<div class="' + classes + '" '
        + 'style = "top:' + (this.origin.top + topPos) + 'px; '
        + 'left:' + (this.origin.left + leftPos) + 'px; '
        + 'background-position: -' + leftPos + 'px -' + topPos +'px;"></div>');
  }

  board.append(
      '<div class="puzzle-thumbnail">' +
        '<img src="imgs/banana_mochi.jpg" class="thumbnail"></img>' +
      '</div>')
};


// for a piece get its grid index
slidingPuzzle.Puzzle.prototype.getPieceIndex = function(piece) {
  var offset = piece.offset();
  var y = Math.floor((offset.top - this.origin.top) / this.pieceSize);
  var x = Math.floor((offset.left - this.origin.left) / this.pieceSize);
  return {
    x: x,
    y: y
  }
};

// whether two pieces are next to each other
// indices1 - has '{ x: number, y: number }'
// indices2 - has '{ x: number, y: number }'
slidingPuzzle.Puzzle.prototype.isNextTo = function(indices1, indices2) {
  if (indices1.x == indices2.x && Math.abs(indices1.y - indices2.y) == 1) {
    return true;
  }
  if (indices1.y == indices2.y && Math.abs(indices1.x - indices2.x) == 1) {
    return true;
  }
  return false;
};

// swap two pieces' positions
slidingPuzzle.Puzzle.prototype.swap = function(piece1, piece2, animate) {
  var offset1 = piece1.offset();
  var offset2 = piece2.offset();
  if (animate) {
    this.animating = 2;
    piece1.animate(offset2, undefined, undefined, _.bind(function() {
      --this.animating;
    }, this));
    piece2.animate(offset1, undefined, undefined, _.bind(function() {
      --this.animating;
    }, this));
  } else {
    piece1.offset(offset2);
    piece2.offset(offset1);
  }
};

// shuffle the blank piece
slidingPuzzle.Puzzle.prototype.shuffle = function(blankPiece, nSteps) {
  while (nSteps) {
    var blankIndices = this.getPieceIndex(blankPiece);
    // get all possible moves
    var moves = [];
    // move right
    if (blankIndices.x < this.cols - 1) {
      moves.push({
        x: blankIndices.x + 1,
        y: blankIndices.y
      });
    }
    // move left
    if (blankIndices.x > 0) {
      moves.push({
        x: blankIndices.x - 1,
        y: blankIndices.y
      });
    }
    // move up
    if (blankIndices.y < this.rows - 1) {
      moves.push({
        x: blankIndices.x,
        y: blankIndices.y + 1
      });
    }
    // move down
    if (blankIndices.y > 0) {
      moves.push({
        x: blankIndices.x,
        y: blankIndices.y - 1
      });
    }

    // pick a random move
    var move = moves[Math.floor(moves.length * Math.random())];
    var piece = document.elementFromPoint(
        Math.round(move.x * this.pieceSize + this.origin.left),
        Math.round(move.y * this.pieceSize + this.origin.top));
    this.swap(blankPiece, $(piece), false);
    --nSteps;
  }
};


// draws a sliding puzzle inside the element
slidingPuzzle.DrawPuzzle = function(element) {
  if (typeof element == 'string') {
    element = $('#' + element);
  }
  element.html('');
  //automatically create div based on the random number
  var puzzle = new slidingPuzzle.Puzzle(element);

  var blankPiece = $("#" + element.attr("id") + " .puzzle-piece.puzzle-blankPiece");
  puzzle.shuffle(blankPiece, puzzle.numSlices * puzzle.numSlices);
   
  $('.puzzle-piece').
      width(Math.round(puzzle.pieceSize) - 2).
      height(Math.round(puzzle.pieceSize) - 2).
      click(function() {
        if (puzzle.animating > 0) {
          return;
        }
        // check whether the piece is next to the blank piece
        var indices = puzzle.getPieceIndex($(this));
        var blankIndices = puzzle.getPieceIndex(blankPiece);
        if (puzzle.isNextTo(indices, blankIndices)) {
          puzzle.swap($(this), blankPiece, true);
        }
      });
  $('.puzzle-piece').dblclick(function() {
    $(this).toggleClass('puzzle-blankPiece');
  });
};
