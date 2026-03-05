// uni-app自动化测试教程: uni-app自动化测试教程: https://uniapp.dcloud.net.cn/worktile/auto/hbuilderx-extension/
describe('test-previewImage-multi', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isWeb = platformInfo.startsWith('web')
  const isMP = platformInfo.startsWith('mp')
  if (isWeb || isMP) {
    it('other platform', () => {
      expect(1).toBe(1)
    })
    return
  }
  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/preview-image/preview-image-multi');
    await page.waitFor(3000);
  });

  it('test-previewImage-multi-1-url-number', async () => {
    await page.setData({
      data: {
        urls: ["/static/test-image/logo.png"],
        indicatorType: "number"
      }
    })
    await page.callMethod('testPreviewImage')
    await page.waitFor(1000)
    const image = await program.screenshot({
      deviceShot: true,
    });
    expect(image).toSaveImageSnapshot()
    await page.callMethod('testClosePreviewImage')
    await page.waitFor(300)
  });
  it('test-previewImage-multi-1-url-default', async () => {
    await page.setData({
      data: {
        urls: ["/static/test-image/logo.png"],
        indicatorType: "default"
      }
    })
    await page.callMethod('testPreviewImage')
    await page.waitFor(1000)
    const image = await program.screenshot({
      deviceShot: true,
    });
    expect(image).toSaveImageSnapshot()
    await page.callMethod('testClosePreviewImage')
    await page.waitFor(300)
  });
  it('test-previewImage-multi-1-url-none', async () => {
    await page.setData({
      data: {
        urls: ["/static/test-image/logo.png"],
        indicatorType: "none"
      }
    })
    await page.callMethod('testPreviewImage')
    await page.waitFor(1000)
    const image = await program.screenshot({
      deviceShot: true,
    });
    expect(image).toSaveImageSnapshot()
    await page.callMethod('testClosePreviewImage')
    await page.waitFor(300)
  });
  // 3图
  it('test-previewImage-multi-3-url-number', async () => {
    await page.setData({
      data: {
        urls: ["/static/test-image/logo.png", "/static/compass.png", "/static/test-image/logo.png"],
        indicatorType: "number"
      }
    })
    await page.callMethod('testPreviewImage')
    await page.waitFor(1000)
    const image = await program.screenshot({
      deviceShot: true,
    });
    expect(image).toSaveImageSnapshot()
    await page.callMethod('testClosePreviewImage')
    await page.waitFor(300)
  });
  it('test-previewImage-multi-3-url-default', async () => {
    await page.setData({
      data: {
        urls: ["/static/test-image/logo.png", "/static/compass.png", "/static/test-image/logo.png"],
        indicatorType: "default"
      }
    })
    await page.callMethod('testPreviewImage')
    await page.waitFor(1000)
    const image = await program.screenshot({
      deviceShot: true,
    });
    expect(image).toSaveImageSnapshot()
    await page.callMethod('testClosePreviewImage')
    await page.waitFor(300)
  });
  it('test-previewImage-multi-3-url-none', async () => {
    await page.setData({
      data: {
        urls: ["/static/test-image/logo.png", "/static/compass.png", "/static/test-image/logo.png"],
        indicatorType: "none",
      }
    })
    await page.callMethod('testPreviewImage')
    await page.waitFor(1000)
    const image = await program.screenshot({
      deviceShot: true,
    });
    expect(image).toSaveImageSnapshot()
    await page.callMethod('testClosePreviewImage')
    await page.waitFor(300)
  });

  // 20 图
  it('test-previewImage-multi-20-url-number', async () => {
    await page.setData({
      data: {
        urls: ["/static/test-image/logo.png", "/static/compass.png", "/static/test-image/logo.png",
          "/static/compass.png", "/static/test-image/logo.png", "/static/compass.png",
          "/static/test-image/logo.png", "/static/compass.png", "/static/test-image/logo.png",
          "/static/compass.png", "/static/test-image/logo.png", "/static/compass.png",
          "/static/test-image/logo.png", "/static/compass.png", "/static/test-image/logo.png",
          "/static/compass.png", "/static/test-image/logo.png", "/static/compass.png",
          "/static/test-image/logo.png", "/static/compass.png"
        ],
        indicatorType: "number"
      }
    })
    await page.callMethod('testPreviewImage')
    await page.waitFor(1000)
    const image = await program.screenshot({
      deviceShot: true,
    });
    expect(image).toSaveImageSnapshot()
    await page.callMethod('testClosePreviewImage')
    await page.waitFor(300)
  });
  it('test-previewImage-multi-20-url-default', async () => {
    await page.setData({
      data: {
        urls: ["/static/test-image/logo.png", "/static/compass.png", "/static/test-image/logo.png",
          "/static/compass.png", "/static/test-image/logo.png", "/static/compass.png",
          "/static/test-image/logo.png", "/static/compass.png", "/static/test-image/logo.png",
          "/static/compass.png", "/static/test-image/logo.png", "/static/compass.png",
          "/static/test-image/logo.png", "/static/compass.png", "/static/test-image/logo.png",
          "/static/compass.png", "/static/test-image/logo.png", "/static/compass.png",
          "/static/test-image/logo.png", "/static/compass.png"
        ],
        indicatorType: "default"
      }
    })
    await page.callMethod('testPreviewImage')
    await page.waitFor(1000)
    const image = await program.screenshot({
      deviceShot: true,
    });
    expect(image).toSaveImageSnapshot()
    await page.callMethod('testClosePreviewImage')
    await page.waitFor(300)
  });
  it('test-previewImage-multi-20-url-none', async () => {
    await page.setData({
      data: {
        urls: ["/static/test-image/logo.png", "/static/compass.png", "/static/test-image/logo.png",
          "/static/compass.png", "/static/test-image/logo.png", "/static/compass.png",
          "/static/test-image/logo.png", "/static/compass.png", "/static/test-image/logo.png",
          "/static/compass.png", "/static/test-image/logo.png", "/static/compass.png",
          "/static/test-image/logo.png", "/static/compass.png", "/static/test-image/logo.png",
          "/static/compass.png", "/static/test-image/logo.png", "/static/compass.png",
          "/static/test-image/logo.png", "/static/compass.png"
        ],
        indicatorType: "none"
      }
    })
    await page.callMethod('testPreviewImage')
    await page.waitFor(1000)
    const image = await program.screenshot({
      deviceShot: true,
    });
    expect(image).toSaveImageSnapshot()
    await page.callMethod('testClosePreviewImage')
    await page.waitFor(300)
  });
});
