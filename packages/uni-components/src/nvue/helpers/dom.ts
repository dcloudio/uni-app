export type Size = { width: number; height: number; top: number; left: number }
export const getComponentSize = (el: HTMLElement) => {
  return new Promise<Size>((resolve, reject) => {
    if (!el) return resolve({ width: 0, height: 0, top: 0, left: 0 })
    const dom = weex.requireModule('dom')
    dom.getComponentRect(el, ({ size }: { size: Size }) => {
      resolve(size)
    })
  })
}
