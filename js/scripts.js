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
    return (this.currentTurn === 0)? 1: 0;
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
      if (!notMatch) {
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
    new_board = new Board();
  });

  $('.row').on("click", "div", function() {
  console.log(this);
  });
});
