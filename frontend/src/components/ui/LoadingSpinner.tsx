export const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center gap-4 h-96">
    <div
      role="status"
      aria-label="Cargando"
      className="w-20 h-20 rounded-full border-8 border-[#9F531B]/20 border-t-[#9F531B] animate-spin"
    />
    <p className="text-[#9F531B] text-lg font-medium">Cargando...</p>
  </div>
);
