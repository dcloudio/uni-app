// #ifdef WEB
class UniCustomEvent<T> {
	detail: T
	constructor(type: string, detail: T) {
		this.type = type
		this.detail = detail
	}
}
// #endif

export type UniSwiperChangeEventDetail = { current: number; source: string; currentItemId?: string; }
export class UniSwiperChangeEvent extends UniCustomEvent<UniSwiperChangeEventDetail> {
	constructor(current: number, source: string, currentItemId: string | null) {
		const detail: UniSwiperChangeEventDetail = { current, source } as UniSwiperChangeEventDetail
		if (currentItemId != null) {
			detail.currentItemId = currentItemId
		}
		super('change', detail)
	}
}

export type UniSwiperTransitionEventDetail = { dx: number; dy: number }
export class UniSwiperTransitionEvent extends UniCustomEvent<UniSwiperTransitionEventDetail> {
	constructor(dx: number, dy: number) {
		super('transition', { dx, dy } as UniSwiperTransitionEventDetail)
	}
}

export type UniSwiperAnimationFinishEventDetail = { current: number; source: string; currentItemId?: string; }
export class UniSwiperAnimationFinishEvent extends UniCustomEvent<UniSwiperAnimationFinishEventDetail> {
	constructor(current: number, source: string, currentItemId: string | null) {
		const detail: UniSwiperAnimationFinishEventDetail = { current, source } as UniSwiperAnimationFinishEventDetail
		if (currentItemId != null) {
			detail.currentItemId = currentItemId
		}
		super('animationfinish', detail)
	}
}

export type ContainerSize = {
	containerWidth: number,
	containerHeight: number
}
