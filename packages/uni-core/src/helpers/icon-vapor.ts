import {
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  setAttr,
  // @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
  template,
} from 'vue'

// 首次调用后直接使用模板工厂，不在每次渲染时检查缓存；导入未预处理源码也不执行 Vapor helper。
let svgIcon: ReturnType<typeof template> = () => {
  svgIcon = template('<svg viewBox="0 0 32 32"><path></path></svg>', 0, 1)
  return svgIcon()
}

export function createSvgIcon(
  path: string,
  color: string = '#000',
  size: number = 27
) {
  const svg = svgIcon()
  setAttr(svg, 'width', size, true)
  setAttr(svg, 'height', size, true)
  setAttr(svg.firstChild, 'd', path, true)
  setAttr(svg.firstChild, 'fill', color, true)
  return svg
}
