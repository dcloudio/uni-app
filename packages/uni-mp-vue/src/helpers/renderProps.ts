import { getCurrentInstance, guardReactiveProps } from 'vue'

const propsCaches: Record<string, Record<string, any>[]> = Object.create(null)

export function renderProps(props: Data) {
  const { uid } = getCurrentInstance()!
  const propsId =
    (propsCaches[uid] || (propsCaches[uid] = [])).push(
      guardReactiveProps(props)!
    ) - 1
  // 强制每次更新
  return uid + ',' + propsId + ',' + Math.random()
}

export function pruneComponentPropsCache(uid: number) {
  delete propsCaches[uid]
}

export function findComponentPropsData(up: string) {
  if (!up) {
    return
  }
  const [uid, propsId] = up.split(',')
  if (!propsCaches[uid]) {
    return
  }
  return propsCaches[uid][parseInt(propsId)]
}
