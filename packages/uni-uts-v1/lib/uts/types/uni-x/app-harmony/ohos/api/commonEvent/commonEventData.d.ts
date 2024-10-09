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
 * @file The data of the commonEvent
 * @kit BasicServicesKit
 */
/**
 * the data of the commonEvent
 *
 * @typedef CommonEventData
 * @syscap SystemCapability.Notification.CommonEvent
 * @since 7
 */
/**
 * the data of the commonEvent
 *
 * @typedef CommonEventData
 * @syscap SystemCapability.Notification.CommonEvent
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export interface CommonEventData {
    /**
     * event type
     *
     * @type { string }
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * event type
     *
     * @type { string }
     * @syscap SystemCapability.Notification.CommonEvent
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    event: string;
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
