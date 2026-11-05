//
// 平台策略：当前套件只覆盖 Android App 真机；Harmony、Web、iOS、微信小程序待对应平台实现后单独接入。
//
// 前置：在下方配置 DEVICE_IDS；env.js + jest.config.js 配好 App 基座。
// Android 蓝牙系统权限在根套件 beforeAll 中、页面启动前静默预授权。
//

jest.setTimeout(120000)

const testEnv = require('../../../env.js')
const platformInfo = String(process.env.uniTestPlatformInfo || '').toLowerCase()
const isAndroid = platformInfo.includes('android')
const skipPlatform = !isAndroid

async function grantAndroidPermissions() {
	const appConfig = testEnv && testEnv['app-plus'] && testEnv['app-plus']['uni-app-x']
	const config = appConfig && appConfig.android ? appConfig.android : {}
	const packageName = config.package || ''
	if (packageName.length === 0) {
		throw new Error('env.js 未配置 app-plus.uni-app-x.android.package')
	}
	const androidVersion = Number(platformInfo.split(/\s+/).pop())
	const permissions = androidVersion >= 12 ? [
		'android.permission.BLUETOOTH_SCAN',
		'android.permission.BLUETOOTH_CONNECT',
		'android.permission.ACCESS_FINE_LOCATION'
	] : [
		'android.permission.ACCESS_FINE_LOCATION'
	]
	for (const permission of permissions) {
		try {
			await program.adbCommand(`pm grant --user 0 ${packageName} ${permission}`)
		} catch (error) {
			throw new Error(`Android 权限预授权失败 (${permission}): ${String(error)}`)
		}
	}
}

// 配置一个或多个真实 BLE 外设 deviceId；多设备并发用例至少需要两个。
const DEVICE_IDS = [
	// 'AA:BB:CC:DD:EE:FF'
]

const PLACEHOLDER_DEVICE_ID = '00000000-0000-0000-0000-000000000000'
const PLACEHOLDER_SERVICE_ID = '180F'
const PLACEHOLDER_CHARACTERISTIC_ID = '2A19'

// 构造的“非法 / 不存在”输入，用于验证参数错误、无效设备等错误码
const INVALID_ID = 'not-a-valid-id' // 格式非法
const ABSENT_SERVICE_ID = '00001899-0000-1000-8000-00805F9B34FB' // 格式合法但设备上没有
const ABSENT_CHARACTERISTIC_ID = '00002A99-0000-1000-8000-00805F9B34FB'

// 各 API 未初始化场景的期望：1500101 / 'success'（无前置校验或初始化本身）/ 'platform'（能力差异）
const UNINITIALIZED_EXPECTATION = {
	openBluetoothAdapter: 'success',
	closeBluetoothAdapter: 1500101,
	getBluetoothAdapterState: 1500101,
	startBluetoothDevicesDiscovery: 1500101,
	stopBluetoothDevicesDiscovery: 1500101,
	getBluetoothDevices: 1500101,
	getConnectedBluetoothDevices: 1500101,
	createBLEConnection: 1500101,
	closeBLEConnection: 1500101,
	getBLEDeviceRSSI: 1500101,
	getBLEMTU: 1500101,
	setBLEMTU: 'platform',
	getBLEDeviceServices: 1500101,
	getBLEDeviceCharacteristics: 1500101,
	readBLECharacteristicValue: 1500101,
	writeBLECharacteristicValue: 1500101,
	notifyBLECharacteristicValueChange: 1500101
}

const ASYNC_APIS = Object.keys(UNINITIALIZED_EXPECTATION)
const itWithDevice = DEVICE_IDS.length > 0 ? it : it.skip
const itWithMultipleDevices = DEVICE_IDS.length >= 2 ? it : it.skip

// 正常调用（打开适配器后）返回 success 的 API。
const NORMAL_SUCCESS_APIS = [
	'getBluetoothAdapterState', 'startBluetoothDevicesDiscovery',
	'getBluetoothDevices', 'stopBluetoothDevicesDiscovery'
]

let page = null

function sampleOptions(name) {
	if (name === 'startBluetoothDevicesDiscovery') return {
		allowDuplicatesKey: false,
		interval: 0
	}
	if (name === 'getConnectedBluetoothDevices') return {
		services: []
	}
	if (name === 'createBLEConnection') return {
		deviceId: PLACEHOLDER_DEVICE_ID
	}
	if (name === 'closeBLEConnection' || name === 'getBLEDeviceRSSI' || name === 'getBLEDeviceServices') return {
		deviceId: PLACEHOLDER_DEVICE_ID
	}
	if (name === 'getBLEMTU') return {
		deviceId: PLACEHOLDER_DEVICE_ID,
		writeType: 'write'
	}
	if (name === 'setBLEMTU') return {
		deviceId: PLACEHOLDER_DEVICE_ID,
		mtu: 100
	}
	if (name === 'getBLEDeviceCharacteristics') return {
		deviceId: PLACEHOLDER_DEVICE_ID,
		serviceId: PLACEHOLDER_SERVICE_ID
	}
	if (name === 'readBLECharacteristicValue') return {
		deviceId: PLACEHOLDER_DEVICE_ID,
		serviceId: PLACEHOLDER_SERVICE_ID,
		characteristicId: PLACEHOLDER_CHARACTERISTIC_ID
	}
	if (name === 'writeBLECharacteristicValue') return {
		deviceId: PLACEHOLDER_DEVICE_ID,
		serviceId: PLACEHOLDER_SERVICE_ID,
		characteristicId: PLACEHOLDER_CHARACTERISTIC_ID,
		value: new ArrayBuffer(1)
	}
	if (name === 'notifyBLECharacteristicValueChange') return {
		deviceId: PLACEHOLDER_DEVICE_ID,
		serviceId: PLACEHOLDER_SERVICE_ID,
		characteristicId: PLACEHOLDER_CHARACTERISTIC_ID,
		state: true,
		type: 'notification'
	}
	return {}
}

function errCodeOf(error) {
	if (error == null) return undefined
	if (typeof error === 'number') return error
	if (typeof error === 'object') {
		if (typeof error.errCode === 'number') return error.errCode
		if (error.data != null && typeof error.data.errCode === 'number') return error.data.errCode
	}
	return undefined
}

function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

function serializeOptions(options) {
	if (options == null) return {}
	const result = { ...options }
	if (options.value instanceof ArrayBuffer) {
		result.__bytes = Array.from(new Uint8Array(options.value))
		delete result.value
	}
	return result
}

async function callUni(name, options) {
	if (page == null) {
		return {
			ok: false,
			errMsg: '测试页面未就绪'
		}
	}
	try {
		const started = await page.callMethod('startBleApiForTest', {
			api: name,
			options: serializeOptions(options)
		})
		if (started == null || started.syncError != null) {
			return {
				ok: false,
				errMsg: started == null ? '测试桥接未返回 token' : String(started.syncError)
			}
		}
		const token = started.token
		if (typeof token !== 'string' || token.length === 0) {
			return {
				ok: false,
				errMsg: '测试桥接 token 无效'
			}
		}
		const deadline = Date.now() + 30000
		while (Date.now() < deadline) {
			const result = await page.callMethod('readBleApiResult', { token })
			if (result == null) {
				return {
					ok: false,
					errMsg: '测试桥接结果丢失'
				}
			}
			if (result.syncError != null) {
				return {
					ok: false,
					errMsg: String(result.syncError)
				}
			}
			if (result.pending === true) {
				await wait(50)
				continue
			}
			return {
				ok: result.ok === true,
				res: result.data,
				errCode: typeof result.errCode === 'number' ? result.errCode : undefined,
				errMsg: result.errMsg == null ? '' : String(result.errMsg),
				error: result
			}
		}
		return {
			ok: false,
			errMsg: `${name} 测试桥接等待超时`
		}
	} catch (error) {
		return {
			ok: false,
			error,
			errCode: errCodeOf(error),
			errMsg: error == null ? '' : String(error)
		}
	}
}

async function resetAdapter() {
	if (page == null) return
	await callUni('closeBluetoothAdapter')
}

async function expectSuccess(name, options) {
	const r = await callUni(name, options)
	if (r.ok !== true) {
		throw new Error(`${name} 预期成功，但返回: ${r.errMsg || JSON.stringify(r.error || r)}`)
	}
	return r
}

async function expectFail(name, options, code) {
	const r = await callUni(name, options)
	expect(r.ok).toBe(false)
	expect(r.errCode).toBe(code)
	return r
}

describe('uni-bluetooth 真机接口自动化（未初始化/正常/连接/负向/并发/无效参数）', () => {
	// 当前套件只覆盖 Android App 真机；其他平台使用独立用例。
	if (skipPlatform) {
		it.skip(`当前平台不支持 Android BLE 真机用例: ${platformInfo || 'unknown'}`, () => {})
		return
	}

	beforeAll(async () => {
		await grantAndroidPermissions()
	page = await program.reLaunch('/pages/API/bluetooth-benchmark/bluetooth-benchmark')
		await page.waitFor(3000)
	})

	// -------------------------------------------------------------------
	// 场景一：未初始化（每个 API 一条用例）
	// -------------------------------------------------------------------
	describe('适配器未初始化', () => {
		beforeEach(async () => {
			await resetAdapter()
		})

		for (const name of ASYNC_APIS) {
			const expected = UNINITIALIZED_EXPECTATION[name]
			if (expected === 'success') {
				it(`${name} · 未初始化 → success`, async () => {
					await expectSuccess(name, sampleOptions(name))
				})
			} else if (expected === 'platform') {
				it(`${name} · 未初始化 → Android 1500101`, async () => {
					await expectFail(name, sampleOptions(name), 1500101)
				})
			} else {
				it(`${name} · 未初始化 → ${expected}`, async () => {
					await expectFail(name, sampleOptions(name), expected)
				})
			}
		}
	})

	// -------------------------------------------------------------------
	// 场景二：适配器 / 发现 / 查询 正常调用（每个 API 一条用例）
	// -------------------------------------------------------------------
	describe('适配器已初始化：正常调用', () => {
		beforeAll(async () => {
			await expectSuccess('openBluetoothAdapter')
		})
		afterAll(async () => {
			await resetAdapter()
		})

		it('openBluetoothAdapter · 重复打开（repeat）→ success', async () => {
			await expectSuccess('openBluetoothAdapter')
		})
		for (const name of NORMAL_SUCCESS_APIS) {
			it(`${name} · 正常调用 → success`, async () => {
				await expectSuccess(name, sampleOptions(name))
			})
		}
	})

	// -------------------------------------------------------------------
	// 场景三：连接链路（DEVICE_IDS；每个 API 一条用例，共用一条连接）
	// -------------------------------------------------------------------
	describe('连接链路（DEVICE_IDS）', () => {
		let deviceId = ''
		let serviceId = ''
		const charIds = {
			read: '',
			write: '',
			notify: '',
			notifyType: 'notification'
		}

		beforeAll(async () => {
			if (DEVICE_IDS.length === 0) return
			await expectSuccess('openBluetoothAdapter')
			deviceId = DEVICE_IDS[0]
			const conn = await callUni('createBLEConnection', {
				deviceId
			})
			if (conn.ok !== true) throw new Error(`连接测试设备失败: ${JSON.stringify(conn.error || conn)}`)
			const services = await callUni('getBLEDeviceServices', {
				deviceId
			})
			if (services.ok !== true) throw new Error(`查询测试设备服务失败: ${JSON.stringify(services.error || services)}`)
			const serviceList = services.res && Array.isArray(services.res.services) ? services.res.services : []
			const primary = serviceList.find(s => s.isPrimary) || serviceList[0]
			if (primary == null) throw new Error('测试设备未提供 GATT 服务')
			serviceId = primary.uuid
			const chars = await callUni('getBLEDeviceCharacteristics', {
				deviceId,
				serviceId
			})
			if (chars.ok !== true) throw new Error(`查询测试设备特征失败: ${JSON.stringify(chars.error || chars)}`)
			const list = chars.res && Array.isArray(chars.res.characteristics) ? chars.res.characteristics : []
			if (list.length === 0) throw new Error('测试设备未提供 GATT 特征')
			for (const c of list) {
				const p = c.properties || {}
				if (p.read) charIds.read = charIds.read || c.uuid
				if (p.write || p.writeNoResponse) charIds.write = charIds.write || c.uuid
				if (p.notify && charIds.notify.length === 0) {
					charIds.notify = c.uuid
					charIds.notifyType = 'notification'
				} else if (p.indicate && charIds.notify.length === 0) {
					charIds.notify = c.uuid
					charIds.notifyType = 'indication'
				}
			}
		})

		afterAll(async () => {
			if (deviceId.length > 0) await callUni('closeBLEConnection', {
				deviceId
			})
			await resetAdapter()
		})

		itWithDevice('createBLEConnection · 已连接再次连接（repeat）→ success', async () => {
			await expectSuccess('createBLEConnection', {
				deviceId
			})
		})
		itWithDevice('getBLEDeviceServices · 已连接 → success', async () => {
			await expectSuccess('getBLEDeviceServices', {
				deviceId
			})
		})
		itWithDevice('getBLEDeviceCharacteristics · 已连接 → success', async () => {
			expect(serviceId.length).toBeGreaterThan(0)
			await expectSuccess('getBLEDeviceCharacteristics', {
				deviceId,
				serviceId
			})
		})
		itWithDevice('getBLEDeviceRSSI · 已连接 → success', async () => {
			await expectSuccess('getBLEDeviceRSSI', {
				deviceId
			})
		})
		itWithDevice('getBLEMTU · 已连接 → success', async () => {
			await expectSuccess('getBLEMTU', {
				deviceId,
				writeType: 'write'
			})
		})
		itWithDevice('readBLECharacteristicValue · 可读特征 → success', async () => {
			expect(charIds.read.length).toBeGreaterThan(0)
			await expectSuccess('readBLECharacteristicValue', {
				deviceId,
				serviceId,
				characteristicId: charIds.read
			})
		})
		itWithDevice('writeBLECharacteristicValue · 可写特征 → success', async () => {
			expect(charIds.write.length).toBeGreaterThan(0)
			// 注意：value 为 ArrayBuffer，跨桥序列化以真机实测为准。
			await expectSuccess('writeBLECharacteristicValue', {
				deviceId,
				serviceId,
				characteristicId: charIds.write,
				value: new ArrayBuffer(1)
			})
		})
		itWithDevice('notifyBLECharacteristicValueChange · 订阅开/关 → success', async () => {
			expect(charIds.notify.length).toBeGreaterThan(0)
			await expectSuccess('notifyBLECharacteristicValueChange', {
				deviceId,
				serviceId,
				characteristicId: charIds.notify,
				state: true,
				type: charIds.notifyType
			})
			await expectSuccess('notifyBLECharacteristicValueChange', {
				deviceId,
				serviceId,
				characteristicId: charIds.notify,
				state: false,
				type: charIds.notifyType
			})
		})
		itWithDevice('closeBLEConnection · 断开 → success', async () => {
			await expectSuccess('closeBLEConnection', {
				deviceId
			})
			await expectSuccess('createBLEConnection', {
				deviceId
			})
		})
	})

	// -------------------------------------------------------------------
	// 场景四：负向错误码（可自动化子集；期望值以真机实测校对）
	// -------------------------------------------------------------------
	describe('负向错误码（可自动化子集）', () => {
		beforeAll(async () => {
			await expectSuccess('openBluetoothAdapter')
		})
		afterAll(async () => {
			await resetAdapter()
		})

		itWithDevice('getBLEDeviceServices · 有效 ID 但未连接 → 1509003', async () => {
			await expectFail('getBLEDeviceServices', {
				deviceId: DEVICE_IDS[0]
			}, 1509003)
		})
		itWithDevice('readBLECharacteristicValue · 未连接 → 1509003', async () => {
			await expectFail('readBLECharacteristicValue', {
				deviceId: DEVICE_IDS[0],
				serviceId: PLACEHOLDER_SERVICE_ID,
				characteristicId: PLACEHOLDER_CHARACTERISTIC_ID
			}, 1509003)
		})
		it('getConnectedBluetoothDevices · services 为空 → 1509601（参数无效）', async () => {
			await expectFail('getConnectedBluetoothDevices', {
				services: []
			}, 1509601)
		})
	})

	// -------------------------------------------------------------------
	// 场景五：多设备并发（需 DEVICE_IDS ≥ 2）
	// -------------------------------------------------------------------
	describe('多设备并发（DEVICE_IDS ≥ 2）', () => {
		const hasMulti = DEVICE_IDS.length >= 2

		beforeAll(async () => {
			if (!hasMulti) return
			await expectSuccess('openBluetoothAdapter')
		})
		afterAll(async () => {
			if (!hasMulti) return
			await Promise.all(DEVICE_IDS.map(deviceId => callUni('closeBLEConnection', {
				deviceId
			})))
			await resetAdapter()
		})

		itWithMultipleDevices('并发 createBLEConnection → 全部 success', async () => {
			const results = await Promise.all(DEVICE_IDS.map(deviceId => callUni('createBLEConnection', {
				deviceId
			})))
			results.forEach((result, index) => {
				if (result.ok !== true) {
					throw new Error(`设备 ${DEVICE_IDS[index]} 连接失败: ${result.errMsg || JSON.stringify(result.error || result)}`)
				}
			})
		})

		itWithMultipleDevices('跨设备查询服务和 RSSI（单设备内串行）→ 全部 success', async () => {
			await Promise.all(DEVICE_IDS.map(async deviceId => {
				await expectSuccess('getBLEDeviceServices', { deviceId })
				await expectSuccess('getBLEDeviceRSSI', { deviceId })
			}))
		})

		itWithMultipleDevices('跨设备读写（设备间并行、单设备内串行）→ 全部 success', async () => {
			await Promise.all(DEVICE_IDS.map(async deviceId => {
				const services = await expectSuccess('getBLEDeviceServices', { deviceId })
				const serviceList = services.res && Array.isArray(services.res.services) ? services.res.services : []
				const primary = serviceList.find(s => s.isPrimary) || serviceList[0]
				if (primary == null) throw new Error(`设备 ${deviceId} 未提供 GATT 服务`)

				const chars = await expectSuccess('getBLEDeviceCharacteristics', {
					deviceId,
					serviceId: primary.uuid
				})
				const list = chars.res && Array.isArray(chars.res.characteristics) ? chars.res.characteristics : []
					const readable = list.find(c => c.uuid && c.properties && c.properties.read)
					const writable = list.find(c => c.uuid && c.properties && (c.properties.write || c.properties.writeNoResponse))
				if (readable == null && writable == null) throw new Error(`设备 ${deviceId} 没有可读或可写特征`)

				if (readable != null) await expectSuccess('readBLECharacteristicValue', {
					deviceId,
					serviceId: primary.uuid,
					characteristicId: readable.uuid
				})
				if (writable != null) await expectSuccess('writeBLECharacteristicValue', {
					deviceId,
					serviceId: primary.uuid,
					characteristicId: writable.uuid,
					value: new ArrayBuffer(1)
				})
			}))
		})

		itWithMultipleDevices('并发 closeBLEConnection → 全部 success', async () => {
			await Promise.all(DEVICE_IDS.map(deviceId => expectSuccess('closeBLEConnection', {
				deviceId
			})))
		})
	})

	// -------------------------------------------------------------------
	// 场景六：无效参数 / ID（构造的非法/不存在输入）
	//   期望值以 Android 真机实测校对。
	//   说明：对 GATT 类接口传“不存在但格式合法”的 deviceId，实现多返回“未连接 1509003”
	//         （按 session 查找失败），故此处只覆盖能稳定区分“参数错误/路径缺失”的输入。
	// -------------------------------------------------------------------
	describe('无效参数 / ID（构造）', () => {
		beforeAll(async () => {
			await expectSuccess('openBluetoothAdapter')
		})
		afterAll(async () => {
			await resetAdapter()
		})

		it('createBLEConnection · deviceId 格式非法 → 1509601', async () => {
			await expectFail('createBLEConnection', {
				deviceId: INVALID_ID
			}, 1509601)
		})
		it('createBLEConnection · timeout=0 → 1509601', async () => {
			await expectFail('createBLEConnection', {
				deviceId: PLACEHOLDER_DEVICE_ID,
				timeout: 0
			}, 1509601)
		})
		it('createBLEConnection · timeout=-1 → 1509601', async () => {
			await expectFail('createBLEConnection', {
				deviceId: PLACEHOLDER_DEVICE_ID,
				timeout: -1
			}, 1509601)
		})

		itWithDevice('getBLEDeviceCharacteristics · serviceId 格式非法 → 1509601（需已连接）', async () => {
			const deviceId = DEVICE_IDS[0]
			const conn = await callUni('createBLEConnection', {
				deviceId
			})
			expect(conn.ok).toBe(true)
			try {
				await expectFail('getBLEDeviceCharacteristics', {
					deviceId,
					serviceId: INVALID_ID
				}, 1509601)
			} finally {
				await callUni('closeBLEConnection', { deviceId })
			}
		})
		itWithDevice('getBLEDeviceCharacteristics · serviceId 合法但不存在 → 1500103（需已连接）', async () => {
			const deviceId = DEVICE_IDS[0]
			const conn = await callUni('createBLEConnection', {
				deviceId
			})
			expect(conn.ok).toBe(true)
			try {
				await expectFail('getBLEDeviceCharacteristics', {
					deviceId,
					serviceId: ABSENT_SERVICE_ID
				}, 1500103)
			} finally {
				await callUni('closeBLEConnection', { deviceId })
			}
		})
		itWithDevice('readBLECharacteristicValue · characteristicId 合法但不存在 → 1509002（需已连接）', async () => {
			const deviceId = DEVICE_IDS[0]
			const conn = await callUni('createBLEConnection', {
				deviceId
			})
			expect(conn.ok).toBe(true)
			try {
				const services = await callUni('getBLEDeviceServices', {
					deviceId
				})
				expect(services.ok).toBe(true)
				const serviceList = services.res && Array.isArray(services.res.services) ? services.res.services : []
				const primary = serviceList.find(s => s.isPrimary) || serviceList[0]
				expect(primary).toBeDefined()
				await expectFail('readBLECharacteristicValue', {
					deviceId,
					serviceId: primary.uuid,
					characteristicId: ABSENT_CHARACTERISTIC_ID
				}, 1509002)
			} finally {
				await callUni('closeBLEConnection', { deviceId })
			}
		})
	})

})
