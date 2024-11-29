/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Provide the scenario-based map ui page.
 * @kit MapKit
 */
import type common from '@ohos.app.ability.common';
import type mapCommon from '@hms.core.map.mapCommon';
import type site from '@hms.core.map.site';
import type image from '@ohos.multimedia.image';
/**
 * Provides scenario-based map ui page.
 *
 * @namespace sceneMap
 * @syscap SystemCapability.Map.Core
 * @stagemodelonly
 * @atomicservice
 * @since 4.1.0(11)
 */
declare namespace sceneMap {
    /**
     * Bring up the map location detail page.
     *
     * @param {common.UIAbilityContext} context - The context of an ability.
     * @param {LocationQueryOptions} options - Indicates the options for bring up the map location detail page.
     * @returns {Promise<void>}
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function queryLocation(context: common.UIAbilityContext, options: LocationQueryOptions): Promise<void>;
    /**
     * Bring up the map choose location page. User can query locations and choose any one.
     *
     * @param {common.UIAbilityContext} context - The context of an ability.
     * @param {LocationChoosingOptions} options - Indicates the options for bring up the map choose location page.
     * @returns {Promise<LocationChoosingResult>} Return the choose location result.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function chooseLocation(context: common.UIAbilityContext, options: LocationChoosingOptions): Promise<LocationChoosingResult>;
    /**
     * Bring up the administrative division selection page.
     * Note: This function must be called in the ArkUI page context.
     * @param {common.Context} context - The context of an ability.
     * @param {DistrictSelectOptions} options - Indicates the options for bring up the administrative division selection page.
     * @returns {Promise<DistrictSelectResult>} Return the administrative division selection result.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002600012 - The country code is not supported.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function selectDistrict(context: common.Context, options: DistrictSelectOptions): Promise<DistrictSelectResult>;
    /**
     * Provides the options for bring up the map location detail page.
     *
     * @typedef LocationQueryOptions
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface LocationQueryOptions {
        /**
         * The siteId id for querying location detail, if no siteId, use the location to query location detail.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        siteId?: string;
        /**
         * Set the page language.Currently, only zh-CN and en are available.If not set, will use the system default language.
         * Abnormal values are handled according to the system default values.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        language?: string;
        /**
         * If no siteId, use the location to query location detail.
         *
         * @type { ?mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        location?: mapCommon.LatLng;
        /**
         * If no siteId, use name as location name.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        name?: string;
        /**
         * If no siteId, use address as location address.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        address?: string;
        /**
         * Indicates whether to display commercial information. If the value is false, the taxi function cannot be displayed.
         *
         * @type { ?boolean }
         * @default true
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        showBusiness?: boolean;
    }
    /**
     * Provides the options for bring up the map choose location page.
     *
     * @typedef LocationChoosingOptions
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface LocationChoosingOptions {
        /**
         * The location for query address.If no location, use the current location as the location.If no current location, use the default location.
         *
         * @type { ?mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        location?: mapCommon.LatLng;
        /**
         * Set the page language.Currently, only zh-CN and en are available.If not set, will use the system default language.
         * Abnormal values are handled according to the system default values.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        language?: string;
        /**
         * Display the POIs of ths specified POI types.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        poiTypes?: Array<string>;
        /**
         * Set whether to display the search controls.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        searchEnabled?: boolean;
        /**
         * Indicates whether to display nearby poi.
         * Abnormal values are handled according to the default values.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        showNearbyPoi?: boolean;
        /**
         * Indicates whether to return map snapshot.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        snapshotEnabled?: boolean;
    }
    /**
     * Provides the result of the map choose location page.
     *
     * @typedef LocationChoosingResult
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface LocationChoosingResult {
        /**
         * The chosen site id. If select a location instead of a poi, this value cannot be returned.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        siteId?: string;
        /**
         * The chosen location.
         *
         * @type { mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        location: mapCommon.LatLng;
        /**
         * The chosen location name.If select a location instead of a poi, this value cannot be returned.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        name?: string;
        /**
         * The chosen location address.
         *
         * @type { string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        address: string;
        /**
         * The site's address component.
         *
         * @type { ?site.AddressComponent }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        addressComponent?: site.AddressComponent;
        /**
         * The current map zoom.
         *
         * @type { number }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        zoom: number;
        /**
         * The map snapshot.
         *
         * @type { ?image.PixelMap }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        snapshot?: image.PixelMap;
    }
    /**
     * Provide input options for the administrative division selection request.
     *
     * @typedef DistrictSelectOptions
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface DistrictSelectOptions {
        /**
         * Querying administrative division of a specified country.
         * The country code must comply with the ISO 3166-1 alpha-2 rule.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        countryCode?: string;
        /**
         * Set the page language.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        language?: string;
        /**
         * Specified address query.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        address?: string;
    }
    /**
     * Provide the result for the administrative division selection request.
     *
     * @typedef DistrictSelectResult
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface DistrictSelectResult {
        /**
         * Returns the level information of the selected administrative division.
         *
         * @type { Array<District> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        districts: Array<District>;
        /**
         * Returns address information about the selected administrative division.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        addressDescription?: string;
    }
    /**
     * Provide the administrative division info.
     *
     * @typedef District
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface District {
        /**
         * siteId.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        siteId?: string;
        /**
         * name.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        name?: string;
        /**
         * location.
         *
         * @type {?mapCommon.LatLng}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        location?: mapCommon.LatLng;
        /**
         * adminLevel.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        adminLevel?: string;
        /**
         * adminCode, supported only in China.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        adminCode?: string;
        /**
         * cityCode, supported only in China.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        cityCode?: string;
        /**
         * country code.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        countryCode?: string;
    }
}
export default sceneMap;
