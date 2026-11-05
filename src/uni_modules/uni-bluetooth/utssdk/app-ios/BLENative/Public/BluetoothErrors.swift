import Foundation

public struct BluetoothError: Error, Equatable, Sendable {
    public let code: BluetoothErrorCode
    let context: BluetoothErrorContext
    public let outcome: BluetoothOutcome
    public let retry: BluetoothRetryDisposition

    public var message: String? { context.message }
    public var platform: BluetoothPlatformError? { context.platform }
    public var device: PlatformDeviceID? { context.operation?.device }
    public var characteristicPath: CharacteristicPath? { context.operation?.characteristicPath }
    var diagnosticReason: String? { context.discoveryReason?.rawValue }

    public static func == (lhs: Self, rhs: Self) -> Bool {
        lhs.code == rhs.code && lhs.outcome == rhs.outcome && lhs.retry == rhs.retry &&
        lhs.message == rhs.message && lhs.platform == rhs.platform && lhs.device == rhs.device &&
        lhs.characteristicPath == rhs.characteristicPath
    }

    init(code: BluetoothErrorCode,
         context: BluetoothErrorContext = .empty,
         outcome: BluetoothOutcome = .notApplicable,
         retry: BluetoothRetryDisposition = .never) {
        self.code = code
        self.context = context
        self.outcome = outcome
        self.retry = retry
    }

    static func invalidParameter(_ message: String) -> Self { Self(code: .invalidParameter, context: .init(message: message), outcome: .notSubmitted) }
    static let unsupported = Self(code: .unsupported, outcome: .notSubmitted)
    static let propertyNotSupported = Self(code: .propertyNotSupported, outcome: .notSubmitted)
    static let unsupportedGATTIdentity = Self(code: .unsupported, context: .init(message: "Duplicate GATT UUID instances are unsupported"), outcome: .submittedFailed)
    static func adapterUnavailable(reason: AdapterUnavailableReason) -> Self {
        Self(code: .adapterUnavailable, context: .init(adapterReason: reason), outcome: .notSubmitted, retry: .retryAfterAdapterRecovery)
    }
    static let adapterUnavailable = Self(code: .adapterUnavailable, outcome: .notSubmitted, retry: .retryAfterAdapterRecovery)
    static let notReady = Self(code: .sessionNotReady, outcome: .notSubmitted)
    static let runtimeNotReady = Self(code: .runtimeNotReady, outcome: .notSubmitted)
    static let alreadyConnected = Self(code: .alreadyConnected, outcome: .notSubmitted)
    static let connectionInProgress = Self(code: .connectionInProgress, outcome: .notSubmitted, retry: .retryAfterDelay)
    static let connectionLimitExceeded = Self(code: .connectionLimitExceeded, outcome: .notSubmitted, retry: .retryAfterDelay)
    static let gattNotReady = Self(code: .gattNotReady, outcome: .notSubmitted, retry: .retryAfterGattRediscovery)
    static func cancelled(_ message: String) -> Self { Self(code: .cancelled, context: .init(message: message), outcome: .notSubmitted) }
    static let timeout = Self(code: .timeout, outcome: .notSubmitted, retry: .retryAfterDelay)
    static func resourceLimitExceeded(_ message: String) -> Self { Self(code: .resourceLimitExceeded, context: .init(message: message), outcome: .notSubmitted) }
    static let deviceNotFound = Self(code: .deviceNotFound, outcome: .notSubmitted)
    static let serviceNotFound = Self(code: .serviceNotFound, outcome: .notSubmitted)
    static let characteristicNotFound = Self(code: .characteristicNotFound, outcome: .notSubmitted)
    static func staleDiscovery(ageMilliseconds: Int, freshnessWindowMilliseconds: Int) -> Self {
        Self(
            code: .deviceNotFound,
            context: .init(
                message: "discovery record is stale",
                discoveryReason: .staleDiscovery,
                discoveryAgeMilliseconds: ageMilliseconds,
                discoveryFreshnessWindowMilliseconds: freshnessWindowMilliseconds
            ),
            outcome: .notSubmitted,
            retry: .retryAfterDelay
        )
    }
    static let notConnectable = Self(code: .notConnectable, outcome: .notSubmitted)
    static let notConnected = Self(code: .notConnected, outcome: .notSubmitted)
    static func connectionFailed(_ error: BluetoothPlatformError? = nil) -> Self {
        Self(code: .connectionFailed, context: .init(platform: error), outcome: .submittedFailed, retry: .callerMustResolve)
    }
    static let outcomeUnknown = Self(code: .outcomeUnknown, outcome: .submittedOutcomeUnknown, retry: .callerMustResolve)
    static func internalFailure(_ message: String) -> Self { Self(code: .internalFailure, context: .init(message: message), outcome: .notApplicable) }
    static func busy(_ message: String) -> Self { Self(code: .operationBusy, context: .init(message: message), outcome: .notSubmitted, retry: .retryAfterDelay) }
    static func platform(_ error: BluetoothPlatformError) -> Self {
        Self(code: .platformFailure, context: .init(platform: error), outcome: .submittedOutcomeUnknown, retry: .callerMustResolve)
    }
}

public enum BluetoothErrorCode: String, Equatable, Sendable {
    case invalidParameter
    case unsupported
    case adapterUnavailable
    case runtimeNotReady
    case sessionNotReady
    case deviceNotFound
    case notConnectable
    case notConnected
    case alreadyConnected
    case connectionInProgress
    case connectionLimitExceeded
    case connectionFailed
    case gattNotReady
    case serviceNotFound
    case characteristicNotFound
    case propertyNotSupported
    case operationBusy
    case resourceLimitExceeded
    case cancelled
    case timeout
    case outcomeUnknown
    case platformFailure
    case internalFailure
    case invariantViolation
}

public enum BluetoothOutcome: String, Equatable, Sendable {
    case notApplicable
    case notSubmitted
    case submittedSucceeded
    case submittedFailed
    case submittedOutcomeUnknown
}

public enum BluetoothRetryDisposition: Equatable, Sendable {
    case never
    case retryAfterDelay
    case retryAfterAdapterRecovery
    case retryAfterReconnect
    case retryAfterGattRediscovery
    case callerMustResolve
}

public struct BluetoothPlatformError: Equatable, Sendable {
    public let domain: String
    public let code: Int
    public let message: String
    init(domain: String, code: Int, message: String) {
        self.domain = domain; self.code = code; self.message = message
    }

    init(error: Error) {
        let nsError = error as NSError
        self.init(domain: nsError.domain, code: nsError.code, message: nsError.localizedDescription)
    }
}
