/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import type resourceManager from './@ohos.resourceManager';
import type rpc from './@ohos.rpc';
/**
 * @namespace image
 * @since 6
 */
/**
 * This module provides the capability of image codec and access
 * @namespace image
 * @syscap SystemCapability.Multimedia.Image.Core
 * @crossplatform
 * @atomicservice
 * @since 11
 */
/**
 * This module provides the capability of image codec and access
 * @namespace image
 * @syscap SystemCapability.Multimedia.Image.Core
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12
 */
declare namespace image {
    /**
     * Enumerates pixel map formats.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 7
     */
    /**
     * Enumerates pixel map formats.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Enumerates pixel map formats.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Enumerates pixel map formats.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    enum PixelMapFormat {
        /**
         * Indicates an unknown format.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Indicates an unknown format.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates an unknown format.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Indicates an unknown format.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        UNKNOWN = 0,
        /**
         * Indicates that each pixel is stored on 16 bits. Only the R, G, and B components are encoded
         * from the higher-order to the lower-order bits: red is stored with 5 bits of precision,
         * green is stored with 6 bits of precision, and blue is stored with 5 bits of precision.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Indicates that each pixel is stored on 16 bits. Only the R, G, and B components are encoded
         * from the higher-order to the lower-order bits: red is stored with 5 bits of precision,
         * green is stored with 6 bits of precision, and blue is stored with 5 bits of precision.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates that each pixel is stored on 16 bits. Only the R, G, and B components are encoded
         * from the higher-order to the lower-order bits: red is stored with 5 bits of precision,
         * green is stored with 6 bits of precision, and blue is stored with 5 bits of precision.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Indicates that each pixel is stored on 16 bits. Only the R, G, and B components are encoded
         * from the higher-order to the lower-order bits: red is stored with 5 bits of precision,
         * green is stored with 6 bits of precision, and blue is stored with 5 bits of precision.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        RGB_565 = 2,
        /**
         * Indicates that each pixel is stored on 32 bits. Each pixel contains 4 components：B(8bits), G(8bits), R(8bits), A(8bits)
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Indicates that each pixel is stored on 32 bits. Each pixel contains 4 components：B(8bits), G(8bits), R(8bits), A(8bits)
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates that each pixel is stored on 32 bits. Each pixel contains 4 components：B(8bits), G(8bits), R(8bits), A(8bits)
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Indicates that each pixel is stored on 32 bits. Each pixel contains 4 components：B(8bits), G(8bits), R(8bits), A(8bits)
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        RGBA_8888 = 3,
        /**
         * Indicates that each pixel is stored on 32 bits. Each pixel contains 4 components：B(8bits), G(8bits), R(8bits), A(8bits)
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Indicates that each pixel is stored on 32 bits. Each pixel contains 4 components：B(8bits), G(8bits), R(8bits), A(8bits)
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates that each pixel is stored on 32 bits. Each pixel contains 4 components：B(8bits), G(8bits), R(8bits), A(8bits)
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Indicates that each pixel is stored on 32 bits. Each pixel contains 4 components：B(8bits), G(8bits), R(8bits), A(8bits)
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        BGRA_8888 = 4,
        /**
         * Indicates that each pixel is stored on 24 bits. Each pixel contains 3 components：R(8bits), G(8bits), B(8bits)
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Indicates that each pixel is stored on 24 bits. Each pixel contains 3 components：R(8bits), G(8bits), B(8bits)
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates that each pixel is stored on 24 bits. Each pixel contains 3 components：R(8bits), G(8bits), B(8bits)
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Indicates that each pixel is stored on 24 bits. Each pixel contains 3 components：R(8bits), G(8bits), B(8bits)
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        RGB_888 = 5,
        /**
         * Indicates that each pixel is stored on 8 bits. Each pixel contains 1 component：ALPHA(8bits)
         * and is stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Indicates that each pixel is stored on 8 bits. Each pixel contains 1 component：ALPHA(8bits)
         * and is stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates that each pixel is stored on 8 bits. Each pixel contains 1 component：ALPHA(8bits)
         * and is stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Indicates that each pixel is stored on 8 bits. Each pixel contains 1 component：ALPHA(8bits)
         * and is stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        ALPHA_8 = 6,
        /**
         * Indicates that each pixel is stored on 32 bits. Each pixel contains 4 components：B(8bits), G(8bits), R(8bits), A(8bits)
         * and are stored from the higher-order to the lower-order bits in F16.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Indicates that each pixel is stored on 32 bits. Each pixel contains 4 components：B(8bits), G(8bits), R(8bits), A(8bits)
         * and are stored from the higher-order to the lower-order bits in F16.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates that each pixel is stored on 32 bits. Each pixel contains 4 components：B(8bits), G(8bits), R(8bits), A(8bits)
         * and are stored from the higher-order to the lower-order bits in F16.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Indicates that each pixel is stored on 32 bits. Each pixel contains 4 components：B(8bits), G(8bits), R(8bits), A(8bits)
         * and are stored from the higher-order to the lower-order bits in F16.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        RGBA_F16 = 7,
        /**
         * Indicates that the storage order is to store Y first and then V U alternately each occupies 8 bits
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Indicates that the storage order is to store Y first and then V U alternately each occupies 8 bits
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates that the storage order is to store Y first and then V U alternately each occupies 8 bits
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Indicates that the storage order is to store Y first and then V U alternately each occupies 8 bits
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        NV21 = 8,
        /**
         * Indicates that the storage order is to store Y first and then U V alternately each occupies 8 bits
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Indicates that the storage order is to store Y first and then U V alternately each occupies 8 bits
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates that the storage order is to store Y first and then U V alternately each occupies 8 bits
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Indicates that the storage order is to store Y first and then U V alternately each occupies 8 bits
         * and are stored from the higher-order to the lower-order bits.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        NV12 = 9
    }
    /**
     * Describes the size of an image.
     *
     * @typedef Size
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 6
     */
    /**
     * Describes the size of an image.
     *
     * @typedef Size
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Describes the size of an image.
     *
     * @typedef Size
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
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
    interface Size {
        /**
         * Height
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 6
         */
        /**
         * Height
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Height
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
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
         * @since 6
         */
        /**
         * Width
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Width
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
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
     * Enumerates exchangeable image file format (Exif) information types of an image.
     *
     * @enum { string }
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 7
     */
    /**
     * Enumerates exchangeable image file format (Exif) information types of an image.
     *
     * @enum { string }
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 10
     */
    enum PropertyKey {
        /**
         * Number of bits in each pixel of an image.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Number of bits in each pixel of an image.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        BITS_PER_SAMPLE = 'BitsPerSample',
        /**
         * Image rotation mode.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Image rotation mode.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        ORIENTATION = 'Orientation',
        /**
         * Image length.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Image length.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        IMAGE_LENGTH = 'ImageLength',
        /**
         * Image width.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Image width.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        IMAGE_WIDTH = 'ImageWidth',
        /**
         * GPS latitude.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * GPS latitude.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        GPS_LATITUDE = 'GPSLatitude',
        /**
         * GPS longitude.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * GPS longitude.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        GPS_LONGITUDE = 'GPSLongitude',
        /**
         * GPS latitude reference. For example, N indicates north latitude and S indicates south latitude.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * GPS latitude reference. For example, N indicates north latitude and S indicates south latitude.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        GPS_LATITUDE_REF = 'GPSLatitudeRef',
        /**
         * GPS longitude reference. For example, E indicates east longitude and W indicates west longitude.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * GPS longitude reference. For example, E indicates east longitude and W indicates west longitude.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        GPS_LONGITUDE_REF = 'GPSLongitudeRef',
        /**
         * Shooting time
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Shooting time
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        DATE_TIME_ORIGINAL = 'DateTimeOriginal',
        /**
         * Exposure time
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Exposure time
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        EXPOSURE_TIME = 'ExposureTime',
        /**
         * Scene type
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Scene type
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        SCENE_TYPE = 'SceneType',
        /**
         * ISO speedratings
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * ISO speedratings
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        ISO_SPEED_RATINGS = 'ISOSpeedRatings',
        /**
         * Aperture value
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Aperture value
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        F_NUMBER = 'FNumber',
        /**
         * Date time
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        DATE_TIME = 'DateTime',
        /**
         * GPS time stamp
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        GPS_TIME_STAMP = 'GPSTimeStamp',
        /**
         * GPS date stamp
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        GPS_DATE_STAMP = 'GPSDateStamp',
        /**
         * Image description
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        IMAGE_DESCRIPTION = 'ImageDescription',
        /**
         * Make
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        MAKE = 'Make',
        /**
         * Model
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        MODEL = 'Model',
        /**
         * Photo mode
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        PHOTO_MODE = 'PhotoMode',
        /**
         * Sensitivity type
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        SENSITIVITY_TYPE = 'SensitivityType',
        /**
         * Standard output sensitivity
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        STANDARD_OUTPUT_SENSITIVITY = 'StandardOutputSensitivity',
        /**
         * Recommended exposure index
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        RECOMMENDED_EXPOSURE_INDEX = 'RecommendedExposureIndex',
        /**
         * ISO speed
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        ISO_SPEED = 'ISOSpeedRatings',
        /**
         * Aperture value
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        APERTURE_VALUE = 'ApertureValue',
        /**
         * Exposure bias value
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        EXPOSURE_BIAS_VALUE = 'ExposureBiasValue',
        /**
         * Metering mode
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        METERING_MODE = 'MeteringMode',
        /**
         * Light source
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        LIGHT_SOURCE = 'LightSource',
        /**
         * Flash
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        FLASH = 'Flash',
        /**
         * Focal length
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        FOCAL_LENGTH = 'FocalLength',
        /**
         * User comment
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        USER_COMMENT = 'UserComment',
        /**
         * Pixel x dimension
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        PIXEL_X_DIMENSION = 'PixelXDimension',
        /**
         * Pixel y dimension
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        PIXEL_Y_DIMENSION = 'PixelYDimension',
        /**
         * White balance
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        WHITE_BALANCE = 'WhiteBalance',
        /**
         * Focal length in 35mm film
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        FOCAL_LENGTH_IN_35_MM_FILM = 'FocalLengthIn35mmFilm',
        /**
         * Capture mode
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        CAPTURE_MODE = 'HwMnoteCaptureMode',
        /**
         * Physical aperture
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        PHYSICAL_APERTURE = 'HwMnotePhysicalAperture',
        /**
         * Roll Angle
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 11
         */
        ROLL_ANGLE = 'HwMnoteRollAngle',
        /**
         * Pitch Angle
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 11
         */
        PITCH_ANGLE = 'HwMnotePitchAngle',
        /**
         * Capture Scene: Food
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 11
         */
        SCENE_FOOD_CONF = 'HwMnoteSceneFoodConf',
        /**
         * Capture Scene: Stage
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 11
         */
        SCENE_STAGE_CONF = 'HwMnoteSceneStageConf',
        /**
         * Capture Scene: Blue Sky
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 11
         */
        SCENE_BLUE_SKY_CONF = 'HwMnoteSceneBlueSkyConf',
        /**
         * Capture Scene: Green Plant
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 11
         */
        SCENE_GREEN_PLANT_CONF = 'HwMnoteSceneGreenPlantConf',
        /**
         * Capture Scene: Beach
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 11
         */
        SCENE_BEACH_CONF = 'HwMnoteSceneBeachConf',
        /**
         * Capture Scene: Snow
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 11
         */
        SCENE_SNOW_CONF = 'HwMnoteSceneSnowConf',
        /**
         * Capture Scene: Sunset
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 11
         */
        SCENE_SUNSET_CONF = 'HwMnoteSceneSunsetConf',
        /**
         * Capture Scene: Flowers
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 11
         */
        SCENE_FLOWERS_CONF = 'HwMnoteSceneFlowersConf',
        /**
         * Capture Scene: Night
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 11
         */
        SCENE_NIGHT_CONF = 'HwMnoteSceneNightConf',
        /**
         * Capture Scene: Text
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 11
         */
        SCENE_TEXT_CONF = 'HwMnoteSceneTextConf',
        /**
         * Face Count
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 11
         */
        FACE_COUNT = 'HwMnoteFaceCount',
        /**
         * Focus Mode
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 11
         */
        FOCUS_MODE = 'HwMnoteFocusMode',
        /**
         * The scheme used for image compression.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        COMPRESSION = 'Compression',
        /**
         * Pixel composition, such as RGB or YCbCr.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        PHOTOMETRIC_INTERPRETATION = 'PhotometricInterpretation',
        /**
         * For each strip, the byte offset of that strip.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        STRIP_OFFSETS = 'StripOffsets',
        /**
         * The number of components per pixel.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SAMPLES_PER_PIXEL = 'SamplesPerPixel',
        /**
         * The number of rows per strip of image data.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        ROWS_PER_STRIP = 'RowsPerStrip',
        /**
         * The total number of bytes in each strip of image data.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        STRIP_BYTE_COUNTS = 'StripByteCounts',
        /**
         * The image resolution in the width direction.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        X_RESOLUTION = 'XResolution',
        /**
         * The image resolution in the height direction.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        Y_RESOLUTION = 'YResolution',
        /**
         * Indicates whether pixel components are recorded in a chunky or planar format.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        PLANAR_CONFIGURATION = 'PlanarConfiguration',
        /**
         * The unit used to measure XResolution and YResolution.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        RESOLUTION_UNIT = 'ResolutionUnit',
        /**
         * The transfer function for the image, typically used for color correction.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        TRANSFER_FUNCTION = 'TransferFunction',
        /**
         * The name and version of the software used to generate the image.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SOFTWARE = 'Software',
        /**
         * The name of the person who created the image.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        ARTIST = 'Artist',
        /**
         * The chromaticity of the white point of the image.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        WHITE_POINT = 'WhitePoint',
        /**
         * The chromaticity of the primary colors of the image.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        PRIMARY_CHROMATICITIES = 'PrimaryChromaticities',
        /**
         * The matrix coefficients for transformation from RGB to YCbCr image data.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        YCBCR_COEFFICIENTS = 'YCbCrCoefficients',
        /**
         * The sampling ratio of chrominance components to the luminance component.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        YCBCR_SUB_SAMPLING = 'YCbCrSubSampling',
        /**
         * The position of chrominance components in relation to the luminance component.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        YCBCR_POSITIONING = 'YCbCrPositioning',
        /**
         * The reference black point value and reference white point value.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        REFERENCE_BLACK_WHITE = 'ReferenceBlackWhite',
        /**
         * Copyright information for the image.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        COPYRIGHT = 'Copyright',
        /**
         * The offset to the start byte (SOI) of JPEG compressed thumbnail data.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        JPEG_INTERCHANGE_FORMAT = 'JPEGInterchangeFormat',
        /**
         * The number of bytes of JPEG compressed thumbnail data.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        JPEG_INTERCHANGE_FORMAT_LENGTH = 'JPEGInterchangeFormatLength',
        /**
         * The class of the program used by the camera to set exposure when the picture is taken.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        EXPOSURE_PROGRAM = 'ExposureProgram',
        /**
         * Indicates the spectral sensitivity of each channel of the camera used.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SPECTRAL_SENSITIVITY = 'SpectralSensitivity',
        /**
         * Indicates the Opto-Electric Conversion Function (OECF) specified in ISO 14524.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        OECF = 'OECF',
        /**
         * The version of the Exif standard supported.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        EXIF_VERSION = 'ExifVersion',
        /**
         * The date and time when the image was stored as digital data.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        DATE_TIME_DIGITIZED = 'DateTimeDigitized',
        /**
         * Information specific to compressed data.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        COMPONENTS_CONFIGURATION = 'ComponentsConfiguration',
        /**
         * The shutter speed, expressed as an APEX (Additive System of Photographic Exposure) value.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SHUTTER_SPEED = 'ShutterSpeedValue',
        /**
         * The brightness value of the image, in APEX units.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        BRIGHTNESS_VALUE = 'BrightnessValue',
        /**
         * The smallest F number of lens.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        MAX_APERTURE_VALUE = 'MaxApertureValue',
        /**
         * The distance to the subject, measured in meters.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SUBJECT_DISTANCE = 'SubjectDistance',
        /**
         * This tag indicate the location and area of the main subject in the overall scene.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SUBJECT_AREA = 'SubjectArea',
        /**
         * A tag for manufacturers of Exif/DCF writers to record any desired information.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        MAKER_NOTE = 'MakerNote',
        /**
         * A tag for record fractions of seconds for the DateTime tag.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SUBSEC_TIME = 'SubsecTime',
        /**
         * A tag used to record fractions of seconds for the DateTimeOriginal tag.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SUBSEC_TIME_ORIGINAL = 'SubsecTimeOriginal',
        /**
         * A tag used to record fractions of seconds for the DateTimeDigitized tag.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SUBSEC_TIME_DIGITIZED = 'SubsecTimeDigitized',
        /**
         * This tag denotes the Flashpix format version supported by an FPXR file, enhancing device compatibility.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        FLASHPIX_VERSION = 'FlashpixVersion',
        /**
         * The color space information tag, often recorded as the color space specifier.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        COLOR_SPACE = 'ColorSpace',
        /**
         * The name of an audio file related to the image data.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        RELATED_SOUND_FILE = 'RelatedSoundFile',
        /**
         * Strobe energy at image capture, in BCPS.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        FLASH_ENERGY = 'FlashEnergy',
        /**
         * Camera or input device spatial frequency table.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SPATIAL_FREQUENCY_RESPONSE = 'SpatialFrequencyResponse',
        /**
         * Pixels per FocalPlaneResolutionUnit in the image width.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        FOCAL_PLANE_X_RESOLUTION = 'FocalPlaneXResolution',
        /**
         * Pixels per FocalPlaneResolutionUnit in the image height.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        FOCAL_PLANE_Y_RESOLUTION = 'FocalPlaneYResolution',
        /**
         * Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        FOCAL_PLANE_RESOLUTION_UNIT = 'FocalPlaneResolutionUnit',
        /**
         * Location of the main subject, relative to the left edge.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SUBJECT_LOCATION = 'SubjectLocation',
        /**
         * Selected exposure index at capture.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        EXPOSURE_INDEX = 'ExposureIndex',
        /**
         * Image sensor type on the camera.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SENSING_METHOD = 'SensingMethod',
        /**
         * Indicates the image source.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        FILE_SOURCE = 'FileSource',
        /**
         * Color filter array (CFA) geometric pattern of the image sensor.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        CFA_PATTERN = 'CFAPattern',
        /**
         * Indicates special processing on image data.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        CUSTOM_RENDERED = 'CustomRendered',
        /**
         * Exposure mode set when the image was shot.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        EXPOSURE_MODE = 'ExposureMode',
        /**
         * Digital zoom ratio at the time of capture.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        DIGITAL_ZOOM_RATIO = 'DigitalZoomRatio',
        /**
         * Type of scene captured.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SCENE_CAPTURE_TYPE = 'SceneCaptureType',
        /**
         * Degree of overall image gain adjustment.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GAIN_CONTROL = 'GainControl',
        /**
         * Direction of contrast processing applied by the camera.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        CONTRAST = 'Contrast',
        /**
         * Direction of saturation processing applied by the camera.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SATURATION = 'Saturation',
        /**
         * The direction of sharpness processing applied by the camera.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SHARPNESS = 'Sharpness',
        /**
         * Information on picture-taking conditions for a specific camera model.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        DEVICE_SETTING_DESCRIPTION = 'DeviceSettingDescription',
        /**
         * Indicates the distance range to the subject.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SUBJECT_DISTANCE_RANGE = 'SubjectDistanceRange',
        /**
         * An identifier uniquely assigned to each image.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        IMAGE_UNIQUE_ID = 'ImageUniqueID',
        /**
         * The version of the GPSInfoIFD.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_VERSION_ID = 'GPSVersionID',
        /**
         * Reference altitude used for GPS altitude.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_ALTITUDE_REF = 'GPSAltitudeRef',
        /**
         * The altitude based on the reference in GPSAltitudeRef.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_ALTITUDE = 'GPSAltitude',
        /**
         * The GPS satellites used for measurements.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_SATELLITES = 'GPSSatellites',
        /**
         * The status of the GPS receiver when the image is recorded.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_STATUS = 'GPSStatus',
        /**
         * The GPS measurement mode.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_MEASURE_MODE = 'GPSMeasureMode',
        /**
         * The GPS DOP (data degree of precision).
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_DOP = 'GPSDOP',
        /**
         * The unit used to express the GPS receiver speed of movement.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_SPEED_REF = 'GPSSpeedRef',
        /**
         * The speed of GPS receiver movement.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_SPEED = 'GPSSpeed',
        /**
         * The reference for giving the direction of GPS receiver movement.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_TRACK_REF = 'GPSTrackRef',
        /**
         * The direction of GPS receiver movement.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_TRACK = 'GPSTrack',
        /**
         * The reference for the image's direction.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_IMG_DIRECTION_REF = 'GPSImgDirectionRef',
        /**
         * The direction of the image when captured.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_IMG_DIRECTION = 'GPSImgDirection',
        /**
         * Geodetic survey data used by the GPS receiver.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_MAP_DATUM = 'GPSMapDatum',
        /**
         * Indicates the latitude reference of the destination point.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_DEST_LATITUDE_REF = 'GPSDestLatitudeRef',
        /**
         * The latitude of the destination point.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_DEST_LATITUDE = 'GPSDestLatitude',
        /**
         * Indicates the longitude reference of the destination point.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_DEST_LONGITUDE_REF = 'GPSDestLongitudeRef',
        /**
         * The longitude of the destination point.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_DEST_LONGITUDE = 'GPSDestLongitude',
        /**
         * The reference for the bearing to the destination point.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_DEST_BEARING_REF = 'GPSDestBearingRef',
        /**
         * The bearing to the destination point.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_DEST_BEARING = 'GPSDestBearing',
        /**
         * The measurement unit for the distance to the target point.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_DEST_DISTANCE_REF = 'GPSDestDistanceRef',
        /**
         * The distance to the destination point.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_DEST_DISTANCE = 'GPSDestDistance',
        /**
         * A character string recording the name of the method used for location finding.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_PROCESSING_METHOD = 'GPSProcessingMethod',
        /**
         * A character string recording the name of the GPS area.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_AREA_INFORMATION = 'GPSAreaInformation',
        /**
         * This field denotes if differential correction was applied to GPS data, crucial for precise location accuracy.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_DIFFERENTIAL = 'GPSDifferential',
        /**
         * The serial number of the camera body.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        BODY_SERIAL_NUMBER = 'BodySerialNumber',
        /**
         * The name of the camera owner.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        CAMERA_OWNER_NAME = 'CameraOwnerName',
        /**
         * Indicates whether the image is a composite image.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        COMPOSITE_IMAGE = 'CompositeImage',
        /**
         * The compression mode used for a compressed image, in unit bits per pixel.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        COMPRESSED_BITS_PER_PIXEL = 'CompressedBitsPerPixel',
        /**
         * The DNGVersion tag encodes the four-tier version number for DNG specification compliance.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        DNG_VERSION = 'DNGVersion',
        /**
         * DefaultCropSize specifies the final image size in raw coordinates, accounting for extra edge pixels.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        DEFAULT_CROP_SIZE = 'DefaultCropSize',
        /**
         * Indicates the value of coefficient gamma.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GAMMA = 'Gamma',
        /**
         * The tag indicate the ISO speed latitude yyy value of the camera or input device that is defined in ISO 12232.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        ISO_SPEED_LATITUDE_YYY = 'ISOSpeedLatitudeyyy',
        /**
         * The tag indicate the ISO speed latitude zzz value of the camera or input device that is defined in ISO 12232.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        ISO_SPEED_LATITUDE_ZZZ = 'ISOSpeedLatitudezzz',
        /**
         * The manufacturer of the lens.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        LENS_MAKE = 'LensMake',
        /**
         * The model name of the lens.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        LENS_MODEL = 'LensModel',
        /**
         * The serial number of the lens.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        LENS_SERIAL_NUMBER = 'LensSerialNumber',
        /**
         * Specifications of the lens used.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        LENS_SPECIFICATION = 'LensSpecification',
        /**
         * This tag provides a broad description of the data type in this subfile.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        NEW_SUBFILE_TYPE = 'NewSubfileType',
        /**
         * This tag records the UTC offset for the DateTime tag, ensuring accurate timestamps regardless of location.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        OFFSET_TIME = 'OffsetTime',
        /**
         * This tag records the UTC offset when the image was digitized, aiding in accurate timestamp adjustment.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        OFFSET_TIME_DIGITIZED = 'OffsetTimeDigitized',
        /**
         * This tag records the UTC offset when the original image was created, crucial for time-sensitive applications.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        OFFSET_TIME_ORIGINAL = 'OffsetTimeOriginal',
        /**
         * Exposure times of source images for a composite image.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SOURCE_EXPOSURE_TIMES_OF_COMPOSITE_IMAGE = 'SourceExposureTimesOfCompositeImage',
        /**
         * The number of source images used for a composite image.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SOURCE_IMAGE_NUMBER_OF_COMPOSITE_IMAGE = 'SourceImageNumberOfCompositeImage',
        /**
         * This deprecated tag indicates the data type in this subfile. Use NewSubfileType instead.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SUBFILE_TYPE = 'SubfileType',
        /**
         * This tag indicates horizontal positioning errors in meters.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GPS_H_POSITIONING_ERROR = 'GPSHPositioningError',
        /**
         * This tag indicates the sensitivity of the camera or input device when the image was shot.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        PHOTOGRAPHIC_SENSITIVITY = 'PhotographicSensitivity',
        /**
         * Burst Number
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        BURST_NUMBER = 'HwMnoteBurstNumber',
        /**
         * Face Conf
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        FACE_CONF = 'HwMnoteFaceConf',
        /**
         * Face Leye Center
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        FACE_LEYE_CENTER = 'HwMnoteFaceLeyeCenter',
        /**
         * Face Mouth Center
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        FACE_MOUTH_CENTER = 'HwMnoteFaceMouthCenter',
        /**
         * Face Pointer
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        FACE_POINTER = 'HwMnoteFacePointer',
        /**
         * Face Rect
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        FACE_RECT = 'HwMnoteFaceRect',
        /**
         * Face Reye Center
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        FACE_REYE_CENTER = 'HwMnoteFaceReyeCenter',
        /**
         * Face Smile Score
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        FACE_SMILE_SCORE = 'HwMnoteFaceSmileScore',
        /**
         * Face Version
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        FACE_VERSION = 'HwMnoteFaceVersion',
        /**
         * Front Camera
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        FRONT_CAMERA = 'HwMnoteFrontCamera',
        /**
         * Scene Pointer
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SCENE_POINTER = 'HwMnoteScenePointer',
        /**
         * Scene Version
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        SCENE_VERSION = 'HwMnoteSceneVersion',
        /**
         * GIF LOOP COUNT
         * If infinite loop returns 0, other values represent the number of loops
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        GIF_LOOP_COUNT = 'GIFLoopCount'
    }
    /**
     * Enum for image formats.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 9
     */
    enum ImageFormat {
        /**
         * YCBCR422 semi-planar format.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        YCBCR_422_SP = 1000,
        /**
         * JPEG encoding format.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        JPEG = 2000
    }
    /**
     * Enumerates alpha types.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 9
     */
    /**
     * Enumerates alpha types.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Enumerates alpha types.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Enumerates alpha types.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    enum AlphaType {
        /**
         * Indicates an unknown alpha type.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Indicates an unknown alpha type.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates an unknown alpha type.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Indicates an unknown alpha type.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        UNKNOWN = 0,
        /**
         * Indicates that the image has no alpha channel, or all pixels in the image are fully opaque.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Indicates that the image has no alpha channel, or all pixels in the image are fully opaque.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates that the image has no alpha channel, or all pixels in the image are fully opaque.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Indicates that the image has no alpha channel, or all pixels in the image are fully opaque.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        OPAQUE = 1,
        /**
         * Indicates that RGB components of each pixel in the image are premultiplied by alpha.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Indicates that RGB components of each pixel in the image are premultiplied by alpha.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates that RGB components of each pixel in the image are premultiplied by alpha.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Indicates that RGB components of each pixel in the image are premultiplied by alpha.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        PREMUL = 2,
        /**
         * Indicates that RGB components of each pixel in the image are independent of alpha and are not premultiplied by alpha.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Indicates that RGB components of each pixel in the image are independent of alpha and are not premultiplied by alpha.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates that RGB components of each pixel in the image are independent of alpha and are not premultiplied by alpha.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Indicates that RGB components of each pixel in the image are independent of alpha and are not premultiplied by alpha.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        UNPREMUL = 3
    }
    /**
     * Enumerates decoding dynamic range.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 12
     */
    enum DecodingDynamicRange {
        /**
         * Decoding according to the content of the image.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 12
         */
        AUTO = 0,
        /**
         * Decoding to standard dynamic range.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 12
         */
        SDR = 1,
        /**
         * Decoding to high dynamic range.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 12
         */
        HDR = 2
    }
    /**
     * Enumerates packing dynamic range.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 12
     */
    enum PackingDynamicRange {
        /**
         * Packing according to the content of the image.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 12
         */
        AUTO = 0,
        /**
         * Packing to standard dynamic range.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 12
         */
        SDR = 1
    }
    /**
     * Enum for image scale mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 9
     */
    /**
     * Enum for image scale mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Enum for image scale mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Enum for image scale mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    enum ScaleMode {
        /**
         * Indicates the effect that fits the image into the target size.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Indicates the effect that fits the image into the target size.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates the effect that fits the image into the target size.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Indicates the effect that fits the image into the target size.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        FIT_TARGET_SIZE = 0,
        /**
         * Indicates the effect that scales an image to fill the target image area and center-crops the part outside the area.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Indicates the effect that scales an image to fill the target image area and center-crops the part outside the area.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates the effect that scales an image to fill the target image area and center-crops the part outside the area.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Indicates the effect that scales an image to fill the target image area and center-crops the part outside the area.
         *
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        CENTER_CROP = 1
    }
    /**
     * The component type of image.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Image.ImageReceiver
     * @since 9
     */
    enum ComponentType {
        /**
         * Luma info.
         *
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 9
         */
        YUV_Y = 1,
        /**
         * Chrominance info.
         *
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 9
         */
        YUV_U = 2,
        /**
         * Chroma info.
         *
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 9
         */
        YUV_V = 3,
        /**
         * Jpeg type.
         *
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 9
         */
        JPEG = 4
    }
    /**
     * Describes region information.
     *
     * @typedef Region
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 8
     */
    /**
     * Describes region information.
     *
     * @typedef Region
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Describes region information.
     *
     * @typedef Region
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
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
    interface Region {
        /**
         * Image size.
         *
         * @type { Size }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Image size.
         *
         * @type { Size }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Image size.
         *
         * @type { Size }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
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
         * @since 7
         */
        /**
         * x-coordinate at the upper left corner of the image.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * x-coordinate at the upper left corner of the image.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
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
         * @since 7
         */
        /**
         * y-coordinate at the upper left corner of the image.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * y-coordinate at the upper left corner of the image.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
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
     * Describes area information in an image.
     *
     * @typedef PositionArea
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 7
     */
    /**
     * Describes area information in an image.
     *
     * @typedef PositionArea
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Describes area information in an image.
     *
     * @typedef PositionArea
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Describes area information in an image.
     *
     * @typedef PositionArea
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    interface PositionArea {
        /**
         * Image data that will be read or written.
         *
         * @type { ArrayBuffer }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Image data that will be read or written.
         *
         * @type { ArrayBuffer }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Image data that will be read or written.
         *
         * @type { ArrayBuffer }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Image data that will be read or written.
         *
         * @type { ArrayBuffer }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        pixels: ArrayBuffer;
        /**
         * Offset for data reading.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Offset for data reading.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Offset for data reading.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Offset for data reading.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        offset: number;
        /**
         * Number of bytes to read.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Number of bytes to read.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Number of bytes to read.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Number of bytes to read.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        stride: number;
        /**
         * Region to read.
         *
         * @type { Region }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Region to read.
         *
         * @type { Region }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Region to read.
         *
         * @type { Region }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Region to read.
         *
         * @type { Region }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        region: Region;
    }
    /**
     * Describes image information.
     *
     * @typedef ImageInfo
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 6
     */
    /**
     * Describes image information.
     *
     * @typedef ImageInfo
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Describes image information.
     *
     * @typedef ImageInfo
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Describes image information.
     *
     * @typedef ImageInfo
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    interface ImageInfo {
        /**
         * Indicates image dimensions specified by a {@link Size} interface.
         *
         * @type { Size }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 6
         */
        /**
         * Indicates image dimensions specified by a {@link Size} interface.
         *
         * @type { Size }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates image dimensions specified by a {@link Size} interface.
         *
         * @type { Size }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Indicates image dimensions specified by a {@link Size} interface.
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
         * Indicates image default density.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Indicates image default density.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates image default density.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Indicates image default density.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        density: number;
        /**
         * The number of byte per row.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @atomicservice
         * @since 11
         */
        /**
         * The number of byte per row.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @form
         * @atomicservice
         * @since 12
         */
        stride: number;
        /**
         * Indicates image format.
         *
         * @type { PixelMapFormat }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        pixelFormat: PixelMapFormat;
        /**
         * Indicates image alpha type.
         *
         * @type { AlphaType }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        alphaType: AlphaType;
        /**
         * Indicates image mime type.
         *
         * @type { string }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 12
         */
        mimeType: string;
        /**
         * Indicates whether the image high dynamic range
         *
         * @type { boolean }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 12
         */
        isHdr: boolean;
    }
    /**
     * Describes the option for image packing.
     *
     * @typedef PackingOption
     * @syscap SystemCapability.Multimedia.Image.ImagePacker
     * @since 6
     */
    /**
     * Describes the option for image packing.
     *
     * @typedef PackingOption
     * @syscap SystemCapability.Multimedia.Image.ImagePacker
     * @crossplatform
     * @since 10
     */
    /**
     * Describes the option for image packing.
     *
     * @typedef PackingOption
     * @syscap SystemCapability.Multimedia.Image.ImagePacker
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    interface PackingOption {
        /**
         * Multipurpose Internet Mail Extensions (MIME) format of the target image, for example, image/jpeg.
         *
         * @type { string }
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @since 6
         */
        /**
         * Multipurpose Internet Mail Extensions (MIME) format of the target image, for example, image/jpeg.
         *
         * @type { string }
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @since 10
         */
        /**
         * Multipurpose Internet Mail Extensions (MIME) format of the target image, for example, image/jpeg.
         *
         * @type { string }
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        format: string;
        /**
         * Quality of the target image. The value is an integer ranging from 0 to 100. A larger value indicates better.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @since 6
         */
        /**
         * Quality of the target image. The value is an integer ranging from 0 to 100. A larger value indicates better.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @since 10
         */
        /**
         * Quality of the target image. The value is an integer ranging from 0 to 100. A larger value indicates better.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        quality: number;
        /**
         * BufferSize of the target image.
         * If this bufferSize is less than or equal to 0, it will be converted to 10MB.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @since 9
         */
        /**
         * BufferSize of the target image.
         * If this bufferSize is less than or equal to 0, it will be converted to 10MB.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @since 10
         */
        /**
         * BufferSize of the target image.
         * If this bufferSize is less than or equal to 0, it will be converted to 10MB.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        bufferSize?: number;
        /**
         * The desired dynamic range of the target image.
         *
         * @type { ?PackingDynamicRange }
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @since 12
         */
        desiredDynamicRange?: PackingDynamicRange;
        /**
         * Whether the image properties can be saved, like Exif.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @since 12
         */
        needsPackProperties?: boolean;
    }
    /**
     * Describes image properties.
     *
     * @typedef GetImagePropertyOptions
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @since 7
     * @deprecated since 11
     * @useinstead image.ImagePropertyOptions
     */
    /**
     * Describes image properties.
     *
     * @typedef GetImagePropertyOptions
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @since 10
     * @deprecated since 11
     * @useinstead image.ImagePropertyOptions
     */
    interface GetImagePropertyOptions {
        /**
         * Index of an image.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 7
         * @deprecated since 11
         * @useinstead image.ImagePropertyOptions#index
         */
        /**
         * Index of an image.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         * @deprecated since 11
         * @useinstead image.ImagePropertyOptions#index
         */
        index?: number;
        /**
         * Default property value.
         *
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 7
         * @deprecated since 11
         * @useinstead image.ImagePropertyOptions#defaultValue
         */
        /**
         * Default property value.
         *
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         * @deprecated since 11
         * @useinstead image.ImagePropertyOptions#defaultValue
         */
        defaultValue?: string;
    }
    /**
     * Describes image properties.
     *
     * @typedef ImagePropertyOptions
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @since 11
     */
    interface ImagePropertyOptions {
        /**
         * Index of an image.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 11
         */
        index?: number;
        /**
         * Default property value.
         *
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 11
         */
        defaultValue?: string;
    }
    /**
     * Describes image decoding parameters.
     *
     * @typedef DecodingOptions
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @since 7
     */
    /**
     * Describes image decoding parameters.
     *
     * @typedef DecodingOptions
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @since 10
     */
    /**
     * Describes image decoding parameters.
     *
     * @typedef DecodingOptions
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Describes image decoding parameters.
     *
     * @typedef DecodingOptions
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    interface DecodingOptions {
        /**
         * Number of image frames.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 7
         */
        /**
         * Number of image frames.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        /**
         * Number of image frames.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Number of image frames.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        index?: number;
        /**
         * Sampling ratio of the image pixel map.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 7
         */
        /**
         * Sampling ratio of the image pixel map.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        /**
         * Sampling ratio of the image pixel map.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Sampling ratio of the image pixel map.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        sampleSize?: number;
        /**
         * Rotation angle of the image pixel map. The value ranges from 0 to 360.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 7
         */
        /**
         * Rotation angle of the image pixel map. The value ranges from 0 to 360.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        /**
         * Rotation angle of the image pixel map. The value ranges from 0 to 360.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Rotation angle of the image pixel map. The value ranges from 0 to 360.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        rotate?: number;
        /**
         * Whether the image pixel map is editable.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 7
         */
        /**
         * Whether the image pixel map is editable.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        /**
         * Whether the image pixel map is editable.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Whether the image pixel map is editable.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        editable?: boolean;
        /**
         * Width and height of the image pixel map. The value (0, 0) indicates that the pixels are decoded
         * based on the original image size.
         *
         * @type { ?Size }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 7
         */
        /**
         * Width and height of the image pixel map. The value (0, 0) indicates that the pixels are decoded
         * based on the original image size.
         *
         * @type { ?Size }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        /**
         * Width and height of the image pixel map. The value (0, 0) indicates that the pixels are decoded
         * based on the original image size.
         *
         * @type { ?Size }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Width and height of the image pixel map. The value (0, 0) indicates that the pixels are decoded
         * based on the original image size.
         *
         * @type { ?Size }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        desiredSize?: Size;
        /**
         * Cropping region of the image pixel map.
         *
         * @type { ?Region }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 7
         */
        /**
         * Cropping region of the image pixel map.
         *
         * @type { ?Region }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        /**
         * Cropping region of the image pixel map.
         *
         * @type { ?Region }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Cropping region of the image pixel map.
         *
         * @type { ?Region }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        desiredRegion?: Region;
        /**
         * Data format of the image pixel map.
         *
         * @type { ?PixelMapFormat }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 7
         */
        /**
         * Data format of the image pixel map.
         *
         * @type { ?PixelMapFormat }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        /**
         * Data format of the image pixel map.
         *
         * @type { ?PixelMapFormat }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Data format of the image pixel map.
         *
         * @type { ?PixelMapFormat }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        desiredPixelFormat?: PixelMapFormat;
        /**
         * The density for image pixel map.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 9
         */
        /**
         * The density for image pixel map.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        /**
         * The density for image pixel map.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * The density for image pixel map.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        fitDensity?: number;
        /**
         * Color space of the image pixel map.
         *
         * @type { ?colorSpaceManager.ColorSpaceManager }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 11
         */
        desiredColorSpace?: colorSpaceManager.ColorSpaceManager;
        /**
         * The desired dynamic range of the image pixelmap.
         *
         * @type { ?DecodingDynamicRange }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 12
         */
        desiredDynamicRange?: DecodingDynamicRange;
    }
    /**
     * Describes image color components.
     *
     * @typedef Component
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 9
     */
    interface Component {
        /**
         * Component type.
         *
         * @type { ComponentType }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        readonly componentType: ComponentType;
        /**
         * Row stride.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        readonly rowStride: number;
        /**
         * Pixel stride.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        readonly pixelStride: number;
        /**
         * Component buffer.
         *
         * @type { ArrayBuffer }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        readonly byteBuffer: ArrayBuffer;
    }
    /**
     * Initialization options for pixelmap.
     *
     * @typedef InitializationOptions
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 8
     */
    /**
     * Initialization options for pixelmap.
     *
     * @typedef InitializationOptions
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Initialization options for pixelmap.
     *
     * @typedef InitializationOptions
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Initialization options for pixelmap.
     *
     * @typedef InitializationOptions
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    interface InitializationOptions {
        /**
         * PixelMap size.
         *
         * @type { Size }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 8
         */
        /**
         * PixelMap size.
         *
         * @type { Size }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * PixelMap size.
         *
         * @type { Size }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * PixelMap size.
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
         * PixelMap source format.
         *
         * @type { ?PixelMapFormat }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 12
         */
        srcPixelFormat?: PixelMapFormat;
        /**
         * PixelMap expected format.
         *
         * @type { ?PixelMapFormat }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 8
         */
        /**
         * PixelMap expected format.
         *
         * @type { ?PixelMapFormat }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * PixelMap expected format.
         *
         * @type { ?PixelMapFormat }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * PixelMap expected format.
         *
         * @type { ?PixelMapFormat }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        pixelFormat?: PixelMapFormat;
        /**
         * Editable or not.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 8
         */
        /**
         * Editable or not.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Editable or not.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Editable or not.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        editable?: boolean;
        /**
         * PixelMap expected alpha type.
         *
         * @type { ?AlphaType }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * PixelMap expected alpha type.
         *
         * @type { ?AlphaType }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * PixelMap expected alpha type.
         *
         * @type { ?AlphaType }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * PixelMap expected alpha type.
         *
         * @type { ?AlphaType }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        alphaType?: AlphaType;
        /**
         * PixelMap expected scaling effect.
         *
         * @type { ?ScaleMode }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * PixelMap expected scaling effect.
         *
         * @type { ?ScaleMode }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * PixelMap expected scaling effect.
         *
         * @type { ?ScaleMode }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * PixelMap expected scaling effect.
         *
         * @type { ?ScaleMode }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        scaleMode?: ScaleMode;
    }
    /**
     * Initialization options for ImageSource.
     *
     * @typedef SourceOptions
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 9
     */
    /**
     * Initialization options for ImageSource.
     *
     * @typedef SourceOptions
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Initialization options for ImageSource.
     *
     * @typedef SourceOptions
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Initialization options for ImageSource.
     *
     * @typedef SourceOptions
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    interface SourceOptions {
        /**
         * The density for ImageSource.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * The density for ImageSource.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * The density for ImageSource.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * The density for ImageSource.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        sourceDensity: number;
        /**
         * PixelMap expected format.
         *
         * @type { ?PixelMapFormat }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * PixelMap expected format.
         *
         * @type { ?PixelMapFormat }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * PixelMap expected format.
         *
         * @type { ?PixelMapFormat }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * PixelMap expected format.
         *
         * @type { ?PixelMapFormat }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        sourcePixelFormat?: PixelMapFormat;
        /**
         * PixelMap size.
         *
         * @type { ?Size }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * PixelMap size.
         *
         * @type { ?Size }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * PixelMap size.
         *
         * @type { ?Size }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * PixelMap size.
         *
         * @type { ?Size }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        sourceSize?: Size;
    }
    /**
     * Create pixelmap by data buffer.
     *
     * @param { ArrayBuffer } colors The image color buffer.
     * @param { InitializationOptions } options Initialization options for pixelmap.
     * @param { AsyncCallback<PixelMap> } callback Callback used to return the PixelMap object.
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 8
     */
    /**
     * Create pixelmap by data buffer.
     *
     * @param { ArrayBuffer } colors The image color buffer.
     * @param { InitializationOptions } options Initialization options for pixelmap.
     * @param { AsyncCallback<PixelMap> } callback Callback used to return the PixelMap object.
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 10
     */
    function createPixelMap(colors: ArrayBuffer, options: InitializationOptions, callback: AsyncCallback<PixelMap>): void;
    /**
     * Create pixelmap by data buffer.
     *
     * @param { ArrayBuffer } colors The image color buffer.
     * @param { InitializationOptions } options Initialization options for pixelmap.
     * @returns { Promise<PixelMap> } A Promise instance used to return the PixelMap object.
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 8
     */
    /**
     * Create pixelmap by data buffer.
     *
     * @param { ArrayBuffer } colors The image color buffer.
     * @param { InitializationOptions } options Initialization options for pixelmap.
     * @returns { Promise<PixelMap> } A Promise instance used to return the PixelMap object.
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 10
     */
    function createPixelMap(colors: ArrayBuffer, options: InitializationOptions): Promise<PixelMap>;
    /**
     * Create pixelmap by data buffer.
     *
     * @param { ArrayBuffer } colors The image color buffer.
     * @param { InitializationOptions } options Initialization options for pixelmap.
     * @returns { PixelMap } Returns the instance if the operation is successful;Otherwise, return undefined.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * 2.Incorrect parameter types. 3.Parameter verification failed.
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 12
     */
    function createPixelMapSync(colors: ArrayBuffer, options: InitializationOptions): PixelMap;
    /**
     * Create an empty pixelmap.
     *
     * @param { InitializationOptions } options Initialization options for pixelmap.
     * @returns { PixelMap } Returns the instance if the operation is successful;Otherwise, return undefined.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * 2.Incorrect parameter types. 3.Parameter verification failed.
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 12
     */
    function createPixelMapSync(options: InitializationOptions): PixelMap;
    /**
     * Transforms pixelmap from unpremultiplied alpha format to premultiplied alpha format.
     *
     * @param { PixelMap } src The source pixelmap.
     * @param { PixelMap } dst The destination pixelmap.
     * @param { AsyncCallback<void> } callback Callback used to return the operation result.
     * If the operation fails, an error message is returned.
     * @throws { BusinessError } 62980103 - The image data is not supported.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * 2.Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 62980246 - Failed to read the pixelMap.
     * @throws { BusinessError } 62980248 - Pixelmap not allow modify.
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 12
     */
    function createPremultipliedPixelMap(src: PixelMap, dst: PixelMap, callback: AsyncCallback<void>): void;
    /**
     * Transforms pixelmap from premultiplied alpha format to unpremultiplied alpha format.
     *
     * @param { PixelMap } src The source pixelMap.
     * @param { PixelMap } dst The destination pixelmap.
     * @returns { Promise<void> } A Promise instance used to return the operation result.
     * If the operation fails, an error message is returned.
     * @throws { BusinessError } 62980103 - The image data is not supported.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * 2.Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 62980246 - Failed to read the pixelMap.
     * @throws { BusinessError } 62980248 - Pixelmap not allow modify.
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 12
     */
    function createPremultipliedPixelMap(src: PixelMap, dst: PixelMap): Promise<void>;
    /**
     * Transforms pixelmap from premultiplied alpha format to unpremultiplied alpha format.
     *
     * @param { PixelMap } src The source pixelmap.
     * @param { PixelMap } dst The destination pixelmap.
     * @param { AsyncCallback<void> } callback Callback used to return the operation result.
     * If the operation fails, an error message is returned.
     * @throws { BusinessError } 62980103 - The image data is not supported.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * 2.Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 62980246 - Failed to read the pixelMap.
     * @throws { BusinessError } 62980248 - Pixelmap not allow modify.
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 12
     */
    function createUnpremultipliedPixelMap(src: PixelMap, dst: PixelMap, callback: AsyncCallback<void>): void;
    /**
     * Transforms pixelmap from premultiplied alpha format to unpremultiplied alpha format.
     *
     * @param { PixelMap } src The source pixelmap.
     * @param { PixelMap } dst The destination pixelmap.
     * @returns { Promise<void> } A Promise instance used to return the operation result.
     * If the operation fails, an error message is returned.
     * @throws { BusinessError } 62980103 - The image data is not supported.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     * 2.Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 62980246 - Failed to read the pixelMap.
     * @throws { BusinessError } 62980248 - Pixelmap not allow modify.
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 12
     */
    function createUnpremultipliedPixelMap(src: PixelMap, dst: PixelMap): Promise<void>;
    /**
     * Creates a PixelMap object based on MessageSequence parameter.
     *
     * @param { rpc.MessageSequence } sequence - rpc.MessageSequence parameter.
     * @returns { PixelMap } Returns the instance if the operation is successful;Otherwise, an exception will be thrown.
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
     * @since 11
     */
    function createPixelMapFromParcel(sequence: rpc.MessageSequence): PixelMap;
    /**
     * Creates a PixelMap object from surface id.
     *
     * @param { string } surfaceId - surface id.
     * @param { Region } region - The region to surface.
     * @returns { Promise<PixelMap> } Returns the instance if the operation is successful;Otherwise, an exception will be thrown.
     * @throws { BusinessError } 62980115 - If the image parameter invalid.
     * @throws { BusinessError } 62980105 - Failed to get the data.
     * @throws { BusinessError } 62980178 - Failed to create the PixelMap.
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 11
     */
    function createPixelMapFromSurface(surfaceId: string, region: Region): Promise<PixelMap>;
    /**
     * Creates a PixelMap object from surface id.
     *
     * @param { string } surfaceId - surface id.
     * @param { Region } region - The region to surface.
     * @returns { PixelMap } Returns the instance if the operation is successful;Otherwise, an exception will be thrown.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
     *     2.Incorrect parameter types. 3.Parameter verification failed.
     * @throws { BusinessError } 62980105 - Failed to get the data.
     * @throws { BusinessError } 62980178 - Failed to create the PixelMap.
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 12
     */
    function createPixelMapFromSurfaceSync(surfaceId: string, region: Region): PixelMap;
    /**
     * Creates an ImageSource instance based on the URI.
     *
     * @param { string } uri Image source URI.
     * @returns { ImageSource } returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @since 6
     */
    /**
     * Creates an ImageSource instance based on the URI.
     *
     * @param { string } uri Image source URI.
     * @returns { ImageSource } returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @since 10
     */
    /**
     * Creates an ImageSource instance based on the URI.
     *
     * @param { string } uri Image source URI.
     * @returns { ImageSource } returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function createImageSource(uri: string): ImageSource;
    /**
     * Creates an ImageSource instance based on the URI.
     *
     * @param { string } uri Image source URI.
     * @param { SourceOptions } options The config of Image source.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @since 9
     */
    /**
     * Creates an ImageSource instance based on the URI.
     *
     * @param { string } uri Image source URI.
     * @param { SourceOptions } options The config of Image source.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @since 10
     */
    /**
     * Creates an ImageSource instance based on the URI.
     *
     * @param { string } uri Image source URI.
     * @param { SourceOptions } options The config of Image source.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Creates an ImageSource instance based on the URI.
     *
     * @param { string } uri Image source URI.
     * @param { SourceOptions } options The config of Image source.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    function createImageSource(uri: string, options: SourceOptions): ImageSource;
    /**
     * Creates an ImageSource instance based on the file descriptor.
     *
     * @param { number } fd ID of a file descriptor.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @since 7
     */
    /**
     * Creates an ImageSource instance based on the file descriptor.
     *
     * @param { number } fd ID of a file descriptor.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @since 10
     */
    /**
     * Creates an ImageSource instance based on the file descriptor.
     *
     * @param { number } fd ID of a file descriptor.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function createImageSource(fd: number): ImageSource;
    /**
     * Creates an ImageSource instance based on the file descriptor.
     *
     * @param { number } fd ID of a file descriptor.
     * @param { SourceOptions } options The config of Image source.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @since 9
     */
    /**
     * Creates an ImageSource instance based on the file descriptor.
     *
     * @param { number } fd ID of a file descriptor.
     * @param { SourceOptions } options The config of Image source.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @since 10
     */
    /**
     * Creates an ImageSource instance based on the file descriptor.
     *
     * @param { number } fd ID of a file descriptor.
     * @param { SourceOptions } options The config of Image source.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Creates an ImageSource instance based on the file descriptor.
     *
     * @param { number } fd ID of a file descriptor.
     * @param { SourceOptions } options The config of Image source.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    function createImageSource(fd: number, options: SourceOptions): ImageSource;
    /**
     * Creates an ImageSource instance based on the buffer.
     *
     * @param { ArrayBuffer } buf The buffer of the image.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @since 9
     */
    /**
     * Creates an ImageSource instance based on the buffer.
     *
     * @param { ArrayBuffer } buf The buffer of the image.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @since 10
     */
    /**
     * Creates an ImageSource instance based on the buffer.
     *
     * @param { ArrayBuffer } buf The buffer of the image.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @atomicservice
     * @since 11
     */
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
     * Creates an ImageSource instance based on the buffer.
     *
     * @param { ArrayBuffer } buf The buffer of the image.
     * @param { SourceOptions } options The config of Image source.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @since 9
     */
    /**
     * Creates an ImageSource instance based on the buffer.
     *
     * @param { ArrayBuffer } buf The buffer of the image.
     * @param { SourceOptions } options The config of Image source.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @since 10
     */
    /**
     * Creates an ImageSource instance based on the buffer.
     *
     * @param { ArrayBuffer } buf The buffer of the image.
     * @param { SourceOptions } options The config of Image source.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Creates an ImageSource instance based on the buffer.
     *
     * @param { ArrayBuffer } buf The buffer of the image.
     * @param { SourceOptions } options The config of Image source.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    function createImageSource(buf: ArrayBuffer, options: SourceOptions): ImageSource;
    /**
     * Creates an ImageSource instance based on the raw file descriptor.
     *
     * @param { resourceManager.RawFileDescriptor } rawfile The raw file descriptor of the image.
     * @param { SourceOptions } options The config of Image source.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function createImageSource(rawfile: resourceManager.RawFileDescriptor, options?: SourceOptions): ImageSource;
    /**
     * Creates an ImageSource instance based on the buffer in incremental.
     *
     * @param { ArrayBuffer } buf The buffer of the image.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @since 9
     */
    /**
     * Creates an ImageSource instance based on the buffer in incremental.
     *
     * @param { ArrayBuffer } buf The buffer of the image.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @since 10
     */
    function CreateIncrementalSource(buf: ArrayBuffer): ImageSource;
    /**
     * Creates an ImageSource instance based on the buffer in incremental.
     *
     * @param { ArrayBuffer } buf The buffer of the image.
     * @param { SourceOptions } options The config of source.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @since 9
     */
    /**
     * Creates an ImageSource instance based on the buffer in incremental.
     *
     * @param { ArrayBuffer } buf The buffer of the image.
     * @param { SourceOptions } options The config of source.
     * @returns { ImageSource } Returns the ImageSource instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @since 10
     */
    function CreateIncrementalSource(buf: ArrayBuffer, options?: SourceOptions): ImageSource;
    /**
     * Creates an ImagePacker instance.
     *
     * @returns { ImagePacker } Returns the ImagePacker instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImagePacker
     * @since 6
     */
    /**
     * Creates an ImagePacker instance.
     *
     * @returns { ImagePacker } Returns the ImagePacker instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImagePacker
     * @crossplatform
     * @since 10
     */
    /**
     * Creates an ImagePacker instance.
     *
     * @returns { ImagePacker } Returns the ImagePacker instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImagePacker
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function createImagePacker(): ImagePacker;
    /**
     * Creates an ImageReceiver instance.
     *
     * @param { number } width The default width in pixels of the Images that this receiver will produce.
     * @param { number } height The default height in pixels of the Images that this receiver will produce.
     * @param { number } format The format of the Image that this receiver will produce. This must be one of the
     *            {@link ImageFormat} constants.
     * @param { number } capacity The maximum number of images the user will want to access simultaneously.
     * @returns { ImageReceiver } Returns the ImageReceiver instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageReceiver
     * @since 9
     * @deprecated since 11
     * @useinstead image#createImageReceiver
     */
    function createImageReceiver(width: number, height: number, format: number, capacity: number): ImageReceiver;
    /**
     * Creates an ImageReceiver instance.
     *
     * @param { Size } size - The default {@link Size} in pixels of the Images that this receiver will produce.
     * @param { ImageFormat } format - The format of the Image that this receiver will produce. This must be one of the
     *            {@link ImageFormat} constants.
     * @param { number } capacity - The maximum number of images the user will want to access simultaneously.
     * @returns { ImageReceiver } Returns the ImageReceiver instance if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 401 - Parameter error.Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types;
     * @syscap SystemCapability.Multimedia.Image.ImageReceiver
     * @since 11
     */
    function createImageReceiver(size: Size, format: ImageFormat, capacity: number): ImageReceiver;
    /**
     * Creates an ImageCreator instance.
     *
     * @param { number } width The default width in pixels of the Images that this creator will produce.
     * @param { number } height The default height in pixels of the Images that this creator will produce.
     * @param { number } format The format of the Image that this creator will produce. This must be one of the
     *            {@link ImageFormat} constants.
     * @param { number } capacity The maximum number of images the user will want to access simultaneously.
     * @returns { ImageCreator } Returns the ImageCreator instance if the operation is successful; returns null otherwise.
     * @syscap SystemCapability.Multimedia.Image.ImageCreator
     * @since 9
     * @deprecated since 11
     * @useinstead image#createImageCreator
     */
    function createImageCreator(width: number, height: number, format: number, capacity: number): ImageCreator;
    /**
     * Creates an ImageCreator instance.
     *
     * @param { Size } size - The default {@link Size} in pixels of the Images that this creator will produce.
     * @param { ImageFormat } format - The format of the Image that this creator will produce. This must be one of the
     *            {@link ImageFormat} constants.
     * @param { number } capacity - The maximum number of images the user will want to access simultaneously.
     * @returns { ImageCreator } Returns the ImageCreator instance if the operation is successful; returns null otherwise.
     * @throws { BusinessError } 401 - Parameter error.Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types;
     * @syscap SystemCapability.Multimedia.Image.ImageCreator
     * @since 11
     */
    function createImageCreator(size: Size, format: ImageFormat, capacity: number): ImageCreator;
    /**
     * PixelMap instance.
     *
     * @typedef PixelMap
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 7
     */
    /**
     * PixelMap instance.
     *
     * @typedef PixelMap
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @since 10
     */
    /**
     * PixelMap instance.
     *
     * @typedef PixelMap
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * PixelMap instance.
     *
     * @typedef PixelMap
     * @syscap SystemCapability.Multimedia.Image.Core
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    interface PixelMap {
        /**
         * Whether the image pixel map can be edited.
         *
         * @type { boolean }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Whether the image pixel map can be edited.
         *
         * @type { boolean }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Whether the image pixel map can be edited.
         *
         * @type { boolean }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Whether the image pixel map can be edited.
         *
         * @type { boolean }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        readonly isEditable: boolean;
        /**
         * Reads image pixel map data and writes the data to an ArrayBuffer. This method uses
         * a promise to return the result.
         *
         * @param { ArrayBuffer } dst A buffer to which the image pixel map data will be written.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Reads image pixel map data and writes the data to an ArrayBuffer. This method uses
         * a promise to return the result.
         *
         * @param { ArrayBuffer } dst A buffer to which the image pixel map data will be written.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Reads image pixel map data and writes the data to an ArrayBuffer. This method uses
         * a promise to return the result.
         *
         * @param { ArrayBuffer } dst A buffer to which the image pixel map data will be written.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Reads image pixel map data and writes the data to an ArrayBuffer. This method uses
         * a promise to return the result.
         *
         * @param { ArrayBuffer } dst A buffer to which the image pixel map data will be written.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        readPixelsToBuffer(dst: ArrayBuffer): Promise<void>;
        /**
         * Reads image pixel map data and writes the data to an ArrayBuffer. This method uses
         * a callback to return the result.
         *
         * @param { ArrayBuffer } dst A buffer to which the image pixel map data will be written.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Reads image pixel map data and writes the data to an ArrayBuffer. This method uses
         * a callback to return the result.
         *
         * @param { ArrayBuffer } dst A buffer to which the image pixel map data will be written.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Reads image pixel map data and writes the data to an ArrayBuffer. This method uses
         * a callback to return the result.
         *
         * @param { ArrayBuffer } dst A buffer to which the image pixel map data will be written.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Reads image pixel map data and writes the data to an ArrayBuffer. This method uses
         * a callback to return the result.
         *
         * @param { ArrayBuffer } dst A buffer to which the image pixel map data will be written.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        readPixelsToBuffer(dst: ArrayBuffer, callback: AsyncCallback<void>): void;
        /**
         * Reads image pixel map data and writes the data to an ArrayBuffer.
         *
         * @param { ArrayBuffer } dst A buffer to which the image pixel map data will be written.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 501 - Resource Unavailable.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        readPixelsToBufferSync(dst: ArrayBuffer): void;
        /**
         * Reads image pixel map data in an area. This method uses a promise to return the data read.
         *
         * @param { PositionArea } area Area from which the image pixel map data will be read.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Reads image pixel map data in an area. This method uses a promise to return the data read.
         *
         * @param { PositionArea } area Area from which the image pixel map data will be read.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Reads image pixel map data in an area. This method uses a promise to return the data read.
         *
         * @param { PositionArea } area Area from which the image pixel map data will be read.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Reads image pixel map data in an area. This method uses a promise to return the data read.
         *
         * @param { PositionArea } area Area from which the image pixel map data will be read.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        readPixels(area: PositionArea): Promise<void>;
        /**
         * Reads image pixel map data in an area. This method uses a callback to return the data read.
         *
         * @param { PositionArea } area Area from which the image pixel map data will be read.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Reads image pixel map data in an area. This method uses a callback to return the data read.
         *
         * @param { PositionArea } area Area from which the image pixel map data will be read.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Reads image pixel map data in an area. This method uses a callback to return the data read.
         *
         * @param { PositionArea } area Area from which the image pixel map data will be read.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Reads image pixel map data in an area. This method uses a callback to return the data read.
         *
         * @param { PositionArea } area Area from which the image pixel map data will be read.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        readPixels(area: PositionArea, callback: AsyncCallback<void>): void;
        /**
         * Reads image pixel map data in an area.
         *
         * @param { PositionArea } area Area from which the image pixel map data will be read.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 501 - Resource Unavailable.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        readPixelsSync(area: PositionArea): void;
        /**
         * Writes image pixel map data to the specified area. This method uses a promise to return
         * the operation result.
         *
         * @param { PositionArea } area Area to which the image pixel map data will be written.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Writes image pixel map data to the specified area. This method uses a promise to return
         * the operation result.
         *
         * @param { PositionArea } area Area to which the image pixel map data will be written.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Writes image pixel map data to the specified area. This method uses a promise to return
         * the operation result.
         *
         * @param { PositionArea } area Area to which the image pixel map data will be written.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Writes image pixel map data to the specified area. This method uses a promise to return
         * the operation result.
         *
         * @param { PositionArea } area Area to which the image pixel map data will be written.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        writePixels(area: PositionArea): Promise<void>;
        /**
         * Writes image pixel map data to the specified area. This method uses a callback to return
         * the operation result.
         *
         * @param { PositionArea } area Area to which the image pixel map data will be written.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Writes image pixel map data to the specified area. This method uses a callback to return
         * the operation result.
         *
         * @param { PositionArea } area Area to which the image pixel map data will be written.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Writes image pixel map data to the specified area. This method uses a callback to return
         * the operation result.
         *
         * @param { PositionArea } area Area to which the image pixel map data will be written.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Writes image pixel map data to the specified area. This method uses a callback to return
         * the operation result.
         *
         * @param { PositionArea } area Area to which the image pixel map data will be written.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        writePixels(area: PositionArea, callback: AsyncCallback<void>): void;
        /**
         * Writes image pixel map data to the specified area.
         *
         * @param { PositionArea } area Area to which the image pixel map data will be written.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 501 - Resource Unavailable.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        writePixelsSync(area: PositionArea): void;
        /**
         * Reads image data in an ArrayBuffer and writes the data to a PixelMap object. This method
         * uses a promise to return the result.
         *
         * @param { ArrayBuffer } src A buffer from which the image data will be read.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Reads image data in an ArrayBuffer and writes the data to a PixelMap object. This method
         * uses a promise to return the result.
         *
         * @param { ArrayBuffer } src A buffer from which the image data will be read.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Reads image data in an ArrayBuffer and writes the data to a PixelMap object. This method
         * uses a promise to return the result.
         *
         * @param { ArrayBuffer } src A buffer from which the image data will be read.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Reads image data in an ArrayBuffer and writes the data to a PixelMap object. This method
         * uses a promise to return the result.
         *
         * @param { ArrayBuffer } src A buffer from which the image data will be read.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        writeBufferToPixels(src: ArrayBuffer): Promise<void>;
        /**
         * Reads image data in an ArrayBuffer and writes the data to a PixelMap object. This method
         * uses a callback to return the result.
         *
         * @param { ArrayBuffer } src A buffer from which the image data will be read.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Reads image data in an ArrayBuffer and writes the data to a PixelMap object. This method
         * uses a callback to return the result.
         *
         * @param { ArrayBuffer } src A buffer from which the image data will be read.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Reads image data in an ArrayBuffer and writes the data to a PixelMap object. This method
         * uses a callback to return the result.
         *
         * @param { ArrayBuffer } src A buffer from which the image data will be read.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Reads image data in an ArrayBuffer and writes the data to a PixelMap object. This method
         * uses a callback to return the result.
         *
         * @param { ArrayBuffer } src A buffer from which the image data will be read.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        writeBufferToPixels(src: ArrayBuffer, callback: AsyncCallback<void>): void;
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
         * Convert pixelmap to standard dynamic range.
         *
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @throws { BusinessError } 62980137 - Invalid image operation.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 12
         */
        toSdr(): Promise<void>;
        /**
         * Obtains pixel map information about this image. This method uses a promise to return the information.
         *
         * @returns { Promise<ImageInfo> } A Promise instance used to return the image pixel map information. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Obtains pixel map information about this image. This method uses a promise to return the information.
         *
         * @returns { Promise<ImageInfo> } A Promise instance used to return the image pixel map information. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains pixel map information about this image. This method uses a promise to return the information.
         *
         * @returns { Promise<ImageInfo> } A Promise instance used to return the image pixel map information. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Obtains pixel map information about this image. This method uses a promise to return the information.
         *
         * @returns { Promise<ImageInfo> } A Promise instance used to return the image pixel map information. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        getImageInfo(): Promise<ImageInfo>;
        /**
         * Obtains pixel map information about this image. This method uses a callback to return the information.
         *
         * @param { AsyncCallback<ImageInfo> } callback Callback used to return the image pixel map information.
         * If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Obtains pixel map information about this image. This method uses a callback to return the information.
         *
         * @param { AsyncCallback<ImageInfo> } callback Callback used to return the image pixel map information.
         * If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains pixel map information about this image. This method uses a callback to return the information.
         *
         * @param { AsyncCallback<ImageInfo> } callback Callback used to return the image pixel map information.
         * If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Obtains pixel map information about this image. This method uses a callback to return the information.
         *
         * @param { AsyncCallback<ImageInfo> } callback Callback used to return the image pixel map information.
         * If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        getImageInfo(callback: AsyncCallback<ImageInfo>): void;
        /**
         * Get image information from image source.
         *
         * @returns { ImageInfo } the image information.
         * @throws { BusinessError } 501 - Resource Unavailable.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        getImageInfoSync(): ImageInfo;
        /**
         * Obtains the number of bytes in each line of the image pixel map.
         *
         * @returns { number } Number of bytes in each line.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Obtains the number of bytes in each line of the image pixel map.
         *
         * @returns { number } Number of bytes in each line.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the number of bytes in each line of the image pixel map.
         *
         * @returns { number } Number of bytes in each line.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Obtains the number of bytes in each line of the image pixel map.
         *
         * @returns { number } Number of bytes in each line.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        getBytesNumberPerRow(): number;
        /**
         * Obtains the total number of bytes of the image pixel map.
         *
         * @returns { number } Total number of bytes.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Obtains the total number of bytes of the image pixel map.
         *
         * @returns { number } Total number of bytes.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the total number of bytes of the image pixel map.
         *
         * @returns { number } Total number of bytes.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Obtains the total number of bytes of the image pixel map.
         *
         * @returns { number } Total number of bytes.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        getPixelBytesNumber(): number;
        /**
         * Obtains the density of the image pixel map.
         *
         * @returns { number } The number of density.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Obtains the density of the image pixel map.
         *
         * @returns { number } The number of density.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the density of the image pixel map.
         *
         * @returns { number } The number of density.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Obtains the density of the image pixel map.
         *
         * @returns { number } The number of density.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        getDensity(): number;
        /**
         * Set the transparent rate of pixel map. This method uses a callback to return the operation result.
         *
         * @param { number } rate The value of transparent rate.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Set the transparent rate of pixel map. This method uses a callback to return the operation result.
         *
         * @param { number } rate The value of transparent rate.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Set the transparent rate of pixel map. This method uses a callback to return the operation result.
         *
         * @param { number } rate The value of transparent rate.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Set the transparent rate of pixel map. This method uses a callback to return the operation result.
         *
         * @param { number } rate The value of transparent rate.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        opacity(rate: number, callback: AsyncCallback<void>): void;
        /**
         * Set the transparent rate of pixel map. This method uses a promise to return the result.
         *
         * @param { number } rate The value of transparent rate.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Set the transparent rate of pixel map. This method uses a promise to return the result.
         *
         * @param { number } rate The value of transparent rate.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Set the transparent rate of pixel map. This method uses a promise to return the result.
         *
         * @param { number } rate The value of transparent rate.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Set the transparent rate of pixel map. This method uses a promise to return the result.
         *
         * @param { number } rate The value of transparent rate.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        opacity(rate: number): Promise<void>;
        /**
         * Set the transparent rate of pixel map.
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
         * Obtains new pixel map with alpha information. This method uses a promise to return the information.
         *
         * @returns { Promise<PixelMap> } A Promise instance used to return the new image pixel map. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Obtains new pixel map with alpha information. This method uses a promise to return the information.
         *
         * @returns { Promise<PixelMap> } A Promise instance used to return the new image pixel map. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains new pixel map with alpha information. This method uses a promise to return the information.
         *
         * @returns { Promise<PixelMap> } A Promise instance used to return the new image pixel map. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Obtains new pixel map with alpha information. This method uses a promise to return the information.
         *
         * @returns { Promise<PixelMap> } A Promise instance used to return the new image pixel map. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        createAlphaPixelmap(): Promise<PixelMap>;
        /**
         * Obtains new pixel map with alpha information. This method uses a callback to return the information.
         *
         * @param { AsyncCallback<PixelMap> } callback Callback used to return the new image pixel map. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Obtains new pixel map with alpha information. This method uses a callback to return the information.
         *
         * @param { AsyncCallback<PixelMap> } callback Callback used to return the new image pixel map. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains new pixel map with alpha information. This method uses a callback to return the information.
         *
         * @param { AsyncCallback<PixelMap> } callback Callback used to return the new image pixel map. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Obtains new pixel map with alpha information. This method uses a callback to return the information.
         *
         * @param { AsyncCallback<PixelMap> } callback Callback used to return the new image pixel map. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        createAlphaPixelmap(callback: AsyncCallback<PixelMap>): void;
        /**
         * Obtains new pixel map with alpha information.
         *
         * @returns { PixelMap } return the new image pixel map. If the operation fails, an error message is returned.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Parameter verification failed.
         * @throws { BusinessError } 501 - Resource Unavailable.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        createAlphaPixelmapSync(): PixelMap;
        /**
         * Image zoom in width and height. This method uses a callback to return the operation result.
         *
         * @param { number } x The zoom value of width.
         * @param { number } y The zoom value of height.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Image zoom in width and height. This method uses a callback to return the operation result.
         *
         * @param { number } x The zoom value of width.
         * @param { number } y The zoom value of height.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Image zoom in width and height. This method uses a callback to return the operation result.
         *
         * @param { number } x The zoom value of width.
         * @param { number } y The zoom value of height.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Image zoom in width and height. This method uses a callback to return the operation result.
         *
         * @param { number } x The zoom value of width.
         * @param { number } y The zoom value of height.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        scale(x: number, y: number, callback: AsyncCallback<void>): void;
        /**
         * Image zoom in width and height. This method uses a promise to return the result.
         *
         * @param { number } x The zoom value of width.
         * @param { number } y The zoom value of height.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Image zoom in width and height. This method uses a promise to return the result.
         *
         * @param { number } x The zoom value of width.
         * @param { number } y The zoom value of height.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Image zoom in width and height. This method uses a promise to return the result.
         *
         * @param { number } x The zoom value of width.
         * @param { number } y The zoom value of height.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Image zoom in width and height. This method uses a promise to return the result.
         *
         * @param { number } x The zoom value of width.
         * @param { number } y The zoom value of height.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
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
         * Image position transformation. This method uses a callback to return the operation result.
         *
         * @param { number } x The position value of width.
         * @param { number } y The position value of height.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Image position transformation. This method uses a callback to return the operation result.
         *
         * @param { number } x The position value of width.
         * @param { number } y The position value of height.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Image position transformation. This method uses a callback to return the operation result.
         *
         * @param { number } x The position value of width.
         * @param { number } y The position value of height.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Image position transformation. This method uses a callback to return the operation result.
         *
         * @param { number } x The position value of width.
         * @param { number } y The position value of height.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        translate(x: number, y: number, callback: AsyncCallback<void>): void;
        /**
         * Image position transformation. This method uses a promise to return the result.
         *
         * @param { number } x The position value of width.
         * @param { number } y The position value of height.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Image position transformation. This method uses a promise to return the result.
         *
         * @param { number } x The position value of width.
         * @param { number } y The position value of height.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Image position transformation. This method uses a promise to return the result.
         *
         * @param { number } x The position value of width.
         * @param { number } y The position value of height.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Image position transformation. This method uses a promise to return the result.
         *
         * @param { number } x The position value of width.
         * @param { number } y The position value of height.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
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
         * Image rotation. This method uses a callback to return the operation result.
         *
         * @param { number } angle The rotation angle.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Image rotation. This method uses a callback to return the operation result.
         *
         * @param { number } angle The rotation angle.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Image rotation. This method uses a callback to return the operation result.
         *
         * @param { number } angle The rotation angle.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Image rotation. This method uses a callback to return the operation result.
         *
         * @param { number } angle The rotation angle.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        rotate(angle: number, callback: AsyncCallback<void>): void;
        /**
         * Image rotation. This method uses a promise to return the result.
         *
         * @param { number } angle The rotation angle.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Image rotation. This method uses a promise to return the result.
         *
         * @param { number } angle The rotation angle.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Image rotation. This method uses a promise to return the result.
         *
         * @param { number } angle The rotation angle.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Image rotation. This method uses a promise to return the result.
         *
         * @param { number } angle The rotation angle.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
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
         * Image flipping. This method uses a callback to return the operation result.
         *
         * @param { boolean } horizontal Is flip in horizontal.
         * @param { boolean } vertical Is flip in vertical.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Image flipping. This method uses a callback to return the operation result.
         *
         * @param { boolean } horizontal Is flip in horizontal.
         * @param { boolean } vertical Is flip in vertical.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Image flipping. This method uses a callback to return the operation result.
         *
         * @param { boolean } horizontal Is flip in horizontal.
         * @param { boolean } vertical Is flip in vertical.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Image flipping. This method uses a callback to return the operation result.
         *
         * @param { boolean } horizontal Is flip in horizontal.
         * @param { boolean } vertical Is flip in vertical.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        flip(horizontal: boolean, vertical: boolean, callback: AsyncCallback<void>): void;
        /**
         * Image flipping. This method uses a promise to return the result.
         *
         * @param { boolean } horizontal Is flip in horizontal.
         * @param { boolean } vertical Is flip in vertical.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Image flipping. This method uses a promise to return the result.
         *
         * @param { boolean } horizontal Is flip in horizontal.
         * @param { boolean } vertical Is flip in vertical.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Image flipping. This method uses a promise to return the result.
         *
         * @param { boolean } horizontal Is flip in horizontal.
         * @param { boolean } vertical Is flip in vertical.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Image flipping. This method uses a promise to return the result.
         *
         * @param { boolean } horizontal Is flip in horizontal.
         * @param { boolean } vertical Is flip in vertical.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
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
         * Crop the image. This method uses a callback to return the operation result.
         *
         * @param { Region } region The region to crop.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Crop the image. This method uses a callback to return the operation result.
         *
         * @param { Region } region The region to crop.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Crop the image. This method uses a callback to return the operation result.
         *
         * @param { Region } region The region to crop.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Crop the image. This method uses a callback to return the operation result.
         *
         * @param { Region } region The region to crop.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        crop(region: Region, callback: AsyncCallback<void>): void;
        /**
         * Crop the image. This method uses a promise to return the result.
         *
         * @param { Region } region The region to crop.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        /**
         * Crop the image. This method uses a promise to return the result.
         *
         * @param { Region } region The region to crop.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Crop the image. This method uses a promise to return the result.
         *
         * @param { Region } region The region to crop.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Crop the image. This method uses a promise to return the result.
         *
         * @param { Region } region The region to crop.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        crop(region: Region): Promise<void>;
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
        cropSync(region: Region): void;
        /**
         * Get color space of pixel map.
         *
         * @returns { colorSpaceManager.ColorSpaceManager } If the operation fails, an error message is returned.
         * @throws { BusinessError } 62980101 - The image data is abnormal.
         * @throws { BusinessError } 62980103 - The image data is not supported.
         * @throws { BusinessError } 62980115 - Invalid image parameter.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        /**
         * Get color space of pixel map.
         *
         * @returns { colorSpaceManager.ColorSpaceManager } If the operation fails, an error message is returned.
         * @throws { BusinessError } 62980101 - If the image data abnormal.
         * @throws { BusinessError } 62980103 - If the image data unsupport.
         * @throws { BusinessError } 62980115 - If the image parameter invalid.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 11
         */
        getColorSpace(): colorSpaceManager.ColorSpaceManager;
        /**
         * Marshalling pixelmap and write into MessageSequence.
         *
         * @param { rpc.MessageSequence } sequence rpc.MessageSequence parameter.
         * @throws { BusinessError } 62980115 - Invalid image parameter.
         * @throws { BusinessError } 62980097 - IPC error.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
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
         * @since 10
         */
        unmarshalling(sequence: rpc.MessageSequence): Promise<PixelMap>;
        /**
         * Set color space of pixel map.
         *
         * This method is only used to set the colorspace property of pixelmap, while all pixel data remains the same after calling this method.
         * If you want to change colorspace for all pixels, use method {@Link #applyColorSpace(colorSpaceManager.ColorSpaceManager)} or
         * {@Link #applyColorSpace(colorSpaceManager.ColorSpaceManager, AsyncCallback<void>)}.
         *
         * @param { colorSpaceManager.ColorSpaceManager } colorSpace The color space for pixel map.
         * @throws { BusinessError } 62980111 - The image source data is incomplete.
         * @throws { BusinessError } 62980115 - Invalid image parameter.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 10
         */
        /**
         * Set color space of pixel map.
         *
         * This method is only used to set the colorspace property of pixelmap, while all pixel data remains the same after calling this method.
         * If you want to change colorspace for all pixels, use method {@Link #applyColorSpace(colorSpaceManager.ColorSpaceManager)} or
         * {@Link #applyColorSpace(colorSpaceManager.ColorSpaceManager, AsyncCallback<void>)}.
         *
         * @param { colorSpaceManager.ColorSpaceManager } colorSpace The color space for pixel map.
         * @throws { BusinessError } 62980111 - If the operation invalid.
         * @throws { BusinessError } 62980115 - If the image parameter invalid.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 11
         */
        setColorSpace(colorSpace: colorSpaceManager.ColorSpaceManager): void;
        /**
         * Is it stride Alignment
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 11
         */
        readonly isStrideAlignment: boolean;
        /**
        * Apply color space of pixel map, the pixels will be changed by input color space. This method uses a callback to return the operation result.
        *
        * This method is used to change color space of pixelmap. Pixel data will be changed by calling this method.
        * If you want to set the colorspace property of pixelmap only, use method {@Link #setColorSpace(colorSpaceManager.ColorSpaceManager)}.
        *
        * @param { colorSpaceManager.ColorSpaceManager } targetColorSpace - The color space for pixel map.
        * @param { AsyncCallback<void> } callback - Callback used to return the operation result. If the operation fails, an error message is returned.
        * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
        * 2.Incorrect parameter types. 3.Parameter verification failed.
        * @throws { BusinessError } 62980104 - Failed to initialize the internal object.
        * @throws { BusinessError } 62980108 - Failed to convert the color space.
        * @throws { BusinessError } 62980115 - Invalid image parameter.
        * @syscap SystemCapability.Multimedia.Image.Core
        * @crossplatform
        * @since 11
        */
        applyColorSpace(targetColorSpace: colorSpaceManager.ColorSpaceManager, callback: AsyncCallback<void>): void;
        /**
         * Apply color space of pixel map, the pixels will be changed by input color space. This method uses a promise to return the result.
         *
         * This method is used to change color space of pixelmap. Pixel data will be changed by calling this method.
         * If you want to set the colorspace property of pixelmap only, use method {@Link #setColorSpace(colorSpaceManager.ColorSpaceManager)}.
         *
         * @param { colorSpaceManager.ColorSpaceManager } targetColorSpace - The color space for pixel map.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an error message is returned.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified.
         * 2.Incorrect parameter types. 3.Parameter verification failed.
         * @throws { BusinessError } 62980104 - Failed to initialize the internal object.
         * @throws { BusinessError } 62980108 - Failed to convert the color space.
         * @throws { BusinessError } 62980115 - Invalid image parameter.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 11
         */
        applyColorSpace(targetColorSpace: colorSpaceManager.ColorSpaceManager): Promise<void>;
        /**
        * Releases this PixelMap object. This method uses a callback to return the result.
        *
        * @param { AsyncCallback<void> } callback Callback invoked for instance release. If the operation fails, an error message is returned.
        * @syscap SystemCapability.Multimedia.Image.Core
        * @since 7
        */
        /**
         * Releases this PixelMap object. This method uses a callback to return the result.
         *
         * @param { AsyncCallback<void> } callback Callback invoked for instance release. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Releases this PixelMap object. This method uses a callback to return the result.
         *
         * @param { AsyncCallback<void> } callback Callback invoked for instance release. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Releases this PixelMap object. This method uses a callback to return the result.
         *
         * @param { AsyncCallback<void> } callback Callback invoked for instance release. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        release(callback: AsyncCallback<void>): void;
        /**
         * Releases this PixelMap object. This method uses a promise to return the result.
         *
         * @returns { Promise<void> } A Promise instance used to return the instance release result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 7
         */
        /**
         * Releases this PixelMap object. This method uses a promise to return the result.
         *
         * @returns { Promise<void> } A Promise instance used to return the instance release result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Releases this PixelMap object. This method uses a promise to return the result.
         *
         * @returns { Promise<void> } A Promise instance used to return the instance release result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Releases this PixelMap object. This method uses a promise to return the result.
         *
         * @returns { Promise<void> } A Promise instance used to return the instance release result. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        release(): Promise<void>;
    }
    /**
     * ImageSource instance.
     *
     * @typedef ImageSource
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @since 6
     */
    /**
     * ImageSource instance.
     *
     * @typedef ImageSource
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @since 10
     */
    /**
     * ImageSource instance.
     *
     * @typedef ImageSource
     * @syscap SystemCapability.Multimedia.Image.ImageSource
     * @crossplatform
     * @atomicservice
     * @since 11
     */
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
         * Obtains information about an image with the specified sequence number and uses a callback
         * to return the result.
         *
         * @param { number } index Sequence number of an image.
         * @param { AsyncCallback<ImageInfo> } callback Callback used to return the image information.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 6
         */
        /**
         * Obtains information about an image with the specified sequence number and uses a callback
         * to return the result.
         *
         * @param { number } index Sequence number of an image.
         * @param { AsyncCallback<ImageInfo> } callback Callback used to return the image information.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains information about an image with the specified sequence number and uses a callback
         * to return the result.
         *
         * @param { number } index Sequence number of an image.
         * @param { AsyncCallback<ImageInfo> } callback Callback used to return the image information.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Obtains information about an image with the specified sequence number and uses a callback
         * to return the result.
         *
         * @param { number } index Sequence number of an image.
         * @param { AsyncCallback<ImageInfo> } callback Callback used to return the image information.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        getImageInfo(index: number, callback: AsyncCallback<ImageInfo>): void;
        /**
         * Obtains information about this image and uses a callback to return the result.
         *
         * @param { AsyncCallback<ImageInfo> } callback Callback used to return the image information.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 6
         */
        /**
         * Obtains information about this image and uses a callback to return the result.
         *
         * @param { AsyncCallback<ImageInfo> } callback Callback used to return the image information.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains information about this image and uses a callback to return the result.
         *
         * @param { AsyncCallback<ImageInfo> } callback Callback used to return the image information.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Obtains information about this image and uses a callback to return the result.
         *
         * @param { AsyncCallback<ImageInfo> } callback Callback used to return the image information.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        getImageInfo(callback: AsyncCallback<ImageInfo>): void;
        /**
         * Get image information from image source.
         *
         * @param { number } index Sequence number of an image. If this parameter is not specified, the default value 0 is used.
         * @returns { Promise<ImageInfo> } A Promise instance used to return the image information.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 6
         */
        /**
         * Get image information from image source.
         *
         * @param { number } index Sequence number of an image. If this parameter is not specified, the default value 0 is used.
         * @returns { Promise<ImageInfo> } A Promise instance used to return the image information.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        /**
         * Get image information from image source.
         *
         * @param { number } index Sequence number of an image. If this parameter is not specified, the default value 0 is used.
         * @returns { Promise<ImageInfo> } A Promise instance used to return the image information.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Get image information from image source.
         *
         * @param { number } index Sequence number of an image. If this parameter is not specified, the default value 0 is used.
         * @returns { Promise<ImageInfo> } A Promise instance used to return the image information.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        getImageInfo(index?: number): Promise<ImageInfo>;
        /**
         * Get image information from image source synchronously.
         *
         * @param { number } index - Index of sequence images. If this parameter is not specified, default value is 0.
         * @returns { ImageInfo } The image information.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 12
         */
        getImageInfoSync(index?: number): ImageInfo;
        /**
         * Creates a PixelMap object based on image decoding parameters. This method uses a promise to
         * return the object.
         *
         * @param { DecodingOptions } options Image decoding parameters.
         * @returns { Promise<PixelMap> } A Promise instance used to return the PixelMap object.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 7
         */
        /**
         * Creates a PixelMap object based on image decoding parameters. This method uses a promise to
         * return the object.
         *
         * @param { DecodingOptions } options Image decoding parameters.
         * @returns { Promise<PixelMap> } A Promise instance used to return the PixelMap object.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        /**
         * Creates a PixelMap object based on image decoding parameters. This method uses a promise to
         * return the object.
         *
         * @param { DecodingOptions } options Image decoding parameters.
         * @returns { Promise<PixelMap> } A Promise instance used to return the PixelMap object.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @atomicservice
         * @since 11
         */
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
        createPixelMap(options?: DecodingOptions): Promise<PixelMap>;
        /**
         * Creates a PixelMap object. This method uses a callback to return the object.
         *
         * @param { AsyncCallback<PixelMap> } callback Callback used to return the PixelMap object.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 7
         */
        /**
         * Creates a PixelMap object. This method uses a callback to return the object.
         *
         * @param { AsyncCallback<PixelMap> } callback Callback used to return the PixelMap object.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        /**
         * Creates a PixelMap object. This method uses a callback to return the object.
         *
         * @param { AsyncCallback<PixelMap> } callback Callback used to return the PixelMap object.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Creates a PixelMap object. This method uses a callback to return the object.
         *
         * @param { AsyncCallback<PixelMap> } callback Callback used to return the PixelMap object.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        createPixelMap(callback: AsyncCallback<PixelMap>): void;
        /**
         * Creates a PixelMap object based on image decoding parameters. This method uses a callback to
         * return the object.
         *
         * @param { DecodingOptions } options Image decoding parameters.
         * @param { AsyncCallback<PixelMap> } callback Callback used to return the PixelMap object.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 7
         */
        /**
         * Creates a PixelMap object based on image decoding parameters. This method uses a callback to
         * return the object.
         *
         * @param { DecodingOptions } options Image decoding parameters.
         * @param { AsyncCallback<PixelMap> } callback Callback used to return the PixelMap object.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        /**
         * Creates a PixelMap object based on image decoding parameters. This method uses a callback to
         * return the object.
         *
         * @param { DecodingOptions } options Image decoding parameters.
         * @param { AsyncCallback<PixelMap> } callback Callback used to return the PixelMap object.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        /**
         * Creates a PixelMap object based on image decoding parameters. This method uses a callback to
         * return the object.
         *
         * @param { DecodingOptions } options Image decoding parameters.
         * @param { AsyncCallback<PixelMap> } callback Callback used to return the PixelMap object.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @form
         * @atomicservice
         * @since 12
         */
        createPixelMap(options: DecodingOptions, callback: AsyncCallback<PixelMap>): void;
        /**
         * Create a PixelMap object based on image decoding parameters synchronously.
         *
         * @param { DecodingOptions } options - Image decoding parameters.
         * @returns { PixelMap } Return the PixelMap. If decoding fails, return undefined.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 12
         */
        createPixelMapSync(options?: DecodingOptions): PixelMap;
        /**
         * Creates a PixelMap array based on image decoding parameters. This method uses a promise to
         * return the array.
         *
         * @param { DecodingOptions } options Image decoding parameters.
         * @returns { Promise<Array<PixelMap>> } A Promise instance used to return the PixelMap array.
         * @throws { BusinessError } 62980096 - The operation failed.
         * @throws { BusinessError } 62980099 - The shared memory data is abnormal.
         * @throws { BusinessError } 62980101 - The image data is abnormal.
         * @throws { BusinessError } 62980103 - The image data is not supported.
         * @throws { BusinessError } 62980106 - The image is too large.
         * @throws { BusinessError } 62980109 - Failed to crop the image.
         * @throws { BusinessError } 62980110 - The image source data is incorrect.
         * @throws { BusinessError } 62980111 - The image source data is incomplete.
         * @throws { BusinessError } 62980112 - The image format does not match.
         * @throws { BusinessError } 62980113 - Unknown image format.
         * @throws { BusinessError } 62980115 - Invalid image parameter.
         * @throws { BusinessError } 62980116 - Failed to decode the image.
         * @throws { BusinessError } 62980118 - Failed to create the image plugin.
         * @throws { BusinessError } 62980122 - The image decoding header is abnormal.
         * @throws { BusinessError } 62980137 - Invalid media operation.
         * @throws { BusinessError } 62980173 - The DMA memory does not exist.
         * @throws { BusinessError } 62980174 - The DMA memory data is abnormal.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        createPixelMapList(options?: DecodingOptions): Promise<Array<PixelMap>>;
        /**
         * Creates a PixelMap array. This method uses a callback to return the array.
         *
         * @param { AsyncCallback<Array<PixelMap>> } callback Callback used to return the PixelMap array.
         * @throws { BusinessError } 62980096 - The operation failed.
         * @throws { BusinessError } 62980099 - The shared memory data is abnormal.
         * @throws { BusinessError } 62980101 - The image data is abnormal.
         * @throws { BusinessError } 62980103 - The image data is not supported.
         * @throws { BusinessError } 62980106 - The image is too large.
         * @throws { BusinessError } 62980109 - Failed to crop the image.
         * @throws { BusinessError } 62980110 - The image source data is incorrect.
         * @throws { BusinessError } 62980111 - The image source data is incomplete.
         * @throws { BusinessError } 62980112 - The image format does not match.
         * @throws { BusinessError } 62980113 - Unknown image format.
         * @throws { BusinessError } 62980115 - Invalid image parameter.
         * @throws { BusinessError } 62980116 - Failed to decode the image.
         * @throws { BusinessError } 62980118 - Failed to create the image plugin.
         * @throws { BusinessError } 62980122 - The image decoding header is abnormal.
         * @throws { BusinessError } 62980137 - Invalid media operation.
         * @throws { BusinessError } 62980173 - The DMA memory does not exist.
         * @throws { BusinessError } 62980174 - The DMA memory data is abnormal.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        createPixelMapList(callback: AsyncCallback<Array<PixelMap>>): void;
        /**
         * Creates a PixelMap array based on image decoding parameters. This method uses a callback to
         * return the array.
         *
         * @param { DecodingOptions } options Image decoding parameters.
         * @param { AsyncCallback<Array<PixelMap>> } callback Callback used to return the PixelMap array.
         * @throws { BusinessError } 62980096 - The operation failed.
         * @throws { BusinessError } 62980099 - The shared memory data is abnormal.
         * @throws { BusinessError } 62980101 - The image data is abnormal.
         * @throws { BusinessError } 62980103 - The image data is not supported.
         * @throws { BusinessError } 62980106 - The image is too large.
         * @throws { BusinessError } 62980109 - Failed to crop the image.
         * @throws { BusinessError } 62980110 - The image source data is incorrect.
         * @throws { BusinessError } 62980111 - The image source data is incomplete.
         * @throws { BusinessError } 62980112 - The image format does not match.
         * @throws { BusinessError } 62980113 - Unknown image format.
         * @throws { BusinessError } 62980115 - Invalid image parameter.
         * @throws { BusinessError } 62980116 - Failed to decode the image.
         * @throws { BusinessError } 62980118 - Failed to create the image plugin.
         * @throws { BusinessError } 62980122 - The image decoding header is abnormal.
         * @throws { BusinessError } 62980137 - Invalid media operation.
         * @throws { BusinessError } 62980173 - The DMA memory does not exist.
         * @throws { BusinessError } 62980174 - The DMA memory data is abnormal.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        createPixelMapList(options: DecodingOptions, callback: AsyncCallback<Array<PixelMap>>): void;
        /**
         * Obtains the array of delay time in an image. This method uses a promise to return the array.
         *
         * @returns { Promise<Array<number>> } A Promise instance used to return the array.
         * @throws { BusinessError } 62980096 - The operation failed.
         * @throws { BusinessError } 62980110 - The image source data is incorrect.
         * @throws { BusinessError } 62980111 - The image source data is incomplete.
         * @throws { BusinessError } 62980112 - The image format does not match.
         * @throws { BusinessError } 62980113 - Unknown image format.
         * @throws { BusinessError } 62980115 - Invalid image parameter.
         * @throws { BusinessError } 62980116 - Failed to decode the image.
         * @throws { BusinessError } 62980118 - Failed to create the image plugin.
         * @throws { BusinessError } 62980122 - The image decoding header is abnormal.
         * @throws { BusinessError } 62980137 - Invalid media operation.
         * @throws { BusinessError } 62980149 - Invalid media parameter.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        getDelayTimeList(): Promise<Array<number>>;
        /**
         * Obtains the array of delay time in an image. This method uses a callback to return the array.
         *
         * @param { AsyncCallback<Array<number>> } callback Callback used to return the array.
         * @throws { BusinessError } 62980096 - The operation failed.
         * @throws { BusinessError } 62980110 - The image source data is incorrect.
         * @throws { BusinessError } 62980111 - The image source data is incomplete.
         * @throws { BusinessError } 62980112 - The image format does not match.
         * @throws { BusinessError } 62980113 - Unknown image format.
         * @throws { BusinessError } 62980115 - Invalid image parameter.
         * @throws { BusinessError } 62980116 - Failed to decode the image.
         * @throws { BusinessError } 62980118 - Failed to create the image plugin.
         * @throws { BusinessError } 62980122 - The image decoding header is abnormal.
         * @throws { BusinessError } 62980137 - Invalid media operation.
         * @throws { BusinessError } 62980149 - Invalid media parameter.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        getDelayTimeList(callback: AsyncCallback<Array<number>>): void;
        /**
         * Obtains the array of disposal type in a gif image. This method uses a promise to return the array.
         *
         * @returns { Promise<Array<number>> } A Promise instance used to return the array.
         * @throws { BusinessError } 62980096 - The operation failed.
         * @throws { BusinessError } 62980101 - The image data is abnormal.
         * @throws { BusinessError } 62980137 - Invalid media operation.
         * @throws { BusinessError } 62980149 - Invalid image source mime type.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 12
         */
        getDisposalTypeList(): Promise<Array<number>>;
        /**
         * Obtains the count of frame in an image. This method uses a promise to return the number.
         *
         * @returns { Promise<number> } A Promise instance used to return the number.
         * @throws { BusinessError } 62980096 - The operation failed.
         * @throws { BusinessError } 62980110 - The image source data is incorrect.
         * @throws { BusinessError } 62980111 - The image source data is incomplete.
         * @throws { BusinessError } 62980112 - The image format does not match.
         * @throws { BusinessError } 62980113 - Unknown image format.
         * @throws { BusinessError } 62980115 - Invalid image parameter.
         * @throws { BusinessError } 62980116 - Failed to decode the image.
         * @throws { BusinessError } 62980118 - Failed to create the image plugin.
         * @throws { BusinessError } 62980122 - The image decoding header is abnormal.
         * @throws { BusinessError } 62980137 - Invalid media operation.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        getFrameCount(): Promise<number>;
        /**
         * Obtains the count of frame in an image. This method uses a callback to return the number.
         *
         * @param { AsyncCallback<number> } callback Callback used to return the number.
         * @throws { BusinessError } 62980096 - The operation failed.
         * @throws { BusinessError } 62980110 - The image source data is incorrect.
         * @throws { BusinessError } 62980111 - The image source data is incomplete.
         * @throws { BusinessError } 62980112 - The image format does not match.
         * @throws { BusinessError } 62980113 - Unknown image format.
         * @throws { BusinessError } 62980115 - Invalid image parameter.
         * @throws { BusinessError } 62980116 - Failed to decode the image.
         * @throws { BusinessError } 62980118 - Failed to create the image plugin.
         * @throws { BusinessError } 62980122 - The image decoding header is abnormal.
         * @throws { BusinessError } 62980137 - Invalid media operation.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        getFrameCount(callback: AsyncCallback<number>): void;
        /**
         * Obtains the value of a property in an image with the specified index. This method uses a
         * promise to return the property value in a string.
         *
         * @param { PropertyKey } key - Name of the property whose value is to be obtained.
         * @param { ImagePropertyOptions } options - Index of the image.
         * @returns { Promise<string> } A Promise instance used to return the property value. If the operation fails, the default value is returned.
         * @throws { BusinessError } 401 - Parameter error.Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types;3.Parameter verification failed;
         * @throws { BusinessError } 62980096 - The operation failed.
         * @throws { BusinessError } 62980103 - The image data is not supported.
         * @throws { BusinessError } 62980110 - The image source data is incorrect.
         * @throws { BusinessError } 62980111 - The image source data is incomplete.
         * @throws { BusinessError } 62980112 - The image format does not match.
         * @throws { BusinessError } 62980113 - Unknown image format.
         * @throws { BusinessError } 62980115 - Invalid image parameter.
         * @throws { BusinessError } 62980116 - Failed to decode the image.
         * @throws { BusinessError } 62980118 - Failed to create the image plugin.
         * @throws { BusinessError } 62980122 - The image decoding header is abnormal.
         * @throws { BusinessError } 62980123 - Images in EXIF format are not supported.
         * @throws { BusinessError } 62980135 - The EXIF value is invalid.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 11
         */
        getImageProperty(key: PropertyKey, options?: ImagePropertyOptions): Promise<string>;
        /**
         * Obtains the value of a property in an image with the specified index. This method uses a
         * promise to return the property value in a string.
         *
         * @param { string } key Name of the property whose value is to be obtained.
         * @param { GetImagePropertyOptions } options Index of the image.
         * @returns { Promise<string> } A Promise instance used to return the property value. If the operation fails, the default value is returned.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 7
         * @deprecated since 11
         * @useinstead image.ImageSource#getImageProperty
         */
        /**
         * Obtains the value of a property in an image with the specified index. This method uses a
         * promise to return the property value in a string.
         *
         * @param { string } key Name of the property whose value is to be obtained.
         * @param { GetImagePropertyOptions } options Index of the image.
         * @returns { Promise<string> } A Promise instance used to return the property value. If the operation fails, the default value is returned.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         * @deprecated since 11
         * @useinstead image.ImageSource#getImageProperty
         */
        getImageProperty(key: string, options?: GetImagePropertyOptions): Promise<string>;
        /**
         * Obtains the value of a property in this image. This method uses a callback to return the
         * property value in a string.
         *
         * @param { string } key Name of the property whose value is to be obtained.
         * @param { AsyncCallback<string> } callback Callback used to return the property value. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 7
         * @deprecated since 11
         * @useinstead image.ImageSource#getImageProperty
         */
        /**
         * Obtains the value of a property in this image. This method uses a callback to return the
         * property value in a string.
         *
         * @param { string } key Name of the property whose value is to be obtained.
         * @param { AsyncCallback<string> } callback Callback used to return the property value. If the operation fails, an error message is returned.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         * @deprecated since 11
         * @useinstead image.ImageSource#getImageProperty
         */
        getImageProperty(key: string, callback: AsyncCallback<string>): void;
        /**
         * Obtains the value of a property in an image with the specified index. This method uses
         * a callback to return the property value in a string.
         *
         * @param { string } key Name of the property whose value is to be obtained.
         * @param { GetImagePropertyOptions } options Index of the image.
         * @param { AsyncCallback<string> } callback Callback used to return the property value. If the operation fails, the default value is returned.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 7
         * @deprecated since 11
         * @useinstead image.ImageSource#getImageProperty
         */
        /**
         * Obtains the value of a property in an image with the specified index. This method uses
         * a callback to return the property value in a string.
         *
         * @param { string } key Name of the property whose value is to be obtained.
         * @param { GetImagePropertyOptions } options Index of the image.
         * @param { AsyncCallback<string> } callback Callback used to return the property value. If the operation fails, the default value is returned.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         * @deprecated since 11
         * @useinstead image.ImageSource#getImageProperty
         */
        getImageProperty(key: string, options: GetImagePropertyOptions, callback: AsyncCallback<string>): void;
        /**
         * Obtains the value of properties in an image. This method uses a promise to return the property values in array
         * of records.
         *
         * @param { Array<PropertyKey> } key - Name of the properties whose value is to be obtained.
         * @returns { Promise<Record<PropertyKey, string|null>> } Array of Records instance used to return the
         * property values. If the operation fails, the null is returned.
         * @throws { BusinessError } 401 - Parameter error.Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed;
         * @throws { BusinessError } 62980096 - The operation failed.
         * @throws { BusinessError } 62980110 - The image source data is incorrect.
         * @throws { BusinessError } 62980113 - Unknown image format.
         * @throws { BusinessError } 62980116 - Failed to decode the image.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 12
         */
        getImageProperties(key: Array<PropertyKey>): Promise<Record<PropertyKey, string | null>>;
        /**
         * Modify the value of a property in an image with the specified key. This method uses a
         * promise to return the property value in a string.
         *
         * @param { PropertyKey } key - Name of the property whose value is to be modified.
         * @param { string } value - The value to be set to property.
         * @returns { Promise<void> } A Promise instance used to return the property value.
         * @throws { BusinessError } 401 - Parameter error.Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types;
         * @throws { BusinessError } 62980123 - Images in EXIF format are not supported.
         * @throws { BusinessError } 62980133 - The EXIF data is out of range.
         * @throws { BusinessError } 62980135 - The EXIF value is invalid.
         * @throws { BusinessError } 62980146 - The EXIF data failed to be written to the file.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 11
         */
        modifyImageProperty(key: PropertyKey, value: string): Promise<void>;
        /**
         * Modify the value of a property in an image with the specified key. This method uses a
         * promise to return the property value in a string.
         *
         * @param { string } key Name of the property whose value is to be modified.
         * @param { string } value The value to be set to property.
         * @returns { Promise<void> } A Promise instance used to return the property value.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 9
         * @deprecated since 11
         * @useinstead image.ImageSource#modifyImageProperty
         */
        /**
         * Modify the value of a property in an image with the specified key. This method uses a
         * promise to return the property value in a string.
         *
         * @param { string } key Name of the property whose value is to be modified.
         * @param { string } value The value to be set to property.
         * @returns { Promise<void> } A Promise instance used to return the property value.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         * @deprecated since 11
         * @useinstead image.ImageSource#modifyImageProperty
         */
        modifyImageProperty(key: string, value: string): Promise<void>;
        /**
         * Modify the value of a property in an image with the specified key. This method uses a callback to return the
         * property value in a string.
         *
         * @param { string } key Name of the property whose value is to be obtained.
         * @param { string } value The value to be set to property.
         * @param { AsyncCallback<void> } callback Callback to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 9
         * @deprecated since 11
         * @useinstead image.ImageSource#modifyImageProperty
         */
        /**
         * Modify the value of a property in an image with the specified key. This method uses a callback to return the
         * property value in a string.
         *
         * @param { string } key Name of the property whose value is to be obtained.
         * @param { string } value The value to be set to property.
         * @param { AsyncCallback<void> } callback Callback to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         * @deprecated since 11
         * @useinstead image.ImageSource#modifyImageProperty
         */
        modifyImageProperty(key: string, value: string, callback: AsyncCallback<void>): void;
        /**
         * Modify the value of properties in an image with the specified keys.
         *
         * @param { Record<PropertyKey, string|null> } records - Array of the property Records whose values are to
         * be modified.
         * @returns { Promise<void> } A Promise instance used to return the operation result. If the operation fails, an
         * error message is returned.
         * @throws { BusinessError } 401 - Parameter error.Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types; 3.Parameter verification failed;
         * @throws { BusinessError } 62980123 - Images in EXIF format are not supported.
         * @throws { BusinessError } 62980133 - The EXIF data is out of range.
         * @throws { BusinessError } 62980135 - The EXIF value is invalid.
         * @throws { BusinessError } 62980146 - The EXIF data failed to be written to the file.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 12
         */
        modifyImageProperties(records: Record<PropertyKey, string | null>): Promise<void>;
        /**
         * Update the data in the incremental ImageSource.
         *
         * @param { ArrayBuffer } buf The data to be updated.
         * @param { boolean } isFinished If is it finished.
         * @param { number } value The offset of data.
         * @param { number } length The length fo buf.
         * @returns { Promise<void> } A Promise instance used to return the property value.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 9
         */
        /**
         * Update the data in the incremental ImageSource.
         *
         * @param { ArrayBuffer } buf The data to be updated.
         * @param { boolean } isFinished If is it finished.
         * @param { number } value The offset of data.
         * @param { number } length The length fo buf.
         * @returns { Promise<void> } A Promise instance used to return the property value.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        /**
         * Update the data in the incremental ImageSource.
         *
         * @param { ArrayBuffer } buf The data to be updated.
         * @param { boolean } isFinished If is it finished.
         * @param { number } offset The offset of data.
         * @param { number } length The length fo buf.
         * @returns { Promise<void> } A Promise instance used to return the property value.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 11
         */
        updateData(buf: ArrayBuffer, isFinished: boolean, offset: number, length: number): Promise<void>;
        /**
         * Update the data in the incremental ImageSource.
         *
         * @param { ArrayBuffer } buf The data to be updated.
         * @param { boolean } isFinished If is it finished.
         * @param { number } value The offset of data.
         * @param { number } length The length fo buf.
         * @param { AsyncCallback<void> } callback Callback to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 9
         */
        /**
         * Update the data in the incremental ImageSource.
         *
         * @param { ArrayBuffer } buf The data to be updated.
         * @param { boolean } isFinished If is it finished.
         * @param { number } value The offset of data.
         * @param { number } length The length fo buf.
         * @param { AsyncCallback<void> } callback Callback to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        /**
         * Update the data in the incremental ImageSource.
         *
         * @param { ArrayBuffer } buf The data to be updated.
         * @param { boolean } isFinished If is it finished.
         * @param { number } offset The offset of data.
         * @param { number } length The length fo buf.
         * @param { AsyncCallback<void> } callback Callback to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 11
         */
        updateData(buf: ArrayBuffer, isFinished: boolean, offset: number, length: number, callback: AsyncCallback<void>): void;
        /**
         * Releases an ImageSource instance and uses a callback to return the result.
         *
         * @param { AsyncCallback<void> } callback Callback to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 6
         */
        /**
         * Releases an ImageSource instance and uses a callback to return the result.
         *
         * @param { AsyncCallback<void> } callback Callback to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        release(callback: AsyncCallback<void>): void;
        /**
         * Releases an ImageSource instance and uses a promise to return the result.
         *
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 6
         */
        /**
         * Releases an ImageSource instance and uses a promise to return the result.
         *
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        release(): Promise<void>;
        /**
         * Supported image formats.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @since 6
         */
        /**
         * Supported image formats.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.Multimedia.Image.ImageSource
         * @crossplatform
         * @since 10
         */
        readonly supportedFormats: Array<string>;
    }
    /**
     * ImagePacker instance.
     *
     * @typedef ImagePacker
     * @syscap SystemCapability.Multimedia.Image.ImagePacker
     * @since 6
     */
    /**
     * ImagePacker instance.
     *
     * @typedef ImagePacker
     * @syscap SystemCapability.Multimedia.Image.ImagePacker
     * @crossplatform
     * @since 10
     */
    /**
     * ImagePacker instance.
     *
     * @typedef ImagePacker
     * @syscap SystemCapability.Multimedia.Image.ImagePacker
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    interface ImagePacker {
        /**
         * Compresses or packs an image and uses a callback to return the result.
         *
         * @param { ImageSource } source Image to be processed.
         * @param { PackingOption } option Option for image packing.
         * @param { AsyncCallback<ArrayBuffer> } callback Callback used to return the packed data.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @since 6
         */
        /**
         * Compresses or packs an image and uses a callback to return the result.
         *
         * @param { ImageSource } source Image to be processed.
         * @param { PackingOption } option Option for image packing.
         * @param { AsyncCallback<ArrayBuffer> } callback Callback used to return the packed data.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @since 10
         */
        /**
         * Compresses or packs an image and uses a callback to return the result.
         *
         * @param { ImageSource } source Image to be processed.
         * @param { PackingOption } option Option for image packing.
         * @param { AsyncCallback<ArrayBuffer> } callback Callback used to return the packed data.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        packing(source: ImageSource, option: PackingOption, callback: AsyncCallback<ArrayBuffer>): void;
        /**
         * Compresses or packs an image and uses a promise to return the result.
         *
         * @param { ImageSource } source Image to be processed.
         * @param { PackingOption } option Option for image packing.
         * @returns { Promise<ArrayBuffer> } A Promise instance used to return the compressed or packed data.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @since 6
         */
        /**
         * Compresses or packs an image and uses a promise to return the result.
         *
         * @param { ImageSource } source Image to be processed.
         * @param { PackingOption } option Option for image packing.
         * @returns { Promise<ArrayBuffer> } A Promise instance used to return the compressed or packed data.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @since 10
         */
        /**
         * Compresses or packs an image and uses a promise to return the result.
         *
         * @param { ImageSource } source Image to be processed.
         * @param { PackingOption } option Option for image packing.
         * @returns { Promise<ArrayBuffer> } A Promise instance used to return the compressed or packed data.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        packing(source: ImageSource, option: PackingOption): Promise<ArrayBuffer>;
        /**
         * Compresses or packs an image and uses a callback to return the result.
         *
         * @param { PixelMap } source PixelMap to be processed.
         * @param { PackingOption } option Option for image packing.
         * @param { AsyncCallback<ArrayBuffer> } callback Callback used to return the packed data.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @since 8
         */
        /**
         * Compresses or packs an image and uses a callback to return the result.
         *
         * @param { PixelMap } source PixelMap to be processed.
         * @param { PackingOption } option Option for image packing.
         * @param { AsyncCallback<ArrayBuffer> } callback Callback used to return the packed data.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @since 10
         */
        /**
         * Compresses or packs an image and uses a callback to return the result.
         *
         * @param { PixelMap } source PixelMap to be processed.
         * @param { PackingOption } option Option for image packing.
         * @param { AsyncCallback<ArrayBuffer> } callback Callback used to return the packed data.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        packing(source: PixelMap, option: PackingOption, callback: AsyncCallback<ArrayBuffer>): void;
        /**
         * Compresses or packs an image and uses a promise to return the result.
         *
         * @param { PixelMap } source PixelMap to be processed.
         * @param { PackingOption } option Option for image packing.
         * @returns { Promise<ArrayBuffer> } A Promise instance used to return the compressed or packed data.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @since 8
         */
        /**
         * Compresses or packs an image and uses a promise to return the result.
         *
         * @param { PixelMap } source PixelMap to be processed.
         * @param { PackingOption } option Option for image packing.
         * @returns { Promise<ArrayBuffer> } A Promise instance used to return the compressed or packed data.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @since 10
         */
        /**
         * Compresses or packs an image and uses a promise to return the result.
         *
         * @param { PixelMap } source PixelMap to be processed.
         * @param { PackingOption } option Option for image packing.
         * @returns { Promise<ArrayBuffer> } A Promise instance used to return the compressed or packed data.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        packing(source: PixelMap, option: PackingOption): Promise<ArrayBuffer>;
        /**
         * Compresses or packs an image into a file and uses a callback to return the result.
         *
         * @param { ImageSource } source Image to be processed.
         * @param { number } fd ID of a file descriptor.
         * @param { PackingOption } options Options for image packing.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @since 11
         */
        packToFile(source: ImageSource, fd: number, options: PackingOption, callback: AsyncCallback<void>): void;
        /**
         * Compresses or packs an image into a file and uses a promise to return the result.
         *
         * @param { ImageSource } source Image to be processed.
         * @param { number } fd ID of a file descriptor.
         * @param { PackingOption } options Options for image packing.
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @since 11
         */
        packToFile(source: ImageSource, fd: number, options: PackingOption): Promise<void>;
        /**
         * Compresses or packs an image into a file and uses a callback to return the result.
         *
         * @param { PixelMap } source PixelMap to be processed.
         * @param { number } fd ID of a file descriptor.
         * @param { PackingOption } options Options for image packing.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @since 11
         */
        packToFile(source: PixelMap, fd: number, options: PackingOption, callback: AsyncCallback<void>): void;
        /**
         * Compresses or packs an image into a file and uses a promise to return the result.
         *
         * @param { PixelMap } source PixelMap to be processed.
         * @param { number } fd ID of a file descriptor.
         * @param { PackingOption } options Options for image packing.
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @since 11
         */
        packToFile(source: PixelMap, fd: number, options: PackingOption): Promise<void>;
        /**
        * Releases an ImagePacker instance and uses a callback to return the result.
        *
        * @param { AsyncCallback<void> } callback Callback to return the operation result.
        * @syscap SystemCapability.Multimedia.Image.ImagePacker
        * @since 6
        */
        /**
         * Releases an ImagePacker instance and uses a callback to return the result.
         *
         * @param { AsyncCallback<void> } callback Callback to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @since 10
         */
        release(callback: AsyncCallback<void>): void;
        /**
         * Releases an ImagePacker instance and uses a promise to return the result.
         *
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @since 6
         */
        /**
         * Releases an ImagePacker instance and uses a promise to return the result.
         *
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @since 10
         */
        release(): Promise<void>;
        /**
         * Supported image formats.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @since 6
         */
        /**
         * Supported image formats.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.Multimedia.Image.ImagePacker
         * @crossplatform
         * @since 10
         */
        readonly supportedFormats: Array<string>;
    }
    /**
     * Provides basic image operations, including obtaining image information, and reading and writing image data.
     *
     * @typedef Image
     * @syscap SystemCapability.Multimedia.Image.Core
     * @since 9
     */
    interface Image {
        /**
         * Sets or gets the image area to crop, default is size.
         *
         * @type { Region }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        clipRect: Region;
        /**
         * Image size.
         *
         * @type { Size }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        readonly size: Size;
        /**
         * Image format.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
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
         * Get component buffer from image and uses a callback to return the result.
         *
         * @param { ComponentType } componentType The component type of image.
         * @param { AsyncCallback<Component> } callback Callback used to return the component buffer.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        getComponent(componentType: ComponentType, callback: AsyncCallback<Component>): void;
        /**
         * Get component buffer from image and uses a promise to return the result.
         *
         * @param { ComponentType } componentType The component type of image.
         * @returns { Promise<Component> } A Promise instance used to return the component buffer.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        getComponent(componentType: ComponentType): Promise<Component>;
        /**
         * Release current image to receive another and uses a callback to return the result.
         *
         * @param { AsyncCallback<void> } callback Callback to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        release(callback: AsyncCallback<void>): void;
        /**
         * Release current image to receive another and uses a promise to return the result.
         *
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.Core
         * @since 9
         */
        release(): Promise<void>;
    }
    /**
     * Image receiver object.
     *
     * @typedef ImageReceiver
     * @syscap SystemCapability.Multimedia.Image.ImageReceiver
     * @since 9
     */
    interface ImageReceiver {
        /**
         * Image size.
         *
         * @type { Size }
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 9
         */
        readonly size: Size;
        /**
         * Image capacity.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 9
         */
        readonly capacity: number;
        /**
         * Image format.
         *
         * @type { ImageFormat }
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 9
         */
        readonly format: ImageFormat;
        /**
         * Get an id which indicates a surface and can be used to set to Camera or other component can receive a surface
         * and uses a callback to return the result.
         *
         * @param { AsyncCallback<string> } callback Callback used to return the surface id.
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 9
         */
        getReceivingSurfaceId(callback: AsyncCallback<string>): void;
        /**
         * Get an id which indicates a surface and can be used to set to Camera or other component can receive a surface
         * and uses a promise to return the result.
         *
         * @returns { Promise<string> } A Promise instance used to return the surface id.
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 9
         */
        getReceivingSurfaceId(): Promise<string>;
        /**
         * Get lasted image from receiver and uses a callback to return the result.
         *
         * @param { AsyncCallback<Image> } callback Callback used to return the latest image.
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 9
         */
        readLatestImage(callback: AsyncCallback<Image>): void;
        /**
         * Get lasted image from receiver and uses a promise to return the result.
         *
         * @returns { Promise<Image> } A Promise instance used to return the latest image.
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 9
         */
        readLatestImage(): Promise<Image>;
        /**
         * Get next image from receiver and uses a callback to return the result.
         *
         * @param { AsyncCallback<Image> } callback Callback used to return the next image.
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 9
         */
        readNextImage(callback: AsyncCallback<Image>): void;
        /**
         * Get next image from receiver and uses a promise to return the result.
         *
         * @returns { Promise<Image> } A Promise instance used to return the next image.
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 9
         */
        readNextImage(): Promise<Image>;
        /**
         * Subscribe callback when receiving an image
         *
         * @param { 'imageArrival' } type Callback used to return the next image.
         * @param { AsyncCallback<void> } callback Callback used to return image.
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 9
         */
        on(type: 'imageArrival', callback: AsyncCallback<void>): void;
        /**
         * Release image receiver instance and uses a callback to return the result.
         *
         * @param { AsyncCallback<void> } callback Callback to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 9
         */
        release(callback: AsyncCallback<void>): void;
        /**
         * Release image receiver instance and uses a promise to return the result.
         *
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageReceiver
         * @since 9
         */
        release(): Promise<void>;
    }
    /**
     * Image creator object.
     *
     * @typedef ImageCreator
     * @syscap SystemCapability.Multimedia.Image.ImageCreator
     * @since 9
     */
    interface ImageCreator {
        /**
         * Image capacity.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Image.ImageCreator
         * @since 9
         */
        readonly capacity: number;
        /**
         * Image format.
         *
         * @type { ImageFormat }
         * @syscap SystemCapability.Multimedia.Image.ImageCreator
         * @since 9
         */
        readonly format: ImageFormat;
        /**
         * Apply for new graphic buffer from free queue and use a callback to return the result.
         *
         * @param { AsyncCallback<Image> } callback Callback to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageCreator
         * @since 9
         */
        dequeueImage(callback: AsyncCallback<Image>): void;
        /**
         * Apply for new graphic buffer from free queue and uses a promise to return the result.
         *
         * @returns { Promise<Image> } A Promise instance used to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageCreator
         * @since 9
         */
        dequeueImage(): Promise<Image>;
        /**
         * Queue buffer to dirty queue and uses a callback to return the result.
         *
         * @param { Image } interface
         * @param { AsyncCallback<void> } callback Callback to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageCreator
         * @since 9
         */
        queueImage(interface: Image, callback: AsyncCallback<void>): void;
        /**
         * Queue buffer to dirty queue and uses a promise to return the result.
         *
         * @param { Image } interface
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageCreator
         * @since 9
         */
        queueImage(interface: Image): Promise<void>;
        /**
         * Subscribe callback when releasing buffer
         *
         * @param { 'imageRelease' } type Callback used to return the operation result.
         * @param { AsyncCallback<void> } callback Callback used to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageCreator
         * @since 9
         */
        on(type: 'imageRelease', callback: AsyncCallback<void>): void;
        /**
         * Releases buffer in bufferqueue instance and uses a callback to return the result.
         *
         * @param { AsyncCallback<void> } callback Callback to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageCreator
         * @since 9
         */
        release(callback: AsyncCallback<void>): void;
        /**
         * Releases buffer in bufferqueue instance and uses a promise to return the result.
         *
         * @returns { Promise<void> } A Promise instance used to return the operation result.
         * @syscap SystemCapability.Multimedia.Image.ImageCreator
         * @since 9
         */
        release(): Promise<void>;
    }
}
export default image;
