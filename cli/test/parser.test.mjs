import assert from 'node:assert/strict';
import test from 'node:test';
import { parseReferenceQuery } from '../lib/parser.mjs';

test('parses a Chinese verse reference', () => {
  const parsed = parseReferenceQuery('太1:1');
  assert.deepEqual(parsed.languages, ['zh']);
  assert.equal(parsed.references[0].book.id, 'mat');
  assert.deepEqual(parsed.references[0].verses, [1]);
});

test('parses multiple references and mixed verse ranges', () => {
  const parsed = parseReferenceQuery('太1:2-4、6 創2:1');
  assert.deepEqual(parsed.references.map(({ book, chapter, verses }) => ({ id: book.id, chapter, verses })), [
    { id: 'mat', chapter: 1, verses: [2, 3, 4, 6] },
    { id: 'gen', chapter: 2, verses: [1] }
  ]);
});

test('accepts the requested Korean Matthew alias', () => {
  const parsed = parseReferenceQuery('태10', { chapterMode: true });
  assert.equal(parsed.references[0].book.id, 'mat');
  assert.deepEqual(parsed.languages, ['ko']);
});

test('supports English aliases with explicit language order', () => {
  assert.deepEqual(parseReferenceQuery('mat10 cn', { chapterMode: true }).languages, ['zh']);
  assert.deepEqual(parseReferenceQuery('mat10 kr', { chapterMode: true }).languages, ['ko']);
  assert.deepEqual(parseReferenceQuery('mat10 kr/cn', { chapterMode: true }).languages, ['ko', 'zh']);
  assert.deepEqual(parseReferenceQuery('mat10 cn/kr', { chapterMode: true }).languages, ['ko', 'zh']);
});

test('requires a language for an English alias', () => {
  assert.throws(() => parseReferenceQuery('mat10', { chapterMode: true }), /請在最後加上/);
});
