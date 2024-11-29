/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Provide keyword search, nearby search, automatic completion, details query, geocoding.
 * @kit MapKit
 */
import type mapCommon from '@hms.core.map.mapCommon';
import type common from '@ohos.app.ability.common';
/**
 * This module provides interfaces for keyword search, nearby search, automatic completion,
 * details query, geocoding.
 *
 * @namespace site
 * @syscap SystemCapability.Map.Core
 * @stagemodelonly
 * @atomicservice
 * @since 4.1.0(11)
 */
declare namespace site {
    /**
     * Provides interfaces for keyword search.
     *
     * @typedef SearchByTextParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface SearchByTextParams {
        /**
         * Provide search query text.
         * The string length range is [1, 512]
         *
         * @type {string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        query: string;
        /**
         * Provide the location of the map.
         *
         * @type { ?mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        location?: mapCommon.LatLng;
        /**
         * Provide the location radius.
         * The value range is [1, 50000]
         *
         * @type { ?number }
         * @default 50000
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        radius?: number;
        /**
         * Provide the search language.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        language?: string;
        /**
         * Provide the search Poi Type.
         * Returns the location of the specified Huawei classification system. For the value range, see PoiType.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        poiTypes?: Array<string>;
        /**
         * Provide the search country code.
         * The country code must comply with the ISO 3166-1 alpha-2 rule
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        countryCodes?: Array<string>;
        /**
         * Provide the search cityId.
         * For cities in Chinese Mainland and Hong Kong and Macao, cityCode or adminCode of three to four digits can be transferred.
         * For details, see the city code and area code table. The value of cityId can contain 16 to 18 digits.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        cityId?: string;
        /**
         * Indicates whether the search result is restricted to a specified city.
         * This parameter must be used together with the cityId parameter.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isCityLimit?: boolean;
        /**
         * Provide result whether contain child nodes.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isChildren?: boolean;
        /**
         * Provide return result page index.
         * The value range is [1, 500]
         *
         * @type { ?number }
         * @default 1
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        pageIndex?: number;
        /**
         * Provide return result page size.
         * The value range is [1, 20]
         * Constraint: pageIndex x pageSize <= 500
         *
         * @type { ?number }
         * @default 20
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        pageSize?: number;
    }
    /**
     * Provides interfaces for nearby search.
     *
     * @typedef NearbySearchParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface NearbySearchParams {
        /**
         * Provide search query text.
         * The string length range is [1, 512]
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        query?: string;
        /**
         * Provide the location of the map.
         *
         * @type { mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        location: mapCommon.LatLng;
        /**
         * Provide the location radius.
         * The value range is [1, 50000]
         *
         * @type { ?number }
         * @default 1000
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        radius?: number;
        /**
         * Provide the search language.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        language?: string;
        /**
         * Provide the search Poi Type.
         * Returns the location of the specified Huawei classification system. For the value range, see PoiType.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        poiTypes?: Array<string>;
        /**
         * Provide return result page index.
         * The value range is [1, 500]
         *
         * @type { ?number }
         * @default 1
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        pageIndex?: number;
        /**
         * Provide return result page size.
         * The value range is [1, 20]
         * Constraint: pageIndex x pageSize <= 500
         *
         * @type { ?number }
         * @default 20
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        pageSize?: number;
        /**
         * Sort rule.
         *
         * @type { ?SortRule }
         * @default SortRule.COMPOSITE
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        sortRule?: SortRule;
    }
    /**
     * Provides interfaces for auto-Complete Search.
     *
     * @typedef QueryAutoCompleteParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface QueryAutoCompleteParams {
        /**
         * Provide search query text.
         * The string length range is [1, 512]
         *
         * @type {string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        query: string;
        /**
         * Provide the location of the map.
         *
         * @type { ?mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        location?: mapCommon.LatLng;
        /**
         * Provide the location radius.
         * The value range is [1, 50000]
         *
         * @type { ?number }
         * @default 50000
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        radius?: number;
        /**
         * Provide the search language.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        language?: string;
        /**
         * Provide the search Poi Types.
         * Returns the location of the specified Huawei classification system. For the value range, see PoiType.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        poiTypes?: Array<string>;
        /**
         * Provide the search cityId.
         * For cities in Chinese Mainland and Hong Kong and Macao, cityCode or adminCode of three to four digits can be transferred.
         * For details, see the city code and area code table. The value of cityId can contain 16 to 18 digits.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        cityId?: string;
        /**
         * Indicates whether the search result is restricted to a specified city.
         * This parameter must be used together with the cityId parameter.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isCityLimit?: boolean;
        /**
         * Provide result whether contain child nodes.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isChildren?: boolean;
    }
    /**
     * Provides interfaces for address Details Search.
     *
     * @typedef SearchByIdParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface SearchByIdParams {
        /**
         * Provide the siteId.
         * The string length range is [1, 256]
         *
         * @type { string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        siteId: string;
        /**
         * Provide the search language.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        language?: string;
        /**
         * Provide result whether contain child nodes.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isChildren?: boolean;
    }
    /**
     * Provides interfaces for positive geographic search.
     *
     * @typedef GeocodeParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface GeocodeParams {
        /**
         * Provide the address.
         * The string length range is [1, 512]
         *
         * @type { string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        query: string;
        /**
         * Provide the search language.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        language?: string;
        /**
         * bounds.
         * Rectangular longitude and latitude box to which search results are biased
         *
         * @type {?mapCommon.LatLngBounds}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        bounds?: mapCommon.LatLngBounds;
    }
    /**
     * Provides interfaces for inverse geographic search.
     *
     * @typedef ReverseGeocodeParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface ReverseGeocodeParams {
        /**
         * Provide the location of the map.
         *
         * @type { mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        location: mapCommon.LatLng;
        /**
         * Provide the search radius.
         * The value range is [0, 1000]
         *
         * @type { ?number }
         * @default 1000
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        radius?: number;
        /**
         * Provide the search language.
         *
         * @type { ?string }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        language?: string;
        /**
         * Provide the search extension.
         * Indicates whether to extend the return of POI, AOI, and ROAD information.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isExtension?: boolean;
        /**
         * Provide the search poiType.
         * Returns the location of the specified Huawei classification system. For the value range, see PoiType.
         * maximum of five types can be entered.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        poiTypes?: Array<string>;
        /**
         * Whether to return to the nearby AOI, and this attribute is valid when isExtension is true.
         *
         * @type { ?boolean }
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        isNearbyAoi?: boolean;
        /**
         * Sort rule for POIs.
         *
         * @type { ?SortRule }
         * @default SortRule.DISTANCE
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        sortRule?: SortRule;
    }
    /**
     * Provides interfaces for keyword search Result.
     *
     * @typedef SearchByTextResult
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface SearchByTextResult {
        /**
         * result number.
         * If the query is successful, the total number of records that meet the search criteria is returned.
         * The total number of records may be greater than 500.
         *
         * @type {number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        totalCount: number;
        /**
         * sites.
         *
         * @type {?Array<Site>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        sites?: Array<Site>;
    }
    /**
     * Provides interfaces for nearby search Response Result.
     *
     * @typedef NearbySearchResult
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface NearbySearchResult {
        /**
         * result number.
         * If the query is successful, the total number of records that meet the search criteria is returned.
         * The total number of records may be greater than 500.
         *
         * @type {number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        totalCount: number;
        /**
         * sites.
         *
         * @type {?Array<Site>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        sites?: Array<Site>;
    }
    /**
     * Provides interfaces for auto-Complete Search Result.
     *
     * @typedef QueryAutoCompleteResult
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface QueryAutoCompleteResult {
        /**
         * sites.
         *
         * @type {?Array<Site>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        sites?: Array<Site>;
    }
    /**
     * Provides interfaces for address Details Search Result.
     *
     * @typedef SearchByIdResult
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface SearchByIdResult {
        /**
         * site.
         *
         * @type {?Site}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        site?: Site;
    }
    /**
     * Provides interfaces for positive geographic search.
     *
     * @typedef GeocodeResult
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface GeocodeResult {
        /**
         * sites.
         *
         * @type {?Array<Site>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        sites?: Array<Site>;
    }
    /**
     * Provides interfaces for inverse geographic search Result.
     *
     * @typedef ReverseGeocodeResult
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface ReverseGeocodeResult {
        /**
         * addressComponent.
         *
         * @type {AddressComponent}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        addressComponent: AddressComponent;
        /**
         * addressDescription.
         *
         * @type {string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        addressDescription: string;
        /**
         * aois.
         *
         * @type {?Array<Aoi>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        aois?: Array<Aoi>;
        /**
         * pois.
         *
         * @type {?Array<ReverseGeocodePoi>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        pois?: Array<ReverseGeocodePoi>;
        /**
         * roads.
         *
         * @type {?Array<Road>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        roads?: Array<Road>;
        /**
         * intersections.
         *
         * @type {?Array<Intersection>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        intersections?: Array<Intersection>;
    }
    /**
     * The Site.
     *
     * @typedef Site
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface Site {
        /**
         * siteId.
         *
         * @type {string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        siteId: string;
        /**
         * name.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        name?: string;
        /**
         * formatAddress.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        formatAddress?: string;
        /**
         * addressComponent.
         *
         * @type {AddressComponent}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        addressComponent: AddressComponent;
        /**
         * location.
         *
         * @type {?mapCommon.LatLng}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        location?: mapCommon.LatLng;
        /**
         * viewport.
         *
         * @type {?mapCommon.LatLngBounds}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        viewport?: mapCommon.LatLngBounds;
        /**
         * result distance.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        distance?: number;
        /**
         * utcOffset.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        utcOffset?: number;
        /**
         * poi.
         *
         * @type {?Poi}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        poi?: Poi;
    }
    /**
     * The AddressComponent.
     *
     * @typedef AddressComponent
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface AddressComponent {
        /**
         * countryName.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        countryName?: string;
        /**
         * country.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        countryCode?: string;
        /**
         * adminLevel1.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        adminLevel1?: string;
        /**
         * adminLevel2.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        adminLevel2?: string;
        /**
         * adminLevel3.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        adminLevel3?: string;
        /**
         * adminLevel4.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        adminLevel4?: string;
        /**
         * adminLevel5.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        adminLevel5?: string;
        /**
         * locality.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        locality?: string;
        /**
         * subLocality1.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        subLocality1?: string;
        /**
         * subLocality2.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        subLocality2?: string;
        /**
         * neighborhood.
         *
         * @type {?Array<string>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        neighborhoods?: Array<string>;
        /**
         * adminCode.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        adminCode?: string;
        /**
         * postalCode.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        postalCode?: string;
        /**
         * city.
         *
         * @type {?City}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        city?: City;
        /**
         * streetNumber.
         *
         * @type {?StreetNumber}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        streetNumber?: StreetNumber;
    }
    /**
     * The City.
     *
     * @typedef City
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface City {
        /**
         * cityCode.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        cityCode?: string;
        /**
         * cityId.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        cityId?: string;
        /**
         * cityLevel.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        cityName?: string;
    }
    /**
     * The StreetNumber.
     *
     * @typedef StreetNumber
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface StreetNumber {
        /**
         * direction.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        direction?: string;
        /**
         * distance.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        distance?: number;
        /**
         * location.
         *
         * @type {?mapCommon.LatLng}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        location?: mapCommon.LatLng;
        /**
         * streetNumber.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        streetNumber?: string;
        /**
         * streetName.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        streetName?: string;
        /**
         * formatAddress.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        formatAddress?: string;
    }
    /**
     * The Poi.
     *
     * @typedef Poi
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface Poi {
        /**
         * poiTypes.
         *
         * @type {?Array<string>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        poiTypes?: Array<string>;
        /**
         * poiTypeIds.
         *
         * @type {?Array<string>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        poiTypeIds?: Array<string>;
        /**
         * phone.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        phone?: string;
        /**
         * internationalPhone.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        internationalPhone?: string;
        /**
         * rating.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        rating?: number;
        /**
         * websiteUrl.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        websiteUrl?: string;
        /**
         * openingHours.
         *
         * @type {?OpeningHours}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        openingHours?: OpeningHours;
        /**
         * businessStatus.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        businessStatus?: string;
        /**
         * brand.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        brand?: string;
        /**
         * email.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        email?: string;
        /**
         * starRating.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        starRating?: number;
        /**
         * child nodes.
         *
         * @type {?Array<ChildNode>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        childNodes?: Array<ChildNode>;
        /**
         * icon.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        icon?: string;
        /**
         * description.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        description?: string;
        /**
         * abstractText.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        abstractText?: string;
        /**
         * comment.
         *
         * @type {?Comment}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        comment?: Comment;
    }
    /**
     * The OpeningHours.
     *
     * @typedef OpeningHours
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface OpeningHours {
        /**
         * texts.
         *
         * @type {?Array<string>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        texts?: Array<string>;
        /**
         * periods.
         *
         * @type {?Array<Period>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        periods?: Array<Period>;
    }
    /**
     * The Period.
     *
     * @typedef Period
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface Period {
        /**
         * open.
         *
         * @type {?TimeOfWeek}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        open?: TimeOfWeek;
        /**
         * close.
         *
         * @type {?TimeOfWeek}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        close?: TimeOfWeek;
    }
    /**
     * The TimeOfWeek.
     *
     * @typedef TimeOfWeek
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface TimeOfWeek {
        /**
         * week.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        week?: number;
        /**
         * time.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        time?: string;
    }
    /**
     * Child Node.
     *
     * @typedef ChildNode
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface ChildNode {
        /**
         * siteId.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        siteId?: string;
        /**
         * name.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        name?: string;
        /**
         * formatAddress.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        formatAddress?: string;
        /**
         * location.
         *
         * @type {?mapCommon.LatLng}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        location?: mapCommon.LatLng;
        /**
         * poiTypes.
         *
         * @type {?Array<string>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        poiTypes?: Array<string>;
    }
    /**
     * The Comment.
     *
     * @typedef Comment
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface Comment {
        /**
         * averageRating.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        averageRating?: number;
        /**
         * total.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        total?: number;
    }
    /**
     * The Aoi.
     *
     * @typedef Aoi
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface Aoi {
        /**
         * area.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        area?: number;
        /**
         * distance.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        distance?: number;
        /**
         * siteId.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        siteId?: string;
        /**
         * Provide the location of the map.
         *
         * @type { ?mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        location?: mapCommon.LatLng;
        /**
         * name.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        name?: string;
        /**
         * poiType.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        poiType?: string;
        /**
         * direction.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        direction?: string;
    }
    /**
     * The ReverseGeocodePoi.
     *
     * @typedef ReverseGeocodePoi
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface ReverseGeocodePoi {
        /**
         * address.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        address?: string;
        /**
         * direction.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        direction?: string;
        /**
         * distance.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        distance?: number;
        /**
         * siteId.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        siteId?: string;
        /**
         * Provide the location of the map.
         *
         * @type { ?mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        location?: mapCommon.LatLng;
        /**
         * name.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        name?: string;
        /**
         * poiType.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        poiType?: string;
    }
    /**
     * The Road.
     *
     * @typedef Road
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface Road {
        /**
         * direction.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        direction?: string;
        /**
         * distance.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        distance?: number;
        /**
         * siteId.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        siteId?: string;
        /**
         * Provide the location of the map.
         *
         * @type { ?mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        location?: mapCommon.LatLng;
        /**
         * name.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        name?: string;
    }
    /**
     * The Intersection.
     *
     * @typedef Intersection
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface Intersection {
        /**
         * direction.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        direction?: string;
        /**
         * distance.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        distance?: number;
        /**
         * siteId.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        siteId?: string;
        /**
         * Provide the location of the map.
         *
         * @type { ?mapCommon.LatLng }
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        location?: mapCommon.LatLng;
        /**
         * name.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        name?: string;
    }
    /**
     * Keyword query interface.
     *
     * @param { SearchByTextParams } searchByTextParams - searchByTextParams.
     * @returns { Promise<SearchByTextResult> } Return SearchByTextResult object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002603001 - Zero result.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function searchByText(searchByTextParams: SearchByTextParams): Promise<SearchByTextResult>;
    /**
     * Keyword query interface.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { SearchByTextParams } searchByTextParams - searchByTextParams.
     * @returns { Promise<SearchByTextResult> } Return SearchByTextResult object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002603001 - Zero result.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function searchByText(context: common.Context, searchByTextParams: SearchByTextParams): Promise<SearchByTextResult>;
    /**
     * Peripheral search interface.
     *
     * @param { NearbySearchParams } nearbySearchParams - nearbySearchParams.
     * @returns { Promise<NearbySearchResult> } Return NearbySearchResult object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002603001 - Zero result.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function nearbySearch(nearbySearchParams: NearbySearchParams): Promise<NearbySearchResult>;
    /**
     * Peripheral search interface.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { NearbySearchParams } nearbySearchParams - nearbySearchParams.
     * @returns { Promise<NearbySearchResult> } Return NearbySearchResult object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002603001 - Zero result.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function nearbySearch(context: common.Context, nearbySearchParams: NearbySearchParams): Promise<NearbySearchResult>;
    /**
     * Auto-Complete Interface.
     *
     * @param { QueryAutoCompleteParams } queryAutoCompleteParams
     * @returns { Promise<QueryAutoCompleteResult> } Return QueryAutoCompleteResult object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002603001 - Zero result.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function queryAutoComplete(queryAutoCompleteParams: QueryAutoCompleteParams): Promise<QueryAutoCompleteResult>;
    /**
     * Auto-Complete Interface.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { QueryAutoCompleteParams } queryAutoCompleteParams
     * @returns { Promise<QueryAutoCompleteResult> } Return QueryAutoCompleteResult object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002603001 - Zero result.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function queryAutoComplete(context: common.Context, queryAutoCompleteParams: QueryAutoCompleteParams): Promise<QueryAutoCompleteResult>;
    /**
     * Address details interface.
     *
     * @param { SearchByIdParams } searchByIdParams
     * @returns { Promise<SearchByIdResult> } Return SearchByIdResult object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002603001 - Zero result.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function searchById(searchByIdParams: SearchByIdParams): Promise<SearchByIdResult>;
    /**
     * Address details interface.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { SearchByIdParams } searchByIdParams - searchByIdParams.
     * @returns { Promise<SearchByIdResult> } Return SearchByIdResult object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002603001 - Zero result.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function searchById(context: common.Context, searchByIdParams: SearchByIdParams): Promise<SearchByIdResult>;
    /**
     * geocoding interface.
     *
     * @param { GeocodeParams } geocodeParams - geocodeParams.
     * @returns { Promise<GeocodeResult> } Return GeocodeResult Object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002603001 - Zero result.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function geocode(geocodeParams: GeocodeParams): Promise<GeocodeResult>;
    /**
     * geocoding interface.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { GeocodeParams } geocodeParams - geocodeParams.
     * @returns { Promise<GeocodeResult> } Return GeocodeResult Object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002603001 - Zero result.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function geocode(context: common.Context, geocodeParams: GeocodeParams): Promise<GeocodeResult>;
    /**
     * inverse geocoding interface
     *
     * @param { ReverseGeocodeParams } reverseGeocodeParams
     * @returns { Promise<ReverseGeocodeResult> } Return ReverseGeocodeResult object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002603001 - Zero result.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function reverseGeocode(reverseGeocodeParams: ReverseGeocodeParams): Promise<ReverseGeocodeResult>;
    /**
     * inverse geocoding interface
     *
     * @param { common.Context } context - The context of an ability.
     * @param { ReverseGeocodeParams } reverseGeocodeParams
     * @returns { Promise<ReverseGeocodeResult> } Return ReverseGeocodeResult object.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002603001 - Zero result.
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function reverseGeocode(context: common.Context, reverseGeocodeParams: ReverseGeocodeParams): Promise<ReverseGeocodeResult>;
    /**
     * Rule of result sort.
     *
     * @enum {number}
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum SortRule {
        /**
         * Composite sort.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        COMPOSITE = 0,
        /**
         * Sort by distance.
         *
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        DISTANCE = 1
    }
}
export default site;
