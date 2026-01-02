import { createRouter, createWebHistory } from "vue-router";

import LadingPage from "../views/LadingPage.vue";
import ReportForm from "../views/ReportForm.vue";
import ReportList from "../views/ReportList.vue";
import ReportDetail from "../views/ReportDetail.vue";
import Login from "../views/Login.vue";

import AdminLayout from "../layouts/AdminLayout.vue"
import Dashboard from "../views/admin/Dashboard.vue"
import Workspace from "../views/admin/Workspace.vue"
import Laporan from "../views/admin/Laporan.vue"

import { getAuth } from "firebase/auth"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../firebase"

const routes = [
  { path: "/login", component: Login },
  {
    path: "/",
    name: "LadingPage",
    component: LadingPage,
  },
  {
    path: "/report/create",
    name: "ReportForm",
    component: ReportForm,
  },
  {
    path: "/report",
    name: "ReportList",
    component: ReportList,
  },
  {
    path: "/report/:id",
    name: "report-detail",
    component: ReportDetail,
  }, 
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "", redirect: "/admin/dashboard" },
      { path: "dashboard", component: Dashboard },
      { path: "workspace", component: Workspace },
      { path: "laporan", component: Laporan }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (!to.meta.requiresAdmin) return true

  const auth = getAuth()
  const user = auth.currentUser

  if (!user) return "/login"

  try {
    const snap = await getDoc(
      doc(db, "users", user.uid)
    )

    if (!snap.exists()) return "/"

    if (snap.data().role !== "admin") {
      return "/"
    }

    return true
  } catch (err) {
    console.error("Router guard error:", err)
    return "/"
  }
})


export default router;
