
![title](title.png)

Rumble Jungle - Card Adventure


## Description
Rumble Jungle is a digital adventure where the a explorer makes their way thought the jungle.

The player has 16 cards from the stack. The cards are given in hands of 4. Once the cards are given, their front face is no more visible, so **it's up to the good venture to choose the right card!**

Every hand is played until 1 card remains in the hand. Then, the remaining card is discarded, and a new hand is sorted from the stack.

Each card represents an action in the journey. This actions can be a fight, eat, get killed by a perill.

The player wins the game when all the cards are played.
The player looses when their HP is 0 or they get suddenly killed by a perill.

In the user interface, the story will be watched card by card in a grid. Every cell is a small interactive movie.

## User Interface
![wireF_1](wireF_1.jpg)
![wireF_2](wireF_2.jpg)

### Spash Screen
* Opening shot
* Start button
* link or whatever credits

### Game Screen
* Title
* Adventure Grid
* Cards Stack List
* Active Card Slot section [4]
* HP monitor with portrait of the explorer

### Game Over Screen
* Game Over Text
* Picture of death snapshot (skull)


## MVP (DOM)
The mvp is a game where the player can select 3 card types and die or finish the quest. The quest view, Avatar UI, card stack and card slots are updated every game step. Basic animations on quest view are triggered.


## Backlog
- Card Animations on click [css]
- Stack card animations when giving the hand
- Backgrounds for cells [4 spr]
- Randomize backgrounds for cells
- player fight animation [4 spr]
- enemy fight animation [4 spr]
- more enemy fight animation [4 spr]
- Randomize animations (player and enemies)
- Animations for Avatar UI due HP level [4 spr]
- Jingle on starting the game
- background music
- Sfx Start button
- jingle on death
- jingle on win
- Sfx pick cards
- Sfx Hand 
- Sfx Fight
- Sfx killed by perill
- Sfx life++
- Sfx + Animations tribe playing congas


## Data structure
### game.js
​```
Game(){

}

Game.prototype.startGame(){

}

Game.prototype.updateAll(){
}

Game.prototype.clearAll(){
}

Game.prototype.renderAll(){
}

Game.prototype.finishGameCallback(){
}
​```

### character.js
​```
Character(){
  this.x;
  this.y;
  this.size;
  this.canvas;
  this.ctx;
}

Character.prototype.update(){
}

Character.prototype.render(){
}

Character.prototype.move(){
}

Character.prototype.checkCollisionWithBlock(block){
}

Character.prototype.death(){
}

Character.prototype.win(){
}

Character.prototype.gravity(){
}

Character.prototype.jump(){
}


​```

### block.js
​```
Block(){
  this.x;
  this.y;
  this.size;
  this.canvas;
  this.ctx;
}

Block.prototype.render(){
}
​```


## States y States Transitions
​```
- splashScreen()
  - destroyGameOver(if)
  - buildSplash()
  - addEventListener(startGame)
  
  
- starGame()
  - destroySplash()
  - destroyGameOver()
  - create new Game()
  - game.start()
  
  
- gameOver()
  - destroyGame()
  - buildGameOver()
  - addEventListener( if splashScreen, else startGame) 
​```

## Task
- Main - buildDom
- Main - buildSplash
- Main - addEventListener
- Main - destroySplash
- Main - 3 states transitions
- Game - buildDom
- Game - TimeOut test
- Game - 3 states transitions
- Main - GameWon
- Main - destroy Game
- Main - GameWon RESTART
- Main - removeGameWon
- Game - restartGame
- Game - addEventListener
- Block - create
- Game - create player
- Player - create
- Player - move
- Player - gravity
- Player - collision
- Player - jump
- Game - check win

## Links


### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/Gabriel0liver/skull-jumper)
[Link Deploy](https://Gabriel0liver.github.io/skull-jumper/)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
```
