<template>
  <div class="min-h-screen bg-anime-light relative overflow-hidden flex flex-col justify-center items-center p-4">
    <div class="absolute top-10 left-10 text-9xl text-anime-primary/10 font-jp -rotate-12 animate-pulse pointer-events-none">学</div>
    <div class="absolute bottom-10 right-10 text-9xl text-anime-secondary/10 font-jp rotate-12 animate-bounce pointer-events-none">習</div>

    <div class="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-[3rem] shadow-2xl w-full max-w-lg border-4 border-white relative z-10">
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-anime-primary/20 text-anime-primary rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
          👋
        </div>
        <h1 class="text-3xl font-black text-anime-dark mb-2">Isi Profil Dulu Yuk!</h1>
        <p class="text-gray-600">Biar ketahuan nilaimu nanti masuk ke mana.</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Nama Panggilan</label>
          <input v-model="form.name" type="text" required
                 class="w-full px-5 py-4 bg-gray-50 rounded-2xl border-2 border-gray-200 focus:bg-white focus:ring-0 focus:border-anime-primary transition-all outline-none font-medium text-lg"
                 placeholder="Misal: Budi" />
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Asal (Kota/Sekolah)</label>
          <input v-model="form.origin" type="text" required
                 class="w-full px-5 py-4 bg-gray-50 rounded-2xl border-2 border-gray-200 focus:bg-white focus:ring-0 focus:border-anime-primary transition-all outline-none font-medium text-lg"
                 placeholder="Misal: SMA 1 Jakarta" />
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Foto Profil (Wajib)</label>
          <input type="file" required accept="image/*" @change="handleFileChange"
                 class="w-full px-5 py-3 bg-gray-50 rounded-2xl border-2 border-gray-200 focus:bg-white focus:ring-0 focus:border-anime-primary transition-all outline-none font-medium text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-anime-primary/10 file:text-anime-primary hover:file:bg-anime-primary/20" />
        </div>

        <button type="submit" :disabled="isLoading"
                class="w-full bg-anime-primary hover:bg-anime-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 text-xl flex justify-center items-center mt-8">
          <span v-if="!isLoading">Mulai Belajar!</span>
          <span v-else class="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full"></span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

useHead({
  title: 'CourseNime - Daftar Profil'
})

const router = useRouter()
const supabase = useSupabaseClient()

const form = ref({
  name: '',
  origin: ''
})
const photoFile = ref(null)
const isLoading = ref(false)

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    photoFile.value = file
  } else {
    photoFile.value = null
  }
}

const handleRegister = async () => {
  if (!photoFile.value) {
    alert('Foto profil wajib diunggah untuk melanjutkan!');
    return;
  }

  isLoading.value = true;
  
  try {
    let finalPhotoUrl = null;

    if (photoFile.value) {
      const fileExt = photoFile.value.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      
      // Upload file ke bucket 'avatars'
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, photoFile.value);

      if (uploadError) throw uploadError;

      // Ambil Public URL dari file yang baru diupload
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
        
      finalPhotoUrl = data.publicUrl;
    }

    const { data: profileData, error } = await supabase
      .from('profiles')
      .insert([
        { 
          name: form.value.name, 
          origin: form.value.origin, 
          photo_url: finalPhotoUrl 
        }
      ])
      .select()
      .single()

    if (error) throw error

    // Save profile ID to local storage or cookies so we remember them
    const profileCookie = useCookie('course_profile_id', { maxAge: 60 * 60 * 24 * 30 }) // 30 days
    profileCookie.value = profileData.id

    router.push('/courses');
  } catch (err) {
    console.error('Error saving profile:', err)
    alert('Gagal menyimpan profil. Pastikan koneksi Supabase benar dan Bucket "avatars" sudah ada + publik.')
  } finally {
    isLoading.value = false;
  }
}
</script>
