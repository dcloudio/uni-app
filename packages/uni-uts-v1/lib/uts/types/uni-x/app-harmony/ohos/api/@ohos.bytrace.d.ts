/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
 * Provides interfaces to trace a task for performance measure, the logs can be capture by the
 * bytrace cmdline available on the device.
 *
 * <p>This interfaces trace the start, end, and value changes of key processes that last for at least 3 ms.
 *
 * <p>Example:
 * To trace a name verification that is expected to complete within 5 ms:
 * <pre>{@code
 * bytrace.startTrace("checkName", 111, 5);
 * //your process
 * bytrace.finishTrace("checkName", 111);
 * }</pre>
 * To trace the number of layers, which is 3:
 * <pre>{@code
 * bytrace.traceByValue("curLayer", 3);
 * }</pre>
 *
 * <p>Each {@code startTrace} matches one {@code finishTrace}, and they must have the same name
 * and taskId.
 *
 * @namespace bytrace
 * @syscap SystemCapability.HiviewDFX.HiTrace
 * @since 7
 * @deprecated since 8
 * @useinstead ohos.hiTraceMeter
 */
declare namespace bytrace {
    /**
     * Records a trace marking it as the start of a task, can with the expected completion time between
     * startTrace and finishTrace.
     * This method is invoked at the start of a transaction to indicate that a task has started, whose name
     * is specified by {@code name}, and the taskId is used to distinguish the tasks. It must be followed by
     * {@link #finishTrace}, the name and taskId need to be the same.
     *
     * @param { string } name Indicates the task name.
     * @param { number } taskId The unique id used to distinguish the tasks and match with the id in follow finishTrace.
     * @param { number } expectedTime Indicates the expected time required for completing the task, in milliseconds.
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @since 7
     * @deprecated since 8
     * @useinstead ohos.hiTraceMeter.startTrace
     */
    function startTrace(name: string, taskId: number, expectedTime?: number): void;
    /**
     * Records a trace and marks it as the end of a task.
     *
     * This method is invoked at the end of a transaction to indicate that a task has ended, whose name
     * is specified by {@code name}. This method must be invoked after the the startTrace.
     *
     * @param { string } name Indicates the task name. It must be the same with the {@code name} of startTrace.
     * @param { number } taskId The unique id used to distinguish the tasks and must be the same with the .
     * {@code taskId} of startTrace.
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @since 7
     * @deprecated since 8
     * @useinstead ohos.hiTraceMeter.finishTrace
     */
    function finishTrace(name: string, taskId: number): void;
    /**
     * Records a trace for generating a count, such as clock pulse and the number of layers.
     *
     * @param { string } name Indicates the name used to identify the count.
     * @param { number } count Indicates the number of the count.
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @since 7
     * @deprecated since 8
     * @useinstead ohos.hiTraceMeter.traceByValue
     */
    function traceByValue(name: string, count: number): void;
}
export default bytrace;
