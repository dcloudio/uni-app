/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 * @file Provides the capability to manage OAID
 * @kit AdsKit
 */
import type { AsyncCallback } from './@ohos.base';
/**
 * Provides the capability to manage OAID.
 * @namespace identifier
 * @syscap SystemCapability.Advertising.OAID
 * @since 10
 */
declare namespace identifier {
    /**
     * Obtain the OAID with callback.
     * Obtaining OAID requires the permission:ohos.permission.APP_TRACKING_CONSENT, otherwise the obtained OAID is 00000000-0000-0000-0000-000000000000.
     * @permission ohos.permission.APP_TRACKING_CONSENT
     * @param { AsyncCallback<string> } callback - The callback to get the OAID.
     * @throws { BusinessError } 17300001 - System internal error.
     * @syscap SystemCapability.Advertising.OAID
     * @since 10
     */
    function getOAID(callback: AsyncCallback<string>): void;
    /**
     * Obtain the OAID with promise.
     * Obtaining OAID requires the permission:ohos.permission.APP_TRACKING_CONSENT, otherwise the obtained OAID is 00000000-0000-0000-0000-000000000000.
     * @permission ohos.permission.APP_TRACKING_CONSENT
     * @returns { Promise<string> } promise - Returns the OAID.
     * @throws { BusinessError } 17300001 - System internal error.
     * @syscap SystemCapability.Advertising.OAID
     * @since 10
     */
    function getOAID(): Promise<string>;
}
export default identifier;
