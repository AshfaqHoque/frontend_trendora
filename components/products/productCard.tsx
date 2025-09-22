"use client";

import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
}

export default function ProductCard({ id, name, image, price, rating }: ProductCardProps) {
  return (
    <div className="rounded-2xl bg-white shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300">
      <Link href={`/product/${id}`} className="block p-4">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-xl"
          loading="lazy"
        />
        <h3 className="mt-3 text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-gray-700 font-medium">৳{price}</p>
        <p className="text-yellow-500 font-medium">⭐ {rating}</p>
      </Link>
    </div>
  );
}
