import React from 'react';
import { ShoppingBag, Users, FileText, TrendingUp, Clock } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  trend?: {
    value: string;
    color: string;
    icon?: React.ReactNode;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBgColor, iconColor, trend }) => {
  return (
    <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/70 text-sm">{title}</p>
          <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
        </div>
        <div className={`${iconBgColor} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          {trend.icon && <span className={`${trend.color} mr-1`}>{trend.icon}</span>}
          <span className={trend.color}>{trend.value}</span>
        </div>
      )}
    </div>
  );
};

export const QuickStats: React.FC = () => {
  const stats = [
    {
      title: "Active Products",
      value: "12",
      icon: <ShoppingBag className="h-6 w-6 text-red-800" />,
      iconBgColor: "bg-red-800/20",
      iconColor: "text-red-800",
      trend: {
        value: "+3 this month",
        color: "text-green-500",
        icon: <TrendingUp className="h-4 w-4" />
      }
    },
    {
      title: "Models Selected",
      value: "8",
      icon: <Users className="h-6 w-6 text-blue-500" />,
      iconBgColor: "bg-blue-800/20",
      iconColor: "text-blue-500",
      trend: {
        value: "+2 this month",
        color: "text-green-500",
        icon: <TrendingUp className="h-4 w-4" />
      }
    },
    {
      title: "Active Campaigns",
      value: "3",
      icon: <FileText className="h-6 w-6 text-purple-500" />,
      iconBgColor: "bg-purple-800/20",
      iconColor: "text-purple-500",
      trend: {
        value: "1 ending soon",
        color: "text-yellow-500",
        icon: <Clock className="h-4 w-4" />
      }
    },
    {
      title: "Total Impressions",
      value: "24.5K",
      icon: <TrendingUp className="h-6 w-6 text-green-500" />,
      iconBgColor: "bg-green-800/20",
      iconColor: "text-green-500",
      trend: {
        value: "+12% from last month",
        color: "text-green-500",
        icon: <TrendingUp className="h-4 w-4" />
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}; 