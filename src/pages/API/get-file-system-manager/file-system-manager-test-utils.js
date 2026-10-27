const platformInfo = (process.env.uniTestPlatformInfo || '').toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW === 'true'
const isApp = (isAndroid || isIOS || isHarmony) && !isAppWebView
const isUnsupported = isWeb || isAppWebView || isMP

const PAGE_PATH = '/pages/API/get-file-system-manager/get-file-system-manager'

async function launch() {
  const page = await program.reLaunch(PAGE_PATH)
  await page.waitFor('text')
  return page
}

async function setPageData(page, data) {
  await page.setData({ data })
}

async function readData(page, field) {
  return await page.data(`data.${field}`)
}

async function readPaths(page) {
  return {
    basePath: await readData(page, 'basePath'),
    globalTempPath: await readData(page, 'globalTempPath'),
    globalRootPath: await readData(page, 'globalRootPath'),
    globalUserDataPath: await readData(page, 'globalUserDataPath')
  }
}

async function createContext() {
  const page = await launch()
  return {
    page,
    paths: await readPaths(page),
    cleanupTargets: []
  }
}

async function tapAndWait(page, selector, stableWindow = 0) {
  const element = await page.$(selector)
  if (element == null) {
    throw new Error(`Element not found: ${selector}`)
  }
  await setPageData(page, { done: false })
  await element.tap()
  await page.waitFor(async () => await readData(page, 'done') === true)
  if (stableWindow > 0) {
    await page.waitFor(stableWindow)
  }
}

async function callAndWaitFor(page, method, field, expected, stableWindow = 0) {
  await page.callMethod(method)
  await page.waitFor(async () => await readData(page, field) === expected)
  if (stableWindow > 0) {
    await page.waitFor(stableWindow)
  }
}

async function arrangeDir(context, basePath, dir, sync = false) {
  const { page } = context
  await setPageData(page, {
    basePath,
    copyToBasePath: basePath,
    recursiveVal: true,
    logAble: false,
    rmDirFile: dir,
    mkdirFile: dir,
    readDir: dir,
    fileListSuccess: [],
    fileListComplete: []
  })
  await tapAndWait(page, '#btn-remove-dir')
  await tapAndWait(page, sync ? '#btn-mkdir-sync' : '#btn-mkdir')
  context.cleanupTargets.push({ basePath, dir })
}

async function cleanupContext(context) {
  if (context == null) return
  const { page, cleanupTargets } = context
  for (let i = cleanupTargets.length - 1; i >= 0; i--) {
    const target = cleanupTargets[i]
    try {
      await setPageData(page, {
        basePath: target.basePath,
        recursiveVal: true,
        rmDirFile: target.dir
      })
      await tapAndWait(page, '#btn-remove-dir')
    } catch (_) {
      // Cleanup is best-effort so the next test still gets a fresh page.
    }
  }
}

async function cleanupSavedFiles(context) {
  if (context == null) return
  const { page, paths } = context
  try {
    const savedFilePath = await readData(page, 'saveFileRet')
    if (savedFilePath != null && savedFilePath.length > 0) {
      await setPageData(page, {
        basePath: '',
        writeFile: savedFilePath
      })
      await tapAndWait(page, '#btn-remove-saved-file')
    }
  } catch (_) {
    // Saved-file cleanup must not replace the test result.
  }

  try {
    await setPageData(page, {
      basePath: paths.basePath,
      recursiveVal: true,
      rmDirFile: 'local'
    })
    await tapAndWait(page, '#btn-remove-dir')
  } catch (_) {
    // Continue with file cleanup when the target was not a directory.
  }

  try {
    await setPageData(page, {
      basePath: paths.basePath,
      unlinkFile: 'local'
    })
    await tapAndWait(page, '#btn-unlink-file')
  } catch (_) {
    // The local target may already be absent.
  }
}

async function writeFile(page, options = {}) {
  await setPageData(page, {
    writeFile: options.file,
    readFile: options.file,
    unlinkFile: options.file,
    writeFileContent: options.content,
    writeFileEncoding: options.writeEncoding || 'utf-8',
    readFileEncoding: options.readEncoding || 'utf-8'
  })
  await tapAndWait(page, options.sync ? '#btn-write-file-sync' : '#btn-write-file')
}

async function readFile(page, sync = false) {
  await tapAndWait(page, sync ? '#btn-read-file-sync' : '#btn-read-file')
  return await readData(page, 'readFileRet')
}

async function readDir(page, sync = false) {
  await tapAndWait(page, sync ? '#btn-read-dir-sync' : '#btn-read-dir')
  return await readData(page, 'fileListSuccess')
}

function unsupportedTest() {
  it('is not supported on this platform', () => {
    expect(true).toBe(true)
  })
}

module.exports = {
  PAGE_PATH,
  platformInfo,
  isIOS,
  isAndroid,
  isHarmony,
  isMP,
  isWeb,
  isApp,
  isAppWebView,
  isUnsupported,
  createContext,
  setPageData,
  readData,
  readPaths,
  tapAndWait,
  callAndWaitFor,
  arrangeDir,
  cleanupContext,
  cleanupSavedFiles,
  writeFile,
  readFile,
  readDir,
  unsupportedTest
}
