/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Defines the capabilities of WeatherServiceKit
 * @kit WeatherServiceKit
 * @bundle com.huawei.hms.weather/WeatherService/ets/Index 5.0.0(12)
 */
import resourceManager from '@ohos.resourceManager';
/**
 * This module Provides basic weather abilities
 *
 * @namespace weatherService
 * @syscap SystemCapability.Weather.Core
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace weatherService {
    /**
     * Returns the weather forecast for the requested location.
     *
     * @param { WeatherRequest } request - The requested params.
     * @returns { Promise<Weather> } the promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1011900001 - Capability is not configured.
     * @throws { BusinessError } 1011900002 - The requested longitude and latitude grid point lacks data.
     * @throws { BusinessError } 1011900003 - Network error.
     * @throws { BusinessError } 1011900004 - System error.
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getWeather(request: WeatherRequest): Promise<Weather>;
    /**
     * Configure the parameters in the weather request.
     *
     * @typedef WeatherRequest
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface WeatherRequest {
        /**
         * Defines the location property.
         *
         * @type { Location }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        location: Location;
        /**
         * Defines the limitedDatasets property.
         *
         * @type { ?Dataset[] }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        limitedDatasets?: Dataset[];
    }
    /**
     * Defines the latitude and longitude information.
     *
     * @typedef Location
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface Location {
        /**
         * Defines the latitude property.
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        latitude: number;
        /**
         * Defines the longitude property.
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        longitude: number;
    }
    /**
     * Represents the model of the aggregated weather data requested by the caller.
     *
     * @typedef Weather
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface Weather {
        /**
         * The current weather forecast.
         *
         * @type { ?CurrentWeather }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        current?: CurrentWeather;
        /**
         * The daily forecast.
         *
         * @type { ?Forecast<DailyWeather> }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        daily?: Forecast<DailyWeather>;
        /**
         * The hourly forecast.
         *
         * @type { ?Forecast<HourlyWeather> }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        hourly?: Forecast<HourlyWeather>;
        /**
         * The minute-by-minute forecast.
         *
         * @type { ?Forecast<MinuteWeather> }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        minute?: Forecast<MinuteWeather>;
        /**
         * A list of weather alerts.
         *
         * @type { ?WeatherAlert[] }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        alerts?: WeatherAlert[];
        /**
         * A list of WeatherIndex.
         *
         * @type { ?WeatherIndex[] }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        indices?: WeatherIndex[];
        /**
         * A list of tides.
         *
         * @type { ?Tide[] }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        tides?: Tide[];
        /**
         * additional information.
         *
         * @type { WeatherMetadata }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        metadata: WeatherMetadata;
        /**
         * attribution information.
         *
         * @type { WeatherAttribution[] }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        attributions: WeatherAttribution[];
    }
    /**
     * A structure that provides additional information.
     *
     * @typedef WeatherMetadata
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface WeatherMetadata {
        /**
         * The time of the weather data request.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        requestTime: Date;
        /**
         * The version of weatherService.
         *
         * @type { string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        version: string;
        /**
         * The time zone of the requested location.
         *
         * @type { ?string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        timeZone?: string;
    }
    /**
     * A structure that defines the information necessary to determine the properties of a weather data provider.
     *
     * @typedef WeatherAttribution
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface WeatherAttribution {
        /**
         * The name of weather data provider.
         *
         * @type { string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        serviceName: string;
        /**
         * A link to the legal attribution page, which contains copyright information about the weather data source.
         *
         * @type { string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        legalPageUrl: string;
    }
    /**
     * The current weather forecast.
     *
     * @typedef CurrentWeather
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface CurrentWeather {
        /**
         * The current temperature. The unit is ℃
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        temperature: number;
        /**
         * The feels-like temperature when factoring wind and humidity. The unit is ℃
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        apparentTemperature: number;
        /**
         * The amount of water vapor in the air.
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        humidity: number;
        /**
         * The sea level air pressure. The unit is hPa
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        pressure: number;
        /**
         * The direction of change of the sea level air pressure.
         *
         * @type { PressureTrend }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        pressureTrend: PressureTrend;
        /**
         * The wind speed, direction, and gust.
         *
         * @type { Wind }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        wind: Wind;
        /**
         * The percentage of the sky covered by clouds during the period.
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        cloudCover: number;
        /**
         * The condition at the time.
         *
         * @type { WeatherCondition }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        condition: WeatherCondition;
        /**
         * The level of ultraviolet radiation.
         *
         * @type { UVIndex }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        uvIndex: UVIndex;
        /**
         * Air quality.
         *
         * @type { ?WeatherAqi }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        aqi?: WeatherAqi;
        /**
         * The distance at which terrain is visible. The unit is km
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        visibility: number;
        /**
         * The update time of the data.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        updateTime: Date;
        /**
         * The expiration time of the data.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        expirationTime: Date;
        /**
         * The summary of current weather.
         *
         * @type { ?string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        summary?: string;
    }
    /**
     * A description of the weather condition.
     *
     * @typedef WeatherCondition
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface WeatherCondition {
        /**
         * The type of the condition.
         *
         * @type { ConditionType }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        type: ConditionType;
        /**
         * The icon resource of the condition.
         *
         * @type { resourceManager.Resource }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        icon: resourceManager.Resource;
        /**
         * A localized standard string describing the current condition.
         *
         * @type { string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        description: string;
    }
    /**
     * The wind speed, direction, and gust.
     *
     * @typedef Wind
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface Wind {
        /**
         * The general indicator of wind direction.
         *
         * @type { CompassDirection }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        direction: CompassDirection;
        /**
         * Sustained wind speed. The unit is km/h
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        speed: number;
        /**
         * The level of sustained wind.
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        level: number;
        /**
         * The general indicator of gust direction.
         *
         * @type { ?CompassDirection }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        gustDirection?: CompassDirection;
        /**
         * gust speed. The unit is km/h
         *
         * @type { ?number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        gustSpeed?: number;
        /**
         * The level of gust.
         *
         * @type { ?number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        gustLevel?: number;
    }
    /**
     * The expected intensity of solar ultraviolet radiation.
     *
     * @typedef UVIndex
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface UVIndex {
        /**
         * The UV Index exposure category.
         *
         * @type { ExposureCategory }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        category: ExposureCategory;
        /**
         * The UV Index value.
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        value: number;
        /**
         * The description of UV intensity.
         *
         * @type { string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        description: string;
    }
    /**
     * A forecast collection for minute, hourly, and daily forecasts.
     *
     * @typedef Forecast<T>
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface Forecast<T> {
        /**
         * The forecast collection.
         *
         * @type { T[] }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        forecast: T[];
        /**
         * The update time of the data.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        updateTime: Date;
        /**
         * The expiration time of the data.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        expirationTime: Date;
        /**
         * summary.
         *
         * @type { ?string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        summary?: string;
    }
    /**
     * A structure that represents the weather conditions for the day.
     *
     * @typedef DailyWeather
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface DailyWeather {
        /**
         * The start time of the day weather.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        date: Date;
        /**
         * The daytime high temperature. The unit is ℃
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        highTemperature: number;
        /**
         * The overnight low temperature. The unit is ℃
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        lowTemperature: number;
        /**
         * The daytime high feels-like temperature when factoring wind and humidity. The unit is ℃
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        highApparentTemperature: number;
        /**
         * The overnight low feels-like temperature when factoring wind and humidity. The unit is ℃
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        lowApparentTemperature: number;
        /**
         * The level of ultraviolet radiation.
         *
         * @type { UVIndex }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        uvIndex: UVIndex;
        /**
         * Air quality.
         *
         * @type { ?WeatherAqi }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        aqi?: WeatherAqi;
        /**
         * The distance at which the terrain is visible. The unit is km
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        visibility: number;
        /**
         * The lunar events for the day.
         *
         * @type { MoonEvents }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        moon: MoonEvents;
        /**
         * The solar events for the day.
         *
         * @type { SunEvents }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        sun: SunEvents;
        /**
         * Daytime weather forecast.
         *
         * @type { DayPartForecast }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        daytimeForecast: DayPartForecast;
        /**
         * Overnight weather forecast.
         *
         * @type { DayPartForecast }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        overnightForecast: DayPartForecast;
        /**
         * The sea level air pressure. The unit is hPa
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        pressure: number;
    }
    /**
     * A structure that represents dates of solar events, including sunrise, sunset.
     *
     * @typedef SunEvents
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface SunEvents {
        /**
         * The sunrise time.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        sunrise: Date;
        /**
         * The sunset time.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        sunset: Date;
    }
    /**
     * A structure representing partial weather forecasts for a day.
     *
     * @typedef DayPartForecast
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface DayPartForecast {
        /**
         * The wind speed, direction, and gust.
         *
         * @type { Wind }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        wind: Wind;
        /**
         * The amount of water vapor in the air.
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        humidity: number;
        /**
         * The percentage of the sky covered with clouds.
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        cloudCover: number;
        /**
         * An enumeration value indicating the condition.
         *
         * @type { WeatherCondition }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        condition: WeatherCondition;
        /**
         * The probability of precipitation.
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        precipitationProbability: number;
        /**
         * The amount of precipitation. The unit is mm
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        precipitationAmount: number;
        /**
         * The probability of rainfall.
         *
         * @type { ?number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        rainfallProbability?: number;
        /**
         * The amount of rainfall. The unit is mm
         *
         * @type { ?number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        rainfallAmount?: number;
        /**
         * The probability of snowfall.
         *
         * @type { ?number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        snowfallProbability?: number;
        /**
         * The amount of snowfall. The unit is mm
         *
         * @type { ?number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        snowfallAmount?: number;
    }
    /**
     * A structure that represents lunar events.
     *
     * @typedef MoonEvents
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface MoonEvents {
        /**
         * The time of moonrise.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        moonrise: Date;
        /**
         * The time of moonset.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        moonset: Date;
        /**
         * The moon phase.
         *
         * @type { MoonPhase }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        phase: MoonPhase;
        /**
         * The percentage of moon illuminated area.
         *
         * @type { ?number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        illuminatedFraction?: number;
        /**
         * Moon's age.
         *
         * @type { ?number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        age?: number;
    }
    /**
     * A structure that represents moon phase.
     *
     * @typedef MoonPhase
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface MoonPhase {
        /**
         * The type of moonPhase.
         *
         * @type { MoonPhaseType }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        type: MoonPhaseType;
        /**
         * A localized standard string describing the moonPhase.
         *
         * @type { string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        description: string;
        /**
         * The icon resource of the moonPhase.
         *
         * @type { resourceManager.Resource }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        icon: resourceManager.Resource;
    }
    /**
     * A structure that represents the weather conditions for the hour.
     *
     * @typedef HourlyWeather
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface HourlyWeather {
        /**
         * The start time of the hour weather.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        date: Date;
        /**
         * The temperature during the hour. The unit is ℃
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        temperature: number;
        /**
         * The feels-like temperature when factoring wind and humidity. The unit is ℃
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        apparentTemperature: number;
        /**
         * The humidity for the hour.
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        humidity: number;
        /**
         * Wind data describing the wind speed, direction, and gust.
         *
         * @type { Wind }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        wind: Wind;
        /**
         * The fraction of cloud cover.
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        cloudCover: number;
        /**
         * A description of the weather condition for this hour.
         *
         * @type { WeatherCondition }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        condition: WeatherCondition;
        /**
         * The expected intensity of ultraviolet radiation from the sun.
         *
         * @type { UVIndex }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        uvIndex: UVIndex;
        /**
         * The Data of air Quality.
         *
         * @type { ?WeatherAqi }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        aqi?: WeatherAqi;
        /**
         * The distance at which an object can be clearly seen. The unit is km
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        visibility: number;
        /**
         * The probability of precipitation during the hour.
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        precipitationProbability: number;
        /**
         * The amount of precipitation for the hour. The unit is mm
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        precipitationAmount: number;
    }
    /**
     * A structure that represents the next hour minute forecasts.
     *
     * @typedef MinuteWeather
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface MinuteWeather {
        /**
         * The start time of the minute weather.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        date: Date;
        /**
         * A description of the precipitation for this minute.
         *
         * @type { Precipitation }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        precipitation: Precipitation;
        /**
         * The intensity of precipitation for the minute.
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        precipitationIntensity: number;
    }
    /**
     * A weather alert issued by a government agency for the requested location.
     *
     * @typedef WeatherAlert
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface WeatherAlert {
        /**
         * The update time of the weather alert.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        updateTime: Date;
        /**
         * The expiration time of the data.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        expirationTime: Date;
        /**
         * The id of the weather alert.
         *
         * @type { string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        id: string;
        /**
         * The title of the weather alert.
         *
         * @type { string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        title: string;
        /**
         * The name of the affected area.
         *
         * @type { ?string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        region?: string;
        /**
         * The level of the weather alert.
         *
         * @type { AlertLevel }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        level: AlertLevel;
        /**
         * The description of the weather alert level.
         *
         * @type { string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        levelDescription: string;
        /**
         * The type of the weather alert.
         *
         * @type { AlertType }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        type: AlertType;
        /**
         * The description of the weather alert type.
         *
         * @type { string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        typeDescription: string;
        /**
         * The content of the weather alert.
         *
         * @type { string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        content: string;
        /**
         * The guide about the weather alert.
         *
         * @type { ?string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        guide?: string;
        /**
         * The site for more details about the weather alert.
         *
         * @type { ?string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        detailsUrl?: string;
        /**
         * The name of the source issuing the weather alert.
         *
         * @type { string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        source: string;
        /**
         * The icon resource of the alert.
         *
         * @type { ?resourceManager.Resource }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        icon?: resourceManager.Resource;
    }
    /**
     * Air quality.
     *
     * @typedef WeatherAqi
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface WeatherAqi {
        /**
         * The concentration of NO2. The unit is μg/m³
         *
         * @type { ?number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        no2?: number;
        /**
         * The concentration of O3. The unit is μg/m³
         *
         * @type { ?number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        o3?: number;
        /**
         * The concentration of PM10. The unit is μg/m³
         *
         * @type { ?number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        pm10?: number;
        /**
         * The concentration of PM2.5. The unit is μg/m³
         *
         * @type { ?number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        pm25?: number;
        /**
         * The concentration of SO2. The unit is μg/m³
         *
         * @type { ?number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        so2?: number;
        /**
         * The concentration of co. The unit is μg/m³
         *
         * @type { ?number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        co?: number;
        /**
         * The value of aqi.
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        aqiValue: number;
        /**
         * The category of aqi.
         *
         * @type { AqiCategory }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        aqiCategory: AqiCategory;
        /**
         * The description of aqi.
         *
         * @type { string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        aqiDescription: string;
    }
    /**
     * Weather index.
     *
     * @typedef WeatherIndex
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface WeatherIndex {
        /**
         * The update time of the data.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        updateTime: Date;
        /**
         * The expiration time of the data.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        expirationTime: Date;
        /**
         * The type of the weather index.
         *
         * @type { WeatherIndexType }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        type: WeatherIndexType;
        /**
         * The name of the weather index.
         *
         * @type { string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        name: string;
        /**
         * The weather index collection.
         *
         * @type { DailyIndex[] }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        dailyItems: DailyIndex[];
    }
    /**
     * Daily data for the weather index.
     *
     * @typedef DailyIndex
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface DailyIndex {
        /**
         * The date of the weather index.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        date: Date;
        /**
         * The level of the weather index.
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        level: number;
        /**
         * The description of the weather index.
         *
         * @type { string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        levelDescription: string;
        /**
         * The content of the weather index.
         *
         * @type { string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        content: string;
    }
    /**
     * Defines the tide.
     *
     * @typedef Tide
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface Tide {
        /**
         * The update time of the data.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        updateTime: Date;
        /**
         * The expiration time of the data.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        expirationTime: Date;
        /**
         * The id of the station.
         *
         * @type { string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        stationId: string;
        /**
         * The name of the station.
         *
         * @type { string }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        stationName: string;
        /**
         * hourlyTides.
         *
         * @type { HourlyTide[] }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        hourlyTides: HourlyTide[];
    }
    /**
     * HourlyTide.
     *
     * @typedef HourlyTide
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface HourlyTide {
        /**
         * The start time of the tide.
         *
         * @type { Date }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        date: Date;
        /**
         * The category of the tide.
         *
         * @type { ?TideCategory }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        category?: TideCategory;
        /**
         * The height of the tide.
         *
         * @type { number }
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        height: number;
    }
    /**
     * Enum for Dataset.
     *
     * @enum { number }
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum Dataset {
        /**
         * The current weather forecast.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        CURRENT = 0,
        /**
         * The daily forecast.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        DAILY = 1,
        /**
         * The hourly forecast.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HOURLY = 2,
        /**
         * The minute-by-minute forecast.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MINUTE = 3,
        /**
         * A list of severe weather alerts.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        ALERTS = 4,
        /**
         * A list of weather indices.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        INDICES = 5,
        /**
         * A list of tides.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        TIDES = 6
    }
    /**
     * Enum for PressureTrend.
     *
     * @enum { number }
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum PressureTrend {
        /**
         * Undefined.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        UNDEFINED = 0,
        /**
         * The pressure is falling.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        FALLING = 1,
        /**
         * The pressure is rising.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        RISING = 2,
        /**
         * The pressure is not changing.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        STEADY = 3
    }
    /**
     * Enum for ConditionType.
     *
     * @enum { number }
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum ConditionType {
        /**
         * UnKnown.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        UNDEFINED = 0,
        /**
         * Sunny.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SUNNY = 1,
        /**
         * Mostly Sunny.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MOSTLY_SUNNY = 2,
        /**
         * Partly Sunny.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        PARTLY_SUNNY = 3,
        /**
         * Intermittent Clouds.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        INTERMITTENT_CLOUDS = 4,
        /**
         * Hazy Sunshine.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HAZY_SUNSHINE = 5,
        /**
         * Mostly Cloudy.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MOSTLY_CLOUDY = 6,
        /**
         * Cloudy.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        CLOUDY = 7,
        /**
         * Overcast.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        OVERCAST = 8,
        /**
         * Fog.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        FOG = 11,
        /**
         * Showers.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SHOWERS = 12,
        /**
         * Mostly Cloudy w/ Showers.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MOSTLY_CLOUDY_WITH_SHOWERS = 13,
        /**
         * Partly Sunny w/ Showers.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        PARTLY_SUNNY_WITH_SHOWERS = 14,
        /**
         * T-Storms.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        T_STORMS = 15,
        /**
         * Mostly Cloudy w/ T-Storms.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MOSTLY_CLOUDY_WITH_T_STORMS = 16,
        /**
         * Partly Sunny w/ T-Storms.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        PARTLY_SUNNY_WITH_T_STORMS = 17,
        /**
         * Rain.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        RAIN = 18,
        /**
         * Flurries.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        FLURRIES = 19,
        /**
         * Mostly Cloudy w/ Flurries.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MOSTLY_CLOUDY_WITH_FLURRIES = 20,
        /**
         * Partly Sunny w/ Flurries.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        PARTLY_SUNNY_WITH_FLURRIES = 21,
        /**
         * Snow.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SNOW = 22,
        /**
         * Mostly Cloudy w/ Snow.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MOSTLY_CLOUDY_WITH_SNOW = 23,
        /**
         * Ice.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        ICE = 24,
        /**
         * Sleet.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SLEET = 25,
        /**
         * Freezing Rain.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        FREEZING_RAIN = 26,
        /**
         * Rain and snow.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        RAIN_AND_SNOW = 29,
        /**
         * Hot.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HOT = 30,
        /**
         * Cold.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        COLD = 31,
        /**
         * Windy.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        WINDY = 32,
        /**
         * Clear.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        CLEAR = 33,
        /**
         * Mostly Clear.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MOSTLY_CLEAR = 34,
        /**
         * Partly Cloudy.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        PARTLY_CLOUDY = 35,
        /**
         * Intermittent Clouds (night).
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        INTERMITTENT_CLOUDS_NIGHT = 36,
        /**
         * Hazy Moonlight.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HAZY_MOONLIGHT = 37,
        /**
         * Mostly Cloudy (night).
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MOSTLY_CLOUDY_NIGHT = 38,
        /**
         * Partly Cloudy w/ Showers.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        PARTLY_CLOUDY_WITH_SHOWERS = 39,
        /**
         * Mostly Cloudy w/ Showers (night).
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MOSTLY_CLOUDY_WITH_SHOWERS_NIGHT = 40,
        /**
         * Partly Cloudy w/ T-Storms.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        PARTLY_CLOUDY_WITH_T_STORMS = 41,
        /**
         * Mostly Cloudy w/ T-Storms (night).
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MOSTLY_CLOUDY_WITH_T_STORMS_NIGHT = 42,
        /**
         * Mostly Cloudy w/ Flurries (night).
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MOSTLY_CLOUDY_WITH_FLURRIES_NIGHT = 43,
        /**
         * Mostly Cloudy w/ Snow (night).
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MOSTLY_CLOUDY_WITH_SNOW_NIGHT = 44,
        /**
         * Thundershower with hail.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        THUNDERSHOWER_WITH_HAIL = 45,
        /**
         * Light rain.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        LIGHT_RAIN = 46,
        /**
         * Moderate rain.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MODERATE_RAIN = 47,
        /**
         * Heavy rain.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HEAVY_RAIN = 48,
        /**
         * Storm.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        STORM = 49,
        /**
         * Heavy storm.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HEAVY_STORM = 50,
        /**
         * Severe storm.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SEVERE_STORM = 51,
        /**
         * Light snow.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        LIGHT_SNOW = 52,
        /**
         * Moderate snow.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MODERATE_SNOW = 53,
        /**
         * Heavy snow.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HEAVY_SNOW = 54,
        /**
         * Snowstorm.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SNOWSTORM = 55,
        /**
         * Dust storm.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        DUST_STORM = 56,
        /**
         * Light to moderate rain.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        LIGHT_TO_MODERATE_RAIN = 57,
        /**
         * Moderate to heavy rain.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MODERATE_TO_HEAVY_RAIN = 58,
        /**
         * Heavy rain to storm.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HEAVY_RAIN_TO_STORM = 59,
        /**
         * Storm to heavy storm.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        STORM_TO_HEAVY_STORM = 60,
        /**
         * Heavy to severe storm.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HEAVY_TO_SEVERE_STORM = 61,
        /**
         * Light to moderate snow.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        LIGHT_TO_MODERATE_SNOW = 62,
        /**
         * Moderate to heavy snow.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MODERATE_TO_HEAVY_SNOW = 63,
        /**
         * Heavy snow to snowstorm.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HEAVY_SNOW_TO_SNOWSTORM = 64,
        /**
         * Dust.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        DUST = 65,
        /**
         * Sand.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SAND = 66,
        /**
         * Sandstorm.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SANDSTORM = 67,
        /**
         * Dense foggy.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        DENSE_FOGGY = 68,
        /**
         * Moderate foggy.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MODERATE_FOGGY = 69,
        /**
         * Moderate haze.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MODERATE_HAZE = 70,
        /**
         * Heavy haze.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HEAVY_HAZE = 71,
        /**
         * Severe haze.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SEVERE_HAZE = 72,
        /**
         * Heavy foggy.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HEAVY_FOGGY = 73,
        /**
         * Severe foggy.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SEVERE_FOGGY = 74,
        /**
         * Overcast (night).
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        OVERCAST_NIGHT = 75,
        /**
         * Blowing snow.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        BLOWING_SNOW = 76
    }
    /**
     * Enum for ExposureCategory.
     *
     * @enum { number }
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum ExposureCategory {
        /**
         * Undefined.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        UNDEFINED = 0,
        /**
         * The UV index is very low.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        VERY_LOW = 1,
        /**
         * The UV index is low.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        LOW = 2,
        /**
         * The UV index is moderate.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MODERATE = 3,
        /**
         * The UV index is high.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HIGH = 4,
        /**
         * The UV index is very high.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        VERY_HIGH = 5
    }
    /**
     * Enum for CompassDirection.
     *
     * @enum { number }
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum CompassDirection {
        /**
         * Undefined.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        UNDEFINED = 0,
        /**
         * North.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        NORTH = 1,
        /**
         * North east.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        NORTH_EAST = 2,
        /**
         * East.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        EAST = 3,
        /**
         * South east.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SOUTH_EAST = 4,
        /**
         * South.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SOUTH = 5,
        /**
         * South west.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SOUTH_WEST = 6,
        /**
         * West.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        WEST = 7,
        /**
         * North west.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        NORTH_WEST = 8
    }
    /**
     * Enum for AlertType.
     *
     * @enum { number }
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum AlertType {
        /**
         * Typhoon.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        TYPHOON = 1,
        /**
         * Rain Storm.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        RAIN_STORM = 2,
        /**
         * Snow Storm.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SNOW_STORM = 3,
        /**
         * Cold Wave.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        COLD_WAVE = 4,
        /**
         * Gale.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        GALE = 5,
        /**
         * Sand Storm.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SAND_STORM = 6,
        /**
         * Heat Wave.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HEAT_WAVE = 7,
        /**
         * Drought.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        DROUGHT = 8,
        /**
         * Lightning.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        LIGHTNING = 9,
        /**
         * Hail.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HAIL = 10,
        /**
         * Frost.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        FROST = 11,
        /**
         * Heavy Fog.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HEAVY_FOG = 12,
        /**
         * Haze.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HAZE = 13,
        /**
         * Road Icing.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        ROAD_ICING = 14,
        /**
         * Other.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        OTHER = 15,
        /**
         * Thunder and Gale.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        THUNDER_AND_GALE = 17,
        /**
         * Forest Fire Risk.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        FOREST_FIRE_RISK = 18,
        /**
         * Cold.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        COLD = 19,
        /**
         * Dust Haze.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        DUST_HAZE = 20,
        /**
         * Cooling.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        COOLING = 21,
        /**
         * Road Ice and Snow.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        ROAD_ICE_AND_SNOW = 22,
        /**
         * Dry Hot Wind.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        DRY_HOT_WIND = 23,
        /**
         * Haze Very Unhealthy.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HAZE_VERY_UNHEALTHY = 24,
        /**
         * Frozen.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        FROZEN = 25,
        /**
         * Heavy Fog at Sea.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HEAVY_FOG_AT_SEA = 26,
        /**
         * Thunderstorm and Gale.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        THUNDERSTORM_AND_GALE = 27,
        /**
         * Continuous Low Temperature.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        CONTINUOUS_LOW_TEMPERATURE = 28,
        /**
         * Thick Dust.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        THICK_DUST = 29,
        /**
         * Tornado.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        TORNADO = 30,
        /**
         * Low Temperature Freeze Injury.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        LOW_TEMPERATURE_FREEZE_INJURY = 31,
        /**
         * Gale at Sea.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        GALE_AT_SEA = 32,
        /**
         * Low Temperature Freezing Rain and Snow.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        LOW_TEMPERATURE_FREEZING_RAIN_AND_SNOW = 33,
        /**
         * Severe Convection.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SEVERE_CONVECTION = 34,
        /**
         * Ozone.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        OZONE = 35,
        /**
         * heavy Snow.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HEAVY_SNOW = 36,
        /**
         * Heavy Rainfall.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HEAVY_RAINFALL = 37,
        /**
         * Strong Cooling.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        STRONG_COOLING = 38,
        /**
         * Snow Disaster.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SNOW_DISASTER = 39,
        /**
         * Forest (Grassland) Fire Risk.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        FOREST_GRASSLAND_FIRE_RISK = 40,
        /**
         * Thunderstorm.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        THUNDERSTORM = 41,
        /**
         * Severe Cold.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SEVERE_COLD = 42,
        /**
         * Sand Dust.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SAND_DUST = 43,
        /**
         * Thunderstorm and Gale at Sea.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        THUNDERSTORM_AND_GALE_AT_SEA = 44,
        /**
         * Lightning at Sea.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        LIGHTNING_AT_SEA = 45,
        /**
         * Typhoon at Sea.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        TYPHOON_AT_SEA = 46,
        /**
         * Low Temperature.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        LOW_TEMPERATURE = 47,
        /**
         * Geological Hazard.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        GEOLOGICAL_HAZARD = 48,
        /**
         * Geological Hazard and Meteorological Risk.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        GEOLOGICAL_HAZARD_AND_METEOROLOGICAL_RISK = 49,
        /**
         * Flush Flood.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        FLUSH_FLOOD = 50,
        /**
         * Grassland Fire Risk.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        GRASSLAND_FIRE_RISK = 51,
        /**
         * Thunder rain and Gale.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        THUNDER_RAIN_AND_GALE = 52
    }
    /**
     * Enum for AlertLevel.
     *
     * @enum { number }
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum AlertLevel {
        /**
         * Blue alert.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        BLUE = 1,
        /**
         * Yellow alert.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        YELLOW = 2,
        /**
         * Orange alert.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        ORANGE = 3,
        /**
         * Red alert.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        RED = 4,
        /**
         * Other alert.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        OTHER = 5,
        /**
         * White alert.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        WHITE = 6,
        /**
         * Black alert.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        BLACK = 7
    }
    /**
     * Enum for MoonPhaseType.
     *
     * @enum { number }
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum MoonPhaseType {
        /**
         * Undefined.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        UNDEFINED = 0,
        /**
         * The disk is unlit where the moon is not visible.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        NEW = 1,
        /**
         * The disk is partially lit as the moon is waxing.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        WAXING_CRESCENT = 2,
        /**
         * The disk is half lit.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        FIRST_QUARTER = 3,
        /**
         * The disk is half lit as the moon is waxing.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        WAXING_GIBBOUS = 4,
        /**
         * The disk is fully lit where the moon is visible.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        FULL = 5,
        /**
         * The disk is half lit as the moon is waning.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        WANING_GIBBOUS = 6,
        /**
         * The disk is half lit.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        LAST_QUARTER = 7,
        /**
         * The disk is partially lit as the moon is waning.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        WANING_CRESCENT = 8
    }
    /**
     * Enum for Precipitation.
     *
     * @enum { number }
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum Precipitation {
        /**
         * No precipitation.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        NONE = 0,
        /**
         * A form of precipitation consisting of solid ice.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HAIL = 1,
        /**
         * Rain.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        RAIN = 2,
        /**
         * A form of precipitation consisting of ice pellets.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SLEET = 3,
        /**
         * Snow.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SNOW = 4
    }
    /**
     * Enum for AqiCategory.
     *
     * @enum { number }
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum AqiCategory {
        /**
         * UnKnown.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        UNDEFINED = 0,
        /**
         * Excellent.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        EXCELLENT = 1,
        /**
         * Good.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        GOOD = 2,
        /**
         * Slight.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SLIGHT = 3,
        /**
         * Moderate.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MODERATE = 4,
        /**
         * Heavy.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HEAVY = 5,
        /**
         * Severe.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SEVERE = 6
    }
    /**
     * Enum for WeatherIndexType.
     *
     * @enum { number }
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum WeatherIndexType {
        /**
         * Undefined.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        UNDEFINED = 0,
        /**
         * Dressing.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        DRESSING = 1,
        /**
         * Motion.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MOTION = 2,
        /**
         * Cold.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        COLD = 3,
        /**
         * CarWash.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        CAR_WASHING = 4,
        /**
         * Tourism.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        TOURISM = 5,
        /**
         * Sun protection.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SUN_PROTECTION = 7,
        /**
         * Finishing.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        FISHING = 8,
        /**
         * Morning exercise.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        MORNING_EXERCISE = 10,
        /**
         * Allergy.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        ALLERGY = 24,
        /**
         * Skiing.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        SKIING = 31,
        /**
         * Stargazing.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        STARGAZING = 34
    }
    /**
     * Enum for TideCategory.
     *
     * @enum { number }
     * @syscap SystemCapability.Weather.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum TideCategory {
        /**
         * Undefined.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        UNDEFINED = 0,
        /**
         * High.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        HIGH = 1,
        /**
         * Low.
         *
         * @syscap SystemCapability.Weather.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        LOW = 2
    }
}
export default weatherService;
