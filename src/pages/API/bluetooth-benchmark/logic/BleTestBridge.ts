//
// 自动化测试桥接（两段式：启动 + 轮询结果）。
//
// 为什么需要它：
//   vapor 模式下 UTS 插件 API 由编译器生成 initUTSProxyFunction 代理并内联进页面产物，
//   不会挂到全局 uni 对象上；自动化框架的动态调用（uni[method]）找不到这些 API。
//   本模块内全部使用 uni.xxx 静态调用，与页面业务代码走同一插件路径。
//
// 为什么不用 Promise 返回值：
//   设备端 Page.callMethod 对返回值的跨端序列化不可靠（Promise 会被序列化成空对象），
//   因此这里采用“两段式”：
//     1) startBleApiForTest(payload)  同步返回 { token }，插件调用在后台进行；
//     2) readBleApiResult({ token })  轮询读取结果，返回普通 JSON 对象：
//        { pending: true } 或 { ok, errCode, errMsg, data }。
//
// 参数说明：
//   - page.callMethod 传入的是 JSON 普通对象，没有 UTSJSONObject 的 getXxx 方法，
//     因此本模块内一律用 [key] 索引访问取参；
//   - ArrayBuffer 无法直接序列化：writeBLECharacteristicValue 用 __bytes（number[]）
//     传字节，本模块内重建为 ArrayBuffer；
//   - 未在自动化用例中使用到的可选参数（如 startBluetoothDevicesDiscovery 的
//     powerLevel）暂不透传，如需使用在此按需增补。
//

import { BluetoothFail, BLEWriteType, BLENotifyType } from '../../../../uni_modules/uni-bluetooth/utssdk/interface.uts'

const bleTestResultStore = new Map<string, UTSJSONObject>()
let bleTestTokenSequence = 0

function stringValue(container : UTSJSONObject, key : string, fallback : string = '') : string {
	const value = container[key]
	if (value == null) return fallback
	return value as string
}

function numberOrNull(container : UTSJSONObject, key : string) : number | null {
	const value = container[key]
	if (value == null) return null
	return value as number
}

function booleanOrNull(container : UTSJSONObject, key : string) : boolean | null {
	const value = container[key]
	if (value == null) return null
	return value as boolean
}

function stringArrayOrNull(container : UTSJSONObject, key : string) : Array<string> | null {
	const value = container[key]
	if (value == null) return null
	return value as Array<string>
}

function numberArray(container : UTSJSONObject, key : string) : Array<number> | null {
	const value = container[key]
	if (value == null) return null
	return value as Array<number>
}

function writeTypeOf(text : string) : BLEWriteType | null {
	if (text == 'write') return 'write'
	if (text == 'writeNoResponse') return 'writeNoResponse'
	return null
}

function notifyTypeOf(text : string) : BLENotifyType | null {
	if (text == 'notification') return 'notification'
	if (text == 'indication') return 'indication'
	return null
}

function publishResult(token : string, data : any | null, isSuccess : boolean, error : BluetoothFail | null) : void {
	const output : UTSJSONObject = {}
	output['pending'] = false
	output['ok'] = isSuccess
	output['errCode'] = isSuccess ? 0 : (error == null ? -1 : error!.errCode)
	output['errMsg'] = isSuccess ? '' : (error == null ? 'unknown error' : error!.errMsg)
	output['data'] = data
	bleTestResultStore.set(token, output)
}

// 启动一次插件 API 调用，同步返回 { token }；结果由 readBleApiResult 轮询获取。
export function startBleApiForTest(payload : UTSJSONObject) : UTSJSONObject {
	const apiName = stringValue(payload, 'api')
	const optionsValue = payload['options']
	const options : UTSJSONObject = optionsValue == null ? {} : optionsValue

	bleTestTokenSequence++
	const token = bleTestTokenSequence.toString()
	const pending : UTSJSONObject = {}
	pending['pending'] = true
	bleTestResultStore.set(token, pending)

	const succeed = (data : any | null) : void => {
		publishResult(token, data, true, null)
	}
	const failed = (error : BluetoothFail | null) : void => {
		publishResult(token, null, false, error)
	}

	if (apiName == 'openBluetoothAdapter') {
		uni.openBluetoothAdapter({
			success: (res) => succeed(res),
			fail: (error) => failed(error)
		})
	} else if (apiName == 'closeBluetoothAdapter') {
		uni.closeBluetoothAdapter({
			success: (res) => succeed(res),
			fail: (error) => failed(error)
		})
	} else if (apiName == 'getBluetoothAdapterState') {
		uni.getBluetoothAdapterState({
			success: (res) => succeed(res),
			fail: (error) => failed(error)
		})
	} else if (apiName == 'startBluetoothDevicesDiscovery') {
		uni.startBluetoothDevicesDiscovery({
			services: stringArrayOrNull(options, 'services'),
			allowDuplicatesKey: booleanOrNull(options, 'allowDuplicatesKey'),
			interval: numberOrNull(options, 'interval'),
			success: (res) => succeed(res),
			fail: (error) => failed(error)
		})
	} else if (apiName == 'stopBluetoothDevicesDiscovery') {
		uni.stopBluetoothDevicesDiscovery({
			success: (res) => succeed(res),
			fail: (error) => failed(error)
		})
	} else if (apiName == 'getBluetoothDevices') {
		uni.getBluetoothDevices({
			success: (res) => succeed(res),
			fail: (error) => failed(error)
		})
	} else if (apiName == 'getConnectedBluetoothDevices') {
		uni.getConnectedBluetoothDevices({
			services: stringArrayOrNull(options, 'services') ?? ([] as string[]),
			success: (res) => succeed(res),
			fail: (error) => failed(error)
		})
	} else if (apiName == 'createBLEConnection') {
		uni.createBLEConnection({
			deviceId: stringValue(options, 'deviceId'),
			timeout: numberOrNull(options, 'timeout'),
			success: (res) => succeed(res),
			fail: (error) => failed(error)
		})
	} else if (apiName == 'closeBLEConnection') {
		uni.closeBLEConnection({
			deviceId: stringValue(options, 'deviceId'),
			success: (res) => succeed(res),
			fail: (error) => failed(error)
		})
	} else if (apiName == 'getBLEDeviceRSSI') {
		uni.getBLEDeviceRSSI({
			deviceId: stringValue(options, 'deviceId'),
			success: (res) => succeed(res),
			fail: (error) => failed(error)
		})
	} else if (apiName == 'getBLEMTU') {
		uni.getBLEMTU({
			deviceId: stringValue(options, 'deviceId'),
			writeType: writeTypeOf(stringValue(options, 'writeType')),
			success: (res) => succeed(res),
			fail: (error) => failed(error)
		})
	} else if (apiName == 'setBLEMTU') {
		uni.setBLEMTU({
			deviceId: stringValue(options, 'deviceId'),
			mtu: numberOrNull(options, 'mtu') ?? 0,
			success: (res) => succeed(res),
			fail: (error) => failed(error)
		})
	} else if (apiName == 'getBLEDeviceServices') {
		uni.getBLEDeviceServices({
			deviceId: stringValue(options, 'deviceId'),
			success: (res) => succeed(res),
			fail: (error) => failed(error)
		})
	} else if (apiName == 'getBLEDeviceCharacteristics') {
		uni.getBLEDeviceCharacteristics({
			deviceId: stringValue(options, 'deviceId'),
			serviceId: stringValue(options, 'serviceId'),
			success: (res) => succeed(res),
			fail: (error) => failed(error)
		})
	} else if (apiName == 'readBLECharacteristicValue') {
		uni.readBLECharacteristicValue({
			deviceId: stringValue(options, 'deviceId'),
			serviceId: stringValue(options, 'serviceId'),
			characteristicId: stringValue(options, 'characteristicId'),
			success: (res) => succeed(res),
			fail: (error) => failed(error)
		})
	} else if (apiName == 'writeBLECharacteristicValue') {
		const bytes = numberArray(options, '__bytes')
		uni.writeBLECharacteristicValue({
			deviceId: stringValue(options, 'deviceId'),
			serviceId: stringValue(options, 'serviceId'),
			characteristicId: stringValue(options, 'characteristicId'),
			value: bytes == null ? new ArrayBuffer(0) : new Uint8Array(bytes!).buffer,
			writeType: writeTypeOf(stringValue(options, 'writeType')),
			success: (res) => succeed(res),
			fail: (error) => failed(error)
		})
	} else if (apiName == 'notifyBLECharacteristicValueChange') {
		uni.notifyBLECharacteristicValueChange({
			deviceId: stringValue(options, 'deviceId'),
			serviceId: stringValue(options, 'serviceId'),
			characteristicId: stringValue(options, 'characteristicId'),
			state: booleanOrNull(options, 'state') ?? false,
			type: notifyTypeOf(stringValue(options, 'type')),
			success: (res) => succeed(res),
			fail: (error) => failed(error)
		})
	} else {
		failed(null)
	}

	const output : UTSJSONObject = {}
	output['token'] = token
	return output
}

// 读取并消费（终态）一次调用的结果；不存在返回 null，未完成返回 { pending: true }。
export function readBleApiResult(payload : UTSJSONObject) : UTSJSONObject | null {
	const token = stringValue(payload, 'token')
	const value = bleTestResultStore.get(token)
	if (value == null) return null
	const pendingValue = value['pending']
	if (pendingValue != true) bleTestResultStore.delete(token)
	return value
}
