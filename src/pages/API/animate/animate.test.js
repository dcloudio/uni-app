const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isIOS || isAndroid || isHarmony
const isMP = platformInfo.startsWith('mp')
const isVapor = process.env.UNI_APP_X_DOM2 === "true"

describe('test title', () => {
  if (!(isApp || isMP)) {
    it('not supported skip', async () => {
      expect(1).toBe(1)
    })
    return
  }
  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/animate/animate');
    await page.waitFor('view');
  });

  if (isApp) {
    it('run animate and take Snapshot', async () => {
      var renameFile = await page.$('#widthProperty')
      await renameFile.tap()
      renameFile = await page.$('#height1')
      await renameFile.tap()
      renameFile = await page.$('#marginProperty')
      await renameFile.tap()
      renameFile = await page.$('#paddingProperty')
      await renameFile.tap()
      renameFile = await page.$('#borderProperty')
      await renameFile.tap()
      renameFile = await page.$('#transformProperty')
      await renameFile.tap()
      renameFile = await page.$('#positionProperty')
      await renameFile.tap()
      renameFile = await page.$('#backgroundAndWidthProperty')
      await renameFile.tap()
      renameFile = await page.$('#oneProperty1')
      await renameFile.tap()
      renameFile = await page.$('#oneProperty2')
      await renameFile.tap()
      renameFile = await page.$('#backgroundAndMarginLeftProperty')
      await renameFile.tap()
      renameFile = await page.$('#backgroundAndTransformProperty')
      await renameFile.tap()
      renameFile = await page.$('#backgroundProperty')
      await renameFile.tap()
      renameFile = await page.$('#opacityProperty')
      await renameFile.tap()
      renameFile = await page.$('#borderColorMarginLeftProperty')
      await renameFile.tap()
      await page.waitFor(3000);
      const image = await program.screenshot({
        fullPage: true
      })
      expect(image).toSaveImageSnapshot();
    });
  }

  if (isApp && !(isHarmony && !isVapor)) {
    it('finish event', async () => {
      await page.callMethod('startAnimate');
      await page.waitFor(5100);
      var testTriggerFinishEvent = await page.data('data.testTriggerFinishEvent')
      expect(testTriggerFinishEvent).toEqual(true)
    });
  }

  if (!(isHarmony && !isVapor) || isMP) {
    it('cancel event', async () => {
      await page.callMethod('startAnimate');
      await page.waitFor(1100);
      await page.callMethod('cancelAnimate');
      await page.waitFor(300);
      var testTriggerCancelEvent = await page.data('data.testTriggerCancelEvent')
      expect(testTriggerCancelEvent).toEqual(true)
    });
  }

  if (isApp && !(isHarmony && !isVapor)) {
    it('cancel restores initial style', async () => {
      const initialRect = await page.callMethod('getMainViewRectForTest')
      expect(initialRect).not.toBeNull()

      await page.callMethod('startAnimate')
      await page.waitFor(1100)
      const animatingRect = await page.callMethod('getMainViewRectForTest')
      expect(animatingRect).not.toBeNull()
      expect(animatingRect.width).toBeLessThan(initialRect.width - 10)
      expect(animatingRect.height).toBeLessThan(initialRect.height - 10)

      await page.callMethod('cancelAnimate')
      await page.waitFor(300)
      const canceledRect = await page.callMethod('getMainViewRectForTest')
      expect(canceledRect).not.toBeNull()
      expect(canceledRect.width).toBeCloseTo(initialRect.width, 0)
      expect(canceledRect.height).toBeCloseTo(initialRect.height, 0)
    })
  }
});
