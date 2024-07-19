/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file
 * @kit ScenarioFusionKit
 */
import window from '@ohos.window';
/**
 * Scenario API
 *
 * @namespace atomicService
 * @syscap SystemCapability.AtomicserviceComponent.atomicservice
 * @StageModelOnly
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace atomicService {
    /**
     * System Settings Properties
     *
     * @typedef SystemSettingInfo
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface SystemSettingInfo {
        /**
         * Bluetooth switch
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        bluetoothEnabled?: boolean;
        /**
         * Location switch
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        locationEnabled?: boolean;
        /**
         * Wi-Fi switch
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        wifiEnabled?: boolean;
        /**
         * Device orientation
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        deviceOrientation?: string;
    }
    /**
     * System Information Properties
     *
     * @typedef SystemInfo
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface SystemInfo {
        /**
         * Device Brand
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        brand?: string;
        /**
         * Device Model
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        deviceModel?: string;
        /**
         * Screen Width
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        screenWidth?: number;
        /**
         * Screen Height
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        screenHeight?: number;
        /**
         * Status bar height
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        statusBarHeight?: number;
        /**
         * Screen security zone
         *
         * @type { window.AvoidArea }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        screenSafeArea?: window.AvoidArea;
        /**
         * Current system language
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        language?: string;
        /**
         * Operating system version
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        osFullName?: string;
        /**
         * System Font Size
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        fontSizeSetting?: number;
        /**
         * SDK Api Version
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        sdkApiVersion?: number;
        /**
         * Bluetooth switch
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        bluetoothEnabled?: boolean;
        /**
         * Location switch
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        locationEnabled?: boolean;
        /**
         * Wi-Fi switch
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        wifiEnabled?: boolean;
        /**
         * Device orientation
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        deviceOrientation?: string;
        /**
         * System current theme
         *
         * @type { ColorMode }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        theme?: ColorMode;
        /**
         * Usable Window Width
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        windowWidth?: number;
        /**
         * Usable Window Height
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.atomicservice
         * @StageModelOnly
         * @atomicservice
         * @since 5.0.0(12)
         */
        windowHeight?: number;
    }
    /**
     * Types of SystemInfo.
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export type SystemInfoType = 
    /**
     * Type for device brand.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
    'brand'
    /**
     * Type for device model.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'deviceModel'
    /**
     * Type for device screen width.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'screenWidth'
    /**
     * Type for device screen height.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'screenHeight'
    /**
     * Type for status bar height.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'statusBarHeight'
    /**
     * Type for device screen security zone.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'screenSafeArea'
    /**
     * Type for system language.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'language'
    /**
     * Type for operating system version.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'osFullName'
    /**
     * Type for system font size.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'fontSizeSetting'
    /**
     * Type for SDK api version.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'sdkApiVersion'
    /**
     * Type for bluetooth switch.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'bluetoothEnabled'
    /**
     * Type for location switch.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'locationEnabled'
    /**
     * Type for Wi-Fi switch.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'wifiEnabled'
    /**
     * Type for device orientation.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'deviceOrientation'
    /**
     * Type for system current theme.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'theme'
    /**
     * Type for device usable window width.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'windowWidth'
    /**
     * Type for device usable window height.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'windowHeight';
    /**
     * Type of SystemSetting.
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export type SystemSettingType = 
    /**
     * Type for bluetooth switch.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
    'bluetoothEnabled'
    /**
     * Type for location switch.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'locationEnabled'
    /**
     * Type for Wi-Fi switch.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'wifiEnabled'
    /**
     * Type for device orientation.
     *
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
     | 'deviceOrientation';
    /**
     * Obtains system information such as the device, network status, screen, language, and theme.
     * @param { Array<SystemInfoType> } properties - Indicates the list of parameters to be obtained. This parameter
     *     can be null or empty.
     * @returns { SystemInfo }
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getSystemInfoSync(properties?: Array<SystemInfoType>): SystemInfo;
    /**
     * Obtains system information such as the device, network status, screen, language, and theme.
     * @param { Array<SystemInfoType> } properties - Indicates the list of parameters to be obtained. This parameter can
     *     be null or empty.
     * @returns { Promise<SystemInfo> }
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getSystemInfo(properties?: Array<SystemInfoType>): Promise<SystemInfo>;
    /**
     * Obtains system information, including Bluetooth, location, Wi-Fi status, and device direction information.
     * @param { Array<SystemSettingType> } properties - Indicates the list of parameters to be obtained. This parameter
     *     can be null or empty.
     * @returns { SystemSettingInfo }
     * @syscap SystemCapability.AtomicserviceComponent.atomicservice
     * @StageModelOnly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getSystemSetting(properties?: Array<SystemSettingType>): SystemSettingInfo;
}
export default atomicService;
