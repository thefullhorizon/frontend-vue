<script setup>
import { ref } from 'vue'

// 接受父组件传递进来的属性
defineProps({
  msg: String,
})
// 定义本组件的数据
const count = ref(0)

// 定义函数
function increment() {
  count.value++
}

</script>

<template>
  <div class="hello-container">
    
    <h1>{{ msg }}</h1>

    <div class="card">
      <button type="button" @click="count++">count is {{ count }}</button>
    </div>

    <p>
      The official Vue
      <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
        >create-vue</a
      >.
    </p>
      <div class="card">
      <p>
        Code
        <code>components/HelloWorld.vue</code>
      </p>
    </div>
  
  </div>
</template>

<style scoped>
.hello-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  text-align: center;
}

.hello-container h1 {
  margin-bottom: 30px;
  font-size: 2.5rem;
  color: #2c3e50;
}

.card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 30px;
  margin: 20px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.card button {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 15px;
}

.card button:hover {
  background-color: #1565c0;
}

.card p {
  margin: 10px 0;
  color: #666;
  line-height: 1.6;
}

.card code {
  background-color: #f1f3f4;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #d73a49;
}

.hello-container > p {
  margin: 15px 0;
  max-width: 600px;
  line-height: 1.6;
  color: #555;
}

.hello-container a {
  color: #1976d2;
  text-decoration: none;
  font-weight: 500;
}

.hello-container a:hover {
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hello-container {
    padding: 20px 15px;
  }
  
  .hello-container h1 {
    font-size: 2rem;
  }
  
  .card {
    padding: 20px;
    margin: 15px 0;
  }
}
</style>