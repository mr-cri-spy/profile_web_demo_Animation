

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const colors = ["#FF6F61", "#6A0572", "#FFD700", "#00C9A7", "#1D84B5"];

class Particle {
    constructor(x, y, size, color, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.life = Math.random() * 100 + 50;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.size *= 0.97;  // Gradually shrink particles
        this.life -= 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Handle mouse interaction
const mouse = {
    x: null,
    y: null,
};

canvas.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    createExplosion(mouse.x, mouse.y);
});

function createExplosion(x, y) {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 5 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const velocityX = (Math.random() - 0.5) * 10;
        const velocityY = (Math.random() - 0.5) * 10;
        particlesArray.push(new Particle(x, y, size, color, velocityX, velocityY));
    }
}

// Animate particles
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray = particlesArray.filter((particle) => particle.size > 0.5 && particle.life > 0);
    particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
canvas.addEventListener("click", (event) => {
    createExplosion(event.x, event.y);
});

// Increase particle lifespan for a more dramatic effect
function createExplosion(x, y) {
    const particleCount = 100; // Increased density
    for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 8 + 5; // Larger particles
        const color = colors[Math.floor(Math.random() * colors.length)];
        const velocityX = (Math.random() - 0.5) * 15; // Faster particles
        const velocityY = (Math.random() - 0.5) * 15;
        particlesArray.push(new Particle(x, y, size, color, velocityX, velocityY));
    }
}


// Start animation
animate();
