class UniWebViewBaseEvent<T> extends UniCustomEvent<T> {
  constructor(target : UniElement, type : string, detail ?: T) {
    super(type, detail as T)
    if (this.target == null) {
      this.target = target
    }
    this.currentTarget = target
  }
}


export type UniWebViewMessageEventDetail = {
  data : UTSJSONObject[];
}
export class UniWebViewMessageEvent extends UniWebViewBaseEvent<UniWebViewMessageEventDetail> { 
	constructor(target : UniElement, type : string, detail : UniWebViewMessageEventDetail) {
		super(target, type, detail)
	}
}


export type UniWebViewLoadEventDetail = {
  url : string;
  src : string;
}
export class UniWebViewLoadEvent extends UniWebViewBaseEvent<UniWebViewLoadEventDetail> {
	constructor(target : UniElement, type : string, detail : UniWebViewLoadEventDetail) {
		super(target, type, detail)
	}
}

//iOS和Android为了向下兼容，需要继续发送loaded事件
// #ifdef APP-IOS || APP-ANDROID
export type UniWebViewLoadedEventDetail = {
  url : string;
  src : string;
}
export class UniWebViewLoadedEvent extends UniWebViewBaseEvent<UniWebViewLoadedEventDetail> {
	constructor(target : UniElement, type : string, detail : UniWebViewLoadedEventDetail) {
		super(target, type, detail)
	}
}
// #endif

export type UniWebViewLoadingEventDetail = {
  url : string;
  src : string;
}
export class UniWebViewLoadingEvent extends UniWebViewBaseEvent<UniWebViewLoadingEventDetail> {
	constructor(target : UniElement, type : string, detail : UniWebViewLoadingEventDetail) {
		super(target, type, detail)
	}
}


export type UniWebViewDownloadEventDetail = {
  url : string;
  userAgent : string;
  contentDisposition : string;
  mimetype : string;
  contentLength : number;
}
export class UniWebViewDownloadEvent extends UniWebViewBaseEvent<UniWebViewDownloadEventDetail> { 
	constructor(target : UniElement, type : string, detail : UniWebViewDownloadEventDetail) {
		super(target, type, detail)
	}
}


export type UniWebViewContentHeightChangeEventDetail = {
  height : number;
}
export class UniWebViewContentHeightChangeEvent extends UniWebViewBaseEvent<UniWebViewContentHeightChangeEventDetail> { 
	constructor(target : UniElement, type : string, detail : UniWebViewContentHeightChangeEventDetail) {
		super(target, type, detail)
	}
}


export type UniWebViewErrorEventDetail = {
  errSubject : string;
  errCode : number;
  errMsg : string;
  url : string;
  fullUrl : string;
  src : string;
}
export class UniWebViewErrorEvent extends UniWebViewBaseEvent<UniWebViewErrorEventDetail> {
  constructor(target : UniElement, type : string, detail : UniWebViewErrorEventDetail) {
    detail.errSubject = 'uni-web-view'
    super(target, type, detail)
  }
}


// #ifdef APP-IOS
export type UniWebViewDidTerminateEventDetail = { }
export class UniWebViewDidTerminateEvent extends UniWebViewBaseEvent<UniWebViewDidTerminateEventDetail> { }
// #endif

// #ifdef APP-ANDROID || APP-IOS
export type WebViewErrorEvent = UniWebViewErrorEvent
export type WebViewLoadingEvent = UniWebViewLoadingEvent
export type WebViewLoadedEvent = UniWebViewLoadedEvent
export type WebViewDownloadEvent = UniWebViewDownloadEvent
export type WebViewMessageEvent = UniWebViewMessageEvent
export type WebViewErrorEventDetail = UniWebViewErrorEventDetail
export type WebViewLoadingEventDetail = UniWebViewLoadingEventDetail
export type WebViewLoadedEventDetail = UniWebViewLoadedEventDetail
export type WebViewDownloadEventDetail = UniWebViewDownloadEventDetail
export type WebViewMessageEventDetail = UniWebViewMessageEventDetail
// #endif