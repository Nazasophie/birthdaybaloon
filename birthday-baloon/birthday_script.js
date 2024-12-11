
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confetti = [];

function createConfetti() {
    for (let i = 0; i < 300; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * 100,
            color: `hsl(${Math.random() * 360}, 70%, 70%)`,
            tilt: Math.random() * 30 - 15,
            tiltAngle: 0,
            tiltAngleIncrement: Math.random() * 0.07 + 0.05,
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, false);
        ctx.fillStyle = particle.color;
        ctx.fill();
    });
}

function updateConfetti() {
    confetti.forEach((particle, index) => {
        particle.tiltAngle += particle.tiltAngleIncrement;
        particle.y += Math.cos(particle.d) + 1 + particle.r / 2;
        particle.x += Math.sin(particle.tiltAngle) * 2;

        if (particle.y > canvas.height) {
            confetti[index] = {
                ...particle,
                y: -particle.r,
                x: Math.random() * canvas.width,
            };
        }
    });
}

function animate() {
    drawConfetti();
    updateConfetti();
    requestAnimationFrame(animate);
}

createConfetti();
animate();
