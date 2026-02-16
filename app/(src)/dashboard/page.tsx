import { DateWidget } from "@/components";

export const metadata = {
  title: "Dashboard",
};


export default function DashboardPage() {
  return (
    <>
      <nav className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl text-amber-950 font-bold">Dashboard</h1>
          <p className="text-lg text-amber-700">Welcome back, here's what's happening at the shop today.</p>
        </div>

        <DateWidget />
      </nav>
    </>
  );
}
