// ===== CONFIGURATION =====
// ⭐⭐ GANTI INI DENGAN USERNAME & REPO KAMU! ⭐⭐
const GITHUB_USERNAME = "your-github-username";  // GANTI!
const REPO_NAME = "ultah-kekasih";              // GANTI!

// Base URL untuk foto di GitHub
const GITHUB_PHOTOS_URL = `https://github.com/zaaaxx11/birthday-photos.git`;

// Data foto dan caption
const memories = [
    { 
        title: "Pertama Kali Ketemu", 
        description: "Inget nggak waktu pertama ketemu? Kamu malu-malu banget! 😊",
        fileName: "1.jpg"
    },
    { 
        title: "Date Pertama", 
        description: "Makan sushi sambil cerita sampai lupa waktu! 🍣",
        fileName: "2.jpg"
    },
    { 
        title: "Liburan ke Pantai", 
        description: "Kamu lari dari ombak, lucu banget! 🌊",
        fileName: "3.jpg"
    },
    { 
        title: "Martabak Favorite", 
        description: "Selalu pesan martabak manis + keju extra! 🥞",
        fileName: "4.jpg"
    },
    { 
        title: "Selfie di Mobil", 
        description: "Waktu hujan deras, kita nyanyi-nyanyi di mobil! 🚗",
        fileName: "5.jpg"
    },
    { 
        title: "Candid Lucu", 
        description: "Waktu kamu ketawa sampe ngakak! 😂",
        fileName: "6.jpg"
    },
    { 
        title: "Baju Matching", 
        description: "Kita pakai baju warna sama tanpa janjian! 👕",
        fileName: "7.jpg"
    },
    { 
        title: "Jalan-jalan di Mall", 
        description: "Window shopping sambil pegang tangan! 🛍️",
        fileName: "8.jpg"
    },
    { 
        title: "Masak Bareng", 
        description: "Percobaan masak yang hampir gosong! 👩‍🍳",
        fileName: "9.jpg"
    },
    { 
        title: "Sunrise di Gunung", 
        description: "Bangun pagi tapi worth it untuk view ini! 🌅",
        fileName: "10.jpg"
    },
    { 
        title: "Anniversary", 
        description: "Celebrating our special day! 🎉",
        fileName: "11.jpg"
    },
    { 
        title: "Naik Sepeda", 
        description: "Kamu jatuh tapi ketawa terus! 🚲",
        fileName: "12.jpg"
    },
    { 
        title: "Kafe Favorit", 
        description: "Tempat kita sering nongkrong weekend! ☕",
        fileName: "13.jpg"
    },
    { 
        title: "Tidur di Bahu", 
        description: "Kamu tidur di bahu aku waktu nonton film! 💤",
        fileName: "14.jpg"
    },
    { 
        title: "Main sama Hewan", 
        description: "Kamu excited banget sama puppies! 🐶",
        fileName: "15.jpg"
    },
    { 
        title: "Rainy Day Cuddles", 
        description: "Hujan-hujan malah makin deket! 🌧️",
        fileName: "16.jpg"
    },
    { 
        title: "Restaurant Baru", 
        description: "Mencoba makanan aneh tapi enak! 🍽️",
        fileName: "17.jpg"
    },
    { 
        title: "Sunset di Pantai", 
        description: "Momen paling romantic kita! 🌇",
        fileName: "18.jpg"
    },
    { 
        title: "Ultah Kamu Tahun Lalu", 
        description: "Waktu kamu surprise dapat kue! 🎂",
        fileName: "19.jpg"
    },
    { 
        title: "Concert Favorite", 
        description: "Nyanyi bareng sampe serak! 🎤",
        fileName: "20.jpg"
    },
    { 
        title: "Foto Spontan", 
        description: "Candid moment yang nggak disangka! 📸",
        fileName: "21.jpg"
    },
    { 
        title: "Foto Terbaru", 
        description: "Masih sama, makin sayang! ❤️",
        fileName: "22.jpg"
    }
];

// ===== VARIABLES =====
let collectedCount = 0;
let currentPhotoIndex = 0;

// ===== DOM ELEMENTS =====
const orbsGrid = document.getElementById('orbsGrid');
const countElement = document.getElementById('count');
const photoPopup = document.getElementById('photoPopup');
const popupImage = document.getElementById('popupImage');
const photoTitle = document.getElementById('photoTitle');
const photoDescription = document.getElementById('photoDescription');
const photoNumber = document.getElementById('photoNumber');
const musicToggle = document.getElementById('musicToggle');
const volumeSlider = document.getElementById('volumeSlider');

// ===== CREATE ORBS =====
function createOrbs() {
    orbsGrid.innerHTML = '';
    
    memories.forEach((memory, index) => {
        const orb = document.createElement('div');
        orb.className = 'orb';
        orb.textContent = index + 1;
        orb.dataset.index = index;
        
        // Click event untuk buka foto
        orb.addEventListener('click', () => {
            showPhoto(index);
            
            // Mark as collected jika belum
            if (!orb.classList.contains('collected')) {
                orb.classList.add('collected');
                collectedCount++;
                countElement.textContent = collectedCount;
                
                // Celebration jika semua terkumpul
                if (collectedCount === memories.length) {
                    setTimeout(() => {
                        alert('🎉🎉🎉 SELAMAT! Semua 22 kenangan terkumpul!\nHappy 22nd Birthday Sayangku! 🎂❤️');
                    }, 500);
                }
            }
        });
        
        orbsGrid.appendChild(orb);
    });
}

// ===== SHOW PHOTO =====
function showPhoto(index) {
    currentPhotoIndex = index;
    const memory = memories[index];
    
    // ⭐⭐ INI YANG PAKAI GITHUB URL! ⭐⭐
    popupImage.src = `${GITHUB_PHOTOS_URL}/${memory.fileName}`;
    popupImage.alt = memory.title;
    
    photoTitle.textContent = memory.title;
    photoDescription.textContent = memory.description;
    photoNumber.textContent = `${index + 1}/${memories.length}`;
    
    // Show popup
    photoPopup.style.display = 'flex';
    
    // Add loading state
    popupImage.onload = () => {
        popupImage.style.opacity = '1';
    };
    popupImage.style.opacity = '0.5';
}

// ===== PHOTO NAVIGATION =====
function prevPhoto() {
    if (currentPhotoIndex > 0) {
        showPhoto(currentPhotoIndex - 1);
    }
}

function nextPhoto() {
    if (currentPhotoIndex < memories.length - 1) {
        showPhoto(currentPhotoIndex + 1);
    }
}

// ===== CLOSE POPUP =====
function closePopup() {
    photoPopup.style.display = 'none';
}

// ===== VIEW ALL PHOTOS =====
function showAllPhotos() {
    // Buka foto pertama
    showPhoto(0);
}

// ===== RESET GAME =====
function resetGame() {
    if (confirm('Reset semua progress dan mulai dari awal?')) {
        collectedCount = 0;
        countElement.textContent = '0';
        document.querySelectorAll('.orb').forEach(orb => {
            orb.classList.remove('collected');
        });
    }
}

// ===== MUSIC PLAYER =====
let isMusicPlaying = false;
const audio = new Audio();

// Set music source (ganti dengan link lagu Nadin Amizah nanti)
audio.src = 'https://assets.mixkit.co/music/preview/mixkit-clear-sky-479.mp3'; // placeholder
audio.volume = volumeSlider.value / 100;
audio.loop = true;

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        audio.pause();
        musicToggle.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play().catch(e => {
            console.log('Autoplay prevented, click play button');
            musicToggle.innerHTML = '<i class="fas fa-play"></i>';
        });
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isMusicPlaying = !isMusicPlaying;
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
});

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    createOrbs();
    console.log('🎮 Birthday game loaded!');
    console.log('📸 GitHub Photos URL:', GITHUB_PHOTOS_URL);
    
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
        if (e.key === 'r' || e.key === 'R') resetGame();
    });
});
