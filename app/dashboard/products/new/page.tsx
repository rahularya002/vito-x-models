"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Upload, X, Info, Check } from "lucide-react"
import { createProduct } from "@/app/actions/products"
import { supabase } from "@/lib/supabase"

type ProductCategory = "" | "clothing" | "footwear" | "accessories" | "jewelry" | "cosmetics" | "other"

type ProductImage = {
  id: string
  url: string
  type: string
}

export default function NewProductPage() {
  const router = useRouter()
  const [category, setCategory] = useState<ProductCategory>("")
  const [productImages, setProductImages] = useState<ProductImage[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [currentUploadType, setCurrentUploadType] = useState<string>("")

  // Get required image types based on selected category
  const getRequiredImageTypes = (cat: ProductCategory): string[] => {
    switch (cat) {
      case "clothing":
        return ["front", "back", "side"]
      case "footwear":
        return ["top", "side", "bottom"]
      case "accessories":
      case "jewelry":
        return ["main", "detail", "worn"]
      case "cosmetics":
        return ["product", "texture", "application"]
      default:
        return ["main"]
    }
  }

  const requiredImageTypes = category ? getRequiredImageTypes(category) : []

  // Check if all required images are uploaded
  const hasAllRequiredImages = () => {
    if (!category || requiredImageTypes.length === 0) return false

    const uploadedTypes = productImages.map((img) => img.type)
    return requiredImageTypes.every((type) => uploadedTypes.includes(type))
  }

  // Get friendly name for image type
  const getImageTypeName = (type: string): string => {
    const names: Record<string, string> = {
      front: "Front View",
      back: "Back View",
      side: "Side View",
      top: "Top View",
      bottom: "Bottom View",
      main: "Main View",
      detail: "Detail View",
      worn: "Worn View",
      product: "Product View",
      texture: "Texture View",
      application: "Application View",
    }
    return names[type] || type
  }

  // Get image type description
  const getImageTypeDescription = (type: string): string => {
    const descriptions: Record<string, string> = {
      front: "Full front view of the garment, preferably on a plain background",
      back: "Full back view of the garment",
      side: "Side profile of the garment to show fit and silhouette",
      top: "View from above showing the top of the footwear",
      bottom: "View of the sole/bottom of the footwear",
      main: "Main product view showing the entire item",
      detail: "Close-up view showing texture, materials or special features",
      worn: "Product being worn or in use (if applicable)",
      product: "Clear view of the product packaging",
      texture: "Close-up of the product texture or color",
      application: "Demonstration of how the product is applied/used",
    }
    return descriptions[type] || "Product image"
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as ProductCategory
    setCategory(newCategory)
    // Clear existing images when category changes
    setProductImages([])
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file: File) => {
    if (currentUploadType) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('type', currentUploadType)
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
          credentials: 'include'
        })
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Upload failed')
        }
        
        const { url } = await response.json()
        
        // Remove any existing image of the same type
        const filteredImages = productImages.filter((img) => img.type !== currentUploadType)

        setProductImages([
          ...filteredImages,
          {
            id: Math.random().toString(36).substring(2, 9),
            url,
            type: currentUploadType,
          },
        ])

        // Reset current upload type
        setCurrentUploadType("")
      } catch (error) {
        console.error('Error handling file:', error)
        // You might want to show an error message to the user here
      }
    }
  }

  const removeImage = (imageId: string) => {
    setProductImages(productImages.filter((img) => img.id !== imageId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const formData = new FormData()
      const form = e.target as HTMLFormElement
      
      // Add basic product information
      formData.append('name', (form.elements.namedItem('product-name') as HTMLInputElement).value)
      formData.append('collection', (form.elements.namedItem('product-collection') as HTMLInputElement).value)
      formData.append('category', category)
      formData.append('description', (form.elements.namedItem('product-description') as HTMLTextAreaElement).value)
      formData.append('targetAudience', (form.elements.namedItem('product-target') as HTMLSelectElement).value)
      
      // Add images
      productImages.forEach((image) => {
        formData.append('imageType', image.type)
        // Convert the URL to a File object
        fetch(image.url)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], `${image.type}.jpg`, { type: 'image/jpeg' })
            formData.append('imageFile', file)
          })
      })
      
      // Call the server action
      const result = await createProduct(formData)
      
      if (result.error) {
        console.error('Error creating product:', result.error)
        // You might want to show an error message to the user here
        return
      }
      
      // Redirect to products page on success
      router.push("/dashboard/products")
    } catch (error) {
      console.error('Error submitting form:', error)
      // You might want to show an error message to the user here
    }
  }

  // Find image by type
  const getImageByType = (type: string): ProductImage | undefined => {
    return productImages.find((img) => img.type === type)
  }

  return (
    <div className="p-6 md:p-10 bg-black min-h-full">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Add New Product</h1>
          <p className="text-white/70">Upload your product details to find the perfect model match</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-stone-900 rounded-xl p-6 md:p-8 border border-white/10">
          {/* Product Category Selection - Now First */}
          <div className="mb-8">
            <h3 className="text-white font-medium mb-4">1. Select Product Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="product-category" className="block text-white font-medium mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="product-category"
                  value={category}
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                  required
                >
                  <option value="" disabled className="bg-black">
                    Select category
                  </option>
                  <option value="clothing" className="bg-black">
                    Clothing
                  </option>
                  <option value="footwear" className="bg-black">
                    Footwear
                  </option>
                  <option value="accessories" className="bg-black">
                    Accessories
                  </option>
                  <option value="jewelry" className="bg-black">
                    Jewelry
                  </option>
                  <option value="cosmetics" className="bg-black">
                    Cosmetics
                  </option>
                  <option value="other" className="bg-black">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="product-target" className="block text-white font-medium mb-2">
                  Target Audience <span className="text-red-500">*</span>
                </label>
                <select
                  id="product-target"
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                  defaultValue=""
                  required
                >
                  <option value="" disabled className="bg-black">
                    Select target audience
                  </option>
                  <option value="women" className="bg-black">
                    Women
                  </option>
                  <option value="men" className="bg-black">
                    Men
                  </option>
                  <option value="unisex" className="bg-black">
                    Unisex
                  </option>
                  <option value="children" className="bg-black">
                    Children
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Image Upload - Now Second */}
          {category && (
            <div className="mb-8">
              <h3 className="text-white font-medium mb-4">2. Upload Product Images</h3>

              {/* Information about required images */}
              <div className="mb-6 bg-stone-800 p-4 rounded-lg">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-red-800 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">
                      For {category} products, we need the following images:
                    </p>
                    <ul className="mt-2 space-y-1 text-white/70 text-sm">
                      {requiredImageTypes.map((type) => (
                        <li key={type} className="flex items-center">
                          {getImageByType(type) ? (
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                          ) : (
                            <div className="h-4 w-4 border border-white/30 rounded-full mr-2"></div>
                          )}
                          <span>{getImageTypeName(type)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Image upload grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {requiredImageTypes.map((type) => {
                  const existingImage = getImageByType(type)

                  return (
                    <div key={type} className="border border-white/10 rounded-lg overflow-hidden">
                      {existingImage ? (
                        // Show uploaded image
                        <div className="relative h-48">
                          <Image
                            src={existingImage.url || "/placeholder.svg"}
                            alt={getImageTypeName(type)}
                            fill
                            className="object-contain"
                          />
                          <div className="absolute top-0 left-0 right-0 bg-black/70 text-white text-xs p-2 flex justify-between items-center">
                            {getImageTypeName(type)}
                            <button
                              type="button"
                              onClick={() => removeImage(existingImage.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Show upload button
                        <div
                          className={`h-48 flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-stone-800 transition-colors`}
                          onClick={() => setCurrentUploadType(type)}
                        >
                          <input
                            type="file"
                            id={`product-image-${type}`}
                            className="hidden"
                            accept="image/*"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor={`product-image-${type}`}
                            className="cursor-pointer flex flex-col items-center text-center"
                          >
                            <div className="w-12 h-12 bg-stone-800 rounded-full flex items-center justify-center mb-3">
                              <Upload className="h-6 w-6 text-white/70" />
                            </div>
                            <p className="text-white font-medium text-sm">{getImageTypeName(type)}</p>
                            <p className="text-white/50 text-xs mt-1">{getImageTypeDescription(type)}</p>
                          </label>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Upload area for current type */}
              {currentUploadType && (
                <div
                  className={`mt-4 border-2 border-dashed rounded-xl p-8 text-center ${
                    dragActive ? "border-red-800 bg-red-800/10" : "border-white/20"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input type="file" id="current-upload" className="hidden" accept="image/*" onChange={handleChange} />

                  <label htmlFor="current-upload" className="cursor-pointer">
                    <div className="mx-auto w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mb-4">
                      <Upload className="h-8 w-8 text-white/70" />
                    </div>
                    <p className="text-white font-medium">Upload {getImageTypeName(currentUploadType)}</p>
                    <p className="text-white/50 text-sm mt-2">Drag and drop or click to browse</p>
                    <p className="text-white/50 text-xs mt-4">Supported formats: JPG, PNG, WEBP</p>
                  </label>

                  <button
                    type="button"
                    className="mt-4 text-white/70 text-sm hover:text-white"
                    onClick={() => setCurrentUploadType("")}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Product Details */}
          {category && (
            <div className="mb-8">
              <h3 className="text-white font-medium mb-4">3. Product Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="product-name" className="block text-white font-medium mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="product-name"
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                    placeholder="e.g. Leather Jacket"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="product-collection" className="block text-white font-medium mb-2">
                    Collection
                  </label>
                  <input
                    type="text"
                    id="product-collection"
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                    placeholder="e.g. Summer 2023"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="product-description" className="block text-white font-medium mb-2">
                  Product Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="product-description"
                  rows={4}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                  placeholder="Describe your product in detail..."
                  required
                ></textarea>
              </div>
            </div>
          )}

          {/* Model Preferences */}
          {category && (
            <div className="mb-8">
              <h3 className="text-white font-medium mb-4">4. Model Preferences</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="model-gender" className="block text-white/70 text-sm mb-2">
                    Preferred Gender
                  </label>
                  <select
                    id="model-gender"
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-black">
                      Select gender
                    </option>
                    <option value="female" className="bg-black">
                      Female
                    </option>
                    <option value="male" className="bg-black">
                      Male
                    </option>
                    <option value="any" className="bg-black">
                      Any
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="model-age" className="block text-white/70 text-sm mb-2">
                    Age Range
                  </label>
                  <select
                    id="model-age"
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-black">
                      Select age range
                    </option>
                    <option value="18-25" className="bg-black">
                      18-25
                    </option>
                    <option value="26-35" className="bg-black">
                      26-35
                    </option>
                    <option value="36-45" className="bg-black">
                      36-45
                    </option>
                    <option value="46+" className="bg-black">
                      46+
                    </option>
                    <option value="any" className="bg-black">
                      Any
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="model-style" className="block text-white/70 text-sm mb-2">
                    Style
                  </label>
                  <select
                    id="model-style"
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-black">
                      Select style
                    </option>
                    <option value="high-fashion" className="bg-black">
                      High Fashion
                    </option>
                    <option value="commercial" className="bg-black">
                      Commercial
                    </option>
                    <option value="editorial" className="bg-black">
                      Editorial
                    </option>
                    <option value="fitness" className="bg-black">
                      Fitness
                    </option>
                    <option value="casual" className="bg-black">
                      Casual
                    </option>
                    <option value="any" className="bg-black">
                      Any
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="model-ethnicity" className="block text-white/70 text-sm mb-2">
                    Ethnicity
                  </label>
                  <select
                    id="model-ethnicity"
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-white"
                    defaultValue="any"
                  >
                    <option value="any" className="bg-black">
                      Any / Diverse
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-4 bg-stone-800 p-4 rounded-lg flex items-start">
                <Info className="h-5 w-5 text-red-800 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-white/70 text-sm">
                  Our AI will generate model previews based on your product images and preferences. You'll be able to
                  review and select from recommended models.
                </p>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex flex-col md:flex-row gap-4 justify-end">
            <Link
              href="/dashboard/products"
              className="px-6 py-3 bg-transparent border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className={`px-6 py-3 text-white rounded-lg transition-colors ${
                category && hasAllRequiredImages() ? "bg-red-800 hover:bg-red-700" : "bg-stone-700 cursor-not-allowed"
              }`}
              disabled={!category || !hasAllRequiredImages()}
            >
              Submit Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
