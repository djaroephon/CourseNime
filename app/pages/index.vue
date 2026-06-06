<template>
  <div class="min-h-screen bg-anime-light relative overflow-hidden">
    <div class="sakura-container absolute inset-0 pointer-events-none z-0">
      <div v-for="n in 30" :key="n" class="sakura-petal" :style="getPetalStyle(n)"></div>
    </div>

    <div class="absolute top-0 right-0 w-96 h-96 bg-anime-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-anime-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
    
    <div class="container mx-auto px-4 pt-20 pb-32 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
      
      <div class="md:w-1/2 space-y-6 text-center md:text-left">
        <div class="inline-block bg-white px-4 py-2 rounded-full shadow-sm text-sm font-bold text-anime-primary mb-4 border border-anime-primary/20">
          日本語を学ぼう！
        </div>
        <h1 class="text-5xl md:text-7xl font-black text-anime-dark leading-tight font-jp">
          Belajar Bahasa Jepang <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-anime-primary to-anime-secondary animate-pulse">Lebih Seru!</span>
        </h1>
        <p class="text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
          Kuasai Hiragana, Katakana, dan Kanji dengan antarmuka yang interaktif, menantang.
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
  </div>
</template>

<script setup>
useHead({
  title: 'CourseNime - Home'
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
