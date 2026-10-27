import { BusinessError } from '@kit.BasicServicesKit'
import { calendarManager } from '@kit.CalendarKit'

const NATIVE_SUCCESS = 0
const NATIVE_CONTEXT_UNAVAILABLE = 501
const NATIVE_ADD_FAILED = 503
const NATIVE_REPEAT_ADD_FAILED = 504
const NATIVE_USER_CANCELED = 509

export class NativeCalendarOptions {
	title : string
	startTime : number
	endTime : number
	allDay : boolean
	notes : string | null
	location : string | null
	alarm : boolean
	alarmOffset : number | null
	repeatInterval : string | null
	repeatEndTime : number | null

	constructor(title : string, startTime : number, endTime : number, allDay : boolean, notes : string | null,
		location : string | null, alarm : boolean, alarmOffset : number | null, repeatInterval : string | null,
		repeatEndTime : number | null) {
		this.title = title
		this.startTime = startTime
		this.endTime = endTime
		this.allDay = allDay
		this.notes = notes
		this.location = location
		this.alarm = alarm
		this.alarmOffset = alarmOffset
		this.repeatInterval = repeatInterval
		this.repeatEndTime = repeatEndTime
	}
}

export class CalendarNative {
	private static toReminderMinutes(alarmOffsetSeconds : number | null) : number {
		if (alarmOffsetSeconds == null) {
			return 0
		}
		if (alarmOffsetSeconds <= 0) {
			return 0
		}
		return Math.trunc((alarmOffsetSeconds + 59) / 60)
	}

	static addEvent(options : NativeCalendarOptions) : Promise<number> {
		return CalendarNative.editEvent(options)
	}

	static editEvent(options : NativeCalendarOptions) : Promise<number> {
		return new Promise<number>((resolve : (value : number) => void, _reject : (error : Error) => void) => {
			let context : Context | undefined = getContext()
			if (context == null) {
				resolve(NATIVE_CONTEXT_UNAVAILABLE)
				return
			}
			let manager = calendarManager.getCalendarManager(context)
			manager.editEvent(CalendarNative.createEvent(options)).then((eventId : number) => {
				if (eventId > 0) {
					resolve(NATIVE_SUCCESS)
					return
				}
				resolve(NATIVE_USER_CANCELED)
			}).catch((error : BusinessError) => {
				if (CalendarNative.isCanceled(error)) {
					resolve(NATIVE_USER_CANCELED)
					return
				}
				resolve(options.repeatInterval != null ? NATIVE_REPEAT_ADD_FAILED : NATIVE_ADD_FAILED)
			})
		})
	}

	private static createEvent(options : NativeCalendarOptions) : calendarManager.Event {
		const event : calendarManager.Event = {
			title: options.title,
			type: calendarManager.EventType.NORMAL,
			startTime: options.startTime,
			endTime: options.endTime,
			isAllDay: options.allDay
		}
		if (options.location != null) {
			event.location = {
				location: options.location,
				latitude: 0,
				longitude: 0
			} as calendarManager.Location
		}
		if (options.notes != null) {
			event.description = options.notes
		}
		if (options.alarm && options.alarmOffset != null) {
			event.reminderTime = [CalendarNative.toReminderMinutes(options.alarmOffset)]
		}
		if (options.repeatInterval != null) {
			const recurrenceRule : calendarManager.RecurrenceRule = {
				recurrenceFrequency: CalendarNative.mapFrequency(options.repeatInterval)
			}
			if (options.repeatEndTime != null) {
				recurrenceRule.expire = options.repeatEndTime
			}
			event.recurrenceRule = recurrenceRule
		}
		return event
	}

	private static isCanceled(error : BusinessError) : boolean {
		const message = error.message.toLowerCase()
		return message.indexOf('cancel') >= 0
	}

	private static mapFrequency(interval : string) : calendarManager.RecurrenceFrequency {
		switch (interval) {
			case 'day':
				return calendarManager.RecurrenceFrequency.DAILY
			case 'week':
				return calendarManager.RecurrenceFrequency.WEEKLY
			case 'month':
				return calendarManager.RecurrenceFrequency.MONTHLY
			default:
				return calendarManager.RecurrenceFrequency.YEARLY
		}
	}
}
