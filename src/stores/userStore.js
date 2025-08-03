// Pinia状态管理
import { defineStore } from 'pinia'
import { getUsers, createUser, updateUser, deleteUser } from '../api/user.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        this.users = await getUsers()
      } catch (e) {
        this.error = e.message || '获取用户失败'
      } finally {
        this.loading = false
      }
    },
    async addUser(data) {
      this.loading = true
      this.error = null
      try {
        await createUser(data)
        await this.fetchUsers()
      } catch (e) {
        this.error = e.message || '创建用户失败'
      } finally {
        this.loading = false
      }
    },
    async editUser(id, data) {
      this.loading = true
      this.error = null
      try {
        await updateUser(id, data)
        await this.fetchUsers()
      } catch (e) {
        this.error = e.message || '更新用户失败'
      } finally {
        this.loading = false
      }
    },
    async removeUser(id) {
      this.loading = true
      this.error = null
      try {
        await deleteUser(id)
        await this.fetchUsers()
      } catch (e) {
        this.error = e.message || '删除用户失败'
      } finally {
        this.loading = false
      }
    },
  },
})
