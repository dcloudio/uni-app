import { ref, ComputedRef } from 'vue'
import { RawTestDevice, EventRow, EventProbeLog, LogKind } from './BleWorkspaceTypes.ts'
import { BleApiGateway } from './BleApiGateway.ts'

export type BleEventContext = {
	bleApiGateway : BleApiGateway
	addGlobalLog : (kind : LogKind, api : string, detail : string) => void
	listenerUsesIds : boolean
	runningTasks : ComputedRef<number>
	upsertDevices : (incoming : RawTestDevice[]) => void
	scanControlActive : ComputedRef<boolean>
	addDeviceLog : (kind : LogKind, api : string, detail : string, deviceId : string, serviceId ?: string, characteristicId ?: string) => void
	projectAdapterState : (result : { available : boolean, discovering : boolean }) => void
	projectDevices : (result : { devices : RawTestDevice[] }) => void
	projectConnection : (result : { deviceId : string, connected : boolean }) => void
	projectValue : (result : { deviceId : string, serviceId : string, characteristicId : string, value : ArrayBuffer }) => void
}

// Listener identities and timers belong to this workspace instance.
export function createBleEventController(context : BleEventContext) {
	const { bleApiGateway, addGlobalLog, listenerUsesIds, runningTasks, upsertDevices, scanControlActive, addDeviceLog, projectAdapterState, projectDevices, projectConnection, projectValue } = context

	// #ifdef MP-WEIXIN
	const wechatDeviceFlushInterval = 200
	let pendingWechatDevices = [] as RawTestDevice[]
	let pendingWechatDeviceEvents = 0
	let wechatDeviceFlushTimer = 0
	// #endif

	let coreAdapterListenerId = 0

	let coreDeviceListenerId = 0

	let coreConnectionListenerId = 0

	let coreValueListenerId = 0

	const eventRows = ref([
		{ key: 'adapter', name: '适配器状态', api: 'onBluetoothAdapterStateChange', platform: '', supported: true, bOffMode: 'callback', aId: 0, bId: 0, aCount: 0, bCount: 0, logs: [] as EventProbeLog[], logOpen: false },
		{ key: 'device', name: '发现设备', api: 'onBluetoothDeviceFound', platform: '', supported: true, bOffMode: 'null', aId: 0, bId: 0, aCount: 0, bCount: 0, logs: [] as EventProbeLog[], logOpen: false },
		{ key: 'connection', name: '连接状态', api: 'onBLEConnectionStateChange', platform: '', supported: true, bOffMode: 'omitted', aId: 0, bId: 0, aCount: 0, bCount: 0, logs: [] as EventProbeLog[], logOpen: false },
		{ key: 'value', name: '特征值变化', api: 'onBLECharacteristicValueChange', platform: '', supported: true, bOffMode: 'callback', aId: 0, bId: 0, aCount: 0, bCount: 0, logs: [] as EventProbeLog[], logOpen: false },
		// #ifdef APP-ANDROID
		{ key: 'mtu', name: 'MTU 变化', api: 'onBLEMTUChange', platform: 'Android', supported: true, bOffMode: 'callback', aId: 0, bId: 0, aCount: 0, bCount: 0, logs: [] as EventProbeLog[], logOpen: false }
		// #endif
	] as EventRow[])

	function eventRow(key : string) : EventRow | null {
		for (let index = 0; index < eventRows.value.length; index++) {
			if (eventRows.value[index].key == key) return eventRows.value[index]
		}
		return null
	}

	function bumpEvent(key : string, slot : string) {
		const row = eventRow(key)
		if (row == null) return
		if (slot == 'A') {
			row!.aCount++
		} else {
			row!.bCount++
		}
	}

	const maximumEventLogCount = 100

	function twoDigits(value : number) : string {
		return value < 10 ? '0' + value.toString() : value.toString()
	}

	function threeDigits(value : number) : string {
		return value < 10 ? '00' + value.toString() : (value < 100 ? '0' + value.toString() : value.toString())
	}

	function eventLogTime() : string {
		const now = new Date()
		return twoDigits(now.getHours()) + ':' + twoDigits(now.getMinutes()) + ':' + twoDigits(now.getSeconds()) + '.' + threeDigits(now.getMilliseconds())
	}

	function appendEventLog(key : string, slot : string, detail : string) {
		const row = eventRow(key)
		if (row == null) return
		const shouldOpen = row!.logs.length == 0
		row!.logs.push({ slot: slot, time: eventLogTime(), detail: detail })
		if (shouldOpen) row!.logOpen = true
		if (row!.logs.length > maximumEventLogCount) row!.logs.shift()
		// 事件命中同时写入全局日志，便于在「日志」tab 按 A/B 区分。
		addGlobalLog('event', row!.api, '监听' + slot + (detail.length > 0 ? ' · ' + detail : ''))
	}

	function toggleEventLogOpen(row : EventRow) {
		row.logOpen = !row.logOpen
	}

	function clearEventLogs(row : EventRow) {
		row.logs = [] as EventProbeLog[]
	}

	function listenerRegistered(id : number | null) : boolean {
		return id != null && id != 0
	}

	function subscribeEvent(row : EventRow, slot : string) {
		if (!row.supported) return
		if (slot == 'A' && listenerRegistered(row.aId)) return
		if (slot == 'B' && listenerRegistered(row.bId)) return
		let id = -1
		// #ifdef APP
		if (row.key == 'adapter') id = bleApiGateway.onBluetoothAdapterStateChange(slot == 'A' ? adapterCallbackA : adapterCallbackB)
		else if (row.key == 'device') id = bleApiGateway.onBluetoothDeviceFound(slot == 'A' ? deviceCallbackA : deviceCallbackB)
		else if (row.key == 'connection') id = bleApiGateway.onBLEConnectionStateChange(slot == 'A' ? connectionCallbackA : connectionCallbackB)
		else if (row.key == 'value') id = bleApiGateway.onBLECharacteristicValueChange(slot == 'A' ? valueCallbackA : valueCallbackB)
		else if (row.key == 'mtu') id = bleApiGateway.onBLEMTUChange(slot == 'A' ? mtuCallbackA : mtuCallbackB)
		// #endif
		// #ifdef MP-WEIXIN
		// 微信事件 API 不返回 listener ID。由核心回调统一分发，避免测试监听覆盖工作台监听。
		// #endif
		if (slot == 'A') row.aId = id
		else row.bId = id
		addGlobalLog('success', row.api, '监听' + slot + (listenerUsesIds ? ' listenerId=' + id.toString() : ' callback'))
	}

	function clearEventIds(row : EventRow) {
		row.aId = 0
		row.bId = 0
	}

	function offEventById(row : EventRow, slot : string) {
		const id = slot == 'A' ? row.aId : row.bId
		if (!listenerRegistered(id) || id! <= 0) return
		if (row.key == 'adapter') bleApiGateway.offBluetoothAdapterStateChange(id)
		else if (row.key == 'device') bleApiGateway.offBluetoothDeviceFound(id)
		else if (row.key == 'connection') bleApiGateway.offBLEConnectionStateChange(id)
		else if (row.key == 'value') bleApiGateway.offBLECharacteristicValueChange(id)
		else if (row.key == 'mtu') bleApiGateway.offBLEMTUChange(id)
		if (slot == 'A') row.aId = 0
		else row.bId = 0
		addGlobalLog('success', row.api.replace('on', 'off'), 'mode=ID 监听' + slot + ' listenerId=' + id.toString())
	}

	function offEventByCallback(row : EventRow, slot : string) {
		// #ifdef APP
		if (row.key == 'adapter') bleApiGateway.offBluetoothAdapterStateChange(slot == 'A' ? adapterCallbackA : adapterCallbackB)
		else if (row.key == 'device') bleApiGateway.offBluetoothDeviceFound(slot == 'A' ? deviceCallbackA : deviceCallbackB)
		else if (row.key == 'connection') bleApiGateway.offBLEConnectionStateChange(slot == 'A' ? connectionCallbackA : connectionCallbackB)
		else if (row.key == 'value') bleApiGateway.offBLECharacteristicValueChange(slot == 'A' ? valueCallbackA : valueCallbackB)
		else if (row.key == 'mtu') bleApiGateway.offBLEMTUChange(slot == 'A' ? mtuCallbackA : mtuCallbackB)
		// #endif
		if (listenerUsesIds) {
			clearEventIds(row)
			restoreCoreListener(row.key)
			addGlobalLog('success', row.api.replace('on', 'off'), 'mode=callback 监听' + slot + ' · clears all listeners')
		} else {
			if (slot == 'A') row.aId = 0
			else row.bId = 0
			addGlobalLog('success', row.api.replace('on', 'off'), 'mode=callback 监听' + slot)
		}
	}

	function offEventByNull(row : EventRow) {
		if (row.key == 'adapter') bleApiGateway.offBluetoothAdapterStateChange(null)
		else if (row.key == 'device') bleApiGateway.offBluetoothDeviceFound(null)
		else if (row.key == 'connection') bleApiGateway.offBLEConnectionStateChange(null)
		else if (row.key == 'value') bleApiGateway.offBLECharacteristicValueChange(null)
		else if (row.key == 'mtu') bleApiGateway.offBLEMTUChange(null)
		clearEventIds(row)
		restoreCoreListener(row.key)
		addGlobalLog('success', row.api.replace('on', 'off'), 'mode=null · clears all listeners')
	}

	function offEventOmitted(row : EventRow) {
		if (row.key == 'adapter') bleApiGateway.offBluetoothAdapterStateChange()
		else if (row.key == 'device') bleApiGateway.offBluetoothDeviceFound()
		else if (row.key == 'connection') bleApiGateway.offBLEConnectionStateChange()
		else if (row.key == 'value') bleApiGateway.offBLECharacteristicValueChange()
		else if (row.key == 'mtu') bleApiGateway.offBLEMTUChange()
		clearEventIds(row)
		restoreCoreListener(row.key)
		addGlobalLog('success', row.api.replace('on', 'off'), 'mode=omitted · clears all listeners')
	}

	function toggleEventListener(row : EventRow, slot : string) {
		if (!row.supported) return
		const id = slot == 'A' ? row.aId : row.bId
		if (!listenerRegistered(id)) {
			subscribeEvent(row, slot)
			return
		}
		if (runningTasks.value > 0 && slot == 'B' && row.bOffMode != 'id') {
			addGlobalLog('fail', row.api.replace('on', 'off'), '并发任务运行中，已阻止会清空全局监听的解绑测试')
			return
		}
		if (slot == 'A' && listenerUsesIds) offEventById(row, slot)
		else if (slot == 'A') offEventByCallback(row, slot)
		else if (row.bOffMode == 'null') offEventByNull(row)
		else if (row.bOffMode == 'omitted') offEventOmitted(row)
		else offEventByCallback(row, slot)
	}

	function clearListenersInternal(shouldLog : boolean) {
		bleApiGateway.offBluetoothAdapterStateChange()
		bleApiGateway.offBluetoothDeviceFound()
		bleApiGateway.offBLEConnectionStateChange()
		bleApiGateway.offBLECharacteristicValueChange()
		coreAdapterListenerId = 0
		coreDeviceListenerId = 0
		coreConnectionListenerId = 0
		coreValueListenerId = 0
		const mtuRow = eventRow('mtu')
		if (mtuRow != null && mtuRow!.supported) bleApiGateway.offBLEMTUChange()
		eventRows.value.forEach((row : EventRow) => clearEventIds(row))
		if (shouldLog) {
			registerCoreListeners()
			addGlobalLog('success', 'off(all)', 'probe listeners removed · workspace listeners restored')
		}
	}

	function clearListeners() {
		if (runningTasks.value > 0) {
			addGlobalLog('fail', 'off(all)', '并发任务运行中，已阻止清空全局监听')
			return
		}
		clearListenersInternal(true)
	}

	// #ifdef MP-WEIXIN
	function clearWechatDeviceQueue() {
		if (wechatDeviceFlushTimer != 0) clearTimeout(wechatDeviceFlushTimer)
		wechatDeviceFlushTimer = 0
		pendingWechatDevices = [] as RawTestDevice[]
		pendingWechatDeviceEvents = 0
	}

	function flushWechatDeviceEvents() {
		if (wechatDeviceFlushTimer != 0) clearTimeout(wechatDeviceFlushTimer)
		wechatDeviceFlushTimer = 0
		const queuedDevices = pendingWechatDevices
		const eventCount = pendingWechatDeviceEvents
		pendingWechatDevices = [] as RawTestDevice[]
		pendingWechatDeviceEvents = 0
		if (queuedDevices.length == 0) return
		upsertDevices(queuedDevices)
		addGlobalLog('event', 'onBluetoothDeviceFound', eventCount.toString() + ' events · ' + queuedDevices.length.toString() + ' reports')
		appendEventLog('device', 'AB', 'batch · ' + eventCount.toString() + ' events · ' + queuedDevices.length.toString() + ' reports')
		bumpRegisteredEventsBy('device', eventCount)
	}

	function queueWechatDeviceEvents(result : { devices : RawTestDevice[] }) {
		if (!scanControlActive.value) return
		result.devices.forEach((device : RawTestDevice) => pendingWechatDevices.push(device))
		pendingWechatDeviceEvents++
		if (wechatDeviceFlushTimer != 0) return
		wechatDeviceFlushTimer = setTimeout(() => flushWechatDeviceEvents(), wechatDeviceFlushInterval)
	}
	// #endif

	function bumpRegisteredEventsBy(key : string, count : number) {
		const row = eventRow(key)
		if (row == null) return
		if (listenerRegistered(row!.aId)) row!.aCount += count
		if (listenerRegistered(row!.bId)) row!.bCount += count
	}

	function bumpRegisteredEvents(key : string) { bumpRegisteredEventsBy(key, 1) }

	function handleAdapterA(result : { available : boolean, discovering : boolean }) { bumpEvent('adapter', 'A'); appendEventLog('adapter', 'A', 'available=' + result.available.toString() + ' discovering=' + result.discovering.toString()) }

	function handleAdapterB(result : { available : boolean, discovering : boolean }) { bumpEvent('adapter', 'B'); appendEventLog('adapter', 'B', 'available=' + result.available.toString() + ' discovering=' + result.discovering.toString()) }

	function handleDeviceA(result : { devices : RawTestDevice[] }) { bumpEvent('device', 'A'); appendEventLog('device', 'A', 'devices=' + result.devices.length.toString()) }

	function handleDeviceB(result : { devices : RawTestDevice[] }) { bumpEvent('device', 'B'); appendEventLog('device', 'B', 'devices=' + result.devices.length.toString()) }

	function handleConnectionA(result : { deviceId : string, connected : boolean }) { bumpEvent('connection', 'A'); appendEventLog('connection', 'A', result.deviceId + ' · ' + (result.connected ? 'connected' : 'disconnected')) }

	function handleConnectionB(result : { deviceId : string, connected : boolean }) { bumpEvent('connection', 'B'); appendEventLog('connection', 'B', result.deviceId + ' · ' + (result.connected ? 'connected' : 'disconnected')) }

	function handleValueA(result : { deviceId : string, serviceId : string, characteristicId : string, value : ArrayBuffer }) { bumpEvent('value', 'A'); appendEventLog('value', 'A', 'bytes=' + result.value.byteLength.toString()) }

	function handleValueB(result : { deviceId : string, serviceId : string, characteristicId : string, value : ArrayBuffer }) { bumpEvent('value', 'B'); appendEventLog('value', 'B', 'bytes=' + result.value.byteLength.toString()) }

	function handleMTUA(result : { deviceId : string, mtu : number }) { bumpEvent('mtu', 'A'); appendEventLog('mtu', 'A', 'mtu=' + result.mtu.toString()); addDeviceLog('event', 'onBLEMTUChange', 'mtu=' + result.mtu.toString(), result.deviceId) }

	function handleMTUB(result : { deviceId : string, mtu : number }) { bumpEvent('mtu', 'B'); appendEventLog('mtu', 'B', 'mtu=' + result.mtu.toString()) }

	const adapterCallbackA = (result : { available : boolean, discovering : boolean }) => handleAdapterA(result)

	const adapterCallbackB = (result : { available : boolean, discovering : boolean }) => handleAdapterB(result)

	const deviceCallbackA = (result : { devices : RawTestDevice[] }) => handleDeviceA(result)

	const deviceCallbackB = (result : { devices : RawTestDevice[] }) => handleDeviceB(result)

	const connectionCallbackA = (result : { deviceId : string, connected : boolean }) => handleConnectionA(result)

	const connectionCallbackB = (result : { deviceId : string, connected : boolean }) => handleConnectionB(result)

	const valueCallbackA = (result : { deviceId : string, serviceId : string, characteristicId : string, value : ArrayBuffer }) => handleValueA(result)

	const valueCallbackB = (result : { deviceId : string, serviceId : string, characteristicId : string, value : ArrayBuffer }) => handleValueB(result)

	const mtuCallbackA = (result : { deviceId : string, mtu : number }) => handleMTUA(result)

	const mtuCallbackB = (result : { deviceId : string, mtu : number }) => handleMTUB(result)

	const coreAdapterCallback = (result : { available : boolean, discovering : boolean }) => projectAdapterState(result)

	const coreDeviceCallback = (result : { devices : RawTestDevice[] }) => projectDevices(result)

	const coreConnectionCallback = (result : { deviceId : string, connected : boolean }) => projectConnection(result)

	const coreValueCallback = (result : { deviceId : string, serviceId : string, characteristicId : string, value : ArrayBuffer }) => projectValue(result)

	function registerCoreListener(key : string) {
		// #ifdef APP
		if (key == 'adapter' && coreAdapterListenerId == 0) coreAdapterListenerId = bleApiGateway.onBluetoothAdapterStateChange(coreAdapterCallback)
		else if (key == 'device' && coreDeviceListenerId == 0) coreDeviceListenerId = bleApiGateway.onBluetoothDeviceFound(coreDeviceCallback)
		else if (key == 'connection' && coreConnectionListenerId == 0) coreConnectionListenerId = bleApiGateway.onBLEConnectionStateChange(coreConnectionCallback)
		else if (key == 'value' && coreValueListenerId == 0) coreValueListenerId = bleApiGateway.onBLECharacteristicValueChange(coreValueCallback)
		// #endif
		// #ifdef MP-WEIXIN
		if (key == 'adapter' && coreAdapterListenerId == 0) { bleApiGateway.onBluetoothAdapterStateChange(coreAdapterCallback); coreAdapterListenerId = -1 }
		else if (key == 'device' && coreDeviceListenerId == 0) { bleApiGateway.onBluetoothDeviceFound(coreDeviceCallback); coreDeviceListenerId = -1 }
		else if (key == 'connection' && coreConnectionListenerId == 0) { bleApiGateway.onBLEConnectionStateChange(coreConnectionCallback); coreConnectionListenerId = -1 }
		else if (key == 'value' && coreValueListenerId == 0) { bleApiGateway.onBLECharacteristicValueChange(coreValueCallback); coreValueListenerId = -1 }
		// #endif
	}

	function registerCoreListeners() {
		registerCoreListener('adapter')
		registerCoreListener('device')
		registerCoreListener('connection')
		registerCoreListener('value')
	}

	function restoreCoreListener(key : string) {
		if (key == 'adapter') coreAdapterListenerId = 0
		else if (key == 'device') coreDeviceListenerId = 0
		else if (key == 'connection') coreConnectionListenerId = 0
		else if (key == 'value') coreValueListenerId = 0
		registerCoreListener(key)
	}

	function restoreAfterListenerRemoval(key : string) {
		const row = eventRow(key)
		if (row != null) clearEventIds(row!)
		restoreCoreListener(key)
	}

	return {
		eventRows,
		subscribeEvent, toggleEventListener, clearListenersInternal, clearListeners, toggleEventLogOpen, clearEventLogs,
		bumpRegisteredEvents, registerCoreListeners, restoreAfterListenerRemoval,
		// #ifdef MP-WEIXIN
		clearWechatDeviceQueue, queueWechatDeviceEvents,
		// #endif
	}
}
