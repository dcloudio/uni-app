/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import { HapModuleInfo, RouterItem } from './HapModuleInfo';
import bundleManager from './../@ohos.bundle.bundleManager';
/**
 * Obtains configuration information about a bundle
 *
 * @typedef BundleInfo
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @since 9
 */
/**
 * Obtains configuration information about a bundle
 *
 * @typedef BundleInfo
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @atomicservice
 * @since 11
 */
export interface BundleInfo {
    /**
     * Indicates the name of this bundle
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the name of this bundle
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly name: string;
    /**
     * Indicates the bundle vendor
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the bundle vendor
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly vendor: string;
    /**
     * Indicates the version code of the bundle
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the version code of the bundle
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly versionCode: number;
    /**
     * Indicates the version name of the bundle
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the version name of the bundle
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly versionName: string;
    /**
     * Indicates the **minimum ** version compatible with the bundle
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the **minimum ** version compatible with the bundle
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly minCompatibleVersionCode: number;
    /**
     * Indicates the target version number of the bundle
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the target version number of the bundle
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly targetVersion: number;
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
    readonly appInfo: ApplicationInfo;
    /**
     * Obtains configuration information about a module
     *
     * @type { Array<HapModuleInfo> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Obtains configuration information about a module
     *
     * @type { Array<HapModuleInfo> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly hapModulesInfo: Array<HapModuleInfo>;
    /**
     * Indicates the required permissions details defined in the bundle
     *
     * @type { Array<ReqPermissionDetail> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the required permissions details defined in the bundle
     *
     * @type { Array<ReqPermissionDetail> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly reqPermissionDetails: Array<ReqPermissionDetail>;
    /**
     * Indicates the grant state of required permissions
     *
     * @type { Array<bundleManager.PermissionGrantState> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the grant state of required permissions
     *
     * @type { Array<bundleManager.PermissionGrantState> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly permissionGrantStates: Array<bundleManager.PermissionGrantState>;
    /**
     * Indicates the SignatureInfo of the bundle
     *
     * @type { SignatureInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the SignatureInfo of the bundle
     *
     * @type { SignatureInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly signatureInfo: SignatureInfo;
    /**
     * Indicates the hap install time
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the hap install time
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly installTime: number;
    /**
     * Indicates the hap update time
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the hap update time
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly updateTime: number;
    /**
     * Indicates the router information of the application
     *
     * @type { Array<RouterItem> }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 12
     */
    readonly routerMap: Array<RouterItem>;
    /**
     * Indicates the appIndex of application, only work in appClone mode
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 12
     */
    readonly appIndex: number;
}
/**
 * Indicates the required permissions details defined in configuration file
 *
 * @typedef ReqPermissionDetail
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @since 9
 */
/**
 * Indicates the required permissions details defined in configuration file
 *
 * @typedef ReqPermissionDetail
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @atomicservice
 * @since 11
 */
export interface ReqPermissionDetail {
    /**
     * Indicates the name of this required permissions
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the name of this required permissions
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    name: string;
    /**
     * Indicates the module name which the request permission belongs
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 10
     */
    /**
     * Indicates the module name which the request permission belongs
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    moduleName: string;
    /**
     * Indicates the reason of this required permissions
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the reason of this required permissions
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    reason: string;
    /**
     * Indicates the reason id of this required permissions
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the reason id of this required permissions
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    reasonId: number;
    /**
     * Indicates the used scene of this required permissions
     *
     * @type { UsedScene }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the used scene of this required permissions
     *
     * @type { UsedScene }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    usedScene: UsedScene;
}
/**
 * The scene which is used
 *
 * @typedef UsedScene
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @since 9
 */
/**
 * The scene which is used
 *
 * @typedef UsedScene
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @atomicservice
 * @since 11
 */
export interface UsedScene {
    /**
     * Indicates the abilities that need the permission
     *
     * @type { Array<string> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the abilities that need the permission
     *
     * @type { Array<string> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    abilities: Array<string>;
    /**
     * Indicates the time when the permission is used
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the time when the permission is used
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    when: string;
}
/**
 * Indicates SignatureInfo
 *
 * @typedef SignatureInfo
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @since 9
 */
/**
 * Indicates SignatureInfo
 *
 * @typedef SignatureInfo
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @atomicservice
 * @since 11
 */
export interface SignatureInfo {
    /**
     * Indicates the ID of the application to which this bundle belongs
     * The application ID uniquely identifies an application. It is determined by the bundle name and signature
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the ID of the application to which this bundle belongs
     * The application ID uniquely identifies an application. It is determined by the bundle name and signature
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly appId: string;
    /**
     * Indicates the fingerprint of the certificate
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the fingerprint of the certificate
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly fingerprint: string;
    /**
     * Globally unique identifier of an application, which is allocated by the cloud.
     * AppIdentifier does not change along the application lifecycle, including version updates, certificate changes,
     * public and private key changes, and application transfer.
     *
     * @type { string }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly appIdentifier: string;
}
