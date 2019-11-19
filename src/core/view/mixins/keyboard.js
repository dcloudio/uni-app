function hideKeyboard () {
  document.activeElement.blur()
}

export default {
  name: 'Keyboard',
  beforeDestroy () {
    UniViewJSBridge.unsubscribe('hideKeyboard', hideKeyboard)
  },
  methods: {
    initKeyboard (el) {
      el.addEventListener('focus', () => {
        UniViewJSBridge.subscribe('hideKeyboard', hideKeyboard)
      })
      el.addEventListener('blur', () => {
        UniViewJSBridge.unsubscribe('hideKeyboard', hideKeyboard)
      })
    }
  }
}
