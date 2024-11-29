/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
 * @kit BasicServicesKit
 */
import { Callback } from './@ohos.base';
/**
 * Provides methods for sending and processing in-process events.
 *
 * @namespace emitter
 * @syscap SystemCapability.Notification.Emitter
 * @since 7
 */
/**
 * Provides methods for sending and processing in-process events.
 *
 * @namespace emitter
 * @syscap SystemCapability.Notification.Emitter
 * @atomicservice
 * @since 11
 */
/**
 * Provides methods for sending and processing in-process events.
 *
 * @namespace emitter
 * @syscap SystemCapability.Notification.Emitter
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare namespace emitter {
    /**
     * Subscribe to a certain event in persistent manner and receives the event callback.
     *
     * @param { InnerEvent } event - indicate event to subscribe to.
     * @param { Callback<EventData> } callback - indicate callback used to receive the event.
     * @syscap SystemCapability.Notification.Emitter
     * @since 7
     */
    /**
     * Subscribe to a certain event in persistent manner and receives the event callback.
     *
     * @param { InnerEvent } event - indicate event to subscribe to.
     * @param { Callback<EventData> } callback - indicate callback used to receive the event.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    function on(event: InnerEvent, callback: Callback<EventData>): void;
    /**
     * Subscribe to a event by specific id in persistent manner and receives the event callback.
     *
     * @param { string } eventId - indicate ID of the event to subscribe to.
     * @param { Callback<EventData> } callback - indicate callback used to receive the event.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    function on(eventId: string, callback: Callback<EventData>): void;
    /**
     * Subscribe to a event by specific id in persistent manner and receives the event callback.
     *
     * @param { string } eventId - indicate ID of the event to subscribe to.
     * @param { Callback<GenericEventData<T>> } callback - indicate callback used to receive the event.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function on<T>(eventId: string, callback: Callback<GenericEventData<T>>): void;
    /**
     * Subscribe to a certain event in one-shot manner and unsubscribe from it
     * after the event callback is received.
     *
     * @param { InnerEvent } event - indicate event to subscribe to in one shot.
     * @param { Callback<EventData> } callback - indicate callback used to receive the event.
     * @syscap SystemCapability.Notification.Emitter
     * @since 7
     */
    /**
     * Subscribe to a certain event in one-shot manner and unsubscribe from it
     * after the event callback is received.
     *
     * @param { InnerEvent } event - indicate event to subscribe to in one shot.
     * @param { Callback<EventData> } callback - indicate callback used to receive the event.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    function once(event: InnerEvent, callback: Callback<EventData>): void;
    /**
     * Subscribe to a event by specific id in one-shot manner and unsubscribe from it
     * after the event callback is received.
     *
     * @param { string } eventId - indicate ID of the event to subscribe to in one shot.
     * @param { Callback<EventData> } callback - indicate callback used to receive the event.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    function once(eventId: string, callback: Callback<EventData>): void;
    /**
     * Subscribe to a event by specific id in one-shot manner and unsubscribe from it
     * after the event callback is received.
     *
     * @param { string } eventId - indicate ID of the event to subscribe to in one shot.
     * @param { Callback<GenericEventData<T>> } callback - indicate callback used to receive the event.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function once<T>(eventId: string, callback: Callback<GenericEventData<T>>): void;
    /**
     * Unsubscribe from an event.
     *
     * @param { number } eventId - indicate ID of the event to unsubscribe from.
     * @syscap SystemCapability.Notification.Emitter
     * @since 7
     */
    /**
     * Unsubscribe from an event.
     *
     * @param { number } eventId - indicate ID of the event to unsubscribe from.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    function off(eventId: number): void;
    /**
     * Unsubscribe from an event.
     *
     * @param { string } eventId - indicate ID of the event to unsubscribe from.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    function off(eventId: string): void;
    /**
     * Unsubscribe from an event.
     *
     * @param { number } eventId - indicates ID of the event to unsubscribe from.
     * @param { Callback<EventData> } callback - indicates callback used to receive the event.
     * @syscap SystemCapability.Notification.Emitter
     * @since 10
     */
    /**
     * Unsubscribe from an event.
     *
     * @param { number } eventId - indicates ID of the event to unsubscribe from.
     * @param { Callback<EventData> } callback - indicates callback used to receive the event.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    function off(eventId: number, callback: Callback<EventData>): void;
    /**
     * Unsubscribe from an event.
     *
     * @param { string } eventId - indicates ID of the event to unsubscribe from.
     * @param { Callback<EventData> } callback - indicates callback used to receive the event.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    function off(eventId: string, callback: Callback<EventData>): void;
    /**
     * Unsubscribe specified callback function  from an event.
     *
     * @param { string } eventId - indicates ID of the event to unsubscribe from.
     * @param { Callback<GenericEventData<T>> } callback - indicates callback used to receive the event.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function off<T>(eventId: string, callback: Callback<GenericEventData<T>>): void;
    /**
     * Emits an event to the event queue.
     *
     * @param { InnerEvent } event - indicate event to emit.
     * @param { EventData } [data] - indicate data carried by the event.
     * @syscap SystemCapability.Notification.Emitter
     * @since 7
     */
    /**
     * Emits an event to the event queue.
     *
     * @param { InnerEvent } event - indicate event to emit.
     * @param { EventData } [data] - indicate data carried by the event.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    function emit(event: InnerEvent, data?: EventData): void;
    /**
     * Emits an event by specific id to the event queue.
     *
     * @param { string } eventId - indicate ID of the event to emit.
     * @param { EventData } [data] - indicate data carried by the event.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    function emit(eventId: string, data?: EventData): void;
    /**
     * Emits an event by specific id to the event queue.
     *
     * @param { string } eventId - indicate ID of the event to emit.
     * @param { GenericEventData<T> } [data] - indicate data carried by the event.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function emit<T>(eventId: string, data?: GenericEventData<T>): void;
    /**
     * Emits an event by specific id to the event queue.
     *
     * @param { string } eventId - indicate ID of the event to emit.
     * @param { Options } options - Indicates the {@link Options} option of the emit priority of the event.
     * @param { EventData } [data] - indicate data carried by the event.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    function emit(eventId: string, options: Options, data?: EventData): void;
    /**
     * Emits an event by specific id to the event queue.
     *
     * @param { string } eventId - indicate ID of the event to emit.
     * @param { Options } options - Indicates the {@link Options} option of the emit priority of the event.
     * @param { GenericEventData<T> } [data] - indicate data carried by the event.
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function emit<T>(eventId: string, options: Options, data?: GenericEventData<T>): void;
    /**
     * Obtains the number of subscribe listener count.
     *
     * @param { number | string } eventId - indicates ID of the event to unsubscribe from.
     * @returns { number } Returns the number of listener count.
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    function getListenerCount(eventId: number | string): number;
    /**
     * Describes data passed in the event.
     *
     * @typedef EventData
     * @syscap SystemCapability.Notification.Emitter
     * @since 7
     */
    /**
     * Describes data passed in the event.
     *
     * @typedef EventData
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    /**
     * Describes data passed in the event.
     *
     * @typedef EventData
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export interface EventData {
        /**
         * Data carried by the event.
         *
         * @type { ?object }
         * @syscap SystemCapability.Notification.Emitter
         * @since 7
         */
        /**
         * Data carried by the event.
         *
         * @type { ?object }
         * @syscap SystemCapability.Notification.Emitter
         * @atomicservice
         * @since 11
         */
        data?: {
            [key: string]: any;
        };
    }
    /**
     * Describes an intra-process event.
     *
     * @typedef InnerEvent
     * @syscap SystemCapability.Notification.Emitter
     * @since 7
     */
    /**
     * Describes an intra-process event.
     *
     * @typedef InnerEvent
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    /**
     * Describes an intra-process event.
     *
     * @typedef InnerEvent
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export interface InnerEvent {
        /**
         * Event ID, which is used to identify an event.
         *
         * @type { number }
         * @syscap SystemCapability.Notification.Emitter
         * @since 7
         */
        /**
         * Event ID, which is used to identify an event.
         *
         * @type { number }
         * @syscap SystemCapability.Notification.Emitter
         * @atomicservice
         * @since 11
         */
        eventId: number;
        /**
         * Emit priority of the event. The default priority is {@link EventPriority.LOW}.
         *
         * @type { ?EventPriority }
         * @syscap SystemCapability.Notification.Emitter
         * @since 7
         */
        /**
         * Emit priority of the event. The default priority is {@link EventPriority.LOW}.
         *
         * @type { ?EventPriority }
         * @syscap SystemCapability.Notification.Emitter
         * @atomicservice
         * @since 11
         */
        priority?: EventPriority;
    }
    /**
     * Indicates the emit priority of the event.
     *
     * @enum { number }
     * @syscap SystemCapability.Notification.Emitter
     * @since 7
     */
    /**
     * Indicates the emit priority of the event.
     *
     * @enum { number }
     * @syscap SystemCapability.Notification.Emitter
     * @atomicservice
     * @since 11
     */
    /**
     * Indicates the emit priority of the event.
     *
     * @enum { number }
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export enum EventPriority {
        /**
         * Indicates that the event will be emitted immediately.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @since 7
         */
        /**
         * Indicates that the event will be emitted immediately.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @atomicservice
         * @since 11
         */
        IMMEDIATE = 0,
        /**
         * Indicates that the event will be emitted before low-priority events.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @since 7
         */
        /**
         * Indicates that the event will be emitted before low-priority events.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @atomicservice
         * @since 11
         */
        HIGH,
        /**
         * Indicates that the event will be emitted before idle-priority events. By default, an event is in LOW priority.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @since 7
         */
        /**
         * Indicates that the event will be emitted before idle-priority events. By default, an event is in LOW priority.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @atomicservice
         * @since 11
         */
        LOW,
        /**
         * Indicates that the event will be emitted after all the other events.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @since 7
         */
        /**
         * Indicates that the event will be emitted after all the other events.
         *
         * @syscap SystemCapability.Notification.Emitter
         * @atomicservice
         * @since 11
         */
        IDLE
    }
    /**
     * Describe the optional arguments of emit operation.
     *
     * @typedef Options
     * @syscap SystemCapability.Notification.Emitter
     * @since 11
     */
    /**
     * Describe the optional arguments of emit operation.
     *
     * @typedef Options
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export interface Options {
        /**
         * Emit priority of the event. The default priority is {@link EventPriority.LOW}.
         *
         * @type { ?EventPriority }
         * @syscap SystemCapability.Notification.Emitter
         * @atomicservice
         * @since 11
         */
        priority?: EventPriority;
    }
    /**
     * Describes data passed in the event.
     *
     * @typedef GenericEventData<T>
     * @syscap SystemCapability.Notification.Emitter
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export interface GenericEventData<T> {
        /**
         * Data carried by the event.
         *
         * @type { ?T }
         * @syscap SystemCapability.Notification.Emitter
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        data?: T;
    }
}
export default emitter;
