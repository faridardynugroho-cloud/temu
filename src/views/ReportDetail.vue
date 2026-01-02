<template>
  <div class="page-wrapper">
    <div class="container" v-if="report">
      <!-- Back Button -->
      <button class="btn-back" @click="$router.back()">
        <svg class="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
        Kembali
      </button>

      <!-- Detail Card -->
      <div class="detail-card">
        <!-- Card Header -->
        <div class="detail-header">
          <div class="header-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
          </div>
          <div class="header-content">
            <h2 class="item-title">{{ report.itemName }}</h2>
            <span :class="['status-badge', report.type]">
              {{ report.type === "Kehilangan" ? "Kehilangan" : "Menemukan" }}
            </span>
          </div>
        </div>

        <!-- Detail Content -->
        <div class="detail-content">
          <!-- Description Section -->
          <div class="detail-section">
            <div class="section-header">
              <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              <h3>Deskripsi</h3>
            </div>
            <p class="section-text">{{ report.description }}</p>
          </div>

          <!-- Info Grid -->
          <div class="info-grid">
            <!-- Location -->
            <div class="info-card">
              <div class="info-icon-wrapper">
                <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div class="info-content">
                <span class="info-label">Lokasi</span>
                <span class="info-value">{{ report.location }}</span>
              </div>
            </div>

            <!-- Date -->
            <div class="info-card">
              <div class="info-icon-wrapper">
                <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div class="info-content">
                <span class="info-label">Tanggal</span>
                <span class="info-value">{{ report.date }}</span>
              </div>
            </div>

            <!-- Status -->
            <div class="info-card status-card">
              <div class="info-icon-wrapper">
                <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div class="info-content">
                <span class="info-label">Status</span>
                <span :class="['status-value', getStatusClass(report.status)]">
                  {{ report.status }}
                </span>
              </div>
            </div>
          </div>

          <!-- Contact Admin Button -->
          <button
            v-if="report.status !== 'Selesai'"
            class="btn-contact"
            @click="hubungiAdmin"
          >
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Hubungi Admin via WhatsApp
          </button>

          <!-- Completed Message -->
          <div v-else class="completed-message">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span>Laporan telah selesai diproses</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="loading-container">
      <div class="loading-spinner"></div>
      <p>Memuat detail laporan...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

const route = useRoute();
const report = ref(null);
const isAdmin = ref(false);
const auth = getAuth();
const newStatus = ref("");

const getStatusClass = (status) => {
  if (status === 'Selesai') return 'completed';
  if (status === 'Diproses') return 'processing';
  return 'pending';
};

const updateStatus = async () => {
  await updateDoc(doc(db, "reports", route.params.id), {
    status: newStatus.value,
  });
};

const hubungiAdmin = () => {
  const adminPhone = "628812126877";
  let message = "";

  if (report.value.type === "Kehilangan") {
    message = `
Halo Admin, saya ingin melaporkan bahwa saya telah *menemukan barang* milik ${report.value.reporterName}.

Nama Barang: ${report.value.itemName}
Ciri-ciri: ${report.value.description}
Lokasi: ${report.value.location}
Status: ${report.value.status}
`;
  } else if (report.value.type === "Menemukan") {
    message = `
Halo Admin, saya ingin melaporkan bahwa saya adalah *pemilik barang* dari.

Nama Pelapor: ${report.value.reporterName}
Nama Barang: ${report.value.itemName}
Ciri-ciri: ${report.value.description}
Lokasi: ${report.value.location}
Status: ${report.value.status}
`;
  }

  const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, "_blank");
};

const checkAdmin = async () => {
  if (!auth.currentUser) return;

  const userSnap = await getDoc(doc(db, "users", auth.currentUser.uid));

  if (userSnap.exists()) {
    isAdmin.value = userSnap.data().role === "admin";
  }
};

onMounted(async () => {
  await checkAdmin();
  const docRef = doc(db, "reports", route.params.id);
  const snap = await getDoc(docRef);

  if (snap.exists()) {
    report.value = snap.data();
  }
});
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f0e8 0%, #fdf8f3 100%);
  padding: 40px 20px;
}

.container {
  max-width: 800px;
  margin: auto;
}

/* Back Button */
.btn-back {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: white;
  border: 2px solid #5d9c9c;
  color: #5d9c9c;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 24px;
}

.btn-back:hover {
  background: #5d9c9c;
  color: white;
  transform: translateX(-4px);
}

.back-icon {
  width: 18px;
  height: 18px;
}

/* Detail Card */
.detail-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Card Header */
.detail-header {
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

.item-title {
  font-size: 32px;
  font-weight: 800;
  color: #2c3e50;
  margin: 0 0 12px 0;
  line-height: 1.2;
}

.status-badge {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.lost {
  background: linear-gradient(135deg, #ffebe9 0%, #ffd5d0 100%);
  color: #e74c3c;
}

.status-badge.found {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  color: #27ae60;
}

/* Detail Content */
.detail-content {
  padding: 32px;
}

/* Detail Section */
.detail-section {
  margin-bottom: 32px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.section-icon {
  width: 24px;
  height: 24px;
  stroke: #5d9c9c;
}

.section-header h3 {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.section-text {
  font-size: 16px;
  color: #555;
  line-height: 1.7;
  margin: 0;
  padding-left: 36px;
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.info-card {
  background: linear-gradient(135deg, #f9f9f9 0%, #f5f5f5 100%);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid #e8e8e8;
}

.status-card {
  grid-column: span 2;
}

.info-icon-wrapper {
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.info-icon {
  width: 24px;
  height: 24px;
  stroke: #5d9c9c;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 12px;
  color: #7f8c8d;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 16px;
  color: #2c3e50;
  font-weight: 700;
}

.status-value {
  font-size: 16px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 6px;
  display: inline-block;
}

.status-value.completed {
  background: #e8f5e9;
  color: #27ae60;
}

.status-value.processing {
  background: #fff3e0;
  color: #f39c12;
}

.status-value.pending {
  background: #e3f2fd;
  color: #3498db;
}

/* Contact Button */
.btn-contact {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #25d366 0%, #1ebe5d 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
}

.btn-contact:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

/* Completed Message */
.completed-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  border-radius: 12px;
  color: #27ae60;
  font-weight: 600;
  font-size: 16px;
}

.check-icon {
  width: 24px;
  height: 24px;
  stroke: #27ae60;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f0f0f0;
  border-top: 4px solid #5d9c9c;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-container p {
  color: #7f8c8d;
  font-size: 16px;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .page-wrapper {
    padding: 24px 16px;
  }

  .detail-header {
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }

  .item-title {
    font-size: 24px;
  }

  .detail-content {
    padding: 24px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .status-card {
    grid-column: span 1;
  }

  .section-text {
    padding-left: 0;
  }
}
</style>