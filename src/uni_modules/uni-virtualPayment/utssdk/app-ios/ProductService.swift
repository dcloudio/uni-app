//
//  ProductService.swift
//  UniStorekit
//
//  Created by DCloud on 2024/6/28.
//

import Foundation
import StoreKit

@available(iOS 15.0, *)
class ProductService {
    
    private var cachedProducts: [String: Product] = [:]
    
    func fetchProducts(identifiers: Set<String>) async throws -> [Product] {
        let products = try await Product.products(for: identifiers)
        products.forEach({ cachedProducts[$0.id] = $0 })
        return products
    }
    
    func fetchProduct(identifier: String, forceRefresh: Bool = false) async throws -> Product {
        if let product = cachedProducts[identifier], !forceRefresh {
            return product
        }
        let products = try await fetchProducts(identifiers: [identifier])
        if let product = products.first {
            return product
        }
        throw UniStoreKitError.product_not_available
    }
    
    func getCachedProduct(identifier: String) -> Product? {
        return cachedProducts[identifier]
    }
}

