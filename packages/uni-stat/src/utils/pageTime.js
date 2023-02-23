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
} from '../config.ts';
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
let First_Page_Residence_Time = 0
let Last_Page_Residence_Time = 0

/**
 * 设置页面停留时间
 */
export const set_page_residence_time = () => {
	First_Page_Residence_Time = get_time()
	dbSet(PAGE_RESIDENCE_TIME, First_Page_Residence_Time)
	return First_Page_Residence_Time
}

/**
 * 获取页面停留时间
 */
export const get_page_residence_time = () => {
	Last_Page_Residence_Time = get_time()
	First_Page_Residence_Time = dbGet(PAGE_RESIDENCE_TIME)
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


const FIRST_TIME = '__first_time'
/**
 * 设置页面首次访问时间，用户获取页面/应用停留时常
 */
export const set_first_time = () => {
	// 获取当前时间 ，以下代码获取到是毫秒级时间戳 ，实际上用到是秒级时间戳，所以需要除以1000
	// const time = new Date().getTime()
	let time = get_time()
	const timeStorge = dbSet(FIRST_TIME,time)
	return timeStorge
}

/**
 * 获取最后一次时间 ，暂时用不到，直接获取当前时间即可
 */
// export const get_last_time = () => {
// 	let time = new Date().getTime()
// 	Set__Last__Time = time
// 	return time
// }

/**
 * 获取页面 \ 应用停留时间
 */
export const get_residence_time = (type) => {
	let residenceTime = 0
	const first_time = dbGet(FIRST_TIME)
	const last_time = get_time()
	if (first_time !== 0) {
		residenceTime = last_time - first_time
	}
	// 将毫秒级时间戳转换为秒级时间戳，因为直接获取的是秒级时间戳，所以不需要转换
	// residenceTime = parseInt(residenceTime / 1000)
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
