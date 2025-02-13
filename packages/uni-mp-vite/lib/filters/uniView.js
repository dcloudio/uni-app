module.exports = {
    // setStyle
    sS: function (newValue, oldValue, _ownerInstance, instance) {
        if (newValue) {
            instance.setStyle(newValue)
        }
    },
    // setAnimation
    sA: function (newValue, oldValue, _ownerInstance, instance) {
        if (newValue) {
            instance.setAttr(newValue)
        }
    },
}
