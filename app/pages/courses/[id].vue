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

    <!-- MENU MODE -->
    <div v-else-if="viewMode === 'menu'" class="flex-grow flex flex-col items-center p-4 py-10 z-10 relative">
      <div class="absolute top-10 right-10 text-9xl text-anime-primary/5 font-jp rotate-12">学</div>
      
      <div class="max-w-4xl w-full z-10">
        <div class="flex items-center gap-4 mb-10">
          <NuxtLink to="/courses" class="bg-white p-3 rounded-xl shadow-sm text-gray-500 hover:text-anime-primary hover:shadow-md transition-all font-bold">
            ← Kembali
          </NuxtLink>
          <h1 class="text-4xl font-black text-anime-dark">{{ course.title }}</h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div v-for="(stage, idx) in course.stages" :key="stage.id" 
               @click="isStageUnlocked(idx) ? openMaterial(stage) : null"
               :class="[
                 'p-8 rounded-3xl border-4 transition-all flex flex-col',
                 isStageUnlocked(idx) 
                   ? 'bg-white border-transparent shadow-xl hover:-translate-y-1 hover:border-anime-primary cursor-pointer' 
                   : 'bg-gray-100 border-gray-200 opacity-70 cursor-not-allowed'
               ]">
            <div class="flex justify-between items-start mb-4">
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold"
                   :class="isStageUnlocked(idx) ? 'bg-anime-primary/20 text-anime-primary' : 'bg-gray-300 text-gray-500'">
                {{ idx + 1 }}
              </div>
              <div v-if="!isStageUnlocked(idx)" class="text-gray-400 text-2xl">🔒</div>
              <div v-else-if="isStagePassed(stage.id)" class="text-green-500 text-2xl">⭐</div>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ stage.title }}</h2>
            <p class="text-gray-500 mb-4">{{ stage.material.length }} Karakter / Kosakata</p>
            <div class="mt-auto pt-4 border-t border-gray-100 font-bold"
                 :class="isStageUnlocked(idx) ? 'text-anime-primary' : 'text-gray-400'">
              {{ isStageUnlocked(idx) ? 'Mulai Belajar →' : 'Terkunci' }}
            </div>
          </div>
        </div>

        <!-- EXAM SECTION -->
        <div @click="isExamUnlocked ? openExam() : null"
             :class="[
               'w-full p-8 rounded-3xl border-4 text-center transition-all flex flex-col items-center justify-center',
               isExamUnlocked 
                 ? 'bg-gradient-to-r from-anime-secondary to-anime-primary border-transparent text-white shadow-2xl hover:scale-[1.02] cursor-pointer' 
                 : 'bg-gray-100 border-gray-200 opacity-70 cursor-not-allowed'
             ]">
          <div class="text-5xl mb-4" :class="isExamUnlocked ? '' : 'grayscale'">👑</div>
          <h2 class="text-3xl font-black mb-2" :class="isExamUnlocked ? 'text-white' : 'text-gray-600'">Final Exam</h2>
          <p :class="isExamUnlocked ? 'text-white/80' : 'text-gray-500 font-medium'">
            {{ isExamUnlocked ? 'Buktikan kemampuanmu!' : 'Selesaikan semua stage untuk membuka Exam.' }}
          </p>
          <div v-if="isExamPassed" class="mt-4 bg-white text-anime-primary px-4 py-1 rounded-full font-bold shadow-sm">
            Telah Lulus ⭐
          </div>
        </div>
      </div>
    </div>

    <!-- MATERIAL MODE -->
    <div v-else-if="viewMode === 'material'" class="flex-grow flex flex-col items-center p-4 py-10 z-10 relative">
      <div class="max-w-5xl w-full">
        <div class="flex items-center justify-between mb-10">
          <button @click="backToMenu" class="bg-white p-3 rounded-xl shadow-sm text-gray-500 hover:text-anime-primary hover:shadow-md transition-all font-bold">
            ← Menu
          </button>
          <h1 class="text-3xl font-black text-anime-dark">{{ currentStage.title }}</h1>
        </div>

        <p class="text-gray-600 text-lg mb-8 text-center max-w-2xl mx-auto">
          Pelajari karakter dan kosakata berikut ini. Ingat-ingat bentuk dan cara bacanya sebelum kamu memulai kuis!
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
          <div v-for="(item, idx) in currentStage.material" :key="idx" 
               class="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border-2 border-transparent hover:border-anime-primary text-center group">
            <div class="text-5xl md:text-6xl font-jp text-anime-dark mb-4 transform group-hover:scale-110 transition-transform">
              {{ item.char }}
            </div>
            <div class="text-xl font-bold text-anime-primary uppercase tracking-widest">{{ item.romaji }}</div>
            <div v-if="item.meaning" class="text-sm font-medium text-gray-500 mt-2 bg-gray-50 py-1 px-2 rounded-lg truncate">
              {{ item.meaning }}
            </div>
          </div>
        </div>

        <div class="flex justify-center pb-20">
          <button @click="startQuiz" class="bg-anime-primary hover:bg-anime-primary/90 text-white font-bold py-4 px-12 rounded-full shadow-xl hover:-translate-y-2 transition-all text-xl flex items-center gap-3">
            <span>Mulai Test</span>
            <span class="text-2xl">🎮</span>
          </button>
        </div>
      </div>
    </div>

    <!-- QUIZ / EXAM MODE -->
    <div v-else-if="(viewMode === 'quiz' || viewMode === 'exam') && currentQuestion" class="flex-grow flex flex-col z-10 bg-white">
      
      <div class="container mx-auto px-4 py-6 flex items-center gap-4">
        <button @click="backToMenu" class="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors">✕</button>
        <div class="flex-grow bg-gray-200 h-4 rounded-full overflow-hidden">
          <div class="bg-green-500 h-full transition-all duration-500 ease-out" :style="{ width: `${progressPercentage}%` }"></div>
        </div>
      </div>

      <div class="flex-grow container mx-auto px-4 max-w-3xl flex flex-col justify-center pb-32">
        <h2 class="text-2xl font-bold text-gray-800 mb-8 font-jp text-center">{{ currentQuestion.prompt }}</h2>

        <!-- MCQ QUESTION -->
        <div v-if="currentQuestion.type === 'mcq'" class="flex flex-col items-center">
          <div class="text-7xl md:text-9xl font-black text-anime-dark mb-8 md:mb-12 font-jp">{{ currentQuestion.target.char }}</div>
          
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

        <!-- MATCH QUESTION -->
        <div v-if="currentQuestion.type === 'match'" class="w-full">
          <p class="text-gray-500 mb-4 md:mb-6 italic text-center text-sm md:text-base">Drag kotak sebelah kiri ke dalam kotak kosong sebelah kanan untuk mencocokkan.</p>
          <div class="flex justify-between gap-3 md:gap-8">
            <!-- Left Items (Draggable) -->
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

            <!-- Right Items (Drop Zones) -->
            <div class="flex flex-col gap-3 md:gap-4 w-1/2">
              <div v-for="item in matchRightItems" :key="item.id"
                   :data-id="item.id"
                   @dragover.prevent
                   @dragenter.prevent
                   @drop="onDrop($event, item)"
                   :class="[
                     'drop-zone p-3 md:p-4 rounded-xl border-2 flex items-center justify-between text-xl md:text-2xl font-bold font-jp transition-all min-h-[64px] shadow-inner',
                     item.matchedWith ? 'border-anime-primary bg-anime-primary/5 text-anime-dark' : 'border-dashed border-gray-300 bg-gray-50 text-gray-400'
                   ]">
                <span class="w-1/2">{{ item.text }}</span>
                <span v-if="item.matchedWith" 
                      @click="removeItem(item)"
                      class="text-anime-primary text-base md:text-xl font-sans bg-white px-2 md:px-3 py-1 rounded-lg border border-anime-primary/20 shadow-sm truncate max-w-[60%] text-right cursor-pointer hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors flex items-center justify-between gap-1 group">
                  <span class="truncate">{{ item.matchedWith.text }}</span>
                  <span class="text-xs opacity-50 group-hover:opacity-100 group-hover:text-red-500 ml-1">✕</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- BOTTOM ACTION BAR -->
      <div :class="[
        'fixed bottom-0 left-0 right-0 border-t-2 p-4 transition-colors duration-300 z-50',
        !isChecked ? 'bg-white border-gray-200' : isCorrect ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'
      ]">
        <div class="container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div class="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-center md:justify-start">
            <div v-if="isChecked && isCorrect" class="text-green-600 flex items-center gap-2 md:gap-3">
              <div class="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-xl md:text-2xl shadow-sm font-bold">✓</div>
              <div>
                <p class="font-black text-lg md:text-xl">Luar Biasa!</p>
              </div>
            </div>
            <div v-if="isChecked && !isCorrect" class="text-red-600 flex items-center gap-2 md:gap-3">
              <div class="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-xl md:text-2xl shadow-sm font-bold">✗</div>
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

    <!-- FINISHED MODE -->
    <div v-else-if="viewMode === 'finished'" class="flex-grow flex flex-col justify-center items-center p-4 z-10 relative">
      <div class="bg-white/90 backdrop-blur-md p-10 rounded-[3rem] shadow-2xl text-center max-w-lg w-full border-4 border-yellow-200">
        <div class="text-6xl mb-6 animate-bounce">🏆</div>
        <h1 class="text-4xl font-black text-yellow-500 mb-2">Pelajaran Selesai!</h1>
        <p class="text-gray-600 mb-8 text-lg font-medium">Kamu telah menyelesaikan sesi ini dengan baik.</p>
        
        <div class="flex justify-center gap-8 mb-8">
          <div class="text-center">
            <p class="text-gray-400 text-sm font-bold uppercase mb-1">Skor</p>
            <p class="text-4xl font-black" :class="scorePercentage >= 60 ? 'text-green-500' : 'text-red-500'">{{ scorePercentage }}%</p>
          </div>
          <div class="text-center">
            <p class="text-gray-400 text-sm font-bold uppercase mb-1">Benar</p>
            <p class="text-4xl font-black text-anime-dark">{{ score }} / {{ questions.length }}</p>
          </div>
        </div>

        <p v-if="scorePercentage < 60" class="text-red-500 mb-6 font-bold">Skor minimal untuk lulus adalah 60%. Coba lagi ya!</p>
        <p v-else class="text-green-500 mb-6 font-bold">Selamat! Kamu lulus tahapan ini.</p>

        <button @click="backToMenu" class="w-full bg-anime-primary hover:bg-anime-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg transition-all text-xl hover:-translate-y-1">
          Kembali ke Menu
        </button>
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

// Fetch Course Data
const { data: course, pending, error } = await useFetch(`/api/classes/${route.params.id}`)

// Local Stage Progress (Untuk membuka kunci stage tanpa membebani Supabase)
const localStageProgress = useCookie(`stage_progress_${route.params.id}`, { default: () => [] })

// Fetch Progress from Supabase (HANYA UNTUK EXAM)
const { data: results, refresh: refreshProgress } = await useAsyncData(`progress-${route.params.id}`, async () => {
  if (!profileId.value) return []
  const { data, error } = await supabase.from('quiz_results')
    .select('course_id, total_score')
    .eq('profile_id', profileId.value)
    .eq('course_id', `${route.params.id}_exam`)
  
  if (error) {
    console.error('Failed to fetch progress', error)
    return []
  }
  return data || []
})

// Modes: 'menu' | 'material' | 'quiz' | 'exam' | 'finished'
const viewMode = ref('menu')
const currentStage = ref(null)

// Check Progress Logic
const isStagePassed = (stageId) => {
  return localStageProgress.value.includes(stageId)
}

const isStageUnlocked = (index) => {
  if (index === 0) return true; // First stage always open
  const prevStageId = course.value?.stages[index - 1].id
  return isStagePassed(prevStageId)
}

const isExamUnlocked = computed(() => {
  if (!course.value?.stages) return false;
  return course.value.stages.every(s => isStagePassed(s.id))
})

const isExamPassed = computed(() => {
  const cId = `${route.params.id}_exam`
  const bestResult = results.value?.filter(r => r.course_id === cId).sort((a,b) => b.total_score - a.total_score)[0]
  return bestResult && bestResult.total_score >= 60
})

// Navigation
const openMaterial = (stage) => {
  currentStage.value = stage
  viewMode.value = 'material'
}

const openExam = () => {
  currentStage.value = null
  viewMode.value = 'exam'
  questions.value = generateQuestions(course.value.stages.flatMap(s => s.material))
  startQuizProcess()
}

const startQuiz = () => {
  viewMode.value = 'quiz'
  questions.value = generateQuestions(currentStage.value.material)
  startQuizProcess()
}

const backToMenu = async () => {
  await refreshProgress()
  viewMode.value = 'menu'
  currentStage.value = null
}

// Quiz State
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
const scorePercentage = computed(() => Math.round((score.value / questions.value.length) * 100))

const canCheck = computed(() => {
  if (!currentQuestion.value) return false;
  if (currentQuestion.value.type === 'mcq') return selectedAnswer.value !== null;
  if (currentQuestion.value.type === 'match') {
    return matchRightItems.value.every(r => r.matchedWith !== null);
  }
  return false;
})

const shuffle = (array) => array.slice().sort(() => Math.random() - 0.5)

const generateQuestions = (materialData) => {
  if (!materialData || materialData.length === 0) return []
  const qs = []
  const pool = shuffle(materialData)
  
  // Create more questions by repeating pool if it's too small (e.g. less than 10)
  let workingPool = [...pool]
  if(workingPool.length < 10) {
      workingPool = [...workingPool, ...shuffle(pool)]
  }

  let i = 0;
  while (i < workingPool.length) {
    if (workingPool.length - i >= 3 && Math.random() > 0.4) {
      qs.push(createMatch(workingPool.slice(i, i + 3)))
      i += 3
    } else {
      qs.push(createMCQ(workingPool[i], materialData))
      i += 1
    }
  }
  
  return qs.slice(0, 10) // Limit to 10 questions per quiz
}

const createMCQ = (targetItem, allData) => {
  const distractors = shuffle(allData.filter(d => d.romaji !== targetItem.romaji)).slice(0, 3)
  const options = shuffle([targetItem.romaji, ...distractors.map(d => d.romaji)])
  return {
    type: 'mcq',
    prompt: targetItem.meaning ? 'Apa bacaan/arti dari kata ini?' : 'Apa bacaan dari huruf ini?',
    target: targetItem,
    options
  }
}

const createMatch = (items) => {
  return {
    type: 'match',
    prompt: 'Cocokkan karakter Jepang dengan bacaan yang benar!',
    pairs: items 
  }
}

const startQuizProcess = () => {
  currentIndex.value = 0
  score.value = 0
  setupQuestionState()
}

const setupQuestionState = () => {
  selectedAnswer.value = null
  isChecked.value = false
  isCorrect.value = false
  
  const q = currentQuestion.value
  if (q && q.type === 'match') {
    matchLeftItems.value = shuffle(q.pairs.map(p => ({ id: `L_${p.romaji}_${Math.random()}`, text: p.romaji, originalId: p.romaji, matched: false })))
    matchRightItems.value = shuffle(q.pairs.map(p => ({ id: `R_${p.romaji}_${Math.random()}`, text: p.char, originalId: p.romaji, matchedWith: null })))
  }
}

const selectOption = (opt) => {
  if (isChecked.value) return
  selectedAnswer.value = opt
}

// Drag and Drop Logic
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
  
  if (touchState.value.cloneElement) touchState.value.cloneElement.remove();
  if (touchState.value.originalElement) touchState.value.originalElement.style.opacity = '1';
  
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

const removeItem = (targetItem) => {
  if (isChecked.value) return;
  if (targetItem.matchedWith) {
    const leftItem = matchLeftItems.value.find(l => l.id === targetItem.matchedWith.id)
    if (leftItem) leftItem.matched = false
    targetItem.matchedWith = null
  }
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
  if (isCorrect.value) score.value++
}

const isSavingResult = ref(false)
const saveResultToSupabase = async () => {
  // Jika ini tes per Stage, simpan skor secara lokal (cookies) saja
  if (viewMode.value !== 'exam') {
    if (scorePercentage.value >= 60 && currentStage.value) {
      if (!localStageProgress.value.includes(currentStage.value.id)) {
        localStageProgress.value = [...localStageProgress.value, currentStage.value.id]
      }
    }
    return;
  }

  // Jika ini Final Exam, simpan skor ke Supabase
  if (!profileId.value) return;
  isSavingResult.value = true;
  
  const cId = `${route.params.id}_exam`
  
  try {
    await supabase.from('quiz_results').insert([
      {
        profile_id: profileId.value,
        course_id: cId,
        correct_answers: score.value,
        wrong_answers: questions.value.length - score.value,
        total_score: scorePercentage.value
      }
    ])
  } catch(e) {
    console.error('Failed to save exam results:', e)
  } finally {
    isSavingResult.value = false;
  }
}

const nextQuestion = async () => {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++
    setupQuestionState()
  } else {
    await saveResultToSupabase()
    viewMode.value = 'finished'
  }
}

</script>
