import { Sidebar } from "@/components";

export default function SrcLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-zinc-100/50">
      
      <Sidebar />

      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}
