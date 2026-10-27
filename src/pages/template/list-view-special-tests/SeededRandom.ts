export class SeededRandom {
	private state: number = 0

	constructor(seed: number) {
		this.state = seed
	}

	next(): number {
		this.state = this.state + 0x6D2B79F5
		let t = this.state
		t = Math.imul(t ^ (t >>> 15), t | 1)
		t = t ^ (t + Math.imul(t ^ (t >>> 7), t | 61))
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296
	}

	int(min: number, max: number): number {
		return min + Math.floor(this.next() * (max - min + 1))
	}

	shuffle(list: number[]): number[] {
		for (let i = list.length - 1; i > 0; i--) {
			const j = this.int(0, i)
			const temp = list[i]
			list[i] = list[j]
			list[j] = temp
		}
		return list
	}
}
