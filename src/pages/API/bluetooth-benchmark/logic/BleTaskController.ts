import { ref, computed, Ref, ComputedRef } from 'vue'
import { TestDevice, TestCharacteristic, LogKind, WritePayloadMode, TaskKind, TaskStatus, TaskItem, DeviceTask, DeviceConnectionEpoch, WriteMode, NotifyMode, BleTestTab } from './BleWorkspaceTypes.ts'
import { BleApiGateway } from './BleApiGateway.ts'

export type BleTaskContext = {
	selectedDeviceId : Ref<string>
	selectedServiceId : Ref<string>
	selectedCharacteristicId : Ref<string>
	connectedIds : Ref<string[]>
	hexBuffer : (source : string) => ArrayBuffer | null
	bufferHex : (buffer : ArrayBuffer) => string
	availableTaskKinds : ComputedRef<TaskKind[]>
	writeMode : Ref<WriteMode>
	canWriteWithResponse : ComputedRef<boolean>
	canWriteWithoutResponse : ComputedRef<boolean>
	encodeWritePayload : (source : string, mode : WritePayloadMode) => ArrayBuffer | null
	writePayloadModeLabel : (mode : WritePayloadMode) => string
	currentWritePayload : () => string
	writePayloadMode : Ref<WritePayloadMode>
	currentMTU : Ref<number>
	devices : Ref<TestDevice[]>
	deviceTitle : (device : TestDevice) => string
	selectedCharacteristic : ComputedRef<TestCharacteristic | null>
	selectedCharacteristicName : Ref<string>
	addDeviceLog : (kind : LogKind, api : string, detail : string, deviceId : string, serviceId ?: string, characteristicId ?: string) => void
	activeStep : Ref<number>
	selectTestTab : (tab : BleTestTab) => void
	addGlobalLog : (kind : LogKind, api : string, detail : string) => void
	switchCurrentDevice : (deviceId : string) => void
	bleApiGateway : BleApiGateway
	errorText : (error : IUniError) => string
}

export function createBleTaskController(context : BleTaskContext) {
	const { selectedDeviceId, selectedServiceId, selectedCharacteristicId, connectedIds, hexBuffer, bufferHex, availableTaskKinds, writeMode, canWriteWithResponse, canWriteWithoutResponse, encodeWritePayload, writePayloadModeLabel, currentWritePayload, writePayloadMode, currentMTU, devices, deviceTitle, selectedCharacteristic, selectedCharacteristicName, addDeviceLog, activeStep, selectTestTab, addGlobalLog, switchCurrentDevice, bleApiGateway, errorText } = context

	const tasks = ref([] as DeviceTask[])

	const connectionEpochs = ref([] as DeviceConnectionEpoch[])

	const taskEditorOpen = ref(false)

	const taskEditorReturnToConcurrency = ref(false)

	const taskDraftKind = ref('read' as TaskKind)

	const taskDraftCountText = ref('10')

	const taskDraftTimeoutText = ref('8000')

	const taskDraftExpectedHex = ref('')

	const taskEditorError = ref('')

	const selectedPathHasRunningTask = computed(() : boolean => {
		if (selectedDeviceId.value == '' || selectedServiceId.value == '' || selectedCharacteristicId.value == '') return false
		for (let taskIndex = 0; taskIndex < tasks.value.length; taskIndex++) {
			const task = tasks.value[taskIndex]
			if (task.deviceId != selectedDeviceId.value) continue
			if (task.items.findIndex((item : TaskItem) : boolean => item.status == 'RUNNING' && item.serviceId == selectedServiceId.value && item.characteristicId == selectedCharacteristicId.value) >= 0) return true
		}
		return false
	})

	const totalTasks = computed(() : number => { let count = 0; tasks.value.forEach((task : DeviceTask) => count += task.items.length); return count })

	const runningTasks = computed(() : number => taskCount('RUNNING'))

	const passedTasks = computed(() : number => taskOutcomeCount(true))

	const failedTasks = computed(() : number => taskOutcomeCount(false))

	const blockedTasks = computed(() : number => taskCount('BLOCKED'))

	const concurrencySubtitle = computed(() : string => tasks.value.length.toString() + ' 台设备 · ' + totalTasks.value.toString() + ' 条测试任务' + (blockedTasks.value > 0 ? ' · ' + blockedTasks.value.toString() + ' 条待处理' : ''))

	const taskDraftConflictReason = computed(() : string => {
		if (selectedDeviceId.value == '' || selectedServiceId.value == '' || selectedCharacteristicId.value == '') return ''
		return taskPathConflictReason(taskDraftKind.value, selectedDeviceId.value, selectedServiceId.value, selectedCharacteristicId.value)
	})

	function pasteExpectedHex() {
		uni.getClipboardData({
			success: (result) => {
				taskDraftExpectedHex.value = result.data
				taskEditorError.value = ''
				uni.showToast({ title: '已粘贴', icon: 'none' })
			},
			fail: (_) => uni.showToast({ title: '读取剪贴板失败', icon: 'none' })
		})
	}

	function taskCount(status : TaskStatus) : number {
		let count = 0
		tasks.value.forEach((task : DeviceTask) => task.items.forEach((item : TaskItem) => { if (item.status == status) count++ }))
		return count
	}

	function taskOutcomeCount(success : boolean) : number {
		let count = 0
		tasks.value.forEach((task : DeviceTask) => task.items.forEach((item : TaskItem) => { count += success ? item.successCount : item.failCount }))
		return count
	}

	function connectionEpochRecord(deviceId : string) : DeviceConnectionEpoch {
		let record = connectionEpochs.value.find((item : DeviceConnectionEpoch) : boolean => item.deviceId == deviceId)
		if (record == null) {
			record = { deviceId: deviceId, epoch: 0 }
			connectionEpochs.value.push(record!)
		}
		return record!
	}

	function currentConnectionEpoch(deviceId : string) : number {
		return connectionEpochRecord(deviceId).epoch
	}

	function connectionEpochOf(deviceId : string) : number {
		const record = connectionEpochs.value.find((item : DeviceConnectionEpoch) : boolean => item.deviceId == deviceId)
		return record == null ? 0 : record.epoch
	}

	function markDeviceConnected(deviceId : string) {
		if (connectedIds.value.indexOf(deviceId) >= 0) return
		connectedIds.value.push(deviceId)
		connectionEpochRecord(deviceId).epoch++
	}

	function taskKindName(kind : TaskKind) : string {
		if (kind == 'read') return '读取'
		if (kind == 'write') return '写入'
		return '通知采集'
	}

	function parseTaskNumber(text : string, minimum : number, maximum : number) : number | null {
		const value = parseInt(text)
		if (isNaN(value) || value < minimum || value > maximum) return null
		return value
	}

	function normalizedOptionalHex(source : string) : string | null {
		if (source.trim().length == 0) return ''
		const buffer = hexBuffer(source)
		return buffer == null ? null : bufferHex(buffer)
	}

	function selectTaskDraftKind(kind : TaskKind) {
		if (availableTaskKinds.value.indexOf(kind) < 0) return
		taskDraftKind.value = kind
		if (kind == 'write') normalizeTaskWriteMode()
		taskEditorError.value = ''
	}

	function normalizeTaskWriteMode() {
		if (writeMode.value == 'write' && !canWriteWithResponse.value && canWriteWithoutResponse.value) writeMode.value = 'writeNoResponse'
		else if (writeMode.value == 'writeNoResponse' && !canWriteWithoutResponse.value && canWriteWithResponse.value) writeMode.value = 'write'
	}

	function openTaskEditor(returnToConcurrency : boolean) {
		if (selectedDeviceId.value == '' || selectedServiceId.value == '' || selectedCharacteristicId.value == '' || availableTaskKinds.value.length == 0) return
		taskDraftKind.value = availableTaskKinds.value[0]
		if (taskDraftKind.value == 'write') normalizeTaskWriteMode()
		taskDraftCountText.value = taskDraftKind.value == 'notify' ? '20' : '1'
		taskDraftTimeoutText.value = taskDraftKind.value == 'notify' ? '15000' : '8000'
		taskDraftExpectedHex.value = ''
		taskEditorError.value = ''
		taskEditorReturnToConcurrency.value = returnToConcurrency
		taskEditorOpen.value = true
	}

	function closeTaskEditor() {
		taskEditorOpen.value = false
		taskEditorError.value = ''
		taskEditorReturnToConcurrency.value = false
	}

	function taskPathConflictReason(kind : TaskKind, deviceId : string, serviceId : string, characteristicId : string) : string {
		for (let taskIndex = 0; taskIndex < tasks.value.length; taskIndex++) {
			const task = tasks.value[taskIndex]
			if (task.deviceId != deviceId) continue
			for (let itemIndex = 0; itemIndex < task.items.length; itemIndex++) {
				const item = task.items[itemIndex]
				if (item.serviceId != serviceId || item.characteristicId != characteristicId) continue
				if (item.kind == kind) return '同一路径已存在相同任务'
				if ((item.kind == 'read' && kind == 'write') || (item.kind == 'write' && kind == 'read')) return '同一特征不能同时添加 Read 和 Write，会影响并发测试结果，禁止加入任务'
			}
		}
		return ''
	}

	function taskInitialDetail(kind : TaskKind, count : number, timeout : number) : string {
		if (kind == 'notify') return '目标 ' + count.toString() + ' 个事件 · 超时 ' + timeout.toString() + ' ms'
		return '单次请求 · 超时 ' + timeout.toString() + ' ms'
	}

	function taskWritePayloadDetail(item : TaskItem) : string {
		const buffer = encodeWritePayload(item.payload, item.payloadEncoding)
		if (buffer == null) return writePayloadModeLabel(item.payloadEncoding) + ' 无效'
		const hex = bufferHex(buffer)
		const preview = hex.length > 35 ? hex.substring(0, 35) + '...' : hex
		return buffer.byteLength.toString() + ' B ' + writePayloadModeLabel(item.payloadEncoding) + ' · ' + preview
	}

	function taskConfiguredDetail(item : TaskItem) : string {
		const base = taskInitialDetail(item.kind, item.targetCount, item.timeoutMs)
		if (item.kind == 'write') return (item.writeMode == 'write' ? 'W' : 'WN') + ' · ' + base + ' · ' + taskWritePayloadDetail(item)
		if (item.kind == 'notify') return (item.notifyMode == 'notification' ? 'Notification' : 'Indication') + ' · ' + base
		return base + (item.expectedHex.length > 0 ? ' · 断言 ' + item.expectedHex : '')
	}

	function confirmTaskEditor() {
		const targetCount = taskDraftKind.value == 'notify' ? parseTaskNumber(taskDraftCountText.value, 1, 1000) : 1
		const timeout = parseTaskNumber(taskDraftTimeoutText.value, 500, 120000)
		const expectedHex = normalizedOptionalHex(taskDraftExpectedHex.value)
		if (targetCount == null || timeout == null) {
			taskEditorError.value = '目标事件数范围 1-1000，超时范围 500-120000 ms'
			return
		}
		if (taskDraftKind.value == 'read' && expectedHex == null) {
			taskEditorError.value = '期望值必须是有效 HEX，或留空表示仅验证返回值事件'
			return
		}
		if (taskDraftKind.value == 'write') {
			const payload = encodeWritePayload(currentWritePayload(), writePayloadMode.value)
			if (payload == null) {
				taskEditorError.value = writePayloadMode.value == 'hex' ? '写入内容不是有效 HEX' : '写入文本不能为空'
				return
			}
			if (currentMTU.value > 0 && payload!.byteLength > currentMTU.value) {
				taskEditorError.value = 'payload 为 ' + payload!.byteLength.toString() + ' bytes，超过当前写入方式上限 ' + currentMTU.value.toString() + ' bytes'
				return
			}
		}
		const conflictReason = taskPathConflictReason(taskDraftKind.value, selectedDeviceId.value, selectedServiceId.value, selectedCharacteristicId.value)
		if (conflictReason.length > 0) {
			taskEditorError.value = conflictReason
			return
		}
		const device = devices.value.find((item : TestDevice) : boolean => item.deviceId == selectedDeviceId.value)
		let task = tasks.value.find((item : DeviceTask) : boolean => item.deviceId == selectedDeviceId.value)
		if (task == null) {
			task = { id: selectedDeviceId.value, deviceId: selectedDeviceId.value, deviceName: device == null ? selectedDeviceId.value : deviceTitle(device!), paused: false, items: [] }
			tasks.value.push(task!)
		}
		let notifyMode = 'indication' as NotifyMode
		if (selectedCharacteristic.value != null && selectedCharacteristic.value!.properties.indexOf('NOTIFY') >= 0) notifyMode = 'notification'
		const item : TaskItem = {
			id: selectedDeviceId.value + '-' + selectedServiceId.value + '-' + selectedCharacteristicId.value + '-' + taskDraftKind.value + '-' + Date.now().toString(),
			kind: taskDraftKind.value,
			serviceId: selectedServiceId.value,
			characteristicId: selectedCharacteristicId.value,
			label: selectedCharacteristicName.value,
			payload: currentWritePayload(),
			payloadEncoding: writePayloadMode.value,
			writeMode: writeMode.value,
			notifyMode: notifyMode,
			targetCount: targetCount!,
			timeoutMs: timeout!,
			expectedHex: expectedHex == null ? '' : expectedHex!,
			boundConnectionEpoch: currentConnectionEpoch(selectedDeviceId.value),
			detail: taskInitialDetail(taskDraftKind.value, targetCount!, timeout!),
			status: 'IDLE',
			completedCount: 0,
			successCount: 0,
			failCount: 0,
			eventCount: 0,
			lastValueHex: '',
			runToken: 0,
			timeoutId: 0,
			apiSucceeded: false,
			apiSuccessCount: 0,
			valueEventCount: 0,
			notifyEnablePending: false,
			notifyRequestToken: 0,
			notifyCleanupSubmitted: false
		}
		item.detail = taskConfiguredDetail(item)
		task!.items.push(item)
		addDeviceLog('success', 'concurrency.addTask', taskKindName(item.kind) + (item.kind == 'notify' ? ' · events=' + item.targetCount.toString() : ' · single request'), task!.deviceId, item.serviceId, item.characteristicId)
		const shouldReturn = taskEditorReturnToConcurrency.value
		closeTaskEditor()
		if (shouldReturn) { activeStep.value = 2; selectTestTab('concurrency') }
	}

	function openTaskPickerForDevice(deviceId : string) {
		let targetDeviceId = deviceId
		if (targetDeviceId.length == 0) {
			if (selectedDeviceId.value.length > 0 && connectedIds.value.indexOf(selectedDeviceId.value) >= 0) targetDeviceId = selectedDeviceId.value
			else if (connectedIds.value.length > 0) targetDeviceId = connectedIds.value[0]
		}
		if (targetDeviceId.length == 0) {
			addGlobalLog('fail', 'concurrency.addTask', '没有已连接设备')
			activeStep.value = 0
			return
		}
		taskEditorReturnToConcurrency.value = true
		activeStep.value = 1
		switchCurrentDevice(targetDeviceId)
	}

	function clearTaskTimers(item : TaskItem) {
		if (item.timeoutId != 0) clearTimeout(item.timeoutId)
		item.timeoutId = 0
	}

	function armTaskTimeout(task : DeviceTask, item : TaskItem, token : number, detail : string) {
		if (item.timeoutId != 0) clearTimeout(item.timeoutId)
		item.timeoutId = setTimeout(() => {
			if (item.runToken != token || item.status != 'RUNNING') return
			const timeoutDetail = item.kind == 'notify' ? '通知采集超时 · received=' + item.eventCount.toString() : detail + ' · completed=' + item.completedCount.toString() + ' success=' + item.successCount.toString() + ' fail=' + item.failCount.toString()
			if (item.kind == 'notify') failTask(task, item, timeoutDetail)
			else failTaskRequest(task, item, timeoutDetail)
		}, item.timeoutMs)
	}

	function failTask(task : DeviceTask, item : TaskItem, detail : string) {
		clearTaskTimers(item)
		item.failCount++
		item.status = 'FAIL'
		item.detail = detail
		addDeviceLog('fail', 'concurrency.' + item.kind, detail, task.deviceId, item.serviceId, item.characteristicId)
		if (item.kind == 'notify') disableTaskNotify(task, item)
	}

	function passTask(task : DeviceTask, item : TaskItem, detail : string) {
		clearTaskTimers(item)
		if (item.kind == 'notify') item.successCount++
		item.status = 'PASS'
		item.detail = detail
		addDeviceLog('success', 'concurrency.' + item.kind, detail, task.deviceId, item.serviceId, item.characteristicId)
		if (item.kind == 'notify') disableTaskNotify(task, item)
	}

	function finishTaskFailure(task : DeviceTask, item : TaskItem, detail : string) {
		clearTaskTimers(item)
		item.status = 'FAIL'
		item.detail = detail
		addDeviceLog('fail', 'concurrency.' + item.kind, detail, task.deviceId, item.serviceId, item.characteristicId)
		if (item.kind == 'notify') disableTaskNotify(task, item)
	}

	function failTaskRequest(task : DeviceTask, item : TaskItem, detail : string) {
		const unresolved = item.targetCount - item.completedCount
		if (unresolved > 0) item.failCount += unresolved
		item.completedCount = item.targetCount
		finishTaskFailure(task, item, detail)
	}

	function completeTaskRequest(task : DeviceTask, item : TaskItem, token : number, detail : string) {
		if (item.runToken != token || item.status != 'RUNNING') return
		if (item.kind == 'read') {
			// Read is complete only after both the API callback and its value event.
			item.successCount = item.apiSuccessCount < item.valueEventCount ? item.apiSuccessCount : item.valueEventCount
			item.completedCount = item.successCount + item.failCount
		}
		if (item.completedCount >= item.targetCount) {
			const result = detail + ' · success=' + item.successCount.toString() + ' fail=' + item.failCount.toString() + ' / ' + item.targetCount.toString()
			if (item.failCount > 0) finishTaskFailure(task, item, result)
			else passTask(task, item, result)
			return
		}
		item.detail = detail + ' · success=' + item.successCount.toString() + ' fail=' + item.failCount.toString() + ' / ' + item.targetCount.toString()
	}

	function tryCompleteReadBatch(task : DeviceTask, item : TaskItem, token : number) {
		if (item.runToken != token || item.status != 'RUNNING') return
		if (item.expectedHex.length > 0 && item.valueEventCount > 0 && item.lastValueHex != item.expectedHex) {
			failTaskRequest(task, item, '值断言失败 · expected=' + item.expectedHex + ' actual=' + item.lastValueHex)
			return
		}
		const detail = item.expectedHex.length > 0 ? 'READ callback + value=' + item.lastValueHex : (item.valueEventCount > 0 ? 'READ callback + value=' + item.lastValueHex : 'READ callback')
		completeTaskRequest(task, item, token, detail)
	}

	function executeReadRequest(task : DeviceTask, item : TaskItem, token : number) {
		item.apiSuccessCount = 0
		item.valueEventCount = 0
		item.lastValueHex = ''
		item.detail = 'READ 请求中'
		armTaskTimeout(task, item, token, '等待读取回调与 value event 超时')
		bleApiGateway.readBLECharacteristicValue({
			deviceId: task.deviceId,
			serviceId: item.serviceId,
			characteristicId: item.characteristicId,
			success: (_) => {
				if (item.runToken != token || item.status != 'RUNNING') return
				item.apiSuccessCount++
				tryCompleteReadBatch(task, item, token)
			},
			fail: (error) => {
				if (item.runToken != token || item.status != 'RUNNING') return
				item.failCount++
				item.completedCount++
				item.detail = 'READ 失败 · ' + errorText(error)
				completeTaskRequest(task, item, token, 'READ')
			}
		})
	}

	function executeWriteRequest(task : DeviceTask, item : TaskItem, token : number) {
		const payload = encodeWritePayload(item.payload, item.payloadEncoding)
		if (payload == null) {
			failTask(task, item, item.payloadEncoding == 'hex' ? 'HEX 格式无效' : 'UTF-8 内容为空')
			return
		}
		const mode = item.writeMode == 'write' ? 'W' : 'WN'
		const payloadDetail = taskWritePayloadDetail(item)
		item.detail = mode + ' 请求中 · ' + payloadDetail
		armTaskTimeout(task, item, token, mode + ' 等待并发写入回调超时 · ' + payloadDetail)
		bleApiGateway.writeBLECharacteristicValue({
			deviceId: task.deviceId,
			serviceId: item.serviceId,
			characteristicId: item.characteristicId,
			value: payload,
			writeType: item.writeMode,
			success: (_) => {
				if (item.runToken != token || item.status != 'RUNNING') return
				item.successCount++
				item.completedCount++
				const outcome = item.writeMode == 'write' ? 'ATT 响应' : '已提交 Runtime/CoreBluetooth'
				completeTaskRequest(task, item, token, mode + ' · ' + outcome + ' · ' + payloadDetail)
			},
			fail: (error) => {
				if (item.runToken != token || item.status != 'RUNNING') return
				item.failCount++
				item.completedCount++
				item.detail = mode + ' 失败 · ' + errorText(error)
				completeTaskRequest(task, item, token, mode + ' · ' + payloadDetail)
			}
		})
	}

	function disableTaskNotify(task : DeviceTask, item : TaskItem) {
		if (!item.apiSucceeded || item.notifyCleanupSubmitted) return
		item.notifyCleanupSubmitted = true
		bleApiGateway.notifyBLECharacteristicValueChange({
			deviceId: task.deviceId,
			serviceId: item.serviceId,
			characteristicId: item.characteristicId,
			state: false,
			type: item.notifyMode,
			fail: (error) => addDeviceLog('fail', 'concurrency.notify.cleanup', errorText(error), task.deviceId, item.serviceId, item.characteristicId)
		})
	}

	function executeNotifyTask(task : DeviceTask, item : TaskItem, token : number) {
		item.apiSucceeded = false
		item.notifyEnablePending = true
		item.notifyRequestToken = token
		item.notifyCleanupSubmitted = false
		item.eventCount = 0
		item.detail = '开启订阅 · 目标 ' + item.targetCount.toString() + ' 个事件'
		armTaskTimeout(task, item, token, '通知采集超时 · received=' + item.eventCount.toString())
		bleApiGateway.notifyBLECharacteristicValueChange({
			deviceId: task.deviceId,
			serviceId: item.serviceId,
			characteristicId: item.characteristicId,
			state: true,
			type: item.notifyMode,
			success: (_) => {
				if (item.notifyRequestToken != token) return
				item.apiSucceeded = true
				item.notifyEnablePending = false
				if (item.runToken != token || item.status != 'RUNNING') {
					// Cancellation may have happened before the enable callback. Clean up this request only.
					disableTaskNotify(task, item)
					return
				}
				item.detail = '采集中 · ' + item.eventCount.toString() + ' / ' + item.targetCount.toString() + ' 事件'
				if (item.eventCount >= item.targetCount) passTask(task, item, '通知采集完成 · ' + item.eventCount.toString() + ' 个事件')
			},
			fail: (error) => {
				if (item.notifyRequestToken != token) return
				item.notifyEnablePending = false
				if (item.runToken != token || item.status != 'RUNNING') return
				failTask(task, item, errorText(error))
			}
		})
	}

	function executeTaskRequest(task : DeviceTask, item : TaskItem, token : number) {
		if (item.kind == 'read') executeReadRequest(task, item, token)
		else if (item.kind == 'write') executeWriteRequest(task, item, token)
	}

	function executeTaskItem(task : DeviceTask, item : TaskItem) {
		if (item.kind == 'notify' && item.notifyEnablePending) {
			item.status = 'IDLE'
			item.detail = '等待上一次订阅请求完成清理后再试'
			return
		}
		clearTaskTimers(item)
		item.runToken++
		item.completedCount = 0
		item.successCount = 0
		item.failCount = 0
		item.eventCount = 0
		item.apiSucceeded = false
		item.apiSuccessCount = 0
		item.valueEventCount = 0
		item.notifyEnablePending = false
		item.notifyCleanupSubmitted = false
		if (task.paused) {
			item.status = 'PAUSED'
			item.detail = '设备任务组已暂停'
			return
		}
		if (connectedIds.value.indexOf(task.deviceId) < 0) {
			item.status = 'BLOCKED'
			item.detail = '设备已断开，请重连后重新绑定任务'
			return
		}
		if (item.boundConnectionEpoch != currentConnectionEpoch(task.deviceId)) {
			item.status = 'BLOCKED'
			item.detail = '连接轮次已变化，请确认 GATT 后重新绑定'
			return
		}
		item.status = 'RUNNING'
		const token = item.runToken
		if (item.kind == 'notify') executeNotifyTask(task, item, token)
		else executeTaskRequest(task, item, token)
	}

	function runAllTasks() {
		if (totalTasks.value == 0 || runningTasks.value > 0) return
		addGlobalLog('event', 'concurrency.runAll', 'devices=' + tasks.value.length.toString() + ' tasks=' + totalTasks.value.toString())
		tasks.value.forEach((task : DeviceTask) => task.items.forEach((item : TaskItem) => executeTaskItem(task, item)))
	}

	function handleTaskValueEvent(deviceId : string, serviceId : string, characteristicId : string, valueHex : string) {
		tasks.value.forEach((task : DeviceTask) => {
			if (task.deviceId != deviceId) return
			task.items.forEach((item : TaskItem) => {
				if (item.status != 'RUNNING' || item.serviceId != serviceId || item.characteristicId != characteristicId) return
				if (item.kind == 'read') {
					item.valueEventCount++
					item.lastValueHex = valueHex
					tryCompleteReadBatch(task, item, item.runToken)
				} else if (item.kind == 'notify') {
					item.eventCount++
					item.lastValueHex = valueHex
					item.detail = '采集中 · ' + item.eventCount.toString() + ' / ' + item.targetCount.toString() + ' 事件'
					if (item.apiSucceeded && item.eventCount >= item.targetCount) passTask(task, item, '通知采集完成 · ' + item.eventCount.toString() + ' 个事件')
				}
			})
		})
	}

	function toggleDeviceTaskPause(task : DeviceTask) {
		task.paused = !task.paused
		task.items.forEach((item : TaskItem) => {
			if (task.paused) {
				const shouldCancelNotify = item.kind == 'notify' && item.status == 'RUNNING'
				item.runToken++
				clearTaskTimers(item)
				item.status = 'PAUSED'
				item.detail = '已暂停，不再发起后续调用；已提交操作仍可能返回'
				if (shouldCancelNotify) disableTaskNotify(task, item)
			} else if (item.status == 'PAUSED') {
				item.status = 'IDLE'
				item.detail = taskConfiguredDetail(item)
			}
		})
		addDeviceLog('event', 'concurrency.pause', 'paused=' + task.paused.toString(), task.deviceId)
	}

	function rebindDeviceTasks(task : DeviceTask) {
		if (connectedIds.value.indexOf(task.deviceId) < 0) return
		const epoch = currentConnectionEpoch(task.deviceId)
		task.items.forEach((item : TaskItem) => {
			if (item.status == 'BLOCKED') {
				item.boundConnectionEpoch = epoch
				item.status = 'IDLE'
				item.detail = taskConfiguredDetail(item)
			}
		})
		addDeviceLog('event', 'concurrency.rebind', 'connectionEpoch=' + epoch.toString(), task.deviceId)
	}

	function blockDeviceTasks(deviceId : string, detail : string) {
		const task = tasks.value.find((item : DeviceTask) : boolean => item.deviceId == deviceId)
		if (task == null) return
		task!.items.forEach((item : TaskItem) => {
			item.runToken++
			clearTaskTimers(item)
			item.status = 'BLOCKED'
			item.detail = detail
		})
	}

	function cancelTaskItem(task : DeviceTask, item : TaskItem) {
		const shouldCancelNotify = item.kind == 'notify' && item.status == 'RUNNING'
		item.runToken++
		clearTaskTimers(item)
		if (shouldCancelNotify) disableTaskNotify(task, item)
	}

	function removeTaskItem(taskId : string, itemId : string) {
		const task = tasks.value.find((item : DeviceTask) : boolean => item.id == taskId)
		if (task == null) return
		const item = task!.items.find((entry : TaskItem) : boolean => entry.id == itemId)
		if (item == null) return
		cancelTaskItem(task!, item!)
		task!.items = task!.items.filter((entry : TaskItem) : boolean => entry.id != itemId)
		if (task!.items.length == 0) {
			tasks.value = tasks.value.filter((entry : DeviceTask) : boolean => entry.id != taskId)
		}
	}

	function removeTask(id : string) {
		const task = tasks.value.find((item : DeviceTask) : boolean => item.id == id)
		if (task != null) {
			task!.items.forEach((item : TaskItem) => {
				cancelTaskItem(task!, item)
			})
		}
		tasks.value = tasks.value.filter((item : DeviceTask) : boolean => item.id != id)
	}

	function invalidateTasks() {
		tasks.value.forEach((task : DeviceTask) => task.items.forEach((item : TaskItem) => { item.runToken++; clearTaskTimers(item) }))
	}

	function resetTasks() {
		tasks.value = [] as DeviceTask[]
		connectionEpochs.value = [] as DeviceConnectionEpoch[]
	}

	return {
		tasks, taskEditorOpen, taskEditorReturnToConcurrency, taskDraftKind,
		taskDraftCountText, taskDraftTimeoutText, taskDraftExpectedHex, taskEditorError,
		selectedPathHasRunningTask, totalTasks, runningTasks, passedTasks, failedTasks,
		concurrencySubtitle, taskDraftConflictReason, pasteExpectedHex,
		markDeviceConnected, connectionEpochOf, selectTaskDraftKind, normalizeTaskWriteMode,
		openTaskEditor, closeTaskEditor, confirmTaskEditor, openTaskPickerForDevice,
		runAllTasks, handleTaskValueEvent, toggleDeviceTaskPause, rebindDeviceTasks,
		blockDeviceTasks, removeTaskItem, removeTask, invalidateTasks, resetTasks
	}
}
