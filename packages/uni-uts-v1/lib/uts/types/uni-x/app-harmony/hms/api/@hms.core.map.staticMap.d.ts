/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Provide map static image.
 * @kit MapKit
 */
import type image from '@ohos.multimedia.image';
import type mapCommon from '@hms.core.map.mapCommon';
import type common from '@ohos.app.ability.common';
/**
 * Returns a map image that enables developer to embed the map as a picture in their own pages.
 *
 * @namespace staticMap
 * @syscap SystemCapability.Map.Core
 * @stagemodelonly
 * @atomicservice
 * @since 4.1.0(11)
 */
declare namespace staticMap {
    /**
     *  Make a map image based on the provided location, image height, and image width.
     *
     * @param { StaticMapOptions } options - Indicates the map image attributes.
     * @returns { Promise<image.PixelMap> } - The map image
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002600005 - The network is unavailable.
     * @throws { BusinessError } 1002600006 - The API call times exceeds the quota.
     * @throws { BusinessError } 1002600007 - The API QPS exceeds the quota.
     * @throws { BusinessError } 1002600008 - The API is in arrears.
     * @throws { BusinessError } 1002600009 - The API have not subscribed to any pay-as-you-go package.
     * @throws { BusinessError } 1002600010 -The server is busy. please wait and try again.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function getMapImage(options: StaticMapOptions): Promise<image.PixelMap>;
    /**
     *  Make a map image based on the provided location, image height, and image width.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { StaticMapOptions } options - Indicates the map image attributes.
     * @returns { Promise<image.PixelMap> } - The map image
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002600005 - The network is unavailable.
     * @throws { BusinessError } 1002600006 - The API call times exceeds the quota.
     * @throws { BusinessError } 1002600007 - The API QPS exceeds the quota.
     * @throws { BusinessError } 1002600008 - The API is in arrears.
     * @throws { BusinessError } 1002600009 - The API have not subscribed to any pay-as-you-go package.
     * @throws { BusinessError } 1002600010 -The server is busy. please wait and try again.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getMapImage(context: common.Context, options: StaticMapOptions): Promise<image.PixelMap>;
    /**
     * The map image attributes
     *
     * @typedef StaticMapOptions
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface StaticMapOptions {
        /**
         * The center point coordinates of the map
         *
         * @type {mapCommon.LatLng}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        location: mapCommon.LatLng;
        /**
         * The zoom level of the map
         *
         * @type {number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        zoom: number;
        /**
         * The width of the image.If scale is 1, value range is (0,1024], and if scale is 2, value range is (0,512].
         *
         * @type {number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        imageWidth: number;
        /**
         * The height of the image.If scale is 1, value range is (0,1024], and if scale is 2, value range is (0,512].
         *
         * @type {number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        imageHeight: number;
        /**
         * For mobile devices, use scale parameter to return higher-resolution map images.
         * The scale value is multiplied with the size to determine the actual output size of the image in pixels,
         * without changing the coverage area of the map.
         * Default scale value is 1; accepted values are 1 and 2.
         *
         * @type {?number}
         * @default 1
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        scale?: number;
        /**
         * The alignment mode of the map logo
         *
         * @type {?mapCommon.LogoAlignment}
         * @default LogoAlignment.BOTTOM_START
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        logoAlignment?: mapCommon.LogoAlignment;
        /**
         * Add markers on the map image.
         *
         * @type {?Array<StaticMapMarker>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        markers?: Array<StaticMapMarker>;
        /**
         * Add path on the map image.
         *
         * @type {?StaticMapPath}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        path?: StaticMapPath;
        /**
         * The day and night mode.
         *
         * @type { ?mapCommon.DayNightMode }
         * @default DayNightMode.DAY
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        dayNightMode?: mapCommon.DayNightMode;
    }
    /**
     * The marker info which will be added on the map image.
     *
     * @typedef StaticMapMarker
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface StaticMapMarker {
        /**
         * Indicates the marker location.
         *
         * @type {mapCommon.LatLng}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        location: mapCommon.LatLng;
        /**
         * Indicates the marker custom icon, which must start with http:// or https://. If not set, system will use the default icon.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        icon?: string;
        /**
         * If use the default icon, choose use which size of the default icon.
         *
         * @type {?IconSize}
         * @default IconSize.NORMAL
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        defaultIconSize?: IconSize;
        /**
         * Indicates the text in the Marker icon.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        font?: string;
        /**
         * Indicates the text color in the Marker icon.The color value is ARGB format.
         *
         * @type {?number}
         * @default 0xff000000
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        fontColor?: number;
        /**
         * Indicates rotation angle of the Marker icon.
         *
         * @type {?number}
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        rotation?: number;
    }
    /**
     * The path info which will be added on the map image.
     *
     * @typedef StaticMapPath
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface StaticMapPath {
        /**
         * Indicates the coordinates of the path.
         *
         * @type {Array<mapCommon.LatLng>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        locations: Array<mapCommon.LatLng>;
        /**
         * Indicates the color of the path.The color value is ARGB format.
         *
         * @type {?number}
         * @default 0xff000000
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        color?: number;
        /**
         * Indicates the fill color of the path. If set the fillColor, the path indicates a polygon.The color value is ARGB format.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        fillColor?: number;
        /**
         * Indicates the width of the path.
         *
         * @type {?number}
         * @default 5
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        width?: number;
    }
    /**
     * The default icon size of static map marker
     *
     * @enum {number}
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    enum IconSize {
        /**
         * Use the smallest icon
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        TINY = 0,
        /**
         * Use the small Icon
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        SMALL = 1,
        /**
         * Use the medium Icon
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        NORMAL = 2
    }
}
export default staticMap;
