<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  created () {
    this.initPage()
  },
  methods: {
    ...mapMutations('weather', {
      setLocation: 'SET_LOCATION'
    }),
    ...mapActions('weather', ['getWeather']),
    async initPage() {
      const location = await this.getLocation()
      this.setLocation({
        location
      })
      this.getWeather()
    },
    async getLocation() {
      return await new Promise((resolve, reject) => {
        wx.getLocation({
          success(location) {
            resolve(location)
          },
          fail(err) {
            console.log(err)
            reject(err)
          }
        })
      })
    }
  }
}
</script>

<style>
.container {
  font-size: 26rpx;
  text-align: center;
}

.wrapper {
  font-size: 26rpx;
  text-align: left;
}

* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

/* font color */
* {
  color: #353535;
}
.gray {
  color: #808080;
}

.wxParse {
  text-indent: 2em;
}
.wxParse image {
  text-indent: 0;
}
.wxParse ._view {
  padding: 0 10rpx;
  text-indent: 0;
}
.wxParse .p {
  text-indent: 1em;
}
</style>
