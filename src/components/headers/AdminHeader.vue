<template>
  <header class="admin-header">
    <h3>Admin Panel</h3>

    <button @click="logout">Logout</button>
  </header>
</template>

<script setup>
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"
import { useRouter } from "vue-router"

const router = useRouter()

const logout = async () => {
  await signOut(auth)
  router.push("/")
}
</script>

<style scoped>
.admin-header {
  height: 60px;
  background: #0f172a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
button {
  background: #ef4444;
  border: none;
  padding: 6px 12px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
</style>
