/**
 * 私有版网络门闸（core / 私有入口共用一份实现）。
 *
 * 覆盖私有版历史代码编出的 uni-stat（1.0 HTTP）与 uni-cloud-stat（云函数），
 * 通过 init 时注册的 sendFn 区分通道，**不**按 1.0/2.0 拆文件。
 *
 * 与公有版（src/public/runtime/networkGate.ts）完全分离，互不引用。
 *
 * 说明：H5 弱网、未关联服务空间等非正常业务路径不做额外兜底。
 */
import { dbGet, dbSet } from '../utils/db.js'
import { is_debug } from '../utils/pageInfo.js'

const PENDING_KEY = '__UNI__STAT__NET_PENDING'
const MAX_PENDING = 50
const MAX_ATTEMPTS = 10

/** 仅本地队列使用，不得随上报上行 */
const META_KEYS = ['_pendingId', '_netAttempts', '_inflight', '_httpRetry']

let watcherInstalled = false
let flushing = false
/** @type {null | ((optionsData: any) => void)} */
let dispatchSend = null

/**
 * 判断当前是否无网（仅 none / isConnected===false；unknown 不当无网）。
 */
function isOffline(networkType, isConnected) {
  if (isConnected === false) return true
  return networkType === 'none'
}

/**
 * 读取私有版待发队列。
 */
function readPending() {
  const list = dbGet(PENDING_KEY)
  return Array.isArray(list) ? list : []
}

/**
 * 写入私有版待发队列（超出上限丢最旧）。
 */
function writePending(list) {
  const next = Array.isArray(list) ? list : []
  dbSet(PENDING_KEY, next.slice(-MAX_PENDING))
}

/**
 * 为上报包分配 pendingId（若尚无）。
 */
function ensurePendingId(optionsData) {
  if (!optionsData._pendingId) {
    optionsData._pendingId =
      'p_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8)
  }
  return optionsData._pendingId
}

/**
 * 剥离门闸内部字段，得到可上行的净荷（避免 _pendingId 等污染服务端）。
 * @param {any} optionsData
 */
export function toWirePayload(optionsData) {
  if (!optionsData || typeof optionsData !== 'object') return optionsData
  const wire = {}
  for (const key in optionsData) {
    if (Object.prototype.hasOwnProperty.call(optionsData, key) && META_KEYS.indexOf(key) === -1) {
      wire[key] = optionsData[key]
    }
  }
  return wire
}

/**
 * 冷启时清除遗留 inflight 标记，使上次未 ack 的包可再次冲刷。
 */
function clearStaleInflight() {
  const list = readPending()
  if (!list.length) return
  let changed = false
  const next = list.map(function (it) {
    if (!it || !it._inflight) return it
    changed = true
    const copy = Object.assign({}, it)
    delete copy._inflight
    return copy
  })
  if (changed) writePending(next)
}

/**
 * 将上报包持久化挂起（无网或最终发送失败）。
 * 失败回写时清除 inflight，便于下次冲刷。
 */
export function persistPending(optionsData) {
  if (!optionsData) return
  ensurePendingId(optionsData)
  delete optionsData._inflight
  const attempts = (optionsData._netAttempts || 0) + 1
  optionsData._netAttempts = attempts
  if (attempts > MAX_ATTEMPTS) {
    if (is_debug) {
      console.warn(
        '=== uni统计(私有版) 待发超过重试上限，丢弃 ===',
        optionsData._pendingId
      )
    }
    ackPending(optionsData)
    return
  }
  const list = readPending().filter(
    (it) => it && it._pendingId !== optionsData._pendingId
  )
  list.push(optionsData)
  writePending(list)
  if (is_debug) {
    console.log(
      '=== uni统计(私有版) 已挂起上报，等待网络 ===',
      optionsData._pendingId
    )
  }
}

/**
 * 上报成功后从待发队列移除。
 */
export function ackPending(optionsData) {
  if (!optionsData || !optionsData._pendingId) return
  writePending(
    readPending().filter((it) => it && it._pendingId !== optionsData._pendingId)
  )
}

/**
 * 注册网络变化监听（单例）。
 */
function installWatcher() {
  if (watcherInstalled) return
  if (
    typeof uni === 'undefined' ||
    typeof uni.onNetworkStatusChange !== 'function'
  ) {
    return
  }
  watcherInstalled = true
  uni.onNetworkStatusChange(function onNetworkStatusChangePrivate(res) {
    if (isOffline(res && res.networkType, res && res.isConnected)) return
    flushPending()
  })
}

/**
 * 冲刷待发：ack 前保留在 storage（标 inflight），避免进程被杀导致丢包。
 */
function flushPending() {
  if (flushing || typeof dispatchSend !== 'function') return
  const list = readPending()
  if (!list.length) return

  const toSend = []
  const next = []
  for (let i = 0; i < list.length; i++) {
    const it = list[i]
    if (!it) continue
    if (it._inflight) {
      next.push(it)
      continue
    }
    it._inflight = true
    next.push(it)
    toSend.push(it)
  }
  if (!toSend.length) return

  flushing = true
  writePending(next)
  try {
    for (let i = 0; i < toSend.length; i++) {
      dispatchSend(toSend[i])
    }
  } finally {
    flushing = false
  }
}

/**
 * 先 getNetworkType，有网再冲刷；无网则继续等待监听。
 */
function tryFlushWhenOnline() {
  if (typeof uni === 'undefined' || typeof uni.getNetworkType !== 'function') {
    flushPending()
    return
  }
  uni.getNetworkType({
    success: function (res) {
      if (isOffline(res && res.networkType, res && res.isConnected)) return
      flushPending()
    },
    fail: function () {
      // 探测失败时不盲目冲刷，等 onNetworkStatusChange
    },
  })
}

/**
 * 初始化私有版网络门闸。
 * @param {(optionsData: any) => void} sendFn 实际发送（由调用方决定通道）
 * @param {{ flushOnInit?: boolean }} [opts] 云函数通道建议 flushOnInit=false，等服务空间就绪后再 resume
 */
export function initReportNetwork(sendFn, opts) {
  dispatchSend = sendFn
  clearStaleInflight()
  installWatcher()
  const flushOnInit = !opts || opts.flushOnInit !== false
  if (flushOnInit) {
    tryFlushWhenOnline()
  }
}

/**
 * 服务空间就绪后 / 需要主动冲刷时调用。
 */
export function resumeReportNetwork() {
  tryFlushWhenOnline()
}

/**
 * 发送门闸：无网挂起，有网才调用 sendFn。
 * 不覆盖 init 注册的 dispatchSend，避免冲刷走错通道。
 * @param {any} optionsData
 * @param {(optionsData: any) => void} sendFn
 */
export function gateSend(optionsData, sendFn) {
  installWatcher()
  if (typeof uni === 'undefined' || typeof uni.getNetworkType !== 'function') {
    sendFn(optionsData)
    return
  }
  uni.getNetworkType({
    success: function (res) {
      if (isOffline(res && res.networkType, res && res.isConnected)) {
        persistPending(optionsData)
        return
      }
      sendFn(optionsData)
    },
    fail: function () {
      sendFn(optionsData)
    },
  })
}
