import { initRuntimeSocket } from '../src/runtime/socket'

declare global {
  // @ts-ignore
  var uni: any
}

describe('initRuntimeSocket', () => {
  beforeEach(() => {
    // Mock global variables
    global.__UNI_SOCKET_HOSTS__ = '127.0.0.1,localhost'
    global.__UNI_SOCKET_PORT__ = '9999'
    global.__UNI_SOCKET_ID__ = 'test-id'

    uni.connectSocket = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should successfully connect to the first available host', async () => {
    const mockSocket = {
      onOpen: jest.fn((cb) => {
        cb({})
      }),
      onClose: jest.fn(),
      onError: jest.fn(),
      onMessage: jest.fn(),
    }

    // @ts-ignore
    uni.connectSocket.mockReturnValue(mockSocket)

    const result = await initRuntimeSocket()

    expect(result).toBe(mockSocket)
    expect(uni.connectSocket).toHaveBeenCalledWith({
      url: 'ws://127.0.0.1:9999/test-id',
      timeout: 1000,
      fail: expect.any(Function),
    })
  })

  test('should try connecting to second host when first host fails', async () => {
    const mockSocket1 = {
      onOpen: jest.fn(),
      onClose: jest.fn((cb) => cb({})),
      onError: jest.fn(),
      onMessage: jest.fn(),
    }

    const mockSocket2 = {
      onOpen: jest.fn((cb) => cb({})),
      onClose: jest.fn(),
      onError: jest.fn(),
      onMessage: jest.fn(),
    }

    uni.connectSocket
      // @ts-ignore
      .mockReturnValueOnce(mockSocket1)
      // @ts-ignore
      .mockReturnValueOnce(mockSocket2)

    const result = await initRuntimeSocket()

    expect(result).toBe(mockSocket2)
    expect(uni.connectSocket).toHaveBeenCalledTimes(2)
    expect(uni.connectSocket).toHaveBeenNthCalledWith(1, {
      url: 'ws://127.0.0.1:9999/test-id',
      timeout: 1000,
      fail: expect.any(Function),
    })
    expect(uni.connectSocket).toHaveBeenNthCalledWith(2, {
      url: 'ws://localhost:9999/test-id',
      timeout: 1000,
      fail: expect.any(Function),
    })
  })

  test('should return null when all hosts fail', async () => {
    const mockSocket = {
      onOpen: jest.fn(),
      onClose: jest.fn(),
      onError: jest.fn((cb) => cb({})),
      onMessage: jest.fn(),
    }

    // @ts-ignore
    uni.connectSocket.mockReturnValue(mockSocket)

    const result = await initRuntimeSocket()

    expect(result).toBeNull()
    expect(uni.connectSocket).toHaveBeenCalledTimes(2)
  })

  test('should try next host after connection timeout', async () => {
    const mockSocket1 = {
      onOpen: jest.fn(),
      onClose: jest.fn(),
      onError: jest.fn(),
      onMessage: jest.fn(),
    }

    const mockSocket2 = {
      onOpen: jest.fn((cb) => cb({})),
      onClose: jest.fn(),
      onError: jest.fn(),
      onMessage: jest.fn(),
    }

    uni.connectSocket
      // @ts-ignore
      .mockImplementationOnce(({ fail }) => {
        fail({ errMsg: 'timeout' })
        return mockSocket1
      })
      // @ts-ignore
      .mockReturnValueOnce(mockSocket2)

    const result = await initRuntimeSocket()

    expect(result).toBe(mockSocket2)
    expect(uni.connectSocket).toHaveBeenCalledTimes(2)
  })

  test('should handle empty host list correctly', async () => {
    global.__UNI_SOCKET_HOSTS__ = ''

    const result = await initRuntimeSocket()

    expect(result).toBeNull()
    expect(uni.connectSocket).not.toHaveBeenCalled()
  })

  test('should handle invalid port number correctly', async () => {
    global.__UNI_SOCKET_PORT__ = ''

    const result = await initRuntimeSocket()

    expect(result).toBeNull()
    expect(uni.connectSocket).not.toHaveBeenCalled()
  })

  test('should handle invalid socket ID correctly', async () => {
    global.__UNI_SOCKET_ID__ = ''

    const result = await initRuntimeSocket()

    expect(result).toBeNull()
    expect(uni.connectSocket).not.toHaveBeenCalled()
  })
})
