<script setup lang="ts">
defineProps<{
  isTime:boolean
}>()
async function sendLogin(formData:any) {
const test = await fetch('/.netlify/functions/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: formData.name,
    password: formData.pass,
  })
})
const test2 = await test.json()
console.log(test2)
if (test2.message === 'Регистрация успешна')
toast("Зарегистрировался? Теперь пиздуй отсюда.", {
  "theme": "auto",
  "type": "default",
  "dangerouslyHTMLString": true
})
else {
  toast("Ты где-то нафакапил.", {
  "theme": "auto",
  "type": "error",
  "dangerouslyHTMLString": true
})
}

}
</script>

<template>
  <div class="wholeForm">
    <h2 @click="$emit('change','signup')" class="formHeader">Я уже смешарик >>></h2>
    <Vueform>
      <TextElement :disabled="!isTime" name="name" label="Имя" placeholder="СусПроцСветлыйМинпо" />
      <TextElement :disabled="!isTime" name="pass" label="Пароль" placeholder="******" />
      <ButtonElement @click="sendLogin(formData)"  :disabled="!isTime" :name="'sbmBtn'">{{isTime? 'Посмотреть подопечного' : 'Ещё не время'}}</ButtonElement>
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
