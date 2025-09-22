import { useState, useEffect } from 'react';
import { getTopSellingProducts } from '@/lib/api';

interface TopProduct {
  productId: number;
  productName: string;
  productPrice: number;
  productImage?: string;
  productCategory?: string;
  totalQuantitySold: number;
  totalOrders: number;
  totalRevenue: number;
}

export default function StoreInsights() {
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const data = await getTopSellingProducts(); 
        setTopProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setTopProducts([]);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
        <button className="text-gray-400 hover:text-gray-600">•••</button>
      </div>
      
      <div className="space-y-4">
        {topProducts.map((product) => (
          <div
            key={product.productId}
            className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-none"
          >
            <span className="text-sm text-gray-700">{product.productName}</span>
            <div className="text-right">
              <p className="text-sm font-semibold">{product.totalQuantitySold} sold</p>
              <p className="text-xs text-gray-500">৳{product.totalRevenue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
