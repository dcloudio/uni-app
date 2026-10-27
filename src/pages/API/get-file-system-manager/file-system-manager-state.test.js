const {
  isUnsupported,
  createContext,
  readData,
  cleanupContext,
  unsupportedTest
} = require('./file-system-manager-test-utils')

describe('FileSystemManager state', () => {
  if (isUnsupported) {
    unsupportedTest()
    return
  }

  let context
  beforeEach(async () => { context = await createContext() })
  afterEach(async () => { await cleanupContext(context) })

  it('initializes non-empty sandbox paths', async () => {
    expect(context.paths.basePath.length).toBeGreaterThan(0)
    expect(context.paths.globalTempPath.length).toBeGreaterThan(0)
    expect(context.paths.globalRootPath.length).toBeGreaterThan(0)
    expect(context.paths.globalUserDataPath.length).toBeGreaterThan(0)
  })

  it('uses UTF-8 and recursive operations by default', async () => {
    expect(await readData(context.page, 'writeFileEncoding')).toEqual('utf-8')
    expect(await readData(context.page, 'readFileEncoding')).toEqual('utf-8')
    expect(await readData(context.page, 'recursiveVal')).toBe(true)
  })

  it('initializes key result fields before any operation', async () => {
    const { page } = context
    expect(await readData(page, 'done')).toBe(false)
    expect(await readData(page, 'fileListSuccess')).toEqual([])
    expect(await readData(page, 'readFileRet')).toEqual('')
    expect(await readData(page, 'fd')).toEqual('')
    expect(await readData(page, 'bytesWritten')).toEqual(0)
    expect(await readData(page, 'compressedFileRet')).toEqual('')
    expect(await readData(page, 'zipEntryNames')).toEqual([])
    const fstat = await readData(page, 'fstat')
    expect(fstat == null).toBe(true)
  })
})
