// src/api/index.js
const baseUrl = import.meta.env.VITE_API_BASE_URL

// 封装请求函数
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
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error("[API ERROR]", error)
    throw error
  }
}

// 封装具体的接口方法
export function getUsers() {
  return request('/users')
}

// 可以继续封装其他接口
// export function createUser(data) {
//   return request('/users', {
//     method: 'POST',
//     body: JSON.stringify(data)
//   })
// }
