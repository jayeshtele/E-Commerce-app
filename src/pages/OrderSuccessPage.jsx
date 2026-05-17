import { CalendarDays, CheckCircle2, PackageCheck, ShoppingBag, Truck } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import { selectLastOrder } from '../features/cart/cartSelectors'
import { selectUsdToInrRate } from '../features/currency/currencySlice'
import { formatCurrency, formatDate, getDiscountedPrice } from '../utils/formatters'

export default function OrderSuccessPage() {
  const order = useSelector(selectLastOrder)
  const currentUsdToInrRate = useSelector(selectUsdToInrRate)

  if (!order) {
    return (
      <EmptyState
        title="No recent order found"
        message="Place an order and your shipment estimate will appear here."
      />
    )
  }

  const orderExchangeRate = order.exchangeRate ?? currentUsdToInrRate

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-emerald-400/20 bg-[#101010] p-6 text-center shadow-sm sm:p-10">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-400/10 text-[#22d3ee]">
          <CheckCircle2 size={42} />
        </div>
        <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-[#f59e0b]">
          Order placed
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-normal text-slate-50">
          Your order is confirmed
        </h1>
        <p className="mt-3 text-slate-400">
          Order {order.id} is being prepared for {order.customer.fullName}.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <StatusCard
            icon={PackageCheck}
            label="Packed by"
            value={formatDate(order.deliveryStart)}
          />
          <StatusCard
            icon={Truck}
            label="Estimated delivery"
            value={`${formatDate(order.deliveryStart)} - ${formatDate(order.deliveryEnd)}`}
          />
          <StatusCard
            icon={CalendarDays}
            label="Order total"
            value={formatCurrency(order.total, orderExchangeRate)}
          />
        </div>
      </div>

      <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-[#101010] p-5 shadow-sm">
        <h2 className="text-xl font-black text-slate-50">Shipment details</h2>
        <div className="mt-4 grid gap-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 rounded-[1.25rem] bg-[#0a0a0a] p-3"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-16 w-16 rounded-2xl bg-[#151515] object-contain p-2"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-slate-50">
                  {item.title}
                </p>
                <p className="text-xs font-bold text-slate-400">
                  Qty {item.quantity} | {item.shippingInformation}
                </p>
              </div>
              <p className="text-sm font-black text-slate-50">
                {formatCurrency(
                  getDiscountedPrice(item) * item.quantity,
                  orderExchangeRate,
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          to="/products"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0891b2] px-6 text-sm font-black text-white transition hover:bg-[#22d3ee]"
        >
          <ShoppingBag size={18} />
          Continue shopping
        </Link>
      </div>
    </section>
  )
}

function StatusCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[1.5rem] bg-[#0a0a0a] p-5 text-left">
      <Icon size={24} className="text-[#22d3ee]" />
      <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-lg font-black text-slate-50">{value}</p>
    </div>
  )
}
