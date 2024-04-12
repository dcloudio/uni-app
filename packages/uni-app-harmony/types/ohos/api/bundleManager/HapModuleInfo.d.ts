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
import { AbilityInfo } from './AbilityInfo';
import { ExtensionAbilityInfo } from './ExtensionAbilityInfo';
import { Metadata } from './Metadata';
import bundleManager from './../@ohos.bundle.bundleManager';
/**
 * Obtains configuration information about a hap module.
 *
 * @typedef HapModuleInfo
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @since 9
 */
/**
 * Obtains configuration information about a hap module.
 *
 * @typedef HapModuleInfo
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @crossplatform
 * @since 10
 */
/**
 * Obtains configuration information about a hap module.
 *
 * @typedef HapModuleInfo
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export interface HapModuleInfo {
    /**
     * Indicates the name of this hap module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the name of this hap module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the name of this hap module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly name: string;
    /**
     * Indicates the icon of this hap module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the icon of this hap module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the icon of this hap module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly icon: string;
    /**
     * Indicates the icon id of this hap module
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the icon id of this hap module
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the icon id of this hap module
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly iconId: number;
    /**
     * Indicates the label of this hap module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the label of this hap module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the label of this hap module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly label: string;
    /**
     * Indicates the label id of this hap module
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the label id of this hap module
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the label id of this hap module
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly labelId: number;
    /**
     * Describes the hap module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Describes the hap module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Describes the hap module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly description: string;
    /**
     * Indicates the description of this hap module
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the description of this hap module
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the description of this hap module
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly descriptionId: number;
    /**
     * Indicates main elementName of the hap module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates main elementName of the hap module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates main elementName of the hap module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly mainElementName: string;
    /**
     * Obtains configuration information about abilities
     *
     * @type { Array<AbilityInfo> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Obtains configuration information about abilities
     *
     * @type { Array<AbilityInfo> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains configuration information about abilities
     *
     * @type { Array<AbilityInfo> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly abilitiesInfo: Array<AbilityInfo>;
    /**
     * Obtains configuration information about extension abilities
     *
     * @type { Array<ExtensionAbilityInfo> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Obtains configuration information about extension abilities
     *
     * @type { Array<ExtensionAbilityInfo> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly extensionAbilitiesInfo: Array<ExtensionAbilityInfo>;
    /**
     * Indicates the metadata of ability
     *
     * @type { Array<Metadata> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the metadata of ability
     *
     * @type { Array<Metadata> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the metadata of ability
     *
     * @type { Array<Metadata> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly metadata: Array<Metadata>;
    /**
     * The device types that this hap module can run on
     *
     * @type { Array<string> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * The device types that this hap module can run on
     *
     * @type { Array<string> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly deviceTypes: Array<string>;
    /**
     * Indicates whether free installation of the hap module is supported
     *
     * @type { boolean }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates whether free installation of the hap module is supported
     *
     * @type { boolean }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly installationFree: boolean;
    /**
     * Indicates the hash value of the hap module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the hash value of the hap module
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly hashValue: string;
    /**
     * Indicates the type of the module
     *
     * @type { bundleManager.ModuleType }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the type of the module
     *
     * @type { bundleManager.ModuleType }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly type: bundleManager.ModuleType;
    /**
     * Indicates the dependency module that this module depends on
     *
     * @type { Array<Dependency> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the dependency module that this module depends on
     *
     * @type { Array<Dependency> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly dependencies: Array<Dependency>;
    /**
     * Indicates the preload module
     *
     * @type { Array<PreloadItem> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the preload module
     *
     * @type { Array<PreloadItem> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly preloads: Array<PreloadItem>;
    /**
     * Indicates the menu configuration
     *
     * @type { string }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly fileContextMenuConfig: string;
}
/**
 * Indicates the dependency
 *
 * @typedef Dependency
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @since 9
 */
/**
 * Indicates the dependency
 *
 * @typedef Dependency
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @atomicservice
 * @since 11
 */
export interface Dependency {
    /**
     * Indicates the module name
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the module name
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly moduleName: string;
    /**
     * Indicates the bundle name of the dependency
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 10
     */
    /**
     * Indicates the bundle name of the dependency
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly bundleName: string;
    /**
     * Indicates the version code of the dependency
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 10
     */
    /**
     * Indicates the version code of the dependency
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly versionCode: number;
}
/**
 * Indicates the preloadItem
 *
 * @typedef PreloadItem
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @since 9
 */
/**
 * Indicates the preloadItem
 *
 * @typedef PreloadItem
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @atomicservice
 * @since 11
 */
export interface PreloadItem {
    /**
     * Indicates the module name need preload
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the module name need preload
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly moduleName: string;
}
