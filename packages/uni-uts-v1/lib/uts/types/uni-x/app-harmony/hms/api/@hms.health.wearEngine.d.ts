/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file This module provides the capability to share app features and services between phones and wearable devices.
 * @kit WearEngine
 * @bundle com.huawei.hmos.health.kit/WearEngine/ets/Index 5.0.0(12)
 */
import { AsyncCallback, Callback } from '@ohos.base';
import common from '@ohos.app.ability.common';
import fs from '@ohos.file.fs';
/**
 * This module provides wear engine abilities.
 *
 * @namespace wearEngine
 * @syscap SystemCapability.Health.WearEngine
 * @stagemodelonly
 * @since 5.0.0(12)
 */
declare namespace wearEngine {
    /**
     * Wear Engine capability enumeration.
     *
     * @enum { number }
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    enum WearEngineCapability {
        /**
         * Capability of P2P communication.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        P2P_COMMUNICATION = 1,
        /**
         * Capability of querying and monitoring device status.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        MONITOR = 2,
        /**
         * Capability of sending templated notification to the remote device.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        NOTIFICATION = 3,
        /**
         * Capability of obtaining sensor data from the remote device.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        SENSOR = 4
    }
    /**
     * Device capability enumeration.
     *
     * @enum {number}
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    enum DeviceCapability {
        /**
         * Capability of supporting application installation.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        APP_INSTALLATION = 14,
        /**
         * Capability of supporting Cognitive Behavioral Therapy for Insomnia.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        CBT_I = 128
    }
    /**
     * Device category.
     *
     * @enum {number}
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    enum DeviceCategory {
        /**
         * Phone or tablet.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        DEFAULT = 1,
        /**
         * Watch.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        WATCH = 2,
        /**
         * Band.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        BAND = 3,
        /**
         * Other devices.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        OTHER_DEVICES = 255
    }
    /**
     * Device information interface.
     *
     * @typedef Device
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface Device {
        /**
         * Random identifier of a device, which is used to identify a remote device in wear engine, changes after each rebinding.
         *
         * @type { string }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        randomId: string;
        /**
         * Device category.
         *
         * @type { ?DeviceCategory }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        category?: DeviceCategory;
        /**
         * Device name.
         *
         * @type { ?string }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        name?: string;
        /**
         * Device software version.
         *
         * @type { ?string }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        softwareVersion?: string;
        /**
         * Device model.
         *
         * @type { ?string }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        model?: string;
        /**
         * Whether the device is a smartwatch.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        isSmartWatch?: boolean;
        /**
         * Check whether the wear engine capability is supported.
         *
         * @param { WearEngineCapability } capability - Indicates wear engine capability.
         * @returns { Promise<boolean> } Promise used to return a boolean result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        isWearEngineCapabilitySupported(capability: WearEngineCapability): Promise<boolean>;
        /**
         * Check whether the device capability is supported.
         *
         * @param { DeviceCapability } capability - Indicates device capability.
         * @returns { Promise<boolean> } Promise used to return a boolean result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        isDeviceCapabilitySupported(capability: DeviceCapability): Promise<boolean>;
        /**
         * Get device serial number. Permission {@link Permission#DEVICE_IDENTIFIER} is required for invoking this interface.
         *
         * @returns { Promise<string> } Promise used to return the device serial number.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500005 - The HUAWEI ID is not authorized.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        getSerialNumber(): Promise<string>;
    }
    /**
     * Interface for obtaining device information.
     *
     * @typedef DeviceClient
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface DeviceClient {
        /**
         * Obtains the connected devices that supports wear engine capability.
         *
         * @returns { Promise<Device[]> } Promise used to return device list.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        getConnectedDevices(): Promise<Device[]>;
    }
    /**
     * Application Information.
     *
     * @typedef AppInfo
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface AppInfo {
        /**
         * Bundle name.
         *
         * @type { string }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        bundleName: string;
        /**
         * Fingerprint of the certificate.
         *
         * @type { string }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        fingerprint: string;
    }
    /**
     * P2P communication result code.
     *
     * @enum {number}
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    enum P2pResultCode {
        /**
         * The application on the remote device is not installed.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        REMOTE_APP_NOT_INSTALLED = 200,
        /**
         * The application on the remote device is not running.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        REMOTE_APP_NOT_RUNNING = 201,
        /**
         * The application on the remote device is running.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        REMOTE_APP_RUNNING = 202,
        /**
         * Unknown error.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        UNKNOWN_ERROR = 203,
        /**
         * Communication fail.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        COMMUNICATION_FAILURE = 206,
        /**
         * Communication succeed.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        COMMUNICATION_SUCCESS = 207
    }
    /**
     * P2P communication result.
     *
     * @typedef P2pResult
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface P2pResult {
        /**
         * Result code, the value is {@link P2pResultCode}.
         *
         * @type { ?number }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        code?: number;
        /**
         * File sending progress, which is reported for multiple times during file sending.
         *
         * @type { ?number }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        progress?: number;
    }
    /**
     * Message sent by the local app.
     *
     * @typedef P2pMessage
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface P2pMessage {
        /**
         * Message content.
         *
         * @type { Uint8Array }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        content: Uint8Array;
    }
    /**
     * File sent by the local app.
     *
     * @typedef P2pFile
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface P2pFile {
        /**
         * File object. Caller need to close the file when finished using it.
         *
         * @type { fs.File }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        file: fs.File;
    }
    /**
     * Application-related parameters for P2P communication.
     *
     * @typedef P2pAppParam
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface P2pAppParam {
        /**
         * Application information on the wearable device.
         *
         * @type { AppInfo }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        remoteApp: AppInfo;
        /**
         * Specifies whether to convert the local app bundle name and signature to the corresponding other package name
         * and signature for communication with the remote app on the wearable devices that on the market.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        transformLocalAppInfo?: boolean;
    }
    /**
     * Interface for P2P communication.
     *
     * @typedef P2pClient
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface P2pClient {
        /**
         * Checks whether the remote application is installed.
         *
         * @param { string } deviceRandomId - Indicates the remote device used for communication, the value is {@link Device#randomId}.
         * @param { string } remoteBundleName - Bundle name of the application on the remote device.
         * @returns { Promise<boolean> } Promise used to return whether the application is installed on the remote device.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500005 - The HUAWEI ID is not authorized.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008500010 - Device ID is invalid.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        isRemoteAppInstalled(deviceRandomId: string, remoteBundleName: string): Promise<boolean>;
        /**
         * Obtains the version code of the application on the remote device.
         *
         * @param { string } deviceRandomId - Indicates the remote device used for communication, the value is {@link Device#randomId}.
         * @param { string } remoteBundleName - Bundle name of the application on the remote device.
         * @returns { Promise<number> } Promise used to return the version code.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500005 - The HUAWEI ID is not authorized.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008500010 - Device ID is invalid.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        getRemoteAppVersion(deviceRandomId: string, remoteBundleName: string): Promise<number>;
        /**
         * Starts the application on the remote device.
         *
         * @param { string } deviceRandomId - Indicates the remote device used for communication, the value is {@link Device#randomId}.
         * @param { string } remoteBundleName - Bundle name of the application on the remote device.
         * @param { boolean } [transformLocalBundleName] - Specifies whether to convert the local app bundle name to the
         *                                                 corresponding other package name.
         * @returns { Promise<P2pResult> } Promise used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500005 - The HUAWEI ID is not authorized.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008500010 - Device ID is invalid.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        startRemoteApp(deviceRandomId: string, remoteBundleName: string, transformLocalBundleName?: boolean): Promise<P2pResult>;
        /**
         * Sends message to the application on the remote device.
         *
         * @param { string } deviceRandomId - Indicates the remote device used for communication, the value is {@link Device#randomId}.
         * @param { P2pAppParam } appParam - Application-related parameters for P2P communication.
         * @param { P2pMessage } message - Message sent by the local application to the remote application.
         * @returns { Promise<P2pResult> } Promise used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500005 - The HUAWEI ID is not authorized.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008500010 - Device ID is invalid.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        sendMessage(deviceRandomId: string, appParam: P2pAppParam, message: P2pMessage): Promise<P2pResult>;
        /**
         * Sends file to the application on the remote device.
         *
         * @param { string } deviceRandomId - Indicates the remote device used for communication, the value is {@link Device#randomId}.
         * @param { P2pAppParam } appParam - Application-related parameters for P2P communication.
         * @param { P2pFile } file - File sent by the local application to the remote application.
         * @param { AsyncCallback<P2pResult> } callback - Callback used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500005 - The HUAWEI ID is not authorized.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008500010 - Device ID is invalid.
         * @throws { BusinessError } 1008500011 - File is invalid.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        transferFile(deviceRandomId: string, appParam: P2pAppParam, file: P2pFile, callback: AsyncCallback<P2pResult>): void;
        /**
         * Cancels sending file to the application on the remote device.
         *
         * @param { string } deviceRandomId - Indicates the remote device used for communication, the value is {@link Device#randomId}.
         * @param { P2pAppParam } appParam - Application-related parameters for P2P communication.
         * @param { P2pFile } file - File sent by the local application to the remote application.
         * @returns { Promise<P2pResult> } Promise used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500005 - The HUAWEI ID is not authorized.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008500010 - Device ID is invalid.
         * @throws { BusinessError } 1008500011 - File is invalid.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        cancelFileTransfer(deviceRandomId: string, appParam: P2pAppParam, file: P2pFile): Promise<P2pResult>;
        /**
         * Registers a receiver for messages sent by applications on the remote device.
         *
         * @param { string } deviceRandomId - Indicates the remote device used for communication, the value is {@link Device#randomId}.
         * @param { P2pAppParam } appParam - Application-related parameters for P2P communication.
         * @param { Callback<P2pMessage> } callback - Callback for receiving messages.
         * @returns { Promise<void> } Promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500005 - The HUAWEI ID is not authorized.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008500010 - Device ID is invalid.
         * @throws { BusinessError } 1008500012 - Too many callbacks of the same type.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        registerMessageReceiver(deviceRandomId: string, appParam: P2pAppParam, callback: Callback<P2pMessage>): Promise<void>;
        /**
         * Registers a receiver for files sent by applications on the remote device.
         *
         * @param { string } deviceRandomId - Indicates the remote device used for communication, the value is {@link Device#randomId}.
         * @param { P2pAppParam } appParam - Application-related parameters for P2P communication.
         * @param { Callback<P2pFile> } callback - Callback for receiving files.
         * @returns { Promise<void> } Promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500005 - The HUAWEI ID is not authorized.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008500010 - Device ID is invalid.
         * @throws { BusinessError } 1008500012 - Too many callbacks of the same type.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        registerFileReceiver(deviceRandomId: string, appParam: P2pAppParam, callback: Callback<P2pFile>): Promise<void>;
        /**
         * Unregisters the receiver for messages sent by applications on the remote device.
         *
         * @param { string } deviceRandomId - Indicates the remote device used for communication, the value is {@link Device#randomId}.
         * @param { P2pAppParam } appParam - Application-related parameters for P2P communication.
         * @param { Callback<P2pMessage> } callback - Callback for receiving messages.
         * @returns { Promise<void> } Promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500005 - The HUAWEI ID is not authorized.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008500010 - Device ID is invalid.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        unregisterMessageReceiver(deviceRandomId: string, appParam: P2pAppParam, callback: Callback<P2pMessage>): Promise<void>;
        /**
         * Unregisters the receiver for files sent by applications on the remote device.
         *
         * @param { string } deviceRandomId - Indicates the remote device used for communication, the value is {@link Device#randomId}.
         * @param { P2pAppParam } appParam - Application-related parameters for P2P communication.
         * @param { Callback<P2pFile> } callback - Callback for receiving files.
         * @returns { Promise<void> } Promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500005 - The HUAWEI ID is not authorized.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008500010 - Device ID is invalid.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        unregisterFileReceiver(deviceRandomId: string, appParam: P2pAppParam, callback: Callback<P2pFile>): Promise<void>;
    }
    /**
     * Device status that can be queried.
     *
     * @enum { string }
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    enum MonitorItem {
        /**
         * Wearing status.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        WEAR_STATUS = 'wearStatus',
        /**
         * Battery level.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        POWER_STATUS = 'powerStatus',
        /**
         * Charging Status.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        CHARGE_STATUS = 'chargeStatus',
        /**
         * Available storage space.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        AVAILABLE_STORAGE_SPACE = 'availableStorageSpace',
        /**
         * Power mode.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        POWER_MODE = 'powerMode'
    }
    /**
     * Event types that support subscription.
     *
     * @enum { string }
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    enum MonitorEvent {
        /**
         * This event means when the device connection status is changed.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        EVENT_CONNECTION_STATUS_CHANGED = 'connectionStatus',
        /**
         * This event means when the battery power of the device is reduced by 1 percent.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        EVENT_BATTERY_LEVEL_DROPPED = 'lowPower',
        /**
         * This event means when the wear status of the device is changed.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        EVENT_WEAR_STATUS_CHANGED = 'wearStatus',
        /**
         * This event means when the user of device has a heart rate alarm.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        EVENT_HEART_RATE_ALARM = 'heartRateAlarm',
        /**
         * This event means when the charging status of the device is changed.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        EVENT_CHARGE_STATUS_CHANGED = 'chargeStatus',
        /**
         * This event means when the power mode of the device is changed.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        EVENT_POWER_MODE_CHANGED = 'powerMode'
    }
    /**
     * Data of the device status.
     *
     * @typedef MonitorData
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface MonitorData {
        /**
         * Result code.
         *
         * @type { number }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        code: number;
        /**
         * Result data.
         *
         * @type { ?string }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        data?: string;
    }
    /**
     * Data of the event.
     *
     * @typedef MonitorEventData
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface MonitorEventData {
        /**
         * Event type.
         *
         * @type { MonitorEvent }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        event: MonitorEvent;
        /**
         * Data of the device status.
         *
         * @type { MonitorData }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        data: MonitorData;
    }
    /**
     * Interface for subscribing to and querying device status.
     *
     * @typedef MonitorClient
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface MonitorClient {
        /**
         * Queries the device status.
         *
         * @param { string } deviceRandomId - Indicates the remote device used for communication, the value is {@link Device#randomId}.
         * @param { MonitorItem } item - Device status that can be queried.
         * @returns { Promise<MonitorData> } Promise used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500005 - The HUAWEI ID is not authorized.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008500010 - Device ID is invalid.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        queryStatus(deviceRandomId: string, item: MonitorItem): Promise<MonitorData>;
        /**
         * Subscribes event of the device.
         *
         * @param { string } deviceRandomId - Indicates the remote device used for communication, the value is {@link Device#randomId}.
         * @param { MonitorEvent } type - Event type.
         * @param { Callback<MonitorEventData> } callback - Callback to return the event data.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500005 - The HUAWEI ID is not authorized.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008500010 - Device ID is invalid.
         * @throws { BusinessError } 1008500012 - Too many callbacks of the same type.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        subscribeEvent(deviceRandomId: string, type: MonitorEvent, callback: Callback<MonitorEventData>): Promise<void>;
        /**
         * Unsubscribes event of the device.
         *
         * @param { string } deviceRandomId - Indicates the remote device used for communication, the value is {@link Device#randomId}.
         * @param { MonitorEvent } type - Event type.
         * @param { Callback<MonitorEventData> } callback - Callback to return the event data.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500005 - The HUAWEI ID is not authorized.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008500010 - Device ID is invalid.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        unsubscribeEvent(deviceRandomId: string, type: MonitorEvent, callback: Callback<MonitorEventData>): Promise<void>;
    }
    /**
     * Notification type.
     *
     * @enum { number }
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    enum NotificationType {
        /**
         * Notification without buttons.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        NOTIFICATION_WITHOUT_BUTTONS = 50,
        /**
         * Notification with one buttons.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        NOTIFICATION_WITH_ONE_BUTTON = 51,
        /**
         * Notification with two buttons.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        NOTIFICATION_WITH_TWO_BUTTONS = 52,
        /**
         * Notification with three buttons.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        NOTIFICATION_WITH_THREE_BUTTONS = 53
    }
    /**
     * Identifiers for different buttons.
     *
     * @enum { string }
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    enum ButtonId {
        /**
         * This identifier indicates the first button.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        FIRST_BUTTON = 'firstButton',
        /**
         * This identifier indicates the second button.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        SECOND_BUTTON = 'secondButton',
        /**
         * This identifier indicates the third button.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        THIRD_BUTTON = 'thirdButton'
    }
    /**
     * Notification button information.
     *
     * @typedef NotificationButton
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface NotificationButton {
        /**
         * Button identity.
         *
         * @type { ButtonId }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        buttonId: ButtonId;
        /**
         * Button content.
         *
         * @type { string }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        content: string;
    }
    /**
     * Notification information.
     *
     * @typedef Notification
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface Notification {
        /**
         * Notification type.
         *
         * @type { NotificationType }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        type: NotificationType;
        /**
         * Bundle name.
         *
         * @type { string }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        bundleName: string;
        /**
         * Notification title.
         *
         * @type { string }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        title: string;
        /**
         * Notification text.
         *
         * @type { string }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        text: string;
        /**
         * Notification buttons.
         *
         * @type { ?NotificationButton[] }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        buttons?: NotificationButton[];
    }
    /**
     * Actions the user can take on the notification.
     *
     * @enum { number }
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    enum NotificationAction {
        /**
         * The notification is switched to the background.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        NOTIFICATION_SWITCHED_TO_BACKGROUND = 0,
        /**
         * The notification is deleted.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        NOTIFICATION_DELETED = 1,
        /**
         * The first button of the notification is clicked.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        FIRST_BUTTON_CLICKED = 2,
        /**
         * The second button of the notification is clicked.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        SECOND_BUTTON_CLICKED = 3,
        /**
         * The third button of the notification is clicked.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        THIRD_BUTTON_CLICKED = 4
    }
    /**
     * Notification error code.
     *
     * @enum { number }
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    enum NotificationErrorCode {
        /**
         * Internal error.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        INTERNAL_ERROR = 255
    }
    /**
     * Feedback after the user performs an operation on the notification on the remote device.
     *
     * @typedef NotificationFeedback
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface NotificationFeedback {
        /**
         * The action the user takes on the notification.
         *
         * @type { ?NotificationAction }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        action?: NotificationAction;
        /**
         * Error code, the value is {@link NotificationErrorCode}.
         *
         * @type { ?number }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        errorCode?: number;
    }
    /**
     * As an input parameter when sending a notification to the remote device.
     *
     * @interface NotificationOptions
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface NotificationOptions {
        /**
         * Notification information.
         *
         * @type { Notification }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        notification: Notification;
        /**
         * Callback triggered after a user performs an operation on a notification on the remote device.
         *
         * @param { NotificationFeedback } feedback - Indicates the Feedback after the user performs an operation on the
         *     notification on the remote device.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        onAction(feedback: NotificationFeedback): void;
    }
    /**
     * Interface for sending templated notifications.
     *
     * @typedef NotifyClient
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface NotifyClient {
        /**
         * Send templated notification to device.
         *
         * @param { string } deviceRandomId - Indicates the remote device used for communication, the value is {@link Device#randomId}.
         * @param { NotificationOptions } options - Input parameter when sending a notification.
         * @returns { Promise<void> } Promise used to return whether the notification was successfully sent.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500005 - The HUAWEI ID is not authorized.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008500010 - Device ID is invalid.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        notify(deviceRandomId: string, options: NotificationOptions): Promise<void>;
    }
    /**
     * Sensor Type.
     *
     * @enum { number }
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    enum SensorType {
        /**
         * ECG sensor.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        ELECTROCARDIOGRAPHY = 0,
        /**
         * PPG sensor.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        PHOTOPLETHYSMOGRAPHY = 1,
        /**
         * Acceleration sensor.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        ACCELEROMETER = 2,
        /**
         * Gyroscope sensor.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        GYROSCOPE = 3,
        /**
         * Magnetic field sensor.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        MAGNETIC_FIELD = 4,
        /**
         * Heart rate sensor.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        HEART_RATE = 6
    }
    /**
     * Sensor information.
     *
     * @typedef Sensor
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface Sensor {
        /**
         * Sensor name.
         *
         * @type { string }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        name: string;
        /**
         * Sensor id.
         *
         * @type { number }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        id: number;
        /**
         * Sensor type.
         *
         * @type { SensorType }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        type: SensorType;
        /**
         * Sensor accuracy.
         *
         * @type { ?number }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        accuracy?: number;
        /**
         * Sensor resolution.
         *
         * @type { ?number }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        resolution?: number;
        /**
         * Whether the sensor data support UTC timestamps.
         *
         * @type { boolean }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        isUtcTimestampSupported: boolean;
    }
    /**
     * Sensor data reported by the device.
     *
     * @typedef SensorData
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface SensorData {
        /**
         * Sensor type.
         *
         * @type { SensorType }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        sensorType: SensorType;
        /**
         * Sensor data content.
         *
         * @type { number[] }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        data: number[];
        /**
         * Sensor channel identification.
         *
         * @type { ?number }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        channel?: number;
        /**
         * Sensor data timing timestamp.
         *
         * @type { ?number }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        timestamp?: number;
        /**
         * Sensor data UTC timestamp.
         *
         * @type { ?number }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        utcTimestamp?: number;
    }
    /**
     * Error code when the sensor data reporting is abnormal.
     *
     * @enum { number }
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    enum SensorErrorCode {
        /**
         * The device is not being worn.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        DEVICE_NOT_BEING_WORN = 300,
        /**
         * Device lead off.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        DEVICE_LEAD_OFF = 301,
        /**
         * The sensor on the device is manually turned off.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        SENSOR_TURNED_OFF_MANUALLY = 302,
        /**
         * The sensor on the device is occupied.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        SENSOR_OCCUPIED = 303,
        /**
         * The sensor on the device is not supported.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        SENSOR_NOT_SUPPORTED = 304
    }
    /**
     * Sensor Result.
     *
     * @typedef SensorResult
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface SensorResult {
        /**
         * Sensor Data.
         *
         * @type { ?SensorData[] }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        data?: SensorData[];
        /**
         * Error code, the value is {@link SensorErrorCode}.
         *
         * @type { ?number }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        errorCode?: number;
    }
    /**
     * Interface for obtaining sensor data.
     *
     * @typedef SensorClient
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface SensorClient {
        /**
         * Get available sensors from the remote device.
         *
         * @param { string } deviceRandomId - Indicates the remote device used for communication, the value is {@link Device#randomId}.
         * @returns { Promise<Sensor[]> } Promise used to return available sensors on the device.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500005 - The HUAWEI ID is not authorized.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008500010 - Device ID is invalid.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        getSensorList(deviceRandomId: string): Promise<Sensor[]>;
        /**
         * Subscribe to sensor data from the remote device.
         *
         * @param { string } deviceRandomId - Indicates the remote device used for communication, the value is {@link Device#randomId}.
         * @param { SensorType } type - Sensors type that need to subscribe.
         * @param { Callback<SensorResult> } callback - Callback to return sensor data.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500005 - The HUAWEI ID is not authorized.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008500010 - Device ID is invalid.
         * @throws { BusinessError } 1008500012 - Too many callbacks of the same type.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        subscribeSensor(deviceRandomId: string, type: SensorType, callback: Callback<SensorResult>): Promise<void>;
        /**
         * Unsubscribe to sensor data from the remote device.
         *
         * @param { string } deviceRandomId - Indicates the remote device used for communication, the value is {@link Device#randomId}.
         * @param { SensorType } type - Sensors type that need to subscribe.
         * @param { Callback<SensorResult> } callback - Callback to return sensor data.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500002 - No device is bound.
         * @throws { BusinessError } 1008500003 - Device disconnected.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500005 - The HUAWEI ID is not authorized.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008500010 - Device ID is invalid.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        unsubscribeSensor(deviceRandomId: string, type: SensorType, callback: Callback<SensorResult>): Promise<void>;
    }
    /**
     * Permission.
     *
     * @enum { number }
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    enum Permission {
        /**
         * Permission to obtain user status. For example, the wearing status of the device.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        USER_STATUS = 2,
        /**
         * Permission to obtain motion sensor data from the remote device. For example, the acceleration sensor data.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        MOTION_SENSOR = 3,
        /**
         * Permission to obtain health sensor data from the remote device worn by the user. For example, the heart rate data.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        HEALTH_SENSOR = 4,
        /**
         * Permission to obtain device serial number.
         *
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        DEVICE_IDENTIFIER = 6
    }
    /**
     * Base interface of Authorization.
     *
     * @typedef AuthorizationBase
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface AuthorizationBase {
        /**
         * Permissions.
         *
         * @type { Permission[] }
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        permissions: Permission[];
    }
    /**
     * Request of authorization.
     *
     * @typedef AuthorizationRequest
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface AuthorizationRequest extends AuthorizationBase {
    }
    /**
     * Response of authorization.
     *
     * @typedef AuthorizationResponse
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface AuthorizationResponse extends AuthorizationBase {
    }
    /**
     * Interface for applying authorizations.
     *
     * @typedef AuthClient
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface AuthClient {
        /**
         * Applies for user authorization.
         *
         * @param { AuthorizationRequest } request - Authorization Request.
         * @returns { Promise<AuthorizationResponse> } Promise used to return the permissions granted by the user.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
         *    2. Incorrect parameter types. 3. Parameter verification failed.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        requestAuthorization(request: AuthorizationRequest): Promise<AuthorizationResponse>;
        /**
         * Obtains the permission granted by the user.
         *
         * @returns { Promise<AuthorizationResponse> } Promise used to return the permissions granted by the user.
         * @throws { BusinessError } 1008500001 - Network error. The network is unavailable.
         * @throws { BusinessError } 1008500004 - App has not applied for the Wear Engine service.
         * @throws { BusinessError } 1008500006 - User privacy is not agreed.
         * @throws { BusinessError } 1008500007 - The device capability is not supported.
         * @throws { BusinessError } 1008500008 - Account error. The user has not logged in with HUAWEI ID.
         * @throws { BusinessError } 1008500009 - Account error. Failed to obtain account information with HUAWEI ID.
         * @throws { BusinessError } 1008509999 - Internal error.
         * @syscap SystemCapability.Health.WearEngine
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        getAuthorization(): Promise<AuthorizationResponse>;
    }
    /**
     * Gets interface for obtaining device information.
     *
     * @param { common.Context } context - The context of an ability.
     * @returns { DeviceClient } Interface for obtaining device information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *    2. Incorrect parameter types.
     * @throws { BusinessError } 1008509999 - Internal error.
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    function getDeviceClient(context: common.Context): DeviceClient;
    /**
     * Gets interface for P2P communication.
     *
     * @param { common.Context } context - The context of an ability.
     * @returns { P2pClient } Interface for P2P communication.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *    2. Incorrect parameter types.
     * @throws { BusinessError } 1008509999 - Internal error.
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    function getP2pClient(context: common.Context): P2pClient;
    /**
     * Gets interface for subscribing to and querying device status.
     *
     * @param { common.Context } context - The context of an ability.
     * @returns { MonitorClient } Interface for subscribing to and querying device status.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *    2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1008509999 - Internal error.
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    function getMonitorClient(context: common.Context): MonitorClient;
    /**
     * Gets interface for sending templated notifications.
     *
     * @param { common.Context } context - The context of an ability.
     * @returns { NotifyClient } Interface for sending templated notifications.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *    2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1008509999 - Internal error.
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    function getNotifyClient(context: common.Context): NotifyClient;
    /**
     * Gets interface for obtaining sensor data.
     *
     * @param { common.Context } context - The context of an ability.
     * @returns { SensorClient } Interface for obtaining sensor data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *    2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1008509999 - Internal error.
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    function getSensorClient(context: common.Context): SensorClient;
    /**
     * Gets interface for applying authorizations.
     *
     * @param { common.Context } context - The context of an ability.
     * @returns { AuthClient } Interface for applying authorizations.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *    2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 1008509999 - Internal error.
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    function getAuthClient(context: common.Context): AuthClient;
    /**
     * Subscribes the service destruction event.
     *
     * @param { 'serviceDie' } type - Service destruction event.
     * @param { Callback<void> } callback - Callback to report event.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *    2. Incorrect parameter types.
     * @throws { BusinessError } 1008500012 - Too many callbacks of the same type.
     * @throws { BusinessError } 1008509999 - Internal error.
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    function on(type: 'serviceDie', callback: Callback<void>): void;
    /**
     * Unsubscribes the service destruction event.
     *
     * @param { 'serviceDie' } type - Service destruction event.
     * @param { Callback<void> } [callback] - Callback to report event.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified.
     *    2. Incorrect parameter types.
     * @throws { BusinessError } 1008509999 - Internal error.
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    function off(type: 'serviceDie', callback?: Callback<void>): void;
    /**
     * Destroy the wear engine channel.
     *
     * @returns { Promise<void> } Promise used to return the result.
     * @throws { BusinessError } 1008509999 - Internal error.
     * @syscap SystemCapability.Health.WearEngine
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    function destroy(): Promise<void>;
}
export default wearEngine;
