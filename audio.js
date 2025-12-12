// ==================== EMERGENCY AUDIO FIX ====================
console.log("🚨 EMERGENCY AUDIO FIX LOADING");

// ==================== AUDIO SETTINGS ====================
const AUDIO_CONFIG = {
    blowSound: "https://assets.mixkit.co/sfx/download/mixkit-candle-blow-738.mp3",
    
    // ⚠️ GANTI LINK INI DENGAN LINK GOOGLE DRIVE KAMU ⚠️
    backgroundMusic: "https://drive.google.com/uc?export=download&id=1SaTIkLsgl-4HRJfSaZumZIV9AqL3GVgv",
    
    // Alternatif jika Google Drive gagal:
    fallbackMusic: "https://assets.mixkit.co/music/download/mixkit-valentines-day-389.mp3"
};

// ==================== MAIN FIX ====================
function emergencyAudioFix() {
    console.log("Applying emergency audio fix...");
    
    // 1. REMOVE EXISTING AUDIO ELEMENTS
    const oldBlow = document.getElementById('blowSound');
    const oldMusic = document.getElementById('bgMusic');
    if (oldBlow) oldBlow.remove();
    if (oldMusic) oldMusic.remove();
    
    // 2. CREATE NEW AUDIO ELEMENTS
    const audioContainer = document.createElement('div');
    audioContainer.style.display = 'none';
    audioContainer.innerHTML = `
        <audio id="blowSoundFixed" preload="auto">
            <source src="${AUDIO_CONFIG.blowSound}" type="audio/mpeg">
        </audio>
        <audio id="bgMusicFixed" preload="auto" loop>
            <source src="${AUDIO_CONFIG.backgroundMusic}" type="audio/mpeg">
        </audio>
    `;
    document.body.appendChild(audioContainer);
    
    // 3. CREATE SIMPLE AUDIO CONTROL
    createSimpleAudioControl();
    
    // 4. OVERRIDE BLOW CANDLE FUNCTION
    overrideBlowCandle();
    
    console.log("✅ Emergency audio fix applied");
}

// ==================== SIMPLE AUDIO CONTROL ====================
function createSimpleAudioControl() {
    // Remove existing controls
    const existing = document.getElementById('simpleAudioControl');
    if (existing) existing.remove();
    
    const control = document.createElement('div');
    control.id = 'simpleAudioControl';
    control.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            left: 20px;
            background: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 9999;
            border: 3px solid #FF6BB5;
            min-width: 250px;
        ">
            <h4 style="margin: 0 0 10px 0; color: #FF6BB5;">
                <i class="fas fa-volume-up"></i> Audio Control
            </h4>
            
            <div style="margin-bottom: 10px;">
                <button onclick="playTestSound()" style="
                    background: #4CAF50;
                    color: white;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                    width: 100%;
                    margin-bottom: 5px;
                ">
                    <i class="fas fa-play"></i> Test Suara Tiup
                </button>
                <small style="color: #666;">Cek apakah browser support audio</small>
            </div>
            
            <div style="margin-bottom: 10px;">
                <button onclick="playBackgroundMusic()" style="
                    background: #2196F3;
                    color: white;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                    width: 100%;
                ">
                    <i class="fas fa-music"></i> Putar Lagu Nadin
                </button>
                <small style="color: #666;">Klik sebelum tiup lilin</small>
            </div>
            
            <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #eee;">
                <label style="font-size: 0.9rem; display: block; margin-bottom: 5px;">
                    Volume: <span id="volumeValue">70%</span>
                </label>
                <input type="range" id="volumeSlider" min="0" max="100" value="70" 
                       style="width: 100%;" oninput="updateVolume(this.value)">
            </div>
            
            <div style="margin-top: 15px; color: #666; font-size: 0.8rem;">
                <i class="fas fa-info-circle"></i> Klik "Putar Lagu Nadin" dulu, lalu "Tiup Lilin"
            </div>
        </div>
    `;
    
    document.body.appendChild(control);
}

// ==================== AUDIO FUNCTIONS ====================
function playTestSound() {
    const audio = new Audio(AUDIO_CONFIG.blowSound);
    audio.volume = 0.7;
    audio.play().then(() => {
        alert("✅ Suara berhasil! Browser support audio.");
    }).catch(e => {
        alert("❌ Browser memblokir audio. Coba izinkan audio di browser settings.");
    });
}

function playBackgroundMusic() {
    const bgMusic = document.getElementById('bgMusicFixed');
    if (!bgMusic) {
        alert("Audio system belum siap. Refresh halaman.");
        return;
    }
    
    bgMusic.volume = 0.7;
    bgMusic.currentTime = 0;
    bgMusic.play().then(() => {
        console.log("✅ Lagu Nadin diputar");
        document.getElementById('simpleAudioControl').innerHTML = `
            <div style="color: #4CAF50; padding: 10px; text-align: center;">
                <i class="fas fa-check-circle"></i> Lagu sedang diputar!<br>
                <small>Sekarang klik "Tiup Lilin"</small>
            </div>
        `;
    }).catch(e => {
        console.error("Gagal memutar lagu:", e);
        alert("❌ Gagal memutar lagu. Coba:\n1. Izinkan audio di browser\n2. Gunakan browser lain\n3. Pastikan link audio valid");
    });
}

function updateVolume(value) {
    const bgMusic = document.getElementById('bgMusicFixed');
    const blowSound = document.getElementById('blowSoundFixed');
    const volume = value / 100;
    
    if (bgMusic) bgMusic.volume = volume;
    if (blowSound) blowSound.volume = Math.min(volume * 1.2, 1);
    
    document.getElementById('volumeValue').textContent = value + '%';
}

// ==================== OVERRIDE BLOW CANDLE ====================
function overrideBlowCandle() {
    const blowBtn = document.getElementById('blowButton');
    if (!blowBtn) return;
    
    // Remove existing event listeners
    const newBlowBtn = blowBtn.cloneNode(true);
    blowBtn.parentNode.replaceChild(newBlowBtn, blowBtn);
    
    // Add new event listener
    newBlowBtn.addEventListener('click', function() {
        console.log("🎂 Emergency blow candle triggered");
        
        const flame = document.getElementById('flame');
        const cakeContainer = document.getElementById('cakeContainer');
        
        // 1. PLAY BLOW SOUND
        const blowSound = document.getElementById('blowSoundFixed');
        if (blowSound) {
            blowSound.currentTime = 0;
            blowSound.volume = 0.8;
            blowSound.play().catch(e => console.log("Blow sound skipped"));
        }
        
        // 2. ANIMATIONS
        if (cakeContainer) {
            cakeContainer.classList.add('shake-hard');
            document.body.classList.add('shake-hard');
        }
        
        if (flame) {
            flame.style.animation = 'none';
            flame.style.opacity = '0';
            flame.style.transform = 'scale(0.2)';
            flame.style.transition = 'all 0.9s';
        }
        
        newBlowBtn.innerHTML = '<i class="fas fa-sparkles"></i> Membuka Kejutan...';
        newBlowBtn.disabled = true;
        
        // 3. ENSURE BACKGROUND MUSIC IS PLAYING
        setTimeout(() => {
            const bgMusic = document.getElementById('bgMusicFixed');
            if (bgMusic) {
                if (bgMusic.paused) {
                    bgMusic.play().catch(e => {
                        console.log("Background music still blocked");
                    });
                }
            }
        }, 500);
        
        // 4. STOP SHAKE
        setTimeout(() => {
            if (cakeContainer) {
                cakeContainer.classList.remove('shake-hard');
                document.body.classList.remove('shake-hard');
            }
        }, 800);
        
        // 5. GO TO NEXT SCENE
        setTimeout(() => {
            document.getElementById('scene1').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('scene1').style.display = 'none';
                document.getElementById('scene2').style.display = 'flex';
                
                // Call initOrbs if exists
                if (typeof window.initOrbs === 'function') {
                    setTimeout(() => window.initOrbs(), 100);
                }
                
                setTimeout(() => {
                    document.getElementById('scene2').style.opacity = '1';
                }, 50);
            }, 600);
        }, 2000);
    });
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM ready, applying emergency fix...");
    
    // Wait for other scripts
    setTimeout(() => {
        emergencyAudioFix();
        
        // Hide loading screen if exists
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hidden');
        }
    }, 1500);
});

// ==================== MAKE FUNCTIONS GLOBAL ====================
window.playTestSound = playTestSound;
window.playBackgroundMusic = playBackgroundMusic;
window.updateVolume = updateVolume;
