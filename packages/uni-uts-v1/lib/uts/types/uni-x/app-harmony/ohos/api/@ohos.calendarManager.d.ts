/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 * @kit CalendarKit
 */
import { AsyncCallback } from './@ohos.base';
import type Context from './application/Context';
/**
 * This provides calendar data access abilities.
 * @namespace calendarManager
 * @syscap SystemCapability.Applications.CalendarData
 * @since 10
 */
/**
 * This provides calendar data access abilities.
 * @namespace calendarManager
 * @syscap SystemCapability.Applications.CalendarData
 * @atomicservice
 * @since 11
 */
declare namespace calendarManager {
    /**
     * Returns an instance of CalendarManager
     *
     * @param { Context } context - Hap context information
     * @returns { CalendarManager } Instance of CalendarManager
     * @syscap SystemCapability.Applications.CalendarData
     * @StageModelOnly
     * @since 10
     */
    /**
     * Returns an instance of CalendarManager
     *
     * @param { Context } context - Hap context information
     * @returns { CalendarManager } Instance of CalendarManager
     * @syscap SystemCapability.Applications.CalendarData
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    function getCalendarManager(context: Context): CalendarManager;
    /**
     * Defines the CalendarManager class and provides functions to access the calendar data.
     *
     * @typedef CalendarManager
     * @syscap SystemCapability.Applications.CalendarData
     * @since 10
     */
    /**
     * Defines the CalendarManager class and provides functions to access the calendar data.
     *
     * @typedef CalendarManager
     * @syscap SystemCapability.Applications.CalendarData
     * @atomicservice
     * @since 11
     */
    export interface CalendarManager {
        /**
         * Create calendar instance.
         * @permission ohos.permission.WRITE_CALENDAR or ohos.permission.WRITE_WHOLE_CALENDAR
         * @param { CalendarAccount } calendarAccount - calendar account to create calendar
         * @returns { Promise<Calendar> } the promise with calendar corresponding to account
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        createCalendar(calendarAccount: CalendarAccount): Promise<Calendar>;
        /**
         * Create calendar instance.
         *
         * @permission ohos.permission.WRITE_CALENDAR or ohos.permission.WRITE_WHOLE_CALENDAR
         * @param { CalendarAccount } calendarAccount - calendar account to create calendar
         * @param { AsyncCallback<Calendar> } callback - the callback of createCalendar
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        createCalendar(calendarAccount: CalendarAccount, callback: AsyncCallback<Calendar>): void;
        /**
         * Delete calendar instance.
         *
         * @permission ohos.permission.WRITE_CALENDAR or ohos.permission.WRITE_WHOLE_CALENDAR
         * @param { Calendar } calendar - calendar to be deleted
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        deleteCalendar(calendar: Calendar): Promise<void>;
        /**
         * Delete calendar instance.
         *
         * @permission ohos.permission.WRITE_CALENDAR or ohos.permission.WRITE_WHOLE_CALENDAR
         * @param { Calendar } calendar - calendar to be deleted
         * @param { AsyncCallback<void> } callback - the callback of deleteCalendar
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        deleteCalendar(calendar: Calendar, callback: AsyncCallback<void>): void;
        /**
         * Get calendar instance from database.
         *
         * @permission ohos.permission.READ_CALENDAR or ohos.permission.READ_WHOLE_CALENDAR
         * @param { CalendarAccount } calendarAccount - specify calendar account to retrieve
         * @returns { Promise<Calendar> } the promise returned by the function.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Get calendar instance from database.
         *
         * @permission ohos.permission.READ_CALENDAR or ohos.permission.READ_WHOLE_CALENDAR
         * @param { CalendarAccount } calendarAccount - specify calendar account to retrieve
         * @returns { Promise<Calendar> } the promise returned by the function.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        getCalendar(calendarAccount?: CalendarAccount): Promise<Calendar>;
        /**
         * Get calendar instance from database by specified account.
         *
         * @permission ohos.permission.READ_CALENDAR or ohos.permission.READ_WHOLE_CALENDAR
         * @param { CalendarAccount } calendarAccount - specify calendar account to retrieve
         * @param { AsyncCallback<Calendar> } callback - the callback of getCalendar
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Get calendar instance from database by specified account.
         *
         * @permission ohos.permission.READ_CALENDAR or ohos.permission.READ_WHOLE_CALENDAR
         * @param { CalendarAccount } calendarAccount - specify calendar account to retrieve
         * @param { AsyncCallback<Calendar> } callback - the callback of getCalendar
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        getCalendar(calendarAccount: CalendarAccount, callback: AsyncCallback<Calendar>): void;
        /**
         * Get default calendar instance from database.
         *
         * @permission ohos.permission.READ_CALENDAR or ohos.permission.READ_WHOLE_CALENDAR
         * @param { AsyncCallback<Calendar> } callback - the callback of getCalendar with default calendar instance
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Get default calendar instance from database.
         *
         * @permission ohos.permission.READ_CALENDAR or ohos.permission.READ_WHOLE_CALENDAR
         * @param { AsyncCallback<Calendar> } callback - the callback of getCalendar with default calendar instance
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        getCalendar(callback: AsyncCallback<Calendar>): void;
        /**
         * Get all calendar instance.
         *
         * @permission ohos.permission.READ_CALENDAR or ohos.permission.WRITE_WHOLE_CALENDAR
         * @returns { Promise<Calendar[]> } the promise returned by the function.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        getAllCalendars(): Promise<Calendar[]>;
        /**
         * Get all calendar instance.
         *
         * @permission ohos.permission.READ_CALENDAR or ohos.permission.READ_WHOLE_CALENDAR
         * @param {AsyncCallback<Calendar[]>} callback - the callback of getAllCalendars
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        getAllCalendars(callback: AsyncCallback<Calendar[]>): void;
        /**
         * Create a single event,invoking this interface will open the event creation page.
         *
         * @param { Event } event - Indicates the information about a single event.
         * @returns { Promise<number> } the promise with event id.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 12
         */
        editEvent(event: Event): Promise<number>;
    }
    /**
     * Describes a calendar instance.
     * @typedef Calendar
     * @syscap SystemCapability.Applications.CalendarData
     * @since 10
     */
    /**
     * Describes a calendar instance.
     * @typedef Calendar
     * @syscap SystemCapability.Applications.CalendarData
     * @atomicservice
     * @since 11
     */
    export interface Calendar {
        /**
         * Id of the calendar
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Id of the calendar
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        readonly id: number;
        /**
         * Add a single event.
         * @param { Event } event - Indicates the information about a single event.
         * @returns { Promise<number> } The event ID.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Add a single event.
         * @param { Event } event - Indicates the information about a single event.
         * @returns { Promise<number> } The event ID.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        addEvent(event: Event): Promise<number>;
        /**
         * Add a single event.
         * @param { Event } event - a single event to add.
         * @param { AsyncCallback<number> } callback - callback of addEvent.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Add a single event.
         * @param { Event } event - a single event to add.
         * @param { AsyncCallback<number> } callback - callback of addEvent.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        addEvent(event: Event, callback: AsyncCallback<number>): void;
        /**
         * Add multiple events.
         * @param { Event[] } events - multiple events to add.
         * @returns { Promise<void> } The promise returned by function.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        addEvents(events: Event[]): Promise<void>;
        /**
         * Add multiple events.
         * @param { Event[] } events - Indicates the information about multiple events.
         * @param { AsyncCallback<void> } callback - The callback of addEvents
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        addEvents(events: Event[], callback: AsyncCallback<void>): void;
        /**
         * Delete a single event.
         * @param { number } id - Indicates the ID of an event.
         * @returns { Promise<void> } The promise returned by function.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        deleteEvent(id: number): Promise<void>;
        /**
         * Delete a single event.
         * @param { number } id - Indicates the ID of an event.
         * @param {AsyncCallback<void>} callback - The callback of deleteEvent.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        deleteEvent(id: number, callback: AsyncCallback<void>): void;
        /**
         * Delete multiple events.
         * @param { number[] } ids - The id array of multiple events.
         * @returns { Promise<void> } The promise returned by function.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        deleteEvents(ids: number[]): Promise<void>;
        /**
         * Delete multiple events.
         * @param { number[] } ids - Indicates the IDs of multiple events.
         * @param {AsyncCallback<void>} callback - The callback of deleteEvents.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        deleteEvents(ids: number[], callback: AsyncCallback<void>): void;
        /**
         * Update a single event.
         * @param { Event } event - Indicates the information about a single event.
         * @returns { Promise<void> } The promise returned by function.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        updateEvent(event: Event): Promise<void>;
        /**
         * Update a single event.
         * @param { Event } event - Indicates the information about a single event.
         * @param { AsyncCallback<void> } callback - The callback of updateEvent.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        updateEvent(event: Event, callback: AsyncCallback<void>): void;
        /**
         * Query events based on filter conditions.
         * @param { EventFilter } eventFilter - Indicates the filtering conditions of events.
         * @param { (keyof Event)[] } eventKey - Expected column to be returned.
         * @returns { Promise<Event[]> } Information about events that match the filter conditions.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        getEvents(eventFilter?: EventFilter, eventKey?: (keyof Event)[]): Promise<Event[]>;
        /**
         * Query events based on filter conditions.
         * @param { EventFilter } eventFilter - Indicates the filtering conditions of events.
         * @param { (keyof Event)[] } eventKey - Expected column to be returned.
         * @param { AsyncCallback<Event[]> } callback - The callback of getEvents.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        getEvents(eventFilter: EventFilter, eventKey: (keyof Event)[], callback: AsyncCallback<Event[]>): void;
        /**
         * Query all events with all column from current calendar instance.
         * @param { AsyncCallback<Event[]> } callback - The callback of getEvents with all events.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        getEvents(callback: AsyncCallback<Event[]>): void;
        /**
         * Get calendar configure.
         * @returns { CalendarConfig } configure of current calendar.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        getConfig(): CalendarConfig;
        /**
         * Set calendar configure.
         * @param { CalendarConfig } config - calendar config to set
         * @returns { Promise<void> } The promise returned by function.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        setConfig(config: CalendarConfig): Promise<void>;
        /**
         * Set calendar configure.
         * @param { CalendarConfig } config - calendar config to set
         * @param { AsyncCallback<void> } callback - callback of setConfig
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        setConfig(config: CalendarConfig, callback: AsyncCallback<void>): void;
        /**
         * Get calendar account.
         * @returns { CalendarAccount } calendar account of current calendar.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        getAccount(): CalendarAccount;
    }
    /**
     * Describes a calendar account.
     * @typedef CalendarAccount
     * @syscap SystemCapability.Applications.CalendarData
     * @since 10
     */
    /**
     * Describes a calendar account.
     * @typedef CalendarAccount
     * @syscap SystemCapability.Applications.CalendarData
     * @atomicservice
     * @since 11
     */
    interface CalendarAccount {
        /**
         * Name of the calendar
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Name of the calendar
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        readonly name: string;
        /**
         * Type of the calendar
         * @type { CalendarType }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Type of the calendar
         * @type { CalendarType }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        type: CalendarType;
        /**
         * DisplayName of the calendar
         * @type { ?string }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * DisplayName of the calendar
         * @type { ?string }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        displayName?: string;
    }
    /**
     * Describes a calendar configuration.
     * @typedef CalendarConfig
     * @syscap SystemCapability.Applications.CalendarData
     * @since 10
     */
    interface CalendarConfig {
        /**
         * Whether the calendar provides a reminder
         * @type { ?boolean }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        enableReminder?: boolean;
        /**
         * Color of the calendar
         * @type { ?(number | string) }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        color?: number | string;
    }
    /**
     * Describes an event information.
     * @typedef Event
     * @syscap SystemCapability.Applications.CalendarData
     * @since 10
     */
    /**
     * Describes an event information.
     * @typedef Event
     * @syscap SystemCapability.Applications.CalendarData
     * @atomicservice
     * @since 11
     */
    interface Event {
        /**
         * Id of the event
         * @type { ?number }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Id of the event
         * @type { ?number }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        id?: number;
        /**
         * Type of the event
         * @type { EventType }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Type of the event
         * @type { EventType }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        type: EventType;
        /**
         * Title of the event
         * @type { ?string }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Title of the event
         * @type { ?string }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        title?: string;
        /**
         * Location of the event
         * @type { ?Location }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Location of the event
         * @type { ?Location }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        location?: Location;
        /**
         * start time of the event
         * @type { number }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * start time of the event
         * @type { number }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        startTime: number;
        /**
         * end time of the event
         * @type { number }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * end time of the event
         * @type { number }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        endTime: number;
        /**
         * Whether the event is allDay
         * @type { ?boolean }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Whether the event is allDay
         * @type { ?boolean }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        isAllDay?: boolean;
        /**
         * Attendees of the event
         * @type { ?Attendee[] }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Attendees of the event
         * @type { ?Attendee[] }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        attendee?: Attendee[];
        /**
         * TimeZone of the event
         * @type { ?string }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * TimeZone of the event
         * @type { ?string }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        timeZone?: string;
        /**
         * Reminder time of the event
         * @type { ?number[] }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Reminder time of the event
         * @type { ?number[] }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        reminderTime?: number[];
        /**
         * RecurrenceRule of the event
         * @type { ?RecurrenceRule }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * RecurrenceRule of the event
         * @type { ?RecurrenceRule }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        recurrenceRule?: RecurrenceRule;
        /**
         * Description of the event
         * @type { ?string }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Description of the event
         * @type { ?string }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        description?: string;
        /**
         * Service of the event
         * @type { ?EventService }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Service of the event
         * @type { ?EventService }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        service?: EventService;
        /**
         * Unique identifier of the event
         * @type { ?string }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 12
         */
        identifier?: string;
        /**
         * Whether the event is lunar.
         * @type { ?boolean }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 12
         */
        isLunar?: boolean;
    }
    /**
     * Enum for all calendar type.
     * @enum { string }
     * @syscap SystemCapability.Applications.CalendarData
     * @since 10
     */
    /**
     * Enum for all calendar type.
     * @enum { string }
     * @syscap SystemCapability.Applications.CalendarData
     * @atomicservice
     * @since 11
     */
    enum CalendarType {
        /**
         * Local calendar
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Local calendar
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        LOCAL = 'local',
        /**
         * Email calendar
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Email calendar
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        EMAIL = 'email',
        /**
         * Birthday calendar
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Birthday calendar
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        BIRTHDAY = 'birthday',
        /**
         * CalDAV calendar
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * CalDAV calendar
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        CALDAV = 'caldav',
        /**
         * Subscribed calendar
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Subscribed calendar
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        SUBSCRIBED = 'subscribed'
    }
    /**
     * Location of an event.
     * @typedef Location
     * @syscap SystemCapability.Applications.CalendarData
     * @since 10
     */
    /**
     * Location of an event.
     * @typedef Location
     * @syscap SystemCapability.Applications.CalendarData
     * @atomicservice
     * @since 11
     */
    interface Location {
        /**
         * Location of the event
         * @type { ?string }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Location of the event
         * @type { ?string }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        location?: string;
        /**
         * Longitude of the location
         * @type { ?number }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Longitude of the location
         * @type { ?number }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        longitude?: number;
        /**
         * Latitude of the location
         * @type { ?number }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Latitude of the location
         * @type { ?number }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        latitude?: number;
    }
    /**
     * Provides the abilities to retrive event filter.
     * @syscap SystemCapability.Applications.CalendarData
     * @since 10
     */
    class EventFilter {
        /**
         * Filter events by event id.
         * @param {number[]} ids id array to retrieve
         * @returns { EventFilter } Returns the EventFilter with ids.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        static filterById(ids: number[]): EventFilter;
        /**
         * Filter events by event start time and end time.
         * @param { number } start - start time of query range
         * @param { number } end - end time of query range
         * @returns { EventFilter } Returns the EventFilter with time range.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        static filterByTime(start: number, end: number): EventFilter;
        /**
         * Filter events by event title.
         * @param { string } title - event title to query
         * @returns {EventFilter } Returns the EventFilter with title.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        static filterByTitle(title: string): EventFilter;
    }
    /**
     * Enum for supported events type.
     * @enum { number }
     * @syscap SystemCapability.Applications.CalendarData
     * @since 10
     */
    /**
     * Enum for supported events type.
     * @enum { number }
     * @syscap SystemCapability.Applications.CalendarData
     * @atomicservice
     * @since 11
     */
    enum EventType {
        /**
         * normal event.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * normal event.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        NORMAL = 0,
        /**
         * important event.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * important event.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        IMPORTANT = 1
    }
    /**
     * Defines the recurrence rule of event
     * @typedef RecurrenceRule
     * @syscap SystemCapability.Applications.CalendarData
     * @since 10
     */
    /**
     * Defines the recurrence rule of event
     * @typedef RecurrenceRule
     * @syscap SystemCapability.Applications.CalendarData
     * @atomicservice
     * @since 11
     */
    export interface RecurrenceRule {
        /**
         * RecurrenceFrequency of recurrence event.
         * @type { RecurrenceFrequency }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * RecurrenceFrequency of recurrence event.
         * @type { RecurrenceFrequency }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        recurrenceFrequency: RecurrenceFrequency;
        /**
         * Expiration time of recurrence event.
         * @type { ?number }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Expiration time of recurrence event.
         * @type { ?number }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        expire?: number;
        /**
         * Repetition count of recurrence event.
         * @type { ?number }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 12
         */
        count?: number;
        /**
         * Repeat interval of recurrence event.
         * @type { ?number }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 12
         */
        interval?: number;
        /**
         * Excluded dates of recurrence event.
         * @type { ?number[] }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 12
         */
        excludedDates?: number[];
    }
    /**
     * Enum for the recurrence type by different period
     * @enum { number }
     * @syscap SystemCapability.Applications.CalendarData
     * @since 10
     */
    /**
     * Enum for the recurrence type by different period
     * @enum { number }
     * @syscap SystemCapability.Applications.CalendarData
     * @atomicservice
     * @since 11
     */
    export enum RecurrenceFrequency {
        /**
         * The event repeats every year.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * The event repeats every year.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        YEARLY = 0,
        /**
         * The event repeats every month.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * The event repeats every month.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        MONTHLY = 1,
        /**
         * The event repeats every week.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * The event repeats every week.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        WEEKLY = 2,
        /**
         * The event repeats every day.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * The event repeats every day.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        DAILY = 3
    }
    /**
     * Defines the attendee information
     * @typedef Attendee
     * @syscap SystemCapability.Applications.CalendarData
     * @since 10
     */
    /**
     * Defines the attendee information
     * @typedef Attendee
     * @syscap SystemCapability.Applications.CalendarData
     * @atomicservice
     * @since 11
     */
    export interface Attendee {
        /**
         * Name of the Attendee.
         * @type { string }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Name of the Attendee.
         * @type { string }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        name: string;
        /**
         * Email of the Attendee.
         * @type { string }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Email of the Attendee.
         * @type { string }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        email: string;
        /**
         * Role of the Attendee.
         * @type { ?AttendeeRole }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 12
         */
        role?: AttendeeRole;
    }
    /**
     * Enum for the attendee role
     * @enum { string }
     * @syscap SystemCapability.Applications.CalendarData
     * @atomicservice
     * @since 12
     */
    export enum AttendeeRole {
        /**
         * The organizer of a meeting.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 12
         */
        ORGANIZER = 'organizer',
        /**
         * The participant of a meeting.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 12
         */
        PARTICIPANT = 'participant'
    }
    /**
     * Defines event service information
     * @typedef EventService
     * @syscap SystemCapability.Applications.CalendarData
     * @since 10
     */
    /**
     * Defines event service information
     * @typedef EventService
     * @syscap SystemCapability.Applications.CalendarData
     * @atomicservice
     * @since 11
     */
    export interface EventService {
        /**
         * Type of the EventService.
         * @type { ServiceType }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Type of the EventService.
         * @type { ServiceType }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        type: ServiceType;
        /**
         * Uri of the EventService.
         * @type { string }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Uri of the EventService.
         * @type { string }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        uri: string;
        /**
         * Description of the EventService.
         * @type { ?string }
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Description of the EventService.
         * @type { ?string }
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        description?: string;
    }
    /**
     * Defines event service type
     * @enum { string }
     * @syscap SystemCapability.Applications.CalendarData
     * @since 10
     */
    /**
     * Defines event service type
     * @enum { string }
     * @syscap SystemCapability.Applications.CalendarData
     * @atomicservice
     * @since 11
     */
    export enum ServiceType {
        /**
         * Meeting event.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Meeting event.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        MEETING = 'Meeting',
        /**
         * Watch drama event.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Watch drama event.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        WATCHING = 'Watching',
        /**
         * Repayment event.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Repayment event.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        REPAYMENT = 'Repayment',
        /**
         * Live event.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Live event.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        LIVE = 'Live',
        /**
         * Shopping event.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Shopping event.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        SHOPPING = 'Shopping',
        /**
         * trip event.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * trip event.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        TRIP = 'Trip',
        /**
         * Class event.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Class event.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        CLASS = 'Class',
        /**
         * Sports game event.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Sports game event.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        SPORTS_EVENTS = 'SportsEvents',
        /**
         * Sports exercise event.
         * @syscap SystemCapability.Applications.CalendarData
         * @since 10
         */
        /**
         * Sports exercise event.
         * @syscap SystemCapability.Applications.CalendarData
         * @atomicservice
         * @since 11
         */
        SPORTS_EXERCISE = 'SportsExercise'
    }
}
export default calendarManager;
