import path from 'path'
import ts from 'typescript'
import jscc from 'rollup-plugin-jscc'
import {
  getUniElementPage,
  setUniElementPage,
} from '../../uni-shared/src/dom2/elementPage'
import { normalizePageSelector } from '../src/helpers/pageSelector'

async function load(
  file: string,
  vapor: boolean,
  imports: Record<string, any>,
  globals: Record<string, any>
) {
  const plugin = jscc({
    values: { _X_: 1, _X_VAPOR_: +vapor, _NODE_JS_: 0 },
  })
  const source = await (plugin.load as Function).call(
    {},
    path.resolve(__dirname, '../src', file)
  )
  const code = ts.transpileModule(source.code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText
  const exports = {} as any
  new Function('require', 'exports', ...Object.keys(globals), code)(
    (id: string) => {
      if (!(id in imports)) throw new Error('缺少测试依赖：' + id)
      return imports[id]
    },
    exports,
    ...Object.values(globals)
  )
  return exports
}

describe('页面正文 API 的区域滚动适配', () => {
  let dom: any
  let document: Document

  beforeEach(() => {
    const { JSDOM } = jest.requireActual('jsdom')
    dom = new JSDOM('<!doctype html><body></body>')
    document = dom.window.document
  })
  afterEach(() => dom.window.close())

  test.each([true, false])(
    '页面尺寸、查询及元素所属页面保持准确：vapor=%s',
    async (vapor) => {
      let currentPage: any
      const mounted: Function[] = []
      const getPageBody = (instance: any) => instance?.parent.__pageBodyEl
      const imports = {
        vue: {
          markRaw: (value: unknown) => value,
          watchEffect: (effect: Function) => effect(),
          onMounted: (hook: Function) => mounted.push(hook),
        },
        'safe-area-insets': { default: { top: 0 } },
        '@dcloudio/uni-core': {
          getCurrentPage: () => currentPage,
          initPageVm: (vm: any, page: unknown) => (vm.$basePage = page),
          isDialogPageInstance: (instance: any) =>
            !!instance?.attrs['data-type'],
        },
        '@dcloudio/uni-shared': {
          UTSJSONObject: class {},
          removeLeadingSlash: (value: string) => value.replace(/^\//, ''),
          setUniElementPage,
        },
        '../../../service/api/route/utils': {},
        '../../../framework/setup/page': {
          currentPagesMap: new Map(),
          normalizeRouteKey: (route: string, id: number) => route + id,
        },
        '../../service/api/route/closeDialogPage': {},
        '../../../helpers/pageBody': { getPageBody },
        '../../../helpers/pageSelector': { normalizePageSelector },
        '../../../helpers/safeArea': {
          getPageWrapperInfo: (element: HTMLElement) =>
            element.getBoundingClientRect(),
          getSafeAreaInsets: (element: HTMLElement) => ({
            top: element.getBoundingClientRect().top,
          }),
        },
      }
      const { initXPage, UniDialogPageImpl } = await load(
        'x/framework/setup/page.ts',
        vapor,
        imports,
        {
          __NODE_JS__: false,
          document,
          Element: dom.window.Element,
          setTimeout: () => {},
        }
      )
      const makePage = (id: number, dialog?: any) => {
        const body = document.createElement('uni-page-body')
        body.className = 'page'
        body.innerHTML = `<div id="target" class="page">${id}</div>`
        const head = document.createElement('uni-page-head')
        Object.defineProperty(head, 'clientHeight', { value: 44 })
        let root: HTMLElement = body
        let region = body
        if (!vapor) {
          root = document.createElement('uni-page')
          root.dataset.page = 'pages/test'
          region = document.createElement('uni-page-wrapper')
          region.appendChild(body)
          root.append(head, region)
        }
        region.getBoundingClientRect = () =>
          ({ top: id, left: 2, width: 320, height: 500 } as DOMRect)
        document.body.appendChild(root)
        const layout: any = {
          type: { name: 'Page' },
          attrs: dialog ? { 'data-type': 'dialog' } : {},
          refs: { pageHead: dialog ? undefined : { $el: head } },
          proxy: { $el: vapor ? document.createComment('page') : root },
          __pageBodyEl: body,
          $dialogPages: { value: [] },
          $systemDialogPages: { value: [] },
          $dialogPage: dialog,
        }
        const instance: any = {
          type: { __scriptLang: 'ts' },
          parent: layout,
        }
        const vm: any = {
          $: instance,
          route: 'pages/test',
          $nextTick: (callback: Function) => callback(),
        }
        Object.defineProperty(vm, '$page', { get: () => instance.page })
        initXPage(
          vm,
          { path: '/pages/test', query: {} },
          {
            path: '/pages/test',
            id,
            meta: {},
          }
        )
        mounted.splice(0).forEach((hook) => hook())
        return { page: instance.page, body, root, layout }
      }
      const parent = makePage(1)
      currentPage = parent.page
      expect(parent.page.getHTMLElement()).toBe(parent.body)
      expect(parent.page.querySelector('#target')).toBe(parent.body.firstChild)
      expect(parent.page.querySelector('page')).toBe(vapor ? parent.body : null)
      expect(parent.page.querySelectorAll('page')).toEqual(
        vapor ? [parent.body] : []
      )
      expect(parent.page.querySelector('page #target')).toBe(
        vapor ? parent.body.firstChild : null
      )
      expect(parent.page.querySelectorAll('page #target')).toEqual(
        vapor ? [parent.body.firstChild] : []
      )
      expect(parent.page.querySelector('.page')).toBe(parent.body.firstChild)
      expect(parent.page.querySelectorAll('.page')).toEqual([
        parent.body.firstChild,
      ])
      expect(parent.page.width).toBe(320)
      expect(parent.page.height).toBe(544)
      expect(parent.page.safeAreaInsets.top).toBe(1)
      expect(getUniElementPage(parent.body.firstElementChild!)).toBe(
        parent.page
      )

      if (vapor) {
        // 同一路径的弹窗必须按实例查询；不能通过 data-page 命中第一个弹窗。
        const dialogs = [2, 3].map((id) => {
          const page = new UniDialogPageImpl({
            route: 'pages/test',
            options: {},
            $component: {},
            $triggerParentHide: false,
            getParentPage: () => parent.page,
          })
          parent.layout.$dialogPages.value.push(page)
          return makePage(id, page)
        })
        dialogs.forEach(({ page, body }) => {
          expect(page.getHTMLElement()).toBe(body)
          expect(page.getElementById('target')).toBe(body.firstChild)
          expect(page.querySelector('page')).toBe(body)
          expect(page.querySelectorAll('page')).toEqual([body])
          expect(page.querySelector('page #target')).toBe(body.firstChild)
          expect(page.querySelectorAll('page #target')).toEqual([
            body.firstChild,
          ])
          expect(page.querySelector('.page')).toBe(body.firstChild)
          expect(getUniElementPage(body.firstElementChild!)).toBe(page)
        })
        expect(dialogs[1].page.pageBody.top).toBe(3)
        expect(dialogs[1].page.height).toBe(500)
        expect(parent.page.querySelectorAll('#target')).toEqual([
          parent.body.firstChild,
        ])
        const other = makePage(4)
        currentPage = other.page
        expect(parent.page.querySelector('page')).toBeNull()
        expect(parent.page.querySelectorAll('page')).toEqual([])
        dialogs.forEach(({ page }) => {
          expect(page.querySelector('page')).toBeNull()
          expect(page.querySelectorAll('page')).toEqual([])
        })
        currentPage = null
        expect(parent.page.querySelector('page')).toBeNull()
        expect(parent.page.querySelectorAll('page')).toEqual([])
      }
    }
  )

  test.each([true, false])(
    'selectViewport 从相应滚动容器返回尺寸和偏移：vapor=%s',
    async (vapor) => {
      const body = document.createElement('uni-page-body')
      const dimensions = {
        clientWidth: 300,
        clientHeight: 400,
        scrollLeft: 2,
        scrollTop: 120,
        scrollHeight: 1500,
        scrollWidth: 600,
      }
      for (const [name, value] of Object.entries(dimensions)) {
        Object.defineProperty(body, name, { value })
        Object.defineProperty(document.documentElement, name, {
          value: value + 1,
        })
      }
      const { requestComponentInfo } = await load(
        'service/api/ui/requestComponentInfo.ts',
        vapor,
        {
          vue: {},
          '@vue/shared': { isArray: Array.isArray },
          '@dcloudio/uni-shared': {},
          '@dcloudio/uni-core': {},
          '@dcloudio/uni-components': {},
          '../../../helpers/pageBody': {
            getPageBody: (instance: any) => instance.__pageBodyEl,
          },
          '../../../helpers/pageSelector': jest.requireActual(
            '../src/helpers/pageSelector'
          ),
        },
        { document }
      )
      const callback = jest.fn()
      requestComponentInfo(
        { $: { __pageBodyEl: body } },
        [{ component: null, fields: { size: true, scrollOffset: true } }],
        callback
      )
      const offset = vapor ? 0 : 1
      expect(callback).toHaveBeenCalledWith([
        {
          width: 300 + offset,
          height: 400 + offset,
          scrollLeft: 2 + offset,
          scrollTop: 120 + offset,
          scrollHeight: 1500 + offset,
          scrollWidth: 600 + offset,
        },
      ])
    }
  )

  test.each([true, false])(
    'page-style 定位当前页面并保留正文上的框架样式：vapor=%s',
    async (vapor) => {
      const parent = document.createElement('uni-page-body')
      const dialog = document.createElement('uni-page-body')
      for (const element of [parent, dialog]) {
        element.style.setProperty('--uni-safe-area-inset-top', '44px')
        element.style.setProperty('--background-color-content', 'white')
        element.style.setProperty('--uni-dialog-page-index', '1')
        element.style.zIndex = '999'
        element.style.overflowY = 'hidden'
      }
      document.body.append(parent, dialog)
      const { setCurrentPageMeta } = await load(
        'service/api/ui/setPageMeta.ts',
        vapor,
        {
          '../../../helpers/pageBody': {
            getPageBody: (instance: any) => instance.__pageBodyEl,
          },
        },
        { document }
      )
      const page = { $: { __pageBodyEl: dialog } }
      setCurrentPageMeta(page, { pageStyle: 'color: red; padding: 10px;' })
      const target = vapor ? dialog : parent
      expect(target.style.color).toBe('red')
      expect(target.style.getPropertyValue('--uni-safe-area-inset-top')).toBe(
        vapor ? '44px' : ''
      )
      expect(target.style.getPropertyValue('--background-color-content')).toBe(
        vapor ? 'white' : ''
      )
      expect(target.style.zIndex).toBe(vapor ? '999' : '')
      expect(target.style.getPropertyValue('--uni-dialog-page-index')).toBe(
        vapor ? '1' : ''
      )
      expect(target.style.overflowY).toBe(vapor ? 'hidden' : '')
      if (vapor) expect(parent.style.color).toBe('')
      setCurrentPageMeta(page, {
        pageStyle: 'color: blue; overflow-y: scroll;',
      })
      expect(target.style.color).toBe('blue')
      expect(target.style.padding).toBe('')
      expect(target.style.overflowY).toBe('scroll')
    }
  )
})
