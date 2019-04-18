"use strict";

// -------------- MAIN --------------------

function main() {
  function buildDom(html) {
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = html;
    return mainElement;
  }

  // -------------- SPLASH --------------------

  function buildSplashScreen() {
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
    <div id="stack">
    <h2>Cards Stack</h2>
    <ul class="cards-list"></ul>
  </div>
      <div id="monitor"></div>
      <div id="avatar">
        <!-- <h2 class=".hp"></h2> -->
      </div>
      <div id="hand">
      <div class="hand-opened">
        <h2>Your Cards</h2>
        </div>
      </div>
      <div class="life-ui"></div>
      <div id="tip">
        <p>---TIPS HERE---- <span id="tip-text"></span></p>

      </div>
    </div>
`);

    const hp = 10;
    var player = new Player(hp);
    var cardStackForGame = JSON.parse(JSON.stringify(newCardsStack));
    var newRoomsCopy = JSON.parse(JSON.stringify(newRooms));
    
    const game = new Game(player, cardStackForGame, newRoomsCopy);
    game.callback = tip;
    game.cardStack = game.shuffleCards(game.cardStack);
    game.getHand(game.cardStack);

    function updateStack() {
      // Generate card divs and append them to the stack view
      let stackView = document.querySelector(".cards-list");
      let result = "";
      game.cardStack.forEach(function(ele) {
        result += `
      <li style="list-style-image: url(img/${ele.value}.png)">${ele.value}
      </li>`;
      });
      stackView.innerHTML = result;
    }

    // Generate rooms and append them to the monitor view
    function updateRoomsIntoMonitor(cardValue) {
      let result = "";
      let monitorView = document.querySelector("#monitor");
      
      
      game.rooms.forEach(function(ele, index) {
        if (game.adventureStep < index) {
          return;
        }
        
        var anim = "";
        console.log ("game.rooms",game.rooms);
        
        if (!game.rooms[index].visited) {
          
          anim = "animation: play 0.8s steps(2) 2";
          game.rooms[index].value = cardValue;
          game.rooms[index].visited = true;
          var randomBackground = Math.trunc(Math.random() * 4);
          
          
          game.visitedBackgrounds[index] = randomBackground;




          result += `
          <div class="room ${game.adventureStep}" style="background-image:url(img/bg_${game.visitedBackgrounds[index]}.png); ">
          <img class="room-action" src="img/${game.rooms[index].value}_room_open.png"; style="${anim};"/><h2>${index}</h2></div>`;
          // console.log("result string: " + result);

          game.visitedRoomsValue[index] = [game.rooms[index].value];
          game.visitedBackgrounds[index] = randomBackground;

        } else {
          result += `<div class="room ${game.adventureStep}" style="background-image:url(img/bg_${game.visitedBackgrounds[index]}.png); ${anim}" ><h2>${index}</h2></div>`;
        }

        // console.log(
        //   "game.adventureStep " + game.adventureStep + " index " + index
        // );
        // console.log("monitor ele value: " + ele.value + " " + cardValue);
        // console.log("anim: " + anim);
        // console.log("--------------------");
      });
      monitorView.innerHTML = result;
    }

    // Generate hand
    function updateHandView() {
      let handView = document.querySelector("#hand");
      let result = "";
      game.hand.forEach(function(ele, index) {
        result += `
            <div class="hand-card" index="${index}" style="background: url(img/question.png) no-repeat"></div>`;
      });

      handView.innerHTML = result;
      game.handDivs = document.querySelectorAll(".hand-card");
    }

    // Generate avatar
    function updateAvatarView() {
      let avatarView = document.querySelector("#avatar");
      let lifeUI = document.querySelector(".life-ui");
      let n = "";
      if (game.player.hp > 7) {
        n = "";
      }
      if (game.player.hp < 5) {
        n = "2";
      }
      if (game.player.hp < 3) {
        n = "3";
      }
      if (game.player.hp < 1) {
        n = "4";
      }

      let result = "";
      let resultLifeStats = "";
      if (game.player.hp > 0) {
        result = `<img style="background: url(img/avatar_${n}.png) center no-repeat"> `;
      resultLifeStats = `<h2 class="life-ui">LIFE: ${
        game.player.hp
      } </h2>`;
      } else {
        result = `<img style="background: url(img/avatar_${n}.png) center no-repeat">`;
      resultLifeStats = `<h2 class="life-ui">+DEAD+</h2>`;
      }
      avatarView.innerHTML = result;
      lifeUI.innerHTML = resultLifeStats;
    }

    function tip(msg) {
      var speed = 25;
      var i = 0;
      let tipview = document.querySelector("#tip");
      let txt = "";

      function type() {
        if (i < msg.length) {
          txt += msg.charAt(i);
          let result = `<p id="tip-text1">${txt}</p> `;
          tipview.innerHTML = result;
          i++;
          setTimeout(type, speed);
        }
      }
      type();
    }

    function selectCard() {
      let index = this.attributes.index.value;
      this.removeEventListener("onmouseenter", selectCard);
      this.setAttribute("id", "hand-card-back");
      displayCard(index);

      game.adventureStep++;

      game.makeCardAction(game.hand[index].value);
      updateAvatarView();

      updateRoomsIntoMonitor(game.hand[index].value);
      checkIfGameOver();
      game.discardCardAfterUse(index);

      if (game.checkIfCardsNeeded() && game.player.hp > 0) {
        closeCardBox();

        const time = 1000;
        let timedown = 5;
        const intervalId = setInterval(function() {
          timedown--;
          tip("New cards in  " + timedown);
          if (timedown === 0) {
            flush(intervalId);
          }
        }, time);
      }
    }

    function flush(t) {
      openCardBox();
      tip("New Round. Pick a card young fellow.");
      clearInterval(t);
      game.getHand(game.cardStack);
      updateHandView();
      updateStack();

      nextTurn();
    }

    function createHandListeners(handDiv) {
      handDiv.forEach(function(e, i) {
        handDiv[i].addEventListener("click", selectCard);
        // e.preventDefault();
      });
    }

    function nextTurn() {
      createHandListeners(game.handDivs);
    }

    function checkIfGameOver() {
      if (game.player.hp < 1) {
        tip("Sorry GAME OVER");
        closeCardBox();
        setTimeout(buildGameOVerScreen, 5000);
      }
    }

    function displayCard(index) {
      game.handDivs[index].style.background = `url(img/${
        game.hand[index].value
      }.png) center no-repeat`;
    }

    function closeCardBox() {
      game.handDivs.forEach(function(e) {
        var cardsBox = document.querySelectorAll(".hand-card");

        cardsBox.forEach(function(e, i) {
          e.removeAttribute("class", "hand-card");
          e.removeAttribute("id", "hand-card-back");
          e.style.background = ""; // removeAttribute("class","background");
          e.setAttribute("class", "hand-closed");
        });

      });
    }

    function openCardBox() {
      var thing = document.querySelectorAll(".hand-closed");

      thing.forEach(function(e, i) {
        e.removeAttribute("class", "hand-closed");
        e.setAttribute("class", "hand-card");
        e.setAttribute("class", "hand-open");
      });
    }

    //first state
    updateStack();
    updateRoomsIntoMonitor("start");
    updateHandView();
    updateAvatarView();
    nextTurn();

    tip(
      "Welcome to <color:#F44>jungle Rumble</color>. Pick a card and enjoy. Your hp: " +
        game.player.hp
    );
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
    restartButton.addEventListener("click", buildGameScreen);
  }

  //TOOL
  document.addEventListener("keydown", function(event) {
    if (event.keyCode === 38) {
      buildGameScreen();
    }
  });
}
window.addEventListener("load", main);





// function tip(msg) {
//   let txt = [];
//   let tipview = document.querySelector("#tip");
//   let speed = 8000;

//   console.log("msg: " +msg);

//   function typeIt(letter){
//     // [...txt + letter].forEach((letter)=>{
//       txt.push(letter);
//       let txtButJoined = txt.join('')

//       console.log("text " + txtButJoined);

//       let result = `<p id="tip-text1">${txtButJoined}</p> `;
//       tipview.innerHTML = result;

//       console.log(txt);
//       // setTimeout(typeIt, speed);
//       // i++;
//     }
//     [...msg].forEach((letter)=> setTimeout(()=>{typeIt(letter)},speed))
//     // typeIt();
//   }
