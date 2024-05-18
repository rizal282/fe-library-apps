<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <MahasiswaUi /> -->
  <NavbarUi />
  <router-view />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import MahasiswaUi from './components/MahasiswaUi.vue'
import NavbarUi from './components/NavbarUi.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    // MahasiswaUi
    NavbarUi,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
