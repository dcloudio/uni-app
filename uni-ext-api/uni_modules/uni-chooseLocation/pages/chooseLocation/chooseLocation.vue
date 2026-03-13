<template>
  <view class="uni-choose-location" :class="darkClassCom">
    <view class="uni-choose-location-map-box" :class="[landscapeClassCom]" :style="mapBoxStyleCom">
      <map class="uni-choose-location-map" :id="mapId" :latitude="latitude" :longitude="longitude" :layer-style="theme == 'dark' ? '2' : '1'" :show-compass="false"
        :enable-zoom="true" :enable-scroll="true" :enable-rotate="false" :enable-poi="true" :show-location="true" @regionchange="regionchange">
      </map>
      <view class="uni-choose-location-map-target" ref="mapTargetRef">
        <text class="uni-choose-location-icons uni-choose-location-map-target-icon">{{ icon.target }}</text>
      </view>
      <view class="uni-choose-location-map-reset" :class="[landscapeClassCom, darkClassCom]" @click="mapReset" :style="resetStyleCom">
        <text class="uni-choose-location-icons uni-choose-location-map-reset-icon" :class="[darkClassCom]">{{ icon.position }}</text>
      </view>
    </view>
    <view class="uni-choose-location-nav" :style="'height:' + (60 + safeArea.top) + 'px;'">
      <view class="uni-choose-location-nav-btn uni-choose-location-nav-back-btn" :class="[landscapeClassCom]" :style="safeArea.top > 0 ? 'top: ' + safeArea.top + 'px;' : ''"><text
          class="uni-choose-location-nav-text uni-choose-location-nav-back-text" @click="back">{{ languageCom['cancel'] }}</text></view>
      <view class="uni-choose-location-nav-btn uni-choose-location-nav-confirm-btn" :class="[landscapeClassCom,selected < 0 && !callUniMapCoErr ? 'disable' : 'active']"
        :style="safeArea.top > 0 ? 'top: ' + safeArea.top + 'px;' : ''" @click="confirm">
        <text class="uni-choose-location-nav-text uni-choose-location-nav-confirm-text">{{ languageCom['ok'] }}</text>
      </view>
    </view>
    <view class="uni-choose-location-poi" :class="[landscapeClassCom, darkClassCom]" v-if="useUniCloud" :style="poiBoxStyleCom">
      <view class="uni-choose-location-poi-search" :class="[darkClassCom]">
        <view class="uni-choose-location-poi-search-box" :class="[darkClassCom]">
          <text class="uni-choose-location-icons uni-choose-location-search-icon" :class="[darkClassCom]">{{ icon.search }}</text>
          <input v-model="searchValue" type="text" :placeholder="languageCom['search']" class="uni-choose-location-poi-search-input uni-choose-location-icons" :class="[darkClassCom]" @focus="isFocus=true" @confirm="poiSearch('poiSearch')" @input="searchValueChange" />
        </view>
        <text class="uni-choose-location-poi-search-cancel" v-if="isFocus || searchValue != ''" @click="cancelSearch">{{ languageCom['cancel'] }}</text>
      </view>
      <scroll-view ref="scrollRef" :scroll-with-animation="false" direction="vertical" :scroll-top="scrollTop" :lower-threshold="50" @scrolltolower="scrolltolower"
        class="uni-choose-location-poi-list">
        <view class="uni-choose-location-poi-search-error" v-if="errMsg != ''">
          <text class="uni-choose-location-poi-search-error-text" :class="[darkClassCom]">{{ errMsg }}</text>
        </view>
        <view class="uni-choose-location-poi-search-loading" v-else-if="locationLoading"><text
            class="uni-choose-location-poi-search-loading-text" :class="[darkClassCom]">{{ languageCom['locationLoading'] }}</text></view>
        <view class="uni-choose-location-poi-search-loading" v-else-if="searchLoading && pageIndex == 1">
          <loading class="uni-choose-location-poi-search-loading-item" :class="[darkClassCom]"></loading>
        </view>
        <template v-else>
          <view v-for="(item,index) in pois" :key="index" class="uni-choose-location-poi-item" :class="[landscapeClassCom]" @click="selectPoi(item, index)">
            <view>
              <view> <text class="uni-choose-location-poi-item-title-text" :class="[darkClassCom]">{{ item.title }}</text> </view>
              <view> <text class="uni-choose-location-poi-item-detail-text" :class="[darkClassCom]">{{ item.distance as number > 0 ? item.distanceStr + ' | ' : '' }}{{ item.address }}</text>
              </view>
            </view>
            <text class="uni-choose-location-icons uni-choose-location-poi-item-selected-icon" v-if="selected == index">{{ icon.success }}</text>
            <view class="uni-choose-location-poi-item-after" :class="[darkClassCom]"></view>
          </view>
        </template>
        <view class="uni-choose-location-poi-search-loading" v-if="searchLoading && pageIndex > 1">
          <loading class="uni-choose-location-poi-search-loading-item" :class="[darkClassCom]"></loading>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed, watch } from 'vue'

  // #ifdef APP-ANDROID
  import "io.dcloud.unicloud.*"
  // #endif

  type ControlPosition = {
    left : number,
    top : number,
    width : number,
    height : number
  }

  type Control = {
    id : number,
    position : ControlPosition,
    iconPath : string,
    clickable : boolean
  }

  type PoiLocation = {
    latitude : number,
    longitude : number
  }

  type LastPoi = {
    latitude : number | null,
    longitude : number | null,
    selected : number,
    pois : Array<Poi>,
    scrollTop : number
  }

  type Poi = {
    title : string,
    address : string,
    distance : number,
    distanceStr : string,
    location : PoiLocation
  }

  type SafeArea = {
    top : number,
    bottom : number,
    left : number,
    right : number
  }

  type IconPath = {
    target : string,
    success : string,
    position : string,
    search : string
  }

  const defaultPoi = {
    latitude: 39.908823,
    longitude: 116.39747,
  } as PoiLocation

  const languageData = {
    "en": {
      "ok": "ok",
      "cancel": "cancel",
      "locationLoading": "positioning...",
      "search": "Search location"
    },
    "zh-Hans": {
      "ok": "确定",
      "cancel": "取消",
      "locationLoading": "获取定位中...",
      "search": "搜索地点"
    },
    "zh-Hant": {
      "ok": "確定",
      "cancel": "取消",
      "locationLoading": "獲取定位中...",
      "search": "蒐索地點"
    }
  };

  // #ifdef APP-ANDROID
  // @ts-ignore
  class CloudObjectUniMapCo extends InternalUniCloudCloudObjectCaller {
    // @ts-ignore
    constructor(obj : InternalUniCloudCloudObject) {
      super(obj)
    }
    chooseLocation(...do_not_transform_spread : Array<any | null>) : Promise<UTSJSONObject> {
      // @ts-ignore
      return this._obj.callMethod('chooseLocation', this._getArgs(...do_not_transform_spread))
    }
  }
  // #endif

  const currentInstance = getCurrentInstance()!.proxy!
  const uniPage = currentInstance.$page

  const readyEventName = ref('')
  const optionsEventName = ref('')
  const successEventName = ref('')
  const failEventName = ref('')
  const mapId = ref(`UniMap1_${(Math.random() * 10e5).toString(36)}` as string)
  const isFocus = ref(false)
  const latitude = ref(0)
  const longitude = ref(0)
  const locationComplete = ref(false)
  const locationLoading = ref(false)
  const chooseLocationOptions = reactive({} as ChooseLocationOptions)
  const pageIndex = ref(1)
  const pageSize = ref(20)
  const pois = ref([] as Array<Poi>)
  const selected = ref(-1)
  const searchValue = ref("")
  const safeArea = reactive({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  } as SafeArea)
  const icon = reactive({
    target: '\ue683',
    success: '\ue631',
    position: '\ue653',
    search: '\ue7ad'
  } as IconPath)
  const lastTime = ref(0)
  const searchLoading = ref(false)
  const language = ref("zh-Hans")
  const scrollTop = ref(0)
  const isLandscape = ref(false)
  const theme = ref("light")
  const searchValueChangeTimer = ref(-1)
  const lastPoi = reactive({
    latitude: null,
    longitude: null,
    selected: -1,
    pois: [] as Array<Poi>,
    scrollTop: 0
  } as LastPoi)
  const errMsg = ref("")
  const callUniMapCoErr = ref(false)
  const useUniCloud = ref(true)
  const mapHeight = ref(350)
  const timeoutTimers = ref([] as Array<number>)

  const mapTargetRef = ref(null as UniElement | null)
  const scrollRef = ref(null as UniScrollViewElement | null)

  const checkUniCloud = () => {
    if (typeof uniCloud == 'undefined' || typeof uniCloud.config == 'undefined' || uniCloud.config.spaceId == '') {
      errMsg.value = "uni.chooseLocation 依赖 uniCloud 的 uni-map-common 插件，请先关联服务空间，并安装 uni-map-common 插件，插件地址：https://ext.dcloud.net.cn/plugin?id=13872";
      useUniCloud.value = false;
      console.error(errMsg.value);
    }
  }

  const initPageOptions = (options : UTSJSONObject) => {
    readyEventName.value = options['readyEventName']! as string;
    optionsEventName.value = options['optionsEventName']! as string;
    successEventName.value = options['successEventName']! as string;
    failEventName.value = options['failEventName']! as string;
    uni.$on(optionsEventName.value, (data : UTSJSONObject) => {
      if (data['latitude'] != null) {
        chooseLocationOptions.latitude = data['latitude'] as number;
      }
      if (data['longitude'] != null) {
        chooseLocationOptions.longitude = data['longitude'] as number;
      }
      if (data['keyword'] != null) {
        let keyword = data['keyword'] as string;
        chooseLocationOptions.keyword = keyword;
        searchValue.value = keyword;
      } else {
        chooseLocationOptions.keyword = "";
      }
      if (data['payload'] != null) {
        chooseLocationOptions.payload = data['payload'] as UTSJSONObject;
      }
    });
    uni.$emit(readyEventName.value, {});
  }

  const callUniMapCo = (action : string, data : UTSJSONObject) : Promise<UTSJSONObject> => {
    let promise = new Promise((resolve, reject) => {
      if (useUniCloud.value == false) {
        reject(errMsg.value);
        return;
      }
      errMsg.value = "";
      // #ifdef APP-ANDROID
      // @ts-ignore
      const uniCloudInstance = uniCloud as UniCloud;
      // @ts-ignore
      const uniMapCo = uniCloudInstance.importObject("uni-map-co", {
        customUI: true,
        // @ts-ignore
      } as UniCloudImportObjectOptions, UTSAndroid.getJavaClass(CloudObjectUniMapCo))
      // #endif
      // #ifndef APP-ANDROID
      // @ts-ignore
      const uniMapCo = uniCloud.importObject("uni-map-co", {
        customUI: true,
      });
      // #endif
      let chooseLocationData = {
        action: action,
        data: data
      } as UTSJSONObject;

      if (chooseLocationOptions.payload != null) {
        chooseLocationData['payload'] = chooseLocationOptions.payload;
      }
      uniMapCo.chooseLocation(chooseLocationData).then((res : UTSJSONObject) => {
        resolve(res);
      }).catch((err) => {
        if (err instanceof UniCloudError) {
          const cloudError = err as UniCloudError;
          const errCode = cloudError.errCode;
          const errorMsg = cloudError.errMsg;
          const errSubject = cloudError.errSubject;
          if (errorMsg.indexOf("在云端不存在") > -1 || errorMsg.indexOf("未匹配") > -1) {
            errMsg.value = "uni.chooseLocation 依赖 uniCloud 的 uni-map-common 插件，请安装 uni-map-common 插件，插件地址：https://ext.dcloud.net.cn/plugin?id=13872";
            console.error(errMsg.value);
          } else {
            errMsg.value = errorMsg;
            console.error("获取POI信息失败，" + JSON.stringify({ errCode, errMsg: errorMsg, errSubject }));
          }
        }
        reject(err);
      });
    });
    promise.then((res) => {
      callUniMapCoErr.value = false;
    })
      .catch((err) => {
        callUniMapCoErr.value = true;
      });
    return promise as Promise<UTSJSONObject>;
  }

  const calcDirection = (poi1 : PoiLocation, poi2 : PoiLocation) : string => {
    const toRadians = (angle : number) : number => angle * (Math.PI / 180);
    const toDegrees = (angle : number) : number => angle * (180 / Math.PI);

    const lat1 = toRadians(poi1.latitude);
    const lon1 = toRadians(poi1.longitude);
    const lat2 = toRadians(poi2.latitude);
    const lon2 = toRadians(poi2.longitude);

    const dLon = lon2 - lon1;
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    const angleRadians = Math.atan2(y, x);

    let angle = toDegrees(angleRadians);
    angle = (angle + 360) % 360;
    // 根据角度判断方向
    if (angle < 22.5 || angle >= 337.5) {
      return '北';
    } else if (angle >= 22.5 && angle < 67.5) {
      return '东北';
    } else if (angle >= 67.5 && angle < 112.5) {
      return '东';
    } else if (angle >= 112.5 && angle < 157.5) {
      return '东南';
    } else if (angle >= 157.5 && angle < 202.5) {
      return '南';
    } else if (angle >= 202.5 && angle < 247.5) {
      return '西南';
    } else if (angle >= 247.5 && angle < 292.5) {
      return '西';
    } else {
      return '西北';
    }
  }

  const distanceHandle = (distance : number) => {
    if (distance < 1000) {
      return distance + 'm';
    } else {
      return parseFloat((distance / 1000).toFixed(2)) + 'km';
    }
  }

  const safeSetTimeout = (callback : () => void, delay : number) : number => {
    let timerId : number = -1;
    timerId = setTimeout(() => {
      callback();
      const index = timeoutTimers.value.indexOf(timerId);
      if (index > -1) {
        timeoutTimers.value.splice(index, 1);
      }
    }, delay);
    timeoutTimers.value.push(timerId);
    return timerId;
  }

  const updateScrollTop = (scrollTopValue : number) => {
    safeSetTimeout(() => {
      scrollTop.value = scrollTopValue;
    }, 10);
  }

  const poiHandle = (poisData : Array<UTSJSONObject>) => {
    let list = poisData.map((item : UTSJSONObject, index : number) => {
      const location = item['location'] as UTSJSONObject;
      let distance = item['distance'] as number;
      let lat = location['lat'] as number;
      let lng = location['lng'] as number;
      if (distance == 0) {
        lat = latitude.value;
        lng = longitude.value;
      }
      return {
        title: item['title'] as string,
        address: item['address'] as string,
        distance: distance,
        distanceStr: distanceHandle(distance),
        location: {
          latitude: lat,
          longitude: lng
        },
      } as Poi
    });
    let index = pageIndex.value as number;
    if (index == 1) {
      pois.value = list;
      updateScrollTop(0);
    } else {
      pois.value = pois.value.concat(list);
    }
  }

  const getPoi = (type : string) => {
    let searchVal = searchValue.value;
    let lat = latitude.value as number;
    let lng = longitude.value as number;
    let index = pageIndex.value as number;
    let size = pageSize.value as number;
    if (['searchValueChange'].indexOf(type) == -1) {
      searchLoading.value = true;
    }
    if (searchVal != "" && searchVal.length > 0) {
      callUniMapCo("search", {
        keyword: searchVal,
        location: {
          lat: lat,
          lng: lng
        },
        radius: 5000,
        auto_extend: 1,
        orderby: "weight",
        page_index: index,
        page_size: size,
      }).then((res : UTSJSONObject) => {
        let poisData = res.getJSON('result')?.getJSON('result')?.getArray('data') as Array<UTSJSONObject>;
        poiHandle(poisData);
        searchLoading.value = false;
      }).catch((err) => {
        searchLoading.value = false;
      })
    } else {
      callUniMapCo("location2address", {
        location: `${lat},${lng}`,
        get_poi: 1,
        poi_options: {
          radius: 3000,
          policy: index == 1 ? 3 : 4,
          roadlevel: 1,
          homeorcorp: 1,
          page_index: index,
          page_size: size,
        }
      }).then((res : UTSJSONObject) => {
        let poisData = res.getJSON('result')?.getJSON('result')?.getArray('pois') as Array<UTSJSONObject>;
        poiHandle(poisData);
        if (pois.value.length > 0 && index == 1) {
          let poi : Poi = pois.value[0];
          if (poi.distance > 0) {
            let poi1 = poi.location;
            let poi2 = {
              latitude: latitude.value,
              longitude: longitude.value
            } as PoiLocation;
            let distance = poi.distance as number;
            let direction = calcDirection(poi1, poi2);
            if (poi.address.indexOf("米") == -1) {
              let suffix = `向${direction}${distance}米`;
              let newPoi = {
                title: `${poi.title}${suffix}`,
                address: `${poi.address}${suffix}`,
                distance: 0,
                distanceStr: distanceHandle(distance),
                location: poi2
              } as Poi;
              pois.value.unshift(newPoi);
            }
          }
          searchLoading.value = false;
          if (selected.value == -1) {
            // 延迟修改 selected ,否则会导致鸿蒙在一开始的时候不显示
            safeSetTimeout(() => {
              selected.value = 0;
            }, 20);
            lastPoi.latitude = latitude.value;
            lastPoi.longitude = longitude.value;
            lastPoi.selected = selected.value;
            lastPoi.pois = pois.value;
          }
        }
      }).catch((err) => {
        searchLoading.value = false;
      })
    }
  }

  const getLocation = () => {
    if (chooseLocationOptions.latitude != null && chooseLocationOptions.longitude != null) {
      latitude.value = chooseLocationOptions.latitude as number;
      longitude.value = chooseLocationOptions.longitude as number;
      locationComplete.value = true;
      // #ifdef APP-HARMONY
      safeSetTimeout(() => {
        getPoi('getLocation');
      }, 100);
      // #endif
      // #ifndef APP-HARMONY
      getPoi('getLocation');
      // #endif
    } else {
      locationLoading.value = true;
      uni.getLocation({
        type: 'gcj02',
        success: (res) => {
          latitude.value = res.latitude;
          longitude.value = res.longitude;
          locationComplete.value = true;
          locationLoading.value = false;
          getPoi('getLocation');
        },
        fail: (err) => {
          console.error('getLocationErr: ', err)
          latitude.value = defaultPoi.latitude;
          longitude.value = defaultPoi.longitude;
          locationComplete.value = true;
          locationLoading.value = false;
          getPoi('getLocation');
        }
      });
    }
  }

  const getSafeAreaInsets = () => {
    const info = uni.getWindowInfo();
    safeArea.top = info.safeAreaInsets.top;
    safeArea.bottom = info.safeAreaInsets.bottom;
    safeArea.left = info.safeAreaInsets.left;
    safeArea.right = info.safeAreaInsets.right;
    // #ifdef APP-ANDROID
    uniPage.setPageStyle({
      "androidThreeButtonNavigationTranslucent": false
    });
    // #endif
  }

  const getMapContext = () : MapContext | null => {
    return uni.createMapContext(mapId.value, currentInstance);
  }

  const regionchange = (e : UniMapRegionChangeEvent) => {
    let causedBy = e.causedBy as string | null;
    // #ifdef WEB
    if (!causedBy) {
      // @ts-expect-error
      causedBy = e.detail.causedBy as string;
    }
    // #endif
    if (e.type !== "end" || causedBy != "drag" || locationComplete.value == false) {
      return;
    }
    const mapContext = getMapContext();
    if (mapContext != null) {
      mapContext.getCenterLocation({
        success: (res) => {
          let latitudeDiff = Math.abs(res.latitude - latitude.value);
          let longitudeDiff = Math.abs(res.longitude - longitude.value);
          if (latitudeDiff > 0.000001 || longitudeDiff > 0.000001) {
            latitude.value = parseFloat(res.latitude.toFixed(6));
            longitude.value = parseFloat(res.longitude.toFixed(6));
            searchValue.value = "";
            selected.value = -1;
            pageIndex.value = 1;
            getPoi('regionchange');
            const element = mapTargetRef.value as UniElement | null;
            if (element != null) {
              const duration = 250;
              element.style.setProperty('transition-duration', `${duration}ms`);
              element.style.setProperty('transform', 'translateY(0px)');
              element.style.setProperty('transform', 'translateY(-15px)');
              safeSetTimeout(() => {
                element.style.setProperty('transform', 'translateY(0px)');
              }, duration);
            }
          }
        }
      });
    }
  }

  const clearSearchValueChangeTimer = () => {
    if (searchValueChangeTimer.value != -1) {
      clearTimeout(searchValueChangeTimer.value);
      searchValueChangeTimer.value = -1;
    }
  }

  const clearAllTimeoutTimers = () => {
    timeoutTimers.value.forEach((timer : number) => {
      if (timer != -1) {
        clearTimeout(timer);
      }
    });
    timeoutTimers.value = [];
  }

  const poiSearch = (type : string) => {
    clearSearchValueChangeTimer();
    pageIndex.value = 1;
    selected.value = -1;
    getPoi(type);
  }

  const searchValueChange = (e : UniInputEvent) => {
    clearSearchValueChangeTimer();
    searchValueChangeTimer.value = setTimeout(() => {
      poiSearch('searchValueChange');
    }, 200);
  }

  const cancelSearch = () => {
    isFocus.value = false;
    searchValue.value = "";
    if (lastPoi.latitude != null) {
      latitude.value = lastPoi.latitude as number;
    }
    if (lastPoi.longitude != null) {
      longitude.value = lastPoi.longitude as number;
    }
    if ((lastPoi.pois.length - 1) > lastPoi.selected) {
      pois.value = lastPoi.pois;
      selected.value = lastPoi.selected;
      updateScrollTop(lastPoi.scrollTop as number);
    } else {
      poiSearch('cancelSearch');
    }
  }

  const selectPoi = (item : Poi, index : number) => {
    isFocus.value = false;
    selected.value = index;
    latitude.value = item.location.latitude;
    longitude.value = item.location.longitude;
    if (searchValue.value == chooseLocationOptions.keyword) {
      lastPoi.latitude = latitude.value as number;
      lastPoi.longitude = longitude.value as number;
      lastPoi.selected = selected.value;
      lastPoi.pois = pois.value;
      const scrollElement = scrollRef.value as UniScrollViewElement | null;
      if (scrollElement != null) {
        const scrollTopVal = scrollElement.scrollTop as number;
        lastPoi.scrollTop = scrollTopVal;
        scrollTop.value = scrollTopVal;
      }
    }
  }

  const scrolltolower = () => {
    pageIndex.value++;
    getPoi('scrolltolower');
  }

  const mapReset = () => {
    isFocus.value = false;
    pageIndex.value = 1;
    selected.value = -1;
    getLocation();
  }

  const closeDialogPage = () => {
    // #ifdef APP-ANDROID
    uni.closeDialogPage({
      dialogPage: uniPage,
      animationType: 'zoom-fade-out',
      // @ts-ignore
    } as io.dcloud.uniapp.framework.extapi.CloseDialogPageOptions)
    // #endif
    // #ifndef APP-ANDROID
    uni.closeDialogPage({
      dialogPage: uniPage,
      // #ifdef APP-IOS
      animationType: 'zoom-fade-out',
      // #endif
    })
    // #endif
  }

  const back = () => {
    uni.$emit(failEventName.value, 1);
    closeDialogPage();
  }

  const confirm = () => {
    if (selected.value < 0) {
      if (callUniMapCoErr.value) {
        uni.$emit(successEventName.value, {
          name: "",
          address: "",
          latitude: parseFloat(latitude.value.toFixed(6)),
          longitude: parseFloat(longitude.value.toFixed(6))
        });
        closeDialogPage();
      }
      return;
    }
    let item = pois.value[selected.value];
    let res = {
      name: item.title,
      address: item.address,
      latitude: item.location.latitude,
      longitude: item.location.longitude
    };
    uni.$emit(successEventName.value, res);
    closeDialogPage();
  }

  const getSystemInfo = () => {
    const info = uni.getWindowInfo();
    safeArea.top = info.safeAreaInsets.top;
    safeArea.bottom = info.safeAreaInsets.bottom;
    safeArea.left = info.safeAreaInsets.left;
    safeArea.right = info.safeAreaInsets.right;
    let screenHeight = info.screenHeight;
    mapHeight.value = (screenHeight - safeArea.top - safeArea.bottom) * 0.6;
    const systemInfo = uni.getSystemInfoSync()
    const appLanguage = systemInfo.appLanguage
    language.value = appLanguage
    const osTheme = systemInfo.osTheme
    const appTheme = systemInfo.appTheme
    if (appTheme != null && appTheme != "auto") {
      theme.value = appTheme
    } else if (osTheme != null) {
      theme.value = osTheme
    }
    // #ifdef WEB
    isLandscape.value = systemInfo.windowWidth >= 900 ? true : false;
    const hostTheme = systemInfo.hostTheme
    if (hostTheme != null) {
      theme.value = hostTheme
    }
    const locale = uni.getLocale()
    language.value = locale
    // #endif
    // #ifdef APP
    isLandscape.value = systemInfo.deviceOrientation == 'landscape';
    // #endif
    // #ifdef APP-ANDROID
    uniPage.setPageStyle({
      "androidThreeButtonNavigationTranslucent": false,
      "backgroundColorContent": theme.value == "dark" ? "#181818" : "#ffffff",
    });
    // #endif
  }

  const languageCom = computed(() : UTSJSONObject => {
    const textInfo = languageData[language.value] != null ? languageData[language.value] as UTSJSONObject : languageData['zh-Hans'] as UTSJSONObject;
    return textInfo;
  })

  const darkClassCom = computed(() : string => {
    return theme.value == 'dark' ? 'uni-choose-location-dark' : 'uni-choose-location-light';
  })

  const landscapeClassCom = computed(() : string => {
    return isLandscape.value ? 'uni-choose-location-landscape' : 'uni-choose-location-vertical';
  })

  const mapBoxStyleCom = computed(() : string => {
    let list = [] as Array<string>;
    if (!useUniCloud.value) {
      list.push(`flex: 1;`);
    }
    if (!isLandscape.value) {
      let top = isFocus.value ? (300 - mapHeight.value) / 2 : 0;
      list.push(`transform:translateY(${top}px);`);
      list.push(`height:${mapHeight.value}px;`);
    }
    return list.join('');
  })

  const poiBoxStyleCom = computed(() : string => {
    let list = [] as Array<string>;
    if (!isLandscape.value) {
      let top = isFocus.value ? 300 : mapHeight.value;
      list.push(`top:${top}px;`);
    }
    return list.join('');
  })

  const resetStyleCom = computed(() : string => {
    let list = [] as Array<string>;
    if (!isLandscape.value) {
      let bottom = isFocus.value ? (mapHeight.value - 300) / 2 + 300 - mapHeight.value : 0;
      list.push(`transform:translateY(${bottom}px);`);
    }
    return list.join('');
  })

  onLoad((options : UTSJSONObject) => {
    checkUniCloud();
    initPageOptions(options);
    getSystemInfo();
    getLocation();
  })

  onReady(() => {
    getSafeAreaInsets();
  })

  onUnload(() => {
    uni.$off(optionsEventName.value, null);
    uni.$off(readyEventName.value, null);
    uni.$off(successEventName.value, null);
    uni.$off(failEventName.value, null);
    clearSearchValueChangeTimer();
    clearAllTimeoutTimers();
  })

  onResize(() => {
    getSystemInfo();
  })
</script>

<style>
  @font-face {
    font-family: UniChooseLocationFontFamily;
    src: url('data:font/ttf;charset=utf-8;base64,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') format('truetype');
  }

  .uni-choose-location-icons {
    font-family: "UniChooseLocationFontFamily";
    font-size: 16px;
    font-style: normal;
  }

  .uni-choose-location {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #f8f8f8;
    z-index: 999;
  }

  .uni-choose-location-map-box {
    position: relative;
    width: 100%;
    height: 350px;
  }

  .uni-choose-location-map-box.uni-choose-location-vertical {
    transition-property: transform;
    transition-duration: 0.25s;
    transition-timing-function: ease-out;
  }

  .uni-choose-location-map {
    width: 100%;
    height: 100%;
  }

  .uni-choose-location-map-target {
    position: absolute;
    left: 50%;
    bottom: 50%;
    width: 50px;
    height: 50px;
    margin-left: -25px;
    transition-property: transform;
    transition-duration: 0.25s;
    transition-timing-function: ease-out;
  }

  .uni-choose-location-map-target-icon {
    font-size: 50px;
    color: #f0493e;
  }

  /* #1aad19; #f0493e; #007aff;*/

  .uni-choose-location-map-reset {
    position: absolute;
    left: 20px;
    bottom: 40px;
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 20px;
    pointer-events: auto;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .3);
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .uni-choose-location-map-reset.uni-choose-location-vertical {
    transition-property: transform;
    transition-duration: 0.25s;
    transition-timing-function: ease-out;
  }

  .uni-choose-location-map-reset-icon {
    font-size: 26px;
    text-align: center;
    line-height: 40px;
  }

  .uni-choose-location-nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: rgba(0, 0, 0, 0);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, .6), rgba(0, 0, 0, 0));
  }

  .uni-choose-location-nav-btn {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 64px;
    height: 44px;
    padding: 5px;
  }

  .uni-choose-location-nav-btn.uni-choose-location-nav-confirm-btn {
    left: auto;
    right: 5px;
  }

  .uni-choose-location-nav-confirm-text {
    background-color: #007aff;
    border-radius: 5px;
  }

  /* #ifndef VUE3_VAPOR */
  .uni-choose-location-nav-btn.uni-choose-location-nav-confirm-btn.active:active {
    opacity: 0.7;
  }
  /* #endif */

  .uni-choose-location-nav-btn.uni-choose-location-nav-confirm-btn.disable {
    opacity: 0.4;
  }

  .uni-choose-location-nav-back-text {
    color: #fff;
  }

  .uni-choose-location-nav-text {
    padding: 8px 0px;
    font-size: 14px;
    text-align: center;
    /* #ifdef WEB */
    letter-spacing: 0.1em;
    /* #endif */
    color: #fff;
  }

  .uni-choose-location-poi {
    position: absolute;
    top: 350px;
    width: 100%;
    bottom: 0;
    background-color: #fff;
    z-index: 10
  }

  .uni-choose-location-poi.uni-choose-location-vertical {
    transition-property: top;
    transition-duration: 0.25s;
    transition-timing-function: ease-out;
  }

  .uni-choose-location-poi-search {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 50px;
    padding: 8px;
    background-color: #fff;
  }

  .uni-choose-location-poi-search-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 32px;
    flex: 1;
    border-radius: 5px;
    padding: 0 15px;
    background-color: #ededed;
  }

  .uni-choose-location-poi-search-input {
    flex: 1;
    height: 100%;
    border-radius: 5px;
    padding: 0 5px;
    background: #ededed;
  }

  .uni-choose-location-poi-search-cancel {
    margin-left: 5px;
    color: #007aff;
    font-size: 15px;
    text-align: center;
  }

  .uni-choose-location-poi-list {
    flex: 1;
  }

  .uni-choose-location-poi-search-loading {
    display: flex;
    align-items: center;
    padding: 10px 0px;
  }

  .uni-choose-location-poi-search-loading-text {
    color: #191919;
  }

  .uni-choose-location-poi-search-error {
    display: flex;
    align-items: center;
    padding: 10px;
  }

  .uni-choose-location-poi-search-error-text {
    color: #191919;
    font-size: 14px;
  }

  .uni-choose-location-poi-item {
    position: relative;
    padding: 15px 10px;
    padding-right: 40px;
  }

  .uni-choose-location-poi-item-title-text {
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #191919;
  }

  .uni-choose-location-poi-item-detail-text {
    font-size: 12px;
    margin-top: 5px;
    color: #b2b2b2;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .uni-choose-location-poi-item-selected-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    width: 26px;
    height: 26px;
    margin-top: -13px;
    color: #007aff;
    font-size: 24px;
  }

  .uni-choose-location-poi-item-after {
    position: absolute;
    height: 1px;
    left: 10px;
    bottom: 0px;
    right: 10px;
    width: auto;
    border-bottom: 1px solid #f8f8f8;
  }

  .uni-choose-location-search-icon {
    color: #808080;
    padding-left: 5px;
  }

  .uni-choose-location-poi-search-loading-item {
    width: 28px;
    height: 28px;
    border-color: #D0D0D0;
  }

  /* 横屏样式开始 */

  .uni-choose-location-map-box.uni-choose-location-landscape {
    height: 100%;
  }

  .uni-choose-location-poi.uni-choose-location-landscape {
    position: absolute;
    top: 80px;
    right: 25px;
    width: 300px;
    bottom: 20px;
    max-height: 600px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .3);
    border-radius: 5px;
  }

  .uni-choose-location-map-reset.uni-choose-location-landscape {
    left: 40px;
    bottom: 40px;
  }

  .uni-choose-location-poi-item.uni-choose-location-landscape {
    padding: 10px;
  }

  .uni-choose-location-nav-btn.uni-choose-location-landscape {
    top: 10px;
    left: 20px;
  }

  .uni-choose-location-nav-btn.uni-choose-location-nav-confirm-btn.uni-choose-location-landscape {
    left: auto;
    right: 20px;
  }

  /* 横屏样式结束 */

  /* 暗黑模式样式开始 */
  .uni-choose-location-dark.uni-choose-location-map-reset {
    background-color: #111111;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, .3);
  }

  .uni-choose-location-dark.uni-choose-location-poi-search-box {
    background-color: #111111;
  }

  .uni-choose-location-dark.uni-choose-location-search-icon {
    color: #d1d1d1;
  }

  .uni-choose-location-dark.uni-choose-location-poi-search-loading-text {
    color: #d1d1d1;
  }

  .uni-choose-location-dark.uni-choose-location-poi-search {
    background-color: #181818
  }

  .uni-choose-location-dark.uni-choose-location-poi-search-input {
    background: #111111;
    color: #d1d1d1;
  }

  .uni-choose-location-dark.uni-choose-location-poi-item-title-text {
    color: #d1d1d1;
  }

  .uni-choose-location-dark.uni-choose-location-poi-item-detail-text {
    color: #595959;
  }

  .uni-choose-location-dark.uni-choose-location-poi {
    background-color: #181818
  }

  .uni-choose-location-dark.uni-choose-location-poi-item-after {
    border-bottom: 1px solid #1e1e1e;
  }

  .uni-choose-location-dark.uni-choose-location-map-reset-icon {
    color: #d1d1d1;
  }

  .uni-choose-location-dark.uni-choose-location-poi-search-error-text {
    color: #d1d1d1;
  }

  .uni-choose-location-dark.uni-choose-location-poi-search-loading-item {
    border-color: #d1d1d1;
  }
  /* 暗黑模式样式结束 */

  /* #ifdef WEB */
  uni-image {
    display: inline-block;
    overflow: hidden;
    position: relative;
  }

  uni-image[hidden] {
    display: none;
  }

  uni-image > div {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
  }

  uni-image > img {
    -webkit-touch-callout: none;
    user-select: none;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  uni-image > .uni-image-will-change {
    will-change: transform;
  }

  /* #endif */
</style>
