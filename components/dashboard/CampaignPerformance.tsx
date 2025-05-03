import React from 'react';
import Link from 'next/link';

interface CampaignMetricProps {
  title: string;
  impressions: string;
  engagement: string;
  impressionsPercentage: number;
  engagementPercentage: number;
}

const CampaignMetric: React.FC<CampaignMetricProps> = ({
  title,
  impressions,
  engagement,
  impressionsPercentage,
  engagementPercentage
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-white">{title}</h3>
      <div className="flex items-center justify-between">
        <span className="text-white/70 text-sm">Impressions</span>
        <span className="text-white font-medium">{impressions}</span>
      </div>
      <div className="w-full bg-stone-800 rounded-full h-2">
        <div
          className="bg-red-800 h-2 rounded-full"
          style={{ width: `${impressionsPercentage}%` }}
        ></div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-white/70 text-sm">Engagement</span>
        <span className="text-white font-medium">{engagement}</span>
      </div>
      <div className="w-full bg-stone-800 rounded-full h-2">
        <div
          className="bg-red-800 h-2 rounded-full"
          style={{ width: `${engagementPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export const CampaignPerformance: React.FC = () => {
  const campaigns = [
    {
      title: "Summer Collection",
      impressions: "12.4K",
      engagement: "8.2K",
      impressionsPercentage: 75,
      engagementPercentage: 60
    },
    {
      title: "Winter Collection",
      impressions: "8.7K",
      engagement: "5.9K",
      impressionsPercentage: 55,
      engagementPercentage: 45
    },
    {
      title: "Accessories Line",
      impressions: "3.4K",
      engagement: "2.1K",
      impressionsPercentage: 25,
      engagementPercentage: 20
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Campaign Performance</h2>
        <Link href="/dashboard/analytics" className="text-red-800 hover:underline text-sm">
          View Analytics
        </Link>
      </div>

      <div className="bg-stone-900 rounded-xl p-6 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <CampaignMetric key={index} {...campaign} />
          ))}
        </div>
      </div>
    </div>
  );
}; 