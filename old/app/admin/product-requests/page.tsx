"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { Search, Eye, CheckCircle, XCircle, Filter, X } from "lucide-react"

// Import types
interface ProductRequest {
  id: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  created_at: string
  product_images: {
    url: string
    type: string
  }[]
  name: string
  description: string
  category: string
  brand: string
  price: number
    client: {
    id: string
    name: string
    email: string
    avatar_url?: string
  }
}

export default async function AdminProductRequests({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const [requests, setRequests] = useState<ProductRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<ProductRequest | null>(null)
  const { data: session, status } = useSession()
  
  useEffect(() => {
    // Wait for session to load
    if (status === 'loading') return;
    
    const fetchRequests = async () => {
      try {
        // Check if user is admin
        if (!session || session.user.role !== 'admin') {
          setError("Not authorized - admin access only")
          setLoading(false)
          return
        }

        // Fetch product requests from MongoDB API
        const response = await fetch('/api/admin/product-requests')
        if (!response.ok) {
          throw new Error('Failed to fetch product requests')
        }
        
        const data = await response.json()
        const formattedRequests = data.requests.map((request: any) => ({
          id: request._id.toString(),
          status: request.status,
          created_at: request.created_at,
          product_images: request.product_images.map((img: any) => ({
            url: img.url.startsWith('http') ? img.url : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${img.url}`,
            type: img.type
          })),
          name: request.name,
          description: request.description || '',
          category: request.category || '',
          brand: request.brand || '',
          price: request.price || 0,
            client: {
            id: request.client.id,
            name: request.client.name,
            email: request.client.email,
            avatar_url: request.client.avatar_url
            }
        }))

        // Filter by status if provided in search params
        const filteredRequests = resolvedSearchParams.status
          ? formattedRequests.filter((req: ProductRequest) => req.status === resolvedSearchParams.status)
          : formattedRequests

        setRequests(filteredRequests)
      } catch (err) {
        console.error('Error fetching product requests:', err)
        setError('Failed to load product requests')
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [resolvedSearchParams.status, session, status])

  if (loading) {
    return <div className="p-8 text-center text-white">Loading product requests...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>
  }

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/product-requests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'approve',
          admin_notes: 'Approved by admin'
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to approve product request')
      }
      
      // Update local state
      setRequests(prev => 
        prev.map(req => req.id === id ? {...req, status: 'approved'} : req)
      )
    } catch (err) {
      // Handle error silently
    }
  }

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/product-requests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'reject',
          rejection_reason: 'Rejected by admin',
          admin_notes: 'Rejected by admin'
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to reject product request')
      }
      
      // Update local state
      setRequests(prev => 
        prev.map(req => req.id === id ? {...req, status: 'rejected'} : req)
      )
    } catch (err) {
      // Handle error silently
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-6 text-white">Product Requests</h1>
        
        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-stone-800 rounded-lg p-4 border border-stone-700">
            <h3 className="text-lg text-stone-400">Total</h3>
            <p className="text-2xl font-bold text-white">{requests.length}</p>
          </div>
          <div className="bg-stone-800 rounded-lg p-4 border border-stone-700">
            <h3 className="text-lg text-stone-400">Pending</h3>
            <p className="text-2xl font-bold text-white">{requests.filter(r => r.status === 'pending').length}</p>
          </div>
          <div className="bg-stone-800 rounded-lg p-4 border border-stone-700">
            <h3 className="text-lg text-stone-400">Approved</h3>
            <p className="text-2xl font-bold text-white">{requests.filter(r => r.status === 'approved').length}</p>
        </div>
          <div className="bg-stone-800 rounded-lg p-4 border border-stone-700">
            <h3 className="text-lg text-stone-400">Rejected</h3>
            <p className="text-2xl font-bold text-white">{requests.filter(r => r.status === 'rejected').length}</p>
      </div>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <Link 
            href="/admin/product-requests" 
            className={`px-4 py-2 rounded-lg text-white ${!resolvedSearchParams.status ? 'bg-red-600' : 'bg-stone-800 hover:bg-stone-700'}`}
          >
            All
          </Link>
          <Link 
            href="/admin/product-requests?status=pending" 
            className={`px-4 py-2 rounded-lg text-white ${resolvedSearchParams.status === 'pending' ? 'bg-red-600' : 'bg-stone-800 hover:bg-stone-700'}`}
          >
            Pending
          </Link>
          <Link 
            href="/admin/product-requests?status=approved" 
            className={`px-4 py-2 rounded-lg text-white ${resolvedSearchParams.status === 'approved' ? 'bg-red-600' : 'bg-stone-800 hover:bg-stone-700'}`}
          >
            Approved
          </Link>
          <Link 
            href="/admin/product-requests?status=rejected" 
            className={`px-4 py-2 rounded-lg text-white ${resolvedSearchParams.status === 'rejected' ? 'bg-red-600' : 'bg-stone-800 hover:bg-stone-700'}`}
          >
            Rejected
          </Link>
        </div>
        
        {/* Product requests list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request) => (
            <div key={request.id} className="bg-stone-800 rounded-lg border border-stone-700 overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={request.product_images[0]?.url || '/placeholder.svg'}
                  alt={request.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{request.name}</h3>
                <p className="text-stone-400 text-sm mb-4">{request.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    request.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {request.status}
                  </span>
                  <Link
                    href={`/admin/product-requests/${request.id}`}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}