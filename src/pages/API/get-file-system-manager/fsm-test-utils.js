const platformInfo = (process.env.uniTestPlatformInfo || '').toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW === 'true'
// 沿用旧测试 file-system-manager-storage-actions.test.js 的写法与语义，
// 由 unzipSync 用例在真实环境中验证该判断方向
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'
const isApp = (isAndroid || isIOS || isHarmony) && !isAppWebView
const isUnsupported = isWeb || isAppWebView || isMP

const BASE_PATH = '/pages/API/get-file-system-manager'

function pagePath(name) {
  return `${BASE_PATH}/${name}`
}

async function launchPage(pagePathValue) {
  const page = await program.reLaunch(pagePathValue)
  await page.waitFor('text')
  return page
}

async function setPageData(page, fields) {
  await page.setData({ data: fields })
}

async function readData(page, field) {
  return await page.data(`data.${field}`)
}

/**
 * 调用页面 defineExpose 暴露的方法，并轮询等待 data.done 置位。
 */
async function callMethodAndWait(page, method, ...args) {
  await setPageData(page, { done: false })
  await page.callMethod(method, ...args)
  await page.waitFor(async () => await readData(page, 'done') === true)
}

/**
 * 点击页面元素（按钮），并轮询等待 data.done 置位（UI 冒烟用）。
 */
async function tapAndWait(page, selector) {
  const element = await page.$(selector)
  if (element == null) {
    throw new Error(`Element not found: ${selector}`)
  }
  await setPageData(page, { done: false })
  await element.tap()
  await page.waitFor(async () => await readData(page, 'done') === true)
}

/**
 * 通过页面暴露的 exists(path) 方法判断沙盒路径是否存在。
 * 页面方法为同步实现，调用后立即读取 data.existsRet。
 */
async function pathExists(page, path) {
  await page.callMethod('exists', path)
  return await readData(page, 'existsRet')
}

function unsupportedTest() {
  it('is not supported on this platform', () => {
    expect(true).toBe(true)
  })
}

module.exports = {
  BASE_PATH,
  pagePath,
  platformInfo,
  isIOS,
  isAndroid,
  isHarmony,
  isMP,
  isWeb,
  isVapor,
  isApp,
  isAppWebView,
  isUnsupported,
  launchPage,
  setPageData,
  readData,
  callMethodAndWait,
  tapAndWait,
  pathExists,
  unsupportedTest
}
