"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import ProductGrid from "@/components/products/productGrid";

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  stock: number;
  category: string;
  rating?: number;
  image?: string;
  status: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAndFilter = async () => {
      const allProducts: Product[] = await fetchProducts();
      const results = allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(results);
    };
    fetchAndFilter();
  }, [query]);

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-5 py-10">
      {products.length === 0 ? (
        <p className="text-gray-300">No products found for "{query}"</p>
      ) : (
        <ProductGrid products={products} />
      )}
      </div>
    </div>
  );

}
