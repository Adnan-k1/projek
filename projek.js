const playButtons = document.querySelectorAll(".play-button");
const audioPlayer = document.getElementById("audio-player");
const searchBar = document.getElementById("search-bar");
const songs = document.querySelectorAll(".song");
let currentPlaying = null;

// Fungsi untuk memainkan atau menjeda lagu
playButtons.forEach(button => {
    button.addEventListener("click", function () {
        const songElement = this.closest(".song");
        let songSrc = songElement.getAttribute("data-src");
        const img = this.querySelector("img");

        if (!songSrc) {
            console.error("Atribut data-src tidak ditemukan!");
            return;
        }

        songSrc = encodeURI(songSrc);

        // Jika lagu yang sama sedang dimainkan, toggle play/pause
        if (audioPlayer.src.includes(songSrc)) {
            if (audioPlayer.paused) {
                audioPlayer.play();
                img.src = "pause.png";
            } else {
                audioPlayer.pause();
                img.src = "play.png";
            }
        } else {
            // Ganti lagu baru
            audioPlayer.src = songSrc;
            audioPlayer.play();

            resetButtons();
            img.src = "pause.png";
            currentPlaying = this;
        }
    });
});

// Reset tombol saat lagu berhenti
audioPlayer.addEventListener("ended", function () {
    if (currentPlaying) {
        currentPlaying.querySelector("img").src = "play.png";
    }
});

// Fungsi untuk mereset tombol Play
function resetButtons() {
    playButtons.forEach(button => {
        button.querySelector("img").src = "play.png";
    });
}

// Fungsi pencarian lagu
searchBar.addEventListener("input", function () {
    const searchText = searchBar.value.toLowerCase();
    songs.forEach(song => {
        const title = song.querySelector(".song-title").innerText.toLowerCase();
        const artist = song.querySelector(".song-artist").innerText.toLowerCase();

        if (title.includes(searchText) || artist.includes(searchText)) {
            song.style.display = "flex"; // Tampilkan lagu jika cocok
        } else {
            song.style.display = "none"; // Sembunyikan lagu jika tidak cocok
        }
    });
});