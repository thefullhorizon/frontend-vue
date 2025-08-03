// 封装API请求
// | 类型    | 路径         | 功能                |
// | ------ | ------------ | ------------------ |
// | POST   | `/users`     | [增]创建用户         |
// | DELETE | `/users/:id` | [删]删除用户         |
// | PUT    | `/users/:id` | [改]修改用户-全量更新 |
// | PATCH  | `/users/:id` | [改]修改用户-局部更新 |
// | GET    | `/users`     | [查]获取用户列表     |
// | GET    | `/users/:id` | [查]获取指定用户     |

const baseUrl = import.meta.env.VITE_API_BASE_URL

async function request(path, options = {}) {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error("[API ERROR]", error)
    throw error
  }
}

// 创建用户
export function createUser(data) {
  return request('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// 删除用户
export function deleteUser(id) {
  return request(`/users/${id}`, {
    method: 'DELETE',
  })
}

// 更新用户
export function updateUser(id, data) {
  return request(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

// 获取用户列表
export function getUsers() {
  return request('/users')
}

// 根据ID获取用户详情
export function getUserById(id) {
  return request(`/users/${id}`)
}