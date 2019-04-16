"use strict";

function main() {
  const mainElement = document.querySelector("main");

  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  }

  // -------------- GAME --------------------

  function buildSplashScreen() {
    // clearInterval(timerForGameOver);

    const splashScreen = buildDom(`
<section>
  <h1>Jungle Rumble Cards Adventure</h1>
  <button class="start-button">Start Game</button>
  </section>
`);
    const startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", buildGameScreen);
  }

  buildSplashScreen();

  // -------------- GAME --------------------

  function buildGameScreen() {
    const gameScreen = buildDom(`
<div id="title">
      <h1>Jungle Rumble Cards Adventure </h1>
    </div>
    <div id="game-view">
      <div id="monitor"></div>
      <div id="stack">
        <h2>Cards Stack</h2>
        <ul class="cards-list"></ul>
      </div>
      <div id="hand">
        <h2>Your Cards</h2>
      </div>
      <div id="avatar">
        <!-- <h2 class=".hp"></h2> -->
      </div>
      <div id="tip">
        <p>Here are the tips: <span id="tip-text"></span></p>

      </div>
    </div>


`);

    const hp = 10;
    var player = new Player(hp);

    const game = new Game(player, cardsStack,newRooms);
    game.callback = updateTipText;
    game.cardStack = game.shuffleCards(game.cardStack);
    game.hand = game.getHand(game.cardStack);

    function updateStack() {
      // Generate card divs and append them to the stack view
      let stackView = document.querySelector(".cards-list");
      let result = "";
      game.cardStack.forEach(function(ele) {
        result += `
      <li style="list-style-image: url(img/${ele}.png)">${ele}
      </li>`;
      });
      stackView.innerHTML = result;
    }

    // Generate rooms and append them to the monitor view
    function updateRoomsIntoMonitor() {
      let monitorView = document.querySelector("#monitor");
      let result = "";
      game.rooms.forEach(function(ele, index) {
        if (index === 0){
          ele.value = "start";
          game.rooms[0] = "start";
        }
        result += `
            <div class="room ${index}" style="background-image: url(img/${ele.value}_room_open.png)"></div>
`;
      });
      monitorView.innerHTML = result;
    }

    // Generate hand
    function updateHandView() {
      let handView = document.querySelector("#hand");
      let result = "";
      game.hand.forEach(function(ele, index) {
        result += `
            <div class="hand-card" style="background: url(img/question.png) no-repeat"></div>`;
      });
      handView.innerHTML = result;
    }

    // Generate avatar
    function updateAvatarView() {
      let avatarView = document.querySelector("#avatar");
      let result = `<img style="background: url(img/avatar.png) center no-repeat">
      <h2 class="hp">LIFE: ${game.player.hp}</h2>
     `;
      avatarView.innerHTML = result;
    }

    // Generate avatar
    function updateTipText(msg) {
      let tipview = document.querySelector("#tip");
      let result = `<p id="tip-text1">${msg}</p> `;
      tipview.innerHTML = result;
    }

    function createHandListeners(handCards) {
      handCards.forEach(function(card, index) {
        card.addEventListener("click", function() {
          displayCard(index, this);

          game.makeCardAction(game.hand[index]);
          updateAvatarView();
          updateRoomsIntoMonitor();
          checkIfGameOver();
          game.discardCardAfterUse(game.hand[index]);

          if (game.checkIfCardsNeeded()) {
            console.log(game.checkIfCardsNeeded());
            setTimeout(displayCard(index, this), 1000);

            game.flush();
            game.hand = game.getHand(game.cardStack);
            updateHandView();
            updateStack();

            nextTurn();
          }
        });
      });
    }

    function nextTurn() {
      let handCards = document.querySelectorAll(".hand-card");
      createHandListeners(handCards);
    }

    function checkIfGameOver() {
      if (game.player.hp < 1) {
        updateTipText("GAME OVER");
        game.timerForGameOver = setTimeout(buildGameOVerScreen, 1000);
      }
    }


    function displayCard(index, element) {
      element.style.background = `url(img/${game.hand[index]}.png) no-repeat`;
    }

    //first state
    updateStack();
    updateRoomsIntoMonitor();
    updateHandView();
    updateAvatarView();
    nextTurn();

    updateTipText("Welcome");
    updateTipText(
      "cardstack: " + typeof game.cardStack + " " + game.cardsStack
    );
    updateTipText("hand: " + game.hand);
    updateTipText("hp: " + game.player.hp);
  }

  // -------------- OVER --------------------

  function buildGameOVerScreen() {
    const gameOverScreen = buildDom(`
    <section>
    <h1>Game Over</h1>
    <button class="restart-button">Restart</button>
    </section>
    `);
    const restartButton = document.querySelector(".restart-button");
    restartButton.addEventListener("click", buildSplashScreen);
  }

      //TOOL
      document.addEventListener("keydown", function(event) {
        console.log(event.keyCode);
        if (event.keyCode === 38) {
          buildGameScreen();
        }
      });

}
window.addEventListener("load", main);
