/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
 * @kit PerformanceAnalysisKit
 */
/**
 * This module provides the capability to check bad code usage.
 *
 * @namespace hichecker
 * @syscap SystemCapability.HiviewDFX.HiChecker
 * @since 8
 */
declare namespace hichecker {
    /**
     * The caution rule print log.
     *
     * @constant
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 8
     */
    const RULE_CAUTION_PRINT_LOG: 9223372036854775808n; // 1 << 63
    /**
     * The caution rule trigger crash.
     *
     * @constant
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 8
     */
    const RULE_CAUTION_TRIGGER_CRASH: 4611686018427387904n; // 1 << 62
    /**
     * The thread rule check slow process.
     *
     * @constant
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 8
     */
    const RULE_THREAD_CHECK_SLOW_PROCESS: 1n;
    /**
     * The process rule check ability connection leak.
     *
     * @constant
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 8
     */
    const RULE_CHECK_ABILITY_CONNECTION_LEAK: 8589934592n; // 1 << 33
    /**
     * The process rule check ability Arkui performance
     *
     * @constant
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 11
     */
    const RULE_CHECK_ARKUI_PERFORMANCE: 17179869184n; // 1 << 34
    /**
     * add one or more rule.
     *
     * @param { bigint } rule
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.hichecker/hichecker#addCheckRule
     */
    function addRule(rule: bigint): void;
    /**
     * remove one or more rule.
     *
     * @param { bigint } rule
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.hichecker/hichecker#removeCheckRule
     */
    function removeRule(rule: bigint): void;
    /**
     * get added rule
     *
     * @returns { bigint } all added thread rule and process rule.
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 8
     */
    function getRule(): bigint;
    /**
     * whether the query rule is added
     *
     * @param { bigint } rule
     * @returns { boolean } the result of whether the query rule is added.
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.hichecker/hichecker#containsCheckRule
     */
    function contains(rule: bigint): boolean;
    /**
     * Add one or more rule.
     *
     * @param { bigint } rule
     * @throws { BusinessError } 401 - the parameter check failed, only one bigint type parameter is needed
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 9
     */
    function addCheckRule(rule: bigint): void;
    /**
     * Remove one or more rule.
     *
     * @param { bigint } rule
     * @throws { BusinessError } 401 - the parameter check failed, only one bigint type parameter is needed
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 9
     */
    function removeCheckRule(rule: bigint): void;
    /**
     * Whether the query rule is added
     *
     * @param { bigint } rule
     * @returns { boolean } the result of whether the query rule is added.
     * @throws { BusinessError } 401 - the parameter check failed, only one bigint type parameter is needed
     * @syscap SystemCapability.HiviewDFX.HiChecker
     * @since 9
     */
    function containsCheckRule(rule: bigint): boolean;
}
export default hichecker;
