const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe('component-native-list-view', () => {
  if (isMP) {
  	it('skip mp', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  let page
  beforeAll(async () => {
    //打开list-view-multiplex测试页
    page = await program.reLaunch('/pages/component/list-view/list-view-multiplex')
    await page.waitFor('list-view')
  })

  //滚动list-view到底部 加载更多 如果异常则直接闪退
  it('check_list_item_multiplex', async () => {
    await page.callMethod('listViewScrollByY', 5000)
    await page.waitFor(400)
    await page.callMethod('listViewScrollByY', 100)
  })

  //检测延迟显示listv-view后list-item是否正常显示
  it('check_list_item_v_show', async () => {
    await page.callMethod('delayShow')
    await page.waitFor(async () => {
      return await page.data('data.list_show') === true;
    });
    await page.waitFor(1000)
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  })

  //检测修改item子元素后，item是否正常调整高度
  it('check_switch_item_content', async () => {
    await page.callMethod('switchItemContent')
    await page.waitFor(async () => {
      return await page.data('data.displayArrow') === true;
    });
    await page.waitFor(600)
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  })
})
