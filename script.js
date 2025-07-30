const biblicalQuotes = [
  {
    text: "I an do all things through Christ who strengthens me.",
    reference: "Philippians 4:13",
  },
  {
    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11",
  },
  {
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reference: "Joshua 1:9",
  },
  {
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
  },
  {
    text: "The Lord is my strength and my shield; my heart trusts in him, and he helps me.",
    reference: "Psalm 28:7",
  },
  {
    text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    reference: "Isaiah 40:31",
  },
  {
    text: "Come to me, all you who are weary and burdened, and I will give you rest.",
    reference: "Matthew 11:28",
  },
  {
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16",
  },
  {
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28",
  },
  {
    text: "The Lord is my shepherd, I lack nothing.",
    reference: "Psalm 23:1",
  },
  {
    text: "Do not be anxious about anything, but present your requests to God with thanksgiving.",
    reference: "Philippians 4:6",
  },
  {
    text: "Cast your cares on the Lord and he will sustain you; he will never let the righteous be shaken.",
    reference: "Psalm 55:22",
  },
  {
    text: "Be joyful in hope, patient in affliction, faithful in prayer.",
    reference: "Romans 12:12",
  },
  {
    text: "The Lord gives strength to his people; the Lord blesses his people with peace.",
    reference: "Psalm 29:11",
  },
  {
    text: "In all your ways acknowledge him, and he will make straight your paths.",
    reference: "Proverbs 3:6",
  },
  {
    text: "Let not your hearts be troubled, neither let them be afraid.",
    reference: "John 14:27",
  },
  {
    text: "The Lord is near to all who call on him in truth.",
    reference: "Psalm 145:18",
  },
  {
    text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness.",
    reference: "Galatians 5:22",
  },
  {
    text: "I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.",
    reference: "John 16:33",
  },
  {
    text: "The Lord is my light and my salvation—whom shall I fear?",
    reference: "Psalm 27:1",
  },
  {
    text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    reference: "2 Corinthians 5:17",
  },
  {
    text: "For nothing is impossible with God.",
    reference: "Luke 1:37",
  },
];

const motivationalSpeeches = [
  {
    text: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    author: "Steve Jobs",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
  },
  {
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown",
  },
  {
    text: "Dream big and dare to fail.",
    author: "Norman Vaughan",
  },
  {
    text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar",
  },
  {
    text: "The best revenge is massive success.",
    author: "Frank Sinatra",
  },
  {
    text: "I find that the harder I work, the more luck I seem to have.",
    author: "Thomas Jefferson",
  },
  {
    text: "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill",
  },
  {
    text: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson",
  },
  {
    text: "Go confidently in the direction of your dreams. Live the life you have imagined.",
    author: "Henry David Thoreau",
  },
  {
    text: "When one door of happiness closes, another opens; but often we look so long at the closed door that we do not see the one which has been opened for us.",
    author: "Helen Keller",
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
  {
    text: "It might be too late to make something, but is it too late to try?",
    author: "Kirubel",
  },
];

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
  motivate: ["motivate", "motivation", "motivate me", "give me motivation", "i need motivation"],
  inspire: ["inspire", "inspiration", "inspire me", "give me inspiration", "i need inspiration"],
  strength: ["strength", "strong", "give me strength", "i need strength", "power"],
  focus: ["focus", "concentrate", "help me focus", "i need focus", "concentration"],
  next: ["next", "next quote", "another", "more", "continue"],
  previous: ["previous", "back", "go back", "last quote"],
  random: ["random", "surprise me", "any quote", "whatever"]
};

const buttonConfigs = {
  bible: {
    motivate: { icon: "fas fa-scroll", text: "Old Testament" },
    inspire: { icon: "fas fa-book-open", text: "New Testament" },
    strength: { icon: "fas fa-music", text: "Psalms" },
    focus: { icon: "fas fa-dice", text: "Random" },
    motivational: { icon: "fas fa-fire", text: "Motivational Quotes" }
  },
  motivational: {
    motivate: { icon: "fas fa-fire", text: "Motivate Me" },
    inspire: { icon: "fas fa-star", text: "Inspire Me" },
    strength: { icon: "fas fa-fist-raised", text: "Give Me Strength" },
    focus: { icon: "fas fa-bullseye", text: "Help Me Focus" },
    motivational: { icon: "fas fa-cross", text: "Biblical Wisdom" }
  }
};

const headerConfigs = {
  bible: {
    title: '<i class="fas fa-cross"></i> Biblical Wisdom',
    subtitle: "Find spiritual guidance and divine inspiration 🙏🏾",
    placeholder: "Type 'strengthen me' or 'guide me'..."
  },
  motivational: {
    title: '<i class="fas fa-fire"></i> Motivational Speeches',
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
    
    // Animation effect
    elements.themeToggle.style.transform = "scale(0.9)";
    setTimeout(() => {
      elements.themeToggle.style.transform = "scale(1)";
    }, 150);
  }
};

const musicManager = {
  audio: null,
  isPlaying: false,
  currentMode: 'bible', // 'bible' or 'motivational'
  
  init() {
    this.createAudioElements();
    this.loadSettings();
    this.updateMusicButton();
  },
  
  createAudioElements() {
    this.bibleAudio = new Audio();
    this.bibleAudio.loop = true;
    this.bibleAudio.volume = 0.3;
    
    this.motivationalAudio = new Audio();
    this.motivationalAudio.loop = true;
    this.motivationalAudio.volume = 0.3;
    
    // Set audio sources (you can replace these with actual music files)
    // For Bible mode: Use calming, spiritual music (e.g., Gregorian chants, peaceful hymns)
    // For Motivational mode: Use uplifting, energetic music (e.g., inspiring instrumentals)
    this.bibleAudio.src = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'; // Replace with actual Bible mode music
    this.motivationalAudio.src = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'; // Replace with actual Motivational mode music
    
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
    
    // Animation effect
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
    this.audio = mode === 'bible' ? this.bibleAudio : this.motivationalAudio;
    
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
  showQuote(index, isBiblical = false) {
    const quotes = isBiblical ? biblicalQuotes : motivationalSpeeches;
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

  showRandomQuote(isBiblical = false) {
    const quotes = isBiblical ? biblicalQuotes : motivationalSpeeches;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    this.showQuote(randomIndex, isBiblical);
  },

  showNextQuote() {
    const isBiblical = state.isBibleMode;
    const quotes = isBiblical ? biblicalQuotes : motivationalSpeeches;
    const currentIndex = isBiblical ? state.currentBiblicalIndex : state.currentQuoteIndex;
    const nextIndex = (currentIndex + 1) % quotes.length;
    this.showQuote(nextIndex, isBiblical);
  },

  showPreviousQuote() {
    const isBiblical = state.isBibleMode;
    const history = isBiblical ? state.biblicalQuoteHistory : state.quoteHistory;
    
    if (history.length > 1) {
      history.pop();
      const previousIndex = history[history.length - 1];
      this.showQuote(previousIndex, isBiblical);
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
    const config = state.isBibleMode ? buttonConfigs.bible : buttonConfigs.motivational;
    
    elements.actionBtns.forEach(btn => {
      const action = btn.dataset.action;
      const buttonConfig = config[action];
      if (buttonConfig) {
        btn.innerHTML = `<i class="${buttonConfig.icon}"></i> ${buttonConfig.text}`;
      }
    });
  },

  updateHeader() {
    const config = state.isBibleMode ? headerConfigs.bible : headerConfigs.motivational;
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
        quoteManager.showRandomQuote(true);
        musicManager.switchMode('bible');
      } else {
        elements.quoteCard.classList.remove("bible-mode");
        quoteManager.showRandomQuote(false);
        musicManager.switchMode('motivational');
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
    
    switch (pattern) {
      case "motivate":
      case "inspire":
      case "strength":
      case "focus":
      case "random":
        quoteManager.showRandomQuote(isBiblical);
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
    if (["motivate", "inspire", "strength", "focus"].includes(action)) {
      quoteManager.showRandomQuote(state.isBibleMode);
    } else if (action === "motivational") {
      uiManager.toggleBibleMode();
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

// Initialize application
function init() {
  themeManager.init();
  musicManager.init();
  quoteManager.updateStats();
  eventListeners.init();
  interactiveFeatures.init();

  elements.quoteCard.classList.add("bible-mode");
  uiManager.updateHeader();
  quoteManager.showRandomQuote(true);
  uiManager.updateActionButtons();
}

// Add CSS animations
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
  
  .bible-mode .action-btn[data-action="motivational"] {
    background: linear-gradient(135deg, rgba(139, 69, 19, 0.95) 0%, rgba(210, 105, 30, 0.95) 100%) !important;
    border: none !important;
    color: white !important;
  }
  
  .bible-mode .action-btn[data-action="motivational"]:hover {
    background: linear-gradient(135deg, rgba(160, 82, 45, 0.95) 0%, rgba(255, 140, 0, 0.95) 100%) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3) !important;
  }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  init();
  
  // Apply special styling for motivational button in bible mode
  setTimeout(() => {
    const motivationalBtn = document.querySelector('.bible-mode .action-btn[data-action="motivational"]');
    if (motivationalBtn) {
      motivationalBtn.style.background = 'linear-gradient(135deg, rgba(139, 69, 19, 0.95) 0%, rgba(210, 105, 30, 0.95) 100%)';
      motivationalBtn.style.border = 'none';
      motivationalBtn.style.color = 'white';
    }
  }, 100);
});

// Export for external use
window.MotivationalApp = {
  showQuote: (index) => quoteManager.showQuote(index, state.isBibleMode),
  showNextQuote: () => quoteManager.showNextQuote(),
  showPreviousQuote: () => quoteManager.showPreviousQuote(),
  showRandomQuote: () => quoteManager.showRandomQuote(state.isBibleMode),
  addQuote: (text, author) => {
    motivationalSpeeches.push({ text, author });
  },
};
