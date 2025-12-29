<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div id="app">
    <Navbar />
    <RouterView />
    <Footer />
  </div>
</template>

<style>
[v-cloak] {
  display: none;
}

#app {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}
</style>
