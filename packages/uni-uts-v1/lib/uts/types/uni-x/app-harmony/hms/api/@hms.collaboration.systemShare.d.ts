/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Defines share capability.
 * @kit ShareKit
 */
import type Want from '@ohos.app.ability.Want';
import type common from '@ohos.app.ability.common';
/**
 * Provide methods make the host (data owner) application can conveniently wrap shared data,
 * make show the system share panel.
 *
 * @namespace systemShare
 * @syscap SystemCapability.Collaboration.SystemShare
 * @since 4.1.0(11)
 */
declare namespace systemShare {
    /**
     * Describe the shared data.
     *
     * @syscap SystemCapability.Collaboration.SystemShare
     * @since 4.1.0(11)
     */
    class SharedData {
        /**
         * Create shared data with shared record
         *
         * @param { SharedRecord } record - Record will add into shared data
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        constructor(record: SharedRecord);
        /**
         * Add a record into shared data
         *
         * @param { SharedRecord } record - Record will add into shared data.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1003700001 - The number of records exceeds the maximum.
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        addRecord(record: SharedRecord): void;
        /**
         * Get all records of shared data
         *
         * @returns { Array<SharedRecord> } Return the records of shared data
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        getRecords(): Array<SharedRecord>;
    }
    /**
     * Describe the shared record
     * @typedef SharedRecord
     * @syscap SystemCapability.Collaboration.SystemShare
     * @since 4.1.0(11)
     */
    interface SharedRecord {
        /**
         * Indicates the uniform type descriptor of shared record,
         * for details,see {@link @ohos.data.uniformTypeDescriptor}.
         *
         * @type { string }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        utd: string;
        /**
         * Indicates the content of shared record, information that does not
         * require authorization, including but not limited to text, HTML text, and URL.
         *
         * @type { ?string }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        content?: string;
        /**
         * Indicates the uri of shared record.
         *
         * @type { ?string }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        uri?: string;
        /**
         * Indicates the title of shared record
         *
         * @type { ?string }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        title?: string;
        /**
         * Indicates the label of shared record
         *
         * @type { ?string }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        label?: string;
        /**
         * Indicates the description of shared record
         *
         * @type { ?string }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        description?: string;
        /**
         * Indicates the thumbnail of shared record
         *
         * @type { ?Uint8Array }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        thumbnail?: Uint8Array;
        /**
         * Indicates the extra data of shared record. The content
         * is forwarded to the target application without permission authorization.
         *
         * @type { ?Record<string, string | number | boolean | Array<string | number | boolean>> }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        extraData?: Record<string, string | number | boolean | Array<string | number | boolean>>;
    }
    /**
     * Defines the offset property.
     * @typedef Offset
     * @syscap SystemCapability.Collaboration.SystemShare
     * @since 4.1.0(11)
     */
    interface Offset {
        /**
         * Coordinate x of the Position.
         *
         * @type { number }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        x: number;
        /**
         * Coordinate y of the Position.
         *
         * @type { number }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        y: number;
    }
    /**
     * Defines the size property.
     *
     * @typedef Size
     * @syscap SystemCapability.Collaboration.SystemShare
     * @since 4.1.0(11)
     */
    interface Size {
        /**
         * Defines the width property.
         *
         * @type { number }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        width: number;
        /**
         * Defines the height property.
         *
         * @type { number }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        height: number;
    }
    /**
     * Defines share controller anchor.
     * @typedef ShareControllerAnchor
     * @syscap SystemCapability.Collaboration.SystemShare
     * @since 4.1.0(11)
     */
    interface ShareControllerAnchor {
        /**
         * Indicates the window offset of share controller
         * can set Precise coordinates, or set the Coordinates of the upper left vertex of the component
         * then set the size of the selected content area.
         *
         * @type { Offset }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        windowOffset: Offset;
        /**
         * Indicates the size of the selected content area.
         *
         * @type { ?Size }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        size?: Size;
    }
    /**
     * Shared data preview mode definitions.
     *
     * @enum { number }
     * @syscap SystemCapability.Collaboration.SystemShare
     * @since 4.1.0(11)
     */
    enum SharePreviewMode {
        /**
         * Indicates the default preview mode.
         *
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        DEFAULT = 0,
        /**
         * Indicates the detail preview mode.
         *
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        DETAIL
    }
    /**
     * SystemShare ShareAbilityType definitions.
     *
     * @enum { number }
     * @syscap SystemCapability.Collaboration.SystemShare
     * @since 5.0.0(12)
    */
    enum ShareAbilityType {
        /**
        * Indicates the Ability of copy data to pastbroad.
        *
        * @syscap SystemCapability.Collaboration.SystemShare
        * @since 5.0.0(12)
        */
        COPY_TO_PASTEBOARD = 0,
        /**
         * Indicates the Ability of save files as media assets.
         *
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 5.0.0(12)
         */
        SAVE_TO_MEDIA_ASSET = 1,
        /**
         * Indicates the Ability of save files as normal files.
         *
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 5.0.0(12)
         */
        SAVE_AS_FILE = 2,
        /**
         * Indicates the Ability of Print
         *
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 5.0.0(12)
         */
        PRINT = 3,
        /**
         * Indicates the Ability of SuperHub
         *
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 5.0.0(12)
         */
        SAVE_TO_SUPERHUB = 4
    }
    /**
     * Selection mode definitions.
     *
     * @enum { number }
     * @syscap SystemCapability.Collaboration.SystemShare
     * @since 4.1.0(11)
     */
    enum SelectionMode {
        /**
         * Indicates the single selection mode.
         *
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        SINGLE = 0,
        /**
         * Indicates the batch selection mode.
         *
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        BATCH = 1
    }
    /**
     * Share controller options definitions.
     * @typedef ShareControllerOptions
     * @syscap SystemCapability.Collaboration.SystemShare
     * @since 4.1.0(11)
     */
    interface ShareControllerOptions {
        /**
         * Indicates the selection mode.
         *
         * @type { ?SelectionMode }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        selectionMode?: SelectionMode;
        /**
         * Indicates the anchor of system share panel, set anchor or the ID of component.
         *
         * @type { ?(ShareControllerAnchor | string) }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        anchor?: ShareControllerAnchor | string;
        /**
         * Indicates the preview mode.
         *
         * @type { ?SharePreviewMode }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        previewMode?: SharePreviewMode;
        /**
         * Indicates configuration information about excluded Share Abilities.
         *
         * @type { ?Array<ShareAbilityType> }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 5.0.0(12)
         */
        excludedAbilities?: Array<ShareAbilityType>;
    }
    /**
     * Share controller definitions, the controller can present system share panel.
     *
     * @syscap SystemCapability.Collaboration.SystemShare
     * @since 4.1.0(11)
     */
    class ShareController {
        /**
         * Create share controller with shared data
         *
         * @param { SharedData } data - host application's shared data
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        constructor(data: SharedData);
        /**
         * show system share panel
         * @param { common.UIAbilityContext } context - the context of an ability.
         * @param { ShareControllerOptions } options - fill the share controller configuration.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1003702001 -  Record types are not support.
         *   (The batch and multiple selection modes support { @link UDMF.File } type records only.)
         * @throws { BusinessError } 1003702002 - IPC data is oversized.
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        show(context: common.UIAbilityContext, options: ShareControllerOptions): Promise<void>;
        /**
         * Register dismiss event callback.
         *
         * @param { 'dismiss' } event - canceled event.
         * @param { function } callback - Called when system share panel dismissed.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        on(event: 'dismiss', callback: () => void): void;
        /**
         * Cancel callback registered through { @link on }.
         *
         * @param { 'dismiss' } event - canceled event.
         * @param { function } callback - Called when callback unregister.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        off(event: 'dismiss', callback: () => void): void;
    }
    /**
     * result Code of uiextension abilities.
     *
     * @enum { number }
     * @syscap SystemCapability.Collaboration.SystemShare
     * @since 5.0.0(12)
    */
    enum ShareAbilityResultCode {
        /**
         * Indicates an error happened in abilities.
         *
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 5.0.0(12)
         */
        ERROR = -1,
        /**
         * Indicates user click back button.
         *
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 5.0.0(12)
         */
        BACK = 0,
        /**
         * Indicates user click close button.
         *
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 5.0.0(12)
         */
        CLOSE = 1
    }
    /**
     * Contact information definitions.
     * @typedef ContactInfo
     * @syscap SystemCapability.Collaboration.SystemShare
     * @since 4.1.0(11)
     */
    interface ContactInfo {
        /**
         * Indicates the contact type.
         *
         * @type { string }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        contactType: string;
        /**
         * Indicates the contact ID.
         *
         * @type { string }
         * @syscap SystemCapability.Collaboration.SystemShare
         * @since 4.1.0(11)
         */
        contactId: string;
    }
    /**
     * Create shared data information from want.
     *
     * @param { Want } want - the want transferred to the ability with sharing capability.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1003703001 - parse data failed.
     * @syscap SystemCapability.Collaboration.SystemShare
     * @since 4.1.0(11)
     */
    function getSharedData(want: Want): Promise<SharedData>;
    /**
     * Create want from shared data information.
     *
     * @param { SharedData } data - the shared data information transferred to the ability with sharing capability.
     * @param { ShareControllerOptions } options - fill the share controller configuration.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1003703001 - parse data failed.
     * @syscap SystemCapability.Collaboration.SystemShare
     * @since 5.0.0(12)
     */
    function getWant(data: SharedData, options?: ShareControllerOptions): Promise<Want>;
    /**
     * Create contact information from want .
     *
     * @param { Want } want - the want transferred to the ability with sharing capability.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1003703001 - parse data failed.
     * @syscap SystemCapability.Collaboration.SystemShare
     * @since 4.1.0(11)
     */
    function getContactInfo(want: Want): Promise<ContactInfo>;
}
export default systemShare;
