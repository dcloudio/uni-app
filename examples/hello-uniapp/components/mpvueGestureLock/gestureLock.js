class GestureLock {

    constructor(containerWidth, cycleRadius) {
        this.containerWidth = containerWidth; // 容器宽度
        this.cycleRadius = cycleRadius; // 圆的半径

        this.circleArray = []; // 全部圆的对象数组
        this.checkPoints = []; // 选中的圆的对象数组
        this.lineArray = []; // 已激活锁之间的线段数组
        this.lastCheckPoint = 0; // 最后一个激活的锁
        this.offsetX = 0; // 容器的 X 偏移
        this.offsetY = 0; // 容器的 Y 偏移
        this.activeLine = {}; // 最后一个激活的锁与当前位置之间的线段

        this.windowWidth = wx.getSystemInfoSync().windowWidth; // 窗口大小(用于rpx 和 px 转换)

        this.initCircleArray();
    }

    // 初始化 画布上的 9个圆
    initCircleArray() {
        const cycleMargin = (this.containerWidth - 6 * this.cycleRadius) / 6;
        let count = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                count++;
                this.circleArray.push({
                    count: count,
                    x: this.rpxTopx((cycleMargin + this.cycleRadius) * (j * 2 + 1)),
                    y: this.rpxTopx((cycleMargin + this.cycleRadius) * (i * 2 + 1)),
                    radius: this.rpxTopx(this.cycleRadius),
                    check: false,
                    style: {
                        left: (cycleMargin + this.cycleRadius) * (j * 2 + 1) - this.cycleRadius + 'rpx',
                        top: (cycleMargin + this.cycleRadius) * (i * 2 + 1) - this.cycleRadius + 'rpx',
                        width: this.cycleRadius * 2 + 'rpx',
                    }
                });
            }
        }
    }

    onTouchStart(e) {
        this.setOffset(e);
        this.checkTouch({
            x: e.touches[0].pageX - this.offsetX,
            y: e.touches[0].pageY - this.offsetY
        });
    }

    onTouchMove(e) {
        this.moveDraw(e)
    }

    onTouchEnd(e) {
        const checkPoints = this.checkPoints;
        this.reset();
        return checkPoints;
    }

    // 初始化 偏移量
    setOffset(e) {
        this.offsetX = e.currentTarget.offsetLeft;
        this.offsetY = e.currentTarget.offsetTop;
    }

    // 检测当时 触摸位置是否位于 锁上
    checkTouch({
        x,
        y
    }) {
        for (let i = 0; i < this.circleArray.length; i++) {
            let point = this.circleArray[i];
            if (this.isPointInCycle(x, y, point.x, point.y, point.radius)) {
                if (!point.check) {
                    this.checkPoints.push(point.count);
                    if (this.lastCheckPoint != 0) {
                        // 已激活锁之间的线段
                        const line = this.drawLine(this.lastCheckPoint, point);
                        this.lineArray.push(line);
                    }
                    this.lastCheckPoint = point;
                }
                point.check = true;
                return;
            }
        }
    }

    // 画线 - 返回 样式 对象
    drawLine(start, end) {
        const width = this.getPointDis(start.x, start.y, end.x, end.y);
        const rotate = this.getAngle(start, end);

        return {
            activeLeft: start.x + 'px',
            activeTop: start.y + 'px',
            activeWidth: width + 'px',
            activeRotate: rotate + 'deg'
        }

    }

    // 获取 画线的 角度
    getAngle(start, end) {
        var diff_x = end.x - start.x,
            diff_y = end.y - start.y;
        if (diff_x >= 0) {
            return 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
        } else {
            return 180 + 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
        }
    }

    // 判断 当前点是否位于 锁内
    isPointInCycle(x, y, circleX, circleY, radius) {
        return (this.getPointDis(x, y, circleX, circleY) < radius) ? true : false;
    }

    // 获取两点之间距离
    getPointDis(ax, ay, bx, by) {
        return Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2));
    }

    // 移动 绘制
    moveDraw(e) {
        // 画经过的圆
        const x = e.touches[0].pageX - this.offsetX;
        const y = e.touches[0].pageY - this.offsetY;
        this.checkTouch({
            x,
            y
        });

        // 画 最后一个激活的锁与当前位置之间的线段
        this.activeLine = this.drawLine(this.lastCheckPoint, {
            x,
            y
        });
    }

    // 使 画布 恢复初始状态
    reset() {
        this.circleArray.forEach((item) => {
            item.check = false;
        });
        this.checkPoints = [];
        this.lineArray = [];
        this.activeLine = {};
        this.lastCheckPoint = 0;
    }


    // 获取 最后一个激活的锁与当前位置之间的线段
    getActiveLine() {
        return this.activeLine;
    }

    // 获取 圆对象数组
    getCycleArray() {
        return this.circleArray;
    }

    // 获取 已激活锁之间的线段
    getLineArray() {
        return this.lineArray;
    }

    // 将 RPX 转换成 PX
    rpxTopx(rpx) {
        return rpx / 750 * this.windowWidth;
    }
}

export default GestureLock;
