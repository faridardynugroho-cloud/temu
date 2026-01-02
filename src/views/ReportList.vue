<template>
  <div class="page-wrapper">
    <div class="container">
      <!-- Header Section -->
      <div class="page-header">
        <div class="header-content">
          <h2 class="page-title">Daftar Laporan</h2>
          <p class="page-subtitle">Telusuri barang hilang atau temuan</p>
        </div>
      </div>

      <!-- Action Bar -->
      <div class="action-bar">
        <!-- Filter Buttons -->
        <div class="filter-group">
          <button 
            :class="['filter-btn', { active: filter === 'all' }]" 
            @click="setFilter('all')"
          >
            <svg class="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
            Semua
            <span v-if="filter === 'all'" class="count">{{ allReports.length }}</span>
          </button>

          <button 
            :class="['filter-btn', { active: filter === 'Kehilangan' }]" 
            @click="setFilter('Kehilangan')"
          >
            <svg class="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            Kehilangan
          </button>

          <button 
            :class="['filter-btn', { active: filter === 'Menemukan' }]" 
            @click="setFilter('Menemukan')"
          >
            <svg class="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Menemukan
          </button>
        </div>

        <!-- Create Report Button -->
        <router-link to="/report/create" class="btn-link">
          <button class="btn-create">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Laporkan Kejadian
          </button>
        </router-link>
      </div>

      <!-- Empty State -->
      <div v-if="allReports.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h3>Belum Ada Laporan</h3>
        <p>Belum ada laporan yang tersedia saat ini</p>
      </div>

      <!-- Reports Grid -->
      <div v-else>
        <div class="reports-grid">
          <router-link 
            v-for="report in paginatedReports" 
            :key="report.id" 
            :to="`/report/${report.id}`"
            class="report-card-link"
          >
            <div class="report-card">
              <!-- Card Header -->
              <div class="card-header">
                <div class="item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                  </svg>
                </div>
                <span :class="['badge', report.type]">
                  {{ report.type === "Kehilangan" ? "Kehilangan" : "Menemukan" }}
                </span>
              </div>

              <!-- Card Body -->
              <div class="card-body">
                <h3 class="item-name">{{ report.itemName }}</h3>
                
                <div class="card-info">
                  <div class="info-item">
                    <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{{ report.location }}</span>
                  </div>
                </div>
              </div>

              <!-- Card Footer -->
              <div class="card-footer">
                <span class="view-details">Lihat Detail</span>
                <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination">
          <button 
            @click="goToPage(currentPage - 1)" 
            :disabled="currentPage === 1"
            class="pagination-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Sebelumnya
          </button>

          <div class="pagination-numbers">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="['page-number', { active: page === currentPage }]"
            >
              {{ page }}
            </button>
          </div>

          <button 
            @click="goToPage(currentPage + 1)" 
            :disabled="currentPage === totalPages"
            class="pagination-btn"
          >
            Selanjutnya
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        <!-- Page Info -->
        <div v-if="totalPages > 1" class="page-info">
          Menampilkan {{ startIndex + 1 }}-{{ endIndex }} dari {{ allReports.length }} laporan
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const allReports = ref([]);
const filter = ref("all");
const currentPage = ref(1);
const itemsPerPage = 12;
let unsubscribe = null;

const fetchReports = () => {
  if (unsubscribe) unsubscribe();

  let q;

  if (filter.value === "all") {
    q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
  } else {
    q = query(
      collection(db, "reports"),
      where("type", "==", filter.value),
      orderBy("createdAt", "desc")
    );
  }

  unsubscribe = onSnapshot(q, (snapshot) => {
    allReports.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
};

const setFilter = (value) => {
  filter.value = value;
  currentPage.value = 1; // Reset to first page when filter changes
};

// Computed properties for pagination
const totalPages = computed(() => {
  return Math.ceil(allReports.value.length / itemsPerPage);
});

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage;
});

const endIndex = computed(() => {
  return Math.min(startIndex.value + itemsPerPage, allReports.value.length);
});

const paginatedReports = computed(() => {
  return allReports.value.slice(startIndex.value, endIndex.value);
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(fetchReports);
watch(filter, fetchReports);
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f0e8 0%, #fdf8f3 100%);
  padding: 40px 20px;
}

.container {
  max-width: 1200px;
  margin: auto;
}

/* Page Header */
.page-header {
  margin-bottom: 40px;
}

.header-content {
  text-align: center;
}

.page-title {
  font-size: 42px;
  font-weight: 800;
  color: #2c3e50;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  color: #7f8c8d;
  margin: 0;
}

/* Action Bar */
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

/* Filter Group */
.filter-group {
  display: flex;
  gap: 12px;
  background: white;
  padding: 6px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  background: transparent;
  color: #7f8c8d;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.filter-btn:hover {
  background: #f5f0e8;
  color: #2c3e50;
}

.filter-btn.active {
  background: linear-gradient(135deg, #5d9c9c 0%, #4a8080 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(93, 156, 156, 0.3);
}

.filter-icon {
  width: 18px;
  height: 18px;
}

.count {
  background: rgba(255, 255, 255, 0.3);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
}

/* Create Button */
.btn-link {
  text-decoration: none;
}

.btn-create {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #e8a59c 0%, #d89186 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(232, 165, 156, 0.3);
}

.btn-create:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(232, 165, 156, 0.4);
}

.btn-icon {
  width: 18px;
  height: 18px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #f5f0e8 0%, #e8d5c8 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-icon svg {
  width: 40px;
  height: 40px;
  stroke: #5d9c9c;
}

.empty-state h3 {
  font-size: 24px;
  color: #2c3e50;
  margin: 0 0 8px 0;
}

.empty-state p {
  color: #7f8c8d;
  margin: 0;
}

/* Reports Grid */
.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.report-card-link {
  text-decoration: none;
}

/* Report Card */
.report-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.report-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border-color: #5d9c9c;
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.item-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #f5f0e8 0%, #e8d5c8 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-icon svg {
  width: 24px;
  height: 24px;
  stroke: #5d9c9c;
}

.badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge.Kehilangan {
  background: linear-gradient(135deg, #ffebe9 0%, #ffd5d0 100%);
  color: #e74c3c;
}

.badge.Menemukan {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  color: #27ae60;
}

/* Card Body */
.card-body {
  margin-bottom: 16px;
}

.item-name {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 12px 0;
  line-height: 1.3;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #7f8c8d;
  font-size: 14px;
}

.info-icon {
  width: 16px;
  height: 16px;
  stroke: #5d9c9c;
  flex-shrink: 0;
}

/* Card Footer */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.view-details {
  font-size: 14px;
  font-weight: 600;
  color: #5d9c9c;
}

.arrow-icon {
  width: 18px;
  height: 18px;
  stroke: #5d9c9c;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: white;
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #5d9c9c;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #5d9c9c;
  color: white;
  border-color: #5d9c9c;
  transform: translateY(-2px);
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-btn svg {
  width: 16px;
  height: 16px;
}

.pagination-numbers {
  display: flex;
  gap: 8px;
}

.page-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #7f8c8d;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-number:hover {
  background: #f5f0e8;
  border-color: #5d9c9c;
  color: #5d9c9c;
}

.page-number.active {
  background: linear-gradient(135deg, #5d9c9c 0%, #4a8080 100%);
  border-color: #5d9c9c;
  color: white;
  box-shadow: 0 4px 12px rgba(93, 156, 156, 0.3);
}

/* Page Info */
.page-info {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #7f8c8d;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .page-wrapper {
    padding: 24px 16px;
  }

  .page-title {
    font-size: 32px;
  }

  .action-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-group {
    width: 100%;
    justify-content: center;
  }

  .btn-create {
    width: 100%;
    justify-content: center;
  }

  .reports-grid {
    grid-template-columns: 1fr;
  }

  .pagination {
    flex-wrap: wrap;
  }

  .pagination-btn {
    padding: 8px 16px;
    font-size: 13px;
  }

  .pagination-numbers {
    order: 3;
    width: 100%;
    justify-content: center;
    margin-top: 8px;
  }
}

@media (max-width: 480px) {
  .filter-group {
    flex-direction: column;
  }

  .filter-btn {
    justify-content: center;
  }

  .page-number {
    width: 36px;
    height: 36px;
    font-size: 13px;
  }
}
</style>