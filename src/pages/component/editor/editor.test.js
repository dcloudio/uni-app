const PAGE_PATH = '/pages/component/editor/editor'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web') || platformInfo.startsWith('h5')
const isMP = platformInfo.startsWith('mp')
const isiOS = platformInfo.startsWith('ios')
const isAndroid = platformInfo.startsWith('android')
const isMpAlipay = platformInfo === 'mp-alipay'

describe('editor.uvue', () => {
  const infos = process.env.uniTestPlatformInfo.split(' ');
  const version = parseInt(infos[infos.length - 1]);

  if (isMpAlipay || (isAndroid && !isNaN(version) && version < 8)) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  const deviceShotOptions = {
    deviceShot: true,
    area: {
      x: 0,
      y: 0
    }
  }

  async function loadPage() {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await waitForData('data.readyCount', value => value >= 1, 5000)
    await waitForData('data.editorWidth', value => value > 0, 3000)
  }

  async function waitForData(path, matcher, timeout = 3000) {
    const start = Date.now()
    await page.waitFor(async () => {
      const value = await page.data(path)
      return matcher(value) || (Date.now() - start > timeout)
    })
  }

  async function getEditorTapPoint(offsetX = null, offsetY = null) {
    const editorX = await page.data('data.editorX')
    const editorY = await page.data('data.editorY')
    const editorWidth = await page.data('data.editorWidth')
    const editorHeight = await page.data('data.editorHeight')
    return {
      x: editorX + (offsetX != null ? offsetX : editorWidth / 2),
      y: editorY + (offsetY != null ? offsetY : editorHeight / 2)
    }
  }

  async function tapEditor(offsetX = null, offsetY = null) {
    const point = await getEditorTapPoint(offsetX, offsetY)
    await program.tap(point)
    if (isiOS) {
      // ios 模拟器卡
      await page.waitFor(1500)
    } else {
      await page.waitFor(600)
    }
  }

  async function resetEditorProps() {
    const readyCount = await page.data('data.readyCount')
    await page.callMethod('onReadOnlyChange', false)
    await page.callMethod('onTypeChange', 0)
    await page.callMethod('onPlaceholderChange', '请输入内容，placeholder 仅初始化生效')
    await page.callMethod('onDraftShowImgSizeChange', true)
    await page.callMethod('onDraftShowImgToolbarChange', true)
    await page.callMethod('onDraftShowImgResizeChange', true)
    await page.callMethod('rebuildEditor')
    await waitForData('data.readyCount', value => value > readyCount, 5000)
    await waitForData('data.readOnly', value => value === false, 3000)
    await waitForData('data.editorType', value => value === null, 3000)
    await page.callMethod('clearEditor')
    if (!isWeb) {
      await page.callMethod('hideKeyboardForTest')
      await waitForData('data.keyboardHeight', value => value === 0, 3000)
    }
    await page.waitFor(600)
  }

  async function hideKeyboard() {
    if (isWeb) {
      return
    }
    await page.callMethod('blurEditor')
    await page.callMethod('hideKeyboardForTest')
    await page.waitFor(600)
  }

  async function assertKeyboardHeightChange() {
    if (isWeb) {
      return
    }
    /* const beforeKeyboardHeight = await page.data('data.keyboardHeight')
    const beforeKeyboardHeightChangeCount = await page.data('data.keyboardHeightChangeCount') */
    await tapEditor()
    // TODO 不再依赖键盘高度变化了，改为设备截图判断；安卓上运行自动化测试时 onKeyboardChagne 不触发
    /* await waitForData('data.keyboardHeight', value => value > beforeKeyboardHeight, 5000)
    await waitForData('data.keyboardHeightChangeCount', value => value > beforeKeyboardHeightChangeCount, 5000)
    expect(await page.data('data.keyboardHeight')).toBeGreaterThan(beforeKeyboardHeight)
    expect(await page.data('data.keyboardHeightChangeCount')).toBeGreaterThan(beforeKeyboardHeightChangeCount) */
  }

  async function screenshot(name, deviceShot = false) {
    const options = deviceShot ? {fullPage: true} : deviceShotOptions
    const image = await program.screenshot(options)
    expect(image).toSaveImageSnapshot({
      customSnapshotIdentifier() {
        return name
      }
    })
  }

  async function getInserImageSize() {
    await waitForData('data.insertImageWidth', value => value > 0, 2000)
    await waitForData('data.insertImageHeight', value => value > 0, 2000)
    const width = await page.data('data.insertImageWidth')
    const height = await page.data('data.insertImageHeight')
    if (width === 0) width = 50
    if (height === 0) width = 30
    return {
      width,
      height
    }
  }

  beforeAll(async () => {
    await loadPage()
    const windowInfo = await program.callUniMethod('getWindowInfo');
    deviceShotOptions.area.y =  windowInfo.safeAreaInsets.top + 44
  })

  beforeEach(async () => {
    await resetEditorProps()
  })

  it('placeholder 截图', async () => {
    const readyCount = await page.data('data.readyCount')
    await page.callMethod('onPlaceholderChange', '自动化测试 editor placeHolder 修改')
    await page.callMethod('rebuildEditor')
    await waitForData('data.readyCount', value => value >= readyCount + 1, 2000)
    await page.waitFor(500)
    await screenshot('editor-props-placeholder')
  })

  it('方法调用截图', async () => {
    await page.callMethod('insertSampleText')
    if (!isMP) {
      await page.callMethod('insertMention')
    }
    await page.waitFor(500)
    await screenshot('editor-event-invoke')
  })

  it('setContents html', async () => {
    await page.callMethod('testSetContentsHtml')
    await page.waitFor(500)
    await screenshot('editor-setContents-html')
  })

  if (!isMP) {
    it('readOnly 修改后截图', async () => {
      expect(await page.data('data.readOnly')).toBe(false)
      expect(await page.data('data.editorType')).toBeFalsy()
      await assertKeyboardHeightChange()
      await screenshot('editor-props-read-only-false', true)

      await hideKeyboard()

      await page.callMethod('onReadOnlyChange', true)
      await waitForData('data.readOnly', value => value === true, 3000)
      expect(await page.data('data.readOnly')).toBe(true)
      await screenshot('editor-props-read-only-true')
      await page.callMethod('onReadOnlyChange', false)
      await waitForData('data.readOnly', value => value === false, 3000)
    })

    it('type 切换后截图', async () => {
      expect(await page.data('data.editorType')).toBeFalsy()
      expect(await page.callMethod('getTypeLabel')).toBe('null（聚焦弹键盘）')
      await assertKeyboardHeightChange()

      await screenshot('editor-props-type-null', true)

      await hideKeyboard()

      await page.callMethod('onTypeChange', 1)
      await waitForData('data.editorType', value => value === 'none', 3000)
      expect(await page.data('data.editorType')).toBe('none')
      expect(await page.callMethod('getTypeLabel')).toBe('none（聚焦不弹键盘）')

      await screenshot('editor-props-type-none')
    })

    it('image 相关属性重建后点击 image 截图', async () => {
      const previousReadyCount = await page.data('data.readyCount')

      await page.callMethod('onDraftShowImgSizeChange', true)
      await page.callMethod('onDraftShowImgToolbarChange', true)
      await page.callMethod('onDraftShowImgResizeChange', true)
      await page.callMethod('rebuildEditor')
      await waitForData('data.readyCount', value => value >= previousReadyCount + 1, 8000)

      await page.callMethod('insertSampleImage')
      let imageSize = await getInserImageSize()
      await tapEditor(imageSize.width/2, imageSize.height/2)

      await screenshot('editor-props-image-controls-true')

      const nextReadyCount = await page.data('data.readyCount')
      await page.callMethod('blurEditor')
      await waitForData('data.blurCount', value => value > 0, 3000)
      await page.callMethod('clearEditor')
      await page.waitFor(500)
      await page.callMethod('onDraftShowImgSizeChange', false)
      await page.callMethod('onDraftShowImgToolbarChange', false)
      await page.callMethod('onDraftShowImgResizeChange', false)
      await page.callMethod('rebuildEditor')
      await waitForData('data.readyCount', value => value >= nextReadyCount + 1, 8000)

      expect(await page.data('data.appliedShowImgSize')).toBe(false)
      expect(await page.data('data.appliedShowImgToolbar')).toBe(false)
      expect(await page.data('data.appliedShowImgResize')).toBe(false)

      await page.callMethod('insertSampleImage')
      imageSize = await getInserImageSize()
      await tapEditor(imageSize.width/2, imageSize.height/2)

      await screenshot('editor-props-image-controls-false')
    })
  }

  it('事件只校验触发次数', async () => {
    await resetEditorProps()
    const readyCount = await page.data('data.readyCount')
    const inputCount = await page.data('data.inputCount')
    const statusChangeCount = await page.data('data.statusChangeCount')

    await page.callMethod('insertSampleText')
    await waitForData('data.inputCount', value => value > inputCount, 3000)

    await page.callMethod('toggleBold')
    await waitForData('data.statusChangeCount', value => value > statusChangeCount, 3000)

    expect(await page.data('data.readyCount')).toBeGreaterThanOrEqual(readyCount)
    expect(await page.data('data.inputCount')).toBeGreaterThan(inputCount)
    expect(await page.data('data.statusChangeCount')).toBeGreaterThan(statusChangeCount)
  })
})
