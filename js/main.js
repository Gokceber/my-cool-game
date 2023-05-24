//////////////////////////
////////* PLAYER*/////////
//////////////////////////

class Player {
  constructor() {
    this.width = 10;
    this.height = 10;
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
    this.width = 10;
    this.height = 10;
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
    if (this.positionY > 0) {
      this.positionY--;
      this.obstacle.style.bottom = this.positionY + "vh";
    }
  }
}

////////////// Out of class Elements


const obstacleArr = [];

setInterval(() => {
  const obstacleInstance = new Obstacle();
  obstacleArr.push(obstacleInstance);
}, 2000);

setInterval(() => {
  obstacleArr.forEach((obstacle) => {
    obstacle.moveDown();
  });
}, 40);



/*
function removeObstacle(obstacleInstance){
  if (obstacleInstance.positionY < 0 - obstacleInstance.height) {
    obstacleInstance.obstacle.remove();
    obstacleArr.shift();
  }
};

setInterval (() => {
  obstacleArr.forEach((obstacle) => {
    removeObstacle(obstacle);
  })
}, 50)

*/





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
    this.width = 10;
    this.height = 10;
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
}

const prizeInstance = new Prize();


const prizeArr = [];
prizeArr.push(prizeInstance);

///i should take this into a conditional and say, if collision 
//happens then remove this one and create a new prize
///if there is a collision then "prizeArr.push(prizeInstance);"

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
    console.log("GOT THE PRIZE YAAAAAAY");
    //location.href = "./testpage.html";  ///first test with this page if the collision happens
    prizeInstance.prize.remove();
  }
};

setInterval (() => {
  prizeArr.forEach((prize) => {
    detectCollisionPrize(prize, playerInstance);
  })
}, 1)



