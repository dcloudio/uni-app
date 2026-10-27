const {
  isUnsupported,
  createContext,
  setPageData,
  readData,
  tapAndWait,
  cleanupContext,
  unsupportedTest
} = require('./file-system-manager-test-utils')

describe('FileSystemManager ArrayBuffer operations', () => {
  if (isUnsupported) {
    unsupportedTest()
    return
  }

  let context
  beforeEach(async () => { context = await createContext() })
  afterEach(async () => {
    try {
      await setPageData(context.page, {
        basePath: context.paths.globalUserDataPath,
        unlinkFile: 'hello.txt'
      })
      await tapAndWait(context.page, '#btn-unlink-file')
    } finally {
      await cleanupContext(context)
    }
  })

  it('writes and reads an ArrayBuffer file asynchronously', async () => {
    await tapAndWait(context.page, '#btn-writereadfile-buffer')
    expect(await readData(context.page, 'arrayBufferRes')).toEqual(1.2222222)
  })

  it('writes and reads an ArrayBuffer file synchronously', async () => {
    await tapAndWait(context.page, '#btn-writereadfilesync-buffer')
    expect(await readData(context.page, 'arrayBufferRes')).toEqual(1.333)
  })

  it('writes and reads through a file descriptor asynchronously', async () => {
    await tapAndWait(context.page, '#btn-writeread-buffer')
    expect(await readData(context.page, 'arrayBufferRes')).toEqual(1.24)
  })

  it('writes and reads through a file descriptor synchronously', async () => {
    await tapAndWait(context.page, '#btn-writereadsync-buffer')
    expect(await readData(context.page, 'arrayBufferRes')).toEqual(1.11)
  })

  it('appends an ArrayBuffer asynchronously', async () => {
    await tapAndWait(context.page, '#btn-appendfile-buffer')
    expect(await readData(context.page, 'arrayBufferRes')).toEqual(21)
  })

  it('appends an ArrayBuffer synchronously', async () => {
    await tapAndWait(context.page, '#btn-appendfilesync-buffer')
    expect(await readData(context.page, 'arrayBufferRes')).toEqual(20)
  })
})
