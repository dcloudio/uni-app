/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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
 */
import ConfigurationConstant from './@ohos.application.ConfigurationConstant';
/**
 * configuration item.
 *
 * @typedef Configuration
 * @syscap SystemCapability.Ability.AbilityBase
 * @since 8
 * @deprecated since 9
 * @useinstead ohos.app.ability.Configuration/Configuration
 */
export interface Configuration {
    /**
     * Indicates the current language of the application.
     *
     * @type { ?string }
     * @syscap SystemCapability.Ability.AbilityBase
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.ability.Configuration/Configuration#language
     */
    language?: string;
    /**
     * Indicates the current colorMode of the application.
     *
     * @type { ?ConfigurationConstant.ColorMode }
     * @syscap SystemCapability.Ability.AbilityBase
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.app.ability.Configuration/Configuration#colorMode
     */
    colorMode?: ConfigurationConstant.ColorMode;
}
