"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, XCircle, Plus, Minus } from "lucide-react"

interface Model {
  _id: string;
  status: string;
  created_at: string;
  updated_at: string;
  portfolio_images: string[];
  profiles: {
    full_name: string;
    email: string;
    avatar_url: string | null;
    credits: number;
  };
  additional_info: {
    age: number;
    gender: string;
    bio: string;
    social_links: {
      instagram: string;
    };
  };
}

export default async function ModelDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const [model, setModel] = useState<Model | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creditAmount, setCreditAmount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    async function fetchModel() {
      try {
        const res = await fetch(`/api/admin/models/${resolvedParams.id}`);
        if (!res.ok) throw new Error('Failed to fetch model');
        const data = await res.json();
        setModel(data);
      } catch (err) {
        setError('Failed to load model details');
      } finally {
        setLoading(false);
      }
    }
    fetchModel();
  }, [resolvedParams.id]);

  const handleStatusChange = async (status: string) => {
    try {
      const res = await fetch(`/api/admin/models/${resolvedParams.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      if (!res.ok) throw new Error('Failed to update status');
      
      setModel((prev: Model | null) => prev ? { ...prev, status } : null);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleCreditChange = async (action: 'add' | 'remove') => {
    if (!creditAmount || creditAmount <= 0) {
      alert('Please enter a valid credit amount');
      return;
    }

    try {
      const res = await fetch(`/api/admin/models/${resolvedParams.id}/credits`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          credits: action === 'add' ? creditAmount : -creditAmount 
        })
      });
      
      if (!res.ok) throw new Error('Failed to update credits');
      
      const data = await res.json();
      setModel((prev: Model | null) => prev ? {
        ...prev,
        profiles: {
          ...prev.profiles,
          credits: data.credits
        }
      } : null);
      setCreditAmount(0);
    } catch (err) {
      alert('Failed to update credits');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error || !model) {
    return (
      <div className="text-center text-red-500">
        <p>{error || 'Model not found'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/models"
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Models
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-stone-900 rounded-xl border border-white/10 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative h-20 w-20 rounded-full overflow-hidden">
                  <Image
                    src={model.profiles.avatar_url || "/placeholder.svg"}
                    alt={model.profiles.full_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {model.profiles.full_name}
                  </h1>
                  <p className="text-white/60">
                    {model.profiles.email}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">Personal Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/60 text-sm">Age</p>
                      <p className="text-white">{model.additional_info.age}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Gender</p>
                      <p className="text-white capitalize">{model.additional_info.gender}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">Bio</h2>
                  <p className="text-white">{model.additional_info.bio}</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">Social Media</h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white/60 text-sm">Instagram</p>
                      <p className="text-white">{model.additional_info.social_links.instagram}</p>
                    </div>
                  </div>
                </div>

                {model.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleStatusChange("active")}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-500 py-3 rounded-lg transition-colors"
                    >
                      <CheckCircle className="h-5 w-5" />
                      Approve Model
                    </button>
                    <button
                      onClick={() => handleStatusChange("inactive")}
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

        <div className="space-y-6">
          <div className="bg-stone-900 rounded-xl border border-white/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Status</h2>
            <div className="space-y-3">
              <div>
                <p className="text-white/60 text-sm">Current Status</p>
                <p className="text-white capitalize">{model.status}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Joined</p>
                <p className="text-white">
                  {new Date(model.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-stone-900 rounded-xl border border-white/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Credits Management</h2>
            <div className="space-y-4">
              <div>
                <p className="text-white/60 text-sm mb-2">Current Credits</p>
                <p className="text-2xl font-bold text-white">{model.profiles.credits}</p>
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
        </div>
      </div>
    </div>
  );
}
