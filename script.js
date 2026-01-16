console.log("QuoLand has started!");

const state = {
  currentBiblicalIndex: 0,
  currentQuoteIndex: 0,
  viewedBiblicalQuotes: new Set(),
  viewedQuotes: new Set(),
  biblicalQuoteHistory: [],
  quoteHistory: [],
  isBibleMode: true,
  currentBiblicalSection: "oldTestament",
  currentInspirationalCategory: "inspirational",
  totalBiblicalQuotesViewed: 0,
  totalInspirationalQuotesViewed: 0,

  biblicalSequentialIndex: {
    oldTestament: 0,
    psalms: 0,
    newTestament: 0,
  },
  inspirationalSequentialIndex: {
    inspirational: 0,
    strengthening: 0,
    focus: 0,
  },
};

let quoteData = {
  biblical: {
    oldTestament: [],
    psalms: [],
    newTestament: [],
  },
  inspirational: {
    inspirational: [],
    strengthening: [],
    focus: [],
  },
};

let elements = {};

const musicState = {
  audioEl: null,
  isIntialized: false,
  isPlaying: false,
  currentPlaylistKey: "biblical",
  currentTrackIndex: 0,
  playlists: {
    biblical: [
      "./music/biblical/biblical-song-1.mp3",
      "./music/biblical/biblical-song-2.mp3",
      "./music/biblical/biblical-song-3.mp3",
      "./music/biblical/biblical-song-4.mp3",
      "./music/biblical/biblical-song-5.mp3",
      "./music/biblical/biblical-song-6.m4a",
      "./music/biblical/biblical-song-7.mp3",
      "./music/biblical/biblical-song-8.m4a",
      "./music/biblical/biblical-song-9.m4a",
      "./music/biblical/biblical-song-10.m4a",
    ],
    insiprational: [
      "./music/inspirational/inspirational-music-1.mp3",
      "./music/inspirational/inspirational-music-2.m4a",
      "./music/inspirational/inspirational-music-3.m4a",
      "./music/inspirational/inspirational-music-4.m4a",
      "./music/inspirational/inspirational-music-5.m4a",
      "./music/inspirational/inspirational-music-6.m4a",
      "./music/inspirational/inspirational-music-7.m4a",
      "./music/inspirational/inspirational-music-8.m4a",
      "./music/inspirational/inspirational-music-9.m4a",
      "./music/inspirational/inspirational-music-10.m4a",
    ],
  },
};

function getCurrentPlaylistKey() {
  return state.isBibleMode ? "biblical" : "inspirational";
}

function initializeMusicPlayer() {
  if (musicState.isInitialized) return;
  const audio = document.createElement("audio");
  audio.preload = "metadata";
  audio.volume = 0.3;
  audio.setAttribute("aria-hidden", "true");
  audio.style.display = "none";

  audio.addEventListener("ended", () => {
    playNextTrack();
  });

  document.body.appendChild(audio);
  musicState.audioEl = audio;
  musicState.isIntialized = true;
  musicState.currentPlaylistKey = getCurrentPlaylistKey();
  musicState.currentTrackIndex = 0;
  if (elements.musicWrap) {
    elements.musicWrap.classList.toggle("playing", musicState.isPlaying);
  }
}

function loadCurrentTrack() {
  const key = musicState.currentPlaylistKey;
  const playlist = musicState.playlists[key] || [];
  if (!musicState.audioEl || playlist.length === 0) return false;

  if (
    musicState.currentTrackIndex < 0 ||
    musicState.currentTrackIndex >= playlist.length
  ) {
    musicState.currentTrackIndex = 0;
  }
  musicState.audioEl.src = playlist[musicState.currentTrackIndex];
  return true;
}

function playCurrentTrack() {
  if (!loadCurrentTrack()) return; 
  musicState.audioEl
    .play()
    .then(() => {
      musicState.isPlaying = true;
      if (elements.musicToggle) {
        elements.musicToggle.classList.add("playing");
        const icon = elements.musicToggle.querySelector("i");
        if (icon) icon.className = "fas fa-pause";
      }
      if (elements.musicWrap) {
        elements.musicWrap.classList.add("playing");
      }
    })
    .catch((err) => {
      console.warn("Unable to autoplay music:", err);
    });
}

function pauseMusic() {
  if (!musicState.audioEl) return;
  musicState.audioEl.pause();
  musicState.isPlaying = false;
  if (elements.musicToggle) {
    elements.musicToggle.classList.remove("playing");
    const icon = elements.musicToggle.querySelector("i");
    if (icon) icon.className = "fas fa-music";
  }
  if (elements.musicWrap) {
    elements.musicWrap.classList.remove("playing");
  }
}

function playNextTrack() {
  const key = musicState.currentPlaylistKey;
  const playlist = musicState.playlists[key] || [];
  if (playlist.length === 0) return;
  musicState.currentTrackIndex =
    (musicState.currentTrackIndex + 1) % playlist.length;
  if (musicState.isplaying) {
    playCurrentTrack();
  } else {
    loadCurrentTrack();
  }
}

function switchPlaylistIfNeeded() {
  const desiredKey = getCurrentPlaylistKey();
  if (musicState.currentPlaylistKey !== desiredKey) {
    musicState.currentPlaylistKey = desiredKey;

    musicState.currentTrackIndex = 0;
    if (musicState.isPlaying) {
      playCurrentTrack();
    } else {
      loadCurrentTrack();
    }
  }
}

function toggleMusic() {
  initializeMusicPlayer();
  switchPlaylistIfNeeded();

  if (!musicState.isPlaying) {
    playCurrentTrack();
  } else {
    pauseMusic();
  }
}

function initializeElements() {
  elements = {
    quoteText: document.getElementById("quote-text"),
    quoteRef: document.getElementById("quote-ref"),
    userInput: document.getElementById("user-input"),
    submitBtn: document.getElementById("submit-btn"),
    preBtn: document.getElementById("prev-btn"),
    nextBtn: document.getElementById("next-btn"),
    quoteCount: document.getElementById("quote-count"),
    currentIndex: document.getElementById("current-index"),
    quoteCard: document.querySelector(".quote-card"),
    actionBtn: document.querySelectorAll(".action-btn"),
    themeToggle: document.getElementById("theme-toggle"),
    musicToggle: document.getElementById("music-toggle"),
    musicPrev: document.getElementById("music-prev"),
    musicNext: document.getElementById("music-next"),
    musicWrap: document.getElementById("music-wrap"),
  };
}

async function loadQuoteData() {
  try {
    const [oldTestament, newTestament, pslams] = await Promise.all([
      fetch("./quote-data/biblical/old-testament.json").then((r) => r.json()),
      fetch("./quote-data/biblical/new-testament.json").then((r) => r.json),
      fetch("./quote-data/biblical/pslams.json").then((r) => r.json()),
    ]);

    const normalizeBiblical = (arr) =>
    (arr || [])
      .filter((q) => q && typeof q.text === "string")
      .map((q) => ({
        text: String(q.text).trim(),
        reference: String(q.reference || "").trim(),
      }));

      quoteData.biblical.oldTestament = normalizeBiblical(oldTestament);
      quoteData.biblical.newTestament = normalizeBiblical(newTestament);
      quoteData.biblical.pslams = normalizeBiblical(psalms);

      const [inspirational, strengthening, focus] = await Promise.all([
        fetch("./quote-data/inspirational/inspirational-quotes.json").then((r) => r.json()),
        fetch("./quote-data/inspirational/strenghtening-quotes.json").then((r)=>r.json),
        fetch("./quote-data/inspirational/strenghtening-quotes.json").then((r)=>r.json),
      ]);

      const normalizeInspirational = (arr) =>
      (arr || [])
        .filter((q) => q && typeof q.text === "string")
        .map((q) => ({
          text: String(q.text).trim(),
          author: String(q.author || q.reference || "Unknow").trim() || "Unknown",
        }));

        quoteData.inspirational.inspirational = normalizeInspirational(inspirational);
        quoteData.inspirational.strengthening = normalizeInspirational(strengthening);
        quoteData.inspirational.focus = normalizeInspirational(focus);
  } catch {
    console.error("❌ Error loading quote data:", error);
  }
}

function displayQuote(quote, reference) {
  
}