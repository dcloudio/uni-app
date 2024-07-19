/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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
import Want from './@ohos.app.ability.Want';
/**
 * Interface of request dialog.
 *
 * @namespace dialogRequest
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 9
 */
declare namespace dialogRequest {
    /**
     * Window Rectangle
     *
     * @typedef WindowRect
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 10
     */
    export interface WindowRect {
        /**
         * The left position of WindowRect
         *
         * @type { number }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @StageModelOnly
         * @since 10
         */
        left: number;
        /**
         * The top position of WindowRect
         *
         * @type { number }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @StageModelOnly
         * @since 10
         */
        top: number;
        /**
         * The width of WindowRect
         *
         * @type { number }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @StageModelOnly
         * @since 10
         */
        width: number;
        /**
         * The height of WindowRect
         *
         * @type { number }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @StageModelOnly
         * @since 10
         */
        height: number;
    }
    /**
     * Request info of a request.
     *
     * @typedef RequestInfo
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    export interface RequestInfo {
        /**
         * The Window of caller.
         *
         * @type { ?WindowRect }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @StageModelOnly
         * @since 10
         */
        windowRect?: WindowRect;
    }
    /**
     * The modal bullet box requests the result code.
     *
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    export enum ResultCode {
        /**
         * The modal bullet box requests succeeded.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        RESULT_OK = 0,
        /**
         * The modal bullet box requests Failed.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @since 9
         */
        RESULT_CANCEL = 1
    }
    /**
     * The result of requestDialogService with asynchronous callback.
     *
     * @typedef RequestResult
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    export interface RequestResult {
        /**
         * The request result passed in by the user.
         *
         * @type { ResultCode }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @StageModelOnly
         * @since 9
         */
        result: ResultCode;
        /**
         * The request additional want data passed in by the user.
         *
         * @type { ?Want }
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @StageModelOnly
         * @since 10
         */
        want?: Want;
    }
    /**
     * Provides methods for request callback.
     *
     * @interface RequestCallback
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    export interface RequestCallback {
        /**
         * Send request result to caller.
         *
         * @param { RequestResult } result - result for request.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * 2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
         * @StageModelOnly
         * @since 9
         */
        setRequestResult(result: RequestResult): void;
    }
    /**
     * Get request info from caller want.
     *
     * @param { Want } want - want from caller.
     * @returns { RequestInfo } Returns the request info from caller.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    function getRequestInfo(want: Want): RequestInfo;
    /**
     * Get request callback from caller want.
     *
     * @param { Want } want - want from caller.
     * @returns { RequestCallback } Returns the request callback.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    function getRequestCallback(want: Want): RequestCallback;
}
export default dialogRequest;
