const biblicalQuotes = [
  {
    text: "I can do all things through Christ who strengthens me.",
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

let currentQuoteIndex = 0;
let currentBiblicalIndex = 0;
let viewedQuotes = new Set();
let viewedBiblicalQuotes = new Set();
let quoteHistory = [];
let biblicalQuoteHistory = [];
let isBibleMode = true;

const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const quoteCount = document.getElementById("quote-count");
const currentIndex = document.getElementById("current-index");
const quoteCard = document.querySelector(".quote-card");
const actionBtn = document.querySelectorAll(".action-btn");
const themeToggle = document.getElementById("theme-toggle");

const inputPatterns = {
  motivate: [
    "motivate",
    "motivation",
    "motivate me",
    "give me motivation",
    "i need motivation",
  ],
  inspire: [
    "inspire",
    "inspiration",
    "inspire me",
    "give me inspiration",
    "i need inspiration",
  ],
  strength: [
    "strength",
    "strong",
    "give me strength",
    "i need strength",
    "power",
  ],
  focus: [
    "focus",
    "concentrate",
    "help me focus",
    "i need focus",
    "concentration",
  ],
  next: ["next", "next quote", "another", "more", "continue"],
  previous: ["previous", "back", "go back", "last quote"],
  random: ["random", "surprise me", "any quote", "whatever"],
};

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  const icon = themeToggle.querySelector("i");
  if (theme === "dark") {
    icon.className = "fas fa-sun";
    themeToggle.title = "Switch to light mode";
  } else {
    icon.className = "fas fa-moon";
    themeToggle.title = "Switch to dark mode";
  }
}

function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);

  themeToggle.style.transform = "scale(0.9)";
  setTimeout(() => {
    themeToggle.style.transform = "scale(1)";
  }, 150);
}

function init() {
  initTheme();
  updateStats();
  setupEventListeners();

  quoteCard.classList.add("bible-mode");
  updateHeaderForBibleMode();
  showRandomBiblicalQuote();
  updateActionButtons();
}

function updateActionButtons() {
    actionBtn.forEach((btn) => {
        const action = btn.dataset.action;
        if (isBibleMode) {
            switch (action) {
                case "motivate":
                    btn.innerHTML = '<i class="fas fa-scroll"></i> Old Testament';
                    break;
                case "inspire":
                    btn.innerHTML = '<i class="fas fa-book-open"></i> New Testament';
                    break;
                case "strength":
                    btn.innerHTML = '<i class="fas fa-music"></i> Psalms';
                    break;
                case "focus":
                    btn.innerHTML = '<i class="fas fa-dice"></i> Random';
                    break;
                case "motivational":
                    btn.innerHTML = '<i class="fas fa-fire"></i> Motivational Quotes';
                    break;
            }
        } else {
            switch (action) {
                case "motivate":
                    btn.innerHTML = '<i class="fas fa-fire"></i> Motivate Me';
                    break;
                case "inspire":
                    btn.innerHTML = '<i class="fas fa-star"></i> Inspire Me';
                    break;
                case "strength":
                    btn.innerHTML = '<i class="fas fa-fist-raised"></i> Give Me Strength';
                    break;
                case "focus":
                    btn.innerHTML = '<i class="fas fa-bullseye"></i> Help Me Focus';
                    break;
                case "motivational":
                    btn.innerHTML = '<i class="fas fa-cross"></i> Biblical Wisdom';
                    break;
            }
        }
    });
}

function setupEventListeners() {
  submitBtn.addEventListener("click", handleUserInput);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleUserInput();
    }
  });

  prevBtn.addEventListener("click", showPreviousQuote);
  nextBtn.addEventListener("click", showNextQuote);

  actionBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const action = e.target.closest(".action-btn").dataset.action;
      handleQuickAction(action);
    });
  });

  themeToggle.addEventListener("click", toggleTheme);

  userInput.focus();
}

function handleUserInput() {
  const input = userInput.value.trim().toLowerCase();
  if (!input) return;

  userInput.value = "";

  const matchedPattern = findMatchingPattern(input);

  if (matchedPattern) {
    handleMatchedPattern(matchedPattern);
  } else {
    showNextQuote();
  }
}

function findMatchingPattern(input) {
  for (const [category, patterns] of Object.entries(inputPatterns)) {
    if (patterns.some((pattern) => input.includes(pattern))) {
      return category;
    }
  }
  return null;
}

function handleMatchedPattern(pattern) {
  switch (pattern) {
    case "motivate":
    case "inspire":
    case "strength":
    case "focus":
      if (isBibleMode) {
        showRandomBiblicalQuote();
      } else {
        showRandomQuote();
      }
      break;
    case "next":
      showNextQuote();
      break;
    case "previous":
      showPreviousQuote();
      break;
    case "random":
      if (isBibleMode) {
        showRandomBiblicalQuote();
      } else {
        showRandomQuote();
      }
      break;
    default:
      showNextQuote();
  }
}

function handleQuickAction(action) {
  switch (action) {
    case "motivate":
    case "inspire":
    case "strength":
    case "focus":
      if (isBibleMode) {
        showRandomBiblicalQuote();
      } else {
        showRandomQuote();
      }
      break;
    case "motivational":
      toggleBibleMode();
      break;
  }
}

function showWelcomeMessage() {
  quoteText.textContent =
    "Click 'Motivate Me' or type your request to start your journey of spiritual guidance.";
  quoteAuthor.textContent = "- Your Daily Biblical Wisdom";
}

function showQuote(index) {
  if (index < 0 || index >= motivationalSpeeches.length) {
    index = 0;
  }

  const quote = motivationalSpeeches[index];

  quoteCard.classList.add("fade-out");

  setTimeout(() => {
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = `- ${quote.author}`;

    quoteCard.classList.remove("fade-out");
    quoteCard.classList.add("fade-in");

    setTimeout(() => {
      quoteCard.classList.remove("fade-in");
    }, 300);
  }, 150);

  currentQuoteIndex = index;
  viewedQuotes.add(index);
  quoteHistory.push(index);

  updateStats();
  updateNavigationButtons();
}

function showNextQuote() {
  if (isBibleMode) {
    const nextIndex = (currentBiblicalIndex + 1) % biblicalQuotes.length;
    showBiblicalQuote(nextIndex);
  } else {
    const nextIndex = (currentQuoteIndex + 1) % motivationalSpeeches.length;
    showQuote(nextIndex);
  }
}

function showPreviousQuote() {
  if (isBibleMode) {
    if (biblicalQuoteHistory.length > 1) {
      biblicalQuoteHistory.pop();
      const previousIndex =
        biblicalQuoteHistory[biblicalQuoteHistory.length - 1];
      showBiblicalQuote(previousIndex);
    }
  } else {
    if (quoteHistory.length > 1) {
      quoteHistory.pop();
      const previousIndex = quoteHistory[quoteHistory.length - 1];
      showQuote(previousIndex);
    }
  }
}

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * motivationalSpeeches.length);
  showQuote(randomIndex);
}

function showRandomBiblicalQuote() {
  const randomIndex = Math.floor(Math.random() * biblicalQuotes.length);
  showBiblicalQuote(randomIndex);
}

function toggleBibleMode() {
  isBibleMode = !isBibleMode;

  
  quoteCard.classList.add("flipping");

  setTimeout(() => {
    if (isBibleMode) {
      quoteCard.classList.add("bible-mode");
      showRandomBiblicalQuote();
      updateHeaderForBibleMode();
    } else {
      quoteCard.classList.remove("bible-mode");
      showRandomQuote();
      updateHeaderForMotivationalMode();
    }

    updateActionButtons();

    quoteCard.classList.remove("flipping");
    quoteCard.classList.add("flipped");

    setTimeout(() => {
      quoteCard.classList.remove("flipped");
    }, 300);
  }, 300);
}

function updateHeaderForBibleMode() {
  const headerTitle = document.querySelector(".header h1");
  const headerSubtitle = document.querySelector(".header p");

  headerTitle.innerHTML = '<i class="fas fa-cross"></i> Biblical Wisdom';
  headerSubtitle.textContent = "Find spiritual guidance and divine inspiration 🙏🏾";
  
  userInput.placeholder = "Type 'strengthen me' or 'guide me'...";
}

function updateHeaderForMotivationalMode() {
  const headerTitle = document.querySelector(".header h1");
  const headerSubtitle = document.querySelector(".header p");

  headerTitle.innerHTML = '<i class="fas fa-fire"></i> Motivational Speeches';
  headerSubtitle.textContent = "Find your daily dose of inspiration";
  
  userInput.placeholder = "Type 'motivate me' or 'give me inspiration'...";
}

function showBiblicalQuote(index) {
  if (index < 0 || index >= biblicalQuotes.length) {
    index = 0;
  }

  const quote = biblicalQuotes[index];

  quoteCard.classList.add("fade-out");

  setTimeout(() => {
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = `- ${quote.reference}`;

    quoteCard.classList.remove("fade-out");
    quoteCard.classList.add("fade-in");

    setTimeout(() => {
      quoteCard.classList.remove("fade-in");
    }, 300);
  }, 150);

  currentBiblicalIndex = index;
  viewedBiblicalQuotes.add(index);
  biblicalQuoteHistory.push(index);

  updateStats();
  updateNavigationButtons();
}

function updateStats() {
  if (isBibleMode) {
    quoteCount.textContent = viewedBiblicalQuotes.size;
    currentIndex.textContent = currentBiblicalIndex + 1;
  } else {
    quoteCount.textContent = viewedQuotes.size;
    currentIndex.textContent = currentQuoteIndex + 1;
  }
}

function updateNavigationButtons() {
  if (isBibleMode) {
    prevBtn.disabled = biblicalQuoteHistory.length <= 1;
    nextBtn.disabled = false;
  } else {
    prevBtn.disabled = quoteHistory.length <= 1;
    nextBtn.disabled = false;
  }
}

function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

function addInteractiveFeatures() {
  quoteCard.addEventListener("dblclick", () => {
    const textToCopy = `${quoteText.textContent} - ${quoteAuthor.textContent}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast("Quote copied to clipboard!");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === " ") {
      e.preventDefault();
      showNextQuote();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      showPreviousQuote();
    } else if (e.key === "r" || e.key === "R") {
      e.preventDefault();
      if (isBibleMode) {
        showRandomBiblicalQuote();
      } else {
        showRandomQuote();
      }
    } else if (e.key === "t" || e.key === "T") {
      e.preventDefault();
      toggleTheme();
    } else if (e.key === "b" || e.key === "B") {
      e.preventDefault();
      toggleBibleMode();
    }
  });
}

function showToast(message) {
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

document.addEventListener("DOMContentLoaded", () => {
  init();
  addInteractiveFeatures();
  
  setTimeout(() => {
    const motivationalBtn = document.querySelector('.bible-mode .action-btn[data-action="motivational"]');
    if (motivationalBtn) {
      motivationalBtn.style.background = 'linear-gradient(135deg, rgba(139, 69, 19, 0.95) 0%, rgba(210, 105, 30, 0.95) 100%)';
      motivationalBtn.style.border = 'none';
      motivationalBtn.style.color = 'white';
    }
  }, 100);
});

window.MotivationalApp = {
  showQuote,
  showNextQuote,
  showPreviousQuote,
  showRandomQuote,
  addQuote: (text, author) => {
    motivationalSpeeches.push({ text, author });
  },
};
