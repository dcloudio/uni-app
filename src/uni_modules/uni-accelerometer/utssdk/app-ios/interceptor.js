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

export function initOnAccelerometerChange (originalOnAccelerometerChange) {
  return function (callback) {
	if (getKey(callback) != undefined) {
		return
	}  
    const id = originalOnAccelerometerChange(callback);
	setValue(id, callback);
  }
}

export function initOffAccelerometerChange (originalOffAccelerometerChange) {
	return function (callback) {
		if (callback == null) {
			originalOffAccelerometerChange(null)
			keyToValue.clear()
			valueToKey.clear()
		}else {
			let key = getKey(callback)
			originalOffAccelerometerChange(key)
			deleteValue(callback)
		}
	}
}