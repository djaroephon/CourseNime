<template>
  <div class="min-h-screen bg-anime-light relative overflow-hidden">
    <div class="sakura-container absolute inset-0 pointer-events-none z-0">
      <div v-for="n in 30" :key="n" class="sakura-petal" :style="getPetalStyle(n)"></div>
    </div>

    <div class="absolute top-0 right-0 w-96 h-96 bg-anime-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-anime-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
    
    <div class="container mx-auto px-4 pt-20 pb-32 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
      
      <div class="md:w-1/2 space-y-6 text-center md:text-left">
        <div class="bg-white px-5 py-2.5 rounded-full shadow-sm text-sm md:text-base font-bold text-anime-primary mb-4 border border-anime-primary/20 text-left inline-flex items-center w-fit max-w-full min-h-[2.5rem]">
          <span class="anime-typing font-jp opacity-100">日本語を学ぼう！ Belajar itu mudah lho~</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-black text-anime-dark leading-tight font-jp">
          Belajar Bahasa Jepang <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-anime-primary to-anime-secondary animate-pulse">Lebih Seru!</span>
        </h1>
        <p class="text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
          Kuasai Hiragana, Katakana, dan Kanji dengan antarmuka yang interaktif dan menantang.
        </p>
        <div class="pt-4">
          <NuxtLink to="/courses" class="inline-block bg-anime-primary hover:bg-anime-primary/90 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-anime-primary/50 transition-all transform hover:-translate-y-1 text-lg">
            Mulai Course
          </NuxtLink>
        </div>
      </div>

      <div class="md:w-1/2 animate-float">
        <div class="relative w-full max-w-md mx-auto aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white group">
          <img src="@/assets/images/mafuyu SAMA.jpg" alt="Anime Style Scene" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
          <div class="absolute inset-0 bg-gradient-to-t from-anime-dark/50 to-transparent"></div>
          <div class="absolute bottom-6 left-6 text-white font-jp text-2xl font-bold">
            🌸まふゆ
          </div>
        </div>
      </div>

    </div>

    <!-- FITUR SECTION -->
    <div class="relative z-10 bg-white/60 backdrop-blur-md py-24 border-y border-white/50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-black text-anime-dark mb-4 font-jp">Kenapa Belajar di CourseNime?</h2>
          <p class="text-gray-600 max-w-2xl mx-auto text-lg">Platform belajar bahasa Jepang yang didesain khusus agar kamu merasa seperti bermain game, bukan sedang sekolah.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Fitur 1 -->
          <div class="bg-white p-8 rounded-[2rem] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-anime-primary/20 group">
            <div class="w-16 h-16 bg-anime-primary/10 text-anime-primary rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
              🎮
            </div>
            <h3 class="text-2xl font-bold text-anime-dark mb-3">Super Interaktif</h3>
            <p class="text-gray-600 leading-relaxed">Ucapkan selamat tinggal pada cara belajar yang membosankan! Praktik langsung dengan fitur <span class="font-bold text-anime-primary">drag-and-drop</span> dan kuis cepat yang menantang adrenalinmu.</p>
          </div>

          <!-- Fitur 2 -->
          <div class="bg-white p-8 rounded-[2rem] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-anime-secondary/20 group">
            <div class="w-16 h-16 bg-anime-secondary/10 text-anime-secondary rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
              📊
            </div>
            <h3 class="text-2xl font-bold text-anime-dark mb-3">Progress Terpantau</h3>
            <p class="text-gray-600 leading-relaxed">Semua hasil latihanmu disimpan aman di <span class="font-bold text-anime-secondary">Cloud Database</span>. Pantau terus jumlah jawaban benar dan salahmu secara real-time.</p>
          </div>

          <!-- Fitur 3 -->
          <div class="bg-white p-8 rounded-[2rem] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-green-500/20 group">
            <div class="w-16 h-16 bg-green-100 text-green-500 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
              🎌
            </div>
            <h3 class="text-2xl font-bold text-anime-dark mb-3">Paket Lengkap</h3>
            <p class="text-gray-600 leading-relaxed">Mulai dari <span class="font-bold text-green-500">Hiragana, Katakana, hingga Kanji</span> dasar. Pondasi sempurna buat kamu yang bersiap ke Jepang atau sekadar marathon anime.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

useHead({
  title: 'CourseNime - Home'
})

onMounted(async () => {
  const animeModule = await import('animejs');
  const anime = animeModule.default || animeModule;

  const texts = [
    "日本語を学ぼう！ Belajar itu mudah lho~",
    "頑張って！ (Ganbatte!) Semangat belajarnya!",
    "諦めないで！ (Akiramenaide!) Jangan menyerah!"
  ];
  let currentIndex = 0;

  const animateText = () => {
    const textWrapper = document.querySelector('.anime-typing');
    if (!textWrapper) return;
    
    // Reset opacity to 1 because the animation sets it to 0 at the end
    textWrapper.style.opacity = 1;
    textWrapper.textContent = texts[currentIndex];
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter inline-block'>$&</span>");

    try {
      anime.timeline({
        complete: () => {
          currentIndex = (currentIndex + 1) % texts.length;
          animateText();
        }
      })
        .add({
          targets: '.anime-typing .letter',
          scale: [3, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: "easeOutExpo",
          duration: 800,
          delay: (el, i) => 50 * i
        }).add({
          targets: '.anime-typing',
          opacity: [1, 0],
          duration: 1000,
          easing: "easeOutExpo",
          delay: 3000
        });
    } catch (e) {
      console.error("AnimeJS animation failed", e);
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % texts.length;
        animateText();
      }, 4000);
    }
  };

  animateText();
})

const getPetalStyle = (n) => {
  const left = (n * 17) % 100;
  const animationDuration = 5 + ((n * 3) % 10);
  const animationDelay = (n * 7) % 15;
  const size = 10 + (n % 15);
  return {
    left: `${left}%`,
    width: `${size}px`,
    height: `${size * 1.5}px`,
    animationDuration: `${animationDuration}s`,
    animationDelay: `-${animationDelay}s`,
  }
}
</script>

<style scoped>
.sakura-container {
  overflow: hidden;
}

.sakura-petal {
  position: absolute;
  top: -10%;
  background-color: #ffb7c5;
  border-radius: 100% 0% 100% 0%;
  opacity: 0.6;
  animation-name: fallAndSway;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  box-shadow: 0 0 5px rgba(255, 183, 197, 0.8);
}

@keyframes fallAndSway {
  0% {
    top: -10%;
    transform: translateX(0) rotate(0deg);
  }
  20% {
    transform: translateX(-20px) rotate(45deg);
  }
  40% {
    transform: translateX(20px) rotate(90deg);
  }
  60% {
    transform: translateX(-20px) rotate(135deg);
  }
  80% {
    transform: translateX(20px) rotate(180deg);
  }
  100% {
    top: 110%;
    transform: translateX(0) rotate(225deg);
  }
}
</style>
