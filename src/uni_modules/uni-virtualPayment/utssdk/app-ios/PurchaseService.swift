//
//  PurchaseService.swift
//  UniStorekit
//
//  Created by DCloud on 2024/6/28.
//

import Foundation
import StoreKit

@available(iOS 15.0, *)
class PurchaseService {
    
    func buyProduct(identifier: String, quantity: Int? = 1, appAccountToken: String? = nil, promotionalOfferID: String? = nil, promotionalKeyID: String? = nil, promotionalNonce: String? = nil, promotionalSigature: String? = nil, promotionalTimestamp: Int? = nil) async throws -> UniPurchaseResult {
        guard await UniStoreKit.shared.isNetworkAvailable() else {
            throw UniStoreKitError.network_error(nil)
        }
        let products = try await Product.products(for: [identifier])
        guard let product = products.first else {
            throw UniStoreKitError.product_not_available
        }
        return try await buyProduct(product: product, quantity: quantity, appAccountToken: appAccountToken, promotionalOfferID: promotionalOfferID, promotionalKeyID: promotionalKeyID, promotionalNonce: promotionalNonce, promotionalSigature: promotionalSigature, promotionalTimestamp: promotionalTimestamp)
    }
    
    func buyProduct(product: Product, quantity: Int? = 1, appAccountToken: String? = nil, promotionalOfferID: String? = nil, promotionalKeyID: String? = nil, promotionalNonce: String? = nil, promotionalSigature: String? = nil, promotionalTimestamp: Int? = nil) async throws -> UniPurchaseResult {
        var purchaseOptions = Set<Product.PurchaseOption> ()
        if let quantity = quantity, product.type == .consumable {
            purchaseOptions.insert(Product.PurchaseOption.quantity(quantity))
        }
        if let appAccountToken = appAccountToken, let temp = UUID(uuidString: appAccountToken) {
            purchaseOptions.insert(Product.PurchaseOption.appAccountToken(temp))
        }
        
        if let promotionalOfferID = promotionalOfferID, let promotionalKeyID = promotionalKeyID, let promotionalNonce = promotionalNonce, let promotionalSigature = promotionalSigature, let promotionalTimestamp = promotionalTimestamp, let nonce = UUID(uuidString: promotionalNonce), let signatureData = Data(base64Encoded: promotionalSigature) {
            let option = Product.PurchaseOption.promotionalOffer(offerID: promotionalOfferID, keyID: promotionalKeyID, nonce: nonce, signature: signatureData, timestamp: promotionalTimestamp)
            purchaseOptions.insert(option)
        }
        
        let result = try await product.purchase(options: purchaseOptions)
        
        switch result {
        case .success(let verification):
            let transaction = try UniStoreKit.checkVerified(verification)
            let UniProduct = UniProduct(product: product)
            let purchase = UniPurchase(product: UniProduct, transaction: transaction)
            
            let purchseKey = purchase.productId + String(purchase.id) + String(purchase.originalID) + purchase.transaction.jsonRepresentation.base64EncodedString()
            UniStoreKit.shared.cacheTransactionsMap[purchseKey] = purchase
            return .success(purchase)
        case .userCancelled:
            throw UniStoreKitError.user_cancelled
        case .pending:
            return .pending
        @unknown default:
            throw UniStoreKitError.unknown_error
        }
    }
    
    func buyProduct(identifier: String, purchaseOption: UniPurchaseOption? = nil) async throws -> UniPurchaseResult {
        guard await UniStoreKit.shared.isNetworkAvailable() else {
            throw UniStoreKitError.network_error(nil)
        }
        let products = try await Product.products(for: [identifier])
        guard let product = products.first else {
            throw UniStoreKitError.product_not_available
        }
        return try await buyProduct(product: product, purchaseOption: purchaseOption)
    }
    
    func buyProduct(product: Product, purchaseOption: UniPurchaseOption? = nil) async throws -> UniPurchaseResult {
        var purchaseOptions = Set<Product.PurchaseOption> ()
        if let quantity = purchaseOption?.quantity, product.type == .consumable {
            purchaseOptions.insert(Product.PurchaseOption.quantity(quantity))
        }
        if let appAccountToken = purchaseOption?.appAccountToken, let temp = UUID(uuidString: appAccountToken) {
            purchaseOptions.insert(Product.PurchaseOption.appAccountToken(temp))
        }
        
        if let promotionalOffer = purchaseOption?.promotionalOffer {
            if let nonce = UUID(uuidString: promotionalOffer.nonce), let signatureData = Data(base64Encoded: promotionalOffer.signature)   {
                let option = Product.PurchaseOption.promotionalOffer(offerID: promotionalOffer.offerID, keyID: promotionalOffer.keyID, nonce: nonce, signature: signatureData, timestamp: promotionalOffer.timestamp)
                purchaseOptions.insert(option)
            }
        }
        
        let result = try await product.purchase(options: purchaseOptions)
        
        switch result {
        case .success(let verification):
            let transaction = try UniStoreKit.checkVerified(verification)
            let UniProduct = UniProduct(product: product)
            let purchase = UniPurchase(product: UniProduct, transaction: transaction)
            let purchseKey = purchase.productId + String(purchase.id) + String(purchase.originalID) + purchase.transaction.jsonRepresentation.base64EncodedString()
            UniStoreKit.shared.cacheTransactionsMap[purchseKey] = purchase
            return .success(purchase)
        case .userCancelled:
            throw UniStoreKitError.user_cancelled
        case .pending:
            return .pending
        @unknown default:
            throw UniStoreKitError.unknown_error
        }
    }
    
    
    func buyProduct(product: UniProduct) async throws -> UniPurchaseResult {
        guard await UniStoreKit.shared.isNetworkAvailable() else {
            throw UniStoreKitError.network_error(nil)
        }
        guard let storeProduct = product.product else {
            throw UniStoreKitError.product_not_available
        }
        let result = try await storeProduct.purchase()
        switch result {
        case .success(let verification):
            let transaction = try UniStoreKit.checkVerified(verification)
            let purchase = UniPurchase(product: product, transaction: transaction)
            return .success(purchase)
        case .userCancelled:
            throw UniStoreKitError.user_cancelled
        case .pending:
            return .pending
        @unknown default:
            throw UniStoreKitError.unknown_error
        }
    }
    
    func restore() async throws {
        try await AppStore.sync()
    }
}
