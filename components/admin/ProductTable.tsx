import React from 'react';
import Image from 'next/image';
import { User, UserCheck, MoreVertical } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  image_url: string;
  category: string;
  assigned_model: string | null;
  status: "assigned" | "unassigned";
  uploaded_at: string;
}

interface ProductTableProps {
  products: Product[];
  onAssignModel: (product: Product) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({ products, onAssignModel }) => {
  return (
    <div className="bg-stone-900 rounded-xl border border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-white/60 font-medium">Product</th>
              <th className="text-left py-3 px-4 text-white/60 font-medium">Category</th>
              <th className="text-left py-3 px-4 text-white/60 font-medium">Assigned Model</th>
              <th className="text-left py-3 px-4 text-white/60 font-medium">Uploaded</th>
              <th className="text-left py-3 px-4 text-white/60 font-medium">Status</th>
              <th className="text-left py-3 px-4 text-white/60 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-white/5 hover:bg-stone-800/50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-stone-800">
                      <Image
                        src={product.image_url || "/api/placeholder/100/100"}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div>
                      <p className="text-white font-medium">{product.name}</p>
                      <p className="text-white/60 text-sm">SKU: {product.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-white/80">{product.category}</td>
                <td className="py-3 px-4">
                  {product.assigned_model ? (
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-green-500" />
                      <span className="text-white">{product.assigned_model}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onAssignModel(product)}
                      className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>Assign Model</span>
                    </button>
                  )}
                </td>
                <td className="py-3 px-4 text-white/80">
                  {new Date(product.uploaded_at).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      product.status === "assigned"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-white/60 hover:text-white">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 