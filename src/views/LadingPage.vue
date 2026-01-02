<template>
  <div class="landing-container">
    <!-- Left Section -->
    <div class="left-section">
      <div class="content-wrapper">
        <!-- Logo/Brand -->
        <div class="brand">
          <h1 class="logo">TEMU</h1>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <p class="tagline">TELUSUR MUSEUM</p>
          <h2 class="title">Temukan yang Hilang Jaga Warisan</h2>
          <p class="description">
            Sistem pencarian barang hilang museum yang mudah dan efisien. 
            Laporkan atau cari barang hilang Anda dengan cepat.
          </p>

          <!-- CTA Buttons -->
          <div class="cta-buttons">
            <router-link to="/login" class="btn-link">
              <button class="btn btn-primary">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Admin Login
              </button>
            </router-link>

            <router-link to="/report" class="btn-link">
              <button class="btn btn-secondary">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                  <path d="M12 16v-4M12 8h.01"/>
                </svg>
                Daftar Laporan
              </button>
            </router-link>
          </div>

          <!-- Features -->
          <div class="features">
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <span>Cepat & Mudah</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <span>Aman</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <span>24/7 Akses</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="deco-circle deco-1"></div>
      <div class="deco-circle deco-2"></div>
    </div>

    <!-- Right Section -->
    <div class="right-section">
      <div class="image-container">
        <div class="image-card">
          <img src="/images/logo.jpg" alt="Museum Items" />
        </div>
        <div class="image-overlay"></div>
        
        <!-- Floating Stats -->
        <div class="floating-stat stat-1">
          <div class="stat-icon">🔍</div>
          <div class="stat-content">
            <div class="stat-number">1,247</div>
            <div class="stat-label">Barang Ditemukan</div>
          </div>
        </div>
        
        <div class="floating-stat stat-2">
          <div class="stat-icon">✨</div>
          <div class="stat-content">
            <div class="stat-number">98%</div>
            <div class="stat-label">Tingkat Keberhasilan</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.landing-container {
  display: flex;
  min-height: 90.5vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
}

/* Left Section */
.left-section {
  flex: 1;
  background: linear-gradient(135deg, #f5f0e8 0%, #fdf8f3 100%);
  padding: 60px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.content-wrapper {
  max-width: 600px;
  position: relative;
  z-index: 2;
}

.logo {
  font-size: 48px;
  font-weight: 800;
  color: #5d9c9c;
  letter-spacing: 2px;
  margin: 0;
}

.main-content {
  animation: fadeInUp 0.8s ease-out;
}

.tagline {
  color: #5d9c9c;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 3px;
  margin-bottom: 15px;
  text-transform: uppercase;
}

.title {
  font-size: 50px;
  font-weight: 800;
  color: #2c3e50;
  line-height: 1.2;
  margin-bottom: 20px;
}

.description {
  font-size: 18px;
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 40px;
}

/* Buttons */
.cta-buttons {
  display: flex;
  gap: 15px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.btn-link {
  text-decoration: none;
}

.btn {
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.btn-primary {
  background: linear-gradient(135deg, #5d9c9c 0%, #4a8080 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(93, 156, 156, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #e8a59c 0%, #d89186 100%);
  color: white;
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(232, 165, 156, 0.4);
}

/* Features */
.features {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.feature-icon {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.feature-icon svg {
  width: 20px;
  height: 20px;
  stroke: #5d9c9c;
}

.feature-item span {
  font-weight: 600;
  color: #2c3e50;
}

/* Decorative Elements */
.deco-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.deco-1 {
  width: 400px;
  height: 400px;
  background: #5d9c9c;
  top: -100px;
  right: -100px;
}

.deco-2 {
  width: 250px;
  height: 250px;
  background: #e8a59c;
  bottom: -50px;
  left: -50px;
}

/* Right Section */
.right-section {
  flex: 1;
  background: linear-gradient(135deg, #5d9c9c 0%, #4a8080 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  position: relative;
}

.image-container {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.image-card {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
}

.image-card img {
  width: 100%;
  height: 600px;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(93, 156, 156, 0) 0%, rgba(74, 128, 128, 0.3) 100%);
  z-index: 2;
  pointer-events: none;
}

/* Floating Stats */
.floating-stat {
  position: absolute;
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 3;
  animation: float 3s ease-in-out infinite;
}

.stat-1 {
  top: 10%;
  right: -30px;
}

.stat-2 {
  bottom: 15%;
  left: -30px;
  animation-delay: 1.5s;
}

.stat-icon {
  font-size: 32px;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 24px;
  font-weight: 800;
  color: #2c3e50;
}

.stat-label {
  font-size: 12px;
  color: #7f8c8d;
  font-weight: 600;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Responsive */
@media (max-width: 1200px) {
  .landing-container {
    flex-direction: column;
  }

  .left-section {
    padding: 40px;
  }

  .right-section {
    padding: 40px;
    min-height: 500px;
  }

  .title {
    font-size: 42px;
  }

  .image-card img {
    height: 400px;
  }

  .floating-stat {
    position: static;
    margin: 10px auto;
  }

  .stat-1, .stat-2 {
    animation: none;
  }
}

@media (max-width: 768px) {
  .left-section {
    padding: 30px 20px;
  }

  .logo {
    font-size: 36px;
  }

  .title {
    font-size: 32px;
  }

  .description {
    font-size: 16px;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .features {
    flex-direction: column;
    gap: 15px;
  }
}
</style>