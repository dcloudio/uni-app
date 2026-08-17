import { common, Want } from '@kit.AbilityKit';
import * as wxopensdk from '@tencent/wechat_open_sdk';

export class WechatMerchantTransferNativeResult {
  result: string = '';
  errMsg: string = '';
  extMsg: string = '';

  constructor(result: string, errMsg: string, extMsg: string) {
    this.result = result;
    this.errMsg = errMsg;
    this.extMsg = extMsg;
  }
}

const MERCHANT_TRANSFER_BUSINESS_TYPE: string = 'requestMerchantTransfer';
const REQUEST_TIMEOUT_MS: number = 120000;

let currentAppId: string = '';
let currentWxApi: wxopensdk.WXApi | null = null;
let pendingResolve: ((result: WechatMerchantTransferNativeResult) => void) | null = null;
let timeoutId: number = -1;

class MerchantTransferRespPayload {
  result: string | null = null;
}

function buildResult(result: string, errMsg: string, extMsg: string): WechatMerchantTransferNativeResult {
  return new WechatMerchantTransferNativeResult(result, errMsg, extMsg);
}

function getWxApi(appId: string): wxopensdk.WXApi {
  let wxApi = currentWxApi;
  if (wxApi == null || currentAppId != appId) {
    currentAppId = appId;
    wxApi = wxopensdk.WXAPIFactory.createWXAPI(appId);
    currentWxApi = wxApi;
  }
  return wxApi;
}

function clearPendingTimeout(): void {
  if (timeoutId != -1) {
    clearTimeout(timeoutId);
    timeoutId = -1;
  }
}

function finishPending(result: WechatMerchantTransferNativeResult): void {
  const resolve = pendingResolve;
  pendingResolve = null;
  clearPendingTimeout();
  if (resolve != null) {
    resolve(result);
  }
}

function parseMerchantTransferResp(extMsg: string): WechatMerchantTransferNativeResult {
  if (extMsg.length == 0) {
    return buildResult('parse_response_error', 'parse response failed', extMsg);
  }

  try {
    const payload = JSON.parse(extMsg) as MerchantTransferRespPayload;
    const result: string = payload.result ?? '';

    if (result == 'success') {
      return buildResult('success', '', extMsg);
    }
    if (result == 'fail') {
      return buildResult('fail', 'business failed', extMsg);
    }
    if (result == 'cancel') {
      return buildResult('cancel', 'business canceled', extMsg);
    }
    return buildResult('business_failed', 'unknown business result', extMsg);
  } catch (_error) {
    return buildResult('parse_response_error', 'parse response failed', extMsg);
  }
}

class WechatMerchantTransferEventHandler implements wxopensdk.WXApiEventHandler {
  onResp(resp: wxopensdk.BaseResp): void {
    if (resp instanceof wxopensdk.OpenBusinessViewResp) {
      if ("requestMerchantTransfer" === resp.businessType) {
        if (resp.errCode == wxopensdk.ErrCode.ERR_UNSUPPORTED) {
          finishPending(buildResult('wechat_version_low', resp.errStr ?? 'wechat version is too low', ''));
          return;
        }

        const businessType: string = resp.businessType ?? '';
        if (businessType != MERCHANT_TRANSFER_BUSINESS_TYPE) {
          return;
        }

        const extMsg: string = resp.extMsg ?? '';
        if (resp.errCode == wxopensdk.ErrCode.ERR_USER_CANCEL && extMsg.length == 0) {
          finishPending(buildResult('cancel', resp.errStr ?? 'business canceled', ''));
          return;
        }
        finishPending(parseMerchantTransferResp(extMsg));
      }
    }
  }

  onReq(_req: wxopensdk.BaseReq): void {
  }
}

const wxEventHandler = new WechatMerchantTransferEventHandler();

export async function requestWechatMerchantTransfer(appId: string, query: string): Promise<WechatMerchantTransferNativeResult> {
  if (appId == '') {
    return buildResult('invalid_app_id', 'appId is empty', '');
  }
  if (query == '') {
    return buildResult('invalid_query', 'query is empty', '');
  }

  const wxApi: wxopensdk.WXApi = getWxApi(appId);

  if (!wxApi.isWXAppInstalled()) {
    return buildResult('wechat_not_installed', 'wechat is not installed', '');
  }

  const req = new wxopensdk.OpenBusinessViewReq();
  req.businessType = MERCHANT_TRANSFER_BUSINESS_TYPE;
  req.query = query;

  const context = getContext() as common.UIAbilityContext;
  const responsePromise = new Promise<WechatMerchantTransferNativeResult>((resolve) => {
    if (pendingResolve != null) {
      finishPending(buildResult('request_interrupted', 'another merchant transfer request started', ''));
    }

    pendingResolve = resolve;
    timeoutId = setTimeout(() => {
      finishPending(buildResult('timeout', 'wait wechat response timeout', ''));
    }, REQUEST_TIMEOUT_MS);
  });

  try {
    const sendResult: boolean = await wxApi.sendReq(context, req);
    if (!sendResult) {
      finishPending(buildResult('open_sdk_error', 'sendReq returned false', ''));
    }
  } catch (_error) {
    finishPending(buildResult('open_sdk_error', 'sendReq failed', ''));
  }

  return responsePromise;
}

export function handleWechatMerchantTransferWant(want: Want): void {
  const wxApi = currentWxApi;
  if (wxApi == null || currentAppId.length == 0) {
    return;
  }

  wxApi.handleWant(want, wxEventHandler);
}
