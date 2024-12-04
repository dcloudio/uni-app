import {
  type ComponentInternalInstance,
  type ComponentPublicInstance,
  getCurrentInstance,
} from 'vue'

import { UniElement, type UniElementConstructor } from './UniElement'
import { stringifyStyle } from '../helpers/style'

/**
 * 每次 render 完成，删除不在 $uniElementIds 中的元素
 * @param ins
 */
export function pruneUniElements(ins: ComponentInternalInstance) {
  // 如果 $uniElements 不在 $uniElementIds 中，则删除
  ins.$uniElements.forEach((uniElement, id) => {
    const options = ins.$uniElementIds.get(id)
    if (!options) {
      ;(uniElement as unknown as UniElement).$destroy()
      ins.$uniElements.delete(id)
    }
  })
}

/**
 * 销毁所有元素
 * @param ins
 */
export function destroyUniElements(ins: ComponentInternalInstance) {
  ins.$uniElements.forEach((uniElement, id) => {
    ;(uniElement as unknown as UniElement).$destroy()
  })
  ins.$uniElements.clear()
  ins.$templateUniElementRefs = []
}

const customElements = new Map<string, UniElementConstructor>()

export function registerCustomElement(
  tagName: string,
  elementClass: UniElementConstructor
) {
  customElements.set(tagName, elementClass)
}

function createUniElement(
  id: string,
  tagName: string,
  ins: ComponentInternalInstance
) {
  if (!ins || !ins.proxy) {
    return null
  }
  const uniElement = new (customElements.get(tagName) || UniElement)(
    id,
    tagName
  )
  uniElement.$vm = ins.proxy
  initMiniProgramNode(uniElement, ins)
  uniElement.$onStyleChange((styles) => {
    let cssText = ''
    // 如果不支持 wxs setStyle，需要合并模板绑定的 style
    const templateStyle = ins.$templateUniElementStyles[id]
    if (templateStyle) {
      cssText = `${templateStyle};${stringifyStyle(styles as any)}`
    } else {
      cssText = stringifyStyle(styles as any)
    }
    const mpInstance = ins.proxy?.$scope
    if (mpInstance) {
      if (process.env.UNI_DEBUG) {
        console.log(
          'uni-app:[' +
            Date.now() +
            '][' +
            (mpInstance.is || mpInstance.route) +
            '][' +
            ins.uid +
            '][' +
            id +
            ']setStyle',
          cssText
        )
      }
      mpInstance.setData({
        [`$eS.${id}`]: cssText,
      })
    }
  })

  return uniElement
}

/**
 * 根据指定 id 查找元素
 * @param id
 * @param ins
 * @returns
 */
export function findUniElement(
  id: string,
  ins: ComponentInternalInstance | null = getCurrentInstance()
): UniElement | null {
  if (!ins) {
    return null
  }
  // 缓存
  const element = ins.$uniElements.get(id) as UniElement | undefined
  if (element) {
    return element
  }
  const options = ins.$uniElementIds.get(id)
  if (options) {
    const element = createUniElement(id, options.name, ins)
    // @ts-expect-error
    ins.$uniElements.set(id, element)
    return element
  }
  // 递归查找
  if (ins.proxy) {
    const children = (
      ins.proxy as unknown as { $children: ComponentPublicInstance[] }
    ).$children
    for (const child of children) {
      const element = findUniElement(id, child.$)
      if (element) {
        return element
      }
    }
  }
  return null
}

function createDummyUniElement() {
  return new UniElement('', '')
}

function createEventElement(id: string, ins?: ComponentInternalInstance) {
  if (!id || !ins) {
    return createDummyUniElement()
  }
  const element = findUniElement(id, ins)
  if (!element) {
    return createDummyUniElement()
  }
  return createUniElement(id, element.tagName, ins)!
}

export function createEventTarget(
  target: WechatMiniprogram.IAnyObject,
  ins?: ComponentInternalInstance
) {
  const id = target?.id || ''
  const element = createEventElement(id, ins)
  if (element) {
    element.dataset = target?.dataset || {}
    element.offsetTop =
      typeof target?.offsetTop === 'number' ? target?.offsetTop : NaN
    element.offsetLeft =
      typeof target?.offsetLeft === 'number' ? target?.offsetLeft : NaN
  }
  return element
}

function initMiniProgramNode(
  uniElement: UniElement,
  ins: ComponentInternalInstance
) {
  // 可能需要条件编译，部分小程序不支持
  if (uniElement.tagName === 'SCROLL-VIEW') {
    uniElement.$node = new Promise((resolve) => {
      uni
        .createSelectorQuery()
        .in(ins.proxy)
        .select('#' + uniElement.id)
        .fields({ node: true }, (res) => {
          const node = (res as any).node
          resolve(node)
          // 实现一个假的Promise，确保同步调用
          uniElement.$node = {
            then(fn) {
              fn(node)
            },
          }
        })
        .exec()
    })
  }
}
