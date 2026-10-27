export type UTSWorkerAddListenerOptions = {
	success ?: UTSWorkerReceiveEventCallback
}

export type UTSWorkerAddListenerOptionsSuccess = {
	result : UTSJSONObject
}

export type UTSWorkerSendWorkerMessageOptions = {
	data : string,
	needReply : boolean
}

export type UTSWorkerErrorCallbackSuccess = {
	message : string
}

export type UTSWorkerErrorOptions = {
	success ?: UTSWorkerErrorCallback
}

export type UTSWorkerErrorCallback = (error: UTSWorkerErrorCallbackSuccess) => void

export type UTSWorkerReceiveEventCallback = (callback: UTSWorkerAddListenerOptionsSuccess) => void


export type SendWorkerMessage = (options: UTSWorkerSendWorkerMessageOptions) => void

export type OnWorkerMessage = (options: UTSWorkerAddListenerOptions) => void


export type OnWorkerError = (options: UTSWorkerErrorOptions) => void

export type CreateWorkers = () => void

export type DestroyWorker = () => void
