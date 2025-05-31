import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// 路由配置
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/HomeView.vue')
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('./views/GalleryView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/AboutView.vue')
    }
  ]
})

// 创建Vue应用实例
const app = createApp(App)

// 使用路由
app.use(router)

// 挂载应用
app.mount('#app')
