//////////////////////////
////////* PLAYER*/////////
//////////////////////////

class Player {
  constructor() {
    this.width = 8;
    this.height = 12;
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
    this.width = 8;
    this.height = 8;
    this.positionY = 80 - this.height;
    this.positionX = Math.floor(Math.random() * (80 - this.width + 1));

    this.obstacle = null;

    this.createDomElement();

    //this.updateSize();
  }

  getObstacleClass() {
    const imagePaths = [
      "images/wasp.png",
      "images/bird.png",
    ];
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    return imagePaths[randomIndex];
  }

  createDomElement() {
    this.obstacle = document.createElement("div");

    this.obstacle.className = "obstacle";
    this.obstacle.style.width = this.width + "vw";
    this.obstacle.style.height = this.height + "vh";
    this.obstacle.style.left = this.positionX + "vw";
    this.obstacle.style.bottom = this.positionY + "vh";
    this.obstacle.style.backgroundImage = `url(${this.getObstacleClass()})`; // Set the background image

   
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

 /*updateSize() {
    // Set the width and height of the obstacle element using JavaScript
    this.obstacle.style.width = this.width + "px";
    this.obstacle.style.height = this.height + "px";
  }
  */
  


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
},500);



/* let counterLives = 3;

const livesText = document.createElement("h1");
livesText.id = "lives";
livesText.style.fontSize = 16 + "px";
livesText.style.fontWeight = 500; 


const parentBoard = document.getElementById("board");
parentBoard.appendChild(livesText);

livesText.textContent  = "Lives: " + counterLives;





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
    counterLives--;

    

    livesText.textContent  = "Lives: " + counterLives;

    if (counterLives === 0){
    location.href = "./gameover.html";
  }

  }
}; */

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
    
    setTimeout (()=> {
      location.href = "./gameover.html";
    }, 500)
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
    this.width = 8;
    this.height = 8;
    this.positionY = Math.floor(Math.random() * (80 - this.height + 1));
    this.positionX = Math.floor(Math.random() * (80 - this.width + 1));

    this.prize = null;

    this.createDomElement();
  }

  getPrizeClass() {
    const imagePathsPrize = [
      "images/eggs.png",
      "images/honey.png",
     
    ];
    const randomIndexPrize = Math.floor(Math.random() * imagePathsPrize.length);
    return imagePathsPrize[randomIndexPrize];
  }


  createDomElement() {
    this.prize = document.createElement("div");
    this.prize.id = "prize";
    this.prize.style.width = this.width + "vw";
    this.prize.style.height = this.height + "vh";
    this.prize.style.left = this.positionX + "vw";
    this.prize.style.bottom = this.positionY + "vh";
    this.prize.style.backgroundImage = `url(${this.getPrizeClass()})`; // Set the background image


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
scoreText.style.color = "black";
scoreText.style.paddingTop = "20 px"; 
scoreText.style.paddingBottom = "20 px"; 
scoreText.style.fontFamily = "Helvetica";
scoreText.style.position = "center";



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



