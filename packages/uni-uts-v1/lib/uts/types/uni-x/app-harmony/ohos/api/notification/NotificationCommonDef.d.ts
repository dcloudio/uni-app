/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http?://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file Some common definitions
 * @kit NotificationKit
 */
/**
 * Describes a BundleOption.
 *
 * @typedef BundleOption
 * @syscap SystemCapability.Notification.Notification
 * @since 9
 */
export interface BundleOption {
    /**
     * bundle name
     *
     * @type { string }
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    bundle: string;
    /**
     * user id.
     *
     * @type { ?number }
     * @syscap SystemCapability.Notification.Notification
     * @since 9
     */
    uid?: number;
}
