
// the list of all games we can play
var games = [];

function RandomGame() {
  return games[Math.floor(games.length * Math.random())];
}

function Play(game) {
  var element = $("#body");
  element.html("");
  if (game == "Tic Tac Toe") {
    tictactoe.MakeBoard(element);
  } else if (game == "Sliding Puzzle") {
    slidingPuzzle.DrawPuzzle(element);
  } else if (game == "Chinese-English Flash Cards") {
    flashcards.Draw(element);
  } else if (game == "Chess") {
    chess.DrawBoard(element);
  } else {
    // recommend a random game
    // var random = games[Math.floor(games.length * Math.random())];
    // $("#body").html(
    //     'How about a nice game of ' + random + '?');
  }
}

$(function() {
  $("#left-menu").accordion();

  games = _.map($("#left-menu a.play"), function(elem) {
    return $(elem).data("game");
  });
  // console.log(games);

  // make the play links work
  $("#left-menu a.play").click(function() {
    var game = $(this).data("game");
    Play(game);
  });

  Play(RandomGame());
});
