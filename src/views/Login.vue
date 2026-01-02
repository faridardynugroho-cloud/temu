<template>
  <div class="page-wrapper">
    <div class="container">
      <!-- Login Card -->
      <div class="login-card">
        <!-- Card Header -->
        <div class="login-header">
          <div class="header-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div class="header-content">
            <h2 class="login-title">Login Admin</h2>
            <p class="login-subtitle">Masuk ke dashboard admin</p>
          </div>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="login" class="login-content">
          <!-- Email -->
          <div class="form-group">
            <label class="form-label">
              <svg class="label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Email
              <span class="required">*</span>
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="admin@example.com"
              required
              class="form-input"
            />
          </div>

          <!-- Password -->
          <div class="form-group">
            <label class="form-label">
              <svg class="label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Password
              <span class="required">*</span>
            </label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
              class="form-input"
            />
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn-login" :disabled="isLoading">
            <svg v-if="!isLoading" class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            <div v-else class="spinner"></div>
            {{ isLoading ? 'Memproses...' : 'Login' }}
          </button>
        </form>
      </div>

      <!-- Back to Home -->
      <router-link to="/" class="back-home">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        Kembali ke Beranda
      </router-link>
    </div>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="showToast" class="toast error">
        <div class="toast-content">
          <div class="toast-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <div class="toast-message">
            <p class="toast-title">Login Gagal</p>
            <p class="toast-text">{{ toastMessage }}</p>
          </div>
        </div>
        <button @click="closeToast" class="toast-close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "../firebase"
import { useRouter } from "vue-router"
import { createSession } from "../utils/session"

const email = ref("")
const password = ref("")
const showToast = ref(false)
const toastMessage = ref("")
const isLoading = ref(false)
const router = useRouter()

let toastTimeout

const showNotification = (message) => {
  toastMessage.value = message
  showToast.value = true

  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    closeToast()
  }, 5000)
}

const closeToast = () => {
  showToast.value = false
  if (toastTimeout) clearTimeout(toastTimeout)
}

const login = async () => {
  isLoading.value = true

  try {
    const res = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    )

    const sessionId = createSession()

    await setDoc(
      doc(db, "users", res.user.uid),
      {
        sessionId,
        lastLogin: serverTimestamp()
      },
      { merge: true }
    )

    router.push("/admin")
  } catch (err) {
    let errorMessage = "Email atau password salah"
    
    if (err.code === "auth/invalid-email") {
      errorMessage = "Format email tidak valid"
    } else if (err.code === "auth/user-not-found") {
      errorMessage = "Akun tidak ditemukan"
    } else if (err.code === "auth/wrong-password") {
      errorMessage = "Password salah"
    } else if (err.code === "auth/too-many-requests") {
      errorMessage = "Terlalu banyak percobaan. Coba lagi nanti"
    }
    
    showNotification(errorMessage)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f0e8 0%, #fdf8f3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.container {
  max-width: 500px;
  width: 100%;
}

/* Login Card */
.login-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 24px;
}

/* Card Header */
.login-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 32px;
  background: linear-gradient(135deg, #f5f0e8 0%, #e8d5c8 100%);
  border-bottom: 2px solid rgba(93, 156, 156, 0.1);
}

.header-icon {
  width: 64px;
  height: 64px;
  background: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.header-icon svg {
  width: 32px;
  height: 32px;
  stroke: #5d9c9c;
}

.header-content {
  flex: 1;
}

.login-title {
  font-size: 28px;
  font-weight: 800;
  color: #2c3e50;
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.login-subtitle {
  font-size: 14px;
  color: #7f8c8d;
  margin: 0;
}

/* Login Content */
.login-content {
  padding: 32px;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
}

.label-icon {
  width: 18px;
  height: 18px;
  stroke: #5d9c9c;
}

.required {
  color: #e74c3c;
  margin-left: 4px;
}

/* Input Styles */
.form-input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  font-size: 15px;
  color: #2c3e50;
  transition: all 0.3s ease;
  font-family: inherit;
  background: #fafafa;
}

.form-input:focus {
  outline: none;
  border-color: #5d9c9c;
  background: white;
  box-shadow: 0 0 0 4px rgba(93, 156, 156, 0.1);
}

.form-input::placeholder {
  color: #bbb;
}

/* Login Button */
.btn-login {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #5d9c9c 0%, #4a8080 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(93, 156, 156, 0.3);
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(93, 156, 156, 0.4);
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

/* Spinner */
.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Back to Home */
.back-home {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  background: white;
  color: #5d9c9c;
  text-decoration: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
}

.back-home:hover {
  background: #5d9c9c;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(93, 156, 156, 0.3);
}

.back-home svg {
  width: 18px;
  height: 18px;
}

/* Toast Notification */
.toast {
  position: fixed;
  top: 24px;
  right: 24px;
  min-width: 350px;
  max-width: 500px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 24px;
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.toast.error {
  border-left: 4px solid #e74c3c;
}

.toast-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
}

.toast-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.toast.error .toast-icon {
  background: linear-gradient(135deg, #ffebe9 0%, #ffd5d0 100%);
}

.toast-icon svg {
  width: 22px;
  height: 22px;
}

.toast.error .toast-icon svg {
  stroke: #e74c3c;
}

.toast-message {
  flex: 1;
}

.toast-title {
  font-size: 16px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 4px 0;
}

.toast-text {
  font-size: 14px;
  color: #7f8c8d;
  margin: 0;
  line-height: 1.4;
}

.toast-close {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.toast-close:hover {
  background: #f0f0f0;
}

.toast-close svg {
  width: 18px;
  height: 18px;
  stroke: #7f8c8d;
}

/* Toast Transitions */
.toast-enter-active {
  animation: toastIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-leave-active {
  animation: toastOut 0.3s ease-in;
}

@keyframes toastIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes toastOut {
  from {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateX(400px) scale(0.9);
    opacity: 0;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .page-wrapper {
    padding: 24px 16px;
  }

  .login-header {
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }

  .login-title {
    font-size: 24px;
  }

  .login-content {
    padding: 24px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .toast {
    top: 16px;
    right: 16px;
    left: 16px;
    min-width: auto;
  }
}
</style>