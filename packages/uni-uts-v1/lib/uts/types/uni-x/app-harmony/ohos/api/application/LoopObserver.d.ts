/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
/**
 * The observer will be called by system when application main thread loop
 * execute timeout
 * @interface LoopObserver
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @atomicservice
 * @since 12
 */
export interface LoopObserver {
    /**
     * Will be called when the application main thread loop execute timeout.
     *
     * @param { number } timeout - the actual executing time of loop event.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @atomicservice
     * @since 12
     */
    onLoopTimeOut?(timeout: number): void;
}
