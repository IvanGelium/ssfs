<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { ref } from 'vue'
defineProps<{
  isTime: boolean
}>()
const formData = ref(null)
async function sendLogin(formData: any) {
  if (!formData.namee || !formData.passs) {
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
      name: formData.namee,
      password: formData.passs,
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
    <Vueform>
      <TextElement :disabled="!isTime" name="namee" label="Имя" placeholder="СусПроцСветлыйМинпо" />
      <TextElement :disabled="!isTime" name="passs" label="Пароль" placeholder="******" />
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
</style>
