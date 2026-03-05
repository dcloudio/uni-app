describe('/pages/CSS/overflow/overflow-visible-event.uvue', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isAndroid = platformInfo.startsWith('android')
  const isIos = platformInfo.startsWith('ios')
  if(isIos && platformInfo.indexOf('12.4') != -1){
    // TODO: 排查 ios 不兼容版本 测试异常原因
    it('ios 12.4 测试异常', () => {
      expect(1).toBe(1)
    })
    return
  }

  if (!(isIos || isAndroid)) {
    it('dummyTest', async () => {
      expect(1).toBe(1)
    })
    return
  }

	let page;
  let res;
	beforeAll(async () => {
	  page = await program.reLaunch('/pages/CSS/overflow/overflow-visible-event')
	  await page.waitFor(600);
	})
  beforeEach(async () => {
    await page.setData({
      data:{
        jest_result: false,
        jest_click_x: -1,
        jest_click_y: -1
			}
    })
  });

  it('Check Overflow Visible Part Click', async () => {
    res = await page.callMethod('jest_getRect')
    const point_x = await page.data('data.jest_click_x');
    const point_y = await page.data('data.jest_click_y');
    if (isAndroid){
      await program.adbCommand("input tap" + " " + point_x + " " + point_y)
    } else {
      await program.tap({x: point_x, y: point_y})
    }
    await page.waitFor(500);
    res = await page.data('data.jest_result');
    expect(res).toBe(true)
  });

  // 此测试针对开发者使用 translate 移动view
  it('Check Overflow Visible Part Use translate Drag', async ()=> {
    await page.callMethod('jest_getRect')
    const point_x = await page.data('data.jest_click_x');
    const point_y = await page.data('data.jest_click_y');
    const distance = 100;
    const destY = point_y + 100
    const duration = 1000
    if (isAndroid) {
      await program.adbCommand("input swipe" + " " + point_x + " " + point_y + " " + point_x + " " + destY + " " + duration)
    } else {
      await program.swipe({
            startPoint: {
              x: point_x,
              y: point_y
            },
            endPoint: {
              x: point_x,
              y: destY
            },
            duration: duration
          })
    }
    await page.waitFor(1500);
    await page.callMethod('jest_getParentRect')
    const currentParentTop = await page.data('data.jest_parent_top');
    const offset = 4
    const diff = Math.abs(currentParentTop - distance) < offset
    console.log("current ", currentParentTop);
    console.log("diff", diff);
    expect(diff).toBe(true)
  })

  it('Check Overflow Visible Block View Click', async () => {
    await page.callMethod('jest_getAbsoluteViewRect')
    const point_x = await page.data('data.jest_click_x');
    const point_y = await page.data('data.jest_click_y');
    console.log("input tap" + " " + point_x + " " + point_y);
    if (isAndroid) {
      await program.adbCommand("input tap" + " " + point_x + " " + point_y)
    } else {
      await program.tap({x: point_x, y: point_y})
    }
    await page.waitFor(500);
    res = await page.data('data.jest_result');
    expect(res).toBe(true)
  })

  it('Check Overflow Visible Deep Level Click', async () => {
    await page.callMethod('jest_scrollToDeepOverflow')
    await page.waitFor(500);
    const point_x = await page.data('data.jest_click_x');
    const point_y = await page.data('data.jest_click_y');
    console.log("input tap" + " " + point_x + " " + point_y);
    if (isAndroid) {
      await program.adbCommand("input tap" + " " + point_x + " " + point_y)
    } else {
      await program.tap({x: point_x, y: point_y})
    }
    await page.waitFor(500);
    res = await page.data('data.jest_result');
    expect(res).toBe(true)
    await page.callMethod('jest_restScorllView')
    await page.waitFor(500);
  })

  it('Check Overflow Visible Z-Index Click', async () => {
    await page.callMethod('jest_scrollToZIndexOverflow')
    await page.waitFor(500);
    const point_x = await page.data('data.jest_click_x');
    const point_y = await page.data('data.jest_click_y');
    console.log("input tap" + " " + point_x + " " + point_y);
    if (isAndroid) {
      await program.adbCommand("input tap" + " " + point_x + " " + point_y)
    } else {
      await program.tap({x: point_x, y: point_y})
    }
    await page.waitFor(500);
    res = await page.data('data.jest_result');
    expect(res).toBe(true)
    await page.callMethod('jest_restScorllView')
    await page.waitFor(500);
  })
});
