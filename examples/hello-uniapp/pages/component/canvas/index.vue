<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-body-wrapper">
                <canvas canvas-id="canvas" class="canvas"></canvas>
            </view>
        </view>
        
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'
    
    export default {
        data() {
            return {
                title: 'canvas',
                position: {
                    x: 150,
                    y: 150,
                    vx: 2,
                    vy: 2
                }
            }
        },
        onReady: function () {
            this.interval = setInterval(this.drawBall, 17)
        },
        onUnload: function () {
            clearInterval(this.interval)
        },
        methods: {
            drawBall: function () {
                var p = this.position
                p.x += p.vx
                p.y += p.vy
                if (p.x >= 300) {
                    p.vx = -2
                }
                if (p.x <= 7) {
                    p.vx = 2
                }
                if (p.y >= 300) {
                    p.vy = -2
                }
                if (p.y <= 7) {
                    p.vy = 2
                }

                var context = uni.createContext()

                function ball(x, y) {
                    context.beginPath(0)
                    context.arc(x, y, 5, 0, Math.PI * 2)
                    context.setFillStyle('#1aad19')
                    context.setStrokeStyle('rgba(1,1,1,0)')
                    context.fill()
                    context.stroke()
                }

                ball(p.x, 150)
                ball(150, p.y)
                ball(300 - p.x, 150)
                ball(150, 300 - p.y)
                ball(p.x, p.y)
                ball(300 - p.x, 300 - p.y)
                ball(p.x, 300 - p.y)
                ball(300 - p.x, p.y)

                uni.drawCanvas({
                    canvasId: 'canvas',
                    actions: context.getActions()
                })
            }
        },
        components: {
            pageHead
            
        }
    }
</script>

<style>
    .canvas {
        width: 305px;
        height: 305px;
        background-color: #fff;
    }
</style>
