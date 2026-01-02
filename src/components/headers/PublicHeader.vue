<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo/Brand -->
      <router-link to="/" class="brand-link">
        <div class="brand">
          <div class="brand-icon">T</div>
          <h1 class="logo">TEMU</h1>
        </div>
      </router-link>

      <!-- Navigation -->
      <nav class="nav">
        <router-link to="/login" v-if="showButton" class="nav-link">
          <button class="btn-admin">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Admin Login
          </button>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useAuth } from "../../composables/useAuth"

const route = useRoute()
const { user } = useAuth()

const showButton = computed(() => {
  return route.path !== "/"
})
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #ffffff 0%, #fdf8f3 100%);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(93, 156, 156, 0.1);
}

.header-container {
  max-width: 1900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
}

/* Brand */
.brand-link {
  text-decoration: none;
  transition: transform 0.3s ease;
}
.brand{
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 48px;
  height: 48px;
  background: #5d9c9c;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.brand-link:hover {
  transform: translateY(-2px);
}


.logo {
  font-size: 32px;
  font-weight: 800;
  color: #5d9c9c;
  letter-spacing: 2px;
  margin: 0;
  line-height: 1;
}

.tagline {
  font-size: 11px;
  color: #7f8c8d;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* Navigation */
.nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
}

.btn-admin {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #5d9c9c 0%, #4a8080 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(93, 156, 156, 0.2);
}

.btn-admin:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(93, 156, 156, 0.35);
}

.btn-admin:active {
  transform: translateY(0);
}

.btn-icon {
  width: 18px;
  height: 18px;
}

/* Responsive */
@media (max-width: 768px) {
  .header-container {
    padding: 16px 20px;
  }

  .logo {
    font-size: 24px;
  }

  .tagline {
    font-size: 9px;
  }

  .btn-admin {
    padding: 10px 20px;
    font-size: 14px;
  }

  .btn-icon {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 12px 16px;
  }

  .logo {
    font-size: 20px;
  }

  .tagline {
    display: none;
  }

  .btn-admin {
    padding: 8px 16px;
    font-size: 13px;
  }
}
</style>