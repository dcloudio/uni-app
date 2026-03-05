// @Author-APP-ANDROID:DCloud_Android_DQQ
jest.setTimeout(30000);
describe('test swiper', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isMP = platformInfo.startsWith('mp')
  const isWeb = platformInfo.startsWith('web')
  const isHarmony = platformInfo.startsWith('harmony')
  const isDom2 = process.env.UNI_APP_X_DOM2 === "true"

  let page;
  const detailResWithCurrentItemId = {
    current: 1,
    currentItemId: 'B',//web端多了currentItemId
    source: 'autoplay' ,
  }
  const detailRes = {
    current: 1,
    source: 'autoplay' ,
  }
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/swiper/swiper')
    await page.waitFor('view')
  })

  if(!isMP) {
    it('check autoplay loop', async () => {
      await page.setData({
        data:{
          currentValChange: 0,
          autoplaySelect: true,
        }
      })
      const swiperChangeInterval = (isHarmony && !isDom2) ? 2700 : 2500
      await page.waitFor(swiperChangeInterval)
      expect(await page.data('data.currentValChange')).toEqual(1)
      await page.waitFor(swiperChangeInterval)
      expect(await page.data('data.currentValChange')).toEqual(2)
      await page.waitFor(swiperChangeInterval)
      expect(await page.data('data.currentValChange')).toEqual(0)

      await page.setData({
        data:{autoplaySelect: false}
      })
      await page.waitFor(300)
    });
  }

  it('check current', async () => {
    if(isMP) {
      // 微信小程序表现较为怪异，interval显式的设置非0的情况下，会无视autoplay属性。interval默认值5000
      await page.setData({
        data:{intervalSelect: 0,}
      })
    }
    await page.setData({
      data:{currentVal: 2,}
    })
    await page.waitFor(600)
    expect(await page.data('data.currentValChange')).toEqual(2)
    await page.setData({
      data:{currentVal: 0,}
    })
    await page.waitFor(600)
    expect(await page.data('data.currentValChange')).toEqual(0)

    if(isMP) {
      await page.setData({
        data:{intervalSelect: 2000,}
      })
    }
  });

  if (!isDom2) {
  it('check currentId', async () => {
    await page.setData({
      data:{currentItemIdVal: 'C',}
    })
    await page.waitFor(800)
    expect(await page.data('data.currentValChange')).toEqual(2)

    await page.setData({
      data:{currentItemIdVal: 'A',}
    })
    await page.waitFor(800)
    expect(await page.data('data.currentValChange')).toEqual(0)
  });
  }

  it('Trigger Event', async () => {
    await page.setData({
      data:{
        swiperChangeSelect: true,
        swiperTransitionSelect: true,
        swiperAnimationfinishSelect: true,
        autoplaySelect:true,
      }
    })
    await page.waitFor(2000)
    await page.waitFor(async()=>{
      return await page.data('data.currentValChange') == 1
    })
    await page.setData({
      data:{autoplaySelect:false}
    })
  });

  it('Event transition', async () => {
    await page.waitFor(100)
    const transitionDetailInfo = await page.data('data.transitionDetailTest')
    expect(transitionDetailInfo.dy).toBe(0)
    expect(transitionDetailInfo.dx).not.toBe(0)
    expect(await page.data('data.isTransitionTest')).toBe('transition:Success')
  });

  it('Event change', async () => {
    const changeDetailInfo = await page.data('data.changeDetailTest')
    if(isWeb || isMP || isHarmony){
      expect(changeDetailInfo).toEqual(detailResWithCurrentItemId)
    }else{
      expect(changeDetailInfo).toEqual(detailRes)
    }
    expect(await page.data('data.isChangeTest')).toBe('change:Success')
  });

  it('Event animationfinish', async () => {
    // 等待最后一个动画结束animationfinish
    await page.waitFor(2000)
    const animationfinishDetailInfo = await page.data('data.animationfinishDetailTest')
    if(isWeb || isMP || isHarmony){
      expect(animationfinishDetailInfo).toEqual(detailResWithCurrentItemId)
    }else{
      expect(animationfinishDetailInfo).toEqual(detailRes)
    }
    expect(await page.data('data.isAnimationfinishTest')).toBe('animationfinish:Success')
  });
});
