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
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#a24936]">
            Shop by aisle
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-normal text-slate-950">
            Explore live categories
          </h2>
        </div>
        <Link
          to="/products"
          className="hidden items-center gap-2 text-sm font-black text-[#0f766e] sm:inline-flex"
        >
          View all
          <ArrowRight size={17} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {visibleCategories.map((category) => {
          const categorySlug = typeof category === 'string' ? category : category.slug
          const product = products.find((item) => item.category === categorySlug)

          return (
            <Link
              key={categorySlug}
              to={`/category/${categorySlug}`}
              className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[4/3] bg-[#f3eadb]">
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
                <p className="line-clamp-2 min-h-10 text-sm font-black text-slate-950">
                  {formatCategory(categorySlug)}
                </p>
                <p className="mt-1 text-xs font-bold text-slate-500">
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
