//
//  Types.swift
//  UniStorekit
//
//  Created by DCloud on 2024/6/28.
//

import Foundation
import StoreKit
import DCloudUTSFoundation

@available(iOS 15.0, *)
enum UniPurchaseResult {
    case success(UniPurchase)
    case pending
    case error(UniStoreKitFailure)
    
    var isSuccess: Bool {
        if case .success = self {
            return true
        }
        return false
    }
}

struct UniStoreKitErrorDetail: Equatable {
    private static let maximumCauseDepth = 8

    let domain: String
    let code: NSNumber
    let localizedDescription: String
    let causes: [UniStoreKitErrorDetail]
    let userInfo: [String: Any]

    init(
        domain: String,
        code: NSNumber,
        localizedDescription: String,
        causes: [UniStoreKitErrorDetail] = [],
        userInfo: [String: Any] = [:]
    ) {
        self.domain = domain
        self.code = code
        self.localizedDescription = localizedDescription
        self.causes = causes
        self.userInfo = userInfo
    }

    static func == (lhs: UniStoreKitErrorDetail, rhs: UniStoreKitErrorDetail) -> Bool {
        lhs.domain == rhs.domain &&
        lhs.code == rhs.code &&
        lhs.localizedDescription == rhs.localizedDescription &&
        lhs.causes == rhs.causes &&
        (lhs.userInfo as NSDictionary).isEqual(rhs.userInfo as NSDictionary)
    }
    
    init(error: Error) {
        let nsError = error as NSError
        var visited = Set<ObjectIdentifier>()
        self = Self.makeDetail(from: nsError, causeDepth: 0, visited: &visited)
    }

    private static func makeDetail(
        from nsError: NSError,
        causeDepth: Int,
        visited: inout Set<ObjectIdentifier>
    ) -> UniStoreKitErrorDetail {
        visited.insert(ObjectIdentifier(nsError))

        var causes: [UniStoreKitErrorDetail] = []
        if causeDepth < maximumCauseDepth,
           let underlyingError = nsError.userInfo[NSUnderlyingErrorKey] as? Error {
            let underlyingNSError = underlyingError as NSError
            let identifier = ObjectIdentifier(underlyingNSError)
            if !visited.contains(identifier) {
                causes = [makeDetail(
                    from: underlyingNSError,
                    causeDepth: causeDepth + 1,
                    visited: &visited
                )]
            }
        }

        return UniStoreKitErrorDetail(
            domain: nsError.domain,
            code: NSNumber(value: nsError.code),
            localizedDescription: nsError.localizedDescription,
            causes: causes,
            userInfo: nsError.userInfo
        )
    }

}

@objcMembers
final class UniStoreKitErrorBridge: NSObject {
    @nonobjc static func makeSourceError(
        _ detail: UniStoreKitErrorDetail
    ) -> DCloudUTSFoundation.SourceError {
        let sourceError = DCloudUTSFoundation.SourceError(detail.localizedDescription)
        sourceError.message = detail.localizedDescription
        sourceError.code = detail.code
        sourceError.domain = detail.domain
        sourceError.userInfo = detail.userInfo
        sourceError.subject = detail.domain

        if let cause = detail.causes.first {
            sourceError.cause = makeSourceError(cause)
        }

        return sourceError
    }
}

struct UniStoreKitFailure: Error, Equatable {
    let error: UniStoreKitError
    let detail: UniStoreKitErrorDetail?

    init(error: UniStoreKitError) {
        self.error = error

        if case .network_error(let urlError) = error, let urlError {
            self.detail = UniStoreKitErrorDetail(error: urlError)
        } else {
            self.detail = nil
        }
    }

    init(error: UniStoreKitError, sourceError: Error) {
        self.error = error
        self.detail = UniStoreKitErrorDetail(error: sourceError)
    }

    @available(iOS 15.0, *)
    init(storeKitError: StoreKitError) {
        let error = storeKitError.toUniStoreKitError()

        switch storeKitError {
        case .networkError(let urlError):
            self.init(error: error, sourceError: urlError)
        case .systemError(let underlyingError):
            self.init(error: error, sourceError: underlyingError)
        default:
            self.init(error: error, sourceError: storeKitError)
        }
    }

}

@available(iOS 15.0, *)
enum UniProductType {
    case consumable
    case nonConsumable
    case autoRenewable
    case nonRenewable
    case unknown
    
    init(type: Product.ProductType) {
        switch type {
        case .consumable: self = .consumable
        case .nonConsumable: self = .nonConsumable
        case .autoRenewable: self = .autoRenewable
        case .nonRenewable: self = .nonRenewable
        default: self = .unknown
        }
    }
}
