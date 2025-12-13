<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
	<div id="app">
		<Navbar />
		<RouterView />
	</div>
</template>

<style scoped>
#app { min-height: 100vh; display: flex; flex-direction: column; }
RouterView { flex: 1; }
</style>
