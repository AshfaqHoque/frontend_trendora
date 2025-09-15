"use client";

import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
}

export default function ProductCard({ id, name, image, price, rating, }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-3 bg-white shadow hover:shadow-lg transition">
      <Link href={`/product/${id}`}>
        <img src={image} alt={name} className="w-full h-48 object-cover rounded" loading="lazy"/>
        <h3 className="mt-2 font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600">${price}</p>
        <p className="text-yellow-500">⭐ {rating}</p>
      </Link>
    </div>
  );
}
