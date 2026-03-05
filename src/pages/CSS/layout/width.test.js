const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isHarmony = platformInfo.startsWith('harmony')
const isDom2 = process.env.UNI_APP_X_DOM2 === "true"
describe('/pages/CSS/layout/width.uvue', () => {
  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/CSS/layout/width');
    await page.waitFor('view');
  });

  it('test nest components width', async () => {
    if(isWeb){
      const element = await page.$('.child_box');
      const size = await element.size()
      expect(size.width).toBe(150)
      expect(size.height).toBe(100)
    }
  })

  it('test width height', async () => {
    const emptyValues = await page.data('emptyElementValues')
    if(isDom2 && isHarmony){
      expect(emptyValues).toMatchObject({
        emptyViewWidth: 'auto',
        emptyViewHeight: 'auto',
        emptyTextWidth: 'auto',
        emptyTextHeight: 'auto',
        emptyImageWidth: '320px',
        emptyImageHeight: '240px',
        emptyScrollViewWidth: 'auto',
        emptyScrollViewHeight: 'auto',
        emptyNativeViewWidth: 'auto',
        emptyNativeViewHeight: 'auto'
      })
    }else{
      expect(emptyValues).toMatchObject({
        emptyViewWidth: '',
        emptyViewHeight: '',
        emptyTextWidth: '',
        emptyTextHeight: '',
        emptyImageWidth: '',
        emptyImageHeight: '',
        emptyScrollViewWidth: '',
        emptyScrollViewHeight: '',
        emptyNativeViewWidth: '',
        emptyNativeViewHeight: ''
      })
    }
  })

});
