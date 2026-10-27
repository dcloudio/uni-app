const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.startsWith('android');

async function screenshot(name) {
  const image = await program.screenshot({
    fullPage: true
  })
  expect(image).toSaveImageSnapshot({
    customSnapshotIdentifier() {
      return name
    }
  })
}

describe("rich-text-tags", () => {
  if (isMP) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page;
  it("screenshot", async () => {
    page = await program.reLaunch('/pages/component/rich-text/rich-text-tags');
    await page.waitFor('view');
    await page.waitFor(4000)
    await screenshot('rich-text-tags-web')
  })

  if (isAndroid) {
    it("test attr mode", async () => {
      await page.setData({
        modeData: {
          mode: 'native'
        }
      });
      await page.waitFor(1000);
    await screenshot('rich-text-tags-native')
    });
  }
});
