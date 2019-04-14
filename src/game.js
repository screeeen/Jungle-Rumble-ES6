"use strict";

function Game(player, cardStack) {
  this.player = player;
  this.cardStack = cardStack;
  this.hand = [];
  this.disposal = [];
}

Game.prototype.shuffleCards = function(array) {
  let result = []; //wtf, gives undefined
  for (; array.length > 0; ) {
    let randomNumber = Math.floor(Math.random() * array.length);
    let randomCard = array.splice(randomNumber, 1);

    result.push(randomCard[0]);
  }
  console.log("game-shuffle: " + result);
  return result;
};

Game.prototype.getHand = function(array) {
  let hand = [];
  for (var i = 0; i < 4; i++) {
    var randomCard = Math.random() * array.length;
    let cardToPass = array.pop();
    hand.push(cardToPass);
  }
  console.log("game-hand: "+ hand);
  return hand;
};
