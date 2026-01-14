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
        newTestament: 0,
        psalms: 0
    },
    inspirationalSequentialIndex: {
        inspirational: 0,
        strengthening: 0,
        focus: 0
    }
};

