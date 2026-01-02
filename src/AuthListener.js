import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, onSnapshot } from "firebase/firestore"
import { auth, db } from "./firebase"
import router from "./router"
import {
  getSessionId,
  isAdminActive,
  clearSession
} from "./utils/session"

let unsubscribeUser = null

export function initAuthListener() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      clearSession()
      router.replace("/")
      return
    }

    // 🔥 TAB INI BUKAN ADMIN → JANGAN IKUT CAMPUR
    if (!isAdminActive()) return

    const localSession = getSessionId()
    if (!localSession) return

    const ref = doc(db, "users", user.uid)

    unsubscribeUser?.()
    unsubscribeUser = onSnapshot(ref, (snap) => {
      const data = snap.data()
      if (!data?.sessionId) return

      // 🔴 SESSION ADMIN DIAMBIL TAB LAIN
      if (data.sessionId !== localSession) {
        clearSession()
        signOut(auth)
        router.replace("/")
        alert("Akun admin login di tab lain")
      }
    })
  })
}
