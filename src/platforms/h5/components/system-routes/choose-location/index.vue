<template>
  <div class="uni-system-choose-location">
    <v-uni-map
      :latitude="latitude"
      :longitude="longitude"
      class="map"
      show-location
      :libraries="['places']"
      @updated="getList"
      @regionchange="onRegionChange"
    >
      <div
        class="map-location"
        :style="locationStyle"
      />
      <div
        class="map-move"
        @click="moveToLocation"
      >
        <i>&#xec32;</i>
      </div>
    </v-uni-map>
    <div class="nav">
      <div
        class="nav-btn back"
        @click="back"
      >
        <i class="uni-btn-icon">&#xe650;</i>
      </div>
      <div
        class="nav-btn confirm"
        :class="{ disable: !selected }"
        @click="choose"
      >
        <i class="uni-btn-icon">&#xe651;</i>
      </div>
    </div>
    <div class="menu">
      <div class="search">
        <v-uni-input
          v-model="keyword"
          class="search-input"
          :placeholder="$$t('uni.chooseLocation.search')"
          @focus="searching = true"
          @input="input"
        />
        <div
          v-if="searching"
          class="search-btn"
          @click="
            searching = false;
            keyword = '';
          "
        >
          {{ $$t("uni.chooseLocation.cancel") }}
        </div>
      </div>
      <v-uni-scroll-view
        scroll-y
        class="list"
        @scrolltolower="loadMore"
      >
        <div
          v-if="loading"
          class="list-loading"
        >
          <i class="uni-loading" />
        </div>
        <div
          v-for="(item, index) in list"
          :key="index"
          class="list-item"
          :class="{ selected: selectedIndex === index }"
          @click="
            selectedIndex = index;
            latitude = item.latitude;
            longitude = item.longitude;
          "
        >
          <div class="list-item-title">
            {{ item.name }}
          </div>
          <div class="list-item-detail">
            {{ item.distance | distance }}{{ item.address }}
          </div>
        </div>
      </v-uni-scroll-view>
    </div>
  </div>
</template>
<script>
import {
  debounce
} from 'uni-shared'
import {
  getJSONP
} from '../../../helpers/get-jsonp'
import {
  i18nMixin
} from 'uni-core/helpers/i18n'
import {
  ICON_PATH_TARGET,
  MapType,
  getMapInfo
} from '../../../helpers/location'

export default {
  name: 'SystemChooseLocation',
  filters: {
    distance (distance) {
      if (distance > 100) {
        return `${distance > 1000 ? (distance / 1000).toFixed(1) + 'k' : distance.toFixed(0)}m | `
      } else if (distance > 0) {
        return '<100m | '
      } else {
        return ''
      }
    }
  },
  mixins: [i18nMixin],
  data () {
    const {
      latitude,
      longitude
    } = this.$route.query
    return {
      latitude: latitude,
      longitude: longitude,
      pageSize: 20,
      pageIndex: 1,
      hasNextPage: true,
      nextPage: null,
      selectedIndex: -1,
      list: [],
      keyword: '',
      searching: false,
      loading: true,
      adcode: '',
      locationStyle: `background-image: url("${ICON_PATH_TARGET}")`
    }
  },
  computed: {
    selected () {
      return this.list[this.selectedIndex]
    },
    boundary () {
      return this.adcode ? `region(${this.adcode},1,${this.latitude},${this.longitude})` : `nearby(${this.latitude},${this.longitude},5000)`
    }
  },
  created () {
    if (!this.latitude || !this.longitude) {
      this.moveToLocation()
    }
    this.search = debounce(() => {
      this.reset()
      if (this.keyword) {
        this.getList()
      }
    }, 1000)
    this.$watch('searching', val => {
      this.reset()
      if (!val) {
        this.getList()
      }
    })
  },
  methods: {
    choose () {
      if (this.selected) {
        UniViewJSBridge.publishHandler('onChooseLocation', Object.assign({}, this.selected))
        getApp().$router.back()
      }
    },
    back () {
      UniViewJSBridge.publishHandler('onChooseLocation', null)
      getApp().$router.back()
    },
    moveToLocation () {
      uni.getLocation({
        type: 'gcj02',
        success: this.move.bind(this),
        fail: () => {
          // this.move({
          //   latitude: 39.90960456049752,
          //   longitude: 116.3972282409668
          // })
        }
      })
    },
    onRegionChange ({ detail: { centerLocation } }) {
      if (centerLocation) {
        // TODO 图钉 icon 动画
        this.move(centerLocation)
      }
    },
    pushData (array) {
      array.forEach(item => {
        this.list.push({
          name: item.title,
          address: item.address,
          distance: item._distance,
          latitude: item.location.lat,
          longitude: item.location.lng
        })
      })
    },
    getList () {
      this.loading = true
      const mapInfo = getMapInfo()
      if (mapInfo.type === MapType.GOOGLE) {
        if (this.pageIndex > 1 && this.nextPage) {
          this.nextPage()
          return
        }
        const service = new window.google.maps.places.PlacesService(document.createElement('div'))
        service[this.searching ? 'textSearch' : 'nearbySearch']({
          location: {
            lat: this.latitude,
            lng: this.longitude
          },
          query: this.keyword,
          radius: 5000
        }, (results, state, page) => {
          this.loading = false
          if (results && results.length) {
            results.forEach((item) => {
              this.list.push({
                name: item.name || '',
                address: item.vicinity || item.formatted_address || '',
                distance: 0,
                latitude: item.geometry.location.lat(),
                longitude: item.geometry.location.lng()
              })
            })
          }
          if (page) {
            if (!page.hasNextPage) {
              this.hasNextPage = false
            } else {
              this.nextPage = () => {
                page.nextPage()
              }
            }
          }
        })
      } else if (mapInfo.type === MapType.QQ) {
        const url = this.searching ? `https://apis.map.qq.com/ws/place/v1/search?output=jsonp&key=${mapInfo.key}&boundary=${this.boundary}&keyword=${this.keyword}&page_size=${this.pageSize}&page_index=${this.pageIndex}` : `https://apis.map.qq.com/ws/geocoder/v1/?output=jsonp&key=${mapInfo.key}&location=${this.latitude},${this.longitude}&get_poi=1&poi_options=page_size=${this.pageSize};page_index=${this.pageIndex}`
        // TODO 列表加载失败提示
        getJSONP(url, {
          callback: 'callback'
        }, (res) => {
          this.loading = false
          if (this.searching && 'data' in res && res.data.length) {
            this.pushData(res.data)
          } else if ('result' in res) {
            const result = res.result
            this.adcode = result.ad_info ? result.ad_info.adcode : ''
            if (result.pois) {
              this.pushData(result.pois)
            }
            if (this.list.length === this.pageSize * this.pageIndex) {
              this.hasNextPage = false
            }
          }
        }, () => {
          this.loading = false
        })
      }
    },
    loadMore () {
      if (!this.loading && this.hasNextPage) {
        this.pageIndex++
        this.getList()
      }
    },
    reset () {
      this.selectedIndex = -1
      this.pageIndex = 1
      this.hasNextPage = true
      this.nextPage = null
      this.list = []
    },
    move ({ latitude, longitude }) {
      this.latitude = latitude
      this.longitude = longitude
      if (!this.searching) {
        this.reset()
        this.getList()
      }
    },
    input () {
      this.search()
    }
  }
}
</script>
<style>
@font-face {
  font-weight: normal;
  font-style: normal;
  font-family: "unimapbtn";
  src: url("data:application/octet-stream;base64,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")
    format("truetype");
}

.uni-system-choose-location {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #f8f8f8;
}

.uni-system-choose-location .map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
}

.uni-system-choose-location .map-location {
  position: absolute;
  left: 50%;
  bottom: 50%;
  width: 32px;
  height: 52px;
  margin-left: -16px;
  cursor: pointer;
  background-size: 100%;
}

.uni-system-choose-location .map-move {
  position: absolute;
  bottom: 50px;
  right: 10px;
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  background-color: white;
  border-radius: 50%;
  pointer-events: auto;
  cursor: pointer;
  box-shadow: 0px 0 5px 1px rgba(0, 0, 0, 0.3);
}

.uni-system-choose-location .map-move > i {
  display: block;
  width: 100%;
  height: 100%;
  font: normal normal normal 14px/1 "unimapbtn";
  line-height: inherit;
  text-align: center;
  font-size: 24px;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

.uni-system-choose-location .nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  background-color: transparent;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0)
  );
}

.uni-system-choose-location .nav-btn {
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 60px;
  height: 44px;
  padding: 6px;
  line-height: 32px;
  font-size: 26px;
  color: white;
  text-align: center;
  cursor: pointer;
}

.uni-system-choose-location .nav-btn.confirm {
  left: auto;
  right: 0;
}

.uni-system-choose-location .nav-btn.disable {
  opacity: 0.4;
}

.uni-system-choose-location .nav-btn > .uni-btn-icon {
  display: block;
  width: 100%;
  height: 100%;
  line-height: inherit;
  border-radius: 2px;
}

.uni-system-choose-location .nav-btn.confirm > .uni-btn-icon {
  background-color: #007aff;
}

.uni-system-choose-location .menu {
  position: absolute;
  top: 300px;
  left: 0;
  width: 100%;
  bottom: 0;
  background-color: white;
}

.uni-system-choose-location .search {
  display: flex;
  flex-direction: row;
  height: 50px;
  padding: 8px;
  line-height: 34px;
  box-sizing: border-box;
  background-color: white;
}

.uni-system-choose-location .search-input {
  flex: 1;
  height: 100%;
  border-radius: 5px;
  padding: 0 5px;
  background: #ebebeb;
}

.uni-system-choose-location .search-btn {
  margin-left: 5px;
  color: #007aff;
  font-size: 17px;
  text-align: center;
}

.uni-system-choose-location .list {
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  bottom: 0;
  padding-bottom: 10px;
  /* background-color: #f6f6f6; */
}

.uni-system-choose-location .list-loading {
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
}

.uni-system-choose-location .list-item {
  position: relative;
  padding: 10px;
  padding-right: 40px;
  cursor: pointer;
}

.uni-system-choose-location .list-item.selected::before {
  position: absolute;
  top: 50%;
  right: 10px;
  width: 30px;
  height: 30px;
  margin-top: -15px;
  text-align: center;
  content: "\e651";
  font: normal normal normal 14px/1 "unibtn";
  font-size: 24px;
  line-height: 30px;
  color: #007aff;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

.uni-system-choose-location .list-item:not(:last-child)::after {
  position: absolute;
  content: "";
  height: 1px;
  left: 10px;
  bottom: 0;
  width: 100%;
  background-color: #d3d3d3;
}

.uni-system-choose-location .list-item-title {
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.uni-system-choose-location .list-item-detail {
  font-size: 12px;
  color: #808080;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@media screen and (min-width: 800px) {
  .uni-system-choose-location .map {
    top: 0;
    height: 100%;
  }
  .uni-system-choose-location .map-move {
    bottom: 10px;
    right: 320px;
  }
  .uni-system-choose-location .menu {
    top: 54px;
    left: auto;
    right: 10px;
    width: 300px;
    bottom: 10px;
    max-height: 600px;
    box-shadow: 0px 0 20px 5px rgba(0, 0, 0, 0.3);
  }
}
</style>
