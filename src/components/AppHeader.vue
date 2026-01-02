<template>
  <component :is="currentHeader" />
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useAuth } from "../composables/useAuth"
import PublicHeader from "./headers/PublicHeader.vue"

const route = useRoute()
const { user } = useAuth()

const currentHeader = computed(() => {
  // 🔐 Admin & sudah login
  if ( !route.path.startsWith("/admin")) {
    return PublicHeader
  }
  // 🌐 Publik
  return 
})
</script>
