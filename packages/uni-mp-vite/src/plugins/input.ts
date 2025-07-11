export function formatInputTag(code: string) {
  const inputStartRegex = /<input(\s+[^>]*)?>/g
  let result = code
  let match

  // 收集所有<input>标签的位置
  const inputStarts: Array<{
    index: number
    length: number
    fullMatch: string
  }> = []
  while ((match = inputStartRegex.exec(code)) !== null) {
    inputStarts.push({
      index: match.index,
      length: match[0].length,
      fullMatch: match[0],
    })
  }

  // 检查每个<input>是否有对应的</input>
  const toReplace: Array<{
    index: number
    length: number
    replacement: string
  }> = []
  for (let i = 0; i < inputStarts.length; i++) {
    const start = inputStarts[i]
    const nextStart = inputStarts[i + 1]?.index || code.length
    const substring = code.slice(start.index + start.length, nextStart)

    // 检查是否有对应的</input>
    const hasClosingTag = substring.includes('</input>')

    // 检查是否是自闭合形式（以/>结尾）
    const isSelfClosing = start.fullMatch.endsWith('/>')

    if (!hasClosingTag && !isSelfClosing) {
      // 需要转换的标签
      toReplace.push({
        index: start.index,
        length: start.length,
        replacement: start.fullMatch.replace(/>$/, ' />'),
      })
    }
  }

  // 从后往前替换，避免影响索引
  for (let i = toReplace.length - 1; i >= 0; i--) {
    const item = toReplace[i]
    result =
      result.slice(0, item.index) +
      item.replacement +
      result.slice(item.index + item.length)
  }

  return result
}

export function uniInputAutoClosePlugin() {
  return {
    name: 'uni:mp-input-auto-close',
    enforce: 'pre',
    transform(code, id) {
      if (!/\.(vue|nvue|uvue)$/.test(id)) {
        return
      }
      if (!code.includes('<input')) {
        return
      }

      return formatInputTag(code)
    },
  }
}
