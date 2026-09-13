import { readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

function resolveDataRoot() {
  if (process.env.SCOYNIM_BIBLE_DATA) {
    return pathToFileURL(path.resolve(process.env.SCOYNIM_BIBLE_DATA) + path.sep);
  }
  return new URL('../../bible/', import.meta.url);
}

const DATA_ROOT = resolveDataRoot();

export async function loadChapter(bookId, chapter) {
  const chapterUrl = new URL(`${bookId}/${chapter}.json`, DATA_ROOT);
  try {
    const raw = await readFile(fileURLToPath(chapterUrl), 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') throw new Error(`找不到經文資料：${bookId} ${chapter}`);
    throw new Error(`無法讀取經文資料：${error.message}`);
  }
}

export async function loadReferences(references) {
  return Promise.all(references.map(async (reference) => ({
    ...reference,
    rows: await loadChapter(reference.book.id, reference.chapter)
  })));
}
