import { logger } from '../../../src/public/infra/logger'

type Env = Record<string, string | undefined>

describe('infra/logger', () => {
  let logSpy: jest.SpyInstance
  let infoSpy: jest.SpyInstance
  let warnSpy: jest.SpyInstance
  let errSpy: jest.SpyInstance
  let envBackup: string | undefined
  let uniBackup: unknown

  beforeEach(() => {
    envBackup = process.env.UNI_STAT_DEBUG
    uniBackup = (globalThis as { uni?: unknown }).uni
    logger.setDebug(undefined)
    logger.setMuteNonDebug(false)
    delete (globalThis as { plus?: unknown }).plus
    delete (process.env as Env).UNI_PLATFORM
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {})
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    errSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    if (envBackup === undefined) {
      delete (process.env as Env).UNI_STAT_DEBUG
    } else {
      ;(process.env as Env).UNI_STAT_DEBUG = envBackup
    }
    logger.setDebug(undefined)
    logger.setMuteNonDebug(undefined)
    delete (globalThis as { plus?: unknown }).plus
    if (uniBackup === undefined) {
      delete (globalThis as { uni?: unknown }).uni
    } else {
      ;(globalThis as { uni?: unknown }).uni = uniBackup
    }
    delete (process.env as Env).UNI_PLATFORM
    logSpy.mockRestore()
    infoSpy.mockRestore()
    warnSpy.mockRestore()
    errSpy.mockRestore()
  })

  test('默认（UNI_STAT_DEBUG 未设置）debug 不输出', () => {
    delete (process.env as Env).UNI_STAT_DEBUG
    logger.debug('hidden')
    expect(logSpy).not.toHaveBeenCalled()
  })

  test('UNI_STAT_DEBUG === "true" 时 debug 输出（非 Android/iOS：TAG + 原始参数）', () => {
    ;(process.env as Env).UNI_STAT_DEBUG = 'true'
    logger.debug('visible')
    expect(logSpy).toHaveBeenCalledWith('[uni统计 2.0]', 'visible')
  })

  test('UNI_STAT_DEBUG === "false" 字符串时 debug 不输出（修复缺陷 #19）', () => {
    ;(process.env as Env).UNI_STAT_DEBUG = 'false'
    logger.debug('hidden')
    expect(logSpy).not.toHaveBeenCalled()
  })

  test('UNI_STAT_DEBUG === "1" 等其他值不开启', () => {
    ;(process.env as Env).UNI_STAT_DEBUG = '1'
    logger.debug('hidden')
    expect(logSpy).not.toHaveBeenCalled()
  })

  test('UNI_STAT_DEBUG 为布尔 true 时也开启（兼容历史插件 define 误替换）', () => {
    ;(process.env as unknown as Record<string, unknown>).UNI_STAT_DEBUG = true
    logger.debug('visible')
    expect(logSpy).toHaveBeenCalledWith('[uni统计 2.0]', 'visible')
  })

  test('UNI_STAT_DEBUG 为布尔 false 时不开启', () => {
    ;(process.env as unknown as Record<string, unknown>).UNI_STAT_DEBUG = false
    logger.debug('hidden')
    expect(logSpy).not.toHaveBeenCalled()
  })

  test('setDebug(true) 在运行时强制开启', () => {
    delete (process.env as Env).UNI_STAT_DEBUG
    logger.setDebug(true)
    logger.debug('on')
    expect(logSpy).toHaveBeenCalled()
  })

  test('setDebug(false) 在运行时强制关闭，覆盖 UNI_STAT_DEBUG=true', () => {
    ;(process.env as Env).UNI_STAT_DEBUG = 'true'
    logger.setDebug(false)
    logger.debug('off')
    expect(logSpy).not.toHaveBeenCalled()
  })

  test('NODE_ENV=test 时默认屏蔽 info/warn/error', () => {
    logger.setMuteNonDebug(undefined)
    logger.warn('muted')
    expect(warnSpy).not.toHaveBeenCalled()
    logger.setMuteNonDebug(false)
    logger.warn('visible')
    expect(warnSpy).toHaveBeenCalledWith('[uni统计 2.0]', 'visible')
  })

  test('info / warn / error 始终输出（非 Android/iOS：TAG + 多参）', () => {
    logger.info('i')
    logger.warn('w')
    logger.error('e')
    expect(infoSpy).toHaveBeenCalledWith('[uni统计 2.0]', 'i')
    expect(warnSpy).toHaveBeenCalledWith('[uni统计 2.0]', 'w')
    expect(errSpy).toHaveBeenCalledWith('[uni统计 2.0]', 'e')
  })

  test('非 Android/iOS：对象参数原样传递', () => {
    ;(process.env as Env).UNI_STAT_DEBUG = 'true'
    const o = { lt: '1' }
    logger.debug('a', o, 'b')
    expect(logSpy).toHaveBeenCalledWith('[uni统计 2.0]', 'a', o, 'b')
  })

  describe('Android / iOS：仅对象类参数转为字符串', () => {
    test('App Android：对象 → JSON，整行单参（避免桥接丢弃第二参起）', () => {
      ;(process.env as Env).UNI_PLATFORM = 'app-plus'
      ;(globalThis as { plus?: unknown }).plus = { os: { name: 'Android' } }
      ;(process.env as Env).UNI_STAT_DEBUG = 'true'
      const o = { x: 1 }
      logger.debug('m', o)
      expect(logSpy).toHaveBeenCalledWith('[uni统计 2.0] m {"x":1}')
    })

    test('App iOS：对象 → JSON，整行单参', () => {
      ;(process.env as Env).UNI_PLATFORM = 'app-plus'
      ;(globalThis as { plus?: unknown }).plus = { os: { name: 'iOS' } }
      ;(process.env as Env).UNI_STAT_DEBUG = 'true'
      const o = { y: 2 }
      logger.debug(o)
      expect(logSpy).toHaveBeenCalledWith('[uni统计 2.0] {"y":2}')
    })

    test('mp-weixin + platform=android', () => {
      ;(process.env as Env).UNI_PLATFORM = 'mp-weixin'
      ;(globalThis as { uni?: unknown }).uni = {
        getSystemInfoSync: () => ({ platform: 'android' }),
      }
      ;(process.env as Env).UNI_STAT_DEBUG = 'true'
      const o = { z: 3 }
      logger.debug('x', o)
      expect(logSpy).toHaveBeenCalledWith('[uni统计 2.0] x {"z":3}')
    })

    test('mp-weixin + platform=ios', () => {
      ;(process.env as Env).UNI_PLATFORM = 'mp-weixin'
      ;(globalThis as { uni?: unknown }).uni = {
        getSystemInfoSync: () => ({ platform: 'ios' }),
      }
      ;(process.env as Env).UNI_STAT_DEBUG = 'true'
      const o = { k: 1 }
      logger.debug(o)
      expect(logSpy).toHaveBeenCalledWith('[uni统计 2.0] {"k":1}')
    })

    test('Error 转为短字符串', () => {
      ;(process.env as Env).UNI_PLATFORM = 'app-plus'
      ;(globalThis as { plus?: unknown }).plus = { os: { name: 'Android' } }
      ;(process.env as Env).UNI_STAT_DEBUG = 'true'
      logger.debug(new Error('boom'))
      expect(logSpy).toHaveBeenCalledWith('[uni统计 2.0] Error: boom')
    })
  })
})
