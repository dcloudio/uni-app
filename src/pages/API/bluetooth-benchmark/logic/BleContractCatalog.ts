import { BleContractApi, BleContractCase, BleContractCategory, BlePlatform } from './BleWorkspaceTypes.ts'

// 预期取自平台契约，不能用实际回调反推预期。
function errorMessage(code : number) : string {
	if (code == 1500101) return 'bluetooth adapter is not initialized'
	if (code == 1500102) return 'bluetooth adapter is unavailable'
	if (code == 1500103) return 'service not found'
	if (code == 1500104) return 'call system bluetooth capability failed, see cause'
	if (code == 1500105) return 'the platform or system does not support this BLE capability or operation'
	if (code == 1509000) return 'unknown BLE error'
	if (code == 1509001) return 'connection failed'
	if (code == 1509002) return 'characteristic not found'
	if (code == 1509003) return 'no connection'
	if (code == 1509004) return 'property not supported'
	if (code == 1509005) return 'operation timed out'
	if (code == 1509006) return 'device not found'
	if (code == 1509007) return 'already connected'
	if (code == 1509008) return 'location permission is denied (Android BLE scan)'
	if (code == 1509010) return 'wait for bluetooth state change timeout (iOS)'
	if (code == 1509601) return 'invalid parameter'
	if (code == 1509602) return 'bluetooth permission is denied'
	if (code == 1509603) return 'bluetooth is powered off'
	if (code == 1509604) return 'BLE device is not connectable'
	if (code == 1510102) return 'reach max bluetooth background count'
	return ''
}

function androidRequiresBluetoothPermission() : boolean {
	return androidMajorVersion() >= 12
}

function androidMajorVersion() : number {
	const version = uni.getSystemInfoSync().osVersion
	const majorVersion = parseInt(version.split('.')[0])
	return Number.isNaN(majorVersion) ? 0 : majorVersion
}

export function contractApis(platform : BlePlatform) : BleContractApi[] {
	const apis : BleContractApi[] = []
	const add = (name : string, category : BleContractCategory, device : boolean = false, service : boolean = false, characteristic : boolean = false) => {
		apis.push({ name, category, platform, mode: 'callback', requiresAdapter: name != 'openBluetoothAdapter', requiresDevice: device, requiresService: service, requiresCharacteristic: characteristic })
	}
	add('openBluetoothAdapter', '适配器')
	add('closeBluetoothAdapter', '适配器')
	add('getBluetoothAdapterState', '适配器')
	add('startBluetoothDevicesDiscovery', '发现')
	add('stopBluetoothDevicesDiscovery', '发现')
	add('getBluetoothDevices', '发现')
	add('getConnectedBluetoothDevices', '连接与链路', false, true)
	add('createBLEConnection', '连接与链路', true)
	add('closeBLEConnection', '连接与链路', true)
	add('getBLEDeviceRSSI', '连接与链路', true)
	add('getBLEMTU', '连接与链路', true)
	add('setBLEMTU', '连接与链路', true)
	add('getBLEDeviceServices', 'GATT', true)
	add('getBLEDeviceCharacteristics', 'GATT', true, true)
	add('readBLECharacteristicValue', 'GATT', true, true, true)
	add('writeBLECharacteristicValue', 'GATT', true, true, true)
	add('notifyBLECharacteristicValueChange', 'GATT', true, true, true)
	// 监听 on/off 入口保留在目录里（是插件对外 API，供后续自动化遍历），
	// 但它们没有 errCode/errMsg 契约，用例在事件测试页验证；UI 侧过滤掉 '监听' 分类。
	const events = ['BluetoothAdapterStateChange', 'BluetoothDeviceFound', 'BLEConnectionStateChange', 'BLECharacteristicValueChange', 'BLEMTUChange']
	events.forEach((name : string) => {
		['on', 'off'].forEach((prefix : string) => {
			apis.push({ name: prefix + name, category: '监听', platform, mode: 'event', requiresAdapter: false, requiresDevice: false, requiresService: false, requiresCharacteristic: false })
		})
	})
	return apis
}

// 需要人工验证（受控夹具）的用例统一排到最后，先跑可自动校验的用例。
function orderCases(cases : BleContractCase[]) : BleContractCase[] {
	const ordered : BleContractCase[] = []
	cases.forEach((item : BleContractCase) => { if (item.fixture.length == 0) ordered.push(item) })
	cases.forEach((item : BleContractCase) => { if (item.fixture.length > 0) ordered.push(item) })
	return ordered
}

export function contractCases(api : BleContractApi) : BleContractCase[] {
	if (api.mode == 'event') return []
	const name = api.name
	const ios = api.platform == 'app-ios'
	// App（iOS/Android/Harmony）统一错误码；小程序参考平台自身的错误码约定。
	const app = api.platform == 'app-ios' || api.platform == 'app-android' || api.platform == 'app-harmony'
	// setBLEMTU 仅 Android 支持，其余平台（含微信小程序）返回平台不支持。
	const android = api.platform == 'app-android'
	const cases : BleContractCase[] = []
	const make = (scenario : string, title : string, code : number | null = null) : BleContractCase => {
		const item : BleContractCase = {
			caseId: name + '.' + scenario, apiName: name, scenario, title, detail: code == null ? '预期 success' : '预期 fail',
			expectedErrCode: code, expectedMessage: code == null ? name + ':ok' : (app ? name + ':fail ' + errorMessage(code!) : name + ':fail'), expectedReason: '',
			parameterFault: '', fixture: '', deadlineMs: 20000,
			requiresAdapter: api.requiresAdapter, requiresDevice: api.requiresDevice, requiresService: api.requiresService, requiresCharacteristic: api.requiresCharacteristic,
			adapterState: 'any', discoveryState: 'any', connectionState: api.requiresDevice ? 'connected' : 'any', availability: api.requiresDevice || name == 'startBluetoothDevicesDiscovery' ? 'available' : 'any',
			capability: 'none', capabilitySupported: true, notifyState: 'any', writeType: name == 'getBLEMTU' ? 'write' : 'writeNoResponse', notifyEnabled: true
		}
		if (name == 'readBLECharacteristicValue') { item.capability = 'read'; item.notifyState = ios ? 'off' : 'any' }
		if (name == 'writeBLECharacteristicValue') item.capability = 'writeNoResponse'
		if (name == 'notifyBLECharacteristicValueChange') { item.capability = 'notification'; item.notifyState = 'off' }
		if (name == 'createBLEConnection') item.connectionState = 'disconnected'
		cases.push(item)
		return item
	}
	// setBLEMTU 仅 Android 支持；其余平台（iOS/Harmony/微信）契约统一为平台不支持。
	if (name == 'setBLEMTU' && !android) {
		const unsupported = make('unsupported', '平台不支持设置 MTU', 1500105)
		unsupported.requiresAdapter = false; unsupported.requiresDevice = false; unsupported.connectionState = 'any'; unsupported.availability = 'any'
		return orderCases(cases)
	}
	const normal = make('normal', '正常调用')
	if (name == 'openBluetoothAdapter') { normal.adapterState = 'closed'; normal.availability = 'any' }
	if (name == 'startBluetoothDevicesDiscovery') normal.discoveryState = 'stopped'
	if (name == 'stopBluetoothDevicesDiscovery') normal.discoveryState = 'started'
	if (name == 'setBLEMTU') normal.fixture = '宿主系统支持 MTU 设置，且外设已连接'
	if (name != 'openBluetoothAdapter') {
		// 停止扫描在 iOS 上无前置校验、总是成功；其余接口未初始化返回 not init（公开契约）。
		const stopBeforeInit = name == 'stopBluetoothDevicesDiscovery' && ios
		const uninitialized = make('uninitialized', stopBeforeInit ? '未初始化时停止仍成功' : '未初始化', stopBeforeInit ? null : 1500101)
		uninitialized.requiresAdapter = false; uninitialized.adapterState = 'closed'; uninitialized.requiresDevice = false; uninitialized.requiresService = false; uninitialized.requiresCharacteristic = false
		uninitialized.connectionState = 'any'; uninitialized.availability = 'any'; uninitialized.capability = 'none'; uninitialized.notifyState = 'any'
		if (name == 'setBLEMTU') uninitialized.fixture = '宿主系统支持 MTU 设置，且适配器未初始化'
	}
	if (name == 'openBluetoothAdapter') {
		make('repeat', '已初始化再次打开').adapterState = 'opened'
		const unavailable = make('powered-off', '系统蓝牙关闭', app ? 1509603 : 1500102)
		unavailable.adapterState = 'closed'; unavailable.availability = 'unavailable'; unavailable.fixture = '在系统设置中关闭系统蓝牙后再执行'
		if (ios) unavailable.expectedReason = 'poweredOff'
		if (ios || (android && androidRequiresBluetoothPermission())) {
			const denied = make('permission-denied', '蓝牙权限被拒绝', app ? 1509602 : 1500102)
			denied.fixture = '在系统设置中关闭本 App 的蓝牙权限后再执行'
			if (ios) denied.expectedReason = 'unauthorized'
		}
	}
	if (name == 'startBluetoothDevicesDiscovery') {
		make('repeat', '扫描中再次启动').discoveryState = 'started'
		const unavailable = make('powered-off', '初始化后系统蓝牙关闭', app ? 1509603 : 1500102)
		unavailable.availability = 'unavailable'; unavailable.fixture = '先初始化适配器，再在系统设置中关闭系统蓝牙'
		if (android) {
			if (androidRequiresBluetoothPermission()) {
				const bluetoothDenied = make('bluetooth-permission-denied', '附近设备权限被拒绝', 1509602)
				bluetoothDenied.requiresAdapter = false; bluetoothDenied.fixture = '在系统设置中关闭本 App 的附近设备权限，先尝试初始化后再执行'
			}
			if (androidMajorVersion() >= 6) {
				const locationDenied = make('location-permission-denied', '定位权限被拒绝', 1509008)
				locationDenied.requiresAdapter = false; locationDenied.fixture = '在系统设置中关闭本 App 的定位权限，先尝试初始化后再执行'
			}
		} else {
			const denied = make('permission-denied', '蓝牙权限被拒绝', app ? 1509602 : 1500102)
			denied.requiresAdapter = false; denied.fixture = '在系统设置中关闭本 App 的蓝牙权限，先尝试初始化后再执行'
			if (ios) denied.expectedReason = 'unauthorized'
		}
	}
	if (name == 'stopBluetoothDevicesDiscovery') make('repeat', '扫描已停止再次停止').discoveryState = 'stopped'
	if (name == 'getBluetoothAdapterState' || name == 'getBluetoothDevices') {
		const unavailable = make('unavailable-query', '不可用时查询状态或缓存')
		unavailable.availability = 'unavailable'; unavailable.fixture = '适配器已初始化，且在系统设置中关闭系统蓝牙'
	}
	if (name == 'notifyBLECharacteristicValueChange') {
		make('repeat', '订阅已开启再次开启').notifyState = 'on'
		const disable = make('disable', '关闭已开启订阅'); disable.notifyState = 'on'; disable.notifyEnabled = false
	}
	if (name == 'writeBLECharacteristicValue') {
		const response = make('with-response', 'Write With Response'); response.capability = 'write'; response.writeType = 'write'
	}
	if (api.requiresDevice && name != 'createBLEConnection' && name != 'setBLEMTU') {
		const disconnected = make('disconnected', '已发现设备但未连接', 1509003)
		disconnected.connectionState = 'disconnected'; disconnected.requiresService = false; disconnected.requiresCharacteristic = false; disconnected.capability = 'none'; disconnected.notifyState = 'any'
	}
	if (name == 'getBLEDeviceServices' || name == 'getBLEDeviceCharacteristics' || name == 'readBLECharacteristicValue' || name == 'writeBLECharacteristicValue' || name == 'notifyBLECharacteristicValueChange') {
		// 蓝牙关闭后对已选路径操作。
		const unavailable = make('powered-off', '已初始化后系统蓝牙关闭', app ? 1509603 : 1500102)
		unavailable.availability = 'unavailable'; unavailable.connectionState = 'any'; unavailable.requiresService = false; unavailable.requiresCharacteristic = false; unavailable.capability = 'none'; unavailable.notifyState = 'any'
		unavailable.fixture = '先初始化并选好服务/特征路径，再在系统设置中关闭系统蓝牙'
		if (ios) unavailable.expectedReason = 'poweredOff'
	}
	if (name == 'createBLEConnection') {
		const notConnectable = make('not-connectable', '设备仅可扫描、不可连接', app ? 1509604 : 1509001)
		notConnectable.connectionState = 'disconnected'; if (ios) notConnectable.expectedReason = 'notConnectable'
		const poweredOff = make('powered-off', '已初始化后系统蓝牙关闭', app ? 1509603 : 1500102)
		poweredOff.availability = 'unavailable'; poweredOff.connectionState = 'disconnected'; poweredOff.fixture = '先初始化并发现目标设备，再在系统设置中关闭系统蓝牙'
		if (ios) poweredOff.expectedReason = 'poweredOff'
		// 连接接口自带 timeout 参数：1ms 远小于真实连接耗时，必然超时；App -> 1509005、微信实测 -> 1509001，无需人工夹具。
		const timeout = make('timeout', '连接超时', app ? 1509005 : 1509001)
		timeout.parameterFault = 'short-connect-timeout'; timeout.connectionState = 'disconnected'
		if (ios) timeout.expectedReason = 'timeout'
	}
	// 通用场景：按各平台公开错误码约定断言，即使当前 Native 映射不同也应报告 FAIL。
	if (name == 'createBLEConnection') {
		make('repeat', '已连接再次连接').connectionState = 'connected'
		const unknown = make('device-missing', '有效 ID 但设备未发现', 1509006)
		unknown.parameterFault = 'unknown-device'; unknown.requiresDevice = false; unknown.connectionState = 'any'
		const invalidTimeout = make('invalid-timeout', '连接 timeout 参数无效', app ? 1509601 : 1509001)
		invalidTimeout.parameterFault = 'invalid-timeout'
	}
	if (api.requiresDevice || name == 'startBluetoothDevicesDiscovery' || name == 'getConnectedBluetoothDevices') {
		const invalid = make('invalid-parameter', '参数错误', app ? 1509601 : 1509006)
		invalid.parameterFault = api.requiresDevice ? 'invalid-device' : (name == 'startBluetoothDevicesDiscovery' ? 'invalid-interval' : 'empty-services')
		invalid.requiresDevice = false; invalid.requiresService = false; invalid.requiresCharacteristic = false; invalid.connectionState = 'any'; invalid.capability = 'none'; invalid.notifyState = 'any'
	}
	// 通用场景：按各平台公开错误码约定断言，即使当前 Native 映射不同也应报告 FAIL。
	if (api.requiresService && api.requiresDevice) {
		const missing = make('service-missing', 'Service 路径不存在', 1500103)
		missing.parameterFault = 'missing-service'; missing.requiresCharacteristic = false; missing.capability = 'none'; missing.notifyState = 'any'
		const invalidService = make('invalid-service', 'Service UUID 格式错误', app ? 1509601 : 1509013)
		invalidService.parameterFault = 'invalid-service'; invalidService.requiresService = false; invalidService.requiresCharacteristic = false; invalidService.capability = 'none'; invalidService.notifyState = 'any'
	}
	if (api.requiresCharacteristic) {
		const missing = make('characteristic-missing', 'Characteristic 路径不存在', 1509002)
		missing.parameterFault = 'missing-characteristic'; missing.capability = 'none'; missing.notifyState = 'any'
		const property = make('property-unsupported', '特征属性不支持', 1509004)
		property.capabilitySupported = false
		const invalidCharacteristic = make('invalid-characteristic', 'Characteristic UUID 格式错误', app ? 1509601 : 1509013)
		invalidCharacteristic.parameterFault = 'invalid-characteristic'; invalidCharacteristic.requiresCharacteristic = false; invalidCharacteristic.capability = 'none'; invalidCharacteristic.notifyState = 'any'
	}
	if (name == 'readBLECharacteristicValue') {
		const disconnected = make('disconnect-during-request', 'Read 已提交后外设断连', app ? 1509000 : 1509003)
		if (ios) disconnected.expectedReason = 'outcomeUnknown'
		disconnected.fixture = '受控外设：ATT Read 提交后立即断连'
	}
	return orderCases(cases)
}
