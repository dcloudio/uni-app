# UTS 常见错误修复建议

本文档用于汇总 UTS 开发中的常见编译/类型错误，并给出可直接落地的修复方式。

## 可选属性直接返回导致类型不匹配 @error1

- 问题描述：当函数返回值声明为 `number`，但返回的是可选属性（可能为空）时，编译器会报类型不匹配。

复现代码：

```ts
type UserProfile = {
	age? : number
}
function getUserAge() : number {
	const userProfile : UserProfile = {
	}
	return userProfile.age
}
```

修复代码：为可选属性提供兜底值，确保返回值始终为 `number`。

```ts
type UserProfile = {
	age? : number
}
function getUserAge() : number {
	const userProfile : UserProfile = {
	}
	return userProfile.age ?? 0
}
```
