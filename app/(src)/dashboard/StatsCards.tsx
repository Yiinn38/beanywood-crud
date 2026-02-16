import { IconCash, IconCoffee, IconUsers, IconWallet } from "@tabler/icons-react";

interface StatsProps {
  totalSales: number;
  totalProducts: number;
  activeClients: number;
  dailyRevenue: number;
  lowStockCount: number;
}

export function StatsCards({ totalSales, totalProducts, activeClients, dailyRevenue, lowStockCount }: StatsProps) {
  const cards = [
    {
      title: "Total Sales",
      value: totalSales,
      prefix: "$",
      icon: IconCash,
      trend: "+5.2%",
      trendLabel: "vs last month",
      trendColor: "text-emerald-600 bg-emerald-50",
      iconBg: "bg-emerald-100/50 text-emerald-600",
      formattedValue: totalSales.toLocaleString(),
    },
    {
      title: "Total Products",
      value: totalProducts,
      suffix: " Items",
      icon: IconCoffee,
      trend: lowStockCount,
      trendLabel: "low stock alerts",
      trendColor: "text-amber-700", // Alert color
      trendPrefix: "", // Just the number
      iconBg: "bg-emerald-100/50 text-emerald-600", // Using emerald based on screenshot, though 'coffee' might suggest brown
      formattedValue: totalProducts.toLocaleString(),
    },
    {
      title: "Active Clients",
      value: activeClients,
      icon: IconUsers,
      trend: "+12%",
      trendLabel: "new this week",
      trendColor: "text-emerald-600 bg-emerald-50",
      iconBg: "bg-emerald-100/50 text-emerald-600",
      formattedValue: activeClients.toLocaleString(),
    },
    {
      title: "Daily Revenue",
      value: dailyRevenue,
      prefix: "$",
      icon: IconWallet,
      trend: "Live updates",
      trendLabel: "",
      trendColor: "text-emerald-600",
      trendDot: true,
      iconBg: "bg-emerald-100/50 text-emerald-600",
      formattedValue: dailyRevenue.toFixed(2),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-[160px]">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-slate-500 font-medium text-sm">{card.title}</span>
              <h3 className="text-3xl font-extrabold text-slate-800">
                {card.prefix}
                {card.formattedValue}
                {card.suffix}
              </h3>
            </div>
            <div className={`p-3 rounded-xl ${card.iconBg}`}>
              <card.icon size={24} stroke={2} />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-auto">
            {card.trendDot && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>}
            <span className={`text-sm font-bold px-2 py-0.5 rounded-md ${card.trendColor}`}>{typeof card.trend === "number" ? card.trend : card.trend}</span>
            <span className="text-slate-400 text-sm font-medium">{card.trendLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
