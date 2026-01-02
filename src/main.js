import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { initAuthListener } from "./AuthListener"
import "./style.css"


const app = createApp(App)

app.use(router)

initAuthListener()

app.mount("#app")