// 定义类型默认值映射，与页面保持一致
const valueTypeDefaultMap = new Map([
  ['String', 'hello'],
  ['Number', '1'],
  ['Boolean', 'true'],
  ['Object', '{"name": "张三","age": 12}'],
  ['Array', '[1, "hello", true, { "key": "value" }]']
])
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isIos = platformInfo.startsWith('ios')
const isDom2 = process.env.UNI_APP_X_DOM2 === "true"

describe('Storage管理器页面-多类型新增', () => {
  if (isIos) {
  	it('skip not support', () => {
  		expect(1).toBe(1)
  	})
  	return
  }
  if (isDom2) {
  	it('dom2 暂不支持 .input api', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  let page
  beforeAll(async () => {
    page = await program.navigateTo('/pages/API/storage/storagemanage')
    // 开启测试模式，跳过确认弹窗
    await page.callMethod('setTestMode', true)
    await page.waitFor(500)
    const list = await page.callMethod('getStorageList')
    // 点击清空按钮
    if (list.length) {
      const clearBtn = await page.$('.btn-clear')
      await clearBtn.tap()
      await page.waitFor(300)
    }
  })
  afterAll(async () => {
    // 关闭测试模式
    await page.callMethod('setTestMode', false)
  })

  it('1. 新增String类型', async () => {
    // 点击新建按钮
    const createBtn = await page.$('.btn-create')
    await createBtn.tap()
    await page.waitFor(300)
    // 获取弹窗元素
    const mask = await page.$('.dialog-mask')
    const keyInput = await mask.$('.edit-input')
    const valueTextarea = await mask.$('.edit-textarea')
    const saveBtn = await mask.$('.btn-save')
    // 输入内容
    await keyInput.input('test_string')
    await valueTextarea.input('hello world')
    await saveBtn.tap()
    await page.waitFor(300)
    // 验证新增成功
    const list = await page.callMethod('getStorageList')
    expect(list.length).toBe(1)
    if (!isMP) {
      expect(list[0].key).toBe('test_string')
      expect(list[0].value).toBe('hello world')
    }
  })

  it('2. 编辑String类型', async () => {
    // 点击编辑按钮
    const editBtn = await page.$('.btn-edit')
    await editBtn.tap()
    await page.waitFor(300)
    // 获取弹窗元素
    const mask = await page.$('.dialog-mask')
    const keyInput = await mask.$('.edit-input')
    const valueTextarea = await mask.$('.edit-textarea')
    const saveBtn = await mask.$('.btn-save')
    // 修改内容
    await keyInput.input('test_string_edited')
    await valueTextarea.input('hello world edited')
    await saveBtn.tap()
    await page.waitFor(300)
    // 验证修改成功
    const list = await page.callMethod('getStorageList')
    // 微信小程序端，基础库3.5.8以上版本，获取 value是[object HTMLElement] 暂时跳过
    if (!isMP) {
      expect(list[0].key).toBe('test_string_edited')
      expect(list[0].value).toBe('hello world edited')
    }
  })

  it('3. 删除String类型', async () => {
    // 获取list-view的所有项，并选择第一个
    const listView = await page.$('.list-view')
    const listItems = await listView.$$('list-item')
    await listItems[0].tap()
    await page.waitFor(300)
    // 点击删除按钮
    const deleteBtn = await page.$('.btn-delete')
    await deleteBtn.tap()
    await page.waitFor(300)
    // 验证删除成功
    const list = await page.callMethod('getStorageList')
    expect(list.length).toBe(0)
  })

  it('4. 测试切换类型自动填充默认值', async () => {
    // 点击新建按钮
    const createBtn = await page.$('.btn-create')
    await createBtn.tap()
    await page.waitFor(300)
    // 获取弹窗元素
    const mask = await page.$('.dialog-mask')
    const typeItems = await mask.$$('.edit-type-radio')
    // 测试每种类型
    for (let i = 0; i < typeItems.length; i++) {
      await typeItems[i].tap()
      await page.waitFor(200)
      // 验证默认值是否正确
      const editValue = await page.data('editValue')
      const editValueType = await page.data('editValueType')
      if (isWeb && editValueType._value != 'String') {
        // 获取 ref 的 value 属性
        expect(editValue._value).toBe(valueTypeDefaultMap.get(editValueType._value))
      }
    }
    // 关闭弹窗
    const cancelBtn = await mask.$('.btn-cancel')
    await cancelBtn.tap()
    await page.waitFor(300)
  })

  it('5. 新增所有类型', async () => {
    const types = ['String', 'Number', 'Boolean', 'Object', 'Array']
    for (const type of types) {
      // 点击新建按钮
      const createBtn = await page.$('.btn-create')
      await createBtn.tap()
      await page.waitFor(300)
      // 获取弹窗元素
      const mask = await page.$('.dialog-mask')
      const keyInput = await mask.$('.edit-input')
      const valueTextarea = await mask.$('.edit-textarea')
      const saveBtn = await mask.$('.btn-save')
      const typeRadios = await mask.$$('.edit-type-radio')
      // 选择类型
      const typeIndex = types.indexOf(type)
      await typeRadios[typeIndex].tap()
      await page.waitFor(100)
      // 输入内容
      await keyInput.input(`test_${type.toLowerCase()}`)
      await valueTextarea.input(valueTypeDefaultMap.get(type))
      await saveBtn.tap()
      await page.waitFor(300)
    }
    // 验证所有类型都添加成功
    const list = await page.callMethod('getStorageList')
    if (!isMP) {
      expect(list.length).toBe(types.length)
    }
  })

  it('6. 清空所有存储项', async () => {
    // 点击清空按钮
    const clearBtn = await page.$('.btn-clear')
    await clearBtn.tap()
    await page.waitFor(300)
    // 验证清空成功
    const list = await page.callMethod('getStorageList')
    expect(list.length).toBe(0)
  })
})
