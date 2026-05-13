import { ArrowRight, BadgePercent, Flame, RefreshCw, Truck } from 'lucide-react'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CategoryRail from '../components/CategoryRail'
import LoadingGrid from '../components/LoadingGrid'
import PriceBlock from '../components/PriceBlock'
import ProductCard from '../components/ProductCard'
import RatingStars from '../components/RatingStars'
import { addToCart } from '../features/cart/cartSlice'
import { fetchProducts } from '../features/products/productsSlice'
import { formatCurrency, getDiscountedPrice } from '../utils/formatters'

export default function HomePage() {
  const dispatch = useDispatch()
  const { items: products, categories, featuredProduct, status, error } = useSelector(
    (state) => state.products,
  )

  const heroProducts = products.slice(0, 6)
  const topDeals = useMemo(
    () =>
      [...products]
        .sort((first, second) => second.discountPercentage - first.discountPercentage)
        .slice(0, 8),
    [products],
  )
  const premiumPicks = useMemo(
    () =>
      [...products]
        .filter((product) => product.rating >= 4.75)
        .sort((first, second) => second.rating - first.rating)
        .slice(0, 8),
    [products],
  )

  if (status === 'loading') {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <LoadingGrid />
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-black text-slate-50">
          The live catalog did not load
        </h1>
        <p className="mt-3 text-slate-400">{error}</p>
        <button
          type="button"
          onClick={() => dispatch(fetchProducts())}
          className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0891b2] px-6 text-sm font-black text-white"
        >
          <RefreshCw size={18} />
          Sync catalog
        </button>
      </section>
    )
  }

  return (
    <>
      <section className="bg-[#0a0a0a]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-12">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#facc15]/60 bg-[#101010] px-4 py-2 text-sm font-black text-[#f59e0b] shadow-sm">
              <Flame size={16} />
              {products.length} live products
            </div>
            <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight tracking-normal text-slate-50 sm:text-5xl lg:text-6xl">
              Shop a richer marketplace with real product data.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
              Browse live categories, compare detailed listings, cart multiple
              items, and finish checkout with estimated delivery details.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0891b2] px-6 text-sm font-black text-white transition hover:bg-[#22d3ee]"
              >
                Start shopping
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/deals"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-[#101010] px-6 text-sm font-black text-slate-50 transition hover:border-[#f59e0b] hover:text-[#f59e0b]"
              >
                <BadgePercent size={18} />
                Today's deals
              </Link>
            </div>

            {featuredProduct && (
              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-[#101010] p-5 shadow-sm">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <img
                    src={featuredProduct.thumbnail}
                    alt={featuredProduct.title}
                    className="h-28 w-28 rounded-[1.25rem] bg-[#151515] object-contain p-3"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#22d3ee]">
                      Featured pick
                    </p>
                    <Link
                      to={`/product/${featuredProduct.id}`}
                      className="mt-1 block truncate text-xl font-black text-slate-50 hover:text-[#22d3ee]"
                    >
                      {featuredProduct.title}
                    </Link>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <RatingStars rating={featuredProduct.rating} compact />
                      <span className="text-sm font-bold text-slate-400">
                        From {formatCurrency(getDiscountedPrice(featuredProduct))}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => dispatch(addToCart(featuredProduct, 1))}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-[#facc15] px-5 text-sm font-black text-[#050505]"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {heroProducts.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className={`group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101010] shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                  index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
              >
                <div className="grid aspect-square place-items-center bg-[#151515]">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-contain p-5 transition group-hover:scale-105"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
                <div className="p-4">
                  <p className="truncate text-sm font-black text-slate-50">
                    {product.title}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-sm font-black text-[#f59e0b]">
                      {Math.round(product.discountPercentage)}% off
                    </span>
                    <Truck size={16} className="text-[#22d3ee]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CategoryRail categories={categories} products={products} />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f59e0b]">
              Price drops
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-50">
              Deals with deep detail
            </h2>
          </div>
          <Link
            to="/deals"
            className="hidden items-center gap-2 text-sm font-black text-[#22d3ee] sm:inline-flex"
          >
            More deals
            <ArrowRight size={17} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topDeals.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 2} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-5">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#22d3ee]">
            Rated by shoppers
          </p>
          <h2 className="mt-2 text-3xl font-black text-slate-50">
            Premium picks across aisles
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {premiumPicks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}
