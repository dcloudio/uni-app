// 定义 Friction 类，用于模拟物体在摩擦力作用下的运动

export type Speed = {
	x : number,
	y : number
}
export class Friction {
	mass : number
	frictionForce : number
	startTime : number
	velocity : Speed
	acceleration : Speed
	startPosition : Speed
	endPosition : Speed | null = null
	lastTimeElapsed : number | null = null
	totalTimeToStop : number = 0
	// 构造函数，初始化物体的质量（m）、摩擦力大小（f，这里假设是牛顿单位的力，但乘以1000可能是为了转换为某种特定单位）
	constructor(mass : number, frictionForce : number) {
		this.mass = mass; // 物体的质量
		this.frictionForce = 1000 * frictionForce; // 摩擦力大小，转换为某种特定单位（例如毫牛顿）
		this.startTime = 0; // 运动开始的时间戳
		this.velocity = { x: 0, y: 0 }; // 物体的速度
		this.acceleration = { x: 0, y: 0 }; // 物体的加速度
		this.startPosition = { x: 0, y: 0 }; // 物体的起始位置
		this.endPosition = null; // 物体的结束位置，初始化为 null
		this.lastTimeElapsed = null; // 上次计算时的时间间隔，初始化为 null
	}

	// 设置物体的速度
	setVelocity(x : number, y : number) {
		const speed = Math.sqrt(x * x + y * y); // 计算速度的大小
		this.velocity = { x, y }; // 设置速度
		// 根据摩擦力计算加速度（这里假设摩擦力与速度方向相反，大小与速度成正比，但实际上应该是与正压力成正比）
		// 注意：这里的加速度计算可能不准确，因为它没有考虑物体的质量
		this.acceleration = {
			x: -this.frictionForce * x / speed,
			y: -this.frictionForce * y / speed
		};
		// 计算物体停止所需的总时间（这里假设加速度恒定，实际上可能因速度减小而变化）
		this.totalTimeToStop = Math.abs(x / this.acceleration.x)
		if (Number.isNaN(this.totalTimeToStop)) {
			this.totalTimeToStop = Math.abs(y / this.acceleration.y)
		}
		if (Number.isNaN(this.totalTimeToStop)) {
			this.totalTimeToStop = 0
		}
		this.startTime = Date.now(); // 记录开始时间
		this.lastTimeElapsed = null; // 重置上次时间间隔
	}

	// 设置物体的起始位置
	setStartPosition(x : number, y : number) {
		this.startPosition = { x, y };
	}

	// 设置物体的结束位置
	setEndPosition(x : number, y : number) {
		this.endPosition = { x, y };
	}

	// 计算并返回物体在时间 t 时的位置
	positionAtTime(t : number | null) : Speed {
		if (t == null) {
			t = (Date.now() - this.startTime) / 1000; // 如果未提供时间，则计算当前时间
		}
		if (t > this.totalTimeToStop) {
			t = this.totalTimeToStop; // 如果时间超过总停止时间，则使用总停止时间
			this.lastTimeElapsed = t; // 更新上次时间间隔
		}
		// 使用运动学公式计算位置
		var x = this.velocity.x * t + 0.5 * this.acceleration.x * t * t + this.startPosition.x;
		var y = this.velocity.y * t + 0.5 * this.acceleration.y * t * t + this.startPosition.y;
		// 如果物体已经到达或超过结束位置，则将其位置设置为结束位置
		if ((this.acceleration.x > 0 && x < this.endPosition!.x) || (this.acceleration.x < 0 && x > this.endPosition!.x)) {
			x = this.endPosition!.x;
		}
		if ((this.acceleration.y > 0 && y < this.endPosition!.y) || (this.acceleration.y < 0 && y > this.endPosition!.y)) {
			y = this.endPosition!.y;
		}
		return { x, y } as Speed;
	}

	// 计算并返回物体在时间 t 时的速度
	velocityAtTime(t : number | null) {
		if (t == null) {
			t = (Date.now() - this.startTime) / 1000; // 如果未提供时间，则计算当前时间
		}
		if (t > this.totalTimeToStop) {
			t = this.totalTimeToStop; // 如果时间超过总停止时间，则使用总停止时间
		}
		// 使用运动学公式计算速度
		return {
			dx: this.velocity.x + this.acceleration.x * t,
			dy: this.velocity.y + this.acceleration.y * t
		};
	}

	// 计算物体停止前的位移量（这里的方法名可能不准确，因为 delta 通常表示变化量）
	// 注意：这个方法可能是错误的，因为它基于一个不准确的加速度公式
	displacement() : Speed {
		// 由于加速度计算可能不准确，这里的位移计算也可能是错误的
		// 返回一个基于不准确加速度公式的位移量
		var tx = (-1.5 * Math.pow(this.velocity.x, 2) / this.acceleration.x)
		if (Number.isNaN(tx)) {
			tx = 0
		}
		var ty = (-1.5 * Math.pow(this.velocity.y, 2) / this.acceleration.y)
		if (Number.isNaN(ty)) {
			ty = 0
		}
		return {
			x: tx,
			y: ty
		} as Speed;
	}

	// 计算物体停止所需的时间（这个方法实际上是多余的，因为已经在 setVelocity 中计算过了）
	timeToStop() {
		return -this.velocity.x / this.acceleration.x; // 这里只考虑了 x 方向，y 方向应该类似
		// 注意：由于加速度可能为零（当速度为零时），这里可能需要添加一些错误处理
	}

	// 检查物体是否已经停止或到达结束位置
	isDone() {
		// 注意：这里缺少了一个名为 e 的函数，它可能是用来比较两个浮点数是否接近的
		// 由于我们没有这个函数，我们将使用简单的比较来代替
		const currentPosition = this.positionAtTime(null);
		return (
			currentPosition.x === this.endPosition!.x &&
			currentPosition.y === this.endPosition!.y ||
			this.lastTimeElapsed === this.totalTimeToStop
		);
	}

	// 重新配置物体的质量和摩擦力大小
	reconfigure(mass : number, frictionForce : number) {
		this.mass = mass;
		this.frictionForce = 1000 * frictionForce; // 更新摩擦力大小
		// 注意：这里没有重新计算加速度，因为加速度是在 setVelocity 中根据当前速度计算的
	}
}