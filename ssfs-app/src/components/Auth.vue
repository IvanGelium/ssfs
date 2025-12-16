<script setup lang="ts">
defineProps<{
  isTime:boolean
}>()
</script>

<template>
  <div class="wholeForm">
    <h2 class="formHeader">Я уже смешарик</h2>
    <Vueform>
      <TextElement :disabled="!isTime" name="name" label="Имя" placeholder="СусПроцСветлыйМинпо" />
      <TextElement :disabled="!isTime" name="pass" label="Пароль" placeholder="******" />
      <ButtonElement :disabled="!isTime" :name="'sbmBtn'">{{isTime? 'Посмотреть подопечного' : 'Ещё не время'}}</ButtonElement>
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
