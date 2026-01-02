<template>
  <AppHeader v-if="showHeader" />
  <router-view />
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import AppHeader from "./components/AppHeader.vue"

const route = useRoute()

const showHeader = computed(() => route.path !== "/login")
</script>