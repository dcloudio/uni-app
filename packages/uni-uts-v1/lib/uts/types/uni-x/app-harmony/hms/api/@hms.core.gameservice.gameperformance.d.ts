/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Defines the capabilities of GameServiceKit.
 * @kit GameServiceKit
 */
import type { Callback } from '@ohos.base';
/**
 * This module provides performance capabilities for game app.
 *
 * @namespace gamePerformance
 * @syscap SystemCapability.GameService.GamePerformance
 * @since 5.0.0(12)
 */
declare namespace gamePerformance {
    /**
     * Gpu information.
     *
     * @typedef GpuInfo
     * @syscap SystemCapability.GameService.GamePerformance
     * @since 5.0.0(12)
     */
    interface GpuInfo {
        /**
         * GPU load level. The value ranges from 1 to 10 in ascending order.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        gpuLoadLevel?: number;
        /**
         * Vertex processing load level. The value ranges from 1 to 10 in ascending order.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        vertexLoadLevel?: number;
        /**
         * Fragment processing load level. The value ranges from 1 to 10 in ascending order.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        fragmentLoadLevel?: number;
        /**
         * Texture processing load level. The value ranges from 1 to 10 in ascending order.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        textureLoadLevel?: number;
        /**
         * Bandwidth load level. The value ranges from 1 to 10 in ascending order.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        bandwidthLoadLevel?: number;
    }
    /**
     * Device information.
     *
     * @typedef DeviceInfo
     * @syscap SystemCapability.GameService.GamePerformance
     * @since 5.0.0(12)
     */
    interface DeviceInfo {
        /**
         * Temperature level. The value ranges from 1 to 6. A higher value indicates a higher temperature.
         * Suggestions as:
         * 1: No action is required.
         * 2: Reduce the specifications of the service that users are unaware of.
         *    For example, reduce the background update speed or delay the running of the service.
         * 3: Suspend the services that do not need to be perceived and reduce the specifications of non-core game services.
         *    For example, reduce the foreground update speed.
         * 4: Reduce the special effects appropriately.
         * 5: Reduce the specifications of the game in all scenarios, such as the resolution, image quality, and frame rate.
         * 6: Recommend playing down to minimum specs.
         *
         * @type { number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        tempLevel: number;
        /**
         * GPU info
         *
         * @type { ?GpuInfo }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        gpuInfo?: GpuInfo;
    }
    /**
     * Basic information.
     *
     * @typedef BaseGameInfo
     * @syscap SystemCapability.GameService.GamePerformance
     * @since 5.0.0(12)
     */
    interface BaseGameInfo {
        /**
         * Message type.
         * 0: Indicates a game package message, corresponding to GamePackageInfo.
         * 1: Indicates a game config message, corresponding to GameConfigInfo.
         * 2: Indicates a game scene message, corresponding to GameSceneInfo.
         * 3: Indicates a game network status message, corresponding to GameNetInfo.
         * 4: Indicates a game player into, corresponding to GamePlayerInfo.
         *
         * @type { number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        messageType: number;
        /**
         * Extra info.
         * A json string used to carry extension parameters.
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        extra?: string;
    }
    /**
     * Game package info which not change in gaming.
     *
     * @typedef GamePackageInfo
     * @syscap SystemCapability.GameService.GamePerformance
     * @since 5.0.0(12)
     */
    interface GamePackageInfo extends BaseGameInfo {
        /**
         * Bundle name.
         *
         * @type { string }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        bundleName: string;
        /**
         * App version.
         *
         * @type { string }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        appVersion: string;
        /**
         * Game engine type.
         * 1: UNITY
         * 2: UNREAL4
         * 3: MESSIAH
         * 4: COCOS
         * 200: OTHERS
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        engineType?: number;
        /**
         * Game engine version.
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        engineVersion?: string;
        /**
         * Game type.
         * 1: MOBA
         * 2: RPG
         * 3: FPS
         * 4: FTG
         * 5: RAC
         * 200: OTHERS
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        gameType?: number;
        /**
         * Is game render with vulkan or not.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        vulkanSupported?: boolean;
    }
    /**
     * Game config info.
     *
     * @typedef GameConfigInfo
     * @syscap SystemCapability.GameService.GamePerformance
     * @since 5.0.0(12)
     */
    interface GameConfigInfo extends BaseGameInfo {
        /**
         * Max picture quality level.
         * 1: Smooth
         * 2: Balanced
         * 3: HD
         * 4: HDR HD
         * 5: UHD
         *
         * @type { number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        maxPictureQualityLevel: number;
        /**
         * Current picture quality level.
         *
         * @type { number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        currentPictureQualityLevel: number;
        /**
         * Max frame rate.
         *
         * @type { number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        maxFrameRate: number;
        /**
         * Current frame rate.
         *
         * @type { number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        currentFrameRate: number;
        /**
         * Max resolution.
         *
         * @type { string }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        maxResolution: string;
        /**
         * Current resolution.
         *
         * @type { string }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        currentResolution: string;
        /**
         * Whether antialiasing is enabled.
         *
         * @type { boolean }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        antiAliasing: boolean;
        /**
         * Whether shadow is enabled.
         *
         * @type { boolean }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        shadow: boolean;
        /**
         * Whether multiThread is enabled.
         *
         * @type { boolean }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        multithreading: boolean;
        /**
         * Whether particle effects is enabled.
         *
         * @type { boolean }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        particle: boolean;
        /**
         * Whether HD mode is enabled.
         *
         * @type { boolean }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        hdMode: boolean;
    }
    /**
     * Game scene info.
     *
     * @typedef GameSceneInfo
     * @syscap SystemCapability.GameService.GamePerformance
     * @since 5.0.0(12)
     */
    interface GameSceneInfo extends BaseGameInfo {
        /**
         * Scene id.
         * 0:The switchback scenario ends.
         * 1: The game is started.
         * 2: in-game update
         * 3: Login process
         * 4: Main screen
         * 5: Load a game (self-loading)
         * 6: Load a game (you load it and wait for other players)
         * 7: in the game
         * 8: Watch mode
         * 100+: Customized scenario
         *
         * @type { number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        sceneID: number;
        /**
         * Scene description.
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        description?: string;
        /**
         * Sub-scene id.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        subSceneID?: number;
        /**
         * Sub-scene description.
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        subDescription?: string;
        /**
         * Importance of the game scenario. The value ranges from 1 to 5 in ascending order.
         *
         * @type { number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        importanceLevel: number;
        /**
         * Frequency in one game of this scene.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        sceneFrequency?: number;
        /**
         * Duration of this scene in milliseconds.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        sceneTime?: number;
        /**
         * Recommended cpu level. The value ranges from 1 to 3 in ascending order.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        recommendedCpuLevel?: number;
        /**
         * Recommended gpu level. The value ranges from 1 to 3 in ascending order.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        recommendedGpuLevel?: number;
        /**
         * Recommended ddr level. The value ranges from 1 to 3 in ascending order.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        recommendedDdrLevel?: number;
        /**
         * Recommended fps.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        recommendedFps?: number;
        /**
         * Max fps of this scene.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        maxFps?: number;
        /**
         * Current fps of this scene.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        currentFps?: number;
        /**
         * Key thread.
         * "render": rendering thread
         * "logic": logic thread
         * "net": network thread
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        keyThread?: string;
        /**
         * Average number of draw-calls per frame of this scene.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        drawCallCount?: number;
        /**
         * Average number of model vertices per frame of this scene.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        vertexCount?: number;
        /**
         * Average number of model triangles per frame of this scene.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        triangleCount?: number;
        /**
         * Average number of shaders per frame of this scene.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        shaderCount?: number;
        /**
         * Average number of textures per frame of this scene.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        textureCount?: number;
        /**
         * Average number of meshes per frame of this scene.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        meshCount?: number;
        /**
         * Average number of channels per frame of this scene.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        channelCount?: number;
        /**
         * Number of participants on the same screen of this scene.
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        participantCount?: number;
    }
    /**
     * Game network info
     *
     * @typedef GameNetInfo
     * @syscap SystemCapability.GameService.GamePerformance
     * @since 5.0.0(12)
     */
    interface GameNetInfo extends BaseGameInfo {
        /**
         * Game network delay time in millisecond.
         * When the total delay changes, the delay is sent once. The sending delay includes the uplink delay, downlink delay, and server processing time.
         *
         * @type { string }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         * @example total:50|up:20|server:10|down:20
         */
        netLatency: string;
        /**
         * Game network load level.
         * 1: low
         * 2: mid
         * 3: high
         *
         * @type { ?number }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        netLoad?: number;
    }
    /**
     * Game player info
     *
     * @typedef GamePlayerInfo
     * @syscap SystemCapability.GameService.GamePerformance
     * @since 5.0.0(12)
     */
    interface GamePlayerInfo extends BaseGameInfo {
        /**
         * Unique identifier of the game player.
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        gamePlayerId?: string;
        /**
         * Unique identifier of all game players distributed by the developer account.
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        teamPlayerId?: string;
        /**
         * The thirdOpenId of third game.
         *
         * @type { ?string }
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        thirdOpenId?: string;
    }
    /**
     * Enumerates the game error codes.
     *
     * @enum { number }
     * @syscap SystemCapability.GameService.GamePerformance
     * @since 5.0.0(12)
     */
    enum GamePerformanceErrorCode {
        /**
         * System internal error.
         *
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        INTERNAL_ERROR = 1010300001,
        /**
         * Invalid caller.
         *
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        AUTH_FAILED = 1010300002,
        /**
         * Invalid request.
         *
         * @syscap SystemCapability.GameService.GamePerformance
         * @since 5.0.0(12)
         */
        INVALID_REQUEST = 1010300003
    }
    /**
     * Init game performance with package info.
     *
     * @param { GamePackageInfo } gamePackageInfo
     * @returns { Promise<void> } Returns void.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1010300002 - Invalid caller.
     * @syscap SystemCapability.GameService.GamePerformance
     * @since 5.0.0(12)
     */
    function init(gamePackageInfo: GamePackageInfo): Promise<void>;
    /**
     * Update game info in gaming.
     *
     * @param { T } gameInfo
     * @returns { Promise<void> } Returns void.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1010300003 - Invalid request.
     * @syscap SystemCapability.GameService.GamePerformance
     * @since 5.0.0(12)
     */
    function updateGameInfo<T extends BaseGameInfo>(gameInfo: T): Promise<void>;
    /**
     * Subscribes device state change events. When target word is detected, the callback is invoked
     *
     * @param { 'deviceStateChanged' } type - Type of the event to listen for.
     * @param { Callback<DeviceInfo> } callback - Callback is invoked when the event is triggered.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.GameService.GamePerformance
     * @since 5.0.0(12)
     */
    function on(type: 'deviceStateChanged', callback: Callback<DeviceInfo>): void;
    /**
     * Unsubscribes device state change events
     * @param { 'deviceStateChanged' } type - Type of the event to listen for.
     * @param { Callback<DeviceInfo> } [callback] - If this parameter is specified, unsubscribe only current subscriber, otherwise unsubscribe all subscribers.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.GameService.GamePerformance
     * @since 5.0.0(12)
     */
    function off(type: 'deviceStateChanged', callback?: Callback<DeviceInfo>): void;
}
export default gamePerformance;
