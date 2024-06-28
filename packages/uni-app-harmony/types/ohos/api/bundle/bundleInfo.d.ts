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
import { ApplicationInfo } from './applicationInfo';
import { HapModuleInfo } from './hapModuleInfo';
/**
 * The scene which is used
 *
 * @typedef UsedScene
 * @syscap SystemCapability.BundleManager.BundleFramework
 * @since 7
 * @deprecated since 9
 * @useinstead ohos.bundle.bundleManager.UsedScene
 */
export interface UsedScene {
    /**
     * @default Indicates the abilities that need the permission
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    abilities: Array<string>;
    /**
     * @default Indicates the time when the permission is used
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    when: string;
}
/**
 * Indicates the required permissions details defined in file config.json
 *
 * @typedef ReqPermissionDetail
 * @syscap SystemCapability.BundleManager.BundleFramework
 * @since 7
 * @deprecated since 9
 * @useinstead ohos.bundle.bundleManager.ReqPermissionDetail
 */
export interface ReqPermissionDetail {
    /**
     * @default Indicates the name of this required permissions
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    name: string;
    /**
     * @default Indicates the reason of this required permissions
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    reason: string;
    /**
     * @default Indicates the used scene of this required permissions
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    usedScene: UsedScene;
}
/**
 * Obtains configuration information about a bundle
 *
 * @typedef BundleInfo
 * @syscap SystemCapability.BundleManager.BundleFramework
 * @since 7
 * @deprecated since 9
 * @useinstead ohos.bundle.bundleManager.BundleInfo
 */
export interface BundleInfo {
    /**
     * @default Indicates the name of this bundle
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly name: string;
    /**
     * @default Indicates the name of this original bundle
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly type: string;
    /**
     * @default Indicates the ID of the application to which this bundle belongs
     * The application ID uniquely identifies an application. It is determined by the bundle name and signature
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly appId: string;
    /**
     * @default Indicates the UID of the application to which this bundle belongs
     * The UID uniquely identifies an application. It is determined by the process and user IDs of the application
     * After an application is installed, its UID remains unchanged unless it is uninstalled and then reinstalled
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly uid: number;
    /**
     * @default Indicates the hap install time
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly installTime: number;
    /**
     * @default Indicates the hap update time
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly updateTime: number;
    /**
     * @default Obtains configuration information about an application
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly appInfo: ApplicationInfo;
    /**
     * @default Obtains configuration information about an ability
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly abilityInfos: Array<AbilityInfo>;
    /**
     * @default Indicates the required permissions name defined in file config.json
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly reqPermissions: Array<string>;
    /**
     * @default Indicates the required permissions details defined in file config.json
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly reqPermissionDetails: Array<ReqPermissionDetail>;
    /**
     * @default Describes the bundle vendor
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly vendor: string;
    /**
     * @default Indicates the version number of the bundle
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly versionCode: number;
    /**
     * @default Indicates the text description of the bundle version
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly versionName: string;
    /**
     * @default Indicates the compatible version number of the bundle
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly compatibleVersion: number;
    /**
     * @default Indicates the target version number of the bundle
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly targetVersion: number;
    /**
     * @default Indicates is compress native libs
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly isCompressNativeLibs: boolean;
    /**
     * @default Obtains configuration information about a module
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly hapModuleInfos: Array<HapModuleInfo>;
    /**
     * @default Indicates entry module name
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly entryModuleName: string;
    /**
     * @default Indicates the cpuAbi information of this bundle.
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly cpuAbi: string;
    /**
     * @default Indicates is silent installation
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly isSilentInstallation: string;
    /**
     * @default Indicates the earliest historical version compatible with the bundle
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly minCompatibleVersionCode: number;
    /**
     * @default Indicates whether free installation of the entry is supported
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 7
     * @deprecated since 9
     */
    readonly entryInstallationFree: boolean;
    /**
     * @default Indicates the grant status of required permissions
     * @syscap SystemCapability.BundleManager.BundleFramework
     * @since 8
     * @deprecated since 9
     */
    readonly reqPermissionStates: Array<number>;
}
