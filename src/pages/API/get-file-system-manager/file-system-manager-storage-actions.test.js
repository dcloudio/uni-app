const {
  isIOS,
  isUnsupported,
  createContext,
  setPageData,
  readData,
  tapAndWait,
  arrangeDir,
  cleanupSavedFiles,
  cleanupContext,
  writeFile,
  readFile,
  readDir,
  unsupportedTest
} = require('./file-system-manager-test-utils')

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'
const isHarmony = platformInfo.startsWith('harmony')

async function arrangeSavedFile(context, dir) {
  const { page } = context
  await arrangeDir(context, context.paths.basePath, dir, true)
  await writeFile(page, { file: `${dir}/1.txt`, content: 'saved file', sync: true })
  await setPageData(page, {
    basePath: context.paths.basePath,
    writeFile: `${dir}/1.txt`,
    temFile: `${dir}/1.txt`,
    saveFileRet: '',
    readFileRet: ''
  })
}

async function arrangeTruncateFile(context, dir) {
  await arrangeDir(context, context.paths.basePath, dir, true)
  await writeFile(context.page, { file: `${dir}/1.txt`, content: '我爱北京天安门，天安门前太阳升', sync: true })
}

describe('FileSystemManager storage actions', () => {
  if (isUnsupported) {
    unsupportedTest()
    return
  }

  let context
  beforeEach(async () => { context = await createContext() })
  afterEach(async () => {
    try {
      await cleanupSavedFiles(context)
    } finally {
      await cleanupContext(context)
    }
  })

  it('saves a temporary file to the default cache path', async () => {
    await arrangeSavedFile(context, 'fsm-storage-default')
    await tapAndWait(context.page, '#btn-save-file')
    expect(await readData(context.page, 'saveFileRet')).toEqual('unifile://cache/uni-store/1.txt')
  })

  it('saves to an explicit local file path', async () => {
    await arrangeSavedFile(context, 'fsm-storage-file-path')
    await tapAndWait(context.page, '#btn-save-file1')
    expect(await readData(context.page, 'saveFileRet')).toEqual('unifile://usr/local/1.txt')
  })

  it('saves to an explicit local path without extension', async () => {
    await arrangeSavedFile(context, 'fsm-storage-path')
    await tapAndWait(context.page, '#btn-save-file2')
    expect(await readData(context.page, 'saveFileRet')).toEqual('unifile://usr/local')
  })

  it('normalizes a trailing slash in an explicit local path', async () => {
    await arrangeSavedFile(context, 'fsm-storage-trailing-slash')
    await tapAndWait(context.page, '#btn-save-file3')
    expect(await readData(context.page, 'saveFileRet')).toEqual('unifile://usr/local')
  })

  it('reads a file after saveFile succeeds', async () => {
    await arrangeSavedFile(context, 'fsm-storage-save-read')
    await tapAndWait(context.page, '#btn-save-file-read-file')
    expect(await readData(context.page, 'readFileRet')).toEqual('saveFileAndReadFileTest:ok')
  })

  it('lists saved files after a sync save', async () => {
    const { page, paths } = context
    const dir = 'fsm-storage-list'
    await arrangeDir(context, paths.globalTempPath, dir, true)
    await writeFile(page, { file: `${dir}/2.txt`, content: 'saved list', sync: true })
    await setPageData(page, { temFile: `${dir}/2.txt`, writeFile: `${dir}/2.txt` })
    await tapAndWait(page, '#btn-save-file-sync')
    await tapAndWait(page, '#btn-getsaved-filelist')
    expect(await readData(page, 'getSavedFileListRet')).toEqual('getSavedFileList:ok')
  })

  it('removes a saved file', async () => {
    const { page, paths } = context
    const dir = 'fsm-storage-remove'
    await arrangeDir(context, paths.globalTempPath, dir, true)
    await writeFile(page, { file: `${dir}/remove.txt`, content: 'remove', sync: true })
    await setPageData(page, { temFile: `${dir}/remove.txt`, saveFileRet: '' })
    await tapAndWait(page, '#btn-save-file')
    const savedPath = await readData(page, 'saveFileRet')
    await tapAndWait(page, '#btn-getsaved-filelist')
    expect(await readData(page, 'fileListSuccess')).toContain(savedPath)
    await setPageData(page, { basePath: '', writeFile: savedPath })
    await tapAndWait(page, '#btn-remove-saved-file')
    expect(await readData(page, 'removeSavedFileRet')).toEqual('removeSavedFile:ok')
    await tapAndWait(page, '#btn-getsaved-filelist')
    expect(await readData(page, 'fileListSuccess')).not.toContain(savedPath)
  })

  it('truncates a file asynchronously', async () => {
    const { page } = context
    const file = 'fsm-storage-truncate-async/1.txt'
    await arrangeTruncateFile(context, 'fsm-storage-truncate-async')
    await tapAndWait(page, '#btn-truncate-file')
    expect(await readFile(page, true)).toEqual('我爱')
    await setPageData(page, { statFile: file, recursiveVal: false })
    await tapAndWait(page, '#btn-stat-file')
    if (!isIOS) {
      expect((await readData(page, 'statsRet'))[0].stats.size).toEqual(6)
    }
  })

  it('truncates a file synchronously', async () => {
    const { page } = context
    const file = 'fsm-storage-truncate-sync/1.txt'
    await arrangeTruncateFile(context, 'fsm-storage-truncate-sync')
    await tapAndWait(page, '#btn-truncate-file-sync')
    expect(await readFile(page, true)).toEqual('我')
    await setPageData(page, { statFile: file, recursiveVal: false })
    await tapAndWait(page, '#btn-stat-file')
    if (!isIOS) {
      expect((await readData(page, 'statsRet'))[0].stats.size).toEqual(3)
    }
  })

  if (!isHarmony) {
    // 鸿蒙暂不支持这两个 API
    it('reads a Brotli-compressed file asynchronously', async () => {
      const { page } = context
      await tapAndWait(page, '#btn-compressed-file')
      expect(await readData(page, 'compressedFileRet')).toEqual('fdsafds')
    })

    it('reads a Brotli-compressed file synchronously', async () => {
      const { page } = context
      await tapAndWait(page, '#btn-compressed-file-sync')
      expect(await readData(page, 'compressedFileRet')).toEqual('fdsafds')
    })
  }

  it('unzips a bundled archive asynchronously', async () => {
    const { page, paths } = context
    const target = 'fsm-storage-unzip'
    await arrangeDir(context, paths.basePath, target, true)
    await setPageData(page, { targetZip: target })
    await tapAndWait(page, '#btn-unzip-file')
    await setPageData(page, { readDir: target })
    const entries = await readDir(page)
    expect(entries).toContain('1.txt')
    expect(entries).toContain('2.txt')
  })

  if (isVapor) {
    it('unzips a bundled archive synchronously and cleans up the target', async () => {
      if (isHarmony) {
        const systemInfo = await program.systemInfo();
        const osHarmonySDKAPIVersion = systemInfo.osHarmonySDKAPIVersion;
        if (osHarmonySDKAPIVersion < 26) {
          return
        }
      }
      const { page, paths } = context
      const target = 'fsm-storage-unzip-sync'
      try {
        await setPageData(page, { targetZip: target })
        await tapAndWait(page, '#btn-unzip-file-sync')
        expect(await readData(page, 'readFileRet')).toEqual('unzipFileSyncTest:ok')
      } finally {
        await setPageData(page, {
          basePath: paths.basePath,
          rmDirFile: `${target}-sync`,
          recursiveVal: true
        })
        await tapAndWait(page, '#btn-remove-dir')
      }
    })
  }
})
