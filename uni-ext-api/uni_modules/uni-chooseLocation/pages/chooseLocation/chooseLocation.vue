<template>
  <view class="uni-choose-location" :class="uniChooseLocationClassCom">
    <view class="uni-choose-location-map-box" :class="[landscapeClassCom]" :style="mapBoxStyleCom">
      <map class="uni-choose-location-map" :id="mapId" :ref="mapId" :latitude="latitude" :longitude="longitude" :layer-style="theme == 'dark' ? '2' : '1'" :show-compass="false"
        :enable-zoom="true" :enable-scroll="true" :enable-rotate="false" :enable-poi="true" :show-location="true" @regionchange="regionchange">
      </map>
      <view class="uni-choose-location-map-target" :ref="mapTargetId" :id="mapTargetId">
        <text class="uni-choose-location-icons uni-choose-location-map-target-icon">{{ icon.target }}</text>
      </view>
      <view class="uni-choose-location-map-reset" :class="[landscapeClassCom]" @click="mapReset" :style="resetStyleCom">
        <text class="uni-choose-location-icons uni-choose-location-map-reset-icon">{{ icon.position }}</text>
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
    <view class="uni-choose-location-poi" :class="[landscapeClassCom]" v-if="useUniCloud" :style="poiBoxStyleCom">
      <view class="uni-choose-location-poi-search">
        <view class="uni-choose-location-poi-search-box">
          <text class="uni-choose-location-icons uni-choose-location-search-icon">{{ icon.search }}</text>
          <input v-model="searchValue" type="text" :placeholder="languageCom['search']" class="uni-choose-location-poi-search-input uni-choose-location-icons" @focus="isFocus=true" @confirm="poiSearch('poiSearch')" @input="searchValueChange" />
        </view>
        <text class="uni-choose-location-poi-search-cancel" v-if="isFocus || searchValue != ''" @click="cancelSearch">{{ languageCom['cancel'] }}</text>
      </view>
      <scroll-view :id="scrollId" :ref="scrollId" :scroll-with-animation="false" direction="vertical" :scroll-top="scrollTop" :lower-threshold="50" @scrolltolower="scrolltolower"
        class="uni-choose-location-poi-list">
				<text>{{ JSON.stringify(safeArea) }}</text>
        <view class="uni-choose-location-poi-search-error" v-if="errMsg != ''">
          <text class="uni-choose-location-poi-search-error-text">{{ errMsg }}</text>
        </view>
        <view class="uni-choose-location-poi-search-loading" v-else-if="locationLoading"><text
            class="uni-choose-location-poi-search-loading-text">{{ languageCom['locationLoading'] }}</text></view>
        <view class="uni-choose-location-poi-search-loading" v-else-if="searchLoading && pageIndex == 1">
          <image :src="loadingPath" class="uni-choose-location-poi-search-loading-image" mode="widthFix" :class="[searchLoadingAnimation ? 'uni-choose-location-poi-search-loading-start' : '']"></image>
        </view>
        <template v-else>
          <view v-for="(item,index) in pois" :key="index" class="uni-choose-location-poi-item" :class="[landscapeClassCom]" @click="selectPoi(item, index)">
            <view>
              <view> <text class="uni-choose-location-poi-item-title-text">{{ item.title }}</text> </view>
              <view> <text class="uni-choose-location-poi-item-detail-text">{{ item.distance as number > 0 ? item.distanceStr + ' | ' : '' }}{{ item.address }}</text>
              </view>
            </view>
            <text class="uni-choose-location-icons uni-choose-location-poi-item-selected-icon" v-if="selected == index">{{ icon.success }}</text>
            <view class="uni-choose-location-poi-item-after"></view>
          </view>
        </template>
        <view class="uni-choose-location-poi-search-loading" v-if="searchLoading && pageIndex > 1">
          <image :src="loadingPath" class="uni-choose-location-poi-search-loading-image" mode="widthFix" :class="[searchLoadingAnimation ? 'uni-choose-location-poi-search-loading-start' : '']"></image>
        </view>
      </scroll-view>
      <!-- #ifdef APP-ANDROID -->
      <view v-if="safeArea.bottom > 0" :style="'height: ' + safeArea.bottom + 'px;'"> </view>
      <!-- #endif -->
    </view>
  </view>
</template>

<script lang="ts">
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
  class CloudObjectUniMapCo extends InternalUniCloudCloudObjectCaller {
    constructor(obj : InternalUniCloudCloudObject) {
      super(obj)
    }
    chooseLocation(...do_not_transform_spread : Array<any | null>) : Promise<UTSJSONObject> {
      return this._obj.callMethod('chooseLocation', this._getArgs(...do_not_transform_spread))
    }
  }
  // #endif
  
   const loadingPath = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAXdJREFUSEvdVtFthTAMdAKD0E3oABixwWOSvk5SNkCYAcomZRFIZfSoUl6IQ14l2uYXnMtd7uwoOGmpk3AhGpiI3gEgQ8SnmMM/AmwAYPwfwG3bZkmS5IjY7MlIRCLjruuu8zw3VVWN232cUnOBUurFJ6UEfPNADgC1i4AT+Mb4DQC40HmPPmALdEDEZ5dqu+aSwPk7b7iVMQSU67yutsGNMa9lWV590SGiCwCwUrtM13oxTqvRpmkaXCaxD8L/aq0v0gFFxjGNIbRGZBy60dH/zge23GgfflRK1UVRDEcY9X2fG2O4l2/XVzQXxpZ7l4jY6wFgbkB3+629/Xypj0j5E//+bsY8NLTWg2SykKkW3LkstzeIWPtkDplqQcAW6F2smF2appmtgjRYvqXFM+g5h8tYdEWKiD64dvv0CQV3mstqALsNxDePN+CHHwK5byJJLxDJaNFxkoClrP9JYDYfN31vxPaYRzPmO5ReJD65o4GlO5S+fwJ6r+Yfw6D/nQAAAABJRU5ErkJggg=='

  export default {
    data() {
      const id1 = `UniMap1_${(Math.random() * 10e5).toString(36)}` as string;
      const id2 = `UniMap2_${(Math.random() * 10e5).toString(36)}` as string;
      const id3 = `UniMap3_${(Math.random() * 10e5).toString(36)}` as string;
      return {
        readyEventName: '',
        optionsEventName: '',
        successEventName: '',
        failEventName: '',
        mapId: id1,
        mapTargetId: id2,
        scrollId: id3,
        isFocus: false,
        latitude: 0,
        longitude: 0,
        locationComplete: false,
        locationLoading: false,
        chooseLocationOptions: {} as ChooseLocationOptions,
        pageIndex: 1,
        pageSize: 20,
        pois: [] as Array<Poi>,
        selected: -1,
        searchValue: "",
        safeArea: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        } as SafeArea,
        icon: {
          target: '\ue683',
          success: '\ue631',
          position: '\ue653',
          search: '\ue7ad'
        } as IconPath,
        lastTime: 0,
        searchLoading: false,
        searchLoadingAnimation: false,
        language: "zh-Hans",
        scrollTop: 0,
        isLandscape: false,
        theme: "light",
        searchValueChangeTimer: -1,
        lastPoi: {
          latitude: null,
          longitude: null,
          selected: -1,
          pois: [] as Array<Poi>,
          scrollTop: 0
        } as LastPoi,
        errMsg: "",
        callUniMapCoErr: false,
        useUniCloud: true,
        mapHeight: 350,
        loadingPath: loadingPath
      }
    },
    onLoad(options : UTSJSONObject) {
      this.checkUniCloud();
      this.initPageOptions(options);
      this.getSystemInfo();
      this.getLocation();
    },
    onReady() {
      this.getSafeAreaInsets()
    },
    onUnload() {
      uni.$off(this.optionsEventName, null);
      uni.$off(this.readyEventName, null);
      uni.$off(this.successEventName, null);
      uni.$off(this.failEventName, null);
      // #ifdef APP-IOS
      __uniappx__nativeEventBus.off(this.optionsEventName, null)
      __uniappx__nativeEventBus.off(this.readyEventName, null)
      __uniappx__nativeEventBus.off(this.successEventName, null)
      __uniappx__nativeEventBus.off(this.failEventName, null)
      // #endif
    },
    onResize() {
      this.getSystemInfo();
    },
    methods: {
      checkUniCloud() {
        if (typeof uniCloud == 'undefined') {
          this.errMsg = "uni.chooseLocation 依赖 uniCloud 的 uni-map-common 插件，请先关联服务空间，并安装 uni-map-common 插件，插件地址：https://ext.dcloud.net.cn/plugin?id=13872";
          this.useUniCloud = false;
          console.error(this.errMsg);
        }
      },
      initPageOptions(options : UTSJSONObject) {
        this.readyEventName = options['readyEventName']! as string;
        this.optionsEventName = options['optionsEventName']! as string;
        this.successEventName = options['successEventName']! as string;
        this.failEventName = options['failEventName']! as string;
        uni.$on(this.optionsEventName, (data : UTSJSONObject) => {
          if (data['latitude'] != null) {
            this.chooseLocationOptions.latitude = data['latitude'] as number;
          }
          if (data['longitude'] != null) {
            this.chooseLocationOptions.longitude = data['longitude'] as number;
          }
          if (data['keyword'] != null) {
            let keyword = data['keyword'] as string;
            this.chooseLocationOptions.keyword = keyword;
            this.searchValue = keyword;
          } else {
            this.chooseLocationOptions.keyword = "";
          }
          if (data['payload'] != null) {
            this.chooseLocationOptions.payload = data['payload'] as UTSJSONObject;
          }
        });
        uni.$emit(this.readyEventName, {});
      },
      getLocation() {
        if (this.chooseLocationOptions.latitude != null && this.chooseLocationOptions.longitude != null) {
          this.latitude = this.chooseLocationOptions.latitude as number;
          this.longitude = this.chooseLocationOptions.longitude as number;
          this.locationComplete = true;
          this.getPoi('getLocation');
        } else {
          this.locationLoading = true;
          uni.getLocation({
            type: 'gcj02',
            success: (res) => {
              this.latitude = res.latitude;
              this.longitude = res.longitude;
              this.locationComplete = true;
              this.locationLoading = false;
              this.getPoi('getLocation');
            },
            fail: (err) => {
              console.error('getLocationErr: ', err)
              this.latitude = defaultPoi.latitude;
              this.longitude = defaultPoi.longitude;
              this.locationComplete = true;
              this.locationLoading = false;
              this.getPoi('getLocation');
            }
          });
        }
      },
      distanceHandle(distance : number) {
        if (distance < 1000) {
          return distance + 'm';
        } else {
          return parseFloat((distance / 1000).toFixed(2)) + 'km';
        }
      },
      poiHandle(pois : Array<UTSJSONObject>) {
        let list = pois.map((item : UTSJSONObject, index : number) => {
          const location = item['location'] as UTSJSONObject;
          let distance = item['distance'] as number;
          let latitude = location['lat'] as number;
          let longitude = location['lng'] as number;
          if (distance == 0) {
            latitude = this.latitude;
            longitude = this.longitude;
          }
          return {
            title: item['title'] as string,
            address: item['address'] as string,
            distance: distance,
            distanceStr: this.distanceHandle(distance),
            location: {
              latitude: latitude,
              longitude: longitude
            },
          } as Poi
        });
        let pageIndex = this.pageIndex as number;
        if (pageIndex == 1) {
          this.pois = list;
          this.updateScrollTop(0);
        } else {
          this.pois = this.pois.concat(list);
        }
      },
      callUniMapCo(action : string, data : UTSJSONObject) : Promise<UTSJSONObject> {
        let promise = new Promise((resolve, reject) => {
          if (this.useUniCloud == false) {
            reject(this.errMsg);
            return;
          }
          this.errMsg = "";
          // #ifdef APP-ANDROID
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
          
          if (this.chooseLocationOptions.payload != null) {
            chooseLocationData['payload'] = this.chooseLocationOptions.payload;
          }
          uniMapCo.chooseLocation(chooseLocationData).then((res : UTSJSONObject) => {
            resolve(res);
          }).catch((err) => {
            if (err instanceof UniCloudError) {
              const cloudError = err as UniCloudError;
              const errCode = cloudError.errCode;
              const errMsg = cloudError.errMsg;
              const errSubject = cloudError.errSubject;
              if (errMsg.indexOf("在云端不存在") > -1 || errMsg.indexOf("未匹配") > -1) {
                this.errMsg = "uni.chooseLocation 依赖 uniCloud 的 uni-map-common 插件，请安装 uni-map-common 插件，插件地址：https://ext.dcloud.net.cn/plugin?id=13872";
                console.error(this.errMsg);
              } else {
                this.errMsg = errMsg;
                console.error("获取POI信息失败，" + JSON.stringify({ errCode, errMsg, errSubject }));
              }
            }
            reject(err);
          });
        });
        promise.then((res) => {
          this.callUniMapCoErr = false;
        })
        .catch((err) => {
          this.callUniMapCoErr = true;
        });
        return promise as Promise<UTSJSONObject>;
      },
      getPoi(type : string) {
        let searchValue = this.searchValue;
        let latitude = this.latitude as number;
        let longitude = this.longitude as number;
        let pageIndex = this.pageIndex as number;
        let pageSize = this.pageSize as number;
        if (['searchValueChange'].indexOf(type) == -1) {
          this.searchLoading = true;
        }
        if (searchValue != "" && searchValue.length > 0) {
          this.callUniMapCo("search", {
            keyword: searchValue,
            location: {
              lat: latitude,
              lng: longitude
            },
            radius: 5000,
            auto_extend: 1,
            orderby: "weight",
            page_index: pageIndex,
            page_size: pageSize,
          }).then((res : UTSJSONObject) => {
            let pois = res.getJSON('result')?.getJSON('result')?.getArray('data') as Array<UTSJSONObject>;
            this.poiHandle(pois);
            this.searchLoading = false;
          }).catch((err) => {
            this.searchLoading = false;
          })
        } else {
          this.callUniMapCo("location2address", {
            location: `${latitude},${longitude}`,
            get_poi: 1,
            poi_options: {
              radius: 3000,
              policy: pageIndex == 1 ? 3 : 4,
              roadlevel: 1,
              homeorcorp: 1,
              page_index: pageIndex,
              page_size: pageSize,
            }
          }).then((res : UTSJSONObject) => {
            let pois = res.getJSON('result')?.getJSON('result')?.getArray('pois') as Array<UTSJSONObject>;
            this.poiHandle(pois);
            if (this.pois.length > 0 && pageIndex == 1) {
              let poi : Poi = this.pois[0];
              if (poi.distance > 0) {
                let poi1 = poi.location;
                let poi2 = {
                  latitude: this.latitude,
                  longitude: this.longitude
                } as PoiLocation;
                let distance = poi.distance as number;
                let direction = this.calcDirection(poi1, poi2);
                if (poi.address.indexOf("米") == -1) {
                  let suffix = `向${direction}${distance}米`;
                  let newPoi = {
                    title: `${poi.title}${suffix}`,
                    address: `${poi.address}${suffix}`,
                    distance: 0,
                    distanceStr: this.distanceHandle(distance),
                    location: poi2
                  } as Poi;
                  this.pois.unshift(newPoi);
                }
              }
              if (this.selected == -1) {
                this.selected = 0;
                this.lastPoi.latitude = this.latitude;
                this.lastPoi.longitude = this.longitude;
                this.lastPoi.selected = this.selected;
                this.lastPoi.pois = this.pois;
              }
            }
            this.searchLoading = false;
          }).catch((err) => {
            this.searchLoading = false;
          })
        }
      },
      calcDirection(poi1 : PoiLocation, poi2 : PoiLocation) : string {
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
      },
      getSafeAreaInsets() {
        const info = uni.getWindowInfo();
        this.safeArea.top = info.safeAreaInsets.top;
        this.safeArea.bottom = info.safeAreaInsets.bottom;
        this.safeArea.left = info.safeAreaInsets.left;
        this.safeArea.right = info.safeAreaInsets.right;
      },
      getSystemInfo() {
        const info = uni.getWindowInfo();
        this.safeArea.top = info.safeAreaInsets.top;
        this.safeArea.bottom = info.safeAreaInsets.bottom;
        this.safeArea.left = info.safeAreaInsets.left;
        this.safeArea.right = info.safeAreaInsets.right;
        let screenHeight = info.screenHeight;
        this.mapHeight = (screenHeight - this.safeArea.top - this.safeArea.bottom) * 0.6;
        const systemInfo = uni.getSystemInfoSync()
        const appLanguage = systemInfo.appLanguage
        this.language = appLanguage
        const osTheme = systemInfo.osTheme
        const appTheme = systemInfo.appTheme
        if (appTheme != null && appTheme != "auto") {
          this.theme = appTheme
        } else if (osTheme != null) {
          this.theme = osTheme
        }
        // #ifdef WEB
        this.isLandscape = systemInfo.windowWidth >= 900 ? true : false;
        const hostTheme = systemInfo.hostTheme
        if (hostTheme != null) {
          this.theme = hostTheme
        }
        const locale = uni.getLocale()
        this.language = locale
        // #endif
        // #ifdef APP
        this.isLandscape = systemInfo.deviceOrientation == 'landscape';
        // #endif
      },
      getMapContext() : MapContext | null {
        return uni.createMapContext(this.mapId, this);
      },
      regionchange(e : UniMapRegionChangeEvent) {
        let causedBy = e.causedBy as string | null;
        // #ifdef WEB
        if (!causedBy) {
          // @ts-expect-error
          causedBy = e.detail.causedBy as string;
        }
        // #endif
        if (e.type !== "end" || causedBy != "drag" || this.locationComplete == false) {
          return;
        }
        const mapContext = this.getMapContext();
        if (mapContext != null) {
          mapContext.getCenterLocation({
            success: (res) => {
              let latitudeDiff = Math.abs(res.latitude - this.latitude);
              let longitudeDiff = Math.abs(res.longitude - this.longitude);
              if (latitudeDiff > 0.000001 || longitudeDiff > 0.000001) {
                this.latitude = parseFloat(res.latitude.toFixed(6));
                this.longitude = parseFloat(res.longitude.toFixed(6));
                this.searchValue = "";
                this.selected = -1;
                this.pageIndex = 1;
                this.getPoi('regionchange');
                const element = this.$refs[this.mapTargetId] as UniElement | null;
                if (element != null) {
                  const duration = 250;
                  element.style.setProperty('transition-duration', `${duration}ms`);
                  element.style.setProperty('transform', 'translateY(0px)');
                  element.style.setProperty('transform', 'translateY(-15px)');
                  setTimeout(() => {
                    element.style.setProperty('transform', 'translateY(0px)');
                  }, duration);
                }
              }
            }
          });
        }
      },
      clearSearchValueChangeTimer() {
        if (this.searchValueChangeTimer != -1) {
          clearTimeout(this.searchValueChangeTimer);
          this.searchValueChangeTimer = -1;
        }
      },
      searchValueChange(e : UniInputEvent) {
        this.clearSearchValueChangeTimer();
        this.searchValueChangeTimer = setTimeout(() => {
          this.poiSearch('searchValueChange');
        }, 200);
      },
      poiSearch(type : string) {
        this.clearSearchValueChangeTimer();
        this.pageIndex = 1;
        this.selected = -1;
        this.getPoi(type);
      },
      cancelSearch() {
        this.isFocus = false;
        this.searchValue = "";
        if (this.lastPoi.latitude != null) {
          this.latitude = this.lastPoi.latitude as number;
        }
        if (this.lastPoi.longitude != null) {
          this.longitude = this.lastPoi.longitude as number;
        }
        if ((this.lastPoi.pois.length - 1) > this.lastPoi.selected) {
          this.pois = this.lastPoi.pois;
          this.selected = this.lastPoi.selected;
          this.updateScrollTop(this.lastPoi.scrollTop as number);
        } else {
          this.poiSearch('cancelSearch');
        }
      },
      updateScrollTop(scrollTop : number) {
        setTimeout(() => {
          this.scrollTop = scrollTop;
        }, 10);
      },
      selectPoi(item : Poi, index : number) {
        this.isFocus = false;
        this.selected = index;
        this.latitude = item.location.latitude;
        this.longitude = item.location.longitude;
        if (this.searchValue == this.chooseLocationOptions.keyword) {
          this.lastPoi.latitude = this.latitude as number;
          this.lastPoi.longitude = this.longitude as number;
          this.lastPoi.selected = this.selected;
          this.lastPoi.pois = this.pois;
          const scrollElement = this.$refs[this.scrollId] as UniScrollViewElement | null;
          if (scrollElement != null) {
            const scrollTop = scrollElement.scrollTop as number;
            this.lastPoi.scrollTop = scrollTop;
            this.scrollTop = scrollTop;
          }
        }
      },
      scrolltolower() {
        this.pageIndex++;
        this.getPoi('scrolltolower');
      },
      mapReset() {
        this.isFocus = false;
        this.pageIndex = 1;
        this.getLocation();
      },
      closeDialogPage() {
        // #ifdef APP-ANDROID
        uni.closeDialogPage({
          dialogPage: this.$page,
          animationType: 'zoom-fade-out',
        } as io.dcloud.uniapp.framework.extapi.CloseDialogPageOptions)
        // #endif
        // #ifndef APP-ANDROID
        uni.closeDialogPage({
          dialogPage: this.$page,
          // #ifdef APP-IOS
          animationType: 'zoom-fade-out',
          // #endif
        })
        // #endif
      },
      back() {
        uni.$emit(this.failEventName, 1);
        this.closeDialogPage();
      },
      confirm() {
        if (this.selected < 0) {
          if (this.callUniMapCoErr) {
            uni.$emit(this.successEventName, {
              name: "",
              address: "",
              latitude: parseFloat(this.latitude.toFixed(6)),
              longitude: parseFloat(this.longitude.toFixed(6))
            });
            this.closeDialogPage();
          }
          return;
        }
        let item = this.pois[this.selected];
        let res = {
          name: item.title,
          address: item.address,
          latitude: item.location.latitude,
          longitude: item.location.longitude
        };
        uni.$emit(this.successEventName, res);
        this.closeDialogPage();
      }
    },
    watch: {
      searchLoading(val : boolean) {
        if (val) {
          setTimeout(() => {
            this.searchLoadingAnimation = true;
          }, 50);
        } else {
          this.searchLoadingAnimation = false;
        }
      }
    },
    computed: {
      languageCom() : UTSJSONObject {
        const textInfo = languageData[this.language] != null ? languageData[this.language] as UTSJSONObject : languageData['zh-Hans'] as UTSJSONObject;
        return textInfo;
      },
      uniChooseLocationClassCom() : string {
        let list = [] as Array<string>;
        if (this.theme == 'dark') {
          list.push('uni-choose-location-dark');
        } else {
          list.push('uni-choose-location-light');
        }
        return list.join(' ');
      },
      landscapeClassCom() : string {
        return this.isLandscape ? 'uni-choose-location-landscape' : 'uni-choose-location-vertical';
      },
      mapBoxStyleCom() : string {
        let list = [] as Array<string>;
        if (!this.useUniCloud) {
          list.push(`flex: 1;`);
        }
        if (!this.isLandscape) {
          let top = this.isFocus ? (300 - this.mapHeight) / 2 : 0;
          list.push(`transform:translateY(${top}px);`);
          list.push(`height:${this.mapHeight}px;`);
        }
        return list.join('');
      },
      poiBoxStyleCom() : string {
        let list = [] as Array<string>;
        if (!this.isLandscape) {
          let top = this.isFocus ? 300 : this.mapHeight;
          list.push(`top:${top}px;`);
        }
        return list.join('');
      },
      resetStyleCom() : string {
        let list = [] as Array<string>;
        if (!this.isLandscape) {
          let bottom = this.isFocus ? (this.mapHeight - 300) / 2 + 300 - this.mapHeight : 0;
          list.push(`transform:translateY(${bottom}px);`);
        }
        return list.join('');
      },
    }
  }
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

  .uni-choose-location-nav-btn.uni-choose-location-nav-confirm-btn .uni-choose-location-nav-confirm-text {
    background-color: #007aff;
    border-radius: 5px;
  }

  .uni-choose-location-nav-btn.uni-choose-location-nav-confirm-btn.active:active {
    opacity: 0.7;
  }

  .uni-choose-location-nav-btn.uni-choose-location-nav-confirm-btn.disable {
    opacity: 0.4;
  }

  .uni-choose-location-nav-btn.uni-choose-location-nav-back-btn .uni-choose-location-nav-back-text {
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
    text-align: center;
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
  
  .uni-choose-location-poi-search-loading-start {
    transform: rotate(60000deg)
  }
  
  .uni-choose-location-poi-search-loading-image {
    width: 28px;
    height: 28px;
    transition-property: transform;
    transition-duration: 120s;
    transition-timing-function: linear;
  }

  /* 横屏样式开始 */

  .uni-choose-location .uni-choose-location-map-box.uni-choose-location-landscape {
    height: 100%;
  }

  .uni-choose-location .uni-choose-location-poi.uni-choose-location-landscape {
    position: absolute;
    top: 80px;
    right: 25px;
    width: 300px;
    bottom: 20px;
    max-height: 600px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .3);
    border-radius: 5px;
  }

  .uni-choose-location .uni-choose-location-map-reset.uni-choose-location-landscape {
    left: 40px;
    bottom: 40px;
  }

  .uni-choose-location .uni-choose-location-poi-item.uni-choose-location-landscape {
    padding: 10px;
  }

  .uni-choose-location .uni-choose-location-nav-btn.uni-choose-location-landscape {
    top: 10px;
    left: 20px;
  }

  .uni-choose-location .uni-choose-location-nav-btn.uni-choose-location-nav-confirm-btn.uni-choose-location-landscape {
    left: auto;
    right: 20px;
  }

  /* 横屏样式结束 */

  /* 暗黑模式样式开始 */

  .uni-choose-location-dark .uni-choose-location-map-reset {
    background-color: #111111;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, .3);
  }

  .uni-choose-location-dark .uni-choose-location-poi-search-box {
    background-color: #111111;
  }

  .uni-choose-location-dark .uni-choose-location-search-icon {
    color: #d1d1d1;
  }

  .uni-choose-location-dark .uni-choose-location-poi-search-loading-text {
    color: #d1d1d1;
  }

  .uni-choose-location-dark .uni-choose-location-poi-search {
    background-color: #181818
  }

  .uni-choose-location-dark .uni-choose-location-poi-search-input {
    background: #111111;
    color: #d1d1d1;
  }

  .uni-choose-location-dark .uni-choose-location-poi-item-title-text {
    color: #d1d1d1;
  }

  .uni-choose-location-dark .uni-choose-location-poi-item-detail-text {
    color: #595959;
  }

  .uni-choose-location-dark .uni-choose-location-poi {
    background-color: #181818
  }

  .uni-choose-location-dark .uni-choose-location-poi-item-after {
    border-bottom: 1px solid #1e1e1e;
  }

  .uni-choose-location-dark .uni-choose-location-map-reset-icon {
    color: #d1d1d1;
  }
  
  .uni-choose-location-dark .uni-choose-location-poi-search-error-text {
    color: #d1d1d1;
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
    background-repeat:no-repeat;
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
