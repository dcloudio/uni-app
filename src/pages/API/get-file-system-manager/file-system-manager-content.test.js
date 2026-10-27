const {
  isApp,
  isUnsupported,
  createContext,
  setPageData,
  readData,
  callAndWaitFor,
  cleanupContext,
  unsupportedTest
} = require('./file-system-manager-test-utils')

async function buttonLabels(page) {
  const buttons = await page.$$('button')
  return await Promise.all(buttons.map(button => button.text()))
}

describe('FileSystemManager content actions', () => {
  if (isUnsupported) {
    unsupportedTest()
    return
  }

  let context
  beforeEach(async () => { context = await createContext() })
  afterEach(async () => { await cleanupContext(context) })

  it('writes with open flag a+', async () => {
    const { page } = context
    await setPageData(page, { testOpenFlataplusWrite: false })
    await callAndWaitFor(page, 'testOpenFlagWrite', 'testOpenFlataplusWrite', true)
    expect(await readData(page, 'testOpenFlataplusWrite')).toBe(true)
  })

  it('writes a long string at the open flag boundary', async () => {
    const { page } = context
    await setPageData(page, { testOpenFlataplusWrite: false })
    await callAndWaitFor(page, 'testWriteLongString', 'testOpenFlataplusWrite', true)
    expect(await readData(page, 'testOpenFlataplusWrite')).toBe(true)
  })

  if (isApp) {
    it('exposes chooseImage content controls without opening the picker', async () => {
      const labels = await buttonLabels(context.page)
      expect(labels).toContain('readFile(content://base64)')
      expect(labels).toContain('readFile(content://arraybuffer)')
      expect(labels).toContain('readFileSync(content://base64)')
      expect(labels).toContain('readFileSync(content://arraybuffer)')
      expect(labels).toContain('copyFile(content://)')
      expect(labels).toContain('copyFileSync(content://)')
    })
  }
})
