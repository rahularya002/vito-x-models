'use client'

import { useState } from "react"
import { SearchAndFilter } from "@/components/admin/SearchAndFilter"
import { ProductTable } from "@/components/admin/ProductTable"
import { ModelAssignmentModal } from "@/components/admin/ModelAssignmentModal"

// TypeScript interfaces
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

interface Model {
  id: string;
  name: string;
}

// Mock product data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Silver Necklace",
    sku: "SLV-NKL-001",
    image_url: "/api/placeholder/100/100",
    category: "Jewelry",
    assigned_model: null,
    status: "unassigned",
    uploaded_at: "2023-05-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Blue Denim Jacket",
    sku: "DNM-JKT-002",
    image_url: "/api/placeholder/100/100",
    category: "Clothing",
    assigned_model: "Emma Johnson",
    status: "assigned",
    uploaded_at: "2023-06-22T14:45:00Z",
  },
  {
    id: "3",
    name: "Gold Bracelet",
    sku: "GLD-BRC-003",
    image_url: "/api/placeholder/100/100",
    category: "Jewelry",
    assigned_model: null,
    status: "unassigned",
    uploaded_at: "2023-07-10T09:15:00Z",
  },
  {
    id: "4",
    name: "White Summer Dress",
    sku: "DRS-SMR-004",
    image_url: "/api/placeholder/100/100",
    category: "Clothing",
    assigned_model: "Sophia Williams",
    status: "assigned",
    uploaded_at: "2023-04-05T16:20:00Z",
  },
  {
    id: "5",
    name: "Leather Handbag",
    sku: "LTH-BAG-005",
    image_url: "/api/placeholder/100/100",
    category: "Accessories",
    assigned_model: null,
    status: "unassigned",
    uploaded_at: "2023-08-18T11:10:00Z",
  },
]

// Mock models data for assignment dropdown
const availableModels: Model[] = [
  { id: "1", name: "Emma Johnson" },
  { id: "2", name: "Sophia Williams" },
  { id: "3", name: "Michael Brown" },
  { id: "4", name: "James Davis" },
  { id: "5", name: "Olivia Garcia" },
]

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [modelAssignModalOpen, setModelAssignModalOpen] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleAssignModel = (productId: string, modelName: string | null) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          assigned_model: modelName,
          status: modelName ? "assigned" : "unassigned" as "assigned" | "unassigned"
        }
      }
      return product
    }))
    setModelAssignModalOpen(false)
  }

  const openAssignModal = (product: Product) => {
    setSelectedProduct(product)
    setModelAssignModalOpen(true)
  }

  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log('Search query:', query)
  }

  const handleFilter = () => {
    // Implement filter functionality
    console.log('Filter clicked')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="text-white/60">Manage product listings and model assignments</p>
        </div>
      </div>

      <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
      <ProductTable products={products} onAssignModel={openAssignModal} />
      <ModelAssignmentModal
        isOpen={modelAssignModalOpen}
        onClose={() => setModelAssignModalOpen(false)}
        product={selectedProduct}
        models={availableModels}
        onAssign={handleAssignModel}
      />
    </div>
  )
}