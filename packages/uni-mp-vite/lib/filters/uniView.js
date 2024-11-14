module.exports = {
    sS: function (newValue, oldValue, _ownerInstance, instance) {
        if (newValue) {
            instance.setStyle(newValue)
        }
    }
}