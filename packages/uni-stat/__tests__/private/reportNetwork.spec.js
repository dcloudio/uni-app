/**
 * 私有版网络门闸回归：无网挂起、恢复冲刷、ack 前保留、dispatch 不被覆盖。
 */
const mockStore = new Map()

jest.mock('../../src/utils/db.js', () => ({
  dbGet: (name) => mockStore.get(name),
  dbSet: (name, value) => {
    mockStore.set(name, value)
  },
  dbRemove: (name) => {
    mockStore.delete(name)
  },
}))

jest.mock('../../src/utils/pageInfo.js', () => ({
  is_debug: false,
}))

describe('reportNetwork (private)', () => {
  let netChangeHandler
  let getNetworkTypeImpl

  beforeEach(() => {
    mockStore.clear()
    jest.resetModules()
    netChangeHandler = null
    getNetworkTypeImpl = (opts) => {
      opts.success({ networkType: 'wifi', isConnected: true })
    }
    global.uni = {
      getNetworkType: (opts) => getNetworkTypeImpl(opts),
      onNetworkStatusChange: (cb) => {
        netChangeHandler = cb
      },
    }
  })

  test('无网时 gateSend 挂起，不调用 sendFn', () => {
    getNetworkTypeImpl = (opts) => {
      opts.success({ networkType: 'none' })
    }
    const { gateSend, initReportNetwork } = require('../../src/core/reportNetwork.js')
    const sendFn = jest.fn()
    initReportNetwork(sendFn)
    gateSend({ requests: 'lt=1&lvts=0', t: 1 }, sendFn)
    expect(sendFn).not.toHaveBeenCalled()
    expect(mockStore.get('__UNI__STAT__NET_PENDING')).toHaveLength(1)
  })

  test('网络恢复后冲刷：ack 前包仍在队列（inflight），ack 后移除', () => {
    getNetworkTypeImpl = (opts) => {
      opts.success({ networkType: 'none' })
    }
    const {
      gateSend,
      initReportNetwork,
      ackPending,
    } = require('../../src/core/reportNetwork.js')
    const sent = []
    const sendFn = jest.fn((data) => {
      sent.push(data)
    })
    initReportNetwork(sendFn)
    gateSend({ requests: 'lvts=0', t: 1 }, sendFn)
    expect(sent).toHaveLength(0)

    getNetworkTypeImpl = (opts) => {
      opts.success({ networkType: 'wifi', isConnected: true })
    }
    netChangeHandler({ networkType: 'wifi', isConnected: true })
    expect(sent).toHaveLength(1)
    expect(sent[0].requests).toBe('lvts=0')
    // 成功前不得清空 storage，避免杀进程丢包
    const pending = mockStore.get('__UNI__STAT__NET_PENDING')
    expect(pending).toHaveLength(1)
    expect(pending[0]._inflight).toBe(true)

    ackPending(sent[0])
    expect(mockStore.get('__UNI__STAT__NET_PENDING') || []).toHaveLength(0)
  })

  test('flushOnInit=false 时 resumeReportNetwork 在有网时冲刷待发', () => {
    getNetworkTypeImpl = (opts) => {
      opts.success({ networkType: 'none' })
    }
    const {
      gateSend,
      initReportNetwork,
      resumeReportNetwork,
      ackPending,
    } = require('../../src/core/reportNetwork.js')
    const sent = []
    const sendFn = jest.fn((data) => {
      sent.push(data)
      ackPending(data)
    })
    initReportNetwork(sendFn, { flushOnInit: false })
    gateSend({ requests: 'lvts=0', t: 2 }, sendFn)
    expect(sent).toHaveLength(0)

    getNetworkTypeImpl = (opts) => {
      opts.success({ networkType: '4g', isConnected: true })
    }
    resumeReportNetwork()
    expect(sent).toHaveLength(1)
    expect(sent[0].requests).toBe('lvts=0')
  })

  test('gateSend 不覆盖 init 注册的 dispatchSend', () => {
    getNetworkTypeImpl = (opts) => {
      opts.success({ networkType: 'none' })
    }
    const {
      gateSend,
      initReportNetwork,
    } = require('../../src/core/reportNetwork.js')
    const initSend = jest.fn()
    const otherSend = jest.fn()
    initReportNetwork(initSend, { flushOnInit: false })
    gateSend({ requests: 'lvts=0', t: 3 }, otherSend)
    expect(otherSend).not.toHaveBeenCalled()

    getNetworkTypeImpl = (opts) => {
      opts.success({ networkType: 'wifi', isConnected: true })
    }
    netChangeHandler({ networkType: 'wifi', isConnected: true })
    expect(initSend).toHaveBeenCalledTimes(1)
    expect(otherSend).not.toHaveBeenCalled()
  })

  test('toWirePayload 剥离内部字段', () => {
    const { toWirePayload } = require('../../src/core/reportNetwork.js')
    const wire = toWirePayload({
      usv: '1',
      t: 1,
      requests: 'x',
      _pendingId: 'p_1',
      _netAttempts: 2,
      _inflight: true,
      _httpRetry: 1,
    })
    expect(wire).toEqual({ usv: '1', t: 1, requests: 'x' })
  })

  test('冷启 clearStaleInflight 后可再次冲刷未 ack 包', () => {
    mockStore.set('__UNI__STAT__NET_PENDING', [
      { requests: 'lvts=0', t: 9, _pendingId: 'p_old', _inflight: true },
    ])
    const { initReportNetwork } = require('../../src/core/reportNetwork.js')
    const sent = []
    initReportNetwork((data) => {
      sent.push(data)
    })
    expect(sent).toHaveLength(1)
    expect(sent[0]._pendingId).toBe('p_old')
    expect(mockStore.get('__UNI__STAT__NET_PENDING')[0]._inflight).toBe(true)
  })
})
