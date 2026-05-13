import { ShoppingBag, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import OrderSummary from '../components/OrderSummary'
import QuantityStepper from '../components/QuantityStepper'
import {
  selectCartItems,
  selectCartSummary,
} from '../features/cart/cartSelectors'
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice'
import { formatCategory, formatCurrency, getDiscountedPrice } from '../utils/formatters'

export default function CartPage() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const summary = useSelector(selectCartSummary)

  if (!items.length) {
    return (
      <EmptyState
        title="Your cart is ready for something good"
        message="Add a few live products and they will stay here while you shop."
      />
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f59e0b]">
          Cart
        </p>
        <h1 className="text-4xl font-black tracking-normal text-slate-50">
          {items.length} item{items.length === 1 ? '' : 's'} in your bag
        </h1>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_23rem]">
        <div className="grid gap-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-[#101010] p-4 shadow-sm sm:grid-cols-[9rem_1fr] sm:p-5"
            >
              <Link
                to={`/product/${item.id}`}
                className="grid aspect-square place-items-center rounded-[1.25rem] bg-[#151515]"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full object-contain p-4"
                />
              </Link>

              <div className="min-w-0">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#22d3ee]">
                      {item.brand || formatCategory(item.category)}
                    </p>
                    <Link
                      to={`/product/${item.id}`}
                      className="mt-1 block text-xl font-black text-slate-50 hover:text-[#22d3ee]"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-2 text-sm font-semibold text-slate-400">
                      {item.shippingInformation} | {item.returnPolicy}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label={`Remove ${item.title}`}
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-400 transition hover:border-[#f59e0b] hover:text-[#f59e0b]"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <QuantityStepper
                    value={item.quantity}
                    max={item.stock}
                    onChange={(quantity) =>
                      dispatch(updateQuantity({ id: item.id, quantity }))
                    }
                  />
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-400">
                      {formatCurrency(getDiscountedPrice(item))} each
                    </p>
                    <p className="text-2xl font-black text-slate-50">
                      {formatCurrency(getDiscountedPrice(item) * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <OrderSummary
          action={
            <>
              <Link
                to="/checkout"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0891b2] px-5 text-sm font-black text-white transition hover:bg-[#22d3ee]"
              >
                <ShoppingBag size={18} />
                Proceed to checkout
              </Link>
              {summary.shipping === 0 && (
                <p className="mt-3 text-center text-sm font-bold text-[#22d3ee]">
                  Free shipping unlocked
                </p>
              )}
            </>
          }
        />
      </div>
    </section>
  )
}
