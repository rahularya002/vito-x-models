import React from 'react';
import { Users, ClipboardList } from 'lucide-react';

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  timeAgo: string;
  iconBgColor: string;
  iconColor: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  title,
  subtitle,
  timeAgo,
  iconBgColor,
  iconColor
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-stone-800/50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-full ${iconBgColor} flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <p className="text-white">{title}</p>
          <p className="text-white/60 text-sm">{subtitle}</p>
        </div>
      </div>
      <p className="text-white/60 text-sm">{timeAgo}</p>
    </div>
  );
};

export const RecentActivity: React.FC = () => {
  const activities = [
    {
      icon: <Users className="h-5 w-5 text-red-500" />,
      title: "New user registered",
      subtitle: "John Smith",
      timeAgo: "2 hours ago",
      iconBgColor: "bg-red-500/20",
      iconColor: "text-red-500"
    },
    {
      icon: <ClipboardList className="h-5 w-5 text-green-500" />,
      title: "Model request approved",
      subtitle: "Emma Johnson",
      timeAgo: "5 hours ago",
      iconBgColor: "bg-green-500/20",
      iconColor: "text-green-500"
    },
    {
      icon: <ClipboardList className="h-5 w-5 text-yellow-500" />,
      title: "New model request",
      subtitle: "Michael Brown",
      timeAgo: "1 day ago",
      iconBgColor: "bg-yellow-500/20",
      iconColor: "text-yellow-500"
    }
  ];

  return (
    <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
      <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </div>
    </div>
  );
}; 