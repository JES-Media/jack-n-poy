class SoundEffect {
    playSound(url) {
        var ourAudio = document.createElement('audio'); // Create a audio element using the DOM
        ourAudio.style.display = "none"; // Hide the audio element
        ourAudio.src = url; // Set resource to our URL
        ourAudio.autoplay = true; // Automatically play sound
        ourAudio.onended = function () {
            this.remove(); // Remove when played.
        };
        document.body.appendChild(ourAudio);
    }
    playAgain() {
        this.playSound('./assets/sound-effects/interface-124464.mp3');
    }
    pickChoice() {
        this.playSound('./assets/sound-effects/click-124467.mp3');
    }
    lose() {
        this.playSound('./assets/sound-effects/fail-144746.mp3');
    }
    win() {
        this.playSound('./assets/sound-effects/success-1-6297.mp3');
    }
    draw() {
        this.playSound('./assets/sound-effects/knife-slice-41231.mp3');
    }
    loseFinished() {
        this.playSound('./assets/sound-effects/080047_lose_funny_retro_video-game-80925.mp3');
    }
    winFinished() {
        this.playSound('./assets/sound-effects/success-fanfare-trumpets-6185.mp3');
    }
}