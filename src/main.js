// main.js 或 main.ts
import { createApp } from 'vue'
import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue'
import UserPage from './views/UserPage.vue'

import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

// 定义路由
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HelloWorld,
    props: route => ({ msg: 'whale.ai' }) // 通过 query 传递，默认 Welcome
  },
  {
    path: '/user',
    name: 'UserPage', 
    component: UserPage
  }
]

const app = createApp(App)

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})
app.use(router)


const pinia = createPinia()
app.use(pinia)  // 注册 Pinia

app.mount('#app')
