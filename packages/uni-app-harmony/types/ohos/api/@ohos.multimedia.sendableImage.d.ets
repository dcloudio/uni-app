/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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
 * @kit ImageKit
 */
import { AsyncCallback } from './@ohos.base';
import type colorSpaceManager from './@ohos.graphics.colorSpaceManager';
import type image from './@ohos.multimedia.image';
import type rpc from './@ohos.rpc';
import lang from '../arkts/@arkts.lang';
/**
* This module provides the capability of image codec and access
* @namespace sendableImage
* @syscap SystemCapability.Multimedia.Image.Core
* @crossplatform
* @atomicservice
* @since 12
*/
declare namespace sendableImage {
    /**
      * Describes the size of an image.
      *
      * @typedef Size
      * @syscap SystemCapability.Multimedia.Image.Core
      * @crossplatform
      * @form
      * @atomicservice
      * @since 12
      */
    interface Size extends lang.ISendable {
        /**
         * Height
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        height: number;
        /**
         * Width
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        width: number;
    }
    /**
     * Describes region information.
     *
     * @typedef Region
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    interface Region extends lang.ISendable {
        /**
         * Image size.
         *
         * @type { Size }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        size: Size;
        /**
         * x-coordinate at the upper left corner of the image.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        x: number;
        /**
         * y-coordinate at the upper left corner of the image.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        y: number;
    }
    /**
     * Creates an ImageSource instance based on the URI.
     *
     * @param { string } uri Image source URI.
     * @returns { ImageSource } returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createImageSource(uri: string): ImageSource;
    /**
     * Creates an ImageSource instance based on the file descriptor.
     *
     * @param { number } fd ID of a file descriptor.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createImageSource(fd: number): ImageSource;
    /**
     * Creates an ImageSource instance based on the buffer.
     *
     * @param { ArrayBuffer } buf The buffer of the image.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    function createImageSource(buf: ArrayBuffer): ImageSource;
    /**
     * Creates an ImageReceiver instance.
     *
     * @param { Size } size - The default {@link Size} in pixels of the Images that this receiver will produce.
     * @param { ImageFormat } format - The format of the Image that this receiver will produce. This must be one of the
     *            {@link ImageFormat} constants.
     * @param { number } capacity - The maximum number of images the user will want to access simultaneously.
     * @returns { ImageReceiver } Returns the ImageReceiver instance if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.Multimedia.Image.ImageReceiver
     * @since 12
     */
    function createImageReceiver(size: image.Size, format: image.ImageFormat, capacity: number): ImageReceiver;
    type ISendable = lang.ISendable;
    /**
     * Create PixelMap by data buffer.
     *
     * @param { ArrayBuffer } colors The image color buffer.
     * @param { InitializationOptions } options Initialization options for PixelMap.
     * @returns { Promise<PixelMap> } A Promise instance used to return the PixelMap object.
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 12
     */
    function createPixelMap(colors: ArrayBuffer, options: image.InitializationOptions): Promise<PixelMap>;
    /**
     * Create PixelMap by data buffer.
     *
     * @param { ArrayBuffer } colors The image color buffer.
     * @param { InitializationOptions } options Initialization options for PixelMap.
     * @returns { PixelMap } Returns the instance if the operation is successful;Otherwise, return undefined.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * 2.Incorrect parameter types. 3.Parameter verification failed.
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 12
     */
    function createPixelMapSync(colors: ArrayBuffer, options: image.InitializationOptions): PixelMap;
    /**
     * Creates a PixelMap object based on MessageSequence parameter.
     *
     * @param { rpc.MessageSequence } sequence - rpc.MessageSequence parameter.
     * @returns { PixelMap } Returns the instance if the operation is successful.
     * Otherwise, an exception will be thrown.
     * @throws { BusinessError } 62980096 - Operation failed.
     * @throws { BusinessError } 62980097 - IPC error.
     * @throws { BusinessError } 62980115 - Invalid input parameter.
     * @throws { BusinessError } 62980105 - Failed to get the data.
     * @throws { BusinessError } 62980177 - Abnormal API environment.
     * @throws { BusinessError } 62980178 - Failed to create the PixelMap.
     * @throws { BusinessError } 62980179 - Abnormal buffer size.
     * @throws { BusinessError } 62980180 - FD mapping failed.
     * @throws { BusinessError } 62980246 - Failed to read the PixelMap.
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 12
     */
    function createPixelMapFromParcel(sequence: rpc.MessageSequence): PixelMap;
    /**
     * Creates a PixelMap object from surface id.
     *
     * @param { string } surfaceId - surface id.
     * @param { Region } region - The region to surface.
     * @returns { Promise<PixelMap> } Returns the instance if the operation is successful.
     * Otherwise, an exception will be thrown.
     * @throws { BusinessError } 62980115 - If the image parameter invalid.
     * @throws { BusinessError } 62980105 - Failed to get the data.
     * @throws { BusinessError } 62980178 - Failed to create the PixelMap.
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 12
     */
    function createPixelMapFromSurface(surfaceId: string, region: image.Region): Promise<PixelMap>;
    /**
     * Creates a sendable image PixelMap from image PixelMap.
     *
     * @param { image.PixelMap } pixelmap - the src pixelmap.
     * @returns { PixelMap } Returns the instance if the operation is successful.
     * Otherwise, an exception will be thrown.
     * @throws { BusinessError } 401 - If the image parameter invalid. Possible causes:
     * 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 62980104 - Failed to initialize the internal object.
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 12
     */
    function convertFromPixelMap(pixelmap: image.PixelMap): PixelMap;
    /**
     * Creates a image PixelMap from sendable image PixelMap.
     *
     * @param { PixelMap } pixelmap - the src pixelmap.
     * @returns { image.PixelMap } Returns the instance if the operation is successful.
     * Otherwise, an exception will be thrown.
     * @throws { BusinessError } 401 - If the image parameter invalid. Possible causes:
     * 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 62980104 - Failed to initialize the internal object.
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 12
     */
    function convertToPixelMap(pixelmap: PixelMap): image.PixelMap;
    /**
     * Sendable PixelMap instance.
     *
     * @typedef PixelMap
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface PixelMap extends ISendable {
        /**
         * Whether the image pixelmap can be edited.
         *
         * @type { boolean }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readonly isEditable: boolean;
        /**
         * Reads image pixelmap data and writes the data to an ArrayBuffer. This method uses
         * a promise to return the result.
         *
         * @param { ArrayBuffer } dst A buffer to which the image pixelmap data will be written.
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readPixelsToBuffer(dst: ArrayBuffer): Promise<void>;
        /**
         * Reads image pixelmap data and writes the data to an ArrayBuffer.
         *
         * @param { ArrayBuffer } dst A buffer to which the image pixelmap data will be written.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 501 - Resource Unavailable.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readPixelsToBufferSync(dst: ArrayBuffer): void;
        /**
         * Reads image pixelmap data in an area. This method uses a promise to return the data read.
         *
         * @param { PositionArea } area Area from which the image pixelmap data will be read.
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readPixels(area: image.PositionArea): Promise<void>;
        /**
         * Reads image pixelmap data in an area.
         *
         * @param { PositionArea } area Area from which the image pixelmap data will be read.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 501 - Resource Unavailable.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readPixelsSync(area: image.PositionArea): void;
        /**
         * Writes image pixelmap data to the specified area. This method uses a promise to return
         * the operation result.
         *
         * @param { PositionArea } area Area to which the image pixelmap data will be written.
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        writePixels(area: image.PositionArea): Promise<void>;
        /**
         * Writes image pixelmap data to the specified area.
         *
         * @param { PositionArea } area Area to which the image pixelmap data will be written.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 501 - Resource Unavailable.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        writePixelsSync(area: image.PositionArea): void;
        /**
         * Reads image data in an ArrayBuffer and writes the data to a PixelMap object. This method
         * uses a promise to return the result.
         *
         * @param { ArrayBuffer } src A buffer from which the image data will be read.
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        writeBufferToPixels(src: ArrayBuffer): Promise<void>;
        /**
         * Reads image data in an ArrayBuffer and writes the data to a PixelMap object.
         *
         * @param { ArrayBuffer } src A buffer from which the image data will be read.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 501 - Resource Unavailable.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        writeBufferToPixelsSync(src: ArrayBuffer): void;
        /**
         * Obtains pixelmap information about this image. This method uses a promise to return the information.
         *
         * @returns { Promise<ImageInfo> } A Promise instance used to return the image pixelmap information.
         * If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getImageInfo(): Promise<image.ImageInfo>;
        /**
         * Get image information from image source.
         *
         * @returns { ImageInfo } the image information.
         * @throws { BusinessError } 501 - Resource Unavailable.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getImageInfoSync(): image.ImageInfo;
        /**
         * Obtains the number of bytes in each line of the image pixelmap.
         *
         * @returns { number } Number of bytes in each line.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getBytesNumberPerRow(): number;
        /**
         * Obtains the total number of bytes of the image pixelmap.
         *
         * @returns { number } Total number of bytes.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getPixelBytesNumber(): number;
        /**
         * Obtains the density of the image pixelmap.
         *
         * @returns { number } The number of density.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        getDensity(): number;
        /**
         * Set the transparent rate of pixelmap. This method uses a promise to return the result.
         *
         * @param { number } rate The value of transparent rate.
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        opacity(rate: number): Promise<void>;
        /**
         * Set the transparent rate of pixelmap.
         *
         * @param { number } rate The value of transparent rate.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 501 - Resource Unavailable.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        opacitySync(rate: number): void;
        /**
         * Obtains new pixelmap with alpha information. This method uses a promise to return the information.
         *
         * @returns { Promise<PixelMap> } A Promise instance used to return the new image pixelmap.
         * If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        createAlphaPixelmap(): Promise<PixelMap>;
        /**
         * Obtains new pixelmap with alpha information.
         *
         * @returns { PixelMap } return the new image pixelmap.
         * If the operation fails, an error message is returned.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Parameter verification failed.
         * @throws { BusinessError } 501 - Resource Unavailable.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        createAlphaPixelmapSync(): PixelMap;
        /**
         * Image zoom in width and height. This method uses a promise to return the result.
         *
         * @param { number } x The zoom value of width.
         * @param { number } y The zoom value of height.
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        scale(x: number, y: number): Promise<void>;
        /**
         * Image zoom in width and height.
         *
         * @param { number } x The zoom value of width.
         * @param { number } y The zoom value of height.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 501 - Resource Unavailable.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        scaleSync(x: number, y: number): void;
        /**
         * Image position transformation. This method uses a promise to return the result.
         *
         * @param { number } x The position value of width.
         * @param { number } y The position value of height.
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        translate(x: number, y: number): Promise<void>;
        /**
         * Image position transformation.
         *
         * @param { number } x The position value of width.
         * @param { number } y The position value of height.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 501 - Resource Unavailable.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        translateSync(x: number, y: number): void;
        /**
         * Image rotation. This method uses a promise to return the result.
         *
         * @param { number } angle The rotation angle.
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        rotate(angle: number): Promise<void>;
        /**
         * Image rotation.
         *
         * @param { number } angle The rotation angle.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 501 - Resource Unavailable.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        rotateSync(angle: number): void;
        /**
         * Image flipping. This method uses a promise to return the result.
         *
         * @param { boolean } horizontal Is flip in horizontal.
         * @param { boolean } vertical Is flip in vertical.
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        flip(horizontal: boolean, vertical: boolean): Promise<void>;
        /**
         * Image flipping.
         *
         * @param { boolean } horizontal Is flip in horizontal.
         * @param { boolean } vertical Is flip in vertical.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 501 - Resource Unavailable.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        flipSync(horizontal: boolean, vertical: boolean): void;
        /**
         * Crop the image. This method uses a promise to return the result.
         *
         * @param { Region } region The region to crop.
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        crop(region: image.Region): Promise<void>;
        /**
         * Crop the image.
         *
         * @param { Region } region The region to crop.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 501 - Resource Unavailable.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        cropSync(region: image.Region): void;
        /**
         * Get color space of pixelmap.
         *
         * @returns { colorSpaceManager.ColorSpaceManager } If the operation fails, an error message is returned.
         * @throws { BusinessError } 62980101 - If the image data abnormal.
         * @throws { BusinessError } 62980103 - If the image data unsupport.
         * @throws { BusinessError } 62980115 - If the image parameter invalid.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        getColorSpace(): colorSpaceManager.ColorSpaceManager;
        /**
         * Set color space of pixelmap.
         *
         * This method is only used to set the colorspace property of PixelMap,
         * while all pixel data remains the same after calling this method.
         * If you want to change colorspace for all pixels, use method
         * {@Link #applyColorSpace(colorSpaceManager.ColorSpaceManager)}.
         *
         * @param { colorSpaceManager.ColorSpaceManager } colorSpace The color space for pixelmap.
         * @throws { BusinessError } 62980111 - If the operation invalid.
         * @throws { BusinessError } 62980115 - If the image parameter invalid.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        setColorSpace(colorSpace: colorSpaceManager.ColorSpaceManager): void;
        /**
         * Is it stride Alignment
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 12
         */
        readonly isStrideAlignment: boolean;
        /**
         * Apply color space of pixelmap, the pixels will be changed by input color space.
         * This method uses a promise to return the result.
         *
         * This method is used to change color space of PixelMap.
         * Pixel data will be changed by calling this method.
         * If you want to set the colorspace property of PixelMap only,
         * use method {@Link #setColorSpace(colorSpaceManager.ColorSpaceManager)}.
         *
         * @param { colorSpaceManager.ColorSpaceManager } targetColorSpace - The color space for pixelmap.
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * If the operation fails, an error message is returned.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 62980104 - Failed to initialize the internal object.
         * @throws { BusinessError } 62980108 - Failed to convert the color space.
         * @throws { BusinessError } 62980115 - Invalid image parameter.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        applyColorSpace(targetColorSpace: colorSpaceManager.ColorSpaceManager): Promise<void>;
        /**
         * Releases this PixelMap object. This method uses a promise to return the result.
         *
         * @returns { Promise<void> } A Promise instance used to return the instance release result.
         * If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        release(): Promise<void>;
        /**
         * Marshalling PixelMap and write into MessageSequence.
         *
         * @param { rpc.MessageSequence } sequence rpc.MessageSequence parameter.
         * @throws { BusinessError } 62980115 - Invalid image parameter.
         * @throws { BusinessError } 62980097 - IPC error.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 12
         */
        marshalling(sequence: rpc.MessageSequence): void;
        /**
         * Creates a PixelMap object based on MessageSequence parameter.
         *
         * @param { rpc.MessageSequence } sequence rpc.MessageSequence parameter.
         * @returns { Promise<PixelMap> } A Promise instance used to return the PixelMap object.
         * @throws { BusinessError } 62980115 - Invalid image parameter.
         * @throws { BusinessError } 62980097 - IPC error.
         * @throws { BusinessError } 62980096 - The operation failed.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 12
         */
        unmarshalling(sequence: rpc.MessageSequence): Promise<PixelMap>;
    }
    /**
     * ImageSource instance.
     *
     * @typedef ImageSource
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    interface ImageSource {
        /**
         * Creates a PixelMap object based on image decoding parameters. This method uses a promise to
         * return the object.
         *
         * @param { DecodingOptions } options Image decoding parameters.
         * @returns { Promise<PixelMap> } A Promise instance used to return the PixelMap object.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        createPixelMap(options?: image.DecodingOptions): Promise<PixelMap>;
        /**
         * Releases an ImageSource instance and uses a promise to return the result.
         *
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 12
         */
        release(): Promise<void>;
    }
    /**
     * Provides basic image operations, including obtaining image information, and reading and writing image data.
     *
     * @typedef Image
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 12
     */
    interface Image extends lang.ISendable {
        /**
         * Sets or gets the image area to crop, default is size.
         *
         * @type { Region }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 12
         */
        clipRect: Region;
        /**
         * Image size.
         *
         * @type { Size }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 12
         */
        readonly size: Size;
        /**
         * Image format.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 12
         */
        readonly format: number;
        /**
         * Image timestamp.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 12
         */
        readonly timestamp: number;
        /**
         * Get component buffer from image and uses a promise to return the result.
         *
         * @param { ComponentType } componentType The component type of image.
         * @returns { Promise<Component> } A Promise instance used to return the component buffer.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 12
         */
        getComponent(componentType: image.ComponentType): Promise<image.Component>;
        /**
         * Release current image to receive another and uses a promise to return the result.
         *
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 12
         */
        release(): Promise<void>;
    }
    /**
     * Image receiver object.
     *
     * @typedef ImageReceiver
     * @syscap SystemCapability.Multimedia.Image.ImageReceiver
     * @since 12
     */
    interface ImageReceiver {
        /**
         * Image size.
         *
         * @type { Size }
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 12
         */
        readonly size: image.Size;
        /**
         * Image capacity.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 12
         */
        readonly capacity: number;
        /**
         * Image format.
         *
         * @type { ImageFormat }
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 12
         */
        readonly format: image.ImageFormat;
        /**
         * Get an id which indicates a surface and can be used to set to Camera or other component can receive a surface
         * and uses a promise to return the result.
         *
         * @returns { Promise<string> } A Promise instance used to return the surface id.
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 12
         */
        getReceivingSurfaceId(): Promise<string>;
        /**
         * Get lasted image from receiver and uses a promise to return the result.
         *
         * @returns { Promise<Image> } A Promise instance used to return the latest image.
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 12
         */
        readLatestImage(): Promise<Image>;
        /**
         * Get next image from receiver and uses a promise to return the result.
         *
         * @returns { Promise<Image> } A Promise instance used to return the next image.
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 12
         */
        readNextImage(): Promise<Image>;
        /**
         * Subscribe callback when receiving an image
         *
         * @param { 'imageArrival' } type Callback used to return the next image.
         * @param { AsyncCallback<void> } callback Callback used to return image.
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 12
         */
        on(type: 'imageArrival', callback: AsyncCallback<void>): void;
        /**
         * Release image receiver instance and uses a promise to return the result.
         *
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 12
         */
        release(): Promise<void>;
    }
}
export default sendableImage;
