import { User, Building, Mail, Key, CreditCard, Bell, Shield } from 'lucide-react';

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SettingsSidebar = ({ activeTab, onTabChange }: SettingsSidebarProps) => {
  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: <User className="h-5 w-5 mr-2" />
    },
    {
      id: "company",
      label: "Company",
      icon: <Building className="h-5 w-5 mr-2" />
    },
    {
      id: "email",
      label: "Email",
      icon: <Mail className="h-5 w-5 mr-2" />
    },
    {
      id: "password",
      label: "Password",
      icon: <Key className="h-5 w-5 mr-2" />
    },
    {
      id: "billing",
      label: "Billing",
      icon: <CreditCard className="h-5 w-5 mr-2" />
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="h-5 w-5 mr-2" />
    },
    {
      id: "privacy",
      label: "Privacy",
      icon: <Shield className="h-5 w-5 mr-2" />
    }
  ];

  return (
    <div className="bg-stone-900 rounded-xl p-4 border border-white/10">
      <div className="flex flex-col space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center px-4 py-2 rounded-lg text-left ${
              activeTab === tab.id
                ? "bg-red-800 text-white"
                : "text-white/70 hover:bg-stone-800 hover:text-white"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}; 