/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
 * @file Containing the common event content and attributes
 * @kit BasicServicesKit
 */
/**
 * containing the common event content and attributes
 *
 * @typedef CommonEventPublishData
 * @syscap SystemCapability.Notification.CommonEvent
 * @since 7
 */
/**
 * containing the common event content and attributes
 *
 * @typedef CommonEventPublishData
 * @syscap SystemCapability.Notification.CommonEvent
 * @atomicservice
 * @since 11
 */
/**
 * containing the common event content and attributes
 *
 * @typedef CommonEventPublishData
 * @syscap SystemCapability.Notification.CommonEvent
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export interface CommonEventPublishData {
    /**
     * bundle name
     *
     * @type { ?string }
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * bundle name
     *
     * @type { ?string }
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    bundleName?: string;
    /**
     * The custom result code of the common event.
     *
     * @type { ?number }
     * @default 0
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * The custom result code of the common event.
     *
     * @type { ?number }
     * @default 0
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    code?: number;
    /**
     * The custom result data of the common event.
     *
     * @type { ?string }
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * The custom result data of the common event.
     *
     * @type { ?string }
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    /**
     * The custom result data of the common event.
     *
     * @type { ?string }
     * @syscap SystemCapability.Notification.CommonEvent
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    data?: string;
    /**
     * The permissions for subscribers. Only subscribers with required permissions can receive published common events.
     *
     * @type { ?Array<string> }
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * The permissions for subscribers. Only subscribers with required permissions can receive published common events.
     *
     * @type { ?Array<string> }
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    subscriberPermissions?: Array<string>;
    /**
     * Whether the type of a common event is ordered or not.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    isOrdered?: boolean;
    /**
     * Whether the type of a common event is sticky or not.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    isSticky?: boolean;
    /**
     * The description of the parameters in a common event.
     *
     * @type { ?object }
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * The description of the parameters in a common event.
     *
     * @type { ?object }
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    parameters?: {
        [key: string]: any;
    };
}
