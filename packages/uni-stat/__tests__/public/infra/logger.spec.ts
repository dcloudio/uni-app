import { logger } from '../../../src/public/infra/logger'

describe('infra/logger', () => {
  let logSpy: jest.SpyInstance
  let infoSpy: jest.SpyInstance
  let warnSpy: jest.SpyInstance
  let errSpy: jest.SpyInstance
  let envBackup: string | undefined

  beforeEach(() => {
    envBackup = process.env.UNI_STAT_DEBUG
    logger.setDebug(undefined)
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {})
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    errSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    if (envBackup === undefined) {
      delete (process.env as Record<string, string | undefined>).UNI_STAT_DEBUG
    } else {
      ;(process.env as Record<string, string | undefined>).UNI_STAT_DEBUG =
        envBackup
    }
    logger.setDebug(undefined)
    logSpy.mockRestore()
    infoSpy.mockRestore()
    warnSpy.mockRestore()
    errSpy.mockRestore()
  })

  test('默认（UNI_STAT_DEBUG 未设置）debug 不输出', () => {
    delete (process.env as Record<string, string | undefined>).UNI_STAT_DEBUG
    logger.debug('hidden')
    expect(logSpy).not.toHaveBeenCalled()
  })

  test('UNI_STAT_DEBUG === "true" 时 debug 输出', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STAT_DEBUG = 'true'
    logger.debug('visible')
    expect(logSpy).toHaveBeenCalledWith('[uni统计公有版]', 'visible')
  })

  test('UNI_STAT_DEBUG === "false" 字符串时 debug 不输出（修复缺陷 #19）', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STAT_DEBUG =
      'false'
    logger.debug('hidden')
    expect(logSpy).not.toHaveBeenCalled()
  })

  test('UNI_STAT_DEBUG === "1" 等其他值不开启', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STAT_DEBUG = '1'
    logger.debug('hidden')
    expect(logSpy).not.toHaveBeenCalled()
  })

  test('UNI_STAT_DEBUG 为布尔 true 时也开启（兼容历史插件 define 误替换）', () => {
    // 模拟历史插件 define 把 process.env.UNI_STAT_DEBUG 替换成布尔字面量 true 的情况：
    // 此时运行时拿到的不是字符串 "true" 而是布尔 true，logger 必须兼容才能让 debug 生效。
    ;(process.env as unknown as Record<string, unknown>).UNI_STAT_DEBUG = true
    logger.debug('visible')
    expect(logSpy).toHaveBeenCalledWith('[uni统计公有版]', 'visible')
  })

  test('UNI_STAT_DEBUG 为布尔 false 时不开启', () => {
    ;(process.env as unknown as Record<string, unknown>).UNI_STAT_DEBUG = false
    logger.debug('hidden')
    expect(logSpy).not.toHaveBeenCalled()
  })

  test('setDebug(true) 在运行时强制开启', () => {
    delete (process.env as Record<string, string | undefined>).UNI_STAT_DEBUG
    logger.setDebug(true)
    logger.debug('on')
    expect(logSpy).toHaveBeenCalled()
  })

  test('setDebug(false) 在运行时强制关闭，覆盖 UNI_STAT_DEBUG=true', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STAT_DEBUG = 'true'
    logger.setDebug(false)
    logger.debug('off')
    expect(logSpy).not.toHaveBeenCalled()
  })

  test('info / warn / error 始终输出，且带 [uni统计公有版] 前缀', () => {
    logger.info('i')
    logger.warn('w')
    logger.error('e')
    expect(infoSpy).toHaveBeenCalledWith('[uni统计公有版]', 'i')
    expect(warnSpy).toHaveBeenCalledWith('[uni统计公有版]', 'w')
    expect(errSpy).toHaveBeenCalledWith('[uni统计公有版]', 'e')
  })
})
