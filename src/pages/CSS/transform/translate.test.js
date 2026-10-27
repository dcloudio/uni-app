const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe('/pages/CSS/transform/translate.uvue', () => {
  if (isMP) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

	let page;
	beforeAll(async () => {
	  page = await program.reLaunch('/pages/CSS/transform/translate')
	  await page.waitFor(1000);
	});

	it("snap translate", async () => {
	  const image = await program.screenshot({
	    fullPage: true
	  })
	  expect(image).toSaveImageSnapshot()
	})
});
