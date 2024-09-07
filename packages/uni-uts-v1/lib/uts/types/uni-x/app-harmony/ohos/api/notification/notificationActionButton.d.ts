/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file Describes an action button displayed in a notification
 * @kit NotificationKit
 */
import { NotificationUserInput } from './notificationUserInput';
import { WantAgent } from '../@ohos.wantAgent';
/**
 * Describes an action button displayed in a notification.
 *
 * @typedef NotificationActionButton
 * @syscap SystemCapability.Notification.Notification
 * @since 7
 */
export interface NotificationActionButton {
    /**
     * Button title.
     *
     * @type { string }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    title: string;
    /**
     * WantAgent of the button.
     *
     * @type { WantAgent }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    wantAgent: WantAgent;
    /**
     * Extra information of the button.
     *
     * @type { ?object }
     * @syscap SystemCapability.Notification.Notification
     * @since 7
     */
    extras?: {
        [key: string]: any;
    };
    /**
     * User input
     *
     * @type { ?NotificationUserInput }
     * @syscap SystemCapability.Notification.Notification
     * @since 8
     */
    userInput?: NotificationUserInput;
}
