import { CreateWorkers, DestroyWorker, OnWorkerError,
OnWorkerMessage, SendWorkerMessage,
UTSWorkerAddListenerOptions , UTSWorkerAddListenerOptionsSuccess, UTSWorkerSendWorkerMessageOptions, UTSWorkerErrorOptions, UTSWorkerErrorCallbackSuccess } from './interface.uts';

export * from './interface.uts';

export const createWorkers : CreateWorkers = function () : void {
	UTSWorkerImpl.shared.create();
}
export const sendWorkerMessage : SendWorkerMessage = function (options : UTSWorkerSendWorkerMessageOptions) : void {
	UTSWorkerImpl.shared.sendMessage(options);
}

export const onWorkerMessage : OnWorkerMessage  = function (options : UTSWorkerAddListenerOptions) : void {
	UTSWorkerImpl.shared.onMessage(options);
}

export const destroyWorker : DestroyWorker = function () : void {
	UTSWorkerImpl.shared.destroy();
}

export const onWorkerError : OnWorkerError = function (options: UTSWorkerErrorOptions) : void {
	UTSWorkerImpl.shared.onError(options);
}

export class UTSWorkerImpl{
  static shared : UTSWorkerImpl = new UTSWorkerImpl()
	private workerImp : Worker | null = null;
	private options : UTSWorkerAddListenerOptions | null = null;
	private errorOptions : UTSWorkerErrorOptions | null = null;

	create(){
		if (this.workerImp != null) {
			console.warn('[UTS Plugin] Worker已存在，先销毁旧的Worker');
			this.destroy();
		}

		console.log('[UTS Plugin] 创建Worker');
		const worker = uni.createWorker('workers/helloWorkerTask.uts');
		this.workerImp = worker;
	}


	sendMessage(options : UTSWorkerSendWorkerMessageOptions){
		if (this.workerImp == null) {
			console.error('Worker未创建，无法发送消息');
			return;
		}

		// 获取消息信息并添加日志
		const msgData = options.data;
		const needReply = options.needReply;

		console.log(`[UTS Plugin] 向Worker发送消息: ${msgData} (需要回复: ${needReply})`);

		// 构造要发送给Worker的消息对象
		const messageToWorker = {
			data: msgData,
			needReply: needReply
		};

		this.workerImp!.postMessage(messageToWorker,null);
	}

	onMessage(options : UTSWorkerAddListenerOptions){
		if (this.workerImp == null) {
			console.error('Worker未创建，无法监听消息');
			return;
		}

		this.options = options;
		this.workerImp!.onMessage((result) => {
			// 处理Worker返回的消息
			console.log(`[UTS Plugin] 收到Worker消息:`, result);

			if (this.options != null && this.options.success != null){
				let success : UTSWorkerAddListenerOptionsSuccess = {
					result: result as UTSJSONObject
				}
				this.options.success(success);
			}
		})
	}
	onError(options: UTSWorkerErrorOptions){
		if (this.workerImp == null) {
			console.error('Worker未创建，无法监听错误');
			return;
		}

		this.errorOptions = options;
		this.workerImp!.onError((error) => {
			console.error('[UTS Plugin] Worker发生错误:', error);

			if (this.errorOptions != null && this.errorOptions.success != null) {
				// const errorInfo: UTSWorkerErrorCallbackSuccess = {
				// 	message: error.message
				// };
        const errorInfo: UTSWorkerErrorCallbackSuccess = {
        	message: "worker error"
        };
				this.errorOptions.success(errorInfo);
			}
		})
	}
	destroy(){

		if (this.workerImp != null) {
			console.log('[UTS Plugin] 销毁Worker');
			this.workerImp.terminate();
			this.workerImp = null;
			this.options = null;
			this.errorOptions = null;
		}
	}
}
