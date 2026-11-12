export type RawTestDevice = { name ?: string | null, deviceId : string, RSSI ?: number | null, advertisData ?: ArrayBuffer | null, advertisServiceUUIDs ?: string[] | null, localName ?: string | null, serviceData ?: UTSJSONObject | null, connectable ?: boolean | null }
export type TestDevice = { name ?: string | null, deviceId : string, RSSI : number, advertisData : ArrayBuffer, advertisServiceUUIDs : string[], localName : string, serviceData : UTSJSONObject, connectable ?: boolean | null, seenCount ?: number, expanded ?: boolean }
export type DevicePanelRecord = { name ?: string | null, deviceId : string, RSSI : number, serviceCountText : string, serviceCount : number, manufacturerDataText : string, serviceDataText : string, title : string, localName : string, connectable ?: boolean | null, seenCount : number, expanded : boolean, notice : string }
export type TestCharacteristic = { uuid : string, name : string, properties : string[] }
export type TestService = { uuid : string, isPrimary : boolean, characteristics : TestCharacteristic[] }
export type EventProbeLog = { slot : string, time : string, detail : string }
export type EventRow = { key : string, name : string, api : string, platform : string, supported : boolean, bOffMode : string, aId : number, bId : number, aCount : number, bCount : number, logs : EventProbeLog[], logOpen : boolean }
export type LogKind = 'success' | 'fail' | 'event'
export type LogScope = 'global' | 'device'
export type LogFilterMode = 'all' | 'device' | 'fail'
export type TestLog = { id : number, time : string, kind : LogKind, scope : LogScope, api : string, detail : string, deviceId : string, deviceName : string, serviceId : string, characteristicId : string, attemptNo : number }
export type LogDeviceContext = { deviceId : string, name : string, state : string, attemptNo : number, lastActivity : number }
export type WritePayloadMode = 'hex' | 'utf8'
export type TaskKind = 'read' | 'write' | 'notify'
export type TaskStatus = 'IDLE' | 'RUNNING' | 'PASS' | 'FAIL' | 'PAUSED' | 'BLOCKED'
export type TaskItem = {
	id : string,
	kind : TaskKind,
	serviceId : string,
	characteristicId : string,
	label : string,
	payload : string,
	payloadEncoding : WritePayloadMode,
	writeMode : WriteMode,
	notifyMode : NotifyMode,
	targetCount : number,
	timeoutMs : number,
	expectedHex : string,
	boundConnectionEpoch : number,
	detail : string,
	status : TaskStatus,
	completedCount : number,
	successCount : number,
	failCount : number,
	eventCount : number,
	lastValueHex : string,
	runToken : number,
	timeoutId : number,
	apiSucceeded : boolean,
	apiSuccessCount : number,
	valueEventCount : number,
	notifyEnablePending : boolean,
	notifyRequestToken : number,
	notifyCleanupSubmitted : boolean
}
export type DeviceTask = { id : string, deviceId : string, deviceName : string, paused : boolean, items : TaskItem[] }
export type DeviceConnectionEpoch = { deviceId : string, epoch : number }
export type BufferPreview = { text : string, utf8Text : string, utf8Notice : string, byteLength : number }
export type WriteMode = 'write' | 'writeNoResponse'
export type NotifyMode = 'notification' | 'indication'
export type ValueDisplayMode = 'hex' | 'utf8'

export type BlePlatform = 'app-ios' | 'app-android' | 'app-harmony' | 'mp-weixin' | 'web'
export type BleTraceOutcome = 'submitted' | 'notSubmitted' | 'callback' | 'timeout' | 'cancelled' | 'unsupported'
export type BleCleanupStatus = 'notRequired' | 'pending' | 'success' | 'failed'
export type BleNativeTrace = {
	state : number | null,
	reason : string,
	operationId : string,
	generation : number | null,
	coreBluetoothError : string
}
export type BleApiContext = {
	caseId : string,
	deviceId : string,
	serviceId : string,
	characteristicId : string,
	expectedErrCode : number | null
	notifyState ?: boolean
}
export type BleApiTrace = {
	runId : string,
	caseId : string,
	apiName : string,
	platform : BlePlatform,
	deviceId : string,
	serviceId : string,
	characteristicId : string,
	requestStartedAt : number,
	requestFinishedAt : number,
	durationMs : number,
	successCount : number,
	failCount : number,
	completeCount : number,
	eventCount : number,
	expectedErrCode : number | null,
	actualErrCode : number | null,
	actualErrMsg : string,
	data : UTSJSONObject | null,
	cause : string,
	nativeTrace : BleNativeTrace | null,
	submitted : boolean | null,
	outcome : BleTraceOutcome,
	cleanupStatus : BleCleanupStatus
}
export type BleContractStatus = 'RUNNING' | 'PASS' | 'FAIL' | 'BLOCKED' | 'UNSUPPORTED' | 'SKIPPED' | 'INCONCLUSIVE' | 'CLEANUP_FAILED'
export type BleContractResult = {
	runId : string,
	caseId : string,
	apiName : string,
	platform : BlePlatform,
	status : BleContractStatus,
	expectedErrCode : number | null,
	actualErrCode : number | null,
	expectedMessage : string,
	actualMessage : string,
	detail : string,
	trace : BleApiTrace | null,
	parameters : string,
	setup : string,
	actualOutcome : string,
	rawResult : string,
	assertions : string[]
}

export type BleContractCategory = '适配器' | '发现' | '连接与链路' | 'GATT' | '监听'
export type BleContractPreparation = 'none' | 'openAdapter' | 'closeAdapter' | 'queryAdapterState' | 'startDiscovery' | 'stopDiscovery' | 'enableNotify' | 'disableNotify' | 'disconnectDevice' | 'selectDevice' | 'device' | 'events'
export type BleTestTab = 'concurrency' | 'contract'
export type BleContractPrecondition = {
	key : string,
	title : string,
	detail : string,
	met : boolean,
	preparation : BleContractPreparation,
	actionText : string
}

export type BleContractApi = {
	name : string,
	category : BleContractCategory,
	platform : BlePlatform,
	mode : 'callback' | 'event',
	requiresAdapter : boolean,
	requiresDevice : boolean,
	requiresService : boolean,
	requiresCharacteristic : boolean
}

export type BleContractCase = {
	caseId : string,
	apiName : string,
	title : string,
	detail : string,
	expectedMessage : string,
	expectedErrCode : number | null,
	expectedReason : string,
	scenario : string,
	parameterFault : string,
	fixture : string,
	deadlineMs : number,
	requiresAdapter : boolean,
	requiresDevice : boolean,
	requiresService : boolean,
	requiresCharacteristic : boolean
	adapterState : 'any' | 'opened' | 'closed',
	discoveryState : 'any' | 'started' | 'stopped',
	connectionState : 'any' | 'connected' | 'disconnected',
	availability : 'any' | 'available' | 'unavailable',
	capability : 'none' | 'read' | 'write' | 'writeNoResponse' | 'notification',
	capabilitySupported : boolean,
	notifyState : 'any' | 'on' | 'off',
	writeType : WriteMode,
	notifyEnabled : boolean
}