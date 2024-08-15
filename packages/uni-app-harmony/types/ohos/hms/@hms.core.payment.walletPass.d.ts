/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file
 * @kit WalletKit
 * @bundle com.huawei.hmos.walletkit/walletKit/ets/service/Pass 5.0.0(12)
 */
import type common from '@ohos.app.ability.common';
import rpc from '@ohos.rpc';
/**
 * This module provides the capabilities of pass cards in Wallet.
 *
 * @namespace walletPass
 * @syscap SystemCapability.Payment.Wallet
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace walletPass {
    /**
     * Manages pass cards in the specified device.
     * Sends RKE messages to the vehicle and gets the execution result.
     *
     * @syscap SystemCapability.Payment.Wallet
     * @atomicservice
     * @since 5.0.0(12)
     */
    class WalletPassClient {
        /**
          * Creates a WalletPassClient Object.
          *
          * @param { common.UIAbilityContext } Context of the caller.
          * @syscap SystemCapability.Payment.Wallet
          * @atomicservice
          * @since 5.0.0(12)
          */
        constructor(context: common.UIAbilityContext);
        /**
         * Obtains the device information of a pass card.
         *
         * @param { string } passStr - Pass card information.
         * @returns { Promise<string> } - Returns a string in JSON format, which contains the device information.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Mandatory parameters are left unspecified.
         * @throws { BusinessError } 1010200001 - No permission to access the Wallet APIs.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200003 - The environment of the wallet is not ready.
         * @throws { BusinessError } 1010200006 - The device's remote paired watch cannot be connected.
         * @throws { BusinessError } 1010200010 - Network connection error.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @throws { BusinessError } 1010220003 - Pass service is temporarily unavailable.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        queryPassDeviceInfo(passStr: string): Promise<string>;
        /**
         * Checks whether a pass card can be added to this device or the remote paired watch.
         *
         * @param { string } passStr - Pass card information.
         * @returns { Promise<string> } - Returns a string indicating the check result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Mandatory parameters are left unspecified.
         * @throws { BusinessError } 1010200001 - No permission to access the Wallet APIs.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200003 - The environment of the wallet is not ready.
         * @throws { BusinessError } 1010200004 - The device does not support this card.
         * @throws { BusinessError } 1010200006 - The device's remote paired watch cannot be connected.
         * @throws { BusinessError } 1010200009 - The chip space is full, and no more cards can be added.
         * @throws { BusinessError } 1010200010 - Network connection error.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @throws { BusinessError } 1010200015 - This card is not available for a child account.
         * @throws { BusinessError } 1010200016 - This card is not available for the current country or region.
         * @throws { BusinessError } 1010220002 - The card already exists in the specified device.
         * @throws { BusinessError } 1010220003 - Pass service is temporarily unavailable.
         * @throws { BusinessError } 1010220005 - The number of cards has reached the upper limit.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        canAddPass(passStr: string): Promise<string>;
        /**
         * Initializes the Wallet app's environment.
         *
         * @param { string } passStr - Pass card information.
         * @returns { Promise<void> } - Promise that returns no value.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Mandatory parameters are left unspecified.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200005 - The operation was canceled by the user.
         * @throws { BusinessError } 1010200011 - Failed to initialize the environment.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @throws { BusinessError } 1010200017 - The Wallet app was closed by the user.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        initWalletEnvironment(passStr: string): Promise<void>;
        /**
         * Adds a pass card into Wallet.
         *
         * @param { string } passStr - Pass card information.
         * @returns { Promise<string> } - Returns a string indicating whether the pass card has been added.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Mandatory parameters are left unspecified.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200004 - The device does not support this card.
         * @throws { BusinessError } 1010200005 - The operation was canceled by the user.
         * @throws { BusinessError } 1010200006 - The device's remote paired watch cannot be connected.
         * @throws { BusinessError } 1010200009 - The chip space is full, and no more cards can be added.
         * @throws { BusinessError } 1010200012 - Duplicate request.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @throws { BusinessError } 1010200015 - This card is not available for a child account.
         * @throws { BusinessError } 1010200016 - This card is not available for the current country or region.
         * @throws { BusinessError } 1010200017 - The Wallet app was closed by the user.
         * @throws { BusinessError } 1010220002 - The card already exists in the specified device.
         * @throws { BusinessError } 1010220003 - Pass service is temporarily unavailable.
         * @throws { BusinessError } 1010220005 - The number of cards has reached the upper limit.
         * @throws { BusinessError } 1010220401 - Failed to add the card because the signature verification failed.
         * @throws { BusinessError } 1010220402 - Failed to add the card because the data decryption failed.
         * @throws { BusinessError } 1010220403 - Failed to add the card because the instance ID does not exist.
         * @throws { BusinessError } 1010220404 - Failed to add the card because the instance ID has been used.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        addPass(passStr: string): Promise<string>;
        /**
         * Obtains the pass cards in the specified device.
         *
         * @param { string } passStr - Pass card information.
         * @returns { Promise<string> } - Returns the pass cards in the specified device.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Mandatory parameters are left unspecified.
         * @throws { BusinessError } 1010200001 - No permission to access the Wallet APIs.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200003 - The environment of the wallet is not ready.
         * @throws { BusinessError } 1010200006 - The device's remote paired watch cannot be connected.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @throws { BusinessError } 1010220501 - No card that meets the search criteria is found.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        queryPass(passStr: string): Promise<string>;
        /**
         * Views the enabled pass cards.
         *
         * @param { string } passStr - Pass card information.
         * @returns { Promise<void> } - Promise that returns no value.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        viewPass(passStr: string): Promise<void>;
        /**
         * Updates the data of a pass card.
         *
         * @param { string } passStr - Pass card information.
         * @returns { Promise<string> } - Returns a string indicating whether the pass card has been updated.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Mandatory parameters are left unspecified.
         * @throws { BusinessError } 1010200001 - No permission to access the Wallet APIs.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200005 - The operation was canceled by the user.
         * @throws { BusinessError } 1010200006 - The device's remote paired watch cannot be connected.
         * @throws { BusinessError } 1010200010 - Network connection error.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @throws { BusinessError } 1010220003 - Pass service is temporarily unavailable.
         * @throws { BusinessError } 1010220004 - The card does not exist in the specified device.
         * @throws { BusinessError } 1010220701 - Failed to update the card because no update is detected.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        updatePass(passStr: string): Promise<string>;
        /**
         * Deletes a pass card.
         *
         * @param { string } passStr - Pass card information.
         * @returns { Promise<string> } - Returns a string indicating whether the pass card has been deleted.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Mandatory parameters are left unspecified.
         * @throws { BusinessError } 1010200001 - No permission to access the Wallet APIs.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200005 - The operation was canceled by the user.
         * @throws { BusinessError } 1010200006 - The device's remote paired watch cannot be connected.
         * @throws { BusinessError } 1010200010 - Network connection error.
         * @throws { BusinessError } 1010200012 - Duplicate request.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @throws { BusinessError } 1010220003 - Pass service is temporarily unavailable.
         * @throws { BusinessError } 1010220004 - The card does not exist in the specified device.
         * @throws { BusinessError } 1010220801 - Failed to delete the card because the signature verification failed.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        deletePass(passStr: string): Promise<string>;
        /**
         * Checks the connection state between the device and the vehicle.
         *
         * @param { string } rkeStr - RKE command.
         * @returns { Promise<string> } - Returns a string in JSON format, which indicates the connection state between the device and the vehicle.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Mandatory parameters are left unspecified.
         * @throws { BusinessError } 1010200001 - No permission to access the Wallet APIs.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200006 - The device's remote paired watch cannot be connected.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @throws { BusinessError } 1010220004 - The card does not exist in the specified device.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        queryICCEConnectionState(rkeStr: string): Promise<string>;
        /**
         * Initiates a connection to the vehicle.
         *
         * @param { string } rkeStr - RKE command.
         * @returns { Promise<string> } - Returns a string, which indicates whether the connection between the device and the vehicle is established.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Mandatory parameters are left unspecified.
         * @throws { BusinessError } 1010200001 - No permission to access the Wallet APIs.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200006 - The device's remote paired watch cannot be connected.
         * @throws { BusinessError } 1010200010 - Network connection error.
         * @throws { BusinessError } 1010200012 - Duplicate request.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @throws { BusinessError } 1010220004 - The card does not exist in the specified device.
         * @throws { BusinessError } 1010221001 - Connection failed because the pairing code is not obtained.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        startICCEConnection(rkeStr: string): Promise<string>;
        /**
         * Registers an ICCE listener.
         *
         * @param { string } rkeStr - RKE command.
         * @param { rpc.RemoteObject } eventNotifyListener - Event listener.
         * @returns { Promise<string> } - Returns a string indicating whether the registration is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Mandatory parameters are left unspecified.
         * @throws { BusinessError } 1010200001 - No permission to access the Wallet APIs.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200012 - Duplicate request.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @throws { BusinessError } 1010221101 - Registration failed because of duplicate register name.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        registerICCEListener(rkeStr: string, eventNotifyListener: rpc.RemoteObject): Promise<string>;
        /**
         * Unregisters an ICCE listener.
         *
         * @param { string } rkeStr - RKE command.
         * @returns { Promise<string> } - Returns a string indicating whether the unregistration is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Mandatory parameters are left unspecified.
         * @throws { BusinessError } 1010200001 - No permission to access the Wallet APIs.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @throws { BusinessError } 1010221201 - The registration may have been unregistered before.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        unregisterICCEListener(rkeStr: string): Promise<string>;
        /**
         * Sends an RKE message.
         *
         * @param { string } rkeStr - RKE command.
         * @returns { Promise<string> } - Returns a string indicating whether the RKE message is sent successfully.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: Mandatory parameters are left unspecified.
         * @throws { BusinessError } 1010200001 - No permission to access the Wallet APIs.
         * @throws { BusinessError } 1010200002 - Wallet app not found.
         * @throws { BusinessError } 1010200006 - The device's remote paired watch cannot be connected.
         * @throws { BusinessError } 1010200012 - Duplicate request.
         * @throws { BusinessError } 1010200013 - Operation failed because of an internal error.
         * @throws { BusinessError } 1010200014 - The Wallet APIs can be called by the device owner only.
         * @throws { BusinessError } 1010220004 - The card does not exist in the specified device.
         * @throws { BusinessError } 1010221301 - Failed to send the RKE message because of a connection failure.
         * @throws { BusinessError } 1010221302 - Failed to send the RKE message because of an authentication failure.
         * @syscap SystemCapability.Payment.Wallet
         * @atomicservice
         * @since 5.0.0(12)
         */
        sendICCERKEMessage(rkeStr: string): Promise<string>;
    }
}
export default walletPass;
