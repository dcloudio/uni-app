const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isIos = platformInfo.startsWith('ios')
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'
const isWeb = platformInfo.startsWith('web')
const isAndroid = platformInfo.startsWith('android')

describe('editor-edit.uvue', () => {
  const infos = process.env.uniTestPlatformInfo.split(' ');
  const version = parseInt(infos[infos.length - 1]);
  /**
   * mp-weixin 自动化测试截图报错
   *
   * 暂时跳过相关平台的测试，后续根据平台能力完善测试用例
   */
  if (isMP || (isVapor && isIos) || (isAndroid && !isNaN(version) && version < 8)) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  let editor

  const defaultFormats = {
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    blockquote: false,
    codeBlock: false,
    link: '',
    header: 0,
    list: '',
    align: '',
    textIndent: '',
    marginLeft: '',
    marginRight: '',
    lineHeight: '',
    letterSpacing: '',
    fontFamily: '',
    fontSize: '',
    color: '',
    backgroundColor: ''
  }

  async function loadPage() {
    page = await program.reLaunch('/pages/component/editor/editor-edit')
    await page.waitFor('view')
    await waitForData('data.editorReadyTest', value => value === true, isWeb ? 4000 : 8000)
    editor = await page.$('#editor')
    await updateData({
      autoTest: true
    })
  }

  async function resetPageState() {
    await page.callMethod('closeSheets')
    await page.callMethod('resetFormatsForTest')
    await updateData({
      autoTest: true,
      undoTest: false,
      redoTest: false,
      removeFormatTest: false,
      insertImageTest: false,
      blurTest: false,
      clearTest: false,
      getContentDeltaTest: null,
      activeSheet: ''
    })
    await setEditorContents([
      { insert: '\n' }
    ])
  }

  async function waitForData(path, matcher, timeout = 3000) {
    const start = Date.now()
    await page.waitFor(async () => {
      const value = await page.data(path)
      return matcher(value) || (Date.now() - start > timeout)
    })
  }

  async function updateData(partial) {
    await page.setData({
      data: partial
    })
  }

  async function applyToolbarPresetState(preset) {
    await page.callMethod('applyToolbarPresetForTest', preset)
  }

  async function openSheet(methodName, sheetName, titleText, subtitleText) {
    await page.callMethod(methodName)
    await waitForData('data.activeSheet', value => value === sheetName, 2000)
    let currentTitle = ''
    let currentSubtitle = ''
    for (let i = 0; i < 10; i++) {
      await page.waitFor(100)
      currentTitle = await page.callMethod('getPanelTitle')
      currentSubtitle = await page.callMethod('getPanelSubtitle')
      if (currentTitle === titleText && currentSubtitle === subtitleText) {
        break
      }
    }
    expect(currentTitle).toBe(titleText)
    expect(currentSubtitle).toBe(subtitleText)
  }

  async function closeSheet() {
    await page.callMethod('closeSheets')
    await waitForData('data.activeSheet', value => value === '', 2000)
  }

  async function waitForFlag(path, timeout = 3000) {
    await waitForData(path, value => value === true, timeout)
    expect(await page.data(path)).toBe(true)
  }

  async function waitForFormats(partial, timeout = 3000) {
    const keys = Object.keys(partial)
    await waitForData('data.formats', value => {
      return keys.every(key => value != null && value[key] === partial[key])
    }, timeout)
    expect(await page.data('data.formats')).toMatchObject(partial)
  }

  async function waitForChecklistFormat(timeout = 3000) {
    await waitForData('data.formats', value => {
      return value != null && (value.list === 'check' || value.list === 'unchecked')
    }, timeout)
    const formats = await page.data('data.formats')
    expect(['check', 'unchecked']).toContain(formats.list)
  }

  async function setBlur() {
    await updateData({
      blurTest: false
    })
    await page.callMethod('blur')
    await waitForFlag('data.blurTest', 2000)
  }

  async function setEditorContents(ops) {
    await page.callMethod('setContents', ops)
    await page.waitFor(500)
  }

  async function getDelta() {
    await updateData({
      getContentDeltaTest: null
    })
    await page.callMethod('getCon')
    await waitForData('data.getContentDeltaTest', value => value != null, 3000)
    return await page.data('data.getContentDeltaTest')
  }

  beforeAll(async () => {
    await loadPage()
  })

  beforeEach(async () => {
    await resetPageState()
  })

  it('editor-wrapper', async () => {
    expect(await page.data('data.activeSheet')).toBe('')
    expect(await page.data('data.formats')).toEqual(defaultFormats)
    if (isWeb) {
      expect(await editor.attribute('placeholder')).toBe('请输入正文内容...')
    }
    expect(await program.screenshot({
      fullPage: true
    })).toSaveImageSnapshot()
  })

  it('editor-toolbar', async () => {
    await openSheet('openMoreSheet', 'more', '更多操作', '插入与编辑快捷操作')
    await openSheet('openTitleSheet', 'title', '设置标题', '当前为正文')
    await openSheet('openStyleSheet', 'style', '设置字格式', '当前未设置字格式')
    await openSheet('openTextColorSheet', 'text-color', '设置文字颜色', '当前使用默认文字颜色')
    await openSheet('openBackgroundColorSheet', 'background-color', '设置背景颜色', '当前未设置文字背景颜色')
    await openSheet('openLineHeightSheet', 'line-height', '设置行间距', '当前使用默认行间距')
    await openSheet('openLetterSpacingSheet', 'letter-spacing', '设置字间距', '当前使用默认字间距')
    await openSheet('openFontSizeSheet', 'font-size', '设置字号', '当前使用默认字号 17px')
    await openSheet('openFontFamilySheet', 'font-family', '设置字体', '当前使用默认字体')
    await openSheet('openAlignSheet', 'align', '对齐方式', '当前为默认对齐')
    await openSheet('openBlockIndentSheet', 'block-indent', '设置两端缩进', '当前未设置两端缩进')
    await openSheet('openListSheet', 'list', '设置列表', '当前未设置列表')
    await closeSheet()
  })

  it('editor-screenshot', async () => {
    // await openSheet('openStyleSheet', 'style', '设置字格式', '当前未设置字格式')
    expect(await program.screenshot({
      fullPage: true
    })).toSaveImageSnapshot()
    // await closeSheet()
  })

  it('title-toolbar-actions', async () => {
    await applyToolbarPresetState('title-h2')
    await waitForFormats({
      header: 2,
      list: ''
    })
    expect(await page.callMethod('getTitleSummary')).toBe('当前为大标题2')
    await applyToolbarPresetState('title-h1')
    await waitForFormats({
      header: 1,
      list: ''
    })
    expect(await page.callMethod('getTitleSummary')).toBe('当前为大标题1')
    await page.callMethod('toggleCodeBlock')
    await waitForFormats({
      codeBlock: true,
      header: 0,
      list: ''
    })
    expect(await page.callMethod('getTitleSummary')).toBe('当前为代码块')
  })

  it('code-block-toolbar-actions', async () => {
    await page.callMethod('toggleCodeBlock')
    await waitForFormats({
      codeBlock: true,
      header: 0,
      list: ''
    })
    expect(await page.callMethod('getTitleSummary')).toBe('当前为代码块')
    await page.callMethod('setHeadingLevel', 2)
    await waitForFormats({
      codeBlock: false,
      header: 2
    })
    expect(await page.callMethod('getTitleSummary')).toBe('当前为大标题2')
    await page.callMethod('toggleCodeBlock')
    await waitForFormats({
      codeBlock: true,
      header: 0
    })
    await page.callMethod('toggleCodeBlock')
    await waitForFormats({
      codeBlock: false,
      header: 0,
      list: ''
    })
  })

  it('style-toolbar-actions', async () => {
    await page.callMethod('toggleBold')
    await page.callMethod('toggleItalic')
    await page.callMethod('toggleUnderline')
    await page.callMethod('toggleStrike')
    await waitForFormats({
      bold: true,
      italic: true,
      underline: true,
      strike: true
    })
    await openSheet('openStyleSheet', 'style', '设置字格式', '加粗 / 斜体 / 下划线 / 删除线')
    await page.callMethod('toggleBold')
    await page.callMethod('toggleItalic')
    await page.callMethod('toggleUnderline')
    await page.callMethod('toggleStrike')
    await waitForFormats({
      bold: false,
      italic: false,
      underline: false,
      strike: false
    })
    await closeSheet()
  })

  it('extended-style-toolbar-actions', async () => {
    await page.callMethod('setTextColorAndClose', '#3553ff')
    await waitForFormats({ color: '#3553ff' })
    await openSheet('openTextColorSheet', 'text-color', '设置文字颜色', '当前文字颜色 #3553ff')
    await page.callMethod('setBackgroundColorAndClose', '#fff7db')
    await waitForFormats({ backgroundColor: '#fff7db' })
    await openSheet('openBackgroundColorSheet', 'background-color', '设置背景颜色', '当前背景颜色 #fff7db')
    await page.callMethod('setLineHeightAndClose', '1.8')
    await page.callMethod('setLetterSpacingAndClose', '2px')
    await page.callMethod('setFontSizeAndClose', '24px')
    await page.callMethod('setFontFamilyAndClose', 'Georgia')
    await waitForFormats({
      lineHeight: '1.8',
      letterSpacing: '2px',
      fontSize: '24px',
      fontFamily: 'Georgia'
    })
    await openSheet('openStyleSheet', 'style', '设置字格式', '行间距 1.8 / 字间距 2px / 字号 24px / 字体 Geo')
    await closeSheet()
  })

  it('layout-toolbar-actions', async () => {
    await page.callMethod('setAlignCenter')
    await waitForFormats({ align: 'center' })
    await openSheet('openAlignSheet', 'align', '对齐方式', '当前为居中')
    await page.callMethod('toggleTextIndent')
    await waitForFormats({ textIndent: '2em' })
    await page.callMethod('setBlockIndentAndClose', '16px')
    await waitForFormats({
      marginLeft: '16px',
      marginRight: '16px'
    })
    await openSheet('openBlockIndentSheet', 'block-indent', '设置两端缩进', '当前两端缩进 16px')
    await closeSheet()
  })

  it('list-toolbar-actions', async () => {
    await applyToolbarPresetState('list-bullet')
    await waitForFormats({
      header: 0,
      list: 'bullet'
    })
    await openSheet('openListSheet', 'list', '设置列表', '当前列表 无序列表')
    await closeSheet()
    await applyToolbarPresetState('list-ordered')
    await waitForFormats({
      header: 0,
      list: 'ordered'
    })
    await openSheet('openListSheet', 'list', '设置列表', '当前列表 有序列表')
    await closeSheet()
    await applyToolbarPresetState('list-unchecked')
    await waitForChecklistFormat()
    await applyToolbarPresetState('list-none')
    await waitForFormats({ list: '' })
    await closeSheet()
  })

  it('clear', async () => {
    await setEditorContents([
      { insert: '清空前的内容' },
      { insert: '\n' }
    ])
    await updateData({
      clearTest: false
    })
    await page.callMethod('clear')
    await waitForFlag('data.clearTest', 2000)
    const delta = await getDelta()
    const ops = Array.isArray(delta.ops) ? delta.ops : []
    expect(ops.length <= 1).toBe(true)
    if (ops.length === 1) {
      expect(ops[0].insert).toBe('\n')
    }
  })

  it('undo-redo', async () => {
    await setEditorContents([
      { insert: '撤销重做验证' },
      { insert: '\n' }
    ])
    await updateData({
      undoTest: false,
      redoTest: false
    })
    await page.callMethod('insertDivider')
    await page.waitFor(500)
    await page.callMethod('undo')
    await waitForFlag('data.undoTest', 2000)
    await page.callMethod('redo')
    await waitForFlag('data.redoTest', 2000)
  })

  it('insertImage', async () => {
    await updateData({
      insertImageTest: false
    })
    await page.callMethod('insertImage', 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app.png')
    await waitForFlag('data.insertImageTest', 5000)
    const delta = await getDelta()
    const ops = Array.isArray(delta.ops) ? delta.ops : []
    const imageOp = ops.find(item => item.insert && typeof item.insert === 'object' && item.insert.image)
    expect(Boolean(imageOp)).toBe(true)
  })

  it('insertImage-screenshot', async () => {
    await updateData({
      insertImageTest: false
    })
    await page.callMethod('insertImage', 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app.png')
    await waitForFlag('data.insertImageTest', 5000)
    await setBlur()
    const waitTime = process.env.uniTestPlatformInfo.includes('firefox') ? 5000 : 2000
    await page.waitFor(waitTime)
    expect(await program.screenshot({
      fullPage: true
    })).toSaveImageSnapshot()
  })

  it('removeFormat', async () => {
    await setEditorContents([
      {
        insert: '设置字体样式',
        attributes: {
          bold: true,
          color: '#3553ff'
        }
      },
      { insert: '\n' }
    ])
    await updateData({
      removeFormatTest: false
    })
    await page.callMethod('removeFormat')
    await waitForFlag('data.removeFormatTest', 2000)
  })
})
