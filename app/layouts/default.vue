<template>
  <div class="min-h-screen flex flex-col font-sans">
    <header class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-anime-light shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-black text-anime-primary flex items-center gap-2">
          <span class="text-3xl">🌸</span> CourseNime
        </NuxtLink>
        <nav>
          <ul class="flex space-x-6 text-anime-dark font-medium">
            <li><NuxtLink to="/" class="hover:text-anime-primary transition-colors">Home</NuxtLink></li>
            <li><NuxtLink to="/courses" class="hover:text-anime-primary transition-colors">Courses</NuxtLink></li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="bg-anime-dark text-anime-light py-8">
      <div class="container mx-auto px-4 text-center">
        <p class="font-jp text-lg mb-2">日本語を楽しく学ぼう！</p>
        <p class="text-sm text-gray-400">© {{ new Date().getFullYear() }} CourseNime. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>
