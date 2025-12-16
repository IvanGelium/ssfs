<script setup lang="ts">
import { ref, } from 'vue';
import client from '../clients' 
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const formData = ref(null)
async function sendSignUp(formData:any) {
const test = await fetch('/.netlify/functions/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: formData.name,
    password: formData.pass,
    description: formData.desc
  })
})
console.log(test)
if (test.message === 'Регистрация успешна')
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

const emit = defineEmits<{
  (e: 'change', viewState:'signup'|'login'): void
}>()


</script>

<template>
  <div class="wholeForm">
    <h2 @click="$emit('change','login')" style="margin-bottom: 1rem;" class="formHeader">Я новенький >>></h2>
    <Vueform class="sss"  v-model="formData">
        <TextElement  name="name" label="Имя" placeholder="СусПроцСветлыйМинпо" />
        <TextElement  name="pass" label="Пароль" placeholder="******" />
        <TextareaElement  name="desc" label="Письмо Деду Морозу" placeholder="Я хорошо себя вел..." />
        <ButtonElement type="submit" @click="sendSignUp(formData)" :name="'sbmBtn'">Отправить</ButtonElement>
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
  color: black
}

.wholeForm {
  padding: 2rem;
}

.buttonForSure { 
  /* border: 2px solid #111;  */
}

</style>
