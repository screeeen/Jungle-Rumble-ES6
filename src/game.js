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
  console.log("game-hand: " + hand);
  return hand;
};

Game.prototype.pickCard = function(slotNumber) {
  if (slotNumber >= this.hand.length) {
    console.log(
      "this card is not in your hand. choose less than: " + this.hand.length
    );
    return;
  }
  for (var i = 0; i < this.hand.length; i++) {
    if (i === slotNumber) {
      console.log("Your movement is: " + this.hand[slotNumber]);
      this.checkCard(this.hand[slotNumber]);
      this.hand.splice(i, 1);
    }
  }
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
  this.checkHandStatus();
  // displayStatus();
};

Game.prototype.fight = function() {
  let damage = parseInt(1 + Math.random() * 4);
  this.player.hp -= damage;

  console.log(
    "The fight has broke your jaw in pieces and damage is: " +
      damage +
      "\n Now your HP is: " +
      this.player.hp
  );
};

Game.prototype.hole = function() {
  this.player.hp = 0;
  console.log("You felt into the hole. You are dead.");
};

Game.prototype.life = function() {
  this.player.hp = 10;
  console.log("You ate chicken. Your HP is: " + this.player.HP);
};

Game.prototype.flush = function() {
  this.disposal = this.hand.slice();
  this.hand = [];
  console.log(
    "----------FLUSH------------ \n " + " Disposal Card: " + this.disposal
  );
};

Game.prototype.checkHandStatus = function(){
  if (this.hand.length < 2) {
    this.flush();
    console.log("hey, Im in check. this is cardStack: " + this.cardStack);
    this.hand = this.getHand(this.cardStack);
  }
}
