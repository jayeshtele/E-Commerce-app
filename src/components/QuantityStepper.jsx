import { Minus, Plus } from 'lucide-react'

export default function QuantityStepper({ value, min = 1, max = 99, onChange }) {
  return (
    <div className="inline-grid grid-cols-[2.5rem_3rem_2.5rem] overflow-hidden rounded-full border border-slate-200 bg-white text-center shadow-sm">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="grid place-items-center text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300"
      >
        <Minus size={16} />
      </button>
      <span className="grid place-items-center text-sm font-black text-slate-950">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="grid place-items-center text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300"
      >
        <Plus size={16} />
      </button>
    </div>
  )
}
