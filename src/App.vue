<template>
  <div class="app-container">
    <!-- 顶部统一头部 -->
    <div class="app-header">
      <div class="logo">
        🐋 WhaleBI
      </div>
    </div>
    
    <!-- 下方左右分割区域 -->
    <div class="app-body">
      <!-- 左侧导航栏 -->
      <div class="sidebar">
        <nav class="nav-menu">
          <router-link to="/home" class="nav-item" active-class="active">
            <span class="nav-icon">🏠</span>
            HomePage
          </router-link>
          
          <router-link to="/user" class="nav-item" active-class="active">
            <span class="nav-icon">👤</span>
            UserPage
          </router-link>
        </nav>
        
        <!-- 底部用户信息 -->
        <div class="user-info">
          <span class="user-icon">👤</span>
          Blyn
          <span class="settings-icon">⚙️</span>
        </div>
      </div>
      
      <!-- 右侧主内容区 -->
      <div class="main-content">
        <!-- 路由视图 - 占满整个右侧区域 -->
        <div class="content-body">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 顶部统一头部样式 */
.app-header {
  height: 60px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.logo {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

/* 下方左右分割区域 */
.app-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* 左侧导航栏样式 */
.sidebar {
  width: 200px;
  background-color: #f8f9fa;
  border-right: 1px solid #e1e5e9;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.nav-menu {
  flex: 1;
  padding: 16px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: #5a6c7d;
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background-color: #e9ecef;
  color: #2c3e50;
}

.nav-item.active {
  background-color: #e7f3ff;
  color: #1976d2;
  border-left-color: #1976d2;
}

.nav-icon {
  margin-right: 8px;
  font-size: 16px;
}

.user-info {
  padding: 16px;
  border-top: 1px solid #e1e5e9;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #5a6c7d;
  font-size: 14px;
}

.user-icon {
  font-size: 16px;
}

.settings-icon {
  margin-left: auto;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.settings-icon:hover {
  background-color: #e9ecef;
}

/* 右侧主内容区样式 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.content-body {
  flex: 1;
  display: flex;
  overflow-y: auto;
}

/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar {
    width: 60px;
  }
  
  .nav-item span:not(.nav-icon) {
    display: none;
  }
  
  .user-info span:not(.user-icon) {
    display: none;
  }
}
</style>