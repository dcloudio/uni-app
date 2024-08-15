/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Defines collaboration service capabilities and provides collaboration service interfaces.
 * @kit ServiceCollaborationKit
 */
/**
 * Enumerates the types of collaboration services. The caller must set up a { @link businessFilter } to specify
 * the type of service to get.
 *
 * @enum {number}
 * @syscap SystemCapability.Collaboration.Service
 * @since 5.0.0(12)
 */
declare enum CollaborationServiceFilter {
    /**
     * 0 indicates all the collaboration services.
     *
     * @syscap SystemCapability.Collaboration.Service
     * @since 5.0.0(12)
     */
    ALL = 0,
    /**
     * 1 indicates the collaboration service used to take photos.
     *
     * @syscap SystemCapability.Collaboration.Service
     * @since 5.0.0(12)
     */
    TAKE_PHOTO = 1,
    /**
     * 2  indicates the collaboration service used to scan documents.
     *
     * @syscap SystemCapability.Collaboration.Service
     * @since 5.0.0(12)
     */
    SCAN_DOCUMENT = 2,
    /**
     * 3  indicates the collaboration service used to pick images.
     *
     * @syscap SystemCapability.Collaboration.Service
     * @since 5.0.0(12)
     */
    IMAGE_PICKER = 3
}
/**
 * Provides collaboration services that are displayed as menu items for user selection.
 *
 * @param { Array<CollaborationServiceFilter> } businessFilter - Type of service to be displayed as a menu item.
 * The default value is [0], indicating all the services.
 * @syscap SystemCapability.Collaboration.Service
 * @since 5.0.0(12)
 */
@Builder
declare function createCollaborationServiceMenuItems(businessFilter?: Array<CollaborationServiceFilter>): void;
/**
 * Provides the collaboration service status component. You must implement the { @link onState} method
 * and declare this component in the dialog box. After the service starts, the dialog box will be called
 * by the collaboration framework.
 *
 * @syscap SystemCapability.Collaboration.Service
 * @since 5.0.0(12)
 */
@Component
declare struct CollaborationServiceStateDialog {
    /**
     * Called when the collaboration service is completed.
     *
     * @param { number } stateCode - State of the collaboration service. The value 0 indicates success, 1001202001
     * indicates service cancellation from the peer, 1001202002 indicates an error, and 1001202003 indicates service
     * cancellation from the peer.
     * @param { string } bufferType - Type of the buffer. The value general.image indicates image. The value
     * general.video indicates video.
     * @param { ArrayBuffer } buffer - Data returned in the case of a successful operation. Null is returned
     * in other cases.
     * @syscap SystemCapability.Collaboration.Service
     * @since 5.0.0(12)
     */
    onState: (stateCode: number, bufferType: string, buffer: ArrayBuffer) => void;
    /**
     * Default builder function for struct. You should not need to invoke this method directly.
     *
     * @syscap SystemCapability.Collaboration.Service
     * @since 5.0.0(12)
     */
    build(): void;
}
export { CollaborationServiceFilter, createCollaborationServiceMenuItems, CollaborationServiceStateDialog };
