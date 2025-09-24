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
  isInitialized: false,
  isPlaying: false,
  currentPlaylistKey: "biblical",
  currentTrackIndex: 0,
  playlists: {
    biblical: [
      "./music/biblical/Biblical_Song_1.mp3",
      "./music/biblical/Biblical_Song_2.mp3",
      "./music/biblical/Biblical_Song_3.mp3",
      "./music/biblical/Biblical_Song_4.mp3",
      "./music/biblical/Biblical_Song_5.mp3",
      "./music/biblical/Biblical_Song_6.m4a",
      "./music/biblical/Biblical_Song_7.mp3",
      "./music/biblical/Biblical_Song_8.m4a",
      "./music/biblical/Biblical_Song_9.m4a",
      "./music/biblical/Biblical_Song_10.m4a",
    ],
    inspirational: [
      "./music/inspirational/inspiration_music_1.mp3",
      "./music/inspirational/inspiration_music_2.m4a",
      "./music/inspirational/inspiration_music_3.m4a",
      "./music/inspirational/inspiration_music_4.m4a",
      "./music/inspirational/inspiration_music_5.m4a",
      "./music/inspirational/inspiration_music_6.m4a",
      "./music/inspirational/inspiration_music_7.m4a",
      "./music/inspirational/inspiration_music_8.m4a",
      "./music/inspirational/inspiration_music_9.m4a",
      "./music/inspirational/inspiration_music_10.m4a",
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
  audio.volume = 0.35;
  audio.setAttribute("aria-hidden", "true");
  audio.style.display = "none";

  audio.addEventListener("ended", () => {
    playNextTrack();
  });

  document.body.appendChild(audio);
  musicState.audioEl = audio;
  musicState.isInitialized = true;
  musicState.currentPlaylistKey = getCurrentPlaylistKey();
  musicState.currentTrackIndex = 0;
  // Ensure CSS state sync
  if (elements.musicWrap) {
    elements.musicWrap.classList.toggle("playing", musicState.isPlaying);
  }
}

function loadCurrentTrack() {
  const key = musicState.currentPlaylistKey;
  const playlist = musicState.playlists[key] || [];
  if (!musicState.audioEl || playlist.length === 0) return false;
  // Guard index
  if (musicState.currentTrackIndex < 0 || musicState.currentTrackIndex >= playlist.length) {
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
  musicState.currentTrackIndex = (musicState.currentTrackIndex + 1) % playlist.length;
  if (musicState.isPlaying) {
    playCurrentTrack();
  } else {
    loadCurrentTrack();
  }
}

function switchPlaylistIfNeeded() {
  const desiredKey = getCurrentPlaylistKey();
  if (musicState.currentPlaylistKey !== desiredKey) {
    musicState.currentPlaylistKey = desiredKey;
    // Start from a deterministic but different index to vary mood
    musicState.currentTrackIndex = 0;
    if (musicState.isPlaying) {
      playCurrentTrack();
    } else {
      loadCurrentTrack();
    }
  }
}

function toggleMusic() {
  console.log("🎵 Music toggle clicked");
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
    prevBtn: document.getElementById("prev-btn"),
    nextBtn: document.getElementById("next-btn"),
    quoteCount: document.getElementById("quote-count"),
    currentIndex: document.getElementById("current-index"),
    quoteCard: document.querySelector(".quote-card"),
    actionBtns: document.querySelectorAll(".action-btn"),
    themeToggle: document.getElementById("theme-toggle"),
    musicToggle: document.getElementById("music-toggle"),
    musicPrev: document.getElementById("music-prev"),
    musicNext: document.getElementById("music-next"),
    musicWrap: document.getElementById("music-wrap"),
  };
}

async function loadQuoteData() {
  try {
    const [oldTestament, newTestament, psalms] = await Promise.all([
      fetch("./quote_data/biblical/old_testament.json").then((r) => r.json()),
      fetch("./quote_data/biblical/new_testament.json").then((r) => r.json()),
      fetch("./quote_data/biblical/psalms.json").then((r) => r.json()),
    ]);

    // Normalize biblical quotes
    const normalizeBiblical = (arr) =>
      (arr || [])
        .filter((q) => q && typeof q.text === "string")
        .map((q) => ({
          text: String(q.text).trim(),
          reference: String(q.reference || "").trim(),
        }));

    quoteData.biblical.oldTestament = normalizeBiblical(oldTestament);
    quoteData.biblical.newTestament = normalizeBiblical(newTestament);
    quoteData.biblical.psalms = normalizeBiblical(psalms);

    const [inspirational, strengthening, focus] = await Promise.all([
      fetch("./quote_data/inspirational/inspirational_quotes.json").then((r) =>
        r.json()
      ),
      fetch("./quote_data/inspirational/strengthening_quotes.json").then((r) =>
        r.json()
      ),
      fetch("./quote_data/inspirational/focus_quotes.json").then((r) =>
        r.json()
      ),
    ]);

    // Normalize inspirational quotes (fix occasional "reference" field and trim)
    const normalizeInspirational = (arr) =>
      (arr || [])
        .filter((q) => q && typeof q.text === "string")
        .map((q) => ({
          text: String(q.text).trim(),
          author: String(q.author || q.reference || "Unknown").trim() || "Unknown",
        }));

    quoteData.inspirational.inspirational = normalizeInspirational(inspirational);
    quoteData.inspirational.strengthening = normalizeInspirational(strengthening);
    quoteData.inspirational.focus = normalizeInspirational(focus);
  } catch (error) {
    console.error("❌ Error loading quote data:", error);
  }
}

function displayQuote(quote, reference) {
  if (elements.quoteText && elements.quoteRef) {
    elements.quoteText.textContent = quote;
    elements.quoteRef.textContent = reference;

    if (elements.quoteCard) {
      elements.quoteCard.classList.add("fade-out");
      setTimeout(() => {
        elements.quoteCard.classList.remove("fade-out");
        elements.quoteCard.classList.add("fade-in");
        setTimeout(() => {
          elements.quoteCard.classList.remove("fade-in");
        }, 300);
      }, 150);
    }
  }
}

// Copy current quote to clipboard
function copyCurrentQuoteToClipboard() {
  const textEl = elements.quoteText;
  const refEl = elements.quoteRef;
  if (!textEl || !refEl) return;

  const payload = `${textEl.textContent} ${refEl.textContent}`.trim();
  const showCopied = () => {
    if (!elements.quoteCard) return;
    elements.quoteCard.classList.add("copied");
    setTimeout(() => elements.quoteCard && elements.quoteCard.classList.remove("copied"), 1200);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(payload)
      .then(showCopied)
      .catch(() => {
        // Fallback
        const ta = document.createElement("textarea");
        ta.value = payload;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          showCopied();
        } catch (e) {
          console.warn("Clipboard copy failed", e);
        } finally {
          document.body.removeChild(ta);
        }
      });
  } else {
    // Legacy fallback
    const ta = document.createElement("textarea");
    ta.value = payload;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showCopied();
    } catch (e) {
      console.warn("Clipboard copy failed", e);
    } finally {
      document.body.removeChild(ta);
    }
  }
}

function getRandomQuote(quotes) {
  if (!quotes || quotes.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

function updateNavButtons() {
  if (!elements.prevBtn) return;
  const isBible = state.isBibleMode;
  const canGoPrev = isBible
    ? state.currentBiblicalIndex > 0
    : state.currentQuoteIndex > 0;
  elements.prevBtn.disabled = !canGoPrev;
}

function displayFromBiblicalHistory(index) {
  const entry = state.biblicalQuoteHistory[index];
  if (!entry) return;
  displayQuote(entry.text, `- ${entry.reference}`);
  state.currentBiblicalSection = entry.section;
  updateStats();
  updateNavButtons();
}

function displayFromInspirationalHistory(index) {
  const entry = state.quoteHistory[index];
  if (!entry) return;
  displayQuote(entry.text, `- ${entry.author}`);
  state.currentInspirationalCategory = entry.category;
  updateStats();
  updateNavButtons();
}

function pushBiblicalHistory(quoteObj, section) {
  if (!quoteObj) return;
  state.biblicalQuoteHistory.push({
    text: quoteObj.text,
    reference: quoteObj.reference || "",
    section,
  });
  state.currentBiblicalIndex = state.biblicalQuoteHistory.length - 1;
}

function pushInspirationalHistory(quoteObj, category) {
  if (!quoteObj) return;
  state.quoteHistory.push({
    text: quoteObj.text,
    author: quoteObj.author || "Unknown",
    category,
  });
  state.currentQuoteIndex = state.quoteHistory.length - 1;
}

function showBiblicalQuote(section = "oldTestament") {
  const quotes = quoteData.biblical[section] || [];
  const quote = getRandomQuote(quotes);

  if (quote) {
    displayQuote(quote.text, `- ${quote.reference}`);
    state.currentBiblicalSection = section;
    state.totalBiblicalQuotesViewed++;
    pushBiblicalHistory(quote, section);
    updateStats();
    updateNavButtons();
  }
}

// Show inspirational quote
function showInspirationalQuote(category = "inspirational") {
  const quotes = quoteData.inspirational[category] || [];
  const quote = getRandomQuote(quotes);

  if (quote) {
    displayQuote(quote.text, `- ${quote.author}`);
    state.currentInspirationalCategory = category;
    state.totalInspirationalQuotesViewed++;
    pushInspirationalHistory(quote, category);
    updateStats();
    updateNavButtons();
  }
}

// Show random quote from all biblical
function showRandomBiblicalQuote() {
  const allQuotes = [
    ...quoteData.biblical.oldTestament,
    ...quoteData.biblical.psalms,
    ...quoteData.biblical.newTestament,
  ];
  const quote = getRandomQuote(allQuotes);

  if (quote) {
    displayQuote(quote.text, `- ${quote.reference}`);
    // Keep section as current section context
    state.totalBiblicalQuotesViewed++;
    pushBiblicalHistory(quote, state.currentBiblicalSection);
    updateStats();
    updateNavButtons();
  }
}

// Show random quote from all inspirational
function showRandomInspirationalQuote() {
  const allQuotes = [
    ...quoteData.inspirational.inspirational,
    ...quoteData.inspirational.strengthening,
    ...quoteData.inspirational.focus,
  ];
  const quote = getRandomQuote(allQuotes);

  if (quote) {
    displayQuote(quote.text, `- ${quote.author}`);
    state.totalInspirationalQuotesViewed++;
    pushInspirationalHistory(quote, state.currentInspirationalCategory);
    updateStats();
    updateNavButtons();
  }
}

// Update statistics
function updateStats() {
  if (elements.quoteCount) {
    elements.quoteCount.textContent = state.isBibleMode
      ? state.totalBiblicalQuotesViewed
      : state.totalInspirationalQuotesViewed;
  }
  if (elements.currentIndex) {
    elements.currentIndex.textContent = state.isBibleMode
      ? state.currentBiblicalIndex + 1
      : state.currentQuoteIndex + 1;
  }
}

// Toggle theme
function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Update theme toggle icon
  if (elements.themeToggle) {
    const icon = elements.themeToggle.querySelector("i");
    if (icon) {
      icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
  }

  console.log("🌙 Theme toggled to:", newTheme);
}

// Toggle mode
function toggleMode() {
  state.isBibleMode = !state.isBibleMode;

  if (elements.quoteCard) {
    elements.quoteCard.classList.add("flipping");

    setTimeout(() => {
      if (state.isBibleMode) {
        elements.quoteCard.classList.add("bible-mode");
        displayQuote(
          "Click 'Old Testament', 'New Testament', 'Psalms' or type your request to start your journey of spiritual guidance.",
          "- Biblical Wisdom"
        );
      } else {
        elements.quoteCard.classList.remove("bible-mode");
        displayQuote(
          "Click 'Inspire Me', 'Give Me Strength', 'Help Me Focus' or type your request to find your daily dose of inspiration.",
          "- Inspirational Speeches"
        );
      }

      elements.quoteCard.classList.remove("flipping");
      updateStats();
      updateNavButtons(); // Update nav buttons after mode change

      // If music is initialized, auto-switch playlist to match the new mode
      if (musicState.isInitialized) {
        switchPlaylistIfNeeded();
      }
    }, 300);
  }

  console.log(
    "🔄 Mode toggled to:",
    state.isBibleMode ? "Biblical" : "Inspirational"
  );
}

// Handle user input
function handleUserInput() {
  const input = elements.userInput
    ? elements.userInput.value.trim().toLowerCase()
    : "";
  if (!input) return;

  elements.userInput.value = "";

  // Process input patterns
  if (input.includes("teach") || input.includes("old")) {
    showBiblicalQuote("oldTestament");
  } else if (input.includes("lead") || input.includes("psalm")) {
    showBiblicalQuote("psalms");
  } else if (input.includes("guide") || input.includes("new")) {
    showBiblicalQuote("newTestament");
  } else if (input.includes("inspire")) {
    showInspirationalQuote("inspirational");
  } else if (input.includes("strengthen") || input.includes("strength")) {
    showInspirationalQuote("strengthening");
  } else if (input.includes("focus")) {
    showInspirationalQuote("focus");
  } else if (input.includes("random")) {
    if (state.isBibleMode) {
      showRandomBiblicalQuote();
    } else {
      showRandomInspirationalQuote();
    }
  } else {
    // Default action
    if (state.isBibleMode) {
      showBiblicalQuote("oldTestament");
    } else {
      showInspirationalQuote("inspirational");
    }
  }
}

// Handle action button clicks
function handleActionClick(action) {
  console.log("🎯 Action clicked:", action);

  if (state.isBibleMode) {
    switch (action) {
      case "oldT":
        showBiblicalQuote("oldTestament");
        break;
      case "newT":
        showBiblicalQuote("newTestament");
        break;
      case "psalm":
        showBiblicalQuote("psalms");
        break;
      case "random":
        showRandomBiblicalQuote();
        break;
      case "inspirational":
        toggleMode();
        break;
    }
  } else {
    switch (action) {
      case "oldT":
        showInspirationalQuote("inspirational");
        break;
      case "newT":
        showInspirationalQuote("strengthening");
        break;
      case "psalm":
        showInspirationalQuote("focus");
        break;
      case "random":
        showRandomInspirationalQuote();
        break;
      case "inspirational":
        toggleMode();
        break;
    }
  }
}

// Show next quote
function showNextQuote() {
  if (state.isBibleMode) {
    const atHistoryEnd =
      state.currentBiblicalIndex >= state.biblicalQuoteHistory.length - 1;
    if (atHistoryEnd) {
      // fetch a new one in the current section
      showBiblicalQuote(state.currentBiblicalSection);
    } else {
      state.currentBiblicalIndex += 1;
      displayFromBiblicalHistory(state.currentBiblicalIndex);
    }
  } else {
    const atHistoryEnd = state.currentQuoteIndex >= state.quoteHistory.length - 1;
    if (atHistoryEnd) {
      showInspirationalQuote(state.currentInspirationalCategory);
    } else {
      state.currentQuoteIndex += 1;
      displayFromInspirationalHistory(state.currentQuoteIndex);
    }
  }
}

// Show previous quote (history-based)
function showPreviousQuote() {
  if (state.isBibleMode) {
    if (state.currentBiblicalIndex > 0) {
      state.currentBiblicalIndex -= 1;
      displayFromBiblicalHistory(state.currentBiblicalIndex);
    }
  } else {
    if (state.currentQuoteIndex > 0) {
      state.currentQuoteIndex -= 1;
      displayFromInspirationalHistory(state.currentQuoteIndex);
    }
  }
}

// Set up event listeners
function setupEventListeners() {
  console.log("🔗 Setting up event listeners...");

  // Submit button
  if (elements.submitBtn) {
    elements.submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("📝 Submit button clicked");
      handleUserInput();
    });
  }

  // Input field
  if (elements.userInput) {
    elements.userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        console.log("📝 Enter key pressed");
        handleUserInput();
      }
    });
  }

  // Previous button
  if (elements.prevBtn) {
    elements.prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("⬅️ Previous button clicked");
      showPreviousQuote();
    });
  }

  // Next button
  if (elements.nextBtn) {
    elements.nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("➡️ Next button clicked");
      showNextQuote();
    });
  }

  // Action buttons
  if (elements.actionBtns) {
    elements.actionBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const action = btn.getAttribute("data-action");
        console.log("🎯 Action button clicked:", action);
        handleActionClick(action);
      });
    });
  }

  // Theme toggle
  if (elements.themeToggle) {
    elements.themeToggle.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("🌙 Theme toggle clicked");
      toggleTheme();
    });
  }

  // Music toggle
  if (elements.musicToggle) {
    elements.musicToggle.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("🎵 Music toggle clicked");
      toggleMusic();
    });
  }

  // Music prev/next
  if (elements.musicPrev) {
    elements.musicPrev.addEventListener("click", (e) => {
      e.preventDefault();
      if (!musicState.isInitialized) initializeMusicPlayer();
      const key = musicState.currentPlaylistKey;
      const list = musicState.playlists[key] || [];
      if (list.length === 0) return;
      musicState.currentTrackIndex =
        (musicState.currentTrackIndex - 1 + list.length) % list.length;
      if (musicState.isPlaying) {
        playCurrentTrack();
      } else {
        loadCurrentTrack();
      }
    });
  }
  if (elements.musicNext) {
    elements.musicNext.addEventListener("click", (e) => {
      e.preventDefault();
      playNextTrack();
    });
  }

  // Double-click to copy quote
  if (elements.quoteCard) {
    elements.quoteCard.addEventListener("dblclick", () => {
      copyCurrentQuoteToClipboard();
    });
  }

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (document.activeElement === elements.userInput) return;

    switch (e.key.toLowerCase()) {
      case "arrowright":
      case " ":
        e.preventDefault();
        showNextQuote();
        break;
      case "arrowleft":
        e.preventDefault();
        showPreviousQuote();
        break;
      case "r":
        e.preventDefault();
        if (state.isBibleMode) {
          showRandomBiblicalQuote();
        } else {
          showRandomInspirationalQuote();
        }
        break;
      case "t":
        e.preventDefault();
        toggleTheme();
        break;
      case "m":
        e.preventDefault();
        toggleMusic();
        break;
      case "b":
        e.preventDefault();
        toggleMode();
        break;
      case "c":
        // Quick copy
        e.preventDefault();
        copyCurrentQuoteToClipboard();
        break;
      case ">":
        // Shift+.
        if (e.shiftKey) {
          e.preventDefault();
          playNextTrack();
        }
        break;
      case "<":
        // Shift+,
        if (e.shiftKey) {
          e.preventDefault();
          if (!musicState.isInitialized) initializeMusicPlayer();
          const key = musicState.currentPlaylistKey;
          const list = musicState.playlists[key] || [];
          if (list.length === 0) return;
          musicState.currentTrackIndex =
            (musicState.currentTrackIndex - 1 + list.length) % list.length;
          if (musicState.isPlaying) {
            playCurrentTrack();
          } else {
            loadCurrentTrack();
          }
        }
        break;
    }
  });

  console.log("✅ Event listeners set up successfully");
}

// Initialize the application
async function init() {
  console.log("🚀 Initializing QuoLand...");

  try {
    // Initialize DOM elements
    initializeElements();

    // Load quote data
    await loadQuoteData();

    // Set up event listeners
    setupEventListeners();

    // Initialize theme
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Set initial quote
    if (elements.quoteCard) {
      elements.quoteCard.classList.add("bible-mode");
    }

    // Update stats and nav state
    updateStats();
    updateNavButtons();

    console.log("✅ QuoLand initialized successfully!");
  } catch (error) {
    console.error("❌ Error initializing QuoLand:", error);
  }
}

// Make functions globally available
window.showNextQuote = showNextQuote;
window.showPreviousQuote = showPreviousQuote;
window.handleActionClick = handleActionClick;
window.handleUserInput = handleUserInput;
window.toggleTheme = toggleTheme;
window.toggleMusic = toggleMusic;
window.toggleMode = toggleMode;

// Test function
window.testButtons = function () {
  console.log("🧪 Testing button functionality...");
  console.log(
    "Elements found:",
    Object.keys(elements).filter((key) => elements[key])
  );
  console.log(
    "Quote data loaded:",
    Object.keys(quoteData.biblical).length +
      Object.keys(quoteData.inspirational).length
  );
  console.log(
    "Current mode:",
    state.isBibleMode ? "Biblical" : "Inspirational"
  );
};

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
