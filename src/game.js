"use strict";

class Game {
  constructor (player, newCardsStack, newRooms){
  this.player = player;
  this.cardStack = newCardsStack;
  this.hand = [];
  this.handDivs = [];
  this.usedCards = [];
  this.adventureStep = 0;
  this.rooms = newRooms;
  this.visitedRoomsValue =[];
  this.visitedBackgrounds =[];
  this.callback = null;
  this.audioCallBack = null;
}

shuffleCards(array) {
  let result = []; //wtf, gives undefined
  for (; array.length > 0; ) {
    let randomNumber = Math.floor(Math.random() * array.length);
    let randomCard = array.splice(randomNumber, 1);

    result.push(randomCard[0]);
  }

  return result;
}

initializeRooms() {
  return this.cardStack.length;
};

getHand (array) {
  this.hand = [];
  if (array.length > 0) {
    for (var i = 0; i < 4; i++) {
      var randomCard = Math.random() * array.length;
      let cardToPass = array.pop();
      this.hand.push(cardToPass);
    }
  }

};

discardCardAfterUse(index) {
  this.hand[index].isUsed = true;
};

makeCardAction (card) {
  switch (card) {
    case "fight":
    // lifeSnd
      this.fight();
      break;
    case "hole":
      this.hole();
      break;
    case "life":
      this.life();
      break;
  }
};
fight () {
  let damage = parseInt(1 + Math.random() * 4);
  this.player.hp -= damage;

  this.callback(
    "What a fight!! The damage is: " +
      damage +
      " Now your life points are: " +
      this.player.hp
  );
};

hole () {
this.player.hp = 0;
  this.callback("You felt into the hole. You are dead.");
};

life  () {
  this.player.hp = 10;
  this.callback("You ate chicken. Your HP is: " + this.player.hp);
};

checkIfCardsNeeded () {
  let counter = this.hand.length;
  this.hand.forEach((card) => {

    if (card.isUsed === true) {
      counter--;
    }

  });
  if (counter < 2) {
    return true;
  } else {
    return false;
  }
};

flush  () {
  this.hand = [];
};

setTipCallback  (updateTipText) {
  this.updateTipText = updateTipText;
  this.callback(this.updateTipText);
};
}
