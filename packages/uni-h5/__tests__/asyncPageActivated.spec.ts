import {
  type Component,
  KeepAlive,
  type RendererOptions,
  createRenderer,
  defineAsyncComponent,
  defineComponent,
  getCurrentInstance,
  h,
  onActivated,
  onMounted,
} from 'vue'
import { initAsyncPageActivated } from '../src/framework/setup/keepAlive'

interface TestNode {
  tag?: string
  text?: string
  parent: TestNode | null
  children: TestNode[]
}

function createNode(node: Partial<TestNode>): TestNode {
  return { parent: null, children: [], ...node }
}

function remove(child: TestNode) {
  const parent = child.parent
  if (parent) {
    parent.children.splice(parent.children.indexOf(child), 1)
    child.parent = null
  }
}

const nodeOps: RendererOptions<TestNode, TestNode> = {
  insert(child, parent, anchor) {
    remove(child)
    const index = anchor ? parent.children.indexOf(anchor) : -1
    if (index > -1) {
      parent.children.splice(index, 0, child)
    } else {
      parent.children.push(child)
    }
    child.parent = parent
  },
  remove,
  createElement: (tag) => createNode({ tag }),
  createText: (text) => createNode({ text }),
  createComment: (text) => createNode({ text }),
  setText(node, text) {
    node.text = text
  },
  setElementText(el, text) {
    el.children = [createNode({ text, parent: el })]
  },
  parentNode: (node) => node.parent,
  nextSibling(node) {
    const parent = node.parent
    return parent ? parent.children[parent.children.indexOf(node) + 1] : null
  },
  patchProp() {},
}

const { createApp } = createRenderer(nodeOps)

function flush() {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

// 与 uni-h5 路由结构一致：KeepAlive > 路由组件 > 页面框架 > 异步页面组件 > 页面
function mountRoute(page: Component) {
  const PageFrame = defineComponent({
    setup(_, { slots }) {
      return () => h('uni-page', null, slots.page!())
    },
  })
  const Route = defineComponent({
    setup() {
      return () => h(PageFrame, null, { page: () => [h(page)] })
    },
  })
  createApp({
    render: () => h(KeepAlive, null, [h(Route)]),
  }).mount(createNode({ tag: 'root' }))
}

function createPage(calls: string[]) {
  const Child = defineComponent({
    setup() {
      onMounted(() => calls.push('child:mounted'))
      onActivated(() => calls.push('child:activated'))
      return () => h('child')
    },
  })
  return defineComponent({
    setup() {
      initAsyncPageActivated(getCurrentInstance()!)
      onMounted(() => calls.push('page:mounted'))
      onActivated(() => calls.push('page:activated'))
      return () => h(Child)
    },
  })
}

describe('KeepAlive 缓存的异步页面', () => {
  test('首次进入（页面模块尚未加载）与再次进入一样触发 onActivated', async () => {
    const calls: string[] = []
    let resolvePage!: (page: Component) => void
    const AsyncPage = defineAsyncComponent(
      () => new Promise<Component>((resolve) => (resolvePage = resolve))
    )
    mountRoute(AsyncPage)
    await flush()
    expect(calls).toEqual([])
    resolvePage(createPage(calls))
    await flush()
    await flush()
    const firstEntry = calls.splice(0)

    // 再次进入：页面模块已加载，同步渲染
    mountRoute(AsyncPage)
    await flush()
    await flush()
    const secondEntry = calls.splice(0)

    expect(secondEntry).toEqual([
      'child:mounted',
      'page:mounted',
      'child:activated',
      'page:activated',
    ])
    expect(firstEntry).toEqual(secondEntry)
  })
})
