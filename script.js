/* =================================
   KONFIGURASI NAMA
================================= */

// Ganti sesuai nama pacar dan nama kamu.
const namaPacar = "My Favorite Person";
const namaKamu = "Your Favorite Person";

// Tampilkan nama pada website.
document.getElementById("heroName").textContent = namaPacar;
document.getElementById("senderName").textContent = namaKamu;
document.title = `Happy Birthday, ${namaPacar}! 💗`;


/* =================================
   ANIMASI HATI MELAYANG
================================= */

const floatingContainer = document.getElementById("floating-elements");
const simbol = ["💗", "💕", "♡", "✨", "🌸", "💖"];

function buatHati() {
    const item = document.createElement("span");

    item.className = "float-item";
    item.textContent = simbol[Math.floor(Math.random() * simbol.length)];

    item.style.left = Math.random() * 100 + "vw";
    item.style.fontSize = (14 + Math.random() * 20) + "px";
    item.style.animationDuration = (7 + Math.random() * 7) + "s";

    floatingContainer.appendChild(item);

    setTimeout(() => item.remove(), 15000);
}

// Hati muncul secara berkala.
setInterval(buatHati, 700);


/* =================================
   TOMBOL BUKA KEJUTAN
================================= */

document.getElementById("startBtn").addEventListener("click", () => {
    ledakanKonfeti(45);

    document.getElementById("birthday").scrollIntoView({
        behavior: "smooth"
    });
});


/* =================================
   TIUP LILIN
================================= */

let lilinSudahDitiup = false;

document.getElementById("blowBtn").addEventListener("click", function () {
    const caption = document.getElementById("cakeCaption");
    const candles = document.querySelectorAll(".candle");

    if (!lilinSudahDitiup) {
        lilinSudahDitiup = true;

        candles.forEach((lilin) => {
            lilin.textContent = "💨";
            lilin.style.animation = "none";
        });

        caption.textContent =
            "Yeyyy! Semoga semua harapanmu menjadi nyata! 💖";

        this.textContent = "Nyalakan Lagi ✨";
        ledakanKonfeti(70);
    } else {
        lilinSudahDitiup = false;

        candles.forEach((lilin) => {
            lilin.textContent = "🕯️";
            lilin.style.animation = "";
        });

        caption.textContent = "Make a wish, birthday girl! 💕";
        this.textContent = "Tiup Lilinnya! 🌬️";
    }
});


/* =================================
   BUKA SURAT CINTA
================================= */

const letterBtn = document.getElementById("letterBtn");
const letterCard = document.getElementById("letterCard");

letterBtn.addEventListener("click", () => {
    const suratTerbuka = !letterCard.classList.contains("hidden");

    if (suratTerbuka) {
        letterCard.classList.add("hidden");
        letterBtn.querySelector("span:nth-child(2)").textContent =
            "Klik untuk membuka surat";
    } else {
        letterCard.classList.remove("hidden");
        letterBtn.querySelector("span:nth-child(2)").textContent =
            "Surat sudah terbuka 💗";

        ledakanKonfeti(35);

        setTimeout(() => {
            letterCard.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 150);
    }
});


/* =================================
   KEJUTAN TERAKHIR
================================= */

document.getElementById("surpriseBtn").addEventListener("click", function () {
    const message = document.getElementById("finalMessage");

    message.classList.remove("hidden");
    this.textContent = "Surprise unlocked! 💝";

    // Cegah tombol membuat animasi berulang kali.
    this.disabled = true;
    this.style.opacity = "0.75";

    ledakanKonfeti(150);

    setTimeout(() => {
        message.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 150);
});


/* =================================
   EFEK KONFETI
================================= */

function ledakanKonfeti(jumlah = 50) {
    const warna = [
        "#ff72b6",
        "#a78bfa",
        "#ffd166",
        "#ff9f9f",
        "#9be7c4",
        "#ffffff"
    ];

    for (let i = 0; i < jumlah; i++) {
        const partikel = document.createElement("span");

        partikel.className = "confetti";
        partikel.textContent = Math.random() > 0.5 ? "●" : "♥";

        partikel.style.left = Math.random() * 100 + "vw";
        partikel.style.color =
            warna[Math.floor(Math.random() * warna.length)];

        partikel.style.fontSize = (7 + Math.random() * 12) + "px";
        partikel.style.animationDuration = (2 + Math.random() * 3) + "s";
        partikel.style.animationDelay = Math.random() * 0.8 + "s";

        document.body.appendChild(partikel);

        setTimeout(() => partikel.remove(), 6500);
    }
}


/* =================================
   MUSIK MELODI SEDERHANA
================================= */

// Melodi dibuat dengan Web Audio API.
// Tidak membutuhkan file musik eksternal.

let audioContext = null;
let musicTimer = null;
let musicAktif = false;
let nadaIndex = 0;

const musicBtn = document.getElementById("musicBtn");

const nada = [
    [523.25, 0.25],
    [659.25, 0.25],
    [783.99, 0.5],
    [659.25, 0.25],
    [698.46, 0.25],
    [783.99, 0.5],
    [880.00, 0.25],
    [783.99, 0.25],
    [659.25, 0.5],
    [587.33, 0.5]
];

function mainkanNada() {
    if (!musicAktif || !audioContext) return;

    const [frekuensi, durasi] = nada[nadaIndex % nada.length];
    const oscillator = audioContext.createOscillator();
    const volume = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frekuensi;

    volume.gain.setValueAtTime(0.0001, audioContext.currentTime);
    volume.gain.exponentialRampToValueAtTime(
        0.045,
        audioContext.currentTime + 0.04
    );
    volume.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + durasi * 0.85
    );

    oscillator.connect(volume);
    volume.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + durasi);

    nadaIndex++;

    musicTimer = setTimeout(mainkanNada, durasi * 1000);
}

musicBtn.addEventListener("click", async () => {
    if (!audioContext) {
        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) {
            musicBtn.textContent = "Musik tidak didukung";
            return;
        }

        audioContext = new AudioContextClass();
    }

    if (musicAktif) {
        musicAktif = false;
        clearTimeout(musicTimer);

        if (audioContext.state === "running") {
            await audioContext.suspend();
        }

        musicBtn.classList.remove("playing");
        musicBtn.innerHTML = "♫ <span>Music Off</span>";
    } else {
        await audioContext.resume();

        musicAktif = true;
        musicBtn.classList.add("playing");
        musicBtn.innerHTML = "♫ <span>Music On</span>";

        mainkanNada();
    }
});
