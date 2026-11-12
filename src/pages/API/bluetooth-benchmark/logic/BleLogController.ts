import { ref, computed, Ref } from 'vue'
import { LogKind, LogFilterMode, TestLog, LogDeviceContext, BleApiTrace } from './BleWorkspaceTypes.ts'

export type BleLogContext = {
	displayDeviceName : (deviceId : string) => string
	connectedIds : Ref<string[]>
}

export function createBleLogController(context : BleLogContext) {
	const { displayDeviceName, connectedIds } = context

	const logSequence = ref(0)

	const logs = ref([] as TestLog[])

	const apiTraces = ref([] as BleApiTrace[])

	const logDevices = ref([] as LogDeviceContext[])

	const logFilterMode = ref('all' as LogFilterMode)

	const selectedLogDeviceId = ref('')

	const visibleLogDevices = computed(() : LogDeviceContext[] => {
		const result = logDevices.value.filter((device : LogDeviceContext) : boolean => {
			if (device.state == 'connected' || device.state == 'connecting' || device.state == 'disconnecting') return true
			return logs.value.findIndex((log : TestLog) => log.deviceId == device.deviceId) >= 0
		})
		result.sort((a : LogDeviceContext, b : LogDeviceContext) => b.lastActivity - a.lastActivity)
		return result
	})

	function padTime(value : number, length : number) : string {
		let result = value.toString()
		while (result.length < length) result = '0' + result
		return result
	}

	function nowText() : string {
		const date = new Date()
		return padTime(date.getHours(), 2) + ':' + padTime(date.getMinutes(), 2) + ':' + padTime(date.getSeconds(), 2) + '.' + padTime(date.getMilliseconds(), 3)
	}

	function logDeviceContext(deviceId : string) : LogDeviceContext | null {
		for (let index = 0; index < logDevices.value.length; index++) {
			if (logDevices.value[index].deviceId == deviceId) return logDevices.value[index]
		}
		return null
	}

	function resolvedLogDeviceName(deviceId : string) : string {
		const name = displayDeviceName(deviceId)
		return name == deviceId ? '未知设备' : name
	}

	function ensureLogDevice(deviceId : string, state : string = '') : LogDeviceContext {
		let device = logDeviceContext(deviceId)
		const name = resolvedLogDeviceName(deviceId)
		if (device == null) {
			device = { deviceId: deviceId, name: name, state: state.length > 0 ? state : 'disconnected', attemptNo: 0, lastActivity: Date.now() }
			logDevices.value.push(device!)
		} else {
			device!.name = name
			if (state.length > 0) device!.state = state
			device!.lastActivity = Date.now()
		}
		return device!
	}

	function updateLogDeviceState(deviceId : string, state : string) {
		ensureLogDevice(deviceId, state)
	}

	function beginConnectionAttempt(deviceId : string) {
		const device = ensureLogDevice(deviceId, 'connecting')
		device.attemptNo++
		device.lastActivity = Date.now()
	}

	function appendLog(log : TestLog) {
		logs.value.unshift(log)
		if (logs.value.length > 300) logs.value.pop()
		pruneLogDevices()
	}

	function addGlobalLog(kind : LogKind, api : string, detail : string) {
		logSequence.value++
		appendLog({ id: logSequence.value, time: nowText(), kind: kind, scope: 'global', api: api, detail: detail, deviceId: '', deviceName: '', serviceId: '', characteristicId: '', attemptNo: 0 })
	}

	function addDeviceLog(kind : LogKind, api : string, detail : string, deviceId : string, serviceId : string = '', characteristicId : string = '') {
		const device = ensureLogDevice(deviceId)
		logSequence.value++
		const timestamp = Date.now()
		device.lastActivity = timestamp
		appendLog({ id: logSequence.value, time: nowText(), kind: kind, scope: 'device', api: api, detail: detail, deviceId: deviceId, deviceName: device.name, serviceId: serviceId, characteristicId: characteristicId, attemptNo: device.attemptNo })
	}

	function pruneLogDevices() {
		logDevices.value = logDevices.value.filter((device : LogDeviceContext) : boolean => {
			if (device.state == 'connected' || device.state == 'connecting' || device.state == 'disconnecting') return true
			return logs.value.findIndex((log : TestLog) => log.deviceId == device.deviceId) >= 0
		})
		if (logFilterMode.value == 'device' && logDeviceContext(selectedLogDeviceId.value) == null) {
			logFilterMode.value = 'all'
			selectedLogDeviceId.value = ''
		}
	}

	function clearLogs() {
		logs.value = [] as TestLog[]
		logFilterMode.value = 'all'
		selectedLogDeviceId.value = ''
		logDevices.value = logDevices.value.filter((device : LogDeviceContext) : boolean => device.state == 'connected' || device.state == 'connecting' || device.state == 'disconnecting' || connectedIds.value.indexOf(device.deviceId) >= 0)
	}

	function setLogFilter(mode : LogFilterMode) {
		logFilterMode.value = mode
		if (mode != 'device') selectedLogDeviceId.value = ''
	}

	function selectLogDevice(deviceId : string) {
		selectedLogDeviceId.value = deviceId
		logFilterMode.value = 'device'
	}

	function errorText(error : IUniError) : string {
		const code = error.errCode == null ? 'unknown' : error.errCode.toString()
		return 'errCode=' + code + ' errMsg=' + error.errMsg
	}

	function recordApiTrace(trace : BleApiTrace) {
		apiTraces.value.unshift(trace)
		if (apiTraces.value.length > 500) apiTraces.value.splice(500)
	}

	return {
		logs, apiTraces, logFilterMode, selectedLogDeviceId, visibleLogDevices,
		nowText, logDeviceContext, updateLogDeviceState, beginConnectionAttempt,
		addGlobalLog, addDeviceLog, clearLogs, setLogFilter, selectLogDevice, errorText, recordApiTrace
	}
}
