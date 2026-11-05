export function parsePxRpx(margin: string): number {
	if (margin.length == 0) {
		return 0
	}
	if (margin.endsWith('px')) {
		return parseFloat(margin)
	}
	if (margin.endsWith('rpx')) {
		return parseFloat(margin) * (750 / uni.getWindowInfo().windowWidth)
	}
	return 0
}

export function getDirection(vertical: boolean): string {
	return vertical ? 'Y' : 'X'
}