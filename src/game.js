"use strict";

function Game(player, cardStack) {
  this.player = player;
  this.cardStack = cardStack;
  this.hand = [];
  this.disposal = [];
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
  this.setTipCallback("game-hand: " + hand);
  return hand;
};

// Game.prototype.pickCard = function(slotNumber) {
//   if (slotNumber >= this.hand.length) {
//     console.log(
//       "this card is not in your hand. choose less than: " + this.hand.length
//     );
//     return;
//   }
//   for (var i = 0; i < this.hand.length; i++) {
//     if (i === slotNumber) {
//       console.log("Your movement is: " + this.hand[slotNumber]);
//       return slotNumber;
//     }
//   }
// };

Game.prototype.discardCardAfterUse = function(index) {
  this.hand.splice(index, 1);
};

Game.prototype.checkCard = function(card) {
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

Game.prototype.checkHandStatus = function() {
  if (this.hand.length < 2) {
    this.flush();
    console.log("hey, Im in check. this is cardStack: " + this.cardStack);
    this.hand = this.getHand(this.cardStack);
  }
};

Game.prototype.setTipCallback = function(updateTipText) {
  this.updateTipText = updateTipText;
  this.callback(this.updateTipText);
};
