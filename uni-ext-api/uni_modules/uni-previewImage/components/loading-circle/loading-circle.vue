<template>
  <!-- #ifdef APP -->
  <view :ref="elId" class="uni-loading-block" :style="{width:size+'px',height:size+'px'}"></view>
  <!-- #endif -->
  <!-- #ifdef WEB -->
  <svg :width="size" :height="size" viewBox="25 25 50 50" :style="{width:size+'px',height:size+'px'}" class="uni-load__img uni-load__img--android-H5">
    <circle cx="50" cy="50" r="20" fill="none" :style="{color:color}" :stroke-width="iconsSize"></circle>
  </svg>
  <!-- #endif -->
</template>
<script>
  import { easeInOutCubic } from './util'
  let elId = 0
  export default {
    name: "loading-circle",
    props: {
      speed: {
        type: Number,
        default: 16,
      },
      size: {
        type: Number,
        default: 20,
      },
      color: {
        type: String,
        default: '#666',
      }
    },
    data() {
      // 防止多调用，随机元素id
      elId += 1
      const elID = `Uni_Load_Circle_${elId}`
      return {
        elId: elID,
        timer: 0,
      };
    },
    computed: {
      iconsSize() : number {
        return (this.size / 10) -3
      }
    },
    mounted() {
      // #ifdef APP
      this.init()
      // #endif
    },
    unmounted() {
      // 组件卸载时，需要卸载定时器，优化性能，防止页面卡死
      cancelAnimationFrame(this.timer)
    },
    methods: {
      /**
       * 初始化圆环
       */
      init() {
        const refs = this.$refs[this.elId] as UniElement
        let ctx = refs.getDrawableContext()!
        this.build_circular(ctx)
      },

      /**
       * 构建圆环动画
       */
      build_circular(ctx : DrawableContext) {
        let startAngle = 0;
        let rotate = 0;
        const ARC_LENGTH = 359;
        const center = this.size / 2; // 圆心
        const lineWidth = Math.floor(this.size / 12); // 圆环宽度
        const duration = 1200; // 动画持续时间
        const interval = this.speed; // 定时器间隔（大约 60 帧每秒）

        // 使圆环过度更自然，不必运动到底
        const ARC_MAX = 358
        let startTime = 0;
        let foreward_end = 0 // 正传
        let reversal_end = ARC_MAX // 反转
        function pogress_time() : number {
          const currentTime = Date.now();
          // 运动时间计算
          const elapsedTime = currentTime - startTime;
          const progress = elapsedTime / duration;
          // 动画缓动
          const easedProgress = easeInOutCubic(progress);
          return easedProgress
        }
        let draw: () => void = () => {}
        draw = () => {
          this.timer = requestAnimationFrame(draw)

          ctx.reset();
          ctx.beginPath();

          if (reversal_end == ARC_MAX) {
            foreward_end = Math.min(pogress_time() * ARC_LENGTH, ARC_LENGTH); // 限制 end 的最大值为 ARC_LENGTH
            if (foreward_end >= ARC_MAX) {
              reversal_end = 0
              foreward_end = ARC_MAX
              startTime = Date.now();
            }
          }

          if (foreward_end == ARC_MAX) {
            reversal_end = Math.min(pogress_time() * ARC_LENGTH, ARC_LENGTH);
            if (reversal_end >= ARC_MAX) {
              reversal_end = ARC_MAX
              foreward_end = 0
              startTime = Date.now();
            }
          }

          ctx.arc(
            center,
            center,
            center - lineWidth,
            startAngle + rotate + (reversal_end * Math.PI / 180),
            startAngle + rotate + (foreward_end * Math.PI / 180)
          );
          ctx.lineWidth = lineWidth;
          const fillColor = (this.color !== '' ? this.color : '#666').toString();
          ctx.strokeStyle = fillColor;
          ctx.stroke();
          ctx.update();
          rotate += 0.05; // 旋转速度
        }
        this.timer = requestAnimationFrame(draw)
      }

    }
  }
</script>

<style scoped>
  .uni-loading-block {
    width: 50px;
    height: 50px;
  }

  /* #ifdef WEB */
  .uni-load__img {
    width: 24px;
    height: 24px;
  }

  .uni-load__img--android-H5 {
    animation: loading-android-H5-rotate 2s linear infinite;
    transform-origin: center center;
  }

  .uni-load__img--android-H5 circle {
    display: inline-block;
    animation: loading-android-H5-dash 1.5s ease-in-out infinite;
    stroke: currentColor;
    stroke-linecap: round;
  }

  @keyframes loading-android-H5-rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes loading-android-H5-dash {
    0% {
      stroke-dasharray: 1, 200;
      /* stroke-dashoffset: 0; */
    }

    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -20;
    }

    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120;
    }
  }

  /* #endif */
</style>
