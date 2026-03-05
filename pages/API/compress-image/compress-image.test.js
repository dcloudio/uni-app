const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')

describe('API-compressImage', () => {
  if (isWeb || isIOS || isMP) {
    it('pass', async () => {
      expect(1).toBe(1);
    });
    return;
  }

  it('test compressImage', async () => {
    const page = await program.reLaunch('/pages/API/compress-image/compress-image');
    await page.waitFor('view');
    await page.setData({
      data:{compressedWidth: 100}
    })
    await page.callMethod('testCompressImage');
    await page.waitFor(1000);
    expect(await page.data('data.imageInfoForTest')).toEqual({
      width: 100,
      height: 100,
      isSizeReduce: true
    });
  });
});
