import { App } from "vue";
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/two-rows-of-the-same-data-when-a-new-row-is-insertee-when-layz-enable',
      component: () => import('../views/two-rows-of-the-same-data-when-a-new-row-is-insertee-when-layz-enable.vue')
    }
  ]
})

export function useRouter(app: App) {
  app.use(router)
}