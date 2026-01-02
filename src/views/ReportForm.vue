<template>
  <div class="page-wrapper">
    <div class="container">
      <!-- Back Button -->
      <button class="btn-back" @click="$router.back()">
        <svg
          class="back-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Kembali
      </button>

      <!-- Form Card -->
      <div class="form-card">
        <!-- Card Header -->
        <div class="form-header">
          <div class="header-icon">
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
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div class="header-content">
            <h2 class="form-title">Form Laporan</h2>
            <p class="form-subtitle">Laporkan barang hilang atau temuan Anda</p>
          </div>
        </div>

        <!-- Form Content -->
        <form @submit.prevent="submitReport" class="form-content">
          <!-- Jenis Laporan -->
          <div class="form-group">
            <label class="form-label">
              <svg
                class="label-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Nama Pelapor
              <span class="required">*</span>
            </label>
            <input
              type="text"
              v-model="form.reporterName"
              placeholder="Contoh: Ahmad Rizki"
              required
              class="form-input"
            />
            <p class="form-hint">Nama lengkap Anda sebagai pelapor</p>
          </div>
          <div class="form-group">
            <label class="form-label">
              <svg
                class="label-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Jenis Laporan
              <span class="required">*</span>
            </label>
            <div class="select-wrapper">
              <select v-model="form.type" required class="form-select">
                <option value="">-- Pilih Jenis Laporan --</option>
                <option value="Kehilangan">Kehilangan</option>
                <option value="Menemukan">Menemukan</option>
              </select>
              <svg
                class="select-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          <!-- Nama Barang -->
          <div class="form-group">
            <label class="form-label">
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
              <span class="required">*</span>
            </label>
            <input
              type="text"
              v-model="form.itemName"
              placeholder="Contoh: Dompet, Kunci, Tas, dll"
              required
              class="form-input"
            />
          </div>

          <!-- Deskripsi -->
          <div class="form-group">
            <label class="form-label">
              <svg
                class="label-icon"
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
              Deskripsi
              <span class="required">*</span>
            </label>
            <textarea
              v-model="form.description"
              placeholder="Jelaskan ciri-ciri barang secara detail (warna, ukuran, merek, dll)"
              required
              class="form-textarea"
              rows="4"
            ></textarea>
          </div>

          <!-- Lokasi -->
          <div class="form-group">
            <label class="form-label">
              <svg
                class="label-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Lokasi
              <span class="required">*</span>
            </label>
            <input
              type="text"
              v-model="form.location"
              placeholder="Contoh: Ruang Pameran A, Toilet Lantai 2, dll"
              required
              class="form-input"
            />
          </div>

          <!-- Tanggal -->
          <div class="form-group">
            <label class="form-label">
              <svg
                class="label-icon"
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
              {{
                form.type === "Kehilangan"
                  ? "Tanggal Kehilangan"
                  : form.type === "Menemukan"
                  ? "Tanggal Ditemukan"
                  : "Tanggal Kejadian"
              }}
              <span class="required">*</span>
            </label>
            <input
              type="date"
              v-model="form.date"
              required
              class="form-input"
            />
          </div>

          <!-- Kontak -->
          <div class="form-group">
            <label class="form-label">
              <svg
                class="label-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                />
              </svg>
              Kontak WhatsApp
              <span class="required">*</span>
            </label>
            <input
              type="text"
              v-model="form.contact"
              placeholder="Contoh: 628123456789 (dengan kode negara 62)"
              required
              class="form-input"
            />
            <p class="form-hint">
              Info: demi menjaga privasi, nama dan nomor telepon anda akan disembunyikan
            </p>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn-submit" :disabled="isSubmitting">
            <svg
              v-if="!isSubmitting"
              class="btn-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            <div v-else class="spinner"></div>
            {{ isSubmitting ? "Mengirim..." : "Kirim Laporan" }}
          </button>
        </form>
      </div>
    </div>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="showToast" :class="['toast', toastType]">
        <div class="toast-content">
          <div class="toast-icon">
            <svg
              v-if="toastType === 'error'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
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
          <div class="toast-message">
            <p class="toast-title">
              {{ toastType === "error" ? "Terjadi Kesalahan" : "Berhasil!" }}
            </p>
            <p class="toast-text">{{ toastMessage }}</p>
          </div>
        </div>
        <button @click="closeToast" class="toast-close">
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
    </Transition>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "vue-router";

const router = useRouter();
const showToast = ref(false);
const toastType = ref("success");
const toastMessage = ref("");
const isSubmitting = ref(false);

const form = reactive({
  reporterName: "",
  type: "",
  itemName: "",
  description: "",
  location: "",
  date: "",
  contact: "",
});

let toastTimeout;

const showNotification = (type, message) => {
  toastType.value = type;
  toastMessage.value = message;
  showToast.value = true;

  // Auto close after 5 seconds
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    closeToast();
  }, 5000);
};

const closeToast = () => {
  showToast.value = false;
  if (toastTimeout) clearTimeout(toastTimeout);
};

const submitReport = async () => {
  isSubmitting.value = true;

  if (!form.contact.startsWith("62")) {
    showNotification(
      "error",
      "Nomor kontak harus diawali dengan kode negara 62"
    );
    isSubmitting.value = false;
    return;
  }

  if (!/^[0-9]+$/.test(form.contact)) {
    showNotification("error", "Nomor kontak hanya boleh berisi angka");
    isSubmitting.value = false;
    return;
  }

  try {
    await addDoc(collection(db, "reports"), {
       reporterName: form.reporterName,
      itemName: form.itemName,
      type: form.type,
      description: form.description,
      location: form.location,
      date: form.date,
      contact: form.contact,
      status: "Masih berlangsung",
      createdBy: "pengunjung",
      isReadByAdmin: false,
      createdAt: serverTimestamp(),
    });

    showNotification(
      "success",
      "Laporan berhasil dikirim! Tim kami akan segera menindaklanjuti."
    );

    Object.assign(form, {
      reporterName: "",
      type: "",
      itemName: "",
      description: "",
      location: "",
      date: "",
      contact: "",
    });

    // Redirect after 2 seconds
    setTimeout(() => {
      router.push("/report");
    }, 4000);
  } catch (err) {
    showNotification(
      "error",
      "Terjadi kesalahan saat mengirim laporan. Silakan coba lagi."
    );
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f0e8 0%, #fdf8f3 100%);
  padding: 40px 20px;
}

.container {
  max-width: 700px;
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

/* Form Card */
.form-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Form Header */
.form-header {
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

.form-title {
  font-size: 28px;
  font-weight: 800;
  color: #2c3e50;
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.form-subtitle {
  font-size: 14px;
  color: #7f8c8d;
  margin: 0;
}

/* Form Content */
.form-content {
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
.form-input,
.form-select,
.form-textarea {
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

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #5d9c9c;
  background: white;
  box-shadow: 0 0 0 4px rgba(93, 156, 156, 0.1);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #bbb;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

/* Select Wrapper */
.select-wrapper {
  position: relative;
}

.form-select {
  appearance: none;
  padding-right: 40px;
  cursor: pointer;
}

.select-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  stroke: #7f8c8d;
  pointer-events: none;
}

.form-hint {
  font-size: 14px;
  color: #7f8c8d;
  margin-top: 6px;
  margin-left: 4px;
}

/* Submit Button */
.btn-submit {
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

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(93, 156, 156, 0.4);
}

.btn-submit:disabled {
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

/* Toast Notification */
.toast {
  position: fixed;
  top: 100px;
  right: 24px;
  min-width: 350px;
  max-width: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  padding: 20px;
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.toast.error {
  border-left: 4px solid #e74c3c;
}

.toast.success {
  border-left: 4px solid #27ae60;
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

.toast.success .toast-icon {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
}

.toast-icon svg {
  width: 22px;
  height: 22px;
}

.toast.error .toast-icon svg {
  stroke: #e74c3c;
}

.toast.success .toast-icon svg {
  stroke: #27ae60;
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

  .form-header {
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }

  .form-title {
    font-size: 24px;
  }

  .form-content {
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
