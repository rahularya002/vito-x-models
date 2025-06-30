"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Search, Eye, CheckCircle, XCircle, DollarSign, Filter, Plus, X, Minus } from "lucide-react"

interface ModelData {
  _id: string;
  __t?: string;
  status: string;
  full_name?: string;
  email?: string;
  avatar_url?: string | null;
  credits?: number;
  gender?: string;
  age_range?: string;
  bio?: string;
  social_links?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  profiles?: {
    full_name: string;
    email: string;
    avatar_url: string | null;
    credits?: number;
  };
  additional_info?: {
    age?: number;
    gender?: string;
    bio?: string;
    social_links?: {
      instagram?: string;
      twitter?: string;
      linkedin?: string;
    };
  };
}

export default async function AdminModels({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const [models, setModels] = useState<ModelData[]>([])
  const [modelRequests, setModelRequests] = useState<ModelData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<ModelData | null>(null)
  const [creditAmount, setCreditAmount] = useState<number>(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const [modelsRes, requestsRes] = await Promise.all([
          fetch('/api/admin/models'),
          fetch('/api/admin/model-requests')
        ])
        
        if (!modelsRes.ok || !requestsRes.ok) throw new Error('Failed to fetch data')
        
        const [modelsData, requestsData] = await Promise.all([
          modelsRes.json(),
          requestsRes.json()
        ])
        
        console.log('Models data:', modelsData)
        console.log('Requests data:', requestsData)
        
        setModels(modelsData.models || [])
        setModelRequests((requestsData.requests || []).filter((req: ModelData) => req.status === 'pending'))
      } catch (err) {
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleStatusChange = async (id: string, status: string, type: 'model' | 'request') => {
    try {
      const endpoint = type === 'model' ? '/api/admin/models' : '/api/admin/model-requests'
      const res = await fetch(`${endpoint}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      
      if (!res.ok) {
        const error = await res.text()
        throw new Error(error || 'Failed to update status')
      }
      
      const data = await res.json()
      console.log('Status change response:', data)
      
      if (type === 'model') {
        setModels(models =>
          models.map(m => m._id === id ? { ...m, status } : m)
        )
      } else {
        if (status === 'active') {
          setModelRequests(requests =>
            requests.filter(r => r._id !== id)
          )
          if (data.model) {
            console.log('Adding new model:', data.model)
            setModels(prev => [...prev, data.model])
          }
        } else {
          setModelRequests(requests =>
            requests.map(r => r._id === id ? { ...r, status } : r)
          )
        }
      }

      if (selectedModel?._id === id) {
        setSelectedModel(null)
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update status')
    }
  }

  const handleCreditChange = async (action: 'add' | 'remove') => {
    if (!selectedModel || !creditAmount || creditAmount <= 0) {
      alert('Please enter a valid credit amount')
      return
    }

    try {
      const res = await fetch(`/api/admin/models/${selectedModel._id}/credits`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          credits: action === 'add' ? creditAmount : -creditAmount 
        })
      })
      
      if (!res.ok) throw new Error('Failed to update credits')
      
      const data = await res.json()
      setSelectedModel(prev => {
        if (!prev) return null;
        return {
          ...prev,
          credits: data.credits
        };
      });
      setCreditAmount(0)
    } catch (err) {
      alert('Failed to update credits')
    }
  }

  const allItems = [...models, ...modelRequests]
  const filteredItems = resolvedSearchParams.status
    ? allItems.filter((item) => item.status === resolvedSearchParams.status)
    : allItems

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Models</h1>
          <p className="text-white/60">Manage models and applications</p>
        </div>
        <Link
          href="/admin/models/new"
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Model
        </Link>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
          <input
            type="text"
            placeholder="Search models..."
            className="w-full bg-stone-900 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <button className="bg-stone-900 border border-white/10 rounded-lg p-2 text-white hover:bg-stone-800 transition-colors">
          <Filter className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          <Link
            href="/admin/models"
            className={`flex items-center gap-2 rounded-lg py-2 px-4 text-white transition-colors ${
              !resolvedSearchParams.status ? "bg-red-800" : "bg-stone-900 border border-white/10 hover:bg-stone-800"
            }`}
          >
            All
          </Link>
          <Link
            href="/admin/models?status=active"
            className={`flex items-center gap-2 rounded-lg py-2 px-4 text-white transition-colors ${
              resolvedSearchParams.status === "active" ? "bg-red-800" : "bg-stone-900 border border-white/10 hover:bg-stone-800"
            }`}
          >
            Active
          </Link>
          <Link
            href="/admin/models?status=pending"
            className={`flex items-center gap-2 rounded-lg py-2 px-4 text-white transition-colors ${
              resolvedSearchParams.status === "pending"
                ? "bg-red-800"
                : "bg-stone-900 border border-white/10 hover:bg-stone-800"
            }`}
          >
            Pending
          </Link>
          <Link
            href="/admin/models?status=inactive"
            className={`flex items-center gap-2 rounded-lg py-2 px-4 text-white transition-colors ${
              resolvedSearchParams.status === "inactive"
                ? "bg-red-800"
                : "bg-stone-900 border border-white/10 hover:bg-stone-800"
            }`}
          >
            Inactive
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            console.log('Rendering item:', JSON.stringify(item, null, 2))
            const fullName = item.full_name || item.profiles?.full_name
            const email = item.email || item.profiles?.email
            const avatarUrl = item.avatar_url || item.profiles?.avatar_url
            const credits = item.credits || item.profiles?.credits || 0
            
            // Get additional info from either direct fields or profiles
            const additionalInfo = item.__t === "ModelRequest" 
              ? item.additional_info 
              : {
                  age: item.age_range ? parseInt(item.age_range) : undefined,
                  gender: item.gender,
                  bio: item.bio,
                  social_links: item.social_links
                }

            return (
              <div key={item._id} className="bg-stone-900 rounded-xl border border-white/10 overflow-hidden">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                      <Image
                        src={avatarUrl || "/placeholder.svg"}
                        alt={fullName || "Model"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {fullName}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {email}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-white/60 text-sm mb-1">Personal Information</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-white/40 text-xs">Age</p>
                          <p className="text-white">{additionalInfo?.age || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-white/40 text-xs">Gender</p>
                          <p className="text-white capitalize">{additionalInfo?.gender || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">Social Media</p>
                      <div className="space-y-1">
                        <p className="text-white/40 text-xs">Instagram</p>
                        <p className="text-white">{additionalInfo?.social_links?.instagram || 'N/A'}</p>
                      </div>
                    </div>
                    {!item.__t && (
                      <div>
                        <p className="text-white/60 text-sm mb-1">Credits</p>
                        <p className="text-white">{credits}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedModel(item)}
                      className="flex-1 flex items-center justify-center gap-1 bg-stone-800 hover:bg-stone-700 text-white py-2 rounded-lg transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>

                    {item.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleStatusChange(item._id, "active", item.__t === "ModelRequest" ? "request" : "model")}
                          className="flex-1 flex items-center justify-center gap-1 bg-green-600/20 hover:bg-green-600/30 text-green-500 py-2 rounded-lg transition-colors"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(item._id, "inactive", item.__t === "ModelRequest" ? "request" : "model")}
                          className="flex-1 flex items-center justify-center gap-1 bg-red-600/20 hover:bg-red-600/30 text-red-500 py-2 rounded-lg transition-colors"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="col-span-full bg-stone-900 rounded-xl border border-white/10 p-8 text-center">
            <p className="text-white/60">No models found</p>
          </div>
        )}
      </div>

      {selectedModel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-stone-900 rounded-xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 rounded-full overflow-hidden">
                    <Image
                      src={selectedModel.avatar_url || selectedModel.profiles?.avatar_url || "/placeholder.svg"}
                      alt={selectedModel.full_name || selectedModel.profiles?.full_name || "Model"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedModel.full_name || selectedModel.profiles?.full_name}
                    </h2>
                    <p className="text-white/60">
                      {selectedModel.email || selectedModel.profiles?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedModel(null)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/60 text-sm">Age</p>
                      <p className="text-white">
                        {selectedModel.__t === "ModelRequest" 
                          ? selectedModel.additional_info?.age || 'N/A'
                          : selectedModel.age_range ? parseInt(selectedModel.age_range) : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Gender</p>
                      <p className="text-white capitalize">
                        {selectedModel.__t === "ModelRequest" 
                          ? selectedModel.additional_info?.gender || 'N/A'
                          : selectedModel.gender || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Bio</h3>
                  <p className="text-white">
                    {selectedModel.__t === "ModelRequest" 
                      ? selectedModel.additional_info?.bio || 'No bio provided'
                      : selectedModel.bio || 'No bio provided'}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Social Media</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white/60 text-sm">Instagram</p>
                      <p className="text-white">
                        {selectedModel.__t === "ModelRequest" 
                          ? selectedModel.additional_info?.social_links?.instagram || 'N/A'
                          : selectedModel.social_links?.instagram || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {!selectedModel.__t && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Credits Management</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-white/60 text-sm mb-2">Current Credits</p>
                        <p className="text-2xl font-bold text-white">{selectedModel.credits || selectedModel.profiles?.credits || 0}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label htmlFor="creditAmount" className="text-white/60 text-sm block mb-2">
                            Credit Amount
                          </label>
                          <input
                            type="number"
                            id="creditAmount"
                            value={creditAmount}
                            onChange={(e) => setCreditAmount(Number(e.target.value))}
                            className="w-full bg-stone-800 border border-white/10 rounded-lg py-2 px-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter amount"
                            min="0"
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCreditChange('add')}
                            className="flex-1 flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-500 py-2 rounded-lg transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                            Add Credits
                          </button>
                          <button
                            onClick={() => handleCreditChange('remove')}
                            className="flex-1 flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-500 py-2 rounded-lg transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                            Remove Credits
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedModel.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleStatusChange(selectedModel._id, "active", selectedModel.__t === "ModelRequest" ? "request" : "model")}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-500 py-3 rounded-lg transition-colors"
                    >
                      <CheckCircle className="h-5 w-5" />
                      Approve Model
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedModel._id, "inactive", selectedModel.__t === "ModelRequest" ? "request" : "model")}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-500 py-3 rounded-lg transition-colors"
                    >
                      <XCircle className="h-5 w-5" />
                      Reject Model
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
