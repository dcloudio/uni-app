import {
	get_platform_name
} from './pageInfo.js'
import {
	dbSet,
	dbGet,
	dbRemove
} from './db.js'
import {
	PAGE_PVER_TIME,
	APP_PVER_TIME
} from '../config.js';
// 首次访问时间
const FIRST_VISIT_TIME_KEY = '__first__visit__time'
// 最后访问时间
const LAST_VISIT_TIME_KEY = '__last__visit__time'
/**
 * 获取当前时间
 */
export const get_time = () => {
	return parseInt(new Date().getTime() / 1000)
}

/**
 * 获取首次访问时间
 */
export const get_first_visit_time = () => {
	const timeStorge = dbGet(FIRST_VISIT_TIME_KEY)
	let time = 0
	if (timeStorge) {
		time = timeStorge
	} else {
		time = get_time()
		dbSet(FIRST_VISIT_TIME_KEY, time)
		// 首次访问需要 将最后访问时间置 0
		dbRemove(LAST_VISIT_TIME_KEY)
	}
	return time
}

/**
 * 最后访问时间
 */
export const get_last_visit_time = () => {
	const timeStorge = dbGet(LAST_VISIT_TIME_KEY)
	let time = 0
	if (timeStorge) {
		time = timeStorge
	}
	dbSet(LAST_VISIT_TIME_KEY, get_time())
	return time
}

// 页面停留时间记录key
const PAGE_RESIDENCE_TIME = '__page__residence__time'

/**
 * 设置页面停留时间
 */
export const set_page_residence_time = () => {
	let First_Page_Residence_Time = get_time()
	dbSet(PAGE_RESIDENCE_TIME, First_Page_Residence_Time)
	return First_Page_Residence_Time
}

/**
 * 获取页面停留时间
 */
export const get_page_residence_time = () => {
	let Last_Page_Residence_Time = get_time()
	let First_Page_Residence_Time = dbGet(PAGE_RESIDENCE_TIME)
	return Last_Page_Residence_Time - First_Page_Residence_Time
}

/**
 * 获取总访问次数
 */
const TOTAL_VISIT_COUNT = '__total__visit__count'
export const get_total_visit_count = () => {
	const timeStorge = dbGet(TOTAL_VISIT_COUNT)
	let count = 1
	if (timeStorge) {
		count = timeStorge
		count++
	}
	dbSet(TOTAL_VISIT_COUNT, count)
	return count
}

export const GetEncodeURIComponentOptions = (statData) => {
	let data = {}
	for (let prop in statData) {
		data[prop] = encodeURIComponent(statData[prop])
	}
	return data
}

let Set__First__Time = 0
let Set__Last__Time = 0

/**
 * 获取第一次时间
 */
export const get_first_time = () => {
	let time = new Date().getTime()
	Set__First__Time = time
	Set__Last__Time = 0
	return time
}

/**
 * 获取最后一次时间
 */
export const get_last_time = () => {
	let time = new Date().getTime()
	Set__Last__Time = time
	return time
}

/**
 * 获取页面 \ 应用停留时间
 */
export const get_residence_time = (type) => {
	let residenceTime = 0
	if (Set__First__Time !== 0) {
		residenceTime = Set__Last__Time - Set__First__Time
	}

	residenceTime = parseInt(residenceTime / 1000)
	residenceTime = residenceTime < 1 ? 1 : residenceTime
	if (type === 'app') {
		let overtime = residenceTime > APP_PVER_TIME ? true : false
		return {
			residenceTime,
			overtime,
		}
	}
	if (type === 'page') {
		let overtime = residenceTime > PAGE_PVER_TIME ? true : false
		return {
			residenceTime,
			overtime,
		}
	}
	return {
		residenceTime,
	}
}
