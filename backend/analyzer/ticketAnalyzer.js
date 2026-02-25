const CATEGORY_KEYWORDS = {
  Billing: ['payment', 'refund', 'invoice', 'charged', 'billing'],
  Technical: ['error', 'bug', 'crash', 'not working', 'issue', 'down'],
  Account: ['login', 'password', 'account', 'signup', 'access'],
  'Feature Request': ['feature', 'add', 'improve', 'suggestion']
};

const URGENT_WORDS = ['urgent', 'asap', 'immediately', 'critical', 'production'];

const PRIORITY_KEYWORDS = {
  P0: ['production down', 'security', 'hacked', 'breach'],
  P1: ['urgent', 'asap', 'not working', 'blocked'],
  P2: ['issue', 'slow', 'error'],
  P3: ['suggestion', 'feature']
};

const analyzeTicket = (message) => {
  const text = message.toLowerCase();

  let detectedCategory = 'Other';
  let matchedKeywords = [];

  // category detection
  for (const category in CATEGORY_KEYWORDS) {
    for (const word of CATEGORY_KEYWORDS[category]) {
      if (text.includes(word)) {
        detectedCategory = category;
        matchedKeywords.push(word);
      }
    }
  }

  // urgency
  let urgency = URGENT_WORDS.some(word => text.includes(word));

  // priority detection
  let priority = 'P3';

  for (const level in PRIORITY_KEYWORDS) {
    for (const word of PRIORITY_KEYWORDS[level]) {
      if (text.includes(word)) {
        priority = level;
      }
    }
  }

  // ⭐ custom rule (IMPORTANT FOR ASSIGNMENT)
  if (text.includes('refund')) {
    detectedCategory = 'Billing';
    priority = 'P1';
  }

  // confidence score
  const confidence = Math.min(1, matchedKeywords.length / 5 + 0.5);

  return {
    category: detectedCategory,
    priority,
    urgency,
    keywords: matchedKeywords,
    confidence: Number(confidence.toFixed(2))
  };
};

module.exports = analyzeTicket;