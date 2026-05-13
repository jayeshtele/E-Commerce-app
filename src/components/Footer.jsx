import { BadgeCheck, CreditCard, RotateCcw, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'

const perks = [
  { icon: Truck, label: 'Fast shipping' },
  { icon: RotateCcw, label: 'Easy returns' },
  { icon: BadgeCheck, label: 'Verified listings' },
  { icon: CreditCard, label: 'Secure checkout' },
]

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#050505] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <div>
          <Link to="/" className="text-2xl font-black tracking-normal">
            NovaCart
          </Link>
          <p className="mt-3 max-w-xl text-sm leading-6 text-emerald-50/80">
            A frontend e-commerce marketplace built with live product data,
            detailed shopping flows, and a checkout experience that feels ready
            for production UI review.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {perks.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/8 p-4"
            >
              <Icon className="text-[#facc15]" size={22} />
              <p className="mt-3 text-sm font-bold text-white">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
