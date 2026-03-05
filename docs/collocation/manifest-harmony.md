## 鸿蒙平台配置

### modules@modules

HBuilderX 4.63之前的版本鸿蒙平台不支持根据使用情况自动添加模块，HBuilderX 4.63及之后的版本鸿蒙平台支持根据使用情况自动添加模块。注意provider机制的模块，如支付、定位仍需自行添加使用到的provider对应的模块。

可以在manifest可视化界面的鸿蒙App配置进行，其对应的源码视图在manifest.json的`app-harmony -> distribute -> modules`节点下。示例如下

注意：`HBuilderX 4.61`之前版本节点为 `uni-getLocation`

```json
{
  // ...
  "app-harmony": {
    "distribute": {
      "modules": {
        "uni-location": {
          "system": {} // 启用系统定位
        }
        // ...
      }
    }
  }
}
```

#### uni-location-system

系统定位模块，启用后uni.getLocation接口内可使用系统定位。对应manifest.json内的模块配置如下：

注意：`HBuilderX 4.61`之前版本节点为 `uni-getLocation`

```json
{
  "modules": {
    "uni-location": {
      "system": {}
    }
    // ...
  }
}
```

**注意**

- 鸿蒙平台的系统定位支持返回gcj02坐标及逆地址解析。所以对于三方SDK定位的需求不强烈
- 目前此模块会默认加载
- 使用此模块还需要配置定位权限（准确位置及大致位置），参考：[鸿蒙平台权限配置](https://uniapp.dcloud.net.cn/tutorial/harmony/runbuild.html#permission)

#### uni-map-tencent

腾讯地图模块，支持map组件内加载腾讯地图。对应manifest.json内的模块配置如下：

```json
{
  "modules": {
    "uni-map": {
      "tencent": {}
    }
    // ...
  }
}
```

**注意**

- 鸿蒙平台的腾讯地图组件如需使用定位相关能力需要依赖`uni-getLocation-system`模块， `HBuilderX 4.61+` 之后改为依赖`uni-location-system`模块

#### uni-oauth-huawei

华为登录，uni.login内使用华为登录。对应manifest.json内的模块配置如下：

```json
{
  "modules": {
    "uni-oauth": {
      "huawei": {}
    }
    // ...
  }
}
```

#### uni-payment-alipay

支付宝支付，uni.requestPayment接口使用支付宝支付。对应manifest.json内的模块配置如下：

```json
{
  "modules": {
    "uni-payment": {
      "alipay": {}
    }
    // ...
  }
}
```

#### uni-payment-wxpay

微信支付，uni.requestPayment接口使用微信支付。对应manifest.json内的模块配置如下：

```json
{
  "modules": {
    "uni-payment": {
      "wxpay": {}
    }
    // ...
  }
}
```

#### uni-push

uni-push 2.0。对应manifest.json内的模块配置如下：

```json
{
  "modules": {
    "uni-push": {}
    // ...
  }
}
```

#### uni-verify

一键登录。对应manifest.json内的模块配置如下：

```json
{
  "modules": {
    "uni-verify": {}
    // ...
  }
}
```

#### uni-facialVerify

uni实人认证。对应manifest.json内的模块配置如下：

```json
{
  "modules": {
    "uni-facialVerify": {}
    // ...
  }
}
```
