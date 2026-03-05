jest.setTimeout(50000);

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony

let page;
describe('web-map', () => {
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/map/map')
    await page.waitFor('view');
    if(!isIos && !isHarmony){
      await page.waitFor('map');
    }
    // 等待地图加载完成
    const waitTime = process.env.uniTestPlatformInfo.includes('firefox') ? 5000:4000
    await page.waitFor(waitTime)
    await page.callMethod('updateAutoTest',true)
  });


  if (isApp) {
    it('handleMoveToLocation', async () => {
      await page.callMethod('handleMoveToLocation',false)
      await page.waitFor(500);
      const moveToLocationRes = await page.data('jestResult')
      expect(moveToLocationRes.moveToLocationMsg).toBe("moveToLocation:ok");
    });

    it('Check EventDetail JsonStringify', async () => {
      const res = await page.data('jestResult')
      expect(res.eventDetailJsonStringify).not.toBe("{}");
    })
    return
  }

  it('Check MapMethods', async () => {
    const mapMethods = ['addControls', 'addMarkers', 'addMarkersLabel','removeMarker','addPolyline','removePolyline', 'addPolygons','removePolygon', 'addCircles','removeCircle','includePoint']
    for (var i = 0; i < mapMethods.length; i++) {
      await page.callMethod(mapMethods[i])
      await page.waitFor(2000);
      expect(await program.screenshot()).toSaveImageSnapshot({customSnapshotIdentifier() {
        return 'map-' + mapMethods[i]
      }});
      await page.waitFor(1000);
    }
  });

  it('handleGetCenterLocation', async () => {
    await page.callMethod('handleGetCenterLocation')
    await page.waitFor(500);
    const centerLocationRes = await page.data('jestResult')
    expect(centerLocationRes.centerPoints.latitude).not.toBeNull();
    expect(centerLocationRes.centerPoints.longitude).not.toBeNull();
  });

  it('handleGetRegion', async () => {
    await page.callMethod('handleGetRegion')
    await page.waitFor(500);
    const regionRes = await page.data('jestResult')
    const {southwest,northeast} = regionRes;
    expect(southwest.latitude).not.toBeFalsy();
    expect(southwest.longitude).not.toBeFalsy();
    expect(northeast.latitude).not.toBeFalsy();
    expect(northeast.longitude).not.toBeFalsy();
  });

  it('handleTranslateMarker', async () => {
    await page.callMethod('handleTranslateMarker')
    await page.waitFor(3000);
    expect(await program.screenshot()).toSaveImageSnapshot({customSnapshotIdentifier() {
      return 'map-handleTranslateMarker'
    }});
    const translateMarkerRes = await page.data('jestResult')
    expect(translateMarkerRes.animationEnd).toBeTruthy();
    if (!isMP && !isWeb) {
      expect(translateMarkerRes.translateMarkerMsg).toBe('translateMarker:ok');
    }
  });

  it('handleGetScale', async () => {
    await page.callMethod('handleGetScale')
    await page.waitFor(500);
    const scaleRes = await page.data('jestResult')
    expect(scaleRes.scale).toBeGreaterThanOrEqual(5);
    expect(scaleRes.scale).toBeLessThanOrEqual(18);
  });
});
