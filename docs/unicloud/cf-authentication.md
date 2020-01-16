## 获取 auth 的引用

```js
const auth = uniCloud.auth();
```

#### 获取用户信息

```js
const {
  uid, //云开发用户唯一ID
  customUserId //自定义登录传入的用户Id
} = auth.getUserInfo()
```

## 云函数生成登录凭证

开发者可以使用云函数创建登录凭证，提供给客户端进行登录操作。[详见](uniCloud/authentication.md#自定义登录)
