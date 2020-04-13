<template>
  <uni-cover-image
    :src="src"
    :style="imageInfo"
    v-on="$listeners"
  >
    <div
      ref="container"
      class="uni-cover-image"
    />
  </uni-cover-image>
</template>
<script>
import native from '../../mixins/native'
import cover from '../../mixins/cover'
import {
  plusReady
} from 'uni-shared'
import {
  TEMP_PATH
} from '../../../service/api/constants'

export default {
  name: 'CoverImage',
  mixins: [native, cover],
  props: {
    src: {
      type: String,
      default: ''
    },
    autoSize: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
      coverType: 'image',
      coverContent: '',
      imageInfo: {}
    }
  },
  watch: {
    src () {
      this.loadImage()
    }
  },
  created () {
    this.loadImage()
  },
  beforeDestroy () {
    const downloaTask = this.downloaTask
    if (downloaTask && downloaTask.state < 4) {
      downloaTask.abort()
    }
  },
  methods: {
    loadImage () {
      this.coverContent = ''
      this.imageInfo = this.autoSize ? { width: 0, height: 0 } : {}
      const realPath = this.src ? this.$getRealPath(this.src) : ''
      if (realPath.indexOf('http://') === 0 || realPath.indexOf('https://') === 0) {
        plusReady(() => {
          this.downloaTask = plus.downloader.createDownload(realPath, {
            filename: TEMP_PATH + '/download/'
          }, (task, status) => {
            if (status === 200) {
              this.getImageInfo(task.filename)
            } else {
              this.$trigger('error', {}, {
                errMsg: 'error'
              })
            }
          }).start()
        })
      } else if (realPath) {
        this.getImageInfo(realPath)
      }
    },
    getImageInfo (src) {
      this.coverContent = src
      plusReady(() => {
        plus.io.getImageInfo({
          src,
          success: ({ width, height }) => {
            if (this.autoSize) {
              this.imageInfo = {
                width: `${width}px`,
                height: `${height}px`
              }
              if (this._isMounted) {
                this._requestPositionUpdate()
              }
            }
            this.$trigger('load', {}, { width, height })
          },
          fail: () => {
            this.$trigger('error', {}, {
              errMsg: 'error'
            })
          }
        })
      })
    }
  }
}
</script>

<style>
uni-cover-image {
  display: block;
  line-height: 1.2;
  overflow: hidden;
  height: 100%;
  width: 100%;
  pointer-events: auto;
}

uni-cover-image[hidden] {
  display: none;
}

uni-cover-image .uni-cover-image {
  width: 100%;
  height: 100%;
}
</style>
