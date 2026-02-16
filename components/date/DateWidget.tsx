import { IconCalendarEvent } from "@tabler/icons-react";

export const DateWidget = () => {
  const today = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm bg-white text-amber-700 border shadow-xl border-amber-700">
      <IconCalendarEvent stroke={1.75} size={18} className="shrink-0" />
      <p className="leading-none">{today}</p>
    </div>
  );
};
