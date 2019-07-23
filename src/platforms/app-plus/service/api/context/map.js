import {
  invoke
} from '../../bridge'

export function getMapCenterLocation ({
  mapId
} = {}, callbackId) {
  const nativeMap = plus.maps.getMapById(mapId + '')
  if (nativeMap) {
    nativeMap.getCurrentCenter((state, {
      latitude,
      longitude
    } = {}) => {
      if (state === 0) {
        invoke(callbackId, {
          latitude,
          longitude,
          errMsg: 'getMapCenterLocation:ok'
        })
      } else {
        invoke(callbackId, {
          errMsg: 'getMapCenterLocation:fail:state[' + state + ']'
        })
      }
    })
  } else {
    return {
      errMsg: 'getMapCenterLocation:fail:地图[' + mapId + ']不存在'
    }
  }
}

export function moveToMapLocation ({
  mapId
} = {}) {
  const nativeMap = plus.maps.getMapById(mapId + '')
  if (nativeMap) {
    nativeMap.getUserLocation((state, {
      latitude,
      longitude
    } = {}) => {
      if (state === 0) {
        nativeMap.setCenter(new plus.maps.Point(longitude, latitude))
      }
    })
  }
  return {
    errMsg: 'moveToMapLocation:ok'
  }
}

export function getMapScale ({
  mapId
} = {}) {
  const nativeMap = plus.maps.getMapById(mapId + '')
  if (nativeMap) {
    return {
      scale: nativeMap.getZoom(),
      errMsg: 'getMapScale:ok'
    }
  }
  return {
    errMsg: 'getMapScale:fail:地图[' + mapId + ']不存在'
  }
}

export function getMapRegion ({
  mapId
} = {}) {
  const nativeMap = plus.maps.getMapById(mapId + '')
  if (nativeMap) {
    const bounds = nativeMap.getBounds()
    const northeast = bounds.getNorthEase()
    const southwest = bounds.getSouthWest()
    return {
      northeast: {
        latitude: northeast.getLat(),
        longitude: northeast.getLng()
      },
      southwest: {
        latitude: southwest.getLat(),
        longitude: southwest.getLng()
      },
      errMsg: 'getMapRegion:ok'
    }
  }
  return {
    errMsg: 'getMapRegion:fail:地图[' + mapId + ']不存在'
  }
}
