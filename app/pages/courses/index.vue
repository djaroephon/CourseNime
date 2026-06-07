<template>
  <div class="min-h-screen bg-anime-light py-16">
    <div class="container mx-auto px-4">
      
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-black text-anime-dark mb-4 font-jp">
          Mulai Petualanganmu 剣
        </h1>
        <p class="text-gray-600 max-w-2xl mx-auto text-lg">
          Pilih jalur belajarmu. Dari dasar huruf hingga karakter kompleks, kami menyediakan semua yang kamu butuhkan.
        </p>
      </div>

      <div v-if="pending" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-anime-primary"></div>
      </div>

      <div v-else-if="error" class="text-center py-20 text-red-500 bg-red-50 rounded-2xl">
        <p class="text-xl font-bold">Gagal memuat course.</p>
        <p>{{ error.message }}</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div v-for="course in courses" :key="course.id" 
             class="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 hover:border-anime-secondary group overflow-hidden flex flex-col">
          
          <div class="h-48 overflow-hidden relative">
            <img :src="course.image" :alt="course.title" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div :class="[course.color, 'absolute -bottom-6 right-6 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black font-jp shadow-lg z-10 border-4 border-white']">
              {{ course.icon }}
            </div>
          </div>
          
          <div class="p-8 relative z-10 flex flex-col flex-grow">
            <h2 class="text-2xl font-bold text-anime-dark mb-3">{{ course.title }}</h2>
            <p class="text-gray-600 mb-6 flex-grow">
              {{ course.description }}
            </p>
            
            <div class="flex items-center justify-between border-t border-gray-100 pt-6 mb-6">
              <span class="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {{ course.difficulty }}
              </span>
              <span class="text-sm font-medium text-anime-primary">
                {{ course.lessons }} Huruf
              </span>
            </div>
            
            <NuxtLink :to="`/courses/${course.id}`" class="block text-center w-full bg-gray-50 hover:bg-anime-primary hover:text-white text-anime-dark font-bold py-3 rounded-xl transition-colors duration-300">
              Mulai Belajar
            </NuxtLink>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const router = useRouter()
const profileId = useCookie('course_profile_id')

onMounted(() => {
  if (!profileId.value) {
    router.push('/register')
  }
})

useHead({
  title: 'CourseNime - Pilih Course'
})

const { data: courses, pending, error } = await useFetch('/api/courses')
</script>
