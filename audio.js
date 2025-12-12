// ==================== AUDIO FIX FOR BIRTHDAY PROJECT ====================
// File ini khusus untuk memperbaiki audio dengan link vocaroo

console.log("🎵 Loading Audio Fix System...");

// ==================== VARIABLES ====================
let audioInitialized = false;
const USER_AUDIO_URL = "https://voca.ro/17MZiG75zwcj"; // LINK LAGU NADIN AMIZAH KAMU
const BLOW_SOUND_URL = "https://assets.mixkit.co/sfx/download/mixkit-candle-blow-738.mp3";

// ==================== INIT AUDIO SYSTEM ====================
function initAudioSystem() {
    if (audioInitialized) return;
    
    console.log("Initializing audio system...");
    
    // 1. REPLACE AUDIO SOURCES
    const blowSound = document.getElementById('blowSound');
    const bgMusic = document.getElementById('bgMusic');
    
    if (blowSound) {
        blowSound.innerHTML = `<source src="${BLOW_SOUND_URL}" type="audio/mpeg">`;
        blowSound.volume = 0.8;
        console.log("✅ Blow sound updated");
    }
    
    if (bgMusic) {
        bgMusic.innerHTML = `<source src="${USER_AUDIO_URL}" type="audio/mpeg">`;
        bgMusic.volume = 0.6;
        bgMusic.loop = true;
        console.log("✅ Background music updated with your link");
    }
    
    // 2. CREATE AUDIO UNLOCK BUTTON
    createAudioUnlockButton();
    
    // 3. MODIFY BLOW CANDLE FUNCTION
    patchBlowCandleFunction();
    
    audioInitialized = true;
    console.log("🎵 Audio system ready!");
}

// ==================== CREATE AUDIO UNLOCK BUTTON ====================
function createAudioUnlockButton() {
    // Remove existing button if any
    const existingBtn = document.getElementById('audioUnlockBtn');
    if (existingBtn) existingBtn.remove();
    
    // Create new button
    const audioBtn = document.createElement('div');
    audioBtn.id = 'audioUnlockBtn';
    audioBtn.innerHTML = `
        <button onclick="unlockAudio()" style="
            background: linear-gradient(145deg, #4CAF50, #2E7D32);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: bold;
            box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 15px auto;
            transition: all 0.3s;
        ">
            <i class="fas fa-volume-up"></i> Klik di Sini untuk Mengaktifkan Audio
        </button>
        <p style="font-size: 0.9rem; color: #666; margin-top: 8px;">
            (Browser memblokir audio otomatis. Klik ini sekali sebelum tiup lilin)
        </p>
    `;
    
    audioBtn.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 9999;
        text-align: center;
        border: 3px solid #FF6BB5;
        max-width: 400px;
        width: 90%;
    `;
    
    document.body.appendChild(audioBtn);
}

// ==================== UNLOCK AUDIO FUNCTION ====================
function unlockAudio() {
    console.log("Unlocking audio...");
    
    // Create and play silent audio
    const silentAudio = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==");
    
    silentAudio.play().then(() => {
        console.log("✅ Audio context unlocked!");
        
        // Hide the unlock button
        const btn = document.getElementById('audioUnlockBtn');
        if (btn) {
            btn.innerHTML = `
                <div style="color: #4CAF50; font-size: 1.1rem;">
                    <i class="fas fa-check-circle"></i> Audio siap!<br>
                    <small>Sekarang klik "Tiup Lilin"</small>
                </div>
            `;
            setTimeout(() => {
                btn.style.opacity = '0.7';
                setTimeout(() => btn.style.display = 'none', 500);
            }, 2000);
        }
        
        // Test play background music
        const bgMusic = document.getElementById('bgMusic');
        if (bgMusic) {
            bgMusic.play().then(() => {
                console.log("✅ Background music test successful");
                bgMusic.pause();
                bgMusic.currentTime = 0;
            }).catch(e => {
                console.log("Background music still blocked");
            });
        }
        
    }).catch(e => {
        console.log("Audio unlock failed");
        alert("❌ Gagal mengaktifkan audio. Coba refresh halaman dan klik lagi.");
    });
}

// ==================== PATCH BLOW CANDLE FUNCTION ====================
function patchBlowCandleFunction() {
    const originalBlowCandle = window.blowCandle;
    
    if (typeof originalBlowCandle === 'function') {
        // Replace the function
        window.blowCandle = function() {
            console.log("🎂 Modified blowCandle called");
            
            const flame = document.getElementById('flame');
            const btn = document.getElementById('blowButton');
            const cakeContainer = document.getElementById('cakeContainer');
            
            if (!flame || !btn) return;
            
            // 1. GET AUDIO ELEMENTS
            const blowSound = document.getElementById('blowSound');
            const bgMusic = document.getElementById('bgMusic');
            
            // 2. PLAY BLOW SOUND (try-catch untuk safety)
            if (blowSound) {
                blowSound.currentTime = 0;
                blowSound.play().then(() => {
                    console.log("✅ Blow sound played");
                }).catch(e => {
                    console.log("Blow sound blocked");
                });
            }
            
            // 3. ANIMATIONS
            if (cakeContainer) {
                cakeContainer.classList.add('shake-hard');
                document.body.classList.add('shake-hard');
            }
            
            flame.style.animation = 'none';
            flame.style.opacity = '0';
            flame.style.transform = 'scale(0.2)';
            flame.style.transition = 'all 0.9s';
            
            btn.innerHTML = '<i class="fas fa-sparkles"></i> Membuka Kejutan...';
            btn.disabled = true;
            
            // 4. PLAY BACKGROUND MUSIC AFTER 1 SECOND
            setTimeout(() => {
                if (bgMusic) {
                    bgMusic.currentTime = 0;
                    bgMusic.play().then(() => {
                        console.log("✅ Your Nadin Amizah song playing!");
                        // Show music player
                        const musicPlayer = document.getElementById('musicPlayer');
                        if (musicPlayer) {
                            musicPlayer.classList.remove('hidden');
                        }
                    }).catch(e => {
                        console.log("❌ Background music blocked");
                        // Show manual play button
                        showManualPlayButton();
                    });
                }
            }, 1000);
            
            // 5. STOP SHAKE
            setTimeout(() => {
                if (cakeContainer) {
                    cakeContainer.classList.remove('shake-hard');
                    document.body.classList.remove('shake-hard');
                }
            }, 800);
            
            // 6. GO TO NEXT SCENE
            setTimeout(() => {
                document.getElementById('scene1').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('scene1').style.display = 'none';
                    document.getElementById('scene2').style.display = 'flex';
                    
                    // Initialize orbs if function exists
                    if (typeof window.initOrbs === 'function') {
                        window.initOrbs();
                    }
                    
                    setTimeout(() => {
                        document.getElementById('scene2').style.opacity = '1';
                    }, 50);
                }, 600);
            }, 2000);
        };
        
        console.log("✅ blowCandle function patched");
    }
}

// ==================== MANUAL PLAY BUTTON ====================
function showManualPlayButton() {
    const existing = document.getElementById('manualPlayBtn');
    if (existing) return;
    
    const manualBtn = document.createElement('div');
    manualBtn.id = 'manualPlayBtn';
    manualBtn.innerHTML = `
        <div style="
            background: rgba(255, 255, 255, 0.95);
            padding: 15px 25px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            border: 2px solid #FF6BB5;
            text-align: center;
            max-width: 300px;
            margin: 20px auto;
        ">
            <p style="color: #FF6BB5; margin-bottom: 10px; font-weight: bold;">
                <i class="fas fa-music"></i> Musik Belum Bisa Diputar
            </p>
            <button onclick="playMusicNow()" style="
                background: linear-gradient(145deg, #FF6BB5, #FF8EC7);
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 1rem;
                width: 100%;
            ">
                <i class="fas fa-play"></i> Klik untuk Putar Lagu Nadin Amizah
            </button>
        </div>
    `;
    
    // Add to scene2 (game scene)
    const scene2 = document.getElementById('scene2');
    if (scene2) {
        scene2.appendChild(manualBtn);
    } else {
        document.body.appendChild(manualBtn);
    }
}

function playMusicNow() {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.play().then(() => {
            console.log("✅ Music playing after manual click");
            const btn = document.getElementById('manualPlayBtn');
            if (btn) {
                btn.innerHTML = `
                    <div style="color: #4CAF50; padding: 15px;">
                        <i class="fas fa-check-circle"></i> Musik sedang diputar!
                    </div>
                `;
                setTimeout(() => btn.style.display = 'none', 2000);
            }
        }).catch(e => {
            alert("❌ Masih diblokir. Coba klik 'Aktifkan Audio' di atas.");
        });
    }
}

// ==================== INITIALIZE ON LOAD ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing audio fix...");
    
    // Wait a bit for other scripts to load
    setTimeout(() => {
        initAudioSystem();
        
        // Also try to unlock audio automatically on first click anywhere
        document.addEventListener('click', function firstClickHandler() {
            unlockAudio();
            document.removeEventListener('click', firstClickHandler);
        }, { once: true });
    }, 1000);
});

// ==================== EXPORT FUNCTIONS ====================
window.audioFix = {
    init: initAudioSystem,
    unlock: unlockAudio,
    playMusic: playMusicNow
};

console.log("🎵 Audio Fix System Loaded");
