"use strict";

function main() {
  const hp = 10;
  var player = new Player(hp);

  const game = new Game(player, cardsStack);
  game.cardStack = game.shuffleCards(game.cardStack);
  game.hand = game.getHand(game.cardStack);

  console.log(player);
  console.log(game);

  console.log("cardstack: " + game.cardsStack);
  console.log("hand: " + game.hand);
  console.log("hp: " + game.player.hp);
}

window.addEventListener("load", main);
