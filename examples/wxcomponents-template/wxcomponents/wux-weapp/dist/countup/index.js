class CountUp {
    constructor(startVal, endVal, decimals, duration, options = {}, page = getCurrentPages()[getCurrentPages().length - 1]) {
        Object.assign(this, {
            page,
            startVal,
            endVal,
            decimals,
            duration,
            options,
        })
        this.__init()
    }

    /**
     * 初始化
     */
    __init() {
        this.setData = this.page.setData.bind(this.page)

        this.lastTime = 0

        // merge options
        this.mergeOptions(this.options)

        this.startVal = Number(this.startVal)
        this.cacheVal = this.startVal
        this.endVal = Number(this.endVal)
        this.countDown = (this.startVal > this.endVal)
        this.frameVal = this.startVal
        this.decimals = Math.max(0, this.decimals || 0)
        this.dec = Math.pow(10, this.decimals)
        this.duration = Number(this.duration) * 1000 || 2000

        // format startVal on initialization
        this.printValue(this.formattingFn(this.startVal))
    }

    /**
     * 默认参数
     */
    setDefaultOptions() {
        return {
            useEasing: true, // toggle easing
            useGrouping: true, // 1,000,000 vs 1000000
            separator: `,`, // character to use as a separator
            decimal: `.`, // character to use as a decimal
            easingFn: null, // optional custom easing closure function, default is Robert Penner's easeOutExpo
            formattingFn: null, // optional custom formatting function, default is this.formatNumber below
            printValue(value) {}, // printValue
        }
    }

    /**
     * 合并参数
     */
    mergeOptions(options) {
        const defaultOptions = this.setDefaultOptions()

        // extend default options with passed options object
        for (let key in defaultOptions) {
            if (defaultOptions.hasOwnProperty(key)) {
                this.options[key] = typeof options[key] !== `undefined` ? options[key] : defaultOptions[key]
                if (typeof this.options[key] === `function`) {
                    this.options[key] = this.options[key].bind(this)
                }
            }
        }

        if (this.options.separator === ``) { this.options.useGrouping = !1 }
        if (!this.options.prefix) this.options.prefix = ``
        if (!this.options.suffix) this.options.suffix = ``

        this.easingFn = this.options.easingFn ? this.options.easingFn : this.easeOutExpo
        this.formattingFn = this.options.formattingFn ? this.options.formattingFn : this.formatNumber
        this.printValue = this.options.printValue ? this.options.printValue : function() {}
    }

    /**
     * 创建定时器
     */
    requestAnimationFrame(callback) {
        let currTime = new Date().getTime()
        let timeToCall = Math.max(0, 16 - (currTime - this.lastTime))
        let timeout = setTimeout(() => {
            callback.bind(this)(currTime + timeToCall)
        }, timeToCall)
        this.lastTime = currTime + timeToCall
        return timeout
    }

    /**
     * 清空定时器
     */
    cancelAnimationFrame(timeout) {
        clearTimeout(timeout)
    }

    /**
     * 格式化数字
     */
    formatNumber(nStr) {
        nStr = nStr.toFixed(this.decimals)
        nStr += ``
        let x, x1, x2, rgx
        x = nStr.split(`.`)
        x1 = x[0]
        x2 = x.length > 1 ? this.options.decimal + x[1] : ``
        rgx = /(\d+)(\d{3})/
        if (this.options.useGrouping) {
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, `$1` + this.options.separator + `$2`)
            }
        }
        return this.options.prefix + x1 + x2 + this.options.suffix
    }

    /**
     * 过渡效果
     */
    easeOutExpo(t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b
    }

    /**
     * 计数函数
     */
    count(timestamp) {
        if (!this.startTime) { this.startTime = timestamp }

        this.timestamp = timestamp
        const progress = timestamp - this.startTime
        this.remaining = this.duration - progress

        // to ease or not to ease
        if (this.options.useEasing) {
            if (this.countDown) {
                this.frameVal = this.startVal - this.easingFn(progress, 0, this.startVal - this.endVal, this.duration)
            } else {
                this.frameVal = this.easingFn(progress, this.startVal, this.endVal - this.startVal, this.duration)
            }
        } else {
            if (this.countDown) {
                this.frameVal = this.startVal - ((this.startVal - this.endVal) * (progress / this.duration))
            } else {
                this.frameVal = this.startVal + (this.endVal - this.startVal) * (progress / this.duration)
            }
        }

        // don't go past endVal since progress can exceed duration in the last frame
        if (this.countDown) {
            this.frameVal = (this.frameVal < this.endVal) ? this.endVal : this.frameVal
        } else {
            this.frameVal = (this.frameVal > this.endVal) ? this.endVal : this.frameVal
        }

        // decimal
        this.frameVal = Math.round(this.frameVal * this.dec) / this.dec

        // format and print value
        this.printValue(this.formattingFn(this.frameVal))

        // whether to continue
        if (progress < this.duration) {
            this.rAF = this.requestAnimationFrame(this.count)
        } else {
            if (this.callback) { this.callback() }
        }
    }

    /**
     * 启动计数器
     */
    start(callback) {
        this.callback = callback
        this.rAF = this.requestAnimationFrame(this.count)
        return !1
    }

    /**
     * 停止计数器
     */
    pauseResume() {
        if (!this.paused) {
            this.paused = !0
            this.cancelAnimationFrame(this.rAF)
        } else {
            this.paused = !1
            delete this.startTime
            this.duration = this.remaining
            this.startVal = this.frameVal
            this.requestAnimationFrame(this.count)
        }
    }

    /**
     * 重置计数器
     */
    reset() {
        this.paused = !1
        delete this.startTime
        this.startVal = this.cacheVal
        this.cancelAnimationFrame(this.rAF)
        this.printValue(this.formattingFn(this.startVal))
    }

    /**
     * 更新计数器
     */
    update(newEndVal) {
        this.cancelAnimationFrame(this.rAF)
        this.paused = !1
        delete this.startTime
        this.startVal = this.frameVal
        this.endVal = Number(newEndVal)
        this.countDown = (this.startVal > this.endVal)
        this.rAF = this.requestAnimationFrame(this.count)
    }
}

export default CountUp