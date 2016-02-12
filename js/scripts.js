function Player(mark, isAI) {
  this.mark = mark;
  this.isAI = isAI;
}

Player.prototype.markSpace = function(space) {
  if (space.player === undefined) {
    space.player = this;
  }
}

function Space(xCoordinate, yCoordinate) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.player;
}

Space.prototype.markedBy = function () {
  return this.player;
}

function Board () {
  this.nBoard = [];
  for (var i=1; i <= 3; i++) {
    for (var j=1; j <= 3; j++) {
      var space = new Space(i, j);
      this.nBoard.push(space);
    }
  }
}



Board.prototype.findSpace = function (x, y) {
  for(var indvSpace in this.nBoard) {
    if ((x === this.nBoard[indvSpace].xCoordinate) && (y === this.nBoard[indvSpace].yCoordinate)){
      return this.nBoard[indvSpace];
    }
  }
};

Board.prototype.threeInARow = function(player) {
    var rows = [[0,4,8],[2,4,6],[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8]];
    var board = this;
    // console.log("we are in threeInARow");
    // console.log(board.nBoard[0].markedBy());
    // console.log("what the hell is player");
    // console.log(player)
    return rows.some(function(winningCombo) {
      return (board.nBoard[winningCombo[0]].markedBy() === player && board.nBoard[winningCombo[1]].markedBy() === player && board.nBoard[winningCombo[2]].markedBy() === player);
    });
  }

function Game(multiplayer) {
  this.multiplayer = multiplayer;
  this.players = [];
  this.currentTurn = Math.floor(Math.random() * 2) ;
  this.board = new Board();

  this.players.push(new Player("X", false));
  if(multiplayer === true) {
    this.players.push(new Player("O", false));
  } else {
    this.players.push(new Player("O", true));
  }
}

  Game.prototype.changeTurn = function () {
    if(this.currentTurn === 0) {
      this.currentTurn = 1;
      return 1;
    } else {
      this.currentTurn = 0;
      return 0;
    }
  }

  Game.prototype.findWinner = function() {
    if ((this.board.findSpace(1, 1).markedBy() && this.board.findSpace(2, 2).markedBy() && this.board.findSpace(3, 3).markedBy()) || (this.board.findSpace(3, 1).markedBy() && this.board.findSpace(2, 2).markedBy() && this.board.findSpace(1, 3).markedBy())) {
      return this.board.findSpace(2, 2).markedBy();
    }
    //debugger;
    var check = undefined;
    var notMatch = true;
    for (var i = 1; i <= 3; i++) {
      for (var j = 1; j <= 3; j++) {
        if (this.board.findSpace(i, j).markedBy() != undefined) {
          if (check === undefined) {
            check = this.board.findSpace(i, j).markedBy().mark;
          } else if (check = this.board.findSpace(i, j).markedBy().mark) {
            notMatch = false;
          } else {
            notMatch = true;
          }
        }
      }
      if (notMatch = false) {
        return this.board.findSpace(i, j-1).markedBy();
      }
      check = undefined;
    }

    for (var i = 1; i <= 3; i++) {
      for (var j = 1; j <= 3; j++) {
        if (this.board.findSpace(j, i).markedBy() != undefined) {
          if (check === undefined) {
            check = this.board.findSpace(j, i).markedBy().mark;
          } else if (check = this.board.findSpace(j, i).markedBy().mark) {
            notMatch = false;
          } else {
            notMatch = true;
          }
        }
      }
    if (!notMatch) {
      return this.board.findSpace(j-1, i).markedBy();
    }
    check = undefined;
  }
}

$(document).ready(function() {
  $("form#new-game").submit(function(event) {
    event.preventDefault();
    new_game = new Game();
    console.log(new_game)
  });


  $('.row').on("click", ".squares", function() {
    space = (new_game.board.nBoard[parseInt(this.id)]);
    turn = new_game.changeTurn();
    player = new_game.players[turn];
    player.markSpace(space);
    $(this).text(player.mark).removeClass("squares");

    if (new_game.board.threeInARow(player)) {
      alert(player.mark + ' is the winner!');
    }

  });
});
