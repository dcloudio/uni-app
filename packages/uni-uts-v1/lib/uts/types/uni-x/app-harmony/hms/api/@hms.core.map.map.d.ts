/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Provide the ability to control map behavior.
 * @bundle com.huawei.hms.mapservice.kit/mapLibrary/ets/map 5.0.0(12)
 * @kit MapKit
 */
import type { Callback, ErrorCallback } from '@ohos.base';
import type mapCommon from '@hms.core.map.mapCommon';
import type geoLocationManager from '@ohos.geoLocationManager';
import type Curves from '@ohos.curves';
import type image from '@ohos.multimedia.image';
/**
 * This module provides the ability to control map behavior, including UI and gesture control, event listening, and overlay adding.
 *
 * @namespace map
 * @syscap SystemCapability.Map.Core
 * @stagemodelonly
 * @atomicservice
 * @since 4.1.0(11)
 */
declare namespace map {
    /**
     * This is the main function entry of the map. All map-related methods can be accessed from this interface.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    class MapComponentController {
        /**
         * Updates the camera state as an animation for a specified duration
         * Abnormal values are processed as no response.
         *
         * @param {CameraUpdate} update - Indicates the new camera state.
         * @param {number} duration - Indicates the animate duration, unit is ms. The value is an integer greater than 0. If not set, the default value is 250.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        animateCamera(update: CameraUpdate, duration?: number): void;
        /**
         * Updates the camera status in animation mode and invokes the callback when the update is complete.
         *
         * @param { CameraUpdate } update - Indicates the new camera state.
         * @param { number } [duration] - Indicates the animate duration, unit is ms. The value is an integer greater than 0.Default value is 250.
         * @returns { Promise<AnimateResult> } Return animate result.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        animateCameraStatus(update: CameraUpdate, duration?: number): Promise<AnimateResult>;
        /**
         * Updates the map status and marker in animation mode.
         *
         * @param { CameraUpdate } update - Indicates the new camera state.
         * @param { Marker } marker - Indicates the marker.
         * @param { number } duration - Indicates the animate duration, unit is ms.
         * @returns { Promise<AnimateResult> } Return animate result.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        animateCameraWithMarker(update: CameraUpdate, marker: Marker, duration: number): Promise<AnimateResult>;
        /**
         * Updates the map status and markers in animation mode.
         *
         * @param { CameraUpdate } update - Indicates the new camera state.
         * @param { Array<Marker> } markers - Indicates the markers.
         * @param { number } duration - Indicates the animate duration, unit is ms.
         * @returns { Promise<AnimateResult> } Return animate result.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        animateCameraWithMarkers(update: CameraUpdate, markers: Array<Marker>, duration: number): Promise<AnimateResult>;
        /**
         * Stops the current animation of the map.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        stopAnimation(): void;
        /**
         * remove all shapes, markers, and overlays on the map.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        clear(): void;
        /**
         * Update Camera Status.
         * Abnormal values are processed as no response.
         *
         * @param {CameraUpdate} update - Indicates the new camera state.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        moveCamera(update: CameraUpdate): void;
        /**
         * obtain the current status of map camera.
         *
         * @returns { mapCommon.CameraPosition } - Return the current status of map camera
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getCameraPosition(): mapCommon.CameraPosition;
        /**
         * Constrains the camera target so that when the user moves the map, the camera target does not move out of this boundary.
         * When the latitude of the northeast corner is lower than that of the southwest corner, the interface does not take effect.
         *
         * @param {mapCommon.LatLngBounds} bounds - Constrain the boundaries of the camera target.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setLatLngBounds(bounds: mapCommon.LatLngBounds): void;
        /**
         * Sets a pixel position on the screen as the center point of the map.
         * After this method is used, the map is rotated and tilted based on the set screen coordinates.
         * Abnormal values are processed as no response.
         *
         * @param {mapCommon.MapPoint} point - screen coordinate
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setPointToCenter(point: mapCommon.MapPoint): void;
        /**
         * Set the camera maximum zoom level.Value range is [2,20].
         * If the value is greater than 20, use 20, and if the value is less than 2, use 2.
         * If the value is lower than the current minimum zoom, the minimum zoom will use the same value.
         *
         * @param { number } maxZoom - Indicates the camera maximum zoom level.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setMaxZoom(maxZoom: number): void;
        /**
         * Set the camera minimum zoom level.Value range is [2,20].
         * If the value is greater than 20, use 20, and if the value is less than 2, use 2.
         * If the value is higher than the current maximum zoom, the maximum zoom will use the same value.
         *
         * @param { number } minZoom - Indicates the camera minimum zoom level.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setMinZoom(minZoom: number): void;
        /**
         * Get the camera maximum zoom level.
         *
         * @returns { number } Return the camera maximum zoom level
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getMaxZoom(): number;
        /**
         * Get the camera minimum zoom level.
         *
         * @returns { number } Return the camera minimum zoom level
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getMinZoom(): number;
        /**
         * Turn the traffic layer on or off
         * Abnormal values are handled according to the default values.
         *
         * @param {boolean} enabled - Indicates whether to enable the traffic layer.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setTrafficEnabled(enabled: boolean): void;
        /**
         * Get the enable status of the traffic layer.
         *
         * @returns { boolean } Return the enable status of the traffic layer.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isTrafficEnabled(): boolean;
        /**
         * Turn the 3D building layers on or off.
         * Abnormal values are handled according to the default values.
         *
         * @param {boolean} enabled - Indicates whether to enable the 3D building layer.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setBuildingEnabled(enabled: boolean): void;
        /**
         * Get the enable status of the 3D building layer.
         *
         * @returns {boolean} Return the enable status of the 3D building layer.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isBuildingEnabled(): boolean;
        /**
         * Turn the my location layer on or off.
         * Abnormal values are handled according to the default values.
         *
         * @param {boolean} myLocationEnabled - Indicates whether to enable the my location layer.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setMyLocationEnabled(myLocationEnabled: boolean): void;
        /**
         * Set the location of user.
         * Abnormal values are processed as no response.
         *
         * @param {geoLocationManager.Location} location - Indicates user's location.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setMyLocation(location: geoLocationManager.Location): void;
        /**
         * Set the style of my location layer.
         * If the value of MyLocationStyle's displayType is MyLocationDisplayType.FOLLOW_ROTATE, application should apply ohos.permission.ACCELEROMETER permission.
         *
         * @param {mapCommon.MyLocationStyle} style - Indicates the my location style
         * @returns { Promise<void> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setMyLocationStyle(style: mapCommon.MyLocationStyle): Promise<void>;
        /**
         * Get the enable status of the my location layer.
         *
         * @returns {boolean} Return the enable status of the my location layer.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isMyLocationEnabled(): boolean;
        /**
         * Set the switch for zooming in or out gestures.
         * Abnormal values are handled according to the default values.
         *
         * @param { boolean } enabled - Indicates the switch for zooming in or out gestures.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setZoomGesturesEnabled(enabled: boolean): void;
        /**
         * Return the switch for zooming in or out gestures.
         *
         * @returns { boolean } Return the switch for zooming in or out gestures.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isZoomGesturesEnabled(): boolean;
        /**
         * Set the switch for scrolling gestures.
         * Abnormal values are handled according to the default values.
         *
         * @param { boolean } enabled - Indicates the switch for scrolling gestures.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setScrollGesturesEnabled(enabled: boolean): void;
        /**
         * Return the switch for scrolling gestures.
         *
         * @returns { boolean } Return the switch for scrolling gestures.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isScrollGesturesEnabled(): boolean;
        /**
         * Sets whether to enable rotation gestures.
         * Abnormal values are handled according to the default values.
         *
         * @param { boolean } enabled - Indicates whether to enable rotation gestures.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setRotateGesturesEnabled(enabled: boolean): void;
        /**
         * Return whether to enable rotation gestures.
         *
         * @returns { boolean } Return whether to enable rotation gestures.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isRotateGesturesEnabled(): boolean;
        /**
         * Sets whether to enable tilt gestures.
         * Abnormal values are handled according to the default values.
         *
         * @param { boolean } enabled - Indicates whether to enable tilt gestures.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setTiltGesturesEnabled(enabled: boolean): void;
        /**
         * Return whether to enable tilt gestures.
         *
         * @returns { boolean } Return whether to enable tilt gestures.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isTiltGesturesEnabled(): boolean;
        /**
         * Sets whether to enable the zoom control.
         * Abnormal values are handled according to the default values.
         *
         * @param { boolean } enabled - Indicates whether to enable the zoom control.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setZoomControlsEnabled(enabled: boolean): void;
        /**
         * Return whether to enable the zoom control.
         *
         * @returns { boolean } Return whether to enable the zoom control.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isZoomControlsEnabled(): boolean;
        /**
         * Sets whether to enable the my location control.
         * Abnormal values are handled according to the default values.
         *
         * @param { boolean } enabled - Indicates whether to enable the my location control.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setMyLocationControlsEnabled(enabled: boolean): void;
        /**
         * Return whether to enable the my location control.
         *
         * @returns { boolean } Return whether to enable the my location control.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isMyLocationControlsEnabled(): boolean;
        /**
         * Sets whether to enable the scale control.
         * Abnormal values are handled according to the default values.
         *
         * @param { boolean } enabled - Indicates whether to enable the scale control.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setScaleControlsEnabled(enabled: boolean): void;
        /**
         * Return whether to enable the scale control.
         *
         * @returns { boolean } Return whether to enable the scale control.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isScaleControlsEnabled(): boolean;
        /**
         * Sets whether to enable the compass control.
         * Abnormal values are handled according to the default values.
         *
         * @param { boolean } enabled - Indicates whether to enable the compass control.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setCompassControlsEnabled(enabled: boolean): void;
        /**
         * Return whether to enable the compass control.
         *
         * @returns { boolean } Return whether to enable the compass control.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isCompassControlsEnabled(): boolean;
        /**
         * Sets whether to zoom in or out at the center of the map.
         * Abnormal values are handled according to the default values.
         *
         * @param { boolean } enabled - Indicates whether to zoom in or out at the center of the map.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setGestureScaleByMapCenter(enabled: boolean): void;
        /**
         * Return whether to zoom in or out at the center of the map.
         *
         * @returns { boolean } Return whether to zoom in or out at the center of the map.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isGestureScaleByMapCenter(): boolean;
        /**
         * Set the alignment mode of the map logo
         * Abnormal values are handled according to the default values.
         *
         * @param { mapCommon.LogoAlignment } alignment - Indicates the alignment mode of the map logo
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setLogoAlignment(alignment: mapCommon.LogoAlignment): void;
        /**
         * Set the padding between the map border and the map logo.
         * Abnormal values are processed as no response.
         *
         * @param { mapCommon.Padding } padding - Indicates the padding between the map border and the map logo.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setLogoPadding(padding: mapCommon.Padding): void;
        /**
         * Get the length (in meters) of a 1-pixel point on a map at the current zoom level.
         *
         * @returns { number } Return the length (in meters) of a 1-pixel point on a map at the current zoom level.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getScalePerPixel(): number;
        /**
         * Add a marker to the map. The icon of the marker is displayed in the marker position on the map.
         * When a marker is clicked, the camera moves around the marker.
         *
         * @param {mapCommon.MarkerOptions} options - Indicates the marker attributes.
         * @returns {Promise<Marker>} Return the marker object.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 1002601001 - The object to be operated does not exist.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        addMarker(options: mapCommon.MarkerOptions): Promise<Marker>;
        /**
         * Add a circle to the map.
         *
         * @param { mapCommon.MapCircleOptions } options - Indicates the circle attributes.
         * @returns { Promise<MapCircle> } Return the circle object.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 1002601001 - The object to be operated does not exist.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        addCircle(options: mapCommon.MapCircleOptions): Promise<MapCircle>;
        /**
         * Add a polyline to the map.
         *
         * @param { mapCommon.MapPolylineOptions } options - Indicates the polyline attributes.
         * @returns { Promise<MapPolyline> } Return the polyline object.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 1002601001 - The object to be operated does not exist.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        addPolyline(options: mapCommon.MapPolylineOptions): Promise<MapPolyline>;
        /**
         * Add a polygon to the map.
         *
         * @param { mapCommon.MapPolygonOptions } options - Indicates the polygon attributes.
         * @returns { Promise<MapPolygon> } Return the polygon object.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 1002601001 - The object to be operated does not exist.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        addPolygon(options: mapCommon.MapPolygonOptions): Promise<MapPolygon>;
        /**
         * Add a point annotation to the map.
         *
         * @param { mapCommon.PointAnnotationParams } params - Indicates the point annotation attributes.
         * @returns { Promise<PointAnnotation> } Return the PointAnnotation object.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 1002601001 - The object to be operated does not exist.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        addPointAnnotation(params: mapCommon.PointAnnotationParams): Promise<PointAnnotation>;
        /**
         * Add a bubble to the map.
         *
         * @param { mapCommon.BubbleParams } params - Indicates the bubble attributes.
         * @returns { Promise<Bubble> } Return the bubble object.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 1002601001 - The object to be operated does not exist.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        addBubble(params: mapCommon.BubbleParams): Promise<Bubble>;
        /**
         * Set the boundary padding of the map.
         *
         * @param {mapCommon.Padding} padding - Indicates the boundary padding of the map.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setPadding(padding?: mapCommon.Padding): void;
        /**
         * Get the Projection object, which is used to convert the screen coordinates and longitude and latitude coordinates.
         *
         * @returns {Projection} Return Projection object
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getProjection(): Projection;
        /**
         * Set the custom style id or content.
         *
         * @param { mapCommon.CustomMapStyleOptions } customMapStyleOptions - Indicates the custom style id or content.
         * @returns { Promise<void> }
         * @throws { BusinessError } 1002601002 - The custom map style file does not exist.
         * @throws { BusinessError } 1002601004 - The style content format is incorrect.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setCustomMapStyle(customMapStyleOptions: mapCommon.CustomMapStyleOptions): Promise<void>;
        /**
         * Get the map mode is day or night.
         *
         * @returns { mapCommon.DayNightMode }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getDayNightMode(): mapCommon.DayNightMode;
        /**
         * Set the map mode is day or night.
         *
         * @param { mapCommon.DayNightMode } mode - Indicates the map mode is day or night.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setDayNightMode(mode: mapCommon.DayNightMode): void;
        /**
         * Get the map type.
         *
         * @returns { mapCommon.MapType } Return the map type.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getMapType(): mapCommon.MapType;
        /**
         * Set the map type.
         *
         * @param { mapCommon.MapType } mapType - Indicates the map type.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setMapType(mapType: mapCommon.MapType): void;
        /**
         * Set the scale controller position, which is the offset of the upper left corner of the scale
         * relative to the upper left corner of the map component, in px.
         *
         * @param { mapCommon.MapPoint } point - Indicates the scale controller position.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setScalePosition(point: mapCommon.MapPoint): void;
        /**
         * Get the scale level, and the unit is meter.
         *
         * @returns { number } Return the scale level.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getScaleLevel(): number;
        /**
         * Set the compass controller position, which is the offset of the upper left corner of the compass
         * relative to the upper left corner of the map component, in px.
         *
         * @param { mapCommon.MapPoint } point - Indicates the compass controller position.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setCompassPosition(point: mapCommon.MapPoint): void;
        /**
         * Set whether to allow all gestures.
         *
         * @param { boolean } enabled - Indicates whether to allow all gestures.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setAllGesturesEnabled(enabled: boolean): void;
        /**
         * Return the scale control height, in vp.
         *
         * @returns { number } Return the scale control height.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getScaleControlsHeight(): number;
        /**
         * Return the scale control width, in vp.
         *
         * @returns { number } Return the scale control width.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getScaleControlsWidth(): number;
        /**
         * Sets whether to always show the scale control. This parameter is valid only when the scale is enabled.
         *
         * @param { boolean } enabled - Indicates whether to always show the scale control.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setAlwaysShowScaleEnabled(enabled: boolean): void;
        /**
         * Return whether to always show the scale control.
         *
         * @returns { boolean } Return whether to always show the scale control.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        isAlwaysShowScaleEnabled(): boolean;
        /**
         * Add cluster overlay.
         *
         * @param { mapCommon.ClusterOverlayParams } params - Indicates the cluster overlay parameter.
         * @returns { Promise<ClusterOverlay> } Return ClusterOverlay.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 1002601001 - The object to be operated does not exist.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        addClusterOverlay(params: mapCommon.ClusterOverlayParams): Promise<ClusterOverlay>;
        /**
         * Add image overlay.
         *
         * @param { mapCommon.ImageOverlayParams } params - Indicates the image overlay parameter.
         * @returns { Promise<ImageOverlay> } Return ImageOverlay.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 1002601001 - The object to be operated does not exist.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        addImageOverlay(params: mapCommon.ImageOverlayParams): Promise<ImageOverlay>;
        /**
         * Generating a Map Snapshot.
         *
         * @returns { Promise<image.PixelMap> } Return map snapshot.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        snapshot(): Promise<image.PixelMap>;
        /**
         * Add building overlay.
         *
         * @param { mapCommon.BuildingOverlayParams } params - Indicates the building overlay parameter.
         * @returns { Promise<BuildingOverlay> } Return BuildingOverlay.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 1002601001 - The object to be operated does not exist.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        addBuildingOverlay(params: mapCommon.BuildingOverlayParams): Promise<BuildingOverlay>;
        /**
         * Add trace overlay.If a marker is passed, the marker will move with the trace.
         *
         * @param { mapCommon.TraceOverlayParams } params - Indicates the trace overlay parameter.
         * @param { Array<Marker> } [markers] - Indicates the marker.
         * @returns { Promise<TraceOverlay> } Return TraceOverlay.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 1002601001 - The object to be operated does not exist.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        addTraceOverlay(params: mapCommon.TraceOverlayParams, markers?: Array<Marker>): Promise<TraceOverlay>;
        /**
         * Add arc.
         *
         * @param { mapCommon.MapArcParams } params - Indicates the arc parameter.
         * @returns { MapArc } Return MapArc.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 1002601001 - The object to be operated does not exist.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        addArc(params: mapCommon.MapArcParams): MapArc;
        /**
         * Switch the Map component to the foreground when the onPageShow of the page is triggered.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        show(): void;
        /**
         * Switch the Map component to the background when the onPageHide of the page is triggered.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        hide(): void;
        /**
         * Return map event manager.
         *
         * @returns { MapEventManager } Return MapEventManager.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getEventManager(): MapEventManager;
        /**
         * listening the map camera changes event.
         * This callback is not triggered during motion, but is triggered at the end of the animation.
         *
         * @param {'cameraChange'} type
         * @param {Callback<mapCommon.LatLng>} callback - Indicates the listener when the map camera changes.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'cameraChange', callback: Callback<mapCommon.LatLng>): void;
        /**
         * Cancel listening the map camera changes event.
         *
         * @param {'cameraChange'} type
         * @param {Callback<void>} callback - Cancel listening the map camera changes event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'cameraChange', callback: Callback<void>): void;
        /**
         * listening the map camera idle event.
         *
         * @param {'cameraIdle'} type
         * @param {Callback<void>} callback - Indicates the listener when the map camera is idle.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'cameraIdle', callback: Callback<void>): void;
        /**
         * Cancel listening the map camera idle event.
         *
         * @param {'cameraIdle'} type
         * @param {Callback<void>} callback - Cancel listening the map camera idle event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'cameraIdle', callback: Callback<void>): void;
        /**
         * Listen to the event that the map movement is canceled.
         *
         * @param {'cameraMoveCancel'} type
         * @param {Callback<void>} callback - Indicates the listener when the map movement is canceled.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'cameraMoveCancel', callback: Callback<void>): void;
        /**
         * Cancel listening the map camera move cancel event.
         *
         * @param {'cameraMoveCancel'} type
         * @param {Callback<void>} callback - Cancel listening the map camera move cancel event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'cameraMoveCancel', callback: Callback<void>): void;
        /**
         * Listen to the event that the map movement is moving.
         *
         * @param {'cameraMove'} type
         * @param {Callback<void>} callback - Indicates the listener when the map movement is moving.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'cameraMove', callback: Callback<void>): void;
        /**
         * Cancel listening the map camera move event.
         *
         * @param {'cameraMove'} type
         * @param {Callback<void>} callback - Cancel listening the map camera move event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'cameraMove', callback: Callback<void>): void;
        /**
         * Listen to the event that the map movement start moving.
         *
         * @param {'cameraMoveStart'} type
         * @param {Callback<number>} callback - Indicates the listener when the map movement start moving.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'cameraMoveStart', callback: Callback<number>): void;
        /**
         * Cancel listening the map camera move start event.
         *
         * @param {'cameraMoveStart'} type
         * @param {Callback<void>} callback - Cancel listening the map camera move start event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'cameraMoveStart', callback: Callback<void>): void;
        /**
         * Listen to the event that the map is clicked.
         *
         * @param {'mapClick'} type
         * @param {Callback<mapCommon.LatLng>} callback - Indicates the listener when click the map.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'mapClick', callback: Callback<mapCommon.LatLng>): void;
        /**
         * Cancel listening the map click event.
         *
         * @param {'mapClick'} type
         * @param {Callback<void>} callback - Cancel listening the map click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'mapClick', callback: Callback<void>): void;
        /**
         * Listen to the event that the map is loaded.
         *
         * @param {'mapLoad'} type
         * @param {Callback<void>} callback - Indicates the listener when finish load the map.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'mapLoad', callback: Callback<void>): void;
        /**
         * Cancel listening the map load event.
         *
         * @param {'mapLoad'} type
         * @param {Callback<void>} callback - Cancel listening the map load event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'mapLoad', callback: Callback<void>): void;
        /**
         * Listen to the event that the map is clicked long.
         *
         * @param {'mapLongClick'} type
         * @param {Callback<mapCommon.LatLng>} callback - Indicates the listener when the map is clicked long.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'mapLongClick', callback: Callback<mapCommon.LatLng>): void;
        /**
         * Cancel listening the map long click event.
         *
         * @param {'mapLongClick'} type
         * @param {Callback<void>} callback - Cancel listening the map long click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'mapLongClick', callback: Callback<void>): void;
        /**
         * Listen to the event that my location button is clicked.
         *
         * @param {'myLocationButtonClick'} type
         * @param {Callback<void>} callback - Indicates the listener when my location button is clicked.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'myLocationButtonClick', callback: Callback<void>): void;
        /**
         * Cancel listening the my location button click event.
         *
         * @param {'myLocationButtonClick'} type
         * @param {Callback<void>} callback - Cancel listening the my location button click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'myLocationButtonClick', callback: Callback<void>): void;
        /**
         * Listen to the event that my location layer is clicked.
         *
         * @param {'myLocationClick'} type
         * @param {Callback<mapCommon.LatLng>} callback - Indicates the listener when my location layer is clicked.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'myLocationClick', callback: Callback<mapCommon.LatLng>): void;
        /**
         * Cancel listening the my location layer click event.
         *
         * @param {'myLocationClick'} type
         * @param {Callback<void>} callback - Cancel listening the my location layer click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'myLocationClick', callback: Callback<void>): void;
        /**
         * Listen to the event that the poi on the map is clicked.
         *
         * @param {'poiClick'} type
         * @param {Callback<mapCommon.Poi>} callback - Indicates the listener when the poi on the map is clicked.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'poiClick', callback: Callback<mapCommon.Poi>): void;
        /**
         * Cancel listening the poi click event.
         *
         * @param {'poiClick'} type
         * @param {Callback<void>} callback - Cancel listening the poi click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'poiClick', callback: Callback<void>): void;
        /**
         * Listen to the event that the marker is clicked.
         *
         * @param {'markerClick'} type
         * @param {Callback<Marker>} callback - Indicates the listener when click the marker.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'markerClick', callback: Callback<Marker>): void;
        /**
         * Cancel listening the marker click event.
         *
         * @param {'markerClick'} type
         * @param {Callback<void>} callback - Cancel listening the marker click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'markerClick', callback: Callback<void>): void;
        /**
         * Listen to the event that the marker will be dragged.
         *
         * @param {'markerDragStart'} type
         * @param {Callback<Marker>} callback - Indicates the listener when the marker will be dragged.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'markerDragStart', callback: Callback<Marker>): void;
        /**
         * Cancel listening the marker drag start event.
         *
         * @param {'markerDragStart'} type
         * @param {Callback<void>} callback - Cancel listening the marker drag start event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'markerDragStart', callback: Callback<void>): void;
        /**
         * Listen to the event that the marker is being dragged.
         *
         * @param {'markerDrag'} type
         * @param {Callback<Marker>} callback - Indicates the listener when the marker is being dragged.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'markerDrag', callback: Callback<Marker>): void;
        /**
         * Cancel listening the marker drag event.
         *
         * @param {'markerDrag'} type
         * @param {Callback<void>} callback - Cancel listening the marker drag event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'markerDrag', callback: Callback<void>): void;
        /**
         * Listen to the event that the marker has been dragged.
         *
         * @param {'markerDragEnd'} type
         * @param {Callback<Marker>} callback - Indicates the listener when the marker has been dragged.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'markerDragEnd', callback: Callback<Marker>): void;
        /**
         * Cancel listening the marker drag end event.
         *
         * @param {'markerDragEnd'} type
         * @param {Callback<void>} callback - Cancel listening the marker drag end event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'markerDragEnd', callback: Callback<void>): void;
        /**
         * Listen to the event that the circle is clicked.
         *
         * @param {'circleClick'} type
         * @param {Callback<MapCircle>} callback - Indicates the listener when click the circle.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'circleClick', callback: Callback<MapCircle>): void;
        /**
         * Cancel listening the circle click event.
         *
         * @param {'circleClick'} type
         * @param {Callback<void>} callback - Cancel listening the circle click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'circleClick', callback: Callback<void>): void;
        /**
         * Listen to the event that the polyline is clicked.
         *
         * @param {'polylineClick'} type
         * @param {Callback<MapPolyline>} callback - Indicates the listener when click the polyline.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'polylineClick', callback: Callback<MapPolyline>): void;
        /**
         * Cancel listening the polyline click event.
         *
         * @param {'polylineClick'} type
         * @param {Callback<void>} callback - Cancel listening the polyline click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'polylineClick', callback: Callback<void>): void;
        /**
         * Listen to the event that the polygon is clicked.
         *
         * @param {'polygonClick'} type
         * @param {Callback<MapPolygon>} callback - Indicates the listener when click the polygon.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'polygonClick', callback: Callback<MapPolygon>): void;
        /**
         * Cancel listening the polygon click event.
         *
         * @param {'polygonClick'} type
         * @param {Callback<void>} callback - Cancel listening the polygon click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'polygonClick', callback: Callback<void>): void;
        /**
         * Listen to the info window click event.
         *
         * @param {'infoWindowClick'} type
         * @param {Callback<Marker>} callback - Indicates the listener when click the info window.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'infoWindowClick', callback: Callback<Marker>): void;
        /**
         * Cancel listening the info window click event.
         *
         * @param {'infoWindowClick'} type
         * @param {Callback<void>} callback - Cancel listening the info window click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'infoWindowClick', callback: Callback<void>): void;
        /**
         * Listen to the info window close event.
         *
         * @param {'infoWindowClose'} type
         * @param {Callback<Marker>} callback - Indicates the listener when close the info window.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'infoWindowClose', callback: Callback<Marker>): void;
        /**
         * Cancel listening the info window close event.
         *
         * @param {'infoWindowClose'} type
         * @param {Callback<void>} callback - Cancel listening the info window close event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'infoWindowClose', callback: Callback<void>): void;
        /**
         * Listen to the point annotation click event.
         *
         * @param {'pointAnnotationClick'} type
         * @param {Callback<PointAnnotation>} callback - Indicates the listener when click the point annotation.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'pointAnnotationClick', callback: Callback<PointAnnotation>): void;
        /**
         * Cancel listening the point annotation click event.
         *
         * @param {'pointAnnotationClick'} type
         * @param {Callback<void>} callback - Cancel listening the point annotation click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'pointAnnotationClick', callback: Callback<void>): void;
        /**
         * Listen to the bubble click event.
         *
         * @param {'bubbleClick'} type
         * @param {Callback<Bubble>} callback - Indicates the listener when click the bubble.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'bubbleClick', callback: Callback<Bubble>): void;
        /**
         * Cancel listening the bubble click event.
         *
         * @param {'bubbleClick'} type
         * @param {Callback<void>} callback - Cancel listening the bubble click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'bubbleClick', callback: Callback<void>): void;
        /**
         * Listen to the ImageOverlay click event.
         *
         * @param {'imageOverlayClick'} type
         * @param {Callback<ImageOverlay>} callback - Indicates the listener when click the ImageOverlay.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'imageOverlayClick', callback: Callback<ImageOverlay>): void;
        /**
         * Cancel listening the ImageOverlay click event.
         *
         * @param {'imageOverlayClick'} type
         * @param {Callback<ImageOverlay>} [callback] - Cancel listening the ImageOverlay click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'imageOverlayClick', callback?: Callback<ImageOverlay>): void;
        /**
         * Listen to the error event occurred on the map.
         *
         * @param {'error'} type
         * @param {ErrorCallback} callback - Indicates the listener for map error.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'error', callback: ErrorCallback): void;
        /**
         * Cancel listening the map error event.
         *
         * @param {'error'} type
         * @param {Callback<void>} callback - Cancel listening the map error event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'error', callback: Callback<void>): void;
    }
    /**
     * This interface defines the base overlay, such as Marker, MapCircle, MapPolygon, and etc.
     *
     * @typedef BaseOverlay
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface BaseOverlay {
        /**
         * Return the id of the BaseOverlay.
         *
         * @returns {string} Return the id of the BaseOverlay.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getId(): string;
        /**
         * Return the overlay level of the BaseOverlay.
         *
         * @returns { number } Return the overlay level of the BaseOverlay.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getZIndex(): number;
        /**
         * Return the custom Object of the BaseOverlay.
         *
         * @returns { Object } Return the custom Object of the BaseOverlay.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getTag(): Object;
        /**
         * Return whether the BaseOverlay is visible.
         *
         * @returns { boolean } Return whether the BaseOverlay is visible.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isVisible(): boolean;
        /**
         * Remove the BaseOverlay.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        remove(): void;
        /**
         * Set the overlay level of the BaseOverlay.
         * Abnormal values are processed as no response.
         *
         * @param { number } zIndex - Indicates the overlay level of the BaseOverlay.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setZIndex(zIndex: number): void;
        /**
         * Set the custom Object of the BaseOverlay.
         * If set undefined, system will clear the tag.
         *
         * @param { Object } tag - Indicates the custom Object of the BaseOverlay.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setTag(tag: Object): void;
        /**
         * Set whether the BaseOverlay is visible.
         * Abnormal values are processed as no response.
         *
         * @param { boolean } visible - Indicates whether the BaseOverlay is visible.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setVisible(visible: boolean): void;
    }
    /**
     * Provides interfaces for updating and querying marker.
     *
     * @typedef Marker
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface Marker extends BaseOverlay {
        /**
         * Return the title of the marker's infoWindow.
         *
         * @returns { string } Return the title of the marker's infoWindow.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getTitle(): string;
        /**
         * Return the snippet of the marker's infoWindow.
         *
         * @returns { string } Return the snippet of the marker's infoWindow.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getSnippet(): string;
        /**
         * Return the alpha of the marker's icon.
         *
         * @returns { number } Return the alpha of the marker's icon.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getAlpha(): number;
        /**
         * Return the position of the marker.
         *
         * @returns { mapCommon.LatLng } Return the position of the marker.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getPosition(): mapCommon.LatLng;
        /**
         * Return the rotation direction of the marker's icon.
         *
         * @returns { number } Return the rotation direction of the marker's icon.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getRotation(): number;
        /**
         * Return whether the marker is clickable.
         *
         * @returns { boolean } Return whether the marker is clickable.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isClickable(): boolean;
        /**
         * Return whether the marker is draggable.
         *
         * @returns { boolean } Return whether the marker is draggable.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isDraggable(): boolean;
        /**
         * Return whether the marker's icon is shown on the ground.
         *
         * @returns { boolean } Return whether the marker's icon is shown on the ground.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isFlat(): boolean;
        /**
         * Set the alpha of the marker's icon.
         * Abnormal values are processed as no response.
         *
         * @param { number } alpha - Indicates the alpha of the marker's icon.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setAlpha(alpha: number): void;
        /**
         * Set the clickable switch of the marker.
         * Abnormal values are processed as no response.
         *
         * @param { boolean } clickable - Indicates whether the marker is clickable.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setClickable(clickable: boolean): void;
        /**
         * Set the draggable switch of the marker.
         * Abnormal values are processed as no response.
         *
         * @param { boolean } draggable - Indicates whether the marker is draggable.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setDraggable(draggable: boolean): void;
        /**
         * Set the flat switch of the marker.
         * Abnormal values are processed as no response.
         *
         * @param { boolean }  flat - Indicates whether the marker's icon is shown on the ground.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setFlat(flat: boolean): void;
        /**
         * Set the icon of the marker which is the file URI format.
         * Abnormal values are processed as no response.
         *
         * @param { string } icon - Indicates the icon of the marker.
         * @returns {Promise<void>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        /**
         * Set the icon of the marker.
         *
         * @param { string | image.PixelMap | Resource } icon - Indicates the icon of the marker.
         * @returns {Promise<void>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setIcon(icon: string | image.PixelMap | Resource): Promise<void>;
        /**
         * Set the position of the anchor point of the marker's icon.
         * Abnormal values are processed as no response.
         *
         * @param { number } anchorU - Indicates the position of the anchor point of the marker's icon in the horizontal direction. Value range: [0, 1]
         * @param { number } anchorV - Indicates the position of the anchor point of the marker's icon in the vertical direction. Value range: [0, 1]
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setMarkerAnchor(anchorU: number, anchorV: number): void;
        /**
         * Set the position of the marker.
         * Abnormal values are processed as no response.
         *
         * @param { mapCommon.LatLng } latLng - Indicates the position of the marker.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setPosition(latLng: mapCommon.LatLng): void;
        /**
         * Set the rotation direction of the marker's icon.
         * Abnormal values are processed as no response.
         *
         * @param { number } rotation - Indicates the rotation direction of the marker's icon.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setRotation(rotation: number): void;
        /**
         * Set the title of marker info window.
         * Abnormal values are processed as no response.
         *
         * @param { string } title - Indicates the title of marker info window.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setTitle(title: string): void;
        /**
         * Set the subTitle of marker info window.
         * Abnormal values are processed as no response.
         *
         * @param { string } snippet - Indicates the subTitle of marker info window.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setSnippet(snippet: string): void;
        /**
         * Set the position of the anchor point of the marker info window.
         * Abnormal values are processed as no response.
         *
         * @param { number } anchorU - Indicates the position of the anchor point of the marker info window in the horizontal direction. Value range: [0, 1]
         * @param { number } anchorV - Indicates the position of the anchor point of the marker info window in the vertical direction. Value range: [0, 1]
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setInfoWindowAnchor(anchorU: number, anchorV: number): void;
        /**
         * Set whether the marker info window is visible.
         * Abnormal values are processed as no response.
         *
         * @param { boolean } visible - Indicates whether the marker info window is visible.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setInfoWindowVisible(visible: boolean): void;
        /**
         * Return whether the marker info window is visible.
         *
         * @returns { boolean } Return whether the marker info window is visible.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isInfoWindowVisible(): boolean;
        /**
         * Set the animation object
         *
         * @param {Animation} animation - Indicates the animation object
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setAnimation(animation: Animation): void;
        /**
         * Start animation
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        startAnimation(): void;
        /**
         * Clear animation
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        clearAnimation(): void;
        /**
         * Return altitude, and the unit is meter.
         *
         * @returns { number }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getAltitude(): number;
        /**
         * Set altitude, and the unit is meter.
         *
         * @param { number } altitude - Indicates marker altitude.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setAltitude(altitude: number): void;
    }
    /**
     * Provides interfaces for updating and querying polyline.
     *
     * @typedef MapPolyline
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface MapPolyline extends BaseOverlay {
        /**
         * Return the color of the polyline.
         *
         * @returns { number } Return the color of the polyline.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getColor(): number;
        /**
         * Return the multiple colors of the polyline.
         *
         * @returns { Array<number> } Return the multiple colors of the polyline.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getColors(): Array<number>;
        /**
         * Return the style of the end vertex of the polyline.
         *
         * @returns { mapCommon.CapStyle } Return the style of the end vertex of the polyline.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getEndCap(): mapCommon.CapStyle;
        /**
         * Return the node type of polyline corner.
         *
         * @returns { mapCommon.JointType } Return the node type of polyline corner.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getJointType(): mapCommon.JointType;
        /**
         * Return the stroke pattern styles of the polyline.
         *
         * @returns { Array<mapCommon.PatternItem> } Return the stroke pattern styles of the polyline.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getPatterns(): Array<mapCommon.PatternItem>;
        /**
         * Return the coordinate point list of the polyline.
         *
         * @returns { Array<mapCommon.LatLng> } Return the coordinate point list of the polyline.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getPoints(): Array<mapCommon.LatLng>;
        /**
         * Return the style of the start vertex of the polyline.
         *
         * @returns { mapCommon.CapStyle } Return the style of the start vertex of the polyline.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getStartCap(): mapCommon.CapStyle;
        /**
         * Return the width of the polyline.
         *
         * @returns { number }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getWidth(): number;
        /**
         * Return whether the polyline is clickable.
         *
         * @returns { boolean } Return whether the polyline is clickable.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isClickable(): boolean;
        /**
         * Return whether the polyline is drawn as a geodetic line.
         *
         * @returns { boolean } Return whether the polyline is drawn as a geodetic line.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isGeodesic(): boolean;
        /**
         * Return whether to enable the gradient color if there are multiple colors.
         *
         * @returns { boolean }  Return whether to enable the gradient color if there are multiple colors.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isGradient(): boolean;
        /**
         * Set the clickable switch of the polyline.
         * Abnormal values are processed as no response.
         *
         * @param { boolean } clickable - Indicates whether the polyline is clickable.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setClickable(clickable: boolean): void;
        /**
         * Set the color of the polyline. The color value is ARGB format.
         * Abnormal values are processed as no response.
         *
         * @param { number } color - Indicates the color of the polyline.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setColor(color: number): void;
        /**
         * Set the multiple colors of the polyline. The color value is ARGB format.
         * Abnormal values are processed as no response.
         *
         * @param { Array<number> } colors - Indicates the multiple colors of the polyline.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setColors(colors: Array<number>): void;
        /**
         * Set the style of the end vertex of the polyline.
         * Abnormal values are processed as no response.
         *
         * @param { mapCommon.CapStyle }endCap - Indicates the style of the end vertex of the polyline.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setEndCap(endCap: mapCommon.CapStyle): void;
        /**
         * Set whether polyline is drawn as a geodetic line.
         * Abnormal values are processed as no response.
         *
         * @param { boolean }geodesic - Indicates whether polyline is drawn as a geodetic line.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setGeodesic(geodesic: boolean): void;
        /**
         * Set whether to enable the gradient color if there are multiple colors.
         * Abnormal values are processed as no response.
         *
         * @param { boolean } gradient - Indicates whether to enable the gradient color if there are multiple colors.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setGradient(gradient: boolean): void;
        /**
         * Set the node type of polyline corner.
         * Abnormal values are processed as no response.
         *
         * @param { mapCommon.JointType } jointType - Indicates the node type of polyline corner.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setJointType(jointType: mapCommon.JointType): void;
        /**
         * Set the stroke pattern styles of the polyline.
         * Abnormal values are processed as no response.
         *
         * @param { Array<mapCommon.PatternItem> } patterns - Indicates the stroke pattern styles of the polyline.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setPatterns(patterns: Array<mapCommon.PatternItem>): void;
        /**
         * Set the coordinate point list of the polyline.
         * Abnormal values are processed as no response.
         *
         * @param { Array<mapCommon.LatLng> } points - Indicates the coordinate point list of the polyline.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setPoints(points: Array<mapCommon.LatLng>): void;
        /**
         * Set the style of the start vertex of the polyline.
         * Abnormal values are processed as no response.
         *
         * @param { mapCommon.CapStyle } startCap - Indicates the style of the start vertex of the polyline.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setStartCap(startCap: mapCommon.CapStyle): void;
        /**
         * Set the width of the polyline.
         * Abnormal values are processed as no response.
         *
         * @param { number } width - Indicates the width of the polyline.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setWidth(width: number): void;
        /**
         * Set the custom texture.Recommended that texture has no background color (use transparent color).
         * @param { ResourceStr | image.PixelMap } customTexture - The custom texture.
         * @returns { Promise<void> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setCustomTexture(customTexture: ResourceStr | image.PixelMap): Promise<void>;
    }
    /**
     * Provides interfaces for updating and querying polygon.
     *
     * @typedef MapPolygon
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface MapPolygon extends BaseOverlay {
        /**
         * Return the fill color of the polygon.
         *
         * @returns { number } - Return the fill color of the polygon.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getFillColor(): number;
        /**
         * Return the set of hollow holes in the polygon.
         *
         * @returns { Array<Array<mapCommon.LatLng>> } Return the set of hollow holes in the polygon.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getHoles(): Array<Array<mapCommon.LatLng>>;
        /**
         * Return the coordinate point list of the polygon.
         *
         * @returns { Array<mapCommon.LatLng> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getPoints(): Array<mapCommon.LatLng>;
        /**
         * Return the stroke color of the polygon.
         *
         * @returns { number } Return the stroke color of the polygon.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getStrokeColor(): number;
        /**
         * Return the node type of polygon corner.
         *
         * @returns { mapCommon.JointType } Return the node type of polygon corner.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getJointType(): mapCommon.JointType;
        /**
         * Return the stroke pattern styles of the polygon.
         *
         * @returns { Array<mapCommon.PatternItem> } Return the stroke pattern styles of the polygon.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getPatterns(): Array<mapCommon.PatternItem>;
        /**
         * Return the stroke width of the polygon.
         *
         * @returns { number } Return the stroke width of the polygon.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getStrokeWidth(): number;
        /**
         * Return whether the polygon is clickable.
         *
         * @returns { boolean } Return whether the polygon is clickable.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isClickable(): boolean;
        /**
         * Return whether the polygon is drawn as a geodetic line.
         *
         * @returns { boolean } Return whether the polygon is drawn as a geodetic line.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isGeodesic(): boolean;
        /**
         * Set the clickable switch of the polygon.
         * Abnormal values are processed as no response.
         *
         * @param { boolean } clickable - Indicates whether the polygon is clickable.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setClickable(clickable: boolean): void;
        /**
         * Set the fill color of the polygon. The color value is ARGB format.
         * Abnormal values are processed as no response.
         *
         * @param { number } color - Indicates the fill color of the polygon.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setFillColor(color: number): void;
        /**
         * Set whether the polygon is drawn as a geodetic line.
         * Abnormal values are processed as no response.
         *
         * @param { boolean }geodesic - Indicates whether the polygon is drawn as a geodetic line.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setGeodesic(geodesic: boolean): void;
        /**
         * Set the set of hollow holes in the polygon.
         * Abnormal values are processed as no response.
         *
         * @param { Array<Array<mapCommon.LatLng>> } holes - Indicates the set of hollow holes in the polygon.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setHoles(holes: Array<Array<mapCommon.LatLng>>): void;
        /**
         * Set the coordinate point list of the polygon.
         * Abnormal values are processed as no response.
         *
         * @param { Array<mapCommon.LatLng> } points - Indicates the coordinate point list of the polygon.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setPoints(points: Array<mapCommon.LatLng>): void;
        /**
         * Set the stroke color of the polygon.The color value is ARGB format.
         * Abnormal values are processed as no response.
         *
         * @param { number } color - Indicates the stroke color of the polygon.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setStrokeColor(color: number): void;
        /**
         * Set the node type of polygon corner.
         * Abnormal values are processed as no response.
         *
         * @param { mapCommon.JointType } jointType - Indicates the node type of polygon corner.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setJointType(jointType: mapCommon.JointType): void;
        /**
         * Set the stroke pattern styles of the polygon.
         * Abnormal values are processed as no response.
         *
         * @param { Array<mapCommon.PatternItem> } patterns - Indicates the stroke pattern styles of the polygon.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setPatterns(patterns: Array<mapCommon.PatternItem>): void;
        /**
         * Set the stroke width of the polygon.
         * Abnormal values are processed as no response.
         *
         * @param { number } width - Indicates the stroke width of the polygon.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setStrokeWidth(width: number): void;
    }
    /**
     * Provides interfaces for updating and querying circle.
     *
     * @typedef MapCircle
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface MapCircle extends BaseOverlay {
        /**
         * Return the center position of the circle.
         *
         * @returns { mapCommon.LatLng } Return the center position of the circle.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getCenter(): mapCommon.LatLng;
        /**
         * Return the fill color of the circle.
         *
         * @returns { number } Return the fill color of the circle.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getFillColor(): number;
        /**
         * Return the radius of the circle.
         *
         * @returns { number } Return the radius of the circle.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getRadius(): number;
        /**
         * Return the stroke color of the circle.
         *
         * @returns { number } Return the stroke color of the circle.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getStrokeColor(): number;
        /**
         * Return the stroke pattern styles of the circle.
         *
         * @returns { Array<mapCommon.PatternItem> } Return the stroke pattern styles of the circle.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getPatterns(): Array<mapCommon.PatternItem>;
        /**
         * Return the stroke width of the circle.
         *
         * @returns { number } Return the stroke width of the circle.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getStrokeWidth(): number;
        /**
         * Return whether the circle is clickable.
         *
         * @returns { boolean } Return whether the circle is clickable.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isClickable(): boolean;
        /**
         * Set the center position of the circle.
         * Abnormal values are processed as no response.
         *
         * @param { mapCommon.LatLng } center - Indicates the center position of the circle.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setCenter(center: mapCommon.LatLng): void;
        /**
         * Set the clickable switch of the circle.
         * Abnormal values are processed as no response.
         *
         * @param { boolean } clickable - Indicates whether the circle is clickable.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setClickable(clickable: boolean): void;
        /**
         * Set the fill color of the circle.The color value is ARGB format.
         * Abnormal values are processed as no response.
         *
         * @param { number } color - Indicates the fill color of the circle.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setFillColor(color: number): void;
        /**
         * Set the radius of the circle.
         * Abnormal values are processed as no response.
         *
         * @param { number } radius - Indicates the radius of the circle.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setRadius(radius: number): void;
        /**
         * Set the stroke color of the circle.The color value is ARGB format.
         * Abnormal values are processed as no response.
         *
         * @param { number } color - Indicates the stroke color of the circle.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setStrokeColor(color: number): void;
        /**
         * Set the stroke pattern styles of the circle.
         * Abnormal values are processed as no response.
         *
         * @param { Array<mapCommon.PatternItem> } patterns - Indicates the stroke pattern styles of the circle.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setPatterns(patterns: Array<mapCommon.PatternItem>): void;
        /**
         * Set the stroke width of the circle.
         * Abnormal values are processed as no response.
         *
         * @param { number } width - Indicates the stroke width of the circle.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setStrokeWidth(width: number): void;
    }
    /**
     * Create a new CameraUpdate object to update the camera state.
     *
     * @param { mapCommon.CameraPosition } cameraPosition - Indicate the camera position.
     * @returns { CameraUpdate } Return CameraUpdate object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function newCameraPosition(cameraPosition: mapCommon.CameraPosition): CameraUpdate;
    /**
     * Create a new CameraUpdate object to update the center point and zoom level of the map camera.
     *
     * @param { mapCommon.LatLng } latLng - Indicate the longitude and latitude
     * @param { number } [zoom] - Indicate the zoom level
     * @returns { CameraUpdate } Return CameraUpdate object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function newLatLng(latLng: mapCommon.LatLng, zoom?: number): CameraUpdate;
    /**
     * Create a new CameraUpdate object to set the longitude and latitude range.
     *
     * @param { mapCommon.LatLngBounds } bounds - Indicate the LatLngBounds
     * @param { number } [padding] - Indicate the distance between the map area and the border, in pixels.If not set, use default value 0.
     * @returns { CameraUpdate } Return CameraUpdate object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function newLatLngBounds(bounds: mapCommon.LatLngBounds, padding?: number): CameraUpdate;
    /**
     * Create a new CameraUpdate object which supports setting the screen height and width of the longitude
     * and latitude rectangle range.
     *
     * @param { mapCommon.LatLngBounds } bounds - Indicate the LatLngBounds.
     * @param { number } width - Indicate screen width.
     * @param { number } height - Indicate screen height.
     * @param { number } padding - Indicate the distance between the map area and the border, in pixels.
     * @returns { CameraUpdate } Return CameraUpdate object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function newLatLngBounds(bounds: mapCommon.LatLngBounds, width: number, height: number, padding: number): CameraUpdate;
    /**
     * Create a new CameraUpdate object to move the map camera center by screen pixel.
     *
     * @param { number } x - Pixel value of horizontal movement. A positive value indicates move right, and a negative value indicates move left.
     * @param { number } y - Pixel value of vertical movement. A positive value indicates move up, and a negative value indicates move down.
     * @returns { CameraUpdate } Return CameraUpdate Object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function scrollBy(x: number, y: number): CameraUpdate;
    /**
     * Create a new CameraUpdate object to move the camera in increments by the specified zoom level and center point screen coordinates.
     *
     * @param { number } amount - Indicate the added zoom level
     * @param { mapCommon.MapPoint } [focus] - Indicate the center point screen coordinates.If not set, use the center point of the screen as the focus.
     * @returns { CameraUpdate } Return CameraUpdate object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function zoomBy(amount: number, focus?: mapCommon.MapPoint): CameraUpdate;
    /**
     * Create a new CameraUpdate object to increase the zoom level of the map by one level.
     *
     * @returns { CameraUpdate } Return CameraUpdate Object.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function zoomIn(): CameraUpdate;
    /**
     * Create a new CameraUpdate object to reduce the zoom level of the map by one level.
     *
     * @returns { CameraUpdate } Return CameraUpdate object.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function zoomOut(): CameraUpdate;
    /**
     * Create a new CameraUpdate object to set the zoom level of the map. Value range is [2,20]
     *
     * @param { number } zoom - Indicates the zoom level.
     * @returns { CameraUpdate } Return CameraUpdate object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function zoomTo(zoom: number): CameraUpdate;
    /**
     * Calculates the distance between two coordinate.
     * Abnormal values are processed to return 0.
     *
     * @param {mapCommon.LatLng} from - Indicates the start coordinates
     * @param {mapCommon.LatLng} to - Indicates the end coordinates
     * @returns {number} Return the distance between two coordinate, in meters.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function calculateDistance(from: mapCommon.LatLng, to: mapCommon.LatLng): number;
    /**
     * Coordinate conversion. Currently, only support from WGS84 to GCJ02.
     *
     * @param {mapCommon.CoordinateType} fromType - Indicates the coordinate type before conversion
     * @param {mapCommon.CoordinateType} toType - Indicates the coordinate type after conversion
     * @param {mapCommon.LatLng} location - Indicates the coordinate before conversion
     * @returns {Promise<mapCommon.LatLng>} Return the coordinate after conversion
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function convertCoordinate(fromType: mapCommon.CoordinateType, toType: mapCommon.CoordinateType, location: mapCommon.LatLng): Promise<mapCommon.LatLng>;
    /**
     * Coordinate conversion. Currently, only support from WGS84 to GCJ02.
     *
     * @param {mapCommon.CoordinateType} fromType - Indicates the coordinate type before conversion
     * @param {mapCommon.CoordinateType} toType - Indicates the coordinate type after conversion
     * @param {mapCommon.LatLng} location - Indicates the coordinate before conversion
     * @returns {mapCommon.LatLng} Return the coordinate after conversion
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function convertCoordinateSync(fromType: mapCommon.CoordinateType, toType: mapCommon.CoordinateType, location: mapCommon.LatLng): mapCommon.LatLng;
    /**
     * Provide the camera movement parameters which is created by CameraUpdateFactory.
     *
     * @typedef CameraUpdate
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface CameraUpdate {
    }
    /**
     * This interface defines the overlays that support display priority control, such as PointAnnotation and Bubble.
     *
     * @typedef BasePriorityOverlay
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface BasePriorityOverlay extends BaseOverlay {
        /**
         * Return the max display zoom of the BasePriorityOverlay.
         *
         * @returns { number } Return the max display zoom of the BasePriorityOverlay.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getMaxZoom(): number;
        /**
         * Return the min display zoom of the BasePriorityOverlay.
         *
         * @returns { number } Return the min display zoom of the BasePriorityOverlay.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getMinZoom(): number;
        /**
         * Set the collision priority of the BasePriorityOverlay.
         * Abnormal values are processed as no response.
         *
         * @param { number } priority - Indicates the collision priority of the BasePriorityOverlay.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setPriority(priority: number): void;
        /**
         * Set the max and min display zoom of the BasePriorityOverlay.
         * Abnormal values are processed as no response.
         *
         * @param { number } minZoom - Indicates the min display zoom of the BasePriorityOverlay.
         * @param { number } maxZoom - Indicates the max display zoom of the BasePriorityOverlay.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setZoom(minZoom: number, maxZoom: number): void;
        /**
         * Set the animation object
         *
         * @param {Animation} animation - Indicates the animation object
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setAnimation(animation: Animation): void;
        /**
         * Start animation
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        startAnimation(): void;
        /**
         * Clear animation
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        clearAnimation(): void;
    }
    /**
     * Provides interfaces for updating and querying point annotation.
     *
     * @typedef PointAnnotation
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface PointAnnotation extends BasePriorityOverlay {
        /**
         * Return the position of the point annotation.
         *
         * @returns { mapCommon.LatLng } Return the position of the point annotation.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getPosition(): mapCommon.LatLng;
        /**
         * Return the text of the first title.
         *
         * @returns { mapCommon.Text } Return the text of the first title.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getTitleText(): mapCommon.Text;
        /**
         *
         * Update the text of the first title.
         *
         * @param { mapCommon.Text } text - Indicates the text of the first title.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setTitleText(text: mapCommon.Text): void;
        /**
         * Set the title font size animation.
         *
         * @param { FontSizeAnimation } animation - Indicates the title font size animation.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setTitleAnimation(animation: FontSizeAnimation): void;
        /**
         * Start the title font size animation.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        startTitleAnimation(): void;
    }
    /**
     * Provides interfaces for updating and querying bubble.
     *
     * @typedef Bubble
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface Bubble extends BasePriorityOverlay {
        /**
         * Set the icons in the upper left and lower right positions which are the file URI format.
         * Abnormal values are processed as no response.
         *
         * @param { Array<string> } icons - Indicates the bubble icons.
         * @returns {Promise<void>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        /**
         * Set the icons in the upper left and lower right positions which are the file URI format.
         *
         * @param { Array<string | image.PixelMap | Resource> } icons - Indicates the bubble icons.
         * @returns {Promise<void>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setIcons(icons: Array<string | image.PixelMap | Resource>): Promise<void>;
        /**
         * Set the positions of the bubble.
         * The system calculates the proper positions of the icons based on the multiple position segments.
         * Abnormal values are processed as no response.
         *
         * @param { Array<Array<mapCommon.LatLng>> } positions - Indicates the positions of the bubble.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setPositions(positions: Array<Array<mapCommon.LatLng>>): void;
    }
    /**
     * Used to convert between screen coordinates and longitude and latitude.
     *
     * @typedef Projection
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface Projection {
        /**
         * Converts screen coordinates to longitude and latitude coordinates.
         * Abnormal values are processed to return Number.NaN.
         *
         * @param {mapCommon.MapPoint} point - Indicates the screen coordinates.
         * @returns {mapCommon.LatLng} Return the longitude and latitude coordinates.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        fromScreenLocation(point: mapCommon.MapPoint): mapCommon.LatLng;
        /**
         * Converts longitude and latitude coordinates to screen coordinates.
         * Abnormal values are processed to return 0.
         *
         * @param {mapCommon.LatLng} position - Indicates the longitude and latitude coordinates.
         * @returns {mapCommon.MapPoint} Return the screen coordinates.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        toScreenLocation(position: mapCommon.LatLng): mapCommon.MapPoint;
        /**
         * Returns the coordinates of the current visible region.
         *
         * @returns {mapCommon.VisibleRegion} Return the coordinates of the current visible region.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        getVisibleRegion(): mapCommon.VisibleRegion;
        /**
         * Obtains the target area corresponding to the map control based on the center point and zoom level.
         *
         * @param { mapCommon.LatLng } center - The center point.
         * @param { number } zoom - The zoom level.
         * @returns { mapCommon.LatLngBounds } Return the target area corresponding.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getMapBounds(center: mapCommon.LatLng, zoom: number): mapCommon.LatLngBounds;
    }
    /**
     * LatLngBounds Util.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    class LatLngBoundsUtils {
        /**
         * Determines whether the bounds contains the location.
         *
         * @param {mapCommon.LatLngBounds} bounds - Indicates the map bounds.
         * @param {mapCommon.LatLng} position - Indicates the map location.
         * @returns {boolean} Return the result.true:contain, false:does not contain
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        static contains(bounds: mapCommon.LatLngBounds, position: mapCommon.LatLng): boolean;
        /**
         * Determines whether the src bounds contains the target bounds.
         * @param {mapCommon.LatLngBounds} src - Indicates the src bounds.
         * @param {mapCommon.LatLngBounds} target - Indicates the target bounds.
         * @returns {boolean} Return the result.true:contain, false:does not contain
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        static contains(src: mapCommon.LatLngBounds, target: mapCommon.LatLngBounds): boolean;
        /**
         * Obtains the center longitude and latitude of the bounds.
         *
         * @param {mapCommon.LatLngBounds} bounds - Indicates the map bounds.
         * @returns {mapCommon.LatLng} Return the center longitude and latitude.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        static getCenter(bounds: mapCommon.LatLngBounds): mapCommon.LatLng;
        /**
         * Obtains a new bounds which include the position and old bounds.
         *
         * @param {mapCommon.LatLng} position - Indicates the map location.
         * @param {mapCommon.LatLngBounds} bounds - Indicates the map bounds.
         * @returns {mapCommon.LatLngBounds} Return a new bounds.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        static include(position: mapCommon.LatLng, bounds?: mapCommon.LatLngBounds): mapCommon.LatLngBounds;
    }
    /**
     * An abstract class that controls map animation.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    abstract class Animation {
        /**
         * Animation duration, in milliseconds. The default value is 250 ms.
         * Abnormal values are handled according to the default values.
         *
         * @param { number } duration - Indicates the animation duration
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setDuration(duration: number): void;
        /**
         * The status after animation execution is complete.The default value is AnimationFillMode.FORWARDS.
         * Abnormal values are handled according to the default values.
         *
         * @param { AnimationFillMode } fillMode - Indicates the status after animation execution is complete.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setFillMode(fillMode: AnimationFillMode): void;
        /**
         * Number of times the animation is repeated. The default value is 0.
         * Positive number: Repeat the execution based on the value.
         * 0: The animation is not executed repeatedly.
         * - 1: The number of execution times is infinite.
         * Less than - 1: The default value 0 is used.
         * Abnormal values are handled according to the default values.
         *
         * @param { number } repeatCount - Indicates the number of times the animation is repeated.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setRepeatCount(repeatCount: number): void;
        /**
         * Indicates the repeated execution mode. The default value is AnimationRepeatMode.RESTART.
         * Abnormal values are handled according to the default values.
         *
         * @param { AnimationRepeatMode } repeatMode - Indicates the repeated execution mode.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setRepeatMode(repeatMode: AnimationRepeatMode): void;
        /**
         * Set the animation interpolator.
         *
         * @param { Curves.Curve } curve - Indicates the animation interpolator.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        setInterpolator(curve: Curves.Curve): void;
        /**
         * Listen the animation start event.
         *
         * @param {'start'} type - Indicates the animation start event.
         * @param {Callback<void>} callback - Indicates the callback interface
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'start', callback: Callback<void>): void;
        /**
         * Cancel listening to the animation start event.
         *
         * @param {'start'} type - Indicates the animation start event.
         * @param {Callback<void>} callback - Indicates the callback interface
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'start', callback: Callback<void>): void;
        /**
         * Listen the animation end event.
         *
         * @param {'end'} type - Indicates the animation end event.
         * @param {Callback<void>} callback - Indicates the callback interface
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        on(type: 'end', callback: Callback<void>): void;
        /**
         * Cancel listening to the animation end event.
         *
         * @param {'end'} type - Indicates the animation end event.
         * @param {Callback<void>} callback - Indicates the callback interface
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        off(type: 'end', callback: Callback<void>): void;
        /**
         * Listen the animation start event.
         *
         * @param {'animationStart'} type - Indicates the animation start event.
         * @param {Callback<void>} callback - Indicates the callback interface
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'animationStart', callback: Callback<void>): void;
        /**
         * Cancel listening to the animation start event.
         *
         * @param {'animationStart'} type - Indicates the animation start event.
         * @param {Callback<void>} [callback] - Indicates the callback interface
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'animationStart', callback?: Callback<void>): void;
        /**
         * Listen the animation end event.
         *
         * @param {'animationEnd'} type - Indicates the animation end event.
         * @param {Callback<void>} callback - Indicates the callback interface
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'animationEnd', callback: Callback<void>): void;
        /**
         * Cancel listening to the animation end event.
         *
         * @param {'animationEnd'} type - Indicates the animation end event.
         * @param {Callback<void>} [callback] - Indicates the callback interface
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'animationEnd', callback?: Callback<void>): void;
    }
    /**
     * The animation class that controls the transparency.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    class AlphaAnimation extends Animation {
        /**
         * Creates an AlphaAnimation object with start and target transparency.
         * The transparency range is [0, 1]. The value 1 indicates opaque, and the value 0 indicates complete transparency.
         *
         * @param {number} fromAlpha - Indicates start transparency
         * @param {number} toAlpha - Indicates target transparency
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        constructor(fromAlpha: number, toAlpha: number);
    }
    /**
     * The animation class that controls rotation.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    class RotateAnimation extends Animation {
        /**
         * Creates a RotateAnimation object using the start and target angles.
         * The angles range is [0, 360].
         *
         * @param {number} fromDegree - Indicates start angles
         * @param {number} toDegree - Indicates target angles
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        constructor(fromDegree: number, toDegree: number);
    }
    /**
     * The animation class that controls scaling.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    class ScaleAnimation extends Animation {
        /**
         * Create a ScaleAnimation object using the start and target scale.
         * The value 0 indicates zooming out to disappear.
         * The value 1 indicates no scaling.
         * A value less than 1 indicates zooming out.
         * A value greater than 1 indicates zooming in.
         *
         * @param {number} fromX - Indicates the horizontal zoom applied at the beginning of the animation.
         * @param {number} toX - Indicates the horizontal zoom applied at the end of the animation.
         * @param {number} fromY - Indicates the vertical zoom applied at the beginning of the animation.
         * @param {number} toY - Indicates the vertical zoom applied at the end of the animation.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        constructor(fromX: number, toX: number, fromY: number, toY: number);
    }
    /**
     * The animation class that controls translate.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    class TranslateAnimation extends Animation {
        /**
         * Creates a TranslateAnimation object using the target latitude and longitude.
         *
         * @param {mapCommon.LatLng} target - Indicates target latitude and longitude.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        constructor(target: mapCommon.LatLng);
    }
    /**
     * The animation class that controls font size.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    class FontSizeAnimation extends Animation {
        /**
         * Creates an FontSizeAnimation object with start and target font size.
         *
         * @param {number} fromSize - Indicates start font size
         * @param {number} toSize - Indicates target font size
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        constructor(fromSize: number, toSize: number);
    }
    /**
     * Control the frame animation of multiple pictures.
     * Suggestions and restrictions:
     * 1. Recommended that the image sizes be the same.
     * 2. The number of images cannot exceed 200.
     * 3. The duration must be greater than 33 ms.If not, it will be changed to 33.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    class PlayImageAnimation extends Animation {
        /**
         * Add images.
         *
         * @param { Array<ResourceStr | image.PixelMap> } images - Indicates multiple pictures.
         * @returns { Promise<void> }
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        addImages(images: Array<ResourceStr | image.PixelMap>): Promise<void>;
    }
    /**
     * The animation set.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    class AnimationSet extends Animation {
        /**
         * Creates a AnimationSet object.
         *
         * @param {boolean} shareInterpolator - Indicates whether to share the interpolator.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        constructor(shareInterpolator: boolean);
        /**
         * Add animation.
         *
         * @param {Animation} animation - Indicates the animation object
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        addAnimation(animation: Animation): void;
        /**
         * clear animation.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        clearAnimation(): void;
    }
    /**
     * The cluster overlay.
     *
     * @typedef ClusterOverlay
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface ClusterOverlay {
        /**
         * Listen cluster click event.
         *
         * @param { 'clusterClick' } type
         * @param { Callback<Array<mapCommon.ClusterItem>> } callback - Indicates the listener when click the cluster.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'clusterClick', callback: Callback<Array<mapCommon.ClusterItem>>): void;
        /**
         * Cancel listening cluster click event.
         *
         * @param { 'clusterClick' } type
         * @param { Callback<void> } [callback] - Cancel the listener when click the cluster.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'clusterClick', callback?: Callback<void>): void;
        /**
         * Listen cluster click event.
         *
         * @param { 'click' } type
         * @param { Callback<Array<mapCommon.ClusterItem>> } callback - Indicates the listener when click the cluster.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'click', callback: Callback<Array<mapCommon.ClusterItem>>): void;
        /**
         * Cancel listening cluster click event.
         *
         * @param { 'click' } type
         * @param { Callback<Array<mapCommon.ClusterItem>> } [callback] - Cancel the listener when click the cluster.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'click', callback?: Callback<Array<mapCommon.ClusterItem>>): void;
        /**
         * Add cluster item to the cluster overlay.
         *
         * @param { mapCommon.ClusterItem } item - Indicates the cluster item.
         * @returns { Promise<void> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        addItem(item: mapCommon.ClusterItem): Promise<void>;
        /**
         * Remove cluster overlay.
         *
         * @returns { Promise<void> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        remove(): Promise<void>;
    }
    /**
     * Provides interfaces for updating and querying ImageOverlay.
     *
     * @typedef ImageOverlay
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface ImageOverlay extends BaseOverlay {
        /**
         * Return bearing.
         *
         * @returns { number } Return bearing.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getBearing(): number;
        /**
         * Return bounds.
         *
         * @returns { mapCommon.LatLngBounds } Return bounds.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getBounds(): mapCommon.LatLngBounds;
        /**
         * Return height.
         *
         * @returns { number } Return height.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getHeight(): number;
        /**
         * Return width.
         *
         * @returns { number } Return width.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getWidth(): number;
        /**
         * Return position.
         *
         * @returns { mapCommon.LatLng } Return position.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getPosition(): mapCommon.LatLng;
        /**
         * Return transparency.
         *
         * @returns { number } Return transparency.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getTransparency(): number;
        /**
         * Return whether is clickable.
         *
         * @returns { boolean } Return whether is clickable.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        isClickable(): boolean;
        /**
         * Set bearing.
         *
         * @param { number } bearing - Indicates the bearing.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setBearing(bearing: number): void;
        /**
         * Set the clickable switch.
         *
         * @param { boolean } clickable - Indicates whether is clickable.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setClickable(clickable: boolean): void;
        /**
         * Set the width and height.
         *
         * @param { number } width - Indicates width.
         * @param { number } [height] - Indicates height.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setDimensions(width: number, height?: number): void;
        /**
         * Set the image
         *
         * @param { ResourceStr | image.PixelMap } image - Indicates the image.
         * @returns { Promise<void> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setImage(image: ResourceStr | image.PixelMap): Promise<void>;
        /**
         * Set the bounds
         *
         * @param { mapCommon.LatLngBounds } bounds - Indicates the bounds.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setBounds(bounds: mapCommon.LatLngBounds): void;
        /**
         * Set the position
         *
         * @param { mapCommon.LatLng } position - Indicates the position.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setPosition(position: mapCommon.LatLng): void;
        /**
         * Set the transparency
         *
         * @param { number } transparency - Indicates the transparency.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setTransparency(transparency: number): void;
    }
    /**
     * Spatial Relation Util.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    class SpatialRelationUtil {
        /**
         * Determine whether a point is within a polygonal area.
         *
         * @param { Array<mapCommon.LatLng> } points - Indicates the polygon points.
         * @param { mapCommon.LatLng } point - Indicates the point.
         * @returns { boolean } Return the result.true:contain, false:does not contain
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        static isPointContainedInPolygon(points: Array<mapCommon.LatLng>, point: mapCommon.LatLng): boolean;
    }
    /**
     * The animation is finished or canceled.
     *
     * @typedef AnimateResult
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface AnimateResult {
        /**
         * The animation is finished.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        isFinished?: boolean;
        /**
         * The animation is canceled.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        isCanceled?: boolean;
    }
    /**
     * The marker delegate class for the custom information window.
     *
     * @typedef MarkerDelegate
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface MarkerDelegate {
        /**
         * The marker to display the custom information window.
         *
         * @type { ?Marker }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        marker?: Marker;
    }
    /**
     * Provides interfaces for updating and querying BuildingOverlay.
     *
     * @typedef BuildingOverlay
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface BuildingOverlay {
        /**
         * Return the id of the BuildingOverlay.
         *
         * @returns { string } Return the id of the BuildingOverlay.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getId(): string;
        /**
         * Remove the BuildingOverlay.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        remove(): void;
        /**
         * Set whether to display the side and the top of the building.If want the building not to be displayed,
         * also call setSideVisible(false) and setFloorVisible(false).
         *
         * @param { boolean } visible - Indicates whether to display the side of the building.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setSideVisible(visible: boolean): void;
        /**
         * Set whether to display the selected floor of a building.
         *
         * @param { boolean } visible - Indicates whether to display the selected floor of a building.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setFloorVisible(visible: boolean): void;
        /**
         * Set the height from the bottom of the selected floor to the ground, and the unit is meter.
         *
         * @param { number } height - Indicates the height from the bottom of the selected floor to the ground.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setFloorBottomHeight(height: number): void;
    }
    /**
     * Provides interfaces for updating and querying TraceOverlay.
     *
     * @typedef TraceOverlay
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface TraceOverlay {
        /**
         * Return the id of the TraceOverlay.
         *
         * @returns { string } Return the id of the TraceOverlay.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getId(): string;
        /**
         * Remove the TraceOverlay.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        remove(): void;
        /**
         * Pause track playback.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        pause(): void;
        /**
         * Resume track playback.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        resume(): void;
    }
    /**
     * Provides interfaces for updating and querying MapArc.
     *
     * @typedef MapArc
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface MapArc extends BaseOverlay {
        /**
         * Return color.
         *
         * @returns { number } Return color.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getColor(): number;
        /**
         * Return width.
         *
         * @returns { number } Return width.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        getWidth(): number;
        /**
         * Set color.The color value is ARGB format.
         *
         * @param { number } color - Indicates the color of the arc.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setColor(color: number): void;
        /**
         * Set width.
         *
         * @param { number } width - Indicates the width of the arc.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        setWidth(width: number): void;
    }
    /**
     * Provides map event manager.
     *
     * @typedef MapEventManager
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface MapEventManager {
        /**
         * listening the map camera changes event.
         * This callback is not triggered during motion, but is triggered at the end of the animation.
         *
         * @param {'cameraChange'} type
         * @param {Callback<mapCommon.LatLng>} callback - Indicates the listener when the map camera changes.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'cameraChange', callback: Callback<mapCommon.LatLng>): void;
        /**
         * Cancel listening the map camera changes event.
         *
         * @param {'cameraChange'} type
         * @param {Callback<mapCommon.LatLng>} [callback] - Indicates the listener when the map camera changes.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'cameraChange', callback?: Callback<mapCommon.LatLng>): void;
        /**
         * listening the map camera idle event.
         *
         * @param {'cameraIdle'} type
         * @param {Callback<void>} callback - Indicates the listener when the map camera is idle.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'cameraIdle', callback: Callback<void>): void;
        /**
         * Cancel listening the map camera idle event.
         *
         * @param {'cameraIdle'} type
         * @param {Callback<void>} [callback] - Cancel listening the map camera idle event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'cameraIdle', callback?: Callback<void>): void;
        /**
         * Listen to the event that the map movement is canceled.
         *
         * @param {'cameraMoveCancel'} type
         * @param {Callback<void>} callback - Indicates the listener when the map movement is canceled.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'cameraMoveCancel', callback: Callback<void>): void;
        /**
         * Cancel listening the map camera move cancel event.
         *
         * @param {'cameraMoveCancel'} type
         * @param {Callback<void>} [callback] - Cancel listening the map camera move cancel event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'cameraMoveCancel', callback?: Callback<void>): void;
        /**
         * Listen to the event that the map movement is moving.
         *
         * @param {'cameraMove'} type
         * @param {Callback<void>} callback - Indicates the listener when the map movement is moving.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'cameraMove', callback: Callback<void>): void;
        /**
         * Cancel listening the map camera move event.
         *
         * @param {'cameraMove'} type
         * @param {Callback<void>} [callback] - Cancel listening the map camera move event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'cameraMove', callback?: Callback<void>): void;
        /**
         * Listen to the event that the map movement start moving.
         *
         * @param {'cameraMoveStart'} type
         * @param {Callback<number>} callback - Indicates the listener when the map movement start moving.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'cameraMoveStart', callback: Callback<number>): void;
        /**
         * Cancel listening the map camera move start event.
         *
         * @param {'cameraMoveStart'} type
         * @param {Callback<number>} [callback] - Cancel listening the map camera move start event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'cameraMoveStart', callback?: Callback<number>): void;
        /**
         * Listen to the event that the map is clicked.
         *
         * @param {'mapClick'} type
         * @param {Callback<mapCommon.LatLng>} callback - Indicates the listener when click the map.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'mapClick', callback: Callback<mapCommon.LatLng>): void;
        /**
         * Cancel listening the map click event.
         *
         * @param {'mapClick'} type
         * @param {Callback<mapCommon.LatLng>} [callback] - Cancel listening the map click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'mapClick', callback?: Callback<mapCommon.LatLng>): void;
        /**
         * Listen to the event that the map is loaded.
         *
         * @param {'mapLoad'} type
         * @param {Callback<void>} callback - Indicates the listener when finish load the map.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'mapLoad', callback: Callback<void>): void;
        /**
         * Cancel listening the map load event.
         *
         * @param {'mapLoad'} type
         * @param {Callback<void>} [callback] - Cancel listening the map load event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'mapLoad', callback?: Callback<void>): void;
        /**
         * Listen to the event that the map is clicked long.
         *
         * @param {'mapLongClick'} type
         * @param {Callback<mapCommon.LatLng>} callback - Indicates the listener when the map is clicked long.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'mapLongClick', callback: Callback<mapCommon.LatLng>): void;
        /**
         * Cancel listening the map long click event.
         *
         * @param {'mapLongClick'} type
         * @param {Callback<mapCommon.LatLng>} [callback] - Cancel listening the map long click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'mapLongClick', callback?: Callback<mapCommon.LatLng>): void;
        /**
         * Listen to the event that my location button is clicked.
         *
         * @param {'myLocationButtonClick'} type
         * @param {Callback<void>} callback - Indicates the listener when my location button is clicked.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'myLocationButtonClick', callback: Callback<void>): void;
        /**
         * Cancel listening the my location button click event.
         *
         * @param {'myLocationButtonClick'} type
         * @param {Callback<void>} [callback] - Cancel listening the my location button click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'myLocationButtonClick', callback?: Callback<void>): void;
        /**
         * Listen to the event that my location layer is clicked.
         *
         * @param {'myLocationClick'} type
         * @param {Callback<mapCommon.LatLng>} callback - Indicates the listener when my location layer is clicked.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'myLocationClick', callback: Callback<mapCommon.LatLng>): void;
        /**
         * Cancel listening the my location layer click event.
         *
         * @param {'myLocationClick'} type
         * @param {Callback<mapCommon.LatLng>} [callback] - Cancel listening the my location layer click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'myLocationClick', callback?: Callback<mapCommon.LatLng>): void;
        /**
         * Listen to the event that the poi on the map is clicked.
         *
         * @param {'poiClick'} type
         * @param {Callback<mapCommon.Poi>} callback - Indicates the listener when the poi on the map is clicked.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'poiClick', callback: Callback<mapCommon.Poi>): void;
        /**
         * Cancel listening the poi click event.
         *
         * @param {'poiClick'} type
         * @param {Callback<mapCommon.Poi>} [callback] - Cancel listening the poi click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'poiClick', callback?: Callback<mapCommon.Poi>): void;
        /**
         * Listen to the event that the marker is clicked.
         *
         * @param {'markerClick'} type
         * @param {Callback<Marker>} callback - Indicates the listener when click the marker.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'markerClick', callback: Callback<Marker>): void;
        /**
         * Cancel listening the marker click event.
         *
         * @param {'markerClick'} type
         * @param {Callback<Marker>} [callback] - Cancel listening the marker click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'markerClick', callback?: Callback<Marker>): void;
        /**
         * Listen to the event that the marker will be dragged.
         *
         * @param {'markerDragStart'} type
         * @param {Callback<Marker>} callback - Indicates the listener when the marker will be dragged.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'markerDragStart', callback: Callback<Marker>): void;
        /**
         * Cancel listening the marker drag start event.
         *
         * @param {'markerDragStart'} type
         * @param {Callback<Marker>} [callback] - Cancel listening the marker drag start event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'markerDragStart', callback?: Callback<Marker>): void;
        /**
         * Listen to the event that the marker is being dragged.
         *
         * @param {'markerDrag'} type
         * @param {Callback<Marker>} callback - Indicates the listener when the marker is being dragged.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'markerDrag', callback: Callback<Marker>): void;
        /**
         * Cancel listening the marker drag event.
         *
         * @param {'markerDrag'} type
         * @param {Callback<Marker>} [callback] - Cancel listening the marker drag event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'markerDrag', callback?: Callback<Marker>): void;
        /**
         * Listen to the event that the marker has been dragged.
         *
         * @param {'markerDragEnd'} type
         * @param {Callback<Marker>} callback - Indicates the listener when the marker has been dragged.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'markerDragEnd', callback: Callback<Marker>): void;
        /**
         * Cancel listening the marker drag end event.
         *
         * @param {'markerDragEnd'} type
         * @param {Callback<Marker>} [callback] - Cancel listening the marker drag end event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'markerDragEnd', callback?: Callback<Marker>): void;
        /**
         * Listen to the event that the circle is clicked.
         *
         * @param {'circleClick'} type
         * @param {Callback<MapCircle>} callback - Indicates the listener when click the circle.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'circleClick', callback: Callback<MapCircle>): void;
        /**
         * Cancel listening the circle click event.
         *
         * @param {'circleClick'} type
         * @param {Callback<MapCircle>} [callback] - Cancel listening the circle click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'circleClick', callback?: Callback<MapCircle>): void;
        /**
         * Listen to the event that the polyline is clicked.
         *
         * @param {'polylineClick'} type
         * @param {Callback<MapPolyline>} callback - Indicates the listener when click the polyline.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'polylineClick', callback: Callback<MapPolyline>): void;
        /**
         * Cancel listening the polyline click event.
         *
         * @param {'polylineClick'} type
         * @param {Callback<MapPolyline>} [callback] - Cancel listening the polyline click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'polylineClick', callback?: Callback<MapPolyline>): void;
        /**
         * Listen to the event that the polygon is clicked.
         *
         * @param {'polygonClick'} type
         * @param {Callback<MapPolygon>} callback - Indicates the listener when click the polygon.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'polygonClick', callback: Callback<MapPolygon>): void;
        /**
         * Cancel listening the polygon click event.
         *
         * @param {'polygonClick'} type
         * @param {Callback<MapPolygon>} [callback] - Cancel listening the polygon click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'polygonClick', callback?: Callback<MapPolygon>): void;
        /**
         * Listen to the info window click event.
         *
         * @param {'infoWindowClick'} type
         * @param {Callback<Marker>} callback - Indicates the listener when click the info window.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'infoWindowClick', callback: Callback<Marker>): void;
        /**
         * Cancel listening the info window click event.
         *
         * @param {'infoWindowClick'} type
         * @param {Callback<Marker>} [callback] - Cancel listening the info window click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'infoWindowClick', callback?: Callback<Marker>): void;
        /**
         * Listen to the info window close event.
         *
         * @param {'infoWindowClose'} type
         * @param {Callback<Marker>} callback - Indicates the listener when close the info window.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'infoWindowClose', callback: Callback<Marker>): void;
        /**
         * Cancel listening the info window close event.
         *
         * @param {'infoWindowClose'} type
         * @param {Callback<Marker>} [callback] - Cancel listening the info window close event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'infoWindowClose', callback?: Callback<Marker>): void;
        /**
         * Listen to the point annotation click event.
         *
         * @param {'pointAnnotationClick'} type
         * @param {Callback<PointAnnotation>} callback - Indicates the listener when click the point annotation.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'pointAnnotationClick', callback: Callback<PointAnnotation>): void;
        /**
         * Cancel listening the point annotation click event.
         *
         * @param {'pointAnnotationClick'} type
         * @param {Callback<PointAnnotation>} [callback] - Cancel listening the point annotation click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'pointAnnotationClick', callback?: Callback<PointAnnotation>): void;
        /**
         * Listen to the bubble click event.
         *
         * @param {'bubbleClick'} type
         * @param {Callback<Bubble>} callback - Indicates the listener when click the bubble.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'bubbleClick', callback: Callback<Bubble>): void;
        /**
         * Cancel listening the bubble click event.
         *
         * @param {'bubbleClick'} type
         * @param {Callback<Bubble>} [callback] - Cancel listening the bubble click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'bubbleClick', callback?: Callback<Bubble>): void;
        /**
         * Listen to the ImageOverlay click event.
         *
         * @param {'imageOverlayClick'} type
         * @param {Callback<ImageOverlay>} callback - Indicates the listener when click the ImageOverlay.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'imageOverlayClick', callback: Callback<ImageOverlay>): void;
        /**
         * Cancel listening the ImageOverlay click event.
         *
         * @param {'imageOverlayClick'} type
         * @param {Callback<ImageOverlay>} [callback] - Cancel listening the ImageOverlay click event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'imageOverlayClick', callback?: Callback<ImageOverlay>): void;
        /**
         * Listen to the error event occurred on the map.
         *
         * @param {'error'} type
         * @param {ErrorCallback} callback - Indicates the listener for map error.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        on(type: 'error', callback: ErrorCallback): void;
        /**
         * Cancel listening the map error event.
         *
         * @param {'error'} type
         * @param {ErrorCallback} [callback] - Cancel listening the map error event.
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        off(type: 'error', callback?: ErrorCallback): void;
    }
    /**
     * The animation fill mode.
     *
     * @enum {number}
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    enum AnimationFillMode {
        /**
         * The animation remains at the last frame after execution.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        FORWARDS = 0,
        /**
         * The animation remains at the first frame after execution.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        BACKWARDS = 1
    }
    /**
     * The animation repeat mode.
     *
     * @enum {number}
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    enum AnimationRepeatMode {
        /**
         * Play from the beginning when the animation is over.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        RESTART = 0,
        /**
         * Rewind from the end of the animation.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        REVERSE = 1
    }
}
export default map;
