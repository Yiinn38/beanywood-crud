import { RecentActivityItem } from "@/lib/data";

interface RecentActivityProps {
  activities: RecentActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
      <div className="p-6 flex justify-between items-center border-b border-slate-50">
        <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
        <button className="text-amber-600 font-bold text-sm hover:text-amber-700 transition">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-amber-50/30 text-amber-900 font-bold uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {activities.map((item) => (
              <tr key={item.id} className="hover:bg-amber-50/20 transition-colors">
                <td className="px-6 py-4 font-bold text-amber-600">{item.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* Placeholder for image - using emoji if no image, or a generic placeholder */}
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl shrink-0">☕️</div>
                    <span className="font-bold text-slate-700">{item.product}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 font-medium">{item.customer}</td>
                <td className="px-6 py-4 text-slate-800 font-bold">${item.amount.toFixed(2)}</td>
                <td className="px-6 py-4 text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold
                    ${item.status === "Completed" ? "bg-emerald-100 text-emerald-700" : item.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
