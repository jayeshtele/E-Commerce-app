export default function LoadingGrid({ count = 8 }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="h-[31rem] animate-pulse rounded-[1.75rem] border border-slate-200 bg-white p-5"
        >
          <div className="aspect-square rounded-[1.5rem] bg-slate-200" />
          <div className="mt-5 h-4 w-24 rounded-full bg-slate-200" />
          <div className="mt-4 h-6 rounded-full bg-slate-200" />
          <div className="mt-3 h-4 rounded-full bg-slate-100" />
          <div className="mt-8 h-12 rounded-full bg-slate-200" />
        </div>
      ))}
    </div>
  )
}
