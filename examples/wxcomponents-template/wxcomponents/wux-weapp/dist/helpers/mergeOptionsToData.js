/**
 * 过滤对象的函数属性
 * @param {Object} opts
 */
const mergeOptionsToData = (opts = {}) => {
    const options = Object.assign({}, opts)

    for (const key in options) {
        if (options.hasOwnProperty(key) && typeof options[key] === 'function') {
            delete options[key]
        }
    }

    return options
}

export default mergeOptionsToData