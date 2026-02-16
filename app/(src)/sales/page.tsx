import { DateWidget } from "@/components";

export const metadata = {
  title: "Sales",
};

export default function SalesPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <nav className="space-y-1">
            <h1 className="text-3xl text-gray-900 font-bold tracking-tight">Sales & Transactions</h1>
            <p className="text-gray-500">Record new orders and track daily revenue.</p>
          </nav>

          <DateWidget />
        </div>
      </div>
    </div>
  );
}
