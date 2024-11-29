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
 * @kit BasicServicesKit
 */
import type { AsyncCallback, Callback } from './@ohos.base';
import type Context from './application/Context';
/**
 * System print
 *
 * @namespace print
 * @syscap SystemCapability.Print.PrintFramework
 * @since 10
 */
declare namespace print {
    /**
     * PrintTask provide event callback.
     * @interface PrintTask
     * @syscap SystemCapability.Print.PrintFramework
     * @since 10
     */
    interface PrintTask {
        /**
         * Register event callback when the current print task is in process.
         * @permission ohos.permission.PRINT
         * @param { 'block' } type - Indicates the print task has been blocked.
         * @param { Callback<void> } callback - The callback function for print task change event
         * @throws { BusinessError } 201 - the application does not have permission to call this function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Print.PrintFramework
         * @since 10
         */
        on(type: 'block', callback: Callback<void>): void;
        /**
         * Register event callback when the current print task is in process.
         * @permission ohos.permission.PRINT
         * @param { 'succeed' } type - Indicates the print task succeed.
         * @param { Callback<void> } callback - The callback function for print task change event
         * @throws { BusinessError } 201 - the application does not have permission to call this function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Print.PrintFramework
         * @since 10
         */
        on(type: 'succeed', callback: Callback<void>): void;
        /**
         * Register event callback when the current print task is in process.
         * @permission ohos.permission.PRINT
         * @param { 'fail' } type - Indicates the print task has completed with failure.
         * @param { Callback<void> } callback - The callback function for print task change event
         * @throws { BusinessError } 201 - the application does not have permission to call this function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Print.PrintFramework
         * @since 10
         */
        on(type: 'fail', callback: Callback<void>): void;
        /**
         * Register event callback when the current print task is in process.
         * @permission ohos.permission.PRINT
         * @param { 'cancel' } type - Indicates the print task has been cancelled.
         * @param { Callback<void> } callback - The callback function for print task change event
         * @throws { BusinessError } 201 - the application does not have permission to call this function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Print.PrintFramework
         * @since 10
         */
        on(type: 'cancel', callback: Callback<void>): void;
        /**
         * Unregister event callback when the current print task is in process.
         * @permission ohos.permission.PRINT
         * @param { 'block' } type - Indicates the print task has been blocked.
         * @param { Callback<void> } callback - The callback function for print task change event
         * @throws { BusinessError } 201 - the application does not have permission to call this function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Print.PrintFramework
         * @since 10
         */
        off(type: 'block', callback?: Callback<void>): void;
        /**
         * Unregister event callback when the current print task is in process.
         * @permission ohos.permission.PRINT
         * @param { 'succeed' } type - Indicates the print task succeed.
         * @param { Callback<void> } callback - The callback function for print task change event
         * @throws { BusinessError } 201 - the application does not have permission to call this function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Print.PrintFramework
         * @since 10
         */
        off(type: 'succeed', callback?: Callback<void>): void;
        /**
         * Unregister event callback when the current print task is in process.
         * @permission ohos.permission.PRINT
         * @param { 'fail' } type - Indicates the print task has completed with failure.
         * @param { Callback<void> } callback - The callback function for print task change event
         * @throws { BusinessError } 201 - the application does not have permission to call this function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Print.PrintFramework
         * @since 10
         */
        off(type: 'fail', callback?: Callback<void>): void;
        /**
         * Unregister event callback when the current print task is in process.
         * @permission ohos.permission.PRINT
         * @param { 'cancel' } type - Indicates the print task has been cancelled.
         * @param { Callback<void> } callback - The callback function for print task change event
         * @throws { BusinessError } 201 - the application does not have permission to call this function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Print.PrintFramework
         * @since 10
         */
        off(type: 'cancel', callback?: Callback<void>): void;
    }
    /**
     * Third-party application implement this interface to render files to be printed.
     * @interface PrintDocumentAdapter
     * @syscap SystemCapability.Print.PrintFramework
     * @since 11
     */
    interface PrintDocumentAdapter {
        /**
         * Implement this function to update the print file.
         * @permission ohos.permission.PRINT
         * @param { string } jobId - Indicates print job id.
         * @param { PrintAttributes } oldAttrs - Indicates old print attributes.
         * @param { PrintAttributes } newAttrs - Indicates new print attributes.
         * @param { number } fd - Indicates print file fd.
         * @param { function } writeResultCallback - Indicates this function should execute after the file is updated.
         * @throws { BusinessError } 201 - the application does not have permission to call this function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Print.PrintFramework
         * @since 11
         */
        onStartLayoutWrite(jobId: string, oldAttrs: PrintAttributes, newAttrs: PrintAttributes, fd: number, writeResultCallback: (jobId: string, writeResult: PrintFileCreationState) => void): void;
        /**
         * Implement this function to listen job status change.
         * @permission ohos.permission.PRINT
         * @param { string } jobId - Indicates print job id.
         * @param { PrintDocumentAdapterState } state - Indicates job changes to this state.
         * @throws { BusinessError } 201 - the application does not have permission to call this function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @syscap SystemCapability.Print.PrintFramework
         * @since 11
         */
        onJobStateChanged(jobId: string, state: PrintDocumentAdapterState): void;
    }
    /**
     * Start new print task for App.
     * @permission ohos.permission.PRINT
     * @param { Array<string> } files - Indicates the filepath list to be printed. Only pdf and picture filetype are supported.
     * @param { AsyncCallback<PrintTask> } callback - The callback function for print task.
     * @throws { BusinessError } 201 - the application does not have permission to call this function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
     * @syscap SystemCapability.Print.PrintFramework
     * @since 10
     */
    function print(files: Array<string>, callback: AsyncCallback<PrintTask>): void;
    /**
     * Start new print task for App.
     * @permission ohos.permission.PRINT
     * @param { Array<string> } files - Indicates the filepath list to be printed. Only pdf and picture filetype are supported.
     * @returns { Promise<PrintTask> } the promise returned by the function.
     * @throws { BusinessError } 201 - the application does not have permission to call this function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
     * @syscap SystemCapability.Print.PrintFramework
     * @since 10
     */
    function print(files: Array<string>): Promise<PrintTask>;
    /**
     * Start new print task for App.
     * @permission ohos.permission.PRINT
     * @param { Array<string> } files - Indicates the filepath list to be printed. Only pdf and picture filetype are supported.
     * @param { Context } context - The ability context that initiates the call print request.
     * @param { AsyncCallback<PrintTask> } callback - The callback function for print task.
     * @throws { BusinessError } 201 - the application does not have permission to call this function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
     * @syscap SystemCapability.Print.PrintFramework
     * @since 11
     */
    function print(files: Array<string>, context: Context, callback: AsyncCallback<PrintTask>): void;
    /**
     * Start new print task for App.
     * @permission ohos.permission.PRINT
     * @param { Array<string> } files - Indicates the filepath list to be printed. Only pdf and picture filetype are supported.
     * @param { Context } context - The ability context that initiates the call print request.
     * @returns { Promise<PrintTask> } the promise returned by the function.
     * @throws { BusinessError } 201 - the application does not have permission to call this function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
     * @syscap SystemCapability.Print.PrintFramework
     * @since 11
     */
    function print(files: Array<string>, context: Context): Promise<PrintTask>;
    /**
     * Start new print task for App And the App need update print file.
     * @permission ohos.permission.PRINT
     * @param { string } jobName - Indicates print file Name.
     * @param { PrintDocumentAdapter } printAdapter - Indicates functions implemented by the cpp.
     * @param { PrintAttributes } printAttributes - Indicates print attributes.
     * @param { Context } context - The ability context that initiates the call print request.
     * @returns { Promise<PrintTask> } the promise returned by the function.
     * @throws { BusinessError } 201 - the application does not have permission to call this function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
     * @syscap SystemCapability.Print.PrintFramework
     * @since 11
     */
    function print(jobName: string, printAdapter: PrintDocumentAdapter, printAttributes: PrintAttributes, context: Context): Promise<PrintTask>;
    /**
     * defines print attributes.
     * @typedef PrintAttributes
     * @syscap SystemCapability.Print.PrintFramework
     * @since 11
     */
    interface PrintAttributes {
        /**
        * Copies of document list.
        * @type { ?number }
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        copyNumber?: number;
        /**
        * Range size to be printed.
        * @type { ?PrintPageRange }
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        pageRange?: PrintPageRange;
        /**
        * Page size.
        * @type { ?(PrintPageSize | PrintPageType) }
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        pageSize?: PrintPageSize | PrintPageType;
        /**
        * Print direction.
        * @type { ?PrintDirectionMode }
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        directionMode?: PrintDirectionMode;
        /**
        * Color mode.
        * @type { ?PrintColorMode }
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        colorMode?: PrintColorMode;
        /**
        * Duplex mode.
        * @type { ?PrintDuplexMode }
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        duplexMode?: PrintDuplexMode;
    }
    /**
     * defines print page range.
     * @typedef PrintPageRange
     * @syscap SystemCapability.Print.PrintFramework
     * @since 11
     */
    interface PrintPageRange {
        /**
        * Start page of sequence.
        * @type { ?number }
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        startPage?: number;
        /**
        * End page of sequence.
        * @type { ?number }
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        endPage?: number;
        /**
        * Discrete page of sequence.
        * @type { ?Array<number> }
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        pages?: Array<number>;
    }
    /**
     * defines print page size.
     * @typedef PrintPageSize
     * @syscap SystemCapability.Print.PrintFramework
     * @since 11
     */
    interface PrintPageSize {
        /**
        * Page size id.
        * @type { string }
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        id: string;
        /**
        * Page size name.
        * @type { string }
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        name: string;
        /**
        * Unit: millimeter width.
        * @type { number }
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        width: number;
        /**
        * Unit: millimeter height.
        * @type { number }
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        height: number;
    }
    /**
     * Enumeration of Print Direction Mode.
     * @enum { number } PrintDirectionMode
     * @syscap SystemCapability.Print.PrintFramework
     * @since 11
     */
    enum PrintDirectionMode {
        /**
        * Automatically select direction.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        DIRECTION_MODE_AUTO = 0,
        /**
        * Print portrait.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        DIRECTION_MODE_PORTRAIT = 1,
        /**
        * Print landscape.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        DIRECTION_MODE_LANDSCAPE = 2
    }
    /**
     * Enumeration of Print Color Mode.
     * @enum { number } PrintColorMode
     * @syscap SystemCapability.Print.PrintFramework
     * @since 11
     */
    enum PrintColorMode {
        /**
        * Print monochrome.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        COLOR_MODE_MONOCHROME = 0,
        /**
        * Color printing.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        COLOR_MODE_COLOR = 1
    }
    /**
     * Enumeration of Print Duplex Mode.
     * @enum { number } PrintDuplexMode
     * @syscap SystemCapability.Print.PrintFramework
     * @since 11
     */
    enum PrintDuplexMode {
        /**
        * Single side printing.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        DUPLEX_MODE_NONE = 0,
        /**
        * Long-edge flip-up duplex printing.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        DUPLEX_MODE_LONG_EDGE = 1,
        /**
        * Short-edge flip-up duplex printing.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        DUPLEX_MODE_SHORT_EDGE = 2
    }
    /**
     * Enumeration of Print Page Type.
     * @enum { number } PrintPageType
     * @syscap SystemCapability.Print.PrintFramework
     * @since 11
     */
    enum PrintPageType {
        /**
        * A3 page.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PAGE_ISO_A3 = 0,
        /**
        * A4 page.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PAGE_ISO_A4 = 1,
        /**
        * A5 page.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PAGE_ISO_A5 = 2,
        /**
        * B5 page.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PAGE_JIS_B5 = 3,
        /**
        * C5 page.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PAGE_ISO_C5 = 4,
        /**
        * DL Envelope.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PAGE_ISO_DL = 5,
        /**
        * Letter.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PAGE_LETTER = 6,
        /**
        * Legal.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PAGE_LEGAL = 7,
        /**
        * Photo 4x6.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PAGE_PHOTO_4X6 = 8,
        /**
        * Photo 5x7.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PAGE_PHOTO_5X7 = 9,
        /**
        * Envelope INT DL.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PAGE_INT_DL_ENVELOPE = 10,
        /**
        * Tabloid B.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PAGE_B_TABLOID = 11
    }
    /**
     * Enumeration of Print Document Adapter State.
     * @enum { number } PrintDocumentAdapterState
     * @syscap SystemCapability.Print.PrintFramework
     * @since 11
     */
    enum PrintDocumentAdapterState {
        /**
        * Preview failed.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PREVIEW_DESTROY = 0,
        /**
        * Print state is succeed.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PRINT_TASK_SUCCEED = 1,
        /**
        * Print state is fail.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PRINT_TASK_FAIL = 2,
        /**
        * Print state is cancel.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PRINT_TASK_CANCEL = 3,
        /**
        * Print state is block.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PRINT_TASK_BLOCK = 4
    }
    /**
     * Enumeration of Print File Creation State.
     * @enum { number } PrintFileCreationState
     * @syscap SystemCapability.Print.PrintFramework
     * @since 11
     */
    enum PrintFileCreationState {
        /**
        * Print file created success.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PRINT_FILE_CREATED = 0,
        /**
        * Print file created fail.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PRINT_FILE_CREATION_FAILED = 1,
        /**
        * Print file created success but unrendered.
        * @syscap SystemCapability.Print.PrintFramework
        * @since 11
        */
        PRINT_FILE_CREATED_UNRENDERED = 2
    }
}
export default print;
