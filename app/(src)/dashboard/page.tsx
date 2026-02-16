import { fetchDashboardStats, fetchRecentActivity, fetchTrendingProduct } from "@/lib/data";
import { DateWidget, StatsCards, RecentActivity, TrendingProduct, PromotionCard } from "@/components";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const stats = await fetchDashboardStats();
  const recentActivities = await fetchRecentActivity();
  const trendingProduct = await fetchTrendingProduct();

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <nav className="space-y-1">
            <h1 className="text-3xl text-slate-900 font-extrabold tracking-tight">Dashboard</h1>
            <p className="text-slate-500 font-medium">Welcome back, here's what's happening at the shop today.</p>
          </nav>

          <DateWidget />
        </div>

        <StatsCards {...stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-full">
            <RecentActivity activities={recentActivities} />
          </div>

          <div className="flex flex-col gap-6">
            <TrendingProduct product={trendingProduct} />

            <div className="bg-amber-100 rounded-2xl h-64">
              <PromotionCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
