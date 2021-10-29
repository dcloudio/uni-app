<template>
  <div class="uni-system-open-location">
    <v-uni-map
      :latitude="center.latitude"
      :longitude="center.longitude"
      class="map"
      :markers="[marker, location]"
      @regionchange="onRegionChange"
    >
      <div
        class="map-move"
        @click="moveToLocation"
      >
        <i>&#xec32;</i>
      </div>
    </v-uni-map>
    <div class="info">
      <div
        class="name"
        @click="setCenter(marker)"
      >
        {{ name }}
      </div>
      <div
        class="address"
        @click="setCenter(marker)"
      >
        {{ address }}
      </div>
      <div
        class="nav"
        @click="nav"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M896 544c-207.807 0-388.391 82.253-480 203.149V173.136l201.555 201.555c12.412 12.412 32.723 12.412 45.136 0 12.412-12.412 12.412-32.723 0-45.136L408.913 75.777a31.93 31.93 0 0 0-2.222-2.468c-6.222-6.222-14.429-9.324-22.631-9.308l-0.059-0.002-0.059 0.002c-8.202-0.016-16.409 3.085-22.631 9.308a31.93 31.93 0 0 0-2.222 2.468l-253.78 253.778c-12.412 12.412-12.412 32.723 0 45.136 12.412 12.412 32.723 12.412 45.136 0L352 173.136V928c0 17.6 14.4 32 32 32s32-14.4 32-32c0-176.731 214.903-320 480-320 17.673 0 32-14.327 32-32 0-17.673-14.327-32-32-32z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </div>
    <div
      class="nav-btn-back"
      @click="back"
    >
      <i class="uni-btn-icon">&#xe601;</i>
    </div>
  </div>
</template>
<script>
import {
  ICON_PATH_ORIGIN,
  ICON_PATH_TARGET,
  MapType,
  getMapInfo
} from '../../../helpers/location'

export default {
  name: 'SystemOpenLocation',
  data () {
    const {
      latitude,
      longitude,
      scale = 18,
      name = '',
      address = ''
    } = this.$route.query
    return {
      latitude,
      longitude,
      scale,
      name,
      address,
      center: {
        latitude,
        longitude
      },
      marker: {
        id: 1,
        latitude,
        longitude,
        iconPath: ICON_PATH_TARGET,
        width: 32,
        height: 52
      },
      location: {
        id: 2,
        latitude: 0,
        longitude: 0,
        iconPath: ICON_PATH_ORIGIN,
        width: 44,
        height: 44
      }
    }
  },
  methods: {
    onRegionChange (event) {
      const centerLocation = event.detail.centerLocation
      if (centerLocation) {
        this.center.latitude = centerLocation.latitude
        this.center.longitude = centerLocation.longitude
      }
    },
    setCenter ({ latitude, longitude }) {
      this.center.latitude = latitude
      this.center.longitude = longitude
    },
    moveToLocation () {
      uni.getLocation({
        type: 'gcj02',
        success: this.move.bind(this),
        fail: () => {
          // move({
          //   latitude: 0,
          //   longitude: 0
          // })
        }
      })
    },
    move ({ latitude, longitude }) {
      this.location.latitude = latitude
      this.location.longitude = longitude
      this.setCenter({ latitude, longitude })
    },
    back () {
      getApp().$router.back()
    },
    nav () {
      const mapInfo = getMapInfo()
      let url = ''
      if (mapInfo.type === MapType.GOOGLE) {
        const origin = this.location.latitude
          ? `&origin=${this.location.latitude}%2C${this.location.longitude}`
          : ''
        url = `https://www.google.com/maps/dir/?api=1${origin}&destination=${this.latitude}%2C${this.longitude}`
      } else if (mapInfo.type === MapType.QQ) {
        const fromcoord = this.location.latitude
          ? `&fromcoord=${this.location.latitude}%2C${this.location.longitude}`
          : ''
        url = `https://apis.map.qq.com/uri/v1/routeplan?type=drive${fromcoord}&tocoord=${this.latitude
          }%2C${this.longitude}&from=${encodeURIComponent(
            '我的位置'
          )}&to=${encodeURIComponent(this.name || '目的地')}&ref=${mapInfo.key}`
      }
      window.open(url)
    }
  }
}
</script>
<style>
.uni-system-open-location {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  z-index: 999;
}

.uni-system-open-location .map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 80px;
  height: auto;
}

.uni-system-open-location .info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: white;
  padding: 15px;
  box-sizing: border-box;
  line-height: 1.5;
}

.uni-system-open-location .info > .name {
  font-size: 17px;
  color: #111111;
}

.uni-system-open-location .info > .address {
  font-size: 14px;
  color: #666666;
}

.uni-system-open-location .info > .nav {
  position: absolute;
  top: 50%;
  right: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-top: -25px;
  background-color: #007aff;
}

.uni-system-open-location .info > .nav > svg {
  display: block;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.uni-system-open-location .map-move {
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

.uni-system-open-location .map-move > i {
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

.uni-system-open-location .nav-btn-back {
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 44px;
  height: 44px;
  padding: 6px;
  line-height: 32px;
  font-size: 26px;
  color: white;
  text-align: center;
  cursor: pointer;
}

.uni-system-open-location .nav-btn-back > .uni-btn-icon {
  display: block;
  width: 100%;
  height: 100%;
  line-height: inherit;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
}

.uni-system-open-location .map-content {
  position: absolute;
  left: 0;
  top: 0px;
  width: 100%;
  bottom: 0;
  overflow: hidden;
}

.uni-system-open-location .map-content.fix-position {
  top: -74px;
  bottom: -44px;
}

.uni-system-open-location .map-content > iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.uni-system-open-location .actTonav {
  position: absolute;
  right: 16px;
  bottom: 56px;
  width: 60px;
  height: 60px;
  border-radius: 60px;
}
</style>
