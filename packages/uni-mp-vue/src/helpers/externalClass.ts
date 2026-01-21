import { isArray, isString } from '@vue/shared'

/**
 * 处理 externalClasses，为类名添加 -external 后缀
 * @param className 类名，支持字符串、数组或动态值
 * @returns 添加了 -external 后缀的类名
 * @example
 * // 静态值
 * externalClass('title') // => 'title-external'
 *
 * // 动态值
 * externalClass(someVar) // => 'someVar-external'
 */
export function externalClass(className: unknown): string {
  if (!className) {
    return ''
  }

  if (isArray(className)) {
    return className
      .filter(Boolean)
      .map((name) => appendExternalSuffix(String(name)))
      .join(' ')
  }

  if (isString(className)) {
    return className
      .split(/\s+/)
      .filter(Boolean)
      .map((name) => appendExternalSuffix(name))
      .join(' ')
  }

  // 处理其他类型（如数字等），转为字符串
  return appendExternalSuffix(String(className))
}

function appendExternalSuffix(name: string): string {
  return name ? `${name}-external` : ''
}
