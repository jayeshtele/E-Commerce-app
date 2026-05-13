import { CreditCard, MapPin, PackageCheck, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import OrderSummary from '../components/OrderSummary'
import { selectCartItems } from '../features/cart/cartSelectors'
import { placeOrder } from '../features/cart/cartSlice'
import { formatCurrency, getDiscountedPrice } from '../utils/formatters'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  paymentMethod: 'card',
}

export default function CheckoutPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector(selectCartItems)
  const [form, setForm] = useState(initialForm)

  if (!items.length) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Checkout starts after you add a product to your cart."
      />
    )
  }

  function updateField(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(placeOrder(form))
    navigate('/success')
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f59e0b]">
          Checkout
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-normal text-slate-50">
          Finish your order
        </h1>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_23rem]">
        <form onSubmit={handleSubmit} className="grid gap-5">
          <CheckoutPanel icon={MapPin} title="Delivery details">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Full name"
                name="fullName"
                value={form.fullName}
                onChange={updateField}
                autoComplete="name"
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                autoComplete="email"
              />
              <Input
                label="Phone"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={updateField}
                autoComplete="tel"
              />
              <Input
                label="ZIP code"
                name="zip"
                value={form.zip}
                onChange={updateField}
                autoComplete="postal-code"
              />
              <Input
                label="Street address"
                name="address"
                value={form.address}
                onChange={updateField}
                autoComplete="street-address"
                wide
              />
              <Input
                label="City"
                name="city"
                value={form.city}
                onChange={updateField}
                autoComplete="address-level2"
              />
              <Input
                label="State"
                name="state"
                value={form.state}
                onChange={updateField}
                autoComplete="address-level1"
              />
            </div>
          </CheckoutPanel>

          <CheckoutPanel icon={CreditCard} title="Payment">
            <div className="grid gap-3 sm:grid-cols-3">
              {['card', 'upi', 'cash'].map((method) => (
                <label
                  key={method}
                  className={`rounded-[1.25rem] border p-4 text-sm font-black capitalize ${
                    form.paymentMethod === method
                      ? 'border-[#22d3ee] bg-emerald-400/10 text-[#22d3ee]'
                      : 'border-white/10 bg-[#101010] text-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={form.paymentMethod === method}
                    onChange={updateField}
                    className="mr-2 accent-[#22d3ee]"
                  />
                  {method === 'upi' ? 'UPI' : method}
                </label>
              ))}
            </div>
          </CheckoutPanel>

          <CheckoutPanel icon={PackageCheck} title="Items shipping">
            <div className="grid gap-3">
              {items.map((item) => (
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
                    {formatCurrency(getDiscountedPrice(item) * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </CheckoutPanel>

          <button
            type="submit"
            className="inline-flex h-13 min-h-13 items-center justify-center gap-2 rounded-full bg-[#0891b2] px-6 py-4 text-sm font-black text-white transition hover:bg-[#22d3ee]"
          >
            <ShieldCheck size={18} />
            Place order
          </button>
        </form>

        <OrderSummary />
      </div>
    </section>
  )
}

function CheckoutPanel({ icon: Icon, title, children }) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-[#101010] p-5 shadow-sm">
      <h2 className="flex items-center gap-2 text-xl font-black text-slate-50">
        <Icon size={21} className="text-[#22d3ee]" />
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function Input({
  label,
  name,
  value,
  onChange,
  type = 'text',
  autoComplete,
  wide = false,
}) {
  return (
    <label className={wide ? 'sm:col-span-2' : undefined}>
      <span className="text-sm font-black text-slate-200">{label}</span>
      <input
        required
        type={type === 'email' ? 'text' : type}
        inputMode={type === 'email' ? 'email' : type === 'tel' ? 'tel' : undefined}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-[#0a0a0a] px-4 text-sm font-semibold text-slate-100 outline-none transition focus:border-[#22d3ee] focus:bg-[#101010]"
      />
    </label>
  )
}
