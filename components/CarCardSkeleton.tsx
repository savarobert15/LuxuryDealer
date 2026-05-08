export default function CarCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#E5E7EB] animate-pulse">
      <div className="h-56 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-16" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
        </div>
        <div className="pt-4 border-t border-[#E5E7EB]">
          <div className="h-7 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}
