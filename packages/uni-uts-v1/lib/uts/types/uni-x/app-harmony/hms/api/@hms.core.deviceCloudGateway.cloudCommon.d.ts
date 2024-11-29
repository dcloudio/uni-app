/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Defines common parameters for CloudFoundationKit.
 * @kit CloudFoundationKit
 */
import type request from '@ohos.request';
/**
 * This module provides common parameters for cloud development.
 * Cloud resources are connected to AppGallery Connect. Before using the resources, you need to enable the corresponding services.
 *
 * @namespace cloudCommon
 * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace cloudCommon {
    /**
     * Initialize the cloud development instance based on parameters.
     * @param { CloudOptions } [options] - Parameters related to cloud development initialization.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function init(options?: CloudOptions): void;
    /**
     * Initial Configuration.
     * @typedef CloudOptions
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface CloudOptions {
        /**
         * Indicates the resource storage region on the cloud. The default region is China.
         * @type { ?CloudRegion }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        region?: CloudRegion;
        /**
         * Customized authentication credential provider.
         * @type { ?AuthProvider }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        authProvider?: AuthProvider;
        /**
         * Parameters related to cloud function initialization.
         * @type { ?FunctionOptions }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        functionOptions?: FunctionOptions;
        /**
         * Parameters related to cloud storage initialization.
         * @type { ?StorageOptions }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        storageOptions?: StorageOptions;
        /**
         * Parameters related to cloud database initialization.
         * @type { ?DatabaseOptions }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        databaseOptions?: DatabaseOptions;
    }
    /**
     * Custom Authentication Provider.
     * @typedef AuthProvider
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface AuthProvider {
        /**
         * Returns the user credential of the customized authentication system. Each time the system interacts with the cloud,
         *  the system calls this interface to query the credential and carries the credential in the request body.
         * @param { boolean } isForceRefresh - Need to force refresh to return latest user credentials.
         * @returns { Promise<string> } Returns the user credential. It is recommended that the developer cache the credential
         * and ensure that the returned value is valid.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getAccessToken(isForceRefresh: boolean): Promise<string>;
    }
    /**
     * Cloud resource storage zone.
     * @enum { number }
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum CloudRegion {
        /**
         * storage zone: China.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        CHINA = 0,
        /**
         * storage zone: Germany.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        GERMANY = 1,
        /**
         * storage zone: Russian.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        RUSSIA = 2,
        /**
         * storage zone: Singapore.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        SINGAPORE = 3
    }
    /**
     * Initial configuration parameters of the cloud function.
     * @typedef FunctionOptions
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface FunctionOptions {
        /**
         * Function request timeout interval, in milliseconds. The default value is 70*1000.
         * @type { ?number }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        timeout?: number;
    }
    /**
     * Initial configuration parameters of the cloud storage.
     * @typedef StorageOptions
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface StorageOptions {
        /**
         * Indicates task's mode.
         * The default is BACKGROUND.
         * For frontend task, it has callbacks.
         * For background task, it has notifications and fallback.
         *
         * @type { ?request.agent.Mode }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        mode?: request.agent.Mode;
        /**
         * The network.
         *
         * @type { ?request.agent.Network }
         * @default Network.ANY
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        network?: request.agent.Network;
    }
    /**
     * Initial configuration parameters of the cloud database.
     * @typedef DatabaseOptions
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface DatabaseOptions {
        /**
         * Path of the schema configuration file downloaded from the cloud. The default value is the app-schema.json file in the rawfile directory.
         * @type { ?string }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        schema?: string;
        /**
         * User-defined traceId, which is used to trace request operations.
         * @type { ?string }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        traceId?: string;
    }
}
export default cloudCommon;
