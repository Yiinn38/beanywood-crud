"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image_url: string;
}

export default function ProductsTable({
  products,
  totalPages,
  currentPage,
  currentCategory,
  totalItems,
}: {
  products: Product[];
  totalPages: number;
  currentPage: number;
  currentCategory?: string;
  totalItems: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === "All Products") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const getStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-700" };
    if (stock < 10) return { label: "Low Stock", color: "bg-yellow-100 text-yellow-700" };
    return { label: "In Stock", color: "bg-green-100 text-green-700" };
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "coffee":
        return "bg-orange-100 text-orange-800";
      case "merchandise":
        return "bg-blue-100 text-blue-800";
      case "equipment":
        return "bg-purple-100 text-purple-800";
      case "dessert":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const categories = ["All Products", "Coffee", "Merchandise", "Equipment"];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex space-x-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                (cat === "All Products" && !currentCategory) || cat === currentCategory ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1 px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50">
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50">
            <span>Sort</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-xs font-semibold tracking-wide border-b border-gray-50">
              <th className="p-4">PRODUCT</th>
              <th className="p-4">CATEGORY</th>
              <th className="p-4">PRICE</th>
              <th className="p-4">STOCK LEVEL</th>
              <th className="p-4">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.length > 0 ? (
              products.map((product) => {
                const status = getStatus(product.stock);
                return (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 shrink-0">
                          {product.image_url ? (
                            <Image src={`/products/${product.image_url}`} alt={product.name} width={40} height={40} className="h-10 w-10 rounded-md object-cover bg-gray-200" />
                          ) : (
                            <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center text-gray-500 text-xs">{product.name.substring(0, 2)}</div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{product.name}</div>
                          <div className="text-gray-500 text-xs">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(product.category)}`}>{product.category}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-gray-900">${Number(product.price).toFixed(2)}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-500">{product.stock} units</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center w-fit space-x-1 ${status.color}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60"></span>
                        <span>{status.label}</span>
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
        <span>
          Showing {(currentPage - 1) * 5 + 1} to {Math.min(currentPage * 5, totalItems)} of {totalItems} results
        </span>
        <div className="flex space-x-1">
          <button
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded ${currentPage === page ? "border-orange-200 bg-orange-50 text-orange-600" : "border-gray-200 hover:bg-gray-50 text-gray-600 cursor-pointer"}`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
