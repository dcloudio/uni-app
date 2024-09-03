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
     * @param { Callback<Model> } callback - the callback of model
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    function loadModelFromFile(model: string, callback: Callback<Model>): void;
    /**
     * Create a Model instance from file path.
     * @param { string } model - model indicates model path to be loaded
     * @param { Context } context - context indicates model context information
     * @param { Callback<Model> } callback - the callback of model
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    function loadModelFromFile(model: string, context: Context, callback: Callback<Model>): void;
    /**
     * Create a Model instance from buffer
     * @param { ArrayBuffer } model - model indicates model buffer to be loaded
     * @param { Context } [context] - context indicates model context information
     * @returns { Promise<Model> } the promise returned by the function.
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    function loadModelFromBuffer(model: ArrayBuffer, context?: Context): Promise<Model>;
    /**
     * Create a Model instance from buffer
     * @param { ArrayBuffer } model - model indicates model buffer to be loaded
     * @param { Callback<Model> } callback - the callback of model
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    function loadModelFromBuffer(model: ArrayBuffer, callback: Callback<Model>): void;
    /**
     * Create a Model instance from buffer
     * @param { ArrayBuffer } model - model indicates model buffer to be loaded
     * @param { Context } context - context indicates model context information
     * @param { Callback<Model> } callback - the callback of model
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    function loadModelFromBuffer(model: ArrayBuffer, context: Context, callback: Callback<Model>): void;
    /**
     * Creates a Model instance file description
     * @param { number } model - model indicates model file description to be loaded
     * @param { Context } [context] - context indicates model context information
     * @returns { Promise<Model> } the promise returned by the function.
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    function loadModelFromFd(model: number, context?: Context): Promise<Model>;
    /**
     * Create a Model instance from file description
     * @param { number } model - model indicates model file description to be loaded
     * @param { Callback<Model> } callback - the callback of model
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    function loadModelFromFd(model: number, callback: Callback<Model>): void;
    /**
     * Create a Model instance from file description
     * @param { number } model - model indicates model file description to be loaded
     * @param { Context } context - context indicates model context information
     * @param { Callback<Model> } callback - the callback of model
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    function loadModelFromFd(model: number, context: Context, callback: Callback<Model>): void;
    /**
     * Load train model from file
     * @param { string } model - model file path
     * @param { TrainCfg } [trainCfg] - model train configuration
     * @param { Context } [context] - model build context
     * @returns { Promise<Model> } the promise of the built model
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 12
     */
    function loadTrainModelFromFile(model: string, trainCfg?: TrainCfg, context?: Context): Promise<Model>;
    /**
     * Load train model from buffer
     * @param { ArrayBuffer } model - model buffer
     * @param { TrainCfg } [trainCfg] - model train configuration
     * @param { Context } [context] - model build context
     * @returns { Promise<Model> } the promise of the built model
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 12
     */
    function loadTrainModelFromBuffer(model: ArrayBuffer, trainCfg?: TrainCfg, context?: Context): Promise<Model>;
    /**
     * Load train model from file description
     * @param { number } model - model file description
     * @param { TrainCfg } [trainCfg] - model train configuration
     * @param { Context } [context] - model build context
     * @returns { Promise<Model> } the promise of the built model
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 12
     */
    function loadTrainModelFromFd(model: number, trainCfg?: TrainCfg, context?: Context): Promise<Model>;
    /**
     * Provides manages model function. Including get inputs, predict ,resize.
     * @typedef Model
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    interface Model {
        /**
         * The learning rate of the training model
         * @type {?number}
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        learningRate?: number;
        /**
         * The running mode of the model
         * @type {?boolean}
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        trainMode?: boolean;
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
         * @param { Callback<MSTensor[]> }  callback - the callback of MSTensor array.
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 10
         */
        predict(inputs: MSTensor[], callback: Callback<MSTensor[]>): void;
        /**
         * Infer model
         * @param { MSTensor[] } inputs - indicates the MSTensor array of the inputs.
         * @returns { Promise<MSTensor[]> } the promise returned by the function.
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
        /**
         * Train model by step
         * @param { MSTensor[] } inputs - indicates the MSTensor array of the inputs.
         * @returns { boolean } the boolean result if the runStep operation is successful
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        runStep(inputs: MSTensor[]): boolean;
        /**
         * Obtain all weights of the model
         * @returns { MSTensor[] } the weight tensors of the model
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        getWeights(): MSTensor[];
        /**
         * Update weights of the model
         * @param { MSTensor[] } weights - indicates the MSTensor array of the inputs
         * @returns { boolean } the boolean result if updating weights operation is successful
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        updateWeights(weights: MSTensor[]): boolean;
        /**
         * Setup training with virtual batches
         * @param { number } virtualBatchMultiplier - virtual batch multiplier, use any number < 1 to disable
         * @param { number } lr - learning rate to use for virtual batch, -1 for internal configuration
         * @param { number } momentum - batch norm momentum to use for virtual batch, -1 for internal configuration
         * @returns { boolean } the boolean result if the operation is successful
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        setupVirtualBatch(virtualBatchMultiplier: number, lr: number, momentum: number): boolean;
        /**
         * Export train model to file
         * @param { string } modelFile - model file path.
         * @param { QuantizationType } [quantizationType] - the quantization type, default NO_QUANT.
         * @param { boolean } [exportInferenceOnly] - whether to export a inference only model, default true.
         * @param { string[] } [outputTensorName] - the set of name of output tensor the exported inference model,
         * @returns { boolean } - the boolean result if the operation is successful
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        exportModel(modelFile: string, quantizationType?: QuantizationType, exportInferenceOnly?: boolean, outputTensorName?: string[]): boolean;
        /**
         * Export model's weights, which can be used in micro only. Only valid for Lite Train
         * @param { string } weightFile - weight file path
         * @param { boolean } [isInference] - whether to export weights from inference model, only support this is `true` for now, default true
         * @param { boolean } [enableFp16] - float-weight is whether to be saved in float16 format, default false
         * @param { string[] } [changeableWeightsName] - changeable weights name
         * @returns { boolean } the boolean result if the operation is successful
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        exportWeightsCollaborateWithMicro(weightFile: string, isInference?: boolean, enableFp16?: boolean, changeableWeightsName?: string[]): boolean;
    }
    /**
     * Enum for quantization type
     * @enum {number}
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 12
     */
    export enum QuantizationType {
        /**
         * No quantization.
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        NO_QUANT = 0,
        /**
         * Weight quantization.
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        WEIGHT_QUANT = 1,
        /**
         * Full quantization.
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        FULL_QUANT = 2
    }
    /**
     * Enum for optimization level
     * @enum {number}
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 12
     */
    export enum OptimizationLevel {
        /**
         * Do not change
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        O0 = 0,
        /**
         * Cast network to float16, keep batch norm and loss in float32
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        O2 = 2,
        /**
         * Cast network to float16, including batch norm
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        O3 = 3,
        /**
         * Choose optimization based on device
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        AUTO = 4
    }
    /**
     * Provides the train configuration
     * @typedef TrainCfg
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 12
     */
    interface TrainCfg {
        /**
         * Array of loss name
         * @type {?string[]}
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        lossName?: string[];
        /**
         * Train optimization level
         * @type {?OptimizationLevel}
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        optimizationLevel?: OptimizationLevel;
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
         * @type {?string[]}
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 10
         */
        target?: string[];
        /**
         * The cpu device information
         * @type {?CpuDevice}
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 10
         */
        cpu?: CpuDevice;
        /**
         * The NNRT device information
         * @type {?NNRTDevice}
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
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
         * @type {?number}
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 10
         */
        threadNum?: number;
        /**
         * The thread affinity mode
         * @type {?ThreadAffinityMode}
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 10
         */
        threadAffinityMode?: ThreadAffinityMode;
        /**
         * The thread affinity core list
         * @type {?number[]}
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 10
         */
        threadAffinityCoreList?: number[];
        /**
         * The precision mode
         * @type {?string}
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 10
         */
        precisionMode?: string;
    }
    /**
     * Enum for performance mode
     * @enum {number}
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 12
     */
    export enum PerformanceMode {
        /**
         * No performance mode preference
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        PERFORMANCE_NONE = 0,
        /**
         * Low power consumption mode
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        PERFORMANCE_LOW = 1,
        /**
         * Medium performance mode
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        PERFORMANCE_MEDIUM = 2,
        /**
         * High performance mode
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        PERFORMANCE_HIGH = 3,
        /**
         * Ultimate performance mode
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        PERFORMANCE_EXTREME = 4
    }
    /**
     * Enum for scheduling priority
     * @enum {number}
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 12
     */
    export enum Priority {
        /**
         * No priority preference
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        PRIORITY_NONE = 0,
        /**
         * Low priority
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        PRIORITY_LOW = 1,
        /**
         * Medium priority
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        PRIORITY_MEDIUM = 2,
        /**
         * High priority
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        PRIORITY_HIGH = 3
    }
    /**
     * Provides the extension information of nnrt device
     * @typedef Extension
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 12
     */
    interface Extension {
        /**
         * Extension name
         * @type {string}
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        name: string;
        /**
         * Extension array buffer
         * @type {ArrayBuffer}
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        value: ArrayBuffer;
    }
    /**
     * Enum for nnrt device type
     * @enum {number}
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 12
     */
    export enum NNRTDeviceType {
        /**
         * Devices that are not CPU, GPU, or dedicated accelerator
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        NNRTDEVICE_OTHERS = 0,
        /**
         * CPU device
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        NNRTDEVICE_CPU = 1,
        /**
         * GPU device
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        NNRTDEVICE_GPU = 2,
        /**
         * Dedicated hardware accelerator
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        NNRTDEVICE_ACCELERATOR = 3
    }
    /**
     * Provides the nnrt device description
     * @typedef NNRTDeviceDescription
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 12
     */
    interface NNRTDeviceDescription {
        /**
         * Get device id
         * @returns { bigint } the number of device id
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        deviceID(): bigint;
        /**
         * Get device type.
         * @returns { NNRTDeviceType } the device type
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        deviceType(): NNRTDeviceType;
        /**
         * Get device name.
         * @returns { string } device name
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        deviceName(): string;
    }
    /**
     * Obtain the all device descriptions in NNRT.
     * @returns { NNRTDeviceDescription[] } the array of NNRTDeviceDescription
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 12
     */
    function getAllNNRTDeviceDescriptions(): NNRTDeviceDescription[];
    /**
     * Provides the NNRT device info
     * @typedef NNRTDevice
     * @syscap SystemCapability.AI.MindSporeLite
     * @stagemodelonly
     * @since 10
     */
    interface NNRTDevice {
        /**
         * NNRT device id.
         * @type {?bigint}
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        deviceID?: bigint;
        /**
         * NNRT device performance mode.
         * @type {?PerformanceMode}
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        performanceMode?: PerformanceMode;
        /**
         * NNRT device priority.
         * @type {?Priority}
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        priority?: Priority;
        /**
         * NNRT device extension array.
         * @type {?Extension[]}
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 12
         */
        extensions?: Extension[];
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
         * @stagemodelonly
         * @since 10
         */
        NO_AFFINITIES = 0,
        /**
         * Thread affinity mode is big cores first
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
         * @since 10
         */
        BIG_CORES_FIRST = 1,
        /**
         * Thread affinity mode is little cores first
         * @syscap SystemCapability.AI.MindSporeLite
         * @stagemodelonly
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
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        name: string;
        /**
          * The shape of the tensor.
          * @type {number[]}
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        shape: number[];
        /**
          * The number of elements in the tensor.
          * @type {number}
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        elementNum: number;
        /**
          * The data size of the tensor.
          * @type {number}
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        dataSize: number;
        /**
          * The data type of the tensor.
          * @type {DataType}
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        dtype: DataType;
        /**
          * The format of the tensor.
          * @type {Format}
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
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
         * @stagemodelonly
         * @since 10
         */
        TYPE_UNKNOWN = 0,
        /**
          * data type is int8
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        NUMBER_TYPE_INT8 = 32,
        /**
          * data type is int16
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        NUMBER_TYPE_INT16 = 33,
        /**
          * data type is int32
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        NUMBER_TYPE_INT32 = 34,
        /**
          * data type is int64
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        NUMBER_TYPE_INT64 = 35,
        /**
          * data type is uint8
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        NUMBER_TYPE_UINT8 = 37,
        /**
          * data type is uint16
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        NUMBER_TYPE_UINT16 = 38,
        /**
          * data type is uint32
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        NUMBER_TYPE_UINT32 = 39,
        /**
          * data type is uint64
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        NUMBER_TYPE_UINT64 = 40,
        /**
          * data type is float16
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        NUMBER_TYPE_FLOAT16 = 42,
        /**
          * data type is float32
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        NUMBER_TYPE_FLOAT32 = 43,
        /**
          * data type is float64
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
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
          * @stagemodelonly
          * @since 10
          */
        DEFAULT_FORMAT = -1,
        /**
          * data format is NCHW
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        NCHW = 0,
        /**
          * data format is NHWC
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        NHWC = 1,
        /**
          * data format is NHWC4
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        NHWC4 = 2,
        /**
          * data format is HWKC
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        HWKC = 3,
        /**
          * data format is HWCK
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        HWCK = 4,
        /**
          * data format is KCHW
          * @syscap SystemCapability.AI.MindSporeLite
          * @stagemodelonly
          * @since 10
          */
        KCHW = 5
    }
}
export default mindSporeLite;
