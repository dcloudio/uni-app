export function registerPlus (newPlus) {
  // 确保 plus 是 app-service 中的
  if (plus !== newPlus) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[registerPlus][${Date.now()}]`)
    }
    plus = newPlus
  }
}
