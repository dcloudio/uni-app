export type ComboboxPopup = {
	close : () => void,
	// #ifdef APP
	onPageInteraction : (event : UniEvent) => void
	// #endif
}

const activePopups = new WeakMap<UniPage, ComboboxPopup>()

// #ifdef APP
const stopPageListeners = new WeakMap<UniPage, () => void>()

export function listenToPopupPage(page : UniPage, root : UniElement) {
	if (stopPageListeners.has(page)) return
	const dispatch = (event : UniEvent) => {
		activePopups.get(page)?.onPageInteraction(event)
	}
	const types = ['click', 'touchstart', 'touchmove']
	const callbacks = types.map((type : string) => root.addEventListener(type, dispatch))
	stopPageListeners.set(page, () => {
		types.forEach((type : string, index : number) => {
			root.removeEventListener(type, callbacks[index])
		})
	})
}
// #endif

export function activatePopup(page : UniPage, popup : ComboboxPopup) {
	const previous = activePopups.get(page)
	if (previous == popup) return
	activePopups.set(page, popup)
	previous?.close()
}

export function deactivatePopup(page : UniPage, popup : ComboboxPopup) {
	if (activePopups.get(page) != popup) return
	activePopups.delete(page)
	// #ifdef APP
	// 等原生事件分发结束再移除监听。同页切换时继续复用。
	setTimeout(() => {
		if (activePopups.has(page)) return
		stopPageListeners.get(page)?.()
		stopPageListeners.delete(page)
	}, 0)
	// #endif
}
