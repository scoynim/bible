import { BOOKS } from './books.mjs';

function languageName(language) {
  return language === 'ko' ? '韓文' : '中文';
}

function referenceLabel(book, chapter, verse, language) {
  const abbreviation = language === 'ko' ? book.koAbbr : book.zhAbbr;
  return `${abbreviation} ${chapter}:${verse}`;
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

function formatCopyVerse(reference, row, languages) {
  return languages.map((language) => {
    const key = language === 'ko' ? 'ko' : 'zh';
    return `${referenceLabel(reference.book, reference.chapter, row.verse, language)} ${row[key] || ''}`;
  }).join('\n');
}

function formatCopyBlock(reference, languages) {
  const rows = selectVerses(reference);
  return rows.map((row) => formatCopyVerse(reference, row, languages)).join(languages.length > 1 ? '\n\n' : '\n');
}

export function formatReferencesForCopy(references, languages) {
  return references
    .map((reference) => formatCopyBlock(reference, languages))
    .join(languages.length > 1 ? '\n\n' : '\n');
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
