//////////////////////////
////////* PLAYER*/////////
//////////////////////////

class Player {
  constructor() {
    this.width = 7;
    this.height = 7;
    this.positionX = 50 - this.width / 2;
    this.positionY = 0;

    this.player = null;
    this.createDomElement();
  }

  createDomElement() {
    //Create dom element
    this.player = document.createElement("div");

    //player.setAttribute("id", "player");
    this.player.id = "player";
    this.player.style.width = this.width + "vw";
    this.player.style.height = this.height + "vh";
    this.player.style.left = this.positionX + "vw";
    this.player.style.bottom = this.positionY + "vh";

    const frame = document.getElementById("frame");
    frame.appendChild(this.player);
  }

  // move Left
  moveLeft() {
    if (this.positionX > 0) {
      this.positionX--;
      this.player.style.left = this.positionX + "vw";
    }
  }

  // move Right
  moveRight() {
    if (this.positionX < 80 - this.width) {
      this.positionX++;
      this.player.style.left = this.positionX + "vw";
    }
  }

  //move Up
  moveUp() {
    if (this.positionY < 80 - this.height) {
      this.positionY++;
      this.player.style.bottom = this.positionY + "vh";
    }
  }

  //move Down
  moveDown() {
    if (this.positionY > 0) {
      this.positionY--;
      this.player.style.bottom = this.positionY + "vh";
    }
  }

  playerEventListeners() {
    document.addEventListener("keydown", (event) => {
      if (event.code === "ArrowUp") {
        console.log("presssiiing UUUUUUP");
        this.moveUp();
      } else if (event.code === "ArrowDown") {
        console.log("presssiiing DOOOOOWN");
        this.moveDown();
      } else if (event.code === "ArrowLeft") {
        console.log("presssiiing LEEEEEFFFT");
        this.moveLeft();
      } else if (event.code === "ArrowRight") {
        console.log("presssiiing RIIIIGGGHHHTT");
        this.moveRight();
      }
    });
  }
}

////////////// Out of class Elements

const playerInstance = new Player();
playerInstance.playerEventListeners();

////////////////////////////////////

//////////////////////////
////////* OBSTACLE *//////
//////////////////////////

class Obstacle {
  constructor() {
    this.width = 5;
    this.height = 5;
    this.positionY = 80 - this.height;
    this.positionX = Math.floor(Math.random() * (80 - this.width + 1));

    this.obstacle = null;

    this.createDomElement();
  }

  createDomElement() {
    this.obstacle = document.createElement("div");

    this.obstacle.className = "obstacle";
    this.obstacle.style.width = this.width + "vw";
    this.obstacle.style.height = this.height + "vh";
    this.obstacle.style.left = this.positionX + "vw";
    this.obstacle.style.bottom = this.positionY + "vh";

    const frame = document.getElementById("frame");
    frame.appendChild(this.obstacle);
  }

  moveDown() {
      this.positionY--;
      this.obstacle.style.bottom = this.positionY + "vh";
    
  }

   removeObstacle() {
    if (this.positionY < 0) {
    this.obstacle.remove();
    obstacleArr.shift();
  } 
  } 
  
  
}

////////////// Out of class Elements


const obstacleArr = [];

setInterval(() => {
  const obstacleInstance = new Obstacle();
  obstacleArr.push(obstacleInstance);
}, 10000);

setInterval(() => {
  obstacleArr.forEach((obstacle) => {
    obstacle.moveDown();
    obstacle.removeObstacle();
  });
}, 10000);




function detectCollision(obstacleInstance, playerInstance) {
  if (
    obstacleInstance.positionX <
      playerInstance.positionX + playerInstance.width && //player instance is stored on line 84
    obstacleInstance.positionX + obstacleInstance.width >
      playerInstance.positionX &&
    obstacleInstance.positionY <
      playerInstance.positionY + playerInstance.height &&
    obstacleInstance.height + obstacleInstance.positionY >
      playerInstance.positionY
  ) {
    console.log("game over!!!");
    location.href = "./gameover.html";
  }
};

setInterval (() => {
  obstacleArr.forEach((obstacle) => {
    detectCollision(obstacle, playerInstance)
  })
}, 100)



////////////////////////////////////

//////////////////////////
////////* PRIZE */////////
//////////////////////////

class Prize {
  constructor() {
    this.width = 5;
    this.height = 5;
    this.positionY = Math.floor(Math.random() * (80 - this.height + 1));
    this.positionX = Math.floor(Math.random() * (80 - this.width + 1));

    this.prize = null;

    this.createDomElement();
  }

  createDomElement() {
    this.prize = document.createElement("div");
    this.prize.id = "prize";
    this.prize.style.width = this.width + "vw";
    this.prize.style.height = this.height + "vh";
    this.prize.style.left = this.positionX + "vw";
    this.prize.style.bottom = this.positionY + "vh";

    const frame = document.getElementById("frame");
    frame.appendChild(this.prize);
    console.log();
  }

  remove() {
    // Remove the prize DOM element from the DOM
    this.prize.remove();
  }
}


////////////// Out of class Elements


////////////// SCORE //////////////////////////


const prizeInstance = new Prize();


const prizeArr = [];
prizeArr.push(prizeInstance);


let counter = 0;

const scoreText = document.createElement("h1");
scoreText.id = "score";
scoreText.style.fontSize = 24 + "px";
scoreText.style.fontWeight = 500; 


const parentBoard = document.getElementById("board");
parentBoard.appendChild(scoreText);

scoreText.textContent  = "Score: " + counter;



////////////// COLLISION DETECTION FOR PRIZE AND SCORE UPDATE //////////////////////////



function detectCollisionPrize(prizeInstance, playerInstance) {
  if (
    prizeInstance.positionX <
      playerInstance.positionX + playerInstance.width && //player instance is stored on line 84
    prizeInstance.positionX + prizeInstance.width >
      playerInstance.positionX &&
    prizeInstance.positionY <
      playerInstance.positionY + playerInstance.height &&
    prizeInstance.height + prizeInstance.positionY >
      playerInstance.positionY
  ) {
    counter++; 

    prizeInstance.remove();
    prizeArr.shift();
   
    const newPrizeInstance = new Prize();
    prizeArr.unshift(newPrizeInstance);
    //return counter
    scoreText.textContent  = "Score: " + counter;
  }
};

setInterval (() => {
  prizeArr.forEach((prize) => {
    detectCollisionPrize(prize, playerInstance);
  })
}, 1)



