const {
  isUnsupported,
  pagePath,
  launchPage,
  setPageData,
  readData,
  callMethodAndWait,
  tapAndWait,
  unsupportedTest
} = require('./fsm-test-utils')

const PAGE_PATH = pagePath('write-file')

const DEMO_ROOT = 'fsm-write-file-demo'

// 苏轼《水调歌头》片段的 base64 编码，写入时由 base64 解码为中文
const POEM_BASE64 = '5LiZ6L6w5Lit56eL77yM5qyi6aWu6L6+5pem77yM5aSn6YaJ77yM5L2c5q2k56+H77yM5YW85oCA5a2Q55Sx44CC5piO5pyI5Yeg5pe25pyJ77yf5oqK6YWS6Zeu6Z2S5aSp44CC5LiN55+l5aSp5LiK5a6r6ZiZ77yM5LuK5aSV5piv5L2V5bm044CC5oiR5qyy5LmY6aOO5b2S5Y6777yM5Y+I5oGQ55C85qW8546J5a6H77yM6auY5aSE5LiN6IOc5a+S44CC6LW36Iie5byE5riF5b2x77yM5L2V5Ly85Zyo5Lq66Ze0'

describe('FileSystemManager.writeFile', () => {
  if (isUnsupported) {
    unsupportedTest()
    return
  }

  let page

  beforeAll(async () => {
    page = await launchPage(PAGE_PATH)
    await callMethodAndWait(page, 'prepare')
  })

  afterAll(async () => {
    await page.callMethod('cleanup')
  })

  it('writes and reads a UTF-8 file', async () => {
    await setPageData(page, { filePath: `${DEMO_ROOT}/utf8.txt`, content: '测试writeFile API的写入功能。', encoding: 'utf-8' })
    await callMethodAndWait(page, 'writeFile')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'writeRet')).toEqual('测试writeFile API的写入功能。')
  })

  it('decodes base64 while writing', async () => {
    await setPageData(page, { filePath: `${DEMO_ROOT}/poem.txt`, content: POEM_BASE64, encoding: 'base64' })
    await callMethodAndWait(page, 'writeFile')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'writeRet')).toContain('丙辰中秋')
  })

  it('round-trips valid ASCII', async () => {
    await setPageData(page, { filePath: `${DEMO_ROOT}/ascii.txt`, content: 'hello jack.hello marry.', encoding: 'ascii' })
    await callMethodAndWait(page, 'writeFile')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'writeRet')).toEqual('hello jack.hello marry.')
  })

  // 转义符与空白字符 round-trip：含 \n、\t、\r\n、反斜杠、引号、全角/不间断空格、Emoji、中英文混排
  it('round-trips escape and whitespace characters', async () => {
    const content = '测试writeFile API的写入功能。\n\t制表符行\n回车换行：\r\n下一行\n反斜杠：\\ 双引号：" 单引号：\'\n空格：[  ] 全角：[　] 不间断：[\u00A0] Emoji：[🚀] 混合：中文English123!@#'
    await setPageData(page, { filePath: `${DEMO_ROOT}/escape.txt`, content, encoding: 'utf-8' })
    await callMethodAndWait(page, 'writeFile')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'writeRet')).toEqual(content)
  })

  it('writes and reads synchronously', async () => {
    await setPageData(page, { filePath: `${DEMO_ROOT}/sync.txt`, content: '测试writeFile API的写入功能。', encoding: 'utf-8' })
    await callMethodAndWait(page, 'writeFileSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'writeRet')).toEqual('测试writeFile API的写入功能。')
  })

  // 注：页面"演示失败（不支持的编码）"按钮传入 gbk 编码，预期 errCode 1200002，由 demoFail 覆盖；
  // 写入不存在父目录的行为存在平台差异（部分平台自动创建父目录），不做统一断言

  it('writes and reads an ArrayBuffer file asynchronously', async () => {
    await setPageData(page, { filePath: `${DEMO_ROOT}/buffer.txt` })
    await callMethodAndWait(page, 'writeFileBuffer')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'bufferValue')).toEqual(1.2222222)
  })

  it('writes and reads an ArrayBuffer file synchronously', async () => {
    await setPageData(page, { filePath: `${DEMO_ROOT}/buffer-sync.txt` })
    await callMethodAndWait(page, 'writeFileBufferSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'bufferValue')).toEqual(1.333)
  })

  it('taps the async button and finishes', async () => {
    await setPageData(page, { filePath: `${DEMO_ROOT}/tap-smoke.txt`, content: 'tap smoke', encoding: 'utf-8' })
    await tapAndWait(page, '#btn-write-file')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
