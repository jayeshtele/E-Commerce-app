import { ShieldCheck } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectCartSummary } from '../features/cart/cartSelectors'
import { formatCurrency } from '../utils/formatters'

export default function OrderSummary({ action }) {
  const summary = useSelector(selectCartSummary)

  return (
    <aside className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-black text-slate-950">Order Summary</h2>
        <ShieldCheck className="text-[#0f766e]" size={24} />
      </div>

      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between gap-4 text-slate-600">
          <dt>Subtotal</dt>
          <dd className="font-bold text-slate-950">
            {formatCurrency(summary.subtotal)}
          </dd>
        </div>
        <div className="flex justify-between gap-4 text-slate-600">
          <dt>Product savings</dt>
          <dd className="font-bold text-[#a24936]">
            -{formatCurrency(summary.savings)}
          </dd>
        </div>
        <div className="flex justify-between gap-4 text-slate-600">
          <dt>Shipping</dt>
          <dd className="font-bold text-slate-950">
            {summary.shipping === 0 ? 'Free' : formatCurrency(summary.shipping)}
          </dd>
        </div>
        <div className="flex justify-between gap-4 text-slate-600">
          <dt>Estimated tax</dt>
          <dd className="font-bold text-slate-950">
            {formatCurrency(summary.tax)}
          </dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-base font-black text-slate-950">Total</span>
          <span className="text-2xl font-black text-slate-950">
            {formatCurrency(summary.total)}
          </span>
        </div>
      </div>

      {action && <div className="mt-6">{action}</div>}
    </aside>
  )
}
