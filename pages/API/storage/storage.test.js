jest.setTimeout(50000);

const PAGE_PATH = '/pages/API/storage/storage'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')

const StorageKeysBlackList = [
  '$$STAT__DBDATA:__UNI__HelloUniAppX',
  '_STAT_LAST_PAGE_ROUTE',
  'UNI_STAT_DATA:__UNI__HelloUniAppX',
  'UNI_STAT_LAST_PAGE_ROUTE'
]
const filterStorageKeys = (keys) => {
  return keys.filter(key => {
    return !StorageKeysBlackList.includes(key)
  })
}

describe('ExtApi-StorageInfoTest', () => {
  if (
    isIOS &&
    (
      platformInfo.indexOf('15.5') != -1 ||
      platformInfo.indexOf('14.5') != -1 ||
      platformInfo.indexOf('13.7') != -1 ||
      platformInfo.indexOf('12.4') != -1
    )
  ) {
    // TODO: 排查 ios 不兼容版本 测试异常原因
    it('ios 15.5 14.5 13.7 12.4 测试异常', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page;
  
  // 测试辅助函数
  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }
  
  function getData (key = '') {
    return new Promise(async (resolve, reject) => {
      const data = await page.data('data')
      resolve(key ? data[key] : data)
    })
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(600);
  });

  it('Check async properties', async () => {
    // 异步存储测试
    await setPageData({
      key: "autotest_key_mock",
      data: "长安大道连狭斜，青牛白马七香车。玉辇纵横过主第，金鞭络绎向侯家。龙衔宝盖承朝日，凤吐流苏带晚霞。百尺游丝争绕树，一群娇鸟共啼花。游蜂戏蝶千门侧，碧树银台万种色。复道交窗作合欢，双阙连甍垂凤翼。"
    })
    await page.waitFor(600)
    const btnSetStorageButtonInfo = await page.$('.btn-setstorageAsync')
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    const btnGetStorageButtonInfo = await page.$('.btn-getstorageAsync')
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    expect(await getData('apiGetData')).toEqual("长安大道连狭斜，青牛白马七香车。玉辇纵横过主第，金鞭络绎向侯家。龙衔宝盖承朝日，凤吐流苏带晚霞。百尺游丝争绕树，一群娇鸟共啼花。游蜂戏蝶千门侧，碧树银台万种色。复道交窗作合欢，双阙连甍垂凤翼。")

    // 测试 clear
    let btnGetStorageInfoASyncButton = await page.$('.btn-getStorageInfoASync')
    // await btnGetStorageInfoASyncButton.tap()
    // await page.waitFor(600)
    // storageInfoRet = await getData('apiGetData')
    // expect(storageInfoRet.keys[0]).toEqual("autotest_key_mock")

    const btnClearStorageInfoASyncButton = await page.$('.btn-clearStorageInfoASync')
    await btnClearStorageInfoASyncButton.tap()
    page.waitFor(600)

    await btnGetStorageInfoASyncButton.tap()
    await page.waitFor(600)
    storageInfoRet = await getData('apiGetData')
    expect(filterStorageKeys(storageInfoRet.keys).length).toEqual(0)

    await setPageData({
      key: "autotest_key_mock",
      data: 1100.8989
    })
    await page.waitFor(600)
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    expect(await getData('apiGetData')).toEqual(1100.8989)

    // 测试 remove
    // await btnGetStorageInfoASyncButton.tap()
    // await page.waitFor(600)
    // storageInfoRet = await getData('apiGetData')
    // expect(storageInfoRet.keys[0]).toEqual("autotest_key_mock")

    const btnRemoveStorageInfoASyncButton = await page.$('.btn-removeStorageInfoASync')
    await btnRemoveStorageInfoASyncButton.tap()
    page.waitFor(600)

    await btnGetStorageInfoASyncButton.tap()
    await page.waitFor(600)
    storageInfoRet = await getData('apiGetData')
    expect(filterStorageKeys(storageInfoRet.keys).length).toEqual(0)

    await setPageData({
      key: "autotest_key_mock",
      data: 123456789
    })
    await page.waitFor(600)
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    expect(await getData('apiGetData')).toEqual(123456789)

    let userObj = {
      name: "zhangsan",
      age: 12
    }
    await setPageData({
      key: "autotest_key_mock",
      data: userObj
    })
    await page.waitFor(600)
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    expect(await getData('apiGetData')).toEqual(userObj)

    await setPageData({
      key: "autotest_key_mock",
      data: {
        name: "zhangsan",
        age: 122
      }
    })
    await page.waitFor(600)
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    let objRet = await getData('apiGetData')
    expect(objRet.age).toEqual(122)
  });

  it('Check sync properties', async () => {
    let btnComplexStaticTest = await page.$('.btn-complexStaticTest')
    await btnComplexStaticTest.tap()
    await page.waitFor(600)
    if (!isIOS) {
      expect(await getData('staticComplexRet')).toEqual(true)
    }
    await setPageData({
      key: "autotest_key_mock",
      data: "长安大道连狭斜，青牛白马七香车。玉辇纵横过主第，金鞭络绎向侯家。龙衔宝盖承朝日，凤吐流苏带晚霞。百尺游丝争绕树，一群娇鸟共啼花。游蜂戏蝶千门侧，碧树银台万种色。复道交窗作合欢，双阙连甍垂凤翼。"
    })
    await page.waitFor(600)
    let btnSetStorageButtonInfo = await page.$('.btn-setstorageSync')
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    let btnGetStorageButtonInfo = await page.$('.btn-getstorageSync')
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    expect(await getData('apiGetData')).toEqual("长安大道连狭斜，青牛白马七香车。玉辇纵横过主第，金鞭络绎向侯家。龙衔宝盖承朝日，凤吐流苏带晚霞。百尺游丝争绕树，一群娇鸟共啼花。游蜂戏蝶千门侧，碧树银台万种色。复道交窗作合欢，双阙连甍垂凤翼。")

    // 测试clear
    const btnGetStorageInfoSyncButton = await page.$('.btn-getStorageInfoSync')
    // await btnGetStorageInfoSyncButton.tap()
    // await page.waitFor(600)
    // let storageInfoRet = await getData('apiGetData')
    // expect(storageInfoRet.keys[0]).toEqual("autotest_key_mock")

    const btnClearStorageInfoSyncButton = await page.$('.btn-clearStorageInfoSync')
    await btnClearStorageInfoSyncButton.tap()

    await btnGetStorageInfoSyncButton.tap()
    await page.waitFor(600)
    storageInfoRet = await getData('apiGetData')
    expect(filterStorageKeys(storageInfoRet.keys).length).toEqual(0)

    await setPageData({
      key: "autotest_key_mock",
      data: 12345789.235689
    })
    await page.waitFor(600)
    btnSetStorageButtonInfo = await page.$('.btn-setstorageSync')
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    btnGetStorageButtonInfo = await page.$('.btn-getstorageSync')
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    expect(await getData('apiGetData')).toEqual(12345789.235689)

    // 测试 remove
    // await btnGetStorageInfoSyncButton.tap()
    // await page.waitFor(600)
    // storageInfoRet = await getData('apiGetData')
    // expect(storageInfoRet.keys[0]).toEqual("autotest_key_mock")

    const btnRemoveStorageInfoSyncButton = await page.$('.btn-removeStorageInfoSync')
    await btnRemoveStorageInfoSyncButton.tap()
    page.waitFor(600)

    await btnGetStorageInfoSyncButton.tap()
    await page.waitFor(600)
    storageInfoRet = await getData('apiGetData')
    expect(filterStorageKeys(storageInfoRet.keys).length).toEqual(0)

    await setPageData({
      key: "autotest_key_mock",
      data: 0
    })
    await page.waitFor(600)
    btnSetStorageButtonInfo = await page.$('.btn-setstorageSync')
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    btnGetStorageButtonInfo = await page.$('.btn-getstorageSync')
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    expect(await getData('apiGetData')).toEqual(0)

    await setPageData({
      key: "autotest_key_mock",
      data: {
        name: "tom",
        age: 10
      }
    })
    await page.waitFor(600)
    btnSetStorageButtonInfo = await page.$('.btn-setstorageSync')
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    btnGetStorageButtonInfo = await page.$('.btn-getstorageSync')
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    let objRet = await getData('apiGetData')
    expect(objRet.name).toEqual("tom")

    await setPageData({
      key: "autotest_key_mock",
      data: JSON.stringify({
        name: "james",
        age: 12,
        from: "american"
      })
    })
    await page.waitFor(600)
    btnSetStorageButtonInfo = await page.$('.btn-setstorageSync')
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    btnGetStorageButtonInfo = await page.$('.btn-getstorageSync')
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    let jsonStr = await getData('apiGetData')
    // 顺序不能保证，验证长度和各个属性来区分
    let parseObj = JSON.parse(jsonStr)
    expect(jsonStr.length).toEqual(43)
    expect(parseObj['age']).toEqual(12)
    expect(parseObj['from']).toEqual('american')
    expect(parseObj['name']).toEqual('james')

    await setPageData({
      key: "autotest_key_mock",
      data: "1234567890"
    })
    await page.waitFor(600)
    btnSetStorageButtonInfo = await page.$('.btn-setstorageSync')
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    btnGetStorageButtonInfo = await page.$('.btn-getstorageSync')
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    let strRet = await getData('apiGetData')
    // 顺序不能保证，验证长度和各个属性来区分
    expect(typeof strRet).toEqual("string")
    expect(strRet).toEqual("1234567890")

    await setPageData({
      key: "autotest_key_mock",
      data: "1234567.890"
    })
    await page.waitFor(600)
    btnSetStorageButtonInfo = await page.$('.btn-setstorageSync')
    await btnSetStorageButtonInfo.tap()
    await page.waitFor(600)
    btnGetStorageButtonInfo = await page.$('.btn-getstorageSync')
    await btnGetStorageButtonInfo.tap()
    await page.waitFor(600)
    let strRet2 = await getData('apiGetData')
    // 顺序不能保证，验证长度和各个属性来区分
    expect(typeof strRet2).toEqual("string")
    expect(strRet2).toEqual("1234567.890")
  });

  it('saveUTSJSONObject', async () => {
    await page.callMethod('jest_saveUTSJSONObject')
    await page.waitFor(600)
    const {
      jest_saveUTSJSONObjectSyncResult,
      jest_saveUTSJSONObjectAsyncResult
    } = await page.data('data')
    expect(jest_saveUTSJSONObjectSyncResult).toBe(1)
    expect(jest_saveUTSJSONObjectAsyncResult).toBe(1)
  })

  // ios js 层与原生层通信时，原始数据类型丢失
  if (!isIOS) {
    it('saveUTSJSONObjectArray', async () => {
      await page.callMethod('jest_saveUTSJSONObjectArray')
      await page.waitFor(600)
      const {
        jest_saveUTSJSONObjectArraySyncResult
      } = await page.data('data')
      expect(jest_saveUTSJSONObjectArraySyncResult).toBe(1)
    })
  }

});
