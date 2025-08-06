const state = {
  currentQuoteIndex: 0,
  currentBiblicalIndex: 0,
  viewedQuotes: new Set(),
  viewedBiblicalQuotes: new Set(),
  quoteHistory: [],
  biblicalQuoteHistory: [],
  isBibleMode: true
};

const elements = {
  quoteText: document.getElementById("quote-text"),
  quoteAuthor: document.getElementById("quote-author"),
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

const inputPatterns = {
  inspire: ["inspire", "inspiration", "inspire me", "give me inspiration", "i need inspiration"],
  strength: ["strength", "strong", "give me strength", "i need strength", "power"],
  focus: ["focus", "concentrate", "help me focus", "i need focus", "concentration"],
  next: ["next", "next quote", "another", "more", "continue"],
  previous: ["previous", "back", "go back", "last quote"],
  random: ["random", "surprise me", "any quote", "whatever"]
};

const buttonConfigs = {
  bible: {
    oldT: { icon: "fas fa-scroll", text: "Old Testament" },
    newT: { icon: "fas fa-book-open", text: "New Testament" },
    psalm: { icon: "fas fa-music", text: "Psalms" },
    random: { icon: "fas fa-dice", text: "Random" },
    inspiration: { icon: "fas fa-fire", text: "Inspirational Quotes" }
  },
  inspirational: {
    inspire: { icon: "fas fa-star", text: "Inspire Me" },
    strength: { icon: "fas fa-fist-raised", text: "Give Me Strength" },
    focus: { icon: "fas fa-bullseye", text: "Help Me Focus" },
    random: { icon: "fas fa-dice", text: "Random" },
    biblical: { icon: "fas fa-cross", text: "Biblical Wisdom" }
  }
};

const headerConfigs = {
  bible: {
    title: '<i class="fas fa-cross"></i> Biblical Wisdom',
    subtitle: "Find spiritual guidance and divine inspiration 🙏🏾",
    placeholder: "Type 'strengthen me' or 'guide me'..."
  },
  inspirational: {
    title: '<i class="fas fa-fire"></i> inspirational Speeches',
    subtitle: "Find your daily dose of inspiration",
    placeholder: "Type 'motivate me' or 'give me inspiration'..."
  }
};

const themeManager = {
  init() {
    const savedTheme = localStorage.getItem("theme") || "light";
    this.set(savedTheme);
  },

  set(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    const icon = elements.themeToggle.querySelector("i");
    const isDark = theme === "dark";
    icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    elements.themeToggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
  },

  toggle() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    this.set(newTheme);

    elements.themeToggle.style.transform = "scale(0.9)";
    setTimeout(() => {
      elements.themeToggle.style.transform = "scale(1)";
    }, 150);
  }
};

const musicManager = {
  audio: null,
  isPlaying: false,
  currentMode: 'bible', 

  init() {
    this.createAudioElements();
    this.loadSettings();
    this.updateMusicButton();
  },

  createAudioElements() {
    this.bibleAudio = new Audio();
    this.bibleAudio.loop = true;
    this.bibleAudio.volume = 0.3;

    this.inspirationalAudio = new Audio();
    this.inspirationalAudio.loop = true;
    this.inspirationalAudio.volume = 0.3;

    this.bibleAudio.src = './Music/Track 11 ከሙሴ የሚልቅ.mp3'; 
    this.inspirationalAudio.src = './Music/David_Goggins.mp3'; 

    this.audio = this.bibleAudio;
  },

  loadSettings() {
    const savedMusicState = localStorage.getItem("musicEnabled");
    if (savedMusicState === "true") {
      this.isPlaying = true;
    }
  },

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }

    elements.musicToggle.style.transform = "scale(0.9)";
    setTimeout(() => {
      elements.musicToggle.style.transform = "scale(1)";
    }, 150);
  },

  play() {
    if (!this.audio) return;

    this.audio.play().then(() => {
      this.isPlaying = true;
      this.updateMusicButton();
      localStorage.setItem("musicEnabled", "true");
    }).catch(error => {
      console.log("Music playback failed:", error);
      interactiveFeatures.showToast("Music playback not available");
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

  switchMode(mode) {
    if (this.currentMode === mode) return;

    const wasPlaying = this.isPlaying;

    if (this.isPlaying) {
      this.stop();
    }

    this.currentMode = mode;
    this.audio = mode === 'bible' ? this.bibleAudio : this.inspirationalAudio;

    if (wasPlaying) {
      this.play();
    }
  },

  updateMusicButton() {
    const icon = elements.musicToggle.querySelector("i");
    const isPlaying = this.isPlaying;

    if (isPlaying) {
      elements.musicToggle.classList.add("playing");
      icon.className = "fas fa-volume-mute";
      elements.musicToggle.title = "Stop background music";
    } else {
      elements.musicToggle.classList.remove("playing");
      icon.className = "fas fa-music";
      elements.musicToggle.title = "Play background music";
    }
  }
};

const quoteManager = {
  currentBibleSection: 'oldTestament',
  sectionIndices: {
    oldTestament: 0,
    newTestament: 0,
    psalms: 0
  },

  showQuote(index, isBiblical = false, section = null) {
    let quotes;
    if (isBiblical) {
      if (section) {
        this.currentBibleSection = section;
        quotes = this.getBibleQuotes(section);
      } else {
        quotes = this.getBibleQuotes(this.currentBibleSection);
      }
    } else {
      quotes = inspirationalSpeeches;
    }
    
    const quote = quotes[index];

    if (!quote) return;

    elements.quoteCard.classList.add("fade-out");

    setTimeout(() => {
      elements.quoteText.textContent = quote.text;
      elements.quoteAuthor.textContent = isBiblical ? `- ${quote.reference}` : `- ${quote.author}`;

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
    } else {
      state.currentQuoteIndex = index;
      state.viewedQuotes.add(index);
      state.quoteHistory.push(index);
    }

    this.updateStats();
    this.updateNavigationButtons();
  },

  getBibleQuotes(section) {
    switch(section) {
      case 'oldTestament':
        return oldTestament;
      case 'newTestament':
        return newTestament;
      case 'psalms':
        return psalms;
      default:
        return oldTestament;
    }
  },

  showNextQuoteFromSection(section) {
    const quotes = this.getBibleQuotes(section);
    const currentIndex = this.sectionIndices[section];
    this.showQuote(currentIndex, true, section);
    
    // Move to next quote in sequence, loop back to beginning if at end
    this.sectionIndices[section] = (currentIndex + 1) % quotes.length;
  },

  showRandomQuoteFromAllBible() {
    const allBibleQuotes = [...oldTestament, ...newTestament, ...psalms];
    const randomIndex = Math.floor(Math.random() * allBibleQuotes.length);
    
    // Find which section this quote belongs to
    let currentIndex = 0;
    let section = 'oldTestament';
    
    if (randomIndex >= oldTestament.length) {
      currentIndex = randomIndex - oldTestament.length;
      if (randomIndex >= oldTestament.length + newTestament.length) {
        currentIndex = randomIndex - oldTestament.length - newTestament.length;
        section = 'psalms';
      } else {
        section = 'newTestament';
      }
    } else {
      currentIndex = randomIndex;
    }
    
    this.showQuote(currentIndex, true, section);
  },

  showRandomQuote(isBiblical = false) {
    if (isBiblical) {
      this.showRandomQuoteFromAllBible();
    } else {
      const randomIndex = Math.floor(Math.random() * inspirationalSpeeches.length);
      this.showQuote(randomIndex, false);
    }
  },

  showNextQuote() {
    const isBiblical = state.isBibleMode;
    if (isBiblical) {
      // Use the sequential method for the current section
      this.showNextQuoteFromSection(this.currentBibleSection);
    } else {
      const nextIndex = (state.currentQuoteIndex + 1) % inspirationalSpeeches.length;
      this.showQuote(nextIndex, false);
    }
  },

  showPreviousQuote() {
    const isBiblical = state.isBibleMode;
    const history = isBiblical ? state.biblicalQuoteHistory : state.quoteHistory;

    if (history.length > 1) {
      history.pop();
      const previousIndex = history[history.length - 1];
      if (isBiblical) {
        this.showQuote(previousIndex, true, this.currentBibleSection);
      } else {
        this.showQuote(previousIndex, false);
      }
    }
  },

  updateStats() {
    if (state.isBibleMode) {
      elements.quoteCount.textContent = state.viewedBiblicalQuotes.size;
      elements.currentIndex.textContent = state.currentBiblicalIndex + 1;
    } else {
      elements.quoteCount.textContent = state.viewedQuotes.size;
      elements.currentIndex.textContent = state.currentQuoteIndex + 1;
    }
  },

  updateNavigationButtons() {
    const history = state.isBibleMode ? state.biblicalQuoteHistory : state.quoteHistory;
    elements.prevBtn.disabled = history.length <= 1;
    elements.nextBtn.disabled = false;
  }
};

// UI manager
const uiManager = {
  updateActionButtons() {
    const config = state.isBibleMode ? buttonConfigs.bible : buttonConfigs.inspirational;

    elements.actionBtns.forEach(btn => {
      const action = btn.dataset.action;
      const buttonConfig = config[action];
      if (buttonConfig) {
        btn.innerHTML = `<i class="${buttonConfig.icon}"></i> ${buttonConfig.text}`;
      }
    });
  },

  updateHeader() {
    const config = state.isBibleMode ? headerConfigs.bible : headerConfigs.inspirational;
    const headerTitle = document.querySelector(".header h1");
    const headerSubtitle = document.querySelector(".header p");

    headerTitle.innerHTML = config.title;
    headerSubtitle.textContent = config.subtitle;
    elements.userInput.placeholder = config.placeholder;
  },

  toggleBibleMode() {
    state.isBibleMode = !state.isBibleMode;

    elements.quoteCard.classList.add("flipping");

    setTimeout(() => {
      if (state.isBibleMode) {
        elements.quoteCard.classList.add("bible-mode");
        quoteManager.showNextQuoteFromSection('oldTestament');
        musicManager.switchMode('bible');
      } else {
        elements.quoteCard.classList.remove("bible-mode");
        quoteManager.showRandomQuote(false);
        musicManager.switchMode('inspirational');
      }

      this.updateActionButtons();
      this.updateHeader();

      elements.quoteCard.classList.remove("flipping");
      elements.quoteCard.classList.add("flipped");

      setTimeout(() => {
        elements.quoteCard.classList.remove("flipped");
      }, 300);
    }, 300);
  }
};

// Input processor
const inputProcessor = {
  findMatchingPattern(input) {
    for (const [category, patterns] of Object.entries(inputPatterns)) {
      if (patterns.some(pattern => input.includes(pattern))) {
        return category;
      }
    }
    return null;
  },

  handleMatchedPattern(pattern) {
    const isBiblical = state.isBibleMode;

    if (isBiblical) {
      switch (pattern) {
        case "motivate":
          quoteManager.showNextQuoteFromSection('oldTestament');
          break;
        case "inspire":
          quoteManager.showNextQuoteFromSection('newTestament');
          break;
        case "strength":
          quoteManager.showNextQuoteFromSection('psalms');
          break;
        case "focus":
        case "random":
          quoteManager.showRandomQuoteFromAllBible();
          break;
        case "next":
          quoteManager.showNextQuote();
          break;
        case "previous":
          quoteManager.showPreviousQuote();
          break;
        default:
          quoteManager.showNextQuote();
      }
    } else {
      switch (pattern) {
        case "motivate":
        case "inspire":
        case "strength":
        case "focus":
        case "random":
          quoteManager.showRandomQuote(false);
          break;
        case "next":
          quoteManager.showNextQuote();
          break;
        case "previous":
          quoteManager.showPreviousQuote();
          break;
        default:
          quoteManager.showNextQuote();
      }
    }
  },

  handleUserInput() {
    const input = elements.userInput.value.trim().toLowerCase();
    if (!input) return;

    elements.userInput.value = "";
    const matchedPattern = this.findMatchingPattern(input);

    if (matchedPattern) {
      this.handleMatchedPattern(matchedPattern);
    } else {
      quoteManager.showNextQuote();
    }
  },

  handleQuickAction(action) {
    if (state.isBibleMode) {
      switch(action) {
        case "motivate": // Old Testament
          quoteManager.showNextQuoteFromSection('oldTestament');
          break;
        case "inspire": // New Testament
          quoteManager.showNextQuoteFromSection('newTestament');
          break;
        case "strength": // Psalms
          quoteManager.showNextQuoteFromSection('psalms');
          break;
        case "focus": // Random from all Bible sections
          quoteManager.showRandomQuoteFromAllBible();
          break;
        case "inspirational":
          uiManager.toggleBibleMode();
          break;
      }
    } else {
      // inspirational mode - keep existing behavior
      if (["motivate", "inspire", "strength", "focus"].includes(action)) {
        quoteManager.showRandomQuote(false);
      } else if (action === "inspirational") {
        uiManager.toggleBibleMode();
      }
    }
  }
};

const interactiveFeatures = {
  init() {
    elements.quoteCard.addEventListener("dblclick", () => {
      const textToCopy = `${elements.quoteText.textContent} - ${elements.quoteAuthor.textContent}`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.showToast("Quote copied to clipboard!");
      });
    });

    document.addEventListener("keydown", (e) => {
      const key = e.key.toLowerCase();

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
    elements.submitBtn.addEventListener("click", () => inputProcessor.handleUserInput());

    elements.userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        inputProcessor.handleUserInput();
      }
    });

    elements.prevBtn.addEventListener("click", () => quoteManager.showPreviousQuote());
    elements.nextBtn.addEventListener("click", () => quoteManager.showNextQuote());

    elements.actionBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const action = e.target.closest(".action-btn").dataset.action;
        inputProcessor.handleQuickAction(action);
      });
    });

    elements.themeToggle.addEventListener("click", () => themeManager.toggle());
    elements.musicToggle.addEventListener("click", () => musicManager.toggle());
    elements.userInput.focus();
  }
};

function init() {
  themeManager.init();
  musicManager.init();
  quoteManager.updateStats();
  eventListeners.init();
  interactiveFeatures.init();

      elements.quoteCard.classList.add("bible-mode");
    uiManager.updateHeader();
    quoteManager.showNextQuoteFromSection('oldTestament');
    uiManager.updateActionButtons();
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

document.addEventListener("DOMContentLoaded", () => {
  init();

  setTimeout(() => {
    const inspirationalBtn = document.querySelector('.bible-mode .action-btn[data-action="inspirational"]');
    if (inspirationalBtn) {
      inspirationalBtn.style.background = 'linear-gradient(135deg, rgba(139, 69, 19, 0.95) 0%, rgba(210, 105, 30, 0.95) 100%)';
      inspirationalBtn.style.border = 'none';
      inspirationalBtn.style.color = 'white';
    }
  }, 100);
});

window.inspirationalApp = {
  showQuote: (index) => quoteManager.showQuote(index, state.isBibleMode),
  showNextQuote: () => quoteManager.showNextQuote(),
  showPreviousQuote: () => quoteManager.showPreviousQuote(),
  showRandomQuote: () => quoteManager.showRandomQuote(state.isBibleMode),
  addQuote: (text, author) => {
    inspirationalSpeeches.push({ text, author });
  },
};
