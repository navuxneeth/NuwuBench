// Sound System using Web Audio API
const SoundSystem = {
    audioContext: null,
    enabled: true,
    
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
            this.enabled = false;
        }
    },
    
    playClick() {
        if (!this.enabled || !this.audioContext) return;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    },
    
    playSuccess() {
        if (!this.enabled || !this.audioContext) return;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.frequency.setValueAtTime(523, this.audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659, this.audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(784, this.audioContext.currentTime + 0.2);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    },
    
    playFailure() {
        if (!this.enabled || !this.audioContext) return;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime + 0.15);
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.2);
    },
    
    playPowerUp() {
        if (!this.enabled || !this.audioContext) return;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.3);
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    },
    
    playHover() {
        if (!this.enabled || !this.audioContext) return;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.frequency.value = 600;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }
};

// Visual Effects System
const VisualEffects = {
    createConfetti(x, y) {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = '50%';
            document.body.appendChild(confetti);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 5 + Math.random() * 10;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity - 5;
            
            let posX = x;
            let posY = y;
            let velX = vx;
            let velY = vy;
            
            const animate = () => {
                velY += 0.5;
                posX += velX;
                posY += velY;
                confetti.style.left = posX + 'px';
                confetti.style.top = posY + 'px';
                confetti.style.opacity = Math.max(0, 1 - (posY - y) / 300);
                
                if (posY < window.innerHeight + 50) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            };
            requestAnimationFrame(animate);
        }
    },
    
    shakeElement(element) {
        element.style.animation = 'shake 0.5s';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    },
    
    pulseElement(element) {
        element.style.animation = 'pulse 0.5s';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    },
    
    flashElement(element, color) {
        const originalBg = element.style.backgroundColor;
        element.style.backgroundColor = color;
        element.style.transition = 'background-color 0.3s';
        setTimeout(() => {
            element.style.backgroundColor = originalBg;
        }, 300);
    }
};

// Theme management
function toggleTheme() {
    const body = document.body;
    const button = document.getElementById('theme-toggle');
    
    SoundSystem.playClick();
    
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        button.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-theme');
        button.textContent = '🌙 Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const button = document.getElementById('theme-toggle');
    
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        button.textContent = '🌙 Dark Mode';
    }
    
    // Initialize sound system
    SoundSystem.init();
    
    // Add hover sounds to game cards
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            SoundSystem.playHover();
        });
    });
});

// Game state management
let currentGame = null;
let gameData = {};

// Navigation
function loadGame(gameName) {
    SoundSystem.playClick();
    currentGame = gameName;
    document.getElementById('game-menu').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    document.getElementById('back-button').classList.remove('hidden');
    document.getElementById('restart-button').classList.remove('hidden');
    
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    container.style.animation = 'slideIn 0.3s ease-out';
    
    switch(gameName) {
        case 'click-speed': initClickSpeed(); break;
        case 'type-speed': initTypeSpeed(); break;
        case 'reaction-mouse': initReactionMouse(); break;
        case 'reaction-key': initReactionKey(); break;
        case 'memory': initMemory(); break;
        case 'math': initMath(); break;
        case 'circle-draw': initCircleDraw(); break;
        case 'programming': initProgramming(); break;
        case 'tictactoe': initTicTacToe(); break;
        case 'pattern': initPattern(); break;
        case 'number-memory': initNumberMemory(); break;
        case 'visual-memory': initVisualMemory(); break;
        case 'sequence-memory': initSequenceMemory(); break;
        case 'aim-trainer': initAimTrainer(); break;
        case 'chimp-test': initChimpTest(); break;
        case 'word-scramble': initWordScramble(); break;
        case 'color-match': initColorMatch(); break;
        case 'typing-accuracy': initTypingAccuracy(); break;
        case 'reflex-test': initReflexTest(); break;
        case 'stroop-test': initStroopTest(); break;
        case 'verbal-memory': initVerbalMemory(); break;
        case 'number-sequence': initNumberSequence(); break;
        case 'typing-rhythm': initTypingRhythm(); break;
        case 'multi-task': initMultiTask(); break;
        case 'countdown-challenge': initCountdownChallenge(); break;
        case 'speed-clicker': initSpeedClicker(); break;
        case 'letter-memory': initLetterMemory(); break;
        case 'color-sequence': initColorSequence(); break;
        case 'mental-math': initMentalMath(); break;
        case 'pixel-perfect': initPixelPerfect(); break;
        case 'sound-memory': initSoundMemory(); break;
        case 'puzzle-slider': initPuzzleSlider(); break;
        case 'reaction-colors': initReactionColors(); break;
        case 'typing-ninja': initTypingNinja(); break;
        case 'button-masher': initButtonMasher(); break;
        case 'memory-cards': initMemoryCards(); break;
        case 'arrow-dodge': initArrowDodge(); break;
        case 'precision-click': initPrecisionClick(); break;
        case 'emoji-memory': initEmojiMemory(); break;
        case 'quick-decision': initQuickDecision(); break;
        case 'snake-game': initSnakeGame(); break;
        case 'whack-a-mole': initWhackAMole(); break;
        case 'space-invaders': initSpaceInvaders(); break;
        case 'match-3': initMatch3(); break;
        case 'runner-game': initRunnerGame(); break;
        case 'breakout': initBreakout(); break;
        case 'flappy-bird': initFlappyBird(); break;
        case 'color-memory-test': initColorMemoryTest(); break;
        case 'word-association': initWordAssociation(); break;
        case 'maze-navigator': initMazeNavigator(); break;
        case 'tower-of-hanoi': initTowerOfHanoi(); break;
        case 'reaction-chain': initReactionChain(); break;
        case 'memory-pairs': initMemoryPairs(); break;
    }
}

function backToMenu() {
    SoundSystem.playClick();
    currentGame = null;
    gameData = {};
    document.getElementById('game-menu').classList.remove('hidden');
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('back-button').classList.add('hidden');
    document.getElementById('restart-button').classList.add('hidden');
}

function restartGame() {
    SoundSystem.playClick();
    if (currentGame) {
        loadGame(currentGame);
    }
}

// 1. Click Speed Test
function initClickSpeed() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Click Speed Test</h2>
        <div class="settings-panel">
            <h4>Settings</h4>
            <div class="setting-item">
                <span class="setting-label">Duration (seconds):</span>
                <select id="click-duration">
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="30">30</option>
                    <option value="60">60</option>
                </select>
            </div>
        </div>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Clicks:</span>
                <span class="stat-value" id="click-count">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">CPS:</span>
                <span class="stat-value" id="cps">0.0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Time:</span>
                <span class="stat-value" id="time-left">0</span>
            </div>
        </div>
        <div class="click-area" id="click-area">
            Click here to start!
        </div>
        <div class="leaderboard" id="click-leaderboard" style="display:none;">
            <h4>Your Records</h4>
            <div id="click-records"></div>
        </div>
    `;
    loadClickRecords();
    
    const clickArea = document.getElementById('click-area');
    let testStarted = false;
    
    clickArea.onclick = () => {
        if (!testStarted) {
            testStarted = true;
            startClickTest();
        }
    };
}

function startClickTest() {
    const duration = parseInt(document.getElementById('click-duration').value);
    const clickArea = document.getElementById('click-area');
    let clicks = 0;
    let startTime = Date.now();
    let interval;
    
    clickArea.textContent = 'CLICK NOW!';
    clickArea.style.backgroundColor = 'var(--bg-tertiary)';
    
    function updateStats() {
        const elapsed = Math.min((Date.now() - startTime) / 1000, duration);
        const timeLeft = Math.max(0, duration - elapsed);
        const cps = elapsed > 0 ? (clicks / elapsed).toFixed(2) : 0;
        
        document.getElementById('click-count').textContent = clicks;
        document.getElementById('cps').textContent = cps;
        document.getElementById('time-left').textContent = timeLeft.toFixed(1);
        
        if (elapsed >= duration) {
            clearInterval(interval);
            clickArea.onclick = null;
            clickArea.style.backgroundColor = 'var(--bg-secondary)';
            clickArea.textContent = `Test Complete! ${clicks} clicks in ${duration}s (${cps} CPS)`;
            saveClickRecord(duration, clicks, parseFloat(cps));
            loadClickRecords();
        }
    }
    
    clickArea.onclick = () => {
        clicks++;
        updateStats();
    };
    
    interval = setInterval(updateStats, 50);
    updateStats();
}

function saveClickRecord(duration, clicks, cps) {
    let records = JSON.parse(localStorage.getItem('clickRecords') || '[]');
    records.push({ duration, clicks, cps, date: new Date().toISOString() });
    records.sort((a, b) => b.cps - a.cps);
    records = records.slice(0, 10);
    localStorage.setItem('clickRecords', JSON.stringify(records));
}

function loadClickRecords() {
    const records = JSON.parse(localStorage.getItem('clickRecords') || '[]');
    const container = document.getElementById('click-records');
    const leaderboard = document.getElementById('click-leaderboard');
    
    if (records.length > 0) {
        leaderboard.style.display = 'block';
        container.innerHTML = records.map((r, i) => `
            <div class="leaderboard-entry">
                <span class="rank">#${i + 1} - ${r.duration}s</span>
                <span class="score-display">${r.clicks} clicks (${r.cps.toFixed(2)} CPS)</span>
            </div>
        `).join('');
    }
}

// 2. Type Speed Test
function initTypeSpeed() {
    const container = document.getElementById('game-container');
    const sampleTexts = [
        "The quick brown fox jumps over the lazy dog.",
        "Programming is the art of telling another human what one wants the computer to do.",
        "In the world of technology, speed and accuracy are key to success.",
        "Practice makes perfect, especially when it comes to typing skills."
    ];
    
    container.innerHTML = `
        <h2 class="game-title">Type Speed Test</h2>
        <div class="settings-panel">
            <h4>Settings</h4>
            <div class="setting-item">
                <span class="setting-label">Duration (seconds):</span>
                <select id="type-duration">
                    <option value="30">30</option>
                    <option value="60" selected>60</option>
                    <option value="120">120</option>
                </select>
            </div>
        </div>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">WPM:</span>
                <span class="stat-value" id="wpm">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Accuracy:</span>
                <span class="stat-value" id="accuracy">100%</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Time:</span>
                <span class="stat-value" id="type-time">0</span>
            </div>
        </div>
        <div class="test-area">
            <div id="sample-text" style="font-size: 28px; color: var(--text-secondary); margin-bottom: 20px;"></div>
            <textarea id="type-input" class="code-editor" placeholder="Start typing here to begin..." style="min-height: 150px;"></textarea>
        </div>
    `;
    
    document.getElementById('sample-text').textContent = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    
    const input = document.getElementById('type-input');
    let testStarted = false;
    
    input.addEventListener('input', () => {
        if (!testStarted) {
            testStarted = true;
            startTypeTest();
        }
    });
}

function startTypeTest() {
    const duration = parseInt(document.getElementById('type-duration').value);
    const input = document.getElementById('type-input');
    const sampleText = document.getElementById('sample-text').textContent;
    const startTime = Date.now();
    let interval;
    
    function updateStats() {
        const elapsed = Math.min((Date.now() - startTime) / 1000, duration);
        const timeLeft = Math.max(0, duration - elapsed);
        const typed = input.value;
        const words = typed.trim().split(/\s+/).length;
        const wpm = Math.round((words / elapsed) * 60);
        
        let correctChars = 0;
        for (let i = 0; i < Math.min(typed.length, sampleText.length); i++) {
            if (typed[i] === sampleText[i]) correctChars++;
        }
        const accuracy = typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 100;
        
        document.getElementById('wpm').textContent = wpm;
        document.getElementById('accuracy').textContent = accuracy + '%';
        document.getElementById('type-time').textContent = timeLeft.toFixed(1);
        
        if (elapsed >= duration) {
            clearInterval(interval);
            input.disabled = true;
        }
    }
    
    interval = setInterval(updateStats, 100);
}

// 3. Reaction Test (Mouse)
function initReactionMouse() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Reaction Test (Mouse)</h2>
        <div class="settings-panel">
            <h4>Settings</h4>
            <div class="setting-item">
                <span class="setting-label">Number of Targets:</span>
                <select id="target-count">
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="20">20</option>
                </select>
            </div>
            <div class="setting-item">
                <span class="setting-label">Delay (ms):</span>
                <select id="target-delay">
                    <option value="500">500</option>
                    <option value="1000" selected>1000</option>
                    <option value="2000">2000</option>
                </select>
            </div>
        </div>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Average Time:</span>
                <span class="stat-value" id="avg-time">0ms</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Target:</span>
                <span class="stat-value" id="target-progress">0/0</span>
            </div>
        </div>
        <div class="click-area" id="reaction-area">
            Click anywhere to start
        </div>
    `;
    
    const area = document.getElementById('reaction-area');
    let started = false;
    
    area.onclick = () => {
        if (!started) {
            started = true;
            area.onclick = null;
            startReactionMouse();
        }
    };
}

function startReactionMouse() {
    const count = parseInt(document.getElementById('target-count').value);
    const delay = parseInt(document.getElementById('target-delay').value);
    const area = document.getElementById('reaction-area');
    let currentTarget = 0;
    let times = [];
    let appearTime;
    
    area.innerHTML = 'Get Ready...';
    
    function showTarget() {
        if (currentTarget >= count) {
            const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
            area.innerHTML = `Test Complete!<br>Average Reaction: ${avgTime.toFixed(0)}ms`;
            return;
        }
        
        setTimeout(() => {
            area.innerHTML = '';
            const circle = document.createElement('div');
            circle.className = 'circle-target';
            circle.style.left = Math.random() * (area.clientWidth - 100) + 'px';
            circle.style.top = Math.random() * (area.clientHeight - 100) + 'px';
            area.appendChild(circle);
            appearTime = Date.now();
            
            circle.onclick = () => {
                const reactionTime = Date.now() - appearTime;
                times.push(reactionTime);
                currentTarget++;
                const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
                document.getElementById('avg-time').textContent = avgTime.toFixed(0) + 'ms';
                document.getElementById('target-progress').textContent = `${currentTarget}/${count}`;
                showTarget();
            };
        }, delay);
    }
    
    document.getElementById('target-progress').textContent = `0/${count}`;
    showTarget();
}

// 4. Reaction Test (Keyboard)
function initReactionKey() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Reaction Test (Keyboard)</h2>
        <div class="settings-panel">
            <h4>Settings</h4>
            <div class="setting-item">
                <span class="setting-label">Number of Rounds:</span>
                <select id="key-rounds">
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Average Time:</span>
                <span class="stat-value" id="key-avg-time">0ms</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Round:</span>
                <span class="stat-value" id="key-progress">0/0</span>
            </div>
        </div>
        <div class="test-area" id="key-area" style="font-size: 120px; color: var(--text-accent);">
            Press any key to start
        </div>
    `;
    
    let started = false;
    const startHandler = (e) => {
        if (!started) {
            started = true;
            document.removeEventListener('keydown', startHandler);
            startReactionKey();
        }
    };
    document.addEventListener('keydown', startHandler);
}

function startReactionKey() {
    const rounds = parseInt(document.getElementById('key-rounds').value);
    const area = document.getElementById('key-area');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let currentRound = 0;
    let times = [];
    let appearTime;
    let expectedKey;
    
    function showLetter() {
        if (currentRound >= rounds) {
            const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
            area.style.fontSize = '48px';
            area.textContent = `Test Complete! Average: ${avgTime.toFixed(0)}ms`;
            document.removeEventListener('keydown', keyHandler);
            return;
        }
        
        setTimeout(() => {
            expectedKey = letters[Math.floor(Math.random() * letters.length)];
            area.textContent = expectedKey;
            appearTime = Date.now();
        }, 1000 + Math.random() * 1000);
    }
    
    function keyHandler(e) {
        if (e.key.toUpperCase() === expectedKey) {
            const reactionTime = Date.now() - appearTime;
            times.push(reactionTime);
            currentRound++;
            const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
            document.getElementById('key-avg-time').textContent = avgTime.toFixed(0) + 'ms';
            document.getElementById('key-progress').textContent = `${currentRound}/${rounds}`;
            showLetter();
        }
    }
    
    document.addEventListener('keydown', keyHandler);
    document.getElementById('key-progress').textContent = `0/${rounds}`;
    area.textContent = 'Get Ready...';
    showLetter();
}

// 5. Memory Test
function initMemory() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Memory Test</h2>
        <div class="settings-panel">
            <h4>Settings</h4>
            <div class="setting-item">
                <span class="setting-label">Grid Size:</span>
                <select id="memory-size">
                    <option value="3">3x3</option>
                    <option value="4" selected>4x4</option>
                    <option value="5">5x5</option>
                </select>
            </div>
        </div>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value" id="memory-level">1</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="memory-score">0</span>
            </div>
        </div>
        <div id="memory-grid" class="grid-container"></div>
        <div id="memory-message" style="text-align: center; color: var(--text-accent); font-size: 28px; margin-top: 20px;">
            Click anywhere to start
        </div>
    `;
    
    const grid = document.getElementById('memory-grid');
    let started = false;
    
    const startHandler = () => {
        if (!started) {
            started = true;
            document.getElementById('memory-message').textContent = '';
            document.removeEventListener('click', startHandler);
            startMemory();
        }
    };
    document.addEventListener('click', startHandler);
}

function startMemory() {
    const size = parseInt(document.getElementById('memory-size').value);
    const grid = document.getElementById('memory-grid');
    let level = 1;
    let score = 0;
    let sequence = [];
    let playerSequence = [];
    
    grid.style.gridTemplateColumns = `repeat(${size}, 80px)`;
    grid.innerHTML = '';
    
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.style.width = '80px';
        cell.style.height = '80px';
        cell.dataset.index = i;
        grid.appendChild(cell);
    }
    
    function playSequence() {
        document.getElementById('memory-message').textContent = 'Watch the sequence...';
        const cells = grid.children;
        playerSequence = [];
        
        for (let cell of cells) {
            cell.onclick = null;
            cell.classList.remove('active');
        }
        
        const newCell = Math.floor(Math.random() * (size * size));
        sequence.push(newCell);
        
        let i = 0;
        const interval = setInterval(() => {
            if (i > 0) cells[sequence[i - 1]].classList.remove('shown');
            if (i < sequence.length) {
                cells[sequence[i]].classList.add('shown');
                i++;
            } else {
                clearInterval(interval);
                cells[sequence[sequence.length - 1]].classList.remove('shown');
                enableInput();
            }
        }, 800);
    }
    
    function enableInput() {
        document.getElementById('memory-message').textContent = 'Your turn! Repeat the sequence';
        const cells = grid.children;
        
        for (let cell of cells) {
            cell.onclick = function() {
                const index = parseInt(this.dataset.index);
                playerSequence.push(index);
                this.classList.add('active');
                setTimeout(() => this.classList.remove('active'), 300);
                
                const currentStep = playerSequence.length - 1;
                if (playerSequence[currentStep] !== sequence[currentStep]) {
                    document.getElementById('memory-message').textContent = `Game Over! Final Score: ${score}`;
                    for (let c of cells) c.onclick = null;
                    return;
                }
                
                if (playerSequence.length === sequence.length) {
                    score += level * 10;
                    level++;
                    document.getElementById('memory-level').textContent = level;
                    document.getElementById('memory-score').textContent = score;
                    setTimeout(playSequence, 1000);
                }
            };
        }
    }
    
    playSequence();
}

// 6. Math Test
function initMath() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Math Test</h2>
        <div class="settings-panel">
            <h4>Settings</h4>
            <div class="setting-item">
                <span class="setting-label">Difficulty:</span>
                <select id="math-difficulty">
                    <option value="easy">Easy</option>
                    <option value="medium" selected>Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div class="setting-item">
                <span class="setting-label">Time Limit (sec):</span>
                <select id="math-time">
                    <option value="30">30</option>
                    <option value="60" selected>60</option>
                    <option value="120">120</option>
                </select>
            </div>
        </div>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="math-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Time Left:</span>
                <span class="stat-value" id="math-timer">0</span>
            </div>
        </div>
        <div id="math-question" class="question"></div>
        <div style="text-align: center; margin: 20px 0;">
            <input type="number" id="math-answer" placeholder="Type answer to start" style="width: 200px; font-size: 32px; text-align: center;">
        </div>
        <button id="math-submit" onclick="submitMathAnswer()" style="display: none;">SUBMIT</button>
    `;
    
    const input = document.getElementById('math-answer');
    let started = false;
    
    input.addEventListener('input', () => {
        if (!started && input.value) {
            started = true;
            startMathTest();
        }
    });
}

function startMathTest() {
    const difficulty = document.getElementById('math-difficulty').value;
    const timeLimit = parseInt(document.getElementById('math-time').value);
    let score = 0;
    let startTime = Date.now();
    let currentAnswer;
    
    document.getElementById('math-submit').style.display = 'inline-block';
    
    function generateQuestion() {
        const elapsed = (Date.now() - startTime) / 1000;
        const timeLeft = Math.max(0, timeLimit - elapsed);
        document.getElementById('math-timer').textContent = timeLeft.toFixed(1);
        
        if (timeLeft <= 0) {
            document.getElementById('math-question').textContent = `Time's up! Final Score: ${score}`;
            document.getElementById('math-answer').disabled = true;
            document.getElementById('math-submit').style.display = 'none';
            return;
        }
        
        let a, b, op, question;
        if (difficulty === 'easy') {
            a = Math.floor(Math.random() * 20) + 1;
            b = Math.floor(Math.random() * 20) + 1;
            op = ['+', '-'][Math.floor(Math.random() * 2)];
        } else if (difficulty === 'medium') {
            a = Math.floor(Math.random() * 50) + 10;
            b = Math.floor(Math.random() * 50) + 10;
            op = ['+', '-', '*'][Math.floor(Math.random() * 3)];
        } else {
            a = Math.floor(Math.random() * 100) + 20;
            b = Math.floor(Math.random() * 100) + 20;
            op = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
        }
        
        if (op === '+') currentAnswer = a + b;
        else if (op === '-') currentAnswer = a - b;
        else if (op === '*') currentAnswer = a * b;
        else {
            currentAnswer = Math.floor(a / b);
            question = `${a} ${op} ${b} (round down)`;
        }
        
        if (!question) question = `${a} ${op} ${b}`;
        document.getElementById('math-question').textContent = question + ' = ?';
        document.getElementById('math-answer').value = '';
        document.getElementById('math-answer').focus();
    }
    
    window.submitMathAnswer = function() {
        const userAnswer = parseInt(document.getElementById('math-answer').value);
        if (userAnswer === currentAnswer) {
            score++;
            document.getElementById('math-score').textContent = score;
        }
        generateQuestion();
    };
    
    document.getElementById('math-answer').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitMathAnswer();
    });
    
    const timerInterval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const timeLeft = Math.max(0, timeLimit - elapsed);
        document.getElementById('math-timer').textContent = timeLeft.toFixed(1);
        if (timeLeft <= 0) clearInterval(timerInterval);
    }, 100);
    
    generateQuestion();
}

// 7. Circle Draw Test
function initCircleDraw() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Circle Draw Test</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Accuracy:</span>
                <span class="stat-value" id="circle-accuracy">0%</span>
            </div>
        </div>
        <div style="text-align: center; margin: 20px 0;">
            <canvas id="circle-canvas" width="600" height="600"></canvas>
        </div>
        <div id="circle-result" style="text-align: center; color: var(--text-accent); font-size: 28px; margin-top: 20px;">
            Draw a circle with your mouse
        </div>
    `;
    
    startCircleDraw();
}

function startCircleDraw() {
    const canvas = document.getElementById('circle-canvas');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let points = [];
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'var(--text-accent)';
    ctx.lineWidth = 3;
    
    canvas.onmousedown = (e) => {
        drawing = true;
        points = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const rect = canvas.getBoundingClientRect();
        points.push({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    
    canvas.onmousemove = (e) => {
        if (!drawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        points.push({ x, y });
        
        ctx.beginPath();
        ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
        ctx.lineTo(x, y);
        ctx.stroke();
    };
    
    canvas.onmouseup = () => {
        drawing = false;
        if (points.length < 10) return;
        
        // Calculate center
        let sumX = 0, sumY = 0;
        points.forEach(p => { sumX += p.x; sumY += p.y; });
        const centerX = sumX / points.length;
        const centerY = sumY / points.length;
        
        // Calculate average radius
        let sumRadius = 0;
        points.forEach(p => {
            const dx = p.x - centerX;
            const dy = p.y - centerY;
            sumRadius += Math.sqrt(dx * dx + dy * dy);
        });
        const avgRadius = sumRadius / points.length;
        
        // Calculate variance
        let variance = 0;
        points.forEach(p => {
            const dx = p.x - centerX;
            const dy = p.y - centerY;
            const radius = Math.sqrt(dx * dx + dy * dy);
            variance += Math.pow(radius - avgRadius, 2);
        });
        variance /= points.length;
        
        // Draw perfect circle
        ctx.strokeStyle = 'var(--text-secondary)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, avgRadius, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Calculate accuracy
        const accuracy = Math.max(0, 100 - (Math.sqrt(variance) / avgRadius) * 100);
        document.getElementById('circle-accuracy').textContent = accuracy.toFixed(1) + '%';
        document.getElementById('circle-result').textContent = 
            `Accuracy: ${accuracy.toFixed(1)}% - ${accuracy > 90 ? 'Excellent!' : accuracy > 75 ? 'Good!' : accuracy > 50 ? 'Not bad!' : 'Keep practicing!'}`;
    };
}


// 8. Programming Test
function initProgramming() {
    const container = document.getElementById('game-container');
    const questions = [
        {
            question: "What does HTML stand for?",
            answers: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
            correct: 0
        },
        {
            question: "Which operator is used for assignment in JavaScript?",
            answers: ["==", "=", "===", "=>"],
            correct: 1
        },
        {
            question: "What is the correct way to declare a variable in JavaScript?",
            answers: ["var x;", "variable x;", "v x;", "dim x;"],
            correct: 0
        },
        {
            question: "Which language is primarily used for styling web pages?",
            answers: ["HTML", "JavaScript", "CSS", "Python"],
            correct: 2
        },
        {
            question: "What does CSS stand for?",
            answers: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
            correct: 1
        },
        {
            question: "Which symbol is used for single-line comments in JavaScript?",
            answers: ["//", "/*", "#", "--"],
            correct: 0
        },
        {
            question: "What is the output of: console.log(typeof [])?",
            answers: ["array", "object", "list", "undefined"],
            correct: 1
        },
        {
            question: "Which method adds an element to the end of an array?",
            answers: ["push()", "pop()", "shift()", "unshift()"],
            correct: 0
        }
    ];
    
    container.innerHTML = `
        <h2 class="game-title">Programming Test</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Question:</span>
                <span class="stat-value" id="prog-question-num">1/${questions.length}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="prog-score">0</span>
            </div>
        </div>
        <div id="prog-quiz"></div>
    `;
    
    startProgramming();
}

function startProgramming() {
    const questions = [
        {
            question: "What does HTML stand for?",
            answers: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
            correct: 0
        },
        {
            question: "Which operator is used for assignment in JavaScript?",
            answers: ["==", "=", "===", "=>"],
            correct: 1
        },
        {
            question: "What is the correct way to declare a variable in JavaScript?",
            answers: ["var x;", "variable x;", "v x;", "dim x;"],
            correct: 0
        },
        {
            question: "Which language is primarily used for styling web pages?",
            answers: ["HTML", "JavaScript", "CSS", "Python"],
            correct: 2
        },
        {
            question: "What does CSS stand for?",
            answers: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
            correct: 1
        },
        {
            question: "Which symbol is used for single-line comments in JavaScript?",
            answers: ["//", "/*", "#", "--"],
            correct: 0
        },
        {
            question: "What is the output of: console.log(typeof [])?",
            answers: ["array", "object", "list", "undefined"],
            correct: 1
        },
        {
            question: "Which method adds an element to the end of an array?",
            answers: ["push()", "pop()", "shift()", "unshift()"],
            correct: 0
        },
        {
            question: "What does API stand for?",
            answers: ["Application Programming Interface", "Advanced Programming Integration", "Automated Program Interaction", "Application Process Interface"],
            correct: 0
        },
        {
            question: "Which HTML tag is used for the largest heading?",
            answers: ["<head>", "<h6>", "<h1>", "<heading>"],
            correct: 2
        },
        {
            question: "What is the correct syntax for a JavaScript function?",
            answers: ["function myFunc()", "function:myFunc()", "def myFunc()", "func myFunc()"],
            correct: 0
        },
        {
            question: "Which CSS property controls text size?",
            answers: ["text-size", "font-size", "text-style", "font-style"],
            correct: 1
        },
        {
            question: "What does DOM stand for?",
            answers: ["Document Object Model", "Data Object Management", "Digital Output Method", "Display Object Module"],
            correct: 0
        },
        {
            question: "Which loop iterates a specific number of times?",
            answers: ["while", "do-while", "for", "foreach"],
            correct: 2
        },
        {
            question: "What is the result of 3 + '3' in JavaScript?",
            answers: ["6", "33", "9", "error"],
            correct: 1
        },
        {
            question: "Which method removes the last element from an array?",
            answers: ["pop()", "push()", "delete()", "remove()"],
            correct: 0
        },
        {
            question: "What is JSON?",
            answers: ["JavaScript Object Notation", "Java Standard Object Notation", "JavaScript Online Network", "Java Source Object Name"],
            correct: 0
        },
        {
            question: "Which keyword is used to create a constant in JavaScript?",
            answers: ["var", "let", "const", "constant"],
            correct: 2
        },
        {
            question: "What is the purpose of 'use strict' in JavaScript?",
            answers: ["Makes code run faster", "Enables strict mode", "Requires semicolons", "Enables type checking"],
            correct: 1
        },
        {
            question: "Which CSS property is used to change background color?",
            answers: ["bgcolor", "background-color", "color", "bg-color"],
            correct: 1
        }
    ];
    
    let currentQ = 0;
    let score = 0;
    
    function showQuestion() {
        if (currentQ >= questions.length) {
            const percentage = (score / questions.length * 100).toFixed(0);
            const isPerfect = score === questions.length;
            const container = document.getElementById('prog-quiz');
            
            container.innerHTML = `
                <div class="results" style="animation: scaleIn 0.5s ease-out;">
                    <h3>${isPerfect ? '🎉 PERFECT SCORE! 🎉' : 'Quiz Complete!'}</h3>
                    <div class="score">${score}/${questions.length}</div>
                    <p style="font-size: 48px; color: var(--text-accent);">${percentage}% Correct</p>
                    <p style="font-size: 32px; margin-top: 20px;">${
                        percentage == 100 ? 'Outstanding! You are a programming master! 🏆' :
                        percentage >= 80 ? 'Excellent work! Keep it up! 🌟' :
                        percentage >= 60 ? 'Good job! Keep learning! 📚' :
                        'Keep practicing! You will get better! 💪'
                    }</p>
                </div>
            `;
            
            if (isPerfect) {
                SoundSystem.playSuccess();
                SoundSystem.playPowerUp();
                const rect = container.getBoundingClientRect();
                VisualEffects.createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
            } else if (percentage >= 80) {
                SoundSystem.playSuccess();
            }
            return;
        }
        
        const q = questions[currentQ];
        document.getElementById('prog-question-num').textContent = `${currentQ + 1}/${questions.length}`;
        
        let html = `<div class="question" style="animation: fadeIn 0.3s;">${q.question}</div><div class="answer-options">`;
        q.answers.forEach((answer, i) => {
            html += `<div class="answer-option" onclick="checkProgrammingAnswer(${i})" style="animation: slideIn 0.3s ease-out ${i * 0.1}s both;">${answer}</div>`;
        });
        html += `</div>`;
        document.getElementById('prog-quiz').innerHTML = html;
    }
    
    window.checkProgrammingAnswer = function(selected) {
        const q = questions[currentQ];
        const options = document.querySelectorAll('.answer-option');
        
        // Disable all options
        options.forEach(opt => opt.onclick = null);
        
        options[selected].classList.add(selected === q.correct ? 'correct' : 'incorrect');
        options[q.correct].classList.add('correct');
        
        if (selected === q.correct) {
            score++;
            document.getElementById('prog-score').textContent = score;
            SoundSystem.playSuccess();
            VisualEffects.pulseElement(options[selected]);
        } else {
            SoundSystem.playFailure();
            VisualEffects.shakeElement(options[selected]);
        }
        
        setTimeout(() => {
            currentQ++;
            showQuestion();
        }, 1500);
    };
    
    showQuestion();
}

// 9. Advanced Tic Tac Toe
function initTicTacToe() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Advanced Tic Tac Toe</h2>
        <div class="settings-panel">
            <h4>Settings</h4>
            <div class="setting-item">
                <span class="setting-label">AI Difficulty:</span>
                <select id="ttt-difficulty">
                    <option value="easy">Easy</option>
                    <option value="medium" selected>Medium</option>
                    <option value="hard">Hard (Unbeatable)</option>
                </select>
            </div>
        </div>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Wins:</span>
                <span class="stat-value" id="ttt-wins">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Losses:</span>
                <span class="stat-value" id="ttt-losses">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Draws:</span>
                <span class="stat-value" id="ttt-draws">0</span>
            </div>
        </div>
        <div id="ttt-grid" class="grid-container"></div>
        <div id="ttt-message" style="text-align: center; color: var(--text-accent); font-size: 28px; margin-top: 20px;">
            Click any cell to start new game
        </div>
    `;
    
    startTicTacToe();
}

function startTicTacToe() {
    const grid = document.getElementById('ttt-grid');
    const difficulty = document.getElementById('ttt-difficulty').value;
    let board = Array(9).fill('');
    let playerTurn = true;
    
    grid.style.gridTemplateColumns = 'repeat(3, 120px)';
    grid.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.style.width = '120px';
        cell.style.height = '120px';
        cell.style.fontSize = '48px';
        cell.dataset.index = i;
        cell.onclick = () => makeMove(i);
        grid.appendChild(cell);
    }
    
    function makeMove(index) {
        if (!playerTurn || board[index] !== '') return;
        
        board[index] = 'X';
        grid.children[index].textContent = 'X';
        
        if (checkWinner('X')) {
            endGame('You win!');
            updateStats('wins');
            return;
        }
        
        if (board.every(cell => cell !== '')) {
            endGame('Draw!');
            updateStats('draws');
            return;
        }
        
        playerTurn = false;
        setTimeout(aiMove, 500);
    }
    
    function aiMove() {
        let move;
        if (difficulty === 'easy') {
            const empty = board.map((v, i) => v === '' ? i : -1).filter(i => i !== -1);
            move = empty[Math.floor(Math.random() * empty.length)];
        } else if (difficulty === 'medium') {
            move = Math.random() < 0.5 ? findBestMove() : findRandomMove();
        } else {
            move = findBestMove();
        }
        
        board[move] = 'O';
        grid.children[move].textContent = 'O';
        
        if (checkWinner('O')) {
            endGame('AI wins!');
            updateStats('losses');
            return;
        }
        
        if (board.every(cell => cell !== '')) {
            endGame('Draw!');
            updateStats('draws');
            return;
        }
        
        playerTurn = true;
    }
    
    function findRandomMove() {
        const empty = board.map((v, i) => v === '' ? i : -1).filter(i => i !== -1);
        return empty[Math.floor(Math.random() * empty.length)];
    }
    
    function findBestMove() {
        // Try to win
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                if (checkWinner('O')) {
                    board[i] = '';
                    return i;
                }
                board[i] = '';
            }
        }
        
        // Block player
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                if (checkWinner('X')) {
                    board[i] = '';
                    return i;
                }
                board[i] = '';
            }
        }
        
        // Take center
        if (board[4] === '') return 4;
        
        // Take corner
        const corners = [0, 2, 6, 8];
        const emptyCorners = corners.filter(i => board[i] === '');
        if (emptyCorners.length > 0) return emptyCorners[0];
        
        // Take any
        return findRandomMove();
    }
    
    function checkWinner(player) {
        const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        return wins.some(combo => combo.every(i => board[i] === player));
    }
    
    function endGame(message) {
        document.getElementById('ttt-message').textContent = message;
        for (let cell of grid.children) cell.onclick = null;
    }
    
    function updateStats(type) {
        const current = parseInt(document.getElementById(`ttt-${type}`).textContent);
        document.getElementById(`ttt-${type}`).textContent = current + 1;
    }
}

// 10. Pattern Recognition
function initPattern() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Pattern Recognition</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value" id="pattern-level">1</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="pattern-score">0</span>
            </div>
        </div>
        <div id="pattern-display" class="test-area" style="font-size: 48px;"></div>
        <div class="answer-options" id="pattern-options"></div>
    `;
    
    startPattern();
}

function startPattern() {
    let level = 1;
    let score = 0;
    
    function generatePattern() {
        const types = ['number', 'letter', 'shape'];
        const type = types[Math.floor(Math.random() * types.length)];
        let sequence, answer, options;
        
        if (type === 'number') {
            const start = Math.floor(Math.random() * 10);
            const step = Math.floor(Math.random() * 5) + 1;
            sequence = [start, start + step, start + 2*step, start + 3*step];
            answer = start + 4*step;
            options = [answer, answer + step, answer - step, answer + 2*step];
        } else if (type === 'letter') {
            const start = 65 + Math.floor(Math.random() * 20);
            const step = Math.floor(Math.random() * 3) + 1;
            sequence = [start, start + step, start + 2*step, start + 3*step].map(c => String.fromCharCode(c));
            answer = String.fromCharCode(start + 4*step);
            options = [answer, String.fromCharCode(start + 5*step), String.fromCharCode(start + 3*step), String.fromCharCode(start + 6*step)];
        } else {
            const shapes = ['●', '■', '▲', '◆', '★'];
            const pattern = [0, 1, 0, 1];
            sequence = pattern.map(i => shapes[i]);
            answer = shapes[0];
            options = [shapes[0], shapes[1], shapes[2], shapes[3]];
        }
        
        document.getElementById('pattern-display').textContent = sequence.join(' , ') + ' , ?';
        
        // Shuffle options
        options.sort(() => Math.random() - 0.5);
        
        const optionsHtml = options.map(opt => 
            `<div class="answer-option" onclick="checkPattern('${opt}', '${answer}')">${opt}</div>`
        ).join('');
        document.getElementById('pattern-options').innerHTML = optionsHtml;
    }
    
    window.checkPattern = function(selected, correct) {
        if (selected === correct) {
            score += level * 10;
            level++;
            document.getElementById('pattern-level').textContent = level;
            document.getElementById('pattern-score').textContent = score;
            setTimeout(generatePattern, 1000);
        } else {
            document.getElementById('pattern-options').innerHTML = `
                <div class="results">
                    <h3>Game Over!</h3>
                    <div class="score">Final Score: ${score}</div>
                    <div>Level Reached: ${level}</div>
                </div>
            `;
        }
    };
    
    generatePattern();
}

// 11. Number Memory
function initNumberMemory() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Number Memory</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value" id="num-level">1</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Digits:</span>
                <span class="stat-value" id="num-digits">1</span>
            </div>
        </div>
        <div id="num-display" class="test-area" style="font-size: 72px;"></div>
        <div style="text-align: center;">
            <input type="number" id="num-input" placeholder="Enter the number" style="width: 300px; font-size: 32px; text-align: center; display: none;">
        </div>
        <button id="num-submit" onclick="submitNumber()" style="display: none;">SUBMIT</button>
        <div style="text-align: center; color: var(--text-accent); font-size: 24px; margin-top: 20px;">
            Click anywhere to start
        </div>
    `;
    
    let started = false;
    const startHandler = () => {
        if (!started) {
            started = true;
            document.removeEventListener('click', startHandler);
            startNumberMemory();
        }
    };
    document.addEventListener('click', startHandler);
}

function startNumberMemory() {
    let level = 1;
    
    function showNumber() {
        const digits = level;
        let number = '';
        for (let i = 0; i < digits; i++) {
            number += Math.floor(Math.random() * 10);
        }
        
        document.getElementById('num-level').textContent = level;
        document.getElementById('num-digits').textContent = digits;
        document.getElementById('num-display').textContent = number;
        document.getElementById('num-input').style.display = 'none';
        document.getElementById('num-submit').style.display = 'none';
        
        setTimeout(() => {
            document.getElementById('num-display').textContent = '';
            document.getElementById('num-input').style.display = 'block';
            document.getElementById('num-submit').style.display = 'inline-block';
            document.getElementById('num-input').value = '';
            document.getElementById('num-input').focus();
            
            window.submitNumber = function() {
                const userInput = document.getElementById('num-input').value;
                if (userInput === number) {
                    level++;
                    setTimeout(showNumber, 500);
                } else {
                    document.getElementById('num-display').textContent = `Game Over! Reached level ${level}`;
                    document.getElementById('num-input').style.display = 'none';
                    document.getElementById('num-submit').style.display = 'none';
                }
            };
        }, 2000 + level * 500);
    }
    
    showNumber();
}

// 12. Visual Memory
function initVisualMemory() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Visual Memory</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value" id="vis-level">1</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Lives:</span>
                <span class="stat-value" id="vis-lives">3</span>
            </div>
        </div>
        <div id="vis-grid" class="grid-container"></div>
        <div style="text-align: center; color: var(--text-accent); font-size: 24px; margin-top: 20px;">
            Click anywhere to start
        </div>
    `;
    
    let started = false;
    const startHandler = () => {
        if (!started) {
            started = true;
            document.removeEventListener('click', startHandler);
            startVisualMemory();
        }
    };
    document.addEventListener('click', startHandler);
}

function startVisualMemory() {
    const grid = document.getElementById('vis-grid');
    let level = 1;
    let lives = 3;
    let targetCells = [];
    
    function startLevel() {
        const size = Math.min(3 + Math.floor(level / 3), 7);
        const numTargets = Math.min(2 + level, size * size / 2);
        
        grid.style.gridTemplateColumns = `repeat(${size}, 60px)`;
        grid.innerHTML = '';
        
        targetCells = [];
        while (targetCells.length < numTargets) {
            const cell = Math.floor(Math.random() * size * size);
            if (!targetCells.includes(cell)) targetCells.push(cell);
        }
        
        for (let i = 0; i < size * size; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.style.width = '60px';
            cell.style.height = '60px';
            cell.dataset.index = i;
            if (targetCells.includes(i)) cell.classList.add('shown');
            grid.appendChild(cell);
        }
        
        setTimeout(() => {
            for (let cell of grid.children) {
                cell.classList.remove('shown');
                cell.onclick = () => checkCell(cell);
            }
        }, 2000);
    }
    
    function checkCell(cell) {
        const index = parseInt(cell.dataset.index);
        cell.onclick = null;
        
        if (targetCells.includes(index)) {
            cell.classList.add('active');
            targetCells = targetCells.filter(i => i !== index);
            
            if (targetCells.length === 0) {
                level++;
                document.getElementById('vis-level').textContent = level;
                setTimeout(startLevel, 1000);
            }
        } else {
            cell.style.backgroundColor = '#7c2d2d';
            lives--;
            document.getElementById('vis-lives').textContent = lives;
            
            if (lives === 0) {
                for (let c of grid.children) c.onclick = null;
                setTimeout(() => {
                    grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: #ffa07a; font-size: 32px;">Game Over! Level: ${level}</div>`;
                }, 1000);
            }
        }
    }
    
    startLevel();
}

// 13. Sequence Memory
function initSequenceMemory() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Sequence Memory</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value" id="seq-level">1</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="seq-score">0</span>
            </div>
        </div>
        <div id="seq-grid" class="grid-container"></div>
        <div style="text-align: center; color: var(--text-accent); font-size: 24px; margin-top: 20px;">
            Click anywhere to start
        </div>
    `;
    
    let started = false;
    const startHandler = () => {
        if (!started) {
            started = true;
            document.removeEventListener('click', startHandler);
            startSequenceMemory();
        }
    };
    document.addEventListener('click', startHandler);
}

function startSequenceMemory() {
    const grid = document.getElementById('seq-grid');
    const size = 3;
    let level = 1;
    let score = 0;
    let sequence = [];
    let playerSequence = [];
    
    grid.style.gridTemplateColumns = `repeat(${size}, 100px)`;
    grid.innerHTML = '';
    
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.style.width = '100px';
        cell.style.height = '100px';
        cell.dataset.index = i;
        grid.appendChild(cell);
    }
    
    function playSequence() {
        playerSequence = [];
        const cells = grid.children;
        for (let cell of cells) cell.onclick = null;
        
        sequence.push(Math.floor(Math.random() * (size * size)));
        
        let i = 0;
        const interval = setInterval(() => {
            if (i > 0) cells[sequence[i-1]].classList.remove('shown');
            if (i < sequence.length) {
                cells[sequence[i]].classList.add('shown');
                i++;
            } else {
                clearInterval(interval);
                cells[sequence[sequence.length-1]].classList.remove('shown');
                enableInput();
            }
        }, 600);
    }
    
    function enableInput() {
        const cells = grid.children;
        for (let cell of cells) {
            cell.onclick = function() {
                const index = parseInt(this.dataset.index);
                playerSequence.push(index);
                this.classList.add('active');
                setTimeout(() => this.classList.remove('active'), 200);
                
                const step = playerSequence.length - 1;
                if (playerSequence[step] !== sequence[step]) {
                    for (let c of cells) c.onclick = null;
                    grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: #ffa07a; font-size: 32px;">Game Over!<br>Final Score: ${score}</div>`;
                    return;
                }
                
                if (playerSequence.length === sequence.length) {
                    score += level * 10;
                    level++;
                    document.getElementById('seq-level').textContent = level;
                    document.getElementById('seq-score').textContent = score;
                    setTimeout(playSequence, 1000);
                }
            };
        }
    }
    
    playSequence();
}

// 14. Aim Trainer
function initAimTrainer() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Aim Trainer</h2>
        <div class="settings-panel">
            <h4>Settings</h4>
            <div class="setting-item">
                <span class="setting-label">Target Size:</span>
                <select id="aim-size">
                    <option value="30">Small</option>
                    <option value="50" selected>Medium</option>
                    <option value="70">Large</option>
                </select>
            </div>
            <div class="setting-item">
                <span class="setting-label">Number of Targets:</span>
                <select id="aim-count">
                    <option value="10">10</option>
                    <option value="20" selected>20</option>
                    <option value="30">30</option>
                </select>
            </div>
        </div>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Average Time:</span>
                <span class="stat-value" id="aim-avg">0ms</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Progress:</span>
                <span class="stat-value" id="aim-progress">0/0</span>
            </div>
        </div>
        <div class="click-area" id="aim-area">Click anywhere to start</div>
    `;
    
    const area = document.getElementById('aim-area');
    let started = false;
    
    area.onclick = () => {
        if (!started) {
            started = true;
            area.onclick = null;
            startAimTrainer();
        }
    };
}

function startAimTrainer() {
    const size = parseInt(document.getElementById('aim-size').value);
    const count = parseInt(document.getElementById('aim-count').value);
    const area = document.getElementById('aim-area');
    let current = 0;
    let times = [];
    let appearTime;
    
    area.innerHTML = '';
    
    function showTarget() {
        if (current >= count) {
            const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
            area.innerHTML = `Test Complete!<br>Average Time: ${avgTime.toFixed(0)}ms`;
            return;
        }
        
        area.innerHTML = '';
        const target = document.createElement('div');
        target.className = 'circle-target';
        target.style.width = size + 'px';
        target.style.height = size + 'px';
        target.style.left = Math.random() * (area.clientWidth - size) + 'px';
        target.style.top = Math.random() * (area.clientHeight - size) + 'px';
        area.appendChild(target);
        appearTime = Date.now();
        
        target.onclick = () => {
            const time = Date.now() - appearTime;
            times.push(time);
            current++;
            const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
            document.getElementById('aim-avg').textContent = avgTime.toFixed(0) + 'ms';
            document.getElementById('aim-progress').textContent = `${current}/${count}`;
            showTarget();
        };
    }
    
    document.getElementById('aim-progress').textContent = `0/${count}`;
    showTarget();
}

// 15. Chimp Test
function initChimpTest() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Chimp Test</h2>
        <p style="text-align: center; color: #dda15e; font-size: 24px; margin-bottom: 20px;">
            Click the numbers in order from lowest to highest
        </p>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value" id="chimp-level">1</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Numbers:</span>
                <span class="stat-value" id="chimp-count">4</span>
            </div>
        </div>
        <div class="click-area" id="chimp-area" style="height: 500px;">Click anywhere to start</div>
    `;
    
    const area = document.getElementById('chimp-area');
    let started = false;
    
    area.onclick = () => {
        if (!started) {
            started = true;
            area.onclick = null;
            startChimpTest();
        }
    };
}

function startChimpTest() {
    const area = document.getElementById('chimp-area');
    let level = 1;
    let count = 4;
    
    function startRound() {
        area.innerHTML = '';
        const numbers = [];
        const positions = [];
        
        // Generate unique positions
        while (positions.length < count) {
            const x = Math.random() * (area.clientWidth - 80);
            const y = Math.random() * (area.clientHeight - 80);
            const tooClose = positions.some(pos => 
                Math.abs(pos.x - x) < 100 && Math.abs(pos.y - y) < 100
            );
            if (!tooClose) positions.push({ x, y });
        }
        
        // Create number boxes
        for (let i = 0; i < count; i++) {
            const box = document.createElement('div');
            box.className = 'grid-cell';
            box.style.position = 'absolute';
            box.style.width = '60px';
            box.style.height = '60px';
            box.style.left = positions[i].x + 'px';
            box.style.top = positions[i].y + 'px';
            box.style.fontSize = '32px';
            box.textContent = i + 1;
            box.dataset.number = i + 1;
            area.appendChild(box);
            numbers.push(box);
        }
        
        let expected = 1;
        let firstClick = true;
        
        numbers.forEach(box => {
            box.onclick = () => {
                const num = parseInt(box.dataset.number);
                
                if (num === expected) {
                    box.style.backgroundColor = '#4a7c2e';
                    box.textContent = '';
                    
                    if (firstClick) {
                        // Hide all other numbers after first click
                        numbers.forEach(b => {
                            if (b !== box) b.textContent = '';
                        });
                        firstClick = false;
                    }
                    
                    expected++;
                    
                    if (expected > count) {
                        // Success
                        level++;
                        count = Math.min(count + 1, 10);
                        document.getElementById('chimp-level').textContent = level;
                        document.getElementById('chimp-count').textContent = count;
                        setTimeout(startRound, 1000);
                    }
                } else {
                    // Failed
                    numbers.forEach(b => b.onclick = null);
                    area.innerHTML = `<div style="text-align: center; padding-top: 200px; color: #ffa07a; font-size: 48px;">
                        Game Over!<br>Level: ${level}<br>Numbers: ${count}
                    </div>`;
                }
            };
        });
    }
    
    document.getElementById('chimp-level').textContent = level;
    document.getElementById('chimp-count').textContent = count;
    startRound();
}

// 16. Word Scramble
function initWordScramble() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Word Scramble</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="scramble-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Time:</span>
                <span class="stat-value" id="scramble-time">30</span>
            </div>
        </div>
        <div id="scramble-word" class="test-area" style="font-size: 64px;"></div>
        <div style="text-align: center; margin: 20px 0;">
            <input type="text" id="scramble-input" placeholder="Type the unscrambled word" style="width: 400px; font-size: 32px; text-align: center;">
        </div>
    `;
    
    const words = ['javascript', 'programming', 'computer', 'keyboard', 'algorithm', 'function', 'variable', 'database', 'network', 'software', 'hardware', 'browser', 'server', 'client', 'development'];
    let score = 0;
    let timeLeft = 30;
    let currentWord = '';
    let scrambled = '';
    
    function scrambleWord(word) {
        const arr = word.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    }
    
    function newWord() {
        currentWord = words[Math.floor(Math.random() * words.length)];
        scrambled = scrambleWord(currentWord);
        while (scrambled === currentWord) {
            scrambled = scrambleWord(currentWord);
        }
        document.getElementById('scramble-word').textContent = scrambled.toUpperCase();
        document.getElementById('scramble-input').value = '';
        document.getElementById('scramble-input').focus();
    }
    
    const input = document.getElementById('scramble-input');
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (input.value.toLowerCase() === currentWord) {
                score++;
                document.getElementById('scramble-score').textContent = score;
                newWord();
            } else {
                input.style.borderColor = 'red';
                setTimeout(() => { input.style.borderColor = ''; }, 500);
            }
        }
    });
    
    const timer = setInterval(() => {
        timeLeft--;
        document.getElementById('scramble-time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            input.disabled = true;
            document.getElementById('scramble-word').textContent = `Game Over! Score: ${score}`;
        }
    }, 1000);
    
    newWord();
}

// 17. Color Match
function initColorMatch() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Color Match</h2>
        <p style="text-align: center; color: var(--text-secondary); font-size: 24px;">
            Click YES if the text matches the color, NO if it doesn't
        </p>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="color-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Round:</span>
                <span class="stat-value" id="color-round">0/20</span>
            </div>
        </div>
        <div id="color-display" class="test-area" style="font-size: 72px; font-weight: bold;"></div>
        <div style="text-align: center;">
            <button id="color-yes" style="font-size: 32px; padding: 20px 40px; margin: 10px;">YES</button>
            <button id="color-no" style="font-size: 32px; padding: 20px 40px; margin: 10px;">NO</button>
        </div>
    `;
    
    const colors = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'ORANGE', 'PURPLE', 'PINK'];
    const colorCodes = {
        'RED': '#ff0000',
        'BLUE': '#0000ff',
        'GREEN': '#00ff00',
        'YELLOW': '#ffff00',
        'ORANGE': '#ffa500',
        'PURPLE': '#800080',
        'PINK': '#ffc0cb'
    };
    let score = 0;
    let round = 0;
    let isMatch = false;
    
    function newRound() {
        if (round >= 20) {
            document.getElementById('color-display').textContent = `Game Complete! Score: ${score}/20`;
            document.getElementById('color-yes').disabled = true;
            document.getElementById('color-no').disabled = true;
            return;
        }
        
        round++;
        document.getElementById('color-round').textContent = `${round}/20`;
        
        const wordColor = colors[Math.floor(Math.random() * colors.length)];
        const displayColor = colors[Math.floor(Math.random() * colors.length)];
        isMatch = wordColor === displayColor;
        
        const display = document.getElementById('color-display');
        display.textContent = wordColor;
        display.style.color = colorCodes[displayColor];
    }
    
    document.getElementById('color-yes').onclick = () => {
        if (isMatch) score++;
        document.getElementById('color-score').textContent = score;
        newRound();
    };
    
    document.getElementById('color-no').onclick = () => {
        if (!isMatch) score++;
        document.getElementById('color-score').textContent = score;
        newRound();
    };
    
    newRound();
}

// 18. Typing Accuracy
function initTypingAccuracy() {
    const container = document.getElementById('game-container');
    const sampleText = "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!";
    
    container.innerHTML = `
        <h2 class="game-title">Typing Accuracy Test</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Accuracy:</span>
                <span class="stat-value" id="acc-accuracy">100%</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Errors:</span>
                <span class="stat-value" id="acc-errors">0</span>
            </div>
        </div>
        <div class="test-area">
            <div id="acc-sample" style="font-size: 24px; color: var(--text-secondary); margin-bottom: 20px;">${sampleText}</div>
            <textarea id="acc-input" class="code-editor" placeholder="Start typing here..." style="min-height: 150px;"></textarea>
        </div>
    `;
    
    const input = document.getElementById('acc-input');
    input.addEventListener('input', () => {
        const typed = input.value;
        let errors = 0;
        
        for (let i = 0; i < typed.length; i++) {
            if (typed[i] !== sampleText[i]) {
                errors++;
            }
        }
        
        const accuracy = typed.length > 0 ? Math.round(((typed.length - errors) / typed.length) * 100) : 100;
        document.getElementById('acc-accuracy').textContent = accuracy + '%';
        document.getElementById('acc-errors').textContent = errors;
        
        if (typed === sampleText) {
            input.disabled = true;
            input.value = `Perfect! 100% accuracy with ${sampleText.length} characters!`;
        }
    });
    
    input.focus();
}

// 19. Reflex Test
function initReflexTest() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Reflex Test</h2>
        <p style="text-align: center; color: var(--text-secondary); font-size: 24px;">
            Press SPACEBAR when the screen turns GREEN
        </p>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Average Time:</span>
                <span class="stat-value" id="reflex-avg">0ms</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Round:</span>
                <span class="stat-value" id="reflex-round">0/5</span>
            </div>
        </div>
        <div id="reflex-area" class="click-area" style="background-color: var(--error-bg); font-size: 48px;">
            Press SPACEBAR when ready
        </div>
    `;
    
    const area = document.getElementById('reflex-area');
    let round = 0;
    let times = [];
    let startTime;
    let waiting = false;
    let ready = true;
    
    function startRound() {
        if (round >= 5) {
            const avg = times.reduce((a, b) => a + b, 0) / times.length;
            area.textContent = `Complete! Average: ${avg.toFixed(0)}ms`;
            area.style.backgroundColor = 'var(--bg-secondary)';
            return;
        }
        
        area.style.backgroundColor = 'var(--error-bg)';
        area.textContent = 'Wait...';
        waiting = true;
        ready = false;
        
        setTimeout(() => {
            area.style.backgroundColor = 'var(--success-bg)';
            area.textContent = 'GO!';
            startTime = Date.now();
            waiting = false;
            ready = true;
        }, 2000 + Math.random() * 3000);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && currentGame === 'reflex-test') {
            e.preventDefault();
            if (waiting) {
                area.textContent = 'Too early! Wait for GREEN';
                setTimeout(() => {
                    if (round < 5) startRound();
                }, 2000);
            } else if (ready) {
                const reactionTime = Date.now() - startTime;
                times.push(reactionTime);
                round++;
                document.getElementById('reflex-round').textContent = `${round}/5`;
                const avg = times.reduce((a, b) => a + b, 0) / times.length;
                document.getElementById('reflex-avg').textContent = avg.toFixed(0) + 'ms';
                ready = false;
                setTimeout(() => startRound(), 1000);
            }
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && round === 0 && !waiting && !ready) {
            e.preventDefault();
            startRound();
        }
    });
}

// 20. Stroop Test
function initStroopTest() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Stroop Test</h2>
        <p style="text-align: center; color: var(--text-secondary); font-size: 24px;">
            Select the COLOR of the text, not the word itself
        </p>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="stroop-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Round:</span>
                <span class="stat-value" id="stroop-round">0/15</span>
            </div>
        </div>
        <div id="stroop-word" class="test-area" style="font-size: 80px; font-weight: bold;"></div>
        <div class="answer-options" id="stroop-options"></div>
    `;
    
    const colors = ['RED', 'BLUE', 'GREEN', 'YELLOW'];
    const colorCodes = { 'RED': '#ff0000', 'BLUE': '#0000ff', 'GREEN': '#00ff00', 'YELLOW': '#ffff00' };
    let score = 0;
    let round = 0;
    let correctColor;
    
    function newRound() {
        if (round >= 15) {
            document.getElementById('stroop-word').textContent = `Complete! Score: ${score}/15`;
            document.getElementById('stroop-options').innerHTML = '';
            return;
        }
        
        round++;
        document.getElementById('stroop-round').textContent = `${round}/15`;
        
        const wordText = colors[Math.floor(Math.random() * colors.length)];
        correctColor = colors[Math.floor(Math.random() * colors.length)];
        
        const wordEl = document.getElementById('stroop-word');
        wordEl.textContent = wordText;
        wordEl.style.color = colorCodes[correctColor];
        
        const options = colors.map(color => 
            `<div class="answer-option" onclick="checkStroopAnswer('${color}')">${color}</div>`
        ).join('');
        document.getElementById('stroop-options').innerHTML = options;
    }
    
    window.checkStroopAnswer = function(selected) {
        if (selected === correctColor) {
            score++;
            document.getElementById('stroop-score').textContent = score;
        }
        setTimeout(newRound, 500);
    };
    
    newRound();
}

// 21. Verbal Memory
function initVerbalMemory() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Verbal Memory</h2>
        <p style="text-align: center; color: var(--text-secondary); font-size: 24px;">
            Click SEEN if you've seen the word before, NEW if it's new
        </p>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="verbal-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Lives:</span>
                <span class="stat-value" id="verbal-lives">3</span>
            </div>
        </div>
        <div id="verbal-word" class="test-area" style="font-size: 64px;"></div>
        <div style="text-align: center;">
            <button id="verbal-seen" style="font-size: 32px; padding: 20px 40px; margin: 10px;">SEEN</button>
            <button id="verbal-new" style="font-size: 32px; padding: 20px 40px; margin: 10px;">NEW</button>
        </div>
    `;
    
    const wordList = ['apple', 'banana', 'car', 'dog', 'elephant', 'flower', 'guitar', 'house', 'island', 'jacket', 'kite', 'lamp', 'mountain', 'notebook', 'ocean', 'piano', 'queen', 'river', 'sun', 'tree', 'umbrella', 'violin', 'window', 'xylophone', 'yacht', 'zebra'];
    let seenWords = [];
    let score = 0;
    let lives = 3;
    let currentWord = '';
    let isSeen = false;
    
    function newWord() {
        if (lives <= 0) {
            document.getElementById('verbal-word').textContent = `Game Over! Score: ${score}`;
            document.getElementById('verbal-seen').disabled = true;
            document.getElementById('verbal-new').disabled = true;
            return;
        }
        
        if (Math.random() < 0.3 && seenWords.length > 0) {
            currentWord = seenWords[Math.floor(Math.random() * seenWords.length)];
            isSeen = true;
        } else {
            const availableWords = wordList.filter(w => !seenWords.includes(w));
            if (availableWords.length === 0) {
                document.getElementById('verbal-word').textContent = `Complete! Score: ${score}`;
                document.getElementById('verbal-seen').disabled = true;
                document.getElementById('verbal-new').disabled = true;
                return;
            }
            currentWord = availableWords[Math.floor(Math.random() * availableWords.length)];
            seenWords.push(currentWord);
            isSeen = false;
        }
        
        document.getElementById('verbal-word').textContent = currentWord;
    }
    
    document.getElementById('verbal-seen').onclick = () => {
        if (isSeen) {
            score++;
            document.getElementById('verbal-score').textContent = score;
        } else {
            lives--;
            document.getElementById('verbal-lives').textContent = lives;
        }
        newWord();
    };
    
    document.getElementById('verbal-new').onclick = () => {
        if (!isSeen) {
            score++;
            document.getElementById('verbal-score').textContent = score;
        } else {
            lives--;
            document.getElementById('verbal-lives').textContent = lives;
        }
        newWord();
    };
    
    newWord();
}

// 22. Number Sequence
function initNumberSequence() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Number Sequence</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value" id="numseq-level">1</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="numseq-score">0</span>
            </div>
        </div>
        <div id="numseq-display" class="test-area" style="font-size: 48px;"></div>
        <div style="text-align: center; margin: 20px 0;">
            <input type="number" id="numseq-input" placeholder="Next number" style="width: 200px; font-size: 32px; text-align: center;">
        </div>
    `;
    
    let level = 1;
    let score = 0;
    
    function generateSequence() {
        const type = Math.floor(Math.random() * 3);
        let sequence, answer;
        
        if (type === 0) {
            // Arithmetic
            const start = Math.floor(Math.random() * 10) + 1;
            const diff = Math.floor(Math.random() * 5) + 1;
            sequence = [start, start + diff, start + 2*diff, start + 3*diff];
            answer = start + 4*diff;
        } else if (type === 1) {
            // Geometric
            const start = Math.floor(Math.random() * 3) + 2;
            const ratio = Math.floor(Math.random() * 2) + 2;
            sequence = [start, start * ratio, start * ratio * ratio, start * ratio * ratio * ratio];
            answer = start * Math.pow(ratio, 4);
        } else {
            // Fibonacci-like
            const a = Math.floor(Math.random() * 5) + 1;
            const b = Math.floor(Math.random() * 5) + 1;
            sequence = [a, b, a+b, a+2*b];
            answer = 2*a + 3*b;
        }
        
        document.getElementById('numseq-display').textContent = sequence.join(', ') + ', ?';
        document.getElementById('numseq-input').value = '';
        document.getElementById('numseq-input').focus();
        
        return answer;
    }
    
    let currentAnswer = generateSequence();
    
    document.getElementById('numseq-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const userAnswer = parseInt(document.getElementById('numseq-input').value);
            if (userAnswer === currentAnswer) {
                score += level * 10;
                level++;
                document.getElementById('numseq-level').textContent = level;
                document.getElementById('numseq-score').textContent = score;
                currentAnswer = generateSequence();
            } else {
                document.getElementById('numseq-display').textContent = `Game Over! Score: ${score}`;
                document.getElementById('numseq-input').disabled = true;
            }
        }
    });
}

// 23. Typing Rhythm
function initTypingRhythm() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Typing Rhythm</h2>
        <p style="text-align: center; color: var(--text-secondary); font-size: 24px;">
            Type characters at a steady pace - keep the bar in the green zone!
        </p>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="rhythm-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Consistency:</span>
                <span class="stat-value" id="rhythm-consistency">0%</span>
            </div>
        </div>
        <div class="progress-bar">
            <div id="rhythm-fill" class="progress-fill" style="width: 0%;"></div>
        </div>
        <div style="text-align: center; margin: 20px 0;">
            <textarea id="rhythm-input" class="code-editor" placeholder="Start typing anything at a steady pace..." style="min-height: 150px;"></textarea>
        </div>
    `;
    
    const input = document.getElementById('rhythm-input');
    let lastKeyTime = 0;
    let intervals = [];
    let score = 0;
    
    input.addEventListener('keydown', () => {
        const now = Date.now();
        if (lastKeyTime > 0) {
            const interval = now - lastKeyTime;
            intervals.push(interval);
            
            if (intervals.length > 20) intervals.shift();
            
            if (intervals.length > 5) {
                const avg = intervals.reduce((a, b) => a + b) / intervals.length;
                const variance = intervals.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / intervals.length;
                const stdDev = Math.sqrt(variance);
                const consistency = Math.max(0, 100 - (stdDev / avg) * 100);
                
                document.getElementById('rhythm-consistency').textContent = consistency.toFixed(0) + '%';
                document.getElementById('rhythm-fill').style.width = consistency + '%';
                
                if (consistency > 70) {
                    score++;
                    document.getElementById('rhythm-score').textContent = score;
                }
            }
        }
        lastKeyTime = now;
    });
    
    input.focus();
}

// 24. Multi-Task Test
function initMultiTask() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Multi-Task Test</h2>
        <p style="text-align: center; color: var(--text-secondary); font-size: 24px;">
            Click the targets AND type the shown text simultaneously!
        </p>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Clicks:</span>
                <span class="stat-value" id="multi-clicks">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Typed:</span>
                <span class="stat-value" id="multi-typed">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Time:</span>
                <span class="stat-value" id="multi-time">30</span>
            </div>
        </div>
        <div class="click-area" id="multi-area" style="height: 300px;"></div>
        <div style="text-align: center; margin: 20px 0;">
            <div id="multi-text" style="font-size: 28px; color: var(--text-secondary); margin-bottom: 10px;">The quick brown fox jumps</div>
            <input type="text" id="multi-input" placeholder="Type here..." style="width: 400px; font-size: 24px; text-align: center;">
        </div>
    `;
    
    const area = document.getElementById('multi-area');
    const input = document.getElementById('multi-input');
    const targetText = "The quick brown fox jumps";
    let clicks = 0;
    let timeLeft = 30;
    let targetCount = 0;
    
    function spawnTarget() {
        if (timeLeft <= 0) return;
        
        const target = document.createElement('div');
        target.className = 'circle-target';
        target.style.width = '60px';
        target.style.height = '60px';
        target.style.left = Math.random() * (area.clientWidth - 60) + 'px';
        target.style.top = Math.random() * (area.clientHeight - 60) + 'px';
        area.appendChild(target);
        
        target.onclick = () => {
            clicks++;
            document.getElementById('multi-clicks').textContent = clicks;
            target.remove();
            targetCount--;
        };
        
        targetCount++;
        setTimeout(() => {
            if (target.parentNode) {
                target.remove();
                targetCount--;
            }
        }, 3000);
    }
    
    input.addEventListener('input', () => {
        const typed = input.value;
        document.getElementById('multi-typed').textContent = typed.length;
        
        if (typed === targetText) {
            input.value = '';
        }
    });
    
    const spawnInterval = setInterval(() => {
        if (timeLeft > 0 && targetCount < 3) {
            spawnTarget();
        }
    }, 1500);
    
    const timer = setInterval(() => {
        timeLeft--;
        document.getElementById('multi-time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            clearInterval(spawnInterval);
            input.disabled = true;
            area.innerHTML = `<div style="text-align: center; padding-top: 100px; font-size: 32px;">
                Test Complete!<br>Clicks: ${clicks}<br>Characters Typed: ${document.getElementById('multi-typed').textContent}
            </div>`;
        }
    }, 1000);
    
    input.focus();
}

// 25. Countdown Challenge
function initCountdownChallenge() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Countdown Challenge</h2>
        <p style="text-align: center; color: var(--text-secondary); font-size: 24px;">
            Type the countdown as fast as you can!
        </p>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Time:</span>
                <span class="stat-value" id="countdown-time">0.0s</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Current:</span>
                <span class="stat-value" id="countdown-current">100</span>
            </div>
        </div>
        <div class="test-area">
            <div style="font-size: 48px; color: var(--text-accent); margin-bottom: 20px;">
                Type numbers from <span id="countdown-start">100</span> to 0
            </div>
            <input type="number" id="countdown-input" placeholder="Type here" style="width: 200px; font-size: 32px; text-align: center;">
        </div>
    `;
    
    const startNum = 100;
    let current = startNum;
    let startTime;
    const input = document.getElementById('countdown-input');
    
    input.addEventListener('input', () => {
        if (!startTime) {
            startTime = Date.now();
            const timer = setInterval(() => {
                if (current < 0) {
                    clearInterval(timer);
                    return;
                }
                const elapsed = (Date.now() - startTime) / 1000;
                document.getElementById('countdown-time').textContent = elapsed.toFixed(1) + 's';
            }, 100);
        }
        
        const value = parseInt(input.value);
        if (value === current) {
            current--;
            document.getElementById('countdown-current').textContent = current;
            input.value = '';
            
            if (current < 0) {
                const elapsed = (Date.now() - startTime) / 1000;
                input.disabled = true;
                document.querySelector('.test-area div').textContent = `Complete! Time: ${elapsed.toFixed(2)}s`;
            }
        }
    });
    
    input.focus();
}


// 26. Speed Clicker
function initSpeedClicker() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Speed Clicker</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="speed-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Time:</span>
                <span class="stat-value" id="speed-time">15</span>
            </div>
        </div>
        <div class="click-area" id="speed-area" style="height: 500px;">Click to start!</div>
    `;
    
    const area = document.getElementById('speed-area');
    let score = 0;
    let timeLeft = 15;
    let started = false;
    
    area.onclick = () => {
        if (!started) {
            started = true;
            area.textContent = '';
            const timer = setInterval(() => {
                timeLeft--;
                document.getElementById('speed-time').textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    area.innerHTML = `<div style="text-align: center; padding-top: 200px; font-size: 48px;">
                        Game Over!<br>Score: ${score}
                    </div>`;
                    area.onclick = null;
                }
            }, 1000);
            spawnTarget();
        }
    };
    
    function spawnTarget() {
        if (timeLeft <= 0) return;
        
        const target = document.createElement('div');
        target.className = 'circle-target';
        const size = 40 + Math.random() * 40;
        target.style.width = size + 'px';
        target.style.height = size + 'px';
        target.style.left = Math.random() * (area.clientWidth - size) + 'px';
        target.style.top = Math.random() * (area.clientHeight - size) + 'px';
        area.appendChild(target);
        
        target.onclick = (e) => {
            e.stopPropagation();
            score++;
            document.getElementById('speed-score').textContent = score;
            target.remove();
            spawnTarget();
        };
        
        setTimeout(() => {
            if (target.parentNode) target.remove();
        }, 2000);
    }
}

// 27. Letter Memory
function initLetterMemory() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Letter Memory</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value" id="letter-level">1</span>
            </div>
        </div>
        <div id="letter-display" class="test-area" style="font-size: 72px;"></div>
        <div style="text-align: center; margin: 20px 0;">
            <input type="text" id="letter-input" placeholder="Type the letters" style="width: 300px; font-size: 32px; text-align: center; display: none;">
        </div>
        <div style="text-align: center; color: var(--text-accent); font-size: 24px;">
            Click to start
        </div>
    `;
    
    let started = false;
    const startHandler = () => {
        if (!started) {
            started = true;
            document.removeEventListener('click', startHandler);
            startLetterMemory();
        }
    };
    document.addEventListener('click', startHandler);
}

function startLetterMemory() {
    let level = 1;
    
    function showLetters() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let sequence = '';
        for (let i = 0; i < level + 2; i++) {
            sequence += letters[Math.floor(Math.random() * letters.length)];
        }
        
        document.getElementById('letter-level').textContent = level;
        document.getElementById('letter-display').textContent = sequence;
        document.getElementById('letter-input').style.display = 'none';
        
        setTimeout(() => {
            document.getElementById('letter-display').textContent = '';
            document.getElementById('letter-input').style.display = 'block';
            document.getElementById('letter-input').value = '';
            document.getElementById('letter-input').focus();
            
            const checkAnswer = () => {
                const userInput = document.getElementById('letter-input').value.toUpperCase();
                if (userInput.length === sequence.length) {
                    if (userInput === sequence) {
                        level++;
                        setTimeout(showLetters, 500);
                    } else {
                        document.getElementById('letter-display').textContent = `Game Over! Level: ${level}`;
                        document.getElementById('letter-input').style.display = 'none';
                        document.getElementById('letter-input').removeEventListener('input', checkAnswer);
                    }
                }
            };
            document.getElementById('letter-input').addEventListener('input', checkAnswer);
        }, 2000 + level * 300);
    }
    
    showLetters();
}

// 28. Color Sequence
function initColorSequence() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Color Sequence</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value" id="color-seq-level">1</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="color-seq-score">0</span>
            </div>
        </div>
        <div id="color-seq-grid" style="display: grid; grid-template-columns: repeat(2, 150px); gap: 10px; justify-content: center; margin: 40px auto;"></div>
        <div style="text-align: center; color: var(--text-accent); font-size: 24px;">
            Click to start
        </div>
    `;
    
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12'];
    const grid = document.getElementById('color-seq-grid');
    
    colors.forEach((color, i) => {
        const cell = document.createElement('div');
        cell.style.width = '150px';
        cell.style.height = '150px';
        cell.style.backgroundColor = color;
        cell.style.border = '4px solid var(--border-primary)';
        cell.style.cursor = 'pointer';
        cell.dataset.index = i;
        grid.appendChild(cell);
    });
    
    let started = false;
    const startHandler = () => {
        if (!started) {
            started = true;
            document.removeEventListener('click', startHandler);
            startColorSequence();
        }
    };
    document.addEventListener('click', startHandler);
    
    function startColorSequence() {
        let level = 1;
        let score = 0;
        let sequence = [];
        let playerSequence = [];
        
        function playSequence() {
            playerSequence = [];
            const cells = grid.children;
            for (let cell of cells) cell.onclick = null;
            
            sequence.push(Math.floor(Math.random() * 4));
            
            let i = 0;
            const interval = setInterval(() => {
                if (i > 0) cells[sequence[i-1]].style.opacity = '1';
                if (i < sequence.length) {
                    cells[sequence[i]].style.opacity = '0.5';
                    i++;
                } else {
                    clearInterval(interval);
                    cells[sequence[sequence.length-1]].style.opacity = '1';
                    enableInput();
                }
            }, 600);
        }
        
        function enableInput() {
            const cells = grid.children;
            for (let cell of cells) {
                cell.onclick = function() {
                    const index = parseInt(this.dataset.index);
                    playerSequence.push(index);
                    
                    const step = playerSequence.length - 1;
                    if (playerSequence[step] !== sequence[step]) {
                        for (let c of cells) c.onclick = null;
                        grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--text-accent); font-size: 32px;">
                            Game Over!<br>Score: ${score}
                        </div>`;
                        return;
                    }
                    
                    if (playerSequence.length === sequence.length) {
                        score += level * 10;
                        level++;
                        document.getElementById('color-seq-level').textContent = level;
                        document.getElementById('color-seq-score').textContent = score;
                        setTimeout(playSequence, 1000);
                    }
                };
            }
        }
        
        playSequence();
    }
}

// 29. Mental Math Sprint
function initMentalMath() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Mental Math Sprint</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="mental-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Streak:</span>
                <span class="stat-value" id="mental-streak">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Time:</span>
                <span class="stat-value" id="mental-time">45</span>
            </div>
        </div>
        <div id="mental-question" class="test-area" style="font-size: 64px;"></div>
        <div style="text-align: center; margin: 20px 0;">
            <input type="number" id="mental-input" placeholder="Answer" style="width: 200px; font-size: 32px; text-align: center;">
        </div>
    `;
    
    let score = 0;
    let streak = 0;
    let timeLeft = 45;
    let currentAnswer;
    const input = document.getElementById('mental-input');
    
    function generateQuestion() {
        const ops = ['+', '-', '*'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        let a, b;
        
        if (op === '*') {
            a = Math.floor(Math.random() * 12) + 2;
            b = Math.floor(Math.random() * 12) + 2;
            currentAnswer = a * b;
        } else if (op === '+') {
            a = Math.floor(Math.random() * 50) + 10;
            b = Math.floor(Math.random() * 50) + 10;
            currentAnswer = a + b;
        } else {
            a = Math.floor(Math.random() * 100) + 20;
            b = Math.floor(Math.random() * 50) + 10;
            currentAnswer = a - b;
        }
        
        document.getElementById('mental-question').textContent = `${a} ${op} ${b} = ?`;
        input.value = '';
        input.focus();
    }
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const userAnswer = parseInt(input.value);
            if (userAnswer === currentAnswer) {
                score++;
                streak++;
                document.getElementById('mental-score').textContent = score;
                document.getElementById('mental-streak').textContent = streak;
            } else {
                streak = 0;
                document.getElementById('mental-streak').textContent = streak;
            }
            generateQuestion();
        }
    });
    
    const timer = setInterval(() => {
        timeLeft--;
        document.getElementById('mental-time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            input.disabled = true;
            document.getElementById('mental-question').textContent = `Game Over! Score: ${score}`;
        }
    }, 1000);
    
    generateQuestion();
}

// 30. Pixel Perfect
function initPixelPerfect() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Pixel Perfect</h2>
        <p style="text-align: center; color: var(--text-secondary); font-size: 24px;">
            Draw straight lines between the dots!
        </p>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Accuracy:</span>
                <span class="stat-value" id="pixel-accuracy">0%</span>
            </div>
        </div>
        <div style="text-align: center; margin: 20px 0;">
            <canvas id="pixel-canvas" width="600" height="400"></canvas>
        </div>
    `;
    
    const canvas = document.getElementById('pixel-canvas');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let startX, startY, endX, endY;
    
    // Draw dots
    startX = 100;
    startY = 200;
    endX = 500;
    endY = 200;
    
    ctx.fillStyle = 'var(--text-accent)';
    ctx.beginPath();
    ctx.arc(startX, startY, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(endX, endY, 10, 0, 2 * Math.PI);
    ctx.fill();
    
    const points = [];
    
    canvas.onmousedown = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (Math.abs(x - startX) < 15 && Math.abs(y - startY) < 15) {
            drawing = true;
            points.length = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'var(--text-accent)';
            ctx.beginPath();
            ctx.arc(startX, startY, 10, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(endX, endY, 10, 0, 2 * Math.PI);
            ctx.fill();
        }
    };
    
    canvas.onmousemove = (e) => {
        if (!drawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        points.push({ x, y });
        
        if (points.length > 1) {
            ctx.strokeStyle = 'var(--color-blue)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    };
    
    canvas.onmouseup = () => {
        if (!drawing) return;
        drawing = false;
        
        // Calculate deviation from straight line
        let totalDeviation = 0;
        points.forEach(p => {
            const deviation = Math.abs(p.y - startY);
            totalDeviation += deviation;
        });
        
        const avgDeviation = totalDeviation / points.length;
        const accuracy = Math.max(0, 100 - avgDeviation);
        document.getElementById('pixel-accuracy').textContent = accuracy.toFixed(1) + '%';
    };
}

// 31. Sound Memory (Visual representation)
function initSoundMemory() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Sound Memory</h2>
        <p style="text-align: center; color: var(--text-secondary); font-size: 24px;">
            Remember the pattern of beeps!
        </p>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value" id="sound-level">1</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="sound-score">0</span>
            </div>
        </div>
        <div id="sound-grid" style="display: grid; grid-template-columns: repeat(2, 150px); gap: 10px; justify-content: center; margin: 40px auto;"></div>
        <div style="text-align: center; color: var(--text-accent); font-size: 24px;">
            Click to start
        </div>
    `;
    
    const sounds = ['🔴', '🔵', '🟢', '🟡'];
    const grid = document.getElementById('sound-grid');
    
    sounds.forEach((emoji, i) => {
        const cell = document.createElement('div');
        cell.style.width = '150px';
        cell.style.height = '150px';
        cell.style.backgroundColor = 'var(--bg-secondary)';
        cell.style.border = '4px solid var(--border-primary)';
        cell.style.cursor = 'pointer';
        cell.style.fontSize = '64px';
        cell.style.display = 'flex';
        cell.style.alignItems = 'center';
        cell.style.justifyContent = 'center';
        cell.textContent = emoji;
        cell.dataset.index = i;
        grid.appendChild(cell);
    });
    
    let started = false;
    const startHandler = () => {
        if (!started) {
            started = true;
            document.removeEventListener('click', startHandler);
            startSoundMemory();
        }
    };
    document.addEventListener('click', startHandler);
    
    function startSoundMemory() {
        let level = 1;
        let score = 0;
        let sequence = [];
        let playerSequence = [];
        
        function playSequence() {
            playerSequence = [];
            const cells = grid.children;
            for (let cell of cells) cell.onclick = null;
            
            sequence.push(Math.floor(Math.random() * 4));
            
            let i = 0;
            const interval = setInterval(() => {
                if (i > 0) cells[sequence[i-1]].style.backgroundColor = 'var(--bg-secondary)';
                if (i < sequence.length) {
                    cells[sequence[i]].style.backgroundColor = 'var(--text-accent)';
                    i++;
                } else {
                    clearInterval(interval);
                    cells[sequence[sequence.length-1]].style.backgroundColor = 'var(--bg-secondary)';
                    enableInput();
                }
            }, 700);
        }
        
        function enableInput() {
            const cells = grid.children;
            for (let cell of cells) {
                cell.onclick = function() {
                    const index = parseInt(this.dataset.index);
                    playerSequence.push(index);
                    
                    this.style.backgroundColor = 'var(--text-accent)';
                    setTimeout(() => { this.style.backgroundColor = 'var(--bg-secondary)'; }, 200);
                    
                    const step = playerSequence.length - 1;
                    if (playerSequence[step] !== sequence[step]) {
                        for (let c of cells) c.onclick = null;
                        grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--text-accent); font-size: 32px;">
                            Game Over!<br>Score: ${score}
                        </div>`;
                        return;
                    }
                    
                    if (playerSequence.length === sequence.length) {
                        score += level * 10;
                        level++;
                        document.getElementById('sound-level').textContent = level;
                        document.getElementById('sound-score').textContent = score;
                        setTimeout(playSequence, 1000);
                    }
                };
            }
        }
        
        playSequence();
    }
}

// 32. Puzzle Slider
function initPuzzleSlider() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Puzzle Slider</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Moves:</span>
                <span class="stat-value" id="puzzle-moves">0</span>
            </div>
        </div>
        <div id="puzzle-grid" style="display: grid; grid-template-columns: repeat(3, 100px); gap: 5px; justify-content: center; margin: 40px auto;"></div>
    `;
    
    const grid = document.getElementById('puzzle-grid');
    let tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    let moves = 0;
    
    // Shuffle
    for (let i = 0; i < 100; i++) {
        const emptyIndex = tiles.indexOf(0);
        const neighbors = [];
        if (emptyIndex % 3 > 0) neighbors.push(emptyIndex - 1);
        if (emptyIndex % 3 < 2) neighbors.push(emptyIndex + 1);
        if (emptyIndex > 2) neighbors.push(emptyIndex - 3);
        if (emptyIndex < 6) neighbors.push(emptyIndex + 3);
        const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        [tiles[emptyIndex], tiles[randomNeighbor]] = [tiles[randomNeighbor], tiles[emptyIndex]];
    }
    
    function render() {
        grid.innerHTML = '';
        tiles.forEach((num, i) => {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.style.width = '100px';
            cell.style.height = '100px';
            cell.style.fontSize = '48px';
            if (num === 0) {
                cell.style.backgroundColor = 'var(--bg-primary)';
                cell.style.border = 'none';
            } else {
                cell.textContent = num;
                cell.onclick = () => moveTile(i);
            }
            grid.appendChild(cell);
        });
    }
    
    function moveTile(index) {
        const emptyIndex = tiles.indexOf(0);
        const isAdjacent = (
            (index === emptyIndex - 1 && emptyIndex % 3 !== 0) ||
            (index === emptyIndex + 1 && index % 3 !== 0) ||
            index === emptyIndex - 3 ||
            index === emptyIndex + 3
        );
        
        if (isAdjacent) {
            [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
            moves++;
            document.getElementById('puzzle-moves').textContent = moves;
            render();
            
            if (tiles.join('') === '123456780') {
                setTimeout(() => {
                    grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--text-accent); font-size: 32px;">
                        Solved!<br>Moves: ${moves}
                    </div>`;
                }, 300);
            }
        }
    }
    
    render();
}

// 33. Reaction Colors
function initReactionColors() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Color Reaction</h2>
        <p style="text-align: center; color: var(--text-secondary); font-size: 24px;">
            Press SPACE when the color matches!
        </p>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="reaction-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Round:</span>
                <span class="stat-value" id="reaction-round">0/10</span>
            </div>
        </div>
        <div id="reaction-display" class="test-area" style="font-size: 80px; font-weight: bold;"></div>
    `;
    
    const colors = ['RED', 'BLUE', 'GREEN', 'YELLOW'];
    const colorCodes = { 'RED': '#ff0000', 'BLUE': '#0000ff', 'GREEN': '#00ff00', 'YELLOW': '#ffff00' };
    let score = 0;
    let round = 0;
    let isMatch = false;
    
    function newRound() {
        if (round >= 10) {
            document.getElementById('reaction-display').textContent = `Complete! Score: ${score}/10`;
            document.removeEventListener('keydown', keyHandler);
            return;
        }
        
        round++;
        document.getElementById('reaction-round').textContent = `${round}/10`;
        
        const wordColor = colors[Math.floor(Math.random() * colors.length)];
        const displayColor = Math.random() < 0.5 ? wordColor : colors[Math.floor(Math.random() * colors.length)];
        isMatch = wordColor === displayColor;
        
        const display = document.getElementById('reaction-display');
        display.textContent = wordColor;
        display.style.color = colorCodes[displayColor];
    }
    
    function keyHandler(e) {
        if (e.code === 'Space' && round > 0 && round <= 10) {
            e.preventDefault();
            if (isMatch) {
                score++;
                document.getElementById('reaction-score').textContent = score;
            }
            newRound();
        }
    }
    
    document.addEventListener('keydown', keyHandler);
    newRound();
}

// 34. Typing Ninja
function initTypingNinja() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Typing Ninja</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="ninja-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Lives:</span>
                <span class="stat-value" id="ninja-lives">3</span>
            </div>
        </div>
        <div id="ninja-area" style="position: relative; height: 400px; background-color: var(--bg-primary); border: 4px solid var(--border-primary); overflow: hidden;"></div>
        <div style="text-align: center; margin: 20px 0;">
            <input type="text" id="ninja-input" placeholder="Type words here" style="width: 300px; font-size: 24px; text-align: center;">
        </div>
    `;
    
    const words = ['code', 'type', 'fast', 'ninja', 'quick', 'speed', 'word', 'text', 'key', 'press'];
    const area = document.getElementById('ninja-area');
    const input = document.getElementById('ninja-input');
    let score = 0;
    let lives = 3;
    let activeWords = [];
    
    function spawnWord() {
        if (lives <= 0) return;
        
        const word = words[Math.floor(Math.random() * words.length)];
        const wordEl = document.createElement('div');
        wordEl.textContent = word;
        wordEl.style.position = 'absolute';
        wordEl.style.left = Math.random() * (area.clientWidth - 100) + 'px';
        wordEl.style.top = '0px';
        wordEl.style.fontSize = '28px';
        wordEl.style.color = 'var(--text-accent)';
        wordEl.dataset.word = word;
        area.appendChild(wordEl);
        activeWords.push(wordEl);
        
        const fallInterval = setInterval(() => {
            if (!wordEl.parentNode) {
                clearInterval(fallInterval);
                return;
            }
            
            const currentTop = parseInt(wordEl.style.top);
            wordEl.style.top = (currentTop + 2) + 'px';
            
            if (currentTop > area.clientHeight) {
                clearInterval(fallInterval);
                wordEl.remove();
                activeWords = activeWords.filter(w => w !== wordEl);
                lives--;
                document.getElementById('ninja-lives').textContent = lives;
                if (lives <= 0) {
                    area.innerHTML = `<div style="text-align: center; padding-top: 150px; font-size: 48px; color: var(--text-accent);">
                        Game Over!<br>Score: ${score}
                    </div>`;
                    input.disabled = true;
                }
            }
        }, 50);
    }
    
    input.addEventListener('input', () => {
        const typed = input.value.toLowerCase();
        const matchedWord = activeWords.find(w => w.dataset.word === typed);
        if (matchedWord) {
            score++;
            document.getElementById('ninja-score').textContent = score;
            matchedWord.remove();
            activeWords = activeWords.filter(w => w !== matchedWord);
            input.value = '';
        }
    });
    
    setInterval(() => {
        if (lives > 0 && activeWords.length < 3) {
            spawnWord();
        }
    }, 2000);
    
    input.focus();
    spawnWord();
}

// 35. Button Masher
function initButtonMasher() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Button Masher</h2>
        <p style="text-align: center; color: var(--text-secondary); font-size: 24px;">
            Press the SPACEBAR as many times as possible!
        </p>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Presses:</span>
                <span class="stat-value" id="masher-count">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Time:</span>
                <span class="stat-value" id="masher-time">10</span>
            </div>
        </div>
        <div class="test-area" style="font-size: 64px; color: var(--text-accent);">
            Press SPACEBAR to start!
        </div>
    `;
    
    let count = 0;
    let timeLeft = 10;
    let started = false;
    
    const keyHandler = (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            if (!started) {
                started = true;
                const timer = setInterval(() => {
                    timeLeft--;
                    document.getElementById('masher-time').textContent = timeLeft;
                    if (timeLeft <= 0) {
                        clearInterval(timer);
                        document.removeEventListener('keydown', keyHandler);
                        document.querySelector('.test-area').textContent = `Complete! Total: ${count} presses`;
                    }
                }, 1000);
            }
            count++;
            document.getElementById('masher-count').textContent = count;
        }
    };
    
    document.addEventListener('keydown', keyHandler);
}

// 36. Memory Cards
function initMemoryCards() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Memory Cards</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Matches:</span>
                <span class="stat-value" id="cards-matches">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Moves:</span>
                <span class="stat-value" id="cards-moves">0</span>
            </div>
        </div>
        <div id="cards-grid" style="display: grid; grid-template-columns: repeat(4, 80px); gap: 10px; justify-content: center; margin: 40px auto;"></div>
    `;
    
    const symbols = ['🎮', '🎯', '🎪', '🎨', '🎭', '🎬', '🎤', '🎧'];
    const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    const grid = document.getElementById('cards-grid');
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    
    cards.forEach((symbol, i) => {
        const card = document.createElement('div');
        card.className = 'grid-cell';
        card.style.width = '80px';
        card.style.height = '80px';
        card.style.fontSize = '40px';
        card.style.backgroundColor = 'var(--bg-secondary)';
        card.dataset.symbol = symbol;
        card.dataset.index = i;
        card.textContent = '?';
        grid.appendChild(card);
        
        card.onclick = () => {
            if (flippedCards.length < 2 && !flippedCards.includes(card) && card.textContent === '?') {
                card.textContent = symbol;
                card.style.backgroundColor = 'var(--text-accent)';
                flippedCards.push(card);
                
                if (flippedCards.length === 2) {
                    moves++;
                    document.getElementById('cards-moves').textContent = moves;
                    
                    if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
                        matchedPairs++;
                        document.getElementById('cards-matches').textContent = matchedPairs;
                        flippedCards = [];
                        
                        if (matchedPairs === 8) {
                            setTimeout(() => {
                                grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--text-accent); font-size: 32px;">
                                    Complete!<br>Moves: ${moves}
                                </div>`;
                            }, 500);
                        }
                    } else {
                        setTimeout(() => {
                            flippedCards.forEach(c => {
                                c.textContent = '?';
                                c.style.backgroundColor = 'var(--bg-secondary)';
                            });
                            flippedCards = [];
                        }, 1000);
                    }
                }
            }
        };
    });
}

// 37. Arrow Dodge
function initArrowDodge() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Arrow Dodge</h2>
        <p style="text-align: center; color: var(--text-secondary); font-size: 24px;">
            Use arrow keys to dodge!
        </p>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="dodge-score">0</span>
            </div>
        </div>
        <div id="dodge-area" style="position: relative; height: 400px; background-color: var(--bg-primary); border: 4px solid var(--border-primary); overflow: hidden;">
            <div id="player" style="position: absolute; width: 40px; height: 40px; background-color: var(--color-green); border-radius: 50%; left: 280px; top: 180px;"></div>
        </div>
    `;
    
    const area = document.getElementById('dodge-area');
    const player = document.getElementById('player');
    let score = 0;
    let gameOver = false;
    let playerX = 280;
    let playerY = 180;
    
    document.addEventListener('keydown', (e) => {
        if (gameOver) return;
        const speed = 20;
        if (e.key === 'ArrowLeft' && playerX > 0) playerX -= speed;
        if (e.key === 'ArrowRight' && playerX < area.clientWidth - 40) playerX += speed;
        if (e.key === 'ArrowUp' && playerY > 0) playerY -= speed;
        if (e.key === 'ArrowDown' && playerY < area.clientHeight - 40) playerY += speed;
        player.style.left = playerX + 'px';
        player.style.top = playerY + 'px';
    });
    
    function spawnArrow() {
        if (gameOver) return;
        
        const arrow = document.createElement('div');
        arrow.style.position = 'absolute';
        arrow.style.width = '30px';
        arrow.style.height = '30px';
        arrow.style.backgroundColor = 'var(--color-red)';
        arrow.style.left = Math.random() * (area.clientWidth - 30) + 'px';
        arrow.style.top = '-30px';
        area.appendChild(arrow);
        
        const fallInterval = setInterval(() => {
            if (gameOver) {
                clearInterval(fallInterval);
                return;
            }
            
            const currentTop = parseInt(arrow.style.top);
            arrow.style.top = (currentTop + 3) + 'px';
            
            // Collision detection
            const arrowX = parseInt(arrow.style.left);
            const arrowY = parseInt(arrow.style.top);
            if (arrowX < playerX + 40 && arrowX + 30 > playerX &&
                arrowY < playerY + 40 && arrowY + 30 > playerY) {
                gameOver = true;
                clearInterval(fallInterval);
                area.innerHTML = `<div style="text-align: center; padding-top: 150px; font-size: 48px; color: var(--text-accent);">
                    Game Over!<br>Score: ${score}
                </div>`;
            }
            
            if (currentTop > area.clientHeight) {
                clearInterval(fallInterval);
                arrow.remove();
                score++;
                document.getElementById('dodge-score').textContent = score;
            }
        }, 30);
    }
    
    setInterval(() => {
        if (!gameOver) spawnArrow();
    }, 1000);
}

// 38. Precision Click
function initPrecisionClick() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Precision Click</h2>
        <p style="text-align: center; color: var(--text-secondary); font-size: 24px;">
            Click the tiny targets!
        </p>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Hits:</span>
                <span class="stat-value" id="precision-hits">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Misses:</span>
                <span class="stat-value" id="precision-misses">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Accuracy:</span>
                <span class="stat-value" id="precision-accuracy">0%</span>
            </div>
        </div>
        <div class="click-area" id="precision-area" style="height: 500px;"></div>
    `;
    
    const area = document.getElementById('precision-area');
    let hits = 0;
    let misses = 0;
    
    area.onclick = () => {
        misses++;
        updateStats();
    };
    
    function updateStats() {
        document.getElementById('precision-hits').textContent = hits;
        document.getElementById('precision-misses').textContent = misses;
        const total = hits + misses;
        const accuracy = total > 0 ? ((hits / total) * 100).toFixed(1) : 0;
        document.getElementById('precision-accuracy').textContent = accuracy + '%';
    }
    
    function spawnTarget() {
        const target = document.createElement('div');
        target.className = 'circle-target';
        const size = 15 + Math.random() * 15;
        target.style.width = size + 'px';
        target.style.height = size + 'px';
        target.style.left = Math.random() * (area.clientWidth - size) + 'px';
        target.style.top = Math.random() * (area.clientHeight - size) + 'px';
        area.appendChild(target);
        
        target.onclick = (e) => {
            e.stopPropagation();
            hits++;
            updateStats();
            target.remove();
            spawnTarget();
        };
        
        setTimeout(() => {
            if (target.parentNode) {
                target.remove();
                spawnTarget();
            }
        }, 3000);
    }
    
    spawnTarget();
}

// 39. Emoji Memory
function initEmojiMemory() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Emoji Memory</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value" id="emoji-level">1</span>
            </div>
        </div>
        <div id="emoji-display" class="test-area" style="font-size: 80px;"></div>
        <div id="emoji-options" style="display: flex; justify-content: center; gap: 20px; margin-top: 20px; display: none;"></div>
        <div style="text-align: center; color: var(--text-accent); font-size: 24px; margin-top: 20px;">
            Click to start
        </div>
    `;
    
    const emojis = ['😀', '😎', '🤖', '👽', '🦄', '🐉', '🎯', '🎮', '🚀', '⭐', '🔥', '💎'];
    let started = false;
    
    const startHandler = () => {
        if (!started) {
            started = true;
            document.removeEventListener('click', startHandler);
            startEmojiMemory();
        }
    };
    document.addEventListener('click', startHandler);
    
    function startEmojiMemory() {
        let level = 1;
        
        function showEmojis() {
            const count = level + 2;
            const sequence = [];
            for (let i = 0; i < count; i++) {
                sequence.push(emojis[Math.floor(Math.random() * emojis.length)]);
            }
            
            document.getElementById('emoji-level').textContent = level;
            document.getElementById('emoji-display').textContent = sequence.join(' ');
            document.getElementById('emoji-options').style.display = 'none';
            
            setTimeout(() => {
                document.getElementById('emoji-display').textContent = '';
                const options = document.getElementById('emoji-options');
                options.innerHTML = '';
                options.style.display = 'flex';
                
                const correctEmoji = sequence[Math.floor(Math.random() * sequence.length)];
                const wrongEmojis = emojis.filter(e => !sequence.includes(e)).slice(0, 3);
                const allOptions = [correctEmoji, ...wrongEmojis].sort(() => Math.random() - 0.5);
                
                allOptions.forEach(emoji => {
                    const btn = document.createElement('div');
                    btn.style.fontSize = '64px';
                    btn.style.cursor = 'pointer';
                    btn.style.padding = '10px';
                    btn.style.backgroundColor = 'var(--bg-secondary)';
                    btn.style.border = '3px solid var(--border-primary)';
                    btn.textContent = emoji;
                    btn.onclick = () => {
                        if (emoji === correctEmoji) {
                            level++;
                            setTimeout(showEmojis, 500);
                        } else {
                            document.getElementById('emoji-display').textContent = `Game Over! Level: ${level}`;
                            options.style.display = 'none';
                        }
                    };
                    options.appendChild(btn);
                });
            }, 3000 + level * 500);
        }
        
        showEmojis();
    }
}

// 40. Quick Decision
function initQuickDecision() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Quick Decision</h2>
        <p style="text-align: center; color: var(--text-secondary); font-size: 24px;">
            Choose the larger number quickly!
        </p>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="decision-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Streak:</span>
                <span class="stat-value" id="decision-streak">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Time:</span>
                <span class="stat-value" id="decision-time">30</span>
            </div>
        </div>
        <div style="display: flex; justify-content: center; gap: 40px; margin: 40px 0;">
            <div id="decision-left" class="answer-option" style="font-size: 80px; min-width: 200px; text-align: center;"></div>
            <div id="decision-right" class="answer-option" style="font-size: 80px; min-width: 200px; text-align: center;"></div>
        </div>
    `;
    
    let score = 0;
    let streak = 0;
    let timeLeft = 30;
    
    const timer = setInterval(() => {
        timeLeft--;
        document.getElementById('decision-time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.querySelector('.answer-option').onclick = null;
            document.getElementById('decision-left').textContent = `Game Over!`;
            document.getElementById('decision-right').textContent = `Score: ${score}`;
        }
    }, 1000);
    
    function newQuestion() {
        const num1 = Math.floor(Math.random() * 100) + 1;
        let num2 = Math.floor(Math.random() * 100) + 1;
        while (num1 === num2) num2 = Math.floor(Math.random() * 100) + 1;
        
        const left = document.getElementById('decision-left');
        const right = document.getElementById('decision-right');
        
        left.textContent = num1;
        right.textContent = num2;
        
        left.onclick = () => checkAnswer(num1, num2);
        right.onclick = () => checkAnswer(num2, num1);
    }
    
    function checkAnswer(chosen, other) {
        if (chosen > other) {
            score++;
            streak++;
            document.getElementById('decision-score').textContent = score;
            document.getElementById('decision-streak').textContent = streak;
        } else {
            streak = 0;
            document.getElementById('decision-streak').textContent = streak;
        }
        if (timeLeft > 0) newQuestion();
    }
    
    newQuestion();
}

// 41. Snake Game
function initSnakeGame() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Snake Game</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="snake-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">High Score:</span>
                <span class="stat-value" id="snake-high">0</span>
            </div>
        </div>
        <div style="text-align: center; margin: 20px 0;">
            <canvas id="snake-canvas" width="400" height="400"></canvas>
        </div>
        <div style="text-align: center; color: var(--text-accent); font-size: 24px;">
            Use Arrow Keys to move. Press any arrow key to start!
        </div>
    `;
    
    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    const tileCount = 20;
    
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 0;
    let dy = 0;
    let score = 0;
    let gameLoop = null;
    let gameStarted = false;
    
    const highScore = parseInt(localStorage.getItem('snakeHighScore') || '0');
    document.getElementById('snake-high').textContent = highScore;
    
    ctx.fillStyle = 'var(--bg-primary)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    function drawGame() {
        // Clear canvas
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw snake
        ctx.fillStyle = '#00ff00';
        snake.forEach((segment, index) => {
            if (index === 0) {
                ctx.fillStyle = '#00ff00';
            } else {
                ctx.fillStyle = '#00cc00';
            }
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        });
        
        // Draw food
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2 - 1, 0, Math.PI * 2);
        ctx.fill();
    }
    
    function update() {
        if (!gameStarted) return;
        
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        
        // Check wall collision
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            gameOver();
            return;
        }
        
        // Check self collision
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            gameOver();
            return;
        }
        
        snake.unshift(head);
        
        // Check food collision
        if (head.x === food.x && head.y === food.y) {
            score++;
            document.getElementById('snake-score').textContent = score;
            SoundSystem.playSuccess();
            placeFood();
            
            if (score > highScore) {
                localStorage.setItem('snakeHighScore', score);
                document.getElementById('snake-high').textContent = score;
            }
        } else {
            snake.pop();
        }
        
        drawGame();
    }
    
    function placeFood() {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        
        // Make sure food doesn't spawn on snake
        while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
            food = {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * tileCount)
            };
        }
    }
    
    function gameOver() {
        clearInterval(gameLoop);
        SoundSystem.playFailure();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ff0000';
        ctx.font = '48px VT323';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
        ctx.fillStyle = '#ffffff';
        ctx.font = '32px VT323';
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
    }
    
    document.addEventListener('keydown', (e) => {
        if (!gameStarted && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            gameStarted = true;
            gameLoop = setInterval(update, 100);
            SoundSystem.playClick();
        }
        
        if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1; }
        if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1; }
        if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0; }
        if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0; }
    });
    
    drawGame();
}

// 42. Whack-a-Mole
function initWhackAMole() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Whack-a-Mole</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="mole-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Misses:</span>
                <span class="stat-value" id="mole-misses">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Time:</span>
                <span class="stat-value" id="mole-time">30</span>
            </div>
        </div>
        <div id="mole-grid" style="display: grid; grid-template-columns: repeat(3, 150px); gap: 20px; justify-content: center; margin: 40px auto;"></div>
    `;
    
    const grid = document.getElementById('mole-grid');
    let score = 0;
    let misses = 0;
    let timeLeft = 30;
    let gameActive = true;
    
    // Create holes
    for (let i = 0; i < 9; i++) {
        const hole = document.createElement('div');
        hole.style.width = '150px';
        hole.style.height = '150px';
        hole.style.backgroundColor = 'var(--bg-secondary)';
        hole.style.border = '5px solid var(--border-primary)';
        hole.style.borderRadius = '50%';
        hole.style.position = 'relative';
        hole.style.overflow = 'hidden';
        hole.style.cursor = 'pointer';
        hole.dataset.index = i;
        
        hole.onclick = () => {
            if (!hole.classList.contains('has-mole')) {
                misses++;
                document.getElementById('mole-misses').textContent = misses;
                SoundSystem.playFailure();
                VisualEffects.shakeElement(hole);
            }
        };
        
        grid.appendChild(hole);
    }
    
    const timer = setInterval(() => {
        timeLeft--;
        document.getElementById('mole-time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            gameActive = false;
            grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--text-accent); font-size: 48px;">
                Game Over!<br>Score: ${score}<br>Accuracy: ${score + misses > 0 ? ((score / (score + misses)) * 100).toFixed(1) : 0}%
            </div>`;
            if (score >= 20) {
                SoundSystem.playSuccess();
            }
        }
    }, 1000);
    
    function spawnMole() {
        if (!gameActive) return;
        
        const holes = Array.from(grid.children).filter(h => !h.classList.contains('has-mole'));
        if (holes.length === 0) return;
        
        const hole = holes[Math.floor(Math.random() * holes.length)];
        hole.classList.add('has-mole');
        
        const mole = document.createElement('div');
        mole.style.position = 'absolute';
        mole.style.bottom = '0';
        mole.style.left = '50%';
        mole.style.transform = 'translateX(-50%)';
        mole.style.width = '80px';
        mole.style.height = '80px';
        mole.style.backgroundColor = 'var(--color-orange)';
        mole.style.borderRadius = '50% 50% 40% 40%';
        mole.style.animation = 'bounce 0.5s ease-out';
        mole.textContent = '👀';
        mole.style.fontSize = '48px';
        mole.style.textAlign = 'center';
        mole.style.lineHeight = '80px';
        hole.appendChild(mole);
        
        mole.onclick = (e) => {
            e.stopPropagation();
            score++;
            document.getElementById('mole-score').textContent = score;
            SoundSystem.playSuccess();
            mole.remove();
            hole.classList.remove('has-mole');
            VisualEffects.pulseElement(hole);
        };
        
        setTimeout(() => {
            if (mole.parentNode) {
                mole.remove();
                hole.classList.remove('has-mole');
            }
        }, 1000 + Math.random() * 1000);
    }
    
    setInterval(() => {
        if (gameActive) spawnMole();
    }, 800);
    
    SoundSystem.playClick();
}

// 43. Space Invaders Mini
function initSpaceInvaders() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Space Invaders Mini</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value" id="invaders-level">1</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="invaders-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Lives:</span>
                <span class="stat-value" id="invaders-lives">3</span>
            </div>
        </div>
        <div style="text-align: center; margin: 20px 0;">
            <canvas id="invaders-canvas" width="600" height="400"></canvas>
        </div>
        <div style="text-align: center; color: var(--text-accent); font-size: 24px;">
            Use ← → to move, SPACE to shoot
        </div>
    `;
    
    const canvas = document.getElementById('invaders-canvas');
    const ctx = canvas.getContext('2d');
    
    let player = { x: 280, y: 360, width: 40, height: 20 };
    let bullets = [];
    let invaders = [];
    let score = 0;
    let lives = 3;
    let level = 1;
    let gameActive = true;
    let invaderDirection = 1;
    let invaderSpeed = 2;
    
    function createInvaders() {
        invaders = [];
        const rows = Math.min(3 + Math.floor((level - 1) / 2), 5);
        const cols = 8;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                invaders.push({
                    x: col * 60 + 50,
                    y: row * 40 + 30,
                    width: 40,
                    height: 30,
                    alive: true
                });
            }
        }
    }
    
    createInvaders();
    
    const keys = {};
    document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
        if (e.key === ' ') {
            e.preventDefault();
            if (bullets.length < 3) {
                bullets.push({ x: player.x + 18, y: player.y, width: 4, height: 10 });
                SoundSystem.playClick();
            }
        }
    });
    document.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });
    
    function update() {
        if (!gameActive) return;
        
        // Move player
        if (keys['ArrowLeft'] && player.x > 0) player.x -= 5;
        if (keys['ArrowRight'] && player.x < canvas.width - player.width) player.x += 5;
        
        // Move bullets
        bullets = bullets.filter(b => {
            b.y -= 8;
            return b.y > 0;
        });
        
        // Move invaders
        let shouldMoveDown = false;
        const aliveInvaders = invaders.filter(inv => inv.alive);
        
        aliveInvaders.forEach(inv => {
            inv.x += invaderDirection * invaderSpeed;
            if (inv.x <= 0 || inv.x >= canvas.width - inv.width) {
                shouldMoveDown = true;
            }
        });
        
        if (shouldMoveDown) {
            invaderDirection *= -1;
            invaders.forEach(inv => {
                if (inv.alive) inv.y += 20;
            });
        }
        
        // Check bullet-invader collision
        bullets.forEach((bullet, bi) => {
            invaders.forEach((inv) => {
                if (inv.alive && 
                    bullet.x < inv.x + inv.width &&
                    bullet.x + bullet.width > inv.x &&
                    bullet.y < inv.y + inv.height &&
                    bullet.y + bullet.height > inv.y) {
                    inv.alive = false;
                    bullets[bi] = null;
                    score += 10;
                    document.getElementById('invaders-score').textContent = score;
                    SoundSystem.playSuccess();
                }
            });
        });
        bullets = bullets.filter(b => b !== null);
        
        // Check if invaders reached bottom
        aliveInvaders.forEach(inv => {
            if (inv.y + inv.height >= player.y) {
                lives = 0;
            }
        });
        
        // Check win/loss
        if (invaders.every(inv => !inv.alive)) {
            level++;
            invaderSpeed = 2 + (level - 1) * 0.3;
            document.getElementById('invaders-level').textContent = level;
            SoundSystem.playSuccess();
            SoundSystem.playPowerUp();
            bullets = [];
            player.x = 280;
            invaderDirection = 1;
            createInvaders();
        }
        
        if (lives <= 0) {
            gameActive = false;
            document.getElementById('invaders-lives').textContent = 0;
            SoundSystem.playFailure();
            ctx.fillStyle = '#ff0000';
            ctx.font = '48px VT323';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
        } else {
            document.getElementById('invaders-lives').textContent = lives;
        }
        
        draw();
    }
    
    function draw() {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw player
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(player.x, player.y, player.width, player.height);
        
        // Draw bullets
        ctx.fillStyle = '#ffff00';
        bullets.forEach(b => {
            ctx.fillRect(b.x, b.y, b.width, b.height);
        });
        
        // Draw invaders
        ctx.fillStyle = '#ff0000';
        invaders.forEach(inv => {
            if (inv.alive) {
                ctx.fillRect(inv.x, inv.y, inv.width, inv.height);
            }
        });
    }
    
    setInterval(update, 1000 / 60);
}

// 44. Match-3 Puzzle
function initMatch3() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Match-3 Puzzle</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="match3-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Moves:</span>
                <span class="stat-value" id="match3-moves">30</span>
            </div>
        </div>
        <div id="match3-grid" style="display: grid; grid-template-columns: repeat(8, 50px); gap: 5px; justify-content: center; margin: 40px auto;"></div>
    `;
    
    const colors = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠'];
    const gridSize = 8;
    let grid = [];
    let selected = null;
    let score = 0;
    let moves = 30;
    
    function createGrid() {
        grid = [];
        for (let i = 0; i < gridSize * gridSize; i++) {
            grid.push(colors[Math.floor(Math.random() * colors.length)]);
        }
        renderGrid();
    }
    
    function renderGrid() {
        const gridEl = document.getElementById('match3-grid');
        gridEl.innerHTML = '';
        
        grid.forEach((color, index) => {
            const cell = document.createElement('div');
            cell.style.width = '50px';
            cell.style.height = '50px';
            cell.style.backgroundColor = 'var(--bg-secondary)';
            cell.style.border = '3px solid var(--border-primary)';
            cell.style.fontSize = '32px';
            cell.style.display = 'flex';
            cell.style.alignItems = 'center';
            cell.style.justifyContent = 'center';
            cell.style.cursor = 'pointer';
            cell.textContent = color;
            cell.dataset.index = index;
            
            cell.onclick = () => selectCell(index);
            gridEl.appendChild(cell);
        });
    }
    
    function selectCell(index) {
        if (moves <= 0) return;
        
        const cells = document.querySelectorAll('#match3-grid > div');
        
        if (selected === null) {
            selected = index;
            cells[index].style.border = '3px solid var(--text-accent)';
            SoundSystem.playClick();
        } else {
            const row1 = Math.floor(selected / gridSize);
            const col1 = selected % gridSize;
            const row2 = Math.floor(index / gridSize);
            const col2 = index % gridSize;
            
            const isAdjacent = (Math.abs(row1 - row2) === 1 && col1 === col2) ||
                              (Math.abs(col1 - col2) === 1 && row1 === row2);
            
            if (isAdjacent) {
                [grid[selected], grid[index]] = [grid[index], grid[selected]];
                moves--;
                document.getElementById('match3-moves').textContent = moves;
                checkMatches();
            }
            
            cells[selected].style.border = '3px solid var(--border-primary)';
            selected = null;
            renderGrid();
        }
    }
    
    function checkMatches() {
        let foundMatch = false;
        const matched = new Set();
        
        // Check horizontal matches
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize - 2; col++) {
                const idx = row * gridSize + col;
                if (grid[idx] === grid[idx + 1] && grid[idx] === grid[idx + 2]) {
                    matched.add(idx);
                    matched.add(idx + 1);
                    matched.add(idx + 2);
                    foundMatch = true;
                }
            }
        }
        
        // Check vertical matches
        for (let col = 0; col < gridSize; col++) {
            for (let row = 0; row < gridSize - 2; row++) {
                const idx = row * gridSize + col;
                if (grid[idx] === grid[idx + gridSize] && grid[idx] === grid[idx + gridSize * 2]) {
                    matched.add(idx);
                    matched.add(idx + gridSize);
                    matched.add(idx + gridSize * 2);
                    foundMatch = true;
                }
            }
        }
        
        if (foundMatch) {
            score += matched.size * 10;
            document.getElementById('match3-score').textContent = score;
            SoundSystem.playSuccess();
            
            matched.forEach(idx => {
                grid[idx] = colors[Math.floor(Math.random() * colors.length)];
            });
            
            setTimeout(() => {
                renderGrid();
                checkMatches();
            }, 300);
        }
        
        if (moves <= 0) {
            setTimeout(() => {
                const gridEl = document.getElementById('match3-grid');
                gridEl.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--text-accent); font-size: 48px;">
                    Game Over!<br>Final Score: ${score}
                </div>`;
            }, 500);
        }
    }
    
    createGrid();
}

// 45. Runner Game
function initRunnerGame() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Runner Game</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="runner-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Best:</span>
                <span class="stat-value" id="runner-best">0</span>
            </div>
        </div>
        <div style="text-align: center; margin: 20px 0;">
            <canvas id="runner-canvas" width="600" height="300"></canvas>
        </div>
        <div style="text-align: center; color: var(--text-accent); font-size: 24px;">
            Press SPACE to jump!
        </div>
    `;
    
    const canvas = document.getElementById('runner-canvas');
    const ctx = canvas.getContext('2d');
    
    let player = { x: 50, y: 200, width: 30, height: 30, velocityY: 0, jumping: false };
    let obstacles = [];
    let score = 0;
    let gameActive = true;
    let speed = 5;
    
    const bestScore = parseInt(localStorage.getItem('runnerBest') || '0');
    document.getElementById('runner-best').textContent = bestScore;
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !player.jumping) {
            e.preventDefault();
            player.velocityY = -12;
            player.jumping = true;
            SoundSystem.playClick();
        }
    });
    
    function update() {
        if (!gameActive) return;
        
        // Update player
        player.velocityY += 0.6;
        player.y += player.velocityY;
        
        if (player.y >= 200) {
            player.y = 200;
            player.velocityY = 0;
            player.jumping = false;
        }
        
        // Update obstacles
        obstacles.forEach(obs => {
            obs.x -= speed;
        });
        
        obstacles = obstacles.filter(obs => obs.x > -obs.width);
        
        // Spawn obstacles
        if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < 400) {
            obstacles.push({
                x: 600,
                y: 210,
                width: 20 + Math.random() * 20,
                height: 20 + Math.random() * 40
            });
        }
        
        // Check collision
        obstacles.forEach(obs => {
            if (player.x < obs.x + obs.width &&
                player.x + player.width > obs.x &&
                player.y < obs.y + obs.height &&
                player.y + player.height > obs.y) {
                gameActive = false;
                SoundSystem.playFailure();
                
                if (score > bestScore) {
                    localStorage.setItem('runnerBest', score);
                    document.getElementById('runner-best').textContent = score;
                }
                
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#ff0000';
                ctx.font = '48px VT323';
                ctx.textAlign = 'center';
                ctx.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
                ctx.fillStyle = '#ffffff';
                ctx.font = '32px VT323';
                ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
            }
        });
        
        // Update score
        score++;
        document.getElementById('runner-score').textContent = Math.floor(score / 10);
        
        // Increase speed
        if (score % 500 === 0) {
            speed += 0.5;
        }
        
        draw();
    }
    
    function draw() {
        // Clear canvas
        ctx.fillStyle = '#87ceeb';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw ground
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(0, 230, canvas.width, 70);
        
        // Draw player
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(player.x, player.y, player.width, player.height);
        
        // Draw obstacles
        ctx.fillStyle = '#ff0000';
        obstacles.forEach(obs => {
            ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        });
    }
    
    setInterval(update, 1000 / 60);
}

// 46. Breakout Game
function initBreakout() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Breakout Game</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value" id="breakout-level">1</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="breakout-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Lives:</span>
                <span class="stat-value" id="breakout-lives">3</span>
            </div>
        </div>
        <div style="text-align: center; margin: 20px 0;">
            <canvas id="breakout-canvas" width="600" height="500"></canvas>
        </div>
        <div style="text-align: center; color: var(--text-accent); font-size: 24px;">
            Use ← → to move paddle, or click to start!
        </div>
    `;
    
    const canvas = document.getElementById('breakout-canvas');
    const ctx = canvas.getContext('2d');
    
    let paddle = { x: 250, y: 460, width: 100, height: 15, speed: 7 };
    let ball = { x: 300, y: 400, radius: 8, dx: 3, dy: -3 };
    let bricks = [];
    let score = 0;
    let lives = 3;
    let level = 1;
    let gameActive = false;
    
    const brickRows = 5;
    const brickCols = 8;
    const brickWidth = 70;
    const brickHeight = 20;
    const brickPadding = 5;
    const brickOffsetTop = 50;
    const brickOffsetLeft = 10;
    
    for (let r = 0; r < brickRows; r++) {
        bricks[r] = [];
        for (let c = 0; c < brickCols; c++) {
            bricks[r][c] = { x: 0, y: 0, status: 1 };
        }
    }
    
    const keys = {};
    document.addEventListener('keydown', (e) => { keys[e.key] = true; });
    document.addEventListener('keyup', (e) => { keys[e.key] = false; });
    
    canvas.onclick = () => {
        if (!gameActive) {
            gameActive = true;
            SoundSystem.playClick();
        }
    };
    
    function drawBricks() {
        const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff'];
        for (let r = 0; r < brickRows; r++) {
            for (let c = 0; c < brickCols; c++) {
                if (bricks[r][c].status === 1) {
                    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                    bricks[r][c].x = brickX;
                    bricks[r][c].y = brickY;
                    ctx.fillStyle = colors[r];
                    ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
                    ctx.strokeStyle = '#000';
                    ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
                }
            }
        }
    }
    
    function collisionDetection() {
        for (let r = 0; r < brickRows; r++) {
            for (let c = 0; c < brickCols; c++) {
                const b = bricks[r][c];
                if (b.status === 1) {
                    if (ball.x > b.x && ball.x < b.x + brickWidth &&
                        ball.y > b.y && ball.y < b.y + brickHeight) {
                        ball.dy = -ball.dy;
                        b.status = 0;
                        score += 10;
                        document.getElementById('breakout-score').textContent = score;
                        SoundSystem.playSuccess();
                    }
                }
            }
        }
    }
    
    function draw() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        drawBricks();
        
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
        
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    function update() {
        if (!gameActive) {
            draw();
            return;
        }
        
        if (keys['ArrowLeft'] && paddle.x > 0) paddle.x -= paddle.speed;
        if (keys['ArrowRight'] && paddle.x < canvas.width - paddle.width) paddle.x += paddle.speed;
        
        ball.x += ball.dx;
        ball.y += ball.dy;
        
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
        }
        if (ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
        }
        
        if (ball.y + ball.radius > paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
            SoundSystem.playClick();
        }
        
        if (ball.y + ball.radius > canvas.height) {
            lives--;
            document.getElementById('breakout-lives').textContent = lives;
            if (lives > 0) {
                ball.x = 300;
                ball.y = 400;
                ball.dx = 3;
                ball.dy = -3;
                gameActive = false;
                SoundSystem.playFailure();
            } else {
                gameActive = false;
                SoundSystem.playFailure();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#ff0000';
                ctx.font = '48px VT323';
                ctx.textAlign = 'center';
                ctx.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
            }
        }
        
        collisionDetection();
        
        let allBricksGone = true;
        for (let r = 0; r < brickRows; r++) {
            for (let c = 0; c < brickCols; c++) {
                if (bricks[r][c].status === 1) {
                    allBricksGone = false;
                }
            }
        }
        
        if (allBricksGone) {
            level++;
            document.getElementById('breakout-level').textContent = level;
            SoundSystem.playSuccess();
            SoundSystem.playPowerUp();
            
            // Reset bricks
            for (let r = 0; r < brickRows; r++) {
                for (let c = 0; c < brickCols; c++) {
                    bricks[r][c].status = 1;
                }
            }
            
            // Increase ball speed
            const speedMultiplier = 1 + (level - 1) * 0.15;
            ball.dx = 3 * speedMultiplier * (ball.dx > 0 ? 1 : -1);
            ball.dy = -3 * speedMultiplier;
            ball.x = 300;
            ball.y = 400;
            paddle.x = 250;
            gameActive = false;  // Wait for player to click to start next level
        }
        
        draw();
    }
    
    setInterval(update, 1000 / 60);
}

// 47. Flappy Bird Clone
function initFlappyBird() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Flappy Bird</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="flappy-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Best:</span>
                <span class="stat-value" id="flappy-best">0</span>
            </div>
        </div>
        <div style="text-align: center; margin: 20px 0;">
            <canvas id="flappy-canvas" width="400" height="600"></canvas>
        </div>
        <div style="text-align: center; color: var(--text-accent); font-size: 24px;">
            Press SPACE or Click to Flap!
        </div>
    `;
    
    const canvas = document.getElementById('flappy-canvas');
    const ctx = canvas.getContext('2d');
    
    let bird = { x: 50, y: 250, width: 30, height: 30, velocity: 0, gravity: 0.5, jump: -8 };
    let pipes = [];
    let score = 0;
    let gameActive = false;
    const pipeWidth = 50;
    const pipeGap = 150;
    
    const bestScore = parseInt(localStorage.getItem('flappyBest') || '0');
    document.getElementById('flappy-best').textContent = bestScore;
    
    function flap() {
        if (!gameActive) {
            gameActive = true;
            SoundSystem.playClick();
        }
        bird.velocity = bird.jump;
        SoundSystem.playClick();
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            flap();
        }
    });
    
    canvas.onclick = flap;
    
    function createPipe() {
        const minHeight = 50;
        const maxHeight = canvas.height - pipeGap - minHeight;
        const height = Math.random() * (maxHeight - minHeight) + minHeight;
        pipes.push({
            x: canvas.width,
            top: height,
            bottom: height + pipeGap,
            scored: false
        });
    }
    
    function draw() {
        ctx.fillStyle = '#87ceeb';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
        
        ctx.fillStyle = '#00ff00';
        pipes.forEach(pipe => {
            ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
            ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);
        });
    }
    
    function update() {
        if (!gameActive) {
            draw();
            return;
        }
        
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;
        
        if (bird.y + bird.height > canvas.height || bird.y < 0) {
            endGame();
            return;
        }
        
        pipes.forEach(pipe => {
            pipe.x -= 3;
            
            if (!pipe.scored && pipe.x + pipeWidth < bird.x) {
                score++;
                pipe.scored = true;
                document.getElementById('flappy-score').textContent = score;
                SoundSystem.playSuccess();
            }
            
            if (bird.x + bird.width > pipe.x && bird.x < pipe.x + pipeWidth) {
                if (bird.y < pipe.top || bird.y + bird.height > pipe.bottom) {
                    endGame();
                }
            }
        });
        
        pipes = pipes.filter(p => p.x > -pipeWidth);
        
        if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
            createPipe();
        }
        
        draw();
    }
    
    function endGame() {
        gameActive = false;
        SoundSystem.playFailure();
        
        if (score > bestScore) {
            localStorage.setItem('flappyBest', score);
            document.getElementById('flappy-best').textContent = score;
        }
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ff0000';
        ctx.font = '48px VT323';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
    }
    
    setInterval(update, 1000 / 60);
}

// 48. Color Memory Test
function initColorMemoryTest() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Color Memory Test</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value" id="color-mem-level">1</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="color-mem-score">0</span>
            </div>
        </div>
        <div id="color-mem-display" style="display: grid; grid-template-columns: repeat(3, 150px); gap: 10px; justify-content: center; margin: 40px auto;"></div>
        <div id="color-mem-message" style="text-align: center; color: var(--text-accent); font-size: 28px; margin-top: 20px;">
            Memorize the colors! Click to start
        </div>
    `;
    
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#8800ff', '#00ff88'];
    let level = 1;
    let score = 0;
    let sequence = [];
    let playerSequence = [];
    let gameStarted = false;
    
    const display = document.getElementById('color-mem-display');
    
    for (let i = 0; i < 9; i++) {
        const box = document.createElement('div');
        box.style.width = '150px';
        box.style.height = '150px';
        box.style.backgroundColor = '#333';
        box.style.border = '4px solid var(--border-primary)';
        box.style.cursor = 'pointer';
        box.dataset.index = i;
        display.appendChild(box);
        
        box.onclick = () => {
            if (!gameStarted) {
                gameStarted = true;
                startLevel();
            } else {
                handleClick(i);
            }
        };
    }
    
    function startLevel() {
        document.getElementById('color-mem-message').textContent = 'Watch carefully...';
        playerSequence = [];
        
        sequence = [];
        for (let i = 0; i < level + 2; i++) {
            sequence.push({
                box: Math.floor(Math.random() * 9),
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
        
        const boxes = display.children;
        let index = 0;
        
        const showNext = () => {
            if (index < sequence.length) {
                const item = sequence[index];
                boxes[item.box].style.backgroundColor = item.color;
                
                setTimeout(() => {
                    boxes[item.box].style.backgroundColor = '#333';
                    index++;
                    setTimeout(showNext, 300);
                }, 800);
            } else {
                setTimeout(() => {
                    document.getElementById('color-mem-message').textContent = 'Repeat the sequence!';
                }, 500);
            }
        };
        
        showNext();
    }
    
    function handleClick(boxIndex) {
        if (playerSequence.length >= sequence.length) return;
        
        const currentStep = playerSequence.length;
        const expected = sequence[currentStep];
        
        const boxes = display.children;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        boxes[boxIndex].style.backgroundColor = randomColor;
        setTimeout(() => {
            boxes[boxIndex].style.backgroundColor = '#333';
        }, 200);
        
        playerSequence.push({ box: boxIndex, color: randomColor });
        
        if (boxIndex !== expected.box) {
            document.getElementById('color-mem-message').textContent = `Game Over! Final Level: ${level}`;
            SoundSystem.playFailure();
            gameStarted = false;
            return;
        }
        
        if (playerSequence.length === sequence.length) {
            let allCorrect = true;
            for (let i = 0; i < sequence.length; i++) {
                if (playerSequence[i].box !== sequence[i].box) {
                    allCorrect = false;
                    break;
                }
            }
            
            if (allCorrect) {
                score += level * 10;
                level++;
                document.getElementById('color-mem-level').textContent = level;
                document.getElementById('color-mem-score').textContent = score;
                document.getElementById('color-mem-message').textContent = 'Correct! Next level...';
                SoundSystem.playSuccess();
                setTimeout(startLevel, 1500);
            } else {
                document.getElementById('color-mem-message').textContent = `Game Over! Final Level: ${level}`;
                SoundSystem.playFailure();
                gameStarted = false;
            }
        }
    }
}

// 49. Word Association Game
function initWordAssociation() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Word Association</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="word-assoc-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Time:</span>
                <span class="stat-value" id="word-assoc-time">60</span>
            </div>
        </div>
        <div id="word-assoc-word" class="test-area" style="font-size: 64px; color: var(--text-accent);">
            Click to Start
        </div>
        <div id="word-assoc-options" class="answer-options"></div>
    `;
    
    const wordPairs = [
        { word: 'HOT', matches: ['COLD', 'FIRE', 'SUN'], wrong: ['WATER', 'ICE', 'MOON'] },
        { word: 'DAY', matches: ['NIGHT', 'SUN', 'LIGHT'], wrong: ['DARK', 'STARS', 'MOON'] },
        { word: 'CAT', matches: ['DOG', 'MEOW', 'PET'], wrong: ['BIRD', 'FISH', 'TREE'] },
        { word: 'HAPPY', matches: ['SAD', 'JOY', 'SMILE'], wrong: ['ANGRY', 'FROWN', 'CRY'] },
        { word: 'UP', matches: ['DOWN', 'SKY', 'HIGH'], wrong: ['LEFT', 'RIGHT', 'LOW'] },
        { word: 'FAST', matches: ['SLOW', 'SPEED', 'QUICK'], wrong: ['WALK', 'STOP', 'GO'] },
        { word: 'BIG', matches: ['SMALL', 'LARGE', 'HUGE'], wrong: ['TINY', 'MINI', 'SHORT'] },
        { word: 'LOVE', matches: ['HATE', 'HEART', 'LIKE'], wrong: ['MIND', 'BRAIN', 'THINK'] },
        { word: 'LIGHT', matches: ['DARK', 'BRIGHT', 'LAMP'], wrong: ['HEAVY', 'WEIGHT', 'LOAD'] },
        { word: 'KING', matches: ['QUEEN', 'CROWN', 'RULER'], wrong: ['KNIGHT', 'PAWN', 'CHESS'] }
    ];
    
    let score = 0;
    let timeLeft = 60;
    let gameStarted = false;
    let currentWord = null;
    
    function showWord() {
        if (timeLeft <= 0) {
            document.getElementById('word-assoc-word').textContent = `Game Over! Final Score: ${score}`;
            document.getElementById('word-assoc-options').innerHTML = '';
            return;
        }
        
        currentWord = wordPairs[Math.floor(Math.random() * wordPairs.length)];
        document.getElementById('word-assoc-word').textContent = currentWord.word;
        
        const correct = currentWord.matches[Math.floor(Math.random() * currentWord.matches.length)];
        const wrong = [...currentWord.wrong].sort(() => Math.random() - 0.5).slice(0, 3);
        const options = [correct, ...wrong].sort(() => Math.random() - 0.5);
        
        const optionsDiv = document.getElementById('word-assoc-options');
        optionsDiv.innerHTML = '';
        
        options.forEach((option, i) => {
            const btn = document.createElement('div');
            btn.className = 'answer-option';
            btn.textContent = option;
            btn.style.animation = `slideIn 0.3s ease-out ${i * 0.1}s both`;
            btn.onclick = () => checkAnswer(option, correct);
            optionsDiv.appendChild(btn);
        });
    }
    
    function checkAnswer(selected, correct) {
        const options = document.querySelectorAll('.answer-option');
        options.forEach(opt => opt.onclick = null);
        
        if (selected === correct) {
            score++;
            document.getElementById('word-assoc-score').textContent = score;
            SoundSystem.playSuccess();
            options.forEach(opt => {
                if (opt.textContent === correct) {
                    opt.classList.add('correct');
                    VisualEffects.pulseElement(opt);
                }
            });
        } else {
            SoundSystem.playFailure();
            options.forEach(opt => {
                if (opt.textContent === selected) opt.classList.add('incorrect');
                if (opt.textContent === correct) opt.classList.add('correct');
            });
        }
        
        setTimeout(showWord, 1000);
    }
    
    document.getElementById('word-assoc-word').onclick = () => {
        if (!gameStarted) {
            gameStarted = true;
            showWord();
            
            const timer = setInterval(() => {
                timeLeft--;
                document.getElementById('word-assoc-time').textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(timer);
                }
            }, 1000);
        }
    };
}

// 50. Maze Navigator
function initMazeNavigator() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Maze Navigator</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value" id="maze-level">1</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Moves:</span>
                <span class="stat-value" id="maze-moves">0</span>
            </div>
        </div>
        <div style="text-align: center; margin: 20px 0;">
            <canvas id="maze-canvas" width="500" height="500"></canvas>
        </div>
        <div style="text-align: center; color: var(--text-accent); font-size: 24px;">
            Use Arrow Keys to Navigate. Reach the green goal!
        </div>
    `;
    
    const canvas = document.getElementById('maze-canvas');
    const ctx = canvas.getContext('2d');
    const cellSize = 50;
    const gridSize = 10;
    
    let player = { x: 0, y: 0 };
    let goal = { x: 9, y: 9 };
    let moves = 0;
    let level = 1;
    let maze = [];
    
    function generateMaze() {
        // Generate maze using recursive backtracking to ensure solvability
        maze = [];
        for (let y = 0; y < gridSize; y++) {
            maze[y] = [];
            for (let x = 0; x < gridSize; x++) {
                maze[y][x] = 1; // Start with all walls
            }
        }
        
        // Create a path from start to goal using depth-first search
        const visited = new Set();
        const stack = [[0, 0]];
        visited.add('0,0');
        maze[0][0] = 0;
        
        while (stack.length > 0) {
            const [cx, cy] = stack[stack.length - 1];
            
            // Get unvisited neighbors
            const neighbors = [];
            const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
            for (const [dx, dy] of dirs) {
                const nx = cx + dx;
                const ny = cy + dy;
                if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize && !visited.has(`${nx},${ny}`)) {
                    neighbors.push([nx, ny]);
                }
            }
            
            if (neighbors.length > 0) {
                // Choose random unvisited neighbor
                const [nx, ny] = neighbors[Math.floor(Math.random() * neighbors.length)];
                maze[ny][nx] = 0;
                visited.add(`${nx},${ny}`);
                stack.push([nx, ny]);
            } else {
                stack.pop();
            }
        }
        
        // Ensure goal is reachable
        maze[goal.y][goal.x] = 0;
        
        // Add some random open paths based on difficulty
        const wallDensity = Math.min(0.15, level * 0.02);
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                if (Math.random() < wallDensity && maze[y][x] === 1) {
                    maze[y][x] = 0;
                }
            }
        }
    }
    
    function drawMaze() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                if (maze[y][x] === 1) {
                    ctx.fillStyle = '#666';
                } else {
                    ctx.fillStyle = '#222';
                }
                ctx.fillRect(x * cellSize, y * cellSize, cellSize - 2, cellSize - 2);
            }
        }
        
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(goal.x * cellSize, goal.y * cellSize, cellSize - 2, cellSize - 2);
        
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(player.x * cellSize + cellSize / 2, player.y * cellSize + cellSize / 2, cellSize / 3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    function movePlayer(dx, dy) {
        const newX = player.x + dx;
        const newY = player.y + dy;
        
        if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize && maze[newY][newX] === 0) {
            player.x = newX;
            player.y = newY;
            moves++;
            document.getElementById('maze-moves').textContent = moves;
            SoundSystem.playClick();
            
            if (player.x === goal.x && player.y === goal.y) {
                SoundSystem.playSuccess();
                SoundSystem.playPowerUp();
                level++;
                document.getElementById('maze-level').textContent = level;
                player = { x: 0, y: 0 };
                moves = 0;
                document.getElementById('maze-moves').textContent = moves;
                generateMaze();
            }
            
            drawMaze();
        } else {
            SoundSystem.playFailure();
        }
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') { e.preventDefault(); movePlayer(0, -1); }
        if (e.key === 'ArrowDown') { e.preventDefault(); movePlayer(0, 1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); movePlayer(-1, 0); }
        if (e.key === 'ArrowRight') { e.preventDefault(); movePlayer(1, 0); }
    });
    
    generateMaze();
    drawMaze();
}

// 51. Tower of Hanoi
function initTowerOfHanoi() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Tower of Hanoi</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value" id="hanoi-level">3</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Moves:</span>
                <span class="stat-value" id="hanoi-moves">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Min Moves:</span>
                <span class="stat-value" id="hanoi-min">7</span>
            </div>
        </div>
        <div style="text-align: center; margin: 20px 0;">
            <canvas id="hanoi-canvas" width="600" height="400"></canvas>
        </div>
        <div style="text-align: center; color: var(--text-accent); font-size: 24px;">
            Click on a tower to select, click another to move. Move all disks to the right tower!
        </div>
    `;
    
    const canvas = document.getElementById('hanoi-canvas');
    const ctx = canvas.getContext('2d');
    
    let level = 3;
    let moves = 0;
    let selectedTower = null;
    let towers = [[], [], []];
    
    function initTowers() {
        towers = [[], [], []];
        for (let i = level; i > 0; i--) {
            towers[0].push(i);
        }
        moves = 0;
        selectedTower = null;
        document.getElementById('hanoi-moves').textContent = moves;
        document.getElementById('hanoi-level').textContent = level;
        document.getElementById('hanoi-min').textContent = Math.pow(2, level) - 1;
        drawTowers();
    }
    
    function drawTowers() {
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const towerX = [100, 300, 500];
        const baseY = 350;
        
        // Draw tower poles
        ctx.fillStyle = '#666';
        for (let i = 0; i < 3; i++) {
            ctx.fillRect(towerX[i] - 5, 150, 10, 200);
            ctx.fillRect(towerX[i] - 80, baseY, 160, 10);
        }
        
        // Draw disks
        const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3', '#ff1493'];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < towers[i].length; j++) {
                const diskSize = towers[i][j];
                const width = diskSize * 20 + 20;
                const height = 20;
                const x = towerX[i] - width / 2;
                const y = baseY - (j + 1) * 25;
                
                ctx.fillStyle = colors[diskSize - 1];
                ctx.fillRect(x, y, width, height);
                ctx.strokeStyle = '#000';
                ctx.strokeRect(x, y, width, height);
                
                if (i === selectedTower) {
                    ctx.strokeStyle = '#00ff00';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(x - 2, y - 2, width + 4, height + 4);
                    ctx.lineWidth = 1;
                }
            }
        }
    }
    
    function getTowerFromX(x) {
        if (x < 200) return 0;
        if (x < 400) return 1;
        return 2;
    }
    
    function canMove(from, to) {
        if (towers[from].length === 0) return false;
        if (towers[to].length === 0) return true;
        return towers[from][towers[from].length - 1] < towers[to][towers[to].length - 1];
    }
    
    function checkWin() {
        if (towers[2].length === level) {
            const minMoves = Math.pow(2, level) - 1;
            const stars = moves <= minMoves ? '⭐⭐⭐' : moves <= minMoves * 1.5 ? '⭐⭐' : '⭐';
            
            SoundSystem.playSuccess();
            SoundSystem.playPowerUp();
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#00ff00';
            ctx.font = '48px VT323';
            ctx.textAlign = 'center';
            ctx.fillText('LEVEL COMPLETE!', canvas.width / 2, canvas.height / 2 - 40);
            ctx.fillStyle = '#ffffff';
            ctx.font = '32px VT323';
            ctx.fillText(`${stars} Moves: ${moves}/${minMoves}`, canvas.width / 2, canvas.height / 2 + 10);
            
            level++;
            setTimeout(initTowers, 2000);
        }
    }
    
    canvas.onclick = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const tower = getTowerFromX(x);
        
        if (selectedTower === null) {
            if (towers[tower].length > 0) {
                selectedTower = tower;
                SoundSystem.playClick();
                drawTowers();
            }
        } else {
            if (tower === selectedTower) {
                selectedTower = null;
                drawTowers();
            } else if (canMove(selectedTower, tower)) {
                const disk = towers[selectedTower].pop();
                towers[tower].push(disk);
                moves++;
                document.getElementById('hanoi-moves').textContent = moves;
                selectedTower = null;
                SoundSystem.playSuccess();
                drawTowers();
                checkWin();
            } else {
                SoundSystem.playFailure();
                selectedTower = null;
                drawTowers();
            }
        }
    };
    
    initTowers();
}

// 52. Reaction Chain
function initReactionChain() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Reaction Chain</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value" id="chain-level">1</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="chain-score">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Chain:</span>
                <span class="stat-value" id="chain-streak">0</span>
            </div>
        </div>
        <div style="text-align: center; margin: 20px 0;">
            <canvas id="chain-canvas" width="600" height="400"></canvas>
        </div>
        <div style="text-align: center; color: var(--text-accent); font-size: 24px;">
            Click the circles as fast as you can! Build your chain!
        </div>
    `;
    
    const canvas = document.getElementById('chain-canvas');
    const ctx = canvas.getContext('2d');
    
    let level = 1;
    let score = 0;
    let chain = 0;
    let circles = [];
    let gameActive = false;
    let timeLimit = 30;
    let timeLeft = timeLimit;
    
    class Circle {
        constructor() {
            this.radius = 30 - level * 2;
            this.x = this.radius + Math.random() * (canvas.width - this.radius * 2);
            this.y = this.radius + Math.random() * (canvas.height - this.radius * 2);
            this.speedX = (Math.random() - 0.5) * (2 + level * 0.5);
            this.speedY = (Math.random() - 0.5) * (2 + level * 0.5);
            this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
            this.lifetime = 3000 - level * 100;
            this.createdAt = Date.now();
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
                this.speedX *= -1;
                this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
            }
            if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
                this.speedY *= -1;
                this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
            }
        }
        
        draw() {
            const age = Date.now() - this.createdAt;
            const opacity = 1 - (age / this.lifetime);
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        
        isExpired() {
            return Date.now() - this.createdAt > this.lifetime;
        }
        
        contains(x, y) {
            const dx = x - this.x;
            const dy = y - this.y;
            return dx * dx + dy * dy <= this.radius * this.radius;
        }
    }
    
    function spawnCircle() {
        if (gameActive && circles.length < 5 + level) {
            circles.push(new Circle());
        }
    }
    
    function update() {
        if (!gameActive) return;
        
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        circles = circles.filter(c => !c.isExpired());
        
        circles.forEach(c => {
            c.update();
            c.draw();
        });
        
        // Check for expired circles (missed)
        const beforeCount = circles.length;
        circles = circles.filter(c => {
            if (c.isExpired()) {
                chain = 0;
                document.getElementById('chain-streak').textContent = chain;
                SoundSystem.playFailure();
                return false;
            }
            return true;
        });
        
        if (Math.random() < 0.02 * level) {
            spawnCircle();
        }
    }
    
    canvas.onclick = (e) => {
        if (!gameActive) {
            gameActive = true;
            startGame();
            return;
        }
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        for (let i = circles.length - 1; i >= 0; i--) {
            if (circles[i].contains(x, y)) {
                score += (1 + chain) * level;
                chain++;
                document.getElementById('chain-score').textContent = score;
                document.getElementById('chain-streak').textContent = chain;
                SoundSystem.playSuccess();
                circles.splice(i, 1);
                
                // Level up every 50 points
                if (score >= level * 50) {
                    level++;
                    document.getElementById('chain-level').textContent = level;
                    SoundSystem.playPowerUp();
                }
                break;
            }
        }
    };
    
    function startGame() {
        const timer = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timer);
                clearInterval(gameLoop);
                gameActive = false;
                
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#00ff00';
                ctx.font = '48px VT323';
                ctx.textAlign = 'center';
                ctx.fillText('TIME UP!', canvas.width / 2, canvas.height / 2 - 20);
                ctx.fillStyle = '#ffffff';
                ctx.font = '32px VT323';
                ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 30);
                ctx.fillText(`Level Reached: ${level}`, canvas.width / 2, canvas.height / 2 + 70);
            }
        }, 1000);
        
        spawnCircle();
        spawnCircle();
    }
    
    const gameLoop = setInterval(update, 1000 / 60);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '32px VT323';
    ctx.textAlign = 'center';
    ctx.fillText('Click to Start!', canvas.width / 2, canvas.height / 2);
}

// 53. Memory Pairs
function initMemoryPairs() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2 class="game-title">Memory Pairs</h2>
        <div class="game-stats">
            <div class="stat-item">
                <span class="stat-label">Level:</span>
                <span class="stat-value" id="pairs-level">1</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Pairs Found:</span>
                <span class="stat-value" id="pairs-found">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Moves:</span>
                <span class="stat-value" id="pairs-moves">0</span>
            </div>
        </div>
        <div id="pairs-grid" style="display: grid; gap: 10px; justify-content: center; margin: 40px auto;"></div>
    `;
    
    const symbols = ['🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎸', '🎹', '🎺', '🎻', '🏀', '⚽', '🏈', '⚾', '🎾', '🏐', '🏓', '🏸', '🏒', '🏑', '🥊', '🥋', '🎿', '⛷️'];
    
    let level = 1;
    let gridSize = 4; // 4x4 for level 1
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let canFlip = true;
    
    function initLevel() {
        const pairCount = (gridSize * gridSize) / 2;
        const selectedSymbols = symbols.slice(0, pairCount);
        const cardSymbols = [...selectedSymbols, ...selectedSymbols];
        cardSymbols.sort(() => Math.random() - 0.5);
        
        const grid = document.getElementById('pairs-grid');
        grid.style.gridTemplateColumns = `repeat(${gridSize}, 80px)`;
        grid.innerHTML = '';
        
        cards = [];
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        canFlip = true;
        
        document.getElementById('pairs-level').textContent = level;
        document.getElementById('pairs-found').textContent = matchedPairs;
        document.getElementById('pairs-moves').textContent = moves;
        
        cardSymbols.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.style.width = '80px';
            card.style.height = '80px';
            card.style.backgroundColor = 'var(--bg-secondary)';
            card.style.border = '3px solid var(--border-primary)';
            card.style.borderRadius = '8px';
            card.style.display = 'flex';
            card.style.alignItems = 'center';
            card.style.justifyContent = 'center';
            card.style.fontSize = '48px';
            card.style.cursor = 'pointer';
            card.style.transition = 'transform 0.3s';
            card.dataset.index = index;
            card.dataset.symbol = symbol;
            card.dataset.flipped = 'false';
            card.dataset.matched = 'false';
            card.textContent = '?';
            
            card.onclick = () => flipCard(card);
            grid.appendChild(card);
            cards.push(card);
        });
    }
    
    function flipCard(card) {
        if (!canFlip || card.dataset.flipped === 'true' || card.dataset.matched === 'true') {
            return;
        }
        
        card.dataset.flipped = 'true';
        card.textContent = card.dataset.symbol;
        card.style.backgroundColor = 'var(--bg-tertiary)';
        card.style.transform = 'rotateY(180deg)';
        flippedCards.push(card);
        SoundSystem.playClick();
        
        if (flippedCards.length === 2) {
            moves++;
            document.getElementById('pairs-moves').textContent = moves;
            canFlip = false;
            
            setTimeout(() => {
                if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
                    // Match found
                    flippedCards.forEach(c => {
                        c.dataset.matched = 'true';
                        c.style.backgroundColor = 'var(--color-success)';
                    });
                    matchedPairs++;
                    document.getElementById('pairs-found').textContent = matchedPairs;
                    SoundSystem.playSuccess();
                    
                    if (matchedPairs === (gridSize * gridSize) / 2) {
                        // Level complete
                        setTimeout(() => {
                            level++;
                            gridSize = Math.min(6, 4 + Math.floor((level - 1) / 2));
                            SoundSystem.playPowerUp();
                            initLevel();
                        }, 1000);
                    }
                } else {
                    // No match
                    flippedCards.forEach(c => {
                        c.dataset.flipped = 'false';
                        c.textContent = '?';
                        c.style.backgroundColor = 'var(--bg-secondary)';
                        c.style.transform = 'rotateY(0deg)';
                    });
                    SoundSystem.playFailure();
                }
                
                flippedCards = [];
                canFlip = true;
            }, 1000);
        }
    }
    
    initLevel();
}
