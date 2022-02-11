export type Size = { width: number; height: number; top: number; left: number }
export const getComponentSize = (el: HTMLElement) => {
  const dom = weex.requireModule('dom')
  return new Promise<Size>((resolve) => {
    dom.getComponentRect(el, ({ size }: { size: Size }) => {
      resolve(size)
    })
  })
}
