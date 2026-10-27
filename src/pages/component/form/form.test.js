const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isHarmony = platformInfo.startsWith('harmony')
const isMP = platformInfo.startsWith('mp')

const PAGE_PATH = '/pages/component/form/form'

const DEFAULT_NICK_NAME = ''
const DEFAULT_GENDER = '0'
const DEFAULT_LOVES = ['0']
const DEFAULT_AGE = 18
const DEFAULT_SWITCH = true
const DEFAULT_COMMENT = ''

const CHANGE_NICK_NAME = 'hello'
const CHANGE_GENDER = '1'
const CHANGE_LOVES = ['0', '1']
const CHANGE_AGE = 50
const CHANGE_SWITCH = false
const CHANGE_COMMENT = '备注'

const SCREENSHOT_DATE = '2024-01-02'
const SCREENSHOT_START_DATE = '2014-01-02'
const SCREENSHOT_END_DATE = '2034-01-02'
const SCREENSHOT_TIME_PICKER = '12:01'
const SCREENSHOT_PICKER_VIEW_TIME = [11, 0]

describe('form', () => {
  if (isMP) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  beforeEach(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
  })

  it('screenshot', async () => {
    await setScreenshotData(page)
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  })
  it('submit', async () => {
    await changeData(page)

    const btnSubmit = await page.$('.btn-submit')
    await btnSubmit.tap()
    await page.waitFor(200)

    const {
      time,
      formData,
      testVerifySubmit
    } = await page.data('data')

    expect(formData['nickname']).toBe(CHANGE_NICK_NAME)
    expect(formData['gender']).toBe(CHANGE_GENDER)
    expect(formData['loves'][0]).toBe(CHANGE_LOVES[0])
    expect(formData['loves'][1]).toBe(CHANGE_LOVES[1])
    expect(formData['age']).toBe(CHANGE_AGE)
    expect(formData['switch']).toBe(CHANGE_SWITCH)
    expect(formData['comment']).toBe(CHANGE_COMMENT)
    // 仅微信 和 鸿蒙支持 picker-view 表单
    if (isMP || isHarmony) {
      expect(formData['time'][0]).toBe(time[0])
      expect(formData['time'][1]).toBe(time[1])
    }
    if(!isMP) {
      expect(testVerifySubmit).toBe(true)
    }
  })
  if(isMP) {
    // 微信小程序reset和app、web表现不一致。暂时屏蔽reset测试例，后续如果拉齐再放开
    return
  }
  it('reset', async () => {
    await changeData(page)

    const btnReset = await page.$('.btn-reset')
    await btnReset.tap()
    await page.waitFor(100)

    const btnSubmit = await page.$('.btn-submit')
    await btnSubmit.tap()
    await page.waitFor(100)

    const {
      time,
      formData,
      testVerifyReset
    } = await page.data('data')

    expect(formData['nickname']).toBe(DEFAULT_NICK_NAME)
    expect(formData['gender']).toBe(DEFAULT_GENDER)
    expect(formData['loves'][0]).toBe(DEFAULT_LOVES[0])
    expect(formData['age']).toBe(DEFAULT_AGE)
    expect(formData['switch']).toBe(DEFAULT_SWITCH)
    expect(formData['comment']).toBe(DEFAULT_COMMENT)
    if (isMP || isHarmony) {
      expect(formData['time'][0]).toBe(time[0])
      expect(formData['time'][1]).toBe(time[1])
    }
    expect(testVerifyReset).toBe(true)
  })
})

async function setScreenshotData(page) {
  await page.setData({
    data: {
      datePickerValue: SCREENSHOT_DATE,
      startDate: SCREENSHOT_START_DATE,
      endDate: SCREENSHOT_END_DATE,
      timePickerValue: SCREENSHOT_TIME_PICKER,
      time: SCREENSHOT_PICKER_VIEW_TIME
    }
  })
  await page.waitFor(100)
}

async function changeData(page) {
  await page.setData({
    data:{
      nickname: CHANGE_NICK_NAME,
      gender: CHANGE_GENDER,
      loves: CHANGE_LOVES,
      age: CHANGE_AGE,
      switch: CHANGE_SWITCH,
      comment:CHANGE_COMMENT
    }
  })
  await page.waitFor(100)
}
