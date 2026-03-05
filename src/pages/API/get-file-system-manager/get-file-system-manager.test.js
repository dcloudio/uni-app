jest.setTimeout(50000);

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isApp = isAndroid || isIOS || isHarmony && !isAppWebView

const PAGE_PATH = '/pages/API/get-file-system-manager/get-file-system-manager'


describe('ExtApi-FileManagerTest', () => {
  if (isWeb || isAppWebView) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }
  let page;
  let mBasePath;
  let mGlobalTempPath;

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('text');
    await page.waitFor(600);
  });

  // 添加辅助函数来简化数据设置
  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  async function isDone() {
    let isDone = await page.waitFor(async () => {
      return await page.data('data.done')
    })
    await setPageData({
      done: false
    })
    return isDone
  }

  it('test open flag=a+ write fail', async () => {
    await setPageData({
      testOpenFlataplusWrite: false
    })
    await page.callMethod('testOpenFlagWrite')
    await page.waitFor(300)
    let testOpenFlataplusWrite = await page.data('data.testOpenFlataplusWrite')
    expect(testOpenFlataplusWrite).toBe(true)
  })

  it('test write long string error', async () => {
      await setPageData({
        testOpenFlataplusWrite: false
      })
      await page.callMethod('testWriteLongString')
      await page.waitFor(300)

      let getRet = await page.data("data.testOpenFlataplusWrite")
      expect(getRet).toBe(true)
  });

  it('USER_DATA_PATH test', async () => {
    // 测试 USER_DATA_PATH
    let globalUserDataPath = await page.data('data.globalUserDataPath')
    mBasePath = await page.data('data.basePath')
    mGlobalRootPath = await page.data('data.globalRootPath')
    mGlobalTempPath = await page.data('data.globalTempPath')

    await setPageData({
      logAble: false,
      recursiveVal: true,
      copyToBasePath: globalUserDataPath,
      basePath: globalUserDataPath,
      rmDirFile: 'a',
      readDir: 'a',
      writeFile: 'a/1.txt',
      readFile: 'a/1.txt',
      unlinkFile: 'a/1.txt',
      writeFileContent: '锄禾日当午，汗滴禾下土，谁知盘中餐，粒粒皆辛苦'
    })

    // 先清除文件,需要清除全部可能存在的历史测试文件，避免运行失败
    const btnUnLinkFileButton = await page.$('#btn-clear-file')
    await btnUnLinkFileButton.tap()
    await isDone()


    // 清除文件夹
    const btnRmDirButton = await page.$('#btn-remove-dir')
    await btnRmDirButton.tap()
    await isDone()
    // 重新创建测试目录
    const btnMkdDirButton = await page.$('#btn-mkdir')
    await btnMkdDirButton.tap()
    await isDone()

    const btnReadDirButton = await page.$('#btn-read-dir')
    await btnReadDirButton.tap()
    await isDone()


    // 期望通过 recursive = true的 文件夹删除，得到一个空的 /a 目录
    let fileListComplete = await page.data('data.fileListComplete')
    expect(JSON.stringify(fileListComplete)).toEqual('[]')
    let fileListSuccess = await page.data('data.fileListSuccess')
    expect(JSON.stringify(fileListSuccess)).toEqual('[]')

    // 先测试 recursive = false 文件夹创建，期望失败
    await setPageData({
      recursiveVal: false,
      mkdirFile: 'a/b/c'
    })

    if (!isMP) {
      await btnMkdDirButton.tap()
      await isDone()


      let lastFailError = await page.data('data.lastFailError')
      expect(lastFailError.errCode).toEqual(1300002)
      expect(lastFailError.errMsg).toContain('No such file or directory')
      // let lastCompleteError = await page.data('lastCompleteError')
      // expect(lastCompleteError.errCode).toEqual(1300002)
      // expect(lastCompleteError.errMsg).toEqual('No such file or directory')
    }


    // 测试 recursive = true 期望文件夹创建成功
    await setPageData({
      recursiveVal: true
    })
    await btnMkdDirButton.tap()
    await isDone()

    await btnReadDirButton.tap()
    await isDone()

    // 期望通过 recursive = true的 文件夹删除，得到一个空的 /a 目录
    fileListComplete = await page.data('data.fileListComplete')
    expect(JSON.stringify(fileListComplete)).toEqual("[\"b\"]")
    fileListSuccess = await page.data('data.fileListSuccess')
    expect(JSON.stringify(fileListSuccess)).toEqual("[\"b\"]")

    // 测试写入文件
    const btnWriteFileButton = await page.$('#btn-write-file')
    await btnWriteFileButton.tap()
    await isDone()
    // 检查目录列表数量
    await btnReadDirButton.tap()
    await isDone()
    fileListComplete = await page.data('data.fileListComplete')
    fileListComplete.sort()
    expect(JSON.stringify(fileListComplete)).toEqual("[\"1.txt\",\"b\"]")
    fileListSuccess = await page.data('data.fileListSuccess')
    fileListSuccess.sort()
    expect(JSON.stringify(fileListSuccess)).toEqual("[\"1.txt\",\"b\"]")
    // 获取和对比 文件内容
    const btnReadFileButton = await page.$('#btn-read-file')
    await btnReadFileButton.tap()
    await isDone()
    let readFileRet = await page.data('data.readFileRet')
    expect(readFileRet).toEqual("锄禾日当午，汗滴禾下土，谁知盘中餐，粒粒皆辛苦")

    // 更换文件内容 获取和对比 文件md5和sha1
    await setPageData({
      writeFileContent: "If you were a teardrop;In my eye,For fear of losing you,I would never cry.And if the golden sun,Should cease to shine its light,Just one smile from you,Would make my whole world bright.",
      getFileInfoAlgorithm: "md5"
    })
    await btnWriteFileButton.tap()
    await isDone()

    await btnReadFileButton.tap()
    await isDone()
    readFileRet = await page.data('data.readFileRet')
    expect(readFileRet).toEqual(
      "If you were a teardrop;In my eye,For fear of losing you,I would never cry.And if the golden sun,Should cease to shine its light,Just one smile from you,Would make my whole world bright."
    )

    const btnGetFileInfoButton = await page.$('#btn-get-file-info')
    await btnGetFileInfoButton.tap()
    await isDone()

    let getFileInfoSize = await page.data('data.getFileInfoSize')
    expect(getFileInfoSize).toEqual(185)
    let getFileInfoDigest = await page.data('data.getFileInfoDigest')
    expect(getFileInfoDigest).toEqual("29ddd02ed3c38ccebb98884eda082cb1")
    // 切换为 sha1
    await setPageData({
      getFileInfoAlgorithm: "sha1"
    })

    await btnGetFileInfoButton.tap()
    await isDone()

    getFileInfoSize = await page.data('data.getFileInfoSize')
    expect(getFileInfoSize).toEqual(185)
    getFileInfoDigest = await page.data('data.getFileInfoDigest')
    expect(getFileInfoDigest).toEqual("ebef4e75783e0db499fc260d120e695005bead8a")

    // 测试 copyfile
    await setPageData({
      copyFromFile: "a/1.txt",
      copyToFile: "a/2.txt"
    })
    const btnCopyFileButton = await page.$('#btn-copy-file')
    await btnCopyFileButton.tap()
    await isDone()


    await btnReadDirButton.tap()
    await isDone()

    // 1.txt 2.txt 两个文件都存在
    fileListComplete = await page.data('data.fileListComplete')
    fileListComplete.sort()
    expect(JSON.stringify(fileListComplete)).toEqual("[\"1.txt\",\"2.txt\",\"b\"]")
    fileListSuccess = await page.data('data.fileListSuccess')
    fileListSuccess.sort()
    expect(JSON.stringify(fileListSuccess)).toEqual("[\"1.txt\",\"2.txt\",\"b\"]")

    // 测试 rename
    await setPageData({
      renameFromFile: "a/2.txt",
      renameToFile: "a/3.txt"
    })

    const btnRenameFileButton = await page.$('#btn-rename-file')
    await btnRenameFileButton.tap()
    await isDone()

    await btnReadDirButton.tap()
    await isDone()

    // 1.txt 3.txt 两个文件都存在
    fileListComplete = await page.data('data.fileListComplete')
    fileListComplete.sort()
    expect(JSON.stringify(fileListComplete)).toEqual("[\"1.txt\",\"3.txt\",\"b\"]")
    fileListSuccess = await page.data('data.fileListSuccess')
    fileListSuccess.sort()
    expect(JSON.stringify(fileListSuccess)).toEqual("[\"1.txt\",\"3.txt\",\"b\"]")
  });

  if (isMP) {
    // 如下大量测试是对非USER_DATA_PATH的测试，后续有机会再行整理
    return
  }
  it('TEMP_PATH test', async () => {
    // 测试 TEMP_PATH
    let globalTempPath = await page.data('data.globalTempPath')

    let version = process.env.uniTestPlatformInfo
    version = parseInt(version.split(" ")[1])
    let testDirName = "我们经历了一场兵慌马乱的战争.1@2#3$4%5^6&7*8(9)0+-qwertyuiopasdfghjklzxcvbnm;,"
    if (version < 6) {
      // android 6 以下文件名不能包含特殊字符
      testDirName = "我们经历了一场兵慌马乱的战争"
    }

    await setPageData({
      logAble: false,
      recursiveVal: true,
      basePath: globalTempPath,
      copyToBasePath: globalTempPath,
      rmDirFile: 'a',
      mkdirFile: 'a',
      unlinkFile: 'a/' + testDirName + '/中文路径/张三/name/中文文件.mock'
    })


    // 先清除文件,需要清除全部可能存在的历史测试文件，避免运行失败
    const btnUnLinkFileButton = await page.$('#btn-unlink-file')
    await btnUnLinkFileButton.tap()
    await isDone()


    // 清除文件夹
    const btnRmDirButton = await page.$('#btn-remove-dir')
    await btnRmDirButton.tap()
    await isDone()

    // 重新创建测试目录
    const btnMkdDirButton = await page.$('#btn-mkdir')
    await btnMkdDirButton.tap()
    await isDone()

    const btnReadDirButton = await page.$('#btn-read-dir')
    await btnReadDirButton.tap()
    await isDone()


    // 期望通过 recursive = true的 文件夹删除，得到一个空的 /a 目录
    let fileListComplete = await page.data('data.fileListComplete')
    expect(JSON.stringify(fileListComplete)).toEqual("[]")
    let fileListSuccess = await page.data('data.fileListSuccess')
    expect(JSON.stringify(fileListSuccess)).toEqual("[]")

    // 测试 创建多层级文件目录
    await setPageData({
      recursiveVal: true,
      mkdirFile: 'a/b/c/d/e/f/g/h/i/g/k/l/m/n/o/p/q/r/s/t/u/v/w/x/y/z/中文路径/张三/test',
    })

    await btnMkdDirButton.tap()
    await isDone()

    await btnReadDirButton.tap()
    await isDone()

    fileListComplete = await page.data('data.fileListComplete')
    expect(JSON.stringify(fileListComplete)).toEqual("[\"b\"]")
    fileListSuccess = await page.data('data.fileListSuccess')
    expect(JSON.stringify(fileListSuccess)).toEqual("[\"b\"]")

    // 测试 创建包含中文特殊符号的目录
    await setPageData({
      recursiveVal: true,
      mkdirFile: 'a/' + testDirName + '/中文路径/张三/name',
    })
    await btnMkdDirButton.tap()
    await isDone()

    await btnReadDirButton.tap()
    await isDone()

    // 期望通过 recursive = true的 文件夹删除，得到一个空的 /a 目录
    fileListComplete = await page.data('data.fileListComplete')
    fileListComplete.sort()
    expect(JSON.stringify(fileListComplete)).toEqual("[\"b\",\"" + testDirName + "\"]")
    fileListSuccess = await page.data('data.fileListSuccess')
    fileListSuccess.sort()
    expect(JSON.stringify(fileListSuccess)).toEqual("[\"b\",\"" + testDirName + "\"]")

    /**
     * 从资源文件中读取图片为base64，测试写入较大文件场景
     * 'static/test-image/logo.ico' 注意，依赖这个资源文件，不能删除
     */
    await setPageData({
      basePath: "/",
      readFile: 'static/test-image/logo.ico',
      readFileEncoding: 'base64'
    })


    // 获取和对比 文件内容
    const btnReadFileButton = await page.$('#btn-read-file')
    await btnReadFileButton.tap()
    await isDone()
    let readFileRet = await page.data('data.readFileRet')
    expect(readFileRet.length).toEqual(5716)
    let endStr = readFileRet.substring(readFileRet.length - 10)
    expect(endStr).toEqual("AA///AA/8=")

    await setPageData({
      basePath: globalTempPath,
      writeFile: 'a/' + testDirName + '/中文路径/张三/name/中文文件.mock',
      writeFileContent: readFileRet
    })


    const btnWriteFileButton = await page.$('#btn-write-file')
    await btnWriteFileButton.tap()
    await isDone()

    // 获取文件列表，判断是否写入成功，同时置空base64内容 避免影响实时查看状态
    await setPageData({
      readDir: 'a/' + testDirName + '/中文路径/张三/name',
      readFileRet: '',
      writeFileContent: ''
    })

    // 检查目录列表数量
    await btnReadDirButton.tap()
    await isDone()
    fileListComplete = await page.data('data.fileListComplete')
    expect(JSON.stringify(fileListComplete)).toEqual("[\"中文文件.mock\"]")
    fileListSuccess = await page.data('data.fileListSuccess')
    expect(JSON.stringify(fileListSuccess)).toEqual("[\"中文文件.mock\"]")


    // 更换文件内容 获取和对比 文件md5和sha1
    await setPageData({
      getFileInfoFile: 'a/' + testDirName + '/中文路径/张三/name/中文文件.mock',
      getFileInfoAlgorithm: "md5",
    })

    const btnGetFileInfoButton = await page.$('#btn-get-file-info')
    await btnGetFileInfoButton.tap()
    await isDone()

    let getFileInfoSize = await page.data('data.getFileInfoSize')
    expect(getFileInfoSize).toEqual(5716)
    let getFileInfoDigest = await page.data('data.getFileInfoDigest')
    expect(getFileInfoDigest).toEqual("5d8accb35bda875ca3726d18b020e474")

    // 切换为 sha1
    await setPageData({
      getFileInfoAlgorithm: "sha1"
    })

    await btnGetFileInfoButton.tap()
    await isDone()

    getFileInfoSize = await page.data('data.getFileInfoSize')
    expect(getFileInfoSize).toEqual(5716)
    getFileInfoDigest = await page.data('data.getFileInfoDigest')
    expect(getFileInfoDigest).toEqual("b48cf507b618974ee5b7d5449d8c1911e2d68245")

    // 测试不支持的摘要算法，期望返回错误
    await setPageData({
      getFileInfoAlgorithm: "sha256"
    })
    if (!isMP) {
      await btnGetFileInfoButton.tap()
      await isDone()

      let lastFailError = await page.data('data.lastFailError')
      expect(lastFailError.errCode).toEqual(1300022)
      // let lastCompleteError = await page.data('lastCompleteError')
      // expect(lastCompleteError.errCode).toEqual(1300022)
    }

    // rename 到一个没有提前创建过的目录，期望返回错误
    await setPageData({
      renameFromFile: "a/" + testDirName + "/中文路径/张三/name/中文文件.mock",
      renameToFile: "a/没有提前创建的目录/3.txt"
    })

    if (!isMP) {
      const btnRenameFileButton = await page.$('#btn-rename-file')
      await btnRenameFileButton.tap()
      await isDone()
      lastFailError = await page.data('data.lastFailError')
      expect(lastFailError.errCode).toEqual(1300002)
      // lastCompleteError = await page.data('lastCompleteError')
      // expect(lastCompleteError.errCode).toEqual(1300002)
    }

    // 非递归创建一级目录。期望成功
    await setPageData({
      recursiveVal: false,
      mkdirFile: 'a/提前创建的目录',
    })

    await btnMkdDirButton.tap()
    await isDone()

    await setPageData({
      readDir: 'a',
    })

    await btnReadDirButton.tap()
    await isDone()

    fileListComplete = await page.data('data.fileListComplete')
    fileListComplete.sort()
    expect(JSON.stringify(fileListComplete)).toEqual("[\"b\",\"" + testDirName +
      "\",\"提前创建的目录\"]")
    fileListSuccess = await page.data('data.fileListSuccess')
    fileListSuccess.sort()
    expect(JSON.stringify(fileListSuccess)).toEqual("[\"b\",\"" + testDirName +
      "\",\"提前创建的目录\"]")


    await setPageData({
      copyFromFile: "a/" + testDirName + "/中文路径/张三/name/中文文件.mock",
      copyToFile: "a/提前创建的目录/4.txt"
    })



    const btnCopyFileButton = await page.$('#btn-copy-file')
    await btnCopyFileButton.tap()
    await isDone()

    await setPageData({
      readDir: 'a/提前创建的目录',
    })

    await btnReadDirButton.tap()
    await isDone()

    fileListComplete = await page.data('data.fileListComplete')
    expect(JSON.stringify(fileListComplete)).toEqual("[\"4.txt\"]")
    fileListSuccess = await page.data('data.fileListSuccess')
    expect(JSON.stringify(fileListSuccess)).toEqual("[\"4.txt\"]")

    await setPageData({
      unlinkFile: 'a/提前创建的目录/4.txt',
      rmDirFile: 'a/提前创建的目录'
    })
    await btnUnLinkFileButton.tap()
    await isDone()

    await btnReadDirButton.tap()
    await isDone()

    fileListComplete = await page.data('data.fileListComplete')
    expect(JSON.stringify(fileListComplete)).toEqual("[]")
    fileListSuccess = await page.data('data.fileListSuccess')
    expect(JSON.stringify(fileListSuccess)).toEqual("[]")

  });

  it('CROSS DIR test', async () => {
    /**
     * 跨越用户目录和代码资源目录
     */
    let globalRootPath = await page.data('data.globalRootPath')
    await setPageData({
      recursiveVal: true,
      logAble: false,
      basePath: globalRootPath,
      readDir: 'a',
      rmDirFile: 'a',
      mkdirFile: 'a',
      accessFile: 'a/从代码目录拷贝的资源.png',
      unlinkFile: 'a/从代码目录拷贝的资源.png'
    })


    // 先清除文件,需要清除全部可能存在的历史测试文件，避免运行失败
    const btnClearFileButton = await page.$('#btn-clear-file')
    await btnClearFileButton.tap()
    await isDone()


    // 清除文件夹
    const btnRmDirButton = await page.$('#btn-remove-dir')
    await btnRmDirButton.tap()
    await isDone()

    // 重新创建测试目录，期望通过 recursive = true的 文件夹删除，得到一个空的 /a 目录
    const btnMkdDirButton = await page.$('#btn-mkdir')
    await btnMkdDirButton.tap()
    await isDone()

    const btnReadDirButton = await page.$('#btn-read-dir')
    await btnReadDirButton.tap()
    await isDone()

    let fileListComplete = await page.data('data.fileListComplete')
    expect(JSON.stringify(fileListComplete)).toEqual('[]')
    let fileListSuccess = await page.data('data.fileListSuccess')
    expect(JSON.stringify(fileListSuccess)).toEqual('[]')


    // 检查资源文件，此时不存在
    const btnAccessFileButton = await page.$('#btn-access-file')
    await btnAccessFileButton.tap()
    await isDone()

    let accessFileRet = await page.data("data.accessFileRet")
    expect(accessFileRet).toEqual('')


    // 准备从资源目录拷贝png
    await setPageData({
      basePath: "/",
      unlinkFile: 'static/test-image/logo.ico',
      accessFile: 'static/test-image/logo.ico',
    })
    // 检查资源文件，期望存在
    await btnAccessFileButton.tap()
    await isDone()

    accessFileRet = await page.data("data.accessFileRet")
    expect(accessFileRet).toEqual('access:ok')

    // // 尝试删除资源，期望失败
    const btnUnLinkFileButton = await page.$('#btn-unlink-file')
    if (!isIOS) {
      await btnUnLinkFileButton.tap()
      await isDone()
    }

    await btnAccessFileButton.tap()
    await isDone()

    accessFileRet = await page.data("data.accessFileRet")
    expect(accessFileRet).toEqual('access:ok')
    // 复制资源到 root目录
    await setPageData({
      copyToBasePath: globalRootPath,
      copyFromFile: "static/test-image/logo.ico",
      copyToFile: "a/从代码目录拷贝的资源.png"
    })
    const btnCopyFileButton = await page.$('#btn-copy-file')
    await btnCopyFileButton.tap()
    await isDone()

    // 检查期望 root 目录中图片文件存在
    await setPageData({
      basePath: globalRootPath,
      unlinkFile: 'a/从代码目录拷贝的资源.png',
      accessFile: 'a/从代码目录拷贝的资源.png',
      rmDirFile: 'a',
    })
    await btnAccessFileButton.tap()
    await isDone()

    accessFileRet = await page.data("data.accessFileRet")
    expect(accessFileRet).toEqual('access:ok')

    await btnUnLinkFileButton.tap()
    await isDone()

    await btnAccessFileButton.tap()
    await isDone()

    accessFileRet = await page.data("data.accessFileRet")
    expect(accessFileRet).toEqual('')

    // 从页面的按钮触发一次文件复制
    const btnCopyStaticFileButton = await page.$('#btn-copyStatic-file')
    await btnCopyStaticFileButton.tap()
    await isDone()

    await btnReadDirButton.tap()
    await isDone()

    fileListComplete = await page.data('data.fileListComplete')
    expect(JSON.stringify(fileListComplete)).toEqual("[\"mock.json\"]")
    fileListSuccess = await page.data('data.fileListSuccess')
    expect(JSON.stringify(fileListSuccess)).toEqual("[\"mock.json\"]")

    // 从页面的按钮触发一次文件清空
    await btnClearFileButton.tap()
    await isDone()

    await btnReadDirButton.tap()
    await isDone()

    fileListComplete = await page.data('data.fileListComplete')
    expect(JSON.stringify(fileListComplete)).toEqual("[]")
    fileListSuccess = await page.data('data.fileListSuccess')
    expect(JSON.stringify(fileListSuccess)).toEqual("[]")

  });

  it('write and read', async () => {
    /**
     * 测试writefile readfile 各个参数是否符合预期
     */
    let globalTempPath = await page.data('data.globalTempPath')
    await setPageData({
      recursiveVal: true,
      logAble: false,
      basePath: globalTempPath,
      readDir: 'd',
      rmDirFile: 'd',
      mkdirFile: 'd',
      writeFileContent: "我爱北京天安门，天安门前太阳升",
      writeFileEncoding: "utf-8",
      readFileEncoding: "utf-8",
      unlinkFile: 'd/write.bing',
      writeFile: 'd/write.bing',
      readFile: 'd/write.bing',
      getFileInfoFile: 'd/write.bing',
      getFileInfoAlgorithm: "sha1"
    })

    // 先清除文件,需要清除全部可能存在的历史测试文件，避免运行失败
    const btnUnLinkFileButton = await page.$('#btn-unlink-file')
    await btnUnLinkFileButton.tap()
    await isDone()

    // 清除文件夹
    const btnRmDirButton = await page.$('#btn-remove-dir')
    await btnRmDirButton.tap()
    await isDone()

    // 重新创建测试目录，期望通过 recursive = true的 文件夹删除，得到一个空的 /a 目录
    const btnMkdDirButton = await page.$('#btn-mkdir')
    await btnMkdDirButton.tap()
    await isDone()

    const btnReadDirButton = await page.$('#btn-read-dir')
    await btnReadDirButton.tap()
    await isDone()

    let fileListComplete = await page.data('data.fileListComplete')
    expect(JSON.stringify(fileListComplete)).toEqual('[]')
    let fileListSuccess = await page.data('data.fileListSuccess')
    expect(JSON.stringify(fileListSuccess)).toEqual('[]')

    // 先用utf-8 写入内容
    const btnWriteFileButton = await page.$('#btn-write-file')
    await btnWriteFileButton.tap()
    await isDone()

    const btnReadFileButton = await page.$('#btn-read-file')
    await btnReadFileButton.tap()
    await isDone()
    let readFileRet = await page.data('data.readFileRet')
    expect(readFileRet).toEqual("我爱北京天安门，天安门前太阳升")

    const btnGetFileInfoButton = await page.$('#btn-get-file-info')
    await btnGetFileInfoButton.tap()
    await isDone()

    let getFileInfoSize = await page.data('data.getFileInfoSize')
    expect(getFileInfoSize).toEqual(45)
    let getFileInfoDigest = await page.data('data.getFileInfoDigest')
    expect(getFileInfoDigest).toEqual("2ae9c7672ff6c1e7c7e6a0bb4e74a6f06b39350b")

    // 尝试读取base64 信息
    await setPageData({
      readFileEncoding: "base64",
    })

    await btnReadFileButton.tap()
    await isDone()
    readFileRet = await page.data('data.readFileRet')
    expect(readFileRet).toEqual("5oiR54ix5YyX5Lqs5aSp5a6J6Zeo77yM5aSp5a6J6Zeo5YmN5aSq6Ziz5Y2H")
    // 测试ascii，需要特别测试 ascii 写入非法字符的情况，因为微信的常量字符编码和android原生有差异。

    await setPageData({
      writeFileContent: "丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间",
      writeFileEncoding: "ascii",
      readFileEncoding: "base64",
    })

    await btnWriteFileButton.tap()
    await isDone()

    await btnGetFileInfoButton.tap()
    await isDone()

    getFileInfoSize = await page.data('data.getFileInfoSize')
    expect(getFileInfoSize).toEqual(78)
    getFileInfoDigest = await page.data('data.getFileInfoDigest')
    expect(getFileInfoDigest).toEqual("4ac7a65055628818341c2ad86ddc4205d8503801")

    await btnReadFileButton.tap()
    await isDone()
    readFileRet = await page.data('data.readFileRet')
    expect(readFileRet).toEqual(
      "GbAtywwibr7mDCeJDFxkxwx8AFAxAg4I4PYJH4pS7lIpAg3lKQqrGQzKFS9VdAIRMljOUrsMyFA8fImHDNgEDdzSAnceBAVxDFU8KLr0"
    )

    // 尝试写入合法ascii
    await setPageData({
      writeFileContent: "hello jack.hello marry.",
      writeFileEncoding: "ascii",
      readFileEncoding: "ascii",
    })

    await btnWriteFileButton.tap()
    await isDone()

    await btnReadFileButton.tap()
    await isDone()
    readFileRet = await page.data('data.readFileRet')
    expect(readFileRet).toEqual("hello jack.hello marry.")

    // 写入base64 获取 中文
    await setPageData({
      writeFileContent: "5LiZ6L6w5Lit56eL77yM5qyi6aWu6L6+5pem77yM5aSn6YaJ77yM5L2c5q2k56+H77yM5YW85oCA5a2Q55Sx44CC5piO5pyI5Yeg5pe25pyJ77yf5oqK6YWS6Zeu6Z2S5aSp44CC5LiN55+l5aSp5LiK5a6r6ZiZ77yM5LuK5aSV5piv5L2V5bm044CC5oiR5qyy5LmY6aOO5b2S5Y6777yM5Y+I5oGQ55C85qW8546J5a6H77yM6auY5aSE5LiN6IOc5a+S44CC6LW36Iie5byE5riF5b2x77yM5L2V5Ly85Zyo5Lq66Ze0",
      writeFileEncoding: "base64",
      readFileEncoding: "utf-8",
    })

    await btnWriteFileButton.tap()
    await isDone()

    await btnReadFileButton.tap()
    await isDone()
    readFileRet = await page.data('data.readFileRet')
    expect(readFileRet).toEqual(
      "丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间")

    await setPageData({
      readFileEncoding: "base64",
    })

    await btnReadFileButton.tap()
    await isDone()
    readFileRet = await page.data('data.readFileRet')
    expect(readFileRet).toEqual(
      "5LiZ6L6w5Lit56eL77yM5qyi6aWu6L6+5pem77yM5aSn6YaJ77yM5L2c5q2k56+H77yM5YW85oCA5a2Q55Sx44CC5piO5pyI5Yeg5pe25pyJ77yf5oqK6YWS6Zeu6Z2S5aSp44CC5LiN55+l5aSp5LiK5a6r6ZiZ77yM5LuK5aSV5piv5L2V5bm044CC5oiR5qyy5LmY6aOO5b2S5Y6777yM5Y+I5oGQ55C85qW8546J5a6H77yM6auY5aSE5LiN6IOc5a+S44CC6LW36Iie5byE5riF5b2x77yM5L2V5Ly85Zyo5Lq66Ze0"
    )

  });

  it('stat and asset test', async () => {
    // 测试 USER_DATA_PATH //globalTempPath
    let globalRootPath = await page.data('data.globalRootPath')

    await setPageData({
      logAble: false,
      recursiveVal: true,
      copyToBasePath: globalRootPath,
      basePath: globalRootPath,
      globalTempPath: globalRootPath,
      rmDirFile: 'a',
      mkdirFile: 'a',
      readDir: 'a',
      unlinkFile: 'a/1.txt',
    })

    // 先清除文件,需要清除全部可能存在的历史测试文件，避免运行失败
    const btnUnLinkFileButton = await page.$('#btn-unlink-file')
    await btnUnLinkFileButton.tap()
    await isDone()

    await setPageData({
      unlinkFile: 'a/2.txt',
    })
    await btnUnLinkFileButton.tap()
    await isDone()

    await setPageData({
      unlinkFile: 'a/m/3.txt',
    })
    await btnUnLinkFileButton.tap()
    await isDone()

    // // 清除文件夹
    const btnRmDirButton = await page.$('#btn-remove-dir')
    await btnRmDirButton.tap()
    await isDone()

    // 重新创建测试目录
    const btnMkdDirButton = await page.$('#btn-mkdir')
    await btnMkdDirButton.tap()
    await isDone()

    const btnReadDirButton = await page.$('#btn-read-dir')
    await btnReadDirButton.tap()
    await isDone()


    // 期望通过 recursive = true的 文件夹删除，得到一个空的 /a 目录
    let fileListComplete = await page.data('data.fileListComplete')
    expect(JSON.stringify(fileListComplete)).toEqual('[]')
    let fileListSuccess = await page.data('data.fileListSuccess')
    expect(JSON.stringify(fileListSuccess)).toEqual('[]')

    // 写入一个文件
    await setPageData({
      writeFileContent: "锄禾日当午，汗滴禾下土，谁知盘中餐，粒粒皆辛苦",
      writeFileEncoding: "utf-8",
      writeFile: 'a/1.txt',
      recursiveVal: false,
      statFile: 'a/1.txt',
    })

    let lastFailError = await page.data('data.lastFailError')

    const btnWriteFileButton = await page.$('#btn-write-file')
    await btnWriteFileButton.tap()
    await isDone()

    let btnStatFileButton = await page.$('#btn-stat-file')
    await btnStatFileButton.tap()
    await isDone()

    // 读取单个文件信息
    let statsRet = await page.data('data.statsRet')
    expect(statsRet.length).toEqual(1)
    expect(statsRet[0].path).toEqual('')
    if (!isIOS) {
      expect(statsRet[0].stats.size).toEqual(69)
    }
    if (isApp) {
      // 写入一个文件
      await setPageData({
        statsRet: ['']
      })
      btnStatFileButton = await page.$('#btn-stat-file-sync')
      await btnStatFileButton.tap()
      await isDone()

      // 读取单个文件信息
      statsRet = await page.data('data.statsRet')
      expect(statsRet.length).toEqual(1)
      expect(statsRet[0].path).toEqual('')
      if (!isIOS) {
        expect(statsRet[0].stats.size).toEqual(69)
      }
    }

    /**
     * 创建子目录和子目录文件，测试recursive参数
     */
    await setPageData({
      writeFileContent: "1234567890",
      writeFileEncoding: "ascii",
      writeFile: 'a/2.txt',
      basePath: globalRootPath,
      recursiveVal: false,
      statFile: 'a',
      mkdirFile: 'a/m',
    })


    await btnWriteFileButton.tap()
    await isDone()

    // 创建子目录
    await btnMkdDirButton.tap()
    await isDone()

    // 复制一份文件到 /a/m/3.txt
    await setPageData({
      //  asset 只能正式版测试，这里只能模拟返回路径
      basePath: '/',
      copyFromFile: 'static/test-image/logo.ico',
      copyToFile: 'a/m/3.txt',
    })
    const btnCopyFileButton = await page.$('#btn-copy-file')
    await btnCopyFileButton.tap()
    await isDone()


    await setPageData({
      basePath: globalRootPath,
      recursiveVal: true,
      statFile: 'a',
    })

    await btnStatFileButton.tap()
    await isDone()

    // 读取全部文件信息
    statsRet = await page.data('data.statsRet')

    statsRet.sort(function(a, b) {
      if (a.path > b.path) {
        return 1
      } else if (a.path < b.path) {
        return -1
      }
      return 0
    })

    expect(statsRet.length).toEqual(5)
    const expectedPaths = ['/', '/m', '/1.txt', '/2.txt', '/m/3.txt']

    const pathsInResult = statsRet.map(item => item.path)

    for (const expectedPath of expectedPaths) {
      expect(pathsInResult).toContainEqual(expect.stringMatching(new RegExp(expectedPath)))
    }

    // 额外校验 size
    const findItem = (path) => statsRet.find(item => item.path.includes(path))

    const item2 = findItem('/2.txt')
    expect(item2).toBeTruthy()
    if (!isIOS && item2) {
      expect(item2.stats.size).toEqual(10)
    }

    const item3 = findItem('/m/3.txt')
    expect(item3).toBeTruthy()
    if (!isIOS && item3) {
      expect(item3.stats.size).toEqual(4286)
    }


    // 清理文件，避免影响其他测试用例
    await setPageData({
      unlinkFile: 'a/1.txt',
    })
    await btnUnLinkFileButton.tap()
    await isDone()

    await setPageData({
      unlinkFile: 'a/2.txt',
    })
    await btnUnLinkFileButton.tap()
    await isDone()

    await setPageData({
      unlinkFile: 'a/m/3.txt',
      rmDirFile: 'a',
      readDir: 'a',
      recursiveVal: true,
    })
    await btnUnLinkFileButton.tap()
    await isDone()

    await btnRmDirButton.tap()
    await isDone()

    await btnReadDirButton.tap()
    await isDone()

    lastFailError = await page.data('data.lastFailError')
    expect(lastFailError.errCode).toEqual(1300002)
    fileListSuccess = await page.data('data.fileListSuccess')
    expect(JSON.stringify(fileListSuccess)).toEqual('[]')

  });

  async function createFile() {
    // 重新创建测试目录，期望通过 recursive = true的 文件夹删除，得到一个空的  目录
    const btnMkdDirButton = await page.$('#btn-mkdir-sync')
    await btnMkdDirButton.tap()
    await isDone()

    // 先用utf-8 写入内容
    const btnWriteFileButton = await page.$('#btn-write-file-sync')
    await btnWriteFileButton.tap()
    await isDone()
  }

  async function clearDir(dir) {
    // 最后需要清楚所有文件避免测试失败
    await setPageData({
      rmDirFile: dir,
    })
    const btnUnLinkFileButton = await page.$('#btn-clear-file')
    await btnUnLinkFileButton.tap()
    await isDone()

    const btnClear = await page.$('#btn-remove-dir')
    await btnClear.tap()
    await isDone()
  }

  if (isApp) {
    it('appendFileTest', async () => {
      await setPageData({
        basePath: mBasePath,
        recursiveVal: true,
        logAble: false,
        rmDirFile: 'appendfile',
        mkdirFile: 'appendfile',
        writeFileContent: "我爱北京天安门，天安门前太阳升",
        appendFileContent: "再说一遍",
        writeFileEncoding: "utf-8",
        readFileEncoding: "utf-8",
        readFile: 'appendfile/appendfile.txt',
        unlinkFile: 'appendfile/appendfile.txt',
        writeFile: 'appendfile/appendfile.txt',
      })

      // 先清除文件,需要清除全部可能存在的历史测试文件，避免运行失败
      const btnUnLinkFileButton = await page.$('#btn-unlink-file')
      await btnUnLinkFileButton.tap()
      await isDone()

      // 清除文件夹
      const btnRmDirButton = await page.$('#btn-remove-dir')
      await btnRmDirButton.tap()
      await isDone()

      // 重新创建测试目录，期望通过 recursive = true的 文件夹删除，得到一个空的 /a 目录
      const btnMkdDirButton = await page.$('#btn-mkdir')
      await btnMkdDirButton.tap()
      await isDone()

      // 先用utf-8 写入内容
      const btnWriteFileButton = await page.$('#btn-write-file')

      await btnWriteFileButton.tap()
      await isDone()


      //追加内容
      const btnAppendFileButton = await page.$('#btn-append-file')
      await btnAppendFileButton.tap()
      await isDone()

      const btnReadFileButton = await page.$('#btn-read-file')
      await btnReadFileButton.tap()
      await isDone()
      let readFileRet = await page.data('data.readFileRet')
      expect(readFileRet).toEqual("我爱北京天安门，天安门前太阳升再说一遍")
    });

    //nlinkSyncTest mkdirSyncTest appendFileTest writeFileSyncTest readFileSyncTest rmdirSyncTest readDirSyncTest accessFileSyncTest
    //renameFileSync copyFileSyncTest appendFileSyncTest truncateFileTest truncateFileSyncTest
    it('sync test', async () => {
        await setPageData({
          basePath: mBasePath,
          recursiveVal: false,
          logAble: false,
          rmDirFile: 'sync',
          mkdirFile: 'sync',
          writeFileContent: "我爱北京天安门，天安门前太阳升",
          appendFileContent: "再说一遍",
          writeFileEncoding: "utf-8",
          readFileEncoding: "utf-8",
          readDir: 'sync',
          rmDirFile: 'sync',
          unlinkFile: 'sync/sync.txt',
          readFile: 'sync/sync.txt',
          writeFile: 'sync/sync.txt',
          accessFile: 'sync/sync.txt',
          renameToFile: 'sync/sync.txt',
          renameFromFile: 'sync/sync.txt',
        })
        await clearDir('sync')
        // 重新创建测试目录，期望通过 recursive = true的 文件夹删除，得到一个空的  目录
        const btnMkdDirButton = await page.$('#btn-mkdir-sync')
        await btnMkdDirButton.tap()
        await isDone()

        const btnReadDirButton = await page.$('#btn-read-dir-sync')
        await btnReadDirButton.tap()
        await isDone()
        const fileListSuccess = await page.data('data.fileListSuccess')
        expect(JSON.stringify(fileListSuccess)).toEqual('[]')

        // 先用utf-8 写入内容
        const btnWriteFileButton = await page.$('#btn-write-file-sync')
        await btnWriteFileButton.tap()
        await isDone()

        let btnAccessFileButton = await page.$('#btn-access-file-sync')
        await btnAccessFileButton.tap()
        await isDone()
        let accessFileRet = await page.data("data.accessFileRet")
        expect(accessFileRet).toEqual('access:ok')

        //重新命名文件
        const btnRenameFileButton = await page.$('#btn-rename-file-sync')
        await btnRenameFileButton.tap()
        await isDone()
        let renameFileRet = await page.data("data.renameFileRet")
        expect(renameFileRet).toEqual("rename:ok")

        //追加内容
        let btnAppendFileButton = await page.$('#btn-append-file')
        await btnAppendFileButton.tap()
        await isDone()

        btnAppendFileButton = await page.$('#btn-append-file-sync')
        await btnAppendFileButton.tap()

        let btnReadFileButton = await page.$('#btn-read-file-sync')
        await btnReadFileButton.tap()
        await isDone()
        readFileRet = await page.data('data.readFileRet')
        expect(readFileRet).toEqual("我爱北京天安门，天安门前太阳升再说一遍再说一遍")

        //truncateFileTest
        let btnTruncateFile = await page.$('#btn-truncate-file')
        await btnTruncateFile.tap()
        await isDone()
        btnReadFileButton = await page.$('#btn-read-file-sync')
        await btnReadFileButton.tap()
        await isDone()
        readFileRet = await page.data('data.readFileRet')
        expect(readFileRet).toEqual("我爱")

        btnTruncateFile = await page.$('#btn-truncate-file-sync')
        await btnTruncateFile.tap()
        await isDone()
        btnReadFileButton = await page.$('#btn-read-file-sync')
        await btnReadFileButton.tap()
        await isDone()
        readFileRet = await page.data('data.readFileRet')
        expect(readFileRet).toEqual("我")

        // 测试 copyfile
        await setPageData({
          basePath: mBasePath,
          copyToBasePath: mBasePath,
          copyFromFile: "sync/sync.txt",
          copyToFile: "sync/syncto.txt",
          accessFile: "sync/syncto.txt"
        })
        const btnCopyFileButton = await page.$('#btn-copy-file-sync')
        await btnCopyFileButton.tap()
        await isDone()
        btnAccessFileButton = await page.$('#btn-access-file-sync')
        await btnAccessFileButton.tap()
        await isDone()
        accessFileRet = await page.data("data.accessFileRet")
        expect(accessFileRet).toEqual('access:ok')

        await clearDir('sync')
    });

    it('removeSavedFileTest', async () => {
        await setPageData({
          logAble: false,
          basePath: mBasePath
        })
        await clearDir('save4')
        await setPageData({
          logAble: false,
          basePath: mGlobalTempPath,
          temFile: 'save4/saveSync.txt',
          mkdirFile: 'save4',
          writeFile: 'save4/saveSync.txt',
          accessFile: 'saveSync.txt'
        })
        await createFile()
        let btnRemoveSavedFileRet = await page.$('#btn-remove-saved-file')
        await btnRemoveSavedFileRet.tap()
        await isDone()
        let removeSavedFileRet = await page.data("data.removeSavedFileRet")
        expect(removeSavedFileRet).toEqual('removeSavedFile:ok')

    });

    //openFiletest openFileSynctest closeTest closeTestSync writeTest writeSyncTest
    it('openFiletest', async () => {
      await setPageData({
        basePath: mBasePath,
        logAble: false,
        mkdirFile: 'fd',
        writeFile: 'fd/1.txt',
        readFile: 'fd/1.txt'
      })
      await clearDir('fd')
      await createFile()
      //openFiletest
      let btnOpenFile = await page.$('#btn-open-file')
      await btnOpenFile.tap()
      await isDone()
      let fd = await page.data("data.fd")
      expect(fd).not.toBe('');
      await setPageData({
        fd: '',
      })
      //openFileSynctest
      btnOpenFile = await page.$('#btn-open-file-sync')
      await btnOpenFile.tap()
      await isDone()
      fd = await page.data("data.fd")
      expect(fd).not.toBe('');
    });

    // closeTest closeTestSync
    it('closeTest', async () => {
      await setPageData({
        basePath: mBasePath,
        logAble: false,
        mkdirFile: 'fd',
        writeFile: 'fd/1.txt',
        readFile: 'fd/1.txt'
      })
      await clearDir('fd')
      await createFile()
      //closeTest
      let btnCloseFile = await page.$('#btn-close-file')
      await btnCloseFile.tap()
      await isDone()
      let closeFileRet = await page.data("data.closeFileRet")
      expect(closeFileRet).toEqual('close:ok')
      await setPageData({
        closeFileRet: '',
      })
      //closeTestSync
      btnCloseFile = await page.$('#btn-close-file-sync')
      await btnCloseFile.tap()
      await isDone()
      closeFileRet = await page.data("data.closeFileRet")
      expect(closeFileRet).toEqual('close:ok')

    });

    // writeTest writeSyncTest
    it('writeTest', async () => {
      await setPageData({
        basePath: mBasePath,
        logAble: false,
        mkdirFile: 'fd',
        writeFile: 'fd/1.txt',
        readFile: 'fd/1.txt',
        writeData: '我是一只小小鸟'
      })
      await clearDir('fd')
      await createFile()
      let btnWrite = await page.$('#btn-write')
      await btnWrite.tap()
      await isDone()
      let bytesWritten = await page.data("data.bytesWritten")
      let lastFailError = await page.data("data.lastFailError")
      if (bytesWritten != 21) {
        let writeData = await page.data("data.writeData")
      }

      expect(bytesWritten).toEqual(21)
      //writeSyncTest
      await setPageData({
        writeFile: 'fd/1.txt',
        readFile: 'fd/1.txt',
        writeData: '我是'
      })

      btnWrite = await page.$('#btn-write-sync')
      await btnWrite.tap()
      await isDone()
      bytesWritten = await page.data("data.bytesWritten")
      expect(bytesWritten).toEqual(6)
      //fstatTest
      let btnFstat = await page.$('#btn-fstat-file')
      await btnFstat.tap()
      await isDone()
      let fstatSize = await page.data("data.fstatSize")
      expect(fstatSize > 0).toBe(true)

      //fstatSyncTest
      btnFstat = await page.$('#btn-fstat-file-sync')
      await btnFstat.tap()
      await isDone()
      fstatSize = await page.data("data.fstatSize")
      expect(fstatSize > 0).toBe(true)

      //ftruncateFileTest
      let btnFTruncateFile = await page.$('#btn-ftruncate-file')
      await btnFTruncateFile.tap()
      await isDone()
      let ftruncateRet = await page.data("data.ftruncateRet")
      expect(ftruncateRet).toEqual('ftruncate:ok')
      await setPageData({
        ftruncate: '',
      })

      //ftruncateFileSyncTest
      btnFTruncateFile = await page.$('#btn-ftruncate-file-sync')
      await btnFTruncateFile.tap()
      await isDone()
      ftruncateRet = await page.data("data.ftruncateRet")
      expect(ftruncateRet).toEqual('ftruncate:ok')
    });

    //writeTest writeSyncTest
    it('ftruncateFileTest', async () => {
      await setPageData({
        basePath: mBasePath,
        logAble: false,
        mkdirFile: 'fd',
        writeFile: 'fd/1.txt',
        readFile: 'fd/1.txt',
        writeData: '我是一只小小鸟我是'
      })
      await clearDir('fd')
      await createFile()
      btnWrite = await page.$('#btn-write-sync')
      await btnWrite.tap()
      await isDone()
      bytesWritten = await page.data("data.bytesWritten")
      expect(bytesWritten).toEqual(27)
      //ftruncateFileTest
      let btnFTruncateFile = await page.$('#btn-ftruncate-file')
      await btnFTruncateFile.tap()
      await isDone()
      let ftruncateRet = await page.data("data.ftruncateRet")
      expect(ftruncateRet).toEqual('ftruncate:ok')
      await setPageData({
        ftruncate: '',
      })

      //ftruncateFileSyncTest
      btnFTruncateFile = await page.$('#btn-ftruncate-file-sync')
      await btnFTruncateFile.tap()
      await isDone()
      ftruncateRet = await page.data("data.ftruncateRet")
      expect(ftruncateRet).toEqual('ftruncate:ok')
    });

    //testAppendFileBuffer
    it('testAppendFileBuffer', async () => {
      var btnWrite = await page.$('#btn-appendfile-buffer')
      await btnWrite.tap()
      await isDone()
      let arrayBufferRes = await page.data("data.arrayBufferRes")
      expect(arrayBufferRes).toEqual(21)
    });

    it('testAppendFileBufferSync', async () => {
      var btnWrite = await page.$('#btn-appendfilesync-buffer')
      await btnWrite.tap()
      await isDone()
      let arrayBufferRes = await page.data("data.arrayBufferRes")
      expect(arrayBufferRes).toEqual(20)
    });

    it('testWriteReadSyncBuffer', async () => {
      var btnWrite = await page.$('#btn-writereadsync-buffer')
      await btnWrite.tap()
      await isDone()
      let arrayBufferRes = await page.data("data.arrayBufferRes")
      expect(arrayBufferRes).toEqual(1.11)
    });

    it('testWriteReadBuffer', async () => {
      var btnWrite = await page.$('#btn-writeread-buffer')
      await btnWrite.tap()
      await isDone()
      let arrayBufferRes = await page.data("data.arrayBufferRes")
      expect(arrayBufferRes).toEqual(1.24)
    });

    it('testWriteReadFileSyncBuffer', async () => {
      var btnWrite = await page.$('#btn-writereadfilesync-buffer')
      await btnWrite.tap()
      await isDone()
      let arrayBufferRes = await page.data("data.arrayBufferRes")
      expect(arrayBufferRes).toEqual(1.333)
    });

    it('testReadFileBuffer', async () => {
      var btnWrite = await page.$('#btn-writereadfile-buffer')
      await btnWrite.tap()
      await isDone()
      let arrayBufferRes = await page.data("data.arrayBufferRes")
      expect(arrayBufferRes).toEqual(1.2222222)
    });

    it('SavedFileTest', async () => {
      await setPageData({
        logAble: false,
        basePath: mBasePath,
        writeFile: 'a/1.txt',
        temFile: 'a/1.txt',
        accessFile: 'a/1.txt'
      })

       let saveFileFileButton = await page.$('#btn-save-file')
       await saveFileFileButton.tap()
       await isDone()
       await page.waitFor(600);
       let saveFileRet = await page.data('data.saveFileRet')
       expect(saveFileRet).toEqual('unifile://cache/uni-store/1.txt')

       let saveFileFileButton1 = await page.$('#btn-save-file1')
       await saveFileFileButton1.tap()
       await isDone()
       await page.waitFor(600);
       saveFileRet = await page.data('data.saveFileRet')
       expect(saveFileRet).toEqual('unifile://usr/local/1.txt')

       let saveFileFileButton2 = await page.$('#btn-save-file2')
       await saveFileFileButton2.tap()
       await isDone()
       await page.waitFor(600);
       saveFileRet = await page.data('data.saveFileRet')
       expect(saveFileRet).toEqual('unifile://usr/local')

       let saveFileFileButton3 = await page.$('#btn-save-file3')
       await saveFileFileButton3.tap()
       await isDone()
       await page.waitFor(600);
       saveFileRet = await page.data('data.saveFileRet')
       expect(saveFileRet).toEqual('unifile://usr/local')
    });

    it('getSavedFileListTest', async () => {
        await setPageData({
          logAble: false,
          basePath: mGlobalTempPath,
          temFile: 'save3/2.txt',
          mkdirFile: 'save3',
          writeFile: 'save3/2.txt',
          accessFile: '2.txt'
        })
        await createFile()
        await setPageData({
          basePath: mBasePath,
          writeFile: 'save/2.txt',
        })
        btnSaveFile = await page.$('#btn-save-file-sync')
        await btnSaveFile.tap()
        await isDone()
        let btnSavedFileList = await page.$('#btn-getsaved-filelist')
        await btnSavedFileList.tap()
        await isDone()
        let getSavedFileListRet = await page.data("data.getSavedFileListRet")
        expect(getSavedFileListRet).toEqual('getSavedFileList:ok')
    });

    it('saveFileAndReadFileTest', async () => {
        await setPageData({
          logAble: false,
          basePath: mBasePath,
          writeFile: 'a/1.txt',
          temFile: 'a/1.txt',
          readFileRet: ''
        })
        btn = await page.$('#btn-save-file-read-file')
        await btn.tap()
        await isDone()
        await page.waitFor(600);
        let getRet = await page.data("data.readFileRet")
        expect(getRet).toEqual('saveFileAndReadFileTest:ok')
    });
  }

  if (isAndroid) {
    it('testReadAssetFile', async () => {
      await setPageData({
        basePath: 'file:///android_asset/uni-app-x',
        logAble: false,
        readFileRet: "",
        readFile: '/version.json'
      })
      let btnReadFileButton = await page.$('#btn-read-file-sync')
      await btnReadFileButton.tap()
      await isDone()
      let readFileRet = await page.data('data.readFileRet')
      expect(readFileRet.length > 0).toBe(true)
    });
  }
});


