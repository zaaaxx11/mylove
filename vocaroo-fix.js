// ==================== VOCAROO IFRAME AUDIO FIX ====================
console.log("🎵 Loading Vocaroo Embed Fix...");

function embedVocarooAudio() {
    console.log("Embedding Vocaroo iframe...");
    
    // 1. REMOVE ALL EXISTING AUDIO ELEMENTS
    const existingAudio = document.querySelectorAll('audio');
    existingAudio.forEach(audio => audio.remove());
    
    // 2. ADD VOCAROO IFRAME (HIDDEN - WILL CONTROL VIA API)
    const iframeContainer = document.createElement('div');
    iframeContainer.id = 'vocarooContainer';
    iframeContainer.style.cssText = `
        position: fixed;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
        z-index: -9999;
    `;
    
    iframeContainer.innerHTML = `
        <iframe id="vocarooIframe" 
                width="300" 
                height="60" 
                src="https://vocaroo.com/embed/17MZiG75zwcj?autoplay=0" 
                frameborder="0" 
                allow="autoplay">
        </iframe>
    `;
    
    document.body.appendChild(iframeContainer);
    
    // 3. CREATE SIMPLE AUDIO CONTROL UI
    createAudioControlUI();
    
    // 4. MODIFY BLOW CANDLE FUNCTION
    modifyBlowCandleForVocaroo();
    
    console.log("✅ Vocaroo embed ready");
}

// ==================== CREATE AUDIO CONTROL UI ====================
function createAudioControlUI() {
    // Remove existing controls
    const existing = document.getElementById('vocarooControl');
    if (existing) existing.remove();
    
    const control = document.createElement('div');
    control.id = 'vocarooControl';
    control.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            left: 20px;
            background: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 9999;
            border: 4px solid #FF6BB5;
            max-width: 350px;
        ">
            <h3 style="margin: 0 0 15px 0; color: #FF6BB5; display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-music"></i> Lagu Nadin Amizah
            </h3>
            
            <!-- VOCAROO PLAYER EMBED -->
            <div style="margin-bottom: 15px; background: #f8f8f8; padding: 15px; border-radius: 10px;">
                <iframe width="100%" 
                        height="60" 
                        src="https://vocaroo.com/embed/17MZiG75zwcj?autoplay=0" 
                        frameborder="0" 
                        allow="autoplay"
                        style="border-radius: 5px;">
                </iframe>
                <p style="font-size: 0.8rem; color: #666; margin-top: 8px; text-align: center;">
                    <i class="fas fa-headphones"></i> Klik play di atas untuk dengar lagu
                </p>
            </div>
            
            <!-- INSTRUCTIONS -->
            <div style="background: #FFF5F7; padding: 12px; border-radius: 8px; margin-top: 15px;">
                <p style="margin: 0 0 10px 0; color: #FF6BB5; font-weight: bold;">
                    <i class="fas fa-info-circle"></i> Cara pakai:
                </p>
                <ol style="margin: 0; padding-left: 20px; font-size: 0.9rem; color: #666;">
                    <li>Klik tombol play di player atas</li>
                    <li>Tunggu lagu mulai (boleh pause dulu)</li>
                    <li>Klik "Tiup Lilin" untuk mulai petualangan</li>
                </ol>
            </div>
            
            <!-- START BUTTON -->
            <button id="startWithMusicBtn" style="
                background: linear-gradient(145deg, #4CAF50, #2E7D32);
                color: white;
                border: none;
                padding: 14px;
                border-radius: 10px;
                cursor: pointer;
                font-size: 1.1rem;
                font-weight: bold;
                width: 100%;
                margin-top: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                transition: all 0.3s;
            ">
                <i class="fas fa-check-circle"></i> Saya Sudah Dengar Lagu, Lanjut!
            </button>
        </div>
    `;
    
    document.body.appendChild(control);
    
    // Add event to start button
    document.getElementById('startWithMusicBtn').addEventListener('click', function() {
        startBirthdayExperience();
    });
}

// ==================== START EXPERIENCE ====================
function startBirthdayExperience() {
    console.log("Starting birthday experience with Vocaroo...");
    
    // Hide the control panel
    const control = document.getElementById('vocarooControl');
    if (control) {
        control.style.opacity = '0';
        control.style.transition = 'opacity 0.5s';
        setTimeout(() => control.style.display = 'none', 500);
    }
    
    // Show scene1
    const scene1 = document.getElementById('scene1');
    if (scene1) {
        scene1.style.display = 'flex';
        setTimeout(() => {
            scene1.style.opacity = '1';
        }, 50);
    }
    
    // Add mini music indicator
    addMusicIndicator();
}

// ==================== ADD MUSIC INDICATOR ====================
function addMusicIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'musicIndicator';
    indicator.innerHTML = `
        <div style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.95);
            padding: 12px 20px;
            border-radius: 50px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            z-index: 999;
            border: 2px solid #FF6BB5;
            display: flex;
            align-items: center;
            gap: 10px;
            backdrop-filter: blur(10px);
        ">
            <div style="color: #FF6BB5; font-size: 1.2rem;">
                <i class="fas fa-music"></i>
            </div>
            <div>
                <div style="font-weight: bold; color: #333; font-size: 0.9rem;">
                    Lagu Nadin Amizah
                </div>
                <div style="font-size: 0.8rem; color: #666;">
                    <a href="https://vocaroo.com/embed/17MZiG75zwcj" 
                       target="_blank"
                       style="color: #2196F3; text-decoration: none;">
                       <i class="fas fa-external-link-alt"></i> Buka di tab baru
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(indicator);
}

// ==================== MODIFY BLOW CANDLE ====================
function modifyBlowCandleForVocaroo() {
    const blowBtn = document.getElementById('blowButton');
    if (!blowBtn) return;
    
    // Store original function if exists
    const originalBlowCandle = window.blowCandle;
    
    // Replace onclick
    blowBtn.onclick = function() {
        console.log("Blow candle clicked with Vocaroo setup");
        
        // Play blow sound (separate from vocaroo)
        playBlowSound();
        
        // Show confirmation that music should be playing
        showMusicReminder();
        
        // Call original function if exists
        if (typeof originalBlowCandle === 'function') {
            originalBlowCandle();
        } else {
            // Fallback blow animation
            defaultBlowAnimation();
        }
    };
}

// ==================== PLAY BLOW SOUND ====================
function playBlowSound() {
    // Create temporary audio for blow sound
    const blowAudio = new Audio('https://assets.mixkit.co/sfx/download/mixkit-candle-blow-738.mp3');
    blowAudio.volume = 0.7;
    
    blowAudio.play().catch(e => {
        console.log("Blow sound skipped");
    });
    
    // Add shake effect
    const cakeContainer = document.getElementById('cakeContainer');
    if (cakeContainer) {
        cakeContainer.classList.add('shake-hard');
        setTimeout(() => cakeContainer.classList.remove('shake-hard'), 800);
    }
}

// ==================== SHOW MUSIC REMINDER ====================
function showMusicReminder() {
    const reminder = document.createElement('div');
    reminder.id = 'musicReminder';
    reminder.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.98);
            padding: 25px;
            border-radius: 20px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.3);
            z-index: 10000;
            border: 4px solid #4CAF50;
            text-align: center;
            max-width: 400px;
            animation: popIn 0.5s;
        ">
            <div style="color: #4CAF50; font-size: 3rem; margin-bottom: 15px;">
                <i class="fas fa-music"></i>
            </div>
            <h3 style="margin: 0 0 15px 0; color: #333;">
                Lagu Nadin Sedang Diputar?
            </h3>
            <p style="color: #666; margin-bottom: 20px; line-height: 1.5;">
                Pastikan kamu sudah menekan play di player lagu.<br>
                Jika belum, buka di tab baru:
            </p>
            <a href="https://vocaroo.com/embed/17MZiG75zwcj?autoplay=1" 
               target="_blank"
               style="
                    display: inline-block;
                    background: #2196F3;
                    color: white;
                    padding: 12px 25px;
                    border-radius: 25px;
                    text-decoration: none;
                    font-weight: bold;
                    margin-bottom: 15px;
               ">
               <i class="fas fa-external-link-alt"></i> Buka Lagu di Tab Baru
            </a>
            <div style="margin-top: 20px;">
                <button onclick="closeReminder()" style="
                    background: #FF6BB5;
                    color: white;
                    border: none;
                    padding: 10px 25px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 1rem;
                ">
                    <i class="fas fa-check"></i> Oke, Lanjutkan!
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(reminder);
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popIn {
            from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
            to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// ==================== HELPER FUNCTIONS ====================
function closeReminder() {
    const reminder = document.getElementById('musicReminder');
    if (reminder) reminder.remove();
}

function defaultBlowAnimation() {
    const flame = document.getElementById('flame');
    const btn = document.getElementById('blowButton');
    
    if (flame) {
        flame.style.animation = 'none';
        flame.style.opacity = '0';
        flame.style.transform = 'scale(0.2)';
        flame.style.transition = 'all 0.9s';
    }
    
    if (btn) {
        btn.innerHTML = '<i class="fas fa-sparkles"></i> Membuka Kejutan...';
        btn.disabled = true;
    }
    
    // Go to scene2 after delay
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
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing Vocaroo fix...");
    
    // Hide all scenes initially
    document.getElementById('scene1').style.display = 'none';
    document.getElementById('scene2').style.display = 'none';
    document.getElementById('scene3').style.display = 'none';
    
    // Hide loading screen
    const loading = document.getElementById('loading');
    if (loading) loading.classList.add('hidden');
    
    // Initialize Vocaroo embed
    setTimeout(embedVocarooAudio, 1000);
});

// ==================== GLOBAL FUNCTIONS ====================
window.closeReminder = closeReminder;
