<template>
  <div class="uni-system-choose-location">
    <v-uni-map
      v-if="latitude"
      :latitude="latitude"
      :longitude="longitude"
      class="map"
      show-location
      @regionchange="_regionchange"
    >
      <div class="map-location" />
      <div
        class="map-move"
        @click="_moveToLocation"
      >
        <i>&#xec32;</i>
      </div>
    </v-uni-map>
    <div class="nav">
      <div
        class="nav-btn back"
        @click="_back"
      >
        <i class="uni-btn-icon">&#xe650;</i>
      </div>
      <div
        class="nav-btn confirm"
        :class="{ disable: !selected }"
        @click="_choose"
      >
        <i class="uni-btn-icon">&#xe651;</i>
      </div>
    </div>
    <div class="menu">
      <div class="search">
        <v-uni-input
          v-model="keyword"
          class="search-input"
          placeholder="搜索地点"
          @focus="searching = true"
          @input="_input"
        />
        <div
          v-if="searching"
          class="search-btn"
          @click="
            searching = false;
            keyword = '';
          "
        >
          取消
        </div>
      </div>
      <v-uni-scroll-view
        scroll-y
        class="list"
        @scrolltolower="_scrolltolower"
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
            {{ item.distance ? item.distance + "米 | " : "" }}{{ item.address }}
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
} from 'uni-platform/helpers/get-jsonp'
const key = __uniConfig.qqMapKey

export default {
  name: 'SystemChooseLocation',
  data () {
    return {
      latitude: 0,
      longitude: 0,
      pageSize: 15,
      pageIndex: 1,
      selectedIndex: -1,
      list: [],
      keyword: '',
      searching: false,
      loading: true
    }
  },
  computed: {
    selected () {
      return this.list[this.selectedIndex]
    }
  },
  created () {
    this._moveToLocation()
    this._search = debounce(() => {
      this._reset()
      if (this.keyword) {
        this._getList()
      }
    }, 1000)
    this.$watch('searching', val => {
      this._reset()
      if (!val) {
        this._getList()
      }
    })
  },
  beforeDestroy () {
    window.removeEventListener('message', this.__messageHandle, false)
  },
  methods: {
    _choose () {
      if (this.selected) {
        UniViewJSBridge.publishHandler('onChooseLocation', Object.assign({}, this.selected))
        getApp().$router.back()
      }
    },
    _back () {
      UniViewJSBridge.publishHandler('onChooseLocation', null)
      getApp().$router.back()
    },
    _moveToLocation () {
      uni.getLocation({
        type: 'gcj02',
        success: this._move.bind(this),
        fail: () => {
          this._move({
            latitude: 39.90960456049752,
            longitude: 116.3972282409668
          })
        }
      })
    },
    _regionchange ({ detail: { centerLocation } }) {
      if (centerLocation) {
        // TODO 图钉 icon 动画
        this._move(centerLocation)
      }
    },
    _pushData (array) {
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
    _getList () {
      this.loading = true
      const url = this.searching ? `https://apis.map.qq.com/ws/place/v1/search?output=jsonp&key=${key}&boundary=nearby(${this.latitude},${this.longitude},1000)&keyword=${this.keyword}&page_size=${this.pageSize}&page_index=${this.pageIndex}` : `https://apis.map.qq.com/ws/geocoder/v1/?output=jsonp&key=${key}&location=${this.latitude},${this.longitude}&get_poi=1&poi_options=page_size=${this.pageSize};page_index=${this.pageIndex}`
      // TODO 列表加载失败提示
      getJSONP(url, {
        callback: 'callback'
      }, (res) => {
        this.loading = false
        if (this.searching && 'data' in res && res.data.length) {
          this._pushData(res.data)
        } else if ('result' in res && res.result.pois) {
          this._pushData(res.result.pois)
        }
      }, () => {
        this.loading = false
      })
    },
    _scrolltolower () {
      if (!this.loading && this.list.length === this.pageSize * this.pageIndex) {
        this.pageIndex++
        this._getList()
      }
    },
    _reset () {
      this.selectedIndex = -1
      this.pageIndex = 1
      this.list = []
    },
    _move ({ latitude, longitude }) {
      this.latitude = latitude
      this.longitude = longitude
      if (!this.searching) {
        this._reset()
        this._getList()
      }
    },
    _input () {
      this._search()
    }
  }
}
</script>
<style scoped>
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

.map {
  position: absolute;
  top: -40px;
  left: 0;
  width: 100%;
  height: 380px;
}

.map-location {
  position: absolute;
  left: 50%;
  bottom: 50%;
  width: 32px;
  height: 52px;
  margin-left: -16px;
  cursor: pointer;
  background-image: url("data:image/png;base64,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");
  background-size: 100%;
}

.map-move {
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

.map-move > i {
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

.nav {
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

.nav-btn {
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

.nav-btn.confirm {
  left: auto;
  right: 0;
}

.nav-btn.disable {
  opacity: 0.4;
}

.nav-btn > .uni-btn-icon {
  display: block;
  width: 100%;
  height: 100%;
  line-height: inherit;
  border-radius: 2px;
}

.nav-btn.confirm > .uni-btn-icon {
  background-color: #007aff;
}

.menu {
  position: absolute;
  top: 300px;
  left: 0;
  width: 100%;
  bottom: 0;
  background-color: white;
}

.search {
  display: flex;
  flex-direction: row;
  height: 50px;
  padding: 8px;
  line-height: 34px;
  box-sizing: border-box;
  background-color: white;
}

.search-input {
  flex: 1;
  height: 100%;
  border-radius: 5px;
  padding: 0 5px;
  background: #ebebeb;
}

.search-btn {
  width: 2.8em;
  color: #007aff;
  font-size: 17px;
  text-align: center;
  cursor: pointer;
}

.list {
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  bottom: 0;
  padding-bottom: 10px;
  /* background-color: #f6f6f6; */
}

.list-loading {
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
}

.list-item {
  position: relative;
  padding: 10px;
  padding-right: 40px;
  cursor: pointer;
}

.list-item.selected::before {
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

.list-item:not(:last-child)::after {
  position: absolute;
  content: "";
  height: 1px;
  left: 10px;
  bottom: 0;
  width: 100%;
  background-color: #d3d3d3;
}

.list-item-title {
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.list-item-detail {
  font-size: 12px;
  color: #808080;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@media screen and (min-width: 800px) {
  .map {
    top: 0;
    height: 100%;
  }
  .map-move {
    bottom: 10px;
    right: 320px;
  }
  .menu {
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
