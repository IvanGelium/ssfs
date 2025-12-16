<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import TopHeader from './components/Header.vue'
import SignUp from './components/SignUp.vue'
import Auth from './components/Auth.vue'
import { onMounted, ref, computed } from 'vue'
let audio = null
const isPlaying = ref(false)

onMounted(() => {
  // 1. Создаем Audio элемент ПРАВИЛЬНО
  audio = new Audio()

  // 2. Устанавливаем источник
  audio.src = '/music/output.ogg'

  // 3. Настройки
  audio.volume = 0.2
  audio.loop = true
  audio.preload = 'auto'

  // 4. События для отладки
  audio.addEventListener('loadeddata', () => {
    console.log('✅ Аудио загружено, готово к воспроизведению')
  })

  audio.addEventListener('error', (e) => {
    console.error('❌ Ошибка аудио:', e.target.error)
  })

  audio.addEventListener('canplaythrough', () => {
    console.log('✅ Аудио полностью загружено')
  })

  // 5. Пытаемся автозапустить
  audio
    .play()
    .then(() => {
      console.log('✅ Автозапуск успешен')
      isPlaying.value = true
    })
    .catch((error) => {
      console.log('⚠️ Автозапуск заблокирован. Кликните по странице.')

      // Автозапуск при первом клике
      const startOnClick = () => {
        audio.play().then(() => {
          isPlaying.value = true
          console.log('✅ Музыка запущена после клика')
        })
        document.removeEventListener('click', startOnClick)
      }

      document.addEventListener('click', startOnClick)
    })
})

const toggleMusic = () => {
  if (!audio) return

  if (isPlaying.value) {
    audio.pause()
    isPlaying.value = false
    console.log('⏸️ Музыка остановлена')
  } else {
    audio
      .play()
      .then(() => {
        isPlaying.value = true
        console.log('▶️ Музыка запущена')
      })
      .catch((error) => {
        console.error('❌ Ошибка запуска:', error)
      })
  }
}

const backgroundUrl = new URL('./assets/img/bg-text.jpg', import.meta.url).href
const backgroundStyle = computed(() => ({
  backgroundImage: `url(${backgroundUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
}))
const isTime = true
const viewState = ref('signup')

const currentUser = ref(null)
function toggleView(status) {
  viewState.value = status
}
</script>

<template>
  <div class="bg-root" :style="backgroundStyle">
    <div class="contentCenter">
      <TopHeader></TopHeader>
      <div class="formsContainer">
        <div v-if="viewState === 'signup'">
          <SignUp @change="(status) => toggleView(status)"></SignUp>
        </div>
        <div v-if="viewState === 'login'">
          <Auth @change="(status) => toggleView(status)" :is-time="isTime"></Auth>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.bg-root {
  display: flex;
  justify-content: center;
  min-width: 400px;
}

.contentCenter {
  min-width: 80vw;
  background-color: var(--vt-c-black);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 0 2em var(--vt-c-black-mute);
}
.formsContainer {
  /* border: 1px solid red; */
}
</style>
