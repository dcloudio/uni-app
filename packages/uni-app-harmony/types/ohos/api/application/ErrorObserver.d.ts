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
/**
 * The observer will be called by system when an error occurs.
 *
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 9
 */
/**
 * The observer will be called by system when an error occurs.
 *
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @atomicservice
 * @since 11
 */
export default class ErrorObserver {
    /**
     * Will be called when the js runtime throws an exception which doesn't caught by user.
     *
     * @param { string } errMsg - the message and error stacktrace about the exception.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    /**
     * Will be called when the js runtime throws an exception which doesn't caught by user.
     *
     * @param { string } errMsg - the message and error stacktrace about the exception.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @atomicservice
     * @since 11
     */
    onUnhandledException(errMsg: string): void;
    /**
     * Will be called when the js runtime throws an exception which doesn't caught by user.
     *
     * @param { Error } errObject - the error object about the exception.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 10
     */
    /**
     * Will be called when the js runtime throws an exception which doesn't caught by user.
     *
     * @param { Error } errObject - the error object about the exception.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @atomicservice
     * @since 11
     */
    onException?(errObject: Error): void;
}
