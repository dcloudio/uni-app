const keyToValue = new Map()
const valueToKey = new Map()

function setValue(key, value) {
    keyToValue.set(key, value)
    valueToKey.set(value, key)
}

function getValue(key) {
    return keyToValue.get(key)
}

function getKey(value) {
    return valueToKey.get(value)
}

function deleteValue(value) {
	let key = getKey(value)
	if (key != null) {
		keyToValue.delete(key)
		valueToKey.delete(value)
	}
}

export function initOnGyroscopeChange (originalOnGyroscopeChange) {
  return function (callback) {
	if (getKey(callback) != undefined) {
		return
	}  
    const id = originalOnGyroscopeChange(callback);
	setValue(id, callback);
  }
}

export function initOffGyroscopeChange (originalOffGyroscopeChange) {
	return function (callback) {
		if (callback == null) {
			originalOffGyroscopeChange(null)
			keyToValue.clear()
			valueToKey.clear()
		}else {
			let key = getKey(callback)
			originalOffGyroscopeChange(key)
			deleteValue(callback)
		}
	}
}