import { Pay } from '@cashier_alipay/cashiersdk';
import { UniPaymentProvider, RequestPaymentOptions, RequestPaymentSuccess, RequestPaymentFail } from "@dcloudio/uni-app-runtime";
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
            if (errorCode === '9000') {
                options.success?.({
                    data: null
                } as RequestPaymentSuccess);
                return;
            }
            options.fail?.({
                errCode: errorCodeMap.get(parseInt(errorCode!)) ?? 700000
            } as RequestPaymentFail);
        }, (err: Error)=>{
            options.fail?.({
                errCode: 700000
            } as RequestPaymentFail);
        });
    }
}
export { UniPaymentAlipayProviderImpl as UniPaymentAlipayProviderImpl };
