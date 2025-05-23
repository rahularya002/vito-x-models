'use client'

import { useEffect, useState } from "react";
import { AdminStats } from "@/components/admin/AdminStats";
import { RecentActivity } from "@/components/admin/RecentActivity";

interface Stats {
  userCount: number;
  modelRequestCount: number;
  pendingRequestCount: number;
}

export default function AdminOverview() {
  const [stats, setStats] = useState<Stats>({
    userCount: 0,
    modelRequestCount: 0,
    pendingRequestCount: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/admin/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        setStats({
          userCount: data.stats.users?.total || 0,
          modelRequestCount: data.stats.requests?.modelRequests?.total || 0,
          pendingRequestCount: data.stats.requests?.modelRequests?.pending || 0
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load statistics');
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 rounded-lg bg-red-500/20">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-white/60">Overview of platform activity</p>
      </div>

      <AdminStats stats={stats} />
      <RecentActivity />
    </div>
  );
}
