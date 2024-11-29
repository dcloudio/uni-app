import type { ComponentPublicInstance } from 'vue'
import { isArray } from '@vue/shared'
import type {
  SelectorQueryNodeInfo,
  SelectorQueryRequest,
} from '@dcloudio/uni-api'
import { type NVueElement, parseNVueDataset } from '@dcloudio/uni-shared'
import { getPage$BasePage } from '../../framework/page/getCurrentPages'

export function requestComponentInfo(
  pageVm: ComponentPublicInstance,
  reqs: Array<SelectorQueryRequest>,
  callback: (result: Array<SelectorQueryNodeInfo | null>) => void
) {
  if (getPage$BasePage(pageVm).meta.isNVue) {
    requestNVueComponentInfo(pageVm, reqs, callback)
  } else {
    requestVueComponentInfo(pageVm, reqs, callback)
  }
}

function requestVueComponentInfo(
  pageVm: ComponentPublicInstance,
  reqs: Array<SelectorQueryRequest>,
  callback: (result: Array<SelectorQueryNodeInfo | null>) => void
) {
  UniServiceJSBridge.invokeViewMethod(
    'requestComponentInfo',
    {
      reqs: reqs.map((req) => {
        if (req.component) {
          req.component = req.component.$el.nodeId
        }
        return req
      }),
    },
    getPage$BasePage(pageVm).id,
    callback
  )
}

function requestNVueComponentInfo(
  pageVm: ComponentPublicInstance,
  reqs: Array<SelectorQueryRequest>,
  callback: (result: Array<SelectorQueryNodeInfo | null>) => void
) {
  const ids = findNVueElementIds(reqs)
  const nvueElementInfos = new Array(ids.length)
  findNVueElementInfos(ids, pageVm.$el, nvueElementInfos)
  findComponentRectAll(
    pageVm.$requireNativePlugin!('dom') as NVueDomModule,
    nvueElementInfos,
    0,
    [],
    (result) => {
      callback(result)
    }
  )
}

interface NVueElementInfo {
  id: string
  ref: string
  dataset: Record<string, unknown>
}
interface NVueDomModule {
  getComponentRect: (
    ref: string,
    callback: (res: { size: Record<string, unknown> }) => void
  ) => void
}

function findNVueElementIds(reqs: Array<SelectorQueryRequest>) {
  const ids: string[] = []
  for (let i = 0; i < reqs.length; i++) {
    const selector = reqs[i].selector
    if (selector.indexOf('#') === 0) {
      ids.push(selector.substring(1))
    }
  }
  return ids
}

function findNVueElementInfos(
  ids: string[],
  elm: NVueElement,
  infos: NVueElementInfo[]
) {
  const nodes = elm.children
  if (!isArray(nodes)) {
    return false
  }
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (node.attr) {
      const index = ids.indexOf(node.attr.id as string)
      if (index >= 0) {
        infos[index] = {
          id: ids[index],
          ref: node.ref,
          dataset: parseNVueDataset(node.attr),
        }
        if (ids.length === 1) {
          break
        }
      }
    }
    if (node.children) {
      findNVueElementInfos(ids, node, infos)
    }
  }
}

function findComponentRectAll(
  dom: NVueDomModule,
  nvueElementInfos: NVueElementInfo[],
  index: number,
  result: Array<SelectorQueryNodeInfo | null>,
  callback: (result: Array<SelectorQueryNodeInfo | null>) => void
) {
  const attr = nvueElementInfos[index]
  dom.getComponentRect(attr.ref, (option) => {
    option.size.id = attr.id
    option.size.dataset = attr.dataset
    result.push(option.size)
    index += 1
    if (index < nvueElementInfos.length) {
      findComponentRectAll(dom, nvueElementInfos, index, result, callback)
    } else {
      callback(result)
    }
  })
}
