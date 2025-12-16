<script setup lang="ts">
import { ref } from 'vue';
import client from '../clients' 
const formData = ref(null)
async function sendSignUp(formData:any) {
  // console.log(formData)
  // const response =await client.register(formData.name, formData.pass)
  // console.log(response)
const test = await fetch('/.netlify/functions/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
})
console.log(test)
}

</script>

<template>
  <div class="wholeForm">
    <h2 style="margin-bottom: 1rem;" class="formHeader">Я новенький</h2>
    <Vueform  v-model="formData">
        <TextElement  name="name" label="Имя" placeholder="СусПроцСветлыйМинпо" />
        <TextElement  name="pass" label="Пароль" placeholder="******" />
        <ButtonElement type="submit" @click="sendSignUp(formData)" :name="'sbmBtn'">Отправить</ButtonElement>
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
