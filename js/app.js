const field = {
  width: 505,
  height: 606,
  waterPosition: 100,
};

// Enemies our player must avoid
var Enemy = function (x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.width = 101;
  this.height = 61;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  if (this.x > field.width) {
    this.x = 0;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function (x, y) {
  this.sprite = "images/char-boy.png";
  this.x = x;
  this.y = y;
  this.width = 101;
  this.height = 101;
  this.initPositionX = x;
  this.initPositionY = y;
};

Player.prototype.update = function () {
  if (checkCollisions()) {
    alert("you are lose!");
    this.x = this.initPositionX;
    this.y = this.initPositionY;
  }
  if (player.y < field.waterPosition) {
    alert("you are win!");
    this.x = this.initPositionX;
    this.y = this.initPositionY;
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (key) {
  const step = 50;

  const allowedFieldWidth = field.width - player.width;
  const allowedFieldHeight = field.height - player.height - step;

  if (key === "up") {
    this.y -= step;
  }
  if (key === "down") {
    this.y += step;
    if (this.y > allowedFieldHeight) {
      this.y = allowedFieldHeight;
    }
  }
  if (key === "left") {
    this.x -= step;
    if (this.x < 0) {
      this.x = 0;
    }
  }
  if (key === "right") {
    this.x += step;
    if (this.x > allowedFieldWidth) {
      this.x = allowedFieldWidth;
    }
  }
};

// Now instantiate your objects.

const enemy1 = new Enemy(0, 280, 60);
const enemy2 = new Enemy(0, 200, 100);
const enemy3 = new Enemy(30, 130, 80);

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player

const player = new Player(200, 450);

function checkCollisions() {
  for (let enemy of allEnemies) {
    if (
      enemy.x < player.x + player.width &&
      enemy.x + enemy.width > player.x &&
      enemy.y < player.y + player.height &&
      enemy.y + enemy.height > player.y
    ) {
      return true;
    }
  }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
