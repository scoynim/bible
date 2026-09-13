import { buildAliasMap } from './books.mjs';

const ALIASES = buildAliasMap();
const ALIAS_PATTERN = [...ALIASES.values()]
  .map(({ alias }) => alias)
  .sort((a, b) => b.length - a.length)
  .map(escapeRegExp)
  .join('|');

const REFERENCE_PATTERN = new RegExp(
  `(${ALIAS_PATTERN})\\s*([0-9０-９]+)\\s*(?:[:：]\\s*([0-9０-９,、，\\-~～–—]+))?`,
  'giu'
);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeDigits(value) {
  return value
    .replace(/[０-９]/g, (digit) => String(digit.charCodeAt(0) - 0xfee0))
    .replace(/[～–—]/g, '-')
    .replace(/[，、]/g, ',');
}

function stripOuterQuotes(value) {
  const trimmed = value.trim();
  if (trimmed.length >= 2 && ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'")))) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function extractLanguage(value) {
  const match = value.match(/(?:^|\s)(kr\/cn|cn\/kr|ko\/zh|zh\/ko|kr|ko|cn|zh)\s*$/i);
  if (!match) return { input: value.trim(), languages: null };

  const token = match[1].toLowerCase();
  const map = {
    kr: ['ko'], ko: ['ko'], cn: ['zh'], zh: ['zh'],
    'kr/cn': ['ko', 'zh'], 'ko/zh': ['ko', 'zh'],
    'cn/kr': ['ko', 'zh'], 'zh/ko': ['ko', 'zh']
  };
  return {
    input: value.slice(0, match.index).trim(),
    languages: map[token]
  };
}

function expandVerses(specification) {
  const verses = [];
  for (const part of normalizeDigits(specification).split(',')) {
    if (!part) continue;
    const range = part.match(/^(\d+)-(\d+)$/);
    if (range) {
      const start = Number(range[1]);
      const end = Number(range[2]);
      if (end < start) throw new Error(`節數範圍不可倒序：${part}`);
      for (let verse = start; verse <= end; verse += 1) verses.push(verse);
      continue;
    }
    if (!/^\d+$/.test(part)) throw new Error(`無法辨識節數：${part}`);
    verses.push(Number(part));
  }
  return [...new Set(verses)];
}

export function parseReferenceQuery(rawInput, { chapterMode = false } = {}) {
  const unquoted = stripOuterQuotes(rawInput);
  const { input, languages: requestedLanguages } = extractLanguage(unquoted);
  const matches = [...input.matchAll(REFERENCE_PATTERN)];
  if (!matches.length) throw new Error('無法辨識經文。請使用例如「太1:1」或「太10」。');

  let cursor = 0;
  const references = [];
  for (const match of matches) {
    const gap = input.slice(cursor, match.index);
    if (gap && !/^[\s;；]+$/.test(gap)) throw new Error(`無法辨識這一段：${gap.trim()}`);
    cursor = match.index + match[0].length;

    const aliasInfo = ALIASES.get(match[1].toLowerCase());
    const chapter = Number(normalizeDigits(match[2]));
    const verses = match[3] ? expandVerses(match[3]) : null;
    if (chapter < 1 || chapter > aliasInfo.book.chapters) {
      throw new Error(`${aliasInfo.book.zh}沒有第 ${chapter} 章。`);
    }
    if (chapterMode && verses) throw new Error('-n 用來查看整章，請不要輸入節數。');
    if (!chapterMode && !verses) throw new Error('複製經文時必須輸入節數，例如「太1:1」。');
    references.push({
      book: aliasInfo.book,
      sourceLanguage: aliasInfo.language,
      chapter,
      verses
    });
  }

  const tail = input.slice(cursor);
  if (tail && !/^[\s;；]+$/.test(tail)) throw new Error(`無法辨識這一段：${tail.trim()}`);

  let languages = requestedLanguages;
  if (!languages) {
    const sourceLanguages = new Set(references.map((reference) => reference.sourceLanguage));
    if (sourceLanguages.size === 1 && sourceLanguages.has('ko')) languages = ['ko'];
    else if (sourceLanguages.size === 1 && sourceLanguages.has('zh')) languages = ['zh'];
    else if (sourceLanguages.has('en')) {
      throw new Error('使用英文書卷簡寫時，請在最後加上 cn、kr、cn/kr 或 kr/cn。');
    } else languages = ['zh'];
  }

  return { references, languages };
}
