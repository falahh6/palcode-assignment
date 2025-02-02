export function HandleBar({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;

  return (
    <div className="absolute left-0 right-0 h-2 z-10 flex items-center justify-center">
      <div className="w-24 h-1 bg-white rounded-full animate-pulse" />
    </div>
  );
}
