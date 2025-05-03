import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentProducts } from "@/components/dashboard/RecentProducts";
import { CampaignPerformance } from "@/components/dashboard/CampaignPerformance";

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-10 bg-black min-h-full">
      <div className="max-w-7xl mx-auto">
        <WelcomeSection brandName="Fashion Brand" />
        <QuickStats />
        <QuickActions />
        <RecentProducts />
        <CampaignPerformance />
      </div>
    </div>
  );
}
