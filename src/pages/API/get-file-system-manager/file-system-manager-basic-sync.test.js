const {
  isAndroid,
  isUnsupported,
  createContext,
  setPageData,
  readData,
  tapAndWait,
  arrangeDir,
  cleanupContext,
  writeFile,
  readFile,
  readDir,
  unsupportedTest
} = require('./file-system-manager-test-utils')

async function arrangeFile(context, dir, content = '我爱北京天安门，天安门前太阳升') {
  await arrangeDir(context, context.paths.basePath, dir, true)
  await writeFile(context.page, { file: `${dir}/1.txt`, content, sync: true })
  await setPageData(context.page, {
    mkdirFile: dir,
    readFile: `${dir}/1.txt`,
    writeFile: `${dir}/1.txt`,
    unlinkFile: `${dir}/1.txt`,
    accessFile: `${dir}/1.txt`,
    readDir: dir,
    rmDirFile: dir
  })
}

describe('FileSystemManager basic sync actions', () => {
  if (isUnsupported) {
    unsupportedTest()
    return
  }

  let context
  beforeEach(async () => { context = await createContext() })
  afterEach(async () => { await cleanupContext(context) })

  it('creates and lists a directory synchronously', async () => {
    const dir = 'fsm-sync-mkdir'
    await arrangeDir(context, context.paths.basePath, dir, true)
    expect(await readDir(context.page, true)).toEqual([])
  })

  it('creates a child directory non-recursively with mkdirSync', async () => {
    const { page } = context
    const parent = 'fsm-sync-mkdir-parent'
    await arrangeDir(context, context.paths.basePath, parent, true)
    await setPageData(page, { mkdirFile: `${parent}/child`, recursiveVal: false })
    await tapAndWait(page, '#btn-mkdir-sync')
    await setPageData(page, { readDir: parent })
    expect(await readDir(page, true)).toContain('child')
  })

  it('recursively removes a non-empty child directory with rmdirSync', async () => {
    const { page } = context
    const parent = 'fsm-sync-rmdir-parent'
    const child = `${parent}/child`
    await arrangeDir(context, context.paths.basePath, parent, true)
    await setPageData(page, { mkdirFile: child, recursiveVal: false })
    await tapAndWait(page, '#btn-mkdir-sync')
    await writeFile(page, { file: `${child}/1.txt`, content: 'remove child', sync: true })
    await setPageData(page, { rmDirFile: child, recursiveVal: true })
    await tapAndWait(page, '#btn-remove-dir-sync')
    await setPageData(page, { readDir: parent })
    expect(await readDir(page, true)).not.toContain('child')
  })

  it('writes and reads synchronously', async () => {
    await arrangeFile(context, 'fsm-sync-write-read')
    expect(await readFile(context.page, true)).toEqual('我爱北京天安门，天安门前太阳升')
  })

  it('accesses a file synchronously', async () => {
    await arrangeFile(context, 'fsm-sync-access')
    await tapAndWait(context.page, '#btn-access-file-sync')
    expect(await readData(context.page, 'accessFileRet')).toEqual('access:ok')
  })

  it('renames a file synchronously', async () => {
    const { page } = context
    const dir = 'fsm-sync-rename'
    await arrangeFile(context, dir)
    await setPageData(page, { renameFromFile: `${dir}/1.txt`, renameToFile: `${dir}/2.txt` })
    await tapAndWait(page, '#btn-rename-file-sync')
    expect(await readData(page, 'renameFileRet')).toEqual('rename:ok')
    expect(await readDir(page, true)).toEqual(['2.txt'])
  })

  it('appends synchronously', async () => {
    const { page } = context
    await arrangeFile(context, 'fsm-sync-append')
    await setPageData(page, { appendFileContent: '再说一遍' })
    await tapAndWait(page, '#btn-append-file-sync')
    expect(await readFile(page, true)).toEqual('我爱北京天安门，天安门前太阳升再说一遍')
  })

  it('copies a file synchronously', async () => {
    const { page } = context
    const dir = 'fsm-sync-copy'
    await arrangeFile(context, dir)
    await setPageData(page, { copyFromFile: `${dir}/1.txt`, copyToFile: `${dir}/2.txt`, accessFile: `${dir}/2.txt` })
    await tapAndWait(page, '#btn-copy-file-sync')
    await tapAndWait(page, '#btn-access-file-sync')
    expect(await readData(page, 'accessFileRet')).toEqual('access:ok')
  })

  it('stats a single file synchronously', async () => {
    const { page } = context
    const dir = 'fsm-stat-single-sync'
    await arrangeDir(context, context.paths.globalTempPath, dir)
    await writeFile(page, { file: `${dir}/1.txt`, content: 'sync stat' })
    await setPageData(page, { recursiveVal: false, statFile: `${dir}/1.txt` })
    await tapAndWait(page, '#btn-stat-file-sync')
    const stats = await readData(page, 'statsRet')
    expect(stats.length).toEqual(1)
    expect(stats[0].path).toEqual('')
  })

  it('unlinks a file synchronously', async () => {
    await arrangeFile(context, 'fsm-sync-unlink')
    await tapAndWait(context.page, '#btn-unlink-file-sync')
    expect(await readDir(context.page, true)).toEqual([])
  })

  if (isAndroid) {
    it('reads an Android asset synchronously', async () => {
      const { page } = context
      await setPageData(page, { basePath: 'file:///android_asset/uni-app-x', logAble: false, readFileRet: '', readFile: '/hxversion.data' })
      await tapAndWait(page, '#btn-read-file-sync')
      expect((await readData(page, 'readFileRet')).length).toBeGreaterThan(0)
    })
  }
})
