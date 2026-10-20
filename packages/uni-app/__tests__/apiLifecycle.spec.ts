import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import * as shared from '@dcloudio/uni-shared'

function loadHooks(platform = 'h5', isX = true, ssr = false) {
  const registrations: { name: string; hook: Function; target: any }[] = []
  const vue = {
    getCurrentInstance: () => null,
    isInSSRComponentSetup: ssr,
    injectHook(name: string, hook: Function, target: any) {
      registrations.push({ name, hook, target })
    },
  }
  const output = ts.transpileModule(
    fs.readFileSync(path.resolve(__dirname, '../src/apiLifecycle.ts'), 'utf8'),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    }
  ).outputText
  const module = { exports: {} as any }
  new Function('require', 'module', 'exports', '__X__', 'process', output)(
    (id: string) => (id === 'vue' ? vue : shared),
    module,
    module.exports,
    isX,
    { env: { UNI_PLATFORM: platform } }
  )
  return { hooks: module.exports, registrations }
}

describe('uni 页面生命周期注册入口', () => {
  function instances(vapor = true) {
    const page: any = {
      vapor,
      type: {},
      proxy: { $page: { options: { id: '1' } } },
    }
    page.$pageInstance = page
    return { page, child: { vapor, type: {}, $pageInstance: page } }
  }

  test('直接交给内核注册，页面转交和立即执行不在 API 层重复处理', () => {
    const { hooks, registrations } = loadHooks()
    const { child } = instances()
    const load = jest.fn()
    const show = jest.fn()
    const hide = jest.fn()
    hooks.onLoad(load, child)
    hooks.onShow(show, child)
    hooks.onHide(hide, child)
    hooks.onPageScroll(hide, child)
    expect(registrations.map(({ target }) => target)).toEqual([
      child,
      child,
      child,
      child,
    ])
    expect(load).not.toHaveBeenCalled()
    expect(show).not.toHaveBeenCalled()
    expect(hide).not.toHaveBeenCalled()
  })

  test('保留页面自身、onReady、无页面关联的注册行为', () => {
    const { hooks, registrations } = loadHooks()
    const { page, child } = instances()
    const fn = jest.fn()
    const standalone = { vapor: true, type: {} }
    hooks.onLoad(fn, page)
    hooks.onReady(fn, child)
    hooks.onHide(fn, standalone)
    expect(fn).not.toHaveBeenCalled()
    expect(registrations.map(({ target }) => target)).toEqual([
      page,
      child,
      standalone,
    ])
  })

  test('SSR 不注册页面钩子', () => {
    const { hooks, registrations } = loadHooks('h5', true, true)
    const { child } = instances()
    hooks.onLoad(jest.fn(), child)
    hooks.onShow(jest.fn(), child)
    expect(registrations).toHaveLength(0)
  })

  test.each([
    ['h5', false, true],
    ['h5', true, false],
    ['app', true, true],
    ['mp-weixin', true, true],
  ])('不改变其他模式：%s vapor=%s x=%s', (platform, vapor, isX) => {
    const { hooks, registrations } = loadHooks(
      platform as string,
      isX as boolean
    )
    const { child } = instances(vapor as boolean)
    const fn = jest.fn()
    hooks.onLoad(fn, child)
    expect(fn).not.toHaveBeenCalled()
    expect(registrations[0].target).toBe(child)
  })
})
