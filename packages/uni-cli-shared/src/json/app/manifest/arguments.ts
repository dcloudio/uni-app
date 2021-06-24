export function initArguments(
  manifestJson: Record<string, any>,
  pagesJson: UniApp.PagesJson
) {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  // 指定了入口
  if (process.env.UNI_CLI_LAUNCH_PAGE_PATH) {
    manifestJson.plus.arguments = JSON.stringify({
      path: process.env.UNI_CLI_LAUNCH_PAGE_PATH,
      query: process.env.UNI_CLI_LAUNCH_PAGE_QUERY,
    })
    return
  }

  const condition = pagesJson.condition
  if (condition && condition.list?.length) {
    const list = condition.list
    let current = condition.current || 0
    if (current < 0) {
      current = 0
    }
    if (current >= list.length) {
      current = 0
    }
    manifestJson.plus.arguments = JSON.stringify(list[current])
  }
}
