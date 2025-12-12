// ==================== INITIALIZATION ====================
console.log("🎂 Birthday Experience Loading...");

// Hide loading screen after 2 seconds
setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
}, 2000);

// ==================== AUDIO SYSTEM (FIXED 100%) ====================
const blowSound = document.getElementById('blowSound');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicInfo = document.getElementById('musicInfo');
const volumeSlider = document.getElementById('volumeSlider');
const musicPlayer = document.getElementById('musicPlayer');

// Set initial volume
blowSound.volume = 0.8;
bgMusic.volume = 0.7;
volumeSlider.value = 0.7;

// Music player controls
let isMusicPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-play"></i>';
        musicInfo.textContent = 'Musik dijeda';
    } else {
        bgMusic.play().then(() => {
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            musicInfo.textContent = 'Musik menyala';
            isMusicPlaying = true;
        }).catch(e => {
            console.log("User belum berinteraksi dengan audio");
            musicInfo.textContent = 'Klik tombol tiup lilin dulu';
        });
    }
    isMusicPlaying = !isMusicPlaying;
});

volumeSlider.addEventListener('input', (e) => {
    bgMusic.volume = e.target.value;
    blowSound.volume = Math.min(e.target.value * 1.2, 1); // Slightly louder
});

// Preload audio
window.addEventListener('click', () => {
    // Silent audio play to unlock audio autoplay
    if (!window.audioUnlocked) {
        const unlock = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==");
        unlock.play().then(() => {
            window.audioUnlocked = true;
            console.log("✅ Audio unlocked!");
            unlock.pause();
        });
    }
}, { once: true });

// ==================== DATA ====================
// DATA ORB: 22 foto (untuk game)
const orbMemories = [
    { title: "Kenangan 1", desc: "Momen pertama yang tak terlupakan.", url: "https://i.ibb.co/LhzZhsVv/1.jpg" },
    { title: "Kenangan 2", desc: "Senyuman yang menyimpan seribu cerita.", url: "https://i.ibb.co/jZwktMgH/2.jpg" },
    { title: "Kenangan 3", desc: "Petualangan kecil kita yang penuh tawa.", url: "https://i.ibb.co/Swn7CdQR/3.jpg" },
    { title: "Kenangan 4", desc: "Diam-diam bahagia bersamamu.", url: "https://i.ibb.co/k6cDZY3m/4.jpg" },
    { title: "Kenangan 5", desc: "Cahaya senja menemani canda kita.", url: "https://i.ibb.co/p6csddZ9/5.jpg" },
    { title: "Kenangan 6", desc: "Ketika dunia terasa sempurna.", url: "https://i.ibb.co/JRTrzKsr/6.jpg" },
    { title: "Kenangan 7", desc: "Selfie yang bercerita lebih dari kata-kata.", url: "https://i.ibb.co/G4ZWPvvM/7.jpg" },
    { title: "Kenangan 8", desc: "Langkah kecil, kenangan besar.", url: "https://i.ibb.co/kd0wX07/8.jpg" },
    { title: "Kenangan 9", desc: "Bersyukur atas setiap detik bersamamu.", url: "https://i.ibb.co/VYkqHfS8/9.jpg" },
    { title: "Kenangan 10", desc: "Percakapan sederhana yang paling berkesan.", url: "https://i.ibb.co/PvFfnCyk/10.jpg" },
    { title: "Kenangan 11", desc: "Hujan yang membawa keberuntungan.", url: "https://i.ibb.co/21t27sNQ/11.jpg" },
    { title: "Kenangan 12", desc: "Di sini, waktu terasa melambat.", url: "https://i.ibb.co/Rp0BVtSt/12.jpg" },
    { title: "Kenangan 13", desc: "Bersandar dan merasakan kedamaian.", url: "https://i.ibb.co/RrjYLfC/13.jpg" },
    { title: "Kenangan 14", desc: "Wajahmu di bawah cahaya bulan.", url: "https://i.ibb.co/hR8PpVgM/14.jpg" },
    { title: "Kenangan 15", desc: "Melangkah beriringan ke masa depan.", url: "https://i.ibb.co/NgGkNnj6/15.jpg" },
    { title: "Kenangan 16", desc: "Cinta itu sederhana: hadir dan mengerti.", url: "https://i.ibb.co/x8JJ1Gn8/16.jpg" },
    { title: "Kenangan 17", desc: "Tertawa lepas tentang hal-hal kecil.", url: "https://i.ibb.co/.../17.jpg" }, // GANTI LINK INI
    { title: "Kenangan 18", desc: "Perjalanan yang mengajarkan arti kebersamaan.", url: "https://i.ibb.co/Qv5Kw5HV/18.jpg" },
    { title: "Kenangan 19", desc: "Jejak kita di tempat yang indah.", url: "https://i.ibb.co/4nXPKwnz/19.jpg" },
    { title: "Kenangan 20", desc: "Mata yang menceritakan segalanya.", url: "https://i.ibb.co/RptZSTmQ/20.jpg" },
    { title: "Kenangan 21", desc: "Bersamamu adalah tempat favoritku.", url: "https://i.ibb.co/Fb1xdwrL/21.jpg" },
    { title: "Kenangan 22", desc: "Foto terbaru kita, bab baru dimulai.", url: "https://i.ibb.co/1t5zf6rq/22.jpg" }
];

// DATA KILAS BALIK: 50 foto (22 dari atas + 28 tambahan)
const slideshowMemories = [...orbMemories];

// Add 28 more photos for slideshow (you need to replace these URLs)
for (let i = 23; i <= 50; i++) {
    slideshowMemories.push({
        title: `Kenangan ${i}`,
        desc: `Deskripsi untuk kenangan spesial kita yang ke-${i}.`,
        url: `https://i.ibb.co/.../${i}.jpg` // GANTI LINK INI
    });
}

// ==================== GAME VARIABLES ====================
const totalOrbs = 22;
let collected = 0;
let currentIndex = 0;
let musicStarted = false;

// ==================== PARTIKEL BACKGROUND ====================
particlesJS("particles-js", {
    particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: ["#FFB8D9", "#FF8EC7", "#FF6BB5", "#FFD6E7"] },
        shape: { type: ["circle", "triangle"] },
        opacity: { value: 0.5, random: true },
        size: { value: 4, random: true },
        line_linked: { enable: true, distance: 120, color: "#FF8EC7", opacity: 0.2, width: 1 },
        move: { enable: true, speed: 1.5, direction: "none", random: true, out_mode: "out" }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" }
        }
    }
});

// ==================== TIUP LILIN FUNCTION (FIXED AUDIO) ====================
function blowCandle() {
    const flame = document.getElementById('flame');
    const btn = document.getElementById('blowButton');
    const cakeContainer = document.getElementById('cakeContainer');
    
    // 1. EFEK GETARAN KERAS
    cakeContainer.classList.add('shake-hard');
    document.body.classList.add('shake-hard');
    
    // 2. MAINKAN SUARA TIUP (ini pasti work karena user klik)
    blowSound.currentTime = 0;
    blowSound.play().then(() => {
        console.log("✅ Suara tiup berhasil!");
        
        // 3. MAINKAN MUSIK BACKGROUND (setelah 0.5 detik)
        setTimeout(() => {
            bgMusic.currentTime = 0;
            bgMusic.play().then(() => {
                console.log("✅ Musik background berhasil!");
                musicStarted = true;
                isMusicPlaying = true;
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                musicInfo.textContent = 'Musik menyala';
                
                // Show music player
                setTimeout(() => {
                    musicPlayer.classList.remove('hidden');
                }, 1000);
            }).catch(e => {
                console.log("Musik akan dimulai setelah interaksi lain");
                musicInfo.textContent = 'Klik play untuk musik';
            });
        }, 500);
        
    }).catch(e => {
        console.log("Browser memblokir suara, lanjut tanpa audio");
    });
    
    // 4. ANIMASI API PADAM
    flame.style.animation = 'none';
    flame.style.opacity = '0';
    flame.style.transform = 'scale(0.2)';
    flame.style.transition = 'all 0.9s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
    
    // 5. UBAH TOMBOL
    btn.innerHTML = '<i class="fas fa-sparkles"></i> Membuka Kejutan...';
    btn.disabled = true;
    btn.style.background = 'linear-gradient(145deg, #81C784, #4CAF50)';
    
    // 6. CREATE CONFETTI
    createConfetti(50);
    
    // 7. HENTIKAN GETARAN SETELAH 0.8 DETIK
    setTimeout(() => {
        cakeContainer.classList.remove('shake-hard');
        document.body.classList.remove('shake-hard');
    }, 800);
    
    // 8. PINDAH SCENE SETELAH 2 DETIK
    setTimeout(() => {
        document.getElementById('scene1').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('scene1').style.display = 'none';
            document.getElementById('scene2').style.display = 'flex';
            initOrbs();
            setTimeout(() => {
                document.getElementById('scene2').style.opacity = '1';
            }, 50);
        }, 600);
    }, 2000);
}

// ==================== CONFETTI EFFECT ====================
function createConfetti(count) {
    const colors = ['#FFB8D9', '#FF8EC7', '#FF6BB5', '#FFD6E7', '#FFEAA7', '#C5E1A5'];
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 15 + 10 + 'px';
        confetti.style.height = Math.random() * 15 + 10 + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = '1';
        
        document.body.appendChild(confetti);
        
        // Animation
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// ==================== INIT ORBS ====================
function initOrbs() {
    const orbsContainer = document.getElementById('orbs');
    orbsContainer.innerHTML = '';
    
    for(let i = 0; i < totalOrbs; i++) {
        const orb = document.createElement('div');
        orb.className = 'orb';
        orb.textContent = i + 1;
        orb.onclick = () => showPhoto(i);
        orbsContainer.appendChild(orb);
    }
    
    updateProgress();
}

// ==================== PROGRESS BAR ====================
function updateProgress() {
    const progress = (collected / totalOrbs) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

// ==================== SHOW PHOTO POPUP ====================
function showPhoto(index) {
    currentIndex = index;
    const memory = orbMemories[index] || { title: "Kenangan", desc: "Deskripsi", url: "" };
    
    const img = document.getElementById('popup-img');
    img.src = memory.url;
    
    img.onload = function() {
        if (this.naturalHeight > this.naturalWidth) {
            img.style.maxHeight = '65vh';
            img.style.width = 'auto';
        } else {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        }
    };
    
    document.getElementById('photo-title').textContent = memory.title;
    document.getElementById('photo-desc').textContent = memory.desc;
    document.getElementById('photo-counter').textContent = `${index + 1}/${totalOrbs}`;
    
    document.getElementById('prev-btn').disabled = index === 0;
    document.getElementById('next-btn').disabled = index === totalOrbs - 1;
    
    document.getElementById('popup').style.display = 'flex';
    
    const orbs = document.querySelectorAll('.orb');
    if (orbs[index] && !orbs[index].classList.contains('collected')) {
        orbs[index].classList.add('collected');
        collected++;
        document.getElementById('count').textContent = collected;
        updateProgress();
        
        if(collected === totalOrbs) {
            createConfetti(100);
            setTimeout(showRecap, 1500);
        }
    }
}

function prevPhoto() {
    if (currentIndex > 0) showPhoto(currentIndex - 1);
}

function nextPhoto() {
    if (currentIndex < totalOrbs - 1) showPhoto(currentIndex + 1);
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// ==================== SHOW RECAP (50 PHOTOS) ====================
function showRecap() {
    closePopup();
    
    document.getElementById('scene2').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('scene2').style.display = 'none';
        document.getElementById('scene3').style.display = 'flex';
        setTimeout(() => {
            document.getElementById('scene3').style.opacity = '1';
            startSlideshow();
        }, 50);
    }, 700);
}

function startSlideshow() {
    const container = document.getElementById('slideshow');
    container.innerHTML = '';
    
    slideshowMemories.forEach((memory, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        if (index === 0) slide.classList.add('active');
        
        const img = document.createElement('img');
        img.src = memory.url;
        img.alt = memory.title;
        slide.appendChild(img);
        
        const info = document.createElement('div');
        info.className = 'slide-info';
        info.innerHTML = `
            <div class="slide-title">${memory.title}</div>
            <div class="slide-desc">${memory.desc}</div>
        `;
        slide.appendChild(info);
        
        container.appendChild(slide);
    });
    
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add('active');
    }, 4000);
}

// ==================== EVENT LISTENERS ====================
document.getElementById('blowButton').addEventListener('click', blowCandle);

document.getElementById('popup').addEventListener('click', function(e) {
    if(e.target === this) closePopup();
});

document.addEventListener('keydown', function(e) {
    if (document.getElementById('popup').style.display === 'flex') {
        if (e.key === 'ArrowLeft') prevPhoto();
        if (e.key === 'ArrowRight') nextPhoto();
        if (e.key === 'Escape') closePopup();
    }
});

// ==================== INITIALIZE ON LOAD ====================
window.addEventListener('DOMContentLoaded', function() {
    console.log("🎉 Birthday Experience Ready!");
    console.log(`📸 Orb photos: ${orbMemories.length}/22`);
    console.log(`📸 Slideshow photos: ${slideshowMemories.length}/50`);
    
    // Validate data
    if (orbMemories.length < 22) {
        console.warn(`⚠️ Add ${22 - orbMemories.length} more photos for orbs!`);
    }
    if (slideshowMemories.length < 50) {
        console.warn(`⚠️ Add ${50 - slideshowMemories.length} more photos for slideshow!`);
    }
    
    // Auto-hide loading screen if taking too long
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 3000);
});
