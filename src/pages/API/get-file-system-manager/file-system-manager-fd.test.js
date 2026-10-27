const {
  isIOS,
  isUnsupported,
  createContext,
  setPageData,
  readData,
  tapAndWait,
  arrangeDir,
  cleanupContext,
  writeFile,
  unsupportedTest
} = require('./file-system-manager-test-utils')

async function arrangeFile(context, dir, content = '我爱北京天安门，天安门前太阳升') {
  await arrangeDir(context, context.paths.basePath, dir, true)
  await writeFile(context.page, { file: `${dir}/1.txt`, content, sync: true })
  await setPageData(context.page, {
    mkdirFile: dir,
    readFile: `${dir}/1.txt`,
    writeFile: `${dir}/1.txt`
  })
}

describe('FileSystemManager file descriptor actions', () => {
  if (isUnsupported) {
    unsupportedTest()
    return
  }

  let context
  beforeEach(async () => { context = await createContext() })
  afterEach(async () => { await cleanupContext(context) })

  it('opens a file asynchronously', async () => {
    await arrangeFile(context, 'fsm-fd-open-async')
    await tapAndWait(context.page, '#btn-open-file')
    expect(await readData(context.page, 'fd')).not.toEqual('')
  })

  it('opens a file synchronously', async () => {
    await arrangeFile(context, 'fsm-fd-open-sync')
    await tapAndWait(context.page, '#btn-open-file-sync')
    expect(await readData(context.page, 'fd')).not.toEqual('')
  })

  it('closes files through async and sync APIs', async () => {
    const { page } = context
    await arrangeFile(context, 'fsm-fd-close')
    await tapAndWait(page, '#btn-close-file')
    expect(await readData(page, 'closeFileRet')).toEqual('close:ok')
    await setPageData(page, { closeFileRet: '' })
    await tapAndWait(page, '#btn-close-file-sync')
    expect(await readData(page, 'closeFileRet')).toEqual('close:ok')
  })

  it('writes through an async file descriptor', async () => {
    const { page } = context
    await arrangeFile(context, 'fsm-fd-write')
    await setPageData(page, { writeData: '我是一只小小鸟' })
    await tapAndWait(page, '#btn-write')
    expect(await readData(page, 'bytesWritten')).toEqual(21)
  })

  it('writes through a sync file descriptor', async () => {
    const { page } = context
    await arrangeFile(context, 'fsm-fd-write-sync')
    await setPageData(page, { writeData: '我是' })
    await tapAndWait(page, '#btn-write-sync')
    expect(await readData(page, 'bytesWritten')).toEqual(6)
  })

  it('reads fstat through async and sync APIs', async () => {
    const { page } = context
    await arrangeFile(context, 'fsm-fd-stat')
    await tapAndWait(page, '#btn-fstat-file')
    expect(await readData(page, 'fstatSize')).toBeGreaterThan(0)
    await tapAndWait(page, '#btn-fstat-file-sync')
    expect(await readData(page, 'fstatSize')).toBeGreaterThan(0)
  })

  it('ftruncates through the async API', async () => {
    const { page } = context
    const file = 'fsm-fd-truncate-async/1.txt'
    await arrangeFile(context, 'fsm-fd-truncate-async', 'wsyzxxnws')
    await tapAndWait(page, '#btn-ftruncate-file')
    expect(await readData(page, 'ftruncateRet')).toEqual('ftruncate:ok')
    await setPageData(page, { statFile: file, recursiveVal: false })
    await tapAndWait(page, '#btn-stat-file')
    if (!isIOS) {
      expect((await readData(page, 'statsRet'))[0].stats.size).toEqual(6)
    }
  })

  it('ftruncates through the sync API', async () => {
    const { page } = context
    const file = 'fsm-fd-truncate-sync/1.txt'
    await arrangeFile(context, 'fsm-fd-truncate-sync', 'wsyzxxnws')
    await tapAndWait(page, '#btn-ftruncate-file-sync')
    expect(await readData(page, 'ftruncateRet')).toEqual('ftruncate:ok')
    await setPageData(page, { statFile: file, recursiveVal: false })
    await tapAndWait(page, '#btn-stat-file')
    if (!isIOS) {
      expect((await readData(page, 'statsRet'))[0].stats.size).toEqual(4)
    }
  })

  it('reads entries from a bundled zip file', async () => {
    const { page } = context
    await tapAndWait(page, '#btn-readzip-entry')
    const entries = await readData(page, 'zipEntryNames')
    expect(entries).toContain('1.txt')
    expect(entries).toContain('2.txt')
  })
})
