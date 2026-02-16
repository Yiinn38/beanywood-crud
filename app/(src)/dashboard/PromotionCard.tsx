export function PromotionCard() {
  return (
    <div className="bg-linear-to-br from-amber-600 to-amber-700 p-8 rounded-2xl shadow-lg relative overflow-hidden text-white h-full flex flex-col justify-center">
      {/* Decorative circle */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-10 -translate-y-10"></div>

      <h3 className="text-2xl font-bold mb-3 z-10">New Promotion?</h3>
      <p className="text-amber-100 mb-8 max-w-xs z-10 font-medium leading-relaxed">Create a new discount campaign for the upcoming holiday season.</p>

      <button className="bg-white text-amber-700 font-bold py-3 px-6 rounded-xl self-start hover:bg-amber-50 transition shadow-md z-10">Create Campaign</button>
    </div>
  );
}
