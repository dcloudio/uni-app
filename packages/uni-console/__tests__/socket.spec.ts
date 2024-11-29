import { initRuntimeSocket } from '../src/runtime/socket'

declare global {
  // @ts-ignore
  var uni: any
}

describe('initRuntimeSocket', () => {
  const hosts = '127.0.0.1,localhost'
  const port = '9999'
  const id = 'test-id'

  beforeEach(() => {
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
      close: jest.fn(),
    }

    // @ts-ignore
    uni.connectSocket.mockReturnValue(mockSocket)

    const result = await initRuntimeSocket(hosts, port, id)

    expect(result).toBe(mockSocket)
    expect(uni.connectSocket).toHaveBeenCalledWith({
      url: 'ws://127.0.0.1:9999/test-id',
      multiple: true,
      fail: expect.any(Function),
    })
  })

  test('should try connecting to second host when first host fails', async () => {
    const mockSocket1 = {
      onOpen: jest.fn(),
      onClose: jest.fn((cb) => cb({})),
      onError: jest.fn(),
      onMessage: jest.fn(),
      close: jest.fn(),
    }

    const mockSocket2 = {
      onOpen: jest.fn((cb) => cb({})),
      onClose: jest.fn(),
      onError: jest.fn(),
      onMessage: jest.fn(),
      close: jest.fn(),
    }

    uni.connectSocket
      // @ts-ignore
      .mockReturnValueOnce(mockSocket1)
      // @ts-ignore
      .mockReturnValueOnce(mockSocket2)

    const result = await initRuntimeSocket(hosts, port, id)

    expect(result).toBe(mockSocket2)
    expect(uni.connectSocket).toHaveBeenCalledTimes(2)
    expect(uni.connectSocket).toHaveBeenNthCalledWith(1, {
      url: 'ws://127.0.0.1:9999/test-id',
      multiple: true,
      fail: expect.any(Function),
    })
    expect(uni.connectSocket).toHaveBeenNthCalledWith(2, {
      url: 'ws://localhost:9999/test-id',
      multiple: true,
      fail: expect.any(Function),
    })
  })

  test('should return null when all hosts fail', async () => {
    const mockSocket = {
      onOpen: jest.fn(),
      onClose: jest.fn(),
      onError: jest.fn((cb) => cb({})),
      onMessage: jest.fn(),
      close: jest.fn(),
    }

    // @ts-ignore
    uni.connectSocket.mockReturnValue(mockSocket)

    const result = await initRuntimeSocket(hosts, port, id)

    expect(result).toBeNull()
    expect(uni.connectSocket).toHaveBeenCalledTimes(2)
  })

  test('should try next host after connection timeout', async () => {
    const mockSocket1 = {
      onOpen: jest.fn(),
      onClose: jest.fn(),
      onError: jest.fn(),
      onMessage: jest.fn(),
      close: jest.fn(),
    }

    const mockSocket2 = {
      onOpen: jest.fn((cb) => cb({})),
      onClose: jest.fn(),
      onError: jest.fn(),
      onMessage: jest.fn(),
      close: jest.fn(),
    }

    uni.connectSocket
      // @ts-ignore
      .mockImplementationOnce(({ fail }) => {
        fail({ errMsg: 'timeout' })
        return mockSocket1
      })
      // @ts-ignore
      .mockReturnValueOnce(mockSocket2)

    const result = await initRuntimeSocket(hosts, port, id)

    expect(result).toBe(mockSocket2)
    expect(uni.connectSocket).toHaveBeenCalledTimes(2)
  })

  test('should handle empty host list correctly', async () => {
    const result = await initRuntimeSocket('', port, id)

    expect(result).toBeNull()
    expect(uni.connectSocket).not.toHaveBeenCalled()
  })

  test('should handle invalid port number correctly', async () => {
    const result = await initRuntimeSocket(hosts, '', id)

    expect(result).toBeNull()
    expect(uni.connectSocket).not.toHaveBeenCalled()
  })

  test('should handle invalid socket ID correctly', async () => {
    const result = await initRuntimeSocket(hosts, port, '')

    expect(result).toBeNull()
    expect(uni.connectSocket).not.toHaveBeenCalled()
  })
})
