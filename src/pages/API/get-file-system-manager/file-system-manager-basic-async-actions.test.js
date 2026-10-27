const {
  isIOS,
  isAndroid,
  platformInfo,
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

const POEM_BASE64 = '5LiZ6L6w5Lit56eL77yM5qyi6aWu6L6+5pem77yM5aSn6YaJ77yM5L2c5q2k56+H77yM5YW85oCA5a2Q55Sx44CC5piO5pyI5Yeg5pe25pyJ77yf5oqK6YWS6Zeu6Z2S5aSp44CC5LiN55+l5aSp5LiK5a6r6ZiZ77yM5LuK5aSV5piv5L2V5bm044CC5oiR5qyy5LmY6aOO5b2S5Y6777yM5Y+I5oGQ55C85qW8546J5a6H77yM6auY5aSE5LiN6IOc5a+S44CC6LW36Iie5byE5riF5b2x77yM5L2V5Ly85Zyo5Lq66Ze0'

describe('FileSystemManager basic async actions', () => {
  if (isUnsupported) {
    unsupportedTest()
    return
  }

  let context
  beforeEach(async () => { context = await createContext() })
  afterEach(async () => { await cleanupContext(context) })

  it('creates an empty recursive directory', async () => {
    const dir = 'fsm-basic-mkdir'
    await arrangeDir(context, context.paths.globalUserDataPath, dir)
    expect(await readDir(context.page)).toEqual([])
  })

  it('rejects a nested directory when recursive is false', async () => {
    const { page, paths } = context
    const root = 'fsm-basic-nonrecursive'
    await arrangeDir(context, paths.globalUserDataPath, root)
    await setPageData(page, { recursiveVal: false, mkdirFile: `${root}/missing/child` })
    await tapAndWait(page, '#btn-mkdir')
    const error = await readData(page, 'lastFailError')
    expect(error.errCode).toEqual(1300002)
    expect(error.errMsg).toContain('No such file or directory')
  })

  it('recursively removes a non-empty child directory', async () => {
    const { page, paths } = context
    const parent = 'fsm-basic-rmdir-parent'
    const child = `${parent}/child`
    await arrangeDir(context, paths.globalUserDataPath, parent)
    await setPageData(page, { mkdirFile: child, recursiveVal: false })
    await tapAndWait(page, '#btn-mkdir')
    await writeFile(page, { file: `${child}/1.txt`, content: 'remove child' })
    await setPageData(page, { rmDirFile: child, recursiveVal: true })
    await tapAndWait(page, '#btn-remove-dir')
    await setPageData(page, { readDir: parent })
    expect(await readDir(page)).not.toContain('child')
  })

  it('writes and reads a UTF-8 file', async () => {
    const dir = 'fsm-basic-write-read'
    await arrangeDir(context, context.paths.globalUserDataPath, dir)
    await writeFile(context.page, { file: `${dir}/1.txt`, content: '锄禾日当午，汗滴禾下土' })
    expect(await readFile(context.page)).toEqual('锄禾日当午，汗滴禾下土')
  })

  it('lists a written file', async () => {
    const dir = 'fsm-basic-list'
    await arrangeDir(context, context.paths.globalUserDataPath, dir)
    await writeFile(context.page, { file: `${dir}/1.txt`, content: 'list' })
    expect(await readDir(context.page)).toEqual(['1.txt'])
    expect(await readData(context.page, 'fileListComplete')).toEqual(['1.txt'])
  })

  it('copies a file', async () => {
    const { page } = context
    const dir = 'fsm-basic-copy'
    await arrangeDir(context, context.paths.globalUserDataPath, dir)
    await writeFile(page, { file: `${dir}/1.txt`, content: 'copy' })
    await setPageData(page, { copyFromFile: `${dir}/1.txt`, copyToFile: `${dir}/2.txt` })
    await tapAndWait(page, '#btn-copy-file')
    expect((await readDir(page)).sort()).toEqual(['1.txt', '2.txt'])
  })

  it('renames a file', async () => {
    const { page } = context
    const dir = 'fsm-basic-rename'
    await arrangeDir(context, context.paths.globalUserDataPath, dir)
    await writeFile(page, { file: `${dir}/1.txt`, content: 'rename' })
    await setPageData(page, { renameFromFile: `${dir}/1.txt`, renameToFile: `${dir}/3.txt` })
    await tapAndWait(page, '#btn-rename-file')
    expect(await readDir(page)).toEqual(['3.txt'])
  })

  it('rejects renaming into a missing directory', async () => {
    const { page } = context
    const dir = 'fsm-basic-rename-missing'
    await arrangeDir(context, context.paths.globalTempPath, dir)
    await writeFile(page, { file: `${dir}/1.txt`, content: 'rename' })
    await setPageData(page, { renameFromFile: `${dir}/1.txt`, renameToFile: `${dir}/missing/2.txt` })
    await tapAndWait(page, '#btn-rename-file')
    expect((await readData(page, 'lastFailError')).errCode).toEqual(1300002)
  })

  it('creates a deep path containing Unicode and symbols', async () => {
    const { page, paths } = context
    const version = parseInt(platformInfo.split(' ')[1])
    const segment = version < 6
      ? '我们经历了一场兵荒马乱的战争'
      : '我们经历了一场兵荒马乱的战争.1@2#3$4%5^6&7*8(9)0+-qwerty'
    const root = 'fsm-basic-special-path'
    await arrangeDir(context, paths.globalTempPath, root)
    await setPageData(page, { recursiveVal: true, mkdirFile: `${root}/${segment}/中文路径/张三/name` })
    await tapAndWait(page, '#btn-mkdir')
    await setPageData(page, { readDir: root })
    expect(await readDir(page)).toEqual([segment])
  })

  it('reports an existing file', async () => {
    const { page } = context
    const dir = 'fsm-basic-access-existing'
    await arrangeDir(context, context.paths.globalUserDataPath, dir)
    await writeFile(page, { file: `${dir}/1.txt`, content: 'access' })
    await setPageData(page, { accessFile: `${dir}/1.txt` })
    await tapAndWait(page, '#btn-access-file')
    expect(await readData(page, 'accessFileRet')).toEqual('access:ok')
  })

  it('reports a missing file', async () => {
    const { page, paths } = context
    await setPageData(page, { basePath: paths.globalUserDataPath, accessFile: 'fsm-basic-missing/no.txt' })
    await tapAndWait(page, '#btn-access-file')
    expect(await readData(page, 'accessFileRet')).toEqual('')
  })

  it('unlinks a file without removing its directory', async () => {
    const { page } = context
    const dir = 'fsm-basic-unlink'
    await arrangeDir(context, context.paths.globalUserDataPath, dir)
    await writeFile(page, { file: `${dir}/1.txt`, content: 'unlink' })
    await tapAndWait(page, '#btn-unlink-file')
    expect(await readDir(page)).toEqual([])
  })

  it('clears every file before reporting completion', async () => {
    const { page } = context
    const dir = 'fsm-basic-clear'
    await arrangeDir(context, context.paths.globalUserDataPath, dir)
    await writeFile(page, { file: `${dir}/1.txt`, content: 'one' })
    await writeFile(page, { file: `${dir}/2.txt`, content: 'two' })
    await setPageData(page, { rmDirFile: dir, readDir: dir })
    await tapAndWait(page, '#btn-clear-file')
    expect(await readDir(page)).toEqual([])
    expect(await readData(page, 'fileListComplete')).toEqual([])
  })

  it('keeps a bundled static asset read-only', async () => {
    const { page } = context
    await setPageData(page, { basePath: '/', accessFile: 'static/test-image/logo.ico', unlinkFile: 'static/test-image/logo.ico' })
    await tapAndWait(page, '#btn-access-file')
    expect(await readData(page, 'accessFileRet')).toEqual('access:ok')
    if (!isIOS) await tapAndWait(page, '#btn-unlink-file')
    await tapAndWait(page, '#btn-access-file')
    expect(await readData(page, 'accessFileRet')).toEqual('access:ok')
  })

  it('copies a bundled static file into the sandbox', async () => {
    const { page, paths } = context
    await arrangeDir(context, paths.globalRootPath, 'a')
    await tapAndWait(page, '#btn-copyStatic-file')
    expect(await readDir(page)).toEqual(['mock.json'])
  })

  it('appends asynchronously', async () => {
    const { page } = context
    const dir = 'fsm-basic-append-async'
    await arrangeDir(context, context.paths.basePath, dir, true)
    await writeFile(page, { file: `${dir}/1.txt`, content: '我爱北京天安门，天安门前太阳升', sync: true })
    await setPageData(page, { appendFileContent: '再说一遍' })
    await tapAndWait(page, '#btn-append-file')
    expect(await readFile(page, true)).toEqual('我爱北京天安门，天安门前太阳升再说一遍')
  })

  it('reads UTF-8 content as base64', async () => {
    const { page } = context
    const dir = 'fsm-encoding-read-base64'
    await arrangeDir(context, context.paths.globalTempPath, dir)
    await writeFile(page, { file: `${dir}/write.bin`, content: '我爱北京天安门，天安门前太阳升' })
    await setPageData(page, { readFileEncoding: 'base64' })
    expect(await readFile(page)).toEqual('5oiR54ix5YyX5Lqs5aSp5a6J6Zeo77yM5aSp5a6J6Zeo5YmN5aSq6Ziz5Y2H')
  })

  it('round-trips valid ASCII', async () => {
    const dir = 'fsm-encoding-ascii'
    await arrangeDir(context, context.paths.globalTempPath, dir)
    await writeFile(context.page, { file: `${dir}/write.bin`, content: 'hello jack.hello marry.', writeEncoding: 'ascii', readEncoding: 'ascii' })
    expect(await readFile(context.page)).toEqual('hello jack.hello marry.')
  })

  it('decodes base64 while writing', async () => {
    const { page } = context
    const dir = 'fsm-encoding-write-base64'
    await arrangeDir(context, context.paths.globalTempPath, dir)
    await writeFile(page, { file: `${dir}/poem.txt`, content: POEM_BASE64, writeEncoding: 'base64', readEncoding: 'utf-8' })
    expect(await readFile(page)).toContain('丙辰中秋')
    await setPageData(page, { readFileEncoding: 'base64' })
    expect(await readFile(page)).toEqual(POEM_BASE64)
  })

  it('round-trips a bundled binary resource through base64', async () => {
    const { page, paths } = context
    const dir = 'fsm-encoding-static-base64'
    await arrangeDir(context, paths.globalTempPath, dir)
    await setPageData(page, { basePath: '/', readFile: 'static/test-image/logo.ico', readFileEncoding: 'base64' })
    const base64 = await readFile(page)
    expect(base64.length).toEqual(5716)
    expect(base64.substring(base64.length - 10)).toEqual('AA///AA/8=')
    await setPageData(page, {
      basePath: paths.globalTempPath,
      writeFile: `${dir}/logo.base64`,
      readFile: `${dir}/logo.base64`,
      writeFileContent: base64,
      writeFileEncoding: 'utf-8',
      readFileEncoding: 'utf-8'
    })
    await tapAndWait(page, '#btn-write-file')
    expect(await readFile(page)).toEqual(base64)
  })

  it('stats a single file', async () => {
    const { page } = context
    const dir = 'fsm-stat-single'
    await arrangeDir(context, context.paths.globalRootPath, dir)
    await writeFile(page, { file: `${dir}/1.txt`, content: '锄禾日当午，汗滴禾下土，谁知盘中餐，粒粒皆辛苦' })
    await setPageData(page, { recursiveVal: false, statFile: `${dir}/1.txt` })
    await tapAndWait(page, '#btn-stat-file')
    const stats = await readData(page, 'statsRet')
    expect(stats.length).toEqual(1)
    expect(stats[0].path).toEqual('')
    if (!isIOS) expect(stats[0].stats.size).toEqual(69)
  })

  it('recursively stats files including a bundled asset copy', async () => {
    const { page, paths } = context
    const dir = 'fsm-stat-recursive'
    await arrangeDir(context, paths.globalRootPath, dir)
    await writeFile(page, { file: `${dir}/1.txt`, content: 'one' })
    await setPageData(page, { mkdirFile: `${dir}/m`, recursiveVal: true })
    await tapAndWait(page, '#btn-mkdir')
    await setPageData(page, { basePath: '/', copyToBasePath: paths.globalRootPath, copyFromFile: 'static/test-image/logo.ico', copyToFile: `${dir}/m/asset.ico` })
    await tapAndWait(page, '#btn-copy-file')
    await setPageData(page, { basePath: paths.globalRootPath, statFile: dir, recursiveVal: true })
    await tapAndWait(page, '#btn-stat-file')
    const stats = await readData(page, 'statsRet')
    const pathsInResult = stats.map(item => item.path)
    expect(stats.length).toEqual(4)
    expect(pathsInResult).toContain('/')
    expect(pathsInResult).toContain('/m')
    expect(pathsInResult).toContain('/1.txt')
    expect(pathsInResult).toContain('/m/asset.ico')
    if (!isIOS) {
      expect(stats.find(item => item.path === '/1.txt').stats.size).toEqual(3)
      expect(stats.find(item => item.path === '/m/asset.ico').stats.size).toEqual(4286)
    }
  })

  const androidIt = isAndroid ? it : it.skip

  androidIt('reports each stat entry type through isFile and isDirectory', async () => {
    const { page, paths } = context
    const dir = 'fsm-stat-type-check'
    await arrangeDir(context, paths.globalRootPath, dir)
    await writeFile(page, { file: `${dir}/1.txt`, content: 'one' })
    await setPageData(page, { mkdirFile: `${dir}/m`, recursiveVal: true })
    await tapAndWait(page, '#btn-mkdir')
    await setPageData(page, { basePath: paths.globalRootPath, statFile: dir, recursiveVal: true })
    await tapAndWait(page, '#btn-stat-file')
    expect(await readData(page, 'statsMethodError')).toEqual('')
    const stats = await readData(page, 'statsRet')
    const isFileRet = await readData(page, 'statsIsFileRet')
    const isDirectoryRet = await readData(page, 'statsIsDirectoryRet')
    const typeByPath = {}
    stats.forEach((item, index) => {
      typeByPath[item.path] = { isFile: isFileRet[index], isDirectory: isDirectoryRet[index] }
    })
    expect(typeByPath['/1.txt']).toEqual({ isFile: true, isDirectory: false })
    expect(typeByPath['/m']).toEqual({ isFile: false, isDirectory: true })
  })
})
