const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function Ball() {
  this.r = random(10, 30);
  this.x = random(this.r, canvas.width - this.r);
  this.y = random(this.r, canvas.height - this.r);
  this.dx = random(-3, 3);
  this.dy = random(-3, 3);
  this.color = `rgb(${random(50,255)}, ${random(50,255)}, ${random(50,255)})`;
  this.exists = true;
}

Ball.prototype.draw = function () {
  if (!this.exists) return;
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  ctx.fill();
};

Ball.prototype.update = function () {
  if (!this.exists) return;
  if (this.x + this.r > canvas.width || this.x - this.r < 0) this.dx *= -1;
  if (this.y + this.r > canvas.height || this.y - this.r < 0) this.dy *= -1;
  this.x += this.dx;
  this.y += this.dy;
};

Ball.prototype.checkCollision = function (balls) {
  if (!this.exists) return;
  for (let b of balls) {
    if (this !== b && b.exists) {
      let dx = this.x - b.x;
      let dy = this.y - b.y;
      let dist = Math.hypot(dx, dy);
      if (dist < this.r + b.r) {
        this.color = b.color = `rgb(${random(50,255)}, ${random(50,255)}, ${random(50,255)})`;
      }
    }
  }
};

function EvilCircle(x, y) {
  this.x = x;
  this.y = y;
  this.r = 20;
  this.speed = 20;
}

EvilCircle.prototype.draw = function () {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "white";
  ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  ctx.stroke();
};

EvilCircle.prototype.move = function (key) {
  if (key === "a") this.x -= this.speed;
  if (key === "d") this.x += this.speed;
  if (key === "w") this.y -= this.speed;
  if (key === "s") this.y += this.speed;
};

EvilCircle.prototype.checkBounds = function () {
  if (this.x - this.r < 0) this.x = this.r;
  if (this.x + this.r > canvas.width) this.x = canvas.width - this.r;
  if (this.y - this.r < 0) this.y = this.r;
  if (this.y + this.r > canvas.height) this.y = canvas.height - this.r;
};

EvilCircle.prototype.eatBalls = function (balls) {
  for (let b of balls) {
    if (b.exists) {
      let dx = this.x - b.x;
      let dy = this.y - b.y;
      let dist = Math.hypot(dx, dy);
      if (dist < this.r + b.r) {
        b.exists = false;
        count--;
        counter.textContent = count;
      }
    }
  }
};

let balls = [], count = 0;
for (let i = 0; i < 20; i++) {
  balls.push(new Ball());
  count++;
}

let evil = new EvilCircle(100, 100);

let counter = document.createElement("p");
counter.style = "position:absolute;top:10px;left:10px;color:#fff;";
counter.textContent = count;
document.body.appendChild(counter);

window.addEventListener("keydown", e => evil.move(e.key));

function loop() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let b of balls) {
    b.draw();
    b.update();
    b.checkCollision(balls);
  }

  evil.draw();
  evil.checkBounds();
  evil.eatBalls(balls);

  requestAnimationFrame(loop);
}

loop();
