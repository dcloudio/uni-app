import {
  type ComponentInternalInstance,
  getCurrentInstance,
  guardReactiveProps,
} from 'vue'

const propsCaches: Record<string, Record<string, any>[]> = Object.create(null)
// 与 Vue runtime 通过全局 Symbol 注册表共享，且不会作为普通 prop 参与字符串键枚举。
const EXTERNAL_CLASSES_SOURCE_PAGE = Symbol.for(
  'uni.externalClasses.sourcePage'
)

export function renderProps(props: Record<string, unknown>) {
  const instance = getCurrentInstance()! as ComponentInternalInstance & {
    __counter: number
    renderer: 'app' | 'page' | 'component'
  }
  const { uid, __counter } = instance
  const rawProps = guardReactiveProps(props)!
  if (__X__ && __X_STYLE_ISOLATION__ && __X_STYLE_ISOLATION_UP_ARROW__) {
    // 记录模板 owner；插槽内容执行时运行时会恢复声明该插槽的实例。
    ;(rawProps as any)[EXTERNAL_CLASSES_SOURCE_PAGE] =
      instance.renderer === 'page'
  }
  const propsId =
    (propsCaches[uid] || (propsCaches[uid] = [])).push(rawProps) - 1
  // 强制每次更新
  return uid + ',' + propsId + ',' + __counter
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
