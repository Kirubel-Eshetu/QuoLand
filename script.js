const oldTestament = [
  {
    text: "Then the LORD God formed a man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being.",
    reference: "Genesis 2:7",
  },
  {
    text: "About Benjamin he said: 'Let the beloved of the LORD rest secure in him, for he shields him all day long, and the one the LORD loves rests between his shoulders.'",
    reference: "Deuteronomy 33:12",
  },
  {
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reference: "Joshua 1:9",
  },
  {
    text: "He wraps up the waters in his clouds, yet the clouds do not burst under their weight. He covers the face of the full moon, spreading his clouds over it.",
    reference: "Job 26:8-9"
  },
  {
    text: "And he said to the human race, 'The fear of the Lord —that is wisdom, and to shun evil is understanding.'",
    reference: "Job 28:28",
  },
  {
    text: "For God does speak —now one way, now another — though no one perceives it. In a dream, in a vision of the night, when deep sleep falls on people as they slumber in their beds, he may speak in their ears and terrify them with warnings, or he may whisper softly, so that they do not know it.",
    reference: "Job 33:14-15",
  },
  {
    text: "God is mighty, but despises no one; he is mighty, and firm in his purpose.",
    reference: "Job 36:5",
  },
  {
    text: "God’s voice thunders in marvelous ways; he does great things beyond our understanding.",
    reference: "Job 37:5",
  }, 
  {
    text: "My ears had heard of you but now my eyes have seen you.",
    reference: "Job 42:5",
  },
  {
    text: "Indeed, if you call out for insight and cry aloud for understanding, and if you look for it as for silver and search for it as for hidden treasure, then you will understand the fear of the LORD and find the knowledge of God.",
    reference: "Proverbs 2:3-5",
  },
  {
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
  },
  {
    text: "Wine is a mocker and beer a brawler; whoever is led astray by them is not wise.",
    reference: "Proverbs 20:1",
  },
  {
    text: "Whoever shuts their ears to the cry of the poor will also cry out and not be answered.",
    reference: "Proverbs 21:13",
  },
  {
    text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    reference: "Isaiah 40:31",
  },
  {
    text: "I will give you hidden treasures, riches stored in secret places, so that you may know that I am the LORD, the God of Israel, who summons you by name.",
    reference: "Isaiah 45:3",
  },
  {
    text: "You will go out in joy and be led forth in peace; the mountains and hills will burst into song before you, and all the trees of the field will clap their hands.",
    reference: "Isaiah 55:12"
  },
  {
    text: "'Before I formed you in the womb I knew you, before you were born I set you apart; I appointed you as a prophet to the nations.'",
    reference: "Jeremiah 1: 5",
  },
  {
    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11",
  },
  {
    text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
    reference: "Lamentations 3:22",
  },
  {
    text: "'Even now,'' declares the LORD, 'return to me with all your heart, with fasting and weeping and mourning.'",
    reference: "Joel 2:12",
  },
  {
    text: "This is what the LORD says to Israel: 'Seek me and live'",
    reference: "Amos 5:4",
  }
];

const psalms = [
  {
    text: "Blessed is the one who does not walk in step with the wicked or stand in the way that sinners take or sit in the company of mockers,",
    reference: "Psalms 1:1",
  },
  {
    text: "I lie down and sleep; I wake again, because the LORD sustains me.",
    reference: "Psalms 3:5",
  },
  {
    text: "In peace I will lie down and sleep, for you alone, LORD, make me dwell in safety.",
    reference: "Psalms 4:8",
  }, 
  {
    text: "LORD, our Lord, how majestic is your name in all the earth! You have set your glory in the heavens.",
    reference: "Psalms 8:1",
  },
  {
    text: "I will give thanks to you, LORD, with all my heart; I will tell of all your wonderful deeds.I will be glad and rejoice in you; I will sing the praises of your name, O Most High.",
    reference: "Psalms 9:1-2",
  },
  {
    text: "The LORD is a refuge for the oppressed, a stronghold in times of trouble. Those who know your name trust in you, for you, LORD, have never forsaken those who seek you.",
    reference: "Psalms 9:9-10",
  },
  {
    text: "For the LORD is righteous, he loves justice; the upright will see his face.",
    reference: "Psalms 11:7",
  },
  {
    text: "But I trust in your unfailing love; my heart rejoices in your salvation. I will sing the LORD’s praise, for he has been good to me.",
    reference: "Psalms 13:1-2"
  },
  {
    text: "I keep my eyes always on the LORD. With him at my right hand, I will not be shaken.",
    reference: "Psalms 16:8",
  }, 
  {
    text: "Who can discern [his] errors? Clear thou me from hidden [faults].",
    reference: "Psalms 19:12",
  },
  {
    text: "From birth I was cast on you; from my mother’s womb you have been my God.",
    reference: "Psalms 22:10",
  },
  {
    text: "For the Chief Musician. A Psalm of David. Jehovah answer thee in the day of trouble; The name of the God of Jacob set thee up on high",
    reference: "Psalms 20:1",
  },
  {
    text: "The Lord is my shepherd, I lack nothing.",
    reference: "Psalms 23:1",
  },
  {
    text: "The Lord is my light and my salvation—whom shall I fear?",
    reference: "Psalms 27:1",
  },
  {
    text: "Teach me your way, LORD; lead me in a straight path because of my oppressors.",
    reference: "Psalms: 27:11",
  },
  {
    text: "The Lord is my strength and my shield; my heart trusts in him, and he helps me.",
    reference: "Psalms 28:7",
  },
  {
    text: "The Lord gives strength to his people; the Lord blesses his people with peace.",
    reference: "Psalms 29:11",
  },
  {
    text: "I sought the LORD, and he answered me; he delivered me from all my fears.",
    reference: "Psalms 34:4",
  },
  {
    text: "Then my soul will rejoice in the LORD and delight in his salvation.",
    reference: "Psalms 35:9",
  },
  {
    text: "For with you is the fountain of life; in your light we see light.",
    reference: "Psalms 36:9",
  },
  {
    text: "Commit your way to the LORD; trust in him and he will do this: He will make your righteous reward shine like the dawn, your vindication like the noonday sun.",
    reference: "Psalms 37:5-6",
  },
  {
    text: "But now, Lord, what do I look for? My hope is in you.",
    reference: "Psalms 39:7",
  },
  {
    text: "Send me your light and your faithful care, let them lead me; let them bring me to your holy mountain, to the place where you dwell.",
    reference: "Psalms 43:3",
  },
  {
    text: "God is our refuge and strength, an ever-present help in trouble.",
    reference: "Psalms 46:1",
  },
  {
    text: "He says, 'Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.'",
    reference: "Psalms 46:10",
  },
  {
    text: "For this God is our God for ever and ever; he will be our guide even to the end.",
    reference: "Psalms 48:14",
  },
  {
    text: "Cast your cares on the Lord and he will sustain you; he will never let the righteous be shaken.",
    reference: "Psalms 55:22",
  },
  {
    text: "Since my youth, God, you have taught me, and to this day I declare your marvelous deeds.",
    reference: "Psalms 71:17-18",
  },
  {
    text: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.",
    reference: "Psalms 91:1",
  },
  {
    text: "For the Lord is good and his love endures forever; his faithfulness continues through all generations.",
    reference: "Psalms 100:5",
  },
  {
    text: "Praise the LORD. Praise the LORD, you his servants; praise the name of the LORD.",
    reference: "Psalms 113:1",
  },
  {
    text: "The LORD has done it this very day; let us rejoice today and be glad.",
    reference: "Psalms 118:24"
  },
  {
    text: "For you created my inmost being; you knit me together in my mother’s womb.",
    reference: "Psalms 139:13",
  },
  {
    text: "The Lord is near to all who call on him in truth.",
    reference: "Psalm 145:18",
  },
];

const newTestament = [
  {
    text: "But when you pray, go into your room, close the door and pray to your Father, who is unseen. Then your Father, who sees what is done in secret, will reward you.",
    reference: "Matthew 6:6-7",
  },
  {
    text: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.",
    reference: "Matthew 7:7",
  },
  {
    text: "Come to me, all you who are weary and burdened, and I will give you rest.",
    reference: "Matthew 11:28",
  },
  {
    text: "He replied, 'Because you have so little faith. Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, 'Move from here to there,' and it will move. Nothing will be impossible for you.'",
    reference: "Matthew 17:20",
  },
  {
    text: "'Have faith in God,' Jesus answered.",
    reference: "Mark 11:22"
  },
  {
    text: "For nothing is impossible with God.",
    reference: "Luke 1:37",
  },
  {
    text: "The seventy-two returned with joy and said, 'Lord, even the demons submit to us in your name.'",
    reference: "Luke 10:17",
  },
  {
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16",
  }, 
  {
    text: "Whoever has my commands and keeps them is the one who loves me. The one who loves me will be loved by my Father, and I too will love them and show myself to them.",
    reference: "John 14:21",
  },
  {
    text: "Let not your hearts be troubled, neither let them be afraid.",
    reference: "John 14:27",
  },
  {
    text: "I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.",
    reference: "John 16:33",
  },
  {
    text: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.",
    reference: "Acts 1:8",
  },
  {
    text: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.",
    reference: "Romans 6:23",
  },
  {
    text: "What, then, shall we say in response to these things? If God is for us, who can be against us?",
    reference: "Romans 8:31",
  },
  {
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28",
  },
  {
    text: "Be joyful in hope, patient in affliction, faithful in prayer.",
    reference: "Romans 12:12",
  },
  {
    text: "It is written: ' As surely as I live,' says the Lord, 'every knee will bow before me; every tongue will acknowledge God.' So then, each of us will give an account of ourselves to God.",
    reference: "Romans 14:11-12"
  },
  {
    text: "For the kingdom of God is not a matter of eating and drinking, but of righteousness, peace and joy in the Holy Spirit.",
    reference: "Romans 14:17",
  },
  {
    text: "And now these three remain: faith, hope and love. But the greatest of these is love.",
    reference: "1 Corinthians 13:13",
  },
  {
    text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    reference: "2 Corinthians 5:17",
  },
  {
    text: "The weapons we fight with are not the weapons of the world. On the contrary, they have divine power to demolish strongholds.",
    reference: "2 Corinthians 10:4",
  },
  {
    text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.",
    reference: "Galatians 5:22-23",
  },
  {
    text: "In your relationships with one another, have the same mindset as Christ Jesus:",
    reference: "Philippians 2:5"
  },
  {
    text: "Do not be anxious about anything, but present your requests to God with thanksgiving.",
    reference: "Philippians 4:6",
  },
  {
    text: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    reference: "Philippians 4:7"
  },
  {
    text: "I an do all things through Christ who strengthens me.",
    reference: "Philippians 4:13",
  },
  {
    text: "rooted and built up in him, strengthened in the faith as you were taught, and overflowing with thankfulness.",
    reference: "Colossians 2:7",
  },
  {
    text: "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.",
    reference: "Colassians 3:13",
  },
  {
    text: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful.",
    reference: "Colassians 3:15",
  },
  {
    text: "Do not lie to each other, since you have taken off your old self with its practices and have put on the new self, which is being renewed in knowledge in the image of its Creator.",
    reference: "Colassians 3:9-10",
  }
  {
    text: "Give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
    reference: "1 Thessalonians 5:18",
  },
  {
    text: "He also says, 'In the beginning, Lord, you laid the foundations of the earth, and the heavens are the work of your hands.",
    reference: "Hebrews 1:10",
  },
  {
    text: "For the word of God is alive and active. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit, joints and marrow; it judges the thoughts and attitudes of the heart.",
    reference: "Hebrews 4:12",
  },
  {
    text: "Fixing our eyes on Jesus, the pioneer and perfecter of faith. For the joy set before him he endured the cross, scorning its shame, and sat down at the right hand of the throne of God.",
    reference: "Hebrew 12:2",
  },
  {
    text: "The end of all things is near. Therefore be alert and of sober mind so that you may pray. Above all, love each other deeply, because love covers over a multitude of sins.",
    reference: "1 Peter 4:7-8",
  },
  {
    text: "Whoever claims to love God yet hates a brother or sister is a liar. For whoever does not love their brother and sister, whom they have seen, cannot love God, whom they have not seen.",
    reference: "1 John 4:20"
  },
  {
    text: "This is the confidence we have in approaching God: that if we ask anything according to his will, he hears us.",
    reference: "1 John 5:14",
  },
  {
    text: "We know also that the Son of God has come and has given us understanding, so that we may know him who is true. And we are in him who is true by being in his Son Jesus Christ. He is the true God and eternal life.",
    reference: "1 John 5:20",
  },
  {
    text: "Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well.",
    reference: "3 John 1:2",
  },
  {
    text: "I have no greater joy than to hear that my children are walking in the truth.",
    reference: "3 John 1:4",
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
    author: "Kirubel Eshetu",
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

    this.motivationalAudio = new Audio();
    this.motivationalAudio.loop = true;
    this.motivationalAudio.volume = 0.3;

    this.bibleAudio.src = './Music/Track 11 ከሙሴ የሚልቅ.mp3'; 
    this.motivationalAudio.src = './Music/David_Goggins.mp3'; 

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
      quotes = motivationalSpeeches;
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
      const randomIndex = Math.floor(Math.random() * motivationalSpeeches.length);
      this.showQuote(randomIndex, false);
    }
  },

  showNextQuote() {
    const isBiblical = state.isBibleMode;
    if (isBiblical) {
      // Use the sequential method for the current section
      this.showNextQuoteFromSection(this.currentBibleSection);
    } else {
      const nextIndex = (state.currentQuoteIndex + 1) % motivationalSpeeches.length;
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
        quoteManager.showNextQuoteFromSection('oldTestament');
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
        case "motivational":
          uiManager.toggleBibleMode();
          break;
      }
    } else {
      // Motivational mode - keep existing behavior
      if (["motivate", "inspire", "strength", "focus"].includes(action)) {
        quoteManager.showRandomQuote(false);
      } else if (action === "motivational") {
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
  showQuote: (index) => quoteManager.showQuote(index, state.isBibleMode),
  showNextQuote: () => quoteManager.showNextQuote(),
  showPreviousQuote: () => quoteManager.showPreviousQuote(),
  showRandomQuote: () => quoteManager.showRandomQuote(state.isBibleMode),
  addQuote: (text, author) => {
    motivationalSpeeches.push({ text, author });
  },
};
