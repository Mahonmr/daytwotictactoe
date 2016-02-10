describe('Player', function() {
    it("returns the player's mark", function() {
      var testPlayer = new Player("X", true);
      expect(testPlayer.mark).to.equal("X");
      expect(testPlayer.AI).to.equal(true);
   });
   it("does not allow two players to mark the same space", function() {
     var testPlayer = new Player("X", true);
     var secondTestPlayer = new Player("O");
     var testSpace = new Space(1,2);
     testPlayer.markSpace(testSpace);
     secondTestPlayer.markSpace(testSpace);
     expect(testSpace.marker).to.equal(testPlayer);
  });
});

describe('Space', function() {
    it("returns the player's mark", function() {
      var testSpace = new Space(1,2);
      expect(testSpace.xCoordinate).to.equal(1);
      expect(testSpace.yCoordinate).to.equal(2);
   });

  it("lets a player mark a space", function() {
      var testPlayer = new Player("X", true);
      var testSpace = new Space(1,2);
      testPlayer.markSpace(testSpace);
      expect(testSpace.markedBy()).to.equal(testPlayer);
   });
});

describe('Board', function() {
  it("creates 9 spaces when it is initialized", function() {
    var newBoard = new Board();
    expect(newBoard.nBoard[0].xCoordinate).eql(1);
   });

   it("returns updated board", function() {
     var board = new Board();
     var player = new Player("X", true);

     player.markSpace(board.findSpace(1, 1));
     expect(board.nBoard[0].marker).to.equal(player);
   });
});

describe('Game', function() {
  it("checks all constructor variables", function(){
    var game = new Game(true);
    expect(game.multiplayer).to.equal(true);
    expect(game.players[0].AI).to.equal(false);
    expect(game.currentTurn < 2).to.equal(!undefined);
  });

  it("changes player turn", function() {
    var game = new Game(true);
    var previousTurn = game.currentTurn;
    expect(game.changeTurn()).to.not.equal(previousTurn);
  })
});
