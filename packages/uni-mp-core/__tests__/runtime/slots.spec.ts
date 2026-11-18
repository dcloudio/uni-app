import { initProps } from '../../src/runtime/componentProps'
import { initBaseInstance } from '../../src/runtime/componentInstance'

describe('runtime: forwarded slots', () => {
  const originalPlatform = (global as any).__PLATFORM__

  afterEach(() => {
    ;(global as any).__PLATFORM__ = originalPlatform
  })

  test.each(['mp-weixin', 'mp-baidu', 'mp-toutiao', 'mp-harmony'])(
    '%s observer ignores missing slots and removes previous slots',
    (platform) => {
      ;(global as any).__PLATFORM__ = platform
      const options: any = {}
      initProps(options)
      const observer =
        platform === 'mp-harmony'
          ? options.observers.uS
          : options.properties.uS.observer
      const scope = { setData: jest.fn() }
      observer.call(scope, [null, undefined, 'extra', 'footer'])
      expect(scope.setData).toHaveBeenLastCalledWith({
        $slots: { extra: true, footer: true },
      })
      observer.call(scope, ['d', null, 'footer'])
      expect(scope.setData).toHaveBeenLastCalledWith({
        $slots: { d: true, footer: true },
      })
      observer.call(scope, [null, undefined])
      expect(scope.setData).toHaveBeenLastCalledWith({ $slots: {} })
      observer.call(scope, ['', 'null', 'undefined'])
      expect(scope.setData).toHaveBeenLastCalledWith({
        $slots: { '': true, null: true, undefined: true },
      })
    }
  )

  test('initializes Vue slots without exposing null or undefined', () => {
    ;(global as any).__PLATFORM__ = 'mp-weixin'
    const instance: any = { ctx: {}, emit: jest.fn() }
    initBaseInstance(instance, {
      mpType: 'component',
      mpInstance: {},
      slots: [null, undefined, 'd', 'extra', ''],
    })
    expect(instance.slots).toEqual({
      d: true,
      default: true,
      extra: true,
      '': true,
    })
  })
})
