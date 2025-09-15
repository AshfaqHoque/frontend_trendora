"use client";

import ProductGrid from "@/components/products/productGrid";
import { fetchProducts } from "@/lib/api";
import { useEffect, useState } from "react";


export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;
  if (products.length === 0) return <div>No products found</div>;

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}