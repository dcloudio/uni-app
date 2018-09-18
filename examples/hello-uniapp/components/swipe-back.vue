<template>
    <canvas canvas-id="arrows" :style="{width: show?'30px':'10px'}" class="arrows" :disable-scroll="true" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" @touchcancel="touchend"></canvas>
</template>
<script>
export default {
    name: 'swipe-back',
    props: {
        showBtn: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            x: 0,
            y: 0,
            show: false,
            ctx: null,
            renderID: null
        };
    },
    onReady: function() {
        this.show = false;
        this.ctx = uni.createCanvasContext('arrows');
    },
    methods: {
        clearCanvas() {
            this.show = false;
            if (this.showBtn) {
                this.ctx.clearRect(0, 0, 25, 2000);
                this.ctx.draw();
            }
        },
        hide() {
            const renderNext = () => {
                if (this.x > 0) {
                    this.x -= 5;
                    this.render();
                    requestAnimationFrame(renderNext);
                } else {
                    this.clearCanvas();
                }
            };
            requestAnimationFrame(renderNext);
        },
        getXY(event) {
            let touch = event.touches[0];
            this.x = touch.x;
            this.y = touch.y;
        },
        touchstart(event) {
            this.getXY(event);
            if (this.x > 60) {
                this.show = false;
            } else {
                this.show = true;
            }
        },
        touchmove(event) {
            this.getXY(event);
            if (this.showBtn) {
                cancelAnimationFrame(this.renderID);
                this.renderID = requestAnimationFrame(this.render);
            }
        },
        touchend() {
            if (this.x > 90) {
                this.clearCanvas();
                uni.navigateBack(1);
            } else {
                this.hide();
            }
        },
        render() {
            if (!this.show) {
                return;
            }
            let x = this.x / 3;
            if (x > 25) {
                x = 25;
            }
            let y = this.y - 103;
            let opaque = x / 25;
            let bx = x > 5 ? 8 : x;
            let color = `rgba(30,30,30,${opaque})`;
            this.ctx.setFillStyle(color);
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.bezierCurveTo(bx, y + 70, x, y + 70, x, y + 100);
            this.ctx.moveTo(x, y + 100);
            this.ctx.bezierCurveTo(x, y + 140, bx, y + 140, 0, y + 210);
            this.ctx.lineTo(0, y);
            this.ctx.closePath();
            this.ctx.fill();
            // 箭头
            let n = ~~(x / 5);
            this.ctx.beginPath();
            this.ctx.moveTo(2 * n + 2, y + 96);
            this.ctx.lineTo((n > 2 ? 3 : 2) * n + 2, y + 103);
            this.ctx.lineTo(2 * n + 2, y + 110);
            this.ctx.lineWidth = 2;
            this.ctx.setStrokeStyle(`rgba(255,255,255,${opaque})`);
            this.ctx.stroke();
            this.ctx.draw();
        }
    }
};
</script>
<style scoped>
.arrows {
    position: fixed;
    width: 20upx;
    height: 100vh;
    z-index: 9999;
}
</style>
