export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')

  const hiraganaStages = [
    {
      id: 1,
      title: 'Stage 1: Dasar A - Ko',
      material: [
        { romaji: 'a', char: 'あ' }, { romaji: 'i', char: 'い' }, { romaji: 'u', char: 'う' }, { romaji: 'e', char: 'え' }, { romaji: 'o', char: 'お' },
        { romaji: 'ka', char: 'か' }, { romaji: 'ki', char: 'き' }, { romaji: 'ku', char: 'く' }, { romaji: 'ke', char: 'け' }, { romaji: 'ko', char: 'こ' },
      ]
    },
    {
      id: 2,
      title: 'Stage 2: Sa - No',
      material: [
        { romaji: 'sa', char: 'さ' }, { romaji: 'shi', char: 'し' }, { romaji: 'su', char: 'す' }, { romaji: 'se', char: 'せ' }, { romaji: 'so', char: 'そ' },
        { romaji: 'ta', char: 'た' }, { romaji: 'chi', char: 'ち' }, { romaji: 'tsu', char: 'つ' }, { romaji: 'te', char: 'て' }, { romaji: 'to', char: 'と' },
        { romaji: 'na', char: 'な' }, { romaji: 'ni', char: 'に' }, { romaji: 'nu', char: 'ぬ' }, { romaji: 'ne', char: 'ね' }, { romaji: 'no', char: 'の' }
      ]
    },
    {
      id: 3,
      title: 'Stage 3: Ha - N',
      material: [
        { romaji: 'ha', char: 'は' }, { romaji: 'hi', char: 'ひ' }, { romaji: 'fu', char: 'ふ' }, { romaji: 'he', char: 'へ' }, { romaji: 'ho', char: 'ほ' },
        { romaji: 'ma', char: 'ま' }, { romaji: 'mi', char: 'み' }, { romaji: 'mu', char: 'む' }, { romaji: 'me', char: 'め' }, { romaji: 'mo', char: 'も' },
        { romaji: 'ya', char: 'や' }, { romaji: 'yu', char: 'ゆ' }, { romaji: 'yo', char: 'よ' },
        { romaji: 'ra', char: 'ら' }, { romaji: 'ri', char: 'り' }, { romaji: 'ru', char: 'る' }, { romaji: 're', char: 'れ' }, { romaji: 'ro', char: 'ろ' },
        { romaji: 'wa', char: 'わ' }, { romaji: 'wo', char: 'を' }, { romaji: 'n', char: 'ん' }
      ]
    },
    {
      id: 4,
      title: 'Stage 4: Kosakata',
      material: [
        { romaji: 'sensei', char: 'せんせい', meaning: 'Guru' },
        { romaji: 'uchi', char: 'うち', meaning: 'Rumah' },
        { romaji: 'watashi', char: 'わたし', meaning: 'Saya' },
        { romaji: 'arigatou', char: 'ありがとう', meaning: 'Terima Kasih' },
        { romaji: 'ohayou', char: 'おはよう', meaning: 'Selamat Pagi' },
        { romaji: 'inu', char: 'いぬ', meaning: 'Anjing' },
        { romaji: 'neko', char: 'ねこ', meaning: 'Kucing' },
        { romaji: 'mizu', char: 'みず', meaning: 'Air' },
        { romaji: 'kuruma', char: 'くるま', meaning: 'Mobil' },
        { romaji: 'hon', char: 'ほん', meaning: 'Buku' }
      ]
    }
  ];

  const katakanaStages = [
    {
      id: 1,
      title: 'Stage 1: Dasar A - Ko',
      material: [
        { romaji: 'a', char: 'ア' }, { romaji: 'i', char: 'イ' }, { romaji: 'u', char: 'ウ' }, { romaji: 'e', char: 'エ' }, { romaji: 'o', char: 'オ' },
        { romaji: 'ka', char: 'カ' }, { romaji: 'ki', char: 'キ' }, { romaji: 'ku', char: 'ク' }, { romaji: 'ke', char: 'ケ' }, { romaji: 'ko', char: 'コ' },
      ]
    },
    {
      id: 2,
      title: 'Stage 2: Sa - No',
      material: [
        { romaji: 'sa', char: 'サ' }, { romaji: 'shi', char: 'シ' }, { romaji: 'su', char: 'ス' }, { romaji: 'se', char: 'セ' }, { romaji: 'so', char: 'ソ' },
        { romaji: 'ta', char: 'タ' }, { romaji: 'chi', char: 'チ' }, { romaji: 'tsu', char: 'ツ' }, { romaji: 'te', char: 'テ' }, { romaji: 'to', char: 'ト' },
        { romaji: 'na', char: 'ナ' }, { romaji: 'ni', char: 'ニ' }, { romaji: 'nu', char: 'ヌ' }, { romaji: 'ne', char: 'ネ' }, { romaji: 'no', char: 'ノ' }
      ]
    },
    {
      id: 3,
      title: 'Stage 3: Ha - N',
      material: [
        { romaji: 'ha', char: 'ハ' }, { romaji: 'hi', char: 'ヒ' }, { romaji: 'fu', char: 'フ' }, { romaji: 'he', char: 'ヘ' }, { romaji: 'ho', char: 'ホ' },
        { romaji: 'ma', char: 'マ' }, { romaji: 'mi', char: 'ミ' }, { romaji: 'mu', char: 'ム' }, { romaji: 'me', char: 'メ' }, { romaji: 'mo', char: 'モ' },
        { romaji: 'ya', char: 'ヤ' }, { romaji: 'yu', char: 'ユ' }, { romaji: 'yo', char: 'ヨ' },
        { romaji: 'ra', char: 'ラ' }, { romaji: 'ri', char: 'リ' }, { romaji: 'ru', char: 'ル' }, { romaji: 're', char: 'レ' }, { romaji: 'ro', char: 'ロ' },
        { romaji: 'wa', char: 'ワ' }, { romaji: 'wo', char: 'ヲ' }, { romaji: 'n', char: 'ン' }
      ]
    },
    {
      id: 4,
      title: 'Stage 4: Kosakata Serapan',
      material: [
        { romaji: 'pan', char: 'パン', meaning: 'Roti' },
        { romaji: 'kamera', char: 'カメラ', meaning: 'Kamera' },
        { point: true, romaji: 'konpyuta', char: 'コンピュータ', meaning: 'Komputer' },
        { romaji: 'terebi', char: 'テレビ', meaning: 'Televisi' },
        { romaji: 'kohi', char: 'コーヒー', meaning: 'Kopi' },
        { romaji: 'konbini', char: 'コンビニ', meaning: 'Minimarket' },
        { romaji: 'resutoran', char: 'レストラン', meaning: 'Restoran' },
        { romaji: 'basu', char: 'バス', meaning: 'Bus' },
        { romaji: 'hoteru', char: 'ホテル', meaning: 'Hotel' },
        { romaji: 'pasokon', char: 'パソコン', meaning: 'PC / Laptop' }
      ]
    }
  ];

  const kanjiStages = [
    {
      id: 1,
      title: 'Stage 1: Angka Dasar',
      material: [
        { romaji: 'ichi', char: '一', meaning: 'Satu' },
        { romaji: 'ni', char: '二', meaning: 'Dua' },
        { romaji: 'san', char: '三', meaning: 'Tiga' },
        { romaji: 'yon', char: '四', meaning: 'Empat' },
        { romaji: 'go', char: '五', meaning: 'Lima' }
      ]
    },
    {
      id: 2,
      title: 'Stage 2: Alam',
      material: [
        { romaji: 'hi', char: '日', meaning: 'Matahari / Hari' },
        { romaji: 'tsuki', char: '月', meaning: 'Bulan' },
        { romaji: 'hi / ka', char: '火', meaning: 'Api' },
        { romaji: 'mizu', char: '水', meaning: 'Air' },
        { romaji: 'ki', char: '木', meaning: 'Pohon' }
      ]
    },
    {
      id: 3,
      title: 'Stage 3: Elemen & Manusia',
      material: [
        { romaji: 'kane', char: '金', meaning: 'Emas / Uang' },
        { romaji: 'tsuchi', char: '土', meaning: 'Tanah' },
        { romaji: 'yama', char: '山', meaning: 'Gunung' },
        { romaji: 'kawa', char: '川', meaning: 'Sungai' },
        { romaji: 'hito', char: '人', meaning: 'Orang' }
      ]
    },
    {
      id: 4,
      title: 'Stage 4: Gabungan Kata',
      material: [
        { romaji: 'kazan', char: '火山', meaning: 'Gunung Berapi (Api+Gunung)' },
        { romaji: 'suiden', char: '水田', meaning: 'Sawah Air (Air+Sawah)' },
        { romaji: 'koibito', char: '恋人', meaning: 'Kekasih (Cinta+Orang)' },
        { romaji: 'kyujitsu', char: '休日', meaning: 'Hari Libur (Istirahat+Hari)' },
        { romaji: 'hitori', char: '一人', meaning: 'Satu Orang (Satu+Orang)' },
        { romaji: 'futari', char: '二人', meaning: 'Dua Orang (Dua+Orang)' },
        { romaji: 'getsuyoubi', char: '月曜日', meaning: 'Hari Senin (Bulan+Hari)' },
        { romaji: 'kayoubi', char: '火曜日', meaning: 'Hari Selasa (Api+Hari)' },
        { romaji: 'suiyoubi', char: '水曜日', meaning: 'Hari Rabu (Air+Hari)' },
        { romaji: 'mokuyoubi', char: '木曜日', meaning: 'Hari Kamis (Pohon+Hari)' },
        { romaji: 'kinyoubi', char: '金曜日', meaning: 'Hari Jumat (Emas+Hari)' },
        { romaji: 'doyoubi', char: '土曜日', meaning: 'Hari Sabtu (Tanah+Hari)' },
        { romaji: 'nichiyoubi', char: '日曜日', meaning: 'Hari Minggu (Matahari+Hari)' },
        { romaji: 'jinkou', char: '人口', meaning: 'Populasi (Orang+Mulut)' },
        { romaji: 'chika', char: '地下', meaning: 'Bawah Tanah (Bawah+Tanah)' },
        { romaji: 'ninki', char: '人気', meaning: 'Populer (Orang+Energi)' }
      ]
    }
  ];

  if (id === 'hiragana') {
    return { title: 'Hiragana (ひらがな)', stages: hiraganaStages }
  } else if (id === 'katakana') {
    return { title: 'Katakana (カタカナ)', stages: katakanaStages }
  } else if (id === 'kanji') {
    return { title: 'Kanji (漢字)', stages: kanjiStages }
  }

  throw createError({
    statusCode: 404,
    statusMessage: 'Course not found',
  })
})
