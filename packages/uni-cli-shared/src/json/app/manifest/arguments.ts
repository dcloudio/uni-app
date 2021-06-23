export function initArguments(
  manifestJson: Record<string, any>,
  pagesJson: Record<string, any>
) {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  const condition = pagesJson.condition
  if (condition && Array.isArray(condition.list) && condition.list.length) {
    const list = condition.list
    let current = parseInt(condition.current) || 0
    if (current < 0) {
      current = 0
    }
    if (current >= list.length) {
      current = 0
    }
    manifestJson.plus.arguments = JSON.stringify(list[current])
  }
}
