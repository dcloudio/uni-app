/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Define cloud function capabilities.
 * @kit CloudFoundationKit
 */
import type { AsyncCallback } from '@ohos.base';
/**
 * This module provides cloud function capabilities.
 * Cloud resources are connected to AppGallery Connect. Before using the resources, you need to enable the corresponding services.
 *
 * @namespace cloudFunction
 * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace cloudFunction {
    /**
     * call the corresponding implementation of the cloud.
     * @permission ohos.permission.INTERNET
     * @param { FunctionParams } parameters - Parameters related to the function.
     * @returns { Promise<FunctionResult> } Result returned by the function.
     * @throws { BusinessError } 201 - No Internet permission.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1008210001 - Network connection error.
     * @throws { BusinessError } 1008210009 - Client internal error.
     * @throws { BusinessError } 1008211001 - Server error.
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function call(parameters: FunctionParams): Promise<FunctionResult>;
    /**
     * call the corresponding implementation of the cloud.
     * @permission ohos.permission.INTERNET
     * @param { FunctionParams } parameters - Parameters related to the function.
     * @param { AsyncCallback<FunctionResult> } callback - Result returned by the function.
     * @throws { BusinessError } 201 - No Internet permission.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1008210001 - Network connection error.
     * @throws { BusinessError } 1008210009 - Client internal error.
     * @throws { BusinessError } 1008211001 - Server error.
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function call(parameters: FunctionParams, callback: AsyncCallback<FunctionResult>): void;
    /**
     * Cloud function invoking parameters.
     * @typedef FunctionParams
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface FunctionParams {
        /**
         * Cloud Function Name.
         * @type { string }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        name: string;
        /**
         * Function request body.
         * @type { ?(string | Object) }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        data?: string | Object;
        /**
         * Cloud function version. The default value is '$latest'. The latest version is supported.
         * @type { ?string }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        version?: string;
        /**
         * Function request timeout interval, in milliseconds. The default value is 70 *1000.
         * @type { ?number }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        timeout?: number;
        /**
         * Function request loading mode.
         * @type { ?LoadMode }
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        loadMode?: LoadMode;
    }
    /**
     * Function request loading mode.
     *
     * @enum { number }
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum LoadMode {
        /**
        * Common Mode.
        * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
        * @stagemodelonly
        * @atomicservice
        * @since 5.0.0(12)
        */
        NORMAL = 0,
        /**
         * Preload Mode.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        PRELOAD = 1
    }
    /**
     * Returned result of invoking the cloud function.
     * @typedef FunctionResult
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface FunctionResult {
        /**
         * Returns the result of a function call.
         * @type { string | Object } Returns the result of a function call.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        result: string | Object;
    }
}
export default cloudFunction;
