//
//  UniStoreKit.swift
//  UniStorekit
//
//  Created by DCloud on 2024/6/28.
//

import Foundation
import StoreKit
import Network

public enum UniStoreKitError: Error, Equatable {
    case purchase_not_allowed
    case product_not_available
    case promotion_info_invalid
    case user_cancelled
    case verification_failed
    case unknown_error
    case network_error(URLError?)
    case system_error
}

@available(iOS 15.0, *)
extension Product.PurchaseError {
    func toUniStoreKitError() -> UniStoreKitError {
        switch self {
        case .invalidQuantity: return .product_not_available
        case .productUnavailable: return .product_not_available
        case .purchaseNotAllowed: return .purchase_not_allowed
        case .ineligibleForOffer: return .promotion_info_invalid
        case .invalidOfferIdentifier: return .promotion_info_invalid
        case .invalidOfferPrice: return .promotion_info_invalid
        case .invalidOfferSignature: return .promotion_info_invalid
        case .missingOfferParameters: return .promotion_info_invalid
        @unknown default: return .unknown_error
        }
    }
}

@available(iOS 15.0, *)
extension StoreKitError {
    func toUniStoreKitError() -> UniStoreKitError {
        switch self {
        case .unknown: return .unknown_error
        case .userCancelled: return .user_cancelled
        case .networkError(let urlError): return .network_error(urlError)
        case .systemError: return .system_error
        case .notAvailableInStorefront: return .product_not_available
        case .notEntitled: return .system_error
        @unknown default: return .unknown_error
        }
    }
}

@available(iOS 15.0, *)
public class UniStoreKit {
    public static let shared = UniStoreKit()
    private lazy var productService = ProductService()
    private lazy var purchaseService = PurchaseService()
    
    public var cacheTransactionsMap = [String : UniPurchase]()
    
    
    private var listenerTask: Task<(), Never>?
    
    @available(iOS 15.0, *)
    public func listenForTransactionUpdates() {
        let task = Task.detached { [weak self] in
            
            for await result in Transaction.updates {
                do {
                    let transaction = try Self.checkVerified(result)
                    var shouldFinished = true
                    if transaction.revocationDate != nil {
                        // print("Transaction revoked!")
                    } else if let expirationDate = transaction.expirationDate, expirationDate < Date() {
                        // print("Transaction expired!")
                    } else if transaction.isUpgraded {
                        // print("Transaction upgraded!")
                    } else if transaction.originalID != transaction.id {
                        // print("Transaction renewal!")
                    } else {
                        // print("Transaction unfinished!")
                        shouldFinished = false
                    }
                    if shouldFinished {
                        await transaction.finish()
                    }
                    
                } catch {
                    // print("Transaction error: \(error)")
                }
            }
        }
        self.listenerTask = task
    }
    
}

///请求product api
@available(iOS 15.0, *)
extension UniStoreKit {
    public func fetchProduct(identifier: String) async -> Result<UniProduct, UniStoreKitError> {
        let result = await fetchProducts(identifiers: [identifier])
        return result.flatMap { products in
            if let product = products.first {
                return .success(product)
            }
            return .failure(.product_not_available)
        }
    }
    
    public func fetchProducts(identifiers: [String]) async -> Result<[UniProduct], UniStoreKitError> {
        do {
            if identifiers.isEmpty {
                return .failure(.product_not_available)
            }
            let products = try await productService.fetchProducts(identifiers: Set(identifiers))
            let uniProducts = products.map({ UniProduct(product: $0) })
            return .success(uniProducts)
        } catch {
            return .failure(.product_not_available)
        }
    }
    
    public func fetchProducts(products: [UniProduct]) async -> Result<[UniProduct], UniStoreKitError> {
        let ids = products.map { $0.id }
        let result = await fetchProducts(identifiers: ids)
        return result.map { _ in
            var mutableProducts = products
            for i in 0 ..< mutableProducts.count {
                mutableProducts[i].product = productService.getCachedProduct(identifier: mutableProducts[i].id)
            }
            return mutableProducts.filter({ $0.isValidFromAppStore })
        }
    }
}

///购买api
@available(iOS 15.0, *)
extension UniStoreKit {
    public func buyProduct(identifier: String, quantity: Int? = 1, appAccountToken: String? = nil, promotionalOfferID: String? = nil, promotionalKeyID: String? = nil, promotionalNonce: String? = nil, promotionalSigature: String? = nil, promotionalTimestamp: Int? = nil) async -> UniPurchaseResult {
        UniStoreKit.shared.cacheTransactionsMap.removeAll()
        do {
            let purchase = try await purchaseService.buyProduct(identifier: identifier, quantity: quantity, appAccountToken: appAccountToken, promotionalOfferID: promotionalOfferID, promotionalKeyID: promotionalKeyID, promotionalNonce: promotionalNonce, promotionalSigature: promotionalSigature, promotionalTimestamp: promotionalTimestamp)
            return purchase
        } catch let error as Product.PurchaseError {
            return .error(error.toUniStoreKitError())
        } catch let error as StoreKitError {
            return .error(error.toUniStoreKitError())
        } catch let error as UniStoreKitError {
            return .error(error)
        } catch {
            return .error(.unknown_error)
        }
    }
    
    public func buyProduct(identifier: String, purchaseOption: UniPurchaseOption? = nil) async -> UniPurchaseResult {
        UniStoreKit.shared.cacheTransactionsMap.removeAll()
        do {
            let purchase = try await purchaseService.buyProduct(identifier: identifier, purchaseOption: purchaseOption)
            return purchase
        } catch let error as Product.PurchaseError {
            return .error(error.toUniStoreKitError())
        } catch let error as StoreKitError {
            return .error(error.toUniStoreKitError())
        } catch let error as UniStoreKitError {
            return .error(error)
        } catch {
            return .error(.unknown_error)
        }
    }
    
    public func buyProduct(product: UniProduct) async -> UniPurchaseResult {
        return await buyProduct(identifier: product.id)
    }
    
    public func restorePurchase() async -> Result<Bool, UniStoreKitError> {
        do {
            try await purchaseService.restore()
            return .success(true)
        } catch let error as StoreKitError {
            return .failure(error.toUniStoreKitError())
        } catch {
            return .failure(.unknown_error)
        }
    }
    
    public func getActiveEntitlements() async -> Result<[UniPurchase], UniStoreKitError> {
        var purchases: [UniPurchase] = []
        
        for await result in Transaction.currentEntitlements {
            do {
                
                let transaction = try Self.checkVerified(result)
                let product = try await productService.fetchProduct(identifier: transaction.productID)
                let eskProduct = UniProduct(product: product)
                let purchase = UniPurchase(product: eskProduct, transaction: transaction)
                switch transaction.productType {
                case .nonRenewable:
                    //客户端应该对该类型的进行特殊处理，判断是否已经过期（transaction.purchaseDate + 包权限时长 VS 当前Date), 框架不做处理
                    purchases.append(purchase)
                case .autoRenewable:
                    // the user had upgraded to a higher-level subscription
                    if !transaction.isUpgraded {
                        purchases.append(purchase)
                    }
                default:
                    // For all other product types in `currentEntitlements`, they are all active.
                    purchases.append(purchase)
                }
            } catch let error as StoreKitError {
                return .failure(error.toUniStoreKitError())
            } catch {
                return .failure(.unknown_error)
            }
        }
        
        return .success(purchases)
    }
    
    public func getUnfinishedTransactions() async -> [UniPurchase] {
        var purchases: [UniPurchase] = []
        
        for await result in Transaction.unfinished {
            
            do {
                let transaction = try Self.checkVerified(result)
                let product = try await productService.fetchProduct(identifier: transaction.productID)
                let eskProduct = UniProduct(product: product)
                let purchase = UniPurchase(product: eskProduct, transaction: transaction)
                
                let purchseKey = purchase.productId + String(purchase.id) + String(purchase.originalID) + purchase.transaction.jsonRepresentation.base64EncodedString()
                UniStoreKit.shared.cacheTransactionsMap[purchseKey] = purchase
                
                purchases.append(purchase)
            } catch _ as StoreKitError {
                
            } catch {
                
            }
        }
        return purchases
    }
}


@available(iOS 15.0, *)
extension UniStoreKit {
    @available(iOS 15.0, *)
    class func checkVerified<T>(_ result: VerificationResult<T>) throws -> T {
        switch result {
        case .unverified:
            throw UniStoreKitError.verification_failed
        case .verified(let safe):
            return safe
        }
    }
    
    class func performAsync<T>(_ function: () async throws -> Result<T, UniStoreKitError>) async -> Result<T, UniStoreKitError> {
        do {
            return try await function()
        } catch let error as StoreKitError {
            return .failure(error.toUniStoreKitError())
        } catch let error as UniStoreKitError {
            return .failure(error)
        } catch {
            return .failure(.system_error)
        }
    }
}

@available(iOS 15.0, *)
extension UniStoreKit {
    func isNetworkAvailable() async -> Bool {
        let monitor = NWPathMonitor()
        let queue = DispatchQueue.global(qos: .background)
        
        return await withCheckedContinuation { continuation in
            monitor.pathUpdateHandler = { path in
                if path.status == .satisfied {
                    continuation.resume(returning: true)
                } else {
                    continuation.resume(returning: false)
                }
                monitor.cancel()
            }
            monitor.start(queue: queue)
        }
    }
}


