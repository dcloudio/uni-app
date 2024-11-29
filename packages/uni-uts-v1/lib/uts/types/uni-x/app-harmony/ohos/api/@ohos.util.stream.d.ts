/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
* @kit ArkTS
*/
import { Callback } from './@ohos.base';
import emitter from './@ohos.events.emitter';
/**
 * The stream module provides a comprehensive set of stream processing capabilities, including four types of streams:
 * - Writable: streams designed for writing data to.
 * - Readable: streams designed for reading data from.
 * - Duplex: streams that are both readable and writable.
 * - Transform: a specialized type of duplex stream that can modify or transform data as it's being written and read.
 *
 * @namespace stream
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare namespace stream {
    /**
     * Streams to which data can be written.
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    class Writable {
        /**
         * The Writable constructor.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        constructor();
        /**
         * writes a chunk to Writable and invokes callback when the chunk is flushed. The return value indicates
         * whether the internal buffer of the Writable reaches the hightWaterMark. If true is returned, the buffer
         * does not reach the hightWaterMark. If false is returned, the buffer has been reached. The write function
         * should be called after the drain event is triggered. If the write function is called continuously,
         * the chunk is still added to the buffer until the memory overflows
         *
         * @param { string | Uint8Array } [chunk] - Data to be written.
         * @param { string } [encoding] - Encoding type.
         * @param { Function } [callback] - Callback after writing.
         * @returns { boolean } Write success returns true, write failure returns false.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @throws { BusinessError } 10200035 - The doWrite method has not been implemented.
         * @throws { BusinessError } 10200036 - The stream has been ended.
         * @throws { BusinessError } 10200037 - The callback is invoked multiple times consecutively.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
        */
        write(chunk?: string | Uint8Array, encoding?: string, callback?: Function): boolean;
        /**
         * Write the last chunk to Writable.
         *
         * @param { string | Uint8Array } [chunk] - Data to be written.
         * @param { string } [encoding] - Encoding type.
         * @param { Function } [callback] - Callback after writing.
         * @returns { Writable } Returns the Writable object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @throws { BusinessError } 10200035 - The doWrite method has not been implemented.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        end(chunk?: string | Uint8Array, encoding?: string, callback?: Function): Writable;
        /**
         * Set the default encoding mode.
         *
         * @param { string } [encoding] - Encoding type.Default: utf8.
         * @returns { boolean } Setting successful returns true, setting failed returns false.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
        */
        setDefaultEncoding(encoding?: string): boolean;
        /**
         * After the call, all Write operations will be forced to write to the buffer instead of being flushed.
         *
         * @returns { boolean } Setting successful returns true, setting failed returns false.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        cork(): boolean;
        /**
         * After calling, flush all buffers.
         *
         * @returns { boolean } Setting successful returns true, setting failed returns false.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        uncork(): boolean;
        /**
         * Registering Event Messages.
         *
         * @param { string } event - Register Event.
         * @param { Callback<emitter.EventData> } callback - event callbacks.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        on(event: string, callback: Callback<emitter.EventData>): void;
        /**
         * Cancel event message.
         *
         * @param { string } event - Register Event.
         * @param { Callback<emitter.EventData> } callback - event callbacks.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        off(event: string, callback?: Callback<emitter.EventData>): void;
        /**
         * This method is invoked by the Writable method during initialization and must not be invoked directly.
         * After the resource is initialized in the doInitialize method, the callback () method is invoked.
         *
         * @param { Function } callback - Callback when the stream has completed the initial.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        doInitialize(callback: Function): void;
        /**
         * Implemented by subclass inheritance. The implementation logic of flushing chunks in the buffer must not be
         * directly called. The call is controlled by Writable.write.
         *
         * @param { string | Uint8Array } [chunk] - Data to be written.
         * @param { string } [encoding] - Encoding type.
         * @param { Function } [callback] - Callback after writing.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        doWrite(chunk: string | Uint8Array, encoding: string, callback: Function): void;
        /**
         * The implementation logic of flushing chunks in the buffer in batches should not be actively called.
         * The call is controlled by Writable.write.
         *
         * @param { string[] | Uint8Array[] } [chunks] - Data to be written.
         * @param { Function } [callback] - Callback after writing.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        doWritev(chunks: string[] | Uint8Array[], callback: Function): void;
        /**
         * Returns boolean indicating whether it is in ObjectMode.
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly writableObjectMode: boolean;
        /**
         * Value of highWatermark.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly writableHighWatermark: number;
        /**
         * Is true if it is safe to call writable.write(), which means the stream has not been destroyed, error or end.
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly writable: boolean;
        /**
         * Size of data that can be flushed, in bytes or objects.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly writableLength: number;
        /**
         * Number of times writable.uncork() needs to be called in order to fully uncork the stream.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly writableCorked: number;
        /**
         * Whether Writable.end has been called.
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly writableEnded: boolean;
        /**
         * Whether Writable.end has been called and all buffers have been flushed.
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly writableFinished: boolean;
    }
    /**
     * Transform stream is a Duplex stream where the output is computed in some way from the input.
     * Transform implementations must implement the doTransform() method and may also implement the doFlush() method.
     *
     * @extends Duplex
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    class Transform extends Duplex {
        /**
         * The Transform constructor.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        constructor();
        /**
         * Convert the input data. After the conversion, Transform.push can be called to send the input to the read stream.
         * Transform.push should not be called Transform.write to call.
         *
         * @param { string } chunk - Input data to be converted.
         * @param { string } encoding - If the chunk is a string, then this is the encoding type. If chunk is a buffer,
         * then this is the special value 'buffer'. Ignore it in that case.
         * @param { Function } callback - Callback after conversion.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        doTransform(chunk: string, encoding: string, callback: Function): void;
        /**
         * After all data is flushed to the write stream, you can use the Transform.doFlush writes some extra data, must
         * not be called directly, only called by Writable after flushing all data.
         *
         * @param { Function } callback - Callback after flush completion.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        doFlush(callback: Function): void;
    }
    /**
     * Return readable options.
     *
     * @interface ReadableOptions
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface ReadableOptions {
        /**
        * Specifies the encoding format of the data. If this parameter is provided,
        * the readable stream decodes the data into a string in the specified encoding format. Default: utf8.
        * If an invalid string is entered, a 401 exception is thrown in the Readable constructor.
        * Supported encoding formats: utf-8, ibm866, iso-8859-2, iso-8859-3, iso-8859-4, iso-8859-5, iso-8859-6,
        * iso-8859-7, iso-8859-8, iso-8859-8-i, iso-8859-10, iso-8859-13, iso-8859-14, iso-8859-15, koi8-r, koi8-u,
        * macintosh, windows-874, windows-1250, windows-1251, windows-1252, windows-1253, windows-1254, windows-1255,
        * windows-1256, windows-1257, windows-1258, x-mac-cyrillic, gbk, gb18030, big5, euc-jp, iso-2022-jp, shift_jis,
        * euc-kr, utf-16be, utf-16le.
        *
        * @type { ?string }
        * @syscap SystemCapability.Utils.Lang
        * @crossplatform
        * @atomicservice
        * @since 12
        */
        encoding?: string;
    }
    /**
     * The stream from which data can be read.
     *
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    class Readable {
        /**
         * The Readable constructor.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        constructor();
        /**
         * The Readable constructor.
         *
         * @param { ReadableOptions } options - Provide options.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        constructor(options: ReadableOptions);
        /**
         * Reads a buffer of a specified size from the buffer. If the available buffer is sufficient, the result
         * of the specified size is returned. Otherwise, if Readable has ended, all remaining buffers are returned.
         *
         * @param { number } size - Expected length of the data to be read.
         * @returns { string | null } If no data is available to read, null is returned.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @throws { BusinessError } 10200038 - The doRead method has not been implemented.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        read(size?: number): string | null;
        /**
         * Switch Readable to Streaming Mode.
         *
         * @returns { Readable } Return this object.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        resume(): Readable;
        /**
         * Toggle Readable to Suspend Mode.
         *
         * @returns { Readable } Return this object.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        pause(): Readable;
        /**
         * Sets the encoding format of the input binary data.Default: utf8.
         *
         * @param { string } [encoding] - Original Data Encoding Type.
         * @returns { boolean } Setting successful returns true, setting failed returns false.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        setEncoding(encoding?: string): boolean;
        /**
         * Query whether it is in pause state.
         *
         * @returns { boolean } Pause state returns true, otherwise returns false.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        isPaused(): boolean;
        /**
         * Concatenated a Writable to a Readable and switches the Readable to stream mode.
         *
         * @param { Writable } destination - Output writable stream.
         * @param { Object } [options] - Pipeline Options.
         * @returns { Writable } Returns the Writable object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        pipe(destination: Writable, options?: Object): Writable;
        /**
         * Disconnect Writable from Readable.
         *
         * @param { Writable } [destination] - Writable Streams Needing to Be Disconnected.
         * @returns { Readable } Returns the Readable object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        unpipe(destination?: Writable): Readable;
        /**
         * Registering Event Messages.
         *
         * @param { string } event - Registering Events.
         * @param { Callback<emitter.EventData> } callback - Event callback.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        on(event: string, callback: Callback<emitter.EventData>): void;
        /**
         * Cancel event message.
         *
         * @param { string } event - Registering Events.
         * @param { Callback<emitter.EventData> } callback - Event callback.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        off(event: string, callback?: Callback<emitter.EventData>): void;
        /**
         * It may be implemented by child classes, and if so, will be called by the Readable class methods only.
         * It must not be called directly.
         *
         * @param { Function } callback - Callback when the stream has completed the initial.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        doInitialize(callback: Function): void;
        /**
         * The specific implementation of data production. It must not be actively called.
         * After data production, Readable.push should be called to push the produced data into the buffer.
         * If push is not called, doRead will not be called again.
         *
         * @param { number } size - Expected length of the data to be read.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        doRead(size: number): void;
        /**
         * Adds the generated data to the buffer. The return value indicates whether the data in the buffer has not
         * reached the highWaterMark (similar to Writable.write). If the chunk is null, all data has been generated.
         *
         * @param {  Uint8Array | string | null } chunk - Binary data to be stored in the buffer.
         * @param { string } [encoding] - Binary data encoding type.
         * @returns { boolean } If true is returned, the data in the buffer reaches the highWaterMark. Otherwise, the
         * data in the buffer does not reach the highWaterMark.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        push(chunk: Uint8Array | string | null, encoding?: string): boolean;
        /**
         * Returns boolean indicating whether it is in ObjectMode.
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly readableObjectMode: boolean;
        /**
         * Is true if it is safe to call readable.read(), which means
         * the stream has not been destroyed or emitted 'error' or 'end'.
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly readable: boolean;
        /**
         * Returns the value of highWatermark passed when creating this Readable.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly readableHighWatermark: number;
        /**
         * This property reflects the current state of the readable stream null/true/false.
         *
         * @type { boolean | null }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly readableFlowing: boolean | null;
        /**
         * Size of the data that can be read, in bytes or objects.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly readableLength: number;
        /**
         * Getter for the property encoding of a given Readable stream. The encoding property can be set using the
         * readable.setEncoding() method.
         *
         * @type { string | null }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly readableEncoding: string | null;
        /**
         * Whether all data has been generated.
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly readableEnded: boolean;
    }
    /**
     * Duplex streams are streams that implement both the Readable streams and Writable streams interfaces.
     *
     * @extends Readable
     * @syscap SystemCapability.Utils.Lang
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    class Duplex extends Readable {
        /**
        * The Duplex constructor.
         *
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        constructor();
        /**
         * writes a chunk to Writable and invokes callback when the chunk is flushed. The return value indicates
         * whether the internal buffer of the Writable reaches the hightWaterMark. If true is returned, the buffer
         * does not reach the hightWaterMark. If false is returned, the buffer has been reached. The write function
         * should be called after the drain event is triggered. If the write function is called continuously,
         * the chunk is still added to the buffer until the memory overflows
         *
         * @param { string | Uint8Array } [chunk] - Data to be written.
         * @param { string } [encoding] - Encoding type.
         * @param { Function } [callback] - Callback after writing.
         * @returns { boolean } Write success returns true, write failure returns false.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @throws { BusinessError } 10200036 - The stream has been ended.
         * @throws { BusinessError } 10200037 - The callback is invoked multiple times consecutively.
         * @throws { BusinessError } 10200039 - The doTransform method has not been implemented for a class that inherits from Transform.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        write(chunk?: string | Uint8Array, encoding?: string, callback?: Function): boolean;
        /**
         * Write the last chunk to Writable.
         *
         * @param { string | Uint8Array } [chunk] - Data to be written.
         * @param { string } [encoding] - Encoding type.
         * @param { Function } [callback] - Callback after writing.
         * @returns { Writable } Returns the Writable object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @throws { BusinessError } 10200039 - The doTransform method has not been implemented for a class that inherits from Transform.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        end(chunk?: string | Uint8Array, encoding?: string, callback?: Function): Writable;
        /**
         * Set the default encoding mode.
         *
         * @param { string } [encoding] - Encoding type.Default: utf8.
         * @returns { boolean } Setting successful returns true, setting failed returns false.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        setDefaultEncoding(encoding?: string): boolean;
        /**
         * After the call, all Write operations will be forced to write to the buffer instead of being flushed.
         *
         * @returns { boolean } Setting successful returns true, setting failed returns false.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        cork(): boolean;
        /**
         * After calling, flush all buffers.
         *
         * @returns { boolean } Setting successful returns true, setting failed returns false.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        uncork(): boolean;
        /**
         * Implemented by subclass inheritance. The implementation logic of flushing chunks in the buffer must not be
         * directly called. The call is controlled by Writable.write.
         *
         * @param { string | Uint8Array } [chunk] - Data to be written.
         * @param { string } [encoding] - Encoding type.
         * @param { Function } [callback] - Callback after writing.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        doWrite(chunk: string | Uint8Array, encoding: string, callback: Function): void;
        /**
         * The implementation logic of flushing chunks in the buffer in batches should not be actively called.
         * The call is controlled by Writable.write.
         *
         * @param { string[] | Uint8Array[] } [chunks] - Data to be written.
         * @param { Function } [callback] - Callback after writing.
         * @throws { BusinessError } 401 - Parameter error. Possible causes:
         *     1.Mandatory parameters are left unspecified;
         *     2.Incorrect parameter types;
         *     3.Parameter verification failed.
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        doWritev(chunks: string[] | Uint8Array[], callback: Function): void;
        /**
         * Returns boolean indicating whether it is in ObjectMode.
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly writableObjectMode: boolean;
        /**
         * Value of highWatermark.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly writableHighWatermark: number;
        /**
         * Is true if it is safe to call writable.write(), which means the stream has not been destroyed, error or end.
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly writable: boolean;
        /**
         * Size of data that can be flushed, in bytes or objects.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly writableLength: number;
        /**
         * Number of times writable.uncork() needs to be called in order to fully uncork the stream.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly writableCorked: number;
        /**
         * Whether Writable.end has been called.
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly writableEnded: boolean;
        /**
         * Whether Writable.end has been called and all buffers have been flushed.
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.Utils.Lang
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly writableFinished: boolean;
    }
}
export default stream;
