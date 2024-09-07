/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { ApplicationInfo } from './ApplicationInfo';
import { Metadata } from './Metadata';
import bundleManager from './../@ohos.bundle.bundleManager';
import { Skill } from './Skill';
/**
 * Extension information about a bundle
 *
 * @typedef ExtensionAbilityInfo
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @since 9
 */
/**
 * Extension information about a bundle
 *
 * @typedef ExtensionAbilityInfo
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @atomicservice
 * @since 11
 */
export interface ExtensionAbilityInfo {
    /**
     * Indicates the name of the bundle
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the name of the bundle
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly bundleName: string;
    /**
     * Indicates the name of the module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the name of the module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly moduleName: string;
    /**
     * Indicates the name of the extension ability info
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the name of the extension ability info
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly name: string;
    /**
     * Indicates the label id of the extension ability info
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the label id of the extension ability info
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly labelId: number;
    /**
     * Indicates the description id of the extension ability info
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the description id of the extension ability info
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly descriptionId: number;
    /**
     * Indicates the icon id of the extension ability info
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the icon id of the extension ability info
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly iconId: number;
    /**
     * Indicates whether this ability can be called by other abilities
     *
     * @type { boolean }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates whether this ability can be called by other abilities
     *
     * @type { boolean }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly exported: boolean;
    /**
     * Enumerates types of the extension ability info
     *
     * @type { bundleManager.ExtensionAbilityType }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Enumerates types of the extension ability info
     *
     * @type { bundleManager.ExtensionAbilityType }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly extensionAbilityType: bundleManager.ExtensionAbilityType;
    /**
     * Indicates type name of the extension ability.
     *
     * @type { string }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly extensionAbilityTypeName: string;
    /**
     * The permissions that others need to use this extension ability info
     *
     * @type { Array<string> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * The permissions that others need to use this extension ability info
     *
     * @type { Array<string> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly permissions: Array<string>;
    /**
     * Obtains configuration information about an application
     *
     * @type { ApplicationInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Obtains configuration information about an application
     *
     * @type { ApplicationInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly applicationInfo: ApplicationInfo;
    /**
     * Indicates the metadata of bundle
     *
     * @type { Array<Metadata> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the metadata of bundle
     *
     * @type { Array<Metadata> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly metadata: Array<Metadata>;
    /**
     * Indicates the src language to express extension ability info
     *
     * @type { boolean }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the src language to express extension ability info
     *
     * @type { boolean }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly enabled: boolean;
    /**
     * Indicates the read permission extension ability info
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the read permission extension ability info
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly readPermission: string;
    /**
     * Indicates the write permission of extension ability info
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the write permission of extension ability info
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly writePermission: string;
    /**
     * Indicates skills of the extension ability
     *
     * @type { Array<Skill> }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 12
     */
    readonly skills: Array<Skill>;
    /**
     * Indicates the appIndex of extension ability, only work in clone app mode
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 12
     */
    readonly appIndex: number;
}
