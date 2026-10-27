/**
	* 农历1900-2100的润大小信息表
	* @Array Of Property
	* @return Hex
	*/
/* 源数据说明：
 *   lunarYear数据来自香港天文台提供的源数据反向推导得出，其中201项数据分别对应1900-2100年。
 *   示例： 2021年 -- 0x06aa0
 *   ╭-------┰-------┰-------┰-------┰--------╮
 *   ┆ 0000  ┆ 0110  ┆ 1010  ┆ 1010  ┆ 0000   ┆
 *   ┠-------╊-------╊-------╊-------╊--------┨
 *   ┆ 20-17 ┆ 16-12 ┆ 12-9  ┆  8-5  ┆  4-1   ┆
 *   ╰-------┸-------┸-------┸-------┸--------╯
 *   1-4: 表示当年有无闰年，有的话，为闰月的月份，没有的话，为0。 2021年无闰月
 *   5-16：为除了闰月外的正常月份是大月还是小月，1为30天，0为29天。从1月到12月对应的是第16位到第5位，2021年各月天数[29,30,30,29,30,29,30,29,30,29,30,29]
 *   17-20： 表示闰月是大月还是小月，仅当存在闰月的情况下有意义。(0/1,即闰大/小月)
 */


const lunarYears = [
	0x04bd8,
	// 1901-2000
	0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0,
	0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970,
	0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566,
	0x0d4a0, 0x0ea50, 0x16a95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0,
	0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0,
	0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6,
	0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0,
	0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, 0x095b0,
	0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5,
	0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960,
	// 2001-2100
	0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950,
	0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954,
	0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0,
	0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0,
	0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, 0x14b63,
	0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, 0x092e0,
	0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, 0x052d0,
	0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, 0x0b273,
	0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, 0x0e968,
	0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, 0x0d520
]

// ['月','正','一','二','三','四','五','六','七','八','九','十','冬','腊'];
const N_STR_3 = ["\u6708", "\u6b63", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341", "\u51ac", "\u814a"]
// ['日','一','二','三','四','五','六','七','八','九','十']
const N_STR_1 = ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341"]

// ['初','十','廿','卅','闰']
const N_STR_2 = ["\u521d", "\u5341", "\u5eff", "\u5345", "\u95f0"]


export type InfoType = {
	lunarY : number;
	lunarM : number;
	lunarD : number;
	isLeap : boolean;
}

export type LunarInfoType = {
	lYear : number;
	lMonth : number;
	lDay : number;
	IMonthCn : string;
	IDayCn : string;
	cYear : number;
	cMonth : number;
	cDay : number;
	gzYear ?: string;
	gzMonth ?: string;
	gzDay ?: string;
	isToday : boolean;
	isLeap : boolean;
	nWeek ?: number;
	ncWeek ?: string;
	isTerm ?: boolean;
	Term ?: string;
	astro ?: string
}


export class Lunar {
	private lunarYearDaysMap = new Map<number, number>()
	private lunarMonthDaysMap = new Map<number, number[]>()
	constructor() { }
	/**
		* 传入农历数字月份返回汉语通俗表示法
		* @param lunar month
		* @return Cn string
		* @eg:let cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
		*/
	toChinaMonth(m : number, leap : boolean = false) : string { // 月 => \u6708
		return leap ? (N_STR_3[4] + N_STR_3[m] + N_STR_3[0]) : (N_STR_3[m] + N_STR_3[0]);
	}

	/**
		* 传入农历日期数字返回汉字表示法
		* @param lunar day
		* @return Cn string
		* @eg:let cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
		*/
	toChinaDay(d : number) : string { // 日 => \u65e5
		let s : string
		switch (d) {
			case 10:
				s = '\u521d\u5341';
				break
			case 20:
				s = '\u4e8c\u5341';
				break
			case 30:
				s = '\u4e09\u5341';
				break
			default:
				s = N_STR_2[Math.floor(d / 10)]
				s += N_STR_1[d % 10]
		}
		return (s)
	}


	/**
		* 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
		* @param lunar Year
		* @return Number (0-12)
		* @eg:let leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
		*/
	leapMonth(year : number) : number {
		return lunarYears[year - 1900] & 0xF;
	}

	/**
		* 返回农历y年闰月的天数 若该年没有闰月则返回0
		* @param lunar Year
		* @return Number (0、29、30)
		* @eg:let leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
		*/
	leapDays(year : number) : number {
		if (this.leapMonth(year) > 0) {
			return (lunarYears[year - 1900] & 0x10000) != 0 ? 30 : 29;
		}
		return 0;
	}

	// 某年份农历各月天数
	lunarMonthDays(year : number) : number[] {

		 let monthDays = this.lunarMonthDaysMap.get(year)
			if (monthDays != null) {
					return monthDays
			}

			monthDays = [];

			let lunarYear = lunarYears[year - 1900];

			for (let i = 15; i >= 4; i--) {
					let monthDay = (lunarYear >> i & 0x1) != 0 ? 30 : 29;
					monthDays.push(monthDay);
			}

			// 添加闰月
			let leapM = this.leapMonth(year);

			if (leapM > 0) monthDays.splice(leapM, 0, this.leapDays(year));
			this.lunarMonthDaysMap.set(year, monthDays)

			return monthDays;
	}


	// 某年农历天数
	lunarYearDays(year : number) : number {
		if (this.lunarYearDaysMap.has(year)) {
			return this.lunarYearDaysMap.get(year)!
		}
		let num = 0;
		this.lunarMonthDays(year).forEach(item => {
			num += item;
		});
		this.lunarYearDaysMap.set(year, num)
		return num;

	}


	/**
		* 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
		* @param y  solar year
		* @param m  solar month
		* @param d  solar day
		* @return JSON object
		* @eg:console.log(calendar.solar2lunar(1987,11,01));
		*/
	solar2lunar(y : number, m : number, d : number) : LunarInfoType { // 参数区间1900.1.31~2100.12.31
		let moonDay = this.solar_date(y, m, d);
		let lYear = moonDay.lunarY
		let lMonth = moonDay.lunarM
		let lDay = moonDay.lunarD
		let isLeap = moonDay.isLeap

		// 计算农历日期
		const IMonthCn = this.toChinaMonth(lMonth, isLeap)

		let IDayCn = lDay == 1 ? IMonthCn : this.toChinaDay(lDay)

		// 是否今天
		let isTodayObj = new Date()
		let isToday = false
		if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
			isToday = true
		}

		let info : LunarInfoType = {
			'lYear': lYear,
			'lMonth': lMonth,
			'lDay': lDay,
			'IMonthCn': IMonthCn,
			'IDayCn': IDayCn,
			'cYear': y,
			'cMonth': m,
			'cDay': d,
			'isToday': isToday,
			'isLeap': isLeap,
		}
		return info
	}

	solar_date(y : number, m : number, d : number) : InfoType { // 参数区间1900.1.31~2100.12.31

		let date = new Date(y, m - 1, d);

		// 参照日期 1901-02-19 正月初一
		let offset = (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(1901, 1, 19)) / 86400000;
		let temp = 0
		let i : number;
		for (i = 1901; i < 2101 && offset > 0; i++) {
			temp = this.lunarYearDays(i);
			offset -= temp;
		}
		if (offset < 0) {
			offset += temp;
			i--;
		}

		// 农历年、月、日
		let isLeap : boolean = false
		let j : number = 0;
		let monthDays = this.lunarMonthDays(i);
		let leapM = this.leapMonth(i);

		if (offset > 0) {
			for (j = 0; j < monthDays.length && offset > 0; j++) {
				temp = monthDays[j];
				offset -= temp;
			}
			if (offset == 0) {
				j++;
			}
			if (offset < 0) {
				offset += temp;
			}
		} else {
			// 补偿公历1901年2月的农历信息
			if (offset == -23) {
				let info : InfoType = {
					lunarY: i,
					lunarM: 12,
					lunarD: 8,
					isLeap: false
				}
				info = info
			}
		}

		// 矫正闰年月
		if (leapM > 0) {
			if (j == leapM + 1) {
				isLeap = true
			}
			if (j >= leapM + 1) {
				j--
			}
		}
		const info : InfoType = {
			lunarY: i,
			lunarM: j,
			lunarD: ++offset,
			isLeap: isLeap
		}


		return info
	}
}
