import Fuse from "fuse.js";
import { faqKnowledgeBase, fallbackResponse } from "../data/faq.js";

const normalizeText = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[-–—―]+/g, " ")
    .replace(/[^\w\s'’-]+/g, " ");

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const keywordMatches = (normalizedMessage, keyword) => {
  const normalizedKeyword = normalizeText(keyword);

  if (!normalizedKeyword) {
    return false;
  }

  const isSingleWord =
    normalizedKeyword.split(" ").filter(Boolean).length === 1;

  if (isSingleWord) {
    const keywordRegex = new RegExp(
      `\\b${escapeRegExp(normalizedKeyword)}\\b`,
      "i",
    );
    return keywordRegex.test(normalizedMessage);
  }

  return normalizedMessage.includes(normalizedKeyword);
};

const calculateKeywordScore = (keyword) => {
  const normalizedKeyword = normalizeText(keyword);
  const wordCount = normalizedKeyword.split(" ").filter(Boolean).length;
  const lengthBonus = Math.min(normalizedKeyword.length / 8, 5);
  return 1 + wordCount * 0.5 + lengthBonus;
};

const scoreFaqMatches = (normalizedMessage, faq) => {
  const matchedKeywords = faq.keywords.filter((keyword) =>
    keywordMatches(normalizedMessage, keyword),
  );

  if (!matchedKeywords.length) {
    return null;
  }

  const keywordScore = matchedKeywords.reduce(
    (total, keyword) => total + calculateKeywordScore(keyword),
    0,
  );

  const priority = typeof faq.priority === "number" ? faq.priority : 0;
  const priorityWeight = 5;
  const score = keywordScore + priority * priorityWeight;

  return {
    faq,
    score,
    matchedKeywords,
  };
};

const buildFuseIndex = () =>
  faqKnowledgeBase.flatMap((faq) =>
    faq.keywords.map((keyword) => ({
      keyword,
      faq,
    })),
  );

const fuse = new Fuse(buildFuseIndex(), {
  keys: ["keyword"],
  threshold: 0.45,
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

const findBestFaqMatch = (normalizedMessage) => {
  const exactMatches = faqKnowledgeBase
    .map((faq) => scoreFaqMatches(normalizedMessage, faq))
    .filter(Boolean)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return (b.faq.priority || 0) - (a.faq.priority || 0);
    });

  if (exactMatches.length) {
    return exactMatches[0].faq;
  }

  const fuseResults = fuse
    .search(normalizedMessage)
    .filter(
      (result) => typeof result.score === "number" && result.score <= 0.45,
    );

  if (!fuseResults.length) {
    return null;
  }

  return fuseResults.sort((a, b) => {
    if (a.score !== b.score) {
      return a.score - b.score;
    }
    return (b.item.faq.priority || 0) - (a.item.faq.priority || 0);
  })[0].item.faq;
};

const buildResponse = (faq) => ({
  answer: faq.answer,
  suggestions: faq.suggestions || [
    "Services",
    "Portfolio",
    "Careers",
    "Contact",
  ],
});

export const getBotResponse = (userMessage) => {
  const normalizedMessage = normalizeText(userMessage || "");

  if (!normalizedMessage) {
    return fallbackResponse;
  }

  const matchedFaq = findBestFaqMatch(normalizedMessage);
  return matchedFaq ? buildResponse(matchedFaq) : fallbackResponse;
};

export default getBotResponse;
