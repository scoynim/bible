import { BOOKS } from './books.mjs';

function languageName(language) {
  return language === 'ko' ? '韓文' : '中文';
}

function referencePrefix(book, chapter, language) {
  const abbreviation = language === 'ko' ? book.koAbbr : book.zhAbbr;
  return language === 'ko' ? `${abbreviation} ${chapter}` : `${abbreviation}${chapter}`;
}

function referenceLabel(reference, rows, language) {
  const verses = rows.map((row) => row.verse);
  const continuous = verses.every((verse, index) => index === 0 || verse === verses[index - 1] + 1);
  const verseLabel = verses.length > 1 && continuous
    ? `${verses[0]}-${verses[verses.length - 1]}`
    : verses.join(',');
  return `${referencePrefix(reference.book, reference.chapter, language)}:${verseLabel}`;
}

function selectVerses(reference) {
  const byVerse = new Map(reference.rows.map((row) => [row.verse, row]));
  const selected = reference.verses.map((verse) => {
    const row = byVerse.get(verse);
    if (!row) throw new Error(`${reference.book.zh} ${reference.chapter}:${verse} 不存在。`);
    return row;
  });
  return selected;
}

function formatCopyBlock(reference, language) {
  const rows = selectVerses(reference);
  const key = language === 'ko' ? 'ko' : 'zh';
  const label = referenceLabel(reference, rows, language);
  if (rows.length === 1) return `${label} ${rows[0][key] || ''}`;
  return [label, ...rows.map((row) => `${row.verse}. ${row[key] || ''}`)].join('\n');
}

export function formatReferencesForCopy(references, languages) {
  return references
    .flatMap((reference) => languages.map((language) => formatCopyBlock(reference, language)))
    .join('\n\n');
}

export function formatChapter(reference, languages) {
  const titleLines = languages.map((language) => language === 'ko'
    ? `${reference.book.ko} ${reference.chapter}장`
    : `${reference.book.zh} 第${reference.chapter}章`);
  const lines = [...titleLines, ''];

  const appendHeading = (entry) => {
    const headings = languages
      .map((language) => entry[language === 'ko' ? 'ko' : 'zh'])
      .filter(Boolean);
    if (headings.length) lines.push(...headings, '');
  };

  const appendVerse = (entry) => {
    lines.push(String(entry.verse));
    for (const language of languages) {
      const key = language === 'ko' ? 'ko' : 'zh';
      if (entry[key]) lines.push(entry[key]);
    }
    lines.push('');
  };

  for (const entry of reference.rows) {
    if (entry.type === 'heading') appendHeading(entry);
    else if (Number.isInteger(entry.verse)) appendVerse(entry);
  }
  return lines.join('\n').trimEnd();
}

export function formatBookTable() {
  const rows = ['中文\t韓文\tEnglish', '----\t----\t-------'];
  for (const book of BOOKS) {
    const korean = book.koAlt?.length ? `${book.koAbbr}/${book.koAlt.join('/')}` : book.koAbbr;
    rows.push(`${book.zhAbbr}\t${korean}\t${book.en}`);
  }
  return rows.join('\n');
}

export function formatLanguageSummary(languages) {
  return languages.map(languageName).join('、');
}
