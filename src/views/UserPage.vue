<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/userStore.js'

const userStore = useUserStore()

const formUserName = ref('')
const formUserAction = ref('')
const editId = ref(null)

// 加载用户
onMounted(() => {
  userStore.fetchUsers()
})

// 新增或编辑提交
async function submitForm() {
  const userData = {
    user_name: formUserName.value.trim(),
    user_action: formUserAction.value.trim(),
  }
  if (!userData.user_name || !userData.user_action) {
    alert('请填写完整的用户名和行为')
    return
  }

  if (editId.value === null) {
    // 新增
    await userStore.addUser(userData)
  } else {
    // 编辑
    await userStore.editUser(editId.value, userData)
  }
  clearForm()
}

// 编辑按钮填充表单
function startEdit(user) {
  editId.value = user.id
  formUserName.value = user.user_name
  formUserAction.value = user.user_action
}

// 清空表单
function clearForm() {
  editId.value = null
  formUserName.value = ''
  formUserAction.value = ''
}

// 删除用户
async function deleteUser(id) {
  if (confirm('确认删除该用户？')) {
    await userStore.removeUser(id)
  }
}
</script>

<template>
  <h1>用户管理</h1>

  <form @submit.prevent="submitForm">
    <input v-model="formUserName" placeholder="用户名" />
    <input v-model="formUserAction" placeholder="用户行为" />
    <button type="submit">{{ editId === null ? '添加' : '更新' }}</button>
    <button type="button" @click="clearForm">清空</button>
  </form>

  <div v-if="userStore.loading">加载中...</div>
  <div v-if="userStore.error" style="color:red;">{{ userStore.error }}</div>

  <ul>
    <li v-for="user in userStore.users" :key="user.id">
      {{ user.user_name }} - {{ user.user_action }}
      <button @click="startEdit(user)">编辑</button>
      <button @click="deleteUser(user.id)">删除</button>
    </li>
  </ul>
</template>
