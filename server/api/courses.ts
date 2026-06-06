export default defineEventHandler(() => {
  return [
    {
      id: 'hiragana',
      title: 'Hiragana (ひらがな)',
      description: 'Pelajari huruf dasar bahasa Jepang. Hiragana digunakan untuk kata-kata asli Jepang dan tata bahasa.',
      icon: 'あ',
      color: 'bg-pink-100 text-pink-600',
      lessons: 46,
      difficulty: 'Beginner',
      image: 'https://images.unsplash.com/photo-1578356920163-547e1d52d9de?q=80&w=600&auto=format&fit=crop' // Tokyo vibe
    },
    {
      id: 'katakana',
      title: 'Katakana (カタカナ)',
      description: 'Pelajari huruf untuk kata serapan asing. Katakana sangat penting untuk membaca nama asing dan istilah modern.',
      icon: 'ア',
      color: 'bg-blue-100 text-blue-600',
      lessons: 46,
      difficulty: 'Beginner',
      image: 'https://images.unsplash.com/photo-1542051812871-75f412670324?q=80&w=600&auto=format&fit=crop' // Cyberpunk/Neon vibe
    },
    {
      id: 'kanji',
      title: 'Kanji (漢字)',
      description: 'Pelajari karakter yang diadopsi dari Tiongkok. Kunci untuk membaca teks Jepang sesungguhnya dan menambah kosa kata.',
      icon: '漢',
      color: 'bg-yellow-100 text-yellow-600',
      lessons: 2000,
      difficulty: 'Advanced',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop' // Traditional Kyoto vibe
    }
  ];
});
