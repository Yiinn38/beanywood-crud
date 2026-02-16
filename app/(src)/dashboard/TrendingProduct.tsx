interface TrendingProductProps {
  product: {
    name: string;
    sold: number;
    price: number;
    tag: string;
  };
}

export function TrendingProduct({ product }: TrendingProductProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-lg font-bold text-slate-800 mb-6">Trending Product</h2>

      <div className="relative rounded-2xl overflow-hidden h-48 bg-amber-900 mb-4 group cursor-pointer">
        {/* Fallback image if no URL provided */}
        <div className="absolute inset-0 flex items-center justify-center text-white opacity-20 text-6xl">☕️</div>

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-amber-800 shadow-sm">{product.tag}</div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">{product.name}</h3>
          <p className="text-amber-600 font-medium text-sm">{product.sold} sold today</p>
        </div>
        <div className="text-2xl font-extrabold text-slate-900">${product.price ? product.price.toFixed(2) : "0.00"}</div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <button className="bg-amber-50 text-amber-800 font-bold py-2.5 rounded-xl text-sm hover:bg-amber-100 transition">Details</button>
        <button className="bg-amber-50 text-amber-800 font-bold py-2.5 rounded-xl text-sm hover:bg-amber-100 transition">Manage Stock</button>
      </div>
    </div>
  );
}
