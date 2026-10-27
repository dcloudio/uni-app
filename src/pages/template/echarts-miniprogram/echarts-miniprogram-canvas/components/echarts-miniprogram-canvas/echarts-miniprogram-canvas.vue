<template>
  <canvas type="2d" v-if="isUseNewCanvas" class="ec-canvas" :canvas-id="canvasId" :style="{ height: height }" @touchstart="touchStart"
    @touchmove="touchMove" @touchend="touchEnd">
  </canvas>
  <canvas v-else class="ec-canvas" :canvas-id="canvasId" :style="{ height: height }" @touchstart="touchStart" @touchmove="touchMove"
    @touchend="touchEnd">
  </canvas>
</template>

<script setup lang="js">
  import WxCanvas from "./wx-canvas";
  import { echarts } from "./echarts";

  const props = defineProps({
    canvasId: {
      type: String,
      default: "ec-canvas"
    },
    ec: {
      type: Object
    },
    height: {
      type: String,
      default: "300px"
    },
    forceUseOldCanvas: {
      type: Boolean,
      default: false
    }
  });
  const emit = defineEmits(["init", "inited", "touchstart", "touchmove", "touchend"]);
  const currentInstance = getCurrentInstance();
  if (!currentInstance) {
    throw new Error("[echarts-miniprogram-canvas] Component instance is unavailable");
  }
  const instance = currentInstance.proxy;
  const curChart = shallowRef({});
  const isUseNewCanvas = ref(true);
  let ctx;

  function wrapTouch(event) {
    for (let i = 0; i < event.touches.length; ++i) {
      const touch = event.touches[i];
      touch.offsetX = touch.x;
      touch.offsetY = touch.y;
    }
    return event;
  }

  function compareVersion(v1, v2) {
    v1 = v1.split(".");
    v2 = v2.split(".");
    const len = Math.max(v1.length, v2.length);

    while (v1.length < len) {
      v1.push("0");
    }
    while (v2.length < len) {
      v2.push("0");
    }

    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i]);
      const num2 = parseInt(v2[i]);

      if (num1 > num2) {
        return 1;
      } else if (num1 < num2) {
        return -1;
      }
    }
    return 0;
  }

  function init(callback = null) {
    // The uni-app x canvas API exposes a Canvas 2D node directly.
    isUseNewCanvas.value = true;
    initByNewWay(callback);
  }

  function initByOldWay(callback) {
        // 1.9.91 <= version < 2.9.0：原来的方式初始化
    ctx = uni.createCanvasContext(props.canvasId, instance);
    const canvas = new WxCanvas(ctx, props.canvasId, false);
    echarts.setCanvasCreator(() => {
      return canvas;
    });
    // const canvasDpr = uni.getSystemInfoSync().pixelRatio // 微信旧的canvas不能传入dpr
    const canvasDpr = 1;
    const query = uni.createSelectorQuery().in(instance);
    query
      .select(".ec-canvas")
      .boundingClientRect(res => {
        if (typeof callback === "function") {
          curChart.value = callback(canvas, res.width, res.height, canvasDpr);
        } else if (props.ec) {
          curChart.value = initChart(canvas, res.width, res.height, canvasDpr);
        } else {
          emit("init", {
            canvas: canvas,
            width: res.width,
            height: res.height,
            devicePixelRatio: canvasDpr // 增加了dpr，可方便外面echarts.init
          });
        }
      })
      .exec();
  }

  function initByNewWay(callback) {
        // version >= 2.9.0：使用新的方式初始化
        const query = uni.createSelectorQuery().in(instance);
        query
          .select(".ec-canvas")
          .fields({
            node: true,
            size: true
          }, res => {
            if (!res || !res.node) {
              console.error("[echarts-miniprogram-canvas] Canvas 2D node is unavailable", res);
              return;
            }
            const canvasNode = res.node;

            const canvasDpr = uni.getSystemInfoSync().pixelRatio;
            const canvasWidth = res.width;
            const canvasHeight = res.height;
            if (canvasWidth <= 0 || canvasHeight <= 0) {
              console.error("[echarts-miniprogram-canvas] Canvas has no drawable size");
              return;
            }

            const ctx = canvasNode.getContext("2d");
            if (!ctx) {
              console.error("[echarts-miniprogram-canvas] Canvas 2D context is unavailable");
              return;
            }

            const canvas = new WxCanvas(ctx, props.canvasId, true, canvasNode);
            echarts.setCanvasCreator(() => {
              return canvas;
            });

            if (typeof callback === "function") {
              curChart.value = callback(
                canvas,
                canvasWidth,
                canvasHeight,
                canvasDpr
              );
            } else if (props.ec) {
              curChart.value = initChart(canvas, canvasWidth, canvasHeight, canvasDpr)
            } else {
              emit("init", {
                canvas: canvas,
                width: canvasWidth,
                height: canvasHeight,
                devicePixelRatio: canvasDpr
              });
            }
          })
          .exec();
  }

  function setOption(val) {
    const chart = curChart.value;
    const applyOption = Reflect.get(chart, "setOption");
    if (typeof applyOption === "function") {
      applyOption.call(chart, val);
    }
  }

  function getChartHandler() {
    const chart = curChart.value;
    const getZr = Reflect.get(chart, "getZr");
    if (typeof getZr !== "function") {
      return null;
    }
    return getZr.call(chart).handler;
  }

  function canvasToTempFilePath(opt) {
    if (isUseNewCanvas.value) {
          // 新版
          const query = uni.createSelectorQuery().in(instance);
          query
            .select(".ec-canvas")
            .fields({
              node: true,
              size: true
            }, res => {
              const canvasNode = res.node;
              opt.canvas = canvasNode;
              uni.canvasToTempFilePath(opt, instance);
            })
            .exec();
        } else {
          // 旧的
          if (!opt.canvasId) {
            opt.canvasId = props.canvasId;
          }
          ctx.draw(true, () => {
            uni.canvasToTempFilePath(opt, instance);
          });
    }
  }

  function touchStart(e) {
        if (props.ec?.stopTouchEvent) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        emit("touchstart", e);
        if (e.touches.length > 0) {
          var touch = e.touches[0];
          var handler = getChartHandler();
          if (handler) {
            handler.dispatch("mousedown", {
              zrX: touch.x,
              zrY: touch.y
            });
            handler.dispatch("mousemove", {
              zrX: touch.x,
              zrY: touch.y
            });
            handler.processGesture(wrapTouch(e), "start");
          }
        }
  }

  function touchMove(e) {
        if (props.ec?.stopTouchEvent) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        emit("touchmove", e);
        if (e.touches.length > 0) {
          var touch = e.touches[0];
          var handler = getChartHandler();
          if (handler) {
            handler.dispatch("mousemove", {
              zrX: touch.x,
              zrY: touch.y
            });
            handler.processGesture(wrapTouch(e), "change");
          }
        }
  }

  function touchEnd(e) {
        if (props.ec?.stopTouchEvent) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        emit("touchend", e);
        const touch = e.changedTouches ? e.changedTouches[0] : {};
        var handler = getChartHandler();
        if (handler) {
          handler.dispatch("mouseup", {
            zrX: touch.x,
            zrY: touch.y
          });
          handler.dispatch("click", {
            zrX: touch.x,
            zrY: touch.y
          });
          handler.processGesture(wrapTouch(e), "end");
        }
  }

  function initChart(canvas, width, height, canvasDpr) {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: canvasDpr
        });
        curChart.value = chart;
        canvas.setChart(chart);
        const option = props.ec?.option;
        if (option) {
          chart.setOption(option);
        }
        emit('inited', chart)
        return chart
    }

  watch(
    () => props.ec && props.ec.option,
    (val) => setOption(val),
    { deep: true }
  );

  onMounted(() => {
    if (!props.ec) {
      console.warn(
        '组件需绑定 ec 变量，例：<ec-canvas id="mychart-dom-bar" ' +
        'canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>'
      );
      return;
    }
    if (!props.ec.lazyLoad) {
      init();
    }
  });

  defineExpose({
    $curChart: curChart,
    canvasToTempFilePath,
    init
  });
</script>

<style lang="scss">
  .ec-canvas {
    width: 100%;
    height: 100%;
  }
</style>
