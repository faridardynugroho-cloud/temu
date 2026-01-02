<template>
  <div class="admin-layout">
    <div class="body">
      <!-- SIDEBAR -->
      <aside class="sidebar">
        <!-- Brand/Logo -->
        <div class="sidebar-brand">
          <div class="brand-icon">T</div>
          <span class="brand-text">TEMU</span>
        </div>

        <!-- Navigation -->
        <nav class="sidebar-nav">
          <router-link to="/admin/dashboard" class="nav-item">
            <div class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <span>Dashboard</span>
          </router-link>

          <router-link to="/admin/workspace" class="nav-item">
            <div class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <span>Workspace</span>
          </router-link>

          <router-link to="/admin/laporan" class="nav-item">
            <div class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <span>Laporan</span>
          </router-link>
        </nav>

        <!-- User Profile at Bottom -->
        <div class="sidebar-footer">
          <div class="user-profile">
            <div class="user-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div class="user-info">
              <div class="user-name">Admin User</div>
              <div class="user-role">Administrator</div>
            </div>
          </div>
          <button class="logout-btn" @click="handleLogout">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </aside>

      <!-- CONTENT -->
      <main class="content">
        <router-view />
      </main>

      <!-- LOGOUT MODAL -->
    <transition name="modal-fade">
      <div v-if="showLogoutModal" class="modal-overlay" @click="cancelLogout">
        <div class="modal-container" @click.stop>
          <div class="modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </div>
          
          <h2 class="modal-title">Konfirmasi Logout</h2>
          <p class="modal-message">Apakah Anda yakin ingin keluar dari aplikasi?</p>
          
          <div class="modal-actions">
            <button class="btn-cancel" @click="cancelLogout">
              Batal
            </button>
            <button class="btn-confirm" @click="confirmLogout">
              Ya, Logout
            </button>
          </div>
        </div>
      </div>
    </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const auth = getAuth();
const router = useRouter();
const showLogoutModal = ref(false);

const handleLogout = async () => {
  showLogoutModal.value = true;
};

const confirmLogout = async () => {
  try {
    await signOut(auth);
    router.replace("/");
  } catch (err) {
    console.error("Logout gagal:", err);
    alert("Gagal logout");
  }
};

const cancelLogout = () => {
  showLogoutModal.value = false;
};
</script>


<style scoped>
.admin-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* SIDEBAR */
.sidebar {
  width: 280px;
  background: linear-gradient(180deg, #5d9c9c 0%, #4a8080 100%);
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
}

/* Brand */
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.brand-icon {
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  color: #5d9c9c;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.brand-text {
  font-size: 24px;
  font-weight: 800;
  color: white;
  letter-spacing: 1px;
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.nav-item:hover {
  color: white;
  background: rgba(255, 255, 255, 0.15);
}

.nav-item:hover::before {
  transform: translateX(0);
}

.nav-item.router-link-active {
  background: white;
  color: #5d9c9c;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon svg {
  width: 20px;
  height: 20px;
}

/* Sidebar Footer */
.sidebar-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-top: 20px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-avatar svg {
  width: 22px;
  height: 22px;
  stroke: #5d9c9c;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 14px;
  font-weight: 700;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-btn {
  width: 36px;
  height: 36px;
  background: rgba(232, 165, 156, 0.9);
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.logout-btn svg {
  width: 18px;
  height: 18px;
  stroke: white;
}

.logout-btn:hover {
  background: #d89186;
  transform: translateY(-2px);
}

/* CONTENT */
.content {
  flex: 1;
  background: linear-gradient(135deg, #f5f0e8 0%, #fdf8f3 100%);
  overflow-y: auto;
  overscroll-behavior: contain;
}

/* Responsive */
@media (max-width: 1024px) {
  .sidebar {
    width: 240px;
    padding: 20px;
  }

  .brand-text {
    font-size: 20px;
  }

  .nav-item {
    padding: 12px 14px;
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 80px;
    padding: 16px 12px;
  }

  .brand-text,
  .nav-item span,
  .user-info {
    display: none;
  }

  .sidebar-brand {
    justify-content: center;
    margin-bottom: 30px;
  }

  .brand-icon {
    width: 44px;
    height: 44px;
    font-size: 20px;
  }

  .nav-item {
    justify-content: center;
    padding: 14px;
  }

  /* 👇 PERBAIKAN DISINI */
  .sidebar-footer {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
    gap: 12px;
  }

  .user-profile {
    justify-content: center;
  }

  .user-avatar {
    width: 44px;
    height: 44px;
  }

  /* Logout button tetap muncul */
  .logout-btn {
    display: flex;
    width: 44px;
    height: 44px;
  }

    .modal-container {
    padding: 32px 24px;
    max-width: 340px;
  }

  .modal-icon {
    width: 70px;
    height: 70px;
  }

  .modal-icon svg {
    width: 35px;
    height: 35px;
  }

  .modal-title {
    font-size: 20px;
  }

  .modal-message {
    font-size: 14px;
  }

  .btn-cancel,
  .btn-confirm {
    max-width: 100%;
  }
}

/* LOGOUT MODAL */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 420px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
  animation: modal-bounce 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.modal-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #e8a59c 0%, #d89186 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  box-shadow: 0 8px 20px rgba(232, 165, 156, 0.4);
}

.modal-icon svg {
  width: 40px;
  height: 40px;
  stroke: white;
  stroke-width: 2.5;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 12px 0;
}

.modal-message {
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 32px 0;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn-cancel,
.btn-confirm {
  flex: 1;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 160px;
}

.btn-cancel {
  background: #f0f0f0;
  color: #6c757d;
}

.btn-cancel:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
}

.btn-confirm {
  background: linear-gradient(135deg, #5d9c9c 0%, #4a8080 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(93, 156, 156, 0.3);
}

.btn-confirm:hover {
  background: linear-gradient(135deg, #4a8080 0%, #3d6b6b 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(93, 156, 156, 0.4);
}

/* Modal Animation */
@keyframes modal-bounce {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-container {
  animation: modal-bounce 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.modal-fade-leave-active .modal-container {
  animation: modal-fade-out 0.3s ease forwards;
}

@keyframes modal-fade-out {
  to {
    transform: scale(0.9);
    opacity: 0;
  }
}
</style>