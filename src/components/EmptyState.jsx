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
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#f4c95d] text-slate-950">
        <PackageOpen size={30} />
      </div>
      <h1 className="mt-5 text-3xl font-black text-slate-950">{title}</h1>
      <p className="mt-3 text-slate-600">{message}</p>
      <Link
        to={actionTo}
        className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#12372a] px-6 text-sm font-black text-white transition hover:bg-[#0f766e]"
      >
        {actionLabel}
      </Link>
    </section>
  )
}
