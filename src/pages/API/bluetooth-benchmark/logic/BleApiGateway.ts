import {
	BLECharacteristicValueChangeCallback,
	BluetoothAdapterStateChangeCallback,
	BluetoothDeviceFoundCallback,
	BLEConnectionStateChangeCallback,
	BLEMTUChangeCallback,
	CloseBLEConnectionOptions,
	CloseBluetoothAdapterOptions,
	CreateBLEConnectionOptions,
	GetBLEDeviceCharacteristicsOptions,
	GetBLEDeviceRSSIOptions,
	GetBLEDeviceServicesOptions,
	GetBLEMTUOptions,
	GetBluetoothDevicesOptions,
	GetBluetoothAdapterStateOptions,
	GetConnectedBluetoothDevicesOptions,
	NotifyBLECharacteristicValueChangeOptions,
	OpenBluetoothAdapterOptions,
	ReadBLECharacteristicValueOptions,
	StartBluetoothDevicesDiscoveryOptions,
	StopBluetoothDevicesDiscoveryOptions,
	WriteBLECharacteristicValueOptions
} from '../../../../uni_modules/uni-bluetooth/utssdk/interface.uts'
import { BleApiContext, BleApiTrace, BlePlatform } from './BleWorkspaceTypes.ts'

export type BleApiTraceSink = (trace : BleApiTrace) => void

export function currentBlePlatform() : BlePlatform {
	let platform : BlePlatform = 'web'
	// #ifdef APP-IOS
	platform = 'app-ios'
	// #endif
	// #ifdef APP-ANDROID
	platform = 'app-android'
	// #endif
	// #ifdef APP-HARMONY
	platform = 'app-harmony'
	// #endif
	// #ifdef MP-WEIXIN
	platform = 'mp-weixin'
	// #endif
	return platform
}

export class BleApiGateway {
	private traceSink : BleApiTraceSink | null
	private runSequence : number = 0

	constructor(traceSink : BleApiTraceSink | null = null) {
		this.traceSink = traceSink
	}

	private makeTrace(apiName : string, context : BleApiContext | null) : BleApiTrace {
		this.runSequence++
		const startedAt = Date.now()
		return {
			runId: startedAt.toString() + '-' + this.runSequence.toString(),
			caseId: context == null ? '' : context!.caseId,
			apiName: apiName,
			platform: currentBlePlatform(),
			deviceId: context == null ? '' : context!.deviceId,
			serviceId: context == null ? '' : context!.serviceId,
			characteristicId: context == null ? '' : context!.characteristicId,
			requestStartedAt: startedAt,
			requestFinishedAt: 0,
			durationMs: 0,
			successCount: 0,
			failCount: 0,
			completeCount: 0,
			eventCount: 0,
			expectedErrCode: context == null ? null : context!.expectedErrCode,
			actualErrCode: null,
			actualErrMsg: '',
			data: null,
			cause: '',
			nativeTrace: null,
			submitted: null,
			outcome: 'submitted',
			cleanupStatus: 'notRequired'
		} as BleApiTrace
	}

	private finishTrace(trace : BleApiTrace) {
		trace.requestFinishedAt = Date.now()
		trace.durationMs = trace.requestFinishedAt - trace.requestStartedAt
		if (this.traceSink != null) this.traceSink!(trace)
	}

	openBluetoothAdapter(options : OpenBluetoothAdapterOptions, context : BleApiContext | null = null) : void {
		const trace = this.makeTrace('openBluetoothAdapter', context)
		const success = options.success
		const fail = options.fail
		const complete = options.complete
		trace.submitted = true
		uni.openBluetoothAdapter({
			success: (result) => {
				trace.successCount++
				trace.actualErrMsg = result.errMsg
				trace.data = { errMsg: result.errMsg }
				trace.outcome = 'callback'
				if (success != null) success!(result)
			},
			fail: (error) => {
				trace.failCount++
				trace.actualErrCode = error.errCode
				trace.actualErrMsg = error.errMsg
				trace.outcome = 'callback'
				if (fail != null) fail!(error)
			},
			complete: (result) => {
				trace.completeCount++
				if (complete != null) complete!(result)
				this.finishTrace(trace)
			}
		})
	}

	getBluetoothAdapterState(options : GetBluetoothAdapterStateOptions, context : BleApiContext | null = null) : void {
		const trace = this.makeTrace('getBluetoothAdapterState', context)
		const success = options.success
		const fail = options.fail
		const complete = options.complete
		trace.submitted = true
		uni.getBluetoothAdapterState({
			success: (result) => {
				trace.successCount++
				trace.actualErrMsg = result.errMsg
				trace.data = { errMsg: result.errMsg, available: result.available, discovering: result.discovering }
				trace.outcome = 'callback'
				if (success != null) success!(result)
			},
			fail: (error) => {
				trace.failCount++
				trace.actualErrCode = error.errCode
				trace.actualErrMsg = error.errMsg
				trace.outcome = 'callback'
				if (fail != null) fail!(error)
			},
			complete: (result) => {
				trace.completeCount++
				if (complete != null) complete!(result)
				this.finishTrace(trace)
			}
		})
	}

	closeBluetoothAdapter(options : CloseBluetoothAdapterOptions, context : BleApiContext | null = null) : void {
		const trace = this.makeTrace('closeBluetoothAdapter', context)
		const success = options.success
		const fail = options.fail
		const complete = options.complete
		trace.submitted = true
		uni.closeBluetoothAdapter({
			success: (result) => {
				trace.successCount++
				trace.actualErrMsg = result.errMsg
				trace.data = { errMsg: result.errMsg }
				trace.outcome = 'callback'
				if (success != null) success!(result)
			},
			fail: (error) => {
				trace.failCount++
				trace.actualErrCode = error.errCode
				trace.actualErrMsg = error.errMsg
				trace.outcome = 'callback'
				if (fail != null) fail!(error)
			},
			complete: (result) => {
				trace.completeCount++
				if (complete != null) complete!(result)
				this.finishTrace(trace)
			}
		})
	}

	startBluetoothDevicesDiscovery(options : StartBluetoothDevicesDiscoveryOptions, context : BleApiContext | null = null) : void {
		const trace = this.makeTrace('startBluetoothDevicesDiscovery', context)
		const success = options.success
		const fail = options.fail
		const complete = options.complete
		trace.submitted = true
		uni.startBluetoothDevicesDiscovery({
			services: options.services,
			allowDuplicatesKey: options.allowDuplicatesKey,
			interval: options.interval,
			powerLevel: options.powerLevel,
			success: (result) => {
				trace.successCount++
				trace.actualErrMsg = result.errMsg
				trace.data = { errMsg: result.errMsg }
				trace.outcome = 'callback'
				if (success != null) success!(result)
			},
			fail: (error) => {
				trace.failCount++
				trace.actualErrCode = error.errCode
				trace.actualErrMsg = error.errMsg
				trace.outcome = 'callback'
				if (fail != null) fail!(error)
			},
			complete: (result) => {
				trace.completeCount++
				if (complete != null) complete!(result)
				this.finishTrace(trace)
			}
		})
	}

	stopBluetoothDevicesDiscovery(options : StopBluetoothDevicesDiscoveryOptions, context : BleApiContext | null = null) : void {
		const trace = this.makeTrace('stopBluetoothDevicesDiscovery', context)
		const success = options.success
		const fail = options.fail
		const complete = options.complete
		trace.submitted = true
		uni.stopBluetoothDevicesDiscovery({
			success: (result) => {
				trace.successCount++
				trace.actualErrMsg = result.errMsg
				trace.data = { errMsg: result.errMsg }
				trace.outcome = 'callback'
				if (success != null) success!(result)
			},
			fail: (error) => {
				trace.failCount++
				trace.actualErrCode = error.errCode
				trace.actualErrMsg = error.errMsg
				trace.outcome = 'callback'
				if (fail != null) fail!(error)
			},
			complete: (result) => {
				trace.completeCount++
				if (complete != null) complete!(result)
				this.finishTrace(trace)
			}
		})
	}

	getBluetoothDevices(options : GetBluetoothDevicesOptions, context : BleApiContext | null = null) : void {
		const trace = this.makeTrace('getBluetoothDevices', context)
		const success = options.success
		const fail = options.fail
		const complete = options.complete
		trace.submitted = true
		uni.getBluetoothDevices({
			success: (result) => {
				trace.successCount++
				trace.actualErrMsg = result.errMsg
				trace.data = { errMsg: result.errMsg, deviceCount: result.devices.length }
				trace.outcome = 'callback'
				if (success != null) success!(result)
			},
			fail: (error) => {
				trace.failCount++
				trace.actualErrCode = error.errCode
				trace.actualErrMsg = error.errMsg
				trace.outcome = 'callback'
				if (fail != null) fail!(error)
			},
			complete: (result) => {
				trace.completeCount++
				if (complete != null) complete!(result)
				this.finishTrace(trace)
			}
		})
	}

	getConnectedBluetoothDevices(options : GetConnectedBluetoothDevicesOptions, context : BleApiContext | null = null) : void {
		const trace = this.makeTrace('getConnectedBluetoothDevices', context)
		const success = options.success
		const fail = options.fail
		const complete = options.complete
		trace.submitted = true
		uni.getConnectedBluetoothDevices({
			services: options.services,
			success: (result) => {
				trace.successCount++
				trace.actualErrMsg = result.errMsg
				trace.data = { errMsg: result.errMsg, deviceCount: result.devices.length }
				trace.outcome = 'callback'
				if (success != null) success!(result)
			},
			fail: (error) => {
				trace.failCount++
				trace.actualErrCode = error.errCode
				trace.actualErrMsg = error.errMsg
				trace.outcome = 'callback'
				if (fail != null) fail!(error)
			},
			complete: (result) => {
				trace.completeCount++
				if (complete != null) complete!(result)
				this.finishTrace(trace)
			}
		})
	}

	createBLEConnection(options : CreateBLEConnectionOptions, context : BleApiContext | null = null) : void {
		const trace = this.makeTrace('createBLEConnection', context)
		trace.deviceId = options.deviceId
		const success = options.success
		const fail = options.fail
		const complete = options.complete
		trace.submitted = true
		uni.createBLEConnection({
			deviceId: options.deviceId,
			timeout: options.timeout,
			success: (result) => {
				trace.successCount++
				trace.actualErrMsg = result.errMsg
				trace.data = { errMsg: result.errMsg }
				trace.outcome = 'callback'
				if (success != null) success!(result)
			},
			fail: (error) => {
				trace.failCount++
				trace.actualErrCode = error.errCode
				trace.actualErrMsg = error.errMsg
				trace.outcome = 'callback'
				if (fail != null) fail!(error)
			},
			complete: (result) => {
				trace.completeCount++
				if (complete != null) complete!(result)
				this.finishTrace(trace)
			}
		})
	}

	closeBLEConnection(options : CloseBLEConnectionOptions, context : BleApiContext | null = null) : void {
		const trace = this.makeTrace('closeBLEConnection', context)
		trace.deviceId = options.deviceId
		const success = options.success
		const fail = options.fail
		const complete = options.complete
		trace.submitted = true
		uni.closeBLEConnection({
			deviceId: options.deviceId,
			success: (result) => {
				trace.successCount++
				trace.actualErrMsg = result.errMsg
				trace.data = { errMsg: result.errMsg }
				trace.outcome = 'callback'
				if (success != null) success!(result)
			},
			fail: (error) => {
				trace.failCount++
				trace.actualErrCode = error.errCode
				trace.actualErrMsg = error.errMsg
				trace.outcome = 'callback'
				if (fail != null) fail!(error)
			},
			complete: (result) => {
				trace.completeCount++
				if (complete != null) complete!(result)
				this.finishTrace(trace)
			}
		})
	}

	getBLEDeviceServices(options : GetBLEDeviceServicesOptions, context : BleApiContext | null = null) : void {
		const trace = this.makeTrace('getBLEDeviceServices', context)
		trace.deviceId = options.deviceId
		const success = options.success
		const fail = options.fail
		const complete = options.complete
		trace.submitted = true
		uni.getBLEDeviceServices({
			deviceId: options.deviceId,
			success: (result) => {
				trace.successCount++
				trace.actualErrMsg = result.errMsg
				trace.data = { errMsg: result.errMsg, serviceCount: result.services.length }
				trace.outcome = 'callback'
				if (success != null) success!(result)
			},
			fail: (error) => {
				trace.failCount++
				trace.actualErrCode = error.errCode
				trace.actualErrMsg = error.errMsg
				trace.outcome = 'callback'
				if (fail != null) fail!(error)
			},
			complete: (result) => {
				trace.completeCount++
				if (complete != null) complete!(result)
				this.finishTrace(trace)
			}
		})
	}

	getBLEDeviceCharacteristics(options : GetBLEDeviceCharacteristicsOptions, context : BleApiContext | null = null) : void {
		const trace = this.makeTrace('getBLEDeviceCharacteristics', context)
		trace.deviceId = options.deviceId
		trace.serviceId = options.serviceId
		const success = options.success
		const fail = options.fail
		const complete = options.complete
		trace.submitted = true
		uni.getBLEDeviceCharacteristics({
			deviceId: options.deviceId,
			serviceId: options.serviceId,
			success: (result) => {
				trace.successCount++
				trace.actualErrMsg = result.errMsg
				trace.data = { errMsg: result.errMsg, characteristicCount: result.characteristics.length }
				trace.outcome = 'callback'
				if (success != null) success!(result)
			},
			fail: (error) => {
				trace.failCount++
				trace.actualErrCode = error.errCode
				trace.actualErrMsg = error.errMsg
				trace.outcome = 'callback'
				if (fail != null) fail!(error)
			},
			complete: (result) => {
				trace.completeCount++
				if (complete != null) complete!(result)
				this.finishTrace(trace)
			}
		})
	}

	getBLEDeviceRSSI(options : GetBLEDeviceRSSIOptions, context : BleApiContext | null = null) : void {
		const trace = this.makeTrace('getBLEDeviceRSSI', context)
		trace.deviceId = options.deviceId
		const success = options.success
		const fail = options.fail
		const complete = options.complete
		trace.submitted = true
		uni.getBLEDeviceRSSI({
			deviceId: options.deviceId,
			success: (result) => {
				trace.successCount++
				trace.actualErrMsg = result.errMsg
				trace.data = { errMsg: result.errMsg, RSSI: result.RSSI }
				trace.outcome = 'callback'
				if (success != null) success!(result)
			},
			fail: (error) => {
				trace.failCount++
				trace.actualErrCode = error.errCode
				trace.actualErrMsg = error.errMsg
				trace.outcome = 'callback'
				if (fail != null) fail!(error)
			},
			complete: (result) => {
				trace.completeCount++
				if (complete != null) complete!(result)
				this.finishTrace(trace)
			}
		})
	}

	getBLEMTU(options : GetBLEMTUOptions, context : BleApiContext | null = null) : void {
		const trace = this.makeTrace('getBLEMTU', context)
		trace.deviceId = options.deviceId
		const success = options.success
		const fail = options.fail
		const complete = options.complete
		trace.submitted = true
		uni.getBLEMTU({
			deviceId: options.deviceId,
			writeType: options.writeType,
			success: (result) => {
				trace.successCount++
				trace.actualErrMsg = result.errMsg
				trace.data = { errMsg: result.errMsg, mtu: result.mtu }
				trace.outcome = 'callback'
				if (success != null) success!(result)
			},
			fail: (error) => {
				trace.failCount++
				trace.actualErrCode = error.errCode
				trace.actualErrMsg = error.errMsg
				trace.outcome = 'callback'
				if (fail != null) fail!(error)
			},
			complete: (result) => {
				trace.completeCount++
				if (complete != null) complete!(result)
				this.finishTrace(trace)
			}
		})
	}

	readBLECharacteristicValue(options : ReadBLECharacteristicValueOptions, context : BleApiContext | null = null) : void {
		const trace = this.makeTrace('readBLECharacteristicValue', context)
		trace.deviceId = options.deviceId
		trace.serviceId = options.serviceId
		trace.characteristicId = options.characteristicId
		const success = options.success
		const fail = options.fail
		const complete = options.complete
		trace.submitted = true
		uni.readBLECharacteristicValue({
			deviceId: options.deviceId,
			serviceId: options.serviceId,
			characteristicId: options.characteristicId,
			success: (result) => {
				trace.successCount++
				trace.actualErrMsg = result.errMsg
				trace.data = { errMsg: result.errMsg }
				trace.outcome = 'callback'
				if (success != null) success!(result)
			},
			fail: (error) => {
				trace.failCount++
				trace.actualErrCode = error.errCode
				trace.actualErrMsg = error.errMsg
				trace.outcome = 'callback'
				if (fail != null) fail!(error)
			},
			complete: (result) => {
				trace.completeCount++
				if (complete != null) complete!(result)
				this.finishTrace(trace)
			}
		})
	}

	writeBLECharacteristicValue(options : WriteBLECharacteristicValueOptions, context : BleApiContext | null = null) : void {
		const trace = this.makeTrace('writeBLECharacteristicValue', context)
		trace.deviceId = options.deviceId
		trace.serviceId = options.serviceId
		trace.characteristicId = options.characteristicId
		const success = options.success
		const fail = options.fail
		const complete = options.complete
		trace.submitted = true
		uni.writeBLECharacteristicValue({
			deviceId: options.deviceId,
			serviceId: options.serviceId,
			characteristicId: options.characteristicId,
			value: options.value,
			writeType: options.writeType,
			success: (result) => {
				trace.successCount++
				trace.actualErrMsg = result.errMsg
				trace.data = { errMsg: result.errMsg, byteLength: options.value.byteLength }
				trace.outcome = 'callback'
				if (success != null) success!(result)
			},
			fail: (error) => {
				console.log("writeBLECharacteristicValue error=   ", error)
				trace.failCount++
				trace.actualErrCode = error.errCode
				trace.actualErrMsg = error.errMsg
				trace.outcome = 'callback'
				if (fail != null) fail!(error)
			},
			complete: (result) => {
				trace.completeCount++
				if (complete != null) complete!(result)
				this.finishTrace(trace)
			}
		})
	}

	notifyBLECharacteristicValueChange(options : NotifyBLECharacteristicValueChangeOptions, context : BleApiContext | null = null) : void {
		const trace = this.makeTrace('notifyBLECharacteristicValueChange', context)
		trace.deviceId = options.deviceId
		trace.serviceId = options.serviceId
		trace.characteristicId = options.characteristicId
		const success = options.success
		const fail = options.fail
		const complete = options.complete
		trace.submitted = true
		uni.notifyBLECharacteristicValueChange({
			deviceId: options.deviceId,
			serviceId: options.serviceId,
			characteristicId: options.characteristicId,
			state: options.state,
			type: options.type,
			success: (result) => {
				trace.successCount++
				trace.actualErrMsg = result.errMsg
				trace.data = { errMsg: result.errMsg, state: options.state }
				trace.outcome = 'callback'
				if (success != null) success!(result)
			},
			fail: (error) => {
				trace.failCount++
				trace.actualErrCode = error.errCode
				trace.actualErrMsg = error.errMsg
				trace.outcome = 'callback'
				if (fail != null) fail!(error)
			},
			complete: (result) => {
				trace.completeCount++
				if (complete != null) complete!(result)
				this.finishTrace(trace)
			}
		})
	}

	onBluetoothAdapterStateChange(callback : BluetoothAdapterStateChangeCallback, context : BleApiContext | null = null) : number {
		const trace = this.makeTrace('onBluetoothAdapterStateChange', context)
		const id = uni.onBluetoothAdapterStateChange(callback)
		trace.successCount = 1
		trace.completeCount = 1
		trace.actualErrMsg = 'onBluetoothAdapterStateChange:ok'
		trace.outcome = 'callback'
		this.finishTrace(trace)
		return id
	}

	offBluetoothAdapterStateChange(listener ?: number | BluetoothAdapterStateChangeCallback | null, context : BleApiContext | null = null) : void {
		const trace = this.makeTrace('offBluetoothAdapterStateChange', context)
		uni.offBluetoothAdapterStateChange(listener)
		trace.successCount = 1
		trace.completeCount = 1
		trace.actualErrMsg = 'offBluetoothAdapterStateChange:ok'
		trace.outcome = 'callback'
		this.finishTrace(trace)
	}

	onBluetoothDeviceFound(callback : BluetoothDeviceFoundCallback, context : BleApiContext | null = null) : number {
		const trace = this.makeTrace('onBluetoothDeviceFound', context)
		const id = uni.onBluetoothDeviceFound(callback)
		trace.successCount = 1
		trace.completeCount = 1
		trace.actualErrMsg = 'onBluetoothDeviceFound:ok'
		trace.outcome = 'callback'
		this.finishTrace(trace)
		return id
	}

	offBluetoothDeviceFound(listener ?: number | BluetoothDeviceFoundCallback | null, context : BleApiContext | null = null) : void {
		const trace = this.makeTrace('offBluetoothDeviceFound', context)
		uni.offBluetoothDeviceFound(listener)
		trace.successCount = 1
		trace.completeCount = 1
		trace.actualErrMsg = 'offBluetoothDeviceFound:ok'
		trace.outcome = 'callback'
		this.finishTrace(trace)
	}

	onBLEConnectionStateChange(callback : BLEConnectionStateChangeCallback) : number {
		return uni.onBLEConnectionStateChange(callback)
	}

	offBLEConnectionStateChange(listener ?: number | BLEConnectionStateChangeCallback | null) : void {
		uni.offBLEConnectionStateChange(listener)
	}

	onBLECharacteristicValueChange(callback : BLECharacteristicValueChangeCallback) : number {
		return uni.onBLECharacteristicValueChange(callback)
	}

	offBLECharacteristicValueChange(listener ?: number | BLECharacteristicValueChangeCallback | null) : void {
		uni.offBLECharacteristicValueChange(listener)
	}

	onBLEMTUChange(callback : BLEMTUChangeCallback) : number {
		return uni.onBLEMTUChange(callback)
	}

	offBLEMTUChange(listener ?: number | BLEMTUChangeCallback | null) : void {
		uni.offBLEMTUChange(listener)
	}
}
