import { MessageSquare, FileQuestion, Book, LifeBuoy } from 'lucide-react';

interface SupportSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SupportSidebar = ({ activeTab, onTabChange }: SupportSidebarProps) => {
  const tabs = [
    {
      id: "contact",
      label: "Contact Support",
      icon: <MessageSquare className="h-5 w-5 mr-2" />
    },
    {
      id: "faq",
      label: "FAQ",
      icon: <FileQuestion className="h-5 w-5 mr-2" />
    },
    {
      id: "documentation",
      label: "Documentation",
      icon: <Book className="h-5 w-5 mr-2" />
    },
    {
      id: "live",
      label: "Live Chat",
      icon: <LifeBuoy className="h-5 w-5 mr-2" />
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