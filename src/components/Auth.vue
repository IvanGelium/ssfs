<!-- <script setup lang="ts">
import { toast } from 'vue3-toastify'
import { ref } from 'vue'
defineProps<{
  isTime: boolean
}>()
const formData = ref(null)
async function sendLogin() {
  if (!formData.name || !formData.pass) {
    toast('Буквы напиши дурак.', {
      theme: 'auto',
      type: 'error',
      dangerouslyHTMLString: true,
    })
    return
  }
  const test = await fetch('/.netlify/functions/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      password: formData.pass,
    }),
  })
  const test2 = await test.json()
  console.log(test2)
  if (test2.sessionToken)
    toast('Вошел? Ну молодец, заходи.', {
      theme: 'auto',
      type: 'default',
      dangerouslyHTMLString: true,
    })
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
  <div class="wholeForm">
    <h2 @click="$emit('change', 'signup')" class="formHeader">Я уже смешарик >>></h2>
    <Vueform class="sss" v-model="formData">
      <TextElement :disabled="!isTime" name="name" label="Имя" placeholder="СусПроцСветлыйМинпо" />
      <TextElement :disabled="!isTime" name="pass" label="Пароль" placeholder="******" />
      <ButtonElement type="submit" @click="sendLogin(formData)" :disabled="!isTime" :name="'sbmBtn'">{{ isTime ? 'Посмотреть подопечного' : 'Ещё не время' }}</ButtonElement>
    </Vueform>
  </div>
</template>

<style>
.formHeader {
  text-align: center;
}

.wholeForm {
  padding: 2rem;
}
</style> -->


<script setup lang="ts">
import { ref } from 'vue'
import client from '../clients'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
const formData = ref(null)
async function sendLogin(formData) {
  if (!formData.name || !formData.pass) {
    toast('Буквы напиши дурак.', {
      theme: 'auto',
      type: 'error',
      dangerouslyHTMLString: true,
    })
    return
  }
  const test = await fetch('/.netlify/functions/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      password: formData.pass,
    }),
  })
  const test2 = await test.json()
  console.log(test2)
  if (test2.sessionToken)
    toast('Вошел? Ну молодец, заходи.', {
      theme: 'auto',
      type: 'default',
      dangerouslyHTMLString: true,
    })
  else {
    toast('Ты где-то нафакапил.', {
      theme: 'auto',
      type: 'error',
      dangerouslyHTMLString: true,
    })
  }
}
defineProps<{
  isTime: boolean
}>()

const emit = defineEmits<{
  (e: 'change', viewState: 'signup' | 'login'): void
}>()
</script>

<template>
  <div class="wholeForm">
    <h2 @click="$emit('change', 'signup')" style="margin-bottom: 1rem" class="formHeader">
      Я уже смешарик >>>
    </h2>
    <Vueform class="sss" v-model="formData">
      <TextElement :disabled="!isTime" name="name" label="Имя" placeholder="СусПроцСветлыйМинпо" />
      <TextElement :disabled="!isTime" name="pass" label="Пароль" placeholder="******" />
      <ButtonElement type="submit" @click="sendLogin(formData)" :disabled="!isTime" :name="'sbmBtn'">{{ isTime ? 'Посмотреть подопечного' : 'Ещё не время' }}</ButtonElement>
    </Vueform>
  </div>
</template>

<style>
.formHeader {
  text-align: center;
  min-width: 30vw;
  border-radius: 0.5rem;
  border: 1px solid darkblue;
  background-color: var(--vt-c-black-mute);
  padding: 1rem;
}
.formHeader:hover {
  background-color: #aaa;
  color: black;
}

.wholeForm {
  padding: 2rem;
}

.buttonForSure {
  /* border: 2px solid #111;  */
}
</style>
