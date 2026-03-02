// Configuration
const AGE = 19;
const SWEET_MESSAGES = [
    "สุขสันต์วันเกิดนะคนเก่งของเค้า ✨",
    "ขอให้ปีนี้เป็นปีที่ใจดีกับเธอนะ ❤️",
    "รักเธอมากๆ ที่สุดเลยนะคะ 🌸",
    "ขอบคุณที่คอยดูแลเค้ามาตลอดนะคะ รักนะ 🎉",
    "อยู่ด้วยกันไปนานๆเลยนะคะ 🎂",
    "เค้าจะอยู่ข้างๆเธอแบบนี้ตลอดไปนะคะ 💖",
    "อย่าฝืนตัวเองมากน้าา เค้าเป็นห่วงนะ 🥺"
];

const IMAGES = {
    normal: [
        'img/main/IMG_20250306_161647.jpg',
        'img/cute/1729173420098.jpg',
        'img/cute/1752515949039.jpg',
        'img/cute/1752515962568.jpg',
        'img/cute/1752515981514.jpg',
        'img/cute/1752516003720.jpg',
        'img/cute/1752516026491.jpg',
        'img/cute/1752516046216.jpg',
        'img/cute/1755185601297.jpg',
        'img/cute/IMG_20240301_223351_554.jpg',
        'img/cute/IMG_20241016_182404_254.webp',
        'img/cute/IMG_20241017_141834_569.webp',
        'img/cute/IMG_20241201_192828.jpg',
        'img/cute/IMG_20250131_183226.jpg',
        'img/cute/IMG_20250918_162128.jpg',
        'img/cute/IMG_20250918_162151.jpg',
        'img/cute/IMG_20251231_202739.jpg',
        'img/cute/IMG_20251231_213121.jpg',
        'img/cute/IMG_20251231_214011.jpg',
        'img/cute/IMG_20251231_220310.jpg',
        'img/cute/IMG_20251231_220501.jpg',
        'img/cute/IMG_20251231_220503.jpg',
        'img/cute/IMG_20251231_220505.jpg',
        'img/cute/IMG_20251231_220508.jpg',
        'img/cute/IMG_20251231_220956.jpg',
        'img/cute/IMG_20251231_221000.jpg',
        'img/cute/IMG_20251231_221005.jpg',
        'img/cute/IMG_20251231_221011.jpg',
        'img/cute/IMG_20251231_221012.jpg',
        'img/cute/IMG_20251231_221013.jpg',
        'img/cute/image.png',
        'img/last/received_663625935619466.jpg'
    ],
    private: [
        'img/private/1755185612107.jpg',
        'img/private/1755185632213.jpg',
        'img/private/1755185634776.jpg',
        'img/private/1755185636453.jpg',
        'img/private/1755185637760.jpg',
        'img/private/1755185641504.jpg',
        'img/private/1755185644116.jpg',
        'img/private/1755186059180.jpg',
        'img/private/1755186060412.jpg',
        'img/private/1758812223072.jpg',
        'img/private/1758812227923.jpg',
        'img/private/1758812229767.jpg',
        'img/private/IMG_20240922_211359_092.webp',
        'img/private/IMG_20241016_182344_163.webp',
        'img/private/IMG_20241017_152405.jpg'
    ]
};

// State
let litCandles = 0;
let isAlbumUnlocked = false;
let giftOpened = false;
let isWaitingToClose = false;
let firstPlay = true;
const START_TIME = 30;
const END_TIME = 58;

// Initialize
window.onload = () => {
    generateCandles();
    startHeartRain();
    setupCandleInteractions();
    setupMusicPlayer();
};

function openGift() {
    if (giftOpened) return; // Prevent multiple clicks
    giftOpened = true;

    const overlay = document.getElementById('gift-overlay');
    const content = document.getElementById('main-content');
    const musicPlayer = document.getElementById('music-player');

    overlay.classList.add('open');
    content.classList.remove('hidden');

    // Show music player
    if (musicPlayer) musicPlayer.classList.remove('hidden');

    // Attempt to play music with a slight delay
    setTimeout(playMusic, 500);

    setTimeout(() => {
        overlay.style.display = 'none';
    }, 800);
}

function generateCandles() {
    const candleBox = document.getElementById('candle-box');
    candleBox.innerHTML = '';
    for (let i = 0; i < AGE; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';
        const flame = document.createElement('div');
        flame.className = 'flame';
        candle.appendChild(flame);
        candleBox.appendChild(candle);
    }
}

function setupCandleInteractions() {
    const candleBox = document.getElementById('candle-box');
    const handleAction = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const target = document.elementFromPoint(clientX, clientY);
        if (target && target.classList.contains('candle')) {
            lightCandle(target);
        }
    };

    candleBox.addEventListener('mousemove', (e) => {
        if (e.buttons === 1 || e.buttons === 0) handleAction(e);
    });
    candleBox.addEventListener('touchmove', handleAction);
    candleBox.addEventListener('touchstart', handleAction);
}

function lightCandle(candleElement) {
    if (!candleElement.classList.contains('lit')) {
        candleElement.classList.add('lit');
        litCandles++;
        createHeartAt(candleElement);
        if (litCandles >= 10 && !isAlbumUnlocked) unlockAlbum();
    }
}

function unlockAlbum() {
    isAlbumUnlocked = true;
    document.getElementById('album-section').classList.add('show');
    document.getElementById('final-section').classList.add('show');
    document.getElementById('game-section').classList.add('show'); // Reveal the game too
    document.getElementById('instruction-text').innerText = "เทียนถูกจุดแล้ว! Happy Birthday นะค้าบ ❤️";
    filterAlbum('normal');
}

function filterAlbum(category) {
    const slider = document.getElementById('album-slider');
    const buttons = document.querySelectorAll('.nav-btn');

    buttons.forEach(btn => {
        const text = btn.innerText;
        btn.classList.toggle('active', (category === 'normal' && text.includes('ปกติ')) || (category === 'private' && text.includes('ส่วนตัว')));
    });

    slider.innerHTML = '';
    // Use triple for long smooth slider loop
    const list = [...IMAGES[category], ...IMAGES[category], ...IMAGES[category]];
    list.forEach(src => {
        const item = document.createElement('div');
        item.className = 'album-item';
        item.innerHTML = `<img src="${src}" alt="Memory">`;
        item.onclick = (e) => {
            e.stopPropagation();
            expandImage(src);
        };
        slider.appendChild(item);
    });
}

function expandImage(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const quoteBox = document.getElementById('random-quote');

    lightboxImg.src = src;
    quoteBox.innerText = SWEET_MESSAGES[Math.floor(Math.random() * SWEET_MESSAGES.length)];

    lightbox.classList.remove('hidden');

    // Extra celebration burst
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, i * 80);
    }
}

function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
}

function startHeartRain() {
    setInterval(createHeart, 800);
}

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '-50px';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.opacity = Math.random();
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

function createHeartAt(element) {
    const rect = element.getBoundingClientRect();
    const spark = document.createElement('div');
    spark.className = 'heart';
    spark.innerHTML = '✨';
    spark.style.left = rect.left + 'px';
    spark.style.top = rect.top + 'px';
    spark.style.animation = 'fall 1s ease-out forwards';
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 1000);
}

// Music functions
function setupMusicPlayer() {
    const music = document.getElementById('bg-music');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeText = document.getElementById('current-time');
    const durationTimeText = document.getElementById('duration-time');

    // Update duration when metadata is loaded
    music.addEventListener('loadedmetadata', () => {
        durationTimeText.innerText = formatTime(music.duration);
        progressBar.max = music.duration;
    });

    // Update progress bar and time as song plays
    music.addEventListener('timeupdate', () => {
        if (!isSeeking) {
            progressBar.value = music.currentTime;
            currentTimeText.innerText = formatTime(music.currentTime);
        }

        // Auto-pause at END_TIME and handle closing
        if (music.currentTime >= END_TIME) {
            music.pause();
            music.currentTime = END_TIME; // Snap to 55s
            document.getElementById('play-icon').innerText = '▶️';

            if (isWaitingToClose) {
                triggerCloseSequence();
            }
        }
    });

    // Set initial volume to 30%
    music.volume = 0.3;

    // Handle song end
    music.addEventListener('ended', () => {
        document.getElementById('play-icon').innerText = '▶️';
    });
}

let isSeeking = false;
function seekMusic() {
    const music = document.getElementById('bg-music');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeText = document.getElementById('current-time');

    isSeeking = true;
    music.currentTime = progressBar.value;
    currentTimeText.innerText = formatTime(music.currentTime);
    isSeeking = false;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function toggleMusic() {
    const music = document.getElementById('bg-music');
    const playIcon = document.getElementById('play-icon');

    if (music.paused) {
        playMusic();
    } else {
        music.pause();
        playIcon.innerText = '▶️';
    }
}

function playMusic() {
    const music = document.getElementById('bg-music');
    const playIcon = document.getElementById('play-icon');

    if (!music) return;

    // Reset if already playing or interrupted
    if (firstPlay) {
        music.currentTime = START_TIME;
        firstPlay = false;
    }

    music.play().then(() => {
        playIcon.innerText = '⏸️';
        const durationTimeText = document.getElementById('duration-time');
        const progressBar = document.getElementById('progress-bar');
        if (durationTimeText && durationTimeText.innerText === '0:00') {
            durationTimeText.innerText = formatTime(music.duration);
            progressBar.max = music.duration;
        }
    }).catch(err => {
        if (err.name === 'NotAllowedError') {
            console.warn("Auto-play blocked by browser. User must interact first.");
        } else if (err.name === 'AbortError') {
            console.log("Playback was interrupted, skipping...");
        } else {
            console.error("Audio error:", err);
            // Non-blocking alert to inform user about music path
            console.warn("Could not find music.mp3 at path: suprise-gift/song/music.mp3");
        }
        playIcon.innerText = '▶️';
    });
}

// "Do You Love Me?" Game Logic
let yesScale = 1;

function moveNo() {
    const noBtn = document.getElementById('no-btn');
    const container = document.querySelector('.game-buttons');
    const containerRect = container.getBoundingClientRect();

    // Calculate boundaries relative to container
    const maxWidth = containerRect.width - noBtn.offsetWidth;
    const maxHeight = containerRect.height - noBtn.offsetHeight;

    const randomX = Math.floor(Math.random() * maxWidth);
    const randomY = Math.floor(Math.random() * maxHeight);

    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    // Every time they try to hit No, Yes gets a bit bigger
    growYes();
}

function growYes() {
    const yesBtn = document.getElementById('yes-btn');
    yesScale += 0.15;
    yesBtn.style.transform = `scale(${yesScale})`;
}

function handleYes() {
    isWaitingToClose = true;
    const music = document.getElementById('bg-music');

    // First stage: Sweet message
    alert("เค้าก็รักเธอเหมือนกันนนน ❤️");

    // If music is already at or past the end time, or paused, close immediately
    if (music.currentTime >= END_TIME || music.paused) {
        triggerCloseSequence();
    } else {
        // Otherwise, wait for the music to reach END_TIME (handled in timeupdate)
        console.log(`Waiting for music to reach ${formatTime(END_TIME)} before closing...`);
    }
}

function triggerCloseSequence() {
    const overlay = document.getElementById('close-app-overlay');
    // Important: remove 'hidden' so 'display: none' is gone, then 'active' handles opacity/visibility
    overlay.classList.remove('hidden');
    overlay.classList.add('active');

    setTimeout(() => {
        console.log("App Closed successfully.");
    }, 4000);
}
