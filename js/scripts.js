function Player(mark, AI) {
  this.mark = mark;
  this.AI = AI;
}

Player.prototype.markSpace = function(space) {
  if (space.marker === undefined) {
    space.marker = this;
  }
}

function Space(xCoordinate, yCoordinate) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.marker;
}

Space.prototype.markedBy = function () {
  return this.marker;
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

  this.players.push(new Player("X", false));
  if(multiplayer === true) {
    this.players.push(new Player("O", false));
  } else {
    this.players.push(new Player("O", true));
  }

  Game.prototype.changeTurn = function () {
    return (this.currentTurn === 0)? 1: 0;
  }

}
