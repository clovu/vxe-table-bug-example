import { createApp } from 'vue'
import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import App from './App.vue'

import { useRouter } from './router'
import './style.css'

const app = createApp(App)

app.use(VXETable)
app.use(VxeUI)
useRouter(app)

app.mount('#app')

