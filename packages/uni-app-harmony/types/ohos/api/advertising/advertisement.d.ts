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
 * Defines the advertisement data model.
 * @typedef Advertisement
 * @syscap SystemCapability.Advertising.Ads
 * @since 11
 */
export interface Advertisement {
    /**
     * The advertisement type.
     * @type { number }
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    adType: number;
    /**
     * The server verifies the configuration parameters.
     * @type { Map<string, string> }
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    rewardVerifyConfig: Map<string, string>;
    /**
     * The unique identifier of the advertisement.
     * @type { string }
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    uniqueId: string;
    /**
     * The subscriber has been rewarded.
     * @type { boolean }
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    rewarded: boolean;
    /**
     * The advertisement has been shown.
     * @type { boolean }
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    shown: boolean;
    /**
     * The advertisement has been clicked.
     * @type { boolean }
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    clicked: boolean;
    /**
     * The extended attributes of advertisement.
     * @type { Object }
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    [key: string]: Object;
}
