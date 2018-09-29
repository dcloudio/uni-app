class Countdown {
    constructor(options = {}, page = getCurrentPages()[getCurrentPages().length - 1]) {
        Object.assign(this, {
            page,
            options,
        })
        this.__init()
    }

    /**
     * 初始化
     */
    __init() {
        this.setData = this.page.setData.bind(this.page)
        this.restart(this.options)
    }

    /**
     * 默认参数
     */
    setDefaults() {
        return {
            date: `June 7, 2087 15:03:25`,
            refresh: 1000,
            offset: 0,
            onEnd() {},
            render(date) {},
        }
    }

    /**
     * 合并参数
     */
    mergeOptions(options) {
        const defaultOptions = this.setDefaults()

        for (let i in defaultOptions) {
            if (defaultOptions.hasOwnProperty(i)) {
                this.options[i] = typeof options[i] !== `undefined` ? options[i] : defaultOptions[i]

                if (i === `date` && typeof this.options.date !== `object`) {
                    this.options.date = new Date(this.options.date)
                }

                if (typeof this.options[i] === `function`) {
                    this.options[i] = this.options[i].bind(this)
                }
            }
        }

        if (typeof this.options.date !== `object`) {
            this.options.date = new Date(this.options.date)
        }
    }

    /**
     * 计算日期差
     */
    getDiffDate() {
        let diff = (this.options.date.getTime() - Date.now() + this.options.offset) / 1000

        let dateData = {
            years: 0,
            days: 0,
            hours: 0,
            min: 0,
            sec: 0,
            millisec: 0,
        }

        if (diff <= 0) {
            if (this.interval) {
                this.stop()
                this.options.onEnd()
            }
            return dateData
        }

        if (diff >= (365.25 * 86400)) {
            dateData.years = Math.floor(diff / (365.25 * 86400))
            diff -= dateData.years * 365.25 * 86400
        }

        if (diff >= 86400) {
            dateData.days = Math.floor(diff / 86400)
            diff -= dateData.days * 86400
        }

        if (diff >= 3600) {
            dateData.hours = Math.floor(diff / 3600)
            diff -= dateData.hours * 3600
        }

        if (diff >= 60) {
            dateData.min = Math.floor(diff / 60)
            diff -= dateData.min * 60
        }

        dateData.sec = Math.round(diff)

        dateData.millisec = diff % 1 * 1000

        return dateData
    }

    /**
     * 补零
     */
    leadingZeros(num, length = 2) {
        num = String(num)
        if (num.length > length) return num
        return (Array(length + 1).join(`0`) + num).substr(-length)
    }

    /**
     * 更新组件
     */
    update(newDate) {
        this.options.date = typeof newDate !== `object` ? new Date(newDate) : newDate
        this.render()
        return this
    }

    /**
     * 停止倒计时
     */
    stop() {
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = !1
        }
        return this
    }

    /**
     * 渲染组件
     */
    render() {
        this.options.render(this.getDiffDate())
        return this
    }

    /**
     * 启动倒计时
     */
    start() {
        if (this.interval) return !1
        this.render()
        if (this.options.refresh) {
            this.interval = setInterval(() => {
                this.render()
            }, this.options.refresh)
        }
        return this
    }

    /**
     * 更新offset
     */
    updateOffset(offset) {
        this.options.offset = offset
        return this
    }

    /**
     * 重启倒计时
     */
    restart(options = {}) {
        this.mergeOptions(options)
        this.interval = !1
        this.start()
        return this
    }
}

export default Countdown