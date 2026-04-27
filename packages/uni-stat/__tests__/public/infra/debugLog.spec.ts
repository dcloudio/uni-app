/**
 * infra/debugLog 单元测试。
 *
 * 关注点：
 *   D1 isDebug=false 时所有 helper 不向 console.log 输出。
 *   D2 isDebug=true 时 logCollect 输出动作中文 + 数据 + 结束标记三段。
 *   D3 logReportStart/Success/Failure 文案包含通道、条数、用时、_id 等关键字段。
 *   D4 logRecoverStart/Item 输出续传摘要与逐条结果。
 *   D5 logBoot 摘要信息齐全。
 *   D6 getActionLabel 覆盖全部已知 lt + 未知 lt 兜底。
 */

import {
  getActionLabel,
  logBoot,
  logCollect,
  logNoChannel,
  logRecoverItem,
  logRecoverStart,
  logReportFailure,
  logReportStart,
  logReportSuccess,
} from '../../../src/public/infra/debugLog'
import { LT } from '../../../src/public/domain/eventTypes'
import { logger } from '../../../src/public/infra/logger'

import type { StatData } from '../../../src/public/domain/statData'

describe('infra/debugLog', () => {
  let logSpy: jest.SpyInstance

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    logger.setDebug(undefined)
  })

  afterEach(() => {
    logger.setDebug(undefined)
    logSpy.mockRestore()
  })

  function logsContaining(text: string): boolean {
    return logSpy.mock.calls.some((args) =>
      args.some((a) => typeof a === 'string' && a.includes(text))
    )
  }

  test('D1 debug=false 时所有 helper 静默', () => {
    logger.setDebug(false)
    logCollect({ lt: '1' } as unknown as StatData)
    logReportStart({
      channel: 'image',
      bucket: { '1': [{} as StatData] },
      payloadId: 'p-x',
    })
    logReportSuccess({
      channel: 'image',
      count: 1,
      elapsedMs: 12,
      payloadId: 'p-x',
    })
    logReportFailure({
      channel: 'image',
      count: 1,
      elapsedMs: 8,
      error: new Error('boom'),
      payloadId: 'p-x',
      persistedId: 'r-1',
    })
    logRecoverStart(2)
    logRecoverItem({ index: 1, total: 2, ok: true, payloadId: 'p-1' })
    logBoot({ channel: 'image', reportIntervalSec: 10, ak: 'AK' })
    logNoChannel({ bucket: { '1': [{} as StatData] } })
    expect(logSpy).not.toHaveBeenCalled()
  })

  test('D2 debug=true 时 logCollect 输出 中文动作 + 数据 + 结束标记', () => {
    logger.setDebug(true)
    logCollect({ lt: LT.Launch } as unknown as StatData)
    expect(logsContaining('=== 统计数据采集：应用启动 (lt=1) ===')).toBe(true)
    expect(logsContaining('=== 采集结束 ===')).toBe(true)
  })

  test('D3 logReportStart/Success/Failure 文案包含关键字段', () => {
    logger.setDebug(true)
    logReportStart({
      channel: 'image',
      bucket: { '1': [{} as StatData], '11': [{} as StatData, {} as StatData] },
      payloadId: 'p-abc',
    })
    expect(logsContaining('准备上报')).toBe(true)
    expect(logsContaining('共 3 条事件')).toBe(true)
    expect(logsContaining('lt=1×1, lt=11×2')).toBe(true)

    logSpy.mockClear()
    logReportSuccess({
      channel: 'image',
      count: 3,
      elapsedMs: 42,
      payloadId: 'p-abc',
    })
    expect(logsContaining('上报成功')).toBe(true)
    expect(logsContaining('用时 42ms')).toBe(true)

    logSpy.mockClear()
    logReportFailure({
      channel: 'image',
      count: 3,
      elapsedMs: 99,
      error: new Error('网络异常'),
      payloadId: 'p-abc',
      persistedId: 'r-9',
    })
    expect(logsContaining('上报失败')).toBe(true)
    expect(logsContaining('原因: Error: 网络异常')).toBe(true)
    expect(logsContaining('已暂存重试队列 [retryId=r-9]')).toBe(true)
  })

  test('D3.b logReportFailure 在没有 persistedId 时给出"丢弃"提示', () => {
    logger.setDebug(true)
    logReportFailure({
      channel: 'image',
      count: 1,
      elapsedMs: 10,
      error: 'oops',
      payloadId: 'p-1',
    })
    expect(logsContaining('未能写入重试队列：本批数据已丢弃')).toBe(true)
    expect(logsContaining('原因: oops')).toBe(true)
  })

  test('D4 logRecoverStart / logRecoverItem 输出续传进度', () => {
    logger.setDebug(true)
    logRecoverStart(3)
    expect(logsContaining('冷启续传：发现 3 条历史 payload')).toBe(true)

    logSpy.mockClear()
    logRecoverItem({ index: 2, total: 3, ok: true, payloadId: 'p-2' })
    expect(logsContaining('续传成功 (2/3)')).toBe(true)

    logSpy.mockClear()
    logRecoverItem({
      index: 3,
      total: 3,
      ok: false,
      payloadId: 'p-3',
      error: new Error('timeout'),
    })
    expect(logsContaining('续传失败 (3/3)：Error: timeout')).toBe(true)
  })

  test('D5 logBoot 摘要包含通道 / 间隔 / ak', () => {
    logger.setDebug(true)
    logBoot({
      channel: 'image',
      reportIntervalSec: 10,
      ak: 'MY_AK',
      appName: 'demo',
      debugFromManifest: true,
    })
    expect(logsContaining('uni 统计公有版已启用')).toBe(true)
    expect(
      logsContaining('上报间隔: 10s | 应用APPID: MY_AK | 应用名: demo')
    ).toBe(true)
    expect(
      logsContaining('调试模式：已从 manifest.uniStatistics.debug 自动开启')
    ).toBe(true)
  })

  test('D5.b logBoot ak 缺失时显示 <未注入>', () => {
    logger.setDebug(true)
    logBoot({ channel: '1', reportIntervalSec: 10, ak: '' })
    expect(logsContaining('应用APPID: <未注入>')).toBe(true)
  })

  test('D6 getActionLabel 覆盖所有已知 lt（lt=0 已废弃，落到未知分支）', () => {
    expect(getActionLabel(LT.Launch)).toBe('应用启动')
    expect(getActionLabel(LT.Hide)).toBe('应用进入后台')
    expect(getActionLabel(LT.Page)).toBe('页面切换')
    expect(getActionLabel(LT.Event)).toBe('事件触发')
    expect(getActionLabel(LT.Error)).toBe('应用错误')
    expect(getActionLabel(LT.Push)).toBe('PUSH 设备标识')
    expect(getActionLabel('0')).toContain('未知事件 (lt=0)')
    expect(getActionLabel('999' as unknown as never)).toContain(
      '未知事件 (lt=999)'
    )
    expect(getActionLabel(undefined)).toContain('未知事件 (lt=?)')
  })

  test('D7 logNoChannel 在无可用通道时输出回滚条数', () => {
    logger.setDebug(true)
    logNoChannel({
      bucket: { '1': [{} as StatData], '11': [{} as StatData, {} as StatData] },
    })
    expect(
      logsContaining('=== 上报跳过：当前无可用通道，已回滚 3 条事件入队 ===')
    ).toBe(true)
  })
})
