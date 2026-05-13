import { Filter, RefreshCw, Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import LoadingGrid from '../components/LoadingGrid'
import ProductCard from '../components/ProductCard'
import { fetchProducts } from '../features/products/productsSlice'
import { formatCategory, formatCurrency } from '../utils/formatters'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: low to high' },
  { value: 'price-high', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
  { value: 'discount', label: 'Biggest discount' },
]

export default function ProductsPage({ dealsOnly = false }) {
  const dispatch = useDispatch()
  const { categorySlug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const { items: products, categories, status, error } = useSelector(
    (state) => state.products,
  )
  const selectedCategory = categorySlug || 'all'
  const [sortBy, setSortBy] = useState(dealsOnly ? 'discount' : 'featured')
  const [maxPrice, setMaxPrice] = useState(null)
  const [inStockOnly, setInStockOnly] = useState(false)

  const highestPrice = useMemo(
    () => Math.ceil(Math.max(...products.map((product) => product.price), 0)),
    [products],
  )

  const effectiveMaxPrice = maxPrice ?? highestPrice

  const filteredProducts = useMemo(() => {
    const normalizedSearch = query.trim().toLowerCase()

    return [...products]
      .filter((product) => {
        const matchesSearch =
          !normalizedSearch ||
          product.title.toLowerCase().includes(normalizedSearch) ||
          product.description.toLowerCase().includes(normalizedSearch) ||
          product.category.toLowerCase().includes(normalizedSearch) ||
          product.brand?.toLowerCase().includes(normalizedSearch)

        const matchesCategory =
          selectedCategory === 'all' || product.category === selectedCategory
        const matchesDeal = !dealsOnly || product.discountPercentage >= 10
        const matchesPrice = product.price <= effectiveMaxPrice
        const matchesStock = !inStockOnly || product.stock > 0

        return (
          matchesSearch &&
          matchesCategory &&
          matchesDeal &&
          matchesPrice &&
          matchesStock
        )
      })
      .sort((first, second) => {
        if (sortBy === 'price-low') return first.price - second.price
        if (sortBy === 'price-high') return second.price - first.price
        if (sortBy === 'rating') return second.rating - first.rating
        if (sortBy === 'discount') {
          return second.discountPercentage - first.discountPercentage
        }
        return second.rating * second.discountPercentage - first.rating * first.discountPercentage
      })
  }, [
    dealsOnly,
    effectiveMaxPrice,
    inStockOnly,
    products,
    query,
    selectedCategory,
    sortBy,
  ])

  if (status === 'loading') {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <LoadingGrid count={12} />
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-black text-slate-50">
          The product API is unavailable
        </h1>
        <p className="mt-3 text-slate-400">{error}</p>
        <button
          type="button"
          onClick={() => dispatch(fetchProducts())}
          className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0891b2] px-6 text-sm font-black text-white"
        >
          <RefreshCw size={18} />
          Retry
        </button>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f59e0b]">
            {dealsOnly ? 'Live deals' : 'Live catalog'}
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-normal text-slate-50">
            {categorySlug ? formatCategory(categorySlug) : dealsOnly ? 'Deals' : 'All products'}
          </h1>
          <p className="mt-2 text-sm font-semibold text-slate-400">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <button
          type="button"
          onClick={() => dispatch(fetchProducts())}
          className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full border border-white/10 bg-[#101010] px-5 text-sm font-black text-slate-200 shadow-sm transition hover:border-[#22d3ee] hover:text-[#22d3ee]"
        >
          <RefreshCw size={17} />
          Sync live catalog
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[18rem_1fr]">
        <aside className="h-fit rounded-[1.75rem] border border-white/10 bg-[#101010] p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Filter className="text-[#22d3ee]" size={20} />
            <h2 className="text-lg font-black text-slate-50">Filters</h2>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-black text-slate-200">Search</span>
            <span className="relative mt-2 block">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  const nextQuery = event.target.value
                  if (nextQuery.trim()) {
                    setSearchParams({ q: nextQuery })
                  } else {
                    setSearchParams({})
                  }
                }}
                className="h-11 w-full rounded-2xl border border-white/10 bg-[#0a0a0a] pl-10 pr-3 text-sm font-semibold outline-none focus:border-[#22d3ee]"
                placeholder="Search catalog"
              />
            </span>
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-black text-slate-200">Sort</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="mt-2 h-11 w-full rounded-2xl border border-white/10 bg-[#0a0a0a] px-3 text-sm font-bold outline-none focus:border-[#22d3ee]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <div className="mt-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-black text-slate-200">Max price</span>
              <span className="text-sm font-black text-[#f59e0b]">
                {formatCurrency(effectiveMaxPrice)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={highestPrice || 50000}
              value={effectiveMaxPrice || 0}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="mt-3 w-full accent-[#22d3ee]"
            />
          </div>

          <label className="mt-5 flex items-center gap-3 rounded-2xl bg-[#0a0a0a] p-3 text-sm font-bold text-slate-300">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(event) => setInStockOnly(event.target.checked)}
              className="h-4 w-4 accent-[#22d3ee]"
            />
            In-stock items only
          </label>

          <div className="mt-5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-[#f59e0b]" />
              <span className="text-sm font-black text-slate-200">Categories</span>
            </div>
            <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:grid lg:px-0 lg:pb-0">
              <Link
                to={dealsOnly ? '/deals' : '/products'}
                className={`shrink-0 whitespace-nowrap rounded-2xl px-3 py-2 text-sm font-bold lg:whitespace-normal ${
                  selectedCategory === 'all'
                    ? 'bg-[#0891b2] text-white'
                    : 'bg-[#0a0a0a] text-slate-300'
                }`}
              >
                All categories
              </Link>
              {categories.map((category) => {
                const slug = typeof category === 'string' ? category : category.slug

                return (
                  <Link
                    key={slug}
                    to={`/category/${slug}`}
                    className={`shrink-0 whitespace-nowrap rounded-2xl px-3 py-2 text-sm font-bold lg:whitespace-normal ${
                      selectedCategory === slug
                        ? 'bg-[#0891b2] text-white'
                        : 'bg-[#0a0a0a] text-slate-300'
                    }`}
                  >
                    {formatCategory(slug)}
                  </Link>
                )
              })}
            </div>
          </div>
        </aside>

        <div>
          {filteredProducts.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 3}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No products matched"
              message="Try a different category, search, price, or stock filter."
            />
          )}
        </div>
      </div>
    </section>
  )
}
