import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, AlertCircle } from 'lucide-react';

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
  detailsLink: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  collection,
  status,
  modelStatus,
  detailsLink
}) => {
  return (
    <div className="bg-stone-900 rounded-xl overflow-hidden border border-white/10">
      <div className="relative h-48">
        <Image src={image} alt={title} fill className="object-cover" />
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
          <Link href={detailsLink} className="text-red-800 hover:underline text-sm">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export const RecentProducts: React.FC = () => {
  const products = [
    {
      image: "/product-1.jpg",
      title: "Black Leather Jacket",
      collection: "Premium Collection",
      status: {
        label: "Active",
        color: "bg-green-500"
      },
      modelStatus: {
        text: "Model assigned"
      },
      detailsLink: "/dashboard/products/1"
    },
    {
      image: "/product-2.jpg",
      title: "Summer Floral Dress",
      collection: "Spring Collection",
      status: {
        label: "Pending",
        color: "bg-yellow-500"
      },
      modelStatus: {
        icon: <AlertCircle className="h-4 w-4" />,
        text: "Awaiting model selection",
        color: "text-yellow-500"
      },
      detailsLink: "/dashboard/products/2"
    },
    {
      image: "/product-3.jpg",
      title: "Urban Sneakers",
      collection: "Streetwear Collection",
      status: {
        label: "In Review",
        color: "bg-blue-500"
      },
      modelStatus: {
        icon: <CheckCircle2 className="h-4 w-4" />,
        text: "Photoshoot scheduled",
        color: "text-blue-500"
      },
      detailsLink: "/dashboard/products/3"
    }
  ];

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Recent Products</h2>
        <Link href="/dashboard/products" className="text-red-800 hover:underline text-sm">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}; 