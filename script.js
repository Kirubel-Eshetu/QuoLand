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
    inspirational: [
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
  if (musicState.isIntialized) return;
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
      fetch("./quote-data/biblical/old-testament.json").then((r) => r.json()),
      fetch("./quote-data/biblical/new-testament.json").then((r) => r.json()),
      fetch("./quote-data/biblical/psalms.json").then((r) => r.json()),
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
    quoteData.biblical.psalms = normalizeBiblical(psalms);

    const [inspirational, strengthening, focus] = await Promise.all([
      fetch("./quote-data/inspirational/inspirational-quotes.json").then((r) =>
        r.json(),
      ),
      fetch("./quote-data/inspirational/strengthening-quotes.json").then((r) =>
        r.json(),
      ),
      fetch("./quote-data/inspirational/focus-quotes.json").then((r) =>
        r.json(),
      ),
    ]);

    const normalizeInspirational = (arr) =>
      (arr || [])
        .filter((q) => q && typeof q.text === "string")
        .map((q) => ({
          text: String(q.text).trim(),
          author:
            String(q.author || q.reference || "Unknown").trim() || "Unknown",
        }));

    quoteData.inspirational.inspirational =
      normalizeInspirational(inspirational);
    quoteData.inspirational.strengthening =
      normalizeInspirational(strengthening);
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

function copyCurrentQuoteToClipboard() {
  const textEl = elements.quoteText;
  const refEl = elements.quoteRef;
  if (!textEl || !refEl) return;

  const payload = `${textEl.textContent} ${refEl.textContent}`.trim();
  const showCopied = () => {
    if (!elements.quoteCard) return;
    elements.quoteCard.classList.add("copied");
    setTimeout(
      () => elements.quoteCard && elements.quoteCard.classList.remove("copied"),
      1200,
    );
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(payload)
      .then(showCopied)
      .catch(() => {
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

function getSequentialQuote(quotes, currentIndex) {
  if (!quotes || quotes.length === 0) return null;
  const index = currentIndex % quotes.length;
  return quotes[index];
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
  displayQuote(entry.text, `✝️ ${entry.reference}`);
  state.currentBiblicalSection = entry.section;
  updateStats();
  updateNavButtons();
}

function displayFromInspirationalHistory(index) {
  const entry = state.quoteHistory[index];
  if (!entry) return;
  displayQuote(entry.text, `✝️ ${entry.author}`);
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
    author: quoteObj.author || "unknown",
    category,
  });
  state.currentQuoteIndex = state.quoteHistory.length - 1;
}

function showBiblicalQuote(section = "oldTestament") {
  const quotes = quoteData.biblical[section] || [];
  const currentIndex = state.biblicalSequentialIndex[section];
  const quote = getSequentialQuote(quotes, currentIndex);

  if (quote) {
    displayQuote(quote.text, `✝️ ${quote.reference}`);
    state.currentBiblicalSection = section;
    state.totalBiblicalQuotesViewed++;
    pushBiblicalHistory(quote, section);

    state.biblicalSequentialIndex[section]++;

    updateStats();
    updateNavButtons();
  }
}

function showInspirationalQuote(category = "inspirational") {
  const quotes = quoteData.inspirational[category] || [];
  const currentIndex = state.inspirationalSequentialIndex[category];
  const quote = getSequentialQuote(quotes, currentIndex);

  if (quote) {
    displayQuote(quote.text, `🔥 ${quote.author}`);
    state.currentInspirationalCategory = category;
    state.totalInspirationalQuotesViewed++;
    pushInspirationalHistory(quote, category);

    state.inspirationalSequentialIndex[category]++;

    updateStats();
    updateNavButtons();
  }
}

function showRandomBiblicalQuote() {
  const allQuotes = [
    ...quoteData.biblical.oldTestament,
    ...quoteData.biblical.psalms,
    ...quoteData.biblical.newTestament,
  ];
  const quote = getRandomQuote(allQuotes);

  if (quote) {
    displayQuote(quote.text, `✝️ ${quote.reference}`);
    state.totalBiblicalQuotesViewed++;
    pushBiblicalHistory(quote, state.currentBiblicalSection);
    updateStats();
    updateNavButtons();
  }
}

function showRandomInspirationalQuote() {
  const allQuotes = [
    ...quoteData.inspirational.inspirational,
    ...quoteData.inspirational.strengthening,
    ...quoteData.inspirational.focus,
  ];
  const quote = getRandomQuote(allQuotes);

  if (quote) {
    displayQuote(quote.text, `🔥 ${quote.author}`);
    state.totalInspirationalQuotesViewed++;
    pushInspirationalHistory(quote, state.currentInspirationalCategory);
    updateStats();
    updateNavButtons();
  }
}

function updateStats() {
  if (elements.quoteCount) {
    elements.quoteCount.textContent = state.isBibleMode
      ? state.totalBiblicalQuotesViewed
      : state.totalInspirationalQuotesViewed;
  }
  if (elements.currentIndex) {
    if (state.isBibleMode) {
      const currentSectionIndex =
        state.biblicalSequentialIndex[state.currentBiblicalSection];
      elements.currentIndex.textContent = currentSectionIndex;
    } else {
      const currentCategoryIndex =
        state.inspirationalSequentialIndex[state.currentInspirationalCategory];
      elements.currentIndex.textContent = currentCategoryIndex;
    }
  }
}

function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  if (elements.themeToggle) {
    const icon = elements.themeToggle.querySelector("i");
    if (icon) {
      icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
  }
}

function updateModeButtonText() {
  const inspirationalBtn = document.querySelector(
    '[data-action = "inspirational"]',
  );
  if (inspirationalBtn) {
    if (state.isBibleMode) {
      inspirationalBtn.innerHTML =
        '<i class="fas fa-fire" aria-hidden="true"></i> Inspirational Mode';
      inspirationalBtn.setAttribute(
        "aria-label",
        "Switch to inspirational quotes",
      );
    } else {
      inspirationalBtn.innerHTML =
        '<i class="fas fa-cross" aria-hidden="true"></i> Biblical Mode';
      inspirationalBtn.setAttribute("aria-label", "Switch to biblical quotes");
    }
  }
}

function updateActionButtons() {
  const oldTBtn = document.querySelector('[data-action = "oldT"]');
  const psalmBtn = document.querySelector('[data-action = "psalm"]');
  const newTBtn = document.querySelector('[data-action = "newT"]');
  const random = document.querySelector('[data-action = "random"]');
  const userInput = document.getElementById("user-input");

  if (state.isBibleMode) {
    if (oldTBtn) {
      oldTBtn.innerHTML =
        '<i class="fas fa-scroll" aria-hidden="true"></i> Old Testament';
      oldTBtn.setAttribute("aria-label", "Old Testament quotes");
    }
    if (psalmBtn) {
      psalmBtn.innerHTML =
        '<i class="fas fa-music" aria-hidden="true"></i> Psalms';
      psalmBtn.setAttribute("aria-label", "The book of Psalms quotes");
    }
    if (newTBtn) {
      newTBtn.innerHTML =
        '<i class="fas fa-book-open" aria-hidden="true"></i> New Testament';
      newTBtn.setAttribute("aria-label", "New Testament Quotes");
    }
    if (random) {
      random.innerHTML =
        '<i class="fas fa-book" aria-hidden="true"></i> Word of the Day';
      random.setAttribute("aria-label", "Word of the day");
    }
    if (userInput) {
      userInput.placeholder = "Type 'teach me', 'lead me' or 'guide me'...";
    }
  } else {
    if (oldTBtn) {
      oldTBtn.innerHTML =
        '<i class="fas fa-fire" aria-hidden="true"></i> Inspire Me';
      oldTBtn.setAttribute("aria-label", "Inspirational quotes");
    }
    if (psalmBtn) {
      psalmBtn.innerHTML =
        '<i class="fas fa-crosshairs" aria-hidden="true"></i> Help Me Focus';
      psalmBtn.setAttribute("aria-label", "Focus quotes");
    }
    if (newTBtn) {
      newTBtn.innerHTML =
        '<i class="fas fa-dumbbell" aria-hidden="true"></i> Give Me Strength';
      newTBtn.setAttribute("aria-label", "Strengthening quotes");
    }
    if (random) {
      random.innerHTML =
        '<i class = "fas fa-dice" aria-hidden = "true"></i> Random';
      random.setAttribute("aria-label", "Random Quotes");
    }
    if (userInput) {
      userInput.placeholder =
        "Type 'inspire me', 'give me strength' or 'help me focus'...";
    }
  }
}

function toggleMode() {
  state.isBibleMode = !state.isBibleMode;

  updateModeButtonText();
  updateActionButtons();

  if (elements.quoteCard) {
    elements.quoteCard.classList.add("flipping");

    setTimeout(() => {
      if (state.isBibleMode) {
        elements.quoteCard.classList.add("bible-mode");
        displayQuote(
          "👆🏾 Click 'Old Testament' or type your request to start your journey of spiritual guidance 📖",
        );
        elements.quoteRef.innerHTML =
          '<i class="fas fa-bible"></i> Your Daily Biblical Wisdom';
      } else {
        elements.quoteCard.classList.remove("bible-mode");
        displayQuote(
          "👆🏾 Click 'Inspire Me' or type your request to find your daily dose of inspiration 💪🏾",
        );
        elements.quoteRef.innerHTML =
          '<i class="fas fa-microphone"></i> Inspirational Speeches';
      }

      elements.quoteCard.classList.remove("flipping");
      updateStats();
      updateNavButtons();

      if (musicState.isIntialized) {
        switchPlaylistIfNeeded();
      }
    }, 300);
  }
}

function handleUserInput() {
  const input = elements.userInput
    ? elements.userInput.value.trim().toLowerCase()
    : "";
  if (!input) return;

  elements.userInput.value = "";

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
    if (state.isBibleMode) {
      showBiblicalQuote("oldTestament");
    } else {
      showInspirationalQuote("inspirational");
    }
  }
}

function handleActionClick(action) {
  if (state.isBibleMode) {
    switch (action) {
      case "oldT":
        showBiblicalQuote("oldTestament");
        break;
      case "psalm":
        showBiblicalQuote("psalms");
        break;
      case "random":
        showRandomBiblicalQuote();
        break;
      case "newT":
        showBiblicalQuote("newTestament");
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
      case "psalm":
        showInspirationalQuote("focus");
        break;
      case "newT":
        showInspirationalQuote("strengthening");
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

function showNextQuote() {
  if (state.isBibleMode) {
    const atHistoryEnd =
      state.currentBiblicalIndex >= state.biblicalQuoteHistory.length - 1;
    if (atHistoryEnd) {
      showBiblicalQuote(state.currentBiblicalSection);
    } else {
      state.currentBiblicalIndex += 1;
      displayFromBiblicalHistory(state.currentBiblicalIndex);
    }
  } else {
    const atHistoryEnd =
      state.currentQuoteIndex >= state.quoteHistory.length - 1;
    if (atHistoryEnd) {
      showInspirationalQuote(state.currentInspirationalCategory);
    } else {
      state.currentQuoteIndex += 1;
      displayFromInspirationalHistory(state.currentQuoteIndex);
    }
  }
}

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

function setupEventListeners() {
  if (elements.submitBtn) {
    elements.submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleUserInput();
    });
  }

  if (elements.userInput) {
    elements.userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        console.log("Enter key pressed");
        handleUserInput();
      }
    });
  }

  if (elements.prevBtn) {
    elements.prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Previous button clicked");
      showPreviousQuote();
    });
  }

  if (elements.nextBtn) {
    elements.nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showNextQuote();
    });
  }

  if (elements.actionBtns) {
    elements.actionBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const action = btn.getAttribute("data-action");
        handleActionClick(action);
      });
    });
  }

  if (elements.themeToggle) {
    elements.themeToggle.addEventListener("click", (e) => {
      e.preventDefault();
      toggleTheme();
    });
  }

  if (elements.musicToggle) {
    elements.musicToggle.addEventListener("click", (e) => {
      e.preventDefault();
      toggleMusic();
    });
  }

  if (elements.musicPrev) {
    elements.musicPrev.addEventListener("click", (e) => {
      e.preventDefault();
      if (!musicState.isIntialized) initializeMusicPlayer();
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

  if (elements.quoteCard) {
    elements.quoteCard.addEventListener("click", () => {
      copyCurrentQuoteToClipboard();
    });
  }

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
        if (e.ctrlKey || e.metaKey) return;
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
        e.preventDefault();
        copyCurrentQuoteToClipboard();
        break;

      case ">":
        if (e.shiftKey) {
          e.preventDefault();
          playNextTrack();
        }
        break;

      case "<":
        if (e.shiftKey) {
          e.preventDefault();
          if (!musicState.isIntialized) initializeMusicPlayer();
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
}

async function init() {
  try {
    initializeElements();
    await loadQuoteData();
    setupEventListeners();

    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);

    if (elements.quoteCard) {
      elements.quoteCard.classList.add("bible-mode");
    }

    updateStats();
    updateNavButtons();

    updateModeButtonText();
    updateActionButtons();
  } catch (error) {
    console.error("Error initializing QuoLand:", error);
  }
}

window.showNextQuote = showNextQuote;
window.showPreviousQuote = showPreviousQuote;
window.handleActionClick = handleActionClick;
window.handleUserInput = handleUserInput;
window.toggleTheme = toggleTheme;
window.toggleMusic = toggleMusic;
window.toggleMode = toggleMode;

window.testButtons = function () {
  console.log("Testing button functionality...");
  console.log(
    "Elements found:",
    Object.keys(elements).filter((key) => elements[key]),
  );
  console.log(
    "Quote data loaded:",
    Object.keys(quoteData.biblical).length +
      Object.keys(quoteData.inspirational).length,
  );
  console.log(
    "Current mode:",
    state.isBibleMode ? "Biblical" : "Inspirational",
  );
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
