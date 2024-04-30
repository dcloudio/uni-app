/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 * @kit NetworkKit
 */
import type VpnExtensionContext from './application/VpnExtensionContext';
import type Want from './@ohos.app.ability.Want';
/**
 * class of vpn extension ability.
 *
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @stagemodelonly
 * @since 11
 */
export default class VpnExtensionAbility {
    /**
     * Indicates service extension ability context.
     *
     * @type { VpnExtensionContext }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 11
     */
    context: VpnExtensionContext;
    /**
     * Called back when a vpn extension is started for initialization.
     *
     * @param { Want } want - Indicates the want of created service extension.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 11
     */
    onCreate(want: Want): void;
    /**
     * Called back before a vpn extension is destroyed.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @stagemodelonly
     * @since 11
     */
    onDestroy(): void;
}
