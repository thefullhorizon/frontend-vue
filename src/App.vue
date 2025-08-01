<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])

onMounted(async () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  console.log("[App.vue] URL:", `${baseUrl}/users`)
  try {
    const res = await fetch(`${baseUrl}/users`)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data = await res.json()
    console.log("[App.vue] 获取到用户数据:", data)
    users.value = data
  } catch (error) {
    console.error("[App.vue] fetch 请求出错:", error)
  }
})
</script>

<template>
  <h1>用户列表</h1>
  <ul>
    <li v-for="user in users" :key="user.id">
      {{ user.user_name }} - {{ user.user_action }}
    </li>
  </ul>
</template>
