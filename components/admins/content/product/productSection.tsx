import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from '@/lib/api';
import { Product } from '@/lib/types';

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productsData = await fetchProducts();
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteProduct(productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Out of Stock', class: 'bg-red-100 text-red-800' };
    if (stock < 10) return { text: 'Low Stock', class: 'bg-yellow-100 text-yellow-800' };
    return { text: 'In Stock', class: 'bg-green-100 text-green-800' };
  };

  if (loading) return <div className="text-gray-600">Loading products...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-6">
      {products.map(product => {
        const stockStatus = getStockStatus(product.stock);
        return (
          <div key={product.id} className="bg-white rounded-lg shadow border border-gray-100 p-6">
            <div className="flex justify-between items-start">
              <div className="flex space-x-4 flex-1">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-green-600 mb-2">
                        ৳{parseFloat(product.price.toString()).toFixed(2)}
                      </p>
                      {product.category && <p className="text-gray-600">Category: {product.category}</p>}
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${stockStatus.class}`}>
                        {stockStatus.text} ({product.stock})
                      </span>
                      {product.rating && <p className="text-gray-600 mt-2">Rating: {product.rating}/5</p>}
                    </div>
                  </div>
                  {product.description && <p className="text-gray-600 mt-3">{product.description}</p>}
                </div>
              </div>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      {products.length === 0 && <div className="text-center py-8 text-gray-500">No products found.</div>}
    </div>
  );
}
