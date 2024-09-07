/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
* @file
* @kit WalletKit
* @bundle com.huawei.hmos.walletkit/walletKit/ets/service/TransitCard 5.0.0(12)
*/
import type common from '@ohos.app.ability.common';
/**
 * This module provides the capabilities of the transit card in Wallet.
 *
 * @namespace walletTransitCard
 * @syscap SystemCapability.Payment.Wallet
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace walletTransitCard {
    /**
      * The TransitCardClient class.
      * @syscap SystemCapability.Payment.Wallet
      * @atomicservice
      * @since 5.0.0(12)
      */
    class TransitCardClient {
        /**
         * Creates a TransitCardClient Object.
         *
         * @param { common.UIAbilityContext } - Context of the caller.
         * @param { string } callerId - ID of the caller.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        constructor(context: common.UIAbilityContext, callerId: string);
        /**
         * Obtains an array of CardMetadataInDevice objects, each of which contains the device information and the metadata of every card supported
         * by the device.
         * An empty array will be returned in the device without eSE or if the specified device does not support any transit card.
         *
         * @param { DeviceType } specifiedDeviceType - Type of the specified device.
         * @param { string } callerToken? - Authentication JWT token of the mini program in Wechat, Alipay, and the like.
         * @returns { Promise<CardMetadataInDevice[]> } - Returns the array of CardMetadataInDevice objects, each of which contains the device information and
         * the metadata of every card.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Parameter verification failed.
         * @throws { BusinessError } 1010200001 - No permission to access the Wallet APIs.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200003 - The environment of the wallet is not ready.
         * @throws { BusinessError } 1010200006 - The device's remote paired watch cannot be connected.
         * @throws { BusinessError } 1010200010 - Network connection error.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        getCardMetadataInDevice(specifiedDeviceType: DeviceType, callerToken?: string): Promise<CardMetadataInDevice[]>;
        /**
         * Obtains the information of a transit card.
         *
         * @param { string } logicalCardNumber - Serial number of the card.
         * @param { string } callerToken? - Authentication JWT token of the mini program in Wechat, Alipay, and the like.
         * @param { string } specifiedDeviceId - ID of the device where the card exists.
         * @returns { Promise<TransitCardInfo> } - Returns the transit card information.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Parameter verification failed.
         * @throws { BusinessError } 1010200001 - No permission to access the Wallet APIs.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200003 - The environment of the wallet is not ready.
         * @throws { BusinessError } 1010200006 - The device's remote paired watch cannot be connected.
         * @throws { BusinessError } 1010200010 - Network connection error.
         * @throws { BusinessError } 1010210101 - The card status is not correct.
         * @throws { BusinessError } 1010210119 - Failed to read the card data.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        getTransitCardInfo(logicalCardNumber: string, specifiedDeviceId: string, callerToken?: string): Promise<TransitCardInfo>;
        /**
         * Checks whether a transit card can be added in Wallet in the specified device.
         *
         * @param { string } issuerId - ID of the issuer of the card. The value is from CardMetadata in CardMetadataInDevice.
         * @param { string } specifiedDeviceId - ID of the device where the card will be added. The value is from CardMetadataInDevice.
         * @returns { Promise<string> } - Returns a token for adding the card.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Parameter verification failed.
         * @throws { BusinessError } 1010200001 - No permission to access the Wallet APIs.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200003 - The environment of the wallet is not ready.
         * @throws { BusinessError } 1010200006 - The device's remote paired watch cannot be connected.
         * @throws { BusinessError } 1010200007 - The OS version is too old. Please upgrade the OS version.
         * @throws { BusinessError } 1010200008 - The wallet version is too old.
         * @throws { BusinessError } 1010200009 - The chip space is full, and no more cards can be added.
         * @throws { BusinessError } 1010200010 - Network connection error.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @throws { BusinessError } 1010200016 - This card is not available for the current country or region.
         * @throws { BusinessError } 1010210201 - The device does not support adding the card specified by issuerId.
         * @throws { BusinessError } 1010210202 - A card conflicting with the specified card already exists in the device.
         * @throws { BusinessError } 1010210203 - The specified card already exists.
         * @throws { BusinessError } 1010210204 - The card addition service is temporarily offline.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        canAddTransitCard(issuerId: string, specifiedDeviceId: string): Promise<string>;
        /**
         * Sets up the Wallet app's environment.
         * You should call this API to setup the Wallet app when you get the error code below from another API:
         * Error code: 1010200002 - Wallet app not found. A dialog box will be displayed to guide the user to install the app.
         * Error code: 1010200003 - The environment of the wallet is not ready. The Wallet app will be opened. The user needs to accept the
         * privacy agreement of Wallet and log in with a Huawei ID.
         *
         * @returns { Promise<void> } - Promise that returns no value.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Parameter verification failed.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200011 - Failed to initialize the environment.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200017 - The Wallet app was closed by the user.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        setupWalletEnvironment(): Promise<void>;
        /**
         * Adds a transit card into the wallet and returns the card metadata.
         *
         * @param { string } addCardOpaqueData - Result of the function canAddTransitCard.
         * @param { string } serverOrderId - Order ID generated in the service provider's backend server for the card addition business.
         * @returns { Promise<CardMetadata> } - Returns the card metadata.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Parameter verification failed.
         * @throws { BusinessError } 1010200001 - No permission to access the Wallet APIs.
         * @throws { BusinessError } 1010200010 - Network connection error.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @throws { BusinessError } 1010200016 - This card is not available for the current country or region.
         * @throws { BusinessError } 1010200017 - The Wallet app was closed by the user.
         * @throws { BusinessError } 1010210301 - The card adding conditions are not met. The order can be refunded to end the card addition process.
         * @throws { BusinessError } 1010210319 - Failed to add the card.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        addTransitCard(addCardOpaqueData: string, serverOrderId: string): Promise<CardMetadata>;
        /**
         * Recharges a transit card according to the service specified by serverOrderId and returns the new balance.
         *
         * @param { string } logicalCardNumber - Serial number of the card.
         * @param { string } specifiedDeviceId - ID of the device where the card exists.
         * @param { string } serverOrderId - Order ID generated in the service provider's backend server for the balance recharging service.
         * @returns { Promise<number> } - Returns the new balance.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Parameter verification failed.
         * @throws { BusinessError } 1010200001 - No permission to access the Wallet APIs.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200003 - The environment of the wallet is not ready.
         * @throws { BusinessError } 1010200006 - The device's remote paired watch cannot be connected.
         * @throws { BusinessError } 1010200010 - Network connection error.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @throws { BusinessError } 1010210401 - The specified card does not exist.
         * @throws { BusinessError } 1010210402 - The status of the specified card is incorrect.
         * @throws { BusinessError } 1010210419 - Failed to recharge the card.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        rechargeTransitCard(logicalCardNumber: string, specifiedDeviceId: string, serverOrderId: string): Promise<number>;
        /**
         * Updates the data of a transit card according to the service specified by serverOrderId.
         *
         * @param { string } logicalCardNumber - Serial number of the card.
         * @param { string } specifiedDeviceId - ID of the device where the card exists.
         * @param { string } serverOrderId - Order ID generated in the service provider's backend server for the card data update service.
         * @returns { Promise<void> } - Promise that returns no value.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Parameter verification failed.
         * @throws { BusinessError } 1010200001 - No permission to access the Wallet APIs.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200003 - The environment of the wallet is not ready.
         * @throws { BusinessError } 1010200006 - The device's remote paired watch cannot be connected.
         * @throws { BusinessError } 1010200010 - Network connection error.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @throws { BusinessError } 1010210501 - The specified card does not exist.
         * @throws { BusinessError } 1010210502 - The status of the specified card is incorrect.
         * @throws { BusinessError } 1010210519 - Failed to update the card data.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        updateTransitCard(logicalCardNumber: string, specifiedDeviceId: string, serverOrderId: string): Promise<void>;
        /**
         * Deletes a transit card according to the service specified by serverOrderId.
         *
         * @param { string } logicalCardNumber - Serial number of the card.
         * @param { string } specifiedDeviceId - ID of the device where the card exists.
         * @param { string } serverOrderId - Order ID generated in the service provider's backend server for the card deletion service.
         * @returns { Promise<void> } - Promise that returns no value.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Parameter verification failed.
         * @throws { BusinessError } 1010200001 - No permission to access the Wallet APIs.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200003 - The environment of the wallet is not ready.
         * @throws { BusinessError } 1010200006 - The device's remote paired watch cannot be connected.
         * @throws { BusinessError } 1010200010 - Network connection error.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @throws { BusinessError } 1010210619 - Failed to delete the card.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        deleteTransitCard(logicalCardNumber: string, specifiedDeviceId: string, serverOrderId: string): Promise<void>;
    }
    /**
     * Describes the metadata of a card.
     *
     * @typedef CardMetadata
     * @syscap SystemCapability.Payment.Wallet
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface CardMetadata {
        /**
         * ID of the issuer of the card.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        issuerId: string;
        /**
         * Applet ID for the card in the SE chip.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        aid: string;
        /**
         * Serial number of the card. It is mandatory only when a transit card exists in the device.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        logicalCardNumber?: string;
        /**
         * Card number displayed. It is mandatory only when a transit card exists in the device.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        cardNumber?: string;
        /**
         * Balance of the card. It is mandatory only when a transit card exists in the device.
         *
         * @type { ?number }
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        balance?: number;
    }
    /**
     * Describes the card metadata in the device.
     *
     * @typedef CardMetadataInDevice
     * @syscap SystemCapability.Payment.Wallet
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface CardMetadataInDevice {
        /**
         * Device ID, which is used by the developer.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        deviceId: string;
        /**
         * Device type.
         *
         * @type { DeviceType }
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        deviceType: DeviceType;
        /**
         * Device name displayed.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        displayName: string;
        /**
         * Array holding the metadata of every card supported by the device.
         *
         * @type { CardMetadata[] }
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        cardMetadata: CardMetadata[];
    }
    /**
     * Describes the transit card information.
     *
     * @typedef TransitCardInfo
     * @syscap SystemCapability.Payment.Wallet
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface TransitCardInfo {
        /**
         * Card number displayed.
         *
         * @type { string }
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        cardNumber: string;
        /**
         * Card data customized by the service provider.
         *
         * @type { ?string }
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        customCardData?: string;
    }
    /**
     * Enumerates the device types.
     *
     * @enum { number }
     * @syscap SystemCapability.Payment.Wallet
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum DeviceType {
        /**
         * Phone.
         *
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        DEVICE_PHONE = 0,
        /**
         * Wearable.
         *
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        DEVICE_WATCH = 1
    }
}
export default walletTransitCard;
