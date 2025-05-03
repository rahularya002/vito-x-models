import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Users, FileText } from 'lucide-react';

interface ActionButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  bgColor: string;
  hoverColor: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ href, icon, label, bgColor, hoverColor }) => {
  return (
    <Link
      href={href}
      className={`${bgColor} ${hoverColor} transition-colors rounded-xl p-6 text-white flex items-center justify-center`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Link>
  );
};

export const QuickActions: React.FC = () => {
  const actions = [
    {
      href: "/dashboard/products/new",
      icon: <ShoppingBag className="h-5 w-5" />,
      label: "Add New Product",
      bgColor: "bg-red-800",
      hoverColor: "hover:bg-red-700"
    },
    {
      href: "/dashboard/models",
      icon: <Users className="h-5 w-5" />,
      label: "Browse Models",
      bgColor: "bg-stone-800",
      hoverColor: "hover:bg-stone-700"
    },
    {
      href: "/dashboard/campaigns/new",
      icon: <FileText className="h-5 w-5" />,
      label: "Create Campaign",
      bgColor: "bg-stone-800",
      hoverColor: "hover:bg-stone-700"
    }
  ];

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <ActionButton key={index} {...action} />
        ))}
      </div>
    </div>
  );
}; 