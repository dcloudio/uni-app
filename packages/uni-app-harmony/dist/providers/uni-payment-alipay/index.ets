import { Pay } from '@cashier_alipay/cashiersdk';
import { UniPaymentProvider, RequestPaymentOptions, RequestPaymentFail, RequestPaymentSuccess } from "@dcloudio/uni-app-harmony";
interface UniPaymentAlipayProvider extends UniPaymentProvider {
}
const errorCodeMap: Map<number, number> = new Map([
    [
        8000,
        700600
    ],
    [
        4000,
        701100
    ],
    [
        5000,
        701110
    ],
    [
        6001,
        700601
    ],
    [
        6002,
        700602
    ],
    [
        6004,
        700603
    ]
]);
class UniPaymentAlipayProviderImpl implements UniPaymentAlipayProvider {
    id: string = "alipay";
    description: string = "支付宝";
    constructor(){}
    requestPayment(options: RequestPaymentOptions) {
        new Pay().pay(options.orderInfo, true).then((res)=>{
            const errorCode = res && res.get('resultStatus');
            if (errorCode) {
                options.fail?.({
                    errCode: errorCodeMap.get(parseInt(errorCode)) ?? 700000
                } as RequestPaymentFail);
                return;
            }
            options.success?.({
                data: null
            } as RequestPaymentSuccess);
        }, (err: Error)=>{
            options.fail?.({
                errCode: 700000
            } as RequestPaymentFail);
        });
    }
}
export { UniPaymentAlipayProviderImpl as UniPaymentAlipayProviderImpl };
