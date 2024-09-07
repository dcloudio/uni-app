/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
 * Provides APIs to implement call chain tracing throughout a service process.
 * With HiTrace, you can quickly obtain the run log for the call chain of a
 * specified service process and locate faults in cross-device, cross-process,
 * or cross-thread communications.
 *
 * @namespace hiTraceChain
 * @syscap SystemCapability.HiviewDFX.HiTrace
 * @since 8
 */
declare namespace hiTraceChain {
    /**
     * Enumerate trace flag
     *
     * @enum { number }
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @since 8
     */
    enum HiTraceFlag {
        /**
         * Default value
         *
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        DEFAULT = 0,
        /**
         * Trace sync and async call. default: trace sync call only.
         *
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        INCLUDE_ASYNC = 1,
        /**
         * Do not create child span. default: create child span.
         *
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        DONOT_CREATE_SPAN = 1 << 1,
        /**
         * Output tracepoint info in span. default: do not output tracepoint info.
         *
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        TP_INFO = 1 << 2,
        /**
         * Do not output begin and end info. default: output begin and end info.
         *
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        NO_BE_INFO = 1 << 3,
        /**
         * Do not add id to log. default: add id to log.
         *
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        DISABLE_LOG = 1 << 4,
        /**
         * The trace is triggered by fault.
         *
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        FAILURE_TRIGGER = 1 << 5,
        /**
         * Output device-to-device tracepoint info in span only. default: do not output device-to-device tracepoint info.
         *
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        D2D_TP_INFO = 1 << 6
    }
    /**
     * Enumerate trace point type
     *
     * @enum { number }
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @since 8
     */
    enum HiTraceTracepointType {
        /**
         * Client send
         *
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        CS = 0,
        /**
         * Client receive
         *
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        CR = 1,
        /**
         * Server send
         *
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        SS = 2,
        /**
         * Server receive
         *
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        SR = 3,
        /**
         * General info
         *
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        GENERAL = 4
    }
    /**
     * Enumerate trace communication mode
     *
     * @enum { number }
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @since 8
     */
    enum HiTraceCommunicationMode {
        /**
         * Unspecified
         *
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        DEFAULT = 0,
        /**
         * Thread-to-thread
         *
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        THREAD = 1,
        /**
         * Process-to-process
         *
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        PROCESS = 2,
        /**
         * Device-to-device
         *
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        DEVICE = 3
    }
    /**
     * Trace id, for tracing process.
     *
     * @interface HiTraceId
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @since 8
     */
    interface HiTraceId {
        /**
         * Chain id.
         *
         * @type { bigint }
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        chainId: bigint;
        /**
         * Span id.
         *
         * @type { ?number }
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        spanId?: number;
        /**
         * Parent span id.
         *
         * @type { ?number }
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        parentSpanId?: number;
        /**
         * Trace flag.
         *
         * @type { ?number }
         * @syscap SystemCapability.HiviewDFX.HiTrace
         * @since 8
         */
        flags?: number;
    }
    /**
     * Start tracing a process impl.
     *
     * @param { string } name Process name.
     * @param { number } flags Trace function flag.
     * @returns { HiTraceId } Valid if first call, otherwise invalid.
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @since 8
     */
    function begin(name: string, flags?: number): HiTraceId;
    /**
     * Stop process tracing and clear trace id of current thread if the given trace
     * id is valid, otherwise do nothing.
     *
     * @param { HiTraceId } id The trace id that need to stop.
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @since 8
     */
    function end(id: HiTraceId): void;
    /**
     * Get trace id of current thread, and return a invalid trace id if no
     * trace id belong to current thread
     *
     * @returns { HiTraceId } Valid if current thread have a trace id, otherwise invalid.
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @since 8
     */
    function getId(): HiTraceId;
    /**
     * Set id as trace id of current thread. Do nothing if id is invalid.
     *
     * @param { HiTraceId } id Set id as trace id of current thread.
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @since 8
     */
    function setId(id: HiTraceId): void;
    /**
     * Clear trace id of current thread and set it invalid.
     *
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @since 8
     */
    function clearId(): void;
    /**
     * Create a new span id according to the trace id of current thread.
     *
     * @returns { HiTraceId } A valid span trace id. Otherwise trace id of current thread if do not allow create span.
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @since 8
     */
    function createSpan(): HiTraceId;
    /**
     * Print hitrace info, include trace id info.
     *
     * @param { HiTraceCommunicationMode } mode Trace communication mode.
     * @param { HiTraceTracepointType } type Trace info type.
     * @param { HiTraceId } id Trace id that need to print.
     * @param { string } msg Customized info that need to print.
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @since 8
     */
    function tracepoint(mode: HiTraceCommunicationMode, type: HiTraceTracepointType, id: HiTraceId, msg?: string): void;
    /**
     * Judge whether the trace id is valid or not.
     *
     * @param { HiTraceId } id Trace id that need to judge.
     * @returns { boolean } True for a valid trace id, otherwise false.
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @since 8
     */
    function isValid(id: HiTraceId): boolean;
    /**
     * Judge whether the trace id has enabled a trace flag or not.
     *
     * @param { HiTraceId } id Trace id that need to judge.
     * @param { HiTraceFlag } flag Trace flag that need to judge.
     * @returns { boolean } true if the trace id has enabled the flag.
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @since 8
     */
    function isFlagEnabled(id: HiTraceId, flag: HiTraceFlag): boolean;
    /**
     * Enable the designative trace flag for the trace id.
     *
     * @param { HiTraceId } id Trace id that need to enable a flag.
     * @param { HiTraceFlag } flag the designative trace flag that need to be enabled in the trace id.
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @since 8
     */
    function enableFlag(id: HiTraceId, flag: HiTraceFlag): void;
}
export default hiTraceChain;
