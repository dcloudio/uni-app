/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Provide the common handwrite view and the ability to control handwrite view behavior.
 * @bundle com.huawei.hmos.hwstylusfeature/Penkit/ets/hsp/HandwritePaint 5.0.0(12)
 * @kit Penkit
 */
import type { AsyncCallback } from '@ohos.base';
/**
 * Provides handwrite component, the caller needs to provide handwrite controller and callback
 *
 * @syscap SystemCapability.Stylus.Handwrite
 * @stagemodelonly
 * @struct
 * @atomicservice
 * @since 5.0.0(12)
 */
@Component
export struct HandwriteComponent {
    /**
     * This is the main function entry of the handwrite component.
     *
     * @syscap SystemCapability.Stylus.Handwrite
     * @type { HandwriteController }
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    handwriteController: HandwriteController;
    /**
     * Callback function when the handwrite component has finished initializing.
     *
     * @type { function }
     * @returns { void }
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    onInit?: () => void;
    /**
     * Callback function when the handwrite component is scaling.
     *
     * @type { function }
     * @param { number } scale - The handwrite component scaling ratio.
     * @returns { void }
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    onScale?: (scale: number) => void;
    /**
     * The default builder function for struct, You should not need to invoke this method directly.
     *
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    build(): void;
}
/**
 * This is the main function entry of the handwrite component.
 * All map-related methods can be accessed from this interface.
 *
 * @syscap SystemCapability.Applications.StylusFeature
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.0(12)
 */
export class HandwriteController {
    /**
     * Save handwrite content.
     *
     * @param { string } path - File path for saving the handwrite content.
     * @returns { Promise<void> }
     * @throws { BusinessError } 1010400002 - save filed
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    save(path: string): Promise<void>;
    /**
     * Load handwrite content.
     *
     * @param { string } path - File path for loading the handwrite content.
     * @returns { void }
     * @throws { BusinessError } 1010400001 - load filed
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    load(path: string): void;
    /**
     * Registers a callback to be invoked when finishing loading.
     *
     * @param { AsyncCallback<string> } callback - Callback invoked to return the id of the handwrite content page.
     * @returns { void }
     * @throws { BusinessError } 1010400001 - load filed
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    onLoad(callback: AsyncCallback<string>): void;
}
