const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')

describe('preview-image', () => {
  let page;

  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/preview-image/preview-image');
    await page.waitFor('view');
    await page.waitFor(isWeb ? 4000 : 100);
  });

  if (isWeb || isMP) {
    it('screenshot', async () => {
      const image = await program.screenshot({
        fullPage: true
      });
      expect(image).toSaveImageSnapshot()
    });
  } else {
    it('previewImage_default', async () => {
      await page.callMethod('previewImage')
      await page.waitFor(1000)
      const image = await program.screenshot({
        deviceShot: true,
      });
      expect(image).toSaveImageSnapshot()
      await page.callMethod('closePreviewImage')
      await page.waitFor(300)
    })
    it('previewImage_number', async () => {
      await page.callMethod('testSetCurrentIndicator','number')
      await page.waitFor(300)
      await page.callMethod('previewImage')
      await page.waitFor(3000)
      const image = await program.screenshot({
        deviceShot: true,
      });
      expect(image).toSaveImageSnapshot()
      await page.callMethod('closePreviewImage')
      await page.waitFor(300)
    })
    it('previewImage_none', async () => {
      await page.callMethod('testSetCurrentIndicator','none')
      await page.waitFor(300)
      await page.callMethod('previewImage')
      await page.waitFor(3000)
      const image = await program.screenshot({
        deviceShot: true,
      });
      expect(image).toSaveImageSnapshot()
      await page.callMethod('closePreviewImage')
      await page.waitFor(300)
    })
  }
});
