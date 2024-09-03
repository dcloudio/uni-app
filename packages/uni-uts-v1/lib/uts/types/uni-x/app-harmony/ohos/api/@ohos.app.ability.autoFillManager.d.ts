/*
 * Copyright (c) 2023-2024 Huawei Device Co., Ltd.
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
import type { UIContext } from './@ohos.arkui.UIContext';
/**
 * This module provides the function of auto fill manager.
 *
 * @namespace autoFillManager
 * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
 * @stagemodelonly
 * @since 11
 */
/**
 * This module provides the function of auto fill manager.
 *
 * @namespace autoFillManager
 * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
 * @stagemodelonly
 * @atomicservice
 * @since 12
 */
declare namespace autoFillManager {
    /**
     * Auto save callback.
     *
     * @interface AutoSaveCallback
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @stagemodelonly
     * @since 11
     */
    /**
     * Auto save callback.
     *
     * @interface AutoSaveCallback
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @stagemodelonly
     * @atomicservice
     * @since 12
     */
    export interface AutoSaveCallback {
        /**
         * Called when auto save request is successfully handled.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
         * @stagemodelonly
         * @since 11
         */
        /**
         * Called when auto save request is successfully handled.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
         * @stagemodelonly
         * @atomicservice
         * @since 12
         */
        onSuccess(): void;
        /**
         * Called when auto save request is failed to be handled.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
         * @stagemodelonly
         * @since 11
         */
        /**
         * Called when auto save request is failed to be handled.
         *
         * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
         * @stagemodelonly
         * @atomicservice
         * @since 12
         */
        onFailure(): void;
    }
    /**
     * Trigger an auto save request.
     *
     * @param { UIContext } context - Indicates the ui context where the save operation will be performed.
     * @param { AutoSaveCallback } [callback] - Indicates the callback that used to receive the result.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Get instance id failed;
     * <br>2. Parse instance id failed; 3. The second parameter is not of type callback.
     * @throws { BusinessError } 16000050 - Internal error.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @stagemodelonly
     * @since 11
     */
    /**
     * Trigger an auto save request.
     *
     * @param { UIContext } context - Indicates the ui context where the save operation will be performed.
     * @param { AutoSaveCallback } [callback] - Indicates the callback that used to receive the result.
     * @throws { BusinessError } 401 - The parameter check failed. Possible causes: 1. Get instance id failed;
     * <br>2. Parse instance id failed; 3. The second parameter is not of type callback.
     * @throws { BusinessError } 16000050 - Internal error.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @stagemodelonly
     * @atomicservice
     * @since 12
     */
    export function requestAutoSave(context: UIContext, callback?: AutoSaveCallback): void;
}
export default autoFillManager;
