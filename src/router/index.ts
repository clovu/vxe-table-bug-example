import { App } from "vue";
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      // 懒加载 tree table，通过 insert 函数新增数据会插入重复数据 
      // https://github.com/x-extends/vxe-table/issues/2320
      path: '/2320',
      component: () => import('../views/2320.vue')
    },
    {
      // 如果存在新增数据，getRowIndex 函数返回的行号错乱
      // https://github.com/x-extends/vxe-table/issues/2479
      path: '/2479',
      component: () => import('../views/2479.vue')
    },{
      // 如果存在新增数据，getRowIndex 函数返回的行号错乱
      // https://github.com/x-extends/vxe-table/issues/2479
      path: '/2509',
      component: () => import('../views/2509.vue')
    }
  ]
})

export function useRouter(app: App) {
  app.use(router)
}
