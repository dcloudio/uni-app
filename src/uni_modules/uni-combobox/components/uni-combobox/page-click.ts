type PageClickSubscriber = {
	active : boolean,
	handler : (event : UniPointerEvent) => void
}

type PageClickListener = {
	root : UniElement,
	callback : UniCallbackWrapper,
	subscribers : Set<PageClickSubscriber>
}

export type PageClickSubscription = {
	activate : () => void,
	deactivate : () => void,
	dispose : () => void
}

// 使用所属页面作为键，避免依赖不同组件取得的原生节点包装对象是否相同。
const pageClickListeners = new WeakMap<UniPage, PageClickListener>()

/** 为组合框创建页面点击订阅；原生监听在同一页面内共享。 */
export function createPageClickSubscription(
	page : UniPage,
	root : UniElement,
	handler : (event : UniPointerEvent) => void
) : PageClickSubscription {
	let listener = pageClickListeners.get(page)
	if (listener == null) {
		const subscribers = new Set<PageClickSubscriber>()
		const callback = root.addEventListener('click', (event : UniEvent) => {
			// 关闭或卸载可能修改订阅集合，只分发给本次点击开始时处于活动状态的实例。
			const activeSubscribers = Array.from(subscribers).filter((subscriber) => subscriber.active)
			activeSubscribers.forEach((subscriber) => {
				if (subscriber.active && subscribers.has(subscriber)) {
					subscriber.handler(event as UniPointerEvent)
				}
			})
		})
		listener = { root, callback, subscribers }
		pageClickListeners.set(page, listener)
	}
	const currentListener = listener
	const subscriber : PageClickSubscriber = { active: false, handler }
	currentListener.subscribers.add(subscriber)
	let disposed = false

	return {
		activate: () => {
			if (!disposed) subscriber.active = true
		},
		deactivate: () => {
			subscriber.active = false
		},
		dispose: () => {
			if (disposed) return
			disposed = true
			subscriber.active = false
			currentListener.subscribers.delete(subscriber)
			if (currentListener.subscribers.size == 0) {
				// 避免在原生事件分发栈内移除监听；期间新增订阅时继续复用原监听。
				setTimeout(() => {
					if (currentListener.subscribers.size == 0 && pageClickListeners.get(page) == currentListener) {
						currentListener.root.removeEventListener('click', currentListener.callback)
						pageClickListeners.delete(page)
					}
				}, 0)
			}
		}
	}
}
