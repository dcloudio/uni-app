/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Provide the navigation data service.
 * @kit MapKit
 */
import type mapCommon from '@hms.core.map.mapCommon';
import type common from '@ohos.app.ability.common';
/**
 * Provides a set of APIs, with which you can use the navigation data service to develop functions such as route planning.
 *
 * @namespace navi
 * @syscap SystemCapability.Map.Core
 * @stagemodelonly
 * @atomicservice
 * @since 4.1.0(11)
 */
declare namespace navi {
    /**
     * Plans driving routes between two places.
     *
     * Restrictions：
     * 1. Up to 3 routes can be returned for each request.
     * 2. Up to 5 waypoints can be specified.
     *
     * @param { DrivingRouteParams } params - Indicates the routes attributes.
     * @returns { Promise<RouteResult> } - The routes.
     *
     * @throws { BusinessError }        401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002600006 - The API call times exceeds the quota.
     * @throws { BusinessError } 1002600007 - The API QPS exceeds the quota.
     * @throws { BusinessError } 1002600008 - The API is in arrears.
     * @throws { BusinessError } 1002600009 - The API have not subscribed to any pay-as-you-go package.
     * @throws { BusinessError } 1002600010  - The server is busy. please wait and try again.
     * @throws { BusinessError } 1002600011 - Server error.
     * @throws { BusinessError } 1002600999 - Unknown error.
     * @throws { BusinessError } 1002602001 - The start and end points do not have home countries, or a service error occurred.
     * @throws { BusinessError } 1002602002 - Cross-region route planning is not supported.
     * @throws { BusinessError } 1002602003 - Start points or end points exceed 100.
     * @throws { BusinessError } 1002602004 - The linear distance between the start point and end point exceeds the upper limit.
     * @throws { BusinessError } 1002602005 - The start point, end point, or waypoint does not support navigation.
     * @throws { BusinessError } 1002602006 - The request point is mapped to the same point on the road.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function getDrivingRoutes(params: DrivingRouteParams): Promise<RouteResult>;
    /**
     * Plans driving routes between two places.
     *
     * Restrictions：
     * 1. Up to 3 routes can be returned for each request.
     * 2. Up to 5 waypoints can be specified.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { DrivingRouteParams } params - Indicates the routes attributes.
     * @returns { Promise<RouteResult> } - The routes.
     * @throws { BusinessError }        401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002600006 - The API call times exceeds the quota.
     * @throws { BusinessError } 1002600007 - The API QPS exceeds the quota.
     * @throws { BusinessError } 1002600008 - The API is in arrears.
     * @throws { BusinessError } 1002600009 - The API have not subscribed to any pay-as-you-go package.
     * @throws { BusinessError } 1002600010  - The server is busy. please wait and try again.
     * @throws { BusinessError } 1002600011 - Server error.
     * @throws { BusinessError } 1002600999 - Unknown error.
     * @throws { BusinessError } 1002602001 - The start and end points do not have home countries, or a service error occurred.
     * @throws { BusinessError } 1002602002 - Cross-region route planning is not supported.
     * @throws { BusinessError } 1002602003 - Start points or end points exceed 100.
     * @throws { BusinessError } 1002602004 - The linear distance between the start point and end point exceeds the upper limit.
     * @throws { BusinessError } 1002602005 - The start point, end point, or waypoint does not support navigation.
     * @throws { BusinessError } 1002602006 - The request point is mapped to the same point on the road.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getDrivingRoutes(context: common.Context, params: DrivingRouteParams): Promise<RouteResult>;
    /**
     * Plans walking routes between two places.
     *
     * Restrictions：
     * 1. A route can only be planned within a distance of 150 kilometers.
     *
     * @param { RouteParams } params - Indicates the routes attributes.
     * @returns { Promise<RouteResult> } - The routes.
     *
     * @throws { BusinessError }        401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002600006 - The API call times exceeds the quota.
     * @throws { BusinessError } 1002600007 - The API QPS exceeds the quota.
     * @throws { BusinessError } 1002600008 - The API is in arrears.
     * @throws { BusinessError } 1002600009 - The API have not subscribed to any pay-as-you-go package.
     * @throws { BusinessError } 1002600010  - The server is busy. please wait and try again.
     * @throws { BusinessError } 1002600011 - Server error.
     * @throws { BusinessError } 1002600999 - Unknown error.
     * @throws { BusinessError } 1002602001 - The start and end points do not have home countries, or a service error occurred.
     * @throws { BusinessError } 1002602002 - Cross-region route planning is not supported.
     * @throws { BusinessError } 1002602003 - Start points or end points exceed 100.
     * @throws { BusinessError } 1002602004 - The linear distance between the start point and end point exceeds the upper limit.
     * @throws { BusinessError } 1002602005 - The start point, end point, or waypoint does not support navigation.
     * @throws { BusinessError } 1002602006 - The request point is mapped to the same point on the road.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function getWalkingRoutes(params: RouteParams): Promise<RouteResult>;
    /**
     * Plans walking routes between two places.
     *
     * Restrictions：
     * 1. A route can only be planned within a distance of 150 kilometers.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { RouteParams } params - Indicates the routes attributes.
     * @returns { Promise<RouteResult> } - The routes.
     * @throws { BusinessError }        401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002600006 - The API call times exceeds the quota.
     * @throws { BusinessError } 1002600007 - The API QPS exceeds the quota.
     * @throws { BusinessError } 1002600008 - The API is in arrears.
     * @throws { BusinessError } 1002600009 - The API have not subscribed to any pay-as-you-go package.
     * @throws { BusinessError } 1002600010  - The server is busy. please wait and try again.
     * @throws { BusinessError } 1002600011 - Server error.
     * @throws { BusinessError } 1002600999 - Unknown error.
     * @throws { BusinessError } 1002602001 - The start and end points do not have home countries, or a service error occurred.
     * @throws { BusinessError } 1002602002 - Cross-region route planning is not supported.
     * @throws { BusinessError } 1002602003 - Start points or end points exceed 100.
     * @throws { BusinessError } 1002602004 - The linear distance between the start point and end point exceeds the upper limit.
     * @throws { BusinessError } 1002602005 - The start point, end point, or waypoint does not support navigation.
     * @throws { BusinessError } 1002602006 - The request point is mapped to the same point on the road.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getWalkingRoutes(context: common.Context, params: RouteParams): Promise<RouteResult>;
    /**
     * Plans cycling routes between two places.
     *
     * Restrictions：
     * 1. A route can only be planned within a distance of 500 kilometers.
     *
     * @param { RouteParams } params - Indicates the routes attributes.
     * @returns { Promise<RouteResult> } - The routes.
     *
     * @throws { BusinessError }        401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002600006 - The API call times exceeds the quota.
     * @throws { BusinessError } 1002600007 - The API QPS exceeds the quota.
     * @throws { BusinessError } 1002600008 - The API is in arrears.
     * @throws { BusinessError } 1002600009 - The API have not subscribed to any pay-as-you-go package.
     * @throws { BusinessError } 1002600010  - The server is busy. please wait and try again.
     * @throws { BusinessError } 1002600011 - Server error.
     * @throws { BusinessError } 1002600999 - Unknown error.
     * @throws { BusinessError } 1002602001 - The start and end points do not have home countries, or a service error occurred.
     * @throws { BusinessError } 1002602002 - Cross-region route planning is not supported.
     * @throws { BusinessError } 1002602003 - Start points or end points exceed 100.
     * @throws { BusinessError } 1002602004 - The linear distance between the start point and end point exceeds the upper limit.
     * @throws { BusinessError } 1002602005 - The start point, end point, or waypoint does not support navigation.
     * @throws { BusinessError } 1002602006 - The request point is mapped to the same point on the road.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function getCyclingRoutes(params: RouteParams): Promise<RouteResult>;
    /**
     * Plans cycling routes between two places.
     *
     * Restrictions：
     * 1. A route can only be planned within a distance of 500 kilometers.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { RouteParams } params - Indicates the routes attributes.
     * @returns { Promise<RouteResult> } - The routes.
     * @throws { BusinessError }        401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002600006 - The API call times exceeds the quota.
     * @throws { BusinessError } 1002600007 - The API QPS exceeds the quota.
     * @throws { BusinessError } 1002600008 - The API is in arrears.
     * @throws { BusinessError } 1002600009 - The API have not subscribed to any pay-as-you-go package.
     * @throws { BusinessError } 1002600010  - The server is busy. please wait and try again.
     * @throws { BusinessError } 1002600011 - Server error.
     * @throws { BusinessError } 1002600999 - Unknown error.
     * @throws { BusinessError } 1002602001 - The start and end points do not have home countries, or a service error occurred.
     * @throws { BusinessError } 1002602002 - Cross-region route planning is not supported.
     * @throws { BusinessError } 1002602003 - Start points or end points exceed 100.
     * @throws { BusinessError } 1002602004 - The linear distance between the start point and end point exceeds the upper limit.
     * @throws { BusinessError } 1002602005 - The start point, end point, or waypoint does not support navigation.
     * @throws { BusinessError } 1002602006 - The request point is mapped to the same point on the road.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getCyclingRoutes(context: common.Context, params: RouteParams): Promise<RouteResult>;
    /**
     * Plans driving routes between multiple places.
     *
     * Scenario:
     * This function is applicable to high concurrency scenarios, for example, online ride-hailing order dispatch.
     * In this scenario, the function can calculate routes between multiple start points and end points, and
     * find the start point and end point required for online ride-hailing order dispatch.
     *
     * Restrictions:
     * 1. A route can only be planned within a distance of 10000 kilometers.
     * 2. The number of start points multiplying the number of end points cannot exceed 100.
     *
     * @param { DrivingMatrixParams } params - Indicates the routes attributes.
     * @returns { Promise<MatrixResult> } - The routes matrix.
     *
     * @throws { BusinessError }        401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002600006 - The API call times exceeds the quota.
     * @throws { BusinessError } 1002600007 - The API QPS exceeds the quota.
     * @throws { BusinessError } 1002600008 - The API is in arrears.
     * @throws { BusinessError } 1002600009 - The API have not subscribed to any pay-as-you-go package.
     * @throws { BusinessError } 1002600010  - The server is busy. please wait and try again.
     * @throws { BusinessError } 1002600011 - Server error.
     * @throws { BusinessError } 1002600999 - Unknown error.
     * @throws { BusinessError } 1002602001 - The start and end points do not have home countries, or a service error occurred.
     * @throws { BusinessError } 1002602002 - Cross-region route planning is not supported.
     * @throws { BusinessError } 1002602003 - Start points or end points exceed 100.
     * @throws { BusinessError } 1002602004 - The linear distance between the start point and end point exceeds the upper limit.
     * @throws { BusinessError } 1002602005 - The start point, end point, or waypoint does not support navigation.
     * @throws { BusinessError } 1002602006 - The request point is mapped to the same point on the road.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function getDrivingMatrix(params: DrivingMatrixParams): Promise<MatrixResult>;
    /**
     * Plans driving routes between multiple places.
     *
     * Scenario:
     * This function is applicable to high concurrency scenarios, for example, online ride-hailing order dispatch.
     * In this scenario, the function can calculate routes between multiple start points and end points, and
     * find the start point and end point required for online ride-hailing order dispatch.
     *
     * Restrictions:
     * 1. A route can only be planned within a distance of 10000 kilometers.
     * 2. The number of start points multiplying the number of end points cannot exceed 100.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { DrivingMatrixParams } params - Indicates the routes attributes.
     * @returns { Promise<MatrixResult> } - The routes matrix.
     *
     * @throws { BusinessError }        401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002600006 - The API call times exceeds the quota.
     * @throws { BusinessError } 1002600007 - The API QPS exceeds the quota.
     * @throws { BusinessError } 1002600008 - The API is in arrears.
     * @throws { BusinessError } 1002600009 - The API have not subscribed to any pay-as-you-go package.
     * @throws { BusinessError } 1002600010  - The server is busy. please wait and try again.
     * @throws { BusinessError } 1002600011 - Server error.
     * @throws { BusinessError } 1002600999 - Unknown error.
     * @throws { BusinessError } 1002602001 - The start and end points do not have home countries, or a service error occurred.
     * @throws { BusinessError } 1002602002 - Cross-region route planning is not supported.
     * @throws { BusinessError } 1002602003 - Start points or end points exceed 100.
     * @throws { BusinessError } 1002602004 - The linear distance between the start point and end point exceeds the upper limit.
     * @throws { BusinessError } 1002602005 - The start point, end point, or waypoint does not support navigation.
     * @throws { BusinessError } 1002602006 - The request point is mapped to the same point on the road.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getDrivingMatrix(context: common.Context, params: DrivingMatrixParams): Promise<MatrixResult>;
    /**
     * Plans walking routes between multiple places.
     *
     * Scenario:
     * This function is applicable to high concurrency scenarios, for example, package delivery.
     * In this scenario, the function can calculate routes between multiple start points and end points,
     * and find the start points and end points required for package delivery.
     *
     * Restrictions:
     * 1. A route can only be planned within a distance of 150 kilometers.
     * 2. The number of start points multiplying the number of end points cannot exceed 100.
     *
     * @param { MatrixParams } params - Indicates the routes attributes.
     * @returns { Promise<MatrixResult> } - The routes matrix.
     *
     * @throws { BusinessError }        401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002600006 - The API call times exceeds the quota.
     * @throws { BusinessError } 1002600007 - The API QPS exceeds the quota.
     * @throws { BusinessError } 1002600008 - The API is in arrears.
     * @throws { BusinessError } 1002600009 - The API have not subscribed to any pay-as-you-go package.
     * @throws { BusinessError } 1002600010  - The server is busy. please wait and try again.
     * @throws { BusinessError } 1002600011 - Server error.
     * @throws { BusinessError } 1002600999 - Unknown error.
     * @throws { BusinessError } 1002602001 - The start and end points do not have home countries, or a service error occurred.
     * @throws { BusinessError } 1002602002 - Cross-region route planning is not supported.
     * @throws { BusinessError } 1002602003 - Start points or end points exceed 100.
     * @throws { BusinessError } 1002602004 - The linear distance between the start point and end point exceeds the upper limit.
     * @throws { BusinessError } 1002602005 - The start point, end point, or waypoint does not support navigation.
     * @throws { BusinessError } 1002602006 - The request point is mapped to the same point on the road.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function getWalkingMatrix(params: MatrixParams): Promise<MatrixResult>;
    /**
     * Plans walking routes between multiple places.
     *
     * Scenario:
     * This function is applicable to high concurrency scenarios, for example, package delivery.
     * In this scenario, the function can calculate routes between multiple start points and end points,
     * and find the start points and end points required for package delivery.
     *
     * Restrictions:
     * 1. A route can only be planned within a distance of 150 kilometers.
     * 2. The number of start points multiplying the number of end points cannot exceed 100.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { MatrixParams } params - Indicates the routes attributes.
     * @returns { Promise<MatrixResult> } - The routes matrix.
     *
     * @throws { BusinessError }        401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002600006 - The API call times exceeds the quota.
     * @throws { BusinessError } 1002600007 - The API QPS exceeds the quota.
     * @throws { BusinessError } 1002600008 - The API is in arrears.
     * @throws { BusinessError } 1002600009 - The API have not subscribed to any pay-as-you-go package.
     * @throws { BusinessError } 1002600010  - The server is busy. please wait and try again.
     * @throws { BusinessError } 1002600011 - Server error.
     * @throws { BusinessError } 1002600999 - Unknown error.
     * @throws { BusinessError } 1002602001 - The start and end points do not have home countries, or a service error occurred.
     * @throws { BusinessError } 1002602002 - Cross-region route planning is not supported.
     * @throws { BusinessError } 1002602003 - Start points or end points exceed 100.
     * @throws { BusinessError } 1002602004 - The linear distance between the start point and end point exceeds the upper limit.
     * @throws { BusinessError } 1002602005 - The start point, end point, or waypoint does not support navigation.
     * @throws { BusinessError } 1002602006 - The request point is mapped to the same point on the road.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getWalkingMatrix(context: common.Context, params: MatrixParams): Promise<MatrixResult>;
    /**
     * Plans cycling routes between multiple places.
     *
     * Scenario:
     * This function is applicable to high concurrency scenarios, for example, package delivery.
     * In this scenario, the function can calculate routes between multiple start points and end points,
     * and find the start points and end points required for package delivery.
     *
     * Restrictions:
     * 1. A route can only be planned within a distance of 500 kilometers.
     * 2. The number of start points multiplying the number of end points cannot exceed 100.
     *
     * @param { MatrixParams } params - Indicates the routes attributes.
     * @returns { Promise<MatrixResult> } - The routes matrix.
     *
     * @throws { BusinessError }        401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002600006 - The API call times exceeds the quota.
     * @throws { BusinessError } 1002600007 - The API QPS exceeds the quota.
     * @throws { BusinessError } 1002600008 - The API is in arrears.
     * @throws { BusinessError } 1002600009 - The API have not subscribed to any pay-as-you-go package.
     * @throws { BusinessError } 1002600010  - The server is busy. please wait and try again.
     * @throws { BusinessError } 1002600011 - Server error.
     * @throws { BusinessError } 1002600999 - Unknown error.
     * @throws { BusinessError } 1002602001 - The start and end points do not have home countries, or a service error occurred.
     * @throws { BusinessError } 1002602002 - Cross-region route planning is not supported.
     * @throws { BusinessError } 1002602003 - Start points or end points exceed 100.
     * @throws { BusinessError } 1002602004 - The linear distance between the start point and end point exceeds the upper limit.
     * @throws { BusinessError } 1002602005 - The start point, end point, or waypoint does not support navigation.
     * @throws { BusinessError } 1002602006 - The request point is mapped to the same point on the road.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function getCyclingMatrix(params: MatrixParams): Promise<MatrixResult>;
    /**
     * Plans cycling routes between multiple places.
     *
     * Scenario:
     * This function is applicable to high concurrency scenarios, for example, package delivery.
     * In this scenario, the function can calculate routes between multiple start points and end points,
     * and find the start points and end points required for package delivery.
     *
     * Restrictions:
     * 1. A route can only be planned within a distance of 500 kilometers.
     * 2. The number of start points multiplying the number of end points cannot exceed 100.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { MatrixParams } params - Indicates the routes attributes.
     * @returns { Promise<MatrixResult> } - The routes matrix.
     *
     * @throws { BusinessError }        401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002600006 - The API call times exceeds the quota.
     * @throws { BusinessError } 1002600007 - The API QPS exceeds the quota.
     * @throws { BusinessError } 1002600008 - The API is in arrears.
     * @throws { BusinessError } 1002600009 - The API have not subscribed to any pay-as-you-go package.
     * @throws { BusinessError } 1002600010  - The server is busy. please wait and try again.
     * @throws { BusinessError } 1002600011 - Server error.
     * @throws { BusinessError } 1002600999 - Unknown error.
     * @throws { BusinessError } 1002602001 - The start and end points do not have home countries, or a service error occurred.
     * @throws { BusinessError } 1002602002 - Cross-region route planning is not supported.
     * @throws { BusinessError } 1002602003 - Start points or end points exceed 100.
     * @throws { BusinessError } 1002602004 - The linear distance between the start point and end point exceeds the upper limit.
     * @throws { BusinessError } 1002602005 - The start point, end point, or waypoint does not support navigation.
     * @throws { BusinessError } 1002602006 - The request point is mapped to the same point on the road.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getCyclingMatrix(context: common.Context, params: MatrixParams): Promise<MatrixResult>;
    /**
     * Captures roads based on specified coordinate points to snap the user track to the correct roads, and
     * returns a set of coordinate points on the actual roads that the vehicle was traveling along.
     *
     * Scenario:
     * Snap coordinate points on the vehicle traveling track to the actual roads.
     *
     * Restrictions:
     * The number of coordinate points cannot exceed 100, and the distance between two adjacent points must
     * be less than 500 meters.
     *
     * @param { SnapToRoadsParams } params - Indicates the routes attributes.
     * @returns { Promise<SnapToRoadsResult> } - The result.
     *
     * @throws { BusinessError }        401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002600006 - The API call times exceeds the quota.
     * @throws { BusinessError } 1002600007 - The API QPS exceeds the quota.
     * @throws { BusinessError } 1002600008 - The API is in arrears.
     * @throws { BusinessError } 1002600009 - The API have not subscribed to any pay-as-you-go package.
     * @throws { BusinessError } 1002600010  - The server is busy. please wait and try again.
     * @throws { BusinessError } 1002600011 - Server error.
     * @throws { BusinessError } 1002600999 - Unknown error.
     * @throws { BusinessError } 1002602001 - The start and end points do not have home countries, or a service error occurred.
     * @throws { BusinessError } 1002602002 - Cross-region route planning is not supported.
     * @throws { BusinessError } 1002602003 - Start points or end points exceed 100.
     * @throws { BusinessError } 1002602004 - The linear distance between the start point and end point exceeds the upper limit.
     * @throws { BusinessError } 1002602005 - The start point, end point, or waypoint does not support navigation.
     * @throws { BusinessError } 1002602006 - The request point is mapped to the same point on the road.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    function snapToRoads(params: SnapToRoadsParams): Promise<SnapToRoadsResult>;
    /**
     * Captures roads based on specified coordinate points to snap the user track to the correct roads, and
     * returns a set of coordinate points on the actual roads that the vehicle was traveling along.
     *
     * Scenario:
     * Snap coordinate points on the vehicle traveling track to the actual roads.
     *
     * Restrictions:
     * The number of coordinate points cannot exceed 100, and the distance between two adjacent points must
     * be less than 500 meters.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { SnapToRoadsParams } params - Indicates the routes attributes.
     * @returns { Promise<SnapToRoadsResult> } - The result.
     *
     * @throws { BusinessError }        401 - Invalid input parameter.
     * @throws { BusinessError } 1002600001 - System internal error.
     * @throws { BusinessError } 1002600002 - Failed to connect to the Map service.
     * @throws { BusinessError } 1002600003 - App authentication failed.
     * @throws { BusinessError } 1002600004 - The Map permission is not enabled.
     * @throws { BusinessError } 1002600006 - The API call times exceeds the quota.
     * @throws { BusinessError } 1002600007 - The API QPS exceeds the quota.
     * @throws { BusinessError } 1002600008 - The API is in arrears.
     * @throws { BusinessError } 1002600009 - The API have not subscribed to any pay-as-you-go package.
     * @throws { BusinessError } 1002600010  - The server is busy. please wait and try again.
     * @throws { BusinessError } 1002600011 - Server error.
     * @throws { BusinessError } 1002600999 - Unknown error.
     * @throws { BusinessError } 1002602001 - The start and end points do not have home countries, or a service error occurred.
     * @throws { BusinessError } 1002602002 - Cross-region route planning is not supported.
     * @throws { BusinessError } 1002602003 - Start points or end points exceed 100.
     * @throws { BusinessError } 1002602004 - The linear distance between the start point and end point exceeds the upper limit.
     * @throws { BusinessError } 1002602005 - The start point, end point, or waypoint does not support navigation.
     * @throws { BusinessError } 1002602006 - The request point is mapped to the same point on the road.
     *
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function snapToRoads(context: common.Context, params: SnapToRoadsParams): Promise<SnapToRoadsResult>;
    /**
     * The route planning attributes.
     *
     * @typedef RouteCoordinate
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface RouteCoordinate {
        /**
         * Road binding type of the start and end points.
         *
         * The params are 0 (default), 1, and 3.
         * 0: Road binding is restricted. Do not bind closed roads, roads under construction, traffic restricted roads,
         *    and roads set to avoid for the departure place. Do not bind highways, ferries, and roads set to avoid for
         *    the destination.
         * 1: Road binding is not restricted.
         * 3: track binding. You can enter longitude-latitude coordinates of consecutive track points in the
         *    originPoints field for unlimited binding. Only the start point is supported.
         *
         * @type {?number}
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        matchType?: number;
        /**
         * Latitude.
         *
         * @type {number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        latitude: number;
        /**
         * Longitude.
         *
         * @type {number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        longitude: number;
        /**
         * Accuracy.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        accuracy?: number;
        /**
         * Altitude.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        altitude?: number;
        /**
         * Bearing.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        bearing?: number;
        /**
         * Speed.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        speed?: number;
        /**
         * Timestamp.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        timestamp?: number;
    }
    /**
     * The route planning attributes.
     *
     * @typedef RouteParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface RouteParams {
        /**
         * A list of coordinates of start points for road binding, and the last coordinate
         * is the real departure place.
         *
         * The number of coordinate points cannot exceed 31, and the distance
         * between two adjacent points should be greater than 1 meters.
         *
         * @type {Array<RouteCoordinate>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        origins: Array<RouteCoordinate>;
        /**
         * Destination place.
         *
         * @type {RouteCoordinate}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        destination: RouteCoordinate;
        /**
         * Language of the returned result.
         * Currently, only zh_CN (Chinese) and en (English) are supported.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        language?: string;
        /**
         * Specified policy for calculating routes. The params are as follows:
         * 0: Take the least time (default)
         * 1: Avoid toll roads.
         * 2: Avoid highways.
         * 4: short distance.
         * 8: Avoid ferries
         * 16: Avoid congested roads.
         * 32: Prioritize main roads.
         * 64: Select routes intelligently.
         * 128: Prioritize highways.
         * 256: Take routes charging the least.
         * 512: Smooth speed.
         *
         * Restrictions:
         * The default value is 0. Currently, options 16, 32, 128, and 256 are supported only for route planning
         * in the Chinese mainland. These options will be supported in other countries and regions later.
         *
         * @type {?Array<number>}
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        avoids?: Array<number>;
        /**
         * Additional information, including:
         * 0: Base (default)
         * 1: New traffic condition information
         *
         * @type {?number}
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        extension?: number;
    }
    /**
     * Route result.
     *
     * @typedef RouteResult
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface RouteResult {
        /**
         * Routes.
         *
         * @type {Array<Route>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        routes: Array<Route>;
    }
    /**
     * The walking route planning attributes.
     *
     * @typedef DrivingRouteParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface DrivingRouteParams extends RouteParams {
        /**
         * Waypoints. You can specify up to 5 waypoints.
         *
         * @type {?Array<mapCommon.LatLng>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        waypoints?: Array<mapCommon.LatLng>;
        /**
         * Waypoint type. The params are as follows:
         * false: stopover (default)
         * true: via (pass-by)
         *
         * @type {?boolean}
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isViaType?: boolean;
        /**
         * Indicates whether to optimize the waypoint. The params are as follows:
         * false: no  (default)
         * true: yes
         *
         * @type {?boolean}
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        optimize?: boolean;
        /**
         * Indicates whether to return multiple planned routes.
         * false: no  (default)
         * true: yes
         *
         * @type {?boolean}
         * @default false
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        alternatives?: boolean;
        /**
         * Estimated departure time, in seconds since 00:00:00 on January 1, 1970 (UTC).
         * The value should be the current time or a future time.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        departAt?: number;
        /**
         * Time estimation mode. The params are as follows:
         * 0: best guess (default)
         * 1: The traffic condition is worse than the historical average.
         * 2: The traffic condition is better than the historical average.
         *
         * @type {?number}
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        trafficMode?: number;
    }
    /**
     * Route.
     *
     * @typedef Route
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface Route {
        /**
         * Steps.
         *
         * @type {Array<RouteStep>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        steps: Array<RouteStep>;
        /**
         * Overview polyline.
         *
         * @type {?Array<mapCommon.LatLng>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        overviewPolyline?: Array<mapCommon.LatLng>;
        /**
         * Optimized waypoint index.
         * This parameter is available only when viaType is set to false and optimize is set to true..
         *
         * @type {?Array<number>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        optimizedWaypoints?: Array<number>;
        /**
         * Route bounds.
         *
         * @type {?Array<CoordinateBound>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        bounds?: Array<CoordinateBound>;
        /**
         * Number of traffic lights, 0 means no traffic lights.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        trafficLightCount?: number;
        /**
         * Indicates whether the destination is in a restricted area.
         *
         * @type {?boolean}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isDestinationInRestrictedArea?: boolean;
        /**
         * Indicates whether the time zone of the destination is different from that of the departure place.
         *
         * @type {?boolean}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isDestinationInDiffTimeZone?: boolean;
        /**
         * Indicates whether the route crosses a country boundary.
         *
         * @type {?boolean}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isCrossCountry?: boolean;
        /**
         * Indicates whether the route crosses multiple country boundaries.
         *
         * @type {?boolean}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        isCrossMultiCountries?: boolean;
        /**
         * Indicates whether the route includes private or restricted roads.
         *
         * @type {?boolean}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        hasRestrictedRoad?: boolean;
        /**
         * Indicates whether the route includes rough roads.
         *
         * @type {?boolean}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        hasRoughRoad?: boolean;
        /**
         * Indicates whether the route includes ferries.
         *
         * @type {?boolean}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        hasFerry?: boolean;
        /**
         * Indicates whether the route includes toll gates.
         *
         * @type {?boolean}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        hasTolls?: boolean;
        /**
         * Indicates whether the route has stairs.
         *
         * @type {?boolean}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        hasStairs?: boolean;
    }
    /**
     * Step of route.
     *
     * @typedef RouteStep
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface RouteStep {
        /**
         * Road section information.
         *
         * @type {Array<RouteRoad>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        roads: Array<RouteRoad>;
        /**
         * Coordinate of departure place.
         *
         * @type {mapCommon.LatLng}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        startLocation: mapCommon.LatLng;
        /**
         * Departure place details.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        startAddress?: string;
        /**
         * Coordinate of destination.
         *
         * @type {mapCommon.LatLng}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        endLocation: mapCommon.LatLng;
        /**
         * Destination details.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        endAddress?: string;
        /**
         * Waypoint information.
         *
         * @type {?Array<Waypoint>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        viaWaypoints?: Array<Waypoint>;
        /**
         * Path distance, in meters.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        distance?: number;
        /**
         * Distance description.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        distanceDescription?: string;
        /**
         * Journey time, in seconds.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        duration?: number;
        /**
         * Journey time description.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        durationDescription?: string;
        /**
         * Journey time calculated based on the real-time traffic condition, in seconds.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        durationInTraffic?: number;
        /**
         * Description of the journey time calculated based on the real-time traffic condition.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        durationInTrafficDescription?: string;
    }
    /**
     * Road of a RouteStep.
     *
     * @typedef RouteRoad
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface RouteRoad {
        /**
         * Coordinate of departure place.
         *
         * @type {mapCommon.LatLng}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        startLocation: mapCommon.LatLng;
        /**
         * Coordinate of destination.
         *
         * @type {mapCommon.LatLng}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        endLocation: mapCommon.LatLng;
        /**
         * A series of coordinate points on a road section (including coordinates of the departure place and destination).
         *
         * @type {Array<mapCommon.LatLng>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        polyline: Array<mapCommon.LatLng>;
        /**
         * Path distance, in meters.
         *
         * @type {number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        distance: number;
        /**
         * Distance description.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        distanceDescription?: string;
        /**
         * Journey time, in seconds.
         *
         * @type {number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        duration: number;
        /**
         * Journey time description.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        durationDescription?: string;
        /**
         * Road name.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        roadName?: string;
        /**
         * Operation to be performed in the current step. The params are as follows:
         * - TURN_SLIGHT_LEFT
         * - TURN_SHARP_LEFT
         * - UTURN_LEFT
         * - TURN_LEFT
         * - TURN_SLIGHT_RIGHT
         * - TURN_SHARP_RIGHT
         * - UTURN_RIGHT
         * - TURN_RIGHT
         * - STRAIGHT
         * - RAMP_LEFT
         * - RAMP_RIGHT
         * - MERGE
         * - FORK_LEFT
         * - FORK_RIGHT
         * - FERRY (not supported currently)
         * - FERRY_TRAIN (not supported currently)
         * - ROUNDABOUT_LEFT
         * - ROUNDABOUT_RIGHT
         * - END
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        action?: string;
        /**
         * Road direction. The params are as follows:
         * 0: bidirectional
         * 1: forward direction
         * 2: reverse direction
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        orientation?: number;
        /**
         * Text instruction.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        instruction?: string;
        /**
         * Traffic information.
         *
         * @type {?Array<TrafficSegment>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        trafficSegments?: Array<TrafficSegment>;
    }
    /**
     * Coordinate bounds.
     *
     * @typedef CoordinateBound
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface CoordinateBound {
        /**
         * Northeast.
         *
         * @type {mapCommon.LatLng}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        northeast: mapCommon.LatLng;
        /**
         * Southwest.
         *
         * @type {mapCommon.LatLng}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        southwest: mapCommon.LatLng;
    }
    /**
     * Waypoint.
     *
     * @typedef Waypoint
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface Waypoint {
        /**
         * Longitude and latitude of the waypoint.
         *
         * @type {mapCommon.LatLng}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        location: mapCommon.LatLng;
        /**
         * Waypoint index in the step array.
         *
         * @type {number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        stepIndex: number;
    }
    /**
     * Traffic information.
     *
     * @typedef TrafficSegment
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface TrafficSegment {
        /**
         * Distance, in meters.
         *
         * @type {number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        distance: number;
        /**
         * Traffic status. The params are as follows:0: unknown
         * 1: smooth
         * 2: slow
         * 3: congested
         * 4: extremely congested
         *
         * @type {number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        status: number;
        /**
         * A series of coordinate points on a road section.
         *
         * @type {Array<mapCommon.LatLng>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        polyline: Array<mapCommon.LatLng>;
    }
    /**
     * Matrix params.
     *
     * @typedef MatrixParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface MatrixParams {
        /**
         * Longitudes and latitudes of the start points. A maximum of 100 start points are allowed.
         *
         * @type {Array<RouteCoordinate>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        origins: Array<RouteCoordinate>;
        /**
         * Longitudes and latitudes of the end points. A maximum of 100 end points are allowed.
         *
         * NOTE:
         * 1.The number of start points multiplying the number of end points cannot exceed 100.
         * 2.The linear distance between the start point and end point cannot exceed 150 km.
         *
         * @type {Array<RouteCoordinate>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        destinations: Array<RouteCoordinate>;
        /**
         * Language of the returned result.
         * Currently, only zh_CN (Chinese) and en (English) are supported.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        language?: string;
        /**
         * Specified policy for calculating routes. The params are as follows:
         * 0: Take the least time (default).
         * 1: Avoid toll roads.
         * 2: Avoid highways.
         * 4: short distance.
         * 8: Avoid ferries.
         * 16: Avoid congested roads.
         * 32: Prioritize main roads.
         * 64: Select routes intelligently.
         * 128: Prioritize highways.
         * 256: Take routes charging the least.
         *
         * Restrictions:
         * 1. Walking & cycling only supports two policies: 0 and 8.
         * 2. Driving supports all policies, but params 16, 32, 128, and 256 are supported only
         *    for route planning in the Chinese mainland. These params will be supported in other
         *    countries and regions later.
         *
         * @type {?Array<number>}
         * @default 0
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        avoids?: Array<number>;
    }
    /**
     * Matrix result.
     *
     * @typedef MatrixResult
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface MatrixResult {
        /**
         * Start point details.
         *
         * @type {Array<string>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        originAddresses: Array<string>;
        /**
         * End point details.
         *
         * @type {Array<string>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        destinationAddresses: Array<string>;
        /**
         * Distances and journey time of routes between start points and end points.
         *
         * @type {Array<MatrixRow>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        rows: Array<MatrixRow>;
    }
    /**
     * Driving matrix params.
     *
     * @typedef DrivingMatrixParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface DrivingMatrixParams extends MatrixParams {
        /**
         * Estimated departure time, in seconds since 00:00:00 on January 1, 1970 (UTC).
         * The value should be the current time or a future time.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        departAt?: number;
        /**
         * Time estimation mode. The params are as follows:
         * 0: best guess (default)
         * 1: The traffic condition is worse than the historical average.
         * 2: The traffic condition is better than the historical average.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        trafficMode?: number;
    }
    /**
     * Row of a matrix.
     *
     * @typedef MatrixRow
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface MatrixRow {
        /**
         * Cells.
         *
         * @type {Array<MatrixCell>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        cells: Array<MatrixCell>;
    }
    /**
     * Cell of a matrix.
     *
     * @typedef MatrixCell
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface MatrixCell {
        /**
         * Distance in meters.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        distance?: number;
        /**
         * Distance description.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        distanceDescription?: string;
        /**
         * Journey time, in seconds.
         *
         * @type {?number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        duration?: number;
        /**
         * Journey time description.
         *
         * @type {?string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        durationDescription?: string;
    }
    /**
     * The snap to roads attributes.
     *
     * @typedef SnapToRoadsParams
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface SnapToRoadsParams {
        /**
         * Coordinate points on the road. The number of coordinate points cannot exceed 100,
         * and the distance between two adjacent points cannot exceed 500 meters.
         *
         * @type {Array<mapCommon.LatLng>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        points: Array<mapCommon.LatLng>;
    }
    /**
     * The snap to roads result.
     *
     * @typedef SnapToRoadsResult
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface SnapToRoadsResult {
        /**
         * Time required, in milliseconds.
         *
         * @type {number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        responseTime: number;
        /**
         * Coordinate points on the road. The number of coordinate points cannot exceed 100,
         * and the distance between two adjacent points cannot exceed 500 meters.
         *
         * @type {Array<SnappedPoint>}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        snappedPoints: Array<SnappedPoint>;
    }
    /**
     * Snapped point.
     *
     * @typedef SnappedPoint
     * @syscap SystemCapability.Map.Core
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    interface SnappedPoint {
        /**
         * Latitude.
         *
         * @type {number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        latitude: number;
        /**
         * Longitude.
         *
         * @type {number}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        longitude: number;
        /**
         * ID of a road.
         *
         * @type {string}
         * @syscap SystemCapability.Map.Core
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        roadId: string;
    }
}
export default navi;
