//
//  UniStoreKit+Closure.swift
//  UniStorekit
//
//  Created by DCloud on 2024/6/28.
//

import Foundation
import StoreKit

@available(iOS 15.0, *)
extension UniStoreKit {
    public func fetchProduct(identifier: String, completion: @escaping (Result<UniProduct, UniStoreKitError>) -> Void) {
        Task {
            let result = await fetchProduct(identifier: identifier)
            await MainActor.run {
                completion(result)
            }
        }
    }
    
    public func fetchProducts(identifiers: [String], completion: @escaping (Result<[UniProduct], UniStoreKitError>) -> Void) {
        Task {
            let result = await fetchProducts(identifiers: identifiers)
            await MainActor.run {
                completion(result)
            }
        }
    }
    
    public func fetchProducts(products: [UniProduct], completion: @escaping (Result<[UniProduct], UniStoreKitError>) -> Void) {
        Task {
            let result = await fetchProducts(products: products)
            await MainActor.run {
                completion(result)
            }
        }
    }
    
    public func fetchProduct(identifier: String, success: @escaping (UniProduct) -> Void, failure: @escaping (UniStoreKitError) -> Void) {
        Task {
            let result = await fetchProduct(identifier: identifier)
            
            switch result {
            case .success(let product):
                await MainActor.run {
                    success(product)
                }
            case .failure(let error):
                await MainActor.run {
                    failure(error)
                }
            }
        }
    }
}

@available(iOS 15.0, *)
extension UniStoreKit {
    
    public func buyProduct(identifier: String, completion: @escaping (UniPurchaseResult) -> Void) {
        Task {
            let result = await buyProduct(identifier: identifier)
            await MainActor.run {
                completion(result)
            }
        }
    }
    
    public  func buyProduct(identifier: String, quantity: Int? = 1, appAccountToken: String? = nil, promotionalOfferID: String? = nil, promotionalKeyID: String? = nil, promotionalNonce: String? = nil, promotionalSigature: String? = nil, promotionalTimestamp: Int? = nil, success: @escaping (UniPurchase) -> Void, failure: @escaping (UniStoreKitError) -> Void) {
        Task {
            let result = await buyProduct(identifier: identifier, quantity: quantity, appAccountToken: appAccountToken, promotionalOfferID: promotionalOfferID, promotionalKeyID: promotionalKeyID, promotionalNonce: promotionalNonce, promotionalSigature: promotionalSigature, promotionalTimestamp: promotionalTimestamp)
            switch result {
            case .success(let purchase):
                await MainActor.run {
                    success(purchase)
                }
            case .error(let error):
                await MainActor.run {
                    failure(error)
                }
            case .pending:
                break
            }
        }
    }
    
    public  func buyProduct(identifier: String, purchaseOption: UniPurchaseOption? = nil, success: @escaping (UniPurchase) -> Void, failure: @escaping (UniStoreKitError) -> Void) {
        Task {
            let result = await buyProduct(identifier: identifier, purchaseOption: purchaseOption)
            switch result {
            case .success(let purchase):
                await MainActor.run {
                    success(purchase)
                }
            case .error(let error):
                await MainActor.run {
                    failure(error)
                }
            case .pending:
                break
            }
        }
    }
    
    public func buyProduct(product: UniProduct, completion: @escaping (UniPurchaseResult) -> Void) {
        buyProduct(identifier: product.id, completion: completion)
    }
    
    public func buyProduct(product: UniProduct, success: @escaping (UniPurchase) -> Void, failure: @escaping (UniStoreKitError) -> Void) {
        Task {
            let result = await buyProduct(product: product)
            switch result {
            case .success(let purchase):
                await MainActor.run {
                    success(purchase)
                }
            case .error(let error):
                await MainActor.run {
                    failure(error)
                }
            case .pending:
                break
            }
        }
    }
    
    public func getActiveEntitlements(completion: @escaping (Result<[UniPurchase], UniStoreKitError>) -> Void) {
        Task {
            let result = await getActiveEntitlements()
            await MainActor.run {
                completion(result)
            }
        }
    }
    
    public func getActiveEntitlements(success: @escaping ([UniPurchase]) -> Void, failure: @escaping (UniStoreKitError) -> Void) {
        Task {
            let result = await getActiveEntitlements()
            await MainActor.run {
                switch result {
                case .success(let purchases):
                    success(purchases)
                case .failure(let error):
                    failure(error)
                }
            }
        }
    }
    
    public func restorePurchase(success: @escaping ([UniPurchase]) -> Void, failure: @escaping (UniStoreKitError) -> Void) {
        Task {
            let restoreResult = await restorePurchase()
            switch restoreResult {
            case .success(_):
                
                getActiveEntitlements { purchases in
                    success(purchases)
                } failure: { error in
                    failure(error)
                }
            case .failure(let error):
                failure(error)
            }
        }
    }
    
    public func getUnfinishedTransactions(completion: @escaping ([UniPurchase]) -> Void) {
        Task {
            let result = await getUnfinishedTransactions()
            await MainActor.run {
                completion(result)
            }
        }
    }
}
