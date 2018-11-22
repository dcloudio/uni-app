<template>
  <div class="uni-system-choose-location">
    <system-header
      :confirm="!!data"
      @back="_back"
      @confirm="_choose">选择位置</system-header>
    <div class="map-content">
      <iframe
        :src="src"
        allow="geolocation"
        seamless
        sandbox="allow-scripts allow-same-origin allow-forms"
        frameborder="0"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SystemChooseLocation',
  data () {
    return {
      src: '',
      data: null
    }
  },
  mounted () {
    var key = 'WXTBZ-6WERU-ECCVS-BZJCK-LW5OJ-SIBOS'
    this.src = `https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=${key}&referer=uniapp`
    window.addEventListener('message', (event) => {
      var loc = event.data
      if (loc && loc.module === 'locationPicker') {
        this.data = {
          name: loc.poiname,
          address: loc.poiaddress,
          latitude: loc.latlng.lat,
          longitude: loc.latlng.lng
        }
      }
    }, false)
  },
  methods: {
    _choose () {
      if (this.data) {
        UniViewJSBridge.publishHandler('onChooseLocation', this.data)
        getApp().$router.back()
      }
    },
    _back () {
      UniViewJSBridge.publishHandler('onChooseLocation', null)
      getApp().$router.back()
    }
  }
}
</script>
<style>
.uni-system-choose-location {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #f8f8f8;
}

.map-content {
  position: absolute;
  left: 0;
  top: 44px;
  width: 100%;
  bottom: 0;
  overflow: hidden;
}

.map-content > iframe {
  width: 100%;
  height: 100%;
}
</style>
