const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomColor() {
    return `rgb(${getRandom(50,255)}, ${getRandom(50,255)}, ${getRandom(50,255)})`;
}

function Ball() {
    this.r = getRandom(10, 30);
    this.x = getRandom(this.r, canvas.width - this.r);
    this.y = getRandom(this.r, canvas.height - this.r);
    this.dx = getRandom(-3, 3) || 1;
    this.dy = getRandom(-3, 3) || 1;
    this.color = getRandomColor();
}

Ball.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
};

Ball.prototype.move = function() {
    if (this.x + this.r > canvas.width || this.x - this.r < 0) {
        this.dx *= -1;
    }
    if (this.y + this.r > canvas.height || this.y - this.r < 0) {
        this.dy *= -1;
    }
    this.x += this.dx;
    this.y += this.dy;
};

Ball.prototype.collide = function(balls) {
    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        if (this !== ball) {
            let dx = this.x - ball.x;
            let dy = this.y - ball.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.r + ball.r) {
                this.color = ball.color = getRandomColor();
            }
        }
    }
};

// Create and store balls
const balls = [];
for (let i = 0; i < 20; i++) {
    balls.push(new Ball());
}

// Animation loop
function loop() {
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].move();
        balls[i].collide(balls);
    }

    requestAnimationFrame(loop);
}

loop();
