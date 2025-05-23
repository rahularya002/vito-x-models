"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { getProducts } from '@/app/actions/products';

interface Product {
  id: string;
  name: string;
  collection: string;
  category: string;
  description: string;
  target_audience: string;
  status: string;
  created_at: string;
  product_images: {
    url: string;
    type: string;
  }[];
}

interface ProductCardProps {
  image: string;
  title: string;
  collection: string;
  status: {
    label: string;
    color: string;
  };
  modelStatus: {
    icon?: React.ReactNode;
    text: string;
    color?: string;
  };
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  collection,
  status,
  modelStatus,
  onClick
}) => {
  return (
    <div className="bg-stone-900 rounded-xl overflow-hidden border border-white/10">
      <div className="relative h-48">
        <Image src={image} alt={title} fill className="object-cover" unoptimized priority />
        <div className={`absolute top-2 right-2 ${status.color} text-white text-xs px-2 py-1 rounded-full`}>
          {status.label}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-white/70 text-sm mt-1">{collection}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            {modelStatus.icon && (
              <span className={`${modelStatus.color} mr-2`}>{modelStatus.icon}</span>
            )}
            <span className="text-white/70 text-sm">{modelStatus.text}</span>
          </div>
          <button onClick={onClick} className="text-red-800 hover:text-red-600 text-sm">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

// Add a helper function to get the full image URL
const getImageUrl = (url: string) => {
  if (url.startsWith('http')) {
    return url;
  }
  
  // If it's just a filename, get the public URL from Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${supabaseUrl}/storage/v1/object/public/product-images/${url}`;
}

export const RecentProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { products: fetchedProducts, error } = await getProducts();
        if (error) {
          setError(error);
        } else {
          // Only show the 3 most recent products
          const mappedProducts = (fetchedProducts || []).map((p: any) => ({
            ...p,
            collection: p.collection_name || p.collection || '',
          }));
          setProducts(mappedProducts.slice(0, 3));
        }
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'in review':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getModelStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return {
          icon: <CheckCircle2 className="h-4 w-4" />,
          text: "Model assigned",
          color: "text-green-500"
        };
      case 'pending':
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          text: "Awaiting model selection",
          color: "text-yellow-500"
        };
      default:
        return {
          text: "No model assigned"
        };
    }
  };

  if (loading) {
    return (
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Recent Products</h2>
          <Link href="/dashboard/products" className="text-red-800 hover:underline text-sm">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-stone-900 rounded-xl overflow-hidden border border-white/10 animate-pulse">
              <div className="h-48 bg-stone-800" />
              <div className="p-4">
                <div className="h-6 bg-stone-800 rounded w-3/4 mb-2" />
                <div className="h-4 bg-stone-800 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Recent Products</h2>
          <Link href="/dashboard/products" className="text-red-800 hover:underline text-sm">
            View All
          </Link>
        </div>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Recent Products</h2>
        <Link href="/dashboard/products" className="text-red-800 hover:underline text-sm">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const mainImage = product.product_images?.[0]?.url || "/placeholder.svg";
          const modelStatus = getModelStatus(product.status);
          
          return (
            <ProductCard
              key={product.id}
              image={getImageUrl(mainImage)}
              title={product.name}
              collection={product.collection}
              status={{
                label: product.status,
                color: getStatusColor(product.status)
              }}
              modelStatus={modelStatus}
              onClick={() => setSelectedProduct(product)}
            />
          );
        })}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 rounded-xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedProduct.name}</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white/60 text-sm mb-2">Description</h3>
                    <p className="text-white">{selectedProduct.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-white/60 text-sm mb-2">Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/60">Category</span>
                        <span className="text-white">{selectedProduct.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Collection</span>
                        <span className="text-white">{selectedProduct.collection}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Target Audience</span>
                        <span className="text-white">{selectedProduct.target_audience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Status</span>
                        <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(selectedProduct.status)}`}>
                          {selectedProduct.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Created</span>
                        <span className="text-white">{new Date(selectedProduct.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white/60 text-sm mb-4">Product Images</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedProduct.product_images && selectedProduct.product_images.length > 0 ? (
                      selectedProduct.product_images.map((img, idx) => (
                        <div key={idx} className="relative aspect-square">
                          <Image
                            src={img.url.startsWith('http') ? img.url : getImageUrl(img.url)}
                            alt={`${selectedProduct.name} - ${img.type}`}
                            fill
                            className="object-cover rounded-lg"
                            unoptimized
                          />
                          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                            {img.type}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 h-48 bg-stone-800 rounded-lg flex items-center justify-center text-white/60">
                        No images available
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 