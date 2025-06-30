import React from 'react';
import Link from 'next/link';
import { Users, ClipboardList, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  link: {
    href: string;
    text: string;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, link }) => {
  return (
    <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/60 text-sm">{title}</p>
          <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
        </div>
        <div className="bg-stone-800 p-3 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <Link href={link.href} className="text-red-500 text-sm hover:underline">
          {link.text} →
        </Link>
      </div>
    </div>
  );
};

interface AdminStatsProps {
  stats: {
    userCount: number;
    modelRequestCount: number;
    pendingRequestCount: number;
  };
}

export const AdminStats: React.FC<AdminStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: "Total Users",
      value: stats.userCount,
      icon: <Users className="h-6 w-6 text-red-500" />,
      link: {
        href: "/admin/users",
        text: "View all users"
      }
    },
    {
      title: "Model Requests",
      value: stats.modelRequestCount,
      icon: <ClipboardList className="h-6 w-6 text-red-500" />,
      link: {
        href: "/admin/model-requests",
        text: "View all requests"
      }
    },
    {
      title: "Pending Approvals",
      value: stats.pendingRequestCount,
      icon: <TrendingUp className="h-6 w-6 text-red-500" />,
      link: {
        href: "/admin/model-requests?status=pending",
        text: "Review pending"
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statCards.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}; 