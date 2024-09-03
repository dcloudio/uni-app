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
import { ApplicationInfo } from './applicationInfo';
import { CustomizeData } from './customizeData';
import bundle from './../@ohos.bundle';
/**
 * Obtains configuration information about an ability
 *
 * @typedef AbilityInfo
 * @syscap SystemCapability.BundleManager.BundleFramework
 * @since 7
 * @deprecated since 9
 * @useinstead ohos.bundle.bundleManager.AbilityInfo
 */
export interface AbilityInfo {
    /**
     * @type { string }
     * @default Indicates the name of the bundle containing the ability
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly bundleName: string;
    /**
     * @type { string }
     * @default Ability simplified class name
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly name: string;
    /**
     * @type { string }
     * @default Indicates the label of the ability
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly label: string;
    /**
     * @type { string }
     * @default Describes the ability
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly description: string;
    /**
     * @type { string }
     * @default Indicates the icon of the ability
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly icon: string;
    /**
     * @type { number }
     * @default Indicates the label id of the ability
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly labelId: number;
    /**
     * @type { number }
     * @default Indicates the description id of the ability
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly descriptionId: number;
    /**
     * @type { number }
     * @default Indicates the icon id of the ability
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly iconId: number;
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
     * @default Process of ability, if user do not set it ,the value equal application process
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly process: string;
    /**
     * @type { string }
     * @default Info about which ability is this nick point to
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @FAModelOnly
     * @since 7
     * @deprecated since 9
     */
    readonly targetAbility: string;
    /**
     * @type { number }
     * @default Indicates the background service addressing a specific usage scenario
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @FAModelOnly
     * @since 7
     * @deprecated since 9
     */
    readonly backgroundModes: number;
    /**
     * @type { boolean }
     * @default Indicates whether an ability can be called by other abilities
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly isVisible: boolean;
    /**
     * @type { boolean }
     * @default Indicates whether the ability provides the embedded card capability
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @FAModelOnly
     * @since 7
     * @deprecated since 9
     */
    readonly formEnabled: boolean;
    /**
     * @type { bundle.AbilityType }
     * @default Enumerates types of templates that can be used by an ability
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @FAModelOnly
     * @since 7
     * @deprecated since 9
     */
    readonly type: bundle.AbilityType;
    /**
     * @type { bundle.AbilitySubType }
     * @default Enumerates the subType of templates used by an ability
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @FAModelOnly
     * @since 7
     * @deprecated since 9
     */
    readonly subType: bundle.AbilitySubType;
    /**
     * @type { bundle.DisplayOrientation }
     * @default Enumerates ability display orientations
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly orientation: bundle.DisplayOrientation;
    /**
     * @type { bundle.LaunchMode }
     * @default Enumerates ability launch modes
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly launchMode: bundle.LaunchMode;
    /**
     * @type { Array<string> }
     * @default The permissions that others need to launch this ability
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly permissions: Array<string>;
    /**
     * @type { Array<string> }
     * @default The device types that this ability can run on
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly deviceTypes: Array<string>;
    /**
     * @type { Array<string> }
     * @default The device capability that this ability needs
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly deviceCapabilities: Array<string>;
    /**
     * @type { string }
     * @default Indicates the permission required for reading ability data
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @FAModelOnly
     * @since 7
     * @deprecated since 9
     */
    readonly readPermission: string;
    /**
     * @type { string }
     * @default Indicates the permission required for writing data to the ability
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @FAModelOnly
     * @since 7
     * @deprecated since 9
     */
    readonly writePermission: string;
    /**
     * @type { ApplicationInfo }
     * @default Obtains configuration information about an application
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly applicationInfo: ApplicationInfo;
    /**
     * @type { string }
     * @default Uri of ability
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @FAModelOnly
     * @since 7
     * @deprecated since 9
     */
    readonly uri: string;
    /**
     * @type { Array<CustomizeData> }
     * @default Indicates the metadata of ability
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 8
     * @deprecated since 9
     */
    readonly metaData: Array<CustomizeData>;
    /**
     * @type { boolean }
     * @default Indicates whether the ability is enabled
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 8
     * @deprecated since 9
     */
    readonly enabled: boolean;
}
