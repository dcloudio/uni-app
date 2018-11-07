const ENTER = 'enter'
const ENTERING = 'entering'
const ENTERED = 'entered'
const EXIT = 'exit'
const EXITING = 'exiting'
const EXITED = 'exited'
const UNMOUNTED = 'unmounted'

const TRANSITION = 'transition'
const ANIMATION = 'animation'

const TIMEOUT = 1000 / 60

const defaultClassNames = {
    enter: '', // 进入过渡的开始状态，在过渡过程完成之后移除
    enterActive: '', // 进入过渡的结束状态，在过渡过程完成之后移除
    enterDone: '', // 进入过渡的完成状态
    exit: '', // 离开过渡的开始状态，在过渡过程完成之后移除
    exitActive: '', // 离开过渡的结束状态，在过渡过程完成之后移除
    exitDone: '', // 离开过渡的完成状态
}

Component({
    externalClasses: ['wux-class'],
    data: {
        animateCss: '', // 动画样式
        animateStatus: EXITED, // 动画状态，可选值 entering、entered、exiting、exited
        isMounting: false, // 是否首次挂载
    },
    properties: {
        // 触发组件进入或离开过渡的状态
        in: {
            type: Boolean,
            value: false,
            observer(newVal) {
                if (this.data.isMounting) {
                    this.updated(newVal)
                }
            },
        },
        // 过渡的类名
        classNames: {
            type: null,
            value: defaultClassNames,
        },
        // 过渡持续时间
        duration: {
            type: null,
            value: null,
        },
        // 过渡动效的类型
        type: {
            type: String,
            value: TRANSITION,
        },
        // 首次挂载时是否触发进入过渡
        appear: {
            type: Boolean,
            value: false,
        },
        // 是否启用进入过渡
        enter: {
            type: Boolean,
            value: true,
        },
        // 是否启用离开过渡
        exit: {
            type: Boolean,
            value: true,
        },
        // 首次进入过渡时是否懒挂载组件
        mountOnEnter: {
            type: Boolean,
            value: true,
        },
        // 离开过渡完成时是否卸载组件
        unmountOnExit: {
            type: Boolean,
            value: true,
        },
    },
    methods: {
        /**
         * 监听过渡或动画的回调函数
         */
        addEventListener() {
            const { animateStatus } = this.data
            const { enter, exit } = this.getTimeouts()

            if (animateStatus === ENTERING && !enter && this.data.enter) {
                this.performEntered()
            }

            if (animateStatus === EXITING && !exit && this.data.exit) {
                this.performExited()
            }
        },
        /**
         * 会在 WXSS transition 或 wx.createAnimation 动画结束后触发
         */
        onTransitionEnd() {
            if (this.data.type === TRANSITION) {
                this.addEventListener()
            }
        },
        /**
         * 会在一个 WXSS animation 动画完成时触发
         */
        onAnimationEnd() {
            if (this.data.type === ANIMATION) {
                this.addEventListener()
            }
        },
        /**
         * 更新组件状态
         * @param {String} nextStatus 下一状态，ENTERING 或 EXITING
         * @param {Boolean} mounting 是否首次挂载
         */
        updateStatus(nextStatus, mounting = false) {
            if (nextStatus !== null) {
                this.cancelNextCallback()
                this.isAppearing = mounting

                if (nextStatus === ENTERING) {
                    this.performEnter()
                } else {
                    this.performExit()
                }
            }
        },
        /**
         * 进入过渡
         */
        performEnter() {
            const { className, activeClassName } = this.getClassNames(ENTER)
            const { enter } = this.getTimeouts()
            const enterParams = {
                animateStatus: ENTER,
                animateCss: className,
            }
            const enteringParams = {
                animateStatus: ENTERING,
                animateCss: `${className} ${activeClassName}`,
            }

            // 若已禁用进入过渡，则更新状态至 ENTERED
            if (!this.isAppearing && !this.data.enter) {
                return this.performEntered()
            }

            // 第一阶段：设置进入过渡的开始状态，并触发 ENTER 事件
            // 第二阶段：延迟一帧后，设置进入过渡的结束状态，并触发 ENTERING 事件
            // 第三阶段：若已设置过渡的持续时间，则延迟指定时间后触发进入过渡完成 performEntered，否则等待触发 onTransitionEnd 或 onAnimationEnd
            this.safeSetData(enterParams, () => {
                this.triggerEvent('change', { animateStatus: ENTER })
                this.triggerEvent(ENTER, { isAppearing: this.isAppearing })

                // 由于有些时候不能正确的触发动画完成的回调，具体原因未知
                // 所以采用延迟一帧的方式来确保可以触发回调
                this.delayHandler(TIMEOUT, () => {
                    this.safeSetData(enteringParams, () => {
                        this.triggerEvent('change', { animateStatus: ENTERING })
                        this.triggerEvent(ENTERING, { isAppearing: this.isAppearing })

                        if (enter) {
                            this.delayHandler(enter, this.performEntered)
                        }
                    })
                })
            })
        },
        /**
         * 进入过渡完成
         */
        performEntered() {
            const { doneClassName } = this.getClassNames(ENTER)
            const enteredParams = {
                animateStatus: ENTERED,
                animateCss: doneClassName,
            }

            // 第三阶段：设置进入过渡的完成状态，并触发 ENTERED 事件            
            this.safeSetData(enteredParams, () => {
                this.triggerEvent('change', { animateStatus: ENTERED })
                this.triggerEvent(ENTERED, { isAppearing: this.isAppearing })
            })
        },
        /**
         * 离开过渡
         */
        performExit() {
            const { className, activeClassName } = this.getClassNames(EXIT)
            const { exit } = this.getTimeouts()
            const exitParams = {
                animateStatus: EXIT,
                animateCss: className,
            }
            const exitingParams = {
                animateStatus: EXITING,
                animateCss: `${className} ${activeClassName}`,
            }

            // 若已禁用离开过渡，则更新状态至 EXITED
            if (!this.data.exit) {
                return this.performExited()
            }

            // 第一阶段：设置离开过渡的开始状态，并触发 EXIT 事件
            // 第二阶段：延迟一帧后，设置离开过渡的结束状态，并触发 EXITING 事件
            // 第三阶段：若已设置过渡的持续时间，则延迟指定时间后触发离开过渡完成 performExited，否则等待触发 onTransitionEnd 或 onAnimationEnd
            this.safeSetData(exitParams, () => {
                this.triggerEvent('change', { animateStatus: EXIT })
                this.triggerEvent(EXIT)

                this.delayHandler(TIMEOUT, () => {
                    this.safeSetData(exitingParams, () => {
                        this.triggerEvent('change', { animateStatus: EXITING })
                        this.triggerEvent(EXITING)

                        if (exit) {
                            this.delayHandler(exit, this.performExited)
                        }
                    })
                })
            })
        },
        /**
         * 离开过渡完成
         */
        performExited() {
            const { doneClassName } = this.getClassNames(EXIT)
            const exitedParams = {
                animateStatus: EXITED,
                animateCss: doneClassName,
            }

            // 第三阶段：设置离开过渡的完成状态，并触发 EXITED 事件
            this.safeSetData(exitedParams, () => {
                this.triggerEvent('change', { animateStatus: EXITED })
                this.triggerEvent(EXITED)

                // 判断离开过渡完成时是否卸载组件
                if (this.data.unmountOnExit) {
                    this.setData({ animateStatus: UNMOUNTED }, () => {
                        this.triggerEvent('change', { animateStatus: UNMOUNTED })
                    })
                }
            })
        },
        /**
         * 获取指定状态下的类名
         * @param {String} type 过渡类型，enter 或 exit
         */
        getClassNames(type) {
            const { classNames } = this.data
            const className = typeof classNames !== 'string' ? classNames[type] : `${classNames}-${type}`
            const activeClassName = typeof classNames !== 'string' ? classNames[`${type}Active`] : `${classNames}-${type}-active`
            const doneClassName = typeof classNames !== 'string' ? classNames[`${type}Done`] : `${classNames}-${type}-done`

            return {
                className,
                activeClassName,
                doneClassName,
            }
        },
        /**
         * 获取过渡持续时间
         */
        getTimeouts() {
            const { duration } = this.data

            if (duration !== null && typeof duration === 'object') {
                return {
                    enter: duration.enter,
                    exit: duration.exit,
                }
            } else if (typeof duration === 'number') {
                return {
                    enter: duration,
                    exit: duration,
                }
            }

            return {}
        },
        /**
         * 属性值 in 被更改时的响应函数
         * @param {Boolean} newVal 触发组件进入或离开过渡的状态
         */
        updated(newVal) {
            let { animateStatus } = this.pendingData || this.data
            let nextStatus = null

            if (newVal) {
                if (animateStatus === UNMOUNTED) {
                    animateStatus = EXITED
                    this.setData({ animateStatus: EXITED }, () => {
                        this.triggerEvent('change', { animateStatus: EXITED })
                    })
                }
                if (animateStatus !== ENTER && animateStatus !== ENTERING && animateStatus !== ENTERED) {
                    nextStatus = ENTERING
                }
            } else {
                if (animateStatus === ENTER || animateStatus === ENTERING || animateStatus === ENTERED) {
                    nextStatus = EXITING
                }
            }

            this.updateStatus(nextStatus)
        },
        /**
         * safeSetData
         * @param {Object} nextData 数据对象
         * @param {Function} callback 回调函数
         */
        safeSetData(nextData, callback) {
            this.pendingData = Object.assign({}, this.data, nextData)
            callback = this.setNextCallback(callback)

            this.setData(nextData, () => {
                this.pendingData = null
                callback()
            })
        },
        /**
         * 设置下一回调函数
         * @param {Function} callback 回调函数
         */
        setNextCallback(callback) {
            let active = true

            this.nextCallback = (event) => {
                if (active) {
                    active = false
                    this.nextCallback = null

                    callback.call(this, event)
                }
            }

            this.nextCallback.cancel = () => {
                active = false
            }

            return this.nextCallback
        },
        /**
         * 取消下一回调函数
         */
        cancelNextCallback() {
            if (this.nextCallback !== null) {
                this.nextCallback.cancel()
                this.nextCallback = null
            }
        },
        /**
         * 延迟一段时间触发回调
         * @param {Number} timeout 延迟时间
         * @param {Function} handler 回调函数
         */
        delayHandler(timeout, handler) {
            if (timeout) {
                this.setNextCallback(handler)
                setTimeout(this.nextCallback, timeout)
            }
        },
        /**
         * 点击事件
         */
        onTap() {
            this.triggerEvent('click')
        },
    },
    created() {
        this.nextCallback = null
    },
    attached() {
        let animateStatus = null
        let appearStatus = null

        if (this.data.in) {
            if (this.data.appear) {
                animateStatus = EXITED
                appearStatus = ENTERING
            } else {
                animateStatus = ENTERED
            }
        } else {
            if (this.data.unmountOnExit || this.data.mountOnEnter) {
                animateStatus = UNMOUNTED
            } else {
                animateStatus = EXITED
            }
        }

        // 由于小程序组件首次挂载时 observer 事件总是优先于 attached 事件
        // 所以使用 isMounting 来强制优先触发 attached 事件
        this.safeSetData({ animateStatus, isMounting: true }, () => {
            this.triggerEvent('change', { animateStatus })
            this.updateStatus(appearStatus, true)
        })
    },
    detached() {
        this.cancelNextCallback()
    },
})