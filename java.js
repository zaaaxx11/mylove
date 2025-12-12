// ===== GLOBAL VARIABLES =====
let currentScene = 'entrance';
let collectedOrbs = 0;
const totalOrbs = 22;
let isMusicPlaying = false;
let musicVolume = 0.25;

// ===== DOM ELEMENTS =====
const loadingScreen = document.getElementById('loading-screen');
const entranceScene = document.getElementById('entrance-scene');
const gameContainer = document.getElementById('game-container');
const startBtn = document.getElementById('start-btn');
const musicToggle = document.getElementById('music-toggle');
const volumeSlider = document.getElementById('volume-slider');
const bgMusic = document.getElementById('bg-music');
const magicSound = document.getElementById('magic-sound');
const orbCountElement = document.querySelector('.orb-count');
const orbsContainer = document.querySelector('.orbs-container');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading progress
    simulateLoading();
    
    // Set up event listeners
    startBtn.addEventListener('click', startAdventure);
    musicToggle.addEventListener('click', toggleMusic);
    volumeSlider.addEventListener('input', updateVolume);
    
    // Initialize music
    bgMusic.volume = musicVolume;
    
    // Create orbs for scene 1
    createOrbsForScene(5);
});

// ===== LOADING SCREEN =====
function simulateLoading() {
    const progressFill = document.querySelector('.progress-fill');
    let width = 0;
    
    const loadingInterval = setInterval(() => {
        if (width >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                entranceScene.classList.remove('hidden');
            }, 500);
        } else {
            width += Math.random() * 20 + 5;
            if (width > 100) width = 100;
            progressFill.style.width = width + '%';
        }
    }, 200);
}

// ===== START ADVENTURE =====
function startAdventure() {
    // Play magic sound
    playSound(magicSound);
    
    // Add transition effect
    startBtn.innerHTML = '<i class="fas fa-sparkles"></i> Membuka Portal...';
    startBtn.disabled = true;
    
    setTimeout(() => {
        entranceScene.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        
        // Start music on first interaction
        if (!isMusicPlaying) {
            bgMusic.play()
                .then(() => {
                    isMusicPlaying = true;
                    updateMusicButton();
                })
                .catch(e => {
                    console.log("Autoplay prevented. User needs to interact first.");
                    // Music will play on button click
                });
        }
    }, 1500);
}

// ===== ORBS SYSTEM =====
function createOrbsForScene(count) {
    orbsContainer.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const orb = document.createElement('div');
        orb.className = 'orb';
        orb.dataset.orbId = i + 1;
        orb.dataset.scene = 'rainbow';
        
        // Add unicorn icon inside orb
        const unicornIcon = document.createElement('i');
        unicornIcon.className = 'fas fa-star';
        unicornIcon.style.fontSize = '1.5rem';
        unicornIcon.style.color = 'var(--pink-hot)';
        unicornIcon.style.position = 'absolute';
        unicornIcon.style.top = '50%';
        unicornIcon.style.left = '50%';
        unicornIcon.style.transform = 'translate(-50%, -50%)';
        
        orb.appendChild(unicornIcon);
        
        // Add click event
        orb.addEventListener('click', function() {
            collectOrb(this);
        });
        
        // Randomize animation delay
        orb.style.animationDelay = (i * 0.5) + 's';
        
        orbsContainer.appendChild(orb);
    }
}

function collectOrb(orbElement) {
    if (orbElement.classList.contains('collected')) return;
    
    // Play magic sound
    playSound(magicSound);
    
    // Add collected class
    orbElement.classList.add('collected');
    
    // Update orb count
    collectedOrbs++;
    orbCountElement.textContent = collectedOrbs;
    
    // Add sparkle effect
    createSparkleEffect(orbElement);
    
    // Check if all orbs in scene collected
    const sceneOrbs = document.querySelectorAll('.orb:not(.collected)');
    if (sceneOrbs.length === 0) {
        setTimeout(() => {
            alert('🎉 Selamat! Kamu mengumpulkan semua orb di scene ini!\nLanjut ke scene berikutnya!');
        }, 500);
    }
    
    // Check if all orbs collected
    if (collectedOrbs === totalOrbs) {
        setTimeout(() => {
            alert('🎂🎂🎂 SELAMAT! Semua 22 orb terkumpul!\nHadiah spesial menunggumu!');
        }, 1000);
    }
}

function createSparkleEffect(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.width = '10px';
        sparkle.style.height = '10px';
        sparkle.style.background = 'radial-gradient(circle, white, var(--accent-gold))';
        sparkle.style.borderRadius = '50%';
        sparkle.style.left = (rect.left + rect.width / 2) + 'px';
        sparkle.style.top = (rect.top + rect.height / 2) + 'px';
        sparkle.style.zIndex = '1000';
        sparkle.style.pointerEvents = 'none';
        
        // Random direction and distance
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 30;
        
        document.body.appendChild(sparkle);
        
        // Animate
        sparkle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        });
        
        // Remove after animation
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
}

// ===== MUSIC SYSTEM =====
function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
    } else {
        bgMusic.play()
            .catch(e => {
                console.log("Music play failed:", e);
                alert('Klik tombol play untuk mulai musik!');
            });
    }
    
    isMusicPlaying = !isMusicPlaying;
    updateMusicButton();
}

function updateMusicButton() {
    const icon = musicToggle.querySelector('i');
    if (isMusicPlaying) {
        icon.className = 'fas fa-pause';
        musicToggle.style.background = 'var(--accent-gold)';
    } else {
        icon.className = 'fas fa-play';
        musicToggle.style.background = 'var(--pink-hot)';
    }
}

function updateVolume() {
    musicVolume = volumeSlider.value / 100;
    bgMusic.volume = musicVolume;
}

// ===== UTILITY FUNCTIONS =====
function playSound(soundElement) {
    soundElement.currentTime = 0;
    soundElement.play().catch(e => console.log("Sound play failed:", e));
}

// ===== SCENE NAVIGATION (Placeholder for now) =====
// Will be implemented in Phase 2

// ===== DEBUG / DEVELOPMENT HELPERS =====
// Press 'D' to show debug info
document.addEventListener('keydown', function(e) {
    if (e.key === 'd' || e.key === 'D') {
        console.log('=== DEBUG INFO ===');
        console.log('Current Scene:', currentScene);
        console.log('Collected Orbs:', collectedOrbs);
        console.log('Music Playing:', isMusicPlaying);
        console.log('Music Volume:', musicVolume);
        console.log('=================');
    }
    
    // Press 'R' to reset
    if (e.key === 'r' || e.key === 'R') {
        if (confirm('Reset semua progress?')) {
            collectedOrbs = 0;
            orbCountElement.textContent = '0';
            document.querySelectorAll('.orb').forEach(orb => {
                orb.classList.remove('collected');
            });
        }
    }
});

// ===== GYROSCOPE SUPPORT (Mobile) =====
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(event) {
        // This will be used for parallax effects in Phase 3
        console.log('Gyro:', event.beta, event.gamma);
    });
}