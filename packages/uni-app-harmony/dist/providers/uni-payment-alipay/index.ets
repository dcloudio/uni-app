import { Pay } from '@cashier_alipay/cashiersdk';
import { UniPaymentProvider, RequestPaymentOptions, RequestPaymentSuccess, RequestPaymentFail } from "@dcloudio/uni-app-harmony";
interface UniPaymentAlipayProvider extends UniPaymentProvider {
}
class UniPaymentAlipayProviderImpl implements UniPaymentAlipayProvider {
    id: string = "alipay";
    description: string = "Alipay";
    constructor(){}
    requestPayment(options: RequestPaymentOptions) {
        new Pay().pay(options.orderInfo, true).then(()=>{
            options.success && options.success({
                data: null
            } as RequestPaymentSuccess);
        }, (err: Error)=>{
            options.fail && options.fail({
                errCode: 701100
            } as RequestPaymentFail);
        });
    }
}
export { UniPaymentAlipayProviderImpl as UniPaymentAlipayProviderImpl };
