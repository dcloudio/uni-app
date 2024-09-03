/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file This module provides the capabilities to use FIDO online authentication.
 * @kit OnlineAuthenticationKit
 */
import type common from '@ohos.app.ability.common';
/**
 * This module provides the capabilities to use fido authentication.
 *
 * @namespace fido
 * @syscap SystemCapability.Security.FIDO
 * @since 4.1.0(11)
 */
/**
 * This module provides the capabilities to use fido authentication.
 *
 * @namespace fido
 * @syscap SystemCapability.Security.FIDO
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace fido {
    /**
     * ChannelBinding contains channel binding information.
     *
     * @typedef ChannelBinding
     * @syscap SystemCapability.Security.FIDO
     * @since 4.1.0(11)
     */
    /**
     * ChannelBinding contains channel binding information.
     *
     * @typedef ChannelBinding
     * @syscap SystemCapability.Security.FIDO
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface ChannelBinding {
        /**
         * The field serverEndPoint must be set to the base64url-encoded hash of the TLS server certificate
         * if this is available.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * The field serverEndPoint must be set to the base64url-encoded hash of the TLS server certificate
         * if this is available.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        serverEndPoint?: string;
        /**
         * This field must be absent if the TLS server certificate is not available to the FIDO UAF Client.
         * This field must be set to the base64url-encoded, DER-encoded TLS server certificate, if this data
         * is available to the FIDO UAF Client.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * This field must be absent if the TLS server certificate is not available to the FIDO UAF Client.
         * This field must be set to the base64url-encoded, DER-encoded TLS server certificate, if this data
         * is available to the FIDO UAF Client.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        tlsServerCertificate?: string;
        /**
         * Must be set to the base64url-encoded TLS channel Finished structure.
         * It must, however, be absent, if this data is not available to the FIDO UAF Client.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Must be set to the base64url-encoded TLS channel Finished structure.
         * It must, however, be absent, if this data is not available to the FIDO UAF Client.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        tlsUnique?: string;
        /**
         * Must be absent if the client TLS stack doesn't provide TLS ChannelID information to the processing entity.
         * Must be set to "unused" if TLS ChannelID information is supported by the client-side TLS stack but has not
         * been signaled by the TLS (web) server.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Must be absent if the client TLS stack doesn't provide TLS ChannelID information to the processing entity.
         * Must be set to "unused" if TLS ChannelID information is supported by the client-side TLS stack but has not
         * been signaled by the TLS (web) server.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        cidPubkey?: string;
        /**
         * Must be absent if the client TLS stack doesn't provide Token Binding ID information to the processing entity.
         * Must be set to "unused" if Token Binding ID information is supported by the client-side TLS stack but has not
         * been signaled by the TLS (web) server.
         * Otherwise, it must be set to the base64url-encoded serialized TokenBindingID structure using UTF-8 encoding.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Must be absent if the client TLS stack doesn't provide Token Binding ID information to the processing entity.
         * Must be set to "unused" if Token Binding ID information is supported by the client-side TLS stack but has not
         * been signaled by the TLS (web) server.
         * Otherwise, it must be set to the base64url-encoded serialized TokenBindingID structure using UTF-8 encoding.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        tokenBinding?: string;
    }
    /**
     * The UAFMessage dictionary is a wrapper object that contains the raw UAF protocol Message and additional JSON data.
     *
     * @typedef UAFMessage
     * @syscap SystemCapability.Security.FIDO
     * @since 4.1.0(11)
     */
    /**
     * The UAFMessage dictionary is a wrapper object that contains the raw UAF protocol Message and additional JSON data.
     *
     * @typedef UAFMessage
     * @syscap SystemCapability.Security.FIDO
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface UAFMessage {
        /**
         * This key contains the UAF protocol Message that will be processed by the FIDO UAF Client or Server.
         *
         * @type { string }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * This key contains the UAF protocol Message that will be processed by the FIDO UAF Client or Server.
         *
         * @type { string }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        uafProtocolMessage: string;
        /**
         * This key allows the FIDO Server or client application to attach additional data.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * This key allows the FIDO Server or client application to attach additional data.
         *
         * @type { ?string }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        additionalData?: string;
    }
    /**
     * Describes a version of the UAF protocol.
     *
     * @typedef Version
     * @syscap SystemCapability.Security.FIDO
     * @since 4.1.0(11)
     */
    /**
     * Describes a version of the UAF protocol.
     *
     * @typedef Version
     * @syscap SystemCapability.Security.FIDO
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface Version {
        /**
         * Major version number.
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Major version number.
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        major: number;
        /**
         * Minor version number.
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Minor version number.
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        minor: number;
    }
    /**
     * Describes an RGB three-sample tuple palette entry.
     *
     * @typedef RgbPaletteEntry
     * @syscap SystemCapability.Security.FIDO
     * @since 4.1.0(11)
     */
    /**
     * Describes an RGB three-sample tuple palette entry.
     *
     * @typedef RgbPaletteEntry
     * @syscap SystemCapability.Security.FIDO
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface RgbPaletteEntry {
        /**
         * Red channel sample value
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Red channel sample value
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        r: number;
        /**
         * Green channel sample value
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Green channel sample value
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        g: number;
        /**
         * Blue channel sample value
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Blue channel sample value
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        b: number;
    }
    /**
     * Describes a PNG image characteristics as defined in the PNG spec for image header and palette table.
     *
     * @typedef DisplayPNGCharacteristicsDescriptor
     * @syscap SystemCapability.Security.FIDO
     * @since 4.1.0(11)
     */
    /**
     * Describes a PNG image characteristics as defined in the PNG spec for image header and palette table.
     *
     * @typedef DisplayPNGCharacteristicsDescriptor
     * @syscap SystemCapability.Security.FIDO
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface DisplayPNGCharacteristicsDescriptor {
        /**
         * Image width
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Image width
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        width: number;
        /**
         * Image height
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Image height
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        height: number;
        /**
         * Bit depth
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Bit depth
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        bitDepth: number;
        /**
         * Color type defines the PNG image type.
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Color type defines the PNG image type.
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        colorType: number;
        /**
         * Compression method used to compress the image data.
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Compression method used to compress the image data.
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        compression: number;
        /**
         * Filter method is the preprocessing method applied to the image data before compression.
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Filter method is the preprocessing method applied to the image data before compression.
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        filter: number;
        /**
         * Interlace method is the transmission order of the image data.
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Interlace method is the transmission order of the image data.
         *
         * @type { number }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        interlace: number;
        /**
         * 1 to 256 palette entries
         *
         * @type { ?Array<RgbPaletteEntry> }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * 1 to 256 palette entries
         *
         * @type { ?Array<RgbPaletteEntry> }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        plte?: Array<RgbPaletteEntry>;
    }
    /**
     * Describes the subset of both verified metadata and transient information about the state of an available authenticator.
     *
     * @typedef Authenticator
     * @syscap SystemCapability.Security.FIDO
     * @since 4.1.0(11)
     */
    /**
     * Describes the subset of both verified metadata and transient information about the state of an available authenticator.
     *
     * @typedef Authenticator
     * @syscap SystemCapability.Security.FIDO
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface Authenticator {
        /**
         * Name for the authenticator
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Name for the authenticator
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly title: string;
        /**
         * The Authenticator Attestation ID, which identifies the type and batch of the authenticator.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * The Authenticator Attestation ID, which identifies the type and batch of the authenticator.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly aaid: string;
        /**
         * The description string for the authenticator.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * The description string for the authenticator.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly description: string;
        /**
         * Indicates the UAF protocol Versions supported by the authenticator.
         *
         * @type { Array<Version> }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Indicates the UAF protocol Versions supported by the authenticator.
         *
         * @type { Array<Version> }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly supportedUAFVersions: Array<Version>;
        /**
         * The assertion scheme the authenticator uses for attested data and signatures.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * The assertion scheme the authenticator uses for attested data and signatures.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly assertionScheme: string;
        /**
         * Supported Authentication Algorithm.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Supported Authentication Algorithm.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly authenticationAlgorithm: number;
        /**
         * A list of supported attestation types.
         *
         * @type { Array<number> }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * A list of supported attestation types.
         *
         * @type { Array<number> }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly attestationTypes: Array<number>;
        /**
         * A set of bit flags indicating the user verification methods supported by the authenticator.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * A set of bit flags indicating the user verification methods supported by the authenticator.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly userVerification: number;
        /**
         * A set of bit flags indicating the key protection used by the authenticator.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * A set of bit flags indicating the key protection used by the authenticator.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly keyProtection: number;
        /**
         * A set of bit flags indicating the matcher protection used by the authenticator.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * A set of bit flags indicating the matcher protection used by the authenticator.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly matcherProtection: number;
        /**
         * A set of bit flags indicating how the authenticator is currently connected to the FIDO User Device.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * A set of bit flags indicating how the authenticator is currently connected to the FIDO User Device.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly attachmentHint: number;
        /**
         * Indicates whether the authenticator can only be used as a second-factor.
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Indicates whether the authenticator can only be used as a second-factor.
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly isSecondFactorOnly: boolean;
        /**
         * A set of bit flags indicating the availability and type of transaction confirmation display.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * A set of bit flags indicating the availability and type of transaction confirmation display.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly tcDisplay: number;
        /**
         * The MIME content-type [RFC2045] supported by the transaction confirmation display.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * The MIME content-type [RFC2045] supported by the transaction confirmation display.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly tcDisplayContentType: string;
        /**
         * The set of PNG characteristics currently supported by the transaction confirmation display.
         *
         * @type { Array<DisplayPNGCharacteristicsDescriptor> }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * The set of PNG characteristics currently supported by the transaction confirmation display.
         *
         * @type { Array<DisplayPNGCharacteristicsDescriptor> }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly tcDisplayPNGCharacteristics: Array<DisplayPNGCharacteristicsDescriptor>;
        /**
         * A PNG [PNG] icon for the authenticator.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * A PNG [PNG] icon for the authenticator.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly icon: string;
        /**
         * A list of supported UAF protocol extension identifiers.
         *
         * @type { Array<string> }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * A list of supported UAF protocol extension identifiers.
         *
         * @type { Array<string> }
         * @readonly
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly supportedExtensionIDs: Array<string>;
    }
    /**
     * Describes the current state of FIDO UAF client software and authenticators available to the application.
     *
     * @typedef DiscoveryData
     * @syscap SystemCapability.Security.FIDO
     * @since 4.1.0(11)
     */
    /**
     * Describes the current state of FIDO UAF client software and authenticators available to the application.
     *
     * @typedef DiscoveryData
     * @syscap SystemCapability.Security.FIDO
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface DiscoveryData {
        /**
         * List of FIDO UAF protocol versions supported by the client, most-preferred first.
         *
         * @type { Array<Version> }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * List of FIDO UAF protocol versions supported by the client, most-preferred first.
         *
         * @type { Array<Version> }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        supportedUAFVersions: Array<Version>;
        /**
         * Vendor of the FIDO UAF.
         *
         * @type { string }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * Vendor of the FIDO UAF.
         *
         * @type { string }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        clientVendor: string;
        /**
         * The version of the FIDO UAF Client.
         *
         * @type { Version }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * The version of the FIDO UAF Client.
         *
         * @type { Version }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        clientVersion: Version;
        /**
         * An array containing Authenticator dictionaries describing the available UAF authenticators. The order is not significant. The list may be empty.
         *
         * @type { Array<Authenticator> }
         * @syscap SystemCapability.Security.FIDO
         * @since 4.1.0(11)
         */
        /**
         * An array containing Authenticator dictionaries describing the available UAF authenticators. The order is not significant. The list may be empty.
         *
         * @type { Array<Authenticator> }
         * @syscap SystemCapability.Security.FIDO
         * @atomicservice
         * @since 5.0.0(12)
         */
        availableAuthenticators: Array<Authenticator>;
    }
    /**
     * Discovers the authentication capability of the device and returns the authenticator data supported
     * by the current device software.
     *
     * @param { common.Context } context - The context of an ability.
     * @returns { Promise<DiscoveryData> } return parameter of type DiscoveryData
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1005900015 - System Interruption.
     * @throws { BusinessError } 1005900016 - Unknown error.
     * @syscap SystemCapability.Security.FIDO
     * @since 4.1.0(11)
     */
    /**
     * Discovers the authentication capability of the device and returns the authenticator data supported
     * by the current device software.
     *
     * @param { common.Context } context - The context of an ability.
     * @returns { Promise<DiscoveryData> } return parameter of type DiscoveryData
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1005900015 - System Interruption.
     * @throws { BusinessError } 1005900016 - Unknown error.
     * @syscap SystemCapability.Security.FIDO
     * @atomicservice
     * @since 5.0.0(12)
     */
    function discover(context: common.Context): Promise<DiscoveryData>;
    /**
     * Check whether the user policy is enabled.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { UAFMessage } uafRequest - The parameter of type UAFMessage.
     * @returns { Promise<void> } return parameter of type void
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1005900005 - No authenticator matching the authenticator policy specified is available.
     * @throws { BusinessError } 1005900006 - A violation of the UAF protocol occurred.
     * @throws { BusinessError } 1005900015 - System Interruption.
     * @throws { BusinessError } 1005900016 - Unknown error.
     * @syscap SystemCapability.Security.FIDO
     * @since 4.1.0(11)
     */
    /**
     * Check whether the user policy is enabled.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { UAFMessage } uafRequest - The parameter of type UAFMessage.
     * @returns { Promise<void> } return parameter of type void
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1005900005 - No authenticator matching the authenticator policy specified is available.
     * @throws { BusinessError } 1005900006 - A violation of the UAF protocol occurred.
     * @throws { BusinessError } 1005900015 - System Interruption.
     * @throws { BusinessError } 1005900016 - Unknown error.
     * @syscap SystemCapability.Security.FIDO
     * @atomicservice
     * @since 5.0.0(12)
     */
    function checkPolicy(context: common.Context, uafRequest: UAFMessage): Promise<void>;
    /**
     * Interface for processing user operations
     *
     * @param { common.Context } context - The context of an ability.
     * @param { UAFMessage } uafRequest - The parameter of type UAFMessage.
     * @param { ChannelBinding } channelBindings - The parameter of type ChannelBinding.
     * @returns { Promise<UAFMessage> } return parameter of type UAFMessage
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1005900003 - User cancels.
     * @throws { BusinessError } 1005900005 - No authenticator matching the authenticator policy specified is available.
     * @throws { BusinessError } 1005900006 - A violation of the UAF protocol occurred.
     * @throws { BusinessError } 1005900007 - No Facet_ID is registered.
     * @throws { BusinessError } 1005900009 - The authenticator denies access to the generated request.
     * @throws { BusinessError } 1005900014 - The user does not record biometric features or the authentication module is abnormal.
     * @throws { BusinessError } 1005900015 - System Interruption.
     * @throws { BusinessError } 1005900016 - Unknown error.
     * @syscap SystemCapability.Security.FIDO
     * @since 4.1.0(11)
     */
    /**
     * Interface for processing user operations
     *
     * @param { common.Context } context - The context of an ability.
     * @param { UAFMessage } uafRequest - The parameter of type UAFMessage.
     * @param { ChannelBinding } channelBindings - The parameter of type ChannelBinding.
     * @returns { Promise<UAFMessage> } return parameter of type UAFMessage
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1005900003 - User cancels.
     * @throws { BusinessError } 1005900005 - No authenticator matching the authenticator policy specified is available.
     * @throws { BusinessError } 1005900006 - A violation of the UAF protocol occurred.
     * @throws { BusinessError } 1005900007 - No Facet_ID is registered.
     * @throws { BusinessError } 1005900009 - The authenticator denies access to the generated request.
     * @throws { BusinessError } 1005900014 - The user does not record biometric features or the authentication module is abnormal.
     * @throws { BusinessError } 1005900015 - System Interruption.
     * @throws { BusinessError } 1005900016 - Unknown error.
     * @syscap SystemCapability.Security.FIDO
     * @atomicservice
     * @since 5.0.0(12)
     */
    function processUAFOperation(context: common.Context, uafRequest: UAFMessage, channelBindings?: ChannelBinding): Promise<UAFMessage>;
    /**
     * Used to indicate the status code resulting from a FIDO UAF message delivered to the remote server.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { UAFMessage } uafResponse - The parameter of type UAFMessage.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1005900006 - A violation of the UAF protocol occurred.
     * @throws { BusinessError } 1005900015 - System Interruption.
     * @throws { BusinessError } 1005900016 - Unknown error.
     * @syscap SystemCapability.Security.FIDO
     * @since 4.1.0(11)
     */
    /**
     * Used to indicate the status code resulting from a FIDO UAF message delivered to the remote server.
     *
     * @param { common.Context } context - The context of an ability.
     * @param { UAFMessage } uafResponse - The parameter of type UAFMessage.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1005900006 - A violation of the UAF protocol occurred.
     * @throws { BusinessError } 1005900015 - System Interruption.
     * @throws { BusinessError } 1005900016 - Unknown error.
     * @syscap SystemCapability.Security.FIDO
     * @atomicservice
     * @since 5.0.0(12)
     */
    function notifyUAFResult(context: common.Context, uafResponse: UAFMessage): Promise<void>;
}
export default fido;
