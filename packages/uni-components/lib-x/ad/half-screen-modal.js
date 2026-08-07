/** 半屏弹窗默认文案（msg 缺失或为空时使用） */
export const HALF_SCREEN_MODAL_DEFAULT_MSG = '即将为您打开其他小程序，是否继续？'

/**
 * 解析半屏弹窗展示文案
 * @param {string} msg 服务端或插件下发的 msg
 * @returns {string}
 */
export function resolveHalfScreenModalContent (msg) {
  if (typeof msg === 'string' && msg.trim()) {
    return msg.trim()
  }
  return HALF_SCREEN_MODAL_DEFAULT_MSG
}

/** 半屏弹窗页面级去重（组件重新挂载时重置，取消后当次不再弹） */
const _state = {
  dismissedAppIds: new Set(),
  showingAppId: null,
  pendingOpenOptions: null
}

/**
 * 重置半屏弹窗会话（ad 组件新建 / 页面重新进入时调用）
 */
export function resetHalfScreenModalSession () {
  _state.dismissedAppIds.clear()
  _state.showingAppId = null
  _state.pendingOpenOptions = null
}

/**
 * 是否允许展示半屏弹窗
 * @param {string} appId 目标小程序 appId
 * @returns {boolean}
 */
export function canShowHalfScreenModal (appId) {
  if (!appId) {
    return false
  }
  if (_state.dismissedAppIds.has(appId)) {
    return false
  }
  return true
}

/**
 * 是否有半屏弹窗正在展示
 * @returns {boolean}
 */
export function isHalfScreenModalShowing () {
  return !!_state.showingAppId
}

/**
 * 标记半屏弹窗正在展示
 * @param {string} appId 目标小程序 appId
 */
export function markHalfScreenModalShowing (appId) {
  _state.showingAppId = appId
}

/**
 * 解除半屏弹窗展示锁
 * @param {string} appId 目标小程序 appId
 */
export function unlockHalfScreenModalShowing (appId) {
  if (_state.showingAppId === appId) {
    _state.showingAppId = null
  }
}

/**
 * 标记半屏弹窗用户已确认（不阻止下次进入页面再弹）
 */
export function markHalfScreenModalConfirmed () {
  _state.showingAppId = null
  _state.pendingOpenOptions = null
}

/**
 * 标记半屏弹窗用户取消（当前会话不再弹）
 * @param {string} appId 目标小程序 appId
 */
export function markHalfScreenModalDismissed (appId) {
  if (appId) {
    _state.dismissedAppIds.add(appId)
  }
  _state.showingAppId = null
  _state.pendingOpenOptions = null
}

/**
 * 排队等待展示半屏弹窗（同 appId 多实例竞态时）
 * @param {Object} openOptions 打开参数
 */
export function queueHalfScreenModalOpenOptions (openOptions) {
  if (!openOptions || !openOptions.appId) {
    return
  }
  if (_state.dismissedAppIds.has(openOptions.appId)) {
    return
  }
  _state.pendingOpenOptions = openOptions
}

/**
 * 取出并排清空排队中的半屏弹窗参数
 * @returns {Object|null}
 */
export function takePendingHalfScreenModalOpenOptions () {
  const pending = _state.pendingOpenOptions
  _state.pendingOpenOptions = null
  if (!pending || !pending.appId) {
    return null
  }
  if (_state.dismissedAppIds.has(pending.appId)) {
    return null
  }
  return pending
}
