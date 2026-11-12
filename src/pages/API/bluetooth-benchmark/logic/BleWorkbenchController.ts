import { ref, computed, watch } from 'vue'
import { RawTestDevice, TestDevice, DevicePanelRecord, TestCharacteristic, TestService, EventRow, WritePayloadMode, TaskKind, BufferPreview, WriteMode, NotifyMode, ValueDisplayMode, BleApiContext, BleApiTrace, DeviceConnectionEpoch } from './BleWorkspaceTypes.ts'
import { BleApiGateway } from './BleApiGateway.ts'
import { createBleEventController } from './BleEventController.ts'
import { BleEventContext } from './BleEventController.ts'
import { createBleTaskController } from './BleTaskController.ts'
import { BleTaskContext } from './BleTaskController.ts'
import { createBleLogController } from './BleLogController.ts'
import { BleLogContext } from './BleLogController.ts'
import { shortUUID } from './BleUuid.ts'

type NotifyStateRecord = { deviceId : string, serviceId : string, characteristicId : string, connectionGeneration : number, enabled : boolean }

// Callbacks run after the page-scoped controllers have been composed.
export function createBleWorkbenchController() {
	// 顶层步骤：「测试」聚合批量任务（并发）与单 API 契约两个子 tab。
	const steps = ['发现', '设备', '测试', '事件', '日志']

	let listenerUsesIds = false

	let utf8Supported = false
	// #ifdef APP
	listenerUsesIds = true
	utf8Supported = true
	const utf8Decoder = new TextDecoder('utf-8')
	const utf8Encoder = new TextEncoder()
	// #endif

	const activeStep = ref(0)

	// 「测试」tab 的子 tab：并发任务 / 单 API 契约。
	const testTab = ref('concurrency' as BleTestTab)

	const adapterAvailable = ref(false)

	const adapterOpened = ref(false)

	const adapterState = ref('未初始化')

	const adapterOperation = ref('')

	const discovering = ref(false)

	const discoveryElapsed = ref('')

	const storedScanServices = uni.getStorageSync('bleScanServices') as string | null
	const scanServicesText = ref(storedScanServices == null ? '' : storedScanServices!)
	watch(scanServicesText, (value : string) => {
		uni.setStorageSync('bleScanServices', value)
	})

	const scanIntervalText = ref('0')

	const scanDurationText = ref('10')

	const scanRemainingSeconds = ref(0)

	const connectedServicesText = ref('')

	const allowDuplicates = ref(false)

	const ignoreUnknownByDefault = true

	const filterConnectableByDefault = true

	const ignoreUnknown = ref(ignoreUnknownByDefault)

	const filterConnectable = ref(filterConnectableByDefault)

	const devices = ref([] as TestDevice[])

	const connectedIds = ref([] as string[])
	const contractDisconnectCounters = ref([] as DeviceConnectionEpoch[])
	function getContractDisconnectEpoch(deviceId : string) : number {
		return contractDisconnectCounters.value.find((entry : DeviceConnectionEpoch) : boolean => entry.deviceId == deviceId)?.epoch ?? 0
	}

	const selectedDeviceId = ref('')

	const deviceSelectorOpen = ref(false)

	const gattGeneration = ref(0)

	const selectedServiceId = ref('')

	const selectedCharacteristicId = ref('')

	const selectedCharacteristicName = ref('未选择特征')

	const services = ref([] as TestService[])

	const currentRSSI = ref(0)

	const currentMTU = ref(0)

	const notifying = ref(false)

	const notifyStates = ref([] as NotifyStateRecord[])

	let pageGeneration = 0
	let pageActive = false
	let cancelledConnectionDevices : string[] = []

	const writeHex = ref('01 02 03 A0 FF')

	const writeUtf8 = ref('你好')

	const writePayloadMode = ref('hex' as WritePayloadMode)

	const writeMode = ref('writeNoResponse' as WriteMode)

	const valueDisplayMode = ref('hex' as ValueDisplayMode)

	const lastValueHex = ref('--')

	const lastValueUtf8 = ref('--')

	const lastValueUtf8Notice = ref('')

	const lastValueBytes = ref(0)

	const lastValueTime = ref('--')

	const valueSource = ref('等待 value event')

	const mtuText = ref('先连接设备后查询最大可写长度')

	const connectingIds = ref([] as string[])

	const disconnectingIds = ref([] as string[])

	type DeviceNotice = { deviceId : string, text : string }
	const deviceNotices = ref([] as DeviceNotice[])

	const scanPending = ref(false)

	let scanRequestGeneration = 0

	let scanTargetDiscovering : boolean | null = null

	const scanDesiredDiscovering = ref(false)

	let scanManagedByPage = false

	let scanWatchdogTimer = 0

	let scanAutoStopTimer = 0

	const queryPending = ref(false)

	const gattBusy = ref(false)

	const ioBusy = ref(false)

	const notifyBusy = ref(false)

	const bleApiGateway = new BleApiGateway((trace : BleApiTrace) => {
		logController.recordApiTrace(trace)
	})

	const panelDevices = computed(() : DevicePanelRecord[] => devices.value.map((device : TestDevice) : DevicePanelRecord => {
		const serviceCount = device.advertisServiceUUIDs.length
		return {
			name: device.name,
			deviceId: device.deviceId,
			RSSI: device.RSSI,
			serviceCountText: serviceCount.toString() + ' 个服务',
			serviceCount: serviceCount,
			manufacturerDataText: bufferHex(device.advertisData),
			serviceDataText: JSON.stringify(device.serviceData),
			title: deviceTitle(device),
			localName: device.localName,
			connectable: device.connectable,
			seenCount: device.seenCount == null ? 1 : device.seenCount!,
			expanded: device.expanded == null ? false : device.expanded!,
			notice: deviceNoticeText(device.deviceId)
		}
	}))

	const connectedCount = computed(() : number => connectedIds.value.length)

	const panelConnectedDeviceId = computed(() : string => selectedDeviceId.value.length > 0 && connectedIds.value.indexOf(selectedDeviceId.value) >= 0 ? selectedDeviceId.value : (connectedIds.value.length > 0 ? connectedIds.value[0] : ''))

	const currentDeviceName = computed(() : string => selectedDeviceId.value.length == 0 ? '未选择设备' : displayDeviceName(selectedDeviceId.value))

	const connectionPending = computed(() : boolean => connectingIds.value.length > 0 || disconnectingIds.value.length > 0)

	function setDeviceNotice(deviceId : string, text : string) {
		const index = deviceNotices.value.findIndex((notice : DeviceNotice) : boolean => notice.deviceId == deviceId)
		if (text.length == 0) {
			if (index >= 0) deviceNotices.value.splice(index, 1)
			return
		}
		if (index >= 0) deviceNotices.value[index].text = text
		else deviceNotices.value.push({ deviceId: deviceId, text: text })
	}

	function deviceNoticeText(deviceId : string) : string {
		const notice = deviceNotices.value.find((entry : DeviceNotice) : boolean => entry.deviceId == deviceId)
		return notice == null ? '' : notice!.text
	}

	const characteristicCount = computed(() : number => { let count = 0; services.value.forEach((service : TestService) => count += service.characteristics.length); return count })

	const selectedCharacteristic = computed(() : TestCharacteristic | null => {
		for (let serviceIndex = 0; serviceIndex < services.value.length; serviceIndex++) {
			const service = services.value[serviceIndex]
			if (service.uuid != selectedServiceId.value) continue
			for (let characteristicIndex = 0; characteristicIndex < service.characteristics.length; characteristicIndex++) {
				const characteristic = service.characteristics[characteristicIndex]
				if (characteristic.uuid == selectedCharacteristicId.value) return characteristic
			}
		}
		return null
	})

	const canRead = computed(() : boolean => selectedCharacteristic.value != null && selectedCharacteristic.value!.properties.indexOf('READ') >= 0)

	const canWriteWithResponse = computed(() : boolean => selectedCharacteristic.value != null && selectedCharacteristic.value!.properties.indexOf('WRITE') >= 0)

	const canWriteWithoutResponse = computed(() : boolean => selectedCharacteristic.value != null && selectedCharacteristic.value!.properties.indexOf('WRITE NR') >= 0)

	const canWrite = computed(() : boolean => canWriteWithResponse.value || canWriteWithoutResponse.value)

	const canNotify = computed(() : boolean => selectedCharacteristic.value != null && (selectedCharacteristic.value!.properties.indexOf('NOTIFY') >= 0 || selectedCharacteristic.value!.properties.indexOf('INDICATE') >= 0))

	const taskDraftNotifyTypeLabel = computed(() : string => selectedCharacteristic.value != null && selectedCharacteristic.value!.properties.indexOf('NOTIFY') >= 0 ? 'Notification' : 'Indication')

	const taskWriteVerificationText = computed(() : string => writeMode.value == 'write' ? 'W（有回复）：写入后等待设备回执确认。' : 'WN（无回复）：写入后不等待回执，可连续提交。')

	const writePayloadSummary = computed(() : string => {
		const buffer = encodeWritePayload(currentWritePayload(), writePayloadMode.value)
		if (buffer == null) return writePayloadMode.value == 'hex' ? 'HEX 格式无效' : 'UTF-8 内容为空'
		return buffer.byteLength.toString() + ' bytes · ' + writePayloadModeLabel(writePayloadMode.value)
	})

	const writePayloadHexPreview = computed(() : string => {
		const buffer = encodeWritePayload(currentWritePayload(), writePayloadMode.value)
		return buffer == null ? '--' : bufferHex(buffer)
	})

	const availableTaskKinds = computed(() : TaskKind[] => {
		const result = [] as TaskKind[]
		if (canRead.value) result.push('read')
		if (canWrite.value) result.push('write')
		if (canNotify.value) result.push('notify')
		return result
	})

	const adapterPending = computed(() : boolean => adapterOperation.value.length > 0)

	const scanControlActive = computed(() : boolean => scanDesiredDiscovering.value || discovering.value)

	const adapterOpenDisabled = computed(() : boolean => adapterPending.value || adapterOpened.value)

	const adapterQueryDisabled = computed(() : boolean => adapterPending.value || !adapterOpened.value)

	const adapterReleaseDisabled = computed(() : boolean => adapterPending.value || !adapterOpened.value || scanPending.value || queryPending.value || connectionPending.value || gattBusy.value || ioBusy.value || notifyBusy.value || taskController.runningTasks.value > 0)

	const lastValueDisplay = computed(() : string => valueDisplayMode.value == 'utf8' ? lastValueUtf8.value : lastValueHex.value)

	const lastValueMeta = computed(() : string => {
		let result = lastValueBytes.value.toString() + ' bytes · ' + valueSource.value
		if (valueDisplayMode.value == 'utf8' && lastValueUtf8Notice.value.length > 0) result += ' · ' + lastValueUtf8Notice.value
		return result
	})

	function selectStep(index : number) {
		activeStep.value = index
		if (index != 1) taskController.taskEditorReturnToConcurrency.value = false
	}

	function selectTestTab(tab : BleTestTab) {
		testTab.value = tab
	}

	function deviceTitle(device : TestDevice) : string { const name = device.name == null ? '' : device.name!.trim(); return name.length > 0 ? name : (device.localName.length > 0 ? device.localName : '未知设备') }

	function displayDeviceName(deviceId : string) : string { const device = devices.value.find((item : TestDevice) => item.deviceId == deviceId); return device == null ? deviceId : deviceTitle(device!) }

	function characteristicDisplayName(uuid : string) : string { const value = shortUUID(uuid); if (value == '2A29') return '厂商名称'; if (value == '2A24') return '型号信息'; if (value == '2A6E') return '温度信息'; if (value == '2A6F') return '湿度信息'; return '自定义特征' }

	function normalizeTestDevice(next : RawTestDevice, previous : TestDevice | null) : TestDevice {
		let name : string | null = null
		let rssi = 0
		let advertisData = new ArrayBuffer(0)
		let advertisServiceUUIDs = [] as string[]
		let localName = ''
		let serviceData : UTSJSONObject = {}
		let connectable : boolean | null = null
		if (previous != null) {
			name = previous!.name == null ? null : previous!.name!
			rssi = previous!.RSSI
			advertisData = previous!.advertisData
			advertisServiceUUIDs = previous!.advertisServiceUUIDs
			localName = previous!.localName
			serviceData = previous!.serviceData
			connectable = previous!.connectable == null ? null : previous!.connectable!
		}
		if (next.name != null) name = next.name!
		if (next.RSSI != null) rssi = next.RSSI!
		if (next.advertisData != null) advertisData = next.advertisData!
		if (next.advertisServiceUUIDs != null) advertisServiceUUIDs = next.advertisServiceUUIDs!
		if (next.localName != null) localName = next.localName!
		if (next.serviceData != null) serviceData = next.serviceData!
		if (next.connectable != null) connectable = next.connectable!
		return {
			name: name,
			deviceId: next.deviceId,
			RSSI: rssi,
			advertisData: advertisData,
			advertisServiceUUIDs: advertisServiceUUIDs,
			localName: localName,
			serviceData: serviceData,
			connectable: connectable
		}
	}

	function upsertDevices(incoming : RawTestDevice[]) {
		incoming.forEach((next : RawTestDevice) => {
			const index = devices.value.findIndex((item : TestDevice) => item.deviceId == next.deviceId)
			const previous = index >= 0 ? devices.value[index] : null
			const normalized = normalizeTestDevice(next, previous)
			if (index >= 0) {
				normalized.seenCount = previous!.seenCount == null ? 2 : previous!.seenCount! + 1
				normalized.expanded = previous!.expanded == null ? false : previous!.expanded!
				devices.value[index] = normalized
			} else {
				normalized.seenCount = 1
				normalized.expanded = false
				devices.value.push(normalized)
			}
			const logDevice = logController.logDeviceContext(normalized.deviceId)
			if (logDevice != null) logDevice!.name = deviceTitle(normalized)
		})
		devices.value.sort((a : TestDevice, b : TestDevice) => b.RSSI - a.RSSI)
	}

	function toggleDeviceDetails(deviceId : string) {
		const device = devices.value.find((item : TestDevice) => item.deviceId == deviceId)
		if (device == null) return
		device.expanded = device.expanded == null ? true : !device.expanded!
		if (connectedIds.value.indexOf(deviceId) >= 0) switchCurrentDevice(deviceId)
	}

	function clearScanWatchdog() {
		if (scanWatchdogTimer == 0) return
		clearTimeout(scanWatchdogTimer)
		scanWatchdogTimer = 0
	}

	function armScanWatchdog(requestGeneration : number, targetDiscovering : boolean) {
		clearScanWatchdog()
		scanWatchdogTimer = setTimeout(() => {
			scanWatchdogTimer = 0
			if (requestGeneration != scanRequestGeneration || scanTargetDiscovering != targetDiscovering) return
			scanPending.value = false
			scanTargetDiscovering = null
			if (!targetDiscovering) {
				scanDesiredDiscovering.value = false
				discovering.value = false
				bleApiGateway.stopBluetoothDevicesDiscovery({})
			}
			logController.addGlobalLog('event', targetDiscovering ? 'startBluetoothDevicesDiscovery' : 'stopBluetoothDevicesDiscovery', 'callback timeout · pending released' + (targetDiscovering ? '' : ' · stop retried'))
		}, 3000)
	}

	function clearScanAutoStop() {
		if (scanAutoStopTimer != 0) {
			clearTimeout(scanAutoStopTimer)
			scanAutoStopTimer = 0
		}
		scanRemainingSeconds.value = 0
	}

	function scanDurationMilliseconds() : number {
		let seconds = parseInt(scanDurationText.value)
		if (isNaN(seconds)) seconds = 10
		if (seconds < 1) seconds = 1
		if (seconds > 120) seconds = 120
		return seconds * 1000
	}

	function tickScanCountdown(durationSeconds : number) {
		if (!scanControlActive.value) {
			scanAutoStopTimer = 0
			scanRemainingSeconds.value = 0
			return
		}
		const next = scanRemainingSeconds.value - 1
		scanRemainingSeconds.value = next < 0 ? 0 : next
		if (scanRemainingSeconds.value <= 0) {
			scanAutoStopTimer = 0
			logController.addGlobalLog('event', 'stopBluetoothDevicesDiscovery', 'auto stop · ' + durationSeconds.toString() + 's elapsed')
			stopDiscovery()
			return
		}
		scanAutoStopTimer = setTimeout(() => tickScanCountdown(durationSeconds), 1000)
	}

	function armScanAutoStop() {
		clearScanAutoStop()
		const durationSeconds = scanDurationMilliseconds() / 1000
		scanRemainingSeconds.value = durationSeconds
		if (durationSeconds <= 0) return
		scanAutoStopTimer = setTimeout(() => tickScanCountdown(durationSeconds), 1000)
	}

	function resetDiscoveryViewForNewScan() {
		const previousCount = devices.value.length
		const connectedDeviceIds = connectedIds.value
		devices.value = devices.value.filter((device : TestDevice) : boolean => connectedDeviceIds.indexOf(device.deviceId) >= 0)
		deviceNotices.value = [] as DeviceNotice[]
		if (selectedDeviceId.value.length > 0 && connectedDeviceIds.indexOf(selectedDeviceId.value) < 0) {
			clearCurrentDevice()
		}
		const removedCount = previousCount - devices.value.length
		if (removedCount > 0) {
			logController.addGlobalLog('event', 'startBluetoothDevicesDiscovery', 'new scan view · cleared ' + removedCount.toString() + ' unconnected device(s)')
		}
	}

	function startDiscovery() {
		if (scanControlActive.value || scanPending.value || !adapterOpened.value) return
		resetDiscoveryViewForNewScan()
		let filters : string[] | null = null
		if (scanServicesText.value.trim().length > 0) {
			filters = scanServicesText.value.split(',').map((item : string) => item.trim()).filter((item : string) => item.length > 0)
		}
		scanRequestGeneration++
		const requestGeneration = scanRequestGeneration
		scanTargetDiscovering = true
		scanDesiredDiscovering.value = true
		scanManagedByPage = true
		scanPending.value = true
		discovering.value = true
		armScanWatchdog(requestGeneration, true)
		logController.addGlobalLog('event', 'startBluetoothDevicesDiscovery', 'request generation=' + requestGeneration.toString())
		bleApiGateway.startBluetoothDevicesDiscovery({
			services: filters,
			allowDuplicatesKey: allowDuplicates.value,
			interval: parseInt(scanIntervalText.value),
			success: (res) => {
				if (requestGeneration != scanRequestGeneration || scanTargetDiscovering != true) {
					if (!scanDesiredDiscovering.value) bleApiGateway.stopBluetoothDevicesDiscovery({})
					return
				}
				logController.addGlobalLog('success', 'startBluetoothDevicesDiscovery', res.errMsg)
				armScanAutoStop()
			},
			fail: (error) => {
				if (requestGeneration != scanRequestGeneration || scanTargetDiscovering != true) return
				discovering.value = false
				scanDesiredDiscovering.value = false
				logController.addGlobalLog('fail', 'startBluetoothDevicesDiscovery', logController.errorText(error))
			},
			complete: (_) => {
				if (requestGeneration != scanRequestGeneration || scanTargetDiscovering != true) return
				clearScanWatchdog()
				scanPending.value = false
				scanTargetDiscovering = null
			}
		})
	}

	function stopDiscovery() {
		if (!scanControlActive.value) return
		clearScanAutoStop()
		scanRequestGeneration++
		const requestGeneration = scanRequestGeneration
		scanTargetDiscovering = false
		scanDesiredDiscovering.value = false
		scanManagedByPage = true
		scanPending.value = true
		discovering.value = false
		// #ifdef MP-WEIXIN
		eventController.clearWechatDeviceQueue()
		// #endif
		armScanWatchdog(requestGeneration, false)
		logController.addGlobalLog('event', 'stopBluetoothDevicesDiscovery', 'request generation=' + requestGeneration.toString())
		bleApiGateway.stopBluetoothDevicesDiscovery({
			success: (res) => {
				if (requestGeneration != scanRequestGeneration || scanTargetDiscovering != false) return
				logController.addGlobalLog('success', 'stopBluetoothDevicesDiscovery', res.errMsg)
			},
			fail: (error) => {
				if (requestGeneration != scanRequestGeneration || scanTargetDiscovering != false) return
				discovering.value = true
				scanDesiredDiscovering.value = true
				logController.addGlobalLog('fail', 'stopBluetoothDevicesDiscovery', logController.errorText(error))
			},
			complete: (_) => {
				if (requestGeneration != scanRequestGeneration || scanTargetDiscovering != false) return
				clearScanWatchdog()
				scanPending.value = false
				scanTargetDiscovering = null
			}
		})
	}

	function getCachedDevices() {
		if (!adapterOpened.value || queryPending.value) return
		queryPending.value = true
		bleApiGateway.getBluetoothDevices({
			success: (res) => {
				upsertDevices(res.devices as RawTestDevice[])
				logController.addGlobalLog('success', 'getBluetoothDevices', 'devices=' + res.devices.length.toString())
			},
			fail: (error) => logController.addGlobalLog('fail', 'getBluetoothDevices', logController.errorText(error)),
			complete: (_) => {
				queryPending.value = false
			}
		})
	}

	function getConnectedDevices() {
		if (!adapterOpened.value || queryPending.value) return
		const queryText = connectedServicesText.value.trim().length > 0 ? connectedServicesText.value : scanServicesText.value
		const servicesFilter = queryText.split(',').map((item : string) => item.trim()).filter((item : string) => item.length > 0)
		if (servicesFilter.length == 0) {
			logController.addGlobalLog('fail', 'getConnectedBluetoothDevices', 'services is required')
			return
		}
		queryPending.value = true
		bleApiGateway.getConnectedBluetoothDevices({
			services: servicesFilter,
			success: (res) => {
				res.devices.forEach((device) => {
					taskController.markDeviceConnected(device.deviceId)
					logController.updateLogDeviceState(device.deviceId, 'connected')
				})
				if (selectedDeviceId.value.length == 0 && connectedIds.value.length > 0) switchCurrentDevice(connectedIds.value[0])
				logController.addGlobalLog('success', 'getConnectedBluetoothDevices', 'devices=' + res.devices.length.toString())
			},
			fail: (error) => logController.addGlobalLog('fail', 'getConnectedBluetoothDevices', logController.errorText(error)),
			complete: (_) => {
				queryPending.value = false
			}
		})
	}

	function finishConnecting(deviceId : string) {
		connectingIds.value = connectingIds.value.filter((id : string) : boolean => id != deviceId)
	}

	function finishDisconnecting(deviceId : string) {
		disconnectingIds.value = disconnectingIds.value.filter((id : string) : boolean => id != deviceId)
	}

	function connect(deviceId : string) {
		if (connectingIds.value.indexOf(deviceId) >= 0 || connectedIds.value.indexOf(deviceId) >= 0) return
		const requestPageGeneration = pageGeneration
		connectingIds.value.push(deviceId)
		setDeviceNotice(deviceId, '')
		logController.beginConnectionAttempt(deviceId)
		logController.addDeviceLog('event', 'createBLEConnection', 'request · timeout=8000ms', deviceId)
		bleApiGateway.createBLEConnection({
			deviceId: deviceId,
			timeout: 8000,
			success: (res) => {
				if (!pageActive || requestPageGeneration != pageGeneration || connectingIds.value.indexOf(deviceId) < 0) {
					if (cancelledConnectionDevices.indexOf(deviceId) < 0) bleApiGateway.closeBLEConnection({ deviceId: deviceId })
					return
				}
				finishConnecting(deviceId)
				setDeviceNotice(deviceId, '')
				taskController.markDeviceConnected(deviceId)
				logController.updateLogDeviceState(deviceId, 'connected')
				logController.addDeviceLog('success', 'createBLEConnection', res.errMsg, deviceId)
				switchCurrentDevice(deviceId)
			},
			fail: (error) => {
				finishConnecting(deviceId)
				logController.updateLogDeviceState(deviceId, 'failed')
				const errorDetail = logController.errorText(error)
				if (error.errCode == 1509005) {
					const retryHint = '连接超时：设备未在限定时间内完成连接，请确认设备在附近且仍可连接后重试'
					logController.addDeviceLog('fail', 'createBLEConnection', errorDetail + ' · ' + retryHint, deviceId)
					setDeviceNotice(deviceId, '连接超时，请确认设备在附近且仍可连接后重试')
					uni.showToast({ title: '连接超时，请确认设备在附近且仍可连接后重试', icon: 'none' })
				} else {
					logController.addDeviceLog('fail', 'createBLEConnection', errorDetail, deviceId)
					setDeviceNotice(deviceId, '连接失败，请重试')
				}
			},
			complete: (_) => {
				finishConnecting(deviceId)
			}
		})
	}

	function disconnect(deviceId : string) {
		if (deviceId.length == 0 || disconnectingIds.value.indexOf(deviceId) >= 0) return
		disconnectingIds.value.push(deviceId)
		logController.updateLogDeviceState(deviceId, 'disconnecting')
		bleApiGateway.closeBLEConnection({
			deviceId: deviceId,
			success: (res) => {
				removeConnectedDevice(deviceId)
				logController.addDeviceLog('success', 'closeBLEConnection', res.errMsg, deviceId)
			},
			fail: (error) => {
				logController.updateLogDeviceState(deviceId, connectedIds.value.indexOf(deviceId) >= 0 ? 'connected' : 'disconnected')
				logController.addDeviceLog('fail', 'closeBLEConnection', logController.errorText(error), deviceId)
			},
			complete: (_) => {
				finishDisconnecting(deviceId)
			}
		})
	}

	function disconnectSelected(deviceId : string) {
		if (deviceId.length > 0) {
			disconnect(deviceId)
			return
		}
		if (selectedDeviceId.value.length > 0) disconnect(selectedDeviceId.value)
	}

	function resetGattView() {
		services.value = [] as TestService[]
		selectedServiceId.value = ''
		selectedCharacteristicId.value = ''
		selectedCharacteristicName.value = '未选择特征'
		currentRSSI.value = 0
		currentMTU.value = 0
		notifying.value = false
		lastValueHex.value = '--'
		lastValueUtf8.value = '--'
		lastValueUtf8Notice.value = ''
		lastValueBytes.value = 0
		lastValueTime.value = '--'
		valueSource.value = '等待 value event'
		mtuText.value = '先选择可写特征后查询最大可写长度'
		gattBusy.value = false
	}

	function notifyState(deviceId : string, serviceId : string, characteristicId : string) : boolean {
		const connectionGeneration = currentConnectionGeneration(deviceId)
		const record = notifyStates.value.find((item : NotifyStateRecord) : boolean => item.deviceId == deviceId && item.serviceId == serviceId && item.characteristicId == characteristicId && item.connectionGeneration == connectionGeneration)
		return record == null ? false : record!.enabled
	}

	function currentConnectionGeneration(deviceId : string) : number {
		return taskController.connectionEpochOf(deviceId)
	}

	function setNotifyState(deviceId : string, serviceId : string, characteristicId : string, connectionGeneration : number, enabled : boolean) {
		const index = notifyStates.value.findIndex((item : NotifyStateRecord) : boolean => item.deviceId == deviceId && item.serviceId == serviceId && item.characteristicId == characteristicId && item.connectionGeneration == connectionGeneration)
		const record : NotifyStateRecord = { deviceId: deviceId, serviceId: serviceId, characteristicId: characteristicId, connectionGeneration: connectionGeneration, enabled: enabled }
		if (index >= 0) notifyStates.value[index] = record
		else notifyStates.value.push(record)
	}

	function clearNotifyStates(deviceId : string = '') {
		if (deviceId.length == 0) notifyStates.value = [] as NotifyStateRecord[]
		else notifyStates.value = notifyStates.value.filter((item : NotifyStateRecord) : boolean => item.deviceId != deviceId)
	}

	function toggleDeviceSelector() {
		if (connectedIds.value.length == 0) return
		deviceSelectorOpen.value = !deviceSelectorOpen.value
	}

	function switchCurrentDevice(deviceId : string) {
		if (connectedIds.value.indexOf(deviceId) < 0) return
		if (ioBusy.value || notifyBusy.value) {
			logController.addDeviceLog('fail', 'switchCurrentDevice', 'operation in progress', deviceId)
			return
		}
		deviceSelectorOpen.value = false
		if (selectedDeviceId.value == deviceId && services.value.length > 0) return
		selectedDeviceId.value = deviceId
		gattGeneration.value++
		resetGattView()
		logController.addDeviceLog('event', 'switchCurrentDevice', 'selected', deviceId)
		refreshGatt()
	}

	function clearCurrentDevice() {
		deviceSelectorOpen.value = false
		selectedDeviceId.value = ''
		gattGeneration.value++
		resetGattView()
	}

	function removeConnectedDevice(deviceId : string) {
		connectedIds.value = connectedIds.value.filter((id : string) => id != deviceId)
		clearNotifyStates(deviceId)
		logController.updateLogDeviceState(deviceId, 'disconnected')
		taskController.blockDeviceTasks(deviceId, '设备已断开，请重连并确认 GATT 后重新绑定')
		if (selectedDeviceId.value != deviceId) return
		ioBusy.value = false
		notifyBusy.value = false
		if (connectedIds.value.length > 0) switchCurrentDevice(connectedIds.value[0])
		else clearCurrentDevice()
	}

	function finishAdapterOperation(operation : string) {
		if (adapterOperation.value == operation) adapterOperation.value = ''
	}

	function restoreConnectedDevicesIfPossible() {
		if (scanServicesText.value.trim().length == 0) return
		getConnectedDevices()
	}

	function openAdapter() {
		if (adapterOpenDisabled.value) return
		adapterOperation.value = 'open'
		let recoveringOpenedAdapter = false
		bleApiGateway.openBluetoothAdapter({
			success: (res) => {
				adapterOpened.value = true
				adapterAvailable.value = true
				adapterState.value = '可用'
				scanManagedByPage = false
				scanDesiredDiscovering.value = false
				discovering.value = false
				logController.addGlobalLog('success', 'openBluetoothAdapter', res.errMsg)
				restoreConnectedDevicesIfPossible()
			},
			fail: (error) => {
				if (error.errMsg.indexOf('already opened') >= 0) {
					recoveringOpenedAdapter = true
					bleApiGateway.getBluetoothAdapterState({
						success: (res) => {
							adapterOpened.value = true
							adapterAvailable.value = res.available
							adapterState.value = res.available ? '可用' : '不可用'
							scanManagedByPage = false
							scanDesiredDiscovering.value = res.discovering
							discovering.value = res.discovering
							logController.addGlobalLog('success', 'openBluetoothAdapter', 'adapter already opened · state restored')
							restoreConnectedDevicesIfPossible()
						},
						fail: (stateError) => {
							adapterOpened.value = false
							adapterAvailable.value = false
							adapterState.value = '不可用'
							logController.addGlobalLog('fail', 'getBluetoothAdapterState', logController.errorText(stateError))
						},
						complete: (_) => finishAdapterOperation('open')
					})
					return
				}
				adapterOpened.value = false
				adapterAvailable.value = false
				adapterState.value = '不可用'
				logController.addGlobalLog('fail', 'openBluetoothAdapter', logController.errorText(error))
			},
			complete: (_) => {
				if (!recoveringOpenedAdapter) finishAdapterOperation('open')
			}
		})
	}

	function queryAdapterState() {
		if (adapterQueryDisabled.value) return
		adapterOperation.value = 'query'
		bleApiGateway.getBluetoothAdapterState({
			success: (res) => {
				adapterOpened.value = true
				adapterAvailable.value = res.available
				adapterState.value = res.available ? '可用' : '不可用'
				scanManagedByPage = false
				scanDesiredDiscovering.value = res.discovering
				discovering.value = res.discovering
				logController.addGlobalLog('success', 'getBluetoothAdapterState', 'available=' + res.available.toString() + ' discovering=' + res.discovering.toString())
			},
			fail: (error) => logController.addGlobalLog('fail', 'getBluetoothAdapterState', logController.errorText(error)),
			complete: (_) => finishAdapterOperation('query')
		})
	}

	function resetAfterAdapterClose(returnToDiscovery : boolean = true) {
		scanRequestGeneration++
		scanTargetDiscovering = null
		scanDesiredDiscovering.value = false
		scanManagedByPage = false
		clearScanWatchdog()
		clearScanAutoStop()
		// #ifdef MP-WEIXIN
		eventController.clearWechatDeviceQueue()
		// #endif
		taskController.invalidateTasks()
		connectedIds.value.forEach((deviceId : string) => logController.updateLogDeviceState(deviceId, 'disconnected'))
		if (returnToDiscovery) activeStep.value = 0
		adapterOpened.value = false
		adapterAvailable.value = false
		adapterState.value = '未初始化'
		discovering.value = false
		discoveryElapsed.value = ''
		scanPending.value = false
		queryPending.value = false
		connectingIds.value = [] as string[]
		disconnectingIds.value = [] as string[]
		ioBusy.value = false
		notifyBusy.value = false
		connectedIds.value = [] as string[]
		devices.value = [] as TestDevice[]
		clearNotifyStates()
		taskController.resetTasks()
		clearCurrentDevice()
	}

	function releaseAdapter() {
		if (adapterReleaseDisabled.value) return
		adapterOperation.value = 'close'
		bleApiGateway.closeBluetoothAdapter({
			success: (res) => {
				resetAfterAdapterClose(!(activeStep.value == 2 && testTab.value == 'contract'))
				logController.addGlobalLog('success', 'closeBluetoothAdapter', res.errMsg)
			},
			fail: (error) => logController.addGlobalLog('fail', 'closeBluetoothAdapter', logController.errorText(error)),
			complete: (_) => finishAdapterOperation('close')
		})
	}

	function loadServices() {
		if (selectedDeviceId.value == '' || gattBusy.value) return
		const requestDeviceId = selectedDeviceId.value
		const requestGeneration = gattGeneration.value
		gattBusy.value = true
		bleApiGateway.getBLEDeviceServices({
			deviceId: requestDeviceId,
			success: (res) => {
				if (selectedDeviceId.value != requestDeviceId || gattGeneration.value != requestGeneration) return
				services.value = res.services.map((service) : TestService => ({ uuid: service.uuid, isPrimary: service.isPrimary, characteristics: [] }))
				if (services.value.length > 0) {
					selectedServiceId.value = services.value[0].uuid
					loadCharacteristics(services.value[0].uuid, requestDeviceId, requestGeneration)
				}
				logController.addDeviceLog('success', 'getBLEDeviceServices', 'services=' + services.value.length.toString(), requestDeviceId)
			},
			fail: (error) => logController.addDeviceLog('fail', 'getBLEDeviceServices', logController.errorText(error), requestDeviceId),
			complete: (_) => {
				if (selectedDeviceId.value == requestDeviceId && gattGeneration.value == requestGeneration) gattBusy.value = false
			}
		})
	}

	function refreshGatt() {
		if (selectedDeviceId.value == '' || gattBusy.value) return
		loadServices()
		getRSSI()
		getMTU()
	}

	function makeTestCharacteristic(item : any) : TestCharacteristic {
		const properties = [] as string[]
		if (item.properties.read) properties.push('READ')
		if (item.properties.write || item.properties.writeDefault) properties.push('WRITE')
		if (item.properties.writeNoResponse) properties.push('WRITE NR')
		if (item.properties.notify) properties.push('NOTIFY')
		if (item.properties.indicate) properties.push('INDICATE')
		return { uuid: item.uuid, name: characteristicDisplayName(item.uuid), properties: properties }
	}

	function loadCharacteristics(serviceId : string, deviceId : string = selectedDeviceId.value, generation : number = gattGeneration.value) {
		if (deviceId.length == 0) return
		bleApiGateway.getBLEDeviceCharacteristics({
			deviceId: deviceId,
			serviceId: serviceId,
			success: (res) => {
				if (selectedDeviceId.value != deviceId || gattGeneration.value != generation) return
				const index = services.value.findIndex((service : TestService) => service.uuid == serviceId)
				if (index >= 0) services.value[index].characteristics = res.characteristics.map((item) : TestCharacteristic => makeTestCharacteristic(item))
				logController.addDeviceLog('success', 'getBLEDeviceCharacteristics', 'characteristics=' + res.characteristics.length.toString(), deviceId, serviceId)
			},
			fail: (error) => logController.addDeviceLog('fail', 'getBLEDeviceCharacteristics', logController.errorText(error), deviceId, serviceId)
		})
	}

	function selectService(uuid : string) {
		if (selectedServiceId.value == uuid) {
			selectedServiceId.value = ''
			return
		}
		selectedServiceId.value = uuid
		const service = services.value.find((item : TestService) => item.uuid == uuid)
		if (service != null && service!.characteristics.length == 0) loadCharacteristics(uuid)
	}

	function selectCharacteristic(item : TestCharacteristic) {
		selectedCharacteristicId.value = item.uuid
		selectedCharacteristicName.value = item.name
		notifying.value = notifyState(selectedDeviceId.value, selectedServiceId.value, item.uuid)
		taskController.normalizeTaskWriteMode()
		getRSSI()
		getMTU()
	}

	function getRSSI() {
		if (selectedDeviceId.value == '') return
		const deviceId = selectedDeviceId.value
		bleApiGateway.getBLEDeviceRSSI({
			deviceId: deviceId,
			success: (res) => {
				if (selectedDeviceId.value == deviceId) currentRSSI.value = res.RSSI
				logController.addDeviceLog('success', 'getBLEDeviceRSSI', 'RSSI=' + res.RSSI.toString() + ' dBm', deviceId)
			},
			fail: (error) => logController.addDeviceLog('fail', 'getBLEDeviceRSSI', logController.errorText(error), deviceId)
		})
	}

	function getMTU() {
		if (selectedDeviceId.value == '') return
		const deviceId = selectedDeviceId.value
		const requestWriteMode = writeMode.value
		currentMTU.value = 0
		mtuText.value = '正在读取最大可写长度'
		bleApiGateway.getBLEMTU({
			deviceId: deviceId,
			writeType: requestWriteMode,
			success: (res) => {
				if (selectedDeviceId.value == deviceId && writeMode.value == requestWriteMode) {
					currentMTU.value = res.mtu
					mtuText.value = 'max payload ' + res.mtu.toString() + ' bytes (' + requestWriteMode + ')'
				}
				logController.addDeviceLog('success', 'getBLEMTU', 'max payload=' + res.mtu.toString() + ' bytes · ' + requestWriteMode, deviceId)
			},
			fail: (error) => {
				if (selectedDeviceId.value == deviceId && writeMode.value == requestWriteMode) {
					currentMTU.value = 0
					mtuText.value = 'MTU 读取失败'
				}
				logController.addDeviceLog('fail', 'getBLEMTU', logController.errorText(error), deviceId)
			}
		})
	}

	function selectWriteMode(mode : WriteMode) {
		if (mode == 'write' && !canWriteWithResponse.value) return
		if (mode == 'writeNoResponse' && !canWriteWithoutResponse.value) return
		if (writeMode.value == mode) return
		writeMode.value = mode
		getMTU()
	}

	function selectValueDisplayMode(mode : ValueDisplayMode) {
		valueDisplayMode.value = mode
	}

	function copyLastValue() {
		if (lastValueTime.value == '--') return
		uni.setClipboardData({ data: lastValueDisplay.value })
	}
	function copyDeviceId(deviceId : string) {
		if (!pageActive || !devices.value.some((device : TestDevice) : boolean => device.deviceId == deviceId)) return
		uni.setClipboardData({ data: deviceId })
	}

	function pasteWritePayload() {
		const mode = writePayloadMode.value
		uni.getClipboardData({
			success: (result) => {
				if (mode == 'hex') writeHex.value = result.data
				else writeUtf8.value = result.data
				uni.showToast({ title: '已粘贴', icon: 'none' })
			},
			fail: (_) => uni.showToast({ title: '读取剪贴板失败', icon: 'none' })
		})
	}

	function hexBuffer(source : string) : ArrayBuffer | null { const compact = source.replace(/[\s:-]/g, ''); if (compact.length == 0 || compact.length % 2 != 0 || !/^[0-9a-fA-F]+$/.test(compact)) return null; const result = new Uint8Array(compact.length / 2); for (let index = 0; index < result.length; index++) result[index] = parseInt(compact.substring(index * 2, index * 2 + 2), 16); return result.buffer }

	function currentWritePayload() : string { return writePayloadMode.value == 'hex' ? writeHex.value : writeUtf8.value }

	function writePayloadModeLabel(mode : WritePayloadMode) : string { return mode == 'hex' ? 'HEX' : 'UTF-8' }

	function encodeWritePayload(source : string, mode : WritePayloadMode) : ArrayBuffer | null {
		if (mode == 'hex') return hexBuffer(source)
		// #ifdef APP
		if (source.length == 0) return null
		return utf8Encoder.encode(source).buffer
		// #endif
		return null
	}

	function writePayloadDetail(buffer : ArrayBuffer, mode : WritePayloadMode) : string {
		return 'format=' + writePayloadModeLabel(mode) + ' · bytes=' + buffer.byteLength.toString() + ' · hex=' + bufferHex(buffer)
	}

	function bytesHex(bytes : Uint8Array) : string {
		let result = ''
		for (let index = 0; index < bytes.length; index++) {
			const value = bytes[index].toString(16).toUpperCase()
			result += (value.length == 1 ? '0' + value : value) + (index + 1 == bytes.length ? '' : ' ')
		}
		return result.length == 0 ? '--' : result
	}

	function escapeUtf8ForDisplay(input : string) : string {
		if (input.length == 0) return '空数据'
		let result = ''
		for (let index = 0; index < input.length; index++) {
			const code = input.charCodeAt(index)
			if (code == 0x09) {
				result += '\\t'
			} else if (code == 0x0A) {
				result += '\\n'
			} else if (code == 0x0D) {
				result += '\\r'
			} else if (code < 0x20 || (code >= 0x7F && code <= 0x9F)) {
				let hex = code.toString(16).toUpperCase()
				while (hex.length < 4) hex = '0' + hex
				result += '\\u' + hex
			} else {
				result += input.substring(index, index + 1)
			}
		}
		return result
	}

	function utf8Preview(buffer : ArrayBuffer) : { text : string, notice : string } {
		// #ifdef APP
		try {
			const decoded = utf8Decoder.decode(buffer)
			const hasReplacement = decoded.indexOf('\uFFFD') >= 0
			return {
				text: escapeUtf8ForDisplay(decoded),
				notice: hasReplacement ? '包含 U+FFFD 替换字符' : 'UTF-8'
			}
		} catch (error) {
			return { text: 'UTF-8 解码失败', notice: 'decoder error' }
		}
		// #endif
		return { text: '--', notice: '微信小程序不支持 UTF-8' }
	}

	function bufferPreview(buffer : ArrayBuffer) : BufferPreview {
		try {
			const bytes = new Uint8Array(buffer)
			const utf8 = utf8Preview(buffer)
			return { text: bytesHex(bytes), utf8Text: utf8.text, utf8Notice: utf8.notice, byteLength: bytes.length }
		} catch (error) {
			return { text: '--', utf8Text: 'UTF-8 解码失败', utf8Notice: 'buffer error', byteLength: 0 }
		}
	}

	function bufferHex(buffer : ArrayBuffer) : string {
		try {
			return bytesHex(new Uint8Array(buffer))
		} catch (error) {
			return '--'
		}
	}

	function readValue() {
		if (!canRead.value || selectedDeviceId.value == '' || ioBusy.value || taskController.selectedPathHasRunningTask.value) return
		const requestDeviceId = selectedDeviceId.value
		const requestGeneration = gattGeneration.value
		const requestServiceId = selectedServiceId.value
		const requestCharacteristicId = selectedCharacteristicId.value
		ioBusy.value = true
		bleApiGateway.readBLECharacteristicValue({
			deviceId: requestDeviceId,
			serviceId: requestServiceId,
			characteristicId: requestCharacteristicId,
			success: (res) => logController.addDeviceLog('success', 'readBLECharacteristicValue', res.errMsg + ' · waiting value event', requestDeviceId, requestServiceId, requestCharacteristicId),
			fail: (error) => {
				logController.addDeviceLog('fail', 'readBLECharacteristicValue', logController.errorText(error), requestDeviceId, requestServiceId, requestCharacteristicId)
			},
			complete: (_) => {
				if (selectedDeviceId.value == requestDeviceId && gattGeneration.value == requestGeneration) ioBusy.value = false
			}
		})
	}

	function writeValue() {
		const requestPayloadMode = writePayloadMode.value
		const buffer = encodeWritePayload(currentWritePayload(), requestPayloadMode)
		if (buffer == null) {
			const reason = requestPayloadMode == 'hex' ? 'invalid HEX' : 'empty UTF-8 text'
			if (selectedDeviceId.value.length > 0) logController.addDeviceLog('fail', 'writeBLECharacteristicValue', reason, selectedDeviceId.value, selectedServiceId.value, selectedCharacteristicId.value)
			else logController.addGlobalLog('fail', 'writeBLECharacteristicValue', reason)
			return
		}
		if (!canWrite.value || selectedDeviceId.value == '' || ioBusy.value || taskController.selectedPathHasRunningTask.value) return
		const requestDeviceId = selectedDeviceId.value
		const requestGeneration = gattGeneration.value
		const requestServiceId = selectedServiceId.value
		const requestCharacteristicId = selectedCharacteristicId.value
		const requestWriteMode = writeMode.value
		const payloadDetail = writePayloadDetail(buffer!, requestPayloadMode)
		ioBusy.value = true
		bleApiGateway.writeBLECharacteristicValue({
			deviceId: requestDeviceId,
			serviceId: requestServiceId,
			characteristicId: requestCharacteristicId,
			value: buffer!,
			writeType: requestWriteMode,
			success: (res) => logController.addDeviceLog('success', 'writeBLECharacteristicValue', res.errMsg + ' · submitted · ' + payloadDetail, requestDeviceId, requestServiceId, requestCharacteristicId),
			fail: (error) => logController.addDeviceLog('fail', 'writeBLECharacteristicValue', logController.errorText(error) + ' · ' + payloadDetail, requestDeviceId, requestServiceId, requestCharacteristicId),
			complete: (_) => {
				if (selectedDeviceId.value == requestDeviceId && gattGeneration.value == requestGeneration) ioBusy.value = false
			}
		})
	}

	function toggleNotify() {
		if (!canNotify.value || selectedDeviceId.value == '' || notifyBusy.value || taskController.selectedPathHasRunningTask.value) return
		const requestDeviceId = selectedDeviceId.value
		const requestGeneration = gattGeneration.value
		const requestConnectionGeneration = currentConnectionGeneration(requestDeviceId)
		const requestServiceId = selectedServiceId.value
		const requestCharacteristicId = selectedCharacteristicId.value
		notifyBusy.value = true
		let type : NotifyMode = 'indication'
		if (selectedCharacteristic.value!.properties.indexOf('NOTIFY') >= 0) type = 'notification'
		const next = !notifying.value
		bleApiGateway.notifyBLECharacteristicValueChange({
			deviceId: requestDeviceId,
			serviceId: requestServiceId,
			characteristicId: requestCharacteristicId,
			state: next,
			type: type,
			success: (res) => {
				if (currentConnectionGeneration(requestDeviceId) == requestConnectionGeneration) {
					setNotifyState(requestDeviceId, requestServiceId, requestCharacteristicId, requestConnectionGeneration, next)
					if (selectedDeviceId.value == requestDeviceId && selectedServiceId.value == requestServiceId && selectedCharacteristicId.value == requestCharacteristicId) notifying.value = next
				}
				logController.addDeviceLog('success', 'notifyBLECharacteristicValueChange', res.errMsg + ' · state=' + next.toString(), requestDeviceId, requestServiceId, requestCharacteristicId)
			},
			fail: (error) => {
				logController.addDeviceLog('fail', 'notifyBLECharacteristicValueChange', logController.errorText(error), requestDeviceId, requestServiceId, requestCharacteristicId)
			},
			complete: (_) => {
				if (selectedDeviceId.value == requestDeviceId && gattGeneration.value == requestGeneration) notifyBusy.value = false
			}
		})
	}

	function projectAdapterState(result : { available : boolean, discovering : boolean }) {
		adapterAvailable.value = result.available
		adapterState.value = result.available ? '可用' : '不可用'
		if (!result.available) {
			scanRequestGeneration++
			scanTargetDiscovering = null
			scanPending.value = false
			scanDesiredDiscovering.value = false
			scanManagedByPage = false
			discovering.value = false
			clearScanWatchdog()
		} else if (!scanManagedByPage) {
			scanDesiredDiscovering.value = result.discovering
			discovering.value = result.discovering
		} else if (result.discovering == scanDesiredDiscovering.value) {
			discovering.value = result.discovering
		}
		logController.addGlobalLog('event', 'onBluetoothAdapterStateChange', JSON.stringify(result))
		// #ifdef MP-WEIXIN
		eventController.bumpRegisteredEvents('adapter')
		// #endif
	}

	function projectDevices(result : { devices : RawTestDevice[] }) {
		// #ifdef APP
		upsertDevices(result.devices)
		logController.addGlobalLog('event', 'onBluetoothDeviceFound', result.devices.length.toString() + ' devices')
		// #endif
		// #ifdef MP-WEIXIN
		eventController.queueWechatDeviceEvents(result)
		// #endif
	}

	function projectConnection(result : { deviceId : string, connected : boolean }) {
		if (result.connected) {
			taskController.markDeviceConnected(result.deviceId)
			logController.updateLogDeviceState(result.deviceId, 'connected')
		} else {
			const epoch = getContractDisconnectEpoch(result.deviceId) + 1
			contractDisconnectCounters.value = [...contractDisconnectCounters.value.filter((entry : DeviceConnectionEpoch) : boolean => entry.deviceId != result.deviceId), { deviceId: result.deviceId, epoch: epoch }]
			removeConnectedDevice(result.deviceId)
		}
		logController.addDeviceLog('event', 'onBLEConnectionStateChange', 'connected=' + result.connected.toString(), result.deviceId)
		// #ifdef MP-WEIXIN
		eventController.bumpRegisteredEvents('connection')
		// #endif
	}

	function projectValue(result : { deviceId : string, serviceId : string, characteristicId : string, value : ArrayBuffer }) {
		const preview = bufferPreview(result.value)
		if (result.deviceId == selectedDeviceId.value && result.serviceId == selectedServiceId.value && result.characteristicId == selectedCharacteristicId.value) {
			lastValueHex.value = preview.text
			lastValueUtf8.value = preview.utf8Text
			lastValueUtf8Notice.value = preview.utf8Notice
			lastValueBytes.value = preview.byteLength
			lastValueTime.value = logController.nowText()
			valueSource.value = 'value event'
		}
		taskController.handleTaskValueEvent(result.deviceId, result.serviceId, result.characteristicId, preview.text)
		logController.addDeviceLog('event', 'onBLECharacteristicValueChange', preview.text, result.deviceId, result.serviceId, result.characteristicId)
		// #ifdef MP-WEIXIN
		eventController.bumpRegisteredEvents('value')
		// #endif
	}

	function onPageLoad() {
		pageGeneration++
		pageActive = true
		cancelledConnectionDevices = []
		eventController.registerCoreListeners()
		eventController.eventRows.value.forEach((row : EventRow) => {
			if (!row.supported) return
			eventController.subscribeEvent(row, 'A')
			if (row.key != 'mtu') eventController.subscribeEvent(row, 'B')
		})
		openAdapter()
	}

	function makeContractSuccessHandler(apiName : string, apiContext : BleApiContext) : (result : any) => void {
		const requestPageGeneration = pageGeneration
		const connectionGeneration = currentConnectionGeneration(apiContext.deviceId)
		const requestGattGeneration = gattGeneration.value
		return (result : any) => {
			if (!pageActive || pageGeneration != requestPageGeneration) return
			if (apiName == 'openBluetoothAdapter') {
				adapterOpened.value = true
				adapterAvailable.value = true
				adapterState.value = '可用'
			} else if (apiName == 'closeBluetoothAdapter') resetAfterAdapterClose(false)
			else if (apiName == 'getBluetoothAdapterState') {
				adapterOpened.value = true
				scanManagedByPage = false
				projectAdapterState({ available: result.available, discovering: result.discovering })
			} else if (apiName == 'startBluetoothDevicesDiscovery' || apiName == 'stopBluetoothDevicesDiscovery') {
				scanManagedByPage = false
				discovering.value = apiName == 'startBluetoothDevicesDiscovery'
				scanDesiredDiscovering.value = discovering.value
			} else if (apiName == 'getBluetoothDevices') {
				upsertDevices(result.devices)
			} else if (apiName == 'getConnectedBluetoothDevices') {
				upsertDevices(result.devices)
				result.devices.forEach((device : any) => {
					taskController.markDeviceConnected(device.deviceId)
					logController.updateLogDeviceState(device.deviceId, 'connected')
				})
			} else if (apiName == 'getBLEDeviceServices' && selectedDeviceId.value == apiContext.deviceId && connectionGeneration == currentConnectionGeneration(apiContext.deviceId) && requestGattGeneration == gattGeneration.value) {
				gattGeneration.value++
				resetGattView()
				services.value = result.services.map((service : any) : TestService => ({ uuid: service.uuid, isPrimary: service.isPrimary, characteristics: [] as TestCharacteristic[] }))
				if (services.value.length > 0) selectedServiceId.value = services.value[0].uuid
			} else if (apiName == 'getBLEDeviceCharacteristics' && selectedDeviceId.value == apiContext.deviceId && connectionGeneration == currentConnectionGeneration(apiContext.deviceId) && requestGattGeneration == gattGeneration.value) {
				const service = services.value.find((entry : TestService) : boolean => entry.uuid == apiContext.serviceId)
				if (service != null) service!.characteristics = result.characteristics.map((item : any) : TestCharacteristic => makeTestCharacteristic(item))
			} else if (apiName == 'getBLEDeviceRSSI' && selectedDeviceId.value == apiContext.deviceId && connectionGeneration == currentConnectionGeneration(apiContext.deviceId)) {
				currentRSSI.value = result.RSSI
			} else if (apiName == 'createBLEConnection') {
				taskController.markDeviceConnected(apiContext.deviceId)
				logController.updateLogDeviceState(apiContext.deviceId, 'connected')
				if (selectedDeviceId.value != apiContext.deviceId) {
					selectedDeviceId.value = apiContext.deviceId
					gattGeneration.value++
					resetGattView()
				}
			} else if (apiName == 'closeBLEConnection') {
				if (connectionGeneration == currentConnectionGeneration(apiContext.deviceId)) removeConnectedDevice(apiContext.deviceId)
			} else if ((apiName == 'getBLEMTU' || apiName == 'setBLEMTU') && selectedDeviceId.value == apiContext.deviceId && connectionGeneration == currentConnectionGeneration(apiContext.deviceId)) {
				currentMTU.value = result.mtu
			} else if (apiName == 'notifyBLECharacteristicValueChange' && connectionGeneration == currentConnectionGeneration(apiContext.deviceId)) {
				const enabled = apiContext.notifyState ?? true
				setNotifyState(apiContext.deviceId, apiContext.serviceId, apiContext.characteristicId, connectionGeneration, enabled)
				if (selectedDeviceId.value == apiContext.deviceId && selectedServiceId.value == apiContext.serviceId && selectedCharacteristicId.value == apiContext.characteristicId) notifying.value = enabled
			}
		}
	}

	const contractBusy = computed(() : boolean => adapterOperation.value.length > 0 || scanPending.value || queryPending.value || connectionPending.value || gattBusy.value || ioBusy.value || notifyBusy.value || taskController.runningTasks.value > 0)
	const canNotification = computed(() : boolean => selectedCharacteristic.value != null && selectedCharacteristic.value!.properties.indexOf('NOTIFY') >= 0)

	function onPageUnload() {
		pageActive = false
		pageGeneration++
		cancelledConnectionDevices = connectingIds.value.slice()
		const pendingConnectDeviceIds = connectingIds.value.slice()
		connectingIds.value = [] as string[]
		disconnectingIds.value = [] as string[]
		if (scanControlActive.value) bleApiGateway.stopBluetoothDevicesDiscovery({})
		clearScanWatchdog()
		clearScanAutoStop()
		// #ifdef MP-WEIXIN
		eventController.clearWechatDeviceQueue()
		// #endif
		taskController.invalidateTasks()
		eventController.clearListenersInternal(false)
		connectedIds.value.forEach((deviceId : string) => bleApiGateway.closeBLEConnection({ deviceId: deviceId }))
		pendingConnectDeviceIds.forEach((pendingDeviceId : string) => {
			if (connectedIds.value.indexOf(pendingDeviceId) < 0) bleApiGateway.closeBLEConnection({ deviceId: pendingDeviceId })
		})
		clearNotifyStates()
	}

	const logController = createBleLogController({
		displayDeviceName: displayDeviceName,
		connectedIds: connectedIds
	})

	const taskController = createBleTaskController({
		selectedDeviceId: selectedDeviceId,
		selectedServiceId: selectedServiceId,
		selectedCharacteristicId: selectedCharacteristicId,
		connectedIds: connectedIds,
		hexBuffer: hexBuffer,
		bufferHex: bufferHex,
		availableTaskKinds: availableTaskKinds,
		writeMode: writeMode,
		canWriteWithResponse: canWriteWithResponse,
		canWriteWithoutResponse: canWriteWithoutResponse,
		encodeWritePayload: encodeWritePayload,
		writePayloadModeLabel: writePayloadModeLabel,
		currentWritePayload: currentWritePayload,
		writePayloadMode: writePayloadMode,
		currentMTU: currentMTU,
		devices: devices,
		deviceTitle: deviceTitle,
		selectedCharacteristic: selectedCharacteristic,
		selectedCharacteristicName: selectedCharacteristicName,
		addDeviceLog: logController.addDeviceLog,
		activeStep: activeStep,
		selectTestTab: selectTestTab,
		addGlobalLog: logController.addGlobalLog,
		switchCurrentDevice: switchCurrentDevice,
		bleApiGateway: bleApiGateway,
		errorText: logController.errorText
	})

	const eventController = createBleEventController({
		bleApiGateway: bleApiGateway,
		addGlobalLog: logController.addGlobalLog,
		listenerUsesIds: listenerUsesIds,
		runningTasks: taskController.runningTasks,
		upsertDevices: upsertDevices,
		scanControlActive: scanControlActive,
		addDeviceLog: logController.addDeviceLog,
		projectAdapterState: projectAdapterState,
		projectDevices: projectDevices,
		projectConnection: projectConnection,
		projectValue: projectValue
	})

	return {
		steps: steps,
		testTab: testTab,
		listenerUsesIds: listenerUsesIds,
		utf8Supported: utf8Supported,
		activeStep: activeStep,
		adapterAvailable: adapterAvailable,
		adapterOpened: adapterOpened,
		adapterState: adapterState,
		adapterOperation: adapterOperation,
		discovering: discovering,
		scanServicesText: scanServicesText,
		scanIntervalText: scanIntervalText,
		scanDurationText: scanDurationText,
		scanRemainingSeconds: scanRemainingSeconds,
		connectedServicesText: connectedServicesText,
		allowDuplicates: allowDuplicates,
		ignoreUnknown: ignoreUnknown,
		filterConnectable: filterConnectable,
		devices: devices,
		connectedIds: connectedIds,
		selectedDeviceId: selectedDeviceId,
		deviceSelectorOpen: deviceSelectorOpen,
		selectedServiceId: selectedServiceId,
		selectedCharacteristicId: selectedCharacteristicId,
		selectedCharacteristicName: selectedCharacteristicName,
		services: services,
		currentRSSI: currentRSSI,
		currentMTU: currentMTU,
		notifying: notifying,
		writeHex: writeHex,
		writeUtf8: writeUtf8,
		writePayloadMode: writePayloadMode,
		writeMode: writeMode,
		valueDisplayMode: valueDisplayMode,
		lastValueTime: lastValueTime,
		mtuText: mtuText,
		scanPending: scanPending,
		queryPending: queryPending,
		gattBusy: gattBusy,
		ioBusy: ioBusy,
		notifyBusy: notifyBusy,
		logs: logController.logs,
		logFilterMode: logController.logFilterMode,
		selectedLogDeviceId: logController.selectedLogDeviceId,
		tasks: taskController.tasks,
		taskEditorOpen: taskController.taskEditorOpen,
		taskEditorReturnToConcurrency: taskController.taskEditorReturnToConcurrency,
		taskDraftKind: taskController.taskDraftKind,
		taskDraftCountText: taskController.taskDraftCountText,
		taskDraftTimeoutText: taskController.taskDraftTimeoutText,
		taskDraftExpectedHex: taskController.taskDraftExpectedHex,
		taskEditorError: taskController.taskEditorError,
		eventRows: eventController.eventRows,
		panelDevices: panelDevices,
		connectedCount: connectedCount,
		panelConnectedDeviceId: panelConnectedDeviceId,
		currentDeviceName: currentDeviceName,
		connectionPending: connectionPending,
		connectingIds: connectingIds,
		characteristicCount: characteristicCount,
		canRead: canRead,
		canWriteWithResponse: canWriteWithResponse,
		canWriteWithoutResponse: canWriteWithoutResponse,
		canWrite: canWrite,
		canNotify: canNotify,
		taskDraftNotifyTypeLabel: taskDraftNotifyTypeLabel,
		taskWriteVerificationText: taskWriteVerificationText,
		selectedPathHasRunningTask: taskController.selectedPathHasRunningTask,
		writePayloadSummary: writePayloadSummary,
		writePayloadHexPreview: writePayloadHexPreview,
		totalTasks: taskController.totalTasks,
		runningTasks: taskController.runningTasks,
		passedTasks: taskController.passedTasks,
		failedTasks: taskController.failedTasks,
		concurrencySubtitle: taskController.concurrencySubtitle,
		availableTaskKinds: availableTaskKinds,
		taskDraftConflictReason: taskController.taskDraftConflictReason,
		scanControlActive: scanControlActive,
		adapterOpenDisabled: adapterOpenDisabled,
		adapterQueryDisabled: adapterQueryDisabled,
		adapterReleaseDisabled: adapterReleaseDisabled,
		lastValueDisplay: lastValueDisplay,
		lastValueMeta: lastValueMeta,
		visibleLogDevices: logController.visibleLogDevices,
		selectStep: selectStep,
		selectTestTab: selectTestTab,
		clearLogs: logController.clearLogs,
		setLogFilter: logController.setLogFilter,
		selectLogDevice: logController.selectLogDevice,
		toggleDeviceDetails: toggleDeviceDetails,
		startDiscovery: startDiscovery,
		stopDiscovery: stopDiscovery,
		getCachedDevices: getCachedDevices,
		getConnectedDevices: getConnectedDevices,
		connect: connect,
		disconnect: disconnect,
		disconnectSelected: disconnectSelected,
		toggleDeviceSelector: toggleDeviceSelector,
		switchCurrentDevice: switchCurrentDevice,
		openAdapter: openAdapter,
		queryAdapterState: queryAdapterState,
		releaseAdapter: releaseAdapter,
		refreshGatt: refreshGatt,
		selectService: selectService,
		selectCharacteristic: selectCharacteristic,
		selectWriteMode: selectWriteMode,
		selectValueDisplayMode: selectValueDisplayMode,
		copyLastValue: copyLastValue,
		copyDeviceId: copyDeviceId,
		pasteWritePayload: pasteWritePayload,
		pasteExpectedHex: taskController.pasteExpectedHex,
		readValue: readValue,
		writeValue: writeValue,
		toggleNotify: toggleNotify,
		selectTaskDraftKind: taskController.selectTaskDraftKind,
		openTaskEditor: taskController.openTaskEditor,
		closeTaskEditor: taskController.closeTaskEditor,
		confirmTaskEditor: taskController.confirmTaskEditor,
		openTaskPickerForDevice: taskController.openTaskPickerForDevice,
		runAllTasks: taskController.runAllTasks,
		toggleDeviceTaskPause: taskController.toggleDeviceTaskPause,
		rebindDeviceTasks: taskController.rebindDeviceTasks,
		removeTaskItem: taskController.removeTaskItem,
		removeTask: taskController.removeTask,
		toggleEventListener: eventController.toggleEventListener,
		clearListeners: eventController.clearListeners,
		toggleEventLogs: eventController.toggleEventLogOpen,
		clearEventLogs: eventController.clearEventLogs,
		onPageLoad: onPageLoad,
		onPageUnload: onPageUnload,
		registerCoreListeners: eventController.registerCoreListeners,
		contractBusy: contractBusy,
		canNotification: canNotification,
		makeContractSuccessHandler: makeContractSuccessHandler,
		getContractDisconnectEpoch: getContractDisconnectEpoch,
		restoreContractListeners: eventController.restoreAfterListenerRemoval,
		apiTraces: logController.apiTraces
	}
}
