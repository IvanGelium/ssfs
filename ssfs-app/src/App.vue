<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import TopHeader from './components/Header.vue'
import SignUp from './components/SignUp.vue'
import Auth from './components/Auth.vue'
import { computed } from 'vue'
const backgroundUrl = new URL('./assets/img/bg-text.jpg', import.meta.url).href
const backgroundStyle = computed(() => ({
  backgroundImage: `url(${backgroundUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
}))
const isTime = false
const viewState = ref('signup')

const currentUser = ref(null)
</script>

<template>
  <div class="bg-root" :style="backgroundStyle">
    <div class="contentCenter">
      <TopHeader></TopHeader>
      <div class="formsContainer">
        <div v-if="viewState ==='signup'">
          <SignUp></SignUp>
        </div>
        <div v-if="viewState ==='auth'">
          <Auth :is-time="isTime"></Auth>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
<style>
.bg-root {
  display: flex;
  justify-content: center;
  min-width: 400px
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
