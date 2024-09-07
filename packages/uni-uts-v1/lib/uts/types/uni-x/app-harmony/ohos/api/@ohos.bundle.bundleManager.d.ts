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
import { AsyncCallback } from './@ohos.base';
import type { ApplicationInfo as _ApplicationInfo, ModuleMetadata as _ModuleMetadata } from './bundleManager/ApplicationInfo';
import { Metadata as _Metadata } from './bundleManager/Metadata';
import { ElementName as _ElementName } from './bundleManager/ElementName';
import * as _AbilityInfo from './bundleManager/AbilityInfo';
import * as _BundleInfo from './bundleManager/BundleInfo';
import * as _HapModuleInfo from './bundleManager/HapModuleInfo';
import * as _ExtensionAbilityInfo from './bundleManager/ExtensionAbilityInfo';
import * as _Skill from './bundleManager/Skill';
/**
 * This module is used to obtain package information of various applications installed on the current device.
 *
 * @namespace bundleManager
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @since 9
 */
/**
 * This module is used to obtain package information of various applications installed on the current device.
 *
 * @namespace bundleManager
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @atomicservice
 * @since 11
 */
/**
 * This module is used to obtain package information of various applications installed on the current device.
 *
 * @namespace bundleManager
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare namespace bundleManager {
    /**
     * Used to query the enumeration value of bundleInfo. Multiple values can be passed in the form.
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Used to query the enumeration value of bundleInfo. Multiple values can be passed in the form.
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    enum BundleFlag {
        /**
         * Used to obtain the default bundleInfo. The obtained bundleInfo does not contain information of
         * signatureInfo, applicationInfo, hapModuleInfo, ability, extensionAbility and permission.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Used to obtain the default bundleInfo. The obtained bundleInfo does not contain information of
         * signatureInfo, applicationInfo, hapModuleInfo, ability, extensionAbility and permission.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        GET_BUNDLE_INFO_DEFAULT = 0x00000000,
        /**
         * Used to obtain the bundleInfo containing applicationInfo. The obtained bundleInfo does not
         * contain the information of signatureInfo, hapModuleInfo, ability, extensionAbility and permission.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Used to obtain the bundleInfo containing applicationInfo. The obtained bundleInfo does not
         * contain the information of signatureInfo, hapModuleInfo, ability, extensionAbility and permission.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        GET_BUNDLE_INFO_WITH_APPLICATION = 0x00000001,
        /**
         * Used to obtain the bundleInfo containing hapModuleInfo. The obtained bundleInfo does not
         * contain the information of signatureInfo, applicationInfo, ability, extensionAbility and permission.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Used to obtain the bundleInfo containing hapModuleInfo. The obtained bundleInfo does not
         * contain the information of signatureInfo, applicationInfo, ability, extensionAbility and permission.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        GET_BUNDLE_INFO_WITH_HAP_MODULE = 0x00000002,
        /**
         * Used to obtain the bundleInfo containing ability. The obtained bundleInfo does not
         * contain the information of signatureInfo, applicationInfo, extensionAbility and permission.
         * It can't be used alone, it needs to be used with GET_BUNDLE_INFO_WITH_HAP_MODULE.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Used to obtain the bundleInfo containing ability. The obtained bundleInfo does not
         * contain the information of signatureInfo, applicationInfo, extensionAbility and permission.
         * It can't be used alone, it needs to be used with GET_BUNDLE_INFO_WITH_HAP_MODULE.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        GET_BUNDLE_INFO_WITH_ABILITY = 0x00000004,
        /**
         * Used to obtain the bundleInfo containing extensionAbility. The obtained bundleInfo does not
         * contain the information of signatureInfo, applicationInfo, ability and permission.
         * It can't be used alone, it needs to be used with GET_BUNDLE_INFO_WITH_HAP_MODULE.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Used to obtain the bundleInfo containing extensionAbility. The obtained bundleInfo does not
         * contain the information of signatureInfo, applicationInfo, ability and permission.
         * It can't be used alone, it needs to be used with GET_BUNDLE_INFO_WITH_HAP_MODULE.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        GET_BUNDLE_INFO_WITH_EXTENSION_ABILITY = 0x00000008,
        /**
         * Used to obtain the bundleInfo containing permission. The obtained bundleInfo does not
         * contain the information of signatureInfo, applicationInfo, hapModuleInfo, extensionAbility and ability.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Used to obtain the bundleInfo containing permission. The obtained bundleInfo does not
         * contain the information of signatureInfo, applicationInfo, hapModuleInfo, extensionAbility and ability.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        GET_BUNDLE_INFO_WITH_REQUESTED_PERMISSION = 0x00000010,
        /**
         * Used to obtain the metadata contained in applicationInfo, moduleInfo and abilityInfo.
         * It can't be used alone, it needs to be used with GET_BUNDLE_INFO_WITH_APPLICATION,
         * GET_BUNDLE_INFO_WITH_HAP_MODULE, GET_BUNDLE_INFO_WITH_ABILITIES, GET_BUNDLE_INFO_WITH_EXTENSION_ABILITY.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Used to obtain the metadata contained in applicationInfo, moduleInfo and abilityInfo.
         * It can't be used alone, it needs to be used with GET_BUNDLE_INFO_WITH_APPLICATION,
         * GET_BUNDLE_INFO_WITH_HAP_MODULE, GET_BUNDLE_INFO_WITH_ABILITIES, GET_BUNDLE_INFO_WITH_EXTENSION_ABILITY.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        GET_BUNDLE_INFO_WITH_METADATA = 0x00000020,
        /**
         * Used to obtain the default bundleInfo containing disabled application and ability.
         * The obtained bundleInfo does not contain information of signatureInfo, applicationInfo,
         * hapModuleInfo, ability, extensionAbility and permission.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Used to obtain the default bundleInfo containing disabled application and ability.
         * The obtained bundleInfo does not contain information of signatureInfo, applicationInfo,
         * hapModuleInfo, ability, extensionAbility and permission.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        GET_BUNDLE_INFO_WITH_DISABLE = 0x00000040,
        /**
         * Used to obtain the bundleInfo containing signatureInfo. The obtained bundleInfo does not
         * contain the information of applicationInfo, hapModuleInfo, extensionAbility, ability and permission.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Used to obtain the bundleInfo containing signatureInfo. The obtained bundleInfo does not
         * contain the information of applicationInfo, hapModuleInfo, extensionAbility, ability and permission.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        GET_BUNDLE_INFO_WITH_SIGNATURE_INFO = 0x00000080,
        /**
         * Used to obtain the bundleInfo containing menu configuration in hapModuleInfo.
         * The obtained bundleInfo does not contain the information of applicationInfo, extensionAbility, ability and permission.
         * It can't be used alone, it needs to be used with GET_BUNDLE_INFO_WITH_HAP_MODULE.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        GET_BUNDLE_INFO_WITH_MENU = 0x00000100,
        /**
         * Used to obtain the bundleInfo containing router map configuration in hapModuleInfo.
         * The obtained bundleInfo does not contain the information of applicationInfo, extensionAbility, ability and permission.
         * It can't be used alone, it needs to be used with GET_BUNDLE_INFO_WITH_HAP_MODULE.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 12
         */
        GET_BUNDLE_INFO_WITH_ROUTER_MAP = 0x00000200,
        /**
         * Used to obtain the skillInfo contained in abilityInfo and extensionInfo.
         * It can't be used alone, it needs to be used with GET_BUNDLE_INFO_WITH_HAP_MODULE,
         * GET_BUNDLE_INFO_WITH_ABILITIES, GET_BUNDLE_INFO_WITH_EXTENSION_ABILITY.
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 12
         */
        GET_BUNDLE_INFO_WITH_SKILL = 0x00000800
    }
    /**
     * This enumeration value is used to identify various types of extension ability
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * This enumeration value is used to identify various types of extension ability
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export enum ExtensionAbilityType {
        /**
         * Indicates extension info with type of form
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates extension info with type of form
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        FORM = 0,
        /**
         * Indicates extension info with type of work schedule
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        WORK_SCHEDULER = 1,
        /**
         * Indicates extension info with type of input method
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        INPUT_METHOD = 2,
        /**
         * Indicates extension info with type of service
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        SERVICE = 3,
        /**
         * Indicates extension info with type of accessibility
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        ACCESSIBILITY = 4,
        /**
         * Indicates extension info with type of dataShare
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        DATA_SHARE = 5,
        /**
         * Indicates extension info with type of filesShare
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        FILE_SHARE = 6,
        /**
         * Indicates extension info with type of staticSubscriber
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        STATIC_SUBSCRIBER = 7,
        /**
         * Indicates extension info with type of wallpaper
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        WALLPAPER = 8,
        /**
         * Indicates extension info with type of backup
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        BACKUP = 9,
        /**
         * Indicates extension info with type of window
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        WINDOW = 10,
        /**
         * Indicates extension info with type of enterprise admin
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        ENTERPRISE_ADMIN = 11,
        /**
         * Indicates extension info with type of thumbnail
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        THUMBNAIL = 13,
        /**
         * Indicates extension info with type of preview
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        PREVIEW = 14,
        /**
         * Indicates extension info with type of print
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 10
         */
        PRINT = 15,
        /**
         * Indicates extension info with type of share
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 10
         */
        SHARE = 16,
        /**
         * Indicates extension info with type of push
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 10
         */
        PUSH = 17,
        /**
         * Indicates extension info with type of driver
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 10
         */
        DRIVER = 18,
        /**
         * Indicates extension info with type of action
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 10
         */
        ACTION = 19,
        /**
         * Indicates extension info with type of ads service
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 11
         */
        ADS_SERVICE = 20,
        /**
         * Indicates extension info with type of embedded UI
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 12
         */
        EMBEDDED_UI = 21,
        /**
         * Indicates extension info with type of insight intent UI
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 12
         */
        INSIGHT_INTENT_UI = 22,
        /**
         * Indicates extension info with type of unspecified
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        UNSPECIFIED = 255
    }
    /**
     * PermissionGrantState
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * PermissionGrantState
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export enum PermissionGrantState {
        /**
         * PERMISSION_DENIED
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * PERMISSION_DENIED
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        PERMISSION_DENIED = -1,
        /**
         * PERMISSION_GRANTED
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * PERMISSION_GRANTED
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        PERMISSION_GRANTED = 0
    }
    /**
     * Support window mode
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Support window mode
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export enum SupportWindowMode {
        /**
         * Indicates supported window mode of full screen mode
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates supported window mode of full screen mode
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        FULL_SCREEN = 0,
        /**
         * Indicates supported window mode of split mode
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates supported window mode of split mode
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        SPLIT = 1,
        /**
         * Indicates supported window mode of floating mode
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates supported window mode of floating mode
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        FLOATING = 2
    }
    /**
     * Launch type
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Launch type
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Launch type
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    export enum LaunchType {
        /**
         * Indicates that the ability has only one instance
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates that the ability has only one instance
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates that the ability has only one instance
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        SINGLETON = 0,
        /**
         * Indicates that the ability can have multiple instances
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates that the ability can have multiple instances
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates that the ability can have multiple instances
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        MULTITON = 1,
        /**
         * Indicates that the ability can have specified instances
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates that the ability can have specified instances
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        SPECIFIED = 2
    }
    /**
     * Indicates ability type
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @FAModelOnly
     * @since 9
     */
    export enum AbilityType {
        /**
         * Indicates that the ability has a UI
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @FAModelOnly
         * @since 9
         */
        PAGE = 1,
        /**
         * Indicates that the ability does not have a UI
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @FAModelOnly
         * @since 9
         */
        SERVICE = 2,
        /**
         * Indicates that the ability is used to provide data access services
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @FAModelOnly
         * @since 9
         */
        DATA = 3
    }
    /**
     * Display orientation
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Display orientation
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export enum DisplayOrientation {
        /**
         * Indicates that the system automatically determines the display orientation
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates that the system automatically determines the display orientation
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        UNSPECIFIED,
        /**
         * Indicates the landscape orientation
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates the landscape orientation
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        LANDSCAPE,
        /**
         * Indicates the portrait orientation
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates the portrait orientation
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        PORTRAIT,
        /**
         * Indicates the page ability orientation is the same as that of the nearest ability in the stack
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates the page ability orientation is the same as that of the nearest ability in the stack
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        FOLLOW_RECENT,
        /**
         * Indicates the inverted landscape orientation
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates the inverted landscape orientation
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        LANDSCAPE_INVERTED,
        /**
         * Indicates the inverted portrait orientation
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates the inverted portrait orientation
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        PORTRAIT_INVERTED,
        /**
         * Indicates the orientation can be auto-rotated
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates the orientation can be auto-rotated
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        AUTO_ROTATION,
        /**
         * Indicates the landscape orientation rotated with sensor
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates the landscape orientation rotated with sensor
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        AUTO_ROTATION_LANDSCAPE,
        /**
         * Indicates the portrait orientation rotated with sensor
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates the portrait orientation rotated with sensor
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        AUTO_ROTATION_PORTRAIT,
        /**
         * Indicates the sensor restricted mode
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates the sensor restricted mode
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        AUTO_ROTATION_RESTRICTED,
        /**
         * Indicates the sensor landscape restricted mode
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates the sensor landscape restricted mode
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        AUTO_ROTATION_LANDSCAPE_RESTRICTED,
        /**
         * Indicates the sensor portrait restricted mode
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates the sensor portrait restricted mode
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        AUTO_ROTATION_PORTRAIT_RESTRICTED,
        /**
         * Indicates the locked orientation mode
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates the locked orientation mode
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        LOCKED,
        /**
         * Indicates the system automatically determines the sensor restricted mode
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 12
         */
        AUTO_ROTATION_UNSPECIFIED,
        /**
         * Indicates the orientation follow the desktop rotate mode
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 12
         */
        FOLLOW_DESKTOP
    }
    /**
     * Indicates module type
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates module type
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export enum ModuleType {
        /**
         * Indicates entry type
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates entry type
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        ENTRY = 1,
        /**
         * Indicates feature type
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates feature type
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        FEATURE = 2,
        /**
         * Indicates shared type
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates shared type
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        SHARED = 3
    }
    /**
     * Indicates bundle type
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates bundle type
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export enum BundleType {
        /**
         * Indicates app
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates app
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        APP = 0,
        /**
         * Indicates atomic service
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 9
         */
        /**
         * Indicates atomic service
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        ATOMIC_SERVICE = 1
    }
    /**
     * Shared bundle compatible policy
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 10
     */
    /**
     * Shared bundle compatible policy
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export enum CompatiblePolicy {
        /**
         * Indicates that the app is a shared bundle and the shared bundle type is backward compatibility
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 10
         */
        /**
         * Indicates that the app is a shared bundle and the shared bundle type is backward compatibility
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @atomicservice
         * @since 11
         */
        BACKWARD_COMPATIBILITY = 1
    }
    /**
     * This enumeration value is used to identify various types of extension ability
     *
     * @enum { number }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 12
    */
    export enum MultiAppModeType {
        /**
         * Indicates multi app mode with type of unspecified
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 12
         */
        UNSPECIFIED = 0,
        /**
         * Indicates multi app mode with type of multiInstance
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 12
         */
        MULTI_INSTANCE = 1,
        /**
         * Indicates multi app mode with type of appClone
         *
         * @syscap SystemCapability.BundleManager.BundleFramework.Core
         * @since 12
        */
        APP_CLONE = 2
    }
    /**
     * Obtains own bundleInfo.
     *
     * @param { number } bundleFlags - Indicates the flag used to specify information contained in the BundleInfo objects that will be returned.
     * @returns { Promise<BundleInfo> } The result of getting the bundle info.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Obtains own bundleInfo.
     *
     * @param { number } bundleFlags - Indicates the flag used to specify information contained in the BundleInfo objects that will be returned.
     * @returns { Promise<BundleInfo> } The result of getting the bundle info.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    function getBundleInfoForSelf(bundleFlags: number): Promise<BundleInfo>;
    /**
     * Obtains own bundleInfo.
     *
     * @param { number } bundleFlags - Indicates the flag used to specify information contained in the BundleInfo objects that will be returned.
     * @param { AsyncCallback<BundleInfo> } callback - The callback of getting bundle info result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Obtains own bundleInfo.
     *
     * @param { number } bundleFlags - Indicates the flag used to specify information contained in the BundleInfo objects that will be returned.
     * @param { AsyncCallback<BundleInfo> } callback - The callback of getting bundle info result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    function getBundleInfoForSelf(bundleFlags: number, callback: AsyncCallback<BundleInfo>): void;
    /**
     * Obtains own bundleInfo.
     *
     * @param { number } bundleFlags - Indicates the flag used to specify information contained in the BundleInfo objects that will be returned.
     * @returns { BundleInfo } The result of getting the bundle info.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 10
     */
    /**
     * Obtains own bundleInfo.
     *
     * @param { number } bundleFlags - Indicates the flag used to specify information contained in the BundleInfo objects that will be returned.
     * @returns { BundleInfo } The result of getting the bundle info.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    function getBundleInfoForSelfSync(bundleFlags: number): BundleInfo;
    /**
     * Obtains the profile designated by metadata name, abilityName and moduleName from the current application.
     *
     * @param { string } moduleName - Indicates the moduleName of the application.
     * @param { string } abilityName - Indicates the abilityName of the application.
     * @param { string } metadataName - Indicates the name of metadata in ability.
     * @param { AsyncCallback<Array<string>> } callback - The callback of returning string in json-format of the corresponding config file.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700002 - The specified moduleName is not existed.
     * @throws { BusinessError } 17700003 - The specified abilityName is not existed.
     * @throws { BusinessError } 17700024 - Failed to get the profile because there is no profile in the HAP.
     * @throws { BusinessError } 17700026 - The specified bundle is disabled.
     * @throws { BusinessError } 17700029 - The specified ability is disabled.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Obtains the profile designated by metadata name, abilityName and moduleName from the current application.
     *
     * @param { string } moduleName - Indicates the moduleName of the application.
     * @param { string } abilityName - Indicates the abilityName of the application.
     * @param { string } metadataName - Indicates the name of metadata in ability.
     * @param { AsyncCallback<Array<string>> } callback - The callback of returning string in json-format of the corresponding config file.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700002 - The specified moduleName is not existed.
     * @throws { BusinessError } 17700003 - The specified abilityName is not existed.
     * @throws { BusinessError } 17700024 - Failed to get the profile because there is no profile in the HAP.
     * @throws { BusinessError } 17700026 - The specified bundle is disabled.
     * @throws { BusinessError } 17700029 - The specified ability is disabled.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    function getProfileByAbility(moduleName: string, abilityName: string, metadataName: string, callback: AsyncCallback<Array<string>>): void;
    /**
     * Obtains the profile designated by metadata name, abilityName and moduleName from the current application.
     *
     * @param { string } moduleName - Indicates the moduleName of the application.
     * @param { string } abilityName - Indicates the abilityName of the application.
     * @param { string } metadataName - Indicates the name of metadata in ability.
     * @returns { Promise<Array<string>> } Returns string in json-format of the corresponding config file.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700002 - The specified moduleName is not existed.
     * @throws { BusinessError } 17700003 - The specified abilityName is not existed.
     * @throws { BusinessError } 17700024 - Failed to get the profile because there is no profile in the HAP.
     * @throws { BusinessError } 17700026 - The specified bundle is disabled.
     * @throws { BusinessError } 17700029 - The specified ability is disabled.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Obtains the profile designated by metadata name, abilityName and moduleName from the current application.
     *
     * @param { string } moduleName - Indicates the moduleName of the application.
     * @param { string } abilityName - Indicates the abilityName of the application.
     * @param { string } metadataName - Indicates the name of metadata in ability.
     * @returns { Promise<Array<string>> } Returns string in json-format of the corresponding config file.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700002 - The specified moduleName is not existed.
     * @throws { BusinessError } 17700003 - The specified abilityName is not existed.
     * @throws { BusinessError } 17700024 - Failed to get the profile because there is no profile in the HAP.
     * @throws { BusinessError } 17700026 - The specified bundle is disabled.
     * @throws { BusinessError } 17700029 - The specified ability is disabled.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    function getProfileByAbility(moduleName: string, abilityName: string, metadataName?: string): Promise<Array<string>>;
    /**
     * Obtains the profile designated by metadata name, abilityName and moduleName from the current application.
     *
     * @param { string } moduleName - Indicates the moduleName of the application.
     * @param { string } abilityName - Indicates the abilityName of the application.
     * @param { string } metadataName - Indicates the name of metadata in ability.
     * @returns { Array<string> } Returns string in json-format of the corresponding config file.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700002 - The specified moduleName is not existed.
     * @throws { BusinessError } 17700003 - The specified abilityName is not existed.
     * @throws { BusinessError } 17700024 - Failed to get the profile because there is no profile in the HAP.
     * @throws { BusinessError } 17700026 - The specified bundle is disabled.
     * @throws { BusinessError } 17700029 - The specified ability is disabled.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 10
     */
    /**
     * Obtains the profile designated by metadata name, abilityName and moduleName from the current application.
     *
     * @param { string } moduleName - Indicates the moduleName of the application.
     * @param { string } abilityName - Indicates the abilityName of the application.
     * @param { string } metadataName - Indicates the name of metadata in ability.
     * @returns { Array<string> } Returns string in json-format of the corresponding config file.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700002 - The specified moduleName is not existed.
     * @throws { BusinessError } 17700003 - The specified abilityName is not existed.
     * @throws { BusinessError } 17700024 - Failed to get the profile because there is no profile in the HAP.
     * @throws { BusinessError } 17700026 - The specified bundle is disabled.
     * @throws { BusinessError } 17700029 - The specified ability is disabled.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    function getProfileByAbilitySync(moduleName: string, abilityName: string, metadataName?: string): Array<string>;
    /**
     * Obtains the profile designated by metadata name, extensionAbilityName and moduleName from the current application.
     *
     * @param { string } moduleName - Indicates the moduleName of the application.
     * @param { string } extensionAbilityName - Indicates the extensionAbilityName of the application.
     * @param { string } metadataName - Indicates the name of metadata in ability.
     * @param { AsyncCallback<Array<string>> } callback - The callback of returning string in json-format of the corresponding config file.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700002 - The specified moduleName is not existed.
     * @throws { BusinessError } 17700003 - The specified extensionAbilityName not existed.
     * @throws { BusinessError } 17700024 - Failed to get the profile because there is no profile in the HAP.
     * @throws { BusinessError } 17700026 - The specified bundle is disabled.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Obtains the profile designated by metadata name, extensionAbilityName and moduleName from the current application.
     *
     * @param { string } moduleName - Indicates the moduleName of the application.
     * @param { string } extensionAbilityName - Indicates the extensionAbilityName of the application.
     * @param { string } metadataName - Indicates the name of metadata in ability.
     * @param { AsyncCallback<Array<string>> } callback - The callback of returning string in json-format of the corresponding config file.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700002 - The specified moduleName is not existed.
     * @throws { BusinessError } 17700003 - The specified extensionAbilityName not existed.
     * @throws { BusinessError } 17700024 - Failed to get the profile because there is no profile in the HAP.
     * @throws { BusinessError } 17700026 - The specified bundle is disabled.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    function getProfileByExtensionAbility(moduleName: string, extensionAbilityName: string, metadataName: string, callback: AsyncCallback<Array<string>>): void;
    /**
     * Obtains the profile designated by metadata name, extensionAbilityName and moduleName from the current application.
     *
     * @param { string } moduleName - Indicates the moduleName of the application.
     * @param { string } extensionAbilityName - Indicates the extensionAbilityName of the application.
     * @param { string } metadataName - Indicates the name of metadata in ability.
     * @returns { Promise<Array<string>> } Returns string in json-format of the corresponding config file.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700002 - The specified moduleName is not existed.
     * @throws { BusinessError } 17700003 - The specified extensionAbilityName not existed.
     * @throws { BusinessError } 17700024 - Failed to get the profile because there is no profile in the HAP.
     * @throws { BusinessError } 17700026 - The specified bundle is disabled.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Obtains the profile designated by metadata name, extensionAbilityName and moduleName from the current application.
     *
     * @param { string } moduleName - Indicates the moduleName of the application.
     * @param { string } extensionAbilityName - Indicates the extensionAbilityName of the application.
     * @param { string } metadataName - Indicates the name of metadata in ability.
     * @returns { Promise<Array<string>> } Returns string in json-format of the corresponding config file.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700002 - The specified moduleName is not existed.
     * @throws { BusinessError } 17700003 - The specified extensionAbilityName not existed.
     * @throws { BusinessError } 17700024 - Failed to get the profile because there is no profile in the HAP.
     * @throws { BusinessError } 17700026 - The specified bundle is disabled.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    function getProfileByExtensionAbility(moduleName: string, extensionAbilityName: string, metadataName?: string): Promise<Array<string>>;
    /**
     * Obtains the profile designated by metadata name, extensionAbilityName and moduleName from the current application.
     *
     * @param { string } moduleName - Indicates the moduleName of the application.
     * @param { string } extensionAbilityName - Indicates the extensionAbilityName of the application.
     * @param { string } metadataName - Indicates the name of metadata in ability.
     * @returns { Array<string> } Returns string in json-format of the corresponding config file.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700002 - The specified moduleName is not existed.
     * @throws { BusinessError } 17700003 - The specified extensionAbilityName not existed.
     * @throws { BusinessError } 17700024 - Failed to get the profile because there is no profile in the HAP.
     * @throws { BusinessError } 17700026 - The specified bundle is disabled.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 10
     */
    /**
     * Obtains the profile designated by metadata name, extensionAbilityName and moduleName from the current application.
     *
     * @param { string } moduleName - Indicates the moduleName of the application.
     * @param { string } extensionAbilityName - Indicates the extensionAbilityName of the application.
     * @param { string } metadataName - Indicates the name of metadata in ability.
     * @returns { Array<string> } Returns string in json-format of the corresponding config file.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700002 - The specified moduleName is not existed.
     * @throws { BusinessError } 17700003 - The specified extensionAbilityName not existed.
     * @throws { BusinessError } 17700024 - Failed to get the profile because there is no profile in the HAP.
     * @throws { BusinessError } 17700026 - The specified bundle is disabled.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    function getProfileByExtensionAbilitySync(moduleName: string, extensionAbilityName: string, metadataName?: string): Array<string>;
    /**
     * Verifies the validity of .abc files. Only .abc files passed the verification can run on the restricted VM.
     *
     * @permission ohos.permission.RUN_DYN_CODE
     * @param { Array<string> } abcPaths - The abc path.
     * @param { boolean } deleteOriginalFiles - Used to decide whether to delete the original files.
     * @param { AsyncCallback<void> } callback - Indicates the callback of verifyAbc result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700201 - Failed to verify the abc file.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 11
     */
    function verifyAbc(abcPaths: Array<string>, deleteOriginalFiles: boolean, callback: AsyncCallback<void>): void;
    /**
     * Verifies the validity of .abc files. Only .abc files passed the verification can run on the restricted VM.
     *
     * @permission ohos.permission.RUN_DYN_CODE
     * @param { Array<string> } abcPaths - The abc path.
     * @param { boolean } deleteOriginalFiles - Used to decide whether to delete the original files.
     * @returns { Promise<void> } Returns verifyAbc result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700201 - Failed to verify the abc file.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 11
     */
    function verifyAbc(abcPaths: Array<string>, deleteOriginalFiles: boolean): Promise<void>;
    /**
     * Delete the verified .abc file.
     *
     * @permission ohos.permission.RUN_DYN_CODE
     * @param { string } abcPath - The abc path.
     * @returns { Promise<void> } Returns deleteAbc result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700202 - Failed to delete the abc file.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 11
     */
    function deleteAbc(abcPath: string): Promise<void>;
    /**
     * Check whether the link can be opened.
     *
     * @param { string } link - Indicates the link to be opened.
     * @returns { boolean } Returns true if the link can be opened; returns false otherwise.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
     * @throws { BusinessError } 17700055 - The specified link is invalid.
     * @throws { BusinessError } 17700056 - The scheme of the specified link is not in the querySchemes.
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 12
     */
    function canOpenLink(link: string): boolean;
    /**
     * Obtains configuration information about an application.
     *
     * @typedef { _ApplicationInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Obtains configuration information about an application.
     *
     * @typedef { _ApplicationInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export type ApplicationInfo = _ApplicationInfo;
    /**
     * Indicates the metadata information about a module.
     *
     * @typedef { _ModuleMetadata }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 10
     */
    /**
     * Indicates the metadata information about a module.
     *
     * @typedef { _ModuleMetadata }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export type ModuleMetadata = _ModuleMetadata;
    /**
     * Indicates the Metadata.
     *
     * @typedef { _Metadata }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the Metadata.
     *
     * @typedef { _Metadata }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export type Metadata = _Metadata;
    /**
     * Obtains configuration information about a bundle.
     *
     * @typedef { _BundleInfo.BundleInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Obtains configuration information about a bundle.
     *
     * @typedef { _BundleInfo.BundleInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export type BundleInfo = _BundleInfo.BundleInfo;
    /**
     * The scene which is used.
     *
     * @typedef { _BundleInfo.UsedScene }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * The scene which is used.
     *
     * @typedef { _BundleInfo.UsedScene }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export type UsedScene = _BundleInfo.UsedScene;
    /**
     * Indicates the required permissions details defined in file config.json.
     *
     * @typedef { _BundleInfo.ReqPermissionDetail }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the required permissions details defined in file config.json.
     *
     * @typedef { _BundleInfo.ReqPermissionDetail }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export type ReqPermissionDetail = _BundleInfo.ReqPermissionDetail;
    /**
     * Indicates the SignatureInfo.
     *
     * @typedef { _BundleInfo.SignatureInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Indicates the SignatureInfo.
     *
     * @typedef { _BundleInfo.SignatureInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export type SignatureInfo = _BundleInfo.SignatureInfo;
    /**
     * Obtains configuration information about a module.
     *
     * @typedef { _HapModuleInfo.HapModuleInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Obtains configuration information about a module.
     *
     * @typedef { _HapModuleInfo.HapModuleInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export type HapModuleInfo = _HapModuleInfo.HapModuleInfo;
    /**
     * Obtains preload information about a module.
     *
     * @typedef { _HapModuleInfo.PreloadItem }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Obtains preload information about a module.
     *
     * @typedef { _HapModuleInfo.PreloadItem }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export type PreloadItem = _HapModuleInfo.PreloadItem;
    /**
     * Obtains dependency information about a module.
     *
     * @typedef { _HapModuleInfo.Dependency }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Obtains dependency information about a module.
     *
     * @typedef { _HapModuleInfo.Dependency }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export type Dependency = _HapModuleInfo.Dependency;
    /**
     * Obtains the router item about a module.
     *
     * @typedef { _HapModuleInfo.RouterItem}
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 12
     */
    export type RouterItem = _HapModuleInfo.RouterItem;
    /**
     * Obtains the data item within router item.
     *
     * @typedef { _HapModuleInfo.DataItem }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 12
     */
    export type DataItem = _HapModuleInfo.DataItem;
    /**
     * Obtains configuration information about an ability.
     *
     * @typedef { _AbilityInfo.AbilityInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Obtains configuration information about an ability.
     *
     * @typedef { _AbilityInfo.AbilityInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export type AbilityInfo = _AbilityInfo.AbilityInfo;
    /**
     * Contains basic Ability information. Indicates the window size..
     *
     * @typedef { _AbilityInfo.WindowSize }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Contains basic Ability information. Indicates the window size..
     *
     * @typedef { _AbilityInfo.WindowSize }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export type WindowSize = _AbilityInfo.WindowSize;
    /**
     * Obtains extension information about a bundle.
     *
     * @typedef { _ExtensionAbilityInfo.ExtensionAbilityInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Obtains extension information about a bundle.
     *
     * @typedef { _ExtensionAbilityInfo.ExtensionAbilityInfo }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export type ExtensionAbilityInfo = _ExtensionAbilityInfo.ExtensionAbilityInfo;
    /**
     * Contains basic Ability information, which uniquely identifies an ability.
     *
     * @typedef { _ElementName }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    /**
     * Contains basic Ability information, which uniquely identifies an ability.
     *
     * @typedef { _ElementName }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 11
     */
    export type ElementName = _ElementName;
    /**
     * Obtains configuration information about an skill
     *
     * @typedef { _Skill.Skill }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 12
     */
    export type Skill = _Skill.Skill;
    /**
     * Obtains configuration information about an skillUri
     *
     * @typedef { _Skill.SkillUri }
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @atomicservice
     * @since 12
     */
    export type SkillUrl = _Skill.SkillUri;
}
export default bundleManager;
