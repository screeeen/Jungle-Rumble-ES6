"use strict";

function Game(player, cardStack) {
  this.player = player;
  this.cardStack = cardStack;
  this.hand = [];
  this.usedCards = [];
  this.usedCardsCounter = 0;
  this.disposal = [];
  this.timerForGameOver = undefined;
  this.callback = null;
}

Game.prototype.shuffleCards = function(array) {
  let result = []; //wtf, gives undefined
  for (; array.length > 0; ) {
    let randomNumber = Math.floor(Math.random() * array.length);
    let randomCard = array.splice(randomNumber, 1);

    result.push(randomCard[0]);
  }
  this.setTipCallback("game-shuffle: " + result);

  return result;
};

Game.prototype.getHand = function(array) {
  let hand = [];
  for (var i = 0; i < 4; i++) {
    var randomCard = Math.random() * array.length;
    let cardToPass = array.pop();
    hand.push(cardToPass);
  }
  this.usedCardsCounter+=1;
  this.setTipCallback("game-hand: " + hand);
  return hand;
};

Game.prototype.discardCardAfterUse = function(index) {
  
  this.usedCards = this.hand.splice(index, 1);
  this.usedCardsCounter+=1;
};

Game.prototype.makeCardAction = function(card) {
  switch (card) {
    case "fight":
      this.fight();
      break;
    case "hole":
      this.hole();
      break;
    case "life":
      this.life();
      break;
  }
  // game status
  //this.checkHandStatus(); // check if needs to flush and draw
  // update the view
  // displayStatus();
};

Game.prototype.fight = function() {
  let damage = parseInt(1 + Math.random() * 4);
  this.player.hp -= damage;

  this.callback(
    "The fight has broke your jaw in pieces and damage is: " +
      damage +
      "\n Now your HP is: " +
      this.player.hp
  );
};

Game.prototype.hole = function() {
  this.player.hp = 0;
  this.callback("You felt into the hole. You are dead.");
};

Game.prototype.life = function() {
  this.player.hp = 10;
  this.callback("You ate chicken. Your HP is: " + this.player.hp);
};

Game.prototype.flush = function() {
  this.disposal = this.hand.slice();
  this.hand = [];
  this.callback(
    "----------FLUSH------------ \n " + " Disposal Card: " + this.disposal
  );
};

Game.prototype.checkIfNewCardsAreNeeded = function() {
  if (this.usedCardsCounter < 2) {
    console.log("check t: " + this.hand.length);
    return true;
  } else {
    console.log("check f: " + this.hand.length);
    return false;
  }
};

Game.prototype.setTipCallback = function(updateTipText) {
  this.updateTipText = updateTipText;
  this.callback(this.updateTipText);
};
