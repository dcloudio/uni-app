const ENV_KEYS = ['UNI_PLATFORM', 'UNI_APP_ID'] as const
const GLOBAL_KEYS = [
  'uni',
  'wx',
  'my',
  'tt',
  'swan',
  'qq',
  'ks',
  'jd',
  'xhs',
  'has',
  'qa',
  '__uni_push_runtime__',
] as const

const originalEnv = ENV_KEYS.reduce<Record<string, string | undefined>>(
  (env, key) => {
    env[key] = process.env[key]
    return env
  },
  {}
)

type GtPushInitOptions = {
  appid: string
  onError?: (res: { error: string }) => void
  onClientId?: (res: { cid: string }) => void
  onlineState?: (res: { online: boolean }) => void
  onPushMsg?: (res: { message: string }) => void
}

type GtPushMock = {
  init: jest.Mock<void, [GtPushInitOptions]>
  enableSocket: jest.Mock
}

function restoreEnv() {
  const env = process.env as Record<string, string | undefined>
  ENV_KEYS.forEach((key) => {
    const value = originalEnv[key]
    if (value === undefined) {
      delete env[key]
    } else {
      env[key] = value
    }
  })
}

function resetGlobals() {
  const globalObject = globalThis as Record<string, unknown>
  GLOBAL_KEYS.forEach((key) => {
    delete globalObject[key]
  })
}

function createUni() {
  return {
    invokePushCallback: jest.fn(),
    onAppShow: jest.fn(),
    onPushMessage: jest.fn(),
    createPushMessage: jest.fn(),
    navigateTo: jest.fn(),
    switchTab: jest.fn(),
  }
}

function createGtPushMock(): GtPushMock {
  return {
    init: jest.fn(),
    enableSocket: jest.fn(),
  }
}

async function loadPushRuntime(
  gtPush: GtPushMock,
  entry: '../src/index' | '../src/mp' = '../src/mp'
) {
  const initPushNotification = jest.fn()
  const initBroadcastChannel = jest.fn()
  const postPushMessage = jest.fn()

  jest.doMock('../lib/gtpush-min', () => ({
    __esModule: true,
    default: gtPush,
  }))
  jest.doMock('../src/route', () => ({ initPushNotification }))
  jest.doMock('../src/broadcastChannel', () => ({
    initBroadcastChannel,
    postPushMessage,
  }))

  await import(entry)

  return {
    initBroadcastChannel,
    initPushNotification,
    postPushMessage,
  }
}

function getInitOptions(gtPush: GtPushMock) {
  const options = gtPush.init.mock.calls[0]?.[0]
  expect(options).toBeTruthy()
  return options
}

beforeEach(() => {
  jest.resetModules()
  resetGlobals()
  process.env.UNI_APP_ID = '__UNI__TEST'
})

afterEach(() => {
  restoreEnv()
  resetGlobals()
  jest.resetModules()
  jest.clearAllMocks()
})

describe('uni-push mini program runtime bridge', () => {
  test('initializes GtPush once and replays persistent states to later runtimes', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    ;(globalThis as any).wx = {}
    const gtPush = createGtPushMock()
    const firstUni = createUni()
    ;(globalThis as any).uni = firstUni

    await loadPushRuntime(gtPush)

    expect(gtPush.init).toHaveBeenCalledTimes(1)
    expect(firstUni.invokePushCallback).toHaveBeenCalledWith({
      type: 'enabled',
    })

    jest.resetModules()
    ;(globalThis as any).wx = {}
    const secondUni = createUni()
    ;(globalThis as any).uni = secondUni

    await loadPushRuntime(gtPush)

    expect(gtPush.init).toHaveBeenCalledTimes(1)
    expect(secondUni.invokePushCallback).toHaveBeenCalledWith({
      type: 'enabled',
    })

    const options = getInitOptions(gtPush)
    options.onClientId?.({ cid: 'cid-1' })
    options.onlineState?.({ online: true })
    options.onPushMsg?.({ message: 'message-1' })

    expect(firstUni.invokePushCallback).toHaveBeenCalledWith({
      type: 'clientId',
      cid: 'cid-1',
    })
    expect(secondUni.invokePushCallback).toHaveBeenCalledWith({
      type: 'lineState',
      online: true,
    })
    expect(firstUni.invokePushCallback).toHaveBeenCalledWith({
      type: 'pushMsg',
      message: 'message-1',
    })
    expect(secondUni.invokePushCallback).toHaveBeenCalledWith({
      type: 'pushMsg',
      message: 'message-1',
    })

    jest.resetModules()
    ;(globalThis as any).wx = {}
    const thirdUni = createUni()
    ;(globalThis as any).uni = thirdUni

    await loadPushRuntime(gtPush)

    expect(gtPush.init).toHaveBeenCalledTimes(1)
    expect(thirdUni.invokePushCallback).toHaveBeenCalledWith({
      type: 'enabled',
    })
    expect(thirdUni.invokePushCallback).toHaveBeenCalledWith({
      type: 'clientId',
      cid: 'cid-1',
    })
    expect(thirdUni.invokePushCallback).toHaveBeenCalledWith({
      type: 'lineState',
      online: true,
    })
    expect(thirdUni.invokePushCallback).not.toHaveBeenCalledWith({
      type: 'pushMsg',
      message: 'message-1',
    })
  })

  test('keeps non-mp platforms on the original direct runtime path', async () => {
    process.env.UNI_PLATFORM = 'h5'
    ;(globalThis as any).wx = {}
    const gtPush = createGtPushMock()
    const firstUni = createUni()
    ;(globalThis as any).uni = firstUni

    const firstRuntime = await loadPushRuntime(gtPush, '../src/index')

    expect(gtPush.init).toHaveBeenCalledTimes(1)
    expect((globalThis as any).__uni_push_runtime__).toBeUndefined()
    expect(firstUni.invokePushCallback).toHaveBeenCalledWith({
      type: 'enabled',
    })

    const options = getInitOptions(gtPush)
    options.onClientId?.({ cid: 'h5-cid' })

    expect(firstUni.invokePushCallback).toHaveBeenCalledWith({
      type: 'clientId',
      cid: 'h5-cid',
    })
    expect(firstRuntime.postPushMessage).toHaveBeenCalledWith({
      type: 'clientId',
      cid: 'h5-cid',
    })

    jest.resetModules()
    const secondUni = createUni()
    ;(globalThis as any).uni = secondUni

    await loadPushRuntime(gtPush, '../src/index')

    expect(gtPush.init).toHaveBeenCalledTimes(2)
  })
})
