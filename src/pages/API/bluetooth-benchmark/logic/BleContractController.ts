import { ref, computed, watch, Ref, ComputedRef } from 'vue'
import { currentBlePlatform } from './BleApiGateway.ts'
import { contractApis, contractCases } from './BleContractCatalog.ts'
import { BleApiContext, BleApiTrace, BleContractApi, BleContractCase, BleContractCategory, BleContractPrecondition, BleContractPreparation, BleContractResult, BleContractStatus, TestDevice, TestService, WriteMode } from './BleWorkspaceTypes.ts'

export type BleContractContext = {
	adapterOpened : Ref<boolean>, connectedIds : Ref<string[]>, selectedDeviceId : Ref<string>, selectedServiceId : Ref<string>, selectedCharacteristicId : Ref<string>,
	devices : Ref<TestDevice[]>, services : Ref<TestService[]>, adapterAvailable : Ref<boolean>,
	discovering : ComputedRef<boolean>, workbenchBusy : ComputedRef<boolean>, canRead : ComputedRef<boolean>, canWriteWithResponse : ComputedRef<boolean>, canWriteWithoutResponse : ComputedRef<boolean>, canNotification : ComputedRef<boolean>, notifying : Ref<boolean>,
	openAdapter : () => void, closeAdapter : () => void, selectStep : (index : number) => void,
	queryAdapterState : () => void, startDiscovery : () => void, stopDiscovery : () => void,
	toggleNotify : () => void,
	disconnect : (deviceId : string) => void,
	makeSuccessHandler : (apiName : string, apiContext : BleApiContext) => (result : any) => void
	getDisconnectEpoch : (deviceId : string) => number
}
type ContractParameters = { deviceId : string, serviceId : string, characteristicId : string, services : string[], interval : number, timeout : number, mtu : number, state : boolean, writeType : WriteMode, valueHex : string }
type FixtureConfirmation = { caseId : string, fingerprint : string }
const absentUUID = 'FFFFFFFF-FFFF-4FFF-8FFF-FFFFFFFFFFFF'
const fallbackDevice = '00000000-0000-4000-8000-000000000001'

function uuidKey(value : string) : string {
	const key = value.toUpperCase()
	if (key.length == 4) return '0000' + key + '-0000-1000-8000-00805F9B34FB'
	if (key.length == 8) return key + '-0000-1000-8000-00805F9B34FB'
	return key
}
function recordText(value : any) : string { try { return JSON.stringify(value) ?? '' } catch (_) { return '[无法序列化]' } }
function prettyText(value : any) : string { try { return JSON.stringify(value, null, 2) ?? '' } catch (_) { return '[无法序列化]' } }
function conditionsText(list : BleContractPrecondition[]) : string {
	return list.map((condition : BleContractPrecondition) : string => {
		// 受控条件是人工确认，不代表环境真的满足，不能记为“满足”。
		const state = condition.key == 'fixture' ? (condition.met ? '已确认' : '未确认') : (condition.met ? '满足' : '未满足')
		return condition.title + '：' + condition.detail + '（' + state + '）'
	}).join('\n')
}
function validUUID(value : string) : boolean { return /^([0-9a-fA-F]{4}|[0-9a-fA-F]{8}|[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/.test(value) }

function successAssertions(item : BleContractCase, value : any, available : boolean, discovering : boolean) : string[] {
	const failures : string[] = []
	if (value == null) return ['success 结果为空']
	if (value.errMsg != item.apiName + ':ok') failures.push('success.errMsg 应为 ' + item.apiName + ':ok')
	if (item.apiName == 'getBluetoothAdapterState') {
		if (typeof value.available != 'boolean' || typeof value.discovering != 'boolean') failures.push('available/discovering 必须为 boolean')
		if (value.available != available) failures.push('available 与准备状态不一致')
		if (value.discovering != discovering) failures.push('discovering 与准备状态不一致')
	}
	if (item.apiName == 'getBluetoothDevices' || item.apiName == 'getConnectedBluetoothDevices') {
		if (!Array.isArray(value.devices)) failures.push('devices 必须为数组')
		else {
			const ids : string[] = []
			value.devices.forEach((device : any) => {
				if (device == null || typeof device.deviceId != 'string' || device.deviceId.length == 0) failures.push('设备 deviceId 必须为非空字符串')
				else if (ids.indexOf(device.deviceId) >= 0) failures.push('devices 含重复 deviceId')
				else ids.push(device.deviceId)
			})
		}
	}
	if (item.apiName == 'getBLEDeviceServices' || item.apiName == 'getBLEDeviceCharacteristics') {
		const services = item.apiName == 'getBLEDeviceServices'
		const entries : any = services ? value.services : value.characteristics
		if (!Array.isArray(entries)) failures.push(services ? 'services 必须为数组' : 'characteristics 必须为数组')
		else {
			const ids : string[] = []
			entries.forEach((entry : any) => {
				if (entry == null || typeof entry.uuid != 'string' || entry.uuid.length == 0) { failures.push('uuid 必须为非空字符串'); return }
				const uuid = uuidKey(entry.uuid)
				if (!validUUID(entry.uuid)) failures.push('GATT uuid 格式无效')
				if (ids.indexOf(uuid) >= 0) failures.push('GATT 结果含重复 UUID')
				ids.push(uuid)
				if (services && typeof entry.isPrimary != 'boolean') failures.push('isPrimary 必须为 boolean')
				if (!services) {
					if (entry.properties == null) failures.push('缺少 properties')
					else if (typeof entry.properties.read != 'boolean' || typeof entry.properties.write != 'boolean' || typeof entry.properties.notify != 'boolean' || typeof entry.properties.indicate != 'boolean') failures.push('read/write/notify/indicate 必须为 boolean')
					if (entry.properties != null && currentBlePlatform() == 'app-ios' && (typeof entry.properties.writeNoResponse != 'boolean' || typeof entry.properties.writeDefault != 'boolean')) failures.push('iOS writeNoResponse/writeDefault 必须为 boolean')
				}
			})
		}
	}
	if (item.apiName == 'getBLEDeviceRSSI' && (typeof value.RSSI != 'number' || !Number.isFinite(value.RSSI))) failures.push('RSSI 必须为有限数值')
	if (item.apiName == 'getBLEMTU' || item.apiName == 'setBLEMTU') {
		const minimum = currentBlePlatform() == 'app-ios' ? 1 : 23
		if (typeof value.mtu != 'number' || !Number.isInteger(value.mtu) || value.mtu < minimum || (currentBlePlatform() != 'app-ios' && value.mtu > 517)) failures.push(currentBlePlatform() == 'app-ios' ? 'iOS 可写 payload 长度必须为正整数' : 'mtu 必须为 23..517 的整数')
	}
	return failures
}

export function createBleContractController(context : BleContractContext) {
	const apis = ref(contractApis(currentBlePlatform()))
	const selectedApiName = ref('openBluetoothAdapter')
	const results = ref([] as BleContractResult[])
	const running = ref(false)
	const deviceIdText = ref('')
	const targetDeviceId = computed(() : string => deviceIdText.value.trim().length > 0 ? deviceIdText.value.trim() : (context.selectedDeviceId.value.length > 0 ? context.selectedDeviceId.value : (context.devices.value.length > 0 ? context.devices.value[0].deviceId : '')))
	const confirmations = ref([] as FixtureConfirmation[])
	// UI 只列出可契约测试的分类；'监听' 的 on/off 入口保留在 apis 目录里，但不在面板展示。
	const categories : BleContractCategory[] = ['适配器', '发现', '连接与链路', 'GATT']
	const selectedCategory = ref('适配器' as BleContractCategory)
	const visibleApis = computed(() : BleContractApi[] => apis.value.filter((api : BleContractApi) : boolean => api.category == selectedCategory.value))
	const selectedApi = computed(() : BleContractApi => apis.value.find((api : BleContractApi) : boolean => api.name == selectedApiName.value) ?? apis.value[0])
	const cases = computed(() : BleContractCase[] => contractCases(selectedApi.value))
	let sequence = 0
	let alive = true
	let timerIds : number[] = []
	let pendingConnectionDevice = ''
	let activeEventWatch : (() => void) | null = null
	// 条件变化即撤销确认，回到相同数值也不能复用上一轮确认。
	const stopSetupWatch = watch(() : string => recordText({ device: deviceIdText.value, selected: context.selectedDeviceId.value, service: context.selectedServiceId.value, characteristic: context.selectedCharacteristicId.value, opened: context.adapterOpened.value, available: context.adapterAvailable.value, connected: context.connectedIds.value, services: context.services.value, notify: context.notifying.value, discovery: context.discovering.value }), () => { confirmations.value = [] as FixtureConfirmation[] }, { flush: 'sync' })
	function selectApi(name : string) {
		if (running.value) return
		const api = apis.value.find((entry : BleContractApi) : boolean => entry.name == name)
		if (api == null) return
		selectedCategory.value = api!.category; selectedApiName.value = name
	}
	function selectCategory(category : BleContractCategory) {
		const api = apis.value.find((entry : BleContractApi) : boolean => entry.category == category)
		if (api != null) selectApi(api!.name)
	}
	function pasteDeviceId() {
		if (!alive || running.value || context.workbenchBusy.value) return
		uni.getClipboardData({
			success: (result) => {
				if (!alive || running.value || context.workbenchBusy.value) return
				deviceIdText.value = result.data.trim()
			},
			fail: (_) => { if (alive) uni.showToast({ title: '读取剪贴板失败', icon: 'none' }) }
		})
	}
	function parameters(item : BleContractCase) : ContractParameters {
		const device = targetDeviceId.value
		const params : ContractParameters = {
			deviceId: device.length > 0 ? device : fallbackDevice,
			serviceId: context.selectedServiceId.value.length > 0 ? context.selectedServiceId.value : '180F', characteristicId: context.selectedCharacteristicId.value.length > 0 ? context.selectedCharacteristicId.value : '2A19',
			services: [context.selectedServiceId.value.length > 0 ? context.selectedServiceId.value : '180F'], interval: 0, timeout: 10000, mtu: 185, state: item.notifyEnabled, writeType: item.writeType, valueHex: '01 02 03'
		}
		if (item.scenario == 'uninitialized') { params.deviceId = fallbackDevice; params.serviceId = '180F'; params.characteristicId = '2A19'; params.services = ['180F'] }
		if (item.parameterFault == 'invalid-device') params.deviceId = 'invalid-device-id'
		if (item.parameterFault == 'unknown-device') params.deviceId = absentUUID
		if (item.parameterFault == 'missing-service') params.serviceId = absentUUID
		if (item.parameterFault == 'missing-characteristic') params.characteristicId = absentUUID
		if (item.parameterFault == 'empty-services') params.services = [] as string[]
		if (item.parameterFault == 'invalid-interval') params.interval = -1
		if (item.parameterFault == 'invalid-timeout') params.timeout = 0
		if (item.parameterFault == 'short-connect-timeout') params.timeout = 1
		if (item.parameterFault == 'invalid-service') params.serviceId = 'invalid-service-uuid'
		if (item.parameterFault == 'invalid-characteristic') params.characteristicId = 'invalid-characteristic-uuid'
		return params
	}
	function submittedParameters(item : BleContractCase, params : ContractParameters) : UTSJSONObject {
		const name = item.apiName
		if (name == 'startBluetoothDevicesDiscovery') return { interval: params.interval }
		if (name == 'getConnectedBluetoothDevices') return { services: params.services }
		if (name == 'createBLEConnection') return { deviceId: params.deviceId, timeout: params.timeout }
		if (name == 'setBLEMTU') return { deviceId: params.deviceId, mtu: params.mtu }
		if (name == 'getBLEMTU') return { deviceId: params.deviceId, writeType: params.writeType }
		if (name == 'getBLEDeviceCharacteristics') return { deviceId: params.deviceId, serviceId: params.serviceId }
		if (name == 'readBLECharacteristicValue') return { deviceId: params.deviceId, serviceId: params.serviceId, characteristicId: params.characteristicId }
		if (name == 'writeBLECharacteristicValue') return { deviceId: params.deviceId, serviceId: params.serviceId, characteristicId: params.characteristicId, writeType: params.writeType, valueHex: params.valueHex }
		if (name == 'notifyBLECharacteristicValueChange') return { deviceId: params.deviceId, serviceId: params.serviceId, characteristicId: params.characteristicId, state: params.state, type: 'notification' }
		if (name == 'closeBLEConnection' || name == 'getBLEDeviceRSSI' || name == 'getBLEDeviceServices') return { deviceId: params.deviceId }
		return {}
	}
	function parameterText(item : BleContractCase) : string { return recordText(submittedParameters(item, parameters(item))) }
	function fingerprint(item : BleContractCase) : string { return recordText({ parameters: parameterText(item), opened: context.adapterOpened.value, available: context.adapterAvailable.value, connected: context.connectedIds.value, services: context.services.value, notifying: context.notifying.value, discovering: context.discovering.value }) }
	function confirmation(item : BleContractCase) : FixtureConfirmation | null { return confirmations.value.find((entry : FixtureConfirmation) : boolean => entry.caseId == item.caseId && entry.fingerprint == fingerprint(item)) ?? null }
	function confirmFixture(item : BleContractCase) {
		if (running.value || item.fixture.length == 0) return
		const old = confirmation(item)
		confirmations.value = confirmations.value.filter((entry : FixtureConfirmation) : boolean => entry.caseId != item.caseId)
		if (old == null) confirmations.value.push({ caseId: item.caseId, fingerprint: fingerprint(item) })
	}
	function preconditions(item : BleContractCase) : BleContractPrecondition[] {
		const list : BleContractPrecondition[] = []
		const add = (key : string, title : string, met : boolean, detail : string, preparation : BleContractPreparation = 'none', actionText : string = '') => list.push({ key, title, met, detail, preparation, actionText })
		const params = parameters(item)
		const connected = context.connectedIds.value.indexOf(params.deviceId) >= 0
		const device = context.devices.value.find((entry : TestDevice) : boolean => entry.deviceId == params.deviceId)
		add('platform', '运行平台', currentBlePlatform() == 'app-ios' || currentBlePlatform() == 'mp-weixin' || currentBlePlatform() == 'app-android', currentBlePlatform())
		add('idle', '工作台无待完成操作或运行任务', !context.workbenchBusy.value, context.workbenchBusy.value ? '等待操作完成或暂停任务' : '空闲')
		if (item.requiresAdapter || item.adapterState == 'opened') add('adapter', '适配器已初始化', context.adapterOpened.value, context.adapterOpened.value ? '已初始化' : '未初始化', 'openAdapter', '初始化')
		if (item.adapterState == 'closed') add('adapterClosed', '适配器未初始化', !context.adapterOpened.value, context.adapterOpened.value ? '已初始化' : '未初始化', 'closeAdapter', '释放')
		if (item.availability != 'any') add('available', item.availability == 'available' ? '系统蓝牙可用' : '系统蓝牙不可用', context.adapterAvailable.value == (item.availability == 'available'), context.adapterAvailable.value ? '可用' : '不可用', 'queryAdapterState', '查询状态')
		if (item.discoveryState != 'any') add('discovery', item.discoveryState == 'started' ? '扫描已开始' : '扫描已停止', context.discovering.value == (item.discoveryState == 'started'), context.discovering.value ? '扫描中' : '已停止', item.discoveryState == 'started' ? 'startDiscovery' : 'stopDiscovery', item.discoveryState == 'started' ? '开始扫描' : '停止扫描')
		if (item.requiresDevice) {
			add('device', '目标设备已发现或已连接', connected || device != null, params.deviceId, 'selectDevice', '选择设备')
			if (currentBlePlatform() == 'app-ios') add('deviceFormat', '设备 ID 为合法平台 UUID', params.deviceId.length == 36 && validUUID(params.deviceId), params.deviceId)
			if (item.connectionState != 'any') add('connection', item.connectionState == 'connected' ? '目标设备已连接' : '目标设备未连接', connected == (item.connectionState == 'connected'), connected ? '已连接' : '未连接', item.connectionState == 'connected' ? 'device' : 'disconnectDevice', item.connectionState == 'connected' ? '连接状态' : '断开连接')
		}
		if (item.parameterFault == 'unknown-device') add('unknown', '目标 ID 不在设备缓存及连接列表', context.devices.value.every((entry : TestDevice) : boolean => uuidKey(entry.deviceId) != uuidKey(absentUUID)) && !connected, absentUUID)
		const service = context.services.value.find((entry : TestService) : boolean => uuidKey(entry.uuid) == uuidKey(context.selectedServiceId.value))
		if (item.requiresService) add('service', '当前设备已选择 Service', context.selectedServiceId.value.length > 0 && (item.requiresDevice ? params.deviceId == context.selectedDeviceId.value && service != null : true), context.selectedServiceId.value, 'device', '选择服务')
		if (item.requiresCharacteristic) add('characteristic', '当前 Service 已选择 Characteristic', service != null && service!.characteristics.some((entry) : boolean => uuidKey(entry.uuid) == uuidKey(context.selectedCharacteristicId.value)), context.selectedCharacteristicId.value, 'device', '选择特征')
		if (item.parameterFault == 'missing-service') add('missingPath', '不存在的 Service 已核对', context.services.value.length > 0 && context.services.value.every((entry : TestService) : boolean => uuidKey(entry.uuid) != uuidKey(absentUUID)), absentUUID)
		if (item.parameterFault == 'missing-characteristic') add('missingPath', '不存在的 Characteristic 已核对', service != null && service!.characteristics.length > 0 && service!.characteristics.every((entry) : boolean => uuidKey(entry.uuid) != uuidKey(absentUUID)), absentUUID)
		if (item.capability != 'none') {
			let supported = context.canRead.value
			if (item.capability == 'write') supported = context.canWriteWithResponse.value
			if (item.capability == 'writeNoResponse') supported = context.canWriteWithoutResponse.value
			if (item.capability == 'notification') supported = context.canNotification.value
			add('capability', '特征' + (item.capabilitySupported ? '支持 ' : '不支持 ') + item.capability, supported == item.capabilitySupported, supported ? '支持' : '不支持', 'device', '更换特征')
		}
		if (item.notifyState != 'any') add('notify', item.notifyState == 'on' ? '当前特征已开启订阅' : '当前特征未开启订阅', context.notifying.value == (item.notifyState == 'on'), context.notifying.value ? '已订阅' : '未订阅', item.notifyState == 'on' ? 'enableNotify' : 'disableNotify', item.notifyState == 'on' ? '开启订阅' : '关闭订阅')
		if (item.fixture.length > 0) add('fixture', '受控条件已确认', confirmation(item) != null, item.fixture)
		return list
	}
	function canRunCase(item : BleContractCase) : boolean { return alive && !running.value && preconditions(item).every((condition : BleContractPrecondition) : boolean => condition.met) }
	function prepare(preparation : BleContractPreparation, caseItem : BleContractCase | null = null) {
		if (!alive || running.value || context.workbenchBusy.value) return
		if (preparation == 'selectDevice') context.selectStep(0)
		else if (preparation == 'openAdapter') context.openAdapter()
		else if (preparation == 'closeAdapter') context.closeAdapter()
		else if (preparation == 'queryAdapterState') context.queryAdapterState()
		else if (preparation == 'startDiscovery') context.startDiscovery()
		else if (preparation == 'stopDiscovery') context.stopDiscovery()
		else if (preparation == 'enableNotify' && !context.notifying.value) context.toggleNotify()
		else if (preparation == 'disableNotify' && context.notifying.value) context.toggleNotify()
		else if (preparation == 'disconnectDevice' && caseItem != null) {
			const item = cases.value.find((entry : BleContractCase) : boolean => entry.caseId == caseItem!.caseId)
			if (item == null || !item!.requiresDevice || item!.connectionState != 'disconnected') return
			const deviceId = parameters(item!).deviceId
			if (context.connectedIds.value.indexOf(deviceId) >= 0) {
				// 断开后当前设备可能切换，Case 仍须测试本次准备的目标。
				if (deviceIdText.value.trim().length == 0) deviceIdText.value = deviceId
				context.disconnect(deviceId)
			}
		}
		else if (preparation == 'events') context.selectStep(3)
		else if (preparation == 'device') context.selectStep(context.connectedIds.value.indexOf(context.selectedDeviceId.value) >= 0 ? 1 : 0)
	}
	function resultStatus(item : BleContractCase) : BleContractStatus | null { const result = results.value.find((entry : BleContractResult) : boolean => entry.caseId == item.caseId); return result == null ? null : result!.status }
	function publish(result : BleContractResult, updateOnly : boolean = false) {
		if (results.value.some((entry : BleContractResult) : boolean => entry.runId == result.runId)) results.value = results.value.map((entry : BleContractResult) : BleContractResult => entry.runId == result.runId ? { ...result } : entry)
		else if (!updateOnly) results.value = [{ ...result }, ...results.value].slice(0, 100)
	}

	// 直接观察 success/fail，不依赖工作台 Gateway 的 complete Trace。
	function submit(item : BleContractCase, params : ContractParameters, success : (result : any) => void, fail : (error : any) => void) {
		const name = item.apiName
		if (name == 'openBluetoothAdapter') uni.openBluetoothAdapter({ success, fail })
		else if (name == 'closeBluetoothAdapter') uni.closeBluetoothAdapter({ success, fail })
		else if (name == 'getBluetoothAdapterState') uni.getBluetoothAdapterState({ success, fail })
		else if (name == 'startBluetoothDevicesDiscovery') uni.startBluetoothDevicesDiscovery({ interval: params.interval, success, fail })
		else if (name == 'stopBluetoothDevicesDiscovery') uni.stopBluetoothDevicesDiscovery({ success, fail })
		else if (name == 'getBluetoothDevices') uni.getBluetoothDevices({ success, fail })
		else if (name == 'getConnectedBluetoothDevices') uni.getConnectedBluetoothDevices({ services: params.services, success, fail })
		else if (name == 'createBLEConnection') uni.createBLEConnection({ deviceId: params.deviceId, timeout: params.timeout, success, fail })
		else if (name == 'closeBLEConnection') uni.closeBLEConnection({ deviceId: params.deviceId, success, fail })
		else if (name == 'getBLEDeviceRSSI') uni.getBLEDeviceRSSI({ deviceId: params.deviceId, success, fail })
		else if (name == 'getBLEMTU') uni.getBLEMTU({ deviceId: params.deviceId, writeType: params.writeType, success, fail })
		else if (name == 'setBLEMTU') uni.setBLEMTU({ deviceId: params.deviceId, mtu: params.mtu, success, fail })
		else if (name == 'getBLEDeviceServices') uni.getBLEDeviceServices({ deviceId: params.deviceId, success, fail })
		else if (name == 'getBLEDeviceCharacteristics') uni.getBLEDeviceCharacteristics({ deviceId: params.deviceId, serviceId: params.serviceId, success, fail })
		else if (name == 'readBLECharacteristicValue') uni.readBLECharacteristicValue({ deviceId: params.deviceId, serviceId: params.serviceId, characteristicId: params.characteristicId, success, fail })
		else if (name == 'writeBLECharacteristicValue') uni.writeBLECharacteristicValue({ deviceId: params.deviceId, serviceId: params.serviceId, characteristicId: params.characteristicId, value: new Uint8Array([1, 2, 3]).buffer, writeType: params.writeType, success, fail })
		else if (name == 'notifyBLECharacteristicValueChange') uni.notifyBLECharacteristicValueChange({ deviceId: params.deviceId, serviceId: params.serviceId, characteristicId: params.characteristicId, state: params.state, type: 'notification', success, fail })
		else throw new Error('未登记的异步 API: ' + name)
	}
	function runCase(caseItem : BleContractCase) {
		if (!alive || running.value) return
		const registered = cases.value.find((entry : BleContractCase) : boolean => entry.caseId == caseItem.caseId)
		if (registered == null) return
		const item : BleContractCase = { ...registered! }
		const params = parameters(item)
		const conditions = preconditions(item)
		const missing = conditions.filter((condition : BleContractPrecondition) : boolean => !condition.met)
		const runId = 'contract-' + (++sequence).toString()
		const result : BleContractResult = { runId, caseId: item.caseId, apiName: item.apiName, platform: currentBlePlatform(), status: 'BLOCKED', expectedErrCode: item.expectedErrCode, actualErrCode: null, expectedMessage: item.expectedMessage, actualMessage: '', detail: '', trace: null, parameters: recordText(submittedParameters(item, params)), setup: conditionsText(conditions), actualOutcome: 'notSubmitted', rawResult: '', assertions: [] as string[] }
		if (missing.length > 0) { result.detail = missing.map((condition : BleContractPrecondition) : string => condition.title).join('；'); publish(result); return }
		const started = Date.now()
		const trace : BleApiTrace = { runId, caseId: item.caseId, apiName: item.apiName, platform: currentBlePlatform(), deviceId: params.deviceId, serviceId: params.serviceId, characteristicId: params.characteristicId, requestStartedAt: started, requestFinishedAt: 0, durationMs: 0, successCount: 0, failCount: 0, completeCount: 0, eventCount: 0, expectedErrCode: item.expectedErrCode, actualErrCode: null, actualErrMsg: '', data: null, cause: '', nativeTrace: null, submitted: true, outcome: 'submitted', cleanupStatus: 'notRequired' }
		result.trace = trace
		const apiContext : BleApiContext = { caseId: item.caseId, deviceId: params.deviceId, serviceId: params.serviceId, characteristicId: params.characteristicId, expectedErrCode: item.expectedErrCode, notifyState: params.state }
		const applySuccess = context.makeSuccessHandler(item.apiName, apiContext)
		const expectedAvailable = context.adapterAvailable.value
		const expectedDiscovering = context.discovering.value
		const disconnectEpoch = context.getDisconnectEpoch(params.deviceId)
		let stopEventWatch : (() => void) | null = null
		let settled = false
		let expired = false
		running.value = true
		result.status = 'RUNNING'; result.actualOutcome = 'submitted'; result.detail = '等待 success/fail'; publish(result)
		pendingConnectionDevice = item.apiName == 'createBLEConnection' ? params.deviceId : ''
		let deadline = 0
		const settle = () => {
			const updateOnly = settled
			if (!settled) {
				settled = true; running.value = false; pendingConnectionDevice = ''; clearTimeout(deadline); timerIds = timerIds.filter((id : number) : boolean => id != deadline)
				if (stopEventWatch != null) stopEventWatch!()
				activeEventWatch = null
			}
			trace.requestFinishedAt = Date.now(); trace.durationMs = trace.requestFinishedAt - started
			result.status = result.assertions.length == 0 ? 'PASS' : 'FAIL'; result.detail = result.status == 'PASS' ? '通过：success/fail 回调时序与 errCode、errMsg、errSubject、data.reason 均符合预期契约' : result.assertions.join('；')
			publish(result, updateOnly)
		}
		deadline = setTimeout(() => {
			if (!alive || settled) return
			expired = true; trace.outcome = 'timeout'
			if (trace.successCount + trace.failCount == 0) { result.actualOutcome = 'missingCallback'; result.assertions.push('截止时间内未收到 success/fail（测试执行超时，不是 API fail）') }
			else result.assertions.push('本次请求期间未观察到目标设备的断连事件')
			settle()
		}, item.deadlineMs)
		timerIds.push(deadline)
		if (item.scenario == 'disconnect-during-request') {
			stopEventWatch = watch(() : number => context.getDisconnectEpoch(params.deviceId), (epoch : number) => {
				if (alive && !settled && epoch > disconnectEpoch && trace.failCount == 1 && trace.successCount == 0) {
					result.setup += '\n本次请求收到目标设备 connected=false 事件'
					settle()
				}
			}, { flush: 'sync' })
			activeEventWatch = stopEventWatch
		}
		const observe = (outcome : string, value : any) => {
			if (!alive) return
			const first = !settled
			if (outcome == 'success') trace.successCount++; else trace.failCount++
			if (trace.successCount + trace.failCount > 1) result.assertions.push('success/fail 必须互斥且总计恰好一次')
			if (expired) result.assertions.push('回调晚于测试截止时间')
			result.actualOutcome = trace.successCount > 0 && trace.failCount > 0 ? 'success+fail' : outcome
			result.rawResult += (result.rawResult.length == 0 ? '' : '\n') + outcome + ': ' + prettyText(value)
			result.actualMessage = value != null && typeof value.errMsg == 'string' ? value.errMsg : ''; trace.actualErrMsg = result.actualMessage; trace.outcome = 'callback'
			if (outcome == 'success') {
				if (item.expectedErrCode != null) result.assertions.push('预期 fail，实际 success')
				result.assertions.push(...successAssertions(item, value, expectedAvailable, expectedDiscovering))
			} else {
				result.actualErrCode = value != null && typeof value.errCode == 'number' ? value.errCode : null; trace.actualErrCode = result.actualErrCode
				if (item.expectedErrCode == null) result.assertions.push('预期 success，实际 fail')
				else if (result.actualErrCode != item.expectedErrCode) result.assertions.push('errCode 预期 ' + item.expectedErrCode!.toString() + '，实际 ' + (result.actualErrCode == null ? '缺失' : result.actualErrCode!.toString()))
				if (currentBlePlatform() == 'app-ios') {
					if (result.actualMessage != item.expectedMessage) result.assertions.push('fail.errMsg 与预估行为不一致')
					if (value == null || value.errSubject != 'uni-bluetooth-' + item.apiName) result.assertions.push('fail.errSubject 与 API 不一致')
				} else if (!result.actualMessage.startsWith(item.apiName + ':fail') || result.actualMessage.length <= (item.apiName + ':fail').length) result.assertions.push('fail.errMsg 缺少 API 前缀或错误说明')
				if (item.expectedReason.length > 0 && (value == null || value.data == null || value.data.reason != item.expectedReason)) result.assertions.push('data.reason 预期 ' + item.expectedReason)
			}
			if (item.scenario == 'disconnect-during-request' && result.assertions.length == 0 && context.getDisconnectEpoch(params.deviceId) <= disconnectEpoch) {
				result.detail = '已收到 fail，等待目标设备断连事件'; publish(result, true); return
			}
			if (item.scenario == 'disconnect-during-request' && context.getDisconnectEpoch(params.deviceId) > disconnectEpoch && first) result.setup += '\n本次请求收到目标设备 connected=false 事件'
			settle()
			// 迟到、重复、负向意外成功不能投影工作台状态。
			if (first && outcome == 'success' && result.status == 'PASS') applySuccess(value)
		}
		try { submit(item, params, (value : any) => observe('success', value), (value : any) => observe('fail', value)) }
		catch (error) { result.actualOutcome = 'exception'; result.assertions.push('调用抛出异常：' + recordText(error)); settle() }
	}
	function runSelectedApi() { if (cases.value.length > 0) runCase(cases.value[0]); else prepare('events') }
	function clearResults() { if (!running.value) results.value = [] as BleContractResult[] }
	function copyText(text : string) {
		if (!alive || text.length == 0) return
		uni.setClipboardData({ data: text })
	}
	function dispose() {
		if (!alive) return
		alive = false; stopSetupWatch(); timerIds.forEach((id : number) => clearTimeout(id)); timerIds = [] as number[]; running.value = false
		results.value = results.value.map((entry : BleContractResult) : BleContractResult => entry.status == 'RUNNING' ? { ...entry, status: 'INCONCLUSIVE', actualOutcome: 'cancelled', detail: '页面卸载，中止测试' } : entry)
		if (activeEventWatch != null) { activeEventWatch!(); activeEventWatch = null }
		if (pendingConnectionDevice.length > 0) { uni.closeBLEConnection({ deviceId: pendingConnectionDevice }); pendingConnectionDevice = '' }
	}
	return { apis, categories, selectedCategory, visibleApis, selectedApiName, selectedApi, cases, results, running, deviceIdText, targetDeviceId, selectCategory, selectApi, pasteDeviceId, resultStatus, preconditions, canRunCase, prepare, runCase, runSelectedApi, clearResults, parameterText, confirmFixture, copyText, dispose }
}
