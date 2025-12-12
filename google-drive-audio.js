// ==================== GOOGLE DRIVE AUDIO SOLUTION ====================
// 🎵 LINK LAGU NADIN AMIZAH KAMU: https://drive.google.com/file/d/1SaTIkLsgl-4HRJfSaZumZIV9AqL3GVgv/view

console.log("🎂 Loading Birthday Audio System...");

// ==================== CONFIGURATION ====================
const CONFIG = {
    // ⭐ LINK LAGU NADIN AMIZAH KAMU (direct download)
    birthdaySong: "https://drive.google.com/uc?export=download&id=1SaTIkLsgl-4HRJfSaZumZIV9AqL3GVgv",
    
    // Suara tiup lilin
    blowSound: "https://assets.mixkit.co/sfx/download/mixkit-candle-blow-738.mp3",
    
    // Colors
    primaryColor: "#FF6BB5",
    secondaryColor: "#FF8EC7"
};

// ==================== MAIN INITIALIZATION ====================
function initBirthdayExperience() {
    console.log("Initializing birthday experience...");
    
    // 1. HIDE ALL SCENES INITIALLY
    hideAllScenes();
    
    // 2. CREATE WELCOME SCREEN WITH AUDIO PLAYER
    createWelcomeScreen();
    
    // 3. SETUP EVENT LISTENERS
    setupEventListeners();
    
    console.log("✅ Birthday experience ready!");
}

// ==================== HIDE ALL SCENES ====================
function hideAllScenes() {
    document.getElementById('scene1').style.display = 'none';
    document.getElementById('scene2').style.display = 'none';
    document.getElementById('scene3').style.display = 'none';
    
    // Hide loading screen
    const loading = document.getElementById('loading');
    if (loading) loading.classList.add('hidden');
}

// ==================== CREATE WELCOME SCREEN ====================
function createWelcomeScreen() {
    const welcomeScreen = document.createElement('div');
    welcomeScreen.id = 'welcomeScreen';
    welcomeScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #FFD6E7, #FFB8D9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
        padding: 20px;
        animation: fadeIn 1s;
    `;
    
    welcomeScreen.innerHTML = `
        <div style="
            max-width: 500px;
            width: 100%;
            background: white;
            border-radius: 25px;
            padding: 40px 30px;
            box-shadow: 0 20px 50px rgba(255,107,181,0.3);
            text-align: center;
            border: 5px solid ${CONFIG.primaryColor};
        ">
            <!-- HEADER -->
            <div style="font-size: 4rem; margin-bottom: 20px; animation: float 3s infinite;">
                🦄✨
            </div>
            
            <h1 style="
                color: ${CONFIG.primaryColor};
                font-size: 2.8rem;
                margin-bottom: 10px;
                font-family: 'Dancing Script', cursive;
            ">
                Happy 22nd Birthday!
            </h1>
            
            <p style="color: #8A4B75; font-size: 1.2rem; margin-bottom: 30px;">
                Untuk pacarku tercinta 💝
            </p>
            
            <!-- DIVIDER -->
            <div style="height: 3px; background: linear-gradient(90deg, transparent, ${CONFIG.secondaryColor}, transparent); margin: 30px 0;"></div>
            
            <!-- AUDIO PLAYER SECTION -->
            <div style="margin-bottom: 30px;">
                <h3 style="
                    color: ${CONFIG.primaryColor};
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                ">
                    <i class="fas fa-music"></i> Lagu Spesial dari Nadin Amizah
                </h3>
                
                <!-- AUDIO PLAYER -->
                <div style="
                    background: #FFF5F7;
                    padding: 20px;
                    border-radius: 15px;
                    border: 2px dashed ${CONFIG.secondaryColor};
                    margin-bottom: 20px;
                ">
                    <audio id="birthdayAudioPlayer" controls style="width: 100%;">
                        <source src="${CONFIG.birthdaySong}" type="audio/mpeg">
                        Browser Anda tidak mendukung pemutar audio.
                    </audio>
                    
                    <div style="
                        display: flex;
                        justify-content: center;
                        gap: 10px;
                        margin-top: 15px;
                        flex-wrap: wrap;
                    ">
                        <button onclick="testAudio('blow')" style="
                            background: #4CAF50;
                            color: white;
                            border: none;
                            padding: 8px 15px;
                            border-radius: 20px;
                            cursor: pointer;
                            font-size: 0.9rem;
                            display: flex;
                            align-items: center;
                            gap: 5px;
                        ">
                            <i class="fas fa-volume-up"></i> Test Suara Tiup
                        </button>
                        
                        <button onclick="openInNewTab()" style="
                            background: #2196F3;
                            color: white;
                            border: none;
                            padding: 8px 15px;
                            border-radius: 20px;
                            cursor: pointer;
                            font-size: 0.9rem;
                            display: flex;
                            align-items: center;
                            gap: 5px;
                        ">
                            <i class="fas fa-external-link-alt"></i> Buka di Tab Baru
                        </button>
                    </div>
                </div>
                
                <!-- INSTRUCTIONS -->
                <div style="
                    background: #F8F8F8;
                    padding: 15px;
                    border-radius: 10px;
                    text-align: left;
                    font-size: 0.9rem;
                    color: #666;
                ">
                    <p style="margin: 0 0 10px 0; font-weight: bold; color: ${CONFIG.primaryColor};">
                        <i class="fas fa-info-circle"></i> Petunjuk:
                    </p>
                    <ol style="margin: 0; padding-left: 20px;">
                        <li>Klik tombol <span style="color: ${CONFIG.primaryColor};">► play</span> di atas untuk memutar lagu</li>
                        <li>Atur volume sesuai selera</li>
                        <li>Klik "Test Suara Tiup" untuk memastikan audio berfungsi</li>
                        <li>Klik "MULAI PETUALANGAN" di bawah</li>
                    </ol>
                </div>
            </div>
            
            <!-- DIVIDER -->
            <div style="height: 3px; background: linear-gradient(90deg, transparent, ${CONFIG.secondaryColor}, transparent); margin: 30px 0;"></div>
            
            <!-- START BUTTON -->
            <button id="startAdventureBtn" style="
                background: linear-gradient(145deg, ${CONFIG.primaryColor}, ${CONFIG.secondaryColor});
                color: white;
                border: none;
                padding: 20px 40px;
                font-size: 1.5rem;
                border-radius: 50px;
                cursor: pointer;
                box-shadow: 0 15px 35px rgba(255,107,181,0.4);
                transition: all 0.3s;
                font-weight: bold;
                width: 100%;
                max-width: 300px;
                margin: 0 auto;
                display: block;
            ">
                <i class="fas fa-play-circle"></i> MULAI PETUALANGAN
            </button>
            
            <p style="color: #8A4B75; margin-top: 20px; font-size: 0.9rem;">
                <i class="fas fa-gift"></i> Siapkan diri untuk kejutan spesial!
            </p>
        </div>
        
        <style>
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-15px) rotate(5deg); }
            }
            
            #startAdventureBtn:hover {
                transform: translateY(-5px) scale(1.05);
                box-shadow: 0 20px 40px rgba(255,107,181,0.6);
            }
            
            #startAdventureBtn:active {
                transform: translateY(0) scale(0.98);
            }
            
            /* Custom audio player styles */
            audio {
                border-radius: 10px;
                background: white;
            }
            
            audio::-webkit-media-controls-panel {
                background: linear-gradient(to right, #FFF5F7, white);
            }
        </style>
    `;
    
    document.body.appendChild(welcomeScreen);
}

// ==================== SETUP EVENT LISTENERS ====================
function setupEventListeners() {
    // This will be called after DOM is fully loaded
    setTimeout(() => {
        const startBtn = document.getElementById('startAdventureBtn');
        if (startBtn) {
            startBtn.addEventListener('click', startBirthdayAdventure);
        }
    }, 500);
}

// ==================== TEST AUDIO FUNCTION ====================
function testAudio(type) {
    if (type === 'blow') {
        const audio = new Audio(CONFIG.blowSound);
        audio.volume = 0.7;
        
        audio.play().then(() => {
            showNotification("✅ Suara tiup lilin berhasil!", "success");
        }).catch(e => {
            showNotification("❌ Audio diblokir browser", "error");
        });
    }
}

// ==================== OPEN IN NEW TAB ====================
function openInNewTab() {
    window.open(CONFIG.birthdaySong, '_blank');
    showNotification("🎵 Lagu dibuka di tab baru", "info");
}

// ==================== SHOW NOTIFICATION ====================
function showNotification(message, type) {
    // Remove existing notification
    const existing = document.getElementById('audioNotification');
    if (existing) existing.remove();
    
    const colors = {
        success: '#4CAF50',
        error: '#F44336',
        info: '#2196F3'
    };
    
    const notification = document.createElement('div');
    notification.id = 'audioNotification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 100000;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        animation: slideDown 0.5s;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: bold;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.5s';
            setTimeout(() => notification.remove(), 500);
        }
    }, 3000);
    
    // Add animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// ==================== START BIRTHDAY ADVENTURE ====================
function startBirthdayAdventure() {
    console.log("🎉 Starting birthday adventure!");
    
    const welcomeScreen = document.getElementById('welcomeScreen');
    const audioPlayer = document.getElementById('birthdayAudioPlayer');
    
    // Check if audio is playing
    const isAudioPlaying = audioPlayer && !audioPlayer.paused;
    
    // Play blow sound
    const blowAudio = new Audio(CONFIG.blowSound);
    blowAudio.volume = 0.8;
    blowAudio.play().catch(e => console.log("Blow sound skipped"));
    
    // Fade out welcome screen
    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.transition = 'opacity 0.8s';
    
    // Show notification about audio
    if (isAudioPlaying) {
        showNotification("🎵 Lagu akan terus diputar di background", "info");
    } else {
        showNotification("🔊 Klik pemutar audio di pojok untuk memutar lagu", "info");
    }
    
    // Transition to scene1
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        
        // Show scene1
        const scene1 = document.getElementById('scene1');
        scene1.style.display = 'flex';
        
        setTimeout(() => {
            scene1.style.opacity = '1';
            
            // Enhance blow candle button
            enhanceBlowCandleButton();
            
            // Add floating audio control
            addFloatingAudioControl();
            
        }, 50);
    }, 800);
}

// ==================== ENHANCE BLOW CANDLE BUTTON ====================
function enhanceBlowCandleButton() {
    const blowBtn = document.getElementById('blowButton');
    if (!blowBtn) return;
    
    // Store original function
    const originalBlowCandle = window.blowCandle;
    
    // Replace with enhanced version
    blowBtn.onclick = function() {
        console.log("🎂 Blow candle clicked!");
        
        // Play blow sound
        const blowAudio = new Audio(CONFIG.blowSound);
        blowAudio.volume = 0.8;
        blowAudio.play().catch(e => console.log("Blow sound skipped"));
        
        // Add shake effect
        const cakeContainer = document.getElementById('cakeContainer');
        if (cakeContainer) {
            cakeContainer.classList.add('shake-hard');
            setTimeout(() => cakeContainer.classList.remove('shake-hard'), 800);
        }
        
        // Show flame animation
        const flame = document.getElementById('flame');
        if (flame) {
            flame.style.animation = 'none';
            flame.style.opacity = '0';
            flame.style.transform = 'scale(0.2)';
            flame.style.transition = 'all 0.9s';
        }
        
        // Update button
        blowBtn.innerHTML = '<i class="fas fa-sparkles"></i> Membuka Kejutan...';
        blowBtn.disabled = true;
        
        // Call original function if exists
        if (typeof originalBlowCandle === 'function') {
            setTimeout(() => {
                originalBlowCandle();
            }, 100);
        } else {
            // Fallback to scene2
            setTimeout(() => {
                document.getElementById('scene1').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('scene1').style.display = 'none';
                    document.getElementById('scene2').style.display = 'flex';
                    
                    // Initialize orbs
                    if (typeof window.initOrbs === 'function') {
                        window.initOrbs();
                    }
                    
                    setTimeout(() => {
                        document.getElementById('scene2').style.opacity = '1';
                    }, 50);
                }, 600);
            }, 2000);
        }
    };
}

// ==================== ADD FLOATING AUDIO CONTROL ====================
function addFloatingAudioControl() {
    const audioControl = document.createElement('div');
    audioControl.id = 'floatingAudioControl';
    audioControl.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999;
        background: rgba(255, 255, 255, 0.95);
        padding: 15px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        border: 3px solid ${CONFIG.primaryColor};
        backdrop-filter: blur(10px);
        max-width: 250px;
        animation: slideInRight 0.5s;
    `;
    
    audioControl.innerHTML = `
        <div style="
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
            color: ${CONFIG.primaryColor};
            font-weight: bold;
        ">
            <i class="fas fa-music"></i>
            <span>Lagu Nadin Amizah</span>
        </div>
        
        <audio controls style="width: 100%; margin-bottom: 10px;">
            <source src="${CONFIG.birthdaySong}" type="audio/mpeg">
        </audio>
        
        <div style="
            font-size: 0.8rem;
            color: #666;
            text-align: center;
            padding: 8px;
            background: #FFF5F7;
            border-radius: 8px;
        ">
            <i class="fas fa-headphones"></i> Putar/pause dari sini
        </div>
    `;
    
    document.body.appendChild(audioControl);
    
    // Add animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// ==================== GLOBAL FUNCTIONS ====================
window.testAudio = testAudio;
window.openInNewTab = openInNewTab;

// ==================== INITIALIZE ON LOAD ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log("🎵 Google Drive Audio System Loaded");
    
    // Initialize after a short delay
    setTimeout(initBirthdayExperience, 1000);
});
