/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Defines collaboration service capabilities and provides collaboration service interfaces.
 * @kit ServiceCollaborationKit
 */
/**
 * Provides collaboration camera's business type, the caller needs to setup { @link businessFilter } to specify
 * kinds of business will get.
 *
 * @enum {number}
 * @deprecated since 5.0.0(12)
 * @useinstead hms.collaboration.service#CollaborationServiceFilter
 * @syscap SystemCapability.Collaboration.Camera
 * @since 4.0.0(10)
 */
declare enum CollaborationCameraBusinessFilter {
    /**
     * 0 include all abilities.
     *
     * @enum {number}
     * @deprecated since 5.0.0(12)
     * @useinstead hms.collaboration.service#CollaborationServiceFilter.ALL
     * @syscap SystemCapability.Collaboration.Camera
     * @since 4.0.0(10)
     */
    ALL = 0,
    /**
     * 1 include take photo ability.
     *
     * @enum {number}
     * @deprecated since 5.0.0(12)
     * @useinstead hms.collaboration.service#CollaborationServiceFilter.TAKE_PHOTO
     * @syscap SystemCapability.Collaboration.Camera
     * @since 4.0.0(10)
     */
    TAKE_PHOTO = 1,
    /**
     * 2 include scan document ability.
     *
     * @enum {number}
     * @deprecated since 5.0.0(12)
     * @useinstead hms.collaboration.service#CollaborationServiceFilter.SCAN_DOCUMENT
     * @syscap SystemCapability.Collaboration.Camera
     * @since 4.1.0(11)
     */
    SCAN_DOCUMENT = 2,
    /**
     * 3 include image picker ability.
     *
     * @enum {number}
     * @deprecated since 5.0.0(12)
     * @useinstead hms.collaboration.service#CollaborationServiceFilter.IMAGE_PICKER
     * @syscap SystemCapability.Collaboration.Camera
     * @since 4.1.0(11)
     */
    IMAGE_PICKER = 3
}
/**
 * Provides collaboration camera menu items with business, the caller needs to integrate it into the menu
 * that needs to be displayed.
 *
 * @param { Array<CollaborationCameraBusinessFilter> } businessFilter - Indicates the business types for the picker
 * to filter and show. The default is [0], indicates all business of camera.
 * @deprecated since 5.0.0(12)
 * @useinstead hms.collaboration.service#createCollaborationServiceMenuItems
 * @syscap SystemCapability.Collaboration.Camera
 * @since 4.0.0(10)
 */
@Builder
declare function createCollaborationCameraMenuItems(businessFilter?: Array<CollaborationCameraBusinessFilter>): void;
/**
 * Provides collaboration camera status component, the caller needs to implement the { @link onState} method
 * and declare this component in page. After the start of business, it will be called by collaboration framework.
 *
 * @deprecated since 5.0.0(12)
 * @useinstead hms.collaboration.service#CollaborationServiceStateDialog
 * @syscap SystemCapability.Collaboration.Camera
 * @since 4.0.0(10)
 */
@Component
declare struct CollaborationCameraStateDialog {
    /**
     * Provides business callback interface, will be called after the business is completed.
     *
     * @param { number } stateCode - Indicates the business end status, the value 0 indicates success, 1001202001
     * indicates canceled by camera, 1001202002 indicates error occurred, 1001202003 indicates canceled by local.
     * @param { ArrayBuffer } buffer - Indicates data returned after business success, other cases is null.
     * @deprecated since 5.0.0(12)
     * @useinstead hms.collaboration.service#CollaborationServiceStateDialog.onState
     * @syscap SystemCapability.Collaboration.Camera
     * @since 4.0.0(10)
     */
    onState: (stateCode: number, buffer: ArrayBuffer) => void;
    /**
     * The default builder function for struct, You should not need to invoke this method directly.
     *
     * @deprecated since 5.0.0(12)
     * @useinstead hms.collaboration.service#CollaborationServiceStateDialog.build
     * @syscap SystemCapability.Collaboration.Camera
     * @since 4.0.0(10)
     */
    build(): void;
}
export { CollaborationCameraBusinessFilter, createCollaborationCameraMenuItems, CollaborationCameraStateDialog };
