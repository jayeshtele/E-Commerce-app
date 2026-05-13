import { PackageOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function EmptyState({
  title,
  message,
  actionLabel = 'Browse products',
  actionTo = '/products',
}) {
  return (
    <section className="mx-auto max-w-xl py-16 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#facc15] text-[#050505]">
        <PackageOpen size={30} />
      </div>
      <h1 className="mt-5 text-3xl font-black text-slate-50">{title}</h1>
      <p className="mt-3 text-slate-400">{message}</p>
      <Link
        to={actionTo}
        className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#0891b2] px-6 text-sm font-black text-white transition hover:bg-[#22d3ee]"
      >
        {actionLabel}
      </Link>
    </section>
  )
}
