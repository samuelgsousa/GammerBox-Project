const canvas = document.getElementById('nightSky');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = 3000; // Number of stars in the sky //ajustado
const starArray = [];
let shootingStars = [];

const clickMessage = document.getElementById('clickMessage');

canvas.addEventListener('mousedown', function() {
  clickMessage.style.opacity = '0';
});

clickMessage.addEventListener('transitionend', function() {
  if (clickMessage.style.opacity === '0') {
    clickMessage.style.display = 'none';
  }
});


let mouseHeldDown = false;
let mouseHoldInterval;
let holdAngle;

// Event Listeners for mouse clicks
canvas.addEventListener('mousedown', function(e) {
    mouseHeldDown = true;
    
    // Calculate angle once for all stars during the hold
    holdAngle =  2;

    // Get mouse position
    const rect = canvas.getBoundingClientRect();
    const baseX = e.clientX - rect.left;
    const baseY = e.clientY - rect.top;
    
    // Immediately spawn a shooting star at click position
    spawnShootingStarAtPosition(baseX, baseY, holdAngle);
    
    // Begin interval for continuous spawning around the click position
    mouseHoldInterval = setInterval(() => {
        if (mouseHeldDown) {
            const deviation = 350; // Max deviation from the base point
            const clickX = baseX + Math.random() * deviation - deviation / 2;
            const clickY = baseY + Math.random() * deviation - deviation / 2;
            spawnShootingStarAtPosition(clickX, clickY, holdAngle);
        }
    }, 150); // Adjust delay as needed
});

canvas.addEventListener('mouseup', function() {
    mouseHeldDown = false;
    clearInterval(mouseHoldInterval);
});

canvas.addEventListener('mouseout', function() {
    mouseHeldDown = false;
    clearInterval(mouseHoldInterval);
});


function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    starArray.forEach(star => {
        const opacity = Math.abs(Math.sin(star.twinkle));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(${star.color.match(/\d+/g)}, ${opacity})`;
        ctx.fill();
        star.twinkle += star.twinkleSpeed;
    });

    shootingStars.forEach((star, index) => {
        if (star.life > 0) {
            star.currentTrailLength = Math.min(star.currentTrailLength + 1, star.maxTrailLength);
            star.life--;
        } else {
            star.currentTrailLength = Math.max(star.currentTrailLength - 1, 0);
            star.fade -= 0.01; // Slowed down fading
        }

        star.x += star.vx;
        star.y += star.vy;

        const trailEndX = star.x - star.vx * star.currentTrailLength;
        const trailEndY = star.y - star.vy * star.currentTrailLength;
                
        // Simulate glow by drawing a larger, semi-transparent stroke behind the actual trail
        let glowGradient = ctx.createLinearGradient(star.x, star.y, trailEndX, trailEndY);
        glowGradient.addColorStop(0, `rgba(255, 255, 255, ${star.fade * 0.5})`); // More transparent
        glowGradient.addColorStop(1, `rgba(77, 139, 255, 0)`);

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(trailEndX, trailEndY);
        ctx.strokeStyle = glowGradient;
        ctx.lineWidth = star.speed * 0.6; // Adjust for desired glow size
        ctx.stroke();

        // Draw the actual trail on top
        let trailGradient = ctx.createLinearGradient(star.x, star.y, trailEndX, trailEndY);
        trailGradient.addColorStop(0, `rgba(255, 255, 255, ${star.fade})`);
        trailGradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(trailEndX, trailEndY);
        ctx.strokeStyle = trailGradient;
        ctx.lineWidth = 2; // Original trail width
        ctx.stroke();
      
        if (star.fade <= 0) {
            shootingStars.splice(index, 1);
        }
    });

    requestAnimationFrame(drawStars);
}

// Create star objects
for (let i = 0; i < stars; i++) {
    const r = Math.floor(192 + Math.random() * 63);
    const g = Math.floor(192 + Math.random() * 63);
    const b = Math.floor(192 + Math.random() * 63);
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() ** 2 * 1,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.01 + Math.random() * 0.04,
        color: `rgb(${r}, ${g}, ${b})` // Fixed color for each star
    });
}


//Spawns Shooting star at the position of the mouse click
function spawnShootingStarAtPosition(clickX, clickY, holdAngle) {
    const speed = 20 + ((1 - Math.random()) ** 2) * 3; // Adjust as needed
    shootingStars.push({
        x: clickX,
        y: clickY,
        vx: Math.cos(holdAngle) * speed,
        vy: Math.sin(holdAngle) * speed,
        life: Math.random() * 15 + 15,
        fade: 1.0,
        currentTrailLength: 0,
        maxTrailLength: speed * 0.5,
        speed: speed,
    });
}

function spawnShootingStar() {
    const angle = Math.random() * Math.PI * 2;
    const speed = 10 + ((1 - Math.random()) ** 2) * 3; // Bias towards the higher end
    shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: Math.random() * 10 + 2, // Increased lifespan before starting to fade
        fade: 1.0, // Start fully opaque
        currentTrailLength: 0,
        maxTrailLength: speed * 0.5, // Simplified trail length calculation
        speed: speed,
    });
}


function trySpawnMeteorShower() {
    const meteorShowerChance = 0.5; // 50% chance for a meteor shower on each call
    if (Math.random() < meteorShowerChance) {
        spawnMeteorShower();
    } else {
        spawnShootingStar(); // Directly spawn a single star without triggering itself
    }
}

function spawnMeteorShower() {
    const batchSize = Math.floor(Math.random() * 25) + 3; // Determine the number of stars in the shower
    const angle = Math.random() * Math.PI * 2;
    const speed = 20 + ((1 - Math.random()) ** 2) * 3;

    // Central point for the shower; all stars will deviate slightly from here
    const baseX = Math.random() * canvas.width;
    const baseY = Math.random() * canvas.height;

    for (let i = 0; i < batchSize; i++) {
        // Introduce a small random delay for each star in the batch
        const minDelay = 700; // Minimum delay in milliseconds
        const maxDelay = 4000; // Maximum delay in milliseconds
        const delay =  minDelay + (Math.random() * 2) * (maxDelay - minDelay);

        setTimeout(() => {
            const deviation = 200; // Max deviation from the base point
            const x = baseX + Math.random() * deviation - deviation / 2;
            const y = baseY + Math.random() * deviation - deviation / 2;

            shootingStars.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: Math.random() * 10 + 3,
                fade: 1.0,
                currentTrailLength: 0,
                maxTrailLength: speed * 0.3,
                speed: speed,
            });
        }, delay);
    }
}


function spawnRandomShootingStar() {
    spawnShootingStar();
    const minDelay = 2000; // Minimum delay in milliseconds
    const maxDelay = 8000; // Maximum delay in milliseconds
    const randomDelay = minDelay + (Math.random() ** 2) * (maxDelay - minDelay);
    setTimeout(spawnRandomShootingStar, randomDelay);
}

function spawnRandomMeteorShower() {
    trySpawnMeteorShower();
    const minDelay = 3000; // Minimum delay in milliseconds
    const maxDelay = 10000; // Maximum delay in milliseconds
    const randomDelay = minDelay + (Math.random() ** 2) * (maxDelay - minDelay);
    setTimeout(spawnRandomMeteorShower, randomDelay);
}


drawStars();
spawnRandomMeteorShower();
spawnRandomShootingStar();

