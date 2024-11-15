<template>
  <view class="uni-choose-location" :class="uniChooseLocationClassCom">
    <view class="uni-choose-location-map-box" :class="[landscapeClassCom]">
      <map class="uni-choose-location-map" :id="mapId" :ref="mapId" :latitude="latitude" :longitude="longitude" :layer-style="theme == 'dark' ? '2' : '1'" :show-compass="false"
        :enable-zoom="true" :enable-scroll="true" :enable-rotate="false" :enable-poi="true" :show-location="true" @regionchange="regionchange">
      </map>
      <view class="uni-choose-location-map-target" :ref="mapTargetId" :id="mapTargetId">
        <text class="uni-choose-location-icons uni-choose-location-map-target-icon">{{ icon.target }}</text>
      </view>
      <view class="uni-choose-location-map-reset" :class="[landscapeClassCom]" @click="mapReset">
        <text class="uni-choose-location-icons uni-choose-location-map-reset-icon">{{ icon.position }}</text>
      </view>
    </view>
    <view class="uni-choose-location-nav" :style="'height:' + (60 + safeArea.top) + 'px;'">
      <view class="uni-choose-location-nav-btn uni-choose-location-nav-back-btn" :class="[landscapeClassCom]" :style="safeArea.top > 0 ? 'top: ' + safeArea.top + 'px;' : ''"><text
          class="uni-choose-location-nav-text uni-choose-location-nav-back-text" @click="back">{{ languageCom['back'] }}</text></view>
      <view class="uni-choose-location-nav-btn uni-choose-location-nav-confirm-btn" :class="[landscapeClassCom,selected < 0 ? 'disable' : 'active']"
        :style="safeArea.top > 0 ? 'top: ' + safeArea.top + 'px;' : ''" @click="confirm">
        <text class="uni-choose-location-nav-text uni-choose-location-nav-confirm-text">{{ languageCom['ok'] }}</text>
      </view>
    </view>
    <view class="uni-choose-location-poi" :class="[landscapeClassCom]">
      <view class="uni-choose-location-poi-search">
        <view class="uni-choose-location-poi-search-box">
          <text class="uni-choose-location-icons uni-choose-location-search-icon" v-if="isFocus || searchValue != ''">{{ icon.search }}</text>
          <input v-model="searchValue" type="text" :placeholder="(isFocus ? '' : '\ue7ad') + ' '+ languageCom['search'] "
            class="uni-choose-location-poi-search-input uni-choose-location-icons" :placeholder-style="(isFocus || searchValue != '') ? 'text-align: left;' : 'text-align: center;'"
            @focus="isFocus=true" @confirm="poiSearch('poiSearch')" @input="searchValueChange" />
        </view>
        <text class="uni-choose-location-poi-search-cancel" v-if="isFocus || searchValue != ''" @click="cancelSearch">{{ languageCom['cancel'] }}</text>
      </view>
      <scroll-view :id="scrollId" :ref="scrollId" :scroll-with-animation="false" direction="vertical" :scroll-top="scrollTop" :lower-threshold="500" @scrolltolower="scrolltolower"
        class="uni-choose-location-poi-list">
        <view class="uni-choose-location-poi-search-error" v-if="errMsg != ''"><text class="uni-choose-location-poi-search-error-text">{{ errMsg }}</text></view>
        <view class="uni-choose-location-poi-search-loading" v-else-if="locationLoading"><text
            class="uni-choose-location-poi-search-loading-text">{{ languageCom['locationLoading'] }}</text></view>
        <view class="uni-choose-location-poi-search-loading" v-else-if="searchLoading && pageIndex == 1"><text
            class="uni-choose-location-poi-search-loading-text">{{ languageCom['loading'] }}</text></view>
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
        <view class="uni-choose-location-poi-search-loading" v-if="searchLoading && pageIndex > 1"><text
            class="uni-choose-location-poi-search-loading-text">{{ languageCom['loading'] }}</text></view>
      </scroll-view>
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
    distance ?: number,
    distanceStr ?: string,
    location : PoiLocation
  }

  type AafeArea = {
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
      "back": "cancel",
      "ok": "ok",
      "cancel": "cancel",
      "loading": "loading...",
      "locationLoading": "positioning...",
      "search": "Search location",
      "current-location": "current location"
    },
    "zh-Hans": {
      "back": "取消",
      "ok": "确定",
      "cancel": "取消",
      "loading": "请求中...",
      "locationLoading": "获取定位中...",
      "search": "搜索地点",
      "current-location": "当前位置"
    },
    "zh-Hant": {
      "back": "取消",
      "ok": "確定",
      "cancel": "取消",
      "loading": "請求中...",
      "locationLoading": "獲取定位中...",
      "search": "蒐索地點",
      "current-location": "當前位置"
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
        } as AafeArea,
        icon: {
          target: '\ue683',
          success: '\ue631',
          position: '\ue653',
          search: '\ue7ad'
        } as IconPath,
        lastTime: 0,
        searchLoading: false,
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
        errMsg: ""
      }
    },
    onLoad(options : UTSJSONObject) {
      this.initPageOptions(options);
      this.getSystemInfo();
      this.getLocation();
    },
    onReady() {

    },
    onUnload() {
      uni.$off(this.optionsEventName, null);
      uni.$off(this.readyEventName, null);
      uni.$off(this.successEventName, null);
      uni.$off(this.failEventName, null);
    },
    onResize() {
      const systemInfo = uni.getSystemInfoSync();
      this.isLandscape = systemInfo.deviceOrientation == 'landscape';
    },
    methods: {
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
          return {
            title: item['title'] as string,
            address: item['address'] as string,
            distance: item['distance'] as number,
            distanceStr: this.distanceHandle(item['distance'] as number),
            location: {
              latitude: location['lat'] as number,
              longitude: location['lng'] as number
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
        return new Promise((resolve, reject) => {
          this.errMsg = "";
          if (typeof uniCloud == 'undefined') {
            this.errMsg = "uni.chooseLocation 依赖 uniCloud 的 uni-map-common 插件，请先关联服务空间，并安装 uni-map-common 插件，插件地址：https://ext.dcloud.net.cn/plugin?id=13872";
            console.error(this.errMsg);
            reject({
              errCode: -1,
              errMsg: '请先关联服务空间'
            });
          }
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
          uniMapCo.chooseLocation({
            action: action,
            data: data
          }).then((res : UTSJSONObject) => {
            resolve(res);
          }).catch((err) => {
            if (err instanceof UniCloudError) {
              const errCode = (err as UniCloudError).errCode;
              const errMsg = (err as UniCloudError).errMsg;
              if (errMsg.indexOf("在云端不存在") > -1 || errMsg.indexOf("未匹配") > -1) {
                this.errMsg = "uni.chooseLocation 依赖 uniCloud 的 uni-map-common 插件，请安装 uni-map-common 插件，插件地址：https://ext.dcloud.net.cn/plugin?id=13872";
                console.error(this.errMsg);
              } else {
                console.error("获取POI信息失败，" + JSON.stringify({errCode, errMsg}));
              }
            }
            reject(err);
          });
        });
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
              radius: 5000,
              policy: 4,
              roadlevel: 1,
              homeorcorp: 1,
              page_index: pageIndex,
              page_size: pageSize,
            }
          }).then((res : UTSJSONObject) => {
            let pois = res.getJSON('result')?.getJSON('result')?.getArray('pois') as Array<UTSJSONObject>;
            let formatted_addresses = res.getJSON('result')?.getJSON('result')?.getString('formatted_addresses') as string;
            let street = res.getJSON('result')?.getJSON('result')?.getString('street') as string;
            let street_number = res.getJSON('result')?.getJSON('result')?.getString('street_number') as string;
            let title = street_number != '' ? street_number : street;
            pois.unshift({
              title: title,
              address: formatted_addresses,
              distance: 0,
              location: {
                lat: latitude,
                lng: longitude
              }
            });
            this.poiHandle(pois);
            if (this.selected == -1) {
              this.selected = 0;
            }
            this.searchLoading = false;
          }).catch((err) => {
            this.searchLoading = false;
          })
        }
      },
      getSystemInfo() {
        const info = uni.getWindowInfo();
        this.safeArea.top = info.safeAreaInsets.top;
        this.safeArea.bottom = info.safeAreaInsets.bottom;
        this.safeArea.left = info.safeAreaInsets.left;
        this.safeArea.right = info.safeAreaInsets.right;

        const systemInfo = uni.getSystemInfoSync()
        // const osLanguage = systemInfo.osLanguage
        const appLanguage = systemInfo.appLanguage
        this.language = appLanguage
        const osTheme = systemInfo.osTheme
        const appTheme = systemInfo.appTheme
        if (appTheme != null) {
          this.theme = appTheme
        } else if (osTheme != null) {
          this.theme = osTheme
        }
        this.isLandscape = systemInfo.deviceOrientation == 'landscape'
        // #ifdef WEB
        const hostTheme = systemInfo.hostTheme
        if (hostTheme != null) {
          this.theme = hostTheme
        }
        const locale = uni.getLocale()
        this.language = locale
        uni.onLocaleChange((res) => {
          if (res.locale) {
            this.language = res.locale
          }
        })
        uni.onThemeChange((res) => {
          this.theme = res.theme
        });
        // #endif
        // #ifdef APP
        uni.onAppThemeChange((res : AppThemeChangeResult) => {
          this.theme = res.appTheme
        })
        uni.onOsThemeChange((res : OsThemeChangeResult) => {
          this.theme = res.osTheme
        })
        // #endif
      },
      getMapContext() : MapContext | null {
        return uni.createMapContext(this.mapId, this);
      },
      regionchange(e : UniMapRegionChangeEvent) {
        let causedBy = e.causedBy as string | null;
        // #ifdef WEB
        if (!causedBy) {
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
              if (latitudeDiff > 0.00001 && longitudeDiff > 0.00001) {
                this.latitude = res.latitude;
                this.longitude = res.longitude;
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
        this.pageIndex = 1;
        this.getLocation();
      },
      closeDialogPage() {
        // #ifdef APP-ANDROID
        uni.closeDialogPage({
          dialogPage: this.$page,
          //animationType: 'zoom-fade-out',
        } as io.dcloud.uniapp.framework.extapi.CloseDialogPageOptions)
        // #endif
        // #ifndef APP-ANDROID
        uni.closeDialogPage({
          dialogPage: this.$page,
        })
        // #endif
      },
      back() {
        uni.$emit(this.failEventName, {});
        this.closeDialogPage();
      },
      confirm() {
        if (this.selected < 0) {
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
        return this.isLandscape ? 'uni-choose-location-landscape' : '';
      }
    }
  }
</script>

<style>
  @font-face {
    font-family: UniChooseLocationFontFamily;
    src: url('data:font/ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwR1NVQiCLJXoAAAE4AAAAVE9TLzI8Rkp9AAABjAAAAGBjbWFw0euemwAAAgAAAAGyZ2x5ZuBfKy8AAAPAAAACtGhlYWQpySFOAAAA4AAAADZoaGVhB94DhgAAALwAAAAkaG10eBQAAAAAAAHsAAAAFGxvY2EBUAHAAAADtAAAAAxtYXhwARIAfQAAARgAAAAgbmFtZUTMSfwAAAZ0AAADS3Bvc3RLRtf0AAAJwAAAAFIAAQAAA4D/gABcBAAAAAAABAAAAQAAAAAAAAAAAAAAAAAAAAUAAQAAAAEAAI/TJ/hfDzz1AAsEAAAAAADjVO6oAAAAAONU7qgAAP+ABAADgQAAAAgAAgAAAAAAAAABAAAABQBxAAMAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAEAAAAKADAAPgACREZMVAAObGF0bgAaAAQAAAAAAAAAAQAAAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAQEAAGQAAUAAAKJAswAAACPAokCzAAAAesAMgEIAAACAAUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBmRWQAwOYx560DgP+AAAAD3ACAAAAAAQAAAAAAAAAAAAAAAAACBAAAAAQAAAAEAAAABAAAAAQAAAAAAAAFAAAAAwAAACwAAAAEAAABcgABAAAAAABsAAMAAQAAACwAAwAKAAABcgAEAEAAAAAKAAgAAgAC5jHmU+aD563//wAA5jHmU+aD563//wAAAAAAAAAAAAEACgAKAAoACgAAAAIAAwAEAAEAAAEGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAEAAAAAAAAAABAAA5jEAAOYxAAAAAgAA5lMAAOZTAAAAAwAA5oMAAOaDAAAABAAA560AAOetAAAAAQAAAAAAAABIAGYBCAFaAAIAAP/SA4cDNgAdACoAACUGBwYnLgEnJjc+ATc2Fx4BFxYHBgcXHgEOAiYnJTI+ATQuASIOARQeAQJlSFdVT1FsDQwdHodWU1JTeBQUFhc+7AUFBAsPEAX+T0uASkqAln9LS3/MMwkIICKLV1RQUnMQEBoagVZTUlU+7AYPDwsEBAbrSoCWf0tLf5aASgAAAAEAAAAAA8ACyAANAAATNwU3Njc2NxcHBgcGB0A5AQdAVGaPnxdXbWuWfAGPN986TFl8hTpVbG6aiQAAAAMAAP+ABAADgQAzAGcAcAAAAQYHBgcGBxUUBi4BPQEmJyYnJicjIiY+ATsBNjc2NzY3NTQ2MhYdARYXFhcWFzM2HgEGKwIiJj4BOwEmJyYnJicVFAYiJj0BBgcGBwYHMzYeAQYrARYXFhcWFzU0Nh4BHQE2NzY3NiUiJjQ2MhYUBgOyBjk3WlxtDxUPbF1aNzgGNAsPAQ4LNAY4N1pdbA8VD21cWjc5BjMLDwEPC2eaCg8BDgqaBjIwT1BfDxUPXlFOMTEGmAsPAQ8LmQYxMU5RXhAVDl9QTzAy/ocWHR0rHh4BZmxdWjc4BzMLDwEOCzMHODdaXWwQFA9tXFo3OQY0ChAOCzUGOTdaXG0BDxUQEBQPX1BPMDEHmQsODwqZBzEwT1BfAQ8VEF5RTjExBpgLDwEOC5gGMTFOUUUdKx4eKx0AAAMAAP+BAyoDfgAIACYAMwAABRQWMjY0JiIGExEUBisBIiY1ES4BJyY1NDc2NzYyFxYXFhUUBw4BAQYeAj4BLgMOAQHAJTUmJjUlagYEQAQHR3UhIiknREWiRUQnKSIhdf7lAitPXFAuAS1LW00vVBIZGSMZGQFx/ogEBgYEAXgKUz9BSVFFRCcpKSdERVFJQT9TAR0uUTACLk9cTC0CK0sAAAAAAAASAN4AAQAAAAAAAAATAAAAAQAAAAAAAQAbABMAAQAAAAAAAgAHAC4AAQAAAAAAAwAbADUAAQAAAAAABAAbAFAAAQAAAAAABQALAGsAAQAAAAAABgAbAHYAAQAAAAAACgArAJEAAQAAAAAACwATALwAAwABBAkAAAAmAM8AAwABBAkAAQA2APUAAwABBAkAAgAOASsAAwABBAkAAwA2ATkAAwABBAkABAA2AW8AAwABBAkABQAWAaUAAwABBAkABgA2AbsAAwABBAkACgBWAfEAAwABBAkACwAmAkdDcmVhdGVkIGJ5IGljb25mb250VW5pQ2hvb3NlTG9jYXRpb25Gb250RmFtaWx5UmVndWxhclVuaUNob29zZUxvY2F0aW9uRm9udEZhbWlseVVuaUNob29zZUxvY2F0aW9uRm9udEZhbWlseVZlcnNpb24gMS4wVW5pQ2hvb3NlTG9jYXRpb25Gb250RmFtaWx5R2VuZXJhdGVkIGJ5IHN2ZzJ0dGYgZnJvbSBGb250ZWxsbyBwcm9qZWN0Lmh0dHA6Ly9mb250ZWxsby5jb20AQwByAGUAYQB0AGUAZAAgAGIAeQAgAGkAYwBvAG4AZgBvAG4AdABVAG4AaQBDAGgAbwBvAHMAZQBMAG8AYwBhAHQAaQBvAG4ARgBvAG4AdABGAGEAbQBpAGwAeQBSAGUAZwB1AGwAYQByAFUAbgBpAEMAaABvAG8AcwBlAEwAbwBjAGEAdABpAG8AbgBGAG8AbgB0AEYAYQBtAGkAbAB5AFUAbgBpAEMAaABvAG8AcwBlAEwAbwBjAGEAdABpAG8AbgBGAG8AbgB0AEYAYQBtAGkAbAB5AFYAZQByAHMAaQBvAG4AIAAxAC4AMABVAG4AaQBDAGgAbwBvAHMAZQBMAG8AYwBhAHQAaQBvAG4ARgBvAG4AdABGAGEAbQBpAGwAeQBHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAAIAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQECAQMBBAEFAQYABnNvdXN1bwdnb3V4dWFuB2Rpbmd3ZWkLZGl0dS10dWRpbmcAAAAA') format('truetype');
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
    width: 100%;
    height: 350px;
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
    /* left: auto; */
    width: 100%;
    bottom: 0;
    background-color: #fff;
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

  .uni-choose-location-dark .uni-choose-location-map-reset {
    background-color: #111111;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, .3);
  }

  .uni-choose-location-dark .uni-choose-location-poi-search-box {
    background-color: #181818;
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

  .uni-choose-location .uni-choose-location-map-box.uni-choose-location-landscape {
    height: 100%;
  }

  .uni-choose-location .uni-choose-location-poi.uni-choose-location-landscape {
    top: 80px;
    /* left: auto; */
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


  /* #ifdef WEB */
  @media screen and (min-width: 900px) {
    .uni-choose-location .uni-choose-location-map-box {
      height: 100%;
    }

    .uni-choose-location .uni-choose-location-poi {
      top: 75px;
      left: auto;
      right: 25px;
      width: 300px;
      bottom: 20px;
      max-height: 600px;
      box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .3);
      border-radius: 5px;
    }

    .uni-choose-location .uni-choose-location-poi-item {
      cursor: pointer;
      padding: 10px;
    }

    .uni-choose-location .uni-choose-location-nav-btn {
      top: 10px;
      left: 20px;
    }

    .uni-choose-location .uni-choose-location-nav-btn.uni-choose-location-nav-confirm-btn {
      left: auto;
      right: 20px;
    }
  }

  /* #endif */
</style>
