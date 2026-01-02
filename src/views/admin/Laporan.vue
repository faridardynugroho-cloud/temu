<template>
  <div class="container">
    <div class="header">
      <div class="header-text">
        <h2>Manajemen Laporan</h2>
        <p class="subtitle">
          Kelola semua laporan kehilangan dan penemuan barang
        </p>
      </div>
    </div>

    <!-- FILTER & ACTIONS -->
    <div class="filter-bar">
      <div class="filter-group">
        <div class="input-group">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <input type="date" v-model="startDate" placeholder="Tanggal Mulai" />
        </div>

        <div class="input-group">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <input type="date" v-model="endDate" placeholder="Tanggal Akhir" />
        </div>
      </div>

      <div class="action-group">
        <button
          class="btn-reset"
          @click="resetFilter"
          v-if="startDate || endDate"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          Reset Filter
        </button>

        <button class="btn-download" @click="downloadCSV">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download CSV
        </button>

        <button class="btn-add" @click="openCreate">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Tambah Laporan
        </button>
      </div>
    </div>

    <!-- TABLE -->
    <div class="table-wrapper">
      <table v-if="paginatedReports.length" class="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Pelapor</th>
            <th>Nama Barang</th>
            <th>Jenis</th>
            <th>Deskripsi</th>
            <th>No HP</th>
            <th>Lokasi</th>
            <th>Tanggal Kejadian</th>
            <th>Status</th>
            <th>Dibuat Pada</th>
            <th>Dibuat Oleh</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(r, i) in paginatedReports" :key="r.id">
            <td>{{ (currentPage - 1) * perPage + i + 1 }}</td>
            <td>{{ r.reporterName || "-" }}</td>
            <td class="item-name">{{ r.itemName }}</td>
            <td>
              <span
                class="type-badge"
                :class="r.type === 'Kehilangan' ? 'lost' : 'found'"
              >
                {{ r.type }}
              </span>
            </td>
            <td class="description">{{ r.description || "-" }}</td>
            <td>{{ r.contact || "-" }}</td>
            <td>{{ r.location }}</td>
            <td>{{ r.date }}</td>
            <td>
              <span
                class="status-badge"
                :class="r.status === 'Selesai' ? 'closed' : 'open'"
              >
                {{ r.status }}
              </span>
            </td>
            <td>{{ formatDate(r.createdAt) }}</td>
            <td>
              <span class="creator-badge" :class="r.createdBy">
                {{ r.createdBy === "admin" ? "Admin" : "Pengunjung" }}
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button class="btn-edit" @click="openEdit(r)" title="Edit">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    />
                    <path
                      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                    />
                  </svg>
                </button>
                <button
                  class="btn-delete"
                  @click="hapusLaporan(r.id)"
                  title="Hapus"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path
                      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="empty-state">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
          />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        <h3>Belum ada laporan</h3>
        <p>Tambahkan laporan baru dengan klik tombol "Tambah Laporan"</p>
      </div>
    </div>

    <!-- PAGINATION -->
    <div class="pagination" v-if="totalPages > 1">
      <button class="page-btn" @click="prevPage" :disabled="currentPage === 1">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Previous
      </button>

      <div class="page-info">
        <span class="page-current">{{ currentPage }}</span>
        <span class="page-separator">/</span>
        <span class="page-total">{{ totalPages }}</span>
      </div>

      <button
        class="page-btn"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>

    <!-- MODAL CREATE / EDIT -->
    <div v-if="showForm" class="modal" @click.self="closeForm">
      <div class="modal-box">
        <div class="modal-header">
          <h3>{{ isEdit ? "Edit" : "Tambah" }} Laporan</h3>
          <button class="close-btn" @click="closeForm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>Nama Pelapor</label>
            <input
              v-model="form.reporterName"
              placeholder="Nama lengkap pelapor"
              type="text"
              required=""
            />
          </div>
          <div class="form-group">
            <label>Jenis Laporan</label>
            <select v-model="form.type" required>
              <option value="Kehilangan">Kehilangan</option>
              <option value="Menemukan">Menemukan</option>
            </select>
          </div>
          <div class="form-group">
            <label>Nama Barang</label>
            <input
              v-model="form.itemName"
              placeholder="Contoh: Dompet kulit coklat"
              required
            />
          </div>

          <div class="form-group">
            <label>Lokasi</label>
            <input
              v-model="form.location"
              placeholder="Contoh: Ruang Pameran A"
              required
            />
          </div>

          <div class="form-group">
            <label>Tanggal Kejadian</label>
            <input type="date" v-model="form.date" required />
          </div>

          <div class="form-group">
            <label>Deskripsi</label>
            <textarea
              v-model="form.description"
              placeholder="Jelaskan detail barang..."
              rows="4"
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label>No HP (Opsional)</label>
            <input
              v-model="form.contact"
              placeholder="628xxxxxxxxxx"
              type="tel"
            />
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="closeForm">Batal</button>
          <button class="btn-save" @click="save">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
              />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Simpan
          </button>
        </div>
      </div>
    </div>

    <!-- DELETE CONFIRMATION MODAL -->
    <transition name="modal-fade">
      <div v-if="showDeleteModal" class="confirmation-overlay" @click="cancelDelete">
        <div class="confirmation-container delete-modal" @click.stop>
          <div class="confirmation-icon delete-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </div>
          
          <h2 class="confirmation-title">Hapus Laporan?</h2>
          <p class="confirmation-message">Data yang dihapus tidak dapat dikembalikan. Apakah Anda yakin ingin menghapus laporan ini?</p>
          
          <div class="confirmation-actions">
            <button class="btn-confirm-cancel" @click="cancelDelete">
              Batal
            </button>
            <button class="btn-confirm-delete" @click="confirmDelete">
              Ya, Hapus
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- VALIDATION MODAL -->
    <transition name="modal-fade">
      <div v-if="showValidationModal" class="confirmation-overlay" @click="closeValidationModal">
        <div class="confirmation-container validation-modal" @click.stop>
          <div class="confirmation-icon validation-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          
          <h2 class="confirmation-title">Data Tidak Lengkap</h2>
          <p class="confirmation-message">Mohon lengkapi semua field yang wajib diisi sebelum menyimpan laporan.</p>
          
          <div class="confirmation-actions">
            <button class="btn-confirm-ok" @click="closeValidationModal">
              Mengerti
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

const reports = ref([]);

const startDate = ref("");
const endDate = ref("");

const showForm = ref(false);
const isEdit = ref(false);
const editId = ref(null);
const currentPage = ref(1);
const perPage = ref(10);

const showDeleteModal = ref(false);
const deleteId = ref(null);
const showValidationModal = ref(false);

const form = ref({
  reporterName: "",
  itemName: "",
  type: "Kehilangan",
  location: "",
  date: "",
  description: "",
  contact: "",
  status: "Masih berlangsung",
});

onMounted(() => {
  const q = query(collection(db, "reports"), orderBy("createdAt", "asc"));

  onSnapshot(q, (snap) => {
    reports.value = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredReports.value.length / perPage.value)
);

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const paginatedReports = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return filteredReports.value.slice(start, start + perPage.value);
});

const filteredReports = computed(() => {
  return reports.value.filter((r) => {
    // Jika tidak ada createdAt, skip item ini
    if (!r.createdAt) return false;

    // Konversi timestamp ke format date string (YYYY-MM-DD)
    const created = r.createdAt.toDate().toISOString().slice(0, 10);

    // Filter berdasarkan startDate (dari tanggal ini atau setelahnya)
    if (startDate.value && created < startDate.value) return false;

    // Filter berdasarkan endDate (sampai tanggal ini atau sebelumnya)
    if (endDate.value && created > endDate.value) return false;

    return true;
  });
});

const resetFilter = () => {
  startDate.value = "";
  endDate.value = "";
  currentPage.value = 1; // Reset ke halaman pertama
};

/* CRUD */
const openCreate = () => {
  isEdit.value = false;
  showForm.value = true;
  form.value = {
    reporterName: "",
    itemName: "",
    type: "Kehilangan",
    location: "",
    date: "",
    description: "",
    contact: "",
    status: "Masih berlangsung",
  };
};

const openEdit = (r) => {
  isEdit.value = true;
  editId.value = r.id;
  showForm.value = true;

  const { createdBy, createdAt, ...rest } = r;
  form.value = rest;
};

const closeForm = () => {
  showForm.value = false;
};

const save = async () => {
  if (
    !form.value.reporterName ||
    !form.value.type ||
    !form.value.itemName ||
    !form.value.location ||
    !form.value.date ||
    !form.value.description
  ) {
    showValidationModal.value = true;
    return;
  }
  if (isEdit.value) {
    await updateDoc(doc(db, "reports", editId.value), {
      ...form.value,
    });
  } else {
    await addDoc(collection(db, "reports"), {
      ...form.value,
      createdBy: "admin",
      isReadByAdmin: true,
      createdAt: serverTimestamp(),
    });
  }
  showForm.value = false;
};

const closeValidationModal = () => {
  showValidationModal.value = false;
};

const hapusLaporan = (id) => {
  deleteId.value = id;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  await deleteDoc(doc(db, "reports", deleteId.value));
  showDeleteModal.value = false;
  deleteId.value = null;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  deleteId.value = null;
};

/* UTIL */
const formatDate = (ts) => {
  if (!ts) return "-";
  return ts.toDate().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/* DOWNLOAD CSV */
const downloadCSV = () => {
  let csv =
    "Nama Pelapor,Nama Barang,Deskripsi,No HP,Jenis,Lokasi,Tanggal Kejadian,CreatedAt,CreatedBy,Status\n";

  filteredReports.value.forEach((r) => {
    csv += `"${r.reporterName || "-"}","${r.itemName}","${r.description || "-"}","${r.contact || "-"}","${
      r.type
    }","${r.location}","${r.date}","${formatDate(r.createdAt)}","${
      r.createdBy || "-"
    }","${r.status}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `laporan-temu-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
</script>

<style scoped>
.container {
  padding: 40px;
  max-width: 100%;
}

/* HEADER */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.header h2 {
  font-size: 32px;
  font-weight: 800;
  color: #2c3e50;
  margin: 0 0 8px 0;
}

.header-text {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  width: 100%;
}

.subtitle {
  font-size: 15px;
  color: #7f8c8d;
  margin: 0;
}

/* FILTER BAR */
.filter-bar {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-group svg {
  position: absolute;
  left: 14px;
  width: 18px;
  height: 18px;
  stroke: #7f8c8d;
  pointer-events: none;
}

.input-group input {
  padding: 12px 14px 12px 42px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #2c3e50;
  background: #fdf8f3;
  transition: all 0.3s ease;
  min-width: 180px;
}

.input-group input:focus {
  outline: none;
  border-color: #5d9c9c;
  background: white;
}

.action-group {
  display: flex;
  gap: 12px;
}

button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

button svg {
  width: 18px;
  height: 18px;
}

.btn-download {
  background: linear-gradient(135deg, #e8a59c 0%, #d89186 100%);
  color: white;
}

.btn-download:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(232, 165, 156, 0.3);
}

.btn-add {
  background: linear-gradient(135deg, #5d9c9c 0%, #4a8080 100%);
  color: white;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(93, 156, 156, 0.3);
}

.btn-reset {
  background: linear-gradient(135deg, #7f8c8d 0%, #64748b 100%);
  color: white;
}

.btn-reset:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(127, 140, 141, 0.3);
}

/* TABLE */
.table-wrapper {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  margin-bottom: 24px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1500px;
}

.table thead {
  background: linear-gradient(135deg, #5d9c9c 0%, #4a8080 100%);
}

.table th {
  padding: 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.table tbody tr {
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s ease;
}

.table tbody tr:hover {
  background: #f8f9fa;
}

.table td {
  padding: 14px 16px;
  font-size: 14px;
  color: #2c3e50;
  white-space: nowrap;
}

.item-name {
  font-weight: 600;
  color: #2c3e50;
}

.description {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* BADGES */
.type-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
}

.type-badge.lost {
  background: linear-gradient(135deg, #ffe5e0 0%, #ffd4cc 100%);
  color: #e8a59c;
}

.type-badge.found {
  background: linear-gradient(135deg, #e0f5ea 0%, #ccf0dd 100%);
  color: #7fb69e;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
}

.status-badge.open {
  background: linear-gradient(135deg, #e0f5ea 0%, #ccf0dd 100%);
  color: #7fb69e;
}

.status-badge.closed {
  background: linear-gradient(135deg, #e8e8e8 0%, #d4d4d4 100%);
  color: #7f8c8d;
}

.creator-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
}

.creator-badge.admin {
  background: linear-gradient(135deg, #dce8ff 0%, #c7dbff 100%);
  color: #5d7fb6;
}

.creator-badge.pengunjung {
  background: linear-gradient(135deg, #fff4e0 0%, #ffe9c7 100%);
  color: #d4a574;
}

/* ACTION BUTTONS */
.action-buttons {
  display: flex;
  gap: 6px;
}

.btn-edit,
.btn-delete {
  padding: 8px;
  border-radius: 8px;
  box-shadow: none;
}

.btn-edit {
  background: linear-gradient(135deg, #5d9c9c 0%, #4a8080 100%);
  color: white;
}

.btn-edit:hover {
  transform: scale(1.05);
}

.btn-delete {
  background: linear-gradient(135deg, #e8a59c 0%, #d89186 100%);
  color: white;
}

.btn-delete:hover {
  transform: scale(1.05);
}

/* PAGINATION */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.page-btn {
  background: white;
  color: #5d9c9c;
  border: 2px solid #5d9c9c;
  box-shadow: none;
}

.page-btn:hover:not(:disabled) {
  background: #5d9c9c;
  color: white;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

.page-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 16px;
}

.page-current {
  color: #5d9c9c;
  font-size: 20px;
}

.page-separator {
  color: #cbd5e1;
}

.page-total {
  color: #7f8c8d;
}

/* EMPTY STATE */
.empty-state {
  padding: 80px 40px;
  text-align: center;
}

.empty-state svg {
  width: 80px;
  height: 80px;
  stroke: #cbd5e1;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 8px 0;
}

.empty-state p {
  font-size: 14px;
  color: #7f8c8d;
  margin: 0;
}

/* MODAL */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(44, 62, 80, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-box {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 540px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideUp 0.3s ease-out;
}

@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  padding: 24px 28px;
  border-bottom: 2px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #f5f0e8 0%, #fdf8f3 100%);
  border-radius: 20px 20px 0 0;
}

.modal-header h3 {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: #2c3e50;
}

.close-btn {
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 8px;
  background: white;
  color: #7f8c8d;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #e8a59c;
  color: white;
}

.modal-body {
  padding: 28px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #2c3e50;
  background: #fdf8f3;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #5d9c9c;
  background: white;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.modal-footer {
  padding: 20px 28px;
  border-top: 2px solid #f0f0f0;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-cancel {
  background: white;
  color: #7f8c8d;
  border: 2px solid #e0e0e0;
  box-shadow: none;
}

.btn-cancel:hover {
  border-color: #7f8c8d;
  color: #2c3e50;
}

.btn-save {
  background: linear-gradient(135deg, #5d9c9c 0%, #4a8080 100%);
  color: white;
}

.btn-save:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(93, 156, 156, 0.3);
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .container {
    padding: 20px;
  }

  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-group,
  .action-group {
    flex-direction: column;
  }

  .input-group input {
    width: 100%;
  }

  button {
    width: 100%;
    justify-content: center;
  }

  .table-wrapper {
    overflow-x: auto;
  }
}

/* CONFIRMATION MODALS */
.confirmation-overlay {
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
  z-index: 10000;
}

.confirmation-container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 420px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
  animation: modal-bounce 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.confirmation-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.confirmation-icon svg {
  width: 40px;
  height: 40px;
  stroke: white;
  stroke-width: 2.5;
}

/* Delete Modal - Coral/Salmon theme */
.delete-modal .delete-icon {
  background: linear-gradient(135deg, #e8a59c 0%, #d89186 100%);
  box-shadow: 0 8px 20px rgba(232, 165, 156, 0.4);
}

/* Validation Modal - Amber/Orange theme */
.validation-modal .validation-icon {
  background: linear-gradient(135deg, #f4c430 0%, #e8a80c 100%);
  box-shadow: 0 8px 20px rgba(244, 196, 48, 0.4);
}

.confirmation-title {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirmation-message {
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 32px 0;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirmation-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn-confirm-cancel,
.btn-confirm-delete,
.btn-confirm-ok {
  flex: 1;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-confirm-cancel {
  background: #f0f0f0;
  color: #6c757d;
}

.btn-confirm-cancel:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
}

.btn-confirm-delete {
  background: linear-gradient(135deg, #e8a59c 0%, #d89186 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(232, 165, 156, 0.3);
}

.btn-confirm-delete:hover {
  background: linear-gradient(135deg, #d89186 0%, #c67d72 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(232, 165, 156, 0.4);
}

.btn-confirm-ok {
  background: linear-gradient(135deg, #f4c430 0%, #e8a80c 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(244, 196, 48, 0.3);
  max-width: 200px;
}

.btn-confirm-ok:hover {
  background: linear-gradient(135deg, #e8a80c 0%, #d49608 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(244, 196, 48, 0.4);
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

.modal-fade-enter-active .confirmation-container {
  animation: modal-bounce 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.modal-fade-leave-active .confirmation-container {
  animation: modal-fade-out 0.3s ease forwards;
}

@keyframes modal-fade-out {
  to {
    transform: scale(0.9);
    opacity: 0;
  }
}

/* Responsive Confirmation Modal */
@media (max-width: 768px) {
  .confirmation-container {
    padding: 32px 24px;
    max-width: 340px;
  }

  .confirmation-icon {
    width: 70px;
    height: 70px;
  }

  .confirmation-icon svg {
    width: 35px;
    height: 35px;
  }

  .confirmation-title {
    font-size: 20px;
  }

  .confirmation-message {
    font-size: 14px;
  }

  .confirmation-actions {
    flex-direction: column;
  }

  .btn-confirm-cancel,
  .btn-confirm-delete,
  .btn-confirm-ok {
    max-width: 100%;
  }
}
</style>
