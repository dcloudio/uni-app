import baseBehavior from '../helpers/baseBehavior'

Component({
    behaviors: [baseBehavior],
    externalClasses: ['wux-class'],
    properties: {
        transparent: {
            type: Boolean,
            value: false,
        },
    },
    methods: {
        /**
         * 保持锁定
         */
        retain() {
            if (typeof this.backdropHolds !== 'number' || !this.backdropHolds) {
                this.backdropHolds = 0
            }

            this.backdropHolds = this.backdropHolds + 1

            if (this.backdropHolds === 1) {
                this.$$setData({ in: true })
            }
        },
        /**
         * 释放锁定
         */
        release() {
            if (this.backdropHolds === 1) {
                this.$$setData({ in: false })
            }
            this.backdropHolds = Math.max(0, this.backdropHolds - 1)
        },
        /**
         * 点击事件
         */
        onClick() {
            this.triggerEvent('click')
        },
    },
})