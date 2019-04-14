"use strict";

function main() {
  const hp = 10;
  var player = new Player(hp);

  const game = new Game(player, cardsStack);
  game.cardStack = game.shuffleCards(game.cardStack);
  game.hand = game.getHand(game.cardStack);

  console.log(player);
  console.log(game);

  console.log("cardstack: " + typeof game.cardStack + " " + game.cardsStack);
  console.log("hand: " + game.hand);
  console.log("hp: " + game.player.hp);

  //test
  // game.pickCard(0);

  //create cards and write them into the stack-view
  function createCardsIntoStack() {
    let result = "";
    game.cardStack.forEach(function(ele) {
      result += `
      <li style="list-style-image: url(img/${ele}.png)">${ele}
      </li>`;
    });
    return result;
  }

  function createRoomsIntoMonitor() {
    let result = "";
    game.cardStack.forEach(function(ele) {
      result += `
            <div class="room" style="background-image: url(img/room_open.png)"></div>
`;
    });
    return result;
  }

  function createHandView() {
    let result = "";
    game.hand.forEach(function(ele) {
      result += `
            <div class="hand-card" style="background: url(img/question.png) no-repeat"></div>`;
    });
    return result;
  }

  function createAvatarView() {
    let result = `<div class="avatar-pic" style="background: url(img/avatar.png) no-repeat"></div> `;
    return result;
  }

  // Generate card divs and append them to the stack view
  let stackView = document.querySelector(".cards-list");
  stackView.innerHTML = createCardsIntoStack();

  // Generate rooms and append them to the monitor view
  let monitorView = document.querySelector("#monitor");
  monitorView.innerHTML = createRoomsIntoMonitor();

  // Generate hand 
  let handView = document.querySelector("#hand");
  handView.innerHTML = createHandView();

  // Generate avatar 
  let avatarView = document.querySelector("#avatar");
  avatarView.innerHTML = createAvatarView();



  function checkGameStatus() {
    if (game.player.hp < 1) {
      console.log("GAME OVER");
      // resetGame();
      // run();
    }
  }

  document.addEventListener("keydown", function(event) {
    console.log(event.keyCode);
    if (event.keyCode === 38) {
      game.pickCard(0);
    }
  });
}

window.addEventListener("load", main);

// garbabe
/*{ <div id="stack ul" data-card-name="${ele.name}">
<div class="card-type" name="${ele.img}"></div>
<div class="icon" style="background: url(img/${ele.img}) no-repeat"> </div>
</div> }*/


//       <div class="room" style=background:url(/../../img/room.png)>
//       <img src= url(/../../img/room.png)>
//       </div>

//<div class="card-back" style="background: url(img/question.png) no-repeat"><div>
