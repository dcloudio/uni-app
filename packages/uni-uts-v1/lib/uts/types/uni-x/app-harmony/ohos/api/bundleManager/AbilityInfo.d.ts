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
 * Obtains configuration information about an ability
 *
 * @typedef AbilityInfo
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @since 9
 */
/**
 * Obtains configuration information about an ability
 *
 * @typedef AbilityInfo
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @crossplatform
 * @since 10
 */
/**
 * Obtains configuration information about an ability
 *
 * @typedef AbilityInfo
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export interface AbilityInfo {
    /**
     * Indicates the name of the bundle containing the ability
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the name of the bundle containing the ability
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the name of the bundle containing the ability
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly bundleName: string;
    /**
     * Indicates the name of the .hap package to which the capability belongs
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the name of the .hap package to which the capability belongs
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the name of the .hap package to which the capability belongs
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly moduleName: string;
    /**
     * Ability simplified class name
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Ability simplified class name
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Ability simplified class name
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly name: string;
    /**
     * Indicates the label of the ability
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the label of the ability
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the label of the ability
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly label: string;
    /**
     * Indicates the label id of the ability
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the label id of the ability
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the label id of the ability
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly labelId: number;
    /**
     * Indicates the ability
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the ability
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the ability
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly description: string;
    /**
     * Indicates the description id of the ability
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the description id of the ability
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the description id of the ability
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly descriptionId: number;
    /**
     * Indicates the icon of the ability
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the icon of the ability
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the icon of the ability
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly icon: string;
    /**
     * Indicates the icon id of the ability
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the icon id of the ability
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates the icon id of the ability
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly iconId: number;
    /**
     * Process of ability, if user do not set it, the value equal application process
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Process of ability, if user do not set it, the value equal application process
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly process: string;
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
     * Enumerates types of templates that can be used by an ability
     *
     * @type { bundleManager.AbilityType }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @FAModelOnly
     * @since 9
     */
    readonly type: bundleManager.AbilityType;
    /**
     * Enumerates ability display orientations
     *
     * @type { bundleManager.DisplayOrientation }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Enumerates ability display orientations
     *
     * @type { bundleManager.DisplayOrientation }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly orientation: bundleManager.DisplayOrientation;
    /**
     * Enumerates ability launch type
     *
     * @type { bundleManager.LaunchType }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Enumerates ability launch type
     *
     * @type { bundleManager.LaunchType }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Enumerates ability launch type
     *
     * @type { bundleManager.LaunchType }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly launchType: bundleManager.LaunchType;
    /**
     * The permissions that others need to launch this ability
     *
     * @type { Array<string> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * The permissions that others need to launch this ability
     *
     * @type { Array<string> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly permissions: Array<string>;
    /**
     * Indicates the permission required for reading ability data
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @FAModelOnly
     * @since 9
     */
    readonly readPermission: string;
    /**
     * Indicates the permission required for writing data to the ability
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @FAModelOnly
     * @since 9
     */
    readonly writePermission: string;
    /**
     * Uri of ability
     *
     * @type { string }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @FAModelOnly
     * @since 9
     */
    readonly uri: string;
    /**
     * The device types that this ability can run on
     *
     * @type { Array<string> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * The device types that this ability can run on
     *
     * @type { Array<string> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly deviceTypes: Array<string>;
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
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains configuration information about an application
     *
     * @type { ApplicationInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    readonly applicationInfo: ApplicationInfo;
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
     * Indicates whether the ability is enabled
     *
     * @type { boolean }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates whether the ability is enabled
     *
     * @type { boolean }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly enabled: boolean;
    /**
     * Indicates which window mode is supported
     *
     * @type { Array<bundleManager.SupportWindowMode> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates which window mode is supported
     *
     * @type { Array<bundleManager.SupportWindowMode> }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly supportWindowModes: Array<bundleManager.SupportWindowMode>;
    /**
     * Indicates window size
     *
     * @type { WindowSize }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates window size
     *
     * @type { WindowSize }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly windowSize: WindowSize;
    /**
     * Indicates whether to hide the application icon from the dock area
     *
     * @type { boolean }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 12
     */
    readonly excludeFromDock: boolean;
    /**
     * Indicates skills of the ability
     *
     * @type { Array<Skill> }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 12
     */
    readonly skills: Array<Skill>;
    /**
     * Indicates the appIndex of application, only work in clone app mode
     *
     * @type { number }
     * @readonly
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 12
     */
    readonly appIndex: number;
}
/**
 * Indicates the window size.
 *
 * @typedef WindowSize
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @since 9
 */
/**
 * Indicates the window size.
 *
 * @typedef WindowSize
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @atomicservice
 * @since 11
 */
export interface WindowSize {
    /**
     * Indicates maximum ratio of width over height of window under free window status.
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates maximum ratio of width over height of window under free window status.
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly maxWindowRatio: number;
    /**
     * Indicates minimum ratio of width over height of window under free window status.
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates minimum ratio of width over height of window under free window status.
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly minWindowRatio: number;
    /**
     * Indicates maximum width of window under free window status.
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates maximum width of window under free window status.
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly maxWindowWidth: number;
    /**
     * Indicates minimum width of window under free window status.
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates minimum width of window under free window status.
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly minWindowWidth: number;
    /**
     * Indicates maximum height of window under free window status.
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates maximum height of window under free window status.
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly maxWindowHeight: number;
    /**
     * Indicates minimum height of window under free window status.
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates minimum height of window under free window status.
     *
     * @type { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    readonly minWindowHeight: number;
}
