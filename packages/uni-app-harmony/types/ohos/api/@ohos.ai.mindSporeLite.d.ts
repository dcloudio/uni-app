/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 * @kit MindSporeLiteKit
 */
import { Callback } from './@ohos.base';
/**
 * @namespace mindSporeLite
 * @syscap SystemCapability.AI.MindSporeLite
 * @stagemodelonly
 * @since 10
 */
declare namespace mindSporeLite {
    /**
     * Create a Model instance from file path
     * @param { string } model - model indicates model path to be loaded
     * @param { Context } context - context indicates model context information
     * @returns { Promise<Model> } the promise returned by the function.
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    function loadModelFromFile(model: string, context?: Context): Promise<Model>;
    /**
     * Create a Model instance from file path.
     * @param { string } model - model indicates model path to be loaded
     * @param { callback: Callback<Model> } callback - the callback of model
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    function loadModelFromFile(model: string, callback: Callback<Model>): void;
    /**
     * Create a Model instance from file path.
     * @param { string } model - model indicates model path to be loaded
     * @param { Context } [context] - context indicates model context information
     * @param { callback: Callback<Model> } callback - the callback of model
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    function loadModelFromFile(model: string, context: Context, callback: Callback<Model>): void;
    /**
     * Create a Model instance from buffer
     * @param { ArrayBuffer } model - model indicates model buffer to be loaded
     * @param { Context } context - context indicates model context information
     * @returns { Promise<Model> } the promise returned by the function.
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    function loadModelFromBuffer(model: ArrayBuffer, context?: Context): Promise<Model>;
    /**
     * Create a Model instance from buffer
     * @param { ArrayBuffer } model - model indicates model buffer to be loaded
     * @param { callback: Callback<Model> } callback - the callback of model
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    function loadModelFromBuffer(model: ArrayBuffer, callback: Callback<Model>): void;
    /**
     * Create a Model instance from buffer
     * @param { ArrayBuffer } model - model indicates model buffer to be loaded
     * @param { Context } [context] - context indicates model context information
     * @param { callback: Callback<Model> } callback - the callback of model
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    function loadModelFromBuffer(model: ArrayBuffer, context: Context, callback: Callback<Model>): void;
    /**
     * Creates a Model instance file description
     * @param { number } model - model indicates model file description to be loaded
     * @param { Context } context - context indicates model context information
     * @returns { Promise<Model> } the promise returned by the function.
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    function loadModelFromFd(model: number, context?: Context): Promise<Model>;
    /**
     * Create a Model instance from file description
     * @param { number } model - model indicates model file description to be loaded
     * @param { callback: Callback<Model> } callback - the callback of model
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    function loadModelFromFd(model: number, callback: Callback<Model>): void;
    /**
     * Create a Model instance from file description
     * @param { number } model - model indicates model file description to be loaded
     * @param { Context } [context] - context indicates model context information
     * @param { callback: Callback<Model> } callback - the callback of model
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    function loadModelFromFd(model: number, context: Context, callback: Callback<Model>): void;
    /**
     * Provides manages model function. Including get inputs, predict ,resize.
     * @typedef Model
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    interface Model {
        /**
         * Get model input tensors.
         * @returns { MSTensor[] } the MSTensor array of the inputs.
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 10
         */
        getInputs(): MSTensor[];
        /**
         * Infer model
         * @param { MSTensor[] } inputs - indicates the MSTensor array of the inputs.
         * @param { callback: Callback<MSTensor[]> }  callback - the callback of MSTensor array.
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 10
         */
        predict(inputs: MSTensor[], callback: Callback<MSTensor[]>): void;
        /**
         * Infer model
         * @param { MSTensor[] } inputs - indicates the MSTensor array of the inputs.
         * @returns { Promise<Model> } the promise returned by the function.
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 10
         */
        predict(inputs: MSTensor[]): Promise<MSTensor[]>;
        /**
         * resize model input
         * @param { MSTensor[] } inputs - indicates the MSTensor array of the inputs.
         * @param { Array<Array<number>> } dims - indicates the target new shape array
         * @returns { boolean } the boolean result if the resize operation is successful
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 10
         */
        resize(inputs: MSTensor[], dims: Array<Array<number>>): boolean;
    }
    /**
     * Provides the device configurations
     * @typedef Context
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    interface Context {
        /**
          * The target device
          * @type {string[]}
          * @since 10
          */
        target?: string[];
        /**
          * The cpu device information
          * @type {CpuDevice}
          * @since 10
          */
        cpu?: CpuDevice;
        /**
          * The NNRT device information
          * @type {NNRTDevice}
          * @since 10
          */
        nnrt?: NNRTDevice;
    }
    /**
     * Provides the CPU device info
     * @typedef CpuDevice
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    interface CpuDevice {
        /**
          * The thread num
          * @type {number}
          * @since 10
          */
        threadNum?: number;
        /**
          * The thread affinity mode
          * @type {ThreadAffinityMode}
          * @since 10
          */
        threadAffinityMode?: ThreadAffinityMode;
        /**
          * The thread affinity core list
          * @type {number[]}
          * @since 10
          */
        threadAffinityCoreList?: number[];
        /**
          * The precision mode
          * @type {string}
          * @since 10
          */
        precisionMode?: string;
    }
    /**
     * Provides the NNRT device info
     * @typedef NNRTDevice
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    interface NNRTDevice {
    }
    /**
     * Enum for provides CPU thread affinity mode
     * @enum {number}
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    export enum ThreadAffinityMode {
        /**
         * Thread affinity mode is no bind.
         * @syscap SystemCapability.AI.MindSporeLite
         * @since 10
         */
        NO_AFFINITIES = 0,
        /**
         * Thread affinity mode is big cores first
         * @syscap SystemCapability.AI.MindSporeLite
         * @since 10
         */
        BIG_CORES_FIRST = 1,
        /**
         * Thread affinity mode is little cores first
         * @syscap SystemCapability.AI.MindSporeLite
         * @since 10
         */
        LITTLE_CORES_FIRST = 2
    }
    /**
     * Provides MSTensor definition
     * @typedef MSTensor
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    interface MSTensor {
        /**
          * The name of the tensor.
          * @type {string}
          * @since 10
          */
        name: string;
        /**
          * The shape of the tensor.
          * @type {number[]}
          * @since 10
          */
        shape: number[];
        /**
          * The number of elements in the tensor.
          * @type {number}
          * @since 10
          */
        elementNum: number;
        /**
          * The data size of the tensor.
          * @type {number}
          * @since 10
          */
        dataSize: number;
        /**
          * The data type of the tensor.
          * @type {DataType}
          * @since 10
          */
        dtype: DataType;
        /**
          * The format of the tensor.
          * @type {DataType}
          * @since 10
          */
        format: Format;
        /**
         * Get MSTensor data
         * @returns { ArrayBuffer } the data of tensor
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 10
         */
        getData(): ArrayBuffer;
        /**
         * Set MSTensor data
         * @param { ArrayBuffer } inputArray - indicates the buffer of tensor
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 10
         */
        setData(inputArray: ArrayBuffer): void;
    }
    /**
     * Enum for provides MSTensor data type
     * @enum {number}
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    export enum DataType {
        /**
         * data type is unknown
         * @syscap SystemCapability.AI.MindSporeLite
         * @since 10
         */
        TYPE_UNKNOWN = 0,
        /**
          * data type is int8
          * @syscap SystemCapability.AI.MindSporeLite
          * @since 10
          */
        NUMBER_TYPE_INT8 = 32,
        /**
          * data type is int16
          * @syscap SystemCapability.AI.MindSporeLite
          * @since 10
          */
        NUMBER_TYPE_INT16 = 33,
        /**
          * data type is int32
          * @syscap SystemCapability.AI.MindSporeLite
          * @since 10
          */
        NUMBER_TYPE_INT32 = 34,
        /**
          * data type is int64
          * @syscap SystemCapability.AI.MindSporeLite
          * @since 10
          */
        NUMBER_TYPE_INT64 = 35,
        /**
          * data type is uint8
          * @syscap SystemCapability.AI.MindSporeLite
          * @since 10
          */
        NUMBER_TYPE_UINT8 = 37,
        /**
          * data type is uint16
          * @syscap SystemCapability.AI.MindSporeLite
          * @since 10
          */
        NUMBER_TYPE_UINT16 = 38,
        /**
          * data type is uint32
          * @syscap SystemCapability.AI.MindSporeLite
          * @since 10
          */
        NUMBER_TYPE_UINT32 = 39,
        /**
          * data type is uint64
          * @syscap SystemCapability.AI.MindSporeLite
          * @since 10
          */
        NUMBER_TYPE_UINT64 = 40,
        /**
          * data type is float16
          * @syscap SystemCapability.AI.MindSporeLite
          * @since 10
          */
        NUMBER_TYPE_FLOAT16 = 42,
        /**
          * data type is float32
          * @syscap SystemCapability.AI.MindSporeLite
          * @since 10
          */
        NUMBER_TYPE_FLOAT32 = 43,
        /**
          * data type is float64
          * @syscap SystemCapability.AI.MindSporeLite
          * @since 10
          */
        NUMBER_TYPE_FLOAT64 = 44
    }
    /**
     * Enum for provides MSTensor format
     * @enum {number}
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    export enum Format {
        /**
          * data format is default
          * @syscap SystemCapability.AI.MindSporeLite
          * @since 10
          */
        DEFAULT_FORMAT = -1,
        /**
          * data format is NCHW
          * @syscap SystemCapability.AI.MindSporeLite
          * @since 10
          */
        NCHW = 0,
        /**
          * data format is NHWC
          * @syscap SystemCapability.AI.MindSporeLite
          * @since 10
          */
        NHWC = 1,
        /**
          * data format is NHWC4
          * @syscap SystemCapability.AI.MindSporeLite
          * @since 10
          */
        NHWC4 = 2,
        /**
          * data format is HWKC
          * @syscap SystemCapability.AI.MindSporeLite
          * @since 10
          */
        HWKC = 3,
        /**
          * data format is HWCK
          * @syscap SystemCapability.AI.MindSporeLite
          * @since 10
          */
        HWCK = 4,
        /**
          * data format is KCHW
          * @syscap SystemCapability.AI.MindSporeLite
          * @since 10
          */
        KCHW = 5
    }
}
export default mindSporeLite;
