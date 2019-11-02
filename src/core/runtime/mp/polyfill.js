export default {
  beforeCreate () {
    // TODO 先简单处理
    this.data = this

    this.setData = (data, callback) => {
      // TODO data path: array[0].text,object.text
      Object.keys(data).forEach(name => {
        this[name] = data[name]
      })
    }

    const oldEmit = this.$emit
    this.triggerEvent = (eventName, detail, options) => {
      oldEmit.call(this, eventName, {
        detail
      })
    }
  }
}
