/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
/**
 * Store unit testing-related parameters, including test case names, and test runner name.
 *
 * @typedef AbilityDelegatorArgs
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 8
 */
/**
 * Store unit testing-related parameters, including test case names, and test runner name.
 *
 * @typedef AbilityDelegatorArgs
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @crossplatform
 * @since 10
 */
/**
 * Store unit testing-related parameters, including test case names, and test runner name.
 *
 * @typedef AbilityDelegatorArgs
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @crossplatform
 * @atomicservice
 * @since 11
 */
export interface AbilityDelegatorArgs {
    /**
     * the bundle name of the application being tested.
     *
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 8
     */
    /**
     * the bundle name of the application being tested.
     *
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * the bundle name of the application being tested.
     *
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    bundleName: string;
    /**
     * the parameters used for unit testing.
     *
     * @type { object }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 8
     */
    /**
     * the parameters used for unit testing.
     *
     * @type { object }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * the parameters used for unit testing.
     *
     * @type { Record<string, string> }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    parameters: Record<string, string>;
    /**
     * the class names of all test cases.
     *
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 8
     */
    /**
     * the class names of all test cases.
     *
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * the class names of all test cases.
     *
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    testCaseNames: string;
    /**
     * the class name of the test runner used to execute test cases.
     *
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 8
     */
    /**
     * the class name of the test runner used to execute test cases.
     *
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @since 10
     */
    /**
     * the class name of the test runner used to execute test cases.
     *
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    testRunnerClassName: string;
}
export default AbilityDelegatorArgs;
