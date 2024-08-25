/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 * Description: ecological rule manager scene manager ts interface define
 */
/**
* @file Ecological Scene Manager Interface Description file
* @kit StoreKit
*/
/**
 * Provides functions for the scene manager.
 *
 * @namespace sceneManager
 * @syscap SystemCapability.BundleManager.EcologicalRuleManager.SceneManager
 * @atomicservice
 * @since 4.1.0(11)
 */
declare namespace sceneManager {
    /**
     * Obtains self scene code.
     *
     * @returns { string } Returns self scene code.
     * @syscap SystemCapability.BundleManager.EcologicalRuleManager.SceneManager
     * @atomicservice
     * @since 4.1.0(11)
     */
    function getSelfSceneCode(): string;
    /**
     * Obtains ads verification version.
     *
     * @returns { number } Returns ads verification version.
     * @syscap SystemCapability.BundleManager.EcologicalRuleManager.SceneManager
     * @since 4.1.0(11)
     */
    function getAdsVerificationVersion(): number;
}
export default sceneManager;
