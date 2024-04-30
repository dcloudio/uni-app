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
 * @file
 * @kit AdsKit
 */
import advertising from './@ohos.advertising';
/**
 * Defines the auto ad component.
 * @syscap SystemCapability.Advertising.Ads
 * @since 11
 */
@Component
declare struct AutoAdComponent {
    /**
     * The parameters in the request for loading ads.
     * @type { AdRequestParams }
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    adParam: advertising.AdRequestParams;
    /**
     * The ad options of loading ads.
     * @type { AdOptions }
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    adOptions: advertising.AdOptions;
    /**
     * The interaction options info for displaying ads.
     * @type { AdDisplayOptions }
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    displayOptions: advertising.AdDisplayOptions;
    /**
     * The interaction listener to be registered that use to show ads.
     * @type { AdInteractionListener }
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    interactionListener: advertising.AdInteractionListener;
    /**
     * The method to build auto ad component.
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    build(): void;
}
export { AutoAdComponent };
