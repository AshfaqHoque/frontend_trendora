import React, { useState, useEffect } from 'react';
import { getVendors, deleteVendor, getProductCountsByVendor, getProductsByVendor } from '@/lib/api';

interface Vendor {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  businessName?: string;
  description?: string;
  createdAt?: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface VendorWithStats extends Vendor {
  productCount: number;
  products: Product[];
  showProducts: boolean;
}

export default function VendorsSection() {
  const [vendors, setVendors] = useState<VendorWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const vendorsData = await getVendors();
      const vendorsArray = Array.isArray(vendorsData) ? vendorsData : [];
      
      // Fetch products for each vendor and count them
      const vendorsWithStats = await Promise.all(
        vendorsArray.map(async (vendor: Vendor) => {
          try {
            const productsData = await getProductsByVendor(vendor.id);
            const products = Array.isArray(productsData) ? productsData : [];
            return {
              ...vendor,
              productCount: products.length,
              products: products,
              showProducts: false
            };
          } catch (err) {
            console.error(`Failed to fetch products for vendor ${vendor.id}:`, err);
            return {
              ...vendor,
              productCount: 0,
              products: [],
              showProducts: false
            };
          }
        })
      );
      
      setVendors(vendorsWithStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVendor = async (vendorId: number) => {
    if (!confirm('Are you sure you want to remove this vendor? This will also remove all their products.')) return;

    try {
      await deleteVendor(vendorId);
      setVendors(vendors.filter(v => v.id !== vendorId));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to remove vendor');
    }
  };

  const toggleProducts = async (vendorId: number) => {
    // Simply toggle visibility since products are already loaded
    setVendors(vendors.map(v => 
      v.id === vendorId 
        ? { ...v, showProducts: !v.showProducts }
        : v
    ));
  };

  if (loading) return <div className="text-gray-600">Loading vendors...</div>;
  if (error)
    return (
      <div className="text-red-600">
        Error: {error}
      </div>
    );

  return (
    <div className="space-y-6">
      {vendors.map(vendor => (
        <div
          key={vendor.id}
          className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden"
        >
          {/* Vendor Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {vendor.name}
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        (ID: {vendor.id})
                      </span>
                    </h3>
                    <p className="text-gray-600 mb-1">
                      <strong>Email:</strong> {vendor.email}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="ml-6 flex flex-col space-y-2">
                <button
                  onClick={() => handleDeleteVendor(vendor.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Remove Vendor
                </button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="mt-4 flex items-center space-x-6">
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-blue-800 font-semibold">
                  {vendor.productCount} Products
                </span>
              </div>
              <button
                onClick={() => toggleProducts(vendor.id)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                {vendor.showProducts ? 'Hide Products' : 'Show Products'}
              </button>
            </div>
          </div>

          {/* Products Section */}
          {vendor.showProducts && (
            <div className="p-6 bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Products</h4>
              {vendor.products.length === 0 ? (
                <p className="text-gray-600">No products found for this vendor.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vendor.products.map(product => (
                    <div
                      key={product.id}
                      className="bg-white p-4 rounded-lg border border-gray-200"
                    >
                      <h5 className="font-medium text-gray-900 mb-1">{product.name}</h5>
                      <p className="text-gray-600 text-sm">
                        ID: {product.id}
                      </p>
                      <p className="text-green-600 font-semibold mt-2">
                        ৳{product.price}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      
      {vendors.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No vendors found.
        </div>
      )}
    </div>
  );
}