"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchProducts } from "@/lib/api";

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

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch products
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetch();
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = products
    .filter(
      (product) =>
        query &&
        product.name &&
        product.name.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/searchResult?q=${query}`);
      setShowSuggestions(false);
    }
  };

  const selectProduct = (product: Product) => {
    router.push(`/product/${product.id}`);
    setShowSuggestions(false);
    setQuery("");
  };

  const selectSearchTerm = (searchTerm: string) => {
    router.push(`/search?q=${searchTerm}`);
    setShowSuggestions(false);
    setQuery("");
  };

  const clearQuery = () => setQuery("");

  return (
    <div className="flex-1 max-w-3xl relative" ref={containerRef}>
      <form onSubmit={handleSubmit} className="flex relative">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search Trendora"
          className="w-full px-3 py-2.5 text-white placeholder-gray-400 rounded-l border-2 border-[#febd69] focus:outline-none focus:border-[#ff9900] text-sm bg-[#131921]"
        />

        <button
          type="submit"
          className="px-4 py-2.5 bg-[#febd69] hover:bg-[#ff9900] text-black rounded-r border-2 border-[#febd69] hover:border-[#ff9900] transition-colors duration-200"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>

      {showSuggestions && filteredProducts.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-[#1c1c1e] border border-gray-700 rounded-b-lg shadow-lg z-50">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border-b border-gray-700 last:border-b-0">
              <button
                onClick={() => selectProduct(product)}
                className="w-full text-left px-4 py-3 hover:bg-gray-800 text-gray-200 flex items-center space-x-3"
              >
                <div className="w-12 h-12 bg-gray-700 rounded flex-shrink-0">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{product.name}</div>
                  <div className="text-xs text-gray-400">{product.category}</div>
                  <div className="text-sm font-semibold text-[#ff9900]">${product.price}</div>
                </div>
              </button>
            </div>
          ))}

          <button
            onClick={() => selectSearchTerm(query)}
            className="w-full text-left px-4 py-2 hover:bg-gray-800 text-gray-300 border-t border-gray-700 flex items-center"
          >
            <Search className="inline w-4 h-4 mr-2" />
            Search for "{query}"
          </button>
        </div>
      )}
    </div>
  );
}
