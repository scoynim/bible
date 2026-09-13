export const BOOKS = [
  { id: 'gen', zh: '創世記', zhAbbr: '創', ko: '창세기', koAbbr: '창', en: 'gen', chapters: 50 },
  { id: 'exo', zh: '出埃及記', zhAbbr: '出', ko: '출애굽기', koAbbr: '출', en: 'exo', chapters: 40 },
  { id: 'lev', zh: '利未記', zhAbbr: '利', ko: '레위기', koAbbr: '레', en: 'lev', chapters: 27 },
  { id: 'num', zh: '民數記', zhAbbr: '民', ko: '민수기', koAbbr: '민', en: 'num', chapters: 36 },
  { id: 'deu', zh: '申命記', zhAbbr: '申', ko: '신명기', koAbbr: '신', en: 'deu', chapters: 34 },
  { id: 'jos', zh: '約書亞記', zhAbbr: '書', ko: '여호수아', koAbbr: '수', en: 'jos', chapters: 24 },
  { id: 'jdg', zh: '士師記', zhAbbr: '士', ko: '사사기', koAbbr: '삿', en: 'jdg', chapters: 21 },
  { id: 'rut', zh: '路得記', zhAbbr: '得', ko: '룻기', koAbbr: '룻', en: 'rut', chapters: 4 },
  { id: '1sa', zh: '撒母耳記上', zhAbbr: '撒上', ko: '사무엘상', koAbbr: '삼상', en: '1sa', chapters: 31 },
  { id: '2sa', zh: '撒母耳記下', zhAbbr: '撒下', ko: '사무엘하', koAbbr: '삼하', en: '2sa', chapters: 24 },
  { id: '1ki', zh: '列王紀上', zhAbbr: '王上', ko: '열왕기상', koAbbr: '왕상', en: '1ki', chapters: 22 },
  { id: '2ki', zh: '列王紀下', zhAbbr: '王下', ko: '열왕기하', koAbbr: '왕하', en: '2ki', chapters: 25 },
  { id: '1ch', zh: '歷代志上', zhAbbr: '代上', ko: '역대상', koAbbr: '대상', en: '1ch', chapters: 29 },
  { id: '2ch', zh: '歷代志下', zhAbbr: '代下', ko: '역대하', koAbbr: '대하', en: '2ch', chapters: 36 },
  { id: 'ezr', zh: '以斯拉記', zhAbbr: '拉', ko: '에스라', koAbbr: '스', en: 'ezr', chapters: 10 },
  { id: 'neh', zh: '尼希米記', zhAbbr: '尼', ko: '느헤미야', koAbbr: '느', en: 'neh', chapters: 13 },
  { id: 'est', zh: '以斯帖記', zhAbbr: '斯', ko: '에스더', koAbbr: '에', en: 'est', chapters: 10 },
  { id: 'job', zh: '約伯記', zhAbbr: '伯', ko: '욥기', koAbbr: '욥', en: 'job', chapters: 42 },
  { id: 'psa', zh: '詩篇', zhAbbr: '詩', ko: '시편', koAbbr: '시', en: 'psa', chapters: 150 },
  { id: 'pro', zh: '箴言', zhAbbr: '箴', ko: '잠언', koAbbr: '잠', en: 'pro', chapters: 31 },
  { id: 'ecc', zh: '傳道書', zhAbbr: '傳', ko: '전도서', koAbbr: '전', en: 'ecc', chapters: 12 },
  { id: 'sng', zh: '雅歌', zhAbbr: '歌', ko: '아가', koAbbr: '아', en: 'sng', chapters: 8 },
  { id: 'isa', zh: '以賽亞書', zhAbbr: '賽', ko: '이사야', koAbbr: '사', en: 'isa', chapters: 66 },
  { id: 'jer', zh: '耶利米書', zhAbbr: '耶', ko: '예레미야', koAbbr: '렘', en: 'jer', chapters: 52 },
  { id: 'lam', zh: '耶利米哀歌', zhAbbr: '哀', ko: '예레미야애가', koAbbr: '애', en: 'lam', chapters: 5 },
  { id: 'ezk', zh: '以西結書', zhAbbr: '結', ko: '에스겔', koAbbr: '겔', en: 'ezk', chapters: 48 },
  { id: 'dan', zh: '但以理書', zhAbbr: '但', ko: '다니엘', koAbbr: '단', en: 'dan', chapters: 12 },
  { id: 'hos', zh: '何西阿書', zhAbbr: '何', ko: '호세아', koAbbr: '호', en: 'hos', chapters: 14 },
  { id: 'jol', zh: '約珥書', zhAbbr: '珥', ko: '요엘', koAbbr: '욜', en: 'jol', chapters: 3 },
  { id: 'amo', zh: '阿摩司書', zhAbbr: '摩', ko: '아모스', koAbbr: '암', en: 'amo', chapters: 9 },
  { id: 'oba', zh: '俄巴底亞書', zhAbbr: '俄', ko: '오바댜', koAbbr: '옵', en: 'oba', chapters: 1 },
  { id: 'jon', zh: '約拿書', zhAbbr: '拿', ko: '요나', koAbbr: '욘', en: 'jon', chapters: 4 },
  { id: 'mic', zh: '彌迦書', zhAbbr: '彌', ko: '미가', koAbbr: '미', en: 'mic', chapters: 7 },
  { id: 'nam', zh: '那鴻書', zhAbbr: '鴻', ko: '나훔', koAbbr: '나', en: 'nam', chapters: 3 },
  { id: 'hab', zh: '哈巴谷書', zhAbbr: '哈', ko: '하박국', koAbbr: '합', en: 'hab', chapters: 3 },
  { id: 'zep', zh: '西番雅書', zhAbbr: '番', ko: '스바냐', koAbbr: '습', en: 'zep', chapters: 3 },
  { id: 'hag', zh: '哈該書', zhAbbr: '該', ko: '학개', koAbbr: '학', en: 'hag', chapters: 2 },
  { id: 'zec', zh: '撒迦利亞書', zhAbbr: '亞', ko: '스가랴', koAbbr: '슥', en: 'zec', chapters: 14 },
  { id: 'mal', zh: '瑪拉基書', zhAbbr: '瑪', ko: '말라기', koAbbr: '말', en: 'mal', chapters: 4 },
  { id: 'mat', zh: '馬太福音', zhAbbr: '太', ko: '마태복음', koAbbr: '마', koAlt: ['태'], en: 'mat', chapters: 28 },
  { id: 'mrk', zh: '馬可福音', zhAbbr: '可', ko: '마가복음', koAbbr: '막', en: 'mrk', chapters: 16 },
  { id: 'luk', zh: '路加福音', zhAbbr: '路', ko: '누가복음', koAbbr: '눅', en: 'luk', chapters: 24 },
  { id: 'jhn', zh: '約翰福音', zhAbbr: '約', ko: '요한복음', koAbbr: '요', en: 'jhn', chapters: 21 },
  { id: 'act', zh: '使徒行傳', zhAbbr: '徒', ko: '사도행전', koAbbr: '행', en: 'act', chapters: 28 },
  { id: 'rom', zh: '羅馬書', zhAbbr: '羅', ko: '로마서', koAbbr: '롬', en: 'rom', chapters: 16 },
  { id: '1co', zh: '哥林多前書', zhAbbr: '林前', ko: '고린도전서', koAbbr: '고전', en: '1co', chapters: 16 },
  { id: '2co', zh: '哥林多後書', zhAbbr: '林後', ko: '고린도후서', koAbbr: '고후', en: '2co', chapters: 13 },
  { id: 'gal', zh: '加拉太書', zhAbbr: '加', ko: '갈라디아서', koAbbr: '갈', en: 'gal', chapters: 6 },
  { id: 'eph', zh: '以弗所書', zhAbbr: '弗', ko: '에베소서', koAbbr: '엡', en: 'eph', chapters: 6 },
  { id: 'php', zh: '腓立比書', zhAbbr: '腓', ko: '빌립보서', koAbbr: '빌', en: 'php', chapters: 4 },
  { id: 'col', zh: '歌羅西書', zhAbbr: '西', ko: '골로새서', koAbbr: '골', en: 'col', chapters: 4 },
  { id: '1th', zh: '帖撒羅尼迦前書', zhAbbr: '帖前', ko: '데살로니가전서', koAbbr: '살전', en: '1th', chapters: 5 },
  { id: '2th', zh: '帖撒羅尼迦後書', zhAbbr: '帖後', ko: '데살로니가후서', koAbbr: '살후', en: '2th', chapters: 3 },
  { id: '1ti', zh: '提摩太前書', zhAbbr: '提前', ko: '디모데전서', koAbbr: '딤전', en: '1ti', chapters: 6 },
  { id: '2ti', zh: '提摩太後書', zhAbbr: '提後', ko: '디모데후서', koAbbr: '딤후', en: '2ti', chapters: 4 },
  { id: 'tit', zh: '提多書', zhAbbr: '多', ko: '디도서', koAbbr: '딛', en: 'tit', chapters: 3 },
  { id: 'phm', zh: '腓利門書', zhAbbr: '門', ko: '빌레몬서', koAbbr: '몬', en: 'phm', chapters: 1 },
  { id: 'heb', zh: '希伯來書', zhAbbr: '來', ko: '히브리서', koAbbr: '히', en: 'heb', chapters: 13 },
  { id: 'jas', zh: '雅各書', zhAbbr: '雅', ko: '야고보서', koAbbr: '약', en: 'jas', chapters: 5 },
  { id: '1pe', zh: '彼得前書', zhAbbr: '彼前', ko: '베드로전서', koAbbr: '벧전', en: '1pe', chapters: 5 },
  { id: '2pe', zh: '彼得後書', zhAbbr: '彼後', ko: '베드로후서', koAbbr: '벧후', en: '2pe', chapters: 3 },
  { id: '1jn', zh: '約翰一書', zhAbbr: '約一', zhAlt: ['約壹'], ko: '요한일서', koAbbr: '요일', en: '1jn', chapters: 5 },
  { id: '2jn', zh: '約翰二書', zhAbbr: '約二', zhAlt: ['約貳'], ko: '요한이서', koAbbr: '요이', en: '2jn', chapters: 1 },
  { id: '3jn', zh: '約翰三書', zhAbbr: '約三', zhAlt: ['約參'], ko: '요한삼서', koAbbr: '요삼', en: '3jn', chapters: 1 },
  { id: 'jud', zh: '猶大書', zhAbbr: '猶', ko: '유다서', koAbbr: '유', en: 'jud', chapters: 1 },
  { id: 'rev', zh: '啟示錄', zhAbbr: '啟', ko: '요한계시록', koAbbr: '계', en: 'rev', chapters: 22 }
];

const EXTRA_ENGLISH_ALIASES = {
  ge: 'gen', gn: 'gen', ex: 'exo', lv: 'lev', nu: 'num', dt: 'deu', josh: 'jos',
  judg: 'jdg', ruth: 'rut', '1sam': '1sa', '2sam': '2sa', '1kings': '1ki',
  '2kings': '2ki', '1chr': '1ch', '2chr': '2ch', ezra: 'ezr', esther: 'est',
  ps: 'psa', psalm: 'psa', prov: 'pro', eccl: 'ecc', song: 'sng', is: 'isa',
  eze: 'ezk', dn: 'dan', joel: 'jol', amos: 'amo', obad: 'oba', jonah: 'jon',
  micah: 'mic', nahum: 'nam', zeph: 'zep', haggai: 'hag', zech: 'zec',
  malachi: 'mal', matt: 'mat', mt: 'mat', mark: 'mrk', mk: 'mrk', luke: 'luk',
  lk: 'luk', john: 'jhn', jn: 'jhn', acts: 'act', ro: 'rom', '1cor': '1co',
  '2cor': '2co', phil: 'php', '1thess': '1th', '2thess': '2th', '1tim': '1ti',
  '2tim': '2ti', titus: 'tit', philem: 'phm', hebrews: 'heb', james: 'jas',
  '1pet': '1pe', '2pet': '2pe', '1john': '1jn', '2john': '2jn', '3john': '3jn',
  jude: 'jud', revelation: 'rev', re: 'rev'
};

export const BOOK_BY_ID = new Map(BOOKS.map((book) => [book.id, book]));

export function buildAliasMap() {
  const aliases = new Map();
  const add = (alias, book, language) => {
    if (alias) aliases.set(alias.toLowerCase(), { book, language, alias });
  };

  for (const book of BOOKS) {
    add(book.zh, book, 'zh');
    add(book.zhAbbr, book, 'zh');
    for (const alias of book.zhAlt || []) add(alias, book, 'zh');
    add(book.ko, book, 'ko');
    add(book.koAbbr, book, 'ko');
    for (const alias of book.koAlt || []) add(alias, book, 'ko');
    add(book.en, book, 'en');
  }

  for (const [alias, id] of Object.entries(EXTRA_ENGLISH_ALIASES)) {
    add(alias, BOOK_BY_ID.get(id), 'en');
  }
  return aliases;
}
