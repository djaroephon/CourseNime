export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')

  const hiraganaData = [
    { romaji: 'a', char: 'あ' }, { romaji: 'i', char: 'い' }, { romaji: 'u', char: 'う' }, { romaji: 'e', char: 'え' }, { romaji: 'o', char: 'お' },
    { romaji: 'ka', char: 'か' }, { romaji: 'ki', char: 'き' }, { romaji: 'ku', char: 'く' }, { romaji: 'ke', char: 'け' }, { romaji: 'ko', char: 'こ' },
    { romaji: 'sa', char: 'さ' }, { romaji: 'shi', char: 'し' }, { romaji: 'su', char: 'す' }, { romaji: 'se', char: 'せ' }, { romaji: 'so', char: 'そ' },
    { romaji: 'ta', char: 'た' }, { romaji: 'chi', char: 'ち' }, { romaji: 'tsu', char: 'つ' }, { romaji: 'te', char: 'て' }, { romaji: 'to', char: 'と' },
    { romaji: 'na', char: 'な' }, { romaji: 'ni', char: 'に' }, { romaji: 'nu', char: 'ぬ' }, { romaji: 'ne', char: 'ね' }, { romaji: 'no', char: 'の' }
  ];

  const katakanaData = [
    { romaji: 'a', char: 'ア' }, { romaji: 'i', char: 'イ' }, { romaji: 'u', char: 'ウ' }, { romaji: 'e', char: 'エ' }, { romaji: 'o', char: 'オ' },
    { romaji: 'ka', char: 'カ' }, { romaji: 'ki', char: 'キ' }, { romaji: 'ku', char: 'ク' }, { romaji: 'ke', char: 'ケ' }, { romaji: 'ko', char: 'コ' },
    { romaji: 'sa', char: 'サ' }, { romaji: 'shi', char: 'シ' }, { romaji: 'su', char: 'ス' }, { romaji: 'se', char: 'セ' }, { romaji: 'so', char: 'ソ' },
    { romaji: 'ta', char: 'タ' }, { romaji: 'chi', char: 'チ' }, { romaji: 'tsu', char: 'ツ' }, { romaji: 'te', char: 'テ' }, { romaji: 'to', char: 'ト' },
    { romaji: 'na', char: 'ナ' }, { romaji: 'ni', char: 'ニ' }, { romaji: 'nu', char: 'ヌ' }, { romaji: 'ne', char: 'ネ' }, { romaji: 'no', char: 'ノ' }
  ];

  const kanjiData = [
    { romaji: 'ichi', char: '一', meaning: 'Satu' },
    { romaji: 'ni', char: '二', meaning: 'Dua' },
    { romaji: 'san', char: '三', meaning: 'Tiga' },
    { romaji: 'hito', char: '人', meaning: 'Orang' },
    { romaji: 'hi', char: '日', meaning: 'Matahari / Hari' },
    { romaji: 'tsuki', char: '月', meaning: 'Bulan' },
    { romaji: 'hi / ka', char: '火', meaning: 'Api' },
    { romaji: 'mizu', char: '水', meaning: 'Air' },
    { romaji: 'ki', char: '木', meaning: 'Pohon' },
    { romaji: 'kane', char: '金', meaning: 'Emas / Uang' },
    { romaji: 'tsuchi', char: '土', meaning: 'Tanah' },
    { romaji: 'yama', char: '山', meaning: 'Gunung' }
  ];

  if (id === 'hiragana') {
    return { title: 'Hiragana (ひらがな)', data: hiraganaData }
  } else if (id === 'katakana') {
    return { title: 'Katakana (カタカナ)', data: katakanaData }
  } else if (id === 'kanji') {
    return { title: 'Kanji (漢字)', data: kanjiData }
  }

  throw createError({
    statusCode: 404,
    statusMessage: 'Course not found',
  })
})
