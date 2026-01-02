<template>
  <div class="workspace">
    <!-- SIDEBAR / CHATLIST -->
    <aside class="list">
      <div class="list-header">
        <h3>Laporan Masuk</h3>
        <div class="report-count">{{ reports.length }}</div>
      </div>

      <div class="list-items">
        <div
          v-for="r in reports"
          :key="r.id"
          class="list-item"
          :class="{ active: selected?.id === r.id }"
          @click="selectReport(r)"
        >
          <div
            class="item-icon"
            :class="r.type === 'Kehilangan' ? 'lost' : 'found'"
          >
            <svg
              v-if="r.type === 'Kehilangan'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <svg
              v-else
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>

          <div class="item-content">
            <div class="title">
              {{ r.reporterName || "Pengunjung" }}
              <span v-if="!r.isReadByAdmin" class="badge">NEW</span>
            </div>
            <div class="meta">
              <span
                class="type-badge"
                :class="r.type === 'Kehilangan' ? 'lost' : 'found'"
              >
                {{ r.type }}
              </span>
              <span class="date">{{ formatDate(r.createdAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- DETAIL -->
    <section class="detail" v-if="selected">
      <div class="detail-header">
        <div class="info-card">
          <h2>Nama Pelapor : {{ selected.reporterName || "-" }}</h2>
          <span
            class="status-badge"
            :class="selected.status === 'Selesai' ? 'closed' : 'open'"
          >
            {{ selected.status }}
          </span>
        </div>
      </div>

      <div class="detail-content">
        <div class="info-section">
          <div class="info-card">
            <div class="info-label">
              <svg
                class="label-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
              Nama Barang
            </div>
            <p class="info-value">{{ selected.itemName }}</p>
          </div>
          <div class="info-card">
            <div class="info-label">
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
              Deskripsi
            </div>
            <p class="info-value">{{ selected.description || "-" }}</p>
          </div>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Lokasi
            </div>
            <p class="info-value">{{ selected.location }}</p>
          </div>

          <div class="info-item">
            <div class="info-label">
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
              Tanggal Kejadian
            </div>
            <p class="info-value">{{ selected.date }}</p>
          </div>

          <div class="info-item">
            <div class="info-label">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                />
              </svg>
              Kontak
            </div>
            <p class="info-value">{{ selected.contact || "-" }}</p>
          </div>

          <div class="info-item">
            <div class="info-label">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                />
              </svg>
              Jenis Laporan
            </div>
            <p class="info-value">
              <span
                class="type-badge-large"
                :class="selected.type === 'Kehilangan' ? 'lost' : 'found'"
              >
                {{ selected.type }}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="actions">
        <button class="btn-status" @click="toggleStatus">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              v-if="selected.status === 'Selesai'"
              d="M18 6L6 18M6 6l12 12"
            />
            <polyline v-else points="20 6 9 17 4 12" />
          </svg>
          {{
            selected.status === "Selesai" ? "Buka Kembali" : "Tandai Selesai"
          }}
        </button>

        <button
          class="btn-wa"
          :disabled="selected.status === 'Selesai'"
          @click="hubungiPelapor"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
            />
          </svg>
          Hubungi Pelapor
        </button>
      </div>
    </section>

    <section v-else class="empty">
      <div class="empty-state">
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
        <h3>Pilih Laporan</h3>
        <p>
          Pilih salah satu laporan dari daftar di samping untuk melihat
          detailnya
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";

const reports = ref([]);
const selected = ref(null);

// Format date helper
const formatDate = (timestamp) => {
  if (!timestamp) return "-";
  const date = timestamp.toDate();
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

onMounted(() => {
  const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));

  onSnapshot(q, (snap) => {
    const all = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    reports.value = all.filter(
      (r) => r.createdBy?.toLowerCase() === "pengunjung"
    );

    // 🔥 SINKRONKAN SELECTED
    if (selected.value) {
      selected.value =
        reports.value.find((r) => r.id === selected.value.id) || null;
    }
  });
});

const selectReport = async (report) => {
  selected.value = report;

  if (!report.isReadByAdmin) {
    await updateDoc(doc(db, "reports", report.id), {
      isReadByAdmin: true,
    });
  }
};

const toggleStatus = async () => {
  if (!selected.value) return;

  const newStatus =
    selected.value.status === "Selesai" ? "Masih berlangsung" : "Selesai";

  await updateDoc(doc(db, "reports", selected.value.id), {
    status: newStatus,
  });

  // optional instant update
  selected.value.status = newStatus;
};

const hubungiPelapor = () => {
  const report = selected.value;
  if (!report || !report.contact) {
    alert("Nomor kontak pelapor tidak tersedia");
    return;
  }

  let message = "";

  if (report.type === "Kehilangan") {
    message = `
Halo ${report.reporterName || "Bapak/Ibu"}, kami dari Admin Temu.

Kami menerima laporan *KEHILANGAN* dengan detail:
- Nama Barang: ${report.itemName}
- Lokasi: ${report.location}
- Tanggal: ${report.date}

Saat ini status laporan: *${report.status}*.

Jika ada informasi tambahan, silakan dibalas melalui WhatsApp ini.
Terima kasih.
`;
  } else {
    message = `
Halo ${report.reporterName || "Bapak/Ibu"}, kami dari Admin Temu.

Kami menerima laporan *MENEMUKAN BARANG* dengan detail:
- Nama Barang: ${report.itemName}
- Lokasi: ${report.location}
- Tanggal: ${report.date}

Saat ini status laporan: *${report.status}*.

Mohon kesediaannya untuk koordinasi lebih lanjut.
Terima kasih.
`;
  }

  const waUrl = `https://wa.me/${report.contact}?text=${encodeURIComponent(
    message
  )}`;

  window.open(waUrl, "_blank");
};
</script>

<style scoped>
.workspace {
  display: flex;
  height: 100%;
  background: linear-gradient(135deg, #f5f0e8 0%, #fdf8f3 100%);
}

/* SIDEBAR LIST */
.list {
  width: 360px;
  background: white;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.list-header {
  padding: 24px;
  border-bottom: 2px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #5d9c9c 0%, #4a8080 100%);
}

.list-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: white;
}

.report-count {
  background: white;
  color: #5d9c9c;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
}

.list-items {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

.list-item {
  display: flex;
  gap: 12px;
  padding: 14px;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.list-item:hover {
  background: #f8f9fa;
  border-color: #e0e0e0;
}

.list-item.active {
  background: linear-gradient(135deg, #e8f5f5 0%, #f0f8f8 100%);
  border-color: #5d9c9c;
  box-shadow: 0 2px 8px rgba(93, 156, 156, 0.15);
}

.item-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.item-icon.lost {
  background: linear-gradient(135deg, #ffe5e0 0%, #ffd4cc 100%);
  color: #e8a59c;
}

.item-icon.found {
  background: linear-gradient(135deg, #e0f5ea 0%, #ccf0dd 100%);
  color: #7fb69e;
}

.item-icon svg {
  width: 22px;
  height: 22px;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 15px;
  color: #2c3e50;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.badge {
  background: linear-gradient(135deg, #e8a59c 0%, #d89186 100%);
  color: white;
  font-size: 10px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 12px;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

.meta {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
  font-size: 12px;
}

.type-badge {
  padding: 3px 10px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 11px;
}

.type-badge.lost {
  background: #ffe5e0;
  color: #e8a59c;
}

.type-badge.found {
  background: #e0f5ea;
  color: #7fb69e;
}

.date {
  color: #7f8c8d;
  font-weight: 500;
}

/* DETAIL SECTION */
.detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 32px;
}

.detail-header {
}

.detail-header h2 {
  font-size: 28px;
  font-weight: 800;
  color: #2c3e50;
  margin: 0 0 12px 0;
}

.status-badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.status-badge.open {
  background: linear-gradient(135deg, #e0f5ea 0%, #ccf0dd 100%);
  color: #7fb69e;
}

.status-badge.closed {
  background: linear-gradient(135deg, #e8e8e8 0%, #d4d4d4 100%);
  color: #7f8c8d;
}

.detail-content {
  flex: 1;
}

.info-card {
  background: white;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  width: 100%;
}

.info-section {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.info-item {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.info-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.info-label svg {
  width: 16px;
  height: 16px;
  stroke: #5d9c9c;
}

.info-value {
  font-size: 15px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  line-height: 1.6;
}

.type-badge-large {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
}

.type-badge-large.lost {
  background: linear-gradient(135deg, #ffe5e0 0%, #ffd4cc 100%);
  color: #e8a59c;
}

.type-badge-large.found {
  background: linear-gradient(135deg, #e0f5ea 0%, #ccf0dd 100%);
  color: #7fb69e;
}

/* ACTIONS */
.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 2px solid #f0f0f0;
}

button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  font-size: 15px;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

button svg {
  width: 18px;
  height: 18px;
}

.btn-status {
  background: linear-gradient(135deg, #5d9c9c 0%, #4a8080 100%);
  color: white;
}

.btn-status:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(93, 156, 156, 0.3);
}

.btn-wa {
  background: linear-gradient(135deg, #25d366 0%, #20b858 100%);
  color: white;
}

.btn-wa:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.3);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

/* EMPTY STATE */
.empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state {
  text-align: center;
  max-width: 400px;
  padding: 40px;
}

.empty-state svg {
  width: 80px;
  height: 80px;
  stroke: #cbd5e1;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 24px;
  font-weight: 800;
  color: #2c3e50;
  margin: 0 0 12px 0;
}

.empty-state p {
  font-size: 15px;
  color: #7f8c8d;
  line-height: 1.6;
  margin: 0;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .workspace {
    flex-direction: column;
  }

  .list {
    width: 100%;
    max-height: 40vh;
  }

  .detail {
    padding: 20px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .actions {
    flex-direction: column;
  }

  button {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .list {
    width: 100%;
  }

  .detail-header h2 {
    font-size: 22px;
  }

  .list-item {
    padding: 12px;
  }

  .item-icon {
    width: 40px;
    height: 40px;
  }
}
</style>
