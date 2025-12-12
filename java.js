// ===== CONFIGURATION - GANTI INI! =====
const GITHUB_USERNAME = "GANTI-DENGAN-USERNAME-KAMU";  // Contoh: "toni"
const REPO_NAME = "ultah-kekasih";                     // Nama repository kamu

// Base URL untuk foto di GitHub
const GITHUB_PHOTOS_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/foto`;

// Data foto dan caption - BISA DIGANTI NANTI
const memories = [
    { 
        title: "Memory #1", 
        description: "Ini adalah kenangan indah pertama kita bersama.",
        fileName: "1.jpg"
    },
    { 
        title: "Memory #2", 
        description: "Momen spesial yang selalu kita ingat.",
        fileName: "2.jpg"
    },
    { 
        title: "Memory #3", 
        description: "Waktu kita tertawa bersama sampai sakit perut.",
        fileName: "3.jpg"
    },
    { 
        title: "Memory #4", 
        description: "Petualangan seru yang tidak terlupakan.",
        fileName: "4.jpg"
    },
    { 
        title: "Memory #5", 
        description: "Hari dimana kita semakin dekat.",
        fileName: "5.jpg"
    },
    { 
        title: "Memory #6", 
        description: "Momen romantic yang sederhana tapi berarti.",
        fileName: "6.jpg"
    },
    { 
        title: "Memory #7", 
        description: "Waktu kita mencoba hal baru bersama.",
        fileName: "7.jpg"
    },
    { 
        title: "Memory #8", 
        description: "Selfie spontan yang jadi favorit.",
        fileName: "8.jpg"
    },
    { 
        title: "Memory #9", 
        description: "Celebration kecil untuk pencapaian kita.",
        fileName: "9.jpg"
    },
    { 
        title: "Memory #10", 
        description: "Kenangan manis di tempat favorite.",
        fileName: "10.jpg"
    },
    { 
        title: "Memory #11", 
        description: "Ketika waktu terasa berhenti untuk kita.",
        fileName: "11.jpg"
    },
    { 
        title: "Memory #12", 
        description: "Momen candid yang paling natural.",
        fileName: "12.jpg"
    },
    { 
        title: "Memory #13", 
        description: "Liburan pertama kita berdua.",
        fileName: "13.jpg"
    },
    { 
        title: "Memory #14", 
        description: "Waktu hujan yang malah bikin romantis.",
        fileName: "14.jpg"
    },
    { 
        title: "Memory #15", 
        description: "Foto dengan latar belakang yang indah.",
        fileName: "15.jpg"
    },
    { 
        title: "Memory #16", 
        description: "Makan bersama di restoran baru.",
        fileName: "16.jpg"
    },
    { 
        title: "Memory #17", 
        description: "Pergi nonton film favorite.",
        fileName: "17.jpg"
    },
    { 
        title: "Memory #18", 
        description: "Jalan-jalan sore yang menyenangkan.",
        fileName: "18.jpg"
    },
    { 
        title: "Memory #19", 
        description: "Foto dengan ekspresi lucu kita.",
        fileName: "19.jpg"
    },
    { 
        title: "Memory #20", 
        description: "Momen sebelum acara spesial.",
        fileName: "20.jpg"
    },
    { 
        title: "Memory #21", 
        description: "Kenangan di alam terbuka.",
        fileName: "21.jpg"
    },
    { 
        title: "Memory #22", 
        description: "Foto terbaru dan terbaik kita!",
        fileName: "22.jpg"
    }
];

// ===== GLOBAL VARIABLES =====
let collectedCount = 0;
let currentPhotoIndex = 0;
let totalMemories = memories.length;

// ===== DOM ELEMENTS =====
const orbsGrid = document.getElementById('orbsGrid');
const countElement = document.getElementById('count');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const photoPopup = document.getElementById('photoPopup');
const popupImage = document.getElementById('popupImage');
const photoTitle = document.getElementById('photoTitle');
const photoDescription = document.getElementById('photoDescription');
const photoNumber = document.getElementById('photoNumber');
const musicToggle = document.getElementById('musicToggle');
const loadingElement = document.querySelector('.loading');

// ===== CREATE ORBS =====
function createOrbs() {
    orbsGrid.innerHTML = '';
    
    memories.forEach((memory, index) => {
        const orb = document.createElement('div');
        orb.className = 'orb';
        orb.textContent = index + 1;
        orb.dataset.index = index;
        
        // Animation delay untuk efek bertahap
        orb.style.animationDelay = `${index * 0.05}s`;
        
        // Click event untuk buka foto
        orb.addEventListener('click', () => {
            showPhoto(index);
            
            // Mark as collected jika belum
            if (!orb.classList.contains('collected')) {
                orb.classList.add('collected');
                collectedCount++;
                updateProgress();
                
                // Celebration jika semua terkumpul
                if (collectedCount === totalMemories) {
                    setTimeout(() => {
                        alert('🎉🎉🎉 SELAMAT! Semua 22 kenangan terkumpul!\nHappy 22nd Birthday Sayangku! 🎂❤️\nSemoga semua impianmu tercapai dan kebahagiaan selalu menyertaimu.');
                    }, 800);
                }
            }
        });
        
        orbsGrid.appendChild(orb);
    });
}

// ===== UPDATE PROGRESS =====
function updateProgress() {
    countElement.textContent = collectedCount;
    
    const percentage = Math.round((collectedCount / totalMemories) * 100);
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}%`;
}

// ===== SHOW PHOTO =====
function showPhoto(index) {
    currentPhotoIndex = index;
    const memory = memories[index];
    
    // Update UI
    photoTitle.textContent = memory.title;
    photoDescription.textContent = memory.description;
    photoNumber.textContent = `${index + 1}/${totalMemories}`;
    
    // Show loading
    popupImage.style.opacity = '0';
    if (loadingElement) loadingElement.style.display = 'block';
    
    // Build GitHub URL untuk foto
    const photoUrl = `${GITHUB_PHOTOS_URL}/${memory.fileName}`;
    console.log('Loading photo from:', photoUrl); // Untuk debugging
    
    // Load image
    popupImage.onload = function() {
        popupImage.style.opacity = '1';
        if (loadingElement) loadingElement.style.display = 'none';
    };
    
    popupImage.onerror = function() {
        console.error('Failed to load image:', photoUrl);
        if (loadingElement) {
            loadingElement.textContent = 'Foto tidak ditemukan';
            loadingElement.style.color = '#ff6b6b';
        }
        // Fallback ke placeholder
        popupImage.src = `https://picsum.photos/500/300?random=${index}`;
        popupImage.style.opacity = '1';
    };
    
    popupImage.src = photoUrl;
    
    // Show popup
    photoPopup.style.display = 'flex';
    
    // Update navigation buttons
    updateNavButtons();
}

// ===== UPDATE NAVIGATION BUTTONS =====
function updateNavButtons() {
    // Akan diimplementasikan nanti
}

// ===== PHOTO NAVIGATION =====
function prevPhoto() {
    if (currentPhotoIndex > 0) {
        showPhoto(currentPhotoIndex - 1);
    }
}

function nextPhoto() {
    if (currentPhotoIndex < totalMemories - 1) {
        showPhoto(currentPhotoIndex + 1);
    }
}

// ===== CLOSE POPUP =====
function closePopup() {
    photoPopup.style.display = 'none';
}

// ===== RESET GAME =====
function resetGame() {
    if (confirm('Reset semua progress dan mulai dari awal?')) {
        collectedCount = 0;
        updateProgress();
        
        document.querySelectorAll('.orb').forEach(orb => {
            orb.classList.remove('collected');
        });
        
        alert('Game telah direset! Klik orb untuk mulai lagi.');
    }
}

// ===== MUSIC PLAYER =====
let isMusicPlaying = false;
const audio = new Audio('https://assets.mixkit.co/music/preview/mixkit-happy-birthday-10.mp3');
audio.volume = 0.3;
audio.loop = true;

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        audio.pause();
        musicToggle.innerHTML = '<i class="fas fa-play"></i>';
        musicToggle.title = 'Play music';
    } else {
        audio.play().catch(e => {
            console.log('Music autoplay prevented:', e);
            alert('Klik tombol play untuk memulai musik!');
        });
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        musicToggle.title = 'Pause music';
    }
    isMusicPlaying = !isMusicPlaying;
});

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Birthday Celebration Game Initialized');
    console.log('GitHub Photos URL:', GITHUB_PHOTOS_URL);
    console.log('Total memories:', totalMemories);
    
    // Create orbs
    createOrbs();
    updateProgress();
    
    // Close popup when clicking outside
    photoPopup.addEventListener('click', (e) => {
        if (e.target === photoPopup) {
            closePopup();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (photoPopup.style.display === 'flex') {
            if (e.key === 'ArrowLeft') prevPhoto();
            if (e.key === 'ArrowRight') nextPhoto();
            if (e.key === 'Escape') closePopup();
        }
        
        // Debug shortcuts
        if (e.key === 'r' || e.key === 'R') resetGame();
        if (e.key === 'd' || e.key === 'D') {
            console.log('=== DEBUG INFO ===');
            console.log('Collected:', collectedCount);
            console.log('Current Photo Index:', currentPhotoIndex);
            console.log('GitHub URL:', GITHUB_PHOTOS_URL);
            console.log('Music Playing:', isMusicPlaying);
        }
    });
    
    // Test jika foto gagal load
    setTimeout(() => {
        // Cek jika GitHub URL salah
        if (GITHUB_USERNAME.includes("GANTI")) {
            console.warn('⚠️ PERINGATAN: GITHUB_USERNAME belum diganti!');
            console.warn('Silakan edit script.js dan ganti:');
            console.warn('const GITHUB_USERNAME = "username-kamu";');
        }
    }, 2000);
});
