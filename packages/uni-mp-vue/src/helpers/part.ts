import { getPartClass } from '@dcloudio/uni-shared'

function getPartClassList(partName: string): string {
  return partName
    .split(/\s+/)
    .map((name) => getPartClass(name))
    .join(' ')
}

export function mergePartClass(
  partName: string,
  existingClass: Record<string, boolean> | string[] | string | undefined
): string {
  let existingClassStr = ''
  if (Array.isArray(existingClass)) {
    existingClassStr = existingClass.join(' ')
  } else if (typeof existingClass === 'object') {
    existingClassStr = Object.keys(existingClass)
      .filter((key) => !!existingClass[key])
      .join(' ')
  } else {
    existingClassStr = existingClass || ''
  }
  if (typeof partName !== 'string') {
    return existingClassStr
  }
  const partClass = getPartClassList(partName)
  if (existingClassStr) {
    return `${existingClassStr} ${partClass}`
  }
  return partClass
}
