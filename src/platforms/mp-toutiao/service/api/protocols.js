// 不支持的 API 列表
const TODOS = [
  'hideKeyboard'
]

// 需要做转换的 API 列表
const protocols = {}

TODOS.forEach(todoApi => {
  protocols[todoApi] = false
})

export default protocols
