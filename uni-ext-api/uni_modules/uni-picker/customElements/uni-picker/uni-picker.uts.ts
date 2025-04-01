
type UniPickerCancelEventDetail = {}
type UniPickerSelectorChangeEventDetail = {
	value : number
}
type UniPickerMultiSelectorChangeEventDetail = {
	value : number[]
}
type UniPickerTimeChangeEventDetail = {
	value : string
}
type UniPickerColumnChangeEventDetail = {
	value : number
	column : number
}

/**
 * 取消事件触发
 */
export class UniPickerCancelEvent extends UniCustomEvent<UniPickerCancelEventDetail> {
	constructor() {
		super('cancel', {
			detail: {}
		} as UniCustomEventOptions<UniPickerCancelEventDetail>)
	}
}

/**
 * 单列 change 事件触发
 */
export class UniPickerSelectorCancelEvent extends UniCustomEvent<UniPickerSelectorChangeEventDetail> {
	constructor(value : number) {
		super('change', {
			detail: { value } as UniPickerSelectorChangeEventDetail
		} as UniCustomEventOptions<UniPickerSelectorChangeEventDetail>)
	}
}


/**
 * 多列change事件触发
 */
export class UniPickermultiSelectorCancelEvent extends UniCustomEvent<UniPickerMultiSelectorChangeEventDetail> {
	constructor(value : number[]) {
		super('change', {
			detail: { value } as UniPickerMultiSelectorChangeEventDetail
		} as UniCustomEventOptions<UniPickerMultiSelectorChangeEventDetail>)
	}
}


/**
 * 时间日期 change 事件触发
 */
export class UniPickerTimeCancelEvent extends UniCustomEvent<UniPickerTimeChangeEventDetail> {
	constructor(value : string) {
		super('change', {
			detail: { value } as UniPickerTimeChangeEventDetail
		} as UniCustomEventOptions<UniPickerTimeChangeEventDetail>)
	}
}


/**
 * 列改变 columnchange 事件触发
 */
export class UniPickerColumnChangeEvent extends UniCustomEvent<UniPickerColumnChangeEventDetail> {
	constructor(column : number, value : number) {
		super('columnchange', {
			detail: { value, column } as UniPickerColumnChangeEventDetail
		} as UniCustomEventOptions<UniPickerColumnChangeEventDetail>)
	}
}

export class UniPickerElement extends UniFormControlElement<any> implements UniCustomElement {
	static get observedAttributes() : Array<string> {
		return [
			/* 通用属性 */
			'headerText',
			'disabled',
			'mode',
			'bindcancel',
			'start',
			'end',
			// mode 为 selector 或 multiSelector 时，range 有效
			'range',
			// 当 range 是一个 Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容
			'rangeKey',
			'value',
		]
	}

	private uuid : string
	private _value : any = ''
	private _initialValue : any = ''
	private _initialValueFlag = false
	constructor() {
		super()
		this.uuid = `${Date.now()}${Math.floor(Math.random() * 1e7)}`
		const baseEventName = `uni_action_sheet_${this.uuid}`
		const readyEventName = `${baseEventName}_ready`
		const optionsEventName = `${baseEventName}_options`
		const cancelEventName = `${baseEventName}_cancel`
		const selectorChangeEventName = `${baseEventName}_selector_change`
		const multiSelectorChangeEventName = `${baseEventName}_multiSelector_change`
		const timeChangeEventName = `${baseEventName}_time_change`
		const columnChangeEventName = `${baseEventName}_column_change`

		this.addEventListener('click', () => {
			// 禁用picker
			if(this.disabledType) return
			uni.openDialogPage({
				url: `/uni_modules/uni-picker/pages/picker/picker?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&cancelEventName=${cancelEventName}&selectorChangeEventName=${selectorChangeEventName}&multiSelectorChangeEventName=${multiSelectorChangeEventName}&timeChangeEventName=${timeChangeEventName}&columnChangeEventName=${columnChangeEventName}`,
				success() { },
				fail() {
					uni.$off(readyEventName)
					uni.$off(optionsEventName)
				}
			})
		})

		// 监听页面加载
		uni.$on(readyEventName, () => {
			this.sendOptions(optionsEventName)
		})

		// 监听取消按钮
		uni.$on(cancelEventName, () => {
			this.dispatchEvent(new UniPickerCancelEvent())
		})

		// 单列change触发
		uni.$on(selectorChangeEventName, (value : number) => {
			this._value = value
			this.dispatchEvent(new UniPickerSelectorCancelEvent(value))
		})

		// 多列change触发
		uni.$on(multiSelectorChangeEventName, (value : number[]) => {
			this._value = value
			this.dispatchEvent(new UniPickermultiSelectorCancelEvent(value))
		})

		// 日期时间change触发
		uni.$on(timeChangeEventName, (value : string) => {
			this._value = value
			this.dispatchEvent(new UniPickerTimeCancelEvent(value))
		})

		// 列滚动columnchange 触发
		uni.$on(columnChangeEventName, (column : number, value : number) => {
			this.dispatchEvent(new UniPickerColumnChangeEvent(column, value))
		})
	}

	sendOptions(eventName : string) {
		let baseParams = {
			headerText: this.headerTextType,
			mode: this.modeType,
		}
		switch (this.modeType) {
			case 'selector':
				baseParams.range = this.rangeType
				baseParams.rangeKey = this.rangeKeyType
				baseParams.selectorValue = this.selectorValue
				break
			case 'multiSelector':
				baseParams.range = this.rangeType
				baseParams.rangeKey = this.rangeKeyType
				baseParams.multiSelectorValue = this.multiSelectorValue
				break
			case 'time':
				baseParams.timeValue = this.timeValue
				baseParams.start = this.timeStartVal
				baseParams.end = this.timeEndVal
				break
			case 'date':
				baseParams.dateValue = this.dateValue
				baseParams.fields = this.fieldsVal
				baseParams.start = this.dateStartVal
				baseParams.end = this.dateEndVal
		}

		uni.$emit(eventName, baseParams)
	}

	connectedCallback() { }

	disconnectedCallback() { }

	attributeChangedCallback(name : string) {
		switch (name) {
			// 普通选择器
			case 'value':

				let value : any = ''

				if (this.modeType == 'selector') {
					value = this.selectorValue
				}

				if (this.modeType == 'multiSelector') {
					value = this.multiSelectorValue
				}

				if (this.modeType == 'time') {
					value = this.timeValue
				}

				if (this.modeType == 'date') {
					value = this.dateValue
				}

				if (!this._initialValueFlag) {
					this._initialValueFlag = true
					this._initialValue = value
				}
				this._value = value
				break
		}
	}

	/**
	 * form 表单传值
	 */
	override get value() : any {
		return this._value
	}

	/**
	 * form 表单值重置
	 */
	override reset() {
		this._value = this._initialValue
	}

	get headerTextType() {
		return this.getAttribute('header-text') as string ?? ''
	}
	get disabledType() {
		const disabled = this.getAttribute('disabled') as string
		if (disabled == null) {
			return false
		}
		return disabled == 'true' || disabled == '' ? true : false
	}
	get modeType() {
		return this.getAttribute('mode') as string ?? 'selector'
	}

	get rangeType() {
		let range = this.getAnyAttribute('range')
		return range ?? []
	}
	get rangeKeyType() {
		return this.getAttribute('range-key') ?? ''
	}
	get selectorValue() : number {
		return Number(this.getAttribute('value') ?? 0)
	}
	get multiSelectorValue() {
		let value = this.getAnyAttribute('value')
		return value ?? []
	}
	get timeValue() {
		const now = new Date();
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		// 格式化为 ['02', '10']
		const timeArray = [hours, minutes];
		let time = this.getAttribute('value')
		let val : string[]
		if (time) {
			let timeval = time.split(':')
			if (time.length < 2) {
				val = timeArray
			} else {
				val = this.formatteTime(timeval)
			}
		} else {
			val = timeArray
		}
		return val
	}
	get timeStartVal() {
		return this.parseStartAndEndTime('start')
	}
	get timeEndVal() {
		return this.parseStartAndEndTime('end')
	}
	get dateStartVal() {
		return this.parseStartAndEndDate('start')
	}
	get dateEndVal() {
		return this.parseStartAndEndDate('end')
	}
	get dateValue() {
		const today = this.parseTime(new Date())
		let date = this.getAttribute('value')
		let date_data : string[] = []
		if (date != '' && date != null) {
			let date_val = date.split('-') as string[]

			while (date_val.length < 3) {
				date_val.push('1');
			}
			const year = Number(date_val[0]);
			if (
				year < 1900 || // 下限校验
				year > 2100    // 上限校验
			) {
				date_val[0] = "2001"; // 设为默认值
			}

			try {
				const year = Number(date_val[0])
				const month = Number(date_val[1])
				const day = Number(date_val[2])
				date_data = this.parseTime(new Date(year, month - 1, day))
			} catch (_) {
				date_data = today
			}

		} else {
			date_data = today
		}
		return date_data
	}

	get fieldsVal() {
		return this.getAttribute('fields') ?? 'day'
	}

	formatteTime(time : string[]) {
		const formattedHours = String(time[0]).padStart(2, '0');
		const formattedMinutes = String(time[1]).padStart(2, '0');
		return [formattedHours, formattedMinutes]
	}

	parseTime(date : Date) : string[] {
		// 格式化为YY-MM-DD（两位数补零）
		const year = (date.getFullYear()).toString().padStart(2, '0'); // 取年份后两位
		const month = (date.getMonth() + 1).toString().padStart(2, '0');    // 月份范围1-12
		const day = date.getDate().toString().padStart(2, '0');
		return [year, month, day]
	}

	parseStartAndEndTime(timeStr : string) {
		let time = this.getAttribute(timeStr)
		let defualtVal = ['00', '00']
		if (timeStr == 'end') {
			defualtVal = ['23', '59']
		}
		let val : string[]
		if (time) {
			let timeval = time.split(':')
			if (time.length < 2) {
				val = defualtVal
			} else {
				val = this.formatteTime(timeval)
			}
		} else {
			return defualtVal
		}
		return val
	}

	parseStartAndEndDate(type : 'start' | 'end') : string[] {
		let dateStr = this.getAttribute(type)
		// 默认值设置
		const defaultDate = type == 'start'
			? ['1970', '01', '01']  // 起始默认日期
			: ['2099', '12', '31']; // 结束默认日期

		// 空值直接返回默认
		if (!dateStr) return defaultDate;

		// 分割日期字符串
		const parts = dateStr.split('-');
		if (parts.length != 3) return defaultDate;

		// 格式化各部分（补零 + 截取）
		const formatPart = (value : string, length : number) => {
			return value.padStart(length, '0').slice(0, length);
		};

		const year = formatPart(parts[0], 4);  // 年份补足4位
		const month = formatPart(parts[1], 2); // 月份补足2位
		const day = formatPart(parts[2], 2);   // 日期补足2位

		return [year, month, day];
	}
}