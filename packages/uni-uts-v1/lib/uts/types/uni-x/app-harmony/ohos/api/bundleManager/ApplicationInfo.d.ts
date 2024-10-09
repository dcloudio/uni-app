/*
 * Copyright (c) 2022-2024 Huawei Device Co., Ltd.
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
import { Metadata } from './Metadata';
import { Resource } from '../global/resource';
import bundleManager from './../@ohos.bundle.bundleManager';
/**
 * Obtains configuration information about an application
 *
 * @typedef ApplicationInfo
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @since 9
 */
/**
 * Obtains configuration information about an application
 *
 * @typedef ApplicationInfo
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @crossplatform
 * @since 10
 */
/**
 * Obtains configuration information about an application
 *
 * @typedef ApplicationInfo
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export interface ApplicationInfo {
    /**
     * Indicates the application name, which is the same as {@code bundleName}
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the application name, which is the same as {@code bundleName}
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the application name, which is the same as {@code bundleName}
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly name: string;
    /**
     * Description of application
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Description of application
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Description of application
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly description: string;
    /**
     * Indicates the description id of the application
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the description id of the application
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the description id of the application
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly descriptionId: number;
    /**
     * Indicates whether or not this application may be instantiated
     *
     * @type { boolean }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates whether or not this application may be instantiated
     *
     * @type { boolean }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly enabled: boolean;
    /**
     * Indicates the label of the application
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the label of the application
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the label of the application
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly label: string;
    /**
     * Indicates the label id of the application
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the label id of the application
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the label id of the application
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly labelId: number;
    /**
     * Indicates the icon of the application
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the icon of the application
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the icon of the application
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly icon: string;
    /**
     * Indicates the icon id of the application
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the icon id of the application
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the icon id of the application
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly iconId: number;
    /**
     * Process of application, if user do not set it ,the value equal bundleName
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Process of application, if user do not set it ,the value equal bundleName
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly process: string;
    /**
     * Indicates the permissions required for accessing the application.
     *
     * @type { Array<string> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the permissions required for accessing the application.
     *
     * @type { Array<string> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly permissions: Array<string>;
    /**
     * Indicates the application source code path
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the application source code path
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the application source code path
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly codePath: string;
    /**
     * Indicates the metadata of module
     *
     * @type { Map<string, Array<Metadata>> }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     * @deprecated since 10
     * @useinstead ApplicationInfo#metadataArray
     */
    readonly metadata: Map<string, Array<Metadata>>;
    /**
     * Indicates the metadata of the application
     *
     * @type { Array<ModuleMetadata> }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 10
     */
    /**
     * Indicates the metadata of the application
     *
     * @type { Array<ModuleMetadata> }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly metadataArray: Array<ModuleMetadata>;
    /**
     * Indicates whether or not this application may be removable
     *
     * @type { boolean }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates whether or not this application may be removable
     *
     * @type { boolean }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly removable: boolean;
    /**
     * Indicates the access token of the application
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the access token of the application
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly accessTokenId: number;
    /**
     * Indicates the uid of the application
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the uid of the application
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly uid: number;
    /**
     * Indicates icon resource of the application
     *
     * @type { Resource }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates icon resource of the application
     *
     * @type { Resource }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly iconResource: Resource;
    /**
     * Indicates label resource of the application
     *
     * @type { Resource }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates label resource of the application
     *
     * @type { Resource }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly labelResource: Resource;
    /**
     * Indicates description resource of the application
     *
     * @type { Resource }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates description resource of the application
     *
     * @type { Resource }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly descriptionResource: Resource;
    /**
     * Indicates the appDistributionType of the application
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the appDistributionType of the application
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly appDistributionType: string;
    /**
     * Indicates the appProvisionType of the application
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the appProvisionType of the application
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly appProvisionType: string;
    /**
     * Indicates whether the application is a system application
     *
     * @type { boolean }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates whether the application is a system application
     *
     * @type { boolean }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly systemApp: boolean;
    /**
     * Indicates the type of application is APP or atomicService.
     *
     * @type { bundleManager.BundleType }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the type of application is APP or atomicService.
     *
     * @type { bundleManager.BundleType }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly bundleType: bundleManager.BundleType;
    /**
     * Indicates whether the application is in debug mode.
     *
     * @type { boolean }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 10
     */
    /**
     * Indicates whether the application is in debug mode.
     *
     * @type { boolean }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly debug: boolean;
    /**
     * Indicates whether the application data is unclearable, that is, whether the application data cannot be cleared.
     *
     * @type { boolean }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly dataUnclearable: boolean;
    /**
     * Indicates native library path.
     *
     * @type { string }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 12
     */
    readonly nativeLibraryPath: string;
    /**
     * Indicates the MultiAppMode object of the bundle
     *
     * @type { MultiAppMode }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 12
     */
    readonly multiAppMode: MultiAppMode;
    /**
     * Indicates the index of the bundle
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 12
     */
    readonly appIndex: number;
    /**
     * Indicates sources to install the app
     *
     * @type { string }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 12
     */
    readonly installSource: string;
    /**
     * Indicates the release type of the app
     *
     * @type { string }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 12
     */
    readonly releaseType: string;
}
/**
 * Indicates the ModuleMetadata
 *
 * @typedef ModuleMetadata
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @since 10
 */
/**
 * Indicates the ModuleMetadata
 *
 * @typedef ModuleMetadata
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @atomicservice
 * @since 11
 */
export interface ModuleMetadata {
    /**
     * Indicates the name of this hap module
     *
     * @type { string }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 10
     */
    /**
     * Indicates the name of this hap module
     *
     * @type { string }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly moduleName: string;
    /**
     * Indicates the metadata of this hap module
     *
     * @type { Array<Metadata> }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 10
     */
    /**
     * Indicates the metadata of this hap module
     *
     * @type { Array<Metadata> }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly metadata: Array<Metadata>;
}
/**
 * Indicates MultiAppMode
 *
 * @typedef MultiAppMode
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @since 12
 */
export interface MultiAppMode {
    /**
     * Indicates the multiAppModeType of the bundle
     *
     * @type { bundleManager.MultiAppModeType }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 12
     */
    readonly multiAppModeType: bundleManager.MultiAppModeType;
    /**
     * Indicates the max count of the bundle
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 12
     */
    readonly maxCount: number;
}
