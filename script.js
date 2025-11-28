// --- 1. Organic Intro Sequence ---
window.addEventListener('load', () => {
    const introOverlay = document.getElementById('intro-overlay');
    const introText = document.getElementById('intro-text');
    const introSub = document.getElementById('intro-sub');

    // Fade in text
    setTimeout(() => {
        introText.classList.remove('opacity-0', 'translate-y-4');
        introSub.classList.remove('opacity-0');
    }, 500);

    // Fade out overlay
    setTimeout(() => {
        introOverlay.style.opacity = '0';
        introOverlay.style.visibility = 'hidden';
        document.body.style.overflowY = 'auto'; 
        revealOnScroll();
    }, 2500);
});

// --- 2. Custom Cursor (Floating) ---
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
    let distX = mouseX - cursorX;
    let distY = mouseY - cursorY;
    cursorX += distX * 0.1;
    cursorY += distY * 0.1;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Add hover classes for cursor
document.querySelectorAll('a, button, .nature-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.backgroundColor = 'rgba(74, 124, 89, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'transparent';
    });
});

// --- 3. Organic Particles (Drifting Leaves/Pollen) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = `rgba(74, 124, 89, ${this.opacity})`; // Sage green
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = 50;
    for (let i = 0; i < count; i++) particles.push(new Particle());
}
initParticles();

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animateCanvas);
}
animateCanvas();

// --- 4. Scroll Reveal ---
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);

// --- 5. 3D Tilt Cards ---
const cards = document.querySelectorAll('.tilt-card-wrapper');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const el = card.querySelector('.tilt-element');
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5; 
        const rotateY = ((x - centerX) / centerX) * 5;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        const el = card.querySelector('.tilt-element');
        el.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
    });
});
