import React from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  sku: string;
  image_url: string;
}

interface Model {
  id: string;
  name: string;
}

interface ModelAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  models: Model[];
  onAssign: (productId: string, modelName: string | null) => void;
}

export const ModelAssignmentModal: React.FC<ModelAssignmentModalProps> = ({
  isOpen,
  onClose,
  product,
  models,
  onAssign
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
      <div className="bg-stone-900 border border-white/10 rounded-xl p-6 w-96 z-10">
        <h3 className="text-xl font-bold text-white mb-4">Assign Model to Product</h3>
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-stone-800">
              <Image
                src={product.image_url || "/api/placeholder/100/100"}
                alt={product.name}
                width={48}
                height={48}
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-white font-medium">{product.name}</p>
              <p className="text-white/60 text-sm">SKU: {product.sku}</p>
            </div>
          </div>
          
          <label className="block text-white mb-2">Select Model</label>
          <select 
            className="w-full bg-stone-800 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            defaultValue=""
            onChange={(e) => onAssign(product.id, e.target.value !== "" ? e.target.value : null)}
          >
            <option value="">-- Select a Model --</option>
            {models.map(model => (
              <option key={model.id} value={model.name}>{model.name}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-3">
          <button 
            className="px-4 py-2 bg-transparent border border-white/10 rounded-lg text-white hover:bg-stone-800"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}; 