<template>
  <div class="dashboard">
    <h2>Dashboard Laporan</h2>

    <!-- STAT CARDS -->
    <div class="stats">
      <div class="card">
        <p>Total Laporan</p>
        <h3>{{ total }}</h3>
      </div>

      <div class="card lost">
        <p>Kehilangan</p>
        <h3>{{ lost }}</h3>
      </div>

      <div class="card found">
        <p>Menemukan</p>
        <h3>{{ found }}</h3>
      </div>
    </div>

    <!-- CHART -->
    <div class="charts">
      <div class="chart-box">
        <div class="header">
        <h4>Laporan Berdasarkan Jenis</h4>
        <div class="chart-filter">
          <input type="date" v-model="startDate" />
          <input type="date" v-model="endDate" />

          <button @click="applyFilter">Terapkan</button>
          <button @click="downloadCSVlaporan">⬇ Download Laporan</button>
        </div>
        </div>
        <canvas ref="barChart"></canvas>
      </div>

      <div class="chart-box">
        <div class="header">
        <h4>Laporan Berdasarkan Pembuat</h4>
        <div class="chart-filter">
        <button @click="downloadCSVcreatedby">⬇ Download Laporan</button>
        </div>
        </div>
        <canvas ref="createdByChart"></canvas>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Chart from "chart.js/auto";

const reports = ref([]);

const startDate = ref("");
const endDate = ref("");

const barChart = ref(null);
const pieChart = ref(null);

let barInstance = null;
let pieInstance = null;
const createdByChart = ref(null);
let createdByInstance = null;


onMounted(() => {
  onSnapshot(collection(db, "reports"), (snap) => {
    reports.value = snap.docs.map((d) => d.data());
  });
});

/* STAT */
const total = computed(() => reports.value.length);
const lost = computed(
  () => reports.value.filter((r) => r.type === "Kehilangan").length
);
const found = computed(
  () => reports.value.filter((r) => r.type === "Menemukan").length
);

/* WATCH DATA */
watch(
  reports,
  () => {
    setTimeout(() => {
      renderBar();
      renderCreatedBy();
    }, 0);
  },
  { deep: true }
);

const filteredReports = () => {
  return reports.value.filter((r) => {
    if (!r.createdAt) return false;

    const date = r.createdAt.toDate().toISOString().slice(0, 10);

    if (startDate.value && date < startDate.value) return false;
    if (endDate.value && date > endDate.value) return false;

    return true;
  });
};

/* BAR CHART */
const renderBar = () => {
  if (!barChart.value) return;

  const map = {};

  filteredReports().forEach((r) => {
    if (!r.createdAt) return;

    const date = r.createdAt.toDate().toISOString().slice(0, 10);

    if (!map[date]) {
      map[date] = { Kehilangan: 0, Menemukan: 0 };
    }

    if (r.type === "Kehilangan") map[date].Kehilangan++;
    if (r.type === "Menemukan") map[date].Menemukan++;
  });

  const labels = Object.keys(map).sort();

  const kehilanganData = labels.map((d) => map[d].Kehilangan);
  const menemukanData = labels.map((d) => map[d].Menemukan);

  if (barInstance) barInstance.destroy();

  barInstance = new Chart(barChart.value, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Kehilangan",
          data: kehilanganData,
          backgroundColor: "rgba(232, 165, 156, 0.8)",
          borderColor: "#e8a59c",
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
        {
          label: "Menemukan",
          data: menemukanData,
          backgroundColor: "rgba(127, 182, 158, 0.8)",
          borderColor: "#7fb69e",
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          align: "end",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 15,
            font: {
              size: 13,
              weight: "600",
              family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            },
            color: "#2c3e50",
          },
        },
        tooltip: {
          backgroundColor: "rgba(44, 62, 80, 0.9)",
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            size: 14,
            weight: "700",
          },
          bodyFont: {
            size: 13,
          },
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 1,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
            drawBorder: false,
          },
          ticks: {
            font: {
              size: 12,
              weight: "600",
            },
            color: "#7f8c8d",
            padding: 10,
          },
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            font: {
              size: 12,
              weight: "600",
            },
            color: "#7f8c8d",
            padding: 10,
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
    },
  });
};

const renderCreatedBy = () => {
  if (!createdByChart.value) return;

  const map = {};

  filteredReports().forEach((r) => {
    if (!r.createdAt) return;

    const date = r.createdAt.toDate().toISOString().slice(0, 10);

    if (!map[date]) {
      map[date] = { admin: 0, pengunjung: 0 };
    }

    if (r.createdBy === "admin") map[date].admin++;
    else map[date].pengunjung++;
  });

  const labels = Object.keys(map).sort();

  const adminData = labels.map((d) => map[d].admin);
  const pengunjungData = labels.map((d) => map[d].pengunjung);

  if (createdByInstance) createdByInstance.destroy();

  createdByInstance = new Chart(createdByChart.value, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Admin",
          data: adminData,
          backgroundColor: "rgba(93, 156, 156, 0.8)",
          borderColor: "#5d9c9c",
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
        {
          label: "Pengunjung",
          data: pengunjungData,
          backgroundColor: "rgba(212, 165, 116, 0.8)",
          borderColor: "#d4a574",
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          align: "end",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 15,
            font: {
              size: 13,
              weight: "600",
              family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            },
            color: "#2c3e50",
          },
        },
        tooltip: {
          backgroundColor: "rgba(44, 62, 80, 0.9)",
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            size: 14,
            weight: "700",
          },
          bodyFont: {
            size: 13,
          },
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 1,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
            drawBorder: false,
          },
          ticks: {
            font: {
              size: 12,
              weight: "600",
            },
            color: "#7f8c8d",
            padding: 10,
          },
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            font: {
              size: 12,
              weight: "600",
            },
            color: "#7f8c8d",
            padding: 10,
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
    },
  });
};

const applyFilter = () => {
  renderBar();
  renderCreatedBy();
};

const downloadCSVlaporan = () => {
  let csv = "Tanggal,Kehilangan,Menemukan\n";

  const map = {};

  filteredReports().forEach((r) => {
    const date = r.createdAt.toDate().toISOString().slice(0, 10);

    if (!map[date]) {
      map[date] = { Kehilangan: 0, Menemukan: 0 };
    }

    if (r.type === "Kehilangan") map[date].Kehilangan++;
    if (r.type === "Menemukan") map[date].Menemukan++;
  });

  Object.keys(map)
    .sort()
    .forEach((d) => {
      csv += `${d},${map[d].Kehilangan},${map[d].Menemukan}\n`;
    });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "laporan-Masuk.csv";
  a.click();
};

const downloadCSVcreatedby = () => {
  let csv = "Tanggal,Admin,Pengunjung\n";

  const map = {};

  filteredReports().forEach((r) => {
    if (!r.createdAt) return;

    const date = r.createdAt.toDate().toISOString().slice(0, 10);

    if (!map[date]) {
      map[date] = { admin: 0, pengunjung: 0 };
    }

    if (r.createdBy === "admin") {
      map[date].admin++;
    } else {
      map[date].pengunjung++;
    }
  });

  Object.keys(map)
    .sort()
    .forEach((d) => {
      csv += `${d},${map[d].admin},${map[d].pengunjung}\n`;
    });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "laporan-created-by.csv";
  a.click();

  URL.revokeObjectURL(url);
};

</script>
<style scoped>
.dashboard {
  max-width: 1800px;
  margin: 0;
  padding: 40px;
}

.dashboard h2 {
  font-size: 32px;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 30px;
}

/* STATS CARDS */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  border-left: 6px solid #5d9c9c;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(93, 156, 156, 0.15);
}

.card p {
  font-size: 14px;
  font-weight: 600;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.card h3 {
  font-size: 36px;
  font-weight: 800;
  color: #2c3e50;
  margin: 0;
}

.lost {
  border-color: #e8a59c;
}

.lost:hover {
  box-shadow: 0 8px 25px rgba(232, 165, 156, 0.15);
}

.found {
  border-color: #7fb69e;
}

.found:hover {
  box-shadow: 0 8px 25px rgba(127, 182, 158, 0.15);
}

/* CHARTS */
.charts {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.chart-box {
  background: white;
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  height: 420px;
}

.chart-box h4 {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

/* CHART FILTERS */
.chart-filter {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.chart-filter input[type="date"] {
  padding: 10px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #2c3e50;
  transition: all 0.3s ease;
  background: #fdf8f3;
}

.chart-filter input[type="date"]:focus {
  outline: none;
  border-color: #5d9c9c;
  background: white;
}

.chart-filter button {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}


.chart-filter button:first-of-type {
  background: linear-gradient(135deg, #5d9c9c 0%, #4a8080 100%);
  color: white;
}

.chart-filter button:first-of-type:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(93, 156, 156, 0.3);
}

.chart-filter button:last-of-type,
.header > button {
  background: linear-gradient(135deg, #e8a59c 0%, #d89186 100%);
  color: white;
}

.chart-filter button:last-of-type:hover,
.header > button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(232, 165, 156, 0.3);
}

canvas {
  width: 100% !important;
  height: calc(100% - 60px) !important;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .dashboard {
    padding: 20px;
  }

  .dashboard h2 {
    font-size: 24px;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .chart-box {
    height: 350px;
    padding: 20px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .chart-filter {
    width: 100%;
  }

  .chart-filter input[type="date"],
  .chart-filter button {
    flex: 1;
    min-width: 120px;
  }
}
</style>
