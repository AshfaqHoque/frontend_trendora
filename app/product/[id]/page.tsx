import { notFound } from "next/navigation";
import { getProductById } from "@/lib/api";

type TParams = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: TParams }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product not found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name} | Trendora`,
    description: product.description ?? `Buy ${product.name} at a great price.`,
    openGraph: {
      title: product.name,
      description: product.description ?? undefined,
      images: product.image ? [{ url: product.image }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: TParams }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return notFound();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Section */}
        <div>
          <img
            src={product.image ?? "/placeholder.png"}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Product Info Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white">{product.name}</h1>
          <p className="text-2xl font-semibold text-blue-400">
            ৳{Number(product.price).toFixed(2)}
          </p>
          {product.rating != null && (
            <p className="text-yellow-400 font-medium">⭐ {product.rating}</p>
          )}

          <p className="text-gray-200 leading-relaxed">
            {product.description ?? "No description available."}
          </p>

          <div className="text-sm space-y-1">
            <p>
              <span className="font-medium text-gray-300">Category:</span>{" "}
              <span className="text-white">
                {product.category ?? "Uncategorized"}
              </span>
            </p>
            <p>
              <span className="font-medium text-gray-300">Stock:</span>{" "}
              <span className={product.stock > 0 ? "text-green-400" : "text-red-400"}>
                {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
              </span>
            </p>
          </div>

          {/* Actions */}
          <div className="pt-6 flex gap-4">
            <form action={`/cart/add`} method="post">
              <input type="hidden" name="productId" value={product.id} />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition disabled:opacity-50"
                disabled={product.stock <= 0}
              >
                Add to Cart
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
