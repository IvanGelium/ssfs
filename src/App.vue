<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import TopHeader from './components/Header.vue'
import SignUp from './components/SignUp.vue'
import Auth from './components/Auth.vue'
import { onMounted, ref, computed } from 'vue'
let audio = null
const isPlaying = ref(false)
const sessionToken = ref<string|null>(null)
onMounted(() => {
  // sessionToken.value = localStorage.getItem('santa_session');
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
// const currentUser = ref({
//   userName: 'test',
//   userId: '1',
//   hasAssignment: false,
//   ward:null
// })
const currentUser = ref(null)


const backgroundUrl = new URL('./assets/img/bg-text.jpg', import.meta.url).href
const backgroundStyle = computed(() => ({
  backgroundImage: `url(${backgroundUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
}))
const isTime = true
const viewState = ref('signup')
function toggleView(status) {
  viewState.value = status
}

function updateCurrentUser(data) {
  console.log('data',data)
  currentUser.value = data
  console.log('currentUser',currentUser.value)
}

async function getWard(token) {
   const test = await fetch('/.netlify/functions/getWard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sessionToken:token
    }),
  })
  const data = await test.json()
  console.log('fetch-data',data)
  if (data.sessionToken) { 
    emit('auth',data)
  toast('Вошел? Ну молодец, заходи.', {
    theme: 'auto',
    type: 'default',
    dangerouslyHTMLString: true,
  })
}
  else {
    toast('Ты где-то нафакапил.', {
      theme: 'auto',
      type: 'error',
      dangerouslyHTMLString: true,
    })
  }
} 

</script>

<template>
  <div class="bg-root" :style="backgroundStyle">
    <div class="contentCenter">
      <TopHeader></TopHeader>
      <div v-if="!currentUser" class="formsContainer">
        <div v-if="viewState === 'signup'">
          <SignUp @change="(status) => toggleView(status)"></SignUp>
        </div>
        <div v-if="viewState === 'login'">
          <Auth
          @auth="(data) => {
  updateCurrentUser(data)
            console.log('hit')
          }"  @change="(status) => toggleView(status)" :is-time="isTime"></Auth>
        </div>
      </div>
      <div v-else class="authCont">
        <h2>Санта: {{ currentUser.userName }}</h2>
        <h2>Подопченый: {{ currentUser.ward? 'Есть':'Нет' }}</h2>
        <button @click="getWard(currentUser.sessionToken)"  class="getWardButton" >{{ currentUser.ward? 'Я забыл кто мой подопечный':'Получить подопечного' }}</button>
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

.authCont {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap:0.5rem
}

.getWardButton{
  margin-top: 1rem;
  font-weight: bolder;
  color: white;
  font-size: 1rem;
  padding: 1rem;
  background-color: green;
  border-radius: 0.5rem;
}
</style>
