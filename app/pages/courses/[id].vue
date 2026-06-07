<template>
  <div class="min-h-screen bg-anime-light flex flex-col font-sans relative overflow-hidden">
    
    <div v-if="pending" class="flex-grow flex justify-center items-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-anime-primary"></div>
    </div>
    
    <div v-else-if="error" class="flex-grow flex justify-center items-center">
      <div class="bg-red-50 text-red-500 rounded-2xl p-8 text-center shadow-lg">
        <p class="text-3xl mb-4">😢</p>
        <p class="text-xl font-bold">Gagal memuat kelas.</p>
        <NuxtLink to="/courses" class="mt-4 block bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600">Kembali</NuxtLink>
      </div>
    </div>

    <div v-else-if="!quizStarted && !isFinished" class="flex-grow flex flex-col justify-center items-center p-4 z-10 relative">
      <div class="absolute top-10 left-10 text-9xl text-anime-primary/10 font-jp -rotate-12 animate-pulse">学</div>
      
      <div class="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] shadow-2xl text-center max-w-lg w-full border-4 border-white">
        <div class="w-24 h-24 bg-anime-primary/20 text-anime-primary rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
          🎮
        </div>
        <h1 class="text-4xl font-black text-anime-dark mb-4">Siap Berlatih?</h1>
        <p class="text-gray-600 mb-8 text-lg">
          Selesaikan tantangan kuis interaktif untuk menguasai {{ course.title }}. Ada pilihan ganda dan pencocokan huruf!
        </p>
        <button @click="startQuiz" class="w-full bg-anime-primary hover:bg-anime-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg hover:-translate-y-1 transition-all text-xl">
          Mulai Sekarang
        </button>
      </div>
    </div>

    <div v-else-if="quizStarted && !isFinished && currentQuestion" class="flex-grow flex flex-col z-10 bg-white">
      
      <div class="container mx-auto px-4 py-6 flex items-center gap-4">
        <button @click="quitQuiz" class="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors">✕</button>
        <div class="flex-grow bg-gray-200 h-4 rounded-full overflow-hidden">
          <div class="bg-green-500 h-full transition-all duration-500 ease-out" :style="{ width: `${progressPercentage}%` }"></div>
        </div>
      </div>

      <div class="flex-grow container mx-auto px-4 max-w-3xl flex flex-col justify-center pb-32">
        <h2 class="text-2xl font-bold text-gray-800 mb-8 font-jp">{{ currentQuestion.prompt }}</h2>

        <div v-if="currentQuestion.type === 'mcq'" class="flex flex-col items-center">
          <div class="text-7xl md:text-8xl font-black text-anime-dark mb-8 md:mb-12 font-jp">{{ currentQuestion.target.char }}</div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full">
            <button v-for="(opt, idx) in currentQuestion.options" :key="idx"
                    @click="selectOption(opt)"
                    :disabled="isChecked"
                    :class="[
                      'p-4 md:p-6 rounded-2xl border-2 text-lg md:text-xl font-bold transition-all text-center uppercase tracking-widest',
                      selectedAnswer === opt && !isChecked ? 'border-anime-primary bg-anime-primary/10 text-anime-primary' : '',
                      selectedAnswer !== opt && !isChecked ? 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50' : '',
                      isChecked && opt === currentQuestion.target.romaji ? 'border-green-500 bg-green-100 text-green-700' : '',
                      isChecked && selectedAnswer === opt && opt !== currentQuestion.target.romaji ? 'border-red-500 bg-red-100 text-red-700' : '',
                      isChecked && selectedAnswer !== opt && opt !== currentQuestion.target.romaji ? 'border-gray-200 opacity-50' : ''
                    ]">
              {{ opt }}
            </button>
          </div>
        </div>

        <div v-if="currentQuestion.type === 'match'" class="w-full">
          <p class="text-gray-500 mb-4 md:mb-6 italic text-center text-sm md:text-base">Drag kotak sebelah kiri ke dalam kotak kosong sebelah kanan untuk mencocokkan.</p>
          <div class="flex justify-between gap-3 md:gap-8">
            <div class="flex flex-col gap-3 md:gap-4 w-1/2">
              <div v-for="item in matchLeftItems" :key="item.id"
                   :draggable="!item.matched && !isChecked"
                   @dragstart="onDragStart($event, item)"
                   @touchstart="onTouchStart($event, item)"
                   @touchmove="onTouchMove"
                   @touchend="onTouchEnd"
                   :class="[
                     'p-3 md:p-4 rounded-xl border-2 text-center font-bold text-base md:text-xl uppercase transition-all select-none',
                     item.matched ? 'opacity-0 invisible' : 'border-gray-300 bg-white cursor-grab active:cursor-grabbing hover:bg-gray-50 text-gray-700 shadow-sm touch-none'
                   ]">
                {{ item.text }}
              </div>
            </div>

            <div class="flex flex-col gap-3 md:gap-4 w-1/2">
              <div v-for="item in matchRightItems" :key="item.id"
                   :data-id="item.id"
                   @dragover.prevent
                   @dragenter.prevent
                   @drop="onDrop($event, item)"
                   :class="[
                     'drop-zone p-3 md:p-4 rounded-xl border-2 flex items-center justify-between text-xl md:text-2xl font-bold font-jp transition-all min-h-[64px]',
                     item.matchedWith ? 'border-anime-primary bg-anime-primary/5 text-anime-dark' : 'border-dashed border-gray-300 bg-gray-50 text-gray-400'
                   ]">
                <span>{{ item.text }}</span>
                <span v-if="item.matchedWith" class="text-anime-primary text-base md:text-xl font-sans bg-white px-2 md:px-3 py-1 rounded-lg border border-anime-primary/20 shadow-sm truncate max-w-[60%] text-right">
                  {{ item.matchedWith.text }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div :class="[
        'fixed bottom-0 left-0 right-0 border-t-2 p-4 transition-colors duration-300 z-50',
        !isChecked ? 'bg-white border-gray-200' : isCorrect ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'
      ]">
        <div class="container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div class="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-center md:justify-start">
            <div v-if="isChecked && isCorrect" class="text-green-600 flex items-center gap-2 md:gap-3">
              <div class="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-xl md:text-2xl shadow-sm">✓</div>
              <div>
                <p class="font-black text-lg md:text-xl">Luar Biasa!</p>
              </div>
            </div>
            <div v-if="isChecked && !isCorrect" class="text-red-600 flex items-center gap-2 md:gap-3">
              <div class="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-xl md:text-2xl shadow-sm">✗</div>
              <div>
                <p class="font-black text-lg md:text-xl">Kurang Tepat.</p>
                <p v-if="currentQuestion.type === 'mcq'" class="text-xs md:text-sm font-medium opacity-80 mt-0.5 md:mt-1">Jawaban benar: {{ currentQuestion.target.romaji }}</p>
                <p v-else class="text-xs md:text-sm font-medium opacity-80 mt-0.5 md:mt-1">Periksa kembali cocokanmu.</p>
              </div>
            </div>
          </div>

          <button v-if="!isChecked" 
                  @click="checkAnswer"
                  :disabled="!canCheck"
                  :class="[
                    'w-full md:w-auto px-8 md:px-10 py-3 rounded-2xl font-bold text-lg transition-all shadow-sm',
                    canCheck ? 'bg-green-500 hover:bg-green-600 text-white hover:-translate-y-1 hover:shadow-md' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  ]">
            Periksa
          </button>
          <button v-else
                  @click="nextQuestion"
                  :class="[
                    'w-full md:w-auto px-8 md:px-10 py-3 rounded-2xl font-bold text-lg text-white transition-all hover:-translate-y-1 hover:shadow-md shadow-sm',
                    isCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                  ]">
            Lanjutkan
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="isFinished" class="flex-grow flex flex-col justify-center items-center p-4 z-10 relative">
      <div class="bg-white/90 backdrop-blur-md p-10 rounded-[3rem] shadow-2xl text-center max-w-lg w-full border-4 border-yellow-200">
        <div class="text-6xl mb-6 animate-bounce">🏆</div>
        <h1 class="text-4xl font-black text-yellow-500 mb-2">Pelajaran Selesai!</h1>
        <p class="text-gray-600 mb-8 text-lg font-medium">Kamu telah menyelesaikan sesi latihan ini dengan baik.</p>
        
        <div class="flex justify-center gap-8 mb-8">
          <div class="text-center">
            <p class="text-gray-400 text-sm font-bold uppercase mb-1">Skor</p>
            <p class="text-3xl font-black text-anime-dark">{{ Math.round((score / questions.length) * 100) }}%</p>
          </div>
          <div class="text-center">
            <p class="text-gray-400 text-sm font-bold uppercase mb-1">Benar</p>
            <p class="text-3xl font-black text-green-500">{{ score }}</p>
          </div>
        </div>

        <NuxtLink to="/courses" class="w-full block bg-anime-primary hover:bg-anime-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg transition-all text-xl hover:-translate-y-1">
          Selesai
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()
const profileId = useCookie('course_profile_id')

useHead({
  title: `CourseNime - Belajar ${route.params.id}`
})

const { data: course, pending, error } = await useFetch(`/api/classes/${route.params.id}`)

const quizStarted = ref(false)
const isFinished = ref(false)
const questions = ref([])
const currentIndex = ref(0)

const selectedAnswer = ref(null)
const isChecked = ref(false)
const isCorrect = ref(false)
const score = ref(0)

const matchLeftItems = ref([])
const matchRightItems = ref([])

const currentQuestion = computed(() => questions.value[currentIndex.value])
const progressPercentage = computed(() => (currentIndex.value / questions.value.length) * 100)

const canCheck = computed(() => {
  if (!currentQuestion.value) return false;
  if (currentQuestion.value.type === 'mcq') return selectedAnswer.value !== null;
  if (currentQuestion.value.type === 'match') {
    return matchRightItems.value.every(r => r.matchedWith !== null);
  }
  return false;
})


const shuffle = (array) => array.slice().sort(() => Math.random() - 0.5)

const generateQuestions = () => {
  const allData = course.value?.data || []
  if (allData.length === 0) return []
  
  const qs = []
  const pool = shuffle(allData)
  
  let i = 0;
  while (i < pool.length) {
    if (pool.length - i >= 3 && Math.random() > 0.4) {
      qs.push(createMatch(pool.slice(i, i + 3)))
      i += 3
    } else {
      qs.push(createMCQ(pool[i], allData))
      i += 1
    }
  }
  
  return qs
}

const createMCQ = (targetItem, allData) => {
  const distractors = shuffle(allData.filter(d => d.romaji !== targetItem.romaji)).slice(0, 3)
  const options = shuffle([targetItem.romaji, ...distractors.map(d => d.romaji)])
  return {
    type: 'mcq',
    prompt: 'Apa bacaan dari huruf ini?',
    target: targetItem,
    options
  }
}

const createMatch = (items) => {
  return {
    type: 'match',
    prompt: 'Cocokkan huruf Jepang dengan bacaan yang benar!',
    pairs: items 
  }
}

const startQuiz = () => {
  questions.value = generateQuestions()
  currentIndex.value = 0
  score.value = 0
  isFinished.value = false
  quizStarted.value = true
  setupQuestionState()
}

const setupQuestionState = () => {
  selectedAnswer.value = null
  isChecked.value = false
  isCorrect.value = false
  
  const q = currentQuestion.value
  if (q && q.type === 'match') {
    matchLeftItems.value = shuffle(q.pairs.map(p => ({ id: `L_${p.romaji}`, text: p.romaji, originalId: p.romaji, matched: false })))
    matchRightItems.value = shuffle(q.pairs.map(p => ({ id: `R_${p.romaji}`, text: p.char, originalId: p.romaji, matchedWith: null })))
  }
}

const quitQuiz = () => {
  if(confirm('Yakin ingin keluar? Progresmu akan hilang.')) {
    router.push('/courses')
  }
}

const selectOption = (opt) => {
  if (isChecked.value) return
  selectedAnswer.value = opt
}

const draggedItem = ref(null)

const onDragStart = (e, item) => {
  draggedItem.value = item
  e.dataTransfer.effectAllowed = 'move'
}

const touchState = ref({
  isDragging: false,
  item: null,
  startX: 0,
  startY: 0,
  cloneElement: null,
  originalElement: null
})

const onTouchStart = (e, item) => {
  if (item.matched || isChecked.value) return;
  
  const touch = e.touches[0];
  touchState.value = {
    isDragging: true,
    item: item,
    startX: touch.clientX,
    startY: touch.clientY,
    cloneElement: null,
    originalElement: e.currentTarget
  };
  
  const el = e.currentTarget;
  const clone = el.cloneNode(true);
  const rect = el.getBoundingClientRect();
  
  clone.style.position = 'fixed';
  clone.style.left = `${rect.left}px`;
  clone.style.top = `${rect.top}px`;
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;
  clone.style.zIndex = '9999';
  clone.style.opacity = '0.9';
  clone.style.pointerEvents = 'none';
  clone.style.margin = '0';
  clone.style.transform = 'scale(1.05)';
  clone.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
  clone.style.transition = 'none';
  
  document.body.appendChild(clone);
  touchState.value.cloneElement = clone;
  
  el.style.opacity = '0.4';
}

const onTouchMove = (e) => {
  if (!touchState.value.isDragging || !touchState.value.cloneElement) return;
  
  const touch = e.touches[0];
  const deltaX = touch.clientX - touchState.value.startX;
  const deltaY = touch.clientY - touchState.value.startY;
  
  touchState.value.cloneElement.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
}

const onTouchEnd = (e) => {
  if (!touchState.value.isDragging) return;
  
  const touch = e.changedTouches[0];
  const dropTargetEl = document.elementFromPoint(touch.clientX, touch.clientY);
  
  if (dropTargetEl) {
    const dropZone = dropTargetEl.closest('.drop-zone');
    if (dropZone) {
      const targetId = dropZone.getAttribute('data-id');
      const targetItem = matchRightItems.value.find(r => r.id === targetId);
      
      if (targetItem) {
        draggedItem.value = touchState.value.item;
        onDrop(null, targetItem);
      }
    }
  }
  
  if (touchState.value.cloneElement) {
    touchState.value.cloneElement.remove();
  }
  if (touchState.value.originalElement) {
    touchState.value.originalElement.style.opacity = '1';
  }
  
  touchState.value.isDragging = false;
  touchState.value.item = null;
}

const onDrop = (e, targetItem) => {
  if (!draggedItem.value) return
  
  if (targetItem.matchedWith) {
    const oldLeft = matchLeftItems.value.find(l => l.id === targetItem.matchedWith.id)
    if (oldLeft) oldLeft.matched = false
  }

  targetItem.matchedWith = draggedItem.value
  
  const leftItem = matchLeftItems.value.find(l => l.id === draggedItem.value.id)
  if (leftItem) leftItem.matched = true
  
  draggedItem.value = null
}

const checkAnswer = () => {
  if (!canCheck.value) return
  
  isChecked.value = true
  const q = currentQuestion.value
  
  if (q.type === 'mcq') {
    isCorrect.value = selectedAnswer.value === q.target.romaji
  } else if (q.type === 'match') {
    isCorrect.value = matchRightItems.value.every(r => r.matchedWith && r.originalId === r.matchedWith.originalId)
  }
  
  if (isCorrect.value) {
    score.value++
  }
}

const isSavingResult = ref(false)

const saveResultToSupabase = async () => {
  if (!profileId.value) return;
  
  isSavingResult.value = true;
  try {
    await supabase.from('quiz_results').insert([
      {
        profile_id: profileId.value,
        course_id: route.params.id,
        correct_answers: score.value,
        wrong_answers: questions.value.length - score.value,
        total_score: Math.round((score.value / questions.value.length) * 100)
      }
    ])
  } catch(e) {
    console.error('Failed to save quiz results:', e)
  } finally {
    isSavingResult.value = false;
  }
}

const nextQuestion = async () => {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++
    setupQuestionState()
  } else {
    isFinished.value = true
    await saveResultToSupabase()
  }
}

</script>
