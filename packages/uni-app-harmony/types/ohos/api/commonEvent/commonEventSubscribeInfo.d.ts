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
 * @file The information of the subscriber
 * @kit BasicServicesKit
 */
/**
 * the information of the subscriber
 *
 * @typedef CommonEventSubscribeInfo
 * @syscap SystemCapability.Notification.CommonEvent
 * @since 7
 */
/**
 * the information of the subscriber
 *
 * @typedef CommonEventSubscribeInfo
 * @syscap SystemCapability.Notification.CommonEvent
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export interface CommonEventSubscribeInfo {
    /**
     * Indicates the subscribed events.
     *
     * @type { Array<string> }
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * Indicates the subscribed events.
     *
     * @type { Array<string> }
     * @syscap SystemCapability.Notification.CommonEvent
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    events: Array<string>;
    /**
     * The permission that the publisher must have in order to send a common event to this subscriber.
     * This subscriber receives only common events sent by publishers granted with this permission.
     *
     * @type { ?string }
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * The permission that the publisher must have in order to send a common event to this subscriber.
     * This subscriber receives only common events sent by publishers granted with this permission.
     *
     * @type { ?string }
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    publisherPermission?: string;
    /**
     * deviceId Indicates the device ID. The value must be an existing device ID on the same ohos network.
     *
     * @type { ?string }
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * deviceId Indicates the device ID. The value must be an existing device ID on the same ohos network.
     *
     * @type { ?string }
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    publisherDeviceId?: string;
    /**
     * Indicates the user ID. This parameter is optional, and the default value is the ID of the
     * current user. If this parameter is specified, the value must be an existing user ID in the system.
     *
     * @type { ?number }
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * Indicates the user ID. This parameter is optional, and the default value is the ID of the
     * current user. If this parameter is specified, the value must be an existing user ID in the system.
     *
     * @type { ?number }
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    userId?: number;
    /**
     * Indicates the subscriber priority. The value ranges from -100 to 1000.
     *
     * @type { ?number }
     * @syscap SystemCapability.Notification.CommonEvent
     * @since 7
     */
    /**
     * Indicates the subscriber priority. The value ranges from -100 to 1000.
     *
     * @type { ?number }
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    priority?: number;
    /**
     * Specify the publisher's bundleName to subscribe.
     *
     * @type { ?string }
     * @syscap SystemCapability.Notification.CommonEvent
     * @atomicservice
     * @since 11
     */
    publisherBundleName?: string;
}
