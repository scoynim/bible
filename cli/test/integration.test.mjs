import assert from 'node:assert/strict';
import test from 'node:test';
import { formatChapter, formatReferencesForCopy } from '../lib/formatter.mjs';
import { parseReferenceQuery } from '../lib/parser.mjs';
import { loadReferences } from '../lib/repository.mjs';

test('loads and formats Matthew 1:1 from the existing Bible data', async () => {
  const parsed = parseReferenceQuery('太1:1');
  const loaded = await loadReferences(parsed.references);
  const result = formatReferencesForCopy(loaded, parsed.languages);
  assert.match(result, /^太 1:1 /);
  assert.match(result, /亞伯拉罕/);
});

test('formats a bilingual chapter in the requested order', async () => {
  const parsed = parseReferenceQuery('mat10 kr/cn', { chapterMode: true });
  const [loaded] = await loadReferences(parsed.references);
  const result = formatChapter(loaded, parsed.languages);
  assert.equal(result.split('\n')[0], '마태복음 10장');
  assert.equal(result.split('\n')[1], '馬太福音 第10章');
  assert.match(result, /예수께서/);
  assert.match(result, /耶穌/);
});

test('matches the website copy layout for multiple bilingual verses', async () => {
  const parsed = parseReferenceQuery('mat1:1-2 cn/kr');
  const loaded = await loadReferences(parsed.references);
  const result = formatReferencesForCopy(loaded, parsed.languages);
  const lines = result.split('\n');
  assert.match(lines[0], /^마 1:1 /);
  assert.match(lines[1], /^太 1:1 /);
  assert.equal(lines[2], '');
  assert.match(lines[3], /^마 1:2 /);
  assert.match(lines[4], /^太 1:2 /);
});
