// Liste des vidéos
const videos = [
    'Video/VIDEO0.mp4',
    'Video/VIDEO1.mp4',
    'Video/VIDEO2.mp4',
    'Video/VIDEO3.mp4',
    'Video/VIDEO4.mp4',
    'Video/VIDEO5.mp4',
    'Video/VIDEO6.mp4',
    'Video/VIDEO7.mp4',
    'Video/VIDEO8.mp4',
    'Video/VIDEO9.mp4',
    'Video/VIDEO10.mp4',
    'Video/VIDEO11.mp4',
    'Video/VIDEO12.mp4'
    // Ajoutez autant de vidéos que vous voulez
];

let currentVideoIndex = 0;

// Fonction pour charger une vidéo
function loadVideo(index) {
    const video = document.getElementById('mainVideo');
    const counter = document.getElementById('videoCounter');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const endMessage = document.getElementById('endMessage');
    
    if (index >= 0 && index < videos.length) {
        currentVideoIndex = index;
        video.src = videos[index];
        video.load();
        
        // Lancer automatiquement avec son
        video.muted = false; // Activer le son
        video.play().catch(e => {
            console.log('Video playback failed, trying with muted:', e);
            // Si ça échoue, essayer en mute puis réactiver le son
            video.muted = true;
            video.play().then(() => {
                video.muted = false;
            });
        });
        
        // Cacher le message de fin
        endMessage.classList.remove('show');
        
        // Mettre à jour le compteur
        counter.textContent = `${index + 1} / ${videos.length}`;
        
        // Gérer l'état des boutons
        prevBtn.disabled = (index === 0);
        nextBtn.disabled = (index === videos.length - 1);
    }
}

// Vidéo suivante
function nextVideo() {
    if (currentVideoIndex < videos.length - 1) {
        loadVideo(currentVideoIndex + 1);
    }
}

// Vidéo précédente
function previousVideo() {
    if (currentVideoIndex > 0) {
        loadVideo(currentVideoIndex - 1);
    }
}

// Mettre à jour la barre de progression
function updateProgress() {
    const video = document.getElementById('mainVideo');
    const progressFill = document.getElementById('progressFill');
    
    if (video.duration) {
        const progress = (video.currentTime / video.duration) * 100;
        progressFill.style.width = progress + '%';
    }
}

// Quand une vidéo se termine, passer à la suivante automatiquement
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('mainVideo');
    const endMessage = document.getElementById('endMessage');
    
    video.addEventListener('ended', function() {
        console.log('Video ended, playing next...');
        if (currentVideoIndex < videos.length - 1) {
            setTimeout(() => {
                nextVideo();
            }, 500); // Petite pause de 0.5s avant la vidéo suivante
        } else {
            console.log('All videos finished!');
            // Afficher le message de fin
            endMessage.classList.add('show');
        }
    });
    
    // Mettre à jour la barre de progression
    video.addEventListener('timeupdate', updateProgress);
    
    // Clic sur la vidéo = vidéo suivante
    video.addEventListener('click', function(e) {
        if (currentVideoIndex < videos.length - 1) {
            nextVideo();
        }
    });
});
document.getElementById('page1').addEventListener('click', function(e) {
    console.log('CLICK PAGE 1');
    
    // Play click sound
    const clickSound = document.getElementById('sound1');
    clickSound.currentTime = 0; // Reset to start
    clickSound.play().catch(err => console.log('Audio playback failed:', err));
    
    // Get click position
    const x = e.clientX;
    const y = e.clientY;
    
    // Create 3 ripple circles
    const ripple1 = document.createElement('div');
    ripple1.className = 'click-ripple ripple-1';
    ripple1.style.left = x + 'px';
    ripple1.style.top = y + 'px';
    document.body.appendChild(ripple1);
    
    const ripple2 = document.createElement('div');
    ripple2.className = 'click-ripple ripple-2';
    ripple2.style.left = x + 'px';
    ripple2.style.top = y + 'px';
    document.body.appendChild(ripple2);
    
    const ripple3 = document.createElement('div');
    ripple3.className = 'click-ripple ripple-3';
    ripple3.style.left = x + 'px';
    ripple3.style.top = y + 'px';
    document.body.appendChild(ripple3);
    
    // Remove ripples after animation
    setTimeout(() => {
        ripple1.remove();
        ripple2.remove();
        ripple3.remove();
    }, 1300);
    
    // Create 8 burst lines
    for (let i = 0; i < 8; i++) {
        const burst = document.createElement('div');
        burst.className = 'click-burst';
        burst.style.left = x + 'px';
        burst.style.top = y + 'px';
        const angle = (360 / 8) * i;
        burst.style.transform = `rotate(${angle}deg) translateY(0)`;
        burst.style.animation = 'burst-out 0.8s ease-out forwards';
        document.body.appendChild(burst);
        
        setTimeout(() => burst.remove(), 800);
    }
    
    // Transition to page 2
    setTimeout(() => {
        changePage(1, 2);
        
        // Play sound2 AFTER transition (when form appears)
        setTimeout(() => {
            const sound2 = document.getElementById('sound2');
            sound2.currentTime = 0;
            sound2.play().catch(err => console.log('Sound2 playback failed:', err));
        }, 750); // 750ms = quand la page 2 est visible
        
    }, 400);
});

// Input validation
document.getElementById('nameInput').addEventListener('input', function(e) {
    const val = e.target.value;
    const onlyLetters = /^[a-zA-ZÀ-ÿ\s]*$/;
    
    if (!onlyLetters.test(val)) {
        e.target.value = val.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
        document.getElementById('errorMsg').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errorMsg').style.display = 'none';
        }, 2000);
    }
});

// Go to page 3
function goToPage3() {
    const name = document.getElementById('nameInput').value.trim();
    
    if (name.length === 0) {
        document.getElementById('errorMsg').textContent = '⚠️ Please enter your name';
        document.getElementById('errorMsg').style.display = 'block';
        return;
    }
    
    console.log('Name:', name);
    
    // Stop sound2 before transition
    const sound2 = document.getElementById('sound2');
    sound2.pause();
    sound2.currentTime = 0;
    
    changePage(2, 3);
    
    // Play sound3 AFTER transition to page 3
    setTimeout(() => {
        const sound3 = document.getElementById('sound3');
        sound3.currentTime = 0;
        sound3.play().catch(e => console.log('Sound3 playback failed:', e));
        
        // Charger la première vidéo
        loadVideo(0);
    }, 750);
}

// Page change function
function changePage(from, to) {
    console.log(`Change: page ${from} -> page ${to}`);
    
    const transition = document.getElementById('transition');
    transition.classList.add('active');
    
    setTimeout(() => {
        document.getElementById('page' + from).classList.remove('active');
        document.getElementById('page' + to).classList.add('active');
        console.log('Active page:', to);
    }, 750);
    
    setTimeout(() => {
        transition.classList.remove('active');
    }, 1500);
}

// Enter to submit
document.getElementById('nameInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        goToPage3();
    }
});