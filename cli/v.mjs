#!/usr/bin/env node

import { copyToClipboard } from './lib/clipboard.mjs';
import { formatBookTable, formatChapter, formatLanguageSummary, formatReferencesForCopy } from './lib/formatter.mjs';
import { parseReferenceQuery } from './lib/parser.mjs';
import { loadReferences } from './lib/repository.mjs';

const HELP = `scoynim/bible 0.1.1

用法
  v "太1:1"                       複製中文經文
  v "太1:2-4、6 創2:1"           複製多段中文經文
  v "태1:1"                       複製韓文經文
  v "mat1:1 cn"                   用英文簡寫複製中文
  v "mat1:1 kr"                   用英文簡寫複製韓文
  v "mat1:1 kr/cn"                複製韓文及中文

查看整章，不複製
  v -n "太10"
  v -n "태10"
  v -n "mat10 cn"
  v -n "mat10 kr"
  v -n "mat10 kr/cn"              依網頁格式顯示中韓雙語
  v -n "mat10 cn/kr"              同上，兩種寫法皆可

其他指令
  v -b, v books                    查看中韓英書卷簡寫對照表
  v -h, v help                     查看所有指令
  v --version                      查看版本

語言代號
  cn 或 zh                         中文
  kr 或 ko                         韓文
  cn/kr、kr/cn                     中韓雙語
`;

function fail(error) {
  process.stderr.write(`錯誤：${error.message || error}\n`);
  process.exitCode = 1;
}

async function run() {
  const args = process.argv.slice(2);
  const command = args[0]?.toLowerCase();

  if (!args.length || command === '-h' || command === '--help' || command === 'help') {
    process.stdout.write(HELP);
    return;
  }
  if (command === '--version' || command === '-v') {
    process.stdout.write('scoynim/bible 0.1.1\n');
    return;
  }
  if (command === '-b' || command === '--books' || command === 'books') {
    process.stdout.write(`${formatBookTable()}\n`);
    return;
  }

  if (command === '-n' || command === '--chapter') {
    const query = args.slice(1).join(' ').trim();
    if (!query) throw new Error('請在 -n 後輸入書卷及章數，例如 v -n "太10"。');
    const parsed = parseReferenceQuery(query, { chapterMode: true });
    const loaded = await loadReferences(parsed.references);
    process.stdout.write(`${loaded.map((reference) => formatChapter(reference, parsed.languages)).join('\n\n')}\n`);
    return;
  }

  const query = args.join(' ').trim();
  const parsed = parseReferenceQuery(query);
  const loaded = await loadReferences(parsed.references);
  const text = formatReferencesForCopy(loaded, parsed.languages);
  await copyToClipboard(text);
  process.stdout.write(`${text}\n`);
  process.stderr.write(`已複製 ${loaded.reduce((total, reference) => total + reference.verses.length, 0)} 節${formatLanguageSummary(parsed.languages)}經文。\n`);
}

run().catch(fail);
