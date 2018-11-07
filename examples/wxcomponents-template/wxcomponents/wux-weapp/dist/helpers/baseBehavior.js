/**
 * Simple bind, faster than native
 *
 * @param {Function} fn
 * @param {Object} ctx
 * @return {Function}
 */
const bind = (fn, ctx) => {
    return (...args) => {
        return args.length ? fn.apply(ctx, args) : fn.call(ctx)
    }
}

/**
 * Object assign
 */
const assign = (...args) => Object.assign({}, ...args)

export default Behavior({
    properties: {
        visible: {
            type: Boolean,
            value: false,
        },
    },
    methods: {
        /**
         * 合并参数并绑定方法
         * 
         * @param {Object} opts 参数对象
         * @param {Object} fns 方法挂载的属性
         */
        $$mergeOptionsAndBindMethods(opts = {}, fns = this.fns) {
            const options = Object.assign({}, opts)

            for (const key in options) {
                if (options.hasOwnProperty(key) && typeof options[key] === 'function') {
                    fns[key] = bind(options[key], this)
                    delete options[key]
                }
            }

            return options
        },
        /**
         * Promise setData
         * @param {Array} args 参数对象
         */
        $$setData(...args) {
            const params = assign({}, ...args)

            return new Promise((resolve) => {
                this.setData(params, resolve)
            })
        },
        /**
         * 延迟指定时间执行回调函数
         * @param {Function} callback 回调函数
         * @param {Number} timeout 延迟时间
         */
        $$requestAnimationFrame(callback = () => {}, timeout = 1000 / 60) {
            return new Promise((resolve) => setTimeout(resolve, timeout)).then(callback)
        },
    },
    /**
     * 组件生命周期函数，在组件实例进入页面节点树时执行
     */
    created() {
        this.fns = {}
    },
    /**
     * 组件生命周期函数，在组件实例被从页面节点树移除时执行
     */
    detached() {
        this.fns = {}
    },
})