import {
  getCurrentQuery,
  getCurrentRoute,
  getCurrentRouteWithQuery,
  getTopPageVm,
  parseQuery,
} from '../../../src/public/adapter/route'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

type PageVm = Record<string, unknown>
function setPages(pages: Array<{ $vm?: PageVm } | PageVm> | null): void {
  if (pages === null) {
    delete (globalThis as { getCurrentPages?: unknown }).getCurrentPages
  } else {
    ;(globalThis as { getCurrentPages?: () => unknown }).getCurrentPages = () =>
      pages
  }
}

describe('adapter/route', () => {
  beforeEach(() => {
    installMockUni({ platform: 'mp-weixin' })
  })

  afterEach(() => {
    restoreMockUni()
    setPages(null)
  })

  describe('getTopPageVm', () => {
    test('getCurrentPages 不存在 → undefined', () => {
      setPages(null)
      expect(getTopPageVm()).toBeUndefined()
    })

    test('栈空 → undefined', () => {
      setPages([])
      expect(getTopPageVm()).toBeUndefined()
    })

    test('返回栈顶 $vm', () => {
      const vm = { route: 'pages/home/home' }
      setPages([{ $vm: { route: 'pages/login/login' } }, { $vm: vm }])
      expect(getTopPageVm()).toBe(vm)
    })

    test('栈顶无 $vm → 退化为 entry 自身', () => {
      const entry = { route: 'pages/x/x' }
      setPages([entry])
      expect(getTopPageVm()).toBe(entry)
    })

    test('getCurrentPages 抛错 → undefined', () => {
      ;(globalThis as { getCurrentPages?: () => unknown }).getCurrentPages =
        () => {
          throw new Error('boom')
        }
      expect(getTopPageVm()).toBeUndefined()
    })
  })

  describe('getCurrentRoute', () => {
    test('显式 pageVm 优先', () => {
      const vm = { route: 'pages/passed/passed' }
      setPages([{ $vm: { route: 'pages/stack/stack' } }])
      expect(getCurrentRoute(vm)).toBe('pages/passed/passed')
    })

    test('百度小程序：取 $mp.page.is', () => {
      restoreMockUni()
      installMockUni({ platform: 'mp-baidu' })
      const vm = { $mp: { page: { is: 'pages/bd/bd' } } }
      expect(getCurrentRoute(vm)).toBe('pages/bd/bd')
    })

    test('通用：取 vm.route', () => {
      const vm = { route: 'pages/x/x' }
      expect(getCurrentRoute(vm)).toBe('pages/x/x')
    })

    test('退到 vm.$scope.route', () => {
      const vm = { $scope: { route: 'pages/scope/scope' } }
      expect(getCurrentRoute(vm)).toBe('pages/scope/scope')
    })

    test('退到 vm.$mp.page.route', () => {
      const vm = { $mp: { page: { route: 'pages/mp/mp' } } }
      expect(getCurrentRoute(vm)).toBe('pages/mp/mp')
    })

    test('全空 → 空串', () => {
      expect(getCurrentRoute({})).toBe('')
    })

    test('无栈无 vm → 空串', () => {
      setPages(null)
      expect(getCurrentRoute()).toBe('')
    })
  })

  describe('getCurrentRouteWithQuery', () => {
    test('vm.$page.fullPath 优先', () => {
      const vm = { $page: { fullPath: '/pages/x/x?id=1' } }
      expect(getCurrentRouteWithQuery(vm)).toBe('/pages/x/x?id=1')
    })

    test('fullPath = "/" → 退化到 page.route', () => {
      const vm = { $page: { fullPath: '/', route: 'pages/x/x' } }
      expect(getCurrentRouteWithQuery(vm)).toBe('pages/x/x')
    })

    test('vm.$scope.$page.fullPath 兜底', () => {
      const vm = { $scope: { $page: { fullPath: '/pages/y/y?a=1' } } }
      expect(getCurrentRouteWithQuery(vm)).toBe('/pages/y/y?a=1')
    })

    test('全空 → 退化到 getCurrentRoute', () => {
      const vm = { route: 'pages/z/z' }
      expect(getCurrentRouteWithQuery(vm)).toBe('pages/z/z')
    })
  })

  describe('parseQuery', () => {
    test('null/空 → {}', () => {
      expect(parseQuery(null)).toEqual({})
      expect(parseQuery('')).toEqual({})
      expect(parseQuery(undefined)).toEqual({})
    })

    test('支持 ? 前缀', () => {
      expect(parseQuery('?a=1&b=2')).toEqual({ a: '1', b: '2' })
    })

    test('支持无 ? 前缀', () => {
      expect(parseQuery('a=1&b=2')).toEqual({ a: '1', b: '2' })
    })

    test('value 含 = → 仅按第一个 = 切', () => {
      expect(parseQuery('token=abc=def&u=x')).toEqual({
        token: 'abc=def',
        u: 'x',
      })
    })

    test('decodeURIComponent', () => {
      expect(parseQuery('q=%E4%B8%AD%E6%96%87&p=hello%20world')).toEqual({
        q: '中文',
        p: 'hello world',
      })
    })

    test('错误编码 → 退化为原值', () => {
      expect(parseQuery('q=%E4%B8')).toEqual({ q: '%E4%B8' })
    })

    test('重复 key 取最后', () => {
      expect(parseQuery('a=1&a=2&a=3')).toEqual({ a: '3' })
    })

    test('无 value 视为空字符串', () => {
      expect(parseQuery('flag&x=1')).toEqual({ flag: '', x: '1' })
    })
  })

  describe('getCurrentQuery', () => {
    test('优先 $page.options', () => {
      const vm = {
        $page: {
          options: { id: '7', tab: 'home' },
          fullPath: '/pages/x/x?id=99',
        },
      }
      expect(getCurrentQuery(vm)).toEqual({ id: '7', tab: 'home' })
    })

    test('options 缺失 → 解析 fullPath', () => {
      const vm = { $page: { fullPath: '/pages/x/x?id=99&tab=mine' } }
      expect(getCurrentQuery(vm)).toEqual({ id: '99', tab: 'mine' })
    })

    test('全空 → {}', () => {
      expect(getCurrentQuery({})).toEqual({})
    })
  })
})
