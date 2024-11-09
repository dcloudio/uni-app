<template>
  <view>
    <!-- <view class="title">请在下面输入签名：</view> -->
    <button @click="canvasId = 'mycanvas_id'">change canvas-id</button>
    <canvas
      ref="canvas"
      class="mycanvas"
      :canvas-id="canvasId"
      :disable-scroll="true"
      :data-width="canvasWidth"
      :data-height="canvasWidth"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      @longtap="longtap"
      @error="error"
    ></canvas>
    <button
      v-for="(item, index) in ctxMethods"
      :key="index"
      @click="handler(item)"
    >
      {{ item }}
    </button>
    <view class="footer">
      <view
        class="left"
        @click="finish"
      >保存到相册</view>
      <view
        class="right"
        @click="clear"
      >清除</view>
    </view>
  </view>
</template>

<script lang="uts">
import { ref } from "vue";

var x = 20;
var y = 20;
export default {
  data() {
    return {
      canvasWidth: 0,
      ctx: null as CanvasContext | null, //绘图图像
      points: [], //路径点集合
      ctxMethods: ["getImageData", "putImageData", "toTempFilePath"],
      canvasId: 'mycanvas'
    };
  },
  mounted() {
    /* console.log(
      'uni.createCanvasContext("mycanvas", this); :>> ',
      uni.createCanvasContext("mycanvas", this)
    ); */
    const canvas = document.querySelector(".mycanvas>canvas")!;
    this.canvasWidth = canvas.getBoundingClientRect().width;
    // this.ctx = canvas.getContext("2d"); //创建绘图对象
    const ctx = uni.createCanvasContext("mycanvas", this); //创建绘图对象
    console.log(ctx)
    this.ctx = ctx

    //设置画笔样式
    this.ctx!.lineWidth = 4;
    this.ctx!.lineCap = "round";
    this.ctx!.lineJoin = "round";

    /* this.ctx.fillStyle = "green";
    this.ctx.fillRect(10, 10, 150, 100);
    this.ctx.draw(); */

    this.ctx!.drawImage('/static/logo.png', 0, 0, 150, 100)
    this.ctx!.draw();
  },
  methods: {
    //触摸开始，获取到起点
    touchstart: function (e) {
    console.log("🚀 ~ file: ssr-canvas.vue ~ line 79 ~ onReady ~ this.ctx", this.ctx)
    console.log("🚀 ~ file: ssr-canvas.vue ~ line 79 ~ onReady ~ this.ctx", this.ctx)
    console.log("🚀 ~ file: ssr-canvas.vue ~ line 79 ~ onReady ~ this.ctx", this.ctx)
    console.log("🚀 ~ file: ssr-canvas.vue ~ line 79 ~ onReady ~ this.ctx", this.ctx)
    console.log("🚀 ~ file: ssr-canvas.vue ~ line 79 ~ onReady ~ this.ctx", this.ctx)
      let startX = e.changedTouches[0].x;
      let startY = e.changedTouches[0].y;
      let startPoint = {
        X: startX,
        Y: startY,
      };
      this.points.push(startPoint);
      //每次触摸开始，开启新的路径
      this.ctx!.beginPath();
    },

    //触摸移动，获取到路径点
    touchmove: function (e) {
      let moveX = e.changedTouches[0].x;
      let moveY = e.changedTouches[0].y;
      let movePoint = {
        X: moveX,
        Y: moveY,
      };
      this.points.push(movePoint); //存点
      let len = this.points.length;
      if (len >= 2) {
        this.draw(); //绘制路径
      }
    },

    // 触摸结束，将未绘制的点清空防止对后续路径产生干扰
    touchend: function (e) {
      this.points = [];
    },

    /* ***********************************************
      #   绘制笔迹
      #   1.为保证笔迹实时显示，必须在移动的同时绘制笔迹
      #   2.为保证笔迹连续，每次从路径集合中区两个点作为起点（moveTo）和终点(lineTo)
      #   3.将上一次的终点作为下一次绘制的起点（即清除第一个点）
      ************************************************ */
    draw: function () {
      let point1 = this.points[0];
      let point2 = this.points[1];
      this.points.shift();
      this.ctx!.moveTo(point1.X, point1.Y);
      this.ctx!.lineTo(point2.X, point2.Y);
      this.ctx!.stroke();
      this.ctx!.draw(true);
    },

    //清空画布
    clear: function () {
      let that = this;
      uni.getSystemInfo({
        success: function (res) {
          let canvasw = res.windowWidth;
          let canvash = res.windowHeight;
          that.ctx!.clearRect(0, 0, canvasw, canvash);
          that.ctx!.draw(true);
        },
      });
    },

    //完成绘画并保存到本地
    finish: function () {
      uni.canvasToTempFilePath({
        canvasId: "mycanvas",
        success: function (res) {
          console.log(res);
          /* let path = res.tempFilePath;
          uni.saveImageToPhotosAlbum({
            filePath: path,
          }); */
        },
      }, this);
    },

    longtap() {
      console.log("longtap");
    },

    error() {
      console.log("error");
    },

    handler(fn) {
      let tempData = [];
      switch (fn) {
        case "getImageData":
          uni.canvasGetImageData({
            canvasId: "mycanvas",
            x: 10,
            y: 10,
            width: 150,
            height: 100,
            success(res) {
              console.log("canvasGetImageData :>> ", res);
            },
          });
          /* tempData = this.canvas.getImageData({
            x: 10,
            y: 10,
            width: 150,
            height: 100,
          }).data;
          console.log("this.canvas.getImageData :>> ", tempData); */
          break;
        case "putImageData":
          for (let index = 0; index < 100; index++) {
            uni.canvasPutImageData({
              canvasId: "mycanvas",
              x: 170,
              y: index,
              width: 1,
              data: new Uint8ClampedArray([255, 0, 0, 255]),
              success(res) {
                console.log("canvasPutImageData :>> ", res);
              },
            });
            /* this.canvas.putImageData({
              x: 170,
              y: index,
              width: 1,
              data: new Uint8ClampedArray([255, 0, 0, 255]),
            }); */
          }
          break;
        case "toTempFilePath":
          /* console.log(
            "this.canvas.toTempFilePath :>> ",
            this.canvas.toTempFilePath({
              x: 10,
              y: 10,
              width: 150,
              height: 100,
              destWidth: 150,
              destHeight: 100,
            })
          ); */
          uni.canvasToTempFilePath({
            canvasId: "mycanvas",
            x: 10,
            y: 10,
            width: 150,
            height: 100,
            destWidth: 150,
            destHeight: 100,
            success(res) {
              console.log("canvasToTempFilePath :>> ", res);
            },
          }, this);
          break;

        default:
          break;
      }
    },
  },
  setup() {
    const canvas = ref(null);

    return {
      canvas,
    };
  },
};
</script>

<style>
.mycanvas {
  width: 100%;
  height: calc(100vh - 444rpx);
  background-color: #ececec;
}

.footer {
  font-size: 16px;
  height: 150rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.left,
.right {
  line-height: 100rpx;
  height: 100rpx;
  width: 250rpx;
  text-align: center;
  font-weight: bold;
  color: white;
  border-radius: 5rpx;
}

.left {
  background: #007aff;
}

.right {
  background: orange;
}
</style>
