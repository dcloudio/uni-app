const {
  isUnsupported,
  isApp,
  unsupportedTest,
  setPageData
} = require('./file-system-manager-test-utils.js')

const PAGE_PATH = '/pages/API/get-file-system-manager/getFileInfo'

// 测试文件内容为 "hello"（5 字节），摘要为标准测试向量
const HELLO_SIZE = 5
const HELLO_MD5 = '5d41402abc4b2a76b9719d911017c592'
const HELLO_SHA1 = 'aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d'
const HELLO_SHA256 = '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
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
    expect(await page.data('data.getFileInfoSize')).toEqual(HELLO_SIZE)
    expect(await page.data('data.getFileInfoDigest')).toEqual(HELLO_MD5)
  })

  it('calculates SHA-1 for known text', async () => {
    await callMethodAndWait('getFileInfoTest', 'sha1')
    expect(await page.data('data.getFileInfoSize')).toEqual(HELLO_SIZE)
    expect(await page.data('data.getFileInfoDigest')).toEqual(HELLO_SHA1)
  })

  it('calculates SHA-256 for known text', async () => {
    await callMethodAndWait('getFileInfoTest', 'sha256')
    expect(await page.data('data.getFileInfoSize')).toEqual(HELLO_SIZE)
    expect(await page.data('data.getFileInfoDigest')).toEqual(HELLO_SHA256)
  })

  it('calculates SHA-256 for UTF-8 content', async () => {
    // 临时替换测试文件内容为中文（15 个汉字 + 1 个中文标点，UTF-8 共 45 字节）
    await setPageData(page, { writeFileContent: '我爱北京天安门，天安门前太阳升' })
    await callMethodAndWait('createTestFile')
    await callMethodAndWait('getFileInfoTest', 'sha256')
    expect(await page.data('data.getFileInfoSize')).toEqual(45)
    expect(await page.data('data.getFileInfoDigest')).toEqual('c4f4ac01374323d79cc521b58e2c581d4ee0159df8466c9df4c5c41253972451')
    // 恢复默认测试文件内容
    await setPageData(page, { writeFileContent: 'hello' })
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
    await setPageData(page, { writeFileContent: 'hello', writeFileEncoding: 'utf-8' })
    await callMethodAndWait('createTestFile')
  })

  it('calculates SHA-256 for longer text', async () => {
    await setPageData(page, { writeFileContent: TEARDROP_TEXT })
    await callMethodAndWait('createTestFile')
    await callMethodAndWait('getFileInfoTest', 'sha256')
    expect(await page.data('data.getFileInfoSize')).toEqual(185)
    expect(await page.data('data.getFileInfoDigest')).toEqual('c28194b445e0df60b9ec1e83bec79ff5e9a2b16c57ac150675dff2f794e9019d')
    // 恢复默认测试文件内容
    await setPageData(page, { writeFileContent: 'hello' })
    await callMethodAndWait('createTestFile')
  })

  it('returns an empty digest when digestAlgorithm is none', async () => {
    await callMethodAndWait('getFileInfoTest', 'none')
    expect(await page.data('data.getFileInfoSize')).toEqual(HELLO_SIZE)
    expect(await page.data('data.getFileInfoDigest')).toEqual('')
  })

  it('rejects an invalid digest algorithm', async () => {
    await callMethodAndWait('getFileInfoTest', 'unsupported-digest')
    expect((await page.data('data.lastFailError')).errCode).toEqual(1300022)
  })

  it('returns the expected UTF-8 size and SHA-1', async () => {
    // 临时替换测试文件内容为中文（15 个汉字 + 1 个中文标点，UTF-8 共 45 字节）
    await setPageData(page, { writeFileContent: '我爱北京天安门，天安门前太阳升' })
    await callMethodAndWait('createTestFile')
    await callMethodAndWait('getFileInfoTest', 'sha1')
    expect(await page.data('data.getFileInfoSize')).toEqual(45)
    expect(await page.data('data.getFileInfoDigest')).toEqual('2ae9c7672ff6c1e7c7e6a0bb4e74a6f06b39350b')
    // 恢复默认测试文件内容
    await setPageData(page, { writeFileContent: 'hello' })
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
    await setPageData(page, { writeFileContent: 'hello', writeFileEncoding: 'utf-8', readFileEncoding: 'utf-8' })
    await callMethodAndWait('createTestFile')
  })

  if (isApp) {
    it('exposes the chooseFile content control without opening the picker', async () => {
      expect(await page.$('#btn-get-file-info-content')).not.toBe(null)
    })
  }
});
