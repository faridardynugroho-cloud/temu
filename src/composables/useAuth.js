// src/composables/useAuth.js
import { ref, onMounted } from "vue"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"

const user = ref(null)

export function useAuth() {
  onMounted(() => {
    onAuthStateChanged(auth, (u) => {
      user.value = u
    })
  })

  return { user }
}
