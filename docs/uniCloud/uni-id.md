## 简介

`uni-id`是`uniCloud`提供的一套标准化的用户中心，我们的目标是使用`uni-id`可以轻松的对接各种各样的系统。

## 用户注册 @register

用法`uniID.register(Object user)`

**user参数说明**

| 字段		| 类型	| 必填	| 说明			|
| ---		| ---	| ---	| ---			|
| username	| String| 是	|用户名，唯一	|
| password	| String| 是	|密码			|

**响应参数**

| 字段	| 类型	| 必填	| 说明						|
| ---	| ---	| ---	| ---						|
| code	| Number| 是	|错误码，0表示成功			|
| msg	| String| 是	|详细信息					|
| token	| String| -	|注册完成自动登录之后返回的token信息|

**示例代码**

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const {
		username,
		password
	} = event
	// username、password验证是否合法的逻辑
	const res = await uniID.register({
		username,
		password
	})
	return res
}

// 客户端代码
uniCloud.callFunction({
	name: 'register',
	data: {
		username: 'username',
		password: 'user password'
	},
	success(res){
		if(res.result.code === 0) {
			uni.setStorageSync('uniIdToken',res.result.token)
			// 其他业务代码，如跳转到首页等
			uni.showToast('注册成功')
		}else {
			uni.showModal({
				content: res.result.msg,
				showCancel: false
			})
		}
	},
	fail(){
		uni.showModal({
			content: '注册失败，请稍后再试',
			showCancel: false
		})
	}
})
```


## 用户登录 @login

用法：`uniID.login(Object user)`

**user参数说明**

| 字段		| 类型	| 必填	| 说明	|
| ---		| ---	| ---	| ---	|
| username	| String| 是	|用户名	|
| password	| String| 是	|密码	|

**响应参数**

| 字段	| 类型	| 必填	| 说明						|
| ---	| ---	| ---	| ---						|
| code	| Number| 是	|错误码，0表示成功			|
| msg	| String| 是	|详细信息					|
| token	| String| -	|登录成功之后返回的token信息|

**示例代码**

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const {
		username,
		password
	} = event
	// username、password验证是否合法的逻辑
	const res = await uniID.login({
		username,
		password
	})
	return res
}

// 客户端代码
uniCloud.callFunction({
	name: 'login',
	data: {
		username: 'username',
		password: 'user password'
	},
	success(res){
		if(res.result.code === 0) {
			uni.setStorageSync('uniIdToken',res.result.token)
			// 其他业务代码，如跳转到首页等
			uni.showToast('注册成功')
		}else {
			uni.showModal({
				content: res.result.msg,
				showCancel: false
			})
		}
	},
	fail(){
		uni.showModal({
			content: '登录失败，请稍后再试',
			showCancel: false
		})
	}
})
```

## 修改密码 @update-password

用法：`uniID.updatePwd(Object passwordInfo)`

**passwordInfo参数说明**

| 字段					| 类型	| 必填	| 说明		|
| ---					| ---	| ---	| ---		|
| oldPassword			| String| 是	|旧密码		|
| newPassword			| String| 是	|新密码		|
| passwordConfirmation	| String| 是	|确认新密码	|

**响应参数**

| 字段	| 类型	| 必填	| 说明						|
| ---	| ---	| ---	| ---						|
| code	| Number| 是	|错误码，0表示成功			|
| msg	| String| 是	|详细信息					|

**示例代码**

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const {
		oldPassword,
		newPassword,
		passwordConfirmation
	} = event
	// 校验新密码与确认新密码是否一致
	const res = await uniID.updatePwd({
		oldPassword,
		newPassword,
		passwordConfirmation
	})
	return res
}

// 客户端代码
uniCloud.callFunction({
	name: 'updatePwd',
	data: {
		oldPassword: 'oldPassword',
		newPassword: 'newPassword',
		passwordConfirmation: 'confirmed new password'
	},
	success(res){
		if(res.result.code === 0) {
			// 修改成功跳转到登录页面
		}else {
			uni.showModal({
				content: res.result.msg,
				showCancel: false
			})
		}
	},
	fail(){
		uni.showModal({
			content: '修改失败，请稍后再试',
			showCancel: false
		})
	}
})
```