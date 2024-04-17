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
 * @kit LocationKit
 */
import { AsyncCallback, Callback } from './@ohos.base';
import { WantAgent } from './@ohos.wantAgent';
/**
 * Provides interfaces for acquiring location information, managing location switches,
 * geocoding, reverse geocoding, country code, fencing and other functions.
 *
 * @namespace geoLocationManager
 * @since 9
 */
/**
 * Provides interfaces for acquiring location information, managing location switches,
 * geocoding, reverse geocoding, country code, fencing and other functions.
 *
 * @namespace geoLocationManager
 * @atomicservice
 * @since 11
 */
declare namespace geoLocationManager {
    /**
     * Subscribe location changed.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { 'locationChange' } type - Indicates the location service event to be subscribed to.
     * @param { LocationRequest } request - Indicates the location request parameters.
     * @param { Callback<Location> } callback - Indicates the callback for reporting the location result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    /**
     * Subscribe location changed.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { 'locationChange' } type - Indicates the location service event to be subscribed to.
     * @param { LocationRequest } request - Indicates the location request parameters.
     * @param { Callback<Location> } callback - Indicates the callback for reporting the location result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Core
     * @atomicservice
     * @since 11
     */
    function on(type: 'locationChange', request: LocationRequest, callback: Callback<Location>): void;
    /**
     * Unsubscribe location changed.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { 'locationChange' } type - Indicates the location service event to be subscribed to.
     * @param { Callback<Location> } [callback] - Indicates the callback for reporting the location result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    /**
     * Unsubscribe location changed.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { 'locationChange' } type - Indicates the location service event to be subscribed to.
     * @param { Callback<Location> } [callback] - Indicates the callback for reporting the location result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Core
     * @atomicservice
     * @since 11
     */
    function off(type: 'locationChange', callback?: Callback<Location>): void;
    /**
     * Subscribe location switch changed.
     *
     * @param { 'locationEnabledChange' } type - Indicates the location service event to be subscribed to.
     * @param { Callback<boolean> } callback - Indicates the callback for reporting the location switch status.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function on(type: 'locationEnabledChange', callback: Callback<boolean>): void;
    /**
     * Unsubscribe location switch changed.
     *
     * @param { 'locationEnabledChange' } type - Indicates the location service event to be subscribed to.
     * @param { Callback<boolean> } [callback] - Indicates the callback for reporting the location switch status.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function off(type: 'locationEnabledChange', callback?: Callback<boolean>): void;
    /**
     * Subscribe to cache GNSS locations update messages.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { 'cachedGnssLocationsChange' } type - Indicates the location service event to be subscribed to.
     * @param { CachedGnssLocationsRequest } request - Indicates the cached GNSS locations request parameters.
     * @param { Callback<Array<Location>> } callback - Indicates the callback for reporting the cached GNSS locations.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function on(type: 'cachedGnssLocationsChange', request: CachedGnssLocationsRequest, callback: Callback<Array<Location>>): void;
    /**
     * Unsubscribe to cache GNSS locations update messages.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { 'cachedGnssLocationsChange' } type - Indicates the location service event to be subscribed to.
     * @param { Callback<Array<Location>> } [callback] - Indicates the callback for reporting the cached gnss locations.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function off(type: 'cachedGnssLocationsChange', callback?: Callback<Array<Location>>): void;
    /**
     * Subscribe satellite status changed.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { 'satelliteStatusChange' } type - Indicates the location service event to be subscribed to.
     * @param { Callback<SatelliteStatusInfo> } callback - Indicates the callback for reporting the satellite status.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function on(type: 'satelliteStatusChange', callback: Callback<SatelliteStatusInfo>): void;
    /**
     * Unsubscribe satellite status changed.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { 'satelliteStatusChange' } type - Indicates the location service event to be subscribed to.
     * @param { Callback<SatelliteStatusInfo> } [callback] - Indicates the callback for reporting the satellite status.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function off(type: 'satelliteStatusChange', callback?: Callback<SatelliteStatusInfo>): void;
    /**
     * Subscribe nmea message changed.
     *
     * @permission ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION
     * @param { 'nmeaMessage' } type - Indicates the location service event to be subscribed to.
     * @param { Callback<string> } callback - Indicates the callback for reporting the nmea message.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function on(type: 'nmeaMessage', callback: Callback<string>): void;
    /**
     * Unsubscribe nmea message changed.
     *
     * @permission ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION
     * @param { 'nmeaMessage' } type - Indicates the location service event to be subscribed to.
     * @param { Callback<string> } [callback] - Indicates the callback for reporting the nmea message.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function off(type: 'nmeaMessage', callback?: Callback<string>): void;
    /**
     * Add a geofence and subscribe geo fence status changed.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { 'gnssFenceStatusChange' } type - Indicates the location service event to be subscribed to.
     * @param { GeofenceRequest } request - Indicates the Geo-fence configuration parameters.
     * @param { WantAgent } want - Indicates which ability to start when the geofence event is triggered.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301600 - Failed to operate the geofence.
     * @syscap SystemCapability.Location.Location.Geofence
     * @since 9
     */
    function on(type: 'gnssFenceStatusChange', request: GeofenceRequest, want: WantAgent): void;
    /**
     * Remove a geofence and unsubscribe geo fence status changed.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { 'gnssFenceStatusChange' } type - Indicates the location service event to be subscribed to.
     * @param { GeofenceRequest } request - Indicates the Geo-fence configuration parameters.
     * @param { WantAgent } want - Indicates which ability to start when the geofence event is triggered.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301600 - Failed to operate the geofence.
     * @syscap SystemCapability.Location.Location.Geofence
     * @since 9
     */
    function off(type: 'gnssFenceStatusChange', request: GeofenceRequest, want: WantAgent): void;
    /**
     * Registering the callback function for listening to country code changes.
     *
     * @param { 'countryCodeChange' } type - Indicates the location service event to be subscribed to.
     * @param { Callback<CountryCode> } callback - Indicates the callback for reporting country code changes.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301500 - Failed to query the area information.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function on(type: 'countryCodeChange', callback: Callback<CountryCode>): void;
    /**
     * Unregistering the callback function for listening to country code changes.
     *
     * @param { 'countryCodeChange' } type - Indicates the location service event to be subscribed to.
     * @param { Callback<CountryCode> } [callback] - Indicates the callback for reporting country code changes.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301500 - Failed to query the area information.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function off(type: 'countryCodeChange', callback?: Callback<CountryCode>): void;
    /**
     * Obtain current location.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { CurrentLocationRequest } request - Indicates the location request parameters.
     * @param { AsyncCallback<Location> } callback - Indicates the callback for reporting the location result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    /**
     * Obtain current location.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { CurrentLocationRequest } request - Indicates the location request parameters.
     * @param { AsyncCallback<Location> } callback - Indicates the callback for reporting the location result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Core
     * @atomicservice
     * @since 11
     */
    function getCurrentLocation(request: CurrentLocationRequest, callback: AsyncCallback<Location>): void;
    /**
     * Obtain current location.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { AsyncCallback<Location> } callback - Indicates the callback for reporting the location result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    /**
     * Obtain current location.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { AsyncCallback<Location> } callback - Indicates the callback for reporting the location result.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Core
     * @atomicservice
     * @since 11
     */
    function getCurrentLocation(callback: AsyncCallback<Location>): void;
    /**
     * Obtain current location.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { CurrentLocationRequest } [request] - Indicates the location request parameters.
     * @returns { Promise<Location> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    /**
     * Obtain current location.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { CurrentLocationRequest } [request] - Indicates the location request parameters.
     * @returns { Promise<Location> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Core
     * @atomicservice
     * @since 11
     */
    function getCurrentLocation(request?: CurrentLocationRequest): Promise<Location>;
    /**
     * Obtain last known location.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @returns { Location } The last known location information.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    /**
     * Obtain last known location.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @returns { Location } The last known location information.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Core
     * @atomicservice
     * @since 11
     */
    function getLastLocation(): Location;
    /**
     * Obtain current location switch status.
     *
     * @returns { boolean } Returns {@code true} if the location switch on, returns {@code false} otherwise.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    /**
     * Obtain current location switch status.
     *
     * @returns { boolean } Returns {@code true} if the location switch on, returns {@code false} otherwise.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @atomicservice
     * @since 11
     */
    function isLocationEnabled(): boolean;
    /**
     * Obtain address info from location.
     *
     * @param { ReverseGeoCodeRequest } request - Indicates the reverse geocode query parameters.
     * @param { AsyncCallback<Array<GeoAddress>> } callback - Indicates the callback for reporting the address info.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301300 - Reverse geocoding query failed.
     * @syscap SystemCapability.Location.Location.Geocoder
     * @since 9
     */
    function getAddressesFromLocation(request: ReverseGeoCodeRequest, callback: AsyncCallback<Array<GeoAddress>>): void;
    /**
     * Obtain address info from location.
     *
     * @param { ReverseGeoCodeRequest } request - Indicates the reverse geocode query parameters.
     * @returns { Promise<Array<GeoAddress>> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301300 - Reverse geocoding query failed.
     * @syscap SystemCapability.Location.Location.Geocoder
     * @since 9
     */
    function getAddressesFromLocation(request: ReverseGeoCodeRequest): Promise<Array<GeoAddress>>;
    /**
     * Obtain latitude and longitude info from location address.
     *
     * @param { GeoCodeRequest } request - Indicates the geocode query parameters.
     * @param { AsyncCallback<Array<GeoAddress>> } callback - Indicates the callback for reporting the latitude and longitude result.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301400 - Geocoding query failed.
     * @syscap SystemCapability.Location.Location.Geocoder
     * @since 9
     */
    function getAddressesFromLocationName(request: GeoCodeRequest, callback: AsyncCallback<Array<GeoAddress>>): void;
    /**
     * Obtain latitude and longitude info from location address.
     *
     * @param { GeoCodeRequest } request - Indicates the geocode query parameters.
     * @returns { Promise<Array<GeoAddress>> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301400 - Geocoding query failed.
     * @syscap SystemCapability.Location.Location.Geocoder
     * @since 9
     */
    function getAddressesFromLocationName(request: GeoCodeRequest): Promise<Array<GeoAddress>>;
    /**
     * Obtain geocoding service status.
     *
     * @returns { boolean } Returns {@code true} if geocoding service is available, returns {@code false} otherwise.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Geocoder
     * @since 9
     */
    function isGeocoderAvailable(): boolean;
    /**
     * Obtain the number of cached GNSS locations reported at a time.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { AsyncCallback<number> } callback - Indicates the callback for reporting the cached GNSS locations size.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function getCachedGnssLocationsSize(callback: AsyncCallback<number>): void;
    /**
     * Obtain the number of cached GNSS locations.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @returns { Promise<number> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function getCachedGnssLocationsSize(): Promise<number>;
    /**
     * All prepared GNSS locations are returned to the application through the callback function,
     * and the bottom-layer buffer is cleared.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { AsyncCallback<void> } callback - Indicates the callback for reporting the error message.
     * If the function fails to execute, the error message will be carried in the first parameter err of AsyncCallback,
     * If the function executes successfully, execute the callback function only, no data will be returned.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function flushCachedGnssLocations(callback: AsyncCallback<void>): void;
    /**
     * All prepared GNSS locations are returned to the application,
     * and the bottom-layer buffer is cleared.
     *
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function flushCachedGnssLocations(): Promise<void>;
    /**
     * Send extended commands to location subsystem.
     *
     * @param { LocationCommand } command - Indicates the extended command message body.
     * @param { AsyncCallback<void> } callback - Indicates the callback for reporting the error message.
     * If the function fails to execute, the error message will be carried in the first parameter err of AsyncCallback,
     * If the function executes successfully, execute the callback function only, no data will be returned.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function sendCommand(command: LocationCommand, callback: AsyncCallback<void>): void;
    /**
     * Send extended commands to location subsystem.
     *
     * @param { LocationCommand } command - Indicates the extended command message body.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function sendCommand(command: LocationCommand): Promise<void>;
    /**
     * Obtain the current country code.
     *
     * @param { AsyncCallback<CountryCode> } callback - Indicates the callback for reporting the country code.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301500 - Failed to query the area information.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function getCountryCode(callback: AsyncCallback<CountryCode>): void;
    /**
     * Obtain the current country code.
     *
     * @returns { Promise<CountryCode> } The promise returned by the function.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301500 - Failed to query the area information.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function getCountryCode(): Promise<CountryCode>;
    /**
     * Satellite status information.
     *
     * @typedef SatelliteStatusInfo
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    export interface SatelliteStatusInfo {
        /**
         * Number of satellites.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Gnss
         * @since 9
         */
        satellitesNumber: number;
        /**
         * Satellite ID array.
         *
         * @type { Array<number> }
         * @syscap SystemCapability.Location.Location.Gnss
         * @since 9
         */
        satelliteIds: Array<number>;
        /**
         * Carrier to noise density array.
         *
         * @type { Array<number> }
         * @syscap SystemCapability.Location.Location.Gnss
         * @since 9
         */
        carrierToNoiseDensitys: Array<number>;
        /**
         * Satellite altitude array.
         *
         * @type { Array<number> }
         * @syscap SystemCapability.Location.Location.Gnss
         * @since 9
         */
        altitudes: Array<number>;
        /**
         * Satellite azimuth array.
         *
         * @type { Array<number> }
         * @syscap SystemCapability.Location.Location.Gnss
         * @since 9
         */
        azimuths: Array<number>;
        /**
         * Satellite carrier frequency array.
         *
         * @type { Array<number> }
         * @syscap SystemCapability.Location.Location.Gnss
         * @since 9
         */
        carrierFrequencies: Array<number>;
    }
    /**
     * Parameters for requesting to report cache location information.
     *
     * @typedef CachedGnssLocationsRequest
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    export interface CachedGnssLocationsRequest {
        /**
         * GNSS cache location report period.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Gnss
         * @since 9
         */
        reportingPeriodSec: number;
        /**
         * Indicates whether to wake up the listener when the GNSS cache location queue is full.
         *
         * @type { boolean }
         * @syscap SystemCapability.Location.Location.Gnss
         * @since 9
         */
        wakeUpCacheQueueFull: boolean;
    }
    /**
     * Configuring parameters in geo fence requests.
     *
     * @typedef GeofenceRequest
     * @syscap SystemCapability.Location.Location.Geofence
     * @since 9
     */
    export interface GeofenceRequest {
        /**
         * Indicate the user scenario.
         *
         * @type { LocationRequestScenario }
         * @syscap SystemCapability.Location.Location.Geofence
         * @since 9
         */
        scenario: LocationRequestScenario;
        /**
         * Circular fence information.
         *
         * @type { Geofence }
         * @syscap SystemCapability.Location.Location.Geofence
         * @since 9
         */
        geofence: Geofence;
    }
    /**
     * Circular fence information.
     *
     * @typedef Geofence
     * @syscap SystemCapability.Location.Location.Geofence
     * @since 9
     */
    export interface Geofence {
        /**
         * Latitude of the center point of the circular fence.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Geofence
         * @since 9
         */
        latitude: number;
        /**
         * Longitude of the center point of the circular fence.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Geofence
         * @since 9
         */
        longitude: number;
        /**
         * Radius of the circular fence.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Geofence
         * @since 9
         */
        radius: number;
        /**
         * Expiration of the circular fence.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Geofence
         * @since 9
         */
        expiration: number;
    }
    /**
     * Configuring parameters in reverse geocode requests.
     *
     * @typedef ReverseGeoCodeRequest
     * @syscap SystemCapability.Location.Location.Geocoder
     * @since 9
     */
    export interface ReverseGeoCodeRequest {
        /**
         * Indicates the language area information.
         *
         * @type { ?string }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        locale?: string;
        /**
         * Latitude for reverse geocoding query.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        latitude: number;
        /**
         * Longitude for reverse geocoding query.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        longitude: number;
        /**
         * Indicates the maximum number of addresses returned by reverse geocoding query.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        maxItems?: number;
    }
    /**
     * Configuring parameters in geocode requests.
     *
     * @typedef GeoCodeRequest
     * @syscap SystemCapability.Location.Location.Geocoder
     * @since 9
     */
    export interface GeoCodeRequest {
        /**
         * Indicates the language area information.
         *
         * @type { ?string }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        locale?: string;
        /**
         * Address information.
         *
         * @type { string }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        description: string;
        /**
         * Indicates the maximum number of geocode query results.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        maxItems?: number;
        /**
         * Indicates the minimum latitude for geocoding query results.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        minLatitude?: number;
        /**
         * Indicates the minimum longitude for geocoding query results.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        minLongitude?: number;
        /**
         * Indicates the maximum latitude for geocoding query results.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        maxLatitude?: number;
        /**
         * Indicates the maximum longitude for geocoding query results.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        maxLongitude?: number;
    }
    /**
     * Data struct describes geographic locations.
     *
     * @typedef GeoAddress
     * @syscap SystemCapability.Location.Location.Geocoder
     * @since 9
     */
    export interface GeoAddress {
        /**
         * Indicates latitude information.
         * A positive value indicates north latitude,
         * and a negative value indicates south latitude.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        latitude?: number;
        /**
         * Indicates longitude information.
         * A positive value indicates east longitude ,
         * and a negative value indicates west longitude.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        longitude?: number;
        /**
         * Indicates language used for the location description.
         * zh indicates Chinese, and en indicates English.
         *
         * @type { ?string }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        locale?: string;
        /**
         * Indicates landmark of the location.
         *
         * @type { ?string }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        placeName?: string;
        /**
         * Indicates country code.
         *
         * @type { ?string }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        countryCode?: string;
        /**
         * Indicates country name.
         *
         * @type { ?string }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        countryName?: string;
        /**
         * Indicates administrative region name.
         *
         * @type { ?string }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        administrativeArea?: string;
        /**
         * Indicates sub-administrative region name.
         *
         * @type { ?string }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        subAdministrativeArea?: string;
        /**
         * Indicates locality information.
         *
         * @type { ?string }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        locality?: string;
        /**
         * Indicates sub-locality information.
         *
         * @type { ?string }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        subLocality?: string;
        /**
         * Indicates road name.
         *
         * @type { ?string }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        roadName?: string;
        /**
         * Indicates auxiliary road information.
         *
         * @type { ?string }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        subRoadName?: string;
        /**
         * Indicates house information.
         *
         * @type { ?string }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        premises?: string;
        /**
         * Indicates postal code.
         *
         * @type { ?string }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        postalCode?: string;
        /**
         * Indicates phone number.
         *
         * @type { ?string }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        phoneNumber?: string;
        /**
         * Indicates website URL.
         *
         * @type { ?string }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        addressUrl?: string;
        /**
         * Indicates additional information.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        descriptions?: Array<string>;
        /**
         * Indicates the amount of additional descriptive information.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Geocoder
         * @since 9
         */
        descriptionsSize?: number;
    }
    /**
     * Configuring parameters in location requests.
     *
     * @typedef LocationRequest
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    /**
     * Configuring parameters in location requests.
     *
     * @typedef LocationRequest
     * @syscap SystemCapability.Location.Location.Core
     * @atomicservice
     * @since 11
     */
    export interface LocationRequest {
        /**
         * Priority of the location request.
         *
         * @type { ?LocationRequestPriority }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Priority of the location request.
         *
         * @type { ?LocationRequestPriority }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        priority?: LocationRequestPriority;
        /**
         * User scenario of the location request.
         *
         * @type { ?LocationRequestScenario }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * User scenario of the location request.
         *
         * @type { ?LocationRequestScenario }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        scenario?: LocationRequestScenario;
        /**
         * Location report interval.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Location report interval.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        timeInterval?: number;
        /**
         * Location report distance interval.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Location report distance interval.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        distanceInterval?: number;
        /**
         * Accuracy requirements for reporting locations.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Accuracy requirements for reporting locations.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        maxAccuracy?: number;
    }
    /**
     * Configuring parameters in current location requests.
     *
     * @typedef CurrentLocationRequest
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    /**
     * Configuring parameters in current location requests.
     *
     * @typedef CurrentLocationRequest
     * @syscap SystemCapability.Location.Location.Core
     * @atomicservice
     * @since 11
     */
    export interface CurrentLocationRequest {
        /**
         * Priority of the location request.
         *
         * @type { ?LocationRequestPriority }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Priority of the location request.
         *
         * @type { ?LocationRequestPriority }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        priority?: LocationRequestPriority;
        /**
         * User scenario of the location request.
         *
         * @type { ?LocationRequestScenario }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * User scenario of the location request.
         *
         * @type { ?LocationRequestScenario }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        scenario?: LocationRequestScenario;
        /**
         * Accuracy requirements for reporting locations.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Accuracy requirements for reporting locations.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        maxAccuracy?: number;
        /**
         * Timeout interval of a single location request.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Timeout interval of a single location request.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        timeoutMs?: number;
    }
    /**
     * Provides information about geographic locations.
     *
     * @typedef Location
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    /**
     * Provides information about geographic locations.
     *
     * @typedef Location
     * @syscap SystemCapability.Location.Location.Core
     * @atomicservice
     * @since 11
     */
    export interface Location {
        /**
         * Indicates latitude information.
         * A positive value indicates north latitude,
         * and a negative value indicates south latitude.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Indicates latitude information.
         * A positive value indicates north latitude,
         * and a negative value indicates south latitude.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        latitude: number;
        /**
         * Indicates Longitude information.
         * A positive value indicates east longitude ,
         * and a negative value indicates west longitude.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Indicates Longitude information.
         * A positive value indicates east longitude ,
         * and a negative value indicates west longitude.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        longitude: number;
        /**
         * Indicates location altitude, in meters.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Indicates location altitude, in meters.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        altitude: number;
        /**
         * Indicates location accuracy, in meters.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Indicates location accuracy, in meters.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        accuracy: number;
        /**
         * Indicates speed, in m/s.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Indicates speed, in m/s.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        speed: number;
        /**
         * Indicates location timestamp in the UTC format.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Indicates location timestamp in the UTC format.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        timeStamp: number;
        /**
         * Indicates direction information.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Indicates direction information.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        direction: number;
        /**
         * Indicates location timestamp since boot.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Indicates location timestamp since boot.
         *
         * @type { number }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        timeSinceBoot: number;
        /**
         * Indicates additional information.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Indicates additional information.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        additions?: Array<string>;
        /**
         * Indicates the amount of additional descriptive information.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Indicates the amount of additional descriptive information.
         *
         * @type { ?number }
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        additionSize?: number;
    }
    /**
     * Enum for location priority.
     *
     * @enum { number }
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    /**
     * Enum for location priority.
     *
     * @enum { number }
     * @syscap SystemCapability.Location.Location.Core
     * @atomicservice
     * @since 11
     */
    export enum LocationRequestPriority {
        /**
         * Default priority.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Default priority.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        UNSET = 0x200,
        /**
         * Preferentially ensure the locating accuracy.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Preferentially ensure the locating accuracy.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        ACCURACY,
        /**
         * Preferentially ensure low power consumption for locating.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Preferentially ensure low power consumption for locating.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        LOW_POWER,
        /**
         * Preferentially ensure that the first location is time-consuming.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Preferentially ensure that the first location is time-consuming.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        FIRST_FIX
    }
    /**
     * Enum for location scenario.
     *
     * @enum { number }
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    /**
     * Enum for location scenario.
     *
     * @enum { number }
     * @syscap SystemCapability.Location.Location.Core
     * @atomicservice
     * @since 11
     */
    export enum LocationRequestScenario {
        /**
         * Default scenario.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Default scenario.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        UNSET = 0x300,
        /**
         * Navigation scenario. High positioning precision and real-time performance are required.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Navigation scenario. High positioning precision and real-time performance are required.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        NAVIGATION,
        /**
         * Trajectory tracking scenario. High positioning precision is required.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Trajectory tracking scenario. High positioning precision is required.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        TRAJECTORY_TRACKING,
        /**
         * Car hailing scenario. High positioning precision and real-time performance are required.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Car hailing scenario. High positioning precision and real-time performance are required.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        CAR_HAILING,
        /**
         * Daily life scenarios. Low requirements on positioning precision and real-time performance.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Daily life scenarios. Low requirements on positioning precision and real-time performance.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        DAILY_LIFE_SERVICE,
        /**
         * Power saving scenarios.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        /**
         * Power saving scenarios.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @atomicservice
         * @since 11
         */
        NO_POWER
    }
    /**
     * Location subsystem command structure.
     *
     * @typedef LocationCommand
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    export interface LocationCommand {
        /**
         * Information about the scenario where the command is sent.
         *
         * @type { LocationRequestScenario }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        scenario: LocationRequestScenario;
        /**
         * Sent command content.
         *
         * @type { string }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        command: string;
    }
    /**
     * Country code structure.
     *
     * @typedef CountryCode
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    export interface CountryCode {
        /**
         * Country code character string.
         *
         * @type { string }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        country: string;
        /**
         * Country code source.
         *
         * @type { CountryCodeType }
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        type: CountryCodeType;
    }
    /**
     * Enum for country code type.
     *
     * @enum { number }
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    export enum CountryCodeType {
        /**
         * Country code obtained from the locale setting.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        COUNTRY_CODE_FROM_LOCALE = 1,
        /**
         * Country code obtained from the SIM information.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        COUNTRY_CODE_FROM_SIM,
        /**
         * Query the country code information from the reverse geocoding result.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        COUNTRY_CODE_FROM_LOCATION,
        /**
         * Obtain the country code from the cell registration information.
         *
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        COUNTRY_CODE_FROM_NETWORK
    }
}
export default geoLocationManager;
