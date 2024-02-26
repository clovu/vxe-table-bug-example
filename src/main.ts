import { createApp } from 'vue'
import './style.css'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import App from './App.vue'
import { useRouter } from './router'

const app = createApp(App)

app.use(VXETable)
useRouter(app)

app.mount('#app')

