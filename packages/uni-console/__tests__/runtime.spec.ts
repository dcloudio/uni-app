const ENV_KEYS = [
  'UNI_SOCKET_HOSTS',
  'UNI_SOCKET_ID',
  'UNI_SOCKET_PORT',
] as const

const originalEnv = ENV_KEYS.reduce<Record<string, string | undefined>>(
  (env, key) => {
    env[key] = process.env[key]
    return env
  },
  {}
)

type RuntimeModule = typeof import('../src/runtime/index')

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

function setRuntimeEnv() {
  process.env.UNI_SOCKET_HOSTS = '127.0.0.1'
  process.env.UNI_SOCKET_PORT = '9999'
  process.env.UNI_SOCKET_ID = 'test'
}

function createSocket() {
  return {
    onClose: jest.fn(),
    send: jest.fn(),
  }
}

async function loadRuntime(initRuntimeSocket: jest.Mock) {
  const rewriteConsole = jest.fn(() => jest.fn())
  const setSendConsole = jest.fn()
  const initOnError = jest.fn(() => jest.fn())
  const setSendError = jest.fn()
  const originalConsole = {
    error: jest.fn(),
    log: jest.fn(),
  }
  jest.doMock('../src/runtime/socket', () => ({ initRuntimeSocket }))
  jest.doMock('../src/runtime/console', () => ({
    rewriteConsole,
    setSendConsole,
  }))
  jest.doMock('../src/runtime/error', () => ({
    initOnError,
    setSendError,
  }))
  jest.doMock('../src/runtime/console/utils', () => ({ originalConsole }))
  const runtime = (await import('../src/runtime/index')) as RuntimeModule
  return {
    initOnError,
    initRuntimeSocket,
    rewriteConsole,
    runtime,
  }
}

beforeEach(() => {
  jest.resetModules()
  setRuntimeEnv()
  const globalObject = global as any
  globalObject.__PLATFORM__ = 'mp'
  globalObject.wx = {}
})

afterEach(() => {
  restoreEnv()
  delete (global as any).__PLATFORM__
  delete (global as any).wx
  jest.resetModules()
  jest.clearAllMocks()
})

describe('initRuntimeSocketService', () => {
  test('shares socket initialization on mini program global', async () => {
    const initRuntimeSocket = jest.fn(() => Promise.resolve(createSocket()))
    const { initOnError, rewriteConsole, runtime } = await loadRuntime(
      initRuntimeSocket
    )

    await expect(runtime.initRuntimeSocketService()).resolves.toBe(true)
    await expect(runtime.initRuntimeSocketService()).resolves.toBe(true)

    expect(initRuntimeSocket).toHaveBeenCalledTimes(1)
    expect(initOnError).toHaveBeenCalledTimes(1)
    expect(rewriteConsole).toHaveBeenCalledTimes(1)
    expect((global as any).wx.__uni_console__).toBe(true)
  })

  test('clears global guard after socket initialization failure', async () => {
    const initRuntimeSocket = jest
      .fn()
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(createSocket())
    const { runtime } = await loadRuntime(initRuntimeSocket)

    await expect(runtime.initRuntimeSocketService()).resolves.toBe(false)
    expect(initRuntimeSocket).toHaveBeenCalledTimes(1)
    expect((global as any).wx.__uni_console_runtime_promise__).toBeUndefined()

    await expect(runtime.initRuntimeSocketService()).resolves.toBe(true)
    expect(initRuntimeSocket).toHaveBeenCalledTimes(2)
  })
})
