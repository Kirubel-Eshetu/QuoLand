const state = {
  currentBiblicalIndex: 0,
  currentQuoteIndex: 0,
  viewedBiblicalQuotes: new Set(),
  viewedQuotes: new Set(),
  biblicalQuoteHistory: [],
  quoteHistory: [],
  isBibleMode: true,
  currentBiblicalSection: 'oldTestament',
  currentInspirationalCategory: 'inspirational',
  totalBiblicalQuotesViewed: 0,
  totalInspirationalQuotesViewed: 0
};

const quoteLoader = {
  loadedQuotes: {
    biblical: {
      oldTestament: null,
      psalms: null,
      newTestament: null
    },
    inspirational: {
      inspirational: null,
      strengthening: null,
      focus: null
    }
  },

  async loadQuotes(category, type) {
    try {
      const response = await fetch(`./quote_data/${category}/${type}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${type} quotes`);
      }
      const quotes = await response.json();
      this.loadedQuotes[category][type] = quotes;
      return quotes;
    } catch (error) {
      console.error(`Error loading ${type} quotes:`, error);
      return [];
    }
  },

  async getQuotes(category, type) {
    if (!this.loadedQuotes[category][type]) {
      await this.loadQuotes(category, type);
    }
    return this.loadedQuotes[category][type] || [];
  },

  async preloadAllQuotes() {
    const promises = [
      this.loadQuotes('biblical', 'old_testament'),
      this.loadQuotes('biblical', 'psalms'),
      this.loadQuotes('biblical', 'new_testament'),
      this.loadQuotes('inspirational', 'inspirational_quotes'),
      this.loadQuotes('inspirational', 'strengthening_quotes'),
      this.loadQuotes('inspirational', 'focus_quotes'),
    ];

    await Promise.all(promises);
  }
};

let elements = {};

function initializeElements() {
  console.log("🔍 Initializing DOM elements...");
  
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
    musicToggle: document.getElementById("music-toggle")
  };

  const missingElements = [];
  Object.entries(elements).forEach(([name, element]) => {
    if (!element) {
      missingElements.push(name);
    } else {
      console.log(`✅ Found element: ${name}`);
    }
  });

  if (missingElements.length > 0) {
    console.error("❌ Missing elements:", missingElements);
    console.log("🔍 Available elements in DOM:", document.querySelectorAll('*[id]').length);
  } else {
    console.log("✅ All elements found successfully!");
  }
  
  // Additional debugging for action buttons
  if (elements.actionBtns) {
    console.log(`🎯 Found ${elements.actionBtns.length} action buttons`);
    elements.actionBtns.forEach((btn, index) => {
      console.log(`  Button ${index + 1}: ${btn.textContent.trim()} (action: ${btn.dataset.action})`);
    });
  }
}

const inputPatterns = {
  teach: ["teach", "teach me", "teach me wisdom", "old testament", "old"],
  lead: ["lead", "lead me", "guide me through", "psalms", "psalm"],
  guide: ["guide", "guide me", "new testament", "new"],
  inspire: ["inspire", "inspiration", "inspire me", "give me inspiration"],
  strengthen: ["strengthen", "strengthen me", "give me strength", "i need strength", "power"],
  focus: ["focus", "concentrate", "help me focus", "i need focus", "concentration"],
  random: ["random", "surprise me", "any quote", "whatever"],
  next: ["next", "next quote", "another", "more", "continue"],
  previous: ["previous", "back", "go back", "last quote"]
};

const buttonConfigs = {
  bible: {
    oldT: { icon: "fas fa-scroll", text: "Old Testament" },
    newT: { icon: "fas fa-book-open", text: "New Testament" },
    psalm: { icon: "fas fa-music", text: "Psalms" },
    random: { icon: "fas fa-dice", text: "Random" },
    inspirational: { icon: "fas fa-fire", text: "Inspirational Quotes" }
  },
  inspirational: {
    oldT: { icon: "fas fa-star", text: "Inspire Me" },
    newT: { icon: "fas fa-fist-raised", text: "Give Me Strength" },
    psalm: { icon: "fas fa-bullseye", text: "Help Me Focus" },
    random: { icon: "fas fa-dice", text: "Random" },
    inspirational: { icon: "fas fa-cross", text: "Biblical Mode" }
  }
};

const headerConfigs = {
  bible: {
    title: '<i class="fas fa-cross"></i> Biblical Wisdom',
    subtitle: "Find spiritual guidance and divine inspiration 🙏🏾",
    placeholder: "Type 'teach me', 'lead me' or 'guide me'..."
  },
  inspirational: {
    title: '<i class="fas fa-fire"></i> inspirational Speeches',
    subtitle: "Find your daily dose of inspiration ⚡",
    placeholder: "Type 'inspire', 'strengthen' or 'focus'..."
  }
};

const themeManager = {
  init() {
    const savedTheme = localStorage.getItem("theme") || "dark";
    this.set(savedTheme);
  },

  set(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (elements.themeToggle) {
      const icon = elements.themeToggle.querySelector("i");
      if (icon) {
        const isDark = theme === "dark";
        icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
        elements.themeToggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
      }
    }
  },

  toggle() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    this.set(newTheme);

    if (elements.themeToggle) {
      elements.themeToggle.style.transform = "scale(0.9)";
      setTimeout(() => {
        elements.themeToggle.style.transform = "scale(1)";
      }, 150);
    }
  }
};

const musicManager = {
  audio: null,
  isPlaying: false,
  currentMode: 'bible',
  currentTrackIndex: 0,
  playlists: {
    biblical: [],
    inspirational: []
  },
  playlistNames: {
    biblical: [
      'Biblical_Song_1.mp3', 'Biblical_Song_2.mp3', 'Biblical_Song_3.mp3', 'Biblical_Song_4.mp3', 'Biblical_Song_5.mp3',
      'Biblical_Song_6.m4a', 'Biblical_Song_7.mp3', 'Biblical_Song_8.m4a', 'Biblical_Song_9.m4a', 'Biblical_Song_10.m4a'
    ],
    inspirational: [
      'inspiration_music_1.mp3', 'inspiration_music_2.m4a', 'inspiration_music_3.m4a', 'inspiration_music_4.m4a', 'inspiration_music_5.m4a',
      'inspiration_music_6.m4a', 'inspiration_music_7.m4a', 'inspiration_music_8.m4a', 'inspiration_music_9.m4a', 'inspiration_music_10.m4a'
    ]
  },

  init() {
    this.createAudioElements();
    this.loadSettings();
    this.updateMusicButton();
    this.setupMusicControls();
  },

  createAudioElements() {
    this.audio = new Audio();
    this.audio.volume = 0.5;

    this.audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      console.error('Audio error details:', this.audio.error);
    });

    this.audio.addEventListener('loadstart', () => {
      console.log('Audio loading started');
    });

    this.audio.addEventListener('canplay', () => {
      console.log('Audio can play');
    });

    this.loadPlaylist('biblical');
    this.loadPlaylist('inspirational');

    this.audio.addEventListener('ended', () => {
      this.playNextTrack();
    });

    this.loadAndPlayCurrentTrack();
  },

  loadPlaylist(mode) {
    this.playlists[mode] = this.playlistNames[mode].map(filename =>
      `./music/${mode}/${filename}`
    );
    console.log(`${mode} playlist loaded:`, this.playlists[mode]);
  },

  loadSettings() {
    const savedMusicState = localStorage.getItem("musicEnabled");
    if (savedMusicState === "true") {
      this.isPlaying = true;
    }
  },

  toggle() {
    console.log("🎵 Music toggle clicked, current state:", this.isPlaying);
    console.log("🎵 Audio element exists:", !!this.audio);
    console.log("🎵 Audio src:", this.audio ? this.audio.src : "no audio");

    if (this.isPlaying) {
      console.log("🎵 Stopping music");
      this.stop();
    } else {
      console.log("🎵 Starting music");
      this.play();
    }

    if (elements.musicToggle) {
      elements.musicToggle.style.transform = "scale(0.9)";
      setTimeout(() => {
        elements.musicToggle.style.transform = "scale(1)";
      }, 150);
    }
  },

  play() {
    console.log("Play function called");
    if (!this.audio) {
      console.error("Audio element not initialized");
      return;
    }

    if (!this.audio.src) {
      console.log("No audio source, loading track");
      this.loadAndPlayCurrentTrack();

      setTimeout(() => {
        this.attemptPlay();
      }, 100);
      return;
    }

    this.attemptPlay();
  },

  attemptPlay() {
    console.log("Attempting to play audio:", this.audio.src);
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.updateMusicButton();
      localStorage.setItem("musicEnabled", "true");
      console.log("Music started playing:", this.audio.src);
    }).catch(error => {
      console.error("Music playback failed:", error);
      console.error("Error details:", error.message);
      interactiveFeatures.showToast("Music playback not available: " + error.message);
    });
  },

  stop() {
    if (!this.audio) return;

    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
    this.updateMusicButton();
    localStorage.setItem("musicEnabled", "false");
  },

  playTrack(index) {
    if (index === 0) {
      this.stop();
      return;
    }

    if (index >= 1 && index <= 10) {
      this.currentTrackIndex = index - 1;
      this.loadAndPlayCurrentTrack();
    }
  },

  loadAndPlayCurrentTrack() {
    const playlist = this.playlists[this.currentMode];
    if (this.currentTrackIndex >= playlist.length) {
      this.currentTrackIndex = 0;
    }

    const trackPath = playlist[this.currentTrackIndex];
    console.log("Loading track:", trackPath);
    console.log("Current mode:", this.currentMode);
    console.log("Current track index:", this.currentTrackIndex);

    this.audio.src = trackPath;
    this.audio.load();

    if (this.isPlaying) {
      this.audio.play().catch(error => {
        console.error("Music playback failed in loadAndPlayCurrentTrack:", error);
      });
    }
  },

  playNextTrack() {
    this.currentTrackIndex++;
    this.loadAndPlayCurrentTrack();
  },

  playPreviousTrack() {
    this.currentTrackIndex--;
    if (this.currentTrackIndex < 0) {
      this.currentTrackIndex = this.playlists[this.currentMode].length - 1;
    }
    this.loadAndPlayCurrentTrack();
  },

  switchMode(mode) {
    if (this.currentMode === mode) return;

    const wasPlaying = this.isPlaying;
    if (this.isPlaying) {
      this.stop();
    }

    this.currentMode = mode;
    this.currentTrackIndex = 0;
    this.loadAndPlayCurrentTrack();

    if (wasPlaying) {
      this.play();
    }
  },

  updateMusicButton() {
    if (!elements.musicToggle) return;

    const icon = elements.musicToggle.querySelector("i");
    const isPlaying = this.isPlaying;

    if (isPlaying) {
      elements.musicToggle.classList.add("playing");
      if (icon) icon.className = "fas fa-volume-mute";
      elements.musicToggle.title = "Stop background music";
    } else {
      elements.musicToggle.classList.remove("playing");
      if (icon) icon.className = "fas fa-music";
      elements.musicToggle.title = "Play background music";
    }
  },

  setupMusicControls() {
    if (!elements.musicToggle) return;

    const musicContainer = elements.musicToggle.parentElement;

    const prevBtn = document.createElement('button');
    prevBtn.className = 'music-control-btn music-prev-btn';
    prevBtn.innerHTML = '<i class="fas fa-step-backward"></i>';
    prevBtn.title = 'Previous track';
    prevBtn.style.cssText = `
      position: absolute;
      left: -40px;
      top: 50%;
      transform: translateY(-50%);
      background: var(--button-bg);
      border: var(--button-border);
      color: var(--button-color);
      padding: 8px;
      border-radius: 50%;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 100;
    `;

    const nextBtn = document.createElement('button');
    nextBtn.className = 'music-control-btn music-next-btn';
    nextBtn.innerHTML = '<i class="fas fa-step-forward"></i>';
    nextBtn.title = 'Next track';
    nextBtn.style.cssText = `
      position: absolute;
      right: -40px;
      top: 50%;
      transform: translateY(-50%);
      background: var(--button-bg);
      border: var(--button-border);
      color: var(--button-color);
      padding: 8px;
      border-radius: 50%;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 100;
    `;

    musicContainer.appendChild(prevBtn);
    musicContainer.appendChild(nextBtn);

    musicContainer.addEventListener('mouseenter', () => {
      prevBtn.style.opacity = '1';
      nextBtn.style.opacity = '1';
    });

    musicContainer.addEventListener('mouseleave', () => {
      prevBtn.style.opacity = '0';
      nextBtn.style.opacity = '0';
    });

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.playPreviousTrack();
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.playNextTrack();
    });
  }
};

const quoteManager = {
  currentBibleSection: 'oldTestament',
  sectionIndices: {
    oldTestament: 0,
    newTestament: 0,
    psalms: 0
  },

  async showQuote(index, isBiblical = false, section = null, category = null) {
    let quotes;
    if (isBiblical) {
      if (section) {
        this.currentBibleSection = section;
        state.currentBiblicalSection = section;
        quotes = await this.getBibleQuotes(section);
      } else {
        quotes = await this.getBibleQuotes(this.currentBibleSection);
      }
    } else {
      const quoteCategory = category || 'inspirational';
      state.currentInspirationalCategory = quoteCategory;
      let fileCategory;
      switch (quoteCategory) {
        case 'inspirational':
          fileCategory = 'inspirational_quotes';
          break;
        case 'strengthening':
          fileCategory = 'strengthening_quotes';
          break;
        case 'focus':
          fileCategory = 'focus_quotes';
          break;
        default:
          fileCategory = 'inspirational_quotes';
      }
      quotes = await quoteLoader.getQuotes('inspirational', fileCategory);
    }

    const quote = quotes[index];

    if (!quote) return;

    elements.quoteCard.classList.add("fade-out");

    setTimeout(() => {
      elements.quoteText.textContent = quote.text;
      elements.quoteRef.textContent = isBiblical ? `- ${quote.reference}` : `- ${quote.author}`;

      elements.quoteCard.classList.remove("fade-out");
      elements.quoteCard.classList.add("fade-in");

      setTimeout(() => {
        elements.quoteCard.classList.remove("fade-in");
      }, 300);
    }, 150);

    if (isBiblical) {
      state.currentBiblicalIndex = index;
      state.viewedBiblicalQuotes.add(index);
      state.biblicalQuoteHistory.push(index);
      state.totalBiblicalQuotesViewed++;
    } else {
      state.currentQuoteIndex = index;
      state.viewedQuotes.add(index);
      state.quoteHistory.push(index);
      state.totalInspirationalQuotesViewed++;
    }

    this.updateStats();
    this.updateNavigationButtons();
  },

  async getBibleQuotes(section) { //stopped reading here
    switch (section) {
      case 'oldTestament':
        return await quoteLoader.getQuotes('biblical', 'old_testament');
      case 'psalms':
        return await quoteLoader.getQuotes('biblical', 'psalms');
      case 'newTestament':
        return await quoteLoader.getQuotes('biblical', 'new_testament');
      default:
        return await quoteLoader.getQuotes('biblical', 'old_testament');
    }
  },

  async showNextQuoteFromSection(section) {
    const quotes = await this.getBibleQuotes(section);
    const currentIndex = this.sectionIndices[section];
    await this.showQuote(currentIndex, true, section);

    this.sectionIndices[section] = (currentIndex + 1) % quotes.length;
  },

  async showRandomQuoteFromAllBible() {
    const [oldTestament, newTestament, psalms] = await Promise.all([
      quoteLoader.getQuotes('biblical', 'old_testament'),
      quoteLoader.getQuotes('biblical', 'new_testament'),
      quoteLoader.getQuotes('biblical', 'psalms')
    ]);

    const allBibleQuotes = [...oldTestament, ...psalms, ...newTestament];
    const randomIndex = Math.floor(Math.random() * allBibleQuotes.length);

    let currentIndex = 0;
    let section = 'oldTestament';

    if (randomIndex >= oldTestament.length) {
      currentIndex = randomIndex - oldTestament.length;
      if (randomIndex >= oldTestament.length + psalms.length) {
        currentIndex = randomIndex - oldTestament.length - psalms.length;
        section = 'newTestament';
      } else {
        section = 'psalms';
      }
    } else {
      currentIndex = randomIndex;
    }

    await this.showQuote(currentIndex, true, section);
  },

  async showRandomQuote(isBiblical = false) {
    if (isBiblical) {
      await this.showRandomQuoteFromAllBible();
    } else {
      const quotes = await quoteLoader.getQuotes('inspirational', 'inspirational_quotes');
      const randomIndex = Math.floor(Math.random() * quotes.length);
      await this.showQuote(randomIndex, false);
    }
  },

  async showRandomQuoteFromCategory(category) {
    let fileCategory;
    switch (category) {
      case 'inspirational':
        fileCategory = 'inspirational_quotes';
        break;
      case 'strengthening':
        fileCategory = 'strengthening_quotes';
        break;
      case 'focus':
        fileCategory = 'focus_quotes';
        break;
      default:
        fileCategory = 'inspirational_quotes';
    }

    const quotes = await quoteLoader.getQuotes('inspirational', fileCategory);
    const randomIndex = Math.floor(Math.random() * quotes.length);
    await this.showQuote(randomIndex, false, null, category);
  },

  async showRandomQuoteFromAllInspirational() {
    const [inspirational, strengthening, focus] = await Promise.all([
      quoteLoader.getQuotes('inspirational', 'inspirational_quotes'),
      quoteLoader.getQuotes('inspirational', 'strengthening_quotes'),
      quoteLoader.getQuotes('inspirational', 'focus_quotes')
    ]);

    const allInspirationalQuotes = [...inspirational, ...strengthening, ...focus];
    const randomIndex = Math.floor(Math.random() * allInspirationalQuotes.length);

    let currentIndex = 0;
    let category = 'inspirational';

    if (randomIndex >= inspirational.length) {
      currentIndex = randomIndex - inspirational.length;
      if (randomIndex >= inspirational.length + strengthening.length) {
        currentIndex = randomIndex - inspirational.length - strengthening.length;
        category = 'focus';
      } else {
        category = 'strengthening';
      }
    } else {
      currentIndex = randomIndex;
    }

    await this.showQuote(currentIndex, false, null, category);
  },

  async showNextQuote() {
    const isBiblical = state.isBibleMode;
    if (isBiblical) {
      await this.showNextQuoteFromSection(this.currentBibleSection);
    } else {
      const quotes = await quoteLoader.getQuotes('inspirational', 'inspirational_quotes');
      const nextIndex = (state.currentQuoteIndex + 1) % quotes.length;
      await this.showQuote(nextIndex, false);
    }
  },

  async showPreviousQuote() {
    const isBiblical = state.isBibleMode;
    const history = isBiblical ? state.biblicalQuoteHistory : state.quoteHistory;

    if (history.length > 1) {
      history.pop();
      const previousIndex = history[history.length - 1];
      if (isBiblical) {
        await this.showQuote(previousIndex, true, this.currentBibleSection);
      } else {
        await this.showQuote(previousIndex, false);
      }
    }
  },

  updateStats() {
    if (state.isBibleMode) {
      // Show total biblical quotes viewed across all sections
      elements.quoteCount.textContent = state.totalBiblicalQuotesViewed;
      // Check if we're showing an introduction or an actual quote
      const isShowingIntro = elements.quoteText.textContent.includes("Click 'Old Testament'") ||
        elements.quoteText.textContent.includes("Click 'New Testament'") ||
        elements.quoteText.textContent.includes("Click 'Psalms'");
      elements.currentIndex.textContent = isShowingIntro ? "0" : (state.currentBiblicalIndex + 1);
    } else {
      // Show total inspirational quotes viewed across all categories
      elements.quoteCount.textContent = state.totalInspirationalQuotesViewed;
      // Check if we're showing an introduction or an actual quote
      const isShowingIntro = elements.quoteText.textContent.includes("Click 'Inspire Me'") ||
        elements.quoteText.textContent.includes("Give Me Strength") ||
        elements.quoteText.textContent.includes("Help Me Focus");
      elements.currentIndex.textContent = isShowingIntro ? "0" : (state.currentQuoteIndex + 1);
    }
  },

  updateNavigationButtons() {
    const history = state.isBibleMode ? state.biblicalQuoteHistory : state.quoteHistory;
    elements.prevBtn.disabled = history.length <= 1;
    elements.nextBtn.disabled = false;
  }
};

const uiManager = {
  updateActionButtons() {
    const config = state.isBibleMode ? buttonConfigs.bible : buttonConfigs.inspirational;

    elements.actionBtns.forEach(btn => {
      const action = btn.dataset.action;
      const buttonConfig = config[action];
      if (buttonConfig) {
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = buttonConfig.icon;
        }

        // Clear all text content and rebuild
        const existingIcon = btn.querySelector('i');
        btn.textContent = '';
        if (existingIcon) {
          btn.appendChild(existingIcon);
        }
        btn.appendChild(document.createTextNode(' ' + buttonConfig.text));
      }
    });
  },

  updateHeader() {
    const config = state.isBibleMode ? headerConfigs.bible : headerConfigs.inspirational;
    const headerTitle = document.querySelector(".header h1");
    const headerSubtitle = document.querySelector(".header h2");

    headerTitle.innerHTML = config.title;
    headerSubtitle.textContent = config.subtitle;
    elements.userInput.placeholder = config.placeholder;
  },

  async toggleBibleMode() {
    state.isBibleMode = !state.isBibleMode;

    elements.quoteCard.classList.add("flipping");

    setTimeout(async () => {
      if (state.isBibleMode) {
        elements.quoteCard.classList.add("bible-mode");
        // Show biblical mode introduction
        elements.quoteText.textContent = "Click 'Old Testament', 'New Testament', 'Psalms' or type your request to start your journey of spiritual guidance.";
        elements.quoteRef.textContent = "- Biblical Wisdom";
        musicManager.switchMode('bible');
      } else {
        elements.quoteCard.classList.remove("bible-mode");
        elements.quoteText.textContent = "Click 'Inspire Me', 'Give Me Strength', 'Help Me Focus' or type your request to find your daily dose of inspiration.";
        elements.quoteRef.textContent = "- Inspirational Speeches";
        musicManager.switchMode('inspirational');
      }

      // Reset current indices when switching modes
      state.currentBiblicalIndex = 0;
      state.currentQuoteIndex = 0;

      this.updateHeader();
      this.updateActionButtons();
      quoteManager.updateStats();

      elements.quoteCard.classList.remove("flipping");
      elements.quoteCard.classList.add("flipped");

      setTimeout(() => {
        elements.quoteCard.classList.remove("flipped");
      }, 300);
    }, 300);
  }
};

const inputProcessor = {
  findMatchingPattern(input) {
    for (const [category, patterns] of Object.entries(inputPatterns)) {
      if (patterns.some(pattern => input.includes(pattern))) {
        return category;
      }
    }
    return null;
  },

  async handleMatchedPattern(pattern) {
    const isBiblical = state.isBibleMode;

    if (isBiblical) {
      switch (pattern) {
        case "teach":
          await quoteManager.showNextQuoteFromSection('oldTestament');
          break;
        case "lead":
          await quoteManager.showNextQuoteFromSection('psalms');
          break;
        case "guide":
          await quoteManager.showNextQuoteFromSection('newTestament');
          break;
        case "random":
          await quoteManager.showRandomQuoteFromAllBible();
          break;
        case "next":
          await quoteManager.showNextQuote();
          break;
        case "previous":
          await quoteManager.showPreviousQuote();
          break;
        default:
          await quoteManager.showNextQuote();
      }
    } else {
      switch (pattern) {
        case "inspire":
          await quoteManager.showRandomQuoteFromCategory('inspirational');
          break;
        case "strengthen":
          await quoteManager.showRandomQuoteFromCategory('strengthening');
          break;
        case "focus":
          await quoteManager.showRandomQuoteFromCategory('focus');
          break;
        case "random":
          await quoteManager.showRandomQuoteFromAllInspirational();
          break;
        case "next":
          await quoteManager.showNextQuote();
          break;
        case "previous":
          await quoteManager.showPreviousQuote();
          break;
        default:
          await quoteManager.showNextQuote();
      }
    }
  },

  async handleUserInput() {
    const input = elements.userInput.value.trim().toLowerCase();
    if (!input) return;

    elements.userInput.value = "";
    const matchedPattern = this.findMatchingPattern(input);

    if (matchedPattern) {
      await this.handleMatchedPattern(matchedPattern);
    } else {
      await quoteManager.showNextQuote();
    }
  },

  async handleQuickAction(action) {
    if (state.isBibleMode) {
      switch (action) {
        case "oldT":
          await quoteManager.showNextQuoteFromSection('oldTestament');
          break;
        case "psalm":
          await quoteManager.showNextQuoteFromSection('psalms');
          break;
        case "newT":
          await quoteManager.showNextQuoteFromSection('newTestament');
          break;
        case "random":
          await quoteManager.showRandomQuoteFromAllBible();
          break;
        case "inspirational":
          uiManager.toggleBibleMode();
          break;
      }
    } else {
      switch (action) {
        case "oldT": // Inspire Me button
          await quoteManager.showRandomQuoteFromCategory('inspirational');
          break;
        case "newT": // Give Me Strength button
          await quoteManager.showRandomQuoteFromCategory('strengthening');
          break;
        case "psalm": // Help Me Focus button
          await quoteManager.showRandomQuoteFromCategory('focus');
          break;
        case "random":
          await quoteManager.showRandomQuoteFromAllInspirational();
          break;
        case "biblical":
        case "inspirational":
          uiManager.toggleBibleMode();
          break;
      }
    }
  }
};

const helpManager = {
  init() {
    this.createHelpButton();
    this.createHelpPopup();
  },

  createHelpButton() {
    const headerControls = document.querySelector('.header-controls');
    const helpBtn = document.createElement('button');
    helpBtn.id = 'help-toggle';
    helpBtn.className = 'help-toggle';
    helpBtn.innerHTML = '<i class="fas fa-question-circle"></i>';
    helpBtn.title = 'Help & Information';
    helpBtn.style.cssText = `
      background: var(--button-bg);
      border: var(--button-border);
      color: var(--button-color);
      padding: 10px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-left: 10px;
    `;

    helpBtn.addEventListener('click', () => this.toggleHelp());
    headerControls.appendChild(helpBtn);
  },

  createHelpPopup() {
    const popup = document.createElement('div');
    popup.id = 'help-popup';
    popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--card-bg);
      border: var(--card-border);
      border-radius: 15px;
      padding: 30px;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      z-index: 2000;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      display: none;
    `;

    popup.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2 style="margin: 0; color: var(--text-color);">Help & Information</h2>
        <button id="close-help" style="background: none; border: none; font-size: 24px; cursor: pointer; color: var(--text-color);">×</button>
      </div>
      
      <div style="color: var(--text-color); line-height: 1.6;">
        <h3>🎵 Music Controls</h3>
        <ul>
          <li><strong>Music Toggle:</strong> Click the music icon to play/pause</li>
          <li><strong>Previous/Next:</strong> Hover over music icon to see controls</li>
          <li><strong>Number Keys (1-10):</strong> Press to play specific tracks</li>
          <li><strong>Number Key (0):</strong> Press to stop music</li>
        </ul>

        <h3>🎯 Quote Navigation</h3>
        <ul>
          <li><strong>Arrow Right / Space:</strong> Next quote</li>
          <li><strong>Arrow Left:</strong> Previous quote</li>
          <li><strong>R:</strong> Random quote</li>
          <li><strong>B:</strong> Toggle between Biblical and Inspirational modes</li>
        </ul>

        <h3>🎨 Interface Controls</h3>
        <ul>
          <li><strong>T:</strong> Toggle dark/light theme</li>
          <li><strong>M:</strong> Toggle music on/off</li>
          <li><strong>Double-click quote:</strong> Copy to clipboard</li>
        </ul>

        <h3>📖 Biblical Mode</h3>
        <ul>
          <li><strong>Old Testament:</strong> Wisdom from the Old Testament</li>
          <li><strong>New Testament:</strong> Teachings from the New Testament</li>
          <li><strong>Psalms:</strong> Inspirational Psalms</li>
          <li><strong>Random:</strong> Random biblical quote</li>
        </ul>

        <h3>🔥 Inspirational Mode</h3>
        <ul>
          <li><strong>Inspire Me:</strong> General inspirational quotes</li>
          <li><strong>Give Me Strength:</strong> Motivational strength quotes</li>
          <li><strong>Help Me Focus:</strong> Focus and concentration quotes</li>
          <li><strong>Random:</strong> Random inspirational quote</li>
        </ul>

        <h3>💬 Text Input</h3>
        <p>Type natural language requests like:</p>
        <ul>
          <li>"teach me" (Old Testament)</li>
          <li>"lead me" (Psalms)</li>
          <li>"guide me" (New Testament)</li>
          <li>"inspire me" (Inspirational)</li>
          <li>"strengthen me" (Strength)</li>
          <li>"help me focus" (Focus)</li>
        </ul>
      </div>
    `;

    document.body.appendChild(popup);

    // Close button functionality
    document.getElementById('close-help').addEventListener('click', () => this.hideHelp());

    // Click outside to close
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        this.hideHelp();
      }
    });
  },

  toggleHelp() {
    const popup = document.getElementById('help-popup');
    if (popup.style.display === 'block') {
      this.hideHelp();
    } else {
      this.showHelp();
    }
  },

  showHelp() {
    const popup = document.getElementById('help-popup');
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
  },

  hideHelp() {
    const popup = document.getElementById('help-popup');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
};

const interactiveFeatures = {
  init() {
    elements.quoteCard.addEventListener("dblclick", () => {
      const textToCopy = `${elements.quoteText.textContent} - ${elements.quoteRef.textContent}`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.showToast("Quote copied to clipboard!");
      });
    });

    document.addEventListener("keydown", (e) => {
      if (document.activeElement === elements.userInput) {
        return;
      }

      const key = e.key.toLowerCase();

      // Number keys for music control (0-9)
      if (key >= "0" && key <= "9") {
        e.preventDefault();
        const trackNumber = key === "0" ? 0 : parseInt(key);
        musicManager.playTrack(trackNumber);
        return;
      }

      switch (key) {
        case "arrowright":
        case " ":
          e.preventDefault();
          quoteManager.showNextQuote();
          break;
        case "arrowleft":
          e.preventDefault();
          quoteManager.showPreviousQuote();
          break;
        case "r":
          e.preventDefault();
          quoteManager.showRandomQuote(state.isBibleMode);
          break;
        case "t":
          e.preventDefault();
          themeManager.toggle();
          break;
        case "m":
          e.preventDefault();
          musicManager.toggle();
          break;
        case "b":
          e.preventDefault();
          uiManager.toggleBibleMode();
          break;
      }
    });
  },

  showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 12px 20px;
      border-radius: 25px;
      font-size: 14px;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "slideOut 0.3s ease";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);
  }
};

const eventListeners = {
  init() {
    console.log("🔗 Setting up event listeners...");

    // Submit button
    if (elements.submitBtn) {
      console.log("✅ Adding submit button listener");
      elements.submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("📝 Submit button clicked");
        try {
          handleUserInput();
        } catch (error) {
          console.error("❌ Error in submit button handler:", error);
        }
      }, true); // Use capture phase
    } else {
      console.log("❌ Submit button not found");
    }

    // Input field
    if (elements.userInput) {
      console.log("✅ Adding input field listener");
      elements.userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          console.log("📝 Enter key pressed in input");
          try {
            handleUserInput();
          } catch (error) {
            console.error("❌ Error in input handler:", error);
          }
        }
      });
    } else {
      console.log("❌ Input field not found");
    }

    // Previous button
    if (elements.prevBtn) {
      console.log("✅ Adding previous button listener");
      elements.prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("⬅️ Previous button clicked");
        try {
          showPreviousQuote();
        } catch (error) {
          console.error("❌ Error in previous button handler:", error);
        }
      }, true); // Use capture phase
    } else {
      console.log("❌ Previous button not found");
    }

    // Next button
    if (elements.nextBtn) {
      console.log("✅ Adding next button listener");
      elements.nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("➡️ Next button clicked");
        try {
          showNextQuote();
        } catch (error) {
          console.error("❌ Error in next button handler:", error);
        }
      }, true); // Use capture phase
    } else {
      console.log("❌ Next button not found");
    }

    // Action buttons
    if (elements.actionBtns && elements.actionBtns.length > 0) {
      console.log(`✅ Adding ${elements.actionBtns.length} action button listeners`);
      elements.actionBtns.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const action = e.target.closest(".action-btn").dataset.action;
          console.log(`🎯 Action button ${index + 1} clicked: ${action}`);
          try {
            handleActionClick(action);
          } catch (error) {
            console.error("❌ Error in action button handler:", error);
          }
        }, true); // Use capture phase
      });
    } else {
      console.log("❌ Action buttons not found");
    }

    // Theme toggle
    if (elements.themeToggle) {
      console.log("✅ Adding theme toggle listener");
      elements.themeToggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("🌙 Theme toggle clicked");
        try {
          themeManager.toggle();
        } catch (error) {
          console.error("❌ Error in theme toggle handler:", error);
        }
      }, true); // Use capture phase
    } else {
      console.log("❌ Theme toggle not found");
    }

    // Music toggle
    if (elements.musicToggle) {
      console.log("✅ Adding music toggle listener");
      elements.musicToggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("🎵 Music toggle clicked");
        try {
          musicManager.toggle();
        } catch (error) {
          console.error("❌ Error in music toggle handler:", error);
        }
      }, true); // Use capture phase
    } else {
      console.log("❌ Music toggle not found");
    }

    // Focus input field
    if (elements.userInput) {
      elements.userInput.focus();
      console.log("✅ Input field focused");
    }

    console.log("🔗 Event listeners setup complete");
  }
};

async function init() {
  console.log("🚀 Starting app initialization...");
  console.log("🔍 Current DOM ready state:", document.readyState);

  try {
    // First, ensure DOM elements are available
    console.log("🔍 Initializing DOM elements...");
    initializeElements();

    // Check if all critical elements are found
    const criticalElements = ['quoteText', 'quoteRef', 'submitBtn', 'prevBtn', 'nextBtn', 'actionBtns', 'themeToggle', 'musicToggle'];
    const missingElements = criticalElements.filter(name => !elements[name]);
    
    if (missingElements.length > 0) {
      console.error("❌ Critical elements missing:", missingElements);
      // Try to reinitialize after a short delay
      setTimeout(() => {
        console.log("🔄 Retrying element initialization...");
        initializeElements();
        if (missingElements.some(name => !elements[name])) {
          console.error("❌ Still missing elements after retry:", missingElements);
          return;
        }
        // Continue with initialization if elements are now found
        continueInit();
      }, 100);
      return;
    }

    continueInit();
  } catch (error) {
    console.error("❌ Error during app initialization:", error);
  }
}

async function continueInit() {
  try {
    console.log("🎨 Initializing theme manager...");
    themeManager.init();

    console.log("🎵 Initializing music manager...");
    musicManager.init();

    console.log("❓ Initializing help manager...");
    helpManager.init();

    console.log("📚 Preloading quotes...");
    await quoteLoader.preloadAllQuotes();

    console.log("📊 Updating stats...");
    quoteManager.updateStats();

    console.log("🔗 Setting up event listeners...");
    eventListeners.init();

    console.log("🎮 Setting up interactive features...");
    interactiveFeatures.init();

    if (elements.quoteCard) {
      elements.quoteCard.classList.add("bible-mode");
    }

    console.log("📝 Updating header...");
    uiManager.updateHeader();

    // Remove temporary handlers and replace with real functionality
    console.log("🔄 Removing temporary handlers and enabling full functionality...");
    if (window.tempHandlers) {
      window.tempHandlers.forEach(({element, handler, event}) => {
        element.removeEventListener(event, handler, true);
      });
      window.tempHandlers = [];
      console.log("✅ Temporary handlers removed");
    }

    // Style the inspirational button after everything is loaded
    setTimeout(() => {
      console.log("⏰ Running delayed styling...");
      const inspirationalBtn = document.querySelector('.bible-mode .action-btn[data-action="inspirational"]');
      if (inspirationalBtn) {
        inspirationalBtn.style.background = 'linear-gradient(135deg, rgba(139, 69, 19, 0.95) 0%, rgba(210, 105, 30, 0.95) 100%)';
        inspirationalBtn.style.border = 'none';
        inspirationalBtn.style.color = 'white';
        console.log("✅ Inspirational button styled");
      } else {
        console.log("❌ Inspirational button not found for styling");
      }
    }, 100);

    console.log("✅ App initialization complete! Full functionality is now active.");
  } catch (error) {
    console.error("❌ Error during app initialization:", error);
  }
}

const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  .bible-mode .action-btn[data-action="inspirational"] {
    background: linear-gradient(135deg, rgba(139, 69, 19, 0.95) 0%, rgba(210, 105, 30, 0.95) 100%) !important;
    border: none !important;
    color: white !important;
  }
  
  .bible-mode .action-btn[data-action="inspirational"]:hover {
    background: linear-gradient(135deg, rgba(160, 82, 45, 0.95) 0%, rgba(255, 140, 0, 0.95) 100%) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3) !important;
  }
`;
document.head.appendChild(style);

// QuoLand App - Biblical Wisdom and Inspirational Quotes

// Initialize the app
document.addEventListener("DOMContentLoaded", init);

// Removed duplicate setup functions - using the main initialization system instead

function handleActionClick(action) {
  console.log("🎯 handleActionClick called with action:", action);
  console.log("🔍 inputProcessor available:", typeof inputProcessor);
  console.log("🔍 inputProcessor.handleQuickAction available:", typeof inputProcessor?.handleQuickAction);
  
  // Use the proper inputProcessor to handle actions
  if (inputProcessor && inputProcessor.handleQuickAction) {
    inputProcessor.handleQuickAction(action);
  } else {
    console.error("❌ inputProcessor not available, falling back to basic functionality");
    // Fallback for basic functionality
    switch (action) {
      case "oldT":
        quoteManager.showNextQuoteFromSection('oldTestament');
        break;
      case "newT":
        quoteManager.showNextQuoteFromSection('newTestament');
        break;
      case "psalm":
        quoteManager.showNextQuoteFromSection('psalms');
        break;
      case "random":
        quoteManager.showRandomQuote(state.isBibleMode);
        break;
      case "inspirational":
        uiManager.toggleBibleMode();
        break;
    }
  }
}

function showNextQuote() {
  console.log("➡️ showNextQuote called");
  console.log("🔍 quoteManager available:", typeof quoteManager);
  if (quoteManager && quoteManager.showNextQuote) {
    quoteManager.showNextQuote();
  } else {
    console.error("❌ quoteManager not available");
  }
}

function showPreviousQuote() {
  console.log("⬅️ showPreviousQuote called");
  console.log("🔍 quoteManager available:", typeof quoteManager);
  if (quoteManager && quoteManager.showPreviousQuote) {
    quoteManager.showPreviousQuote();
  } else {
    console.error("❌ quoteManager not available");
  }
}

function handleUserInput() {
  console.log("📝 handleUserInput called");
  console.log("🔍 inputProcessor available:", typeof inputProcessor);
  if (inputProcessor && inputProcessor.handleUserInput) {
    inputProcessor.handleUserInput();
  } else {
    console.error("❌ inputProcessor not available");
  }
}

// Clean initialization - no more complex fallbacks

// Clean app object
window.quoLandApp = {
  showRandomQuote,
  showNextQuote,
  showPreviousQuote,
  displayQuote
};

// App initialization complete
