<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/userStore.js'

const userStore = useUserStore()

const formUserName = ref('')
const formUserAction = ref('')
const editId = ref(null)
const showDialog = ref(false)

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
  showDialog.value = false
}

// 编辑按钮填充表单
function startEdit(user) {
  editId.value = user.id
  formUserName.value = user.user_name
  formUserAction.value = user.user_action
  showDialog.value = true
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

// 新增按钮点击
function openAddDialog() {
  clearForm()
  showDialog.value = true
}

// 关闭弹窗
function closeDialog() {
  showDialog.value = false
}
</script>

<template>
  <div class="user-page-container">
    <div class="user-page-content">
      <div class="user-list" v-if="!userStore.loading">
        <div class="user-list-header">
          <h2 class="center-title">用户列表</h2>
        </div>
        <ul v-if="userStore.users && userStore.users.length > 0">
          <li v-for="user in userStore.users" :key="user.id" class="user-item">
            <div class="user-info">
              <span class="user-name">{{ user.user_name }}</span>
              <span class="user-action">{{ user.user_action }}</span>
            </div>
            <div class="user-actions">
              <button @click="startEdit(user)" class="btn btn-edit">编辑</button>
              <button @click="deleteUser(user.id)" class="btn btn-delete">删除</button>
              <button class="btn btn-add" @click="openAddDialog">新增</button>
            </div>
          </li>
        </ul>
        <div v-else class="no-users">
          暂无用户数据
        </div>
      </div>
      <div v-if="userStore.loading" class="loading">加载中...</div>
      <div v-if="userStore.error" class="error">{{ userStore.error }}</div>
    </div>

    <!-- 全屏弹窗 -->
    <div v-if="showDialog" class="dialog-overlay">
      <div class="dialog-content">
        <button class="dialog-close" @click="closeDialog">×</button>
        <form @submit.prevent="submitForm" class="user-form">
          <h2 class="center-title">新增用户</h2>
          <div class="form-row">
            <input 
              v-model="formUserName" 
              placeholder="用户名" 
              class="form-input"
            />
            <input 
              v-model="formUserAction" 
              placeholder="用户行为" 
              class="form-input"
            />
          </div>
          <div class="form-buttons">
            <button type="submit" class="btn btn-primary">
              {{ editId === null ? '添加' : '更新' }}
            </button>
            <button type="button" @click="clearForm" class="btn btn-secondary">
              清空
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 20px;
}

.user-page-content {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
}

.user-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.user-list h2 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin: 0;
}

.user-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-item {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.user-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 600;
  color: #2c3e50;
  margin-right: 15px;
}

.user-action {
  color: #6c757d;
  font-style: italic;
}

.user-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #1976d2;
  color: white;
}

.btn-primary:hover {
  background-color: #1565c0;
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
  transform: translateY(-1px);
}

.btn-edit {
  background-color: #28a745;
  color: white;
  padding: 6px 12px;
  font-size: 12px;
}

.btn-edit:hover {
  background-color: #218838;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
  padding: 6px 12px;
  font-size: 12px;
}

.btn-delete:hover {
  background-color: #c82333;
}

.btn-add {
  background-color: #1976d2;
  color: white;
  padding: 6px 12px;
  font-size: 12px;
}
.btn-add:hover {
  background-color: #1565c0;
}

.loading {
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 20px;
}

.error {
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 20px;
  text-align: center;
}

.no-users {
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 40px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

/* 全屏弹窗样式 */
.dialog-overlay {
  position: fixed;
  z-index: 9999;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-content {
  background: #fff;
  width: 400px;
  height: 300px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  padding: 32px 24px 24px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.dialog-close {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: #888;
  cursor: pointer;
}

.user-form {
  margin-bottom: 0;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.form-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
}

.form-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.center-title {
  width: 100%;
  text-align: center;
  margin: 0 auto 20px auto;
  display: block;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .user-page-container {
    padding: 10px;
  }
  .user-page-content {
    padding: 20px;
    max-height: 90vh;
  }
  .dialog-content {
    width: 90vw;
    height: 320px;
    padding: 16px 8px 8px 8px;
  }
  .form-row {
    flex-direction: column;
  }
  .user-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .user-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>