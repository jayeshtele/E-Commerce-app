import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCategory } from '../utils/formatters'

export default function CategoryRail({ categories, products }) {
  const visibleCategories = categories.slice(0, 12)

  if (!visibleCategories.length) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f59e0b]">
            Shop by aisle
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-normal text-slate-50">
            Explore live categories
          </h2>
        </div>
        <Link
          to="/products"
          className="hidden items-center gap-2 text-sm font-black text-[#22d3ee] sm:inline-flex"
        >
          View all
          <ArrowRight size={17} />
        </Link>
      </div>

      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0 lg:pb-0">
        {visibleCategories.map((category) => {
          const categorySlug = typeof category === 'string' ? category : category.slug
          const product = products.find((item) => item.category === categorySlug)

          return (
            <Link
              key={categorySlug}
              to={`/category/${categorySlug}`}
              className="group w-44 shrink-0 snap-start overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#101010] shadow-sm transition hover:-translate-y-1 hover:shadow-lg lg:w-auto"
            >
              <div className="aspect-[4/3] bg-[#151515]">
                {product && (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    loading="lazy"
                    className="h-full w-full object-contain p-4 transition group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-4">
                <p className="line-clamp-2 min-h-10 text-sm font-black text-slate-50">
                  {formatCategory(categorySlug)}
                </p>
                <p className="mt-1 text-xs font-bold text-slate-400">
                  {products.filter((item) => item.category === categorySlug).length}{' '}
                  products
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
