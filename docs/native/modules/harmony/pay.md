## Payment

### 支付宝支付

#### 配置依赖

依赖har包：`@uni_modules/uni-payment-alipay`，此har包未发布到鸿蒙ohpm需要自行到任意uni-app-x项目编译到鸿蒙的产物（`unpackage/dist/dev/app-harmony/libs/uni_modules__uni_oauth_huawei.har`）内拷贝到鸿蒙原生项目。

在鸿蒙原生项目`oh-package.json5`文件内`dependencies`字段下添加如下内容：

```json
"@uni_modules/uni-payment-alipay": "./libs/uni_modules__uni_payment_alipay.har",
```

#### 注册模块

在uni_modules入口文件`index.generated.ets`内注册支付宝支付provider。

```typescript
import { registerUniProvider, uni } from "@dcloudio/uni-app-x-runtime";
import { UniPaymentAlipayProviderImpl } from '@uni_modules/uni-payment-alipay'

export function initUniModules() {
  initUniExtApi();
}

function initUniExtApi() {
  registerUniProvider('payment', 'alipay', new UniPaymentAlipayProviderImpl())
}
```

### 微信支付

#### 配置依赖

依赖har包：`@uni_modules/uni-payment-wxpay`，此har包未发布到鸿蒙ohpm需要自行到任意uni-app-x项目编译到鸿蒙的产物（`unpackage/dist/dev/app-harmony/libs/uni_modules__uni_payment_wxpay.har`）内拷贝到鸿蒙原生项目。

在鸿蒙原生项目`oh-package.json5`文件内`dependencies`字段下添加如下内容：

```json
"@uni_modules/uni-payment-wxpay": "./libs/uni_modules__uni_payment_wxpay.har",
```

#### 注册模块

在uni_modules入口文件`index.generated.ets`内注册微信支付provider。

```typescript
import { registerUniProvider, uni } from "@dcloudio/uni-app-x-runtime";
import { UniPaymentWxpayProviderImpl } from '@uni_modules/uni-payment-wxpay'
export function initUniModules() {
  initUniExtApi();
}
function initUniExtApi() {
  registerUniProvider('payment', 'wxpay', new UniPaymentWxpayProviderImpl())
}
```
