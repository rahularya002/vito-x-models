import { AdminStats } from "@/components/admin/AdminStats";
import { RecentActivity } from "@/components/admin/RecentActivity";

// Mock data
const mockData = {
  userCount: 124,
  modelRequestCount: 37,
  pendingRequestCount: 12,
};

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-white/60">Overview of platform activity</p>
      </div>

      <AdminStats stats={mockData} />
      <RecentActivity />
    </div>
  );
}
