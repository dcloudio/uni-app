// 查找父组件实例
export function $dispatch(
	context : ComponentPublicInstance,
	componentName : string,
	eventName : string,
	...params : any[]
) {
	let parent = context.$parent
	let name = parent?.$options?.name
	while (parent != null && (name == null || componentName != name)) {
		parent = parent.$parent
		if (parent != null) {
			name = parent.$options.name
		}
	}
	if (parent != null) {
		parent.$callMethod(eventName, ...params)
	}
}
