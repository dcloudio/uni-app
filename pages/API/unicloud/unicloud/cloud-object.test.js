const PAGE_PATH = '/pages/API/unicloud/unicloud/cloud-object'

describe('unicloud-import-object', () => {
  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500)
    await page.setData({ data: { isUniTest: true } })
  })
  it('importObject', async () => {
    await page.callMethod('addTodo')
    await page.callMethod('addTodoWithGeneric')
    await page.callMethod('fail')
    await page.callMethod('failWithNumberErrCode')
    await page.callMethod('success')

    const todoTitle = await page.data('data.todoTitle')
    const todoContent = await page.data('data.todoContent')
    const returnTodoTitle = await page.data('data.returnTodoTitle')
    const returnTodoContent = await page.data('data.returnTodoContent')
    const genericDemoReturnTodoTitle = await page.data('data.genericDemoReturnTodoTitle')
    const genericDemoReturnTodoContent = await page.data('data.genericDemoReturnTodoContent')
    const failErrCode = await page.data('data.failErrCode')
    const failErrSubject = await page.data('data.failErrSubject')
    const failErrDetailTips = await page.data('data.failErrDetailTips')
    const failNumberErrCode = await page.data('data.failNumberErrCode')
    const successErrCode = await page.data('data.successErrCode')

    expect(returnTodoTitle).toBe(todoTitle)
    expect(returnTodoContent).toBe(todoContent)
    expect(genericDemoReturnTodoTitle).toBe(todoTitle)
    expect(genericDemoReturnTodoContent).toBe(todoContent)
    expect(failErrCode).toBe('TEST_ERROR_CODE')
    expect(failErrSubject).toBe('fail')
    expect(failErrDetailTips).toBe('DO_NOT_TRY_AGAIN')
    expect(failNumberErrCode).toBe(-1)
    expect(successErrCode).toBe(0)

  })
});
