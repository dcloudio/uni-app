import {
  type PushCallback,
  type PushCallbackData,
  createAppidRequiredError,
  initGtPush,
} from './shared'

declare const wx: any
declare const my: any
declare const tt: any
declare const swan: any
declare const qq: any
declare const ks: any
declare const jd: any
declare const xhs: any
declare const has: any
declare const qa: any

interface MiniProgramPushBridge {
  initialized: boolean
  callbacks: PushCallback[]
  enabled?: PushCallbackData
  clientId?: PushCallbackData
  lineState?: PushCallbackData
}

const UNI_PUSH_RUNTIME = '__uni_push_runtime__'

const appid = process.env.UNI_APP_ID!
const miniProgramPushBridge = getMiniProgramPushBridge()

if (miniProgramPushBridge) {
  initMiniProgramUniPush(miniProgramPushBridge)
} else {
  initUniPush()
}

function initUniPush() {
  invokePushCallback({
    type: 'enabled',
  })

  if (!appid) {
    Promise.resolve().then(() => {
      invokePushCallback(createAppidRequiredError())
    })
  } else {
    initGtPush(appid, invokePushCallback)
  }
}

function initMiniProgramUniPush(bridge: MiniProgramPushBridge) {
  const currentUni = uni
  const callback = (data: PushCallbackData) => {
    // @ts-expect-error
    currentUni.invokePushCallback(data)
  }
  registerPushCallback(bridge, callback)
  if (bridge.initialized) {
    return
  }
  bridge.initialized = true
  emitPushCallback(bridge, {
    type: 'enabled',
  })

  if (!appid) {
    Promise.resolve().then(() => {
      emitPushCallback(bridge, createAppidRequiredError())
    })
  } else {
    initGtPush(appid, (data) => {
      emitPushCallback(bridge, data)
    })
  }
}

function invokePushCallback(data: PushCallbackData) {
  // @ts-expect-error
  uni.invokePushCallback(data)
}

function getMiniProgramPushBridge(): MiniProgramPushBridge | undefined {
  const globalObject = getMiniProgramGlobal()
  if (!globalObject) {
    return
  }
  return (
    globalObject[UNI_PUSH_RUNTIME] ||
    (globalObject[UNI_PUSH_RUNTIME] = {
      initialized: false,
      callbacks: [],
    })
  )
}

function getMiniProgramGlobal(): Record<string, any> | undefined {
  const miniProgramApi = getMiniProgramApiGlobal()
  if (!miniProgramApi) {
    return
  }
  // 独立分包与主包会各自打包一份 uni-push 运行时；优先挂到 globalThis，
  // 避免小程序 runtime 重建 wx 等 API 包装对象后重复初始化 GtPush。
  if (typeof globalThis !== 'undefined') {
    return globalThis as any
  }
  return miniProgramApi
}

function getMiniProgramApiGlobal(): Record<string, any> | undefined {
  if (typeof wx !== 'undefined') {
    return wx
  } else if (typeof my !== 'undefined') {
    return my
  } else if (typeof tt !== 'undefined') {
    return tt
  } else if (typeof swan !== 'undefined') {
    return swan
  } else if (typeof qq !== 'undefined') {
    return qq
  } else if (typeof ks !== 'undefined') {
    return ks
  } else if (typeof jd !== 'undefined') {
    return jd
  } else if (typeof xhs !== 'undefined') {
    return xhs
  } else if (typeof has !== 'undefined') {
    return has
  } else if (typeof qa !== 'undefined') {
    return qa
  }
}

function registerPushCallback(
  bridge: MiniProgramPushBridge,
  callback: PushCallback
) {
  if (bridge.callbacks.indexOf(callback) === -1) {
    bridge.callbacks.push(callback)
  }
  replayPushCallback(bridge, callback)
}

function replayPushCallback(
  bridge: MiniProgramPushBridge,
  callback: PushCallback
) {
  if (bridge.enabled) {
    callback(bridge.enabled)
  }
  if (bridge.clientId) {
    callback(bridge.clientId)
  }
  if (bridge.lineState) {
    callback(bridge.lineState)
  }
}

function emitPushCallback(
  bridge: MiniProgramPushBridge,
  data: PushCallbackData
) {
  cachePushCallback(bridge, data)
  bridge.callbacks.slice().forEach((callback) => {
    callback(data)
  })
}

function cachePushCallback(
  bridge: MiniProgramPushBridge,
  data: PushCallbackData
) {
  if (data.type === 'enabled') {
    bridge.enabled = data
  } else if (data.type === 'clientId') {
    bridge.clientId = data
  } else if (data.type === 'lineState') {
    bridge.lineState = data
  }
}
