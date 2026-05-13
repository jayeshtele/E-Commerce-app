import { Heart, ShoppingCart, Truck } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../features/cart/cartSlice'
import { formatCategory, getStockTone } from '../utils/formatters'
import PriceBlock from './PriceBlock'
import RatingStars from './RatingStars'

export default function ProductCard({ product, priority = false }) {
  const dispatch = useDispatch()
  const stockTone = getStockTone(product.stock)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101010] shadow-sm shadow-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
      <div className="relative bg-[#151515]">
        <Link to={`/product/${product.id}`} className="block">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading={priority ? 'eager' : 'lazy'}
            className="aspect-square w-full object-contain p-6 transition duration-300 group-hover:scale-105"
          />
        </Link>
        <button
          type="button"
          aria-label="Save product"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[#101010] text-slate-300 shadow-md transition hover:text-[#f59e0b]"
        >
          <Heart size={18} />
        </button>
        <span className="absolute left-4 top-4 rounded-full bg-[#0891b2] px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
          {formatCategory(product.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-black uppercase tracking-[0.16em] text-[#22d3ee]">
              {product.brand || 'Nova Select'}
            </p>
            <Link
              to={`/product/${product.id}`}
              className="mt-1 line-clamp-2 min-h-[3.5rem] text-lg font-black leading-7 text-slate-50 hover:text-[#22d3ee]"
            >
              {product.title}
            </Link>
          </div>
        </div>

        <div className="mt-3">
          <RatingStars rating={product.rating} compact />
        </div>

        <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-slate-400">
          {product.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm font-bold text-slate-400">
          <Truck size={16} className="text-[#22d3ee]" />
          <span className="truncate">{product.shippingInformation}</span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <PriceBlock product={product} />
          <span
            className={`rounded-full px-3 py-1 text-xs font-black ${
              stockTone === 'Low stock'
                ? 'bg-amber-400/10 text-[#f59e0b]'
                : 'bg-emerald-400/10 text-emerald-300'
            }`}
          >
            {stockTone}
          </span>
        </div>

        <button
          type="button"
          onClick={() => dispatch(addToCart(product, 1))}
          className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#facc15] px-5 text-sm font-black text-[#050505] transition hover:bg-[#22d3ee]"
        >
          <ShoppingCart size={18} />
          Add to cart
        </button>
      </div>
    </article>
  )
}
