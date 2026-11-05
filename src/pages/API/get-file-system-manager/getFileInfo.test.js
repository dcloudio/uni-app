const {
  isUnsupported,
  isApp,
  unsupportedTest,
  setPageData
} = require('./fsm-test-utils.js')

const PAGE_PATH = '/pages/API/get-file-system-manager/getFileInfo'

// 默认测试文件内容为"测试getFileInfo API的写入功能。"（39 字节），摘要由 node crypto 预计算
const DEFAULT_TEXT = '测试getFileInfo API的写入功能。'
const DEFAULT_SIZE = 39
const DEFAULT_MD5 = '9b2ca6fae36bb2b0a45316ecfc5b8207'
const DEFAULT_SHA1 = '62616a9179bfebadbf3db0b8e668bae09f5321db'
const DEFAULT_SHA256 = '4b5dbf8cd66528eb422acd2ddb782d8feee505225985e70362eaf34c905756e0'
// 含转义符与空白字符的测试内容（212 字节，含 \n、\t、\r\n、反斜杠、引号、全角/不间断空格、Emoji）
const ESCAPE_TEXT = '测试getFileInfo API的写入功能。\n\t制表符行\n回车换行：\r\n下一行\n反斜杠：\\ 双引号：" 单引号：\'\n空格：[  ] 全角：[　] 不间断：[\u00A0] Emoji：[🚀] 混合：中文English123!@#'
const ESCAPE_TEXT_SIZE = 212
const ESCAPE_TEXT_SHA256 = '7db1e8a1e0e5284695a7ccbe722c5e8cb19b8351d426bf5dbb085409ab804e03'
// 长文本测试内容（185 字节），摘要在用例中断言
const TEARDROP_TEXT = 'If you were a teardrop;In my eye,For fear of losing you,I would never cry.And if the golden sun,Should cease to shine its light,Just one smile from you,Would make my whole world bright.'

describe('ExtApi-FileManagerTest-getFileInfo', () => {
  if (isUnsupported) {
    unsupportedTest()
    return
  }
  let page;

  // 等价于 tapAndWait 的等待逻辑：先重置 done 标记，再通过 callMethod 调用页面方法，轮询等待异步操作完成
  async function callMethodAndWait(method, ...args) {
    await setPageData(page, { done: false })
    await page.callMethod(method, ...args)
    await page.waitFor(async () => await page.data('data.done') === true)
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('text')
    await setPageData(page, { logAble: false })
    expect(await page.data('data.getFileInfoSize')).toEqual(-1)
    expect(await page.data('data.getFileInfoDigest')).toEqual('')
    await callMethodAndWait('createTestFile')
  });

  it('calculates MD5 for known text', async () => {
    await callMethodAndWait('getFileInfoTest', 'md5')
    expect(await page.data('data.getFileInfoSize')).toEqual(DEFAULT_SIZE)
    expect(await page.data('data.getFileInfoDigest')).toEqual(DEFAULT_MD5)
  })

  it('calculates SHA-1 for known text', async () => {
    await callMethodAndWait('getFileInfoTest', 'sha1')
    expect(await page.data('data.getFileInfoSize')).toEqual(DEFAULT_SIZE)
    expect(await page.data('data.getFileInfoDigest')).toEqual(DEFAULT_SHA1)
  })

  it('calculates SHA-256 for known text', async () => {
    await callMethodAndWait('getFileInfoTest', 'sha256')
    expect(await page.data('data.getFileInfoSize')).toEqual(DEFAULT_SIZE)
    expect(await page.data('data.getFileInfoDigest')).toEqual(DEFAULT_SHA256)
  })

  it('calculates SHA-256 for content with escape and whitespace characters', async () => {
    // 转义符与空白字符 round-trip：\n、\t、\r\n、反斜杠、引号、全角空格、Emoji，按 utf-8 计 195 字节
    await setPageData(page, { writeFileContent: ESCAPE_TEXT })
    await callMethodAndWait('createTestFile')
    await callMethodAndWait('getFileInfoTest', 'sha256')
    expect(await page.data('data.getFileInfoSize')).toEqual(ESCAPE_TEXT_SIZE)
    expect(await page.data('data.getFileInfoDigest')).toEqual(ESCAPE_TEXT_SHA256)
    // 恢复默认测试文件内容
    await setPageData(page, { writeFileContent: DEFAULT_TEXT })
    await callMethodAndWait('createTestFile')
  })

  it('calculates SHA-256 for UTF-8 content', async () => {
    // 临时替换测试文件内容为专用文本
    await setPageData(page, { writeFileContent: DEFAULT_TEXT })
    await callMethodAndWait('createTestFile')
    await callMethodAndWait('getFileInfoTest', 'sha256')
    expect(await page.data('data.getFileInfoSize')).toEqual(DEFAULT_SIZE)
    expect(await page.data('data.getFileInfoDigest')).toEqual(DEFAULT_SHA256)
    // 恢复默认测试文件内容
    await setPageData(page, { writeFileContent: DEFAULT_TEXT })
    await callMethodAndWait('createTestFile')
  })

  it('calculates SHA-256 for ASCII-encoded content', async () => {
    // 非 ASCII 内容经 ascii 编码写入后转换为 78 字节
    await setPageData(page, {
      writeFileContent: '丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间',
      writeFileEncoding: 'ascii'
    })
    await callMethodAndWait('createTestFile')
    await callMethodAndWait('getFileInfoTest', 'sha256')
    expect(await page.data('data.getFileInfoSize')).toEqual(78)
    expect(await page.data('data.getFileInfoDigest')).toEqual('b6ce525dbe8a0a211835c20becb79daf8d6d27e57b0f649753d7b8db59edf424')
    // 恢复默认测试文件内容与编码
    await setPageData(page, { writeFileContent: DEFAULT_TEXT, writeFileEncoding: 'utf-8' })
    await callMethodAndWait('createTestFile')
  })

  it('calculates SHA-256 for longer text', async () => {
    await setPageData(page, { writeFileContent: TEARDROP_TEXT })
    await callMethodAndWait('createTestFile')
    await callMethodAndWait('getFileInfoTest', 'sha256')
    expect(await page.data('data.getFileInfoSize')).toEqual(185)
    expect(await page.data('data.getFileInfoDigest')).toEqual('c28194b445e0df60b9ec1e83bec79ff5e9a2b16c57ac150675dff2f794e9019d')
    // 恢复默认测试文件内容
    await setPageData(page, { writeFileContent: DEFAULT_TEXT })
    await callMethodAndWait('createTestFile')
  })

  it('returns an empty digest when digestAlgorithm is none', async () => {
    await callMethodAndWait('getFileInfoTest', 'none')
    expect(await page.data('data.getFileInfoSize')).toEqual(DEFAULT_SIZE)
    expect(await page.data('data.getFileInfoDigest')).toEqual('')
  })

  it('uses the platform default digest when digestAlgorithm is omitted', async () => {
    // 不传 digestAlgorithm：使用平台默认算法计算摘要（区别于 none 的空摘要）
    await callMethodAndWait('getFileInfoTest', '')
    expect(await page.data('data.getFileInfoSize')).toEqual(DEFAULT_SIZE)
    expect((await page.data('data.getFileInfoDigest')).length).toBeGreaterThan(0)
  })

  it('rejects an invalid digest algorithm', async () => {
    await callMethodAndWait('getFileInfoTest', 'unsupported-digest')
    expect((await page.data('data.lastFailError')).errCode).toEqual(1300022)
  })

  it('returns the expected UTF-8 size and SHA-1', async () => {
    // 临时替换测试文件内容为专用文本
    await setPageData(page, { writeFileContent: DEFAULT_TEXT })
    await callMethodAndWait('createTestFile')
    await callMethodAndWait('getFileInfoTest', 'sha1')
    expect(await page.data('data.getFileInfoSize')).toEqual(DEFAULT_SIZE)
    expect(await page.data('data.getFileInfoDigest')).toEqual(DEFAULT_SHA1)
    // 恢复默认测试文件内容
    await setPageData(page, { writeFileContent: DEFAULT_TEXT })
    await callMethodAndWait('createTestFile')
  })

  it('converts non-ASCII input using ASCII encoding consistently', async () => {
    // 非 ASCII 内容经 ascii 编码写入后转换为单字节，验证 size、SHA-1 摘要与实际写入字节的一致性
    await setPageData(page, {
      writeFileContent: '丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间',
      writeFileEncoding: 'ascii',
      readFileEncoding: 'base64'
    })
    await callMethodAndWait('createTestFile')
    await callMethodAndWait('getFileInfoTest', 'sha1')
    expect(await page.data('data.getFileInfoSize')).toEqual(78)
    expect(await page.data('data.getFileInfoDigest')).toEqual('4ac7a65055628818341c2ad86ddc4205d8503801')
    await callMethodAndWait('readFileTest')
    expect(await page.data('data.readFileRet')).toEqual('GbAtywwibr7mDCeJDFxkxwx8AFAxAg4I4PYJH4pS7lIpAg3lKQqrGQzKFS9VdAIRMljOUrsMyFA8fImHDNgEDdzSAnceBAVxDFU8KLr0')
    // 恢复默认测试文件内容与编码
    await setPageData(page, { writeFileContent: DEFAULT_TEXT, writeFileEncoding: 'utf-8', readFileEncoding: 'utf-8' })
    await callMethodAndWait('createTestFile')
  })

  if (isApp) {
    it('exposes the chooseFile content control without opening the picker', async () => {
      expect(await page.$('#btn-get-file-info-content')).not.toBe(null)
    })
  }
});
