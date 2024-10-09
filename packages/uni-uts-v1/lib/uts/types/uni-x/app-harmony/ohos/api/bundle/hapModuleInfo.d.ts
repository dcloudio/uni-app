/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
 * @kit AbilityKit
 */
import { AbilityInfo } from './abilityInfo';
/**
 * Obtains configuration information about a module.
 *
 * @typedef HapModuleInfo
 * @syscap SystemCapability.BundleManager.BundleFramework
 * @since 7
 * @deprecated since 9
 * @useinstead ohos.bundle.bundleManager.HapModuleInfo
 */
export interface HapModuleInfo {
    /**
     * @type { string }
     * @default Indicates the name of this hapmodule
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly name: string;
    /**
     * @type { string }
     * @default Describes the hapmodule
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly description: string;
    /**
     * @type { number }
     * @default Indicates the description of this hapmodule
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly descriptionId: number;
    /**
     * @type { string }
     * @default Indicates the icon of this hapmodule
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly icon: string;
    /**
     * @type { string }
     * @default Indicates the label of this hapmodule
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly label: string;
    /**
     * @type { number }
     * @default Indicates the label id of this hapmodule
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly labelId: number;
    /**
     * @type { number }
     * @default Indicates the icon id of this hapmodule
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly iconId: number;
    /**
     * @type { string }
     * @default Indicates the background img of this hapmodule
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly backgroundImg: string;
    /**
     * @type { number }
     * @default Indicates the supported modes of this hapmodule
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly supportedModes: number;
    /**
     * @type { Array<string> }
     * @default Indicates the req capabilities of this hapmodule
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly reqCapabilities: Array<string>;
    /**
     * @type { Array<string> }
     * @default The device types that this hapmodule can run on
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly deviceTypes: Array<string>;
    /**
     * @type { Array<AbilityInfo> }
     * @default Obtains configuration information about ability
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly abilityInfo: Array<AbilityInfo>;
    /**
     * @type { string }
     * @default Indicates the name of the .hap package to which the capability belongs
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly moduleName: string;
    /**
     * @type { string }
     * @default Indicates the main ability name of this hapmodule
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly mainAbilityName: string;
    /**
     * @type { boolean }
     * @default Indicates whether free installation of the hapmodule is supported
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly installationFree: boolean;
}
