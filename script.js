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
  };
}

async function loadQuoteData() {
  try {
    const [oldTestament, newTestament, psalms] = await Promise.all([
      fetch("./quote_data/biblical/old_testament.json").then((r) => r.json()),
      fetch("./quote_data/biblical/new_testament.json").then((r) => r.json()),
      fetch("./quote_data/biblical/psalms.json").then((r) => r.json()),
    ]);

    quoteData.biblical.oldTestament = oldTestament;
    quoteData.biblical.newTestament = newTestament;
    quoteData.biblical.psalms = psalms;

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

    quoteData.inspirational.inspirational = inspirational;
    quoteData.inspirational.strengthening = strengthening;
    quoteData.inspirational.focus = focus;
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

function getRandomQuote(quotes) {
  if (!quotes || quotes.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
} // Stopped reading here

function showBiblicalQuote(section = "oldTestament") {
  const quotes = quoteData.biblical[section] || [];
  const quote = getRandomQuote(quotes);

  if (quote) {
    displayQuote(quote.text, `- ${quote.reference}`);
    state.currentBiblicalSection = section;
    state.totalBiblicalQuotesViewed++;
    updateStats();
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
    updateStats();
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
    state.totalBiblicalQuotesViewed++;
    updateStats();
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
    updateStats();
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

// Toggle music (placeholder)
function toggleMusic() {
  console.log("🎵 Music toggle clicked");
  // Music functionality can be added here
}

// Toggle between biblical and inspirational mode
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
    showBiblicalQuote(state.currentBiblicalSection);
  } else {
    showInspirationalQuote(state.currentInspirationalCategory);
  }
}

// Show previous quote (placeholder - could implement history)
function showPreviousQuote() {
  console.log("⬅️ Previous quote clicked");
  // For now, just show a random quote
  if (state.isBibleMode) {
    showRandomBiblicalQuote();
  } else {
    showRandomInspirationalQuote();
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

    // Update stats
    updateStats();

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
